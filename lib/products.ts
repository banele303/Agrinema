import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// Ensure this file only runs on the server
if (typeof window !== 'undefined') {
  throw new Error('This module should only be used on the server side')
}

const productsDirectory = path.join(process.cwd(), 'content/products')

export interface Product {
  slug: string
  title: string
  price: string
  availability: string
  image: string
  category: string
  featured: boolean
  content: string
  contentHtml: string
}

export function getAllProducts(): Product[] {
  const fileNames = fs.readdirSync(productsDirectory)
  const allProductsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(productsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      return {
        slug,
        title: matterResult.data.title || '',
        price: matterResult.data.price || '',
        availability: matterResult.data.availability || 'In Stock',
        image: matterResult.data.image || '',
        category: matterResult.data.category || 'Products',
        featured: matterResult.data.featured || false,
        content: matterResult.content,
        contentHtml: '',
      }
    })

  return allProductsData.sort((a, b) => {
    // Sort featured products first, then by title
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.title.localeCompare(b.title)
  })
}

export async function getProductData(slug: string): Promise<Product | null> {
  const fullPath = path.join(productsDirectory, `${slug}.md`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: matterResult.data.title || '',
      price: matterResult.data.price || '',
      availability: matterResult.data.availability || 'In Stock',
      image: matterResult.data.image || '',
      category: matterResult.data.category || 'Products',
      featured: matterResult.data.featured || false,
      content: matterResult.content,
      contentHtml,
    }
  } catch (error) {
    console.error(`Error reading product ${slug}:`, error)
    return null
  }
}

export function getFeaturedProducts(): Product[] {
  const allProducts = getAllProducts()
  return allProducts.filter(product => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  const allProducts = getAllProducts()
  return allProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  )
}
