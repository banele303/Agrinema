'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, easeOut } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Phone, CheckCircle, XCircle } from 'lucide-react'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const isInStock = product.availability.toLowerCase() === 'in stock'
  
  const handleOrderNow = () => {
    const message = `Hi! I'm interested in ordering ${product.title} (${product.price}). Is it available?`
    const whatsappUrl = `https://wa.me/27673470687?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: easeOut
      }
    }
  }

  const modernCardHover = {
    scale: 1.02,
    y: -5,
    transition: { duration: 0.3, ease: easeOut }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={modernCardHover}
      className="relative group h-full"
    >
      <Card className="border-2 border-gray-100 hover:border-green-400 bg-gradient-to-br from-white via-gray-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-950 rounded-2xl sm:rounded-3xl overflow-hidden relative backdrop-blur-sm shadow-lg h-full group-hover:shadow-green-500/25 transition-all duration-500">
        {/* Featured Badge */}
        {product.featured && (
          <motion.div 
            className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
          >
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold shadow-lg">
              Featured
            </Badge>
          </motion.div>
        )}

        {/* Stock Status Badge */}
        <motion.div 
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
        >
          <Badge 
            variant={isInStock ? "default" : "destructive"}
            className={`${
              isInStock 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-red-500 hover:bg-red-600"
            } text-white px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1`}
          >
            {isInStock ? (
              <CheckCircle className="h-2 w-2 sm:h-3 sm:w-3" />
            ) : (
              <XCircle className="h-2 w-2 sm:h-3 sm:w-3" />
            )}
            <span className="hidden sm:inline">{product.availability}</span>
            <span className="sm:hidden">{isInStock ? "In Stock" : "Out"}</span>
          </Badge>
        </motion.div>

        {/* Gradient Border Animation */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1, duration: 1, ease: "easeOut" }}
        />

        {/* Product Image */}
        <motion.div 
          className="relative h-48 sm:h-56 md:h-64 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.div>

        <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg sm:text-xl font-bold text-foreground group-hover:text-green-600 transition-colors line-clamp-2 leading-tight">
                {product.title}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                {product.category}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3 sm:space-y-4 p-3 sm:p-6">
          {/* Price */}
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-xl sm:text-2xl font-bold text-green-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {product.price}
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
            {product.content}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1 sm:pt-2">
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button
                onClick={handleOrderNow}
                disabled={!isInStock}
                className={`w-full ${
                  isInStock
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white shadow-lg hover:shadow-xl transition-all duration-300 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold`}
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{isInStock ? "Order Now" : "Out of Stock"}</span>
                <span className="sm:hidden">{isInStock ? "Order" : "N/A"}</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const phoneUrl = `tel:+27673470687`
                  window.open(phoneUrl, '_self')
                }}
                className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 shadow-md hover:shadow-lg transition-all duration-300 h-8 w-8 sm:h-10 sm:w-10"
              >
                <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </motion.div>
          </div>
        </CardContent>

        {/* Decorative Elements */}
        <motion.div 
          className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-green-200 rounded-full opacity-10 -mr-8 -mb-8 sm:-mr-10 sm:-mb-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, delay: index * 0.5 }}
        />
      </Card>
    </motion.div>
  )
}
