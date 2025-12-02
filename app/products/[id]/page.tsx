"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ShoppingCart,
  Phone,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  Cpu,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Package,
  CreditCard,
  Truck,
  Lock,
  Minus,
  Plus,
  Check,
  Loader2,
} from "lucide-react"
import { getProductById, products, type Product } from "@/lib/products"
import { useRouter } from "next/navigation"

const featureIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Channels: Cpu,
  Connectivity: Wifi,
  "Battery Life": Battery,
  Resolution: Zap,
  Impedance: Shield,
}

export default function ProductDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [product, setProduct] = useState<Product | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  useEffect(() => {
    if (params?.id) {
      const id = params.id as string
      console.log("[v0] Product ID from params:", id)
      const foundProduct = getProductById(id)
      console.log("[v0] Found product:", foundProduct?.name || "Not found")
      setProduct(foundProduct || null)
      setIsLoading(false)
    }
  }, [params?.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)
  }

  const relatedProducts = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)

  const subtotal = product.price * quantity
  const shipping = subtotal > 500 ? 0 : 49.99
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  const handleCheckout = () => {
    if (checkoutStep < 3) {
      setCheckoutStep(checkoutStep + 1)
    } else {
      setOrderComplete(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-secondary/30 py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Header */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/50">
                  <img
                    src={product.gallery[currentImageIndex] || "/placeholder.svg"}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {product.gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {product.gallery.length > 1 && (
                  <div className="flex gap-3">
                    {product.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImageIndex ? "border-primary" : "border-transparent"
                          }`}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>

                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{product.description}</p>

                <div className="mt-8">
                  <p className="text-4xl font-bold text-primary">${product.price.toLocaleString()}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Free shipping on orders over $500</p>
                </div>

                <div className="mt-6">
                  <Label className="text-sm font-medium text-foreground">Quantity</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1" onClick={()=>router.push("htpps://waitlist.neurolab.cc")}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Buy Now - ${(product.price * quantity).toLocaleString()}
                  </Button>

                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">
                      <Phone className="mr-2 h-5 w-5" />
                      Contact Sales
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-3 bg-secondary/30 rounded-lg">
                    <Truck className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Paid Shipping</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-secondary/30 rounded-lg">
                    <Shield className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">2 Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-secondary/30 rounded-lg">
                    <Lock className="h-5 w-5 text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-12 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Key Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.specs.slice(0, 4).map((spec) => {
                const IconComponent = featureIcons[spec.label] || Cpu
                return (
                  <Card key={spec.label} className="text-center ">
                    <CardContent className="py-6">
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{spec.label}</p>
                      <p className="font-semibold text-foreground">{spec.value}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Tabs defaultValue="description" className="w-full ">
              <TabsList className="grid w-full grid-cols-4 mb-8 ">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="inbox">In the Box</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Features</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specs">
                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full">
                    <tbody>
                      {product.specs.map((spec, index) => (
                        <tr key={spec.label} className={index % 2 === 0 ? "bg-secondary/30" : "bg-background"}>
                          <td className="px-6 py-4 font-medium text-foreground">{spec.label}</td>
                          <td className="px-6 py-4 text-muted-foreground">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="inbox">
                <Card>
                  <CardContent className="py-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Package className="h-6 w-6 text-primary" />
                      <h3 className="text-lg font-semibold text-foreground">What&apos;s in the Box?</h3>
                    </div>
                    <ul className="space-y-3">
                      {product.inBox.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq">
                <Accordion type="single" collapsible className="w-full">
                  {product.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* AI Platform Integration */}
        <section className="py-12 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Card className="overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge variant="secondary" className="mb-4">
                      Software Integration
                    </Badge>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Integrates with Our AI Platform</h2>
                    <p className="text-muted-foreground mb-6">
                      This hardware connects seamlessly with the NeuroLab AI Platform for real-time analysis,
                      visualization, and reporting. Upload your recordings or stream live data for instant insights.
                    </p>
                    <Button asChild>
                      <Link href="/platform">
                        Learn About Our Software
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-8 text-center">
                    <Cpu className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">AI-Powered Analysis Platform</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="overflow-hidden group">
                    <div className="aspect-[4/3] overflow-hidden bg-secondary/50">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{relatedProduct.name}</h3>
                      <p className="text-primary font-bold mb-4">${relatedProduct.price.toLocaleString()}</p>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href={`/products/${relatedProduct.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
