import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 sm:px-16 sm:py-24">
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Ready to Advance Your Research?
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/90">
              Contact us today to discuss your neurotechnology needs or schedule a demo of our AI platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/contact">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 400 400" fill="none">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary-foreground"
              />
              <circle
                cx="350"
                cy="100"
                r="60"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary-foreground"
              />
              <circle
                cx="100"
                cy="350"
                r="50"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary-foreground"
              />
              <circle
                cx="320"
                cy="320"
                r="30"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary-foreground"
              />
              <circle
                cx="200"
                cy="200"
                r="100"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary-foreground"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
