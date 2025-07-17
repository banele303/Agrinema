"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Phone, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const isProductsActive = () => {
    return pathname.startsWith("/products")
  }
  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/fresh-logo.jpeg"
              alt="Agrinema Farm Logo"
              width={45}
              height={45}
              className="h-12 md:h-20 w-auto object-contain my-[-.7rem] rounded-lg"
            />
          </Link>
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
                <DropdownMenuItem asChild>
                  <Link href="/products" className="w-full cursor-pointer">
                    All Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/vegetables" className="w-full cursor-pointer">
                    🥬 Fresh Vegetables
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/poultry" className="w-full cursor-pointer">
                    🐔 Poultry Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/ice" className="w-full cursor-pointer">
                    🧊 Ice Products
                  </Link>
                </DropdownMenuItem>
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
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <a href="tel:+27673470687">
              <Button className="bg-green-600 hover:bg-green-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
