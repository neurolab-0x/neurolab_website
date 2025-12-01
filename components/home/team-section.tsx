import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Jean-Pierre Mugabo",
    role: "Founder & CEO",
    image: "/african-male-neuroscientist-professional-headshot.jpg",
    bio: "Neuroscientist with 15+ years of experience in brain-computer interfaces.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Aline Uwimana",
    role: "Chief Technology Officer",
    image: "/african-female-ai-researcher-professional-headshot.jpg",
    bio: "AI researcher specializing in signal processing and machine learning.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Emmanuel Habimana",
    role: "Head of Hardware",
    image: "/african-male-electronics-engineer-professional-hea.jpg",
    bio: "Electronics engineer with expertise in biomedical device design.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Grace Mukamana",
    role: "Lead Software Engineer",
    image: "/african-female-software-developer-professional-hea.jpg",
    bio: "Full-stack developer focused on real-time data visualization.",
    linkedin: "#",
    twitter: "#",
  },
]

export function TeamSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A diverse team of scientists, engineers, and innovators passionate about neurotechnology
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden border-border bg-card group">
              <div className="aspect-square overflow-hidden bg-secondary">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                <div className="mt-4 flex justify-center gap-3">
                  <a href={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
