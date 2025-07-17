import { NextRequest, NextResponse } from 'next/server'
import { Location } from '@/types/product'

// For Vercel compatibility - use in-memory storage
const isDevelopment = process.env.NODE_ENV === 'development'

// In-memory data storage (works on Vercel)
let PRODUCTS_DATA: any[] = [
  {
    slug: "fresh-organic-tomatoes",
    title: "Fresh Organic Tomatoes",
    category: "vegetables",
    price: "R 45.00 per kg",
    availability: "In Stock",
    featured: true,
    image: "/tomato-hero.jpg",
    content: "Premium organic tomatoes grown in our state-of-the-art greenhouses. These juicy, vine-ripened tomatoes are perfect for salads, cooking, and preserving.",
    location: { id: "agrinema-main", name: "Agrinema Main Farm" },
    stock: 150,
    orders: 23,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-07-17T10:30:00Z"
  },
  {
    slug: "free-range-farm-eggs",
    title: "Free Range Farm Eggs",
    category: "poultry", 
    price: "R 65.00 per dozen",
    availability: "In Stock",
    featured: true,
    image: "/IMG_6092.jpg",
    content: "Fresh free-range eggs from our happy, healthy chickens. Our hens roam freely in spacious pastures, producing eggs with rich, golden yolks.",
    location: { id: "agrinema-north", name: "Agrinema North Farm" },
    stock: 80,
    orders: 34,
    createdAt: "2024-02-10T07:30:00Z",
    updatedAt: "2024-07-17T10:30:00Z"
  },
  {
    slug: "premium-ice-blocks",
    title: "Premium Ice Blocks",
    category: "ice",
    price: "R 15.00 per block",
    availability: "In Stock", 
    featured: true,
    image: "/iceblock3.jpg",
    content: "Crystal clear premium ice blocks perfect for keeping your products fresh and beverages cold.",
    location: { id: "agrinema-main", name: "Agrinema Main Farm" },
    stock: 200,
    orders: 45,
    createdAt: "2024-06-01T06:00:00Z",
    updatedAt: "2024-07-17T10:30:00Z"
  }
]

let LOCATIONS_DATA: Location[] = [
  {
    id: "agrinema-main",
    name: "Agrinema Main Farm",
    address: "123 Farm Road, Rural District, Eastern Cape",
    coordinates: { lat: -33.0123, lng: 27.4567 },
    manager: "John Makhanya",
    phone: "+27 83 123 4567",
    isActive: true,
    products: 2
  },
  {
    id: "agrinema-north",
    name: "Agrinema North Farm",
    address: "456 Valley View, Northern District, Eastern Cape",
    coordinates: { lat: -32.8901, lng: 27.6789 },
    manager: "Sarah Ndlovu",
    phone: "+27 84 567 8901",
    isActive: true,
    products: 1
  },
  {
    id: "agrinema-coastal",
    name: "Agrinema Coastal Farm",
    address: "789 Coastal Road, Port Elizabeth, Eastern Cape",
    coordinates: { lat: -33.9608, lng: 25.6022 },
    manager: "David Thompson",
    phone: "+27 82 345 6789",
    isActive: true,
    products: 0
  }
]

// Load products from file system (development) or memory (production)
const loadProducts = async () => {
  if (isDevelopment) {
    try {
      const fs = await import('fs')
      const path = await import('path')
      const matter = await import('gray-matter')
      
      const PRODUCTS_DIR = path.join(process.cwd(), 'content/products')
      const LOCATIONS_FILE = path.join(process.cwd(), 'content/locations.json')
      
      if (!fs.existsSync(PRODUCTS_DIR)) {
        return PRODUCTS_DATA // Return default data if directory doesn't exist
      }
      
      if (fs.existsSync(LOCATIONS_FILE)) {
        const locationsData = fs.readFileSync(LOCATIONS_FILE, 'utf8')
        LOCATIONS_DATA = JSON.parse(locationsData)
      }
      
      const files = fs.readdirSync(PRODUCTS_DIR)
      const products = files
        .filter((file: string) => file.endsWith('.md'))
        .map((file: string) => {
          const slug = file.replace('.md', '')
          const filePath = path.join(PRODUCTS_DIR, file)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { data: frontMatter, content } = matter.default(fileContent)
          
          const location = LOCATIONS_DATA.find(loc => loc.id === frontMatter.locationId) || LOCATIONS_DATA[0]
          
          return {
            slug,
            title: frontMatter.title || 'Untitled',
            category: frontMatter.category || 'other',
            price: frontMatter.price || 'Price on request',
            availability: frontMatter.availability || 'In Stock',
            featured: frontMatter.featured || false,
            image: frontMatter.image || '/placeholder.jpg',
            content: content,
            location: location,
            stock: frontMatter.stock || 0,
            orders: frontMatter.orders || 0,
            createdAt: frontMatter.createdAt || new Date().toISOString(),
            updatedAt: frontMatter.updatedAt || new Date().toISOString()
          }
        })
      
      PRODUCTS_DATA = products
      return products
    } catch (error) {
      console.error('Error loading products from files:', error)
      return PRODUCTS_DATA
    }
  } else {
    // Production - return in-memory data
    return PRODUCTS_DATA
  }
}

