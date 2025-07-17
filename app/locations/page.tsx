"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, User, Package, Navigation, Clock, Tractor, Users, Calendar, Award, Leaf, Sprout, Loader2 } from "lucide-react"
import { Location, ProductAvailability } from "@/types/product"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"

// Modern animation variants matching homepage
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

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-green-950">
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600 dark:text-gray-400">Loading our farm locations...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-green-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-950 to-emerald-950 pt-20"
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
            src="/trector.jpeg"
            alt="Agrinema Farm Equipment - Our farming operations across Limpopo"
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
              <Badge className="mb-4 sm:mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                6 Strategic Locations • Limpopo Province
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Our Farm <span className="text-green-400">Locations</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-green-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Strategically positioned across Limpopo Province, our farms are dedicated to sustainable agriculture, 
              community empowerment, and delivering fresh, quality produce to families across South Africa.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="block w-full sm:w-auto">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 w-full sm:w-auto">
                    <Phone className="h-5 w-5 mr-2" />
                    Visit Our Farms
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/admin/dashboard" className="block w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 text-lg px-8 py-4 bg-transparent w-full sm:w-auto"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Admin Dashboard
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Farm Stats Section */}
      <motion.section 
        className="py-16 bg-background/50 backdrop-blur-sm relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
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
                  <Card className="border-2 border-green-100 hover:border-green-300 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                    <CardContent className="p-8 relative">
                      <motion.div 
                        className="text-4xl font-bold text-green-600 mb-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {locations.length}
                      </motion.div>
                      <p className="text-muted-foreground font-medium">Active Farms</p>
                      <Tractor className="h-8 w-8 text-green-500/20 absolute top-4 right-4" />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group"
                >
                  <Card className="border-2 border-green-100 hover:border-green-300 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                    <CardContent className="p-8 relative">
                      <motion.div 
                        className="text-4xl font-bold text-green-600 mb-3"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        100%
                      </motion.div>
                      <p className="text-muted-foreground font-medium">Limpopo Based</p>
                      <MapPin className="h-8 w-8 text-green-500/20 absolute top-4 right-4" />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group"
                >
                  <Card className="border-2 border-green-100 hover:border-green-300 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                    <CardContent className="p-8 relative">
                      <motion.div 
                        className="text-4xl font-bold text-green-600 mb-3"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        3+
                      </motion.div>
                      <p className="text-muted-foreground font-medium">Product Lines</p>
                      <Package className="h-8 w-8 text-green-500/20 absolute top-4 right-4" />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={modernCardHover}
                  className="relative group"
                >
                  <Card className="border-2 border-green-100 hover:border-green-300 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 rounded-2xl overflow-hidden relative backdrop-blur-sm">
                    <CardContent className="p-8 relative">
                      <motion.div 
                        className="text-4xl font-bold text-green-600 mb-3"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        2022
                      </motion.div>
                      <p className="text-muted-foreground font-medium">Established</p>
                      <Calendar className="h-8 w-8 text-green-500/20 absolute top-4 right-4" />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Locations Grid */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 px-2 sm:px-0">
              Visit Our <span className="text-green-600">Farm Locations</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4 sm:px-0">
              Each of our farms is uniquely positioned to serve different communities while maintaining 
              our commitment to sustainable agriculture and quality produce.
            </p>
          </motion.div>

          {/* Locations Cards Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                variants={cardVariants}
                whileHover={modernCardHover}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg sm:shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300 rounded-xl sm:rounded-2xl overflow-hidden mx-2 sm:mx-0">
                  {/* Card Header with Farm Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={`/plant${(index % 9) + 1}.jpeg`}
                      alt={`${location.name} - Agrinema Farm Location`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = '/vegetable.jpeg'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant={location.isActive ? "default" : "secondary"}
                        className="bg-green-100/90 text-green-800 dark:bg-green-900/90 dark:text-green-400 backdrop-blur-sm"
                      >
                        {location.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                    <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {location.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
                    {/* Location Details */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Navigation className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Address</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{location.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Contact</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{location.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Package className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Products Available</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {location.products || 0} product{(location.products || 0) !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Product Availability */}
                    {location.productAvailability && location.productAvailability.length > 0 && (
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Product Availability</p>
                        <div className="space-y-3">
                          {location.productAvailability.map((product: ProductAvailability, index: number) => (
                            <div key={index} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className={`w-2 h-2 rounded-full ${
                                    product.status === 'available' 
                                      ? 'bg-green-500 animate-pulse' 
                                      : 'bg-orange-400'
                                  }`}></div>
                                  <span className="text-sm text-gray-900 dark:text-white font-medium">
                                    {product.name}
                                  </span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  product.status === 'available'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                                }`}>
                                  {product.availableDate}
                                </span>
                              </div>
                              
                              {/* Enhanced Details */}
                              {product.details && (
                                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                  {product.details.area && (
                                    <div className="flex items-center space-x-1">
                                      <span className="font-medium">Area:</span>
                                      <span>{product.details.area}</span>
                                    </div>
                                  )}
                                  {product.details.plants && (
                                    <div className="flex items-center space-x-1">
                                      <span className="font-medium">Plants:</span>
                                      <span>{product.details.plants}</span>
                                    </div>
                                  )}
                                  {product.details.production && (
                                    <div className="flex items-center space-x-1">
                                      <span className="font-medium">Production:</span>
                                      <span>{product.details.production}</span>
                                    </div>
                                  )}
                                  {product.details.price && (
                                    <div className="flex items-center space-x-1">
                                      <span className="font-medium">Price:</span>
                                      <span className="text-green-600 dark:text-green-400 font-medium">{product.details.price}</span>
                                    </div>
                                  )}
                                  {product.details.stock && (
                                    <div className="flex items-center space-x-1">
                                      <span className="font-medium">Stock:</span>
                                      <span>{product.details.stock}</span>
                                    </div>
                                  )}
                                  {product.details.pricing && (
                                    <div className="space-y-1">
                                      <span className="font-medium">Pricing:</span>
                                      {product.details.pricing.map((tier, tierIndex) => (
                                        <div key={tierIndex} className="flex justify-between items-center text-xs">
                                          <span>{tier.range}</span>
                                          <span className="text-green-600 dark:text-green-400 font-medium">{tier.price}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  {product.details.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                      {product.details.description}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Coordinates */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">GPS Coordinates</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                        <span>Lat: {location.coordinates?.lat || 'N/A'}</span>
                        <span>Lng: {location.coordinates?.lng || 'N/A'}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                      <Link href={`/locations/${location.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 transition-all duration-300 py-2 sm:py-2.5">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const mapsUrl = `https://www.google.com/maps?q=${location.coordinates?.lat || 0},${location.coordinates?.lng || 0}`
                          window.open(mapsUrl, '_blank')
                        }}
                        className="border-gray-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/20 w-full sm:w-auto"
                      >
                        <Navigation className="h-4 w-4 mr-2 sm:mr-0" />
                        <span className="sm:hidden">Open in Maps</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {locations.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No locations found</h3>
              <p className="text-gray-500 dark:text-gray-400">Farm locations will appear here once they are added.</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-green-950 to-emerald-950 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/plant5.jpeg"
            alt="Fresh vegetables from Agrinema Farm"
            fill
            className="object-cover opacity-20"
            quality={85}
            sizes="100vw"
          />
        </motion.div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience <span className="text-green-400">Fresh Quality?</span>
            </h2>
            <p className="text-lg text-green-100 mb-8">
              Contact us today to learn more about visiting our farms, sourcing our products, 
              or partnering with Agrinema for your fresh produce needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Us
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
                    View Products
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  )
}
