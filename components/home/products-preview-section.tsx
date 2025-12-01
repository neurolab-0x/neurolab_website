import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: "Neurolab-kit-001",
    name: "NeuroLab EEG Starter Kit",
    description: "Portable EEG device with 8 channels, ideal for beginners and educational purposes.",
    price: 275,
    image: "/kit.png",
    tags: ["EEG", "Wearable", "Educational Kit"],
  },
 
]

export function ProductsPreviewSection() {
  return (
    <section className=" py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Hardware</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Research-grade neurotechnology devices built for precision and reliability
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-border bg-card transition-all duration-300">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-foreground line-clamp-1">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <p className="mt-4 text-2xl font-bold text-primary">${product.price.toLocaleString()}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-3">
                <Button className="flex-1" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
