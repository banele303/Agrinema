"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, User, Package, Navigation, Clock } from "lucide-react"
import { Location } from "@/types/product"
import Link from "next/link"

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading locations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Our Farm Locations
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Visit our farms across Eastern Cape, South Africa
              </p>
            </div>
            <Link href="/admin/dashboard">
              <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {location.name}
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <Badge
                          variant={location.isActive ? "default" : "secondary"}
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        >
                          {location.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Address */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Navigation className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Address</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{location.address}</p>
                      </div>
                    </div>

                    {/* Manager */}
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Farm Manager</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{location.manager}</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Contact</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{location.phone}</p>
                      </div>
                    </div>

                    {/* Products Count */}
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

                  {/* Coordinates */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">GPS Coordinates</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                      <span>Lat: {location.coordinates?.lat || 'N/A'}</span>
                      <span>Lng: {location.coordinates?.lng || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Link href={`/locations/${location.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 transition-all duration-300">
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
                      className="border-gray-200 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {locations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No locations found</h3>
            <p className="text-gray-500 dark:text-gray-400">Farm locations will appear here once they are added.</p>
          </div>
        )}
      </div>
    </div>
  )
}
