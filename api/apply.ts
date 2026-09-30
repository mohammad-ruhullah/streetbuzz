/**
 * POST /api/apply — careers application intake.
 *
 * Uploads the CV to Sanity, files an `application` document, then emails the
 * careers inbox via Resend with the CV attached. Runs as a Vercel Function
 * because it needs a Sanity write token and a Resend key, neither of which may
 * reach the browser bundle.
 *
 * Resend rather than Web3Forms because Web3Forms puts attachments behind its
 * PRO plan, so the CV could only be linked, not attached. The inquiry modal on
 * the home page still uses Web3Forms client-side and is unaffected.
 *
 * Uses the Web-standard `fetch` export, which Vercel's Node runtime supports in
 * /api. That gives native `request.formData()` for the multipart body, so no
 * parser dependency is needed.
 *
 * Required env (server-side, no VITE_ prefix):
 *   SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN,
 *   RESEND_API_KEY, CAREERS_NOTIFY_EMAIL
 * Optional: SANITY_API_VERSION, RESEND_FROM
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

/**
 * "Show us your work" is a single text box that may hold several links.
 * Split on commas and newlines, and add a scheme where one is missing so
 * `linkedin.com/in/me` — the way people actually type it — still stores as a
 * working link rather than being rejected.
 */
function parseLinks(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((link) => (/^https?:\/\//i.test(link) ? link : `https://${link}`))
    .slice(0, 10)
}

/** Applicant text goes into an HTML email, so it must not carry markup through. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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
    const portfolioLinks = parseLinks(portfolioUrl)
    const whyStreetbuzz = text(form, 'whyStreetbuzz')
    const dreamProject = text(form, 'dreamProject')

    // Every field is optional by design. The only thing refused is a wholly
    // empty submission: with nothing required, an unattended POST would
    // otherwise file a blank document and send a blank email on every hit.
    const cvField = form.get('cv')
    const hasCv = cvField instanceof File && cvField.size > 0
    const anyAnswer = [
      fullName,
      email,
      phone,
      discipline,
      portfolioUrl,
      whyStreetbuzz,
      dreamProject,
    ].some(Boolean)
    if (!anyAnswer && !hasCv) {
      return fail('Please tell us something about yourself before sending.')
    }

    // Absence is fine; a malformed value is not.
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

    const cv = hasCv ? (cvField as File) : null
    let match: (typeof ALLOWED_CV)[number] | undefined
    if (cv) {
      if (cv.size > MAX_CV_BYTES) {
        return fail('That CV is larger than 4MB. Please upload a smaller file.')
      }
      const filename = cv.name || 'cv'
      match = ALLOWED_CV.find(
        (allowed) => filename.toLowerCase().endsWith(allowed.ext) && cv.type === allowed.mime,
      )
      if (!match) {
        return fail('Your CV must be a PDF, DOC or DOCX file.')
      }
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion: process.env.SANITY_API_VERSION || '2026-09-01',
      token,
      useCdn: false,
    })

    let cvUrl = ''
    // Held outside the try so the notification below can attach the same bytes
    // rather than asking Resend to fetch the Sanity URL.
    let cvBuffer: Buffer | null = null
    try {
      // `_type` must stay statically known for client.create()'s type, so it
      // is intersected in rather than widened away by Record<string, unknown>.
      const document: { _type: string } & Record<string, unknown> = {
        _type: 'application',
        submittedAt: new Date().toISOString(),
      }
      // Leave blanks out entirely rather than storing empty strings, so a
      // sparse application reads as sparse in Studio.
      for (const [key, value] of Object.entries({
        fullName,
        email,
        phone,
        discipline,
        whyStreetbuzz,
        dreamProject,
      })) {
        if (value) document[key] = value
      }
      if (portfolioLinks.length) document.portfolioLinks = portfolioLinks

      if (cv && match) {
        cvBuffer = Buffer.from(await cv.arrayBuffer())
        const asset = await client.assets.upload('file', cvBuffer, {
          filename: cv.name || 'cv',
          contentType: match.mime,
        })
        cvUrl = asset.url
        document.cv = { _type: 'file', asset: { _type: 'reference', _ref: asset._id } }
      }

      await client.create(document)
    } catch (error) {
      console.error('[apply] Sanity write failed:', error)
      return fail('We could not save your application. Please try again.', 502)
    }

    // The application is already safely recorded. A failed notification must
    // never be reported to the candidate as a failed application, so anything
    // past this point is logged, not surfaced.
    const resendKey = process.env.RESEND_API_KEY
    const notifyTo = process.env.CAREERS_NOTIFY_EMAIL
    if (!resendKey || !notifyTo) {
      console.error(
        '[apply] RESEND_API_KEY or CAREERS_NOTIFY_EMAIL not set — application saved, no email sent',
      )
      return json({ success: true }, 200)
    }

    const rows: [string, string][] = (
      [
        ['Name', fullName],
        ['Email', email],
        ['Phone', phone],
        ['What they are into', discipline],
        ['Links', portfolioLinks.join(', ')],
        ['Why StreetBuzz', whyStreetbuzz],
        ['Would love to build', dreamProject],
        ['CV in Studio', cvUrl],
      ] as [string, string][]
    ).filter(([, value]) => value)

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'StreetBuzz Careers <careers@wearestreetbuzz.com>',
          to: notifyTo,
          subject: `New StreetBuzz Application — ${fullName || 'Unnamed applicant'}`,
          // So the client can answer the candidate straight from the notification.
          ...(email ? { reply_to: email } : {}),
          text: rows.map(([label, value]) => `${label}:\n${value}`).join('\n\n'),
          html: rows
            .map(
              ([label, value]) =>
                `<p style="margin:0 0 16px"><strong>${escapeHtml(label)}</strong><br>` +
                `${escapeHtml(value).replace(/\n/g, '<br>')}</p>`,
            )
            .join(''),
          // Base64 from the bytes already in memory, rather than handing Resend
          // the Sanity URL to fetch — no dependence on CDN propagation, and it
          // still works if the asset is not publicly reachable.
          ...(cvBuffer && cv
            ? {
                attachments: [
                  {
                    filename: cv.name || 'cv',
                    content: cvBuffer.toString('base64'),
                    ...(match ? { content_type: match.mime } : {}),
                  },
                ],
              }
            : {}),
        }),
      })
      if (!response.ok) {
        console.error('[apply] Resend responded', response.status, await response.text())
      }
    } catch (error) {
      console.error('[apply] Resend notification failed:', error)
    }

    return json({ success: true }, 200)
  },
}
