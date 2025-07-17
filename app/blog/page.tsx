"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Phone,
  Search,
  Calendar,
  User,
  ArrowRight,
  Leaf,
  Sprout,
  Droplets,
  Sun,
  Bug,
  Tractor,
  TrendingUp,
  BookOpen,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Navbar } from "@/components/navbar"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    title: "Sustainable Farming Practices for South African Agriculture",
    excerpt:
      "Discover how sustainable farming methods can improve crop yields while protecting the environment. Learn about water conservation, soil health, and integrated pest management.",
    author: "Agrinema Farm Team",
    date: "2024-01-15",
    category: "Sustainability",
    readTime: "5 min read",
    image: "/plant6.jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Maximizing Tomato Yields in Limpopo&apos;s Climate",
    excerpt:
      "Expert tips for growing healthy, productive tomato plants in South Africa&apos;s unique climate conditions. From soil preparation to harvest timing.",
    author: "Agricultural Specialist",
    date: "2024-01-10",
    category: "Crop Management",
    readTime: "7 min read",
    image: "/tomato-hero.jpg",
  },
  {
    id: 3,
    title: "The Importance of Food Security in Rural Communities",
    excerpt:
      "Understanding how local farms contribute to food security and economic development in rural South African communities.",
    author: "Community Development Team",
    date: "2024-01-05",
    category: "Food Security",
    readTime: "6 min read",
    image: "/fresh1.jpeg",
  },
  {
    id: 4,
    title: "Broiler Chicken Management: Best Practices for Quality",
    excerpt:
      "Comprehensive guide to raising healthy broiler chickens, including nutrition, housing, health management, and biosecurity protocols.",
    author: "Poultry Specialist",
    date: "2023-12-28",
    category: "Poultry",
    readTime: "8 min read",
    image: "/poultry1.jpg",
  },
  {
    id: 5,
    title: "Water Conservation Techniques for Vegetable Farming",
    excerpt:
      "Innovative irrigation methods and water-saving strategies that help farmers reduce costs while maintaining crop quality.",
    author: "Irrigation Expert",
    date: "2023-12-20",
    category: "Water Management",
    readTime: "5 min read",
    image: "/plant7.jpeg",
  },
  {
    id: 6,
    title: "Seasonal Planting Guide for Limpopo Province",
    excerpt:
      "When to plant different vegetables in Limpopo for optimal yields. A comprehensive seasonal calendar for local farmers.",
    author: "Agricultural Advisor",
    date: "2023-12-15",
    category: "Planting Guide",
    readTime: "10 min read",
    image: "/plant5.jpeg",
  },
]

const categories = [
  "All",
  "Sustainability",
  "Crop Management",
  "Food Security",
  "Poultry",
  "Water Management",
  "Planting Guide",
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/27673470687" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:shadow-green-500/50 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/vegetable.jpeg"
            alt="Agrinema Farm blog - Agricultural insights and farming knowledge"
            fill
            className="object-cover opacity-20 dark:opacity-10"
            priority
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 text-lg">
              Knowledge Hub
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Agrinema Farm <span className="text-green-600">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Insights, tips, and knowledge from our agricultural experts. Stay updated with the latest in sustainable
              farming, crop management, and food security.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <Badge className="mb-4 bg-green-600 text-white">Featured Article</Badge>
                <h2 className="text-3xl font-bold text-foreground">Editor&apos;s Pick</h2>
              </div>

              <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary">{featuredPost.category}</Badge>
                      <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{featuredPost.title}</h3>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                        <Calendar className="h-4 w-4 ml-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <Button variant="outline" className="group bg-transparent">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {searchTerm
                  ? `Search Results for "${searchTerm}"`
                  : selectedCategory === "All"
                    ? "Latest Articles"
                    : `${selectedCategory} Articles`}
              </h2>
              <p className="text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="border-border overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-foreground group-hover:text-green-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span className="text-xs">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 group">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse different categories.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                >
                  View All Articles
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-green-900 dark:bg-green-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Stay Updated with Agricultural Insights</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest farming tips, industry news, and product updates delivered
              to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input placeholder="Enter your email" className="bg-white text-gray-900 border-white" />
              <Button className="bg-white text-green-900 hover:bg-green-50">Subscribe</Button>
            </div>
            <p className="text-sm text-green-200 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Topics We Cover
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">Explore Our Content Categories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From sustainable farming practices to market insights, we cover everything you need to know about modern
                agriculture
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Sprout,
                  title: "Sustainable Farming",
                  description: "Eco-friendly practices that protect the environment while maximizing yields",
                  count: "12 articles",
                },
                {
                  icon: Tractor,
                  title: "Crop Management",
                  description: "Expert techniques for growing healthy, productive crops in South African conditions",
                  count: "18 articles",
                },
                {
                  icon: Droplets,
                  title: "Water Management",
                  description: "Irrigation strategies and water conservation methods for efficient farming",
                  count: "8 articles",
                },
                {
                  icon: Bug,
                  title: "Pest Control",
                  description: "Integrated pest management solutions that minimize chemical usage",
                  count: "10 articles",
                },
                {
                  icon: TrendingUp,
                  title: "Market Insights",
                  description: "Agricultural market trends, pricing, and business development strategies",
                  count: "15 articles",
                },
                {
                  icon: Sun,
                  title: "Seasonal Guides",
                  description: "Planting calendars and seasonal farming advice for optimal results",
                  count: "6 articles",
                },
              ].map((category, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                      <category.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-foreground">{category.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
