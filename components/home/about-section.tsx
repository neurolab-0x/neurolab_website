import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"

const values = ["Innovation", "Accuracy", "Trust", "Accessibility"]

export function AboutSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
              <img
                src="/medical-technology-team-laboratory-research-enviro.jpg"
                alt="NeuroLab team in laboratory"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl max-w-[200px]">
              <p className="text-3xl font-bold">1+</p>
              <p className="text-sm opacity-90">Research Partners Worldwide</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Who We Are</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              NeuroLab is a science-focused AI and neurotechnology company based in Kigali, Rwanda, creating tools that
              make brain data easy to understand.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Our mission is to make neuroscience tools accessible, reliable, and easy to interpret for researchers,
              clinicians, and developers worldwide.
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Our Values</h3>
              <div className="flex flex-wrap gap-3">
                {values.map((value) => (
                  <div key={value} className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Button asChild>
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
