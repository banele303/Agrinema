import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Order, Location } from '@/types/product'

const ORDERS_FILE = path.join(process.cwd(), 'content/orders.json')
const LOCATIONS_FILE = path.join(process.cwd(), 'content/locations.json')

// In-memory storage for serverless environments
let ordersData: Order[] | null = null
let locationsData: Location[] | null = null

// Default orders data as fallback
const DEFAULT_ORDERS_DATA: Order[] = [
  {
    id: "ORD-2024-001",
    productId: "1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+27 83 123 4567",
    quantity: 5,
    totalAmount: 125.00,
    status: "pending",
    locationId: "tshamutilikwa",
    location: {
      id: "tshamutilikwa",
      name: "Tshamutilikwa Farm",
      address: "Next to soccer ground",
      coordinates: { lat: -23.0865, lng: 29.4176 },
      
      phone: "067 347 0687",
      products: 15,
      isActive: true
    },
    orderDate: "2024-01-15T10:30:00.000Z",
    deliveryDate: "2024-01-16T14:00:00.000Z"
  },
  {
    id: "ORD-2024-002",
    productId: "2",
    customerName: "Sarah Smith",
    customerEmail: "sarah@example.com",
    customerPhone: "+27 84 987 6543",
    quantity: 3,
    totalAmount: 75.00,
    status: "completed",
    locationId: "bunzhe",
    location: {
      id: "bunzhe",
      name: "Bunzhe Farm",
      address: "Next to JP Tshikalange Primary School",
      coordinates: { lat: -23.1256, lng: 29.3847 },
     
      phone: "068 801 1545",
      products: 12,
      isActive: true
    },
    orderDate: "2024-01-14T09:15:00.000Z",
    deliveryDate: "2024-01-15T16:30:00.000Z"
  }
]

// Default locations data for reference
const DEFAULT_LOCATIONS_DATA: Location[] = [
  {
    id: "tshamutilikwa",
    name: "Tshamutilikwa Farm",
    address: "Next to soccer ground",
    coordinates: { lat: -23.0865, lng: 29.4176 },
   
    phone: "067 347 0687",
    products: 15,
    isActive: true
  },
  {
    id: "bunzhe",
    name: "Bunzhe Farm",
    address: "Next to JP Tshikalange Primary School",
    coordinates: { lat: -23.1256, lng: 29.3847 },
    
    phone: "068 801 1545",
    products: 12,
    isActive: true
  },
  {
    id: "xigalo",
    name: "Xigalo Farm",
    address: "Next to Cheapside and Balow Lodge",
    coordinates: { lat: -23.0945, lng: 29.4523 },
   
    phone: "067 347 0687",
    products: 18,
    isActive: true
  },
  {
    id: "makasa",
    name: "Makasa Farm",
    address: "Makasa Village",
    coordinates: { lat: -23.1134, lng: 29.4098 },
    
    phone: "068 801 1545",
    products: 14,
    isActive: true
  },
  {
    id: "tshivhulani",
    name: "Tshivhulani Farm",
    address: "Next to Cabal Villa",
    coordinates: { lat: -23.0723, lng: 29.4312 },
   
    phone: "067 347 0687",
    products: 16,
    isActive: true
  },
  {
    id: "vhudimbilu",
    name: "Vhudimbilu Farm",
    address: "Vhudimbilu Village",
    coordinates: { lat: -23.1445, lng: 29.3765 },
   
    phone: "068 801 1545",
    products: 13,
    isActive: true
  }
]

function loadOrders(): Order[] {
  // If we already have data in memory, return it
  if (ordersData !== null) {
    return ordersData
  }

  try {
    // Try to read from file system (works in development)
    if (fs.existsSync(ORDERS_FILE)) {
      const fileContent = fs.readFileSync(ORDERS_FILE, 'utf8')
      ordersData = JSON.parse(fileContent)
      return ordersData!
    }
  } catch (error) {
    console.log('File system not available, using in-memory storage for orders')
  }

  // Fallback to default data
  ordersData = [...DEFAULT_ORDERS_DATA]
  return ordersData
}

function loadLocations(): Location[] {
  // If we already have data in memory, return it
  if (locationsData !== null) {
    return locationsData
  }

  try {
    // Try to read from file system (works in development)
    if (fs.existsSync(LOCATIONS_FILE)) {
      const fileContent = fs.readFileSync(LOCATIONS_FILE, 'utf8')
      locationsData = JSON.parse(fileContent)
      return locationsData!
    }
  } catch (error) {
    console.log('File system not available, using in-memory storage for locations')
  }

  // Fallback to default data
  locationsData = [...DEFAULT_LOCATIONS_DATA]
  return locationsData
}

function saveOrders(orders: Order[]) {
  // Update in-memory storage
  ordersData = orders

  try {
    // Try to save to file system (works in development)
    // Ensure the content directory exists
    if (!fs.existsSync(path.dirname(ORDERS_FILE))) {
      fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true })
    }
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
  } catch (error) {
    console.log('File system not available, data saved in memory only')
  }
}

export async function GET() {
  try {
    const orders = loadOrders()
    const locations = loadLocations()
    
    // Populate location data for each order
    const ordersWithLocations = orders.map((order: Order) => ({
      ...order,
      location: locations.find((loc: Location) => loc.id === order.locationId) || locations[0]
    }))
    
    return NextResponse.json(ordersWithLocations)
  } catch (error) {
    console.error('Error reading orders:', error)
    return NextResponse.json({ error: 'Failed to read orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const orders = loadOrders()
    const locations = loadLocations()
    
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...body,
      orderDate: new Date().toISOString(),
      location: locations.find((loc: Location) => loc.id === body.locationId) || locations[0]
    }
    
    orders.push(newOrder)
    saveOrders(orders)
    
    return NextResponse.json(newOrder)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    const orders = loadOrders()
    const locations = loadLocations()
    const orderIndex = orders.findIndex((order: Order) => order.id === id)
    
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
      location: locations.find((loc: Location) => loc.id === updateData.locationId || orders[orderIndex].locationId) || locations[0]
    }
    
    saveOrders(orders)
    
    return NextResponse.json(orders[orderIndex])
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }
    
    const orders = loadOrders()
    const orderIndex = orders.findIndex((order: Order) => order.id === id)
    
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    const deletedOrder = orders.splice(orderIndex, 1)[0]
    saveOrders(orders)
    
    return NextResponse.json(deletedOrder)
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}
