"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Phone, User, Package, Navigation, Clock, ShoppingCart } from "lucide-react"
import { Location, Product, Order } from "@/types/product"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function LocationDetailPage() {
  const params = useParams()
  const locationId = params.id as string
  
  const [location, setLocation] = useState<Location | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (locationId) {
      loadLocationData()
    }
  }, [locationId])

  const loadLocationData = async () => {
    try {
      const [locationsRes, productsRes, ordersRes] = await Promise.all([
        fetch('/api/locations'),
        fetch('/api/products'),
        fetch('/api/orders')
      ])

      const locationsData = await locationsRes.json()
      const productsData = await productsRes.json()
      const ordersData = await ordersRes.json()

      const currentLocation = locationsData.find((loc: Location) => loc.id === locationId)
      const locationProducts = productsData.filter((product: Product) => product.location?.id === locationId)
      const locationOrders = ordersData.filter((order: Order) => order.location?.id === locationId)

      setLocation(currentLocation)
      setProducts(locationProducts)
      setOrders(locationOrders)
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

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const recentOrders = orders.slice(0, 5)

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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Products</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{products.length}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">R{totalRevenue.toFixed(0)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                    <Package className="h-6 w-6 text-white" />
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">{location.manager}</p>
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

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Products at this Location</CardTitle>
                <CardDescription>All products available from {location.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">{product.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{product.price}</p>
                        </div>
                        <Badge variant={product.availability === "In Stock" ? "default" : "destructive"}>
                          {product.availability}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">No products at this location yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from {location.name}</CardDescription>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                          {order.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{order.customerName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">R{order.totalAmount}</p>
                        <Badge
                          variant={order.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">No orders from this location yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
