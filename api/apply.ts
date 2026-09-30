/**
 * POST /api/apply — careers application intake.
 *
 * Uploads the CV to Sanity, files an `application` document, then notifies
 * Web3Forms. Runs as a Vercel Function because it needs a Sanity write token,
 * which must never reach the browser bundle.
 *
 * Uses the Web-standard `fetch` export, which Vercel's Node runtime supports in
 * /api. That gives native `request.formData()` for the multipart body, so no
 * parser dependency is needed.
 *
 * Required env (server-side, no VITE_ prefix):
 *   SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN, WEB3FORMS_CAREERS_KEY
 * Optional: SANITY_API_VERSION
 */
import { createClient } from '@sanity/client'

/** Vercel caps function request bodies; stay comfortably under it. */
const MAX_CV_BYTES = 4 * 1024 * 1024

/**
 * Extension and MIME must BOTH match. The browser `accept` attribute is a hint
 * a client can ignore, and a Content-Type header is trivially forged, so
 * neither is a control on its own.
 */
const ALLOWED_CV = [
  { ext: '.pdf', mime: 'application/pdf' },
  { ext: '.doc', mime: 'application/msword' },
  {
    ext: '.docx',
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
] as const

const MAX_LEN = { short: 200, url: 500, long: 5000 } as const

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function fail(message: string, status = 400): Response {
  return json({ success: false, message }, status)
}

function text(form: FormData, key: string): string {
  const value = form.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return fail('Method not allowed.', 405)
    }

    const projectId = process.env.SANITY_PROJECT_ID
    const dataset = process.env.SANITY_DATASET || 'production'
    const token = process.env.SANITY_WRITE_TOKEN
    if (!projectId || !token) {
      console.error('[apply] Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN')
      return fail('The application form is not configured yet.', 500)
    }

    let form: FormData
    try {
      form = await request.formData()
    } catch {
      return fail('Could not read the submitted form. Please try again.')
    }

    // Honeypot: a real person never fills a hidden field. Answer 200 so a bot
    // learns nothing from the response.
    if (text(form, 'botcheck')) {
      return json({ success: true }, 200)
    }

    const fullName = text(form, 'fullName')
    const email = text(form, 'email')
    const phone = text(form, 'phone')
    const discipline = text(form, 'discipline')
    const portfolioUrl = text(form, 'portfolioUrl')
    const whyStreetbuzz = text(form, 'whyStreetbuzz')
    const dreamProject = text(form, 'dreamProject')

    if (!fullName || !email || !phone || !discipline || !portfolioUrl || !whyStreetbuzz) {
      return fail('Please fill in every required field.')
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail('That email address does not look right.')
    }
    if (
      fullName.length > MAX_LEN.short ||
      email.length > MAX_LEN.short ||
      phone.length > MAX_LEN.short ||
      discipline.length > MAX_LEN.short ||
      portfolioUrl.length > MAX_LEN.url ||
      whyStreetbuzz.length > MAX_LEN.long ||
      dreamProject.length > MAX_LEN.long
    ) {
      return fail('One of the answers is too long.')
    }

    const cv = form.get('cv')
    if (!(cv instanceof File) || cv.size === 0) {
      return fail('Please attach your CV.')
    }
    if (cv.size > MAX_CV_BYTES) {
      return fail('That CV is larger than 4MB. Please upload a smaller file.')
    }
    const filename = cv.name || 'cv'
    const match = ALLOWED_CV.find(
      (allowed) => filename.toLowerCase().endsWith(allowed.ext) && cv.type === allowed.mime,
    )
    if (!match) {
      return fail('Your CV must be a PDF, DOC or DOCX file.')
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion: process.env.SANITY_API_VERSION || '2026-09-01',
      token,
      useCdn: false,
    })

    let cvUrl = ''
    try {
      const buffer = Buffer.from(await cv.arrayBuffer())
      const asset = await client.assets.upload('file', buffer, {
        filename,
        contentType: match.mime,
      })
      cvUrl = asset.url

      await client.create({
        _type: 'application',
        submittedAt: new Date().toISOString(),
        fullName,
        email,
        phone,
        discipline,
        portfolioUrl,
        whyStreetbuzz,
        dreamProject: dreamProject || undefined,
        cv: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } },
      })
    } catch (error) {
      console.error('[apply] Sanity write failed:', error)
      return fail('We could not save your application. Please try again.', 502)
    }

    // The application is already safely recorded. A failed notification must
    // never be reported to the candidate as a failed application, so anything
    // past this point is logged, not surfaced.
    const web3formsKey = process.env.WEB3FORMS_CAREERS_KEY
    if (!web3formsKey) {
      console.error('[apply] WEB3FORMS_CAREERS_KEY not set — application saved, no email sent')
      return json({ success: true }, 200)
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `New StreetBuzz Application — ${fullName}`,
          from_name: 'StreetBuzz Careers',
          name: fullName,
          email,
          phone,
          discipline,
          portfolio: portfolioUrl,
          cv: cvUrl,
          why_streetbuzz: whyStreetbuzz,
          dream_project: dreamProject || '—',
          botcheck: false,
        }),
      })
      if (!response.ok) {
        console.error('[apply] Web3Forms responded', response.status)
      }
    } catch (error) {
      console.error('[apply] Web3Forms notification failed:', error)
    }

    return json({ success: true }, 200)
  },
}
