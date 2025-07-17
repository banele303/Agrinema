"use client"

import { useState, useEffect } from "react"
import ProductsListing from "@/components/products-listing"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Phone } from "lucide-react"
import { Product } from "@/types/product"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const productsData = await response.json()
        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 to-emerald-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto pt-16">
            <Badge className="mb-6 bg-green-100 text-green-800 px-4 py-2 text-lg">
              Farm Fresh Products
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Fresh From Our <span className="text-green-400">Fields</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover our complete range of premium fresh vegetables, quality poultry, and essential ice products. 
              All grown and produced with care in Limpopo, South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                  <Phone className="h-5 w-5 mr-2" />
                  Order Now
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-900 text-lg px-8 py-4 bg-transparent"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Listing */}
      <ProductsListing 
        products={products}
        title="All Our Products"
        subtitle="Browse our complete collection of farm-fresh produce and quality products"
        showSearch={true}
        showFilters={true}
        gridCols="3"
      />

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link 
          href="https://wa.me/27673470687" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:shadow-green-500/50 overflow-hidden"
        >
          <img
            src="/icons8-whatsapp-50.png"
            alt="WhatsApp"
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
        </Link>
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-green-50 dark:bg-green-950/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Place Your Order?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today for wholesale pricing, bulk orders, or any questions about our fresh produce.
              We deliver quality and freshness straight from our farm to your table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/27673470687?text=Hi! I'm interested in placing an order for fresh produce.">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Phone className="h-5 w-5 mr-2" />
                  WhatsApp Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950">
                  View Contact Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
