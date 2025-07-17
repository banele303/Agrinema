"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  Phone,
  MapPin,
  Leaf,
  Users,
  Award,
  Truck,
  Heart,
  Apple,
  Egg,
  Snowflake,
  CheckCircle,
  Star,
  Globe,
  Shield,
  Thermometer,
  Calendar,
  Package,
  Scale,
  Zap,
  Droplets,
  Sun,
  Sprout,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const slideFromBottomLeft = {
  hidden: { opacity: 0, x: -50, y: 50 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6 } },
  hover: { y: -10, scale: 1.05, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function ProductsPage() {
  return (
    <motion.div 
      className="bg-background w-full overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ overflowX: 'hidden' }}
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
          className="flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:shadow-green-500/50"
        >
          <Image
            src="/icons8-whatsapp-50.png"
            alt="WhatsApp"
            width={56}
            height={56}
            className="rounded-full"
          />
        </a>
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 pt-20 w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Image
            src="/vegetable.jpeg"
            alt="Agrinema Farm fresh vegetables, poultry, and ice products - Premium South African produce"
            fill
            className="object-cover opacity-20 dark:opacity-30"
            priority
          />
        </motion.div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <Badge className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-6 py-3 text-lg shadow-lg">
                Premium Quality • Farm Fresh
              </Badge>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-green-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 80 }}
            >
              Our <span className="text-green-600 dark:text-green-400 relative">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  Products
                </motion.span>
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-green-700 dark:text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              From farm-fresh vegetables and quality poultry to essential ice products - discover our comprehensive range of premium agricultural products grown and produced in Limpopo Province.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Product Categories Overview */}
      <motion.section 
        className="py-20 bg-white w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-6 py-3 shadow-lg">
                  Three Core Product Lines
                </Badge>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-green-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Our Product Categories
              </motion.h2>
              <motion.p 
                className="text-lg text-green-700 dark:text-green-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Each category represents our commitment to quality, sustainability, and meeting the diverse needs of our customers across South Africa.
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
            >
              <motion.div 
                initial={{ opacity: 0, x: -100, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Card className="group overflow-hidden bg-white dark:bg-gray-900 border-green-100 dark:border-green-800 hover:shadow-2xl transition-all duration-500 transform-gpu">
                  <motion.div 
                    className="relative h-48 overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src="/vegetable.jpeg"
                      alt="Fresh Vegetables from Agrinema Farm"
                      fill
                      className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4"
                      initial={{ y: 10, opacity: 0.8 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">Fresh Vegetables</h3>
                    </motion.div>
                  </motion.div>
                  <CardContent className="p-6">
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      Farm-fresh vegetables grown with sustainable practices in our Limpopo Province fields. From leafy greens to root vegetables, we provide the highest quality produce.
                    </motion.p>
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <Link href="/products/vegetables">
                          View Vegetables
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -100, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Card className="group overflow-hidden bg-white dark:bg-gray-900 border-green-100 dark:border-green-800 hover:shadow-2xl transition-all duration-500 transform-gpu">
                  <motion.div 
                    className="relative h-48 overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src="/plant.jpeg"
                      alt="Quality Poultry from Agrinema Farm"
                      fill
                      className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4"
                      initial={{ y: 10, opacity: 0.8 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">Quality Poultry</h3>
                    </motion.div>
                  </motion.div>
                  <CardContent className="p-6">
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      Premium poultry products raised with care and attention to animal welfare. Our chickens are free-range and fed with quality nutrition for superior taste and health.
                    </motion.p>
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <Link href="/products/poultry">
                          View Poultry
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -100, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Card className="group overflow-hidden bg-white dark:bg-gray-900 border-green-100 dark:border-green-800 hover:shadow-2xl transition-all duration-500 transform-gpu">
                  <motion.div 
                    className="relative h-48 overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src="/fresh1.jpeg"
                      alt="Ice Products from Agrinema Farm"
                      fill
                      className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute bottom-4 left-4 right-4"
                      initial={{ y: 10, opacity: 0.8 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">Ice Products</h3>
                    </motion.div>
                  </motion.div>
                  <CardContent className="p-6">
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      High-quality ice products for commercial and residential use. From block ice to crushed ice, we provide reliable cooling solutions for various applications.
                    </motion.p>
                    <motion.div 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        <Link href="/products/ice">
                          View Ice Products
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Detailed Product Information */}
      <motion.section 
        className="py-20 bg-green-50 w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-green-600 text-white px-6 py-2 text-lg">Product Details</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">Explore Our Product Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover detailed information about our premium products, from farm-fresh vegetables to quality poultry and essential ice products.
              </p>
            </motion.div>

            {/* Tab Container */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl border-2 border-green-100 p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Tabs defaultValue="vegetables" className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                >
                  <TabsList className="grid w-full grid-cols-3 mb-12 bg-gradient-to-r from-green-100 via-emerald-50 to-green-100 dark:from-green-900 dark:via-emerald-900 dark:to-green-900 shadow-2xl rounded-2xl p-3 border-2 border-green-200 dark:border-green-700">
                    <TabsTrigger 
                      value="vegetables" 
                      className="relative text-lg py-4 px-6 rounded-xl transition-all duration-500 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-green-500/50 data-[state=active]:scale-105 data-[state=active]:border-green-400 hover:bg-green-50 hover:text-green-700 hover:scale-102 transform-gpu"
                    >
                      <motion.span
                        className="relative z-10 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        🥬 Fresh Vegetables
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl opacity-0 data-[state=active]:opacity-20"
                        animate={{ opacity: [0, 0.1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </TabsTrigger>
                    <TabsTrigger 
                      value="poultry" 
                      className="relative text-lg py-4 px-6 rounded-xl transition-all duration-500 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-amber-500/50 data-[state=active]:scale-105 data-[state=active]:border-amber-400 hover:bg-amber-50 hover:text-amber-700 hover:scale-102 transform-gpu"
                    >
                      <motion.span
                        className="relative z-10 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        🐓 Premium Poultry
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl opacity-0 data-[state=active]:opacity-20"
                        animate={{ opacity: [0, 0.1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                    </TabsTrigger>
                    <TabsTrigger 
                      value="ice" 
                      className="relative text-lg py-4 px-6 rounded-xl transition-all duration-500 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/50 data-[state=active]:scale-105 data-[state=active]:border-blue-400 hover:bg-blue-50 hover:text-blue-700 hover:scale-102 transform-gpu"
                    >
                      <motion.span
                        className="relative z-10 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        🧊 Ice Products
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl opacity-0 data-[state=active]:opacity-20"
                        animate={{ opacity: [0, 0.1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                    </TabsTrigger>
                  </TabsList>
                </motion.div>

              {/* Fresh Vegetables Tab */}
              <TabsContent value="vegetables" className="space-y-12">
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-4xl font-bold text-green-900 mb-4">Fresh Vegetables</h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our vegetable production focuses on delivering the freshest, most nutritious produce using sustainable farming practices, advanced irrigation systems, and integrated pest management.
                  </p>
                </motion.div>

                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8, staggerChildren: 0.1 }}
                >
                  {[
                    { name: "Fresh Tomatoes", location: "Xigalo", season: "Year-round", icon: "🍅" },
                    { name: "Quality Onions", location: "Xigalo", season: "Year-round", icon: "🧅" },
                    { name: "Fresh Okra", location: "Xigalo", season: "Summer", icon: "🌶️" },
                    { name: "Premium Potatoes", location: "Xigalo", season: "Year-round", icon: "🥔" },
                    { name: "Fresh Spinach", location: "Xigalo", season: "Year-round", icon: "🥬" },
                    { name: "Hubbard Squash", location: "Tshamutilikwa", season: "Winter", icon: "🎃" },
                    { name: "Green Peppers", location: "Tshamutilikwa", season: "Summer", icon: "🫑" },
                    { name: "Fresh Butternut", location: "Tshivhulani", season: "Winter", icon: "🥒" },
                  ].map((vegetable, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -50, y: 50, scale: 0.8 }}
                      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.05, rotate: 2 }}
                    >
                      <Card className="border-green-200 bg-white hover:shadow-xl transition-all duration-500 transform-gpu hover:border-green-300">
                        <CardHeader className="text-center pb-2">
                          <motion.div 
                            className="text-4xl mb-2"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            {vegetable.icon}
                          </motion.div>
                          <CardTitle className="text-lg text-green-900">{vegetable.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <div className="space-y-2">
                            <motion.div 
                              className="flex items-center justify-center space-x-1"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              <MapPin className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-gray-600">{vegetable.location}</span>
                            </motion.div>
                            <motion.div 
                              className="flex items-center justify-center space-x-1"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                            >
                              <Calendar className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-gray-600">{vegetable.season}</span>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-2xl font-bold text-green-900 mb-6">Growing Practices</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Droplets className="h-6 w-6 text-blue-600 mt-1" />
                        <div>
                          <h5 className="font-semibold text-green-900">Advanced Irrigation</h5>
                          <p className="text-gray-600">Precision drip irrigation systems ensure optimal water usage and consistent moisture levels for healthy plant growth.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Sprout className="h-6 w-6 text-green-600 mt-1" />
                        <div>
                          <h5 className="font-semibold text-green-900">Organic Fertilizers</h5>
                          <p className="text-gray-600">We use organic and sustainable fertilization programs to enhance soil health and produce nutrient-rich vegetables.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Shield className="h-6 w-6 text-green-600 mt-1" />
                        <div>
                          <h5 className="font-semibold text-green-900">Integrated Pest Management</h5>
                          <p className="text-gray-600">Environmentally responsible pest control methods that minimize chemical usage while protecting crop quality.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Sun className="h-6 w-6 text-yellow-600 mt-1" />
                        <div>
                          <h5 className="font-semibold text-green-900">Optimal Growing Conditions</h5>
                          <p className="text-gray-600">Strategic site selection and microclimate management ensure ideal growing conditions for each vegetable variety.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-green-900 mb-6">Quality Standards</h4>
                    <Card className="border-green-200 bg-white">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">Harvested at peak ripeness for maximum nutrition</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">Rigorous quality inspection before packaging</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">Proper post-harvest handling and storage</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">Cold chain management for freshness</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">Food safety compliance and certification</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700">Traceability from farm to customer</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="mt-6">
                      <h5 className="font-semibold text-green-900 mb-3">Available Packaging Options</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <Badge variant="outline" className="justify-center py-2">Bulk Wholesale</Badge>
                        <Badge variant="outline" className="justify-center py-2">Retail Packaging</Badge>
                        <Badge variant="outline" className="justify-center py-2">Custom Sizes</Badge>
                        <Badge variant="outline" className="justify-center py-2">Branded Options</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Premium Poultry Tab */}
              <TabsContent value="poultry" className="space-y-12">
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-4xl font-bold text-green-900 mb-4">Premium Poultry</h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our state-of-the-art poultry facility at Bunzhe produces premium broiler chickens using the highest standards of animal welfare, nutrition, and biosecurity.
                  </p>
                </motion.div>

                <motion.div 
                  className="grid md:grid-cols-2 gap-12 mb-12"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div variants={slideFromBottomLeft}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src="/poultry1.jpg"
                        alt="Agrinema Farm premium broiler chicken production facility"
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500"
                      />
                    </motion.div>
                  </motion.div>
                  <motion.div variants={slideFromBottomLeft}>
                    <h4 className="text-2xl font-bold text-green-900 mb-6">Broiler Chicken Production</h4>
                    <motion.p 
                      className="text-gray-700 leading-relaxed mb-6"
                      initial={{ opacity: 0.8 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      Our broiler chickens are raised in modern, climate-controlled facilities that prioritize animal welfare and optimal growing conditions. From day-old chicks to market-ready birds, every aspect of production is carefully managed by experienced poultry professionals.
                    </motion.p>
                    <motion.div 
                      className="space-y-4"
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {[
                        { icon: Star, text: "Premium feed formulations for optimal growth" },
                        { icon: Star, text: "Climate-controlled housing systems" },
                        { icon: Star, text: "24/7 monitoring and care" },
                        { icon: Star, text: "Veterinary health programs" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center space-x-3"
                          variants={slideFromBottomLeft}
                          whileHover={{ x: 10, scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className="h-5 w-5 text-amber-600" />
                          <span className="text-gray-700">{item.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="grid md:grid-cols-3 gap-8 mb-12"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {[
                    { icon: Thermometer, title: "Climate Control", text: "Advanced ventilation and temperature control systems maintain optimal environmental conditions for healthy bird development and comfort." },
                    { icon: Package, title: "Premium Nutrition", text: "Scientifically formulated feed programs provide balanced nutrition for optimal growth rates, feed conversion, and meat quality." },
                    { icon: Shield, title: "Biosecurity", text: "Strict biosecurity protocols protect flock health and ensure consistent production of high-quality, safe poultry products." }
                  ].map((card, index) => (
                    <motion.div key={index} variants={slideFromBottomLeft} whileHover="hover">
                      <Card className="border-amber-200 bg-white hover:shadow-2xl transition-all duration-500 transform-gpu">
                        <CardHeader className="text-center">
                          <motion.div
                            whileHover={{ rotateY: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                          >
                            <card.icon className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                          </motion.div>
                          <CardTitle className="text-amber-900">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <motion.p 
                            className="text-gray-600 text-center"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {card.text}
                          </motion.p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className="grid md:grid-cols-2 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={slideFromBottomLeft}>
                      <h4 className="text-2xl font-bold text-green-900 mb-4">Production Specifications</h4>
                      <div className="space-y-3">
                        {[
                          { label: "Average Live Weight:", value: "2.0 - 2.5 kg" },
                          { label: "Growing Period:", value: "35-42 days" },
                          { label: "Feed Conversion:", value: "1.6:1 ratio" },
                          { label: "Production Capacity:", value: "High Volume" }
                        ].map((spec, index) => (
                          <motion.div 
                            key={index}
                            className="flex justify-between items-center"
                            whileHover={{ x: 5, scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="text-gray-700">{spec.label}</span>
                            <Badge variant="secondary" className="hover:bg-amber-200 transition-colors">{spec.value}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div variants={slideFromBottomLeft}>
                      <h4 className="text-2xl font-bold text-green-900 mb-4">Quality Assurance</h4>
                      <div className="space-y-3">
                        {[
                          "Regular health monitoring",
                          "Antibiotic-free production",
                          "Humane handling practices",
                          "HACCP compliance"
                        ].map((item, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-center space-x-2"
                            whileHover={{ x: 5, scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-gray-700">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </TabsContent>

              {/* Ice Products Tab */}
              <TabsContent value="ice" className="space-y-12">
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-4xl font-bold text-green-900 mb-4">Ice Products</h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our modern ice production facility at Tshivhulani produces high-quality ice cubes and blocks using purified water and advanced freezing technology for commercial and residential applications.
                  </p>
                </motion.div>

                <motion.div 
                  className="grid md:grid-cols-2 gap-8 mb-12"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <motion.div variants={slideFromBottomLeft} whileHover="hover">
                    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform-gpu">
                      <motion.div
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                        whileHover={{ backgroundPosition: "200% center" }}
                        transition={{ duration: 0.5 }}
                      >
                        <CardHeader>
                          <motion.div 
                            className="flex items-center space-x-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                          >
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Snowflake className="h-8 w-8" />
                            </motion.div>
                            <div>
                              <CardTitle className="text-2xl">Ice Cubes</CardTitle>
                              <CardDescription className="text-blue-100">Perfect for beverages and cooling applications</CardDescription>
                            </div>
                          </motion.div>
                        </CardHeader>
                      </motion.div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <motion.p 
                            className="text-gray-700"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            Our ice cubes are produced using purified water and rapid freezing technology, resulting in crystal-clear, slow-melting ice perfect for restaurants, bars, events, and home use.
                          </motion.p>
                          <div className="space-y-2">
                            <h5 className="font-semibold text-blue-900">Specifications:</h5>
                            <motion.div 
                              className="grid grid-cols-2 gap-2 text-sm"
                              variants={staggerContainer}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                            >
                              {[
                                { label: "Size:", value: "Standard cubes" },
                                { label: "Clarity:", value: "Crystal clear" },
                                { label: "Packaging:", value: "5kg, 10kg bags" },
                                { label: "Storage:", value: "-18°C" }
                              ].map((spec, index) => (
                                <motion.div 
                                  key={index}
                                  className="flex justify-between"
                                  variants={slideFromBottomLeft}
                                  whileHover={{ x: 5, scale: 1.02 }}
                                >
                                  <span>{spec.label}</span>
                                  <span>{spec.value}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={slideFromBottomLeft} whileHover="hover">
                    <Card className="border-blue-200 bg-gradient-to-br from-cyan-50 to-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform-gpu">
                      <motion.div
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                        whileHover={{ backgroundPosition: "200% center" }}
                        transition={{ duration: 0.5 }}
                      >
                        <CardHeader>
                          <motion.div 
                            className="flex items-center space-x-3"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          >
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Package className="h-8 w-8" />
                            </motion.div>
                            <div>
                              <CardTitle className="text-2xl">Ice Blocks</CardTitle>
                              <CardDescription className="text-cyan-100">Ideal for commercial refrigeration and large-scale cooling</CardDescription>
                            </div>
                          </motion.div>
                        </CardHeader>
                      </motion.div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <motion.p 
                            className="text-gray-700"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            Our ice blocks provide long-lasting cooling power for commercial applications, fishing, transportation, and large events where sustained refrigeration is essential.
                          </motion.p>
                          <div className="space-y-2">
                            <h5 className="font-semibold text-blue-900">Specifications:</h5>
                            <motion.div 
                              className="grid grid-cols-2 gap-2 text-sm"
                              variants={staggerContainer}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                            >
                              {[
                                { label: "Size:", value: "25kg, 50kg blocks" },
                                { label: "Density:", value: "High density" },
                                { label: "Melting:", value: "Slow melting" },
                                { label: "Delivery:", value: "Insulated transport" }
                              ].map((spec, index) => (
                                <motion.div 
                                  key={index}
                                  className="flex justify-between"
                                  variants={slideFromBottomLeft}
                                  whileHover={{ x: 5, scale: 1.02 }}
                                >
                                  <span>{spec.label}</span>
                                  <span>{spec.value}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="grid md:grid-cols-3 gap-8 mb-12"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {[
                    { icon: Droplets, title: "Pure Water Source", text: "We use advanced water filtration and purification systems to ensure our ice is made from the cleanest, safest water available." },
                    { icon: Zap, title: "Rapid Freezing", text: "State-of-the-art freezing equipment ensures consistent quality and crystal-clear ice with optimal density and melting characteristics." },
                    { icon: Truck, title: "Cold Chain Delivery", text: "Insulated delivery vehicles maintain product integrity from our facility to your location, ensuring fresh ice upon arrival." }
                  ].map((feature, index) => (
                    <motion.div key={index} variants={slideFromBottomLeft} whileHover="hover">
                      <Card className="border-blue-200 bg-white hover:shadow-2xl transition-all duration-500 transform-gpu">
                        <CardHeader className="text-center">
                          <motion.div
                            whileHover={{ rotateY: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                          >
                            <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                          </motion.div>
                          <CardTitle className="text-blue-900">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <motion.p 
                            className="text-gray-600 text-center"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {feature.text}
                          </motion.p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8"
                  initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.02, rotateX: 2 }}
                >
                  <motion.h4 
                    className="text-2xl font-bold text-green-900 mb-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Applications & Industries Served
                  </motion.h4>
                  <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {[
                      { icon: Users, title: "Restaurants & Bars", text: "Premium ice for beverages and food service" },
                      { icon: Heart, title: "Events & Catering", text: "Reliable ice supply for special occasions" },
                      { icon: Scale, title: "Retail Stores", text: "Bulk ice for retail and convenience stores" },
                      { icon: Globe, title: "Industrial Use", text: "Commercial cooling and preservation" }
                    ].map((industry, index) => (
                      <motion.div 
                        key={index}
                        className="text-center"
                        variants={slideFromBottomLeft}
                        whileHover={{ y: -10, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center"
                          whileHover={{ rotate: 360, backgroundColor: "#dbeafe" }}
                          transition={{ duration: 0.6 }}
                        >
                          <industry.icon className="h-8 w-8 text-blue-600" />
                        </motion.div>
                        <h5 className="font-semibold text-blue-900 mb-2">{industry.title}</h5>
                        <p className="text-sm text-gray-600">{industry.text}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quality Assurance */}
      <motion.section 
        className="py-20 bg-white w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-green-600 text-white px-6 py-3 shadow-lg">Quality Assurance</Badge>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-green-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Uncompromising Quality Standards
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Every product that leaves our facilities undergoes rigorous quality control processes to ensure you receive only the best
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={slideFromBottomLeft} whileHover="hover">
                <Card className="border-green-200 hover:shadow-2xl transition-all duration-500 transform-gpu hover:border-green-300 bg-white">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ rotateY: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    </motion.div>
                    <CardTitle className="text-green-900">Certified Standards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.p 
                      className="text-gray-600 text-center"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      All our products meet or exceed South African food safety standards and industry best practices for quality and safety.
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={slideFromBottomLeft} whileHover="hover">
                <Card className="border-green-200 hover:shadow-2xl transition-all duration-500 transform-gpu hover:border-green-300 bg-white">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ rotateY: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    </motion.div>
                    <CardTitle className="text-green-900">Safety First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.p 
                      className="text-gray-600 text-center"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      Comprehensive safety protocols throughout production, handling, and distribution ensure product integrity and consumer safety.
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={slideFromBottomLeft} whileHover="hover">
                <Card className="border-green-200 hover:shadow-2xl transition-all duration-500 transform-gpu hover:border-green-300 bg-white">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ rotateY: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    </motion.div>
                    <CardTitle className="text-green-900">Regular Testing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.p 
                      className="text-gray-600 text-center"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      Routine quality testing and inspection at every stage of production maintain consistent quality and identify improvements.
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={slideFromBottomLeft} whileHover="hover">
                <Card className="border-green-200 hover:shadow-2xl transition-all duration-500 transform-gpu hover:border-green-300 bg-white">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ rotateY: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    </motion.div>
                    <CardTitle className="text-green-900">Global Standards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.p 
                      className="text-gray-600 text-center"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      Our processes align with international quality standards, ensuring our products compete globally while maintaining local excellence.
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-green-950 dark:bg-black text-white py-12 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="grid md:grid-cols-4 gap-8"
              variants={staggerContainer}
            >
              <motion.div className="md:col-span-2" variants={slideFromBottomLeft}>
                <motion.div 
                  className="flex items-center space-x-3 mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image
                      src="/fresh-logo.jpeg"
                      alt="Agrinema Farm Logo"
                      width={40}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </motion.div>
                  <span className="text-2xl font-bold">Agrinema Farm</span>
                </motion.div>
                <motion.p 
                  className="text-green-200 mb-4 max-w-md"
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Freshness rooted in Limpopo. From farm to table, committed to food security and community wellness
                  since 2022.
                </motion.p>
                <div className="flex space-x-4">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }} 
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 bg-transparent transition-all duration-300"
                    >
                      Facebook
                    </Button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }} 
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-400 text-green-400 hover:bg-green-400 hover:text-green-950 bg-transparent transition-all duration-300"
                    >
                      WhatsApp
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={slideFromBottomLeft}>
                <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <motion.div whileHover={{ x: 5, scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Link href="/about" className="block text-green-200 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 5, scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Link href="/products" className="block text-green-200 hover:text-white transition-colors">
                      Our Products
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 5, scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Link href="/blog" className="block text-green-200 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ x: 5, scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Link href="/contact" className="block text-green-200 hover:text-white transition-colors">
                      Contact
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={slideFromBottomLeft}>
                <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
                <div className="space-y-2 text-green-200">
                  <motion.p whileHover={{ x: 5, color: "#ffffff" }} transition={{ duration: 0.2 }}>067 347 0687</motion.p>
                  <motion.p whileHover={{ x: 5, color: "#ffffff" }} transition={{ duration: 0.2 }}>068 801 1545</motion.p>
                  <motion.p whileHover={{ x: 5, color: "#ffffff" }} transition={{ duration: 0.2 }}>Limpopo Province</motion.p>
                  <motion.p whileHover={{ x: 5, color: "#ffffff" }} transition={{ duration: 0.2 }}>South Africa</motion.p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="border-t border-green-800 mt-8 pt-8 text-center text-green-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p>&copy; {new Date().getFullYear()} Agrinema Farm. All rights reserved. Proudly South African.</p>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}