export async function GET() {
  try {
    const products = await loadProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Creating product:', body)
    
    const location: Location = LOCATIONS_DATA.find((loc: Location) => loc.id === body.locationId) || LOCATIONS_DATA[0]
    
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    
    const newProduct = {
      slug,
      title: body.title,
      category: body.category,
      price: body.price,
      availability: body.availability,
      featured: body.featured,
      image: body.image,
      content: body.content || '',
      location,
      stock: body.stock,
      orders: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Add to in-memory storage
    PRODUCTS_DATA.push(newProduct)
    
    // Update location product count
    location.products = (location.products || 0) + 1
    
    // Try to save to file system in development
    if (isDevelopment) {
      try {
        const fs = await import('fs')
        const path = await import('path')
        const matter = await import('gray-matter')
        
        const PRODUCTS_DIR = path.join(process.cwd(), 'content/products')
        const LOCATIONS_FILE = path.join(process.cwd(), 'content/locations.json')
        
        if (!fs.existsSync(PRODUCTS_DIR)) {
          fs.mkdirSync(PRODUCTS_DIR, { recursive: true })
        }
        
        const frontMatter = {
          title: body.title,
          category: body.category,
          price: body.price,
          availability: body.availability,
          featured: body.featured,
          image: body.image,
          locationId: location.id,
          stock: body.stock,
          orders: 0,
          createdAt: newProduct.createdAt,
          updatedAt: newProduct.updatedAt
        }
        
        const fileContent = matter.default.stringify(body.content || '', frontMatter)
        const filename = `${slug}.md`
        const filePath = path.join(PRODUCTS_DIR, filename)
        fs.writeFileSync(filePath, fileContent)
        
        // Update locations file
        fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(LOCATIONS_DATA, null, 2))
        
        console.log('Product saved to file system')
      } catch (fileError) {
        console.log('Could not save to file system (expected in production):', fileError)
      }
    }
    
    console.log('Product created successfully:', newProduct)
    return NextResponse.json(newProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ 
      error: 'Failed to create product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const updateData = await request.json()
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }
    
    // Find and update product in memory
    const productIndex = PRODUCTS_DATA.findIndex(p => p.slug === slug)
    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    PRODUCTS_DATA[productIndex] = {
      ...PRODUCTS_DATA[productIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    // Try to update file system in development
    if (isDevelopment) {
      try {
        const fs = await import('fs')
        const path = await import('path')
        const matter = await import('gray-matter')
        
        const PRODUCTS_DIR = path.join(process.cwd(), 'content/products')
        const filePath = path.join(PRODUCTS_DIR, `${slug}.md`)
        
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { data: frontMatter, content } = matter.default(fileContent)
          
          const updatedFrontMatter = {
            ...frontMatter,
            ...updateData,
            updatedAt: new Date().toISOString()
          }
          
          const newContent = matter.default.stringify(updateData.content || content, updatedFrontMatter)
          fs.writeFileSync(filePath, newContent)
        }
      } catch (fileError) {
        console.log('Could not update file system (expected in production):', fileError)
      }
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    console.log('DELETE request received')
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    console.log('Attempting to delete product with slug:', slug)
    
    if (!slug) {
      console.log('DELETE error: No slug provided')
      return NextResponse.json({ error: 'Product slug is required' }, { status: 400 })
    }
    
    // Find product in memory
    const productIndex = PRODUCTS_DATA.findIndex(p => p.slug === slug)
    if (productIndex === -1) {
      console.log('DELETE error: Product not found in memory:', slug)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    const product = PRODUCTS_DATA[productIndex]
    const locationId = product.location?.id
    
    // Remove from memory
    PRODUCTS_DATA.splice(productIndex, 1)
    console.log('Product removed from memory')
    
    // Update location product count
    if (locationId) {
      const location = LOCATIONS_DATA.find(loc => loc.id === locationId)
      if (location && location.products > 0) {
        location.products = Math.max(location.products - 1, 0)
        console.log('Updated location product count for:', locationId)
      }
    }
    
    // Try to delete from file system in development
    if (isDevelopment) {
      try {
        const fs = await import('fs')
        const path = await import('path')
        
        const PRODUCTS_DIR = path.join(process.cwd(), 'content/products')
        const LOCATIONS_FILE = path.join(process.cwd(), 'content/locations.json')
        const filePath = path.join(PRODUCTS_DIR, `${slug}.md`)
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
          console.log('Successfully deleted product file:', filePath)
        }
        
        // Update locations file
        if (fs.existsSync(LOCATIONS_FILE)) {
          fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(LOCATIONS_DATA, null, 2))
          console.log('Updated locations file')
        }
      } catch (fileError) {
        console.log('Could not delete from file system (expected in production):', fileError)
      }
    }
    
    console.log('Product deletion completed successfully')
    return NextResponse.json({ message: 'Product deleted successfully', success: true })
    
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}


