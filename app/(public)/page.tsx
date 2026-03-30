import { StarfieldCanvas } from '@/components/StarfieldCanvas'
import { HeroSection } from '@/components/organisms/landing/HeroSection'
import { ServicesPreview } from '@/components/organisms/landing/ServicesPreview'
import { TestimonialsSection } from '@/components/organisms/landing/TestimonialsSection'
import { FaqSection } from '@/components/organisms/landing/FaqSection'
import { CtaSection } from '@/components/organisms/landing/CtaSection'

export default function LandingPage() {
  return (
    <>
      <StarfieldCanvas />
      <div className="relative pt-16">
        <HeroSection />

        {/* Divisor */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />
        </div>

        <ServicesPreview />

        <div className="relative z-10 container mx-auto max-w-6xl px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />
        </div>

        <TestimonialsSection />

        <div className="relative z-10 container mx-auto max-w-6xl px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />
        </div>

        <FaqSection />

        <CtaSection />
      </div>
    </>
  )
}
