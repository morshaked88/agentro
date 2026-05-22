import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { CapabilitiesSection } from '@/components/CapabilitiesSection'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CapabilitiesSection />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
