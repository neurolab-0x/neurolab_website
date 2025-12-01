import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  BarChart3,
  Activity,
  Shield,
  Upload,
  Cpu,
  FileText,
  ArrowRight,
  FlaskConical,
  Building2,
  Code2,
  GraduationCap,
  CheckCircle,
  Zap,
  Cloud,
  Lock,
  LineChart,
  Layers,
  Users,
  Globe,
  Database,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered EEG Processing",
    description: "Advanced deep learning algorithms detect patterns and anomalies with 99.2% accuracy.",
    stats: "99.2% Accuracy",
  },
  {
    icon: BarChart3,
    title: "Smart Visualizations",
    description: "Auto-generated heatmaps, topomaps, and spectrograms ready for publications.",
    stats: "15+ Chart Types",
  },
  {
    icon: Activity,
    title: "Real-Time Streaming",
    description: "Live data monitoring with <50ms latency and customizable alert thresholds.",
    stats: "<50ms Latency",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade encryption with SOC 2 Type II certified infrastructure.",
    stats: "256-bit AES",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Process hours of EEG data in seconds with our optimized GPU pipelines.",
    stats: "10x Faster",
  },
  {
    icon: Layers,
    title: "Multi-Format Support",
    description: "Import EDF, BDF, GDF, CSV, MAT, and 20+ other neuroimaging formats.",
    stats: "20+ Formats",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share analyses, annotate together, and manage permissions across teams.",
    stats: "Unlimited Users",
  },
  {
    icon: Cloud,
    title: "Cloud & On-Premise",
    description: "Deploy on our secure cloud or your own infrastructure with full API access.",
    stats: "99.9% Uptime",
  },
]

const steps = [
  {
    number: "01",
    title: "Acquire Data",
    description:
      "Connect NeuroLab hardware directly or upload EEG files from any compatible device. We support EDF, BDF, CSV, and more.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Process with AI",
    description:
      "Our AI automatically cleans noise, removes artifacts, and runs advanced spectral and temporal analysis on your data.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Visualize & Report",
    description:
      "Explore your data in the interactive dashboard or export professional PDF/CSV reports for your research or clinical needs.",
    icon: FileText,
  },
]

const useCases = [
  {
    icon: FlaskConical,
    title: "Researchers",
    description:
      "Accelerate your neuroscience research with automated analysis pipelines and publication-ready visualizations.",
  },
  {
    icon: Building2,
    title: "Clinics",
    description: "Streamline EEG diagnostics with AI-assisted interpretation and comprehensive patient reports.",
  },
  {
    icon: Code2,
    title: "Neurotech Developers",
    description: "Build BCI applications faster with our API, SDKs, and real-time data streaming capabilities.",
  },
  {
    icon: GraduationCap,
    title: "Students & Educators",
    description: "Learn neuroscience hands-on with accessible tools and educational resources for academic settings.",
  },
]

const platformFeatures = [
  "Automated artifact removal",
  "Frequency band analysis",
  "Event-related potential detection",
  "Connectivity analysis",
  "Sleep staging algorithms",
  "Custom analysis pipelines",
  "Team collaboration tools",
  "Version control for analyses",
]

const analysisTypes = [
  {
    icon: LineChart,
    title: "Spectral Analysis",
    description: "Power spectral density, frequency band decomposition, and time-frequency analysis.",
  },
  {
    icon: Target,
    title: "Source Localization",
    description: "Advanced algorithms to pinpoint the origin of neural activity in 3D brain space.",
  },
  {
    icon: TrendingUp,
    title: "Connectivity Mapping",
    description: "Coherence, phase synchrony, and effective connectivity between brain regions.",
  },
  {
    icon: Sparkles,
    title: "Event Detection",
    description: "Automatic detection of spikes, seizures, sleep spindles, and other neural events.",
  },
]

const integrations = [
  { name: "MATLAB", logo: "/matlab-logo.jpg" },
  { name: "Python", logo: "/python-logo.png" },
  { name: "LabStreamingLayer", logo: "/lsl-logo.jpg" },
  { name: "OpenBCI", logo: "/openbci-logo.jpg" },
  { name: "BrainVision", logo: "/brainvision-logo.jpg" },
  { name: "MNE-Python", logo: "/mne-python-logo.jpg" },
]

