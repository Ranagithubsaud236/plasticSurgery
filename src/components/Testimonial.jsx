import { useLayoutEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'
import { SectionHeading, SocialIcon, btn } from './ui'
import { clinic, reviews, reviewSummary } from '../data'

const initials = (name) => name.replace(/[^\p{L}\s]/gu, '').split(/\s+/).filter(Boolean).map((p) => p[0]).join('').slice(0, 2).toUpperCase()

/** Official Google "G" mark (flat brand colours). */
function GoogleG({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

function Stars({ rating, className = 'h-4 w-4' }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, n) => (
        <Star key={n} aria-hidden className={`${className} ${n < Math.round(rating) ? 'fill-gold text-gold' : 'text-line'}`} />
      ))}
    </span>
  )
}

function ReviewCard({ r }) {
  const [open, setOpen] = useState(false)
  const [long, setLong] = useState(false)
  const textRef = useRef(null)
  // Show "Read more" only when the 5-line clamp actually hides text.
  useLayoutEffect(() => {
    const el = textRef.current
    const check = () => { if (!open) setLong(el.scrollHeight > el.clientHeight + 2) }
    check()
    const ro = new ResizeObserver(check); ro.observe(el)
    document.fonts?.ready.then(check) // web font changes line breaks
    window.addEventListener('resize', check)
    return () => { ro.disconnect(); window.removeEventListener('resize', check) }
  }, [open])
  return (
    <figure className="flex h-full flex-col rounded-[var(--img-radius)] border border-line bg-white p-5 sm:p-6">
      <figcaption className="flex items-start gap-3">
        <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-peach font-black text-gold-ink">
          {initials(r.name)}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate font-black text-navy">{r.name}</span>
          <span className="block text-meta text-muted">{r.date}</span>
        </span>
        <GoogleG />
      </figcaption>
      <div className="mt-3"><Stars rating={r.rating} /></div>
      <blockquote ref={textRef} className={`mt-3 whitespace-pre-line text-[0.9375rem] leading-relaxed text-muted ${open ? '' : 'line-clamp-5'}`}>
        {r.quote}
      </blockquote>
      {(long || open) && (
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
          className="mt-1 inline-flex min-h-11 items-center self-start text-meta font-bold text-gold-ink underline-offset-4 hover:underline">
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </figure>
  )
}

/**
 * Patient reviews: real Google reviews of the clinic (copied word for word, see data.js),
 * a rating summary badge, and links to the full list on Google Maps and Facebook.
 */
export default function Testimonial() {
  return (
    <section id="testimonials" aria-label="Patient reviews" className="section-y bg-peach">
      <div className="container-x">
        <SectionHeading center label="Google reviews" title="What our patients say" />

        <a href={clinic.maps} target="_blank" rel="noreferrer" data-reveal
          className="mx-auto mt-8 flex w-fit max-w-full items-center gap-4 rounded-[var(--img-radius)] border border-line bg-white px-5 py-4 transition-colors hover:border-gold">
          <GoogleG className="h-9 w-9 shrink-0" />
          <span className="leading-tight">
            <span className="block font-black text-navy">{clinic.name}, {clinic.specialty}</span>
            <span className="mt-1 flex flex-wrap items-center gap-x-2">
              <span className="text-h3 font-black text-navy">{reviewSummary.rating.toFixed(1)}</span>
              <Stars rating={reviewSummary.rating} />
              <span className="text-meta text-muted">{reviewSummary.count} Google reviews</span>
            </span>
          </span>
        </a>

        <ul data-stagger className="mt-10 grid items-start gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.name}><ReviewCard r={r} /></li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href={clinic.maps} target="_blank" rel="noreferrer" className={btn.gold}>
            See all {reviewSummary.count} reviews on Google
          </a>
          <a href={clinic.facebook} target="_blank" rel="noreferrer" className={btn.outline}>
            <SocialIcon name="facebook" /> Facebook page
          </a>
        </div>
        <p className="mt-4 text-center text-meta text-muted">
          Reviews shown as published on Google, captured {reviewSummary.capturedOn}.
        </p>
      </div>
    </section>
  )
}
