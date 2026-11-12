import { useEffect } from 'react'
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP, scrollToSection } from '../lib/motion'

/**
 * Wraps the page in GSAP ScrollSmoother (desktop, motion allowed).
 * Touch devices keep native scrolling; reduced-motion users get no smoothing.
 * Also intercepts every in-page "#section" link so tabs scroll smoothly.
 */
export default function SmoothScroll({ children }) {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.1,
        effects: true,
        smoothTouch: false,
      })
      return () => smoother.kill()
    })
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  })

  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href').slice(1)
      if (!id || !document.getElementById(id)) return
      e.preventDefault()
      scrollToSection(id)
    }
    document.addEventListener('click', onClick)

    // Deep link support: /#services opens at that section.
    const initial = window.location.hash.slice(1)
    if (initial) setTimeout(() => scrollToSection(initial), 300)

    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
