"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, CheckCircle, Leaf, Sun, Droplets, Package, Truck, Shield, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function VegetablesPage() {
  const vegetables = [
    {
      name: "Fresh Tomatoes",
      image: "/tomato5.jpg",
      description: "Juicy, ripe tomatoes grown in optimal conditions for maximum flavor and nutrition.",
      season: "Year-round",
      benefits: ["Rich in Vitamin C", "High in Lycopene", "Low in Calories", "Heart Healthy"]
    },
    {
      name: "Premium Onions",
      image: "/onion4.jpg",
      description: "Sweet and crisp onions perfect for cooking and fresh consumption.",
      season: "Year-round",
      benefits: ["Rich in Antioxidants", "Anti-inflammatory", "Good for Heart Health", "Immune Support"]
    },
    {
      name: "Fresh Spinach",
      image: "/spinash.jpg",
      description: "Nutrient-dense leafy greens packed with vitamins and minerals.",
      season: "Cool season",
      benefits: ["High in Iron", "Rich in Folate", "Vitamin K", "Antioxidant Properties"]
    },
    {
      name: "Green Peppers",
      image: "/greanpaper.jpeg",
      description: "Crisp and colorful peppers perfect for salads and cooking.",
      season: "Summer",
      benefits: ["High Vitamin C", "Low Calories", "Rich in Fiber", "Antioxidants"]
    },
    {
      name: "Butternut Squash",
      image: "/better.jpg",
      description: "Sweet and nutty squash rich in vitamins and perfect for various dishes.",
      season: "Fall/Winter",
      benefits: ["High in Vitamin A", "Rich in Potassium", "Good Fiber Source", "Low in Calories"]
    },
    {
      name: "Fresh Potatoes",
      image: "/gwili.jpg",
      description: "Versatile and nutritious potatoes grown in our fertile Limpopo soil.",
      season: "Year-round",
      benefits: ["Good Carb Source", "Rich in Potassium", "Vitamin C", "Dietary Fiber"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-green-950 to-emerald-950 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/vegetable.jpeg"
            alt="Fresh Vegetables from Agrinema Farm"
            fill
            className="object-cover opacity-30"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 py-16">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-8 bg-green-100 text-green-800 px-6 py-3 text-xl">
              Fresh • Organic • Local
            </Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Fresh <span className="text-green-400">Vegetables</span>
            </h1>
            <p className="text-2xl md:text-3xl text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Farm-fresh vegetables grown with care in Limpopo&apos;s fertile soil. From crisp salads to hearty meals, our vegetables bring nutrition and flavor to your table.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="#contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-xl px-10 py-6">
                  <Phone className="h-6 w-6 mr-3" />
                  Order Now
                </Button>
              </Link>
              <Link href="#varieties">
                <Button size="lg" variant="outline" className="border-white text- hover:bg-white hover:text-green-950 text-xl px-10 py-6">
                  <Leaf className="h-6 w-6 mr-3" />
                  View Varieties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Quality Promise</h2>
              <p className="text-xl text-muted-foreground">Every vegetable is carefully grown and harvested at peak freshness</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center border-border">
                <CardContent className="p-6">
                  <Sun className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Natural Growing</h3>
                  <p className="text-sm text-muted-foreground">Grown under optimal sunlight conditions</p>
                </CardContent>
              </Card>
              <Card className="text-center border-border">
                <CardContent className="p-6">
                  <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Pure Water</h3>
                  <p className="text-sm text-muted-foreground">Irrigated with clean, filtered water</p>
                </CardContent>
              </Card>
              <Card className="text-center border-border">
                <CardContent className="p-6">
                  <Package className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Fresh Packaging</h3>
                  <p className="text-sm text-muted-foreground">Carefully packaged to maintain freshness</p>
                </CardContent>
              </Card>
              <Card className="text-center border-border">
                <CardContent className="p-6">
                  <Truck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">From farm to your table quickly</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vegetable Varieties */}
      <section id="varieties" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800">Our Varieties</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">8+ Fresh Vegetable Varieties</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Each variety is carefully selected and grown to provide maximum nutrition and flavor
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vegetables.map((vegetable, index) => (
                <Card key={index} className="border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={vegetable.image}
                      alt={vegetable.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-foreground">{vegetable.name}</CardTitle>
                    <CardDescription>{vegetable.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Season: {vegetable.season}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Health Benefits:</p>
                        <div className="grid grid-cols-2 gap-1">
                          {vegetable.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                              {benefit}
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

      {/* Farming Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Growing Process</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From seed to harvest, we follow sustainable practices that ensure quality and environmental responsibility
              </p>
            </div>

            <Tabs defaultValue="planting" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="planting">Planting</TabsTrigger>
                <TabsTrigger value="growing">Growing</TabsTrigger>
                <TabsTrigger value="harvesting">Harvesting</TabsTrigger>
                <TabsTrigger value="packaging">Packaging</TabsTrigger>
              </TabsList>
              
              <TabsContent value="planting" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Seed Selection & Planting</h3>
                    <p className="text-muted-foreground mb-4">
                      We start with high-quality, non-GMO seeds carefully selected for our Limpopo climate. Our experienced farmers prepare the soil with organic matter and plant at optimal spacing for healthy growth.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Premium seed varieties
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Soil preparation with organic matter
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Optimal planting timing
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-80">
                    <Image
                      src="/plant5.jpeg"
                      alt="Planting process"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="growing" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-80">
                    <Image
                      src="/plant6.jpeg"
                      alt="Growing process"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Care & Cultivation</h3>
                    <p className="text-muted-foreground mb-4">
                      During the growing phase, our vegetables receive careful attention with proper irrigation, organic fertilization, and natural pest management to ensure healthy development.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Drip irrigation systems
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Organic fertilizers
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Natural pest management
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="harvesting" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Peak Harvest</h3>
                    <p className="text-muted-foreground mb-4">
                      Our vegetables are harvested at peak ripeness to ensure maximum flavor and nutritional content. Early morning harvesting helps preserve freshness and extends shelf life.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Optimal ripeness timing
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Early morning harvest
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Gentle handling procedures
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-80">
                    <Image
                      src="/plant7.jpeg"
                      alt="Harvesting process"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="packaging" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-80">
                    <Image
                      src="/spinash2.jpg"
                      alt="Packaging process"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Fresh Packaging & Distribution</h3>
                    <p className="text-muted-foreground mb-4">
                      Immediately after harvest, vegetables are cleaned, sorted, and packaged in clean facilities to maintain freshness during transport to our customers.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Clean washing facilities
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Quality sorting
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        Fresh packaging
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Order Fresh Vegetables?</h2>
            <p className="text-xl text-green-100 mb-8">
              Contact us today for wholesale orders, bulk purchases, or regular deliveries of our fresh vegetables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50">
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
