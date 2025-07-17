"use client"

import { usePathname } from "next/navigation"
import { FloatingActions } from "./floating-actions"

export function ConditionalFloatingActions() {
  const pathname = usePathname()
  
  // Don't show floating actions on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <FloatingActions />
}
