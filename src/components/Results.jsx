import { useEffect, useState } from 'react'
import { Img, SectionHeading } from './ui'
import { results, resultFilters, clinic } from '../data'
import { ScrollTrigger } from '../lib/motion'

/**
 * Before/after gallery of the clinic's own results.
 * Images are shown whole (object-contain), never cropped or distorted.
 * Filters hide tiles in place (no remount), then ScrollTrigger re-measures the page.
 */
export default function Results() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', ...resultFilters]

  useEffect(() => { ScrollTrigger.refresh() }, [filter])

  return (
    <section id="results" className="section-y container-x">
      <SectionHeading label="Results" title="Before and after">
        Real patients of {clinic.name}. Results vary from person to person.
      </SectionHeading>

      <div role="group" aria-label="Filter results by procedure" className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}
            className={`min-h-11 rounded-lg border px-4 font-bold transition-colors duration-150
              ${filter === f ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy hover:border-gold'}`}>
            {f}
          </button>
        ))}
      </div>

      <ul data-img-group className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {results.map((r) => (
          <li key={r.src} hidden={filter !== 'All' && r.procedure !== filter}>
            <figure>
              <div data-img-reveal className="aspect-square overflow-hidden rounded-[var(--img-radius)] border border-line bg-white">
                <Img image={{ src: r.src, fit: 'contain' }} alt={`${r.caption}: before and after, patient of ${clinic.name}`}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="h-full w-full" />
              </div>
              <figcaption className="mt-2 text-meta font-bold text-navy">{r.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
