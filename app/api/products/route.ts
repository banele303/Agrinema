import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Location } from '@/types/product'

const PRODUCTS_DIR = path.join(process.cwd(), 'content/products')
const LOCATIONS_FILE = path.join(process.cwd(), 'content/locations.json')
const ORDERS_FILE = path.join(process.cwd(), 'content/orders.json')

// Ensure directories exist
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true })
}

if (!fs.existsSync(path.dirname(LOCATIONS_FILE))) {
  fs.mkdirSync(path.dirname(LOCATIONS_FILE), { recursive: true })
}

// Initialize default data files if they don't exist
if (!fs.existsSync(LOCATIONS_FILE)) {
  const defaultLocations = [
    {
      id: "agrinema-main",
      name: "Agrinema Main Farm",
      address: "123 Farm Road, Rural District, Eastern Cape",
      coordinates: { lat: -33.0123, lng: 27.4567 },
      manager: "John Makhanya",
      phone: "+27 83 123 4567",
      isActive: true,
      products: 0
    },
    {
      id: "agrinema-north",
      name: "Agrinema North Farm",
      address: "456 Valley View, Northern District, Eastern Cape",
      coordinates: { lat: -32.8901, lng: 27.6789 },
      manager: "Sarah Ndlovu",
      phone: "+27 84 567 8901",
      isActive: true,
      products: 0
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
  fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(defaultLocations, null, 2))
}

if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2))
}

export async function GET() {
  try {
    // Read all markdown files
    const files = fs.readdirSync(PRODUCTS_DIR)
    const mdFiles = files.filter(file => file.endsWith('.md'))
    
    const locations: Location[] = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf8'))
    
    const products = mdFiles.map(file => {
      const filePath = path.join(PRODUCTS_DIR, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data: frontMatter, content } = matter(fileContent)
      
      const location: Location = locations.find((loc: Location) => loc.id === frontMatter.locationId) || locations[0]
      
      return {
        slug: file.replace('.md', ''),
        title: frontMatter.title || 'Untitled Product',
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

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const locations: Location[] = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf8'))
    const location: Location = locations.find((loc: Location) => loc.id === body.locationId) || locations[0]
    
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const filename = `${slug}.md`
    const filePath = path.join(PRODUCTS_DIR, filename)
    
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const fileContent = matter.stringify(body.content || '', frontMatter)
    fs.writeFileSync(filePath, fileContent)
    
    // Update location product count
    location.products = (location.products || 0) + 1
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(locations, null, 2))
    
    const newProduct = {
      slug,
      ...frontMatter,
      content: body.content || '',
      location
    }
    
    return NextResponse.json(newProduct)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, ...updateData } = body
    
    const filePath = path.join(PRODUCTS_DIR, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontMatter, content } = matter(fileContent)
    
    const updatedFrontMatter = {
      ...frontMatter,
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    const newContent = matter.stringify(updateData.content || content, updatedFrontMatter)
    fs.writeFileSync(filePath, newContent)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }
    
    const filePath = path.join(PRODUCTS_DIR, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    // Read product to get location info
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontMatter } = matter(fileContent)
    
    // Delete the file
    fs.unlinkSync(filePath)
    
    // Update location product count
    const locations: Location[] = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf8'))
    const location = locations.find((loc: Location) => loc.id === frontMatter.locationId)
    if (location) {
      location.products = Math.max((location.products || 0) - 1, 0)
      fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(locations, null, 2))
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
