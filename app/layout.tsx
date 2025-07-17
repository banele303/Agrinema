import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FloatingActions } from "@/components/floating-actions"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agrinema Farm - Fresh Vegetables, Poultry & Ice Products | Limpopo, South Africa",
  description:
    "Premium fresh vegetables, quality poultry, and ice products from Agrinema Farm. Committed to food security and sustainable agriculture in Limpopo Province, South Africa.",
  keywords:
    "Agrinema Farm, fresh vegetables, poultry, ice products, Limpopo, South Africa, sustainable farming, food security",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  )
}
