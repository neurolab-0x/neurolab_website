"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  // Column 1
  [
    {
      name: "Dr. Sarah Ndayisaba",
      role: "Neurologist",
      organization: "King Faisal Hospital",
      content:
        "NeuroLab's EEG system has transformed our diagnostic capabilities. The AI-powered analysis saves us hours and provides insights we couldn't get before. It's become an essential part of our neurology department.",
      rating: 5,
      image: "/african-female-doctor-professional-headshot-smilin.jpg",
    },
    {
      name: "Grace Mukamana",
      role: "PhD Student",
      organization: "CMU Africa",
      content:
        "As a student researcher, NeuroLab's affordable pricing and excellent academic support made it possible for me to conduct my thesis research.",
      rating: 5,
      image: "/african-female-phd-student-professional-headshot.jpg",
    },
    {
      name: "Dr. Jean Bosco",
      role: "Research Lead",
      organization: "Rwanda Biomedical Center",
      content:
        "The data quality rivals systems costing 10x more. Incredible value for research institutions in Africa.",
      rating: 5,
      image: "/african-male-doctor-researcher-professional-headsh.jpg",
    },
  ],
  // Column 2
  [
    {
      name: "Prof. James Mugisha",
      role: "Lead Researcher",
      organization: "University of Rwanda",
      content:
        "The research-grade quality of the hardware combined with the intuitive software platform has accelerated our BCI research significantly. We've published three papers using NeuroLab data.",
      rating: 5,
      image: "/african-male-professor-professional-headshot-glass.jpg",
    },
    {
      name: "Michael Uwimana",
      role: "BCI Developer",
      organization: "TechHub Rwanda",
      content:
        "The BCI Development Kit gave us everything we needed to build our neurofeedback app. The documentation and SDK are incredibly well-designed. A game-changer for neurotech startups.",
      rating: 5,
      image: "/african-male-tech-developer-professional-headshot-.jpg",
    },
    {
      name: "Dr. Aimee Uwase",
      role: "Clinical Director",
      organization: "Nyamata Hospital",
      content:
        "Super easy to use and incredibly powerful. The AI analysis quality is a game-changer for our diagnostic workflows.",
      rating: 5,
      image: "/african-female-clinical-director-professional-head.jpg",
    },
  ],
  // Column 3
  [
    {
      name: "Dr. Alice Kamanzi",
      role: "Clinical Director",
      organization: "Kigali Brain Center",
      content:
        "We've been using NeuroLab for over a year now. The customer support is exceptional and the continuous software updates keep improving our workflow. Highly recommended for any clinic.",
      rating: 5,
      image: "/african-female-doctor-clinical-director-headshot-s.jpg",
    },
    {
      name: "Emmanuel Habimana",
      role: "Psychiatrist",
      organization: "Rwanda Mental Health",
      content:
        "The mobile app integration has made it possible for us to monitor patients remotely. This is revolutionary for mental health care in our region. The real-time alerts are invaluable.",
      rating: 5,
      image: "/african-male-psychiatrist-professional-headshot.jpg",
    },
    {
      name: "Patricia Ingabire",
      role: "Neuroscientist",
      organization: "AIMS Rwanda",
      content:
        "The natural language processing feature is incredible. I can just ask questions about my data and get instant insights. It's like having a data analyst on demand!",
      rating: 5,
      image: "/african-female-neuroscientist-professional-headsho.jpg",
    },
  ],
]

function TestimonialCard({
  testimonial,
}: {
  testimonial: {
    name: string
    role: string
    organization: string
    content: string
    rating: number
    image: string
  }
}) {
  return (
    <Card className="border-border bg-card mb-4">
      <CardContent className="p-5">
        {/* Star Rating */}
        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-foreground text-sm leading-relaxed">"{testimonial.content}"</p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-4">
          <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <Image src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.organization}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ScrollingColumn({
  testimonials: items,
  direction,
}: { testimonials: (typeof testimonials)[0]; direction: "up" | "down" }) {
  const columnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const column = columnRef.current
    if (!column) return

    let animationId: number
    let position = direction === "up" ? 0 : -column.scrollHeight / 2

    const animate = () => {
      if (direction === "up") {
        position -= 0.3
        if (position <= -column.scrollHeight / 2) {
          position = 0
        }
      } else {
        position += 0.3
        if (position >= 0) {
          position = -column.scrollHeight / 2
        }
      }
      column.style.transform = `translateY(${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [direction])

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items]

  return (
    <div className="overflow-hidden h-[600px]">
      <div ref={columnRef} className="flex flex-col">
        {duplicatedItems.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="bg-background py-5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join hundreds of researchers, clinicians, and developers who trust NeuroLab for their neurotechnology needs
          </p>
        </div>

        {/* Scrolling Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ScrollingColumn testimonials={testimonials[0]} direction="up" />
          <ScrollingColumn testimonials={testimonials[1]} direction="down" />
          <div className="hidden lg:block">
            <ScrollingColumn testimonials={testimonials[2]} direction="up" />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-secondary/50 rounded-2xl">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-muted-foreground mt-1">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">15+</div>
            <div className="text-sm text-muted-foreground mt-1">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground mt-1">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
