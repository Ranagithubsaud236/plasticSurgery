import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Img, Label, SocialIcon, btn } from './ui'
import { images, clinic, reviews } from '../data'

const initials = (name) => name.split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase()

/** Big, flat closing-quote mark in peach (decorative). */
function QuoteMark() {
  return (
    <span aria-hidden
      className="pointer-events-none absolute -bottom-16 right-5 hidden select-none font-serif text-[12rem] font-bold leading-none text-peach sm:block">
      ”
    </span>
  )
}

function ReviewCard() {
  const [i, setI] = useState(0)
  const r = reviews[i]
  const go = (d) => setI((n) => (n + d + reviews.length) % reviews.length)

  return (
    <div aria-live="polite" className="relative">
      <blockquote className="relative z-10 italic text-muted">“{r.quote}”</blockquote>
      {r.rating ? (
        <div className="relative z-10 mt-5 flex gap-1" role="img" aria-label={`Rated ${r.rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, n) => (
            <Star key={n} aria-hidden className={`h-4 w-4 ${n < r.rating ? 'fill-gold text-gold' : 'text-line'}`} />
          ))}
        </div>
      ) : null}
      <figcaption className="relative z-10 mt-6 flex items-center gap-3">
        <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-black text-white">
          {initials(r.name)}
        </span>
        <span className="leading-tight">
          <span className="block font-black text-navy">{r.name}</span>
          <span className="block text-meta text-muted">{r.source}</span>
        </span>
      </figcaption>
      {reviews.length > 1 && (
        <div className="relative z-10 mt-6 flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous review"
            className="grid h-11 w-11 place-items-center rounded-lg border border-line text-navy transition-colors hover:border-gold hover:text-gold-ink">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next review"
            className="grid h-11 w-11 place-items-center rounded-lg border border-line text-navy transition-colors hover:border-gold hover:text-gold-ink">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
          <span className="ml-2 text-meta tabular-nums text-muted">{i + 1} / {reviews.length}</span>
        </div>
      )}
    </div>
  )
}

/** Shown until real reviews are added in data.js: sends people to the live, public reviews. */
function ReviewLinks() {
  return (
    <div className="relative z-10">
      <Label>Patient reviews</Label>
      <h2 className="text-h3 text-navy">Read what patients say, in their own words.</h2>
      <p className="mt-3 text-muted">Reviews of {clinic.name} are published on Google Maps and Facebook.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={clinic.maps} target="_blank" rel="noreferrer" className={btn.gold}>Read Google reviews</a>
        <a href={clinic.facebook} target="_blank" rel="noreferrer" className={btn.outline}>
          <SocialIcon name="facebook" /> Facebook page
        </a>
      </div>
    </div>
  )
}

/**
 * Reviews: photo on the left, solid navy panel on the right, and a white card that
 * overlaps both. Phones: photo on top, card overlapping the photo and the navy band.
 * Only real reviews (data.js) are ever shown as quotes.
 */
export default function Testimonial() {
  return (
    <section id="testimonials" aria-label="Patient reviews" className="container-x pb-16 md:pb-24">
      <div className="relative overflow-hidden rounded-[var(--img-radius)] bg-navy md:grid md:min-h-[clamp(460px,38vw,540px)] md:grid-cols-[3fr_1fr]">
        <div data-img-reveal className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] md:aspect-auto">
          <Img image={images.testimonial} sizes="(min-width: 768px) 75vw, 100vw" alt="" className="absolute inset-0 h-full w-full" />
        </div>
        <div aria-hidden className="hidden md:block" />

        <figure data-reveal
          className="relative z-10 mx-4 -mt-16 mb-4 overflow-hidden rounded-[var(--img-radius)] bg-white p-7 sm:mx-8 sm:p-10
            md:absolute md:right-[7%] md:top-1/2 md:m-0 md:w-[min(440px,42%)] md:-translate-y-1/2">
          <QuoteMark />
          {reviews.length ? <ReviewCard /> : <ReviewLinks />}
        </figure>
      </div>
    </section>
  )
}
