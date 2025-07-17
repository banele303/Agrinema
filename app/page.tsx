"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Leaf, Users, Award, Apple, Egg, Snowflake, Shield, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"

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

export default function AgrinemaFarmWebsite() {
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

      {/* WhatsApp Floating Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <a 
          href="https://wa.me/27673470687" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:shadow-green-500/50"
        >
          <svg 
            className="w-8 h-8" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488z"/>
          </svg>
        </a>
      </motion.div>

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
            src="/vegetable.jpeg"
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
              <Badge className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 text-lg">
                Est. 2022 • Limpopo, South Africa
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Freshness Rooted in <span className="text-green-400">Limpopo</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              From farm to table, committed to food security and community wellness. Producing premium fresh vegetables,
              quality poultry, and essential ice products for South African families and businesses.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                    <Phone className="h-5 w-5 mr-2" />
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 text-lg px-8 py-4 bg-transparent"
                  >
                    <Leaf className="h-5 w-5 mr-2" />
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
                        4
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
                        8+
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
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Cultivating Excellence Since 2022</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Born from a vision to transform South African agriculture and ensure food security for all communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <Image
                  src="/greanpaper.jpeg"
                  alt="Agrinema Farm sustainable agriculture practices in Limpopo"
                  width={400}
                  height={280}
                  className="rounded-2xl shadow-2xl object-cover"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground">Pioneering Sustainable Agriculture in Limpopo</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Agrinema Farm was established in 2022 with a clear mission: to revolutionize food production in
                  Limpopo Province and contribute meaningfully to South Africa&apos;s food security landscape. Founded by
                  experienced agricultural professionals who understand the unique challenges and opportunities of South
                  African farming, we have quickly become a trusted name in fresh produce, poultry, and ice production.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed pb-3">
                  Our commitment extends beyond mere production. We believe in sustainable farming practices that
                  protect our environment while delivering exceptional quality. Every tomato, onion, pepper, and chicken
                  that leaves our farms represents our dedication to excellence, affordability, and community health.
                </p>
                <Link href="/about">
                  <Button className="bg-green-600 hover:bg-green-700">Learn More About Us</Button>
                </Link>
              </div>
            </div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8"
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
                  <Card className="border-2 border-green-100 hover:border-green-300 bg-gradient-to-br from-white via-green-50 to-emerald-50 dark:from-gray-900 dark:via-green-950 dark:to-emerald-950 rounded-2xl overflow-hidden relative backdrop-blur-sm shadow-xl">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                    <CardHeader className="text-center pb-2 relative">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                      >
                        <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      </motion.div>
                      <CardTitle className="text-foreground text-xl">Community First</CardTitle>
                      <motion.div 
                        className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full opacity-60"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-muted-foreground text-center leading-relaxed">
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
                  className="relative group"
                >
                  <Card className="border-2 border-amber-100 hover:border-amber-300 bg-gradient-to-br from-white via-amber-50 to-orange-50 dark:from-gray-900 dark:via-amber-950 dark:to-orange-950 rounded-2xl overflow-hidden relative backdrop-blur-sm shadow-xl">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 1 }}
                    />
                    <CardHeader className="text-center pb-2 relative">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                      >
                        <Award className="h-16 w-16 text-amber-600 mx-auto mb-4" />
                      </motion.div>
                      <CardTitle className="text-foreground text-xl">Quality Assured</CardTitle>
                      <motion.div 
                        className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full opacity-60"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-muted-foreground text-center leading-relaxed">
                        Rigorous quality control processes ensure every product meets the highest standards for freshness,
                        safety, and nutritional value.
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
                  className="relative group"
                >
                  <Card className="border-2 border-blue-100 hover:border-blue-300 bg-gradient-to-br from-white via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-cyan-950 rounded-2xl overflow-hidden relative backdrop-blur-sm shadow-xl">
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-600"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9, duration: 1 }}
                    />
                    <CardHeader className="text-center pb-2 relative">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                      >
                        <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      </motion.div>
                      <CardTitle className="text-foreground text-xl">Food Security</CardTitle>
                      <motion.div 
                        className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full opacity-60"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-muted-foreground text-center leading-relaxed">
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
                        src="/tomato7.jpg"
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
                        src="/IMG_6097.jpg"
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
                        src="/iceblook.jpg"
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
                      <p className="text-green-100">068 801 1545</p>
                      <p className="text-sm text-green-200 mt-1">Available 7 days a week for orders and inquiries</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Our Locations</h3>
                <div className="space-y-4 text-green-100">
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
                  <p>068 801 1545</p>
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
