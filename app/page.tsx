import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { ProductsPreviewSection } from "@/components/home/products-preview-section"
import { AboutSection } from "@/components/home/about-section"
import { PartnersSection } from "@/components/home/partners-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { DashboardDemoSection } from "@/components/home/dashboard-demo-section"
import { MobileAppSection } from "@/components/home/mobile-app-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsPreviewSection />
        <DashboardDemoSection />
        <MobileAppSection />
        <AboutSection />
        <TestimonialsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
