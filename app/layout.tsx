import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "NeuroLab | AI-Powered Neurotechnology Solutions",
  description:
    "NeuroLab is a Kigali-based neurotechnology company creating research-grade EEG hardware and AI-powered neural analysis platforms. Empowering neural innovation.",
  keywords: ["EEG", "neurotechnology", "brain-computer interface", "BCI", "neural analysis", "AI", "Rwanda", "Kigali"],
  authors: [{ name: "NeuroLab" }],
  creator: "NeuroLab",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0057D9",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
