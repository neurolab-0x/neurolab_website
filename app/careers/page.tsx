"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Zap,
  Users,
  Globe,
  GraduationCap,
  Coffee,
  Plane,
  HeartPulse,
  Upload,
  CheckCircle2,
  Info,
} from "lucide-react"

const openPositions = [
  // {
  //   id: "ml-engineer",
  //   title: "Senior Machine Learning Engineer",
  //   department: "AI & Research",
  //   location: "Kigali, Rwanda",
  //   type: "Full-time",
  //   description: "Lead the development of our AI algorithms for EEG signal processing and pattern recognition.",
  //   tags: ["Python", "TensorFlow", "Signal Processing", "ML"],
  // },
  // {
  //   id: "embedded-engineer",
  //   title: "Embedded Systems Engineer",
  //   department: "Hardware",
  //   location: "Kigali, Rwanda",
  //   type: "Full-time",
  //   description: "Design and develop firmware for our next-generation EEG acquisition devices.",
  //   tags: ["C/C++", "ARM", "PCB Design", "DSP"],
  // },
  // {
  //   id: "fullstack-dev",
  //   title: "Full-Stack Developer",
  //   department: "Platform",
  //   location: "Remote (Africa)",
  //   type: "Full-time",
  //   description: "Build and maintain our cloud platform and web applications for neural data analysis.",
  //   tags: ["React", "Node.js", "PostgreSQL", "AWS"],
  // },
  // {
  //   id: "clinical-research",
  //   title: "Clinical Research Associate",
  //   department: "Research",
  //   location: "Kigali, Rwanda",
  //   type: "Full-time",
  //   description: "Coordinate clinical studies and manage relationships with healthcare partners.",
  //   tags: ["Clinical Trials", "Data Analysis", "Healthcare"],
  // },
  // {
  //   id: "product-designer",
  //   title: "Product Designer",
  //   department: "Design",
  //   location: "Kigali, Rwanda / Remote",
  //   type: "Full-time",
  //   description: "Create intuitive and beautiful interfaces for our hardware and software products.",
  //   tags: ["Figma", "UX Research", "Design Systems"],
  // },
  // {
  //   id: "tech-support",
  //   title: "Technical Support Specialist",
  //   department: "Customer Success",
  //   location: "Kigali, Rwanda",
  //   type: "Full-time",
  //   description: "Provide expert technical support to our global customer base of researchers and clinicians.",
  //   tags: ["Customer Support", "EEG", "Technical Writing"],
  // },
]

const values = [
  {
    icon: Zap,
    title: "Innovation First",
    description: "We push boundaries and embrace new ideas to solve complex problems.",
  },
  {
    icon: Heart,
    title: "Impact Driven",
    description: "Our work directly improves lives through accessible neurotechnology.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "We believe the best solutions come from diverse teams working together.",
  },
  {
    icon: Globe,
    title: "African Pride",
    description: "We're proud to build world-class technology from the heart of Africa.",
  },
]

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<(typeof openPositions)[0] | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState("")

  const handleApply = (position: (typeof openPositions)[0]) => {
    setSelectedPosition(position)
    setIsModalOpen(true)
    setIsSubmitted(false)
    setFileName("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
                <Briefcase className="h-4 w-4" />
                <span>Join Our Team</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Build the Future of <span className="text-primary">Neurotechnology</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Join a passionate team of scientists, engineers, and innovators working to make brain technology
                accessible to everyone. Based in Kigali, Rwanda, we're building world-class solutions from the heart of
                Africa.
              </p>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <a href="#positions">
                    View Open Positions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-secondary/30 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Values</h2>
              <p className="mt-4 text-lg text-muted-foreground">What drives us every day at NeuroLab</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title} className="border-border bg-card text-center">
                  <CardContent className="p-8">
                    <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
      
        {/* Open Positions */}
        <section id="positions" className="py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Open Positions</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Find your next opportunity and help us build the future of neurotechnology
              </p>
            </div>

            {openPositions.length > 0 ? (
              <div className="space-y-4">
                {openPositions.map((position) => (
                  <Card key={position.id} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{position.title}</h3>
                            <Badge variant="secondary">{position.department}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{position.description}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {position.type}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {position.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Button onClick={() => handleApply(position)}>
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <Info className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Open Positions</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    We don't have any open positions at the moment, but we're always looking for talented individuals to
                    join our team. Feel free to send us your resume for future opportunities.
                  </p>
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Submit Your Resume
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                Don't See a Perfect Fit?
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/90">
                We're always looking for talented individuals. Send us your resume and tell us how you'd like to
                contribute.
              </p>
              <div className="mt-10">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          {!isSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Apply for Position</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedPosition?.title} - {selectedPosition?.department}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" required className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" required className="h-11" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+250 788 123 456" required className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Current Location *</Label>
                  <Input id="location" placeholder="Kigali, Rwanda" required className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Select required>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio / GitHub</Label>
                  <Input id="portfolio" placeholder="https://github.com/yourusername" className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cv">Upload CV/Resume *</Label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cv"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex items-center gap-3 h-11 px-4 border border-input rounded-md bg-background hover:bg-accent transition-colors">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {fileName || "Choose file (PDF, DOC, DOCX)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Tell us why you're interested in this role and what makes you a great fit..."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hearAbout">How did you hear about us?</Label>
                  <Select>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="referral">Employee Referral</SelectItem>
                      <SelectItem value="jobboard">Job Board</SelectItem>
                      <SelectItem value="website">Company Website</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 h-11">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 h-11">
                    Submit Application
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for applying for the {selectedPosition?.title} position. We'll review your application and get
                back to you within 5-7 business days.
              </p>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}