import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const LOCATIONS_FILE = path.join(process.cwd(), 'content/locations.json')

// In-memory storage for serverless environments
let locationsData: any[] | null = null

// Default locations data as fallback
const DEFAULT_LOCATIONS_DATA = [
  {
    id: "tshamutilikwa",
    name: "Tshamutilikwa Farm",
    address: "Next to soccer ground",
    coordinates: { lat: -23.0865, lng: 29.4176 },
    phone: "+27 67 347 0687",
    email: "info@agrinemafarm.co.za",
    products: 15,
    isActive: true
  },
  {
    id: "bunzhe",
    name: "Bunzhe Farm",
    address: "Next to JP Tshikalange Primary School",
    coordinates: { lat: -23.1256, lng: 29.3847 },
    phone: "+27 67 347 0687",
    email: "info@agrinemafarm.co.za",
    products: 12,
    isActive: true
  },
  {
    id: "xigalo",
    name: "Xigalo Farm",
    address: "Next to Cheapside and Balow Lodge",
    coordinates: { lat: -23.0945, lng: 29.4523 },
    phone: "+27 67 347 0687",
    email: "info@agrinemafarm.co.za",
    products: 18,
    isActive: true
  },
  {
    id: "makasa",
    name: "Makasa Farm",
    address: "Makasa Village",
    coordinates: { lat: -23.1134, lng: 29.4098 },
    phone: "+27 67 347 0687",
    email: "info@agrinemafarm.co.za",
    products: 14,
    isActive: true
  },
  {
    id: "tshivhulani",
    name: "Tshivhulani Farm",
    address: "Next to Cabal Villa",
    coordinates: { lat: -23.0723, lng: 29.4312 },
    phone: "+27 67 347 0687",
    email: "info@agrinemafarm.co.za",
    products: 16,
    isActive: true
  },
  {
    id: "vhudimbilu",
    name: "Vhudimbilu Farm",
    address: "Vhudimbilu Village",
    coordinates: { lat: -23.1445, lng: 29.3765 },
    phone: "+27 67 347 0687",
    email: "info@agrinemafarm.co.za",
    products: 13,
    isActive: true
  }
]

function loadLocations(): any[] {
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
    console.log('File system not available, using in-memory storage')
  }

  // Fallback to default data
  locationsData = [...DEFAULT_LOCATIONS_DATA]
  return locationsData
}

function saveLocations(locations: any[]) {
  // Update in-memory storage
  locationsData = locations

  try {
    // Try to save to file system (works in development)
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(locations, null, 2))
  } catch (error) {
    console.log('File system not available, data saved in memory only')
  }
}

export async function GET() {
  try {
    const locations = loadLocations()
    return NextResponse.json(locations)
  } catch (error) {
    console.error('Error reading locations:', error)
    return NextResponse.json({ error: 'Failed to read locations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const locations = loadLocations()
    
    const newLocation = {
      id: body.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      ...body,
      products: 0,
      isActive: true
    }
    
    locations.push(newLocation)
    saveLocations(locations)
    
    return NextResponse.json(newLocation)
  } catch (error) {
    console.error('Error creating location:', error)
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const locations = loadLocations()
    
    const locationIndex = locations.findIndex(loc => loc.id === body.id)
    if (locationIndex === -1) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 })
    }
    
    locations[locationIndex] = { ...locations[locationIndex], ...body }
    saveLocations(locations)
    
    return NextResponse.json(locations[locationIndex])
  } catch (error) {
    console.error('Error updating location:', error)
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Location ID is required' }, { status: 400 })
    }
    
    const locations = loadLocations()
    const locationIndex = locations.findIndex(loc => loc.id === id)
    
    if (locationIndex === -1) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 })
    }
    
    const deletedLocation = locations.splice(locationIndex, 1)[0]
    saveLocations(locations)
    
    return NextResponse.json(deletedLocation)
  } catch (error) {
    console.error('Error deleting location:', error)
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 })
  }
}
