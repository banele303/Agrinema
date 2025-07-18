"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, CheckCircle, Heart, Shield, Award, Users, Truck, Star, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function PoultryPage() {
  const poultryProducts = [
    {
      name: "Free-Range Chickens",
      image: "/pp2.jpg",
      description: "Happy, healthy chickens raised in spacious outdoor environments with natural feeding.",
      availability: "Year-round",
      benefits: ["High-quality protein", "Natural feeding", "Stress-free environment", "Better taste"]
    },
    {
      name: "Farm Fresh Eggs",
      image: "/poultry1.jpg",
      description: "Daily fresh eggs from our free-range hens, rich in nutrients and flavor.",
      availability: "Daily",
      benefits: ["High protein", "Rich in vitamins", "Free-range sourced", "Fresh daily"]
    },
    {
      name: "Organic Chicken Feed",
      image: "/chicken.jpeg",
      description: "Premium organic feed formulated for optimal poultry health and nutrition.",
      availability: "Year-round",
      benefits: ["Organic ingredients", "Balanced nutrition", "Growth support", "Health promoting"]
    }
  ]

  const careStandards = [
    {
      title: "Free-Range Environment",
      description: "Our poultry roam freely in spacious outdoor areas with access to natural grass and insects",
      icon: <Users className="h-8 w-8 text-amber-600" />
    },
    {
      title: "Natural Diet",
      description: "Fed with organic grains, vegetables, and allowed to forage naturally",
      icon: <Heart className="h-8 w-8 text-amber-600" />
    },
    {
      title: "Health Monitoring",
      description: "Regular health checks and veterinary care to ensure optimal wellbeing",
      icon: <Shield className="h-8 w-8 text-amber-600" />
    },
    {
      title: "Quality Assurance",
      description: "Strict quality controls from breeding to processing for premium products",
      icon: <Award className="h-8 w-8 text-amber-600" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-amber-950 to-orange-950 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fresh1.jpeg"
            alt="Free-range Poultry at Agrinema Farm"
            fill
            className="object-cover opacity-30"
            priority
            quality={85}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 py-16">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-8 bg-amber-100 text-amber-800 px-6 py-3 text-xl">
              Free-Range • Natural • Healthy
            </Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Premium <span className="text-amber-400">Poultry</span>
            </h1>
            <p className="text-2xl md:text-3xl text-amber-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Ethically raised, free-range poultry providing the highest quality eggs and meat. Our chickens enjoy natural environments and premium care for superior products.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="#contact">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-xl px-10 py-6">
                  <Phone className="h-6 w-6 mr-3" />
                  Order Now
                </Button>
              </Link>
              <Link href="#products">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-amber-950 text-xl px-10 py-6">
                  <Star className="h-6 w-6 mr-3" />
                  Our Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Care Standards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Care Standards</h2>
              <p className="text-xl text-muted-foreground">Ensuring the highest welfare standards for healthy, happy poultry</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {careStandards.map((standard, index) => (
                <Card key={index} className="text-center border-border">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">{standard.icon}</div>
                    <h3 className="font-semibold text-foreground mb-2">{standard.title}</h3>
                    <p className="text-sm text-muted-foreground">{standard.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Poultry Products */}
      <section id="products" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-amber-100 text-amber-800">Our Products</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Premium Poultry Products</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From fresh eggs to healthy chickens, all our poultry products meet the highest standards of quality and care
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {poultryProducts.map((product, index) => (
                <Card key={index} className="border-border overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
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
                        <p className="text-sm font-medium text-foreground mb-2">Availability: {product.availability}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Key Benefits:</p>
                        <div className="grid grid-cols-1 gap-1">
                          {product.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-amber-600 mr-1" />
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

      {/* Farming Practices */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Poultry Practices</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From hatching to harvest, we follow ethical and sustainable practices that prioritize animal welfare and product quality
              </p>
            </div>

            <Tabs defaultValue="housing" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="housing">Housing</TabsTrigger>
                <TabsTrigger value="feeding">Feeding</TabsTrigger>
                <TabsTrigger value="health">Health Care</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="housing" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Free-Range Housing</h3>
                    <p className="text-muted-foreground mb-4">
                      Our poultry live in spacious, well-ventilated coops with easy access to large outdoor areas. This free-range environment allows natural behaviors like foraging, dust bathing, and roaming.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Spacious outdoor ranges
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Well-ventilated coops
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Natural behavior encouragement
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-80">
                    <Image
                      src="/IMG_6092.jpg"
                      alt="Free-range housing"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="feeding" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-80">
                    <Image
                      src="/chicken.jpeg"
                      alt="Natural feeding"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Natural & Organic Feeding</h3>
                    <p className="text-muted-foreground mb-4">
                      Our poultry enjoy a diverse diet of organic grains, fresh vegetables from our farm, and natural foraging. This varied nutrition contributes to healthier birds and better-tasting products.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Organic grain feed
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Fresh farm vegetables
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Natural foraging opportunities
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="health" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Comprehensive Health Care</h3>
                    <p className="text-muted-foreground mb-4">
                      We maintain strict health protocols with regular veterinary check-ups, preventive care, and immediate attention to any health concerns. Our focus on prevention ensures consistently healthy flocks.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Regular veterinary care
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Preventive health measures
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Disease monitoring
                      </li>
                    </ul>
                  </div>
                  <div className="relative h-80">
                    <Image
                      src="/IMG_6100.jpg"
                      alt="Health care"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="processing" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="relative h-80">
                    <Image
                      src="/poultry1.jpg"
                      alt="Processing facilities"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Ethical Processing</h3>
                    <p className="text-muted-foreground mb-4">
                      Our processing follows the highest standards of hygiene and animal welfare. From egg collection to meat processing, we maintain strict quality controls and ethical practices.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Hygienic facilities
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Ethical processing methods
                      </li>
                      <li className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-amber-600 mr-2" />
                        Quality control standards
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Why Choose Our Poultry?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our commitment to ethical practices and quality care results in superior poultry products
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-border text-center">
                <CardContent className="p-6">
                  <Heart className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Ethical Treatment</h3>
                  <p className="text-sm text-muted-foreground">
                    Our poultry live in stress-free environments with natural behaviors encouraged
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-border text-center">
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Superior Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Higher protein content and better taste from natural feeding and care
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-border text-center">
                <CardContent className="p-6">
                  <Truck className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Fresh Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    From our farm to your table with minimal processing time
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-amber-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Order Premium Poultry?</h2>
            <p className="text-xl text-amber-100 mb-8">
              Contact us for fresh eggs, free-range chickens, or bulk orders for restaurants and retailers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50">
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
