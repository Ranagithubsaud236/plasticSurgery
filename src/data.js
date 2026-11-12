/* ------------------------------------------------------------------
 * CLINIC DETAILS: edit everything about the doctor here.
 * Confirmed from the Facebook page title + Google Maps link:
 *   name, specialty, city, map location, Facebook URL.
 * Fields marked TODO could NOT be read from those pages (they require
 * a logged-in browser). Replace them with the real details.
 * ------------------------------------------------------------------ */
export const clinic = {
  name: 'Dr Khalil Ahmad',
  specialty: 'Plastic Surgeon',
  city: 'Lahore, Pakistan',
  address: 'Lahore, Punjab, Pakistan', // TODO: full street address
  phone: '+92 335 6596730',
  phoneHref: 'tel:+923356596730',
  // WhatsApp: international format, digits only, e.g. '923001234567'. Leave '' to hide every
  // WhatsApp button (we never link to an unverified number).
  whatsapp: '923356596730',
  whatsappGreeting: 'Hello Dr Khalil Ahmad, I would like to book a consultation.',
  hours: 'Mon - Sat, by appointment', // TODO: real clinic hours
  facebook: 'https://www.facebook.com/profile.php?id=61571782904298',
  maps:
    'https://www.google.com/maps/place/Dr.+Khalil+Ahmad/@31.4816384,74.2990127,17z/data=!4m6!3m5!1s0x39190355db2f3323:0x864dc81431456b53!8m2!3d31.4816384!4d74.2990127!16s%2Fg%2F11wxv910sr',
  mapEmbed: 'https://maps.google.com/maps?q=31.4816384,74.2990127&z=16&output=embed',
  siteUrl: 'https://www.example.com', // TODO: your domain (also update public/sitemap.xml)
}

/** wa.me link with a prefilled message, or null when no WhatsApp number is set. */
export const whatsappLink = (message = clinic.whatsappGreeting) =>
  clinic.whatsapp ? `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}` : null

/* Single-page sections. Drives the header tabs, scroll-spy and the footer sitemap. */
export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'treatments', label: 'Treatments' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

/* ------------------------------------------------------------------
 * IMAGES: fully adjustable.
 *   src:      an Unsplash id ('photo-…') OR your own file, e.g. '/images/hero.jpg'
 *             (put your own files in /public/images).
 *   position: focal point kept in frame when the photo is cropped,
 *             e.g. 'center', 'top', '50% 30%', 'right center'.
 * ------------------------------------------------------------------ */
export const images = {
  hero: { src: 'photo-1570172619644-dfd03ed5d881', position: '60% 30%' },
  about1: { src: 'photo-1616394584738-fc6e612e71b9', position: 'center' },
  about2: { src: 'photo-1594824476967-48c8b964273f', position: 'center top' },
  about3: { src: 'photo-1512290923902-8a9f81dc236c', position: 'center' },
  doctorAvatar: { src: 'photo-1612349317150-e413f6a5b16d', position: 'center 20%' }, // TODO: real photo of the doctor
  doctor: { src: 'photo-1612349317150-e413f6a5b16d', position: 'center 25%' },
  testimonial: { src: '/images/review-facial.png', position: 'center 30%' }, // half-mask facial photo supplied by the client
  reviewer: { src: 'photo-1438761681033-6461ffad8d80', position: 'center' },
}

export const services = [
  { title: 'Rhinoplasty', text: 'Reshape and refine the nose for balance and easier breathing.', img: { src: 'photo-1522337360788-8b13dee7a37e', position: 'center' } },
  { title: 'Botox Injection', text: 'Soften lines and wrinkles with a quick, non-surgical treatment.', img: { src: 'photo-1570172619644-dfd03ed5d881', position: '60% 30%' } },
  { title: 'Breast Implant', text: 'Augmentation and reconstruction planned around your body.', img: { src: 'photo-1551601651-2a8555f1a136', position: 'center' } },
  { title: 'Facelift', text: 'Lift sagging skin for a natural, refreshed appearance.', img: { src: 'photo-1487412947147-5cebf100ffc2', position: 'center 30%' } },
  { title: 'Body Shaping', text: 'Liposuction and contouring to define your silhouette.', img: { src: 'photo-1519824145371-296894a0daa9', position: 'center' } },
  { title: 'Buttocks Reshape', text: 'Enhance shape and proportion with tailored techniques.', img: { src: 'photo-1544161515-4ab6ce6db874', position: 'center' } },
]

/* Tab selected when the page opens (must match one of the titles below). */
export const defaultTreatment = 'Rejuvenation'

// Treatment banner photos (free Unsplash licence). Swap for the clinic's own photos any time.
export const treatments = [
  { title: 'Botox Injection', img: { src: 'photo-1746708810803-722593e53772', position: 'center 30%' } }, // forehead injection, Mina Rad
  { title: 'Body Shaping', img: { src: 'photo-1761819922058-d15028ed9817', position: 'center 55%' } }, // cavitation device on abdomen, Patient Perfect
  { title: 'Breast Injection', img: { src: 'photo-1644613569194-bd66cf476414', position: 'center' } }, // silicone implant in gloved hands, Philippe Spitalier
  { title: 'Rejuvenation', img: { src: 'photo-1713085085470-fba013d67e65', position: 'center 40%' } }, // hydrafacial treatment, Look Studio
]

export const steps = [
  { title: 'Book a consultation', text: 'Call the clinic or message the Facebook page to pick a time.' },
  { title: 'Talk it through with the doctor', text: 'Your goals, the options, the risks and the expected recovery, in person.' },
  { title: 'Health check', text: 'Tests confirm the procedure is safe for you before a date is set.' },
  { title: 'Procedure and follow-up', text: 'Check-up visits continue until you have healed.' },
]

export const posts = [
  { title: 'Illegal Injections: Risks and Warnings You Must Know', tag: 'Safety', img: { src: 'photo-1616394584738-fc6e612e71b9', position: 'center' } },
  { title: 'Why Cosmetic Surgery Keeps Growing in Popularity', tag: 'Insights', img: { src: 'photo-1579684385127-1ef15d508118', position: 'center' } },
  { title: '10 Things You Must Know About Plastic Surgery', tag: 'Guide', img: { src: 'photo-1512290923902-8a9f81dc236c', position: 'center' } },
  { title: 'Breast Implants: Choosing the Right Option', tag: 'Guide', img: { src: 'photo-1551601651-2a8555f1a136', position: 'center' } },
]

/* ------------------------------------------------------------------
 * PATIENT REVIEWS: real ones only.
 * Copy them from the clinic's Google Maps listing (Reviews tab) or Facebook page.
 * Use the reviewer's name exactly as it is published there (or first name + initial),
 * and only with the clinic's OK. While this list is empty, the Reviews section shows
 * links to the live Google and Facebook reviews instead of a quote.
 *   { quote: 'Exact review text', name: 'Ayesha K.', source: 'Google review', rating: 5 },
 * ------------------------------------------------------------------ */
export const reviews = []

/* Clinic numbers. Left EMPTY on purpose: the section is hidden until real, verifiable
 * figures are added (no invented statistics). Example:
 *   { value: 15, label: 'Years in practice' },  */
export const stats = []
