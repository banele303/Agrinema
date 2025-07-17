"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Phone, User, Package, Navigation, Clock, ShoppingCart } from "lucide-react"
import { Location } from "@/types/product"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function LocationDetailPage() {
  const params = useParams()
  const locationId = params.id as string
  
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (locationId) {
      loadLocationData()
    }
  }, [locationId])

  const loadLocationData = async () => {
    try {
      const locationsRes = await fetch('/api/locations')
      const locationsData = await locationsRes.json()
      const currentLocation = locationsData.find((loc: Location) => loc.id === locationId)
      setLocation(currentLocation)
    } catch (error) {
      console.error('Error loading location data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading location details...</p>
        </div>
      </div>
    )
  }

  if (!location) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Location not found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">The requested farm location could not be found.</p>
          <Link href="/locations">
            <Button>Back to Locations</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalProducts = location?.productAvailability?.length || 0
  const availableProducts = location?.productAvailability?.filter(product => product.status === 'available').length || 0
  const upcomingProducts = location?.productAvailability?.filter(product => product.status === 'upcoming').length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/locations">
                <Button variant="ghost" size="sm" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Locations
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {location.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{location.address}</p>
              </div>
            </div>
            <Badge
              variant={location.isActive ? "default" : "secondary"}
              className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            >
              {location.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Location Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalProducts}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Now</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{availableProducts}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Coming Soon</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{upcomingProducts}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Farm Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Manager</p>
                
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{location.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Coordinates</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {location.coordinates?.lat || 'N/A'}, {location.coordinates?.lng || 'N/A'}
                  </p>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    if (location.coordinates) {
                      const mapsUrl = `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`
                      window.open(mapsUrl, '_blank')
                    } else {
                      alert('Coordinates not available for this location')
                    }
                  }}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Open in Maps
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Product Availability */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Product Availability</CardTitle>
                <CardDescription>Current and upcoming products from {location.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {location.productAvailability && location.productAvailability.length > 0 ? (
                  <div className="space-y-4">
                    {location.productAvailability.map((product, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              product.status === 'available' 
                                ? 'bg-green-500 animate-pulse' 
                                : 'bg-orange-400'
                            }`}></div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                            <Badge
                              variant={product.category as any}
                              className={`text-xs ${
                                product.category === 'vegetables' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                product.category === 'poultry' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                product.category === 'ice' ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                              }`}
                            >
                              {product.category}
                            </Badge>
                          </div>
                          <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                            product.status === 'available'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                            {product.availableDate}
                          </span>
                        </div>

                        {/* Product Details */}
                        {product.details && (
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            {product.details.area && (
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Area:</span>
                                <span>{product.details.area}</span>
                              </div>
                            )}
                            {product.details.plants && (
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Plants:</span>
                                <span>{product.details.plants}</span>
                              </div>
                            )}
                            {product.details.production && (
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Production:</span>
                                <span>{product.details.production}</span>
                              </div>
                            )}
                            {product.details.price && (
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-green-600 dark:text-green-400 font-medium">{product.details.price}</span>
                              </div>
                            )}
                            {product.details.stock && (
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Stock:</span>
                                <span>{product.details.stock}</span>
                              </div>
                            )}
                            {product.details.pricing && (
                              <div className="space-y-1">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Pricing Tiers:</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {product.details.pricing.map((tier, tierIndex) => (
                                    <div key={tierIndex} className="flex justify-between items-center text-xs bg-white dark:bg-gray-600 rounded p-2">
                                      <span>{tier.range}</span>
                                      <span className="text-green-600 dark:text-green-400 font-medium">{tier.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {product.details.description && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                  {product.details.description}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No products available at this location yet</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Check back soon for updates</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
