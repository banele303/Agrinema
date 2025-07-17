import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Order, Location } from '@/types/product'

const ORDERS_FILE = path.join(process.cwd(), 'content/orders.json')
const LOCATIONS_FILE = path.join(process.cwd(), 'content/locations.json')

// Ensure the content directory exists
if (!fs.existsSync(path.dirname(ORDERS_FILE))) {
  fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true })
}

// Initialize orders file if it doesn't exist
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2))
}

export async function GET() {
  try {
    const orders: Order[] = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
    const locations: Location[] = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf8'))
    
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
    const orders: Order[] = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
    
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...body,
      orderDate: new Date().toISOString()
    }
    
    orders.push(newOrder)
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
    
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
    
    const orders: Order[] = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
    const orderIndex = orders.findIndex((order: Order) => order.id === id)
    
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    }
    
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
    
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
    
    const orders: Order[] = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
    const filteredOrders = orders.filter((order: Order) => order.id !== id)
    
    if (orders.length === filteredOrders.length) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(filteredOrders, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}
