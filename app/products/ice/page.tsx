"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, CheckCircle, Snowflake, Truck, Factory, Thermometer, Package, Clock, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function IcePage() {
  const iceProducts = [
    {
      name: "Block Ice",
      image: "/blockice.jpg",
      description: "High-quality block ice perfect for commercial cooling, fishing, and large-scale refrigeration needs.",
      sizes: ["25kg", "50kg", "100kg"],
      applications: ["Commercial cooling", "Fishing industry", "Food preservation", "Construction cooling"]
    },
    {
      name: "Cube Ice",
      image: "/iceblook.jpg",
      description: "Crystal clear cube ice ideal for beverages, restaurants, and retail establishments.",
      sizes: ["5kg", "10kg", "20kg"],
      applications: ["Restaurants", "Bars", "Retail stores", "Events"]
    },
    {
      name: "Crushed Ice",
      image: "/icebloock2.jpg",
      description: "Fine crushed ice perfect for displays, food presentation, and quick cooling applications.",
      sizes: ["2kg", "5kg", "10kg"],
      applications: ["Food displays", "Seafood markets", "Medical cooling", "Sports events"]
    },
    {
      name: "Dry Ice",
      image: "/iceblock3.jpg",
      description: "Specialized dry ice for shipping, industrial cooling, and special effects applications.",
      sizes: ["1kg", "5kg", "10kg"],
      applications: ["Shipping frozen goods", "Industrial processes", "Special effects", "Emergency cooling"]
    }
  ]

  const qualityFeatures = [
    {
      title: "Pure Water Source",
      description: "Made from purified water meeting the highest quality standards",
      icon: <Snowflake className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Hygienic Production",
      description: "Manufactured in clean, controlled environments with strict hygiene protocols",
      icon: <Factory className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Temperature Control",
      description: "Precise temperature management ensures optimal ice quality and longevity",
      icon: <Thermometer className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Fast Delivery",
      description: "Insulated vehicles ensure ice remains frozen during transportation",
      icon: <Truck className="h-8 w-8 text-blue-600" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-blue-950 to-cyan-950 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.jpg"
            alt="Ice Production at Agrinema Farm"
            fill
            className="object-cover opacity-30"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 py-16">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-8 bg-blue-100 text-blue-800 px-6 py-3 text-xl">
              Pure • Clean • Reliable
            </Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Premium <span className="text-blue-400">Ice Products</span>
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              High-quality ice products for commercial, industrial, and retail applications. From restaurants to fishing fleets, we provide reliable ice solutions across Limpopo.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="#contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-xl px-10 py-6">
                  <Phone className="h-6 w-6 mr-3" />
                  Order Now
                </Button>
              </Link>
              <Link href="#products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-950 text-xl px-10 py-6">
                  <Snowflake className="h-6 w-6 mr-3" />
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Quality Standards</h2>
              <p className="text-xl text-muted-foreground">Every batch of ice meets the highest standards of purity and quality</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualityFeatures.map((feature, index) => (
                <Card key={index} className="text-center border-border">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">{feature.icon}</div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ice Products */}
      <section id="products" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800">Our Products</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ice Products for Every Need</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From small retail packages to large commercial blocks, we provide ice solutions for all applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {iceProducts.map((product, index) => (
                <Card key={index} className="border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-72">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-foreground">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Available Sizes:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Applications:</p>
                        <div className="grid grid-cols-1 gap-1">
                          {product.applications.map((application, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-blue-600 mr-1" />
                              {application}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Production Process</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                State-of-the-art equipment and strict quality controls ensure consistent, high-quality ice production
              </p>
            </div>

            <Tabs defaultValue="water" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="water">Water Treatment</TabsTrigger>
                <TabsTrigger value="freezing">Freezing</TabsTrigger>
                <TabsTrigger value="packaging">Packaging</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="water" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Water Purification</h3>
                    <p className="text-muted-foreground mb-4">
                      We start with rigorous water treatment processes including filtration, purification, and quality testing to ensure the cleanest possible base for our ice products.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Multi-stage filtration
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        UV sterilization
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Quality testing
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-80">
                    <Image
                      src="/iceblook.jpg"
                      alt="Water treatment process"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="freezing" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-80">
                    <Image
                      src="/iceblook.jpg"
                      alt="Freezing process"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Controlled Freezing</h3>
                    <p className="text-muted-foreground mb-4">
                      Our advanced freezing systems maintain precise temperatures to create clear, dense ice with optimal melting characteristics for various applications.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Temperature-controlled freezing
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Clear ice formation
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Optimal density
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="packaging" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Hygienic Packaging</h3>
                    <p className="text-muted-foreground mb-4">
                      Ice is handled and packaged in clean, controlled environments using food-grade materials to maintain purity from production to customer delivery.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Food-grade packaging
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Sterile handling
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Size customization
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-80">
                    <Image
                      src="/iceblook.jpg"
                      alt="Packaging process"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="delivery" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-80">
                    <Image
                      src="/iceblook.jpg"
                      alt="Delivery trucks"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Cold Chain Delivery</h3>
                    <p className="text-muted-foreground mb-4">
                      Our insulated delivery vehicles maintain optimal temperatures during transport, ensuring ice arrives at your location in perfect condition with minimal melting.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Insulated transport vehicles
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Temperature monitoring
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        Timely delivery schedules
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ice Applications</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our ice products serve diverse industries and applications across the region
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border text-center">
                <CardContent className="p-6">
                  <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Food Industry</h3>
                  <p className="text-sm text-muted-foreground">
                    Restaurants, hotels, and food processors rely on our ice for food safety and presentation
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-border text-center">
                <CardContent className="p-6">
                  <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Fishing Industry</h3>
                  <p className="text-sm text-muted-foreground">
                    Large ice blocks for fishing boats and seafood preservation during transport
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-border text-center">
                <CardContent className="p-6">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Events & Retail</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for events, parties, and retail establishments needing reliable ice supply
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Order Ice Products?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us for bulk orders, regular delivery schedules, or special requirements for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                <Phone className="h-5 w-5 mr-2" />
                Call: 067 347 0687
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/fresh-logo.jpeg"
                    alt="Agrinema Farm Logo"
                    width={40}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                  <span className="text-2xl font-bold">Agrinema Farm</span>
                </div>
                <p className="text-green-200 mb-4 max-w-md">
                  Freshness rooted in Limpopo. From farm to table, committed to food security and community wellness
                  since 2022.
                </p>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 bg-transparent"
                  >
                    Facebook
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 bg-transparent"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="/about" className="block text-green-200 hover:text-white">
                    About Us
                  </Link>
                  <Link href="/products" className="block text-green-200 hover:text-white">
                    Our Products
                  </Link>
                  <Link href="/blog" className="block text-green-200 hover:text-white">
                    Blog
                  </Link>
                  <Link href="/contact" className="block text-green-200 hover:text-white">
                    Contact
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
                <div className="space-y-2 text-green-200">
                  <p>067 347 0687</p>
                  <p>Limpopo Province</p>
                  <p>South Africa</p>
                </div>
              </div>
            </div>

            <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-200">
              <p>&copy; {new Date().getFullYear()} Agrinema Farm. All rights reserved. Proudly South African.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
