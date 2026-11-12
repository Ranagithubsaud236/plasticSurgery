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
  { id: 'results', label: 'Results' },
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
  // PHOTO SLOTS: every src below is a temporary stock photo until the clinic's own photos are added.
  hero: { src: 'photo-1612349317150-e413f6a5b16d', position: 'center 12%' },          // TODO: Dr Khalil Ahmad portrait (hero, scroll-expanding)
  about1: { src: 'photo-1579684385127-1ef15d508118', position: 'center' },        // TODO: clinic / theatre photo
  about2: { src: 'photo-1551601651-2a8555f1a136', position: 'center' },       // TODO: doctor at work
  about3: { src: 'photo-1512290923902-8a9f81dc236c', position: 'center' },              // TODO: consultation photo
  doctorAvatar: { src: 'photo-1612349317150-e413f6a5b16d', position: 'center 20%' },  // TODO: Dr Khalil Ahmad headshot
  doctor: { src: 'photo-1643834534240-75aee14ecdc8', position: 'center' },           // TODO: doctor with a patient (How it works)
  testimonial: { src: '/images/review-facial.png', position: 'center 30%' }, // half-mask facial photo supplied by the client
}

/* The clinic's procedures (the only three offered). Tummy tuck and abdominoplasty are the
 * same operation, so they are one service. */
export const services = [
  { title: 'Gynecomastia', text: 'Removes excess breast tissue in men for a flatter, firmer chest.', img: { src: '/images/results/gynecomastia-2.png', fit: 'contain' } },
  { title: 'Rhinoplasty', text: 'Reshapes the nose to suit your face, and can make breathing easier.', img: { src: '/images/results/rhinoplasty-1.png', fit: 'contain' } },
  { title: 'Tummy Tuck (Abdominoplasty)', text: 'Removes loose skin and fat from the abdomen and tightens the muscles underneath.', img: { src: '/images/results/abdomen-1.png', fit: 'contain' } },
]

/* Tab selected when the page opens (must match one of the titles below). */
export const defaultTreatment = 'Gynecomastia'

// Treatment banner: one tab per procedure.
export const treatments = [
  { title: 'Gynecomastia', img: { src: 'photo-1551601651-2a8555f1a136', position: 'center 40%' } }, // TODO: gynecomastia photo
  { title: 'Rhinoplasty', img: { src: 'photo-1512290923902-8a9f81dc236c', position: 'center 35%' } },         // TODO: rhinoplasty photo
  { title: 'Tummy Tuck', img: { src: 'photo-1747398594110-70ac0f75e3bc', position: 'center 50%' } },        // TODO: tummy tuck photo
]

/* ------------------------------------------------------------------
 * RESULTS: the clinic's own before/after photos (public/images/results).
 * Shown uncropped. procedure must match a service filter below.
 * NOTE: these files are 206x206 px; send larger originals to sharpen them.
 * ------------------------------------------------------------------ */
export const resultFilters = ['Gynecomastia', 'Rhinoplasty', 'Tummy & abdomen']
export const results = [
  { procedure: 'Gynecomastia', caption: 'Gynecomastia surgery', src: '/images/results/gynecomastia-2.png' },
  { procedure: 'Rhinoplasty', caption: 'Rhinoplasty, front and base views', src: '/images/results/rhinoplasty-1.png' },
  { procedure: 'Tummy & abdomen', caption: 'Abdomen liposuction', src: '/images/results/abdomen-1.png' },
  { procedure: 'Gynecomastia', caption: 'Gynecomastia surgery', src: '/images/results/gynecomastia-3.png' },
  { procedure: 'Rhinoplasty', caption: 'Rhinoplasty, side profile', src: '/images/results/rhinoplasty-2.png' },
  { procedure: 'Tummy & abdomen', caption: 'Abdomen liposuction, side view', src: '/images/results/abdomen-2.png' },
  { procedure: 'Gynecomastia', caption: 'Gynecomastia surgery, side view', src: '/images/results/gynecomastia-1.png' },
]

export const steps = [
  { title: 'Book a consultation', text: 'Call the clinic or message the Facebook page to pick a time.' },
  { title: 'Talk it through with the doctor', text: 'Your goals, the options, the risks and the expected recovery, in person.' },
  { title: 'Health check', text: 'Tests confirm the procedure is safe for you before a date is set.' },
  { title: 'Procedure and follow-up', text: 'Check-up visits continue until you have healed.' },
]

// TODO: replace with real articles (titles below are topic placeholders linking to the Facebook page).
export const posts = [
  { title: 'Gynecomastia surgery: what recovery really looks like', tag: 'Gynecomastia', img: { src: 'photo-1643834534240-75aee14ecdc8', position: 'center' } },
  { title: 'Rhinoplasty: questions to ask before you book', tag: 'Rhinoplasty', img: { src: 'photo-1512290923902-8a9f81dc236c', position: 'center' } },
  { title: 'Tummy tuck or liposuction: which one fits your goal?', tag: 'Tummy tuck', img: { src: 'photo-1747398594110-70ac0f75e3bc', position: 'center' } },
  { title: 'Getting ready for surgery: a simple checklist', tag: 'Preparation', img: { src: 'photo-1579684385127-1ef15d508118', position: 'center' } },
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
