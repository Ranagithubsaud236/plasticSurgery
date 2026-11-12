import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, useGSAP)

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Height of the sticky nav bar (the top bar collapses once you scroll). */
const navHeight = () => document.querySelector('[data-site-nav]')?.offsetHeight ?? 80

/** Absolute Y of an element inside the page, independent of ScrollSmoother's transform. */
export function sectionY(el) {
  // Pinned sections are wrapped in a GSAP pin-spacer; measure that, it never moves while pinned.
  if (el.parentElement?.classList.contains('pin-spacer')) el = el.parentElement
  const content = document.getElementById('smooth-content') ?? document.body
  return el.getBoundingClientRect().top - content.getBoundingClientRect().top
}

/** Smoothly scroll to a section id, landing it just below the fixed nav. */
export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return
  const y = id === 'home' ? 0 : Math.max(0, sectionY(target) - navHeight())
  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(y, true)
  } else {
    gsap.to(window, { duration: prefersReducedMotion() ? 0 : 1, ease: 'power3.inOut', scrollTo: { y, autoKill: true } })
  }
  history.replaceState(null, '', `#${id}`)
  // Move keyboard focus to the section for screen-reader/keyboard users.
  // (Skipped with ScrollSmoother: it auto-scrolls focused elements, which would override our offset.)
  if (!smoother) {
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }
}
