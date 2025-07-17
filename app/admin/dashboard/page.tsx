"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  MapPin, 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Moon,
  Sun,
  Menu
} from "lucide-react"
import { Product, Location, Order, Analytics } from "@/types/product"
import OrderManagement from "@/components/order-management"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function AdminDashboard() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [products, setProducts] = useState<Product[]>([])
  const [locations, setLocations] = useState<Location[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [analytics, setAnalytics] = useState<Analytics>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalLocations: 0,
    ordersToday: 0,
    revenueToday: 0,
    topProducts: [],
    ordersByLocation: [],
    ordersByStatus: [],
    revenueByMonth: []
  })
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    availability: "In Stock" as const,
    featured: false,
    locationId: "",
    stock: 0,
    content: "",
    image: ""
  })

  const [locationFormData, setLocationFormData] = useState({
    name: "",
    address: "",
    manager: "",
    phone: "",
    coordinates: { lat: 0, lng: 0 },
    isActive: true
  })

  // Load data on component mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [productsRes, locationsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/locations'),
        fetch('/api/orders')
      ])

      const productsData = await productsRes.json()
      const locationsData = await locationsRes.json()
      const ordersData = await ordersRes.json()

      console.log('Dashboard Data Loaded:', {
        products: productsData.length,
        locations: locationsData.length, 
        orders: ordersData.length,
        productsData,
        ordersData
      })

      setProducts(productsData)
      setLocations(locationsData)
      setOrders(ordersData)

      // Calculate analytics
      const analytics = calculateAnalytics(productsData, locationsData, ordersData)
      console.log('Calculated Analytics:', analytics)
      setAnalytics(analytics)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateAnalytics = (products: Product[], locations: Location[], orders: Order[]): Analytics => {
    const today = new Date()
    const todayString = today.toISOString().split('T')[0] // Get YYYY-MM-DD format
    
    const ordersToday = orders.filter(order => {
      const orderDate = new Date(order.orderDate).toISOString().split('T')[0]
      return orderDate === todayString
    }).length
    
    const revenueToday = orders
      .filter(order => {
        const orderDate = new Date(order.orderDate).toISOString().split('T')[0]
        return orderDate === todayString
      })
      .reduce((sum, order) => sum + order.totalAmount, 0)

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

    // Calculate product counts per location
    const locationProductCounts = locations.map(location => ({
      ...location,
      products: products.filter(product => product.location?.id === location.id).length
    }))

    return {
      totalOrders: orders.length,
      totalRevenue,
      totalProducts: products.length,
      totalLocations: locations.length,
      ordersToday,
      revenueToday,
      topProducts: products
        .map(product => {
          const productOrders = orders.filter(order => order.productId === product.slug)
          const orderCount = productOrders.length
          const revenue = productOrders.reduce((sum, order) => sum + order.totalAmount, 0)
          return {
            product,
            orders: orderCount,
            revenue
          }
        })
        .sort((a, b) => b.orders - a.orders)
        .slice(0, 5),
      ordersByLocation: locationProductCounts.map(location => ({
        location,
        orders: orders.filter(order => order.location?.id === location.id).length,
        revenue: orders
          .filter(order => order.location?.id === location.id)
          .reduce((sum, order) => sum + order.totalAmount, 0)
      })),
      ordersByStatus: [
        { status: "pending", count: orders.filter(o => o.status === "pending").length },
        { status: "confirmed", count: orders.filter(o => o.status === "confirmed").length },
        { status: "preparing", count: orders.filter(o => o.status === "preparing").length },
        { status: "ready", count: orders.filter(o => o.status === "ready").length },
        { status: "completed", count: orders.filter(o => o.status === "completed").length },
        { status: "cancelled", count: orders.filter(o => o.status === "cancelled").length }
      ],
      revenueByMonth: [] // Could implement monthly calculations here
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.type}. Please select a JPEG, PNG, WebP, or GIF image.`)
        return
      }
      
      // Validate file size (5MB limit for Vercel compatibility)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        alert('File too large. Maximum size is 5MB for deployment compatibility.')
        return
      }
      
      console.log('Image selected:', {
        name: file.name,
        type: file.type,
        size: file.size
      })
      
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new globalThis.Image() // Use global Image constructor
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              })
              resolve(compressedFile)
            } else {
              resolve(file) // Fallback to original
            }
          },
          file.type,
          quality
        )
      }
      
      img.onerror = () => resolve(file) // Fallback to original
      img.src = URL.createObjectURL(file)
    })
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      console.log('Original file:', {
        name: file.name,
        type: file.type,
        size: file.size
      })
      
      // Compress image for better upload success on Vercel
      const compressedFile = await compressImage(file, 1200, 0.8)
      
      console.log('Compressed file:', {
        name: compressedFile.name,
        type: compressedFile.type,
        size: compressedFile.size,
        reduction: `${Math.round((1 - compressedFile.size / file.size) * 100)}%`
      })
      
      const formData = new FormData()
      formData.append('file', compressedFile)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Upload response error:', errorData)
        throw new Error(errorData.error || `Upload failed: ${response.status} ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log('Upload successful:', result)
      return result.url
      
    } catch (error) {
      console.error('Upload error:', error)
      throw new Error(error instanceof Error ? error.message : 'Failed to upload image')
    }
  }

  const handleCreateProduct = async () => {
    try {
      let imageUrl = "/placeholder.jpg"
      
      // Upload image if one was selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const productData = {
        title: formData.title,
        category: formData.category,
        price: formData.price,
        availability: formData.availability,
        featured: formData.featured,
        image: imageUrl,
        content: formData.content,
        locationId: formData.locationId,
        stock: formData.stock
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      // Reload data to reflect changes
      await loadData()
      setIsCreateModalOpen(false)
      
      // Reset form
      setFormData({
        title: "",
        category: "",
        price: "",
        availability: "In Stock",
        featured: false,
        locationId: "",
        stock: 0,
        content: "",
        image: ""
      })
      setImagePreview("")
      setImageFile(null)
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product. Please try again.')
    }
  }

  const handleDeleteProduct = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      console.log('Attempting to delete product:', slug)
      
      const response = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Delete response error:', errorData)
        throw new Error(errorData.error || `Failed to delete product: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('Product deleted successfully:', result)
      
      // Reload data after successful deletion
      await loadData()
      
      // Show success message
      alert('Product deleted successfully!')
      
    } catch (error) {
      console.error('Error deleting product:', error)
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete product'
      alert(`Error: ${errorMessage}`)
    }
  }

  const handleUpdateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, ...updates })
      })

      if (!response.ok) {
        throw new Error('Failed to update order')
      }

      await loadData()
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order. Please try again.')
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) {
      return
    }

    try {
      const response = await fetch(`/api/orders?id=${orderId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete order')
      }

      await loadData()
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order. Please try again.')
    }
  }

  // Location Management Functions
  const handleCreateLocation = async () => {
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...locationFormData,
          id: Date.now().toString(),
          products: 0
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create location')
      }

      await loadData()
      setIsLocationModalOpen(false)
      setLocationFormData({
        name: "",
        address: "",
        manager: "",
        phone: "",
        coordinates: { lat: 0, lng: 0 },
        isActive: true
      })
    } catch (error) {
      console.error('Error creating location:', error)
      alert('Failed to create location. Please try again.')
    }
  }

  const handleUpdateLocation = async (locationId: string, updates: Partial<Location>) => {
    try {
      const response = await fetch('/api/locations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: locationId, ...updates })
      })

      if (!response.ok) {
        throw new Error('Failed to update location')
      }

      await loadData()
    } catch (error) {
      console.error('Error updating location:', error)
      alert('Failed to update location. Please try again.')
    }
  }

  const handleDeleteLocation = async (locationId: string) => {
    if (!confirm('Are you sure you want to delete this location?')) {
      return
    }

    try {
      const response = await fetch(`/api/locations?id=${locationId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete location')
      }

      await loadData()
    } catch (error) {
      console.error('Error deleting location:', error)
      alert('Failed to delete location. Please try again.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500"
      case "confirmed": return "bg-blue-500"
      case "preparing": return "bg-yellow-500"
      case "pending": return "bg-orange-500"
      case "cancelled": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Modern Header with Glass Effect */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Agrinema Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Smart farm management system
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden border-gray-200 dark:border-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="font-semibold">{analytics.ordersToday}</span>
                  <span className="text-green-100">today</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold">R{analytics.revenueToday.toFixed(0)}</span>
                  <span className="text-blue-100">revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(100vh-100px)]">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-r-green-500 animate-spin"></div>
              <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading Dashboard</h3>
            <p className="text-gray-500 dark:text-gray-400">Setting up your farm management system...</p>
          </div>
        </div>
      ) : (        <div className="flex flex-col lg:flex-row">
          {/* Modern Sidebar - Hidden on mobile, shown as bottom nav */}
          <div className="hidden lg:block w-72 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50 h-[calc(100vh-100px)]">
            <nav className="p-6 space-y-2">
              {[
                { id: "dashboard", icon: BarChart3, label: "Dashboard", count: null },
                { id: "products", icon: Package, label: "Products", count: analytics.totalProducts },
                { id: "orders", icon: ShoppingCart, label: "Orders", count: analytics.totalOrders },
                { id: "locations", icon: MapPin, label: "Locations", count: analytics.totalLocations },
                { id: "analytics", icon: PieChart, label: "Analytics", count: null }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 ${
                    activeTab === item.id 
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-4 relative z-10">
                    <div className={`p-2 rounded-xl transition-colors ${
                      activeTab === item.id 
                        ? "bg-white/20" 
                        : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                    }`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.count !== null && (
                      <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        activeTab === item.id 
                          ? "bg-white/20 text-white" 
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      }`}>
                        {item.count}
                      </div>
                    )}
                  </div>
                  
                  {/* Animated background for active state */}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl"
                      style={{ zIndex: 0 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* User Profile Section */}
              <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">Farm Admin</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">System Manager</p>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile Navigation - Bottom tabs */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 z-50">
            <nav className="flex justify-around items-center py-3 px-2">
              {[
                { id: "dashboard", icon: BarChart3, label: "Dashboard" },
                { id: "products", icon: Package, label: "Products" },
                { id: "orders", icon: ShoppingCart, label: "Orders" },
                { id: "locations", icon: MapPin, label: "Locations" },
                { id: "analytics", icon: PieChart, label: "Analytics" }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-300 ${
                    activeTab === item.id 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeTab === item.id 
                      ? "bg-green-100 dark:bg-green-900/30" 
                      : "bg-transparent"
                  }`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Modern Main Content */}
          <div className="flex-1 p-4 lg:p-8 overflow-auto h-[calc(100vh-160px)] lg:h-[calc(100vh-100px)] pb-20 lg:pb-8">
            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Modern Stats Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {[
                      {
                        title: "Total Revenue",
                        value: `R${analytics.totalRevenue.toLocaleString()}`,
                        change: "+20.1% from last month",
                        icon: DollarSign,
                        gradient: "from-emerald-500 to-teal-600",
                        bgGradient: "from-emerald-50 to-teal-50",
                        darkBgGradient: "from-emerald-900/20 to-teal-900/20"
                      },
                      {
                        title: "Orders",
                        value: analytics.totalOrders.toString(),
                        change: `+${analytics.ordersToday} today`,
                        icon: ShoppingCart,
                        gradient: "from-blue-500 to-cyan-600",
                        bgGradient: "from-blue-50 to-cyan-50",
                        darkBgGradient: "from-blue-900/20 to-cyan-900/20"
                      },
                      {
                        title: "Products",
                        value: analytics.totalProducts.toString(),
                        change: `Across ${analytics.totalLocations} locations`,
                        icon: Package,
                        gradient: "from-purple-500 to-pink-600",
                        bgGradient: "from-purple-50 to-pink-50",
                        darkBgGradient: "from-purple-900/20 to-pink-900/20"
                      },
                      {
                        title: "Active Locations",
                        value: locations.filter(l => l.isActive).length.toString(),
                        change: `Out of ${analytics.totalLocations} total`,
                        icon: MapPin,
                        gradient: "from-orange-500 to-red-600",
                        bgGradient: "from-orange-50 to-red-50",
                        darkBgGradient: "from-orange-900/20 to-red-900/20"
                      }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="group"
                      >
                        <Card className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${stat.bgGradient} dark:${stat.darkBgGradient} backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl`}>
                          <CardContent className="p-4 lg:p-6">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1 lg:space-y-2 min-w-0 flex-1">
                                <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                                  {stat.title}
                                </p>
                                <p className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                  {stat.value}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {stat.change}
                                </p>
                              </div>
                              <div className={`p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                <stat.icon className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                              </div>
                            </div>
                            
                            {/* Animated background pattern */}
                            <div className="absolute top-0 right-0 w-20 h-20 lg:w-32 lg:h-32 opacity-10 transform rotate-12 translate-x-4 lg:translate-x-8 -translate-y-4 lg:-translate-y-8">
                              <div className={`w-full h-full bg-gradient-to-br ${stat.gradient} rounded-2xl lg:rounded-3xl`}></div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                {/* Modern Recent Orders */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Recent Orders
                          </CardTitle>
                          <CardDescription className="text-gray-500 dark:text-gray-400">
                            Latest customer orders from all locations
                          </CardDescription>
                        </div>
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                        >
                          <Clock className="h-4 w-4 text-white" />
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order, index) => (
                          <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 4 }}
                            className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-100 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-4 h-4 rounded-full ${getStatusColor(order.status)} shadow-lg`} />
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                                {order.customerName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                  {order.customerName}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {order.location.name}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900 dark:text-white">
                                R{order.totalAmount}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                {order.status}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                        {orders.length === 0 && (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No recent orders</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Products
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Manage your farm products and inventory
                    </p>
                  </div>
                  <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-300">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Product
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Create New Product</DialogTitle>
                        <DialogDescription>
                          Add a new product to your farm inventory
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Product Name</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => setFormData({...formData, title: e.target.value})}
                              placeholder="e.g., Fresh Tomatoes"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="vegetables">Vegetables</SelectItem>
                                <SelectItem value="poultry">Poultry</SelectItem>
                                <SelectItem value="ice">Ice</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price (R)</Label>
                            <Input
                              id="price"
                              value={formData.price}
                              onChange={(e) => setFormData({...formData, price: e.target.value})}
                              placeholder="25.99"
                            />
                          </div>
                          <div>
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={formData.stock}
                              onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                              placeholder="100"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="availability">Availability</Label>
                            <Select value={formData.availability} onValueChange={(value: any) => setFormData({...formData, availability: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="In Stock">In Stock</SelectItem>
                                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                                <SelectItem value="Limited Stock">Limited Stock</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Select value={formData.locationId} onValueChange={(value) => setFormData({...formData, locationId: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                {locations.filter(loc => loc.isActive).map((location) => (
                                  <SelectItem key={location.id} value={location.id}>
                                    {location.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="featured"
                            checked={formData.featured}
                            onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                          />
                          <Label htmlFor="featured">Featured Product</Label>
                        </div>

                        <div>
                          <Label htmlFor="image">Product Image</Label>
                          <div className="mt-2">
                            <Input
                              id="image"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="mb-4"
                            />
                            {imagePreview && (
                              <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                                <Image
                                  src={imagePreview}
                                  alt="Preview"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="content">Description</Label>
                          <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                            placeholder="Detailed description of the product..."
                            rows={4}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateProduct} className="bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 mr-2" />
                          Create Product
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                {/* Modern Product List */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  {products.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                      <p className="text-gray-500 dark:text-gray-400">Start by adding your first product to the inventory.</p>
                    </div>
                  ) : (
                    products.map((product, index) => (
                      <motion.div
                        key={product.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -2 }}
                        className="group"
                      >
                        <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                              {/* Product Image */}
                              <div className="w-full sm:w-20 h-20 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.featured && (
                                  <div className="absolute top-1 left-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  </div>
                                )}
                              </div>

                              {/* Product Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
                                      {product.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                      <Badge
                                        variant="outline"
                                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-xs"
                                      >
                                        {product.category}
                                      </Badge>
                                      <Badge
                                        variant={product.availability === "In Stock" ? "default" : "destructive"}
                                        className="text-xs"
                                      >
                                        {product.availability}
                                      </Badge>
                                      <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {product.location?.name || 'No location'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Price and Stock */}
                                  <div className="flex flex-col sm:text-right">
                                    <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                      {product.price}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {product.stock} in stock
                                    </p>
                                  </div>
                                </div>

                                {/* Product Description */}
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                                  {product.content}
                                </p>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {product.orders || 0} orders
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      {new Date(product.createdAt || new Date()).toLocaleDateString()}
                                    </span>
                                  </div>

                                  <div className="flex gap-2">
                                    <motion.div
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                                      >
                                        <Edit className="h-4 w-4 mr-1" />
                                        <span className="hidden sm:inline">Edit</span>
                                      </Button>
                                    </motion.div>
                                    <motion.div
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 transition-all duration-300"
                                        onClick={() => handleDeleteProduct(product.slug)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="hidden sm:inline ml-1">Delete</span>
                                      </Button>
                                    </motion.div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <OrderManagement
                  orders={orders}
                  onUpdateOrder={handleUpdateOrder}
                  onDeleteOrder={handleDeleteOrder}
                />
              </motion.div>
            )}

            {activeTab === "locations" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Location Management</h3>
                    <p className="text-gray-600 dark:text-gray-400">Manage farm locations and their details</p>
                  </div>
                  <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Location
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Location</DialogTitle>
                        <DialogDescription>
                          Create a new farm location
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="locationName">Location Name</Label>
                          <Input
                            id="locationName"
                            value={locationFormData.name}
                            onChange={(e) => setLocationFormData({...locationFormData, name: e.target.value})}
                            placeholder="Farm location name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Textarea
                            id="address"
                            value={locationFormData.address}
                            onChange={(e) => setLocationFormData({...locationFormData, address: e.target.value})}
                            placeholder="Complete address"
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label htmlFor="manager">Manager</Label>
                          <Input
                            id="manager"
                            value={locationFormData.manager}
                            onChange={(e) => setLocationFormData({...locationFormData, manager: e.target.value})}
                            placeholder="Manager name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={locationFormData.phone}
                            onChange={(e) => setLocationFormData({...locationFormData, phone: e.target.value})}
                            placeholder="Contact phone"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="isActive"
                            checked={locationFormData.isActive}
                            onCheckedChange={(checked) => setLocationFormData({...locationFormData, isActive: checked})}
                          />
                          <Label htmlFor="isActive">Active Location</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsLocationModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateLocation} className="bg-green-600 hover:bg-green-700">
                          Create Location
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Locations Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                  <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900 dark:text-white">{location.name}</h4>
                                  <Badge variant={location.isActive ? "default" : "secondary"}>
                                    {location.isActive ? "Active" : "Inactive"}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span>{location.address}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <Package className="h-4 w-4" />
                                <span>Products: {location.products}</span>
                              </div>
                              {location.productAvailability && location.productAvailability.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Product Availability:</p>
                                  <div className="space-y-1">
                                    {location.productAvailability.slice(0, 3).map((product, idx) => (
                                      <div key={idx} className="flex items-center justify-between text-xs">
                                        <span className="text-gray-600 dark:text-gray-400">{product.name}</span>
                                        <Badge 
                                          variant={product.status === 'available' ? 'default' : 'secondary'}
                                          className="text-xs"
                                        >
                                          {product.status === 'available' ? 'Available' : 'Upcoming'}
                                        </Badge>
                                      </div>
                                    ))}
                                    {location.productAvailability.length > 3 && (
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        +{location.productAvailability.length - 3} more
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedLocation(location)
                                setLocationFormData({
                                  name: location.name,
                                  address: location.address,
                                  manager: "",
                                  phone: location.phone,
                                  coordinates: location.coordinates || { lat: 0, lng: 0 },
                                  isActive: location.isActive
                                })
                                  setIsLocationModalOpen(true)
                                }}
                                className="flex-1"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteLocation(location.id)}
                                className="border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {locations.length === 0 && (
                  <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
                    <CardContent className="py-12 text-center">
                      <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No locations found</h4>
                      <p className="text-gray-500 dark:text-gray-400">Create your first farm location to get started.</p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>View detailed analytics and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Advanced analytics coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      )}
    </div>
  )
}
