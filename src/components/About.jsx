import { Img, SectionHeading, btn } from './ui'
import { images, clinic, logo } from '../data'

// What a visitor can ask about at the first consultation (no unverified claims).
// TODO: add the doctor's real qualifications and hospital affiliations once confirmed.
const features = [
  { title: 'Which technique suits you', text: 'Ask how each option works and why one may fit your case better than another.' },
  { title: 'What it will cost', text: 'Ask for the full cost of the procedure, including follow-up visits.' },
  { title: 'How recovery will go', text: 'Ask about time off work, aftercare and when you will see the result.' },
]

export default function About() {
  const city = clinic.city.split(',')[0]
  return (
    <section id="about" className="section-y container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <SectionHeading label={`About ${clinic.name}`} title="Straight answers before any surgery">
          {/* TODO: add qualifications, hospital affiliations and years of experience */}
          {clinic.name} is a {clinic.specialty.toLowerCase()} in {city}. Your first visit is a conversation: what you
          want, what is realistic, and what recovery will ask of you. Bring these three questions.
        </SectionHeading>

        <ul data-stagger className="mt-8 space-y-6">
          {features.map(({ title, text }) => (
            <li key={title}>
              <div>
                <h3 className="text-h3 text-navy">{title}</h3>
                <p className="mt-1 text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-6">
          <a href="#contact" className={btn.gold}>Book a consultation</a>
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width="32" height="48" className="h-12 w-auto" />
            <div className="leading-tight">
              <p className="font-black text-navy">{clinic.name}</p>
              <p className="text-meta text-muted">{clinic.specialty}</p>
            </div>
          </div>
        </div>
      </div>

      <div data-img-group className="grid grid-cols-2 gap-3 sm:gap-5">
        <div data-img-reveal className="overflow-hidden rounded-[var(--img-radius)] bg-peach aspect-square">
          <Img image={images.about1} sizes="(min-width: 1024px) 25vw, 50vw" alt={`Hair transplant before and after, patient of ${clinic.name}`} className="h-full w-full" />
        </div>
        <div data-img-reveal className="overflow-hidden rounded-[var(--img-radius)] bg-peach aspect-square translate-y-6 sm:translate-y-10">
          <Img image={images.about2} sizes="(min-width: 1024px) 25vw, 50vw" alt={`Split ear repair before and after, patient of ${clinic.name}`} className="h-full w-full" />
        </div>
        <div data-img-reveal className="col-span-2 overflow-hidden rounded-[var(--img-radius)] bg-peach aspect-[16/9] mt-6 sm:mt-10">
          <Img image={images.about3} sizes="(min-width: 1024px) 50vw, 100vw" alt={`Gynecomastia surgery before and after, patient of ${clinic.name}`} className="h-full w-full" />
        </div>
      </div>
    </section>
  )
}
