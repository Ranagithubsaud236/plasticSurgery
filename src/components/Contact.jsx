import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { SectionHeading, SocialIcon, btn } from './ui'
import { clinic, whatsappLink } from '../data'

const items = [
  { icon: MapPin, title: 'Where to find us', value: clinic.address, href: clinic.maps, external: true },
  { icon: Phone, title: 'Phone', value: clinic.phone, href: clinic.phoneHref },
  { icon: Clock, title: 'Opening hours', value: clinic.hours },
]

export default function Contact() {
  return (
    <section id="contact" className="section-y bg-peach">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <SectionHeading label="Contact" title={`Book a consultation with ${clinic.name}`}>
            Call, or send a message. Say which procedure you are curious about and when is a good time to reach you.
          </SectionHeading>

          <ul data-stagger className="mt-10 space-y-6">
            {items.map(({ icon: Icon, title, value, href, external }) => (
              <li key={title} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold text-navy">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-h3 text-navy">{title}</h3>
                  {href ? (
                    <a href={href} target={external ? '_blank' : undefined} rel="noreferrer"
                      className="inline-flex min-h-11 items-center text-muted underline-offset-4 hover:text-gold-ink hover:underline">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-muted">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {whatsappLink() && (
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className={btn.whatsapp}>
                <SocialIcon name="whatsapp" className="h-5 w-5" /> Message on WhatsApp
              </a>
            )}
            <a href={clinic.facebook} target="_blank" rel="noreferrer" className={btn.dark}>
              <SocialIcon name="facebook" /> Message on Facebook
            </a>
            <a href={clinic.maps} target="_blank" rel="noreferrer" className={btn.outline}>
              Get Directions <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <div data-reveal className="overflow-hidden rounded-[var(--img-radius)] border border-line bg-white">
          <iframe
            title={`${clinic.name} location on Google Maps`}
            src={clinic.mapEmbed}
            className="block h-[clamp(320px,45vw,480px)] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
