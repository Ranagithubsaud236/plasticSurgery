import { useRef, useState } from 'react'
import { Img } from './ui'
import { treatments } from '../data'

/**
 * Full-width treatment showcase (matches the reference design).
 * The photo fills the band; four full-height columns sit on top of it, separated by thin
 * solid divider lines, with each treatment name centred at the top of its column.
 * Hover (desktop) or tap/click a column to switch the photo. Arrow keys move between tabs.
 * No tint over the photo: labels stay readable with a crisp 1px navy edge (not a blur/glow).
 */
export default function TreatmentTabs() {
  const [active, setActive] = useState(0)
  const tabs = useRef([])

  const onKeyDown = (e) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!dir) return
    e.preventDefault()
    const next = (active + dir + treatments.length) % treatments.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="treatments" aria-label="Treatments" className="on-dark relative overflow-hidden bg-navy">
      <div data-img-reveal className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] md:aspect-[21/8]">
        {treatments.map((t, i) => (
          <div key={t.title} id={`treatment-panel-${i}`} role="tabpanel" aria-labelledby={`treatment-tab-${i}`} aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-300 ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}>
            <Img image={t.img} alt={t.title} sizes="100vw" loading="eager" className="h-full w-full" />
          </div>
        ))}

        {/* Columns over the photo: names at the top, thin solid dividers between */}
        <div role="tablist" aria-label="Choose a treatment" onKeyDown={onKeyDown} className="absolute inset-0 grid grid-cols-4">
          {treatments.map((t, i) => (
            <button
              key={t.title}
              ref={(el) => (tabs.current[i] = el)}
              id={`treatment-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`treatment-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group relative flex h-full items-start justify-center border-line px-1 pt-6 text-center not-last:border-r sm:px-3 sm:pt-10 md:pt-12"
            >
              <span className="relative inline-block pb-2 text-[0.8125rem] font-black leading-tight text-white [text-shadow:0_1px_0_#1d1a2b,1px_0_0_#1d1a2b,-1px_0_0_#1d1a2b,0_-1px_0_#1d1a2b] sm:text-base md:text-h3">
                {t.title}
                <span aria-hidden
                  className={`absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gold transition-transform duration-300 ease-out ${i === active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
