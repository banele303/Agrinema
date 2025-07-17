import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { timestamp: string } }
) {
  try {
    const timestamp = params.timestamp
    
    if (!timestamp) {
      return NextResponse.json({ error: 'Timestamp required' }, { status: 400 })
    }
    
    const fs = await import('fs')
    const path = await import('path')
    const publicDir = path.join(process.cwd(), 'public')
    const filePath = path.join(publicDir, `image-${timestamp}.json`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }
    
    const imageData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const buffer = Buffer.from(imageData.data, 'base64')
    
    const headers = new Headers()
    headers.set('Content-Type', imageData.mimeType)
    headers.set('Cache-Control', 'public, max-age=31536000')
    headers.set('Content-Length', buffer.length.toString())
    
    return new NextResponse(buffer, { headers })
    
  } catch (error) {
    console.error('Error serving image:', error)
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 })
  }
}
