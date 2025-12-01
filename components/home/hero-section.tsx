import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
              <Activity className="h-4 w-4" />
              <span>Advancing Neuroscience in Africa</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Empowering Neural Innovation with <span className="text-primary">AI & Hardware</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
              Explore our research-grade EEG devices, real-time insights, and powerful AI analysis platform. Seamless
              brain-machine communication starts here.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Explore Our Hardware
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/platform">Discover the AI Platform</Link>
              </Button>
            </div>
          </div>

          <div className="relative lg:ml-auto">
            <div className="relative">
             <Image src="/neuro.jpg" alt="Hero Image" width={600} height={400} className="rounded-xl shadow-lg"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
