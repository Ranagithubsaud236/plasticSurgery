import { useState } from 'react'
import { clinic, whatsappLink } from '../data'

const unsplash = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`
const WIDTHS = [480, 768, 1080, 1600]

/**
 * Responsive image.
 *  - `image` is { src, position } from data.js (src = Unsplash id or your own path)
 *  - `sizes` tells the browser how wide the image renders, so it downloads the right file
 *  - `priority` for above-the-fold images (hero)
 * Falls back to a flat peach panel if the photo fails to load.
 */
export function Img({ image, alt = '', className = '', sizes = '100vw', priority = false, ...rest }) {
  const [failed, setFailed] = useState(false)
  const { src, position = 'center' } = image
  if (failed) {
    return <div role="img" aria-label={alt} className={`bg-peach ${className}`} />
  }
  const isUnsplash = src.startsWith('photo-')
  return (
    <img
      src={isUnsplash ? unsplash(src, 1080) : src}
      srcSet={isUnsplash ? WIDTHS.map((w) => `${unsplash(src, w)} ${w}w`).join(', ') : undefined}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
      style={{ objectPosition: position }}
      className={`${image.fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
      {...rest}
    />
  )
}

export function Label({ children, dark = false }) {
  return (
    <p className={`mb-3 flex items-center gap-3 text-meta font-bold uppercase tracking-[0.14em] ${dark ? 'text-gold' : 'text-gold-ink'}`}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  )
}

/** Label + heading + optional intro, used by every section. */
export function SectionHeading({ label, title, children, center = false, className = '' }) {
  return (
    <div data-reveal className={`${center ? 'mx-auto text-center [&>p:first-child]:justify-center' : ''} max-w-2xl ${className}`}>
      <Label>{label}</Label>
      <h2 className="text-h2 text-navy">{title}</h2>
      {children && <p className="mt-4 text-muted">{children}</p>}
    </div>
  )
}

const btnBase =
  'inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg px-6 text-[0.9375rem] font-bold transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97]'

export const btn = {
  dark: `${btnBase} bg-navy text-white hover:bg-gold hover:text-navy`,
  gold: `${btnBase} bg-gold text-navy hover:bg-navy hover:text-white`,
  outline: `${btnBase} border-2 border-navy text-navy hover:bg-navy hover:text-white`,
  whatsapp: `${btnBase} bg-whatsapp text-white hover:bg-navy`,
}

export function Logo({ light = false }) {
  return (
    <a href="#home" className="flex min-h-11 items-center gap-2.5" aria-label={`${clinic.name}, home`}>
      <svg viewBox="0 0 32 40" className="h-9 w-7 shrink-0" aria-hidden>
        <path d="M16 2C9 12 4 18 4 26a12 12 0 0 0 24 0C28 18 23 12 16 2Z" fill="#e3a34f" />
        <path d="M16 12c-4 6-6 10-6 14a6 6 0 0 0 12 0c0-4-2-8-6-14Z" fill={light ? '#1d1a2b' : '#fff'} />
      </svg>
      <span className="leading-none">
        <span className={`block text-lg sm:text-xl font-black tracking-tight ${light ? 'text-white' : 'text-navy'}`}>{clinic.name}</span>
        <span className={`mt-1 block text-[0.6875rem] font-bold uppercase tracking-[0.2em] ${light ? 'text-gold' : 'text-gold-ink'}`}>
          {clinic.specialty}
        </span>
      </span>
    </a>
  )
}

const paths = {
  facebook: 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1Z',
  whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z',
}

export function SocialIcon({ name, className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d={paths[name]} />
    </svg>
  )
}

/** Only real, verified profiles are listed. WhatsApp appears automatically once a number is set in data.js. */
export const socials = [
  { name: 'facebook', label: 'Facebook', href: clinic.facebook },
  ...(whatsappLink() ? [{ name: 'whatsapp', label: 'WhatsApp', href: whatsappLink() }] : []),
]
