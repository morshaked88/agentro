import { VideoBackground } from '@/components/VideoBackground'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ServiceSection } from '@/components/ServiceSection'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <VideoBackground />
      <main>
        <Navbar />
        <Hero />
        <ServiceSection id="services-ai"  phase="01" accent="blue"  align="left" />
        <ServiceSection id="services-web" phase="02" accent="amber" align="right" />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
