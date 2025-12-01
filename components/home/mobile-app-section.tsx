import { Button } from "@/components/ui/button"
import { Apple, Play, Smartphone, Bell, Activity, Brain } from "lucide-react"
import Image from "next/image"

const appFeatures = [
  { icon: Activity, text: "Real-time brain activity monitoring" },
  { icon: Bell, text: "Personalized alerts and insights" },
  { icon: Brain, text: "AI-powered wellness recommendations" },
]

export function MobileAppSection() {
  return (
    <section className="bg-background py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-primary">
              <Smartphone className="h-4 w-4" />
              <span>Mobile App</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Your Brain Health, <span className="text-primary">In Your Pocket</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Download the NeuroLab mobile app for personalized brain health insights, real-time monitoring, and
              AI-powered recommendations. Perfect for neurofeedback, meditation, and cognitive wellness tracking.
            </p>

            <ul className="mt-8 space-y-4">
              {appFeatures.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <Apple className="h-5 w-5" />
                Download for iOS
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Play className="h-5 w-5" />
                Download for Android
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Available on iOS 14+ and Android 10+. Free to download with premium features.
            </p>
          </div>

          {/* Mobile Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative ">
              {/* Phone Frame */}
             <img src="/phone.svg" alt="Mobile App Mockup"  className=" h-auto w-full"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
