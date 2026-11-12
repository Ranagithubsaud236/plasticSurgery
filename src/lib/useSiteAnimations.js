import { gsap, SplitText, ScrollTrigger, useGSAP } from './motion'
import { setupHeroExpansion } from '../components/Hero'
import { setupHorizontalServices, getServicesHorizontal } from '../components/Services'

/**
 * Declarative scroll animations. Add these attributes to any element:
 *   data-reveal            fade + rise when scrolled into view
 *   data-stagger           children fade + rise one after another (50ms apart)
 *   data-count="1452"      number counts up from 0
 *   data-img-reveal        image wrapper is wiped open bottom-to-top while the photo settles from 1.25x zoom
 *   data-img-group         wraps several [data-img-reveal]; they reveal one after another (0.15s apart)
 *   data-hero-title / data-hero-fade   hero intro (the scroll expansion lives in Hero.jsx)
 * Everything is skipped when the user prefers reduced motion.
 * Text uses one entrance style (short fade + 24px rise); images use the clip-path wipe.
 * Nothing loops or floats; everything plays once.
 */
export default function useSiteAnimations(scope) {
  useGSAP(
    () => {
      // Pinned sections first, in page order, so later triggers account for their pin spacing.
      setupHeroExpansion()
      setupHorizontalServices()

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const ease = 'power3.out'

        // ---- Hero intro
        const title = document.querySelector('[data-hero-title]')
        if (title) {
          SplitText.create(title, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) => gsap.from(self.lines, { yPercent: 105, duration: 0.9, stagger: 0.08, ease, delay: 0.1 }),
          })
        }
        gsap.from('[data-hero-fade]', { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease, delay: 0.45 })

        // ---- Single reveals (batched: one observer for all, items entering together stagger 80ms)
        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          once: true,
          onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease, stagger: 0.08, clearProps: 'transform' }),
        })
        gsap.set('[data-reveal]', { autoAlpha: 0 })

        // ---- Staggered groups (cards, lists)
        gsap.utils.toArray('[data-stagger]').forEach((group) => {
          gsap.from(group.children, {
            y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.05, ease, clearProps: 'transform',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          })
        })

        // ---- Staggered image reveal (ScrollTrigger)
        const WIPE_FROM = 'inset(100% 0% 0% 0%)'
        const WIPE_TO = 'inset(0% 0% 0% 0%)'
        const revealTween = (tl, el, at) => {
          tl.fromTo(el, { clipPath: WIPE_FROM }, { clipPath: WIPE_TO, duration: 1.1, ease: 'expo.out', clearProps: 'clipPath' }, at)
          const imgs = el.querySelectorAll('img')
          if (imgs.length) tl.fromTo(imgs, { scale: 1.25 }, { scale: 1, duration: 1.5, ease: 'expo.out', clearProps: 'transform' }, at)
        }
        const servicesTl = getServicesHorizontal()
        const servicesTrack = document.querySelector('#services [data-track]')

        gsap.utils.toArray('[data-img-group]').forEach((group) => {
          const items = gsap.utils.toArray(group.querySelectorAll('[data-img-reveal]'))
          if (group === servicesTrack && servicesTl) {
            // Horizontal mode: each card reveals as it slides in from the right.
            items.forEach((el) => {
              const tl = gsap.timeline({ scrollTrigger: { trigger: el, containerAnimation: servicesTl, start: 'left 92%', once: true } })
              revealTween(tl, el, 0)
            })
            return
          }
          const tl = gsap.timeline({ scrollTrigger: { trigger: group, start: 'top 82%', once: true } })
          items.forEach((el, i) => revealTween(tl, el, i * 0.15))
        })
        gsap.utils.toArray('[data-img-reveal]').forEach((el) => {
          if (el.closest('[data-img-group]')) return
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
          revealTween(tl, el, 0)
        })

        // ---- Counters
        gsap.utils.toArray('[data-count]').forEach((el) => {
          const end = Number(el.dataset.count)
          const obj = { v: 0 }
          gsap.to(obj, {
            v: end, duration: 1.6, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US') },
          })
          el.textContent = '0'
        })
      })
      // Reduced motion, tier 2: no movement, no zoom, no pins; just a short (<=200ms) fade-in.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        ScrollTrigger.batch('[data-reveal], [data-img-reveal], [data-stagger] > *', {
          start: 'top 92%',
          once: true,
          onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'none' }),
        })
      })

      ScrollTrigger.sort()
      ScrollTrigger.refresh()
      // Web fonts change line breaks and heights: re-measure once they are in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    },
    { scope }
  )
}
