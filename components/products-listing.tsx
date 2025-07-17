'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Grid, List } from 'lucide-react'
import ProductCard from '@/components/product-card'
import { Product } from '@/types/product'

interface ProductsListingProps {
  products: Product[]
  title?: string
  subtitle?: string
  showSearch?: boolean
  showFilters?: boolean
  gridCols?: 'auto' | '2' | '3' | '4'
}

export default function ProductsListing({ 
  products, 
  title = "Our Fresh Products",
  subtitle = "Premium quality produce from our farm to your table",
  showSearch = true,
  showFilters = true,
  gridCols = 'auto'
}: ProductsListingProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedAvailability, setSelectedAvailability] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(product => product.category)))
    return ['All', ...cats]
  }, [products])

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.content.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesAvailability = selectedAvailability === 'All' || product.availability === selectedAvailability
      
      return matchesSearch && matchesCategory && matchesAvailability
    })
  }, [products, searchQuery, selectedCategory, selectedAvailability])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const getGridCols = () => {
    if (gridCols === 'auto') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    if (gridCols === '2') return 'grid-cols-1 md:grid-cols-2'
    if (gridCols === '3') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    if (gridCols === '4') return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-green-600 text-white px-4 py-2 text-lg">
              Fresh Products
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          </motion.div>

          {/* Search and Filters */}
          {(showSearch || showFilters) && (
            <motion.div 
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Search Bar */}
              {showSearch && (
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-green-500 rounded-lg"
                  />
                </div>
              )}

              {/* Filters */}
              {showFilters && (
                <div className="flex flex-wrap justify-center gap-4 items-center">
                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={`${
                          selectedCategory === category
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "border-green-600 text-green-600 hover:bg-green-50"
                        } transition-all duration-200`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  {/* Availability Filter */}
                  <div className="flex gap-2">
                    {['All', 'In Stock', 'Out of Stock'].map((availability) => (
                      <Button
                        key={availability}
                        variant={selectedAvailability === availability ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedAvailability(availability)}
                        className={`${
                          selectedAvailability === availability
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-blue-600 text-blue-600 hover:bg-blue-50"
                        } transition-all duration-200`}
                      >
                        {availability}
                      </Button>
                    ))}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex gap-1 border border-gray-300 rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="px-3 py-1"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="px-3 py-1"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Results Count */}
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              className={`grid ${getGridCols()} gap-6`}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-md mx-auto">
                <div className="text-6xl text-muted-foreground mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All')
                    setSelectedAvailability('All')
                  }}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
