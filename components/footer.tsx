import Link from "next/link"
import { Brain, Linkedin, Twitter, Mail, Instagram } from "lucide-react"

const footerNavigation = {
  products: [
    { name: "EEG Headsets", href: "/products" },
    { name: "BCI Systems", href: "/products" },
    { name: "Amplifiers", href: "/products" },
    { name: "Accessories", href: "/products" },
  ],
  platform: [
    { name: "AI Analysis", href: "/platform" },
    { name: "Real-Time Dashboard", href: "/platform" },
    { name: "API Access", href: "/platform" },
    { name: "Documentation", href: "/platform" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Partners", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Warranty", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="this is the logo" width={40} height={40} className="rounded-full"/>
              <span className="text-xl font-bold text-foreground">NeuroLab</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              Empowering neural innovation with research-grade EEG hardware and AI-powered analysis platforms. Based in
              Kigali, Rwanda.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/neurolab-cc/" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/neurolab.icn/" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Instagran</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:info@neurolab.cc" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Products</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.products.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">Platform</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.platform.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Company</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground">Legal</h3>
                <ul className="mt-4 space-y-3">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} NeuroLab. All rights reserved. | Kigali, Rwanda
          </p>
        </div>
      </div>
    </footer>
  )
}
