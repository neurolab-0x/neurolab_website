"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, CheckCircle, Loader2 } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "info@neurolab.cc",
    href: "mailto:info@neurolab.cc",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+250 788 123 456",
    href: "tel:+250788123456",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Norrsken House Kigali, KN 78 St, Kigali, Rwanda",
    href: "https://maps.google.com/?q=Norrsken+House+Kigali",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Fri: 8:00 AM - 6:00 PM (CAT)",
    href: "#",
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", organization: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Get in Touch</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Have questions about our products or platform? Want to discuss a partnership? We&apos;d love to hear
                from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-border bg-card py-6">
                  <CardHeader>
                    <CardTitle className="text-foreground">Send Us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                          <CheckCircle className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                        <p className="mt-2 text-muted-foreground">
                          Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                        </p>
                        <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              required
                              className="h-11 outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              required
                              className="h-11 outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="organization">Organization</Label>
                            <Input
                              id="organization"
                              name="organization"
                              value={formData.organization}
                              onChange={handleChange}
                              placeholder="Company or institution"
                              className="h-12 outline-none"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject *</Label>
                            <Select
                              value={formData.subject}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                              required
                            >
                              <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sales">Product Inquiry / Sales</SelectItem>
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                                <SelectItem value="demo">Request a Demo</SelectItem>
                                <SelectItem value="careers">Careers</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project or inquiry..."
                            className="min-h-[132px] resize-none outline-none"
                            required
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info Sidebar */}
              <div className="space-y-6">
                <Card className="border-border bg-card py-6">
                  <CardHeader>
                    <CardTitle className="text-foreground">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {contactInfo.map((item) => (
                      <a key={item.title} href={item.href} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 p-2 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            {item.content}
                          </p>
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border bg-card py-6">
                  <CardHeader>
                    <CardTitle className="text-foreground">Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-primary" />
                      </a>
                      <a
                        href="#"
                        className="p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-5 w-5 text-primary" />
                      </a>
                      <a
                        href="mailto:info@neurolab.cc"
                        className="p-3 bg-secondary rounded-lg hover:bg-primary/10 transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="h-5 w-5 text-primary" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">Need Urgent Support?</h3>
                    <p className="mt-2 text-sm text-primary-foreground/90">
                      For technical emergencies or urgent inquiries, please call our support line directly.
                    </p>
                    <Button variant="secondary" className="mt-4 w-full" asChild>
                      <a href="tel:+250788123456">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Support
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-foreground">Visit Our Office</h2>
              <p className="mt-2 text-muted-foreground">Norrsken House Kigali, KN 78 St, Kigali, Rwanda</p>
            </div>
            <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-secondary shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4788837428894!2d30.112358775534895!3d-1.9562181367731807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6839543c1a5%3A0x48b2f38ce32d1e0d!2sNorrsken%20House%20Kigali!5e0!3m2!1sen!2sus!4v1733059200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NeuroLab Office at Norrsken House Kigali"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}