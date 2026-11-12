import { Img, SectionHeading, btn } from './ui'
import { services, whatsappLink } from '../data'
import { gsap } from '../lib/motion'

const navH = () => document.querySelector('[data-site-nav]')?.offsetHeight ?? 80

/** The active horizontal-scroll timeline (null on phones / reduced motion). Used so images
 *  inside the sideways-moving track can reveal as each card slides into view. */
let horizontalTl = null
export const getServicesHorizontal = () => horizontalTl

/**
 * Horizontal scroll pinning.
 * Tablet/desktop with motion allowed: the section pins and vertical scrolling slides the
 * card row sideways, with a progress bar. Scrubbed, so it follows the scrollbar exactly.
 * Phones and reduced-motion: a normal responsive grid (CSS `motion-safe:md:` variants).
 * Called from useSiteAnimations (after ScrollSmoother exists).
 */
export function setupHorizontalServices() {
  const section = document.getElementById('services')
  if (!section) return
  const mm = gsap.matchMedia()
  mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    const track = section.querySelector('[data-track]')
    const bar = section.querySelector('[data-progress]')
    const distance = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth)

    horizontalTl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: () => `top ${navH()}px`,
        end: () => `+=${distance()}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })
      .to(track, { x: () => -distance() }, 0)
      .fromTo(bar, { scaleX: 0 }, { scaleX: 1 }, 0)
    return () => { horizontalTl = null }
  })
}

export default function Services() {
  return (
    <section id="services"
      className="section-y overflow-x-clip bg-white motion-safe:md:flex motion-safe:md:min-h-[calc(100svh-var(--nav-h))] motion-safe:md:flex-col motion-safe:md:justify-center motion-safe:md:py-12">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading label="Procedures" title="What we can help with" />
          <a data-reveal href="#contact" className={`${btn.gold} self-start lg:self-end shrink-0`}>Book a consultation</a>
        </div>

        <div className="mt-10 md:mt-12">
          <ul data-track data-img-group
            className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8
              motion-safe:md:flex motion-safe:md:w-max motion-safe:md:gap-8">
            {services.map((s, i) => {
              return (
                <li key={s.title} className="motion-safe:md:w-[clamp(340px,42vw,560px)] motion-safe:md:shrink-0">
                  <article className="group flex h-full flex-col">
                    <div data-img-reveal className="overflow-hidden rounded-[var(--img-radius)] bg-peach aspect-[4/3] motion-safe:md:aspect-[5/4] motion-safe:md:max-h-[34svh] motion-safe:md:w-full">
                      <Img image={s.img} alt={`${s.title} before and after, patient of Dr Khalil Ahmad`} loading="eager" sizes="400px" className="h-full w-full" />
                    </div>
                    <div className="relative -mt-14 mx-4 sm:mx-5 flex-1 rounded-[var(--img-radius)] border border-line bg-white p-6 transition-colors duration-300 group-hover:border-gold">
                      <h3 className="text-h3 text-navy">{s.title}</h3>
                      <p className="mt-3 text-muted">{s.text}</p>
                      <a href={whatsappLink(`Hello, I would like to ask about ${s.title.toLowerCase()}.`) ?? '#contact'}
                        {...(whatsappLink() ? { target: '_blank', rel: 'noreferrer' } : {})}
                        className="mt-3 inline-flex min-h-11 items-center font-bold text-gold-ink underline-offset-4 hover:underline">
                        Ask about {s.title.toLowerCase()}
                      </a>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Scroll progress (only shown in horizontal mode) */}
        <div aria-hidden className="mt-10 hidden h-0.5 w-full overflow-hidden rounded bg-line motion-safe:md:block">
          <div data-progress className="h-full w-full origin-left scale-x-0 bg-gold" />
        </div>
      </div>
    </section>
  )
}
