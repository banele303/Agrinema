"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Save, Eye, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

interface Product {
  slug: string
  title: string
  price: string
  availability: "In Stock" | "Out of Stock" | "Limited Stock"
  image: string
  featured: boolean
  category: "vegetables" | "poultry" | "ice" | "other"
  content: string
}

const sampleProducts: Product[] = [
  {
    slug: "tomatoes",
    title: "Fresh Tomatoes",
    price: "R30 per kg",
    availability: "In Stock",
    image: "tomato7.jpg",
    featured: true,
    category: "vegetables",
    content: "Locally grown organic tomatoes, picked fresh from the farm."
  },
  {
    slug: "onions",
    title: "Fresh Onions",
    price: "R25 per kg",
    availability: "In Stock",
    image: "onion3.jpg",
    featured: true,
    category: "vegetables",
    content: "High-quality white and red onions grown in our fertile fields."
  },
  {
    slug: "broiler-chickens",
    title: "Broiler Chickens",
    price: "R180 per kg",
    availability: "Limited Stock",
    image: "IMG_6097.jpg",
    featured: false,
    category: "poultry",
    content: "Premium quality broiler chickens raised with care."
  }
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    price: "",
    availability: "In Stock",
    image: "",
    featured: false,
    category: "vegetables",
    content: ""
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        console.error('Failed to load products')
        setMessage("Failed to load products")
      }
    } catch (error) {
      console.error('Error loading products:', error)
      setMessage("Error loading products")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (isCreating) {
      try {
        const slug = newProduct.title?.toLowerCase().replace(/\s+/g, '-') || ""
        const product: Product = {
          slug,
          title: newProduct.title || "",
          price: newProduct.price || "",
          availability: newProduct.availability || "In Stock",
          image: newProduct.image || "",
          featured: newProduct.featured || false,
          category: newProduct.category || "vegetables",
          content: newProduct.content || ""
        }
        
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        })
        
        if (response.ok) {
          await loadProducts() // Reload products from API
          setMessage("Product created successfully!")
          setIsCreating(false)
          setNewProduct({
            title: "",
            price: "",
            availability: "In Stock",
            image: "",
            featured: false,
            category: "vegetables",
            content: ""
          })
        } else {
          const errorData = await response.json()
          setMessage(`Error creating product: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Create error:', error)
        setMessage("Error creating product. Please try again.")
      }
    } else if (selectedProduct) {
      try {
        const response = await fetch('/api/products', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedProduct),
        })
        
        if (response.ok) {
          await loadProducts() // Reload products from API
          setMessage("Product updated successfully!")
          setIsEditing(false)
        } else {
          const errorData = await response.json()
          setMessage(`Error updating product: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Update error:', error)
        setMessage("Error updating product. Please try again.")
      }
    }
    setTimeout(() => setMessage(""), 3000)
  }

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products?slug=${slug}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          await loadProducts() // Reload products from API
          setMessage("Product deleted successfully!")
          setSelectedProduct(null)
          setTimeout(() => setMessage(""), 3000)
        } else {
          const errorData = await response.json()
          setMessage(`Error deleting product: ${errorData.error || 'Unknown error'}`)
          setTimeout(() => setMessage(""), 5000)
        }
      } catch (error) {
        console.error('Delete error:', error)
        setMessage("Error deleting product. Please try again.")
        setTimeout(() => setMessage(""), 5000)
      }
    }
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Product Administration</h1>
              <p className="text-muted-foreground">Manage your farm products and inventory</p>
              <Badge className="mt-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                🔒 Private Admin Area
              </Badge>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Website
                </Button>
              </Link>
              <Button 
                onClick={() => setIsCreating(true)}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Product
              </Button>
            </div>
          </div>

          {/* Success/Error Messages */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">All Products ({products.length})</TabsTrigger>
              <TabsTrigger value="featured">Featured ({products.filter(p => p.featured).length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {/* Products Grid */}
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                  <motion.div key={product.slug} variants={cardVariants} initial="hidden" animate="visible">
                    <Card className="relative overflow-hidden border-2 hover:border-green-300 transition-colors">
                      {product.featured && (
                        <Badge className="absolute top-2 left-2 z-10 bg-green-600 text-white">
                          Featured
                        </Badge>
                      )}
                      <Badge 
                        className={`absolute top-2 right-2 z-10 ${
                          product.availability === "In Stock" ? "bg-green-500" :
                          product.availability === "Limited Stock" ? "bg-orange-500" :
                          "bg-red-500"
                        } text-white`}
                      >
                        {product.availability}
                      </Badge>
                      
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={`/${product.image}`}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                        <p className="text-green-600 font-medium mb-2">{product.price}</p>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {product.content}
                        </p>
                        <Badge variant="outline" className="mb-4">
                          {product.category}
                        </Badge>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedProduct(product)
                              setIsEditing(true)
                            }}
                            className="flex-1"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(product.slug)}
                            className="flex-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="featured">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.featured).map((product) => (
                  <motion.div key={product.slug} variants={cardVariants} initial="hidden" animate="visible">
                    <Card className="relative overflow-hidden border-2 border-green-200">
                      <div className="relative h-48 bg-gray-100">
                        <img
                          src={`/${product.image}`}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                        <p className="text-green-600 font-medium">{product.price}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-green-600">{products.length}</CardTitle>
                    <CardDescription>Total Products</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-green-600">{products.filter(p => p.featured).length}</CardTitle>
                    <CardDescription>Featured Products</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-green-600">{products.filter(p => p.availability === "In Stock").length}</CardTitle>
                    <CardDescription>In Stock</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl text-orange-600">{products.filter(p => p.availability === "Limited Stock").length}</CardTitle>
                    <CardDescription>Limited Stock</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Edit/Create Modal */}
          {(isEditing || isCreating) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsEditing(false)
                  setIsCreating(false)
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-bold mb-6">
                  {isCreating ? "Add New Product" : "Edit Product"}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Product Title</Label>
                    <Input
                      id="title"
                      value={isCreating ? newProduct.title : selectedProduct?.title || ""}
                      onChange={(e) => {
                        if (isCreating) {
                          setNewProduct({...newProduct, title: e.target.value})
                        } else if (selectedProduct) {
                          setSelectedProduct({...selectedProduct, title: e.target.value})
                        }
                      }}
                      placeholder="Enter product title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={isCreating ? newProduct.price : selectedProduct?.price || ""}
                      onChange={(e) => {
                        if (isCreating) {
                          setNewProduct({...newProduct, price: e.target.value})
                        } else if (selectedProduct) {
                          setSelectedProduct({...selectedProduct, price: e.target.value})
                        }
                      }}
                      placeholder="e.g., R30 per kg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Image Filename</Label>
                    <Input
                      id="image"
                      value={isCreating ? newProduct.image : selectedProduct?.image || ""}
                      onChange={(e) => {
                        if (isCreating) {
                          setNewProduct({...newProduct, image: e.target.value})
                        } else if (selectedProduct) {
                          setSelectedProduct({...selectedProduct, image: e.target.value})
                        }
                      }}
                      placeholder="e.g., tomato7.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={isCreating ? newProduct.category : selectedProduct?.category || "vegetables"}
                      onValueChange={(value) => {
                        if (isCreating) {
                          setNewProduct({...newProduct, category: value as any})
                        } else if (selectedProduct) {
                          setSelectedProduct({...selectedProduct, category: value as any})
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="poultry">Poultry</SelectItem>
                        <SelectItem value="ice">Ice Products</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={isCreating ? newProduct.availability : selectedProduct?.availability || "In Stock"}
                      onValueChange={(value) => {
                        if (isCreating) {
                          setNewProduct({...newProduct, availability: value as any})
                        } else if (selectedProduct) {
                          setSelectedProduct({...selectedProduct, availability: value as any})
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Limited Stock">Limited Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={isCreating ? newProduct.featured : selectedProduct?.featured || false}
                      onCheckedChange={(checked) => {
                        if (isCreating) {
                          setNewProduct({...newProduct, featured: checked})
                        } else if (selectedProduct) {
                          setSelectedProduct({...selectedProduct, featured: checked})
                        }
                      }}
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>

                  <div>
                    <Label htmlFor="content">Description</Label>
                    <Textarea
                      id="content"
                      value={isCreating ? newProduct.content : selectedProduct?.content || ""}
                      onChange={(e) => {
                        if (isCreating) {
                          setNewProduct({...newProduct, content: e.target.value})
                        } else if (selectedProduct) {
                          setSelectedProduct({...selectedProduct, content: e.target.value})
                        }
                      }}
                      placeholder="Enter product description"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {isCreating ? "Create Product" : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setIsCreating(false)
                      setSelectedProduct(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
