"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, ChevronDown, Menu, X, Leaf, Users, Package, MessageCircle, Home, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const isProductsActive = () => {
    return pathname.startsWith("/products")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Users },
    { href: "/locations", label: "Locations", icon: MapPin },
    { href: "/products", label: "Products", icon: Package, hasSubmenu: true },
    { href: "/blog", label: "Blog", icon: MessageCircle },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  const productSubItems = [
    { href: "/products", label: "All Products", emoji: "🌟" },
    { href: "/products/vegetables", label: "Fresh Vegetables", emoji: "🥬" },
    { href: "/products/poultry", label: "Poultry Products", emoji: "🐔" },
    { href: "/products/ice", label: "Ice Products", emoji: "🧊" },
  ]
  return (
    <>
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
              <Image
                src="/fresh-logo.jpeg"
                alt="Agrinema Farm Logo"
                width={45}
                height={45}
                className="h-12 md:h-20 w-auto object-contain my-[-.7rem] rounded-lg"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`font-semibold transition-colors ${
                  isActive("/") ? "text-green-600" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`font-medium transition-colors ${
                  isActive("/about") ? "text-green-600" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                About
              </Link>
              <Link 
                href="/locations" 
                className={`font-medium transition-colors ${
                  isActive("/locations") ? "text-green-600" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Locations
              </Link>
              
              {/* Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`font-medium transition-colors flex items-center space-x-1 ${
                      isProductsActive() ? "text-green-600" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>Products</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {productSubItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="w-full cursor-pointer">
                        {item.emoji} {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link 
                href="/blog" 
                className={`font-medium transition-colors ${
                  isActive("/blog") ? "text-green-600" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className={`font-medium transition-colors ${
                  isActive("/contact") ? "text-green-600" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Contact
              </Link>
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <a href="tel:+27673470687" className="hidden sm:block">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </a>
              
              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <motion.div
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 flex flex-col justify-center items-center"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 5 }
                    }}
                    className="w-6 h-0.5 bg-current transform transition-all origin-center"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="w-6 h-0.5 bg-current transform transition-all mt-1"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -5 }
                    }}
                    className="w-6 h-0.5 bg-current transform transition-all mt-1 origin-center"
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slider Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
            />
            
            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.3 
              }}
              className="fixed top-0 right-0 h-full w-80 bg-background/98 backdrop-blur-xl shadow-2xl z-50 md:hidden border-l border-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/fresh-logo.jpeg"
                    alt="Agrinema Farm"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">Agrinema Farm</h3>
                    <p className="text-xs text-muted-foreground">Fresh & Natural</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="py-6">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isItemActive = isActive(item.href)
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      {item.hasSubmenu ? (
                        <div className="space-y-2">
                          <div className={`flex items-center space-x-4 px-6 py-4 text-lg font-medium transition-colors ${
                            isProductsActive() ? "text-green-600 bg-green-50 dark:bg-green-950/30" : "text-foreground"
                          }`}>
                            <Icon className="h-5 w-5" />
                            <span>Products</span>
                          </div>
                          <div className="pl-6">
                            {productSubItems.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.href}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index + subIndex) * 0.1 + 0.2 }}
                              >
                                <Link
                                  href={subItem.href}
                                  onClick={closeMobileMenu}
                                  className={`flex items-center space-x-4 px-6 py-3 text-base transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                    isActive(subItem.href) ? "text-green-600 bg-green-50 dark:bg-green-950/30" : "text-muted-foreground"
                                  }`}
                                >
                                  <span className="text-lg">{subItem.emoji}</span>
                                  <span>{subItem.label}</span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={`flex items-center space-x-4 px-6 py-4 text-lg font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                            isItemActive ? "text-green-600 bg-green-50 dark:bg-green-950/30" : "text-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-gradient-to-t from-background/95 to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <a href="tel:+27673470687" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us Now
                    </Button>
                  </a>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Fresh from farm to your table
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
