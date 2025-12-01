const partners = [
  {
    name: "Rwanda Coding Academy",
    logo: "/rca.png",
    description: "Training the next generation of tech talent",
  },
  {
    name: "Aphezis Technologies",
    logo: "/aphezis.png",
    description: "Leading software solutions provider",
  },
  {
    name: "Benax Technologies",
    logo: "/benax.png",
    description: "Hardware manufacturing partner",
  },
  
  {
    name: "Sand Technologies",
    logo: "/sandtech.png",
    description: "Global partner in electronics distribution",
  },
  {
    name: "Neuralink",
    logo: "/neuralink.png",
    description: "Pioneering brain-machine interfaces",
  },
]

export function PartnersSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by Leading Institutions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Collaborating with world-class organizations to advance neuroscience
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center p-8 bg-background rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-16 w-auto object-contain  transition-all duration-300"
              />
              <h3 className="mt-4 font-semibold text-foreground text-center">{partner.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground text-center">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