const stats = [
  { value: "500+", label: "Research Institutions" },
  { value: "2M+", label: "EEG Sessions Analyzed" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "50+", label: "Countries Served" },
]

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
                  <Brain className="h-4 w-4" />
                  <span>AI-Powered Analysis</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                  AI-Powered EEG & Neuro Data Analysis <span className="text-primary">Made Simple</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                  Upload EEG data from any device or stream live from NeuroLab hardware. Get instant, accurate brainwave
                  insights, clean visualizations, and research-grade results.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Book a Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/products">View Compatible Hardware</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
                  <img src="/preview.svg" alt="NeuroLab AI Platform Dashboard" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="mt-2 text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Platform Features</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to analyze, visualize, and understand neural data
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border bg-card py-3">
                  <CardHeader className="pb-2">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    <div className="mt-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {feature.stats}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Analysis Section */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Advanced Analysis Capabilities
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Our platform provides a comprehensive suite of neuroscience analysis tools, from basic frequency
                  decomposition to cutting-edge machine learning models for pattern detection.
                </p>

                <div className="mt-10 space-y-6">
                  {analysisTypes.map((analysis) => (
                    <div key={analysis.title} className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                        <analysis.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{analysis.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{analysis.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/dashboard.svg"
                  alt="NeuroLab AI Platform Dashboard"
                  width={600}
                  height={400}
                  className="rounded-2xl"
                />
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">10x Faster Processing</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">2M+ Sessions Analyzed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get from raw EEG data to actionable insights in three simple steps
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div key={step.title} className="relative">
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0" />
                    )}
                    <div className="relative z-10 text-center">
                      <div className="mx-auto w-32 h-32 rounded-2xl bg-card border border-border flex items-center justify-center mb-6">
                        <step.icon className="h-12 w-12 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-primary">{step.number}</span>
                      <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Built For Every User</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Whether you&apos;re a researcher, clinician, developer, or student
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase) => (
                <Card key={useCase.title} className="border-border bg-card text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                      <useCase.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{useCase.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Capabilities */}
        <section className="bg-background py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Enterprise-Ready Platform
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Our platform offers a comprehensive suite of analysis tools designed for both research and clinical
                  applications. From basic frequency analysis to advanced connectivity mapping, we&apos;ve got you
                  covered.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {platformFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Request Enterprise Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-2xl bg-secondary overflow-hidden">
                  <img
                    src="/dashboard.svg"
                    alt="Platform dashboard visualization"
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Security badges */}
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 border border-border">
                    <Lock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 border border-border">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">SOC 2 Type II</span>
                  </div>
                  <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 border border-border">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">GDPR Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-secondary/30 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Flexible Plans</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that fits your research or clinical needs
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Researcher Plan */}
              <Card className="border-border bg-card py-6">
                <CardHeader>
                  <CardTitle className="text-foreground">Researcher</CardTitle>
                  <p className="text-muted-foreground">For individual researchers and small labs</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Up to 500 sessions/month",
                      "Basic AI analysis",
                      "PDF/CSV exports",
                      "Email support",
                      "5GB cloud storage",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Institution Plan */}
              <Card className="border-primary bg-card relative py-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle className="text-foreground">Institution</CardTitle>
                  <p className="text-muted-foreground">For research institutions and clinics</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">$100</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Unlimited sessions",
                      "Advanced AI analysis",
                      "Real-time streaming",
                      "Priority support",
                      "50GB cloud storage",
                      "Team collaboration",
                      "Custom branding",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">Get Started</Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border-border bg-card py-6">
                <CardHeader>
                  <CardTitle className="text-foreground">Enterprise</CardTitle>
                  <p className="text-muted-foreground">For large organizations with custom needs</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">Custom</span>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Everything in Institution",
                      "On-premise deployment",
                      "Custom AI models",
                      "Dedicated support",
                      "Unlimited storage",
                      "SLA guarantee",
                      "API access",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-transparent" variant="outline" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                Ready to Transform Your Neural Data Analysis?
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/90">
                Join 500+ research institutions already using NeuroLab AI Platform. Start your free trial today or book
                a personalized demo with our team.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Book a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}