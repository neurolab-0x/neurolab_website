import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Heart, Users, ArrowRight, MapPin, Award, Lightbulb } from "lucide-react"

const teamMembers = [
  {
    name: "Asimwe Landry",
    role: "Founder & CEO",
    image: "/placeholder.svg?key=1r55x",
    bio: "Software engineer passionate about brain-computer interfaces.",
  },
  {
    name: "Mugisha Prosper",
    role: "Co-Founder & AI Lead",
    image: "/placeholder.svg?key=zidmc",
    bio: "AI researcher specializing in signal processing and machine learning.",
  },
  {
    name: "Dushimire Aine",
    role: "Co-Founder & Software Lead",
    image: "/aine.png?key=bv2ek",
    bio: "Software developer focused on scalable AI platforms.",
  },
  {
    name: "Uhirwe Esther Hope",
    role: "Head of Marketing",
    image: "/placeholder.svg?key=jg0yd",
    bio: "Marketing strategist with a passion for tech innovation.",
  },
  {
    name: "Atumanyire Winny",
    role: "Head of Sales",
    image: "/placeholder.svg?key=s0w1f",
    bio: "Sales leader dedicated to expanding market reach.",
  },
  {
    name: "Tuyishimire Christian",
    role: "Lead Backend Engineer",
    image: "/placeholder.svg?key=s0w1f",
    bio: "Backend engineer specializing in cloud infrastructure and APIs.",
  },
  {
    name: "Dr. Alain Sayinzoga",
    role: "Lead Neurologist",
    image: "/placeholder.svg?key=s0w1f",
    bio: "Neurologist with expertise in brain-computer interfaces and clinical applications.",
  },
  {
    name: "Pyschologist Muhire",
    role: "Psychology Consultant",
    image: "/placeholder.svg?key=s0w1f",
    bio: "Psychologist focused on cognitive neuroscience and user experience.",
  },
  {
    name: "Dr. Awet Fesseha",
    role: "Mentor & Advisor",
    image: "/placeholder.svg?key=s0w1f",
    bio: "Experienced machine learning enthuasist and entrepreneur guiding our research direction.",
  },

]

const partners = [
  { name: "Rwanda Coding Academy", logo: "/rca.png" },
  { name: "Sand Technologies", logo: "/sandtech.png" },
  { name: "Benax Technologies", logo: "/benax.png" },
  { name: "Aphezis Technologies", logo: "/aphezis.png" },
  { name: "Neuralink", logo: "/neuralink.png" },
  {name:"Deus Clinic Rwanda", logo:"/deus.png" }
]

const milestones = [
 
  {
    year: "2024",
    title: "Company Launch",
    description: "Launched NeuroLab with a focus on AI-driven neurotechnology solutions.",
  },
  {
    year: "2024-2025",
    title: "Alx Ventures Program",
    description: "Completed Alx Ventures accelerator program to refine our business model and technology.",
  },
  {
    year: "2025",
    title: "Launch of Preorder Waitlist",
    description: "Opened preorder waitlist for our first EEG BCI product targeting researchers and developers.",
  },
   
  
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                  Pioneering Neurotechnology <span className="text-primary">from the Heart of Africa</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  NeuroLab is a science-focused AI and neurotechnology company based in Kigali, Rwanda. We are creating
                  tools that make brain data easy to understand, accessible, and actionable for researchers, clinicians,
                  and developers worldwide.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Get in Touch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/products">Explore Our Products</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                  <img
                    src="/medical-technology-team-laboratory-research-enviro.jpg"
                    alt="NeuroLab team in laboratory"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6" />
                    <div>
                      <p className="text-lg font-bold">Kigali, Rwanda</p>
                      <p className="text-sm opacity-90">Innovation Hub of Africa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="bg-secondary/30 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-border bg-card">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    To make neuroscience tools accessible, reliable, and easy to interpret for everyone, democratizing
                    brain research globally.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Vision</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    To be the leading neurotechnology company from Africa, advancing global understanding of the human
                    brain through innovation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Our Values</h3>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {["Innovation", "Accuracy", "Trust", "Accessibility"].map((value) => (
                      <span
                        key={value}
                        className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-foreground"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Journey</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From a small lab in Kigali to serving researchers worldwide
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <Card className="inline-block border-border bg-card">
                        <CardContent className="p-6">
                          <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                          <h3 className="mt-2 text-lg font-bold text-foreground">{milestone.title}</h3>
                          <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10" />

                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className=" py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
                <Users className="h-4 w-4" />
                <span>Meet the Team</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                The Minds Behind NeuroLab
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A diverse team of scientists, engineers, and innovators passionate about neurotechnology
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.name} className="overflow-hidden border-border bg-card">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="h-[250px] w-full object-cover"
                    />
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="bg-background py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
                <Award className="h-4 w-4" />
                <span>Partnerships</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Partners in Innovation
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Collaborating with leading institutions to advance neuroscience research
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
              {partners.map((partner) => (
                <div key={partner.name} className="flex items-center justify-center">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="h-24 w-auto object-contain  transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Rwanda */}
        <section className="bg-secondary/30 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
                  <Lightbulb className="h-4 w-4" />
                  <span>Why Rwanda</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Building the Future from Africa&apos;s Tech Hub
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Rwanda has emerged as one of Africa&apos;s leading innovation hubs, with world-class infrastructure, a
                  thriving tech ecosystem, and strong government support for science and technology. NeuroLab is proud
                  to be part of this transformation.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Strategic location with growing African research community",
                    "Strong healthcare infrastructure and medical research partnerships",
                    "Government commitment to science, technology, and innovation",
                    "Talented pool of engineers and scientists",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-video overflow-hidden rounded-2xl bg-secondary">
                  <img
                    src="/africa.jpg"
                    alt="Kigali innovation hub"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                Join Us in Advancing Neuroscience
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/90">
                Whether you&apos;re looking to partner, collaborate, or join our team, we&apos;d love to hear from you.
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
                  <Link href="/products">View Our Products</Link>
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
