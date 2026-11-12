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
  { id: 'results', label: 'Results' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
]

/* ------------------------------------------------------------------
 * IMAGES: only the clinic's own pictures are used (public/images).
 *   fit: 'contain' shows a before/after whole, never cropped.
 * ------------------------------------------------------------------ */
export const logo = '/images/logo.png'
export const images = {
  hero: { src: 'photo-1612349317150-e413f6a5b16d', position: 'center 12%' }, // TODO: stock doctor photo, replace with Dr Khalil Ahmad's own portrait
  about1: { src: '/images/results/hair-transplant-1.png', fit: 'contain' },
  about2: { src: '/images/results/split-ear-1.png', fit: 'contain' },
  about3: { src: '/images/results/gynecomastia-3.png', fit: 'contain' },
  doctor: { src: '/images/results/rhinoplasty-2.png', fit: 'contain' },
}

/* Procedures offered (from the clinic's own services list).
 * img: the clinic's before/after photo, or null when none has been supplied yet. */
export const services = [
  { title: 'Hair Transplant', text: 'Moves healthy hair follicles to thinning or bald areas for natural, permanent growth.', img: { src: '/images/results/hair-transplant-1.png', fit: 'contain' } },
  { title: 'Gynecomastia Surgery', text: 'Removes excess breast tissue in men for a flatter, firmer chest.', img: { src: '/images/results/gynecomastia-2.png', fit: 'contain' } },
  { title: 'Belly Liposuction', text: 'Removes stubborn fat from the abdomen and waist to reshape the belly.', img: { src: '/images/results/abdomen-1.png', fit: 'contain' } },
  { title: 'Rhinoplasty / Nose Surgery', text: 'Reshapes the nose to suit your face, and can make breathing easier.', img: { src: '/images/results/rhinoplasty-1.png', fit: 'contain' } },
  { title: 'Burn Hands and Face Surgery', text: 'Reconstructive surgery to release scars and restore movement and appearance after burns.', img: { src: '/images/results/hand-1.png', fit: 'contain' } },
  { title: 'Lip Surgery', text: 'Corrects, reshapes or repairs the lips, including cleft lip repair.', img: null },
]


/* ------------------------------------------------------------------
 * RESULTS: the clinic's own before/after photos (public/images/results).
 * Shown uncropped. procedure must match one of resultFilters.
 * NOTE: these files are 206x206 px; send larger originals to sharpen them.
 * ------------------------------------------------------------------ */
export const resultFilters = ['Gynecomastia', 'Rhinoplasty', 'Belly liposuction', 'Hair transplant', 'Hand surgery', 'Ear surgery']
export const results = [
  { procedure: 'Gynecomastia', caption: 'Gynecomastia surgery', src: '/images/results/gynecomastia-2.png' },
  { procedure: 'Rhinoplasty', caption: 'Rhinoplasty, front and base views', src: '/images/results/rhinoplasty-1.png' },
  { procedure: 'Belly liposuction', caption: 'Abdomen liposuction', src: '/images/results/abdomen-1.png' },
  { procedure: 'Gynecomastia', caption: 'Gynecomastia surgery', src: '/images/results/gynecomastia-3.png' },
  { procedure: 'Rhinoplasty', caption: 'Rhinoplasty, side profile', src: '/images/results/rhinoplasty-2.png' },
  { procedure: 'Belly liposuction', caption: 'Abdomen liposuction, side view', src: '/images/results/abdomen-2.png' },
  { procedure: 'Gynecomastia', caption: 'Gynecomastia surgery, side view', src: '/images/results/gynecomastia-1.png' },
  { procedure: 'Hair transplant', caption: 'Hair transplant', src: '/images/results/hair-transplant-1.png' },
  { procedure: 'Hand surgery', caption: 'Hand surgery, finger release', src: '/images/results/hand-1.png' },
  { procedure: 'Ear surgery', caption: 'Split ear repair', src: '/images/results/split-ear-1.png' },
]

export const steps = [
  { title: 'Book a consultation', text: 'Call the clinic or message the Facebook page to pick a time.' },
  { title: 'Talk it through with the doctor', text: 'Your goals, the options, the risks and the expected recovery, in person.' },
  { title: 'Health check', text: 'Tests confirm the procedure is safe for you before a date is set.' },
  { title: 'Procedure and follow-up', text: 'Check-up visits continue until you have healed.' },
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
