import { useState, useEffect } from 'react'
import PageLoader from './components/PageLoader'
import { AnimatePresence } from 'framer-motion'
import { theme } from './theme'
import { fetchCars } from './api/axios'
import Hero from './components/Hero1'
import StorySection from './components/StorySection'
import StatsBar from './components/StatsBar'
import Gallery from './components/Gallery'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import Navbar from './components/Navbar1'
import BookingModal from './components/BookingModal'



const links = [
  { label: 'Models', href: '#models' },
  { label: 'Heritage', href: '#heritage' },
  { label: 'Experience', href: '#experience' },
]

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [cars, setCars] = useState([])

  useEffect(()=>{
    fetchCars()
    .then(setCars)
    .catch((error) =>console.error('Failed to Load cars: ', error))
  },[])

  useEffect(() => {
    // Safety net: never let the loader hang forever if the video stalls
    const fallback = setTimeout(() => setIsPageLoading(false), 5000)
    return () => clearTimeout(fallback)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isPageLoading ? 'hidden' : 'auto'
  }, [isPageLoading])

  return (
    <div style={{ backgroundColor: theme.bg }}>
      <PageLoader theme={theme} brandName="VELOCIA" isLoading={isPageLoading} />
      <Navbar
        brandName="VELOCIA"
        links={links}
        theme={theme}
        ctaLabel="Book a Drive"
        onCtaClick={() => setIsBookingOpen(true)}
      />

      <Hero
        theme={theme}
        eyebrow="Est. 1998 — Precision Engineering"
        title="ENGINEERED FOR THE ROAD AHEAD"
        subtitle="Velocia builds vehicles where every curve, every component, and every drive is a statement of intent."
        videoUrl="/videos/hero.mp4"
        onReady={() => setIsPageLoading(false)}
      />

      <div id="heritage">
        <StorySection
          theme={theme}
          eyebrow="Heritage"
          title="A LEGACY BUILT ON OBSESSION"
          text="For over two decades, Velocia has pursued a single idea: that a car should feel like an extension of the person driving it. Every model begins not with a spec sheet, but with a feeling we refuse to compromise on."
          imageUrl="/photos/heritage.jpg"
        />
      </div>

      <div id="experience">
        <StatsBar
          theme={theme}
          stats={[
            { value: '312', label: 'Top Speed (km/h)' },
            { value: '2.9s', label: '0–100 km/h' },
            { value: '48', label: 'Countries' },
            { value: '27', label: 'Years of Craft' },
          ]}
        />
      </div>

      <StorySection
        theme={theme}
        eyebrow="Design Philosophy"
        title="FORM FOLLOWS VELOCITY"
        text="Our design studio operates on one rule: nothing is decorative. Every line exists to reduce drag, every vent to cool an engine working at its limit. Beauty, here, is a byproduct of purpose."
        imageUrl="/photos/design.jpg"
        reverse
      />

      <div id="models">
        <Gallery
          theme={theme}
          title="THE COLLECTION"
          items={cars.map((c) => ({
            name: c.name,
            tag: c.tag,
            imageUrl: c.image_url,
          })
          )}
        />
      </div>

      <CTASection
        theme={theme}
        title="RESERVE YOUR EXPERIENCE"
        subtitle="Private viewings and test drives available by appointment at select Velocia showrooms worldwide."
        buttonLabel="Book a Drive"
        onButtonClick={() => setIsBookingOpen(true)}
      />

      <Footer theme={theme} brandName="VELOCIA" />

      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App