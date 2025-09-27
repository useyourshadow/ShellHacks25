import { Hero } from './landingPage/Hero'
import { Features } from './landingPage/Features'
import { HowItWorks } from './landingPage/HowItWorks'
import { FAQ } from './landingPage/FAQ'
import { CallToAction } from './landingPage/CallToAction'

export default function Home() {

  return (
    <div className = "min-h-screen">
      <Hero/>
      <Features/>
      <HowItWorks/>
      <FAQ/>
      <CallToAction/>
    </div>
    
  )
}