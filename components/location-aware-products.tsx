"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Search, Filter, MapPin, Truck, ShoppingBag, Star, Phone, Navigation } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Product, Location } from "@/types/product"

// Sample locations data
const sampleLocations: Location[] = [
  {
    id: "loc1",
    name: "Limpopo Main Farm",
    address: "123 Farm Road, Polokwane, Limpopo",
    coordinates: { lat: -23.9045, lng: 29.4689 },
   
    phone: "+27 11 123 4567",
    isActive: true,
    products: 45
  },
  {
    id: "loc2", 
    name: "Tzaneen Branch",
    address: "456 Market Street, Tzaneen, Limpopo",
    coordinates: { lat: -23.8333, lng: 30.1667 },
  
    phone: "+27 15 987 6543",
    isActive: true,
    products: 32
  },
  {
    id: "loc3",
    name: "Mokopane Outlet",
    address: "789 Commerce Ave, Mokopane, Limpopo",
   
    phone: "+27 15 555 0123",
    isActive: true,
    products: 18
  }
]

interface LocationAwareProductsProps {
  products: Product[]
  title?: string
  subtitle?: string
  showSearch?: boolean
  showFilters?: boolean
  gridCols?: "2" | "3" | "4"
  limit?: number
}

export default function LocationAwareProducts({
  products = [],
  title = "Our Products",
  subtitle,
  showSearch = false,
  showFilters = false,
  gridCols = "3",
  limit
}: LocationAwareProductsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    quantity: 1,
    notes: "",
    preferredLocation: ""
  })

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const d = R * c // Distance in kilometers
    return Math.round(d * 10) / 10 // Round to 1 decimal place
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Apply location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter(product => product.location.id === selectedLocation)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price.replace('R', '')) - parseFloat(b.price.replace('R', ''))
        case "price-high":
          return parseFloat(b.price.replace('R', '')) - parseFloat(a.price.replace('R', ''))
        case "category":
          return a.category.localeCompare(b.category)
        case "location":
          return a.location.name.localeCompare(b.location.name)
        case "distance":
          if (userLocation) {
            const distA = a.location.coordinates ? calculateDistance(
              userLocation.lat, userLocation.lng,
              a.location.coordinates.lat, a.location.coordinates.lng
            ) : Infinity
            const distB = b.location.coordinates ? calculateDistance(
              userLocation.lat, userLocation.lng,
              b.location.coordinates.lat, b.location.coordinates.lng
            ) : Infinity
            return distA - distB
          }
          return a.title.localeCompare(b.title)
        default:
          return a.title.localeCompare(b.title)
      }
    })

    // Apply limit if specified
    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    return filtered
  }, [products, searchTerm, selectedCategory, selectedLocation, sortBy, limit, userLocation])

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))]
    return uniqueCategories
  }, [products])

  const toggleFavorite = (productSlug: string) => {
    setFavoriteProducts(prev => 
      prev.includes(productSlug) 
        ? prev.filter(slug => slug !== productSlug)
        : [...prev, productSlug]
    )
  }

  const handleOrderProduct = (product: Product) => {
    setSelectedProduct(product)
    setOrderForm({
      ...orderForm,
      preferredLocation: product.location.id
    })
    setIsOrderModalOpen(true)
  }

  const submitOrder = () => {
    if (!selectedProduct) return

    const orderData = {
      product: selectedProduct,
      customer: orderForm,
      location: sampleLocations.find(loc => loc.id === orderForm.preferredLocation),
      timestamp: new Date().toISOString()
    }

    // In a real app, you would send this to your backend
    console.log("Order submitted:", orderData)

    // Create WhatsApp message
    const message = `Hi! I'd like to order:
    
Product: ${selectedProduct.title}
Quantity: ${orderForm.quantity}
Location: ${sampleLocations.find(loc => loc.id === orderForm.preferredLocation)?.name}
Customer: ${orderForm.customerName}
Phone: ${orderForm.customerPhone}
${orderForm.notes ? `Notes: ${orderForm.notes}` : ''}

Please confirm availability and total price. Thank you!`

    const whatsappUrl = `https://wa.me/27673470687?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    setIsOrderModalOpen(false)
    setOrderForm({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      quantity: 1,
      notes: "",
      preferredLocation: ""
    })
  }

  const getGridCols = () => {
    switch (gridCols) {
      case "2": return "grid-cols-1 md:grid-cols-2"
      case "4": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "vegetables": return "🥬"
      case "poultry": return "🐔"
      case "ice": return "🧊"
      default: return "🌟"
    }
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Location and Search Filters */}
        {(showSearch || showFilters) && (
          <div className="mb-8 space-y-4">
            {/* Current Location */}
            <div className="flex justify-center">
              <Button
                onClick={getCurrentLocation}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Navigation className="h-4 w-4" />
                <span>Use My Location for Distance</span>
              </Button>
            </div>

            {showSearch && (
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {showFilters && (
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48">
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {sampleLocations.filter(loc => loc.isActive).map(location => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    {userLocation && <SelectItem value="distance">Distance</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid ${getGridCols()} gap-6 lg:gap-8`}>
            {filteredProducts.map((product, index) => {
              const distance = userLocation && product.location.coordinates 
                ? calculateDistance(
                    userLocation.lat, userLocation.lng,
                    product.location.coordinates.lat, product.location.coordinates.lng
                  )
                : null

              return (
                <motion.div 
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-200 relative group-hover:scale-105 transition-transform duration-300">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                              <div className="text-4xl mb-2">{getCategoryIcon(product.category)}</div>
                              <p className="text-sm">No image available</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(product.slug)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors duration-200"
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            favoriteProducts.includes(product.slug) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </button>

                      {/* Category and Availability Badges */}
                      <div className="absolute top-3 left-3 space-y-1">
                        <Badge className="bg-green-600 text-white">
                          {product.category}
                        </Badge>
                        {product.availability !== "In Stock" && (
                          <Badge className="bg-red-500 text-white block">
                            {product.availability}
                          </Badge>
                        )}
                      </div>

                      {/* Featured Badge */}
                      {product.featured && (
                        <Badge className="absolute bottom-3 right-3 bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-2">
                        {product.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{product.location.name}</span>
                        {distance && (
                          <span className="text-green-600 font-medium">
                            • {distance}km away
                          </span>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {product.content}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-green-600">
                          {product.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          Stock: {product.stock || 'Available'}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleOrderProduct(product)}
                          disabled={product.availability === "Out of Stock"}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Order Now
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <a href={`tel:${(product.location as Location).phone}`}>
                            <Phone className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
            {(searchTerm || selectedCategory !== "all" || selectedLocation !== "all") && (
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedLocation("all")
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Order Modal */}
        <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Order {selectedProduct?.title}</DialogTitle>
              <DialogDescription>
                Complete your order details below
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerName">Full Name</Label>
                <Input
                  id="customerName"
                  value={orderForm.customerName}
                  onChange={(e) => setOrderForm({...orderForm, customerName: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  value={orderForm.customerPhone}
                  onChange={(e) => setOrderForm({...orderForm, customerPhone: e.target.value})}
                  placeholder="+27 XX XXX XXXX"
                />
              </div>
              
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({...orderForm, quantity: parseInt(e.target.value) || 1})}
                />
              </div>
              
              <div>
                <Label htmlFor="location">Preferred Location</Label>
                <Select value={orderForm.preferredLocation} onValueChange={(value) => setOrderForm({...orderForm, preferredLocation: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleLocations.filter(loc => loc.isActive).map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Special Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={orderForm.notes}
                  onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOrderModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitOrder} className="bg-green-600 hover:bg-green-700">
                Place Order via WhatsApp
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
