import { Phone } from 'lucide-react'
import { Img, btn, SocialIcon } from './ui'
import { images, clinic, whatsappLink } from '../data'
import { gsap, ScrollTrigger } from '../lib/motion'

const helpItems = ['breast implants', 'body shaping', 'Botox', 'rhinoplasty']

const navH = () => document.querySelector('[data-site-nav]')?.offsetHeight ?? 80

/**
 * Scroll-bound hero expansion (scale-to-fill / immersive zoom).
 * 1. Headline sits above a rounded photo "card".
 * 2. While the hero is pinned, scrolling grows the card's frame until the photo fills the screen,
 *    the photo zooms out from 1.18 → 1 (never stretched: object-cover keeps its aspect ratio),
 *    the headline lifts away and a caption fades in.
 * Scrubbed to the scrollbar, so it is user-driven and fully reversible.
 * Reduced motion: no pin, the rounded card layout simply stays.
 */
/** Called from useSiteAnimations (after ScrollSmoother exists). */
export function setupHeroExpansion() {
      const section = document.getElementById('home')
      if (!section) return
      const text = section.querySelector('[data-hero-text]')
      const media = section.querySelector('[data-hero-media]')
      const img = media.querySelector('img')
      const caption = section.querySelector('[data-hero-caption]')

      // Rounded card that starts just below the headline.
      const cardClip = () => {
        const w = window.innerWidth
        const side = w < 768 ? 16 : Math.max(32, (w - 1280) / 2 + 32)
        const top = text.offsetTop + text.offsetHeight + (w < 768 ? 20 : 32)
        return `inset(${top}px ${side}px ${w < 768 ? 16 : 32}px ${side}px round 24px)`
      }

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const apply = () => gsap.set(media, { clipPath: cardClip() })
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
          .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1 }, 0)
          .to(text, { y: -60, opacity: 0, duration: 0.35 }, 0)
          .fromTo(caption, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.65)
          .to({}, { duration: 0.15 }) // short hold on the full-screen frame before unpinning
      })
}

export default function Hero() {
  const city = clinic.city.split(',')[0]


  return (
    <>
      <section id="home" className="relative h-[calc(100svh-var(--nav-h))] min-h-[600px] overflow-hidden bg-white">
        {/* Full-bleed photo layer, clipped into a rounded card, then expanded by scroll */}
        <div data-hero-media className="absolute inset-0 overflow-hidden bg-peach">
          <Img image={images.hero} priority sizes="100vw" alt="Patient receiving a cosmetic treatment" className="h-full w-full" />
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

        {/* Caption revealed once the photo fills the screen */}
        {/* autoAlpha keeps it invisible AND unfocusable until revealed */}
        <div data-hero-caption className="invisible absolute inset-x-0 bottom-0 z-10 opacity-0">
          <div className="container-x pb-12 md:pb-20">
            <div className="on-dark max-w-lg rounded-[var(--img-radius)] bg-navy p-6 sm:p-8 text-white">
              <p className="text-h2 font-black">Every plan starts with a conversation.</p>
              <p className="mt-4 text-mist">
                Tell {clinic.name} what you would like to change. You will hear what is realistic, what it costs and
                how recovery goes, before anything is booked.
              </p>
              <a href="#services" className={`${btn.gold} mt-6`}>See all procedures</a>
            </div>
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
                Most people come in with one question. The ones we hear most are about {helpItems.slice(0, -1).join(', ')} and {helpItems.at(-1)}.
              </p>
              <a href="#services" className="mt-4 inline-flex min-h-11 items-center font-bold text-gold-ink underline-offset-4 hover:underline">
                See all procedures
              </a>
            </div>
            <p className="self-center text-h3 font-black text-navy">
              Bring your question. You will leave knowing what is possible for you.
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
