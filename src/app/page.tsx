import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/landing/hero"
import { Problem } from "@/components/landing/problem"
import { Solution } from "@/components/landing/solution"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { SocialProof } from "@/components/landing/social-proof"
import { PricingPreview } from "@/components/landing/pricing-preview"
import { FAQ } from "@/components/landing/faq"
import { CTASection } from "@/components/landing/cta-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <SocialProof />
        <PricingPreview />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
