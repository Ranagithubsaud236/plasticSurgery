import { Phone } from 'lucide-react'
import { btn, SocialIcon } from './ui'
import { clinic, whatsappLink, services, logo } from '../data'
import { gsap, ScrollTrigger } from '../lib/motion'

const helpItems = services.map((s) => s.title.split(' /')[0].toLowerCase())

const navH = () => document.querySelector('[data-site-nav]')?.offsetHeight ?? 80

/**
 * Scroll-bound hero expansion: a rounded navy card under the headline holds the list of
 * procedures; while the hero is pinned, scrolling grows the card to fill the screen and the
 * headline lifts away. Scrubbed, so it is reversible. Reduced motion: the card simply stays.
 */
/** Called from useSiteAnimations (after ScrollSmoother exists). */
export function setupHeroExpansion() {
      const section = document.getElementById('home')
      if (!section) return
      const text = section.querySelector('[data-hero-text]')
      const media = section.querySelector('[data-hero-media]')
      const content = media.querySelector('[data-hero-content]')

      // Rounded card that starts just below the headline. The content is centred in the full
      // section, so it is pushed down to sit in the middle of the card, then glides back.
      const faceShift = () => Math.round((text.offsetTop + text.offsetHeight) * 0.5)

      const cardClip = () => {
        const w = window.innerWidth
        const side = w < 768 ? 16 : Math.max(32, (w - 1280) / 2 + 32)
        const top = text.offsetTop + text.offsetHeight + (w < 768 ? 20 : 32)
        return `inset(${top}px ${side}px ${w < 768 ? 16 : 32}px ${side}px round 24px)`
      }

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const apply = () => { gsap.set(media, { clipPath: cardClip() }); gsap.set(content, { y: faceShift() }) }
        apply()
        ScrollTrigger.addEventListener('refreshInit', apply)
        window.addEventListener('resize', apply)
        return () => {
          ScrollTrigger.removeEventListener('refreshInit', apply)
          window.removeEventListener('resize', apply)
        }
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: () => `top ${navH()}px`,
            end: '+=120%',
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo(media, { clipPath: cardClip }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1 }, 0)
          .fromTo(content, { scale: 0.92, y: faceShift }, { scale: 1, y: 0, duration: 1 }, 0)
          .to(text, { y: -60, opacity: 0, duration: 0.35 }, 0)
          .to({}, { duration: 0.15 }) // short hold on the full-screen frame before unpinning
      })
}

export default function Hero() {
  const city = clinic.city.split(',')[0]


  return (
    <>
      <section id="home" className="relative h-[calc(100svh-var(--nav-h))] min-h-[600px] overflow-hidden bg-white">
        {/* Full-bleed navy layer, clipped into a rounded card, then expanded by scroll */}
        <div data-hero-media className="on-dark absolute inset-0 grid place-items-center overflow-hidden bg-navy text-white">
          <div data-hero-content className="container-x text-center">
            <img src={logo} alt="" width="37" height="56" className="mx-auto mb-4 h-12 w-auto sm:h-14" />
            <p className="text-meta font-bold uppercase tracking-[0.14em] text-gold">Procedures offered</p>
            <ul className="mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-2 sm:mt-6 sm:gap-y-4 md:grid-cols-3">
              {services.map((s) => (
                <li key={s.title} className="text-[0.9375rem] font-black leading-snug sm:text-h3">{s.title}</li>
              ))}
            </ul>
            <a href="#services" className={`${btn.gold} mt-5 sm:mt-8`}>See all procedures</a>
          </div>
        </div>

        {/* Headline (above the card) */}
        <div data-hero-text className="container-x relative z-10 pt-8 md:pt-12 text-center">
          <p data-hero-fade className="mb-4 text-meta font-bold uppercase tracking-[0.14em] text-gold-ink">
            {clinic.name}, {clinic.specialty}
          </p>
          <h1 data-hero-title className="mx-auto max-w-4xl text-display text-navy">
            Plastic and reconstructive surgery in {city}
          </h1>
          <div data-hero-fade className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className={btn.dark}>Book a consultation</a>
            <a href={clinic.facebook} target="_blank" rel="noreferrer" className={btn.outline}>
              <SocialIcon name="facebook" /> Follow on Facebook
            </a>
          </div>
        </div>

      </section>

      {/* Quick help + consultation cards */}
      <div className="container-x relative z-10 mt-10 md:mt-14">
        <div data-stagger className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
          <div className="grid gap-6 rounded-[var(--img-radius)] border border-line bg-white p-6 sm:p-8 sm:grid-cols-2">
            <div>
              <h2 className="text-h3 text-navy">Not sure where to start?</h2>
              <p className="mt-3 text-muted">
                The clinic offers {helpItems.slice(0, -1).join(', ')} and {helpItems.at(-1)}. Bring your question to a consultation.
              </p>
              <a href="#services" className="mt-4 inline-flex min-h-11 items-center font-bold text-gold-ink underline-offset-4 hover:underline">
                See all procedures
              </a>
            </div>
            <p className="self-center text-h3 font-black text-navy">
              Every plan starts with a conversation about what is realistic for you.
            </p>
          </div>
          <div className="on-dark flex flex-col justify-center rounded-[var(--img-radius)] bg-navy p-6 sm:p-8 text-white">
            <h2 className="text-h3">Talk to the clinic</h2>
            <p className="mt-3 text-mist">Call to book a one-to-one consultation with {clinic.name}.</p>
            <a href={clinic.phoneHref} className="group mt-6 flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold text-navy">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-h3 font-black">{clinic.phone}</span>
            </a>
            {whatsappLink() && (
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className={`${btn.whatsapp} mt-5 self-start`}>
                <SocialIcon name="whatsapp" className="h-5 w-5" /> Or message on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
