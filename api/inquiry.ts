/**
 * POST /api/inquiry — LET'S TALK campaign inquiry intake.
 *
 * Files an `inquiry` document in Sanity, then emails the sales inbox via
 * Resend. Same shape as api/apply.ts, minus the file upload.
 *
 * Replaces a direct browser-to-Web3Forms POST. That left an inquiry existing
 * ONLY as an email: if the send failed or the mail was deleted, the lead was
 * gone with no record. Writing to Sanity first makes the record the source of
 * truth and the notification a convenience.
 *
 * The helpers below are deliberately duplicated from api/apply.ts rather than
 * shared from a lib/ module. Relative imports between compiled ESM functions
 * need exact file extensions at runtime, and that is the class of bug that
 * already broke this deployment once; a few duplicated lines are cheaper than
 * a failure mode that cannot be tested locally.
 *
 * Required env (server-side, no VITE_ prefix):
 *   SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN,
 *   RESEND_API_KEY, INQUIRY_NOTIFY_EMAIL
 * Optional: SANITY_API_VERSION, RESEND_FROM
 */
import { createClient } from '@sanity/client'

const MAX_LEN = { short: 200, long: 5000 } as const

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function fail(message: string, status = 400): Response {
  return json({ success: false, message }, status)
}

/** Inquiry text goes into an HTML email, so it must not carry markup through. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function str(source: Record<string, unknown>, key: string): string {
  const value = source[key]
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
      console.error('[inquiry] Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN')
      return fail('The inquiry form is not configured yet.', 500)
    }

    let payload: Record<string, unknown>
    try {
      payload = (await request.json()) as Record<string, unknown>
    } catch {
      return fail('Could not read the submitted form. Please try again.')
    }

    // Honeypot: answer 200 so a bot learns nothing from the response.
    if (str(payload, 'botcheck')) {
      return json({ success: true }, 200)
    }

    const brandName = str(payload, 'brandName')
    const email = str(payload, 'email')
    const phone = str(payload, 'phone')
    const format = str(payload, 'format')
    const city = str(payload, 'city')
    const message = str(payload, 'message')

    if (![brandName, email, phone, message].some(Boolean)) {
      return fail('Please tell us a little about your campaign before sending.')
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail('That email address does not look right.')
    }
    if (
      brandName.length > MAX_LEN.short ||
      email.length > MAX_LEN.short ||
      phone.length > MAX_LEN.short ||
      format.length > MAX_LEN.short ||
      city.length > MAX_LEN.short ||
      message.length > MAX_LEN.long
    ) {
      return fail('One of the answers is too long.')
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion: process.env.SANITY_API_VERSION || '2026-09-01',
      token,
      useCdn: false,
    })

    try {
      const document: { _type: string } & Record<string, unknown> = {
        _type: 'inquiry',
        submittedAt: new Date().toISOString(),
      }
      for (const [key, value] of Object.entries({
        brandName,
        email,
        phone,
        format,
        city,
        message,
      })) {
        if (value) document[key] = value
      }
      await client.create(document)
    } catch (error) {
      console.error('[inquiry] Sanity write failed:', error)
      return fail('We could not save your inquiry. Please try again.', 502)
    }

    // The inquiry is already recorded. A failed notification must not be
    // reported as a failed inquiry, so everything below is logged, not surfaced.
    const resendKey = process.env.RESEND_API_KEY
    const notifyTo = process.env.INQUIRY_NOTIFY_EMAIL
    if (!resendKey || !notifyTo) {
      console.error(
        '[inquiry] RESEND_API_KEY or INQUIRY_NOTIFY_EMAIL not set — inquiry saved, no email sent',
      )
      return json({ success: true }, 200)
    }

    const rows: [string, string][] = (
      [
        ['Brand / Company', brandName],
        ['Email', email],
        ['Phone', phone],
        ['Format', format],
        ['Market / City', city],
        ['Brief', message],
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
          from: process.env.RESEND_FROM || 'StreetBuzz <hello@wearestreetbuzz.com>',
          to: notifyTo,
          subject: `New StreetBuzz Inquiry — ${brandName || 'Untitled brand'}`,
          ...(email ? { reply_to: email } : {}),
          text: rows.map(([label, value]) => `${label}:\n${value}`).join('\n\n'),
          html: rows
            .map(
              ([label, value]) =>
                `<p style="margin:0 0 16px"><strong>${escapeHtml(label)}</strong><br>` +
                `${escapeHtml(value).replace(/\n/g, '<br>')}</p>`,
            )
            .join(''),
        }),
      })
      if (!response.ok) {
        console.error('[inquiry] Resend responded', response.status, await response.text())
      }
    } catch (error) {
      console.error('[inquiry] Resend notification failed:', error)
    }

    return json({ success: true }, 200)
  },
}
