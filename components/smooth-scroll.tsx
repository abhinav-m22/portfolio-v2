"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Lenis from "@studio-freight/lenis"

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    function onHashLinkClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href?.startsWith("#")) return

      e.preventDefault()

      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement && lenisRef.current) {
        lenisRef.current.scrollTo(targetElement, {
          offset: -100,
          duration: 1.5,
        })
      }
    }

    document.addEventListener("click", onHashLinkClick)

    return () => {
      document.removeEventListener("click", onHashLinkClick)
    }
  }, [])

  return <>{children}</>
}
