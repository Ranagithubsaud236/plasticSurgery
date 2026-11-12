import { Clock, Phone, MapPin, ArrowUp } from 'lucide-react'
import { Logo, SocialIcon, socials } from './ui'
import { clinic, sections } from '../data'

const linkCls = 'inline-flex min-h-11 items-center hover:text-gold transition-colors'

/**
 * Flat footer: one solid navy surface, no shadows, no fades, no entrance animation.
 * Three columns: who + contact, sitemap, appointment.
 */
export default function Footer() {
  return (
    <footer className="on-dark bg-navy text-mist">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.2fr_1.4fr_1fr] md:py-20">
        {/* Who */}
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs">
            Gynecomastia, rhinoplasty and tummy tuck surgery in {clinic.city}.
          </p>
          <a href={clinic.maps} target="_blank" rel="noreferrer" className="mt-4 flex min-h-11 items-start gap-2 hover:text-gold transition-colors">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden /> {clinic.address}
          </a>
          <p className="flex min-h-11 items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-gold" aria-hidden /> {clinic.hours}
          </p>
        </div>

        {/* Sitemap: every section of this one-page site */}
        <nav aria-label="Sitemap">
          <h2 className="text-meta font-bold uppercase tracking-[0.14em] text-gold">Sitemap</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-2">
            {sections.map(({ id, label }) => (
              <li key={id}><a href={`#${id}`} className={linkCls}>{label}</a></li>
            ))}
          </ul>
        </nav>

        {/* Appointment */}
        <div>
          <h2 className="text-meta font-bold uppercase tracking-[0.14em] text-gold">Appointments</h2>
          <a href={clinic.phoneHref} className="mt-4 flex items-center gap-4 rounded-lg border border-line-dark p-4 transition-colors hover:border-gold">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold text-navy">
              <Phone className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block font-black text-white">Call the clinic</span>
              <span className="block font-bold text-gold">{clinic.phone}</span>
            </span>
          </a>
          <div className="mt-4 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line-dark px-4 font-bold text-white transition-colors hover:border-gold hover:text-gold">
                <SocialIcon name={s.name} /> {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col items-start gap-3 py-6 text-meta sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {clinic.name}, {clinic.specialty}, {clinic.city}</p>
          <a href="#home" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line-dark px-4 transition-colors hover:border-gold hover:text-gold">
            <ArrowUp className="h-4 w-4" aria-hidden /> Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
