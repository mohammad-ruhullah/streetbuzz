/**
 * Careers page — served at /careers (not part of the single-page landing).
 *
 * Rendered by App between the shared <nav> and <footer>, so the header,
 * mobile menu and LET'S TALK modal behave exactly as on the home page.
 * Open roles come from Sanity (`job` documents); when there are none, a
 * designed empty state is shown instead of a blank list.
 *
 * The closing block is the application form. It posts multipart/form-data to
 * /api/apply, which stores the CV in Sanity and notifies the careers inbox —
 * the browser never sees a Sanity token.
 */
import { useState } from 'react'

import type { JobItem } from '@/content'

interface CareersPageProps {
  careersEmail: string
  jobs: JobItem[]
}

const PRINCIPLES = [
  {
    number: '01',
    title: 'REAL-WORLD IMPACT',
    detail: 'Your work leaves the screen and shows up on actual streets, in front of actual people.',
  },
  {
    number: '02',
    title: 'SMALL, FAST TEAM',
    detail: 'Ideas move from a sketch to the street in days, not quarters. Everyone owns their part.',
  },
  {
    number: '03',
    title: 'CREATIVE FREEDOM',
    detail: 'We hire people who bring ideas, then get out of their way. Bold beats safe here.',
  },
  {
    number: '04',
    title: 'KEEP MOVING',
    detail: 'No bored days. Campaigns, campuses, festivals and city takeovers keep the work alive.',
  },
]

const DISCIPLINES = [
  'Creative & Content',
  'Marketing & Strategy',
  'Operations',
  'Sales & Business',
  'Design',
  'Something Else',
]

/** Mirrors the server cap in api/apply.ts. The server is the actual gate. */
const MAX_CV_BYTES = 4 * 1024 * 1024
const ALLOWED_CV_EXT = ['.pdf', '.doc', '.docx']

/** Form controls on the ink panel. Lime reads ~18:1 on ink, so unlike the
 *  white inquiry modal the ring here is a genuine focus indicator. */
const FIELD_CLASS =
  'w-full px-4 py-3 bg-ink-2 border border-edge text-chalk placeholder:text-chalk-3 ' +
  'focus:border-chalk-3 focus:outline-none focus:ring-2 focus:ring-lime transition-colors'

const EMPTY_APPLICATION = {
  fullName: '',
  email: '',
  phone: '',
  discipline: '',
  portfolioUrl: '',
  whyStreetbuzz: '',
  dreamProject: '',
  botcheck: '',
}

function Field({
  number,
  label,
  htmlFor,
  hint,
  children,
}: {
  number: string
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block mb-3">
        <span className="text-[11px] font-mono font-bold uppercase tracking-meta text-lime">
          {number}
        </span>
        <span className="ml-3 text-xs font-bold uppercase tracking-label text-chalk">{label}</span>
      </label>
      {hint && <p className="-mt-1 mb-3 text-sm text-chalk-3 leading-relaxed">{hint}</p>}
      {children}
    </div>
  )
}

