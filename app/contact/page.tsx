"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Phone,
  MapPin,
  Leaf,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Users,
  Truck,
  Package,
  Calendar,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=600&width=1920"
            alt="Contact Agrinema Farm - Get in touch for fresh produce and agricultural products"
            fill
            className="object-cover opacity-20 dark:opacity-10"
            priority
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 text-lg">
              Get In Touch
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Contact <span className="text-green-600">Agrinema Farm</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Ready to partner with us? Get in touch for wholesale orders, product inquiries, or to learn more about our
              sustainable farming practices.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Send Us a Message
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Let&apos;s Start a Conversation</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you within 24 hours. For urgent inquiries, please call
                    us directly.
                  </p>
                </div>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+27 xxx xxx xxxx"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company/Organization</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Your company name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">Inquiry Type *</Label>
                        <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wholesale">Wholesale Partnership</SelectItem>
                            <SelectItem value="retail">Retail Purchase</SelectItem>
                            <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                            <SelectItem value="poultry">Poultry Products</SelectItem>
                            <SelectItem value="ice">Ice Products</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Tell us about your requirements, questions, or how we can help you..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Contact Information
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch Directly</h2>
                  <p className="text-muted-foreground">
                    Prefer to speak directly? We&apos;re available through multiple channels to assist you with your
                    agricultural needs.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <Phone className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Phone Numbers</h3>
                          <div className="space-y-1">
                            <p className="text-muted-foreground">Primary: 067 347 0687</p>
                            <p className="text-muted-foreground">Secondary: 068 801 1545</p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">Available 7 days a week, 8 AM - 6 PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                          <p className="text-muted-foreground">067 347 0687</p>
                          <p className="text-sm text-muted-foreground mt-2">Quick responses for urgent inquiries</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Our Locations</h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                              <strong>Xigalo:</strong> Next to Cheapside and Balow Lodge
                            </p>
                            <p>
                              <strong>Tshamutilikwa:</strong> Next to soccer ground
                            </p>
                            <p>
                              <strong>Bunzhe:</strong> Next to JP Tshikalange Primary School
                            </p>
                            <p>
                              <strong>Tshivhulani:</strong> Next to Cabal Villa
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                            <p>Saturday: 8:00 AM - 4:00 PM</p>
                            <p>Sunday: 9:00 AM - 2:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-600 text-white">Our Services</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How We Can Help You</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From wholesale partnerships to individual orders, we provide comprehensive agricultural solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-foreground">Wholesale Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">
                    Partner with us for consistent supply of fresh produce, competitive pricing, and reliable delivery
                    schedules for your business.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-foreground">Retail Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">
                    Individual customers can purchase fresh vegetables, poultry, and ice products directly from our
                    farms with flexible ordering.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-foreground">Delivery Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">
                    Reliable delivery across Limpopo Province with cold chain management to ensure product freshness and
                    quality.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-foreground">Custom Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm">
                    Special orders for events, seasonal requirements, and specific quantities tailored to your unique
                    needs and timeline.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Frequently Asked Questions
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">Common Questions</h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to the most common questions about our products and services
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "What are your minimum order quantities for wholesale?",
                  answer:
                    "Minimum order quantities vary by product. For vegetables, we typically require orders of 50kg or more per variety. For poultry, minimum orders start at 100 birds. Ice products have flexible minimums. Contact us for specific requirements.",
                },
                {
                  question: "Do you deliver to other provinces besides Limpopo?",
                  answer:
                    "Currently, we focus on Limpopo Province to ensure optimal freshness and quality. However, we&apos;re expanding our delivery network and may accommodate special requests for large orders to neighboring provinces.",
                },
                {
                  question: "How do you ensure product freshness during delivery?",
                  answer:
                    "We use cold chain management with refrigerated vehicles for vegetables and poultry, and insulated transport for ice products. All deliveries are scheduled to minimize transit time and maintain optimal temperatures.",
                },
                {
                  question: "Can I visit your farms to see your operations?",
                  answer:
                    "Yes! We welcome farm visits by appointment. This allows us to maintain biosecurity protocols while giving you the opportunity to see our sustainable farming practices firsthand. Please call ahead to schedule.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept cash, bank transfers, and for established wholesale customers, we offer credit terms. Payment terms are discussed during the initial consultation based on order size and frequency.",
                },
                {
                  question: "Do you offer organic certification for your vegetables?",
                  answer:
                    "While we use sustainable and environmentally responsible farming practices, we&apos;re currently working toward organic certification. We can provide detailed information about our growing methods and inputs used.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground pl-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-900 dark:bg-green-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Don&apos;t wait - contact Agrinema Farm today and discover how our fresh, quality products can benefit your
              business or family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50">
                <Phone className="h-5 w-5 mr-2" />
                Call 067 347 0687
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-900 bg-transparent"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
