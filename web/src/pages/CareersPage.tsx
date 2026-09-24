/**
 * Careers page — served at /careers (not part of the single-page landing).
 *
 * Rendered by App between the shared <nav> and <footer>, so the header,
 * mobile menu and LET'S TALK modal behave exactly as on the home page.
 * Open roles come from Sanity (`job` documents); when there are none, a
 * designed empty state is shown instead of a blank list.
 */
import type { JobItem } from '@/content'

interface CareersPageProps {
  contactEmail: string
  founderEmail: string
  onOpenTalk: () => void
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

export default function CareersPage({ contactEmail, founderEmail, onOpenTalk, jobs }: CareersPageProps) {
  const applyHref = (email: string, roleTitle: string) =>
    `mailto:${email || contactEmail}?subject=${encodeURIComponent(`Application — ${roleTitle}`)}`

  return (
    <main id="careers-page" className="bg-paper">
      {/* HERO */}
      <section className="pt-hero-top pb-20 sm:pb-28 px-gutter border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-lime" aria-hidden="true" />
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
            <button
              type="button"
              onClick={onOpenTalk}
              className="text-xs font-bold uppercase tracking-nav text-ink/70 hover:text-ink underline underline-offset-4 decoration-black/30 hover:decoration-black transition-all"
            >
              START A CONVERSATION
            </button>
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
                <span className="w-2 h-2 rounded-full bg-lime" aria-hidden="true" />
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

      {/* CLOSING CTA */}
      <section className="py-24 sm:py-32 px-gutter">
        <div className="max-w-7xl mx-auto">
          <div className="bg-ink text-chalk p-8 sm:p-14">
            <span className="text-xs font-mono font-bold uppercase tracking-label text-lime block mb-6">
              // SEND US YOUR WORK
            </span>
            <h2 className="text-cta font-black uppercase tracking-mega leading-mega">
              READY TO<br />
              MAKE SOME<br />
              <span className="inline-block">
                NOISE?
                <span className="inline-block ml-3 w-4 h-4 sm:w-6 sm:h-6 bg-lime" aria-hidden="true" />
              </span>
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-chalk-2 max-w-xl leading-relaxed">
              Tell us what you make and what you want to make next. Portfolio, reel or a plain
              message — all welcome.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={`mailto:${founderEmail}?subject=${encodeURIComponent('Careers — StreetBuzz')}`}
                className="group inline-flex items-center gap-3 bg-canvas text-ink text-sm sm:text-base font-bold uppercase tracking-btn px-8 py-4 hover:bg-lime transition-colors"
              >
                <span>EMAIL US</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="text-sm sm:text-base font-bold text-chalk-2 hover:text-lime transition-colors"
              >
                {contactEmail}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
