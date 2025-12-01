import { Cpu, Brain, Zap, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Cpu,
    title: "Custom EEG Hardware",
    description:
      "High-precision EEG acquisition systems with 8-64 channel configurations for research-grade recording.",
    highlights: ["24-bit ADC Resolution", "Up to 2048 Hz Sample Rate", "Active Noise Cancellation"],
  },
  {
    icon: Brain,
    title: "AI Neural Processing",
    description:
      "Upload EEG data and get instant, accurate brainwave insights powered by our proprietary ML algorithms.",
    highlights: ["Automated Artifact Removal", "Pattern Recognition", "Predictive Analytics"],
  },
  {
    icon: Zap,
    title: "Real-Time BCI",
    description: "Seamless integration between neural signals and machine control systems with ultra-low latency.",
    highlights: ["< 50ms Latency", "Motor Imagery Support", "P300 & SSVEP Paradigms"],
  },
  {
    icon: Shield,
    title: "Medical-Grade Security",
    description: "Encrypted, reliable, and built for clinical and research environments with full compliance.",
    highlights: ["HIPAA Compliant", "End-to-End Encryption", "ISO 13485 Certified"],
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Technologies</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Cutting-edge solutions for neuroscience research and brain-computer interfaces
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden border-border bg-card group">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Feature highlights */}
                <ul className="mt-4 space-y-1">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
