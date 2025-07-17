import { NextRequest, NextResponse } from 'next/server'

// Configure the route for file uploads
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// For development and production compatibility
const uploadToLocal = async (file: File): Promise<string> => {
  const fs = await import('fs')
  const path = await import('path')
  
  const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
  
  // Ensure upload directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true })
  }
  
  const timestamp = Date.now()
  const extension = path.extname(file.name)
  const filename = `${timestamp}${extension}`
  const filepath = path.join(UPLOAD_DIR, filename)
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  fs.writeFileSync(filepath, buffer)
  
  return `/uploads/${filename}`
}

// Fallback to base64 data URLs for Vercel if local storage fails
const uploadToDataURL = async (file: File): Promise<string> => {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const base64 = buffer.toString('base64')
  const mimeType = file.type || 'image/jpeg'
  
  // For small files, return data URL
  if (buffer.length < 1024 * 1024) { // 1MB limit for data URLs
    return `data:${mimeType};base64,${base64}`
  }
  
  // For larger files, save to a JSON file in public directory
  const timestamp = Date.now()
  const filename = `image-${timestamp}.json`
  
  try {
    const fs = await import('fs')
    const path = await import('path')
    const publicDir = path.join(process.cwd(), 'public')
    const filePath = path.join(publicDir, filename)
    
    const imageData = {
      data: base64,
      mimeType: mimeType,
      originalName: file.name,
      size: file.size,
      timestamp: timestamp
    }
    
    fs.writeFileSync(filePath, JSON.stringify(imageData))
    return `/api/image/${timestamp}` // Custom endpoint to serve the image
  } catch (error) {
    console.log('Falling back to data URL for large file')
    return `data:${mimeType};base64,${base64}`
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    
    const formData = await request.formData()
    console.log('FormData received')
    
    const file = formData.get('file') as File
    
    if (!file) {
      console.log('No file provided in FormData')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    })
    
    // Validate file type - check both MIME type and extension
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    
    const fileExtension = file.name.toLowerCase().split('.').pop() || ''
    const extensionWithDot = `.${fileExtension}`
    
    if (!allowedMimeTypes.includes(file.type) && !allowedExtensions.includes(extensionWithDot)) {
      console.log('Invalid file type or extension:', file.type, extensionWithDot)
      return NextResponse.json({ 
        error: `Invalid file type: ${file.type}. Allowed types: ${allowedMimeTypes.join(', ')}` 
      }, { status: 400 })
    }
    
    // Validate file size (5MB limit for Vercel)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.log('File too large:', file.size)
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 5MB for deployment compatibility' 
      }, { status: 400 })
    }
    
    let publicUrl: string
    
    try {
      // Try local upload first (works in development and some hosting)
      publicUrl = await uploadToLocal(file)
      console.log('Local upload successful:', publicUrl)
    } catch (localError) {
      console.log('Local upload failed, trying fallback method:', localError)
      
      try {
        // Fallback to data URL method
        publicUrl = await uploadToDataURL(file)
        console.log('Fallback upload successful:', publicUrl.substring(0, 50) + '...')
      } catch (fallbackError) {
        console.error('All upload methods failed:', fallbackError)
        return NextResponse.json({ 
          error: 'Failed to upload file',
          details: fallbackError instanceof Error ? fallbackError.message : 'Unknown error'
        }, { status: 500 })
      }
    }
    
    console.log('Upload successful, returning URL')
    return NextResponse.json({ 
      success: true, 
      url: publicUrl
    })
    
  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
