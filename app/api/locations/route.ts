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
    isActive: true,
    productAvailability: [
      {
        name: "Hubbard Green Squash",
        status: "upcoming",
        availableDate: "25th of September 2025",
        category: "vegetables",
        details: {
          area: "1444m² (3.5 Ha)",
          description: "Premium quality Hubbard Green Squash"
        }
      }
    ]
  },
  {
    id: "bunzhe",
    name: "Bunzhe Farm",
    address: "Next to JP Tshikalange Primary School",
    coordinates: { lat: -23.1256, lng: 29.3847 },
    phone: "+27 67 347 0687",
    email: "info@agrinemafarm.co.za",
    products: 12,
    isActive: true,
    productAvailability: [
      {
        name: "4 weeks Broiler Chicken (Live)",
        status: "available",
        availableDate: "Available Now",
        category: "poultry",
        details: {
          production: "1000 weekly intake",
          pricing: [
            { range: "Regular price", price: "R70 each" },
            { range: "100+ chickens", price: "R65 each" }
          ],
          description: "Live 4 weeks broiler chickens with volume pricing"
        }
      },
      {
        name: "4 weeks Broiler Chicken (Slaughtered)",
        status: "available",
        availableDate: "Available Now",
        category: "poultry",
        details: {
          production: "1000 weekly intake",
          pricing: [
            { range: "Without offals", price: "R60 each" },
            { range: "100+ chickens", price: "R50 each" }
          ],
          description: "Slaughtered 4 weeks broiler chickens without offals"
        }
      },
      {
        name: "6 weeks Broiler Chicken (Live)",
        status: "available",
        availableDate: "Available Now",
        category: "poultry",
        details: {
          pricing: [
            { range: "Live chicken", price: "R110 each" }
          ],
          description: "6 weeks broiler chickens - live"
        }
      },
      {
        name: "6 weeks Broiler Chicken (Slaughtered)",
        status: "available",
        availableDate: "Available Now",
        category: "poultry",
        details: {
          pricing: [
            { range: "With offals", price: "R120 each" }
          ],
          description: "6 weeks broiler chickens slaughtered with offals"
        }
      }
    ]
  },
  {
    id: "xigalo",
    name: "Xigalo Farm",
    address: "Next to Cheapside and Balow Lodge",
    coordinates: { lat: -23.0945, lng: 29.4523 },
    phone: "+27 67 347 0687",
    email: "info@agrinemafarm.co.za",
    products: 18,
    isActive: true,
    productAvailability: [
      {
        name: "Okra",
        status: "available",
        availableDate: "Available Now",
        category: "vegetables",
        details: {
          area: "9917m²",
          production: "±100 Crates a month",
          price: "R200 per crate",
          description: "Fresh okra currently selling"
        }
      },
      {
        name: "Potatoes",
        status: "upcoming",
        availableDate: "25th of July 2025",
        category: "vegetables",
        details: {
          area: "3252m²",
          plants: "4000 plants",
          description: "Quality potatoes ready for harvest"
        }
      },
      {
        name: "Spinach",
        status: "upcoming",
        availableDate: "15th of August 2025",
        category: "vegetables",
        details: {
          area: "5151m²",
          plants: "12000 plants",
          description: "Fresh spinach leaves"
        }
      },
      {
        name: "Onions",
        status: "upcoming",
        availableDate: "15th of September 2025",
        category: "vegetables",
        details: {
          area: "2570m²",
          plants: "25000 plants",
          description: "Premium quality onions"
        }
      },
      {
        name: "Tomatoes",
        status: "upcoming",
        availableDate: "25th of August 2025",
        category: "vegetables",
        details: {
          area: "953m²",
          plants: "950 plants",
          description: "Fresh red tomatoes"
        }
      }
    ]
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
    isActive: true,
    productAvailability: [
      {
        name: "Ice Cubes",
        status: "available",
        availableDate: "Available Now",
        category: "ice",
        details: {
          stock: "4213 bags",
          pricing: [
            { range: "1-50 bags", price: "R17 each" },
            { range: "50-100 bags", price: "R12 each" },
            { range: "100+ bags", price: "R10 each" }
          ],
          description: "Premium quality ice cubes with volume pricing"
        }
      },
      {
        name: "Ice Blocks",
        status: "available",
        availableDate: "Available Now",
        category: "ice",
        details: {
          stock: "84 bags (4kg blocks)",
          pricing: [
            { range: "1-50 bags", price: "R20 each" },
            { range: "50+ bags", price: "R15 each" }
          ],
          description: "4kg ice blocks with volume pricing"
        }
      },
      {
        name: "Butternut Squash",
        status: "upcoming",
        availableDate: "15th of September 2025",
        category: "vegetables",
        details: {
          area: "200m²",
          plants: "1500 plants",
          description: "Quality butternut squash"
        }
      }
    ]
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
