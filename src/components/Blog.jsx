import { SectionHeading } from './ui'
import LiquidImage from './LiquidImage'
import { posts, clinic } from '../data'

function PostLink({ title }) {
  // Stretched link: the whole card is clickable, but only the title is announced.
  return (
    <a href={clinic.facebook} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:content-['']">
      {title}
    </a>
  )
}

function ReadMore() {
  return (
    <span className="mt-2 inline-flex min-h-11 items-center font-bold text-gold-ink underline-offset-4 group-hover:underline" aria-hidden>
      Read on Facebook
    </span>
  )
}

export default function Blog() {
  const [featured, ...rest] = posts
  return (
    <section id="blog" className="container-x pb-16 md:pb-24">
      <SectionHeading center label="Blog" title="Worth reading before you decide" />

      <div data-img-group className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        {/* Featured post: large image with the liquid hover */}
        <article data-liquid-trigger className="group relative">
          <div data-img-reveal className="overflow-hidden rounded-[var(--img-radius)] aspect-[16/10] lg:aspect-[4/3]">
            <LiquidImage image={featured.img} alt="" strength={1.2} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <p className="mt-6 text-meta font-bold uppercase tracking-wider text-gold-ink">Featured, {featured.tag}</p>
          <h3 className="mt-2 text-h2 text-navy transition-colors group-hover:text-gold-ink">
            <PostLink title={featured.title} />
          </h3>
          <ReadMore />
        </article>

        {/* Other posts */}
        <ul className="grid content-start gap-8">
          {rest.map((p) => (
            <li key={p.title}>
              <article data-liquid-trigger className="group relative flex flex-col gap-5 sm:flex-row sm:items-center">
                <div data-img-reveal className="overflow-hidden rounded-[var(--img-radius)] aspect-[16/10] sm:aspect-square sm:w-40 lg:w-44 shrink-0">
                  <LiquidImage image={p.img} alt="" sizes="(min-width: 640px) 176px, 100vw" />
                </div>
                <div>
                  <p className="text-meta font-bold uppercase tracking-wider text-gold-ink">{p.tag}</p>
                  <h3 className="mt-1 text-h3 text-navy transition-colors group-hover:text-gold-ink">
                    <PostLink title={p.title} />
                  </h3>
                  <ReadMore />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
