"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Filter, X } from "lucide-react"
import { products, categories } from "@/lib/products"

type SortOption = "popular" | "newest" | "price-asc" | "price-desc"

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.reverse()
        break
      default:
        // popular - keep original order
        break
    }

    return result
  }, [selectedCategories, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <span className="text-sm text-muted-foreground">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Page Header */}
        <section className=" py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Hardware Products</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Research-grade EEG hardware and neurotechnology devices built for precision, reliability, and ease of use.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Filters</h2>
                  <FilterContent />
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="lg:hidden bg-transparent">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                          {selectedCategories.length > 0 && (
                            <Badge variant="secondary" className="ml-2">
                              {selectedCategories.length}
                            </Badge>
                          )}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left">
                        <SheetHeader>
                          <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                          <FilterContent />
                        </div>
                      </SheetContent>
                    </Sheet>

                    <p className="text-sm text-muted-foreground">
                      {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Active Filters */}
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group overflow-hidden border-border bg-card transition-all duration-300"
                    >
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {product.tags.slice(0, 3).map((tag) => (
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

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No products found matching your filters.</p>
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