export default function CareersPage({ careersEmail, jobs }: CareersPageProps) {
  const applyHref = (email: string, roleTitle: string) =>
    `mailto:${email || careersEmail}?subject=${encodeURIComponent(`Application — ${roleTitle}`)}`

  /* For anyone who would rather write to us than fill in the form. */
  const careersHref = `mailto:${careersEmail}?subject=${encodeURIComponent('Careers — StreetBuzz')}`

  const [application, setApplication] = useState(EMPTY_APPLICATION)
  const [cv, setCv] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const setField = (key: keyof typeof EMPTY_APPLICATION, value: string) =>
    setApplication((previous) => ({ ...previous, [key]: value }))

  /** Fast feedback only — api/apply re-checks extension, MIME and size. */
  const selectCv = (file: File) => {
    if (!ALLOWED_CV_EXT.some((ext) => file.name.toLowerCase().endsWith(ext))) {
      setError('Your CV must be a PDF, DOC or DOCX file.')
      return
    }
    if (file.size > MAX_CV_BYTES) {
      setError('That CV is larger than 4MB. Please upload a smaller file.')
      return
    }
    setError('')
    setCv(file)
  }

  const handleSubmitApplication = async (event: React.FormEvent) => {
    event.preventDefault()

    setStatus('submitting')
    setError('')

    const body = new FormData()
    for (const [key, value] of Object.entries(application)) {
      body.append(key, value)
    }
    if (cv) body.append('cv', cv)

    try {
      const response = await fetch('/api/apply', { method: 'POST', body })

      // Read as text first. Parsing inside the outer catch would report a
      // crashed or missing endpoint as a network error, which is what sent the
      // first live failure down the wrong path.
      const raw = await response.text()
      let result: { success?: boolean; message?: string }
      try {
        result = JSON.parse(raw)
      } catch {
        console.error('[apply] Non-JSON response', response.status, raw.slice(0, 500))
        setStatus('error')
        setError(
          response.status === 404
            ? 'The application endpoint is not deployed (404). Please let us know.'
            : `The server returned ${response.status} instead of a result. Please try again.`,
        )
        return
      }

      if (result.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setError(result.message || 'Something went wrong. Please try again.')
      }
    } catch (requestError) {
      // Only a genuine transport failure reaches here now.
      console.error('[apply] Request failed', requestError)
      setStatus('error')
      setError('Could not reach the server. Please check your connection and try again.')
    }
  }

  return (
    <main id="careers-page" className="bg-paper">
      {/* HERO */}
      <section className="pt-hero-top pb-20 sm:pb-28 px-gutter border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-lime dot-ping" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-bold uppercase tracking-label text-ink/70">
              CAREERS AT STREETBUZZ
            </p>
          </div>

          <h1 className="text-display font-black uppercase tracking-display leading-display text-ink max-w-4xl">
            MAKE NOISE<br />
            <span className="inline-block bg-ink text-lime px-3 sm:px-4 py-1 mt-1 mb-1 font-black transform -rotate-1 origin-left">
              WITH US
            </span>
            <br />
            OUTSIDE.
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-body leading-relaxed max-w-2xl">
            We are a small, independent outdoor advertising crew building real-world campaigns across
            Bangladesh. If you would rather make things people can touch, walk past and remember —
            you are in the right place.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#open-roles"
              className="group inline-flex items-center gap-3 bg-ink text-chalk text-xs sm:text-sm font-bold uppercase tracking-btn px-8 py-4 hover:bg-lime hover:text-ink transition-colors duration-200"
            >
              <span>SEE OPEN ROLES</span>
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* OPEN ROLES */}
      <section id="open-roles" className="py-24 sm:py-32 px-gutter">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-black/15 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-label text-black/60 mb-2">
                JOIN THE CREW
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight">
                OPEN ROLES
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-black/60 uppercase tracking-widest">
              {String(jobs.length).padStart(2, '0')}{' '}
              {jobs.length === 1 ? 'POSITION OPEN' : 'POSITIONS OPEN'}
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="flex flex-col divide-y divide-black/10 border-y border-black/10">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 sm:py-8"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="inline-block text-xs sm:text-sm font-mono font-bold tracking-widest bg-lime text-ink px-1.5 py-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
                        {job.title}
                      </h3>
                      <p className="mt-1 text-xs font-mono uppercase tracking-meta text-mute">
                        {[job.team, job.location, job.type].filter(Boolean).join(' · ')}
                      </p>
                      {job.description && (
                        <p className="mt-3 text-sm sm:text-base text-body leading-relaxed max-w-2xl">
                          {job.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <a
                    href={applyHref(job.applyEmail, job.title)}
                    className="shrink-0 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-ink hover:text-lime hover:bg-ink px-3 py-2 transition-colors"
                  >
                    APPLY
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state — no active roles in the CMS */
            <div className="border border-black/10 bg-canvas px-6 py-16 sm:px-12 sm:py-20 text-center">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-meta text-mute mb-6">
                <span className="w-2 h-2 rounded-full bg-lime dot-ping" aria-hidden="true" />
                CURRENTLY HIRING
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-ink">
                NO OPEN ROLES
                <br />
                RIGHT NOW.
              </h3>
              <p className="mt-6 text-base sm:text-lg text-body leading-relaxed max-w-xl mx-auto">
                We are not actively hiring at the moment, but we are always glad to meet good people.
                Send us your work and we will keep you in mind when something opens up.
              </p>
            </div>
          )}

          {jobs.length > 0 && (
            <p className="mt-8 text-sm text-mute">
              Nothing fits exactly? Send your work anyway — we keep good people on file.
            </p>
          )}
        </div>
      </section>

      {/* WHY WORK HERE */}
      <section className="bg-canvas border-y border-black/10 py-24 sm:py-32 px-gutter">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-label text-black/60 block mb-2">
              WHY STREETBUZZ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              LIFE ON THE STREET SIDE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {PRINCIPLES.map((item) => (
              <div key={item.number} className="border-t-2 border-ink pt-6">
                <span className="text-xs font-mono font-bold text-black/40 block mb-3">
                  {item.number}
                </span>
                <h3 className="text-xl font-extrabold uppercase tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-body leading-relaxed">{item.detail}</p>
                <div className="w-6 h-[2px] bg-lime mt-8" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="py-24 sm:py-32 px-gutter">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ink text-chalk p-8 sm:p-14">
            {status === 'success' ? (
              /* The headline is the call to apply, so it retires once they have.
                 Only the confirmation remains. */
              <div className="max-w-xl">
                <p className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-lime">
                  YOU&rsquo;RE IN OUR INBOX.
                </p>
                <p className="mt-4 text-lg text-chalk-2 leading-relaxed">
                  Thanks for reaching out. If there&rsquo;s a fit, we&rsquo;ll be in touch.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-cta font-black uppercase tracking-mega leading-mega">
                  READY TO<br />
                  MAKE SOME<br />
                  <span className="inline-block">
                    NOISE?
                    <span
                      className="inline-block ml-3 w-4 h-4 sm:w-6 sm:h-6 bg-lime"
                      aria-hidden="true"
                    />
                  </span>
                </h2>

                <p className="mt-8 text-lg sm:text-xl text-chalk-2 max-w-xl leading-relaxed">
                  Tell us a little about yourself.<br />
                  The rest, we can figure out together.
                </p>

                <form onSubmit={handleSubmitApplication} className="mt-12 max-w-2xl space-y-8">
                  {/* Honeypot — hidden from people, irresistible to bots. */}
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    value={application.botcheck}
                    onChange={(e) => setField('botcheck', e.target.value)}
                  />

                  <Field number="01" label="YOUR NAME" htmlFor="apply-name">
                    <input
                      id="apply-name"
                      type="text"
                      placeholder="Your full name"
                      value={application.fullName}
                      onChange={(e) => setField('fullName', e.target.value)}
                      className={FIELD_CLASS}
                    />
                  </Field>

                  <Field number="02" label="EMAIL" htmlFor="apply-email">
                    <input
                      id="apply-email"
                      type="email"
                      placeholder="Where can we reach you?"
                      value={application.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className={FIELD_CLASS}
                    />
                  </Field>

                  <Field number="03" label="PHONE" htmlFor="apply-phone">
                    <input
                      id="apply-phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="Your phone number"
                      value={application.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className={FIELD_CLASS}
                    />
                  </Field>

                  <Field number="04" label="WHAT ARE YOU INTO?" htmlFor="apply-discipline">
                    <select
                      id="apply-discipline"
                      value={application.discipline}
                      onChange={(e) => setField('discipline', e.target.value)}
                      className={FIELD_CLASS}
                    >
                      <option value="">Select one</option>
                      {DISCIPLINES.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    number="05"
                    label="SHOW US YOUR WORK"
                    htmlFor="apply-portfolio"
                    hint="One or more links, separated by commas. No need to type https://"
                  >
                    {/* Deliberately not type="url": that rejects the way people
                        actually type a link (linkedin.com/in/me) and refuses more
                        than one outright. The server adds the scheme and splits
                        the list instead. */}
                    <input
                      id="apply-portfolio"
                      type="text"
                      placeholder="Portfolio / LinkedIn / Instagram / Website"
                      value={application.portfolioUrl}
                      onChange={(e) => setField('portfolioUrl', e.target.value)}
                      className={FIELD_CLASS}
                    />
                  </Field>

                  <Field number="06" label="YOUR CV" htmlFor="apply-cv">
                    {/* The styled box is a <label> for a real file input, which
                        stays in the DOM — so keyboard and screen-reader users get
                        a working control, not a div that only responds to drops. */}
                    <label
                      htmlFor="apply-cv"
                      onDragOver={(event) => {
                        event.preventDefault()
                        setDragging(true)
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(event) => {
                        event.preventDefault()
                        setDragging(false)
                        const dropped = event.dataTransfer.files?.[0]
                        if (dropped) selectCv(dropped)
                      }}
                      className={`flex flex-col items-center justify-center gap-1 w-full px-4 py-10 border border-dashed cursor-pointer transition-colors ${
                        dragging ? 'border-lime bg-lime/5' : 'border-edge-2 hover:border-chalk-3'
                      }`}
                    >
                      <span className="text-sm font-bold uppercase tracking-btn text-chalk text-center break-all">
                        {cv ? cv.name : '+ Drop your CV here'}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-meta text-chalk-3">
                        {cv ? `${(cv.size / 1024 / 1024).toFixed(1)} MB` : 'PDF, DOC or DOCX'}
                      </span>
                      <input
                        id="apply-cv"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="sr-only"
                        onChange={(event) => {
                          const picked = event.target.files?.[0]
                          if (picked) selectCv(picked)
                        }}
                      />
                    </label>
                    {cv && (
                      <button
                        type="button"
                        onClick={() => setCv(null)}
                        className="mt-2 text-[11px] font-mono uppercase tracking-meta text-chalk-3 hover:text-lime transition-colors"
                      >
                        Remove file
                      </button>
                    )}
                  </Field>

                  <Field
                    number="07"
                    label="ONE LAST THING"
                    htmlFor="apply-why"
                    hint="Why do you want to build with STREETBUZZ? No corporate answers required."
                  >
                    <textarea
                      id="apply-why"
                      rows={4}
                      placeholder="Tell us in your own words..."
                      value={application.whyStreetbuzz}
                      onChange={(e) => setField('whyStreetbuzz', e.target.value)}
                      className={FIELD_CLASS}
                    />
                  </Field>

                  <div className="pt-8 border-t border-edge">
                    <Field
                      number="OPTIONAL"
                      label="BUT VERY STREETBUZZ"
                      htmlFor="apply-dream"
                      hint="What’s something you’d love to build if you had the chance?"
                    >
                      <textarea
                        id="apply-dream"
                        rows={3}
                        placeholder="We’re listening..."
                        value={application.dreamProject}
                        onChange={(e) => setField('dreamProject', e.target.value)}
                        className={FIELD_CLASS}
                      />
                    </Field>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group inline-flex items-center gap-3 bg-lime text-ink text-sm sm:text-base font-bold uppercase tracking-btn px-8 py-4 hover:bg-lime-lo focus-visible:outline-chalk transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>{status === 'submitting' ? 'SENDING…' : 'SEND IT OUTSIDE'}</span>
                      <span
                        className="transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>

                    {error && (
                      <p role="alert" className="mt-4 text-sm font-bold text-lime">
                        {error}
                      </p>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Kept outside the success branch: still useful after someone has
              applied, and it is the only route for anyone who would rather not
              use the form at all. */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              {/* Lime as a dot, not as text: on this paper band lime reads at
                  ~1.1:1 and would be effectively invisible. Same eyebrow
                  pattern the rest of the site uses on light sections. */}
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-label text-black/60 mb-2">
                <span className="w-2 h-2 rounded-full bg-lime dot-ping" aria-hidden="true" />
                PREFER EMAIL?
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-ink">
                SEND US YOUR WORK DIRECTLY
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href={careersHref}
                className="group inline-flex items-center gap-3 bg-lime text-ink text-xs sm:text-sm font-bold uppercase tracking-btn px-8 py-4 hover:bg-lime-lo focus-visible:outline-ink transition-colors duration-200"
              >
                <span>EMAIL US</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href={`mailto:${careersEmail}`}
                className="text-sm sm:text-base font-bold text-ink border-b-2 border-transparent hover:border-lime pb-1 transition-colors"
              >
                {careersEmail}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
