import { useRef } from 'react'
import Header from './components/Header'
import WhatsAppButton from './components/WhatsAppButton'
import SmoothScroll from './components/SmoothScroll'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Services from './components/Services'
import TreatmentTabs from './components/TreatmentTabs'
import Results from './components/Results'
import Procedure from './components/Procedure'
import Testimonial from './components/Testimonial'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useSiteAnimations from './lib/useSiteAnimations'

export default function App() {
  const scope = useRef(null)
  useSiteAnimations(scope)

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-5 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <Header />
      <WhatsAppButton />
      <SmoothScroll>
        <div ref={scope}>
          {/* spacer equal to the fixed header height */}
          <div aria-hidden style={{ height: 'var(--header-h)' }} />
          <main id="main">
            <Hero />
            <About />
            <Stats />
            <Services />
            <TreatmentTabs />
            <Results />
            <Procedure />
            <Testimonial />
            <Blog />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  )
}
