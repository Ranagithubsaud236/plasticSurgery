import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo, btn, SocialIcon } from './ui'
import { sections, clinic, whatsappLink } from '../data'
import { gsap, useGSAP, sectionY } from '../lib/motion'

const SPY_LINE = 140 // px from top: a section is "current" once its top passes this line

/** Tracks which section is in view so the matching tab is highlighted. */
function useActiveSection() {
  const [active, setActive] = useState(sections[0].id)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let current = sections[0].id
      for (const { id } of sections) {
        const el = document.getElementById(id)
        // Use the real scroll position (not the smoothed, lagging transform).
        if (el && sectionY(el) - window.scrollY <= SPY_LINE) current = id
      }
      const doc = document.documentElement
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) current = sections[sections.length - 1].id
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return active
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const menuRef = useRef(null)
  const listRef = useRef(null)
  const indicatorRef = useRef(null)

  // Slide the gold underline to the active tab.
  useGSAP(() => {
    const link = listRef.current?.querySelector(`[data-tab="${active}"]`)
    if (!link || !indicatorRef.current) return
    gsap.to(indicatorRef.current, { x: link.offsetLeft, width: link.offsetWidth, duration: 0.25, ease: 'power2.out' })
  }, { dependencies: [active] })

  // Animate the mobile menu open.
  useGSAP(() => {
    if (open && menuRef.current) {
      gsap.from(menuRef.current.querySelectorAll('li'), { y: -8, opacity: 0, duration: 0.25, stagger: 0.03, ease: 'power2.out' })
    }
  }, { dependencies: [open] })

  // Close the menu with Escape or when switching to desktop.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => { window.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq) }
  }, [])

  const color = (id) => (active === id ? 'text-gold-ink' : 'text-navy hover:text-gold-ink')

  return (
    <div data-site-nav className="border-b border-line bg-white">
      <nav aria-label="Main" className="container-x flex h-16 lg:h-20 items-center justify-between gap-6">
        <Logo />

        <ul ref={listRef} className="relative hidden lg:flex items-center gap-1 xl:gap-2 text-[0.9375rem] font-bold">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} data-tab={id} aria-current={active === id ? 'location' : undefined}
                className={`flex min-h-11 items-center px-2.5 xl:px-3 transition-colors ${color(id)}`}>
                {label}
              </a>
            </li>
          ))}
          <span ref={indicatorRef} aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 rounded bg-gold" />
        </ul>

        <div className="hidden xl:block shrink-0">
          <a href="#contact" className={`${btn.dark} min-h-11 px-6`}>Book a consultation</a>
        </div>

        <button
          type="button"
          className="lg:hidden grid h-11 w-11 place-items-center rounded-lg text-navy hover:bg-peach transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="lg:hidden border-t border-line max-h-[calc(100dvh-var(--header-h))] overflow-y-auto">
          <ul className="container-x grid grid-cols-2 gap-x-4 py-3 text-body font-bold">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined}
                  className={`flex min-h-12 items-center ${color(id)}`}>
                  {label}
                </a>
              </li>
            ))}
            <li className="col-span-2 grid gap-3 py-3">
              {whatsappLink() && (
                <a href={whatsappLink()} target="_blank" rel="noreferrer" className={`${btn.whatsapp} w-full`}>
                  <SocialIcon name="whatsapp" className="h-5 w-5" /> Message on WhatsApp
                </a>
              )}
              <a href={clinic.phoneHref} className={`${btn.dark} w-full`}>Call {clinic.phone}</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
