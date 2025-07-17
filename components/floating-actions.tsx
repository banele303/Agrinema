"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={handleWhatsApp}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group p-0"
          size="icon"
        >
          <Image
            src="/icons8-whatsapp-50.png"
            alt="WhatsApp"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-200"
          />
          <span className="sr-only">WhatsApp</span>
        </Button>
      </motion.div>
      
      {/* Call Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={handleCall}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 group"
          size="icon"
        >
          <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform duration-200" />
          <span className="sr-only">Call Now</span>
        </Button>
      </motion.div>
    </div>
  )
}
