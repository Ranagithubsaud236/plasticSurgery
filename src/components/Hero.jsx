import { Phone } from 'lucide-react'
import { Img, btn, SocialIcon } from './ui'
import { images, clinic, whatsappLink, services } from '../data'
import { gsap, ScrollTrigger } from '../lib/motion'

const helpItems = services.map((s) => s.title.split(' /')[0].toLowerCase())

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

      // The photo is sized like CSS "cover" for the whole hero (no empty bars anywhere), with the
      // head kept in frame. It starts as a portrait card under the headline in which the WHOLE
      // photo is visible, then the card and photo grow together until the photo covers the hero.
      const ratio = () => (img.naturalWidth || 1704) / (img.naturalHeight || 1696)
      // ONE photo. Expanded: it stands at the right edge at (just over) full height, and the rest of
      // the hero is a flat colour matched to the wooden door at the photo's left edge, so it reads as
      // one continuous wall. The bottom 17% (where his shirt touches the photo edge) sits just below
      // the fold so the seam is wood on wood. On narrow screens it simply covers, centred on him.
      const SHOW = 0.83
      const layout = () => {
        const W = section.clientWidth, H = section.clientHeight, r = ratio()
        // Wide screens: wall extension (bottom strip below the fold). Narrow screens: plain cover.
        const wide = (H / SHOW) * r < W
        const rh = wide ? H / SHOW : Math.max(H, W / r), rw = rh * r
        const left = rw >= W ? (W - rw) / 2 : W - rw
        gsap.set(img, { width: rw, height: rh, left, top: 0 })
        return { W, H, rw, rh, left }
      }
      const card = () => {
        const { W, H, rw, rh, left } = layout()
        const w = window.innerWidth
        const cardTop = text.offsetTop + text.offsetHeight + (w < 768 ? 20 : 32)
        const cardBottom = w < 768 ? 16 : 32
        const cardH = H - cardTop - cardBottom
        const cardW = Math.min(W - (w < 768 ? 32 : 64), cardH * ratio())
        const side = (W - cardW) / 2
        return {
          clip: `inset(${cardTop}px ${side}px ${cardBottom}px ${side}px round 24px)`,
          scale: Math.max(cardW / rw, cardH / rh), // the whole photo fills the card
          x: W / 2 - (left + rw / 2),
          y: cardTop + cardH / 2 - rh / 2,
        }
      }

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const apply = () => { const c = card(); gsap.set(media, { clipPath: c.clip }); gsap.set(img, { scale: c.scale, x: c.x, y: c.y }) }
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
        tl.fromTo(media, { clipPath: () => card().clip }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1 }, 0)
          .fromTo(img, { scale: () => card().scale, x: () => card().x, y: () => card().y }, { scale: 1, x: 0, y: 0, duration: 1 }, 0)
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
        <div data-hero-media className="absolute inset-0 overflow-hidden bg-[#51200c]">
          <Img image={images.hero} priority sizes="100vw" alt="Dr Khalil Ahmad, plastic surgeon"
            onLoad={() => ScrollTrigger.refresh()} className="absolute max-w-none origin-center" />
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