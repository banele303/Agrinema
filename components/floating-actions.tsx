"use client"

import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActions() {
  const handleCall = () => {
    window.open("tel:+27673470687", "_self")
  }

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/27673470687?text=Hello%20Agrinema%20Farm,%20I%20would%20like%20to%20inquire%20about%20your%20products.",
      "_blank",
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Button
        onClick={handleWhatsApp}
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="sr-only">WhatsApp</span>
      </Button>
      <Button
        onClick={handleCall}
        className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
        size="icon"
      >
        <Phone className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="sr-only">Call Now</span>
      </Button>
    </div>
  )
}
