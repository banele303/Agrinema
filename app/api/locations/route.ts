import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const LOCATIONS_FILE = path.join(process.cwd(), 'content/locations.json')

export async function GET() {
  try {
    if (!fs.existsSync(LOCATIONS_FILE)) {
      return NextResponse.json([])
    }
    
    const locations = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf8'))
    return NextResponse.json(locations)
  } catch (error) {
    console.error('Error reading locations:', error)
    return NextResponse.json({ error: 'Failed to read locations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const locations = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf8'))
    
    const newLocation = {
      id: body.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      ...body,
      products: 0,
      isActive: true
    }
    
    locations.push(newLocation)
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(locations, null, 2))
    
    return NextResponse.json(newLocation)
  } catch (error) {
    console.error('Error creating location:', error)
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 })
  }
}
