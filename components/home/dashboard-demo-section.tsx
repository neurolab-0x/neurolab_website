import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, ArrowRight, CheckCircle, Calendar } from "lucide-react"

const benefits = [
  "Real-time EEG monitoring across multiple patients",
  "AI-assisted diagnosis and anomaly detection",
  "Automated report generation for clinical records",
  "HIPAA-compliant data storage and sharing",
  "Team collaboration and case management",
  "Integration with existing hospital systems",
]

export function DashboardDemoSection() {
  return (
    <section className="bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
              <Building2 className="h-4 w-4" />
              <span>For Clinics & Healthcare</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Professional Dashboard for Clinics & Doctors
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/90 leading-relaxed">
              Our enterprise-grade dashboard is designed for healthcare professionals who need powerful EEG analysis
              tools with clinical-grade accuracy and compliance.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary-foreground/80 flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/90">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact?type=demo">
                  <Calendar className="mr-2 h-5 w-5" />
                  Request a Demo
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/platform">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden ">
              <img
                src="/dashboard.svg"
                alt="NeuroLab Professional Dashboard Preview"
                className="w-full h-auto "
              />
            </div>
            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1+</p>
                  <p className="text-sm text-muted-foreground">Clinics Using</p>
                </div>
              </div>
            </div>
            {/* Floating Stats Badge Right */}
            <div className="absolute -top-4 -right-4 bg-background rounded-xl p-4 border border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
