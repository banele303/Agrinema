import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads')

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }
    
    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const filename = `${timestamp}${extension}`
    const filepath = path.join(UPLOAD_DIR, filename)
    
    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    fs.writeFileSync(filepath, buffer)
    
    // Return the public URL
    const publicUrl = `/uploads/${filename}`
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename 
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
