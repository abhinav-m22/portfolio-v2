"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroBackground from "@/components/hero-background"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleExploreClick = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <HeroBackground />

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-space"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-primary">Abhinav</span> Mahajan
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl max-w-2xl mb-12 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A software developer with a passion for building innovative solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button size="lg" onClick={handleExploreClick} className="group relative overflow-hidden">
            Explore
            <motion.div
              className="absolute inset-0 bg-primary/20"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            />
            <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <motion.div
            className="w-1 h-1 bg-primary rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
