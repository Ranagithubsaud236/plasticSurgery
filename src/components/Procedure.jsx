import { Img, SectionHeading } from './ui'
import { images, clinic, steps } from '../data'


export default function Procedure() {
  return (
    <section id="procedure" className="section-y container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
      <div data-img-reveal className="overflow-hidden rounded-[var(--img-radius)] bg-peach aspect-square w-full">
        <Img image={images.doctor} sizes="(min-width: 1024px) 50vw, 100vw" alt={`Rhinoplasty before and after, patient of ${clinic.name}`} className="h-full w-full" />
      </div>
        <div className="mt-4 rounded-[var(--img-radius)] border border-line bg-white p-5 sm:p-6">
          <p className="text-h3 font-black text-navy">Want to know the cost first?</p>
          <p className="mt-1 text-muted">You get a full estimate at the consultation.</p>
          <a href="#contact" className="mt-2 inline-flex min-h-11 items-center font-bold text-gold-ink underline-offset-4 hover:underline">
            Book a consultation
          </a>
        </div>
      </div>

      <div>
        <SectionHeading label="How it works" title="From first visit to recovery" />
        <ol data-stagger className="mt-10 space-y-7">
          {steps.map(({ title, text }, i) => {
            return (
              <li key={title} className="flex gap-5">
                <span aria-hidden className="w-6 shrink-0 pt-0.5 text-h3 font-black tabular-nums text-gold-ink">{i + 1}.</span>
                <div>
                  <h3 className="text-h3 text-navy">
                    <span className="sr-only">Step {i + 1}: </span>{title}
                  </h3>
                  <p className="mt-1 text-muted">{text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
