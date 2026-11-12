# Dr Khalil Ahmad, Plastic Surgeon (Lahore)

One-page clinic website built with React, Vite, Tailwind CSS v4 and GSAP.

## Run it

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

## Where to edit

Almost everything a clinic would change lives in **`src/data.js`**:

| What | Where |
|---|---|
| Phone, address, hours, WhatsApp number, links | `clinic` |
| Header tabs and footer sitemap | `sections` |
| Photos (Unsplash id or your own `/images/...` file) and focal point | `images`, `services`, `treatments`, `posts` |
| Patient reviews (real ones only) | `reviews` |
| Clinic statistics (hidden while empty) | `stats` |

Look and feel (colours, type scale, heading weight, image corner radius) is set at the top of **`src/index.css`**.

Put your own photos in `public/images/` and reference them as `/images/your-file.jpg`.

## Before going live

These are placeholders in `src/data.js` and must be replaced with real details:

- `clinic.address`, `clinic.hours`
- `clinic.siteUrl`, plus the domain in `public/sitemap.xml` and `public/robots.txt`
- `reviews` (copy real reviews from the Google Maps listing, with the clinic's OK)
- Before/after photos for burn and lip surgery, larger originals of the existing photos, and a clean (unwatermarked) logo file

## Motion and accessibility

- GSAP ScrollSmoother on desktop; native scrolling on touch devices.
- Scroll-pinned hero expansion, horizontal services row, staggered image reveals, WebGL liquid image hover.
- `prefers-reduced-motion: reduce` turns off pinning, smoothing and movement and keeps only short fades.
- Flat colours only (no gradients, shadows or blur); text meets WCAG AA contrast.

Stock photos are from [Unsplash](https://unsplash.com) under the free Unsplash License.
