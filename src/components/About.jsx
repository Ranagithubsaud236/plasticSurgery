import { Img, SectionHeading, btn } from './ui'
import LiquidImage from './LiquidImage'
import { images, clinic } from '../data'

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
            <Img image={images.doctorAvatar} sizes="48px" alt="" className="h-12 w-12 rounded-full" />
            <div className="leading-tight">
              <p className="font-black text-navy">{clinic.name}</p>
              <p className="text-meta text-muted">{clinic.specialty}</p>
            </div>
          </div>
        </div>
      </div>

      <div data-img-group className="grid grid-cols-2 gap-3 sm:gap-5">
        <div data-img-reveal className="overflow-hidden rounded-[var(--img-radius)] aspect-[3/4]">
          <LiquidImage image={images.about1} sizes="(min-width: 1024px) 25vw, 50vw" alt="Facial treatment in progress" />
        </div>
        <div data-img-reveal className="overflow-hidden rounded-[var(--img-radius)] aspect-[3/4] translate-y-6 sm:translate-y-10">
          <LiquidImage image={images.about2} sizes="(min-width: 1024px) 25vw, 50vw" alt="Clinic specialist" />
        </div>
        <div data-img-reveal className="col-span-2 overflow-hidden rounded-[var(--img-radius)] aspect-[16/7] mt-6 sm:mt-10">
          <LiquidImage image={images.about3} sizes="(min-width: 1024px) 50vw, 100vw" alt="Skin procedure" strength={0.8} />
        </div>
      </div>
    </section>
  )
}
