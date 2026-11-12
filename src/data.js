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
  hero: { src: '/images/dr-khalil-ahmad.jpg' }, // Dr Khalil Ahmad
  about1: { src: '/images/results/hair-transplant-1.png', fit: 'contain' },
  about2: { src: '/images/results/split-ear-1.png', fit: 'contain' },
  about3: { src: '/images/results/gynecomastia-3.png', fit: 'contain' },
  doctor: { src: '/images/dr-khalil-ahmad.jpg', position: 'center 30%' }, // Dr Khalil Ahmad
}

/* Procedures offered (from the clinic's own services list).
 * img: the clinic's before/after photo, or null when none has been supplied yet. */
export const services = [
  { title: 'Hair Transplant', text: 'Moves healthy hair follicles to thinning or bald areas for natural, permanent growth.', img: { src: '/images/results/hair-transplant-1.png', fit: 'contain' } },
  { title: 'Gynecomastia Surgery', text: 'Removes excess breast tissue in men for a flatter, firmer chest.', img: { src: '/images/results/gynecomastia-2.png', fit: 'contain' } },
  { title: 'Belly Liposuction', text: 'Removes stubborn fat from the abdomen and waist to reshape the belly.', img: { src: '/images/results/abdomen-1.png', fit: 'contain' } },
  { title: 'Rhinoplasty / Nose Surgery', text: 'Reshapes the nose to suit your face, and can make breathing easier.', img: { src: '/images/results/rhinoplasty-1.png', fit: 'contain' } },
  { title: 'Burn Hands and Face Surgery', text: 'Reconstructive surgery to release scars and restore movement and appearance after burns.', img: { src: '/images/results/hand-1.png', fit: 'contain' } },
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
 * PATIENT REVIEWS: copied word for word from the clinic's Google Maps listing.
 * Captured 12 November 2026 (dates are relative to that day). Google shows the
 * newest 8 publicly; the full list is linked from the section.
 * ------------------------------------------------------------------ */
export const reviewSummary = { rating: 4.9, count: 133, capturedOn: 'November 2026' }
export const reviews = [
  {
    quote: "I recently underwent gynecomastia surgery with Dr. Khalil Ahmad, and I couldn't be more grateful for the care I received. From the very first consultation, he made everything easy to understand, answered all my questions patiently, and made me feel genuinely comfortable.\n\nThe surgery went smoothly, and even during recovery, he was always available for support. The entire staff were absolutely brilliant.\n\nI'm now healing well and already feeling more confident. Highly recommend him not just for his skill, but also for how approachable and professional he is throughout the entire process. Thank you, Dr.khalil Ahmad!",
    name: "Qamar Zeeshan",
    source: "Google review",
    rating: 5,
    date: "6 months ago"
  },
  {
    quote: "Excellent experience from start to finish. Dr Khalil was very supportive, explained everything clearly, and performed my gynecomastia surgery with great skill. The results are outstanding, and the post-surgery care was just as good. Highly recommended!",
    name: "Muhammad Hashir",
    source: "Google review",
    rating: 5,
    date: "6 months ago"
  },
  {
    quote: "I had surgery with Dr. Khalil a few days ago. The doctor is a good surgeon and a very good person hospital and the staff are very good. I would recommend Body Art Hospital for your surgery.✨",
    name: "Zawar Inaam",
    source: "Google review",
    rating: 5,
    date: "6 months ago"
  },
  {
    quote: "“Respected Dr.Hafiz Khalil ahmed,\nYour professionalism, humility, and remarkable surgical skills are truly admirable. Thank you for performing my procedure with such care and perfection within bearable charges. The confidence I have gained after this surgery is priceless. I sincerely appreciate everything you have done for me. ALLAH almighty bless you and your team Ameen.",
    name: "Mr ZEESHAN",
    source: "Google review",
    rating: 5,
    date: "7 months ago"
  },
  {
    quote: "I recently had gynecomastia surgery with Dr.Khalil , and I am very happy with the results! Not only was the procedure a success, but Dr. Khalil and his team were extremely professional, caring, and supportive throughout the entire process.\n\nFrom the initial consultation to the follow-up care, I felt like I was in good hands. Dr. Khalil took the time to explain everything, answer my questions, and address my concerns. His expertise and bedside manner are top-notch!\n\nThe results are amazing, and I'm loving my new confidence. I'd highly recommend Dr khalil to anyone considering gynecomastia surgery or other procedures. Five stars isn't enough - I'd give him ten stars if I could!\"",
    name: "Nouman Ali",
    source: "Google review",
    rating: 5,
    date: "11 months ago"
  },
  {
    quote: "I had my gynecomastia surgery done by Dr. Khalil Ahmad on October 5th and now that it’s been 2 months, I can confidently say it was one of the best decisions I’ve ever made...From the very beginning Dr. Khalil was professional, honest and reassuring...He explained everything clearly and made me feel comfortable throughout the entire process...The surgery itself went smoothly and the recovery was much easier than I expected...Today, two months later, I’m extremely happy with the results...My chest looks natural, the symmetry is perfect, and my confidence has gone up more than I can express...The scars are minimal and healing very well. I finally feel comfortable wearing fitted shirts and going to the gym again...I truly appreciate Dr. Khalil Ahmad’s skill, care, and expertise...If anyone is considering gynecomastia surgery, I highly recommend him...This has been a life-changing experience for me ❤️",
    name: "Swaleh Lali Swaleh",
    source: "Google review",
    rating: 5,
    date: "11 months ago"
  },
  {
    quote: "Dr. Khalil was amazing throughout my entire treatment. The care and attention to detail they provided made me feel completely at ease. The results matched my expectations, and I’m so happy with the outcome! I highly recommend their services to anyone looking for a professional, skilled surgeon.",
    name: "Mehar Zaib",
    source: "Google review",
    rating: 5,
    date: "10 months ago"
  },
  {
    quote: "Best plastic surgeon in Lahore. “Dr. Khalil is hands down the best plastic surgeon in Lahore! From the very first consultation, he made me feel comfortable and thoroughly explained every step of the process. His expertise, professionalism, and attention to detail are unmatched. The results exceeded my expectations, and I couldn’t be happier with how natural and flawless everything turned out. The clinic staff is also very kind and supportive, ensuring a smooth and stress-free experience. I highly recommend Dr. Khalil to anyone seeking exceptional plastic surgery in Lahore!”",
    name: "Salman Malik",
    source: "Google review",
    rating: 5,
    date: "a year ago"
  }
]

/* Clinic numbers. Left EMPTY on purpose: the section is hidden until real, verifiable
 * figures are added (no invented statistics). Example:
 *   { value: 15, label: 'Years in practice' },  */
export const stats = []
