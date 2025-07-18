"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Leaf, Users, Award, Apple, Egg, Snowflake, Shield, MessageCircle, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import ProductsListing from "@/components/products-listing"
import { Product, Location } from "@/types/product"

// Modern animation variants for cards
const cardVariants = {
  hidden: { 
    y: 100, 
    opacity: 0, 
    scale: 0.8,
    rotateX: 45 
  },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.8, 
      type: "spring" as const,
      stiffness: 100,
      damping: 20
    } 
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const modernCardHover = {
  scale: 1.05,
  y: -10,
  rotateY: 5,
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  transition: { 
    duration: 0.4, 
    // Remove ease property when using spring type
    type: "spring" as const,
    stiffness: 300
  }
}

const glowEffect = {
  boxShadow: [
    "0 0 20px rgba(34, 197, 94, 0.3)",
    "0 0 40px rgba(34, 197, 94, 0.5)",
    "0 0 20px rgba(34, 197, 94, 0.3)"
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const
  }
}

export default function AgrinemaFarmWebsite({ products = [] }: { products?: Product[] }) {
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoadingLocations, setIsLoadingLocations] = useState(true)

  useEffect(() => {
    loadLocations()
  }, [])

  const loadLocations = async () => {
    try {
      const response = await fetch('/api/locations')
      const data = await response.json()
      setLocations(data)
    } catch (error) {
      console.error('Error loading locations:', error)
    } finally {
      setIsLoadingLocations(false)
    }
  }

  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vegetables': return '🥬'
      case 'poultry': return '🐔'
      case 'ice': return '🧊'
      default: return '🌱'
    }
  }

  // Helper function to get location gradient based on index
  const getLocationStyle = (index: number) => {
    const styles = [
      {
        gradient: "from-green-500 to-emerald-600",
        bgGradient: "from-green-50 to-emerald-100",
        borderColor: "border-green-200 hover:border-green-400",
      },
      {
        gradient: "from-emerald-500 to-teal-600",
        bgGradient: "from-emerald-50 to-teal-100",
        borderColor: "border-emerald-200 hover:border-emerald-400",
      },
      {
        gradient: "from-teal-500 to-cyan-600",
        bgGradient: "from-teal-50 to-cyan-100",
        borderColor: "border-teal-200 hover:border-teal-400",
      },
      {
        gradient: "from-cyan-500 to-blue-600",
        bgGradient: "from-cyan-50 to-blue-100",
        borderColor: "border-cyan-200 hover:border-cyan-400",
      },
      {
        gradient: "from-blue-500 to-indigo-600",
        bgGradient: "from-blue-50 to-indigo-100",
        borderColor: "border-blue-200 hover:border-blue-400",
      },
      {
        gradient: "from-indigo-500 to-purple-600",
        bgGradient: "from-indigo-50 to-purple-100",
        borderColor: "border-indigo-200 hover:border-indigo-400",
      }
    ]
    return styles[index % styles.length]
  }
  return (
    <motion.div 
      className="bg-background overflow-x-hidden w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ overflowX: 'hidden', maxWidth: '100vw' }}
    >
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 to-emerald-950 pt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/products/new-tomato.jpeg"
            alt="Agrinema Farm - Fresh vegetables and sustainable farming in Limpopo, South Africa"
            fill
            className="object-cover opacity-30 dark:opacity-20"
            priority
            quality={85}
            sizes="100vw"
          />
        </motion.div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Badge className="mb-4 sm:mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 sm:px-4 py-2 text-xs sm:text-sm">
                Est. 2022 • Limpopo, South Africa
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Freshness Rooted in <span className="text-green-400">Limpopo</span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-green-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              From our farm to your tables, committed to food security and community wellness. Producing premium fresh vegetables,
              quality poultry, and essential ice products for South African families and businesses.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-2 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="block w-full sm:w-auto">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/products" className="block w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-transparent w-full sm:w-auto"
                  >
                    <Leaf className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Our Products
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section 
        className="py-16 bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background decoration */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "linear-gradient(45deg, #22c55e 25%, transparent 25%), linear-gradient(-45deg, #22c55e 25%, transparent 25%)",
            backgroundSize: "60px 60px"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group"
                >
                  <motion.div
                    animate={glowEffect}
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <Card className="border-2 border-green-100 hover:border-green-300 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                    <CardContent className="p-8 relative">
                      <motion.div 
                        className="text-4xl font-bold text-green-600 mb-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        6
                      </motion.div>
                      <p className="text-muted-foreground font-medium">Production Sites</p>
                      <motion.div 
                        className="absolute bottom-0 right-0 w-16 h-16 bg-green-100 rounded-full opacity-20 -mr-8 -mb-8"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group"
                >
                  <motion.div
                    animate={glowEffect}
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <Card className="border-2 border-green-100 hover:border-green-300 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    />
                    <CardContent className="p-8 relative">
                      <motion.div 
                        className="text-4xl font-bold text-green-600 mb-3"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        10+
                      </motion.div>
                      <p className="text-muted-foreground font-medium">Vegetable Varieties</p>
                      <motion.div 
                        className="absolute bottom-0 right-0 w-16 h-16 bg-emerald-100 rounded-full opacity-20 -mr-8 -mb-8"
                        animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group"
                >
                  <motion.div
                    animate={glowEffect}
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <Card className="border-2 border-green-100 hover:border-green-300 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    />
                    <CardContent className="p-8 relative">
                      <motion.div 
                        className="text-4xl font-bold text-green-600 mb-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        2022
                      </motion.div>
                      <p className="text-muted-foreground font-medium">Established</p>
                      <motion.div 
                        className="absolute bottom-0 right-0 w-16 h-16 bg-teal-100 rounded-full opacity-20 -mr-8 -mb-8"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group"
                >
                  <motion.div
                    animate={glowEffect}
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <Card className="border-2 border-green-100 hover:border-green-300 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-green-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.1, duration: 0.8 }}
                    />
                    <CardContent className="p-8 relative">
                      <motion.div 
                        className="text-4xl font-bold text-green-600 mb-3"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        100%
                      </motion.div>
                      <p className="text-muted-foreground font-medium">Quality Focused</p>
                      <motion.div 
                        className="absolute bottom-0 right-0 w-16 h-16 bg-green-100 rounded-full opacity-20 -mr-8 -mb-8"
                        animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 3 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-sm">
                Our Story
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-2">
                Cultivating Excellence Since 2022
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Born from a vision to transform South African agriculture and ensure food security for all communities
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
              <div className="order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/chicken.jpeg"
                    alt="Agrinema Farm sustainable agriculture practices in Limpopo"
                    width={500}
                    height={300}
                    className="w-full h-[346px] md:h-[389px] lg:h-[389px] object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 px-2 sm:px-0">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                  Pioneering Sustainable Agriculture in Limpopo
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  Agrinema Farm was established in 2022 with a clear mission: to revolutionize food production in
                  Limpopo Province and contribute meaningfully to South Africa&apos;s food security landscape. Founded by
                  experienced agricultural professionals who understand the unique challenges and opportunities of South
                  African farming, we have quickly become a trusted name in fresh produce, poultry, and ice production.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed pb-2 sm:pb-3">
                  Our commitment extends beyond mere production. We believe in sustainable farming practices that
                  protect our environment while delivering exceptional quality. Every tomato, onion, pepper, and chicken
                  that leaves our farms represents our dedication to excellence, affordability, and community health.
                </p>
                <Link href="/about" className="inline-block">
                  <Button className="bg-green-600 hover:bg-green-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group h-full"
                >
                  <Card className="border-2 border-green-100 hover:border-green-300 bg-gradient-to-br from-white via-green-50 to-emerald-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950 rounded-xl sm:rounded-2xl overflow-hidden relative backdrop-blur-sm shadow-xl h-full">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                    <CardHeader className="text-center pb-2 relative p-4 sm:p-6">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                      >
                        <Users className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-3 sm:mb-4" />
                      </motion.div>
                      <CardTitle className="text-foreground text-lg sm:text-xl">Community First</CardTitle>
                      <motion.div 
                        className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-400 rounded-full opacity-60"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </CardHeader>
                    <CardContent className="relative p-4 sm:p-6">
                      <p className="text-muted-foreground text-center leading-relaxed text-sm sm:text-base">
                        Employing local talent and contributing to community development through sustainable agricultural
                        practices and job creation.
                      </p>
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30"
                        animate={{ x: [-100, 100, -100] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group h-full"
                >
                  <Card className="border-2 border-amber-100 hover:border-amber-300 bg-gradient-to-br from-white via-amber-50 to-orange-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950 rounded-xl sm:rounded-2xl overflow-hidden relative backdrop-blur-sm shadow-xl h-full">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 1 }}
                    />
                    <CardHeader className="text-center pb-2 relative p-4 sm:p-6">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                      >
                        <Award className="h-12 w-12 sm:h-16 sm:w-16 text-amber-600 mx-auto mb-3 sm:mb-4" />
                      </motion.div>
                      <CardTitle className="text-foreground text-lg sm:text-xl">Quality Assured</CardTitle>
                      <motion.div 
                        className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-amber-400 rounded-full opacity-60"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                    </CardHeader>
                    <CardContent className="relative p-4 sm:p-6">
                      <p className="text-muted-foreground text-center leading-relaxed text-sm sm:text-base">
                        Rigorous quality control ensures every product meets the highest standards of freshness,
                        nutrition, and taste for our valued customers.
                      </p>
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"
                        animate={{ x: [-100, 100, -100] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group h-full"
                >
                  <Card className="border-2 border-blue-100 hover:border-blue-300 bg-gradient-to-br from-white via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-cyan-950 rounded-xl sm:rounded-2xl overflow-hidden relative backdrop-blur-sm shadow-xl h-full">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9, duration: 1 }}
                    />
                    <CardHeader className="text-center pb-2 relative p-4 sm:p-6">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                      >
                        <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
                      </motion.div>
                      <CardTitle className="text-foreground text-lg sm:text-xl">Food Security</CardTitle>
                      <motion.div 
                        className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full opacity-60"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </CardHeader>
                    <CardContent className="relative p-4 sm:p-6">
                      <p className="text-muted-foreground text-center leading-relaxed text-sm sm:text-base">
                        Contributing to South Africa&apos;s food security through reliable, affordable, and accessible fresh
                        produce and protein sources.
                      </p>
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"
                        animate={{ x: [-100, 100, -100] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Locations Section */}
      <motion.section 
        className="py-20 bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background decoration */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "linear-gradient(45deg, #22c55e 25%, transparent 25%), linear-gradient(-45deg, #22c55e 25%, transparent 25%)",
            backgroundSize: "60px 60px"
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green-600 text-white">Our Farm Network</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                6 Strategic Locations Across Limpopo
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Strategically positioned farms with detailed product availability, pricing, and seasonal schedules across Limpopo Province. Each location specializes in different crops to ensure year-round fresh produce supply.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {isLoadingLocations ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <motion.div key={index} variants={cardVariants}>
                    <Card className="border-2 border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-3xl overflow-hidden relative backdrop-blur-sm shadow-xl h-full">
                      <CardHeader className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-32"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-24"></div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8 pt-0">
                        <div className="space-y-3">
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-full"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                locations.map((location, index) => {
                  const style = getLocationStyle(index)
                  const availableProducts = location.productAvailability?.filter(p => p.status === 'available') || []
                  const upcomingProducts = location.productAvailability?.filter(p => p.status === 'upcoming') || []
                  
                  return (
                    <motion.div key={location.id} variants={cardVariants}>
                      <motion.div
                        whileHover={modernCardHover}
                        className="relative group h-full"
                      >
                        <Card className={`border-2 ${style.borderColor} bg-gradient-to-br from-white via-gray-50 ${style.bgGradient} dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-3xl overflow-hidden relative backdrop-blur-sm shadow-xl h-full transition-all duration-500`}>
                          <motion.div 
                            className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${style.gradient}`}
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + index * 0.1, duration: 1.2, ease: "easeOut" }}
                          />
                          <CardHeader className="p-8 relative">
                            <motion.div 
                              className="flex items-center gap-4 mb-4"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                            >
                              <motion.div
                                className="text-4xl"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 400 }}
                              >
                                {location.productAvailability && location.productAvailability.length > 0 
                                  ? getCategoryIcon(location.productAvailability[0].category)
                                  : '🌱'
                                }
                              </motion.div>
                              <div>
                                <CardTitle className="text-foreground text-xl font-bold">{location.name}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs">
                                    {availableProducts.length + upcomingProducts.length} products
                                  </Badge>
                                  {availableProducts.length > 0 && (
                                    <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                      {availableProducts.length} available
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                            <motion.div 
                              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              transition={{ duration: 0.4 }}
                            >
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                              </div>
                            </motion.div>
                          </CardHeader>
                          <CardContent className="p-8 pt-0 relative">
                            <motion.div 
                              className="flex items-start gap-3 mb-4"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                            >
                              <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                              <div>
                                <p className="text-muted-foreground leading-relaxed text-sm">{location.address}</p>
                              </div>
                            </motion.div>

                            {/* Product List */}
                            {location.productAvailability && location.productAvailability.length > 0 && (
                              <motion.div 
                                className="space-y-2 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                              >
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Available Products: 
                                  <span className="ml-1 text-green-600 font-bold">
                                    {availableProducts.length} ready now
                                  </span>
                                  {upcomingProducts.length > 0 && (
                                    <span className="ml-2 text-orange-600 font-medium">
                                      + {upcomingProducts.length} coming soon
                                    </span>
                                  )}
                                </p>
                                <div className="space-y-1 max-h-32 overflow-y-auto">
                                  {location.productAvailability.slice(0, 4).map((product, productIndex) => (
                                    <div key={productIndex} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
                                      <div className="flex items-center gap-2">
                                        <span className="text-lg">{getCategoryIcon(product.category)}</span>
                                        <div className="flex flex-col">
                                          <span className="text-gray-600 dark:text-gray-400 truncate max-w-32 font-medium">
                                            {product.name}
                                          </span>
                                          {product.details?.area && (
                                            <span className="text-xs text-gray-500 dark:text-gray-500">
                                              {product.details.area}
                                            </span>
                                          )}
                                          {product.availableDate && product.status === 'upcoming' && (
                                            <span className="text-xs text-orange-600 dark:text-orange-400">
                                              Available: {product.availableDate}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex flex-col items-end gap-1">
                                        <Badge 
                                          className={`text-xs px-2 py-0 ${
                                            product.status === 'available'
                                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                                          }`}
                                        >
                                          {product.status === 'available' ? 'Available' : 'Soon'}
                                        </Badge>
                                        {product.details?.price && (
                                          <span className="text-xs text-green-600 font-bold">
                                            {product.details.price}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                  {location.productAvailability.length > 4 && (
                                    <div className="text-center pt-2">
                                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                        +{location.productAvailability.length - 4} more products available
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}

                            <motion.div 
                              className="flex items-center gap-2 text-sm text-green-600 font-medium"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span>Active Production Site</span>
                            </motion.div>

                            {/* View Details Button */}
                            <motion.div 
                              className="mt-4"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                            >
                              <Link href={`/locations/${location.id}`}>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full text-xs hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 hover:border-green-400"
                                >
                                  View Details
                                </Button>
                              </Link>
                            </motion.div>

                            <motion.div 
                              className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full -mr-10 -mb-10"
                              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                              transition={{ duration: 8, repeat: Infinity, delay: index * 1.5 }}
                            />
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.div>
                  )
                })
              )}
            </motion.div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <MapPin className="h-5 w-5 mr-2" />
                    Visit Our Farms
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Products Preview */}
      <motion.section 
        id="products" 
        className="py-20 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green-600 text-white">Our Products</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Premium Fresh Produce & Quality Products
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From farm-fresh vegetables to quality poultry and essential ice products, we deliver excellence across
                every category
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group h-full"
                >
                  <Card className="border-2 border-green-100 hover:border-green-400 bg-gradient-to-br from-white via-green-50 to-emerald-100 dark:from-gray-900 dark:via-green-950 dark:to-emerald-900 rounded-3xl overflow-hidden relative backdrop-blur-sm shadow-2xl h-full group-hover:shadow-green-500/25 transition-all duration-500">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="relative h-80 overflow-hidden"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src="/products/new-tomato.jpeg"
                        alt="Fresh Vegetables"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/50 to-transparent"
                        whileHover={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute bottom-6 left-6 right-6"
                        initial={{ y: 20, opacity: 0.7 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        <CardTitle className="text-3xl text-white mb-2 font-bold">Fresh Vegetables</CardTitle>
                        <CardDescription className="text-green-100 text-lg">8+ varieties of premium vegetables</CardDescription>
                      </motion.div>
                      <motion.div 
                        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Apple className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>
                    <CardContent className="p-8 relative">
                      <motion.p 
                        className="text-muted-foreground mb-6 leading-relaxed text-lg"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        Premium quality vegetables including tomatoes, onions, okra, potatoes, spinach, squash, green
                        peppers, and butternut.
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-3 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        {["Tomatoes", "Onions", "Spinach", "+5 more"].map((item, index) => (
                          <motion.div
                            key={item}
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Badge variant="secondary" className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200 transition-colors">{item}</Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Link href="/products/vegetables">
                          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold">
                            View More Details
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-0 right-0 w-24 h-24 bg-green-200 rounded-full opacity-10 -mr-12 -mb-12"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 8, repeat: Infinity }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group h-full"
                >
                  <Card className="border-2 border-amber-100 hover:border-amber-400 bg-gradient-to-br from-white via-amber-50 to-orange-100 dark:from-gray-900 dark:via-amber-950 dark:to-orange-900 rounded-3xl overflow-hidden relative backdrop-blur-sm shadow-2xl h-full group-hover:shadow-amber-500/25 transition-all duration-500">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-600"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="relative h-80 overflow-hidden"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src="/products/chicken3.jpeg"
                        alt="Premium Poultry"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/50 to-transparent"
                        whileHover={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute bottom-6 left-6 right-6"
                        initial={{ y: 20, opacity: 0.7 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                      >
                        <CardTitle className="text-3xl text-white mb-2 font-bold">Premium Poultry</CardTitle>
                        <CardDescription className="text-amber-100 text-lg">High-quality broiler chickens</CardDescription>
                      </motion.div>
                      <motion.div 
                        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Egg className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>
                    <CardContent className="p-8 relative">
                      <motion.p 
                        className="text-muted-foreground mb-6 leading-relaxed text-lg"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        State-of-the-art poultry facility producing premium broiler chickens with expert care and optimal
                        nutrition.
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-3 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        {["Broiler Chickens", "Expert Care", "Quality Feed"].map((item, index) => (
                          <motion.div
                            key={item}
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Badge variant="secondary" className="px-3 py-1 bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">{item}</Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Link href="/products/poultry">
                          <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold">
                            View More Details
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-0 right-0 w-24 h-24 bg-amber-200 rounded-full opacity-10 -mr-12 -mb-12"
                        animate={{ scale: [1, 1.2, 1], rotate: [360, 180, 0] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group h-full"
                >
                  <Card className="border-2 border-blue-100 hover:border-blue-400 bg-gradient-to-br from-white via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-blue-950 dark:to-cyan-900 rounded-3xl overflow-hidden relative backdrop-blur-sm shadow-2xl h-full group-hover:shadow-blue-500/25 transition-all duration-500">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-600"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="relative h-80 overflow-hidden"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src="/products/Ice Cubes.jpeg"
                        alt="Ice Products"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent"
                        whileHover={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute bottom-6 left-6 right-6"
                        initial={{ y: 20, opacity: 0.7 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        <CardTitle className="text-3xl text-white mb-2 font-bold">Ice Products</CardTitle>
                        <CardDescription className="text-blue-100 text-lg">Commercial & residential ice</CardDescription>
                      </motion.div>
                      <motion.div 
                        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Snowflake className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>
                    <CardContent className="p-8 relative">
                      <motion.p 
                        className="text-muted-foreground mb-6 leading-relaxed text-lg"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      > 
                        High-quality ice cubes and blocks using purified water and advanced freezing technology for various
                        applications.
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-3 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
                        {["Ice Cubes", "Ice Blocks", "Pure Water"].map((item, index) => (
                          <motion.div
                            key={item}
                            whileHover={{ scale: 1.1, y: -2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Badge variant="secondary" className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">{item}</Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Link href="/products/ice">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold">
                            View More Details
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div 
                        className="absolute bottom-0 right-0 w-24 h-24 bg-blue-200 rounded-full opacity-10 -mr-12 -mb-12"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/products">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    View All Products
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      {products.length > 0 && (
        <ProductsListing 
          products={products.filter(p => p.featured)} 
          title="Featured Fresh Products"
          subtitle="Hand-picked premium quality produce from our farm to your table"
          showSearch={false}
          showFilters={false}
          gridCols="3"
        />
      )}

      {/* Blog Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Knowledge Hub
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Latest from Our Blog</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay updated with agricultural insights, farming tips, and industry knowledge from our experts
              </p>
            </div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {[
                {
                  title: "Sustainable Farming Practices for South African Agriculture",
                  excerpt:
                    "Discover how sustainable farming methods can improve crop yields while protecting the environment.",
                  date: "2024-01-15",
                  category: "Sustainability",
                  readTime: "5 min read",
                  gradient: "from-green-500 to-emerald-600",
                  bgGradient: "from-green-50 to-emerald-100",
                  borderColor: "border-green-200 hover:border-green-400"
                },
                {
                  title: "Maximizing Tomato Yields in Limpopo&apos;s Climate",
                  excerpt:
                    "Expert tips for growing healthy, productive tomato plants in South Africa&apos;s unique climate conditions.",
                  date: "2024-01-10",
                  category: "Crop Management",
                  readTime: "7 min read",
                  gradient: "from-orange-500 to-red-600",
                  bgGradient: "from-orange-50 to-red-100",
                  borderColor: "border-orange-200 hover:border-orange-400"
                },
                {
                  title: "The Importance of Food Security in Rural Communities",
                  excerpt:
                    "Understanding how local farms contribute to food security and economic development in rural South African communities.",
                  date: "2024-01-05",
                  category: "Food Security",
                  readTime: "6 min read",
                  gradient: "from-blue-500 to-purple-600",
                  bgGradient: "from-blue-50 to-purple-100",
                  borderColor: "border-blue-200 hover:border-blue-400"
                },
              ].map((post, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <motion.div
                    whileHover={modernCardHover}
                    className="relative group h-full"
                  >
                    <Card className={`border-2 ${post.borderColor} bg-gradient-to-br from-white via-gray-50 ${post.bgGradient} dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 rounded-3xl overflow-hidden relative backdrop-blur-sm shadow-2xl h-full transition-all duration-500`}>
                      <motion.div 
                        className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${post.gradient}`}
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.2, duration: 1.2, ease: "easeOut" }}
                      />
                      <CardHeader className="p-8 relative">
                        <motion.div 
                          className="flex items-center gap-3 mb-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Badge variant="secondary" className={`text-sm px-4 py-2 bg-gradient-to-r ${post.gradient} text-white shadow-lg`}>
                              {post.category}
                            </Badge>
                          </motion.div>
                          <motion.span 
                            className="text-sm text-muted-foreground font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {post.readTime}
                          </motion.span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                        >
                          <CardTitle className="text-foreground hover:text-green-600 transition-colors text-xl font-bold leading-tight mb-3 group-hover:text-green-600">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground leading-relaxed text-base">
                            {post.excerpt}
                          </CardDescription>
                        </motion.div>
                        <motion.div 
                          className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5" />
                        </motion.div>
                      </CardHeader>
                      <CardContent className="p-8 pt-0 relative">
                        <motion.div 
                          className="flex items-center justify-between text-sm text-muted-foreground"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                        >
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="font-medium"
                          >
                            {new Date(post.date).toLocaleDateString()}
                          </motion.span>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link href="/blog">
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-all duration-300 font-semibold">
                                Read More →
                              </Button>
                            </Link>
                          </motion.div>
                        </motion.div>
                        <motion.div 
                          className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full -mr-10 -mb-10"
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                          transition={{ duration: 10, repeat: Infinity, delay: index * 2 }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <Link href="/blog">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  View All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-green-900 dark:bg-green-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-white text-green-900">Get in Touch</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Partner with Agrinema Farm?</h2>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Contact us today for wholesale partnerships, bulk orders, or any inquiries about our fresh produce,
                poultry, and ice products
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-green-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Phone Numbers</h4>
                      <p className="text-green-100">067 347 0687</p>
                      <p className="text-sm text-green-200 mt-1">Available 7 days a week for orders and inquiries</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Our Locations</h3>
                <div className="space-y-4 text-green-100">
                  <p>
                    <strong>Tshamutilikwa:</strong> Next to soccer ground
                  </p>
                  <p>
                    <strong>Bunzhe:</strong> Next to JP Tshikalange Primary School
                  </p>
                  <p>
                    <strong>Xigalo:</strong> Next to Cheapside and Balow Lodge
                  </p>
                  <p>
                    <strong>Makasa:</strong> Makasa Village
                  </p>
                  <p>
                    <strong>Tshivhulani:</strong> Next to Cabal Villa
                  </p>
                  <p>
                    <strong>Vhudimbilu:</strong> Vhudimbilu Village
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="bg-green-800 dark:bg-green-900 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Experience Fresh. Choose Quality. Support Local.</h3>
                <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                  Join thousands of satisfied customers who trust Agrinema Farm for their fresh produce, quality
                  poultry, and ice product needs. Together, we&apos;re building a more food-secure South Africa.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-900 hover:bg-green-50">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now: 067 347 0687
                  </Button>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-green-900 bg-transparent"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
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
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 bg-transparent p-2"
                    asChild
                  >
                    <a 
                      href="https://wa.me/27673470687" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Image
                        src="/icons8-whatsapp-50.png"
                        alt="WhatsApp"
                        width={24}
                        height={24}
                        className="rounded"
                      />
                    </a>
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
    </motion.div>
  )
}
