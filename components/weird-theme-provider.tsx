'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { generateColorPalette } from '@/lib/color-utils'

export function WeirdThemeProvider() {
  const { theme } = useTheme()
  const [colorPalette, setColorPalette] = useState(generateColorPalette())

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'weird') {
      // Generate new colors when switching to weird theme
      const newPalette = generateColorPalette()
      setColorPalette(newPalette)

      // Apply the colors to CSS variables
      Object.entries(newPalette).forEach(([key, value]) => {
        // Convert camelCase to kebab-case for CSS variables
        const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        root.style.setProperty(`--${cssVarName}`, value)
      })
    } else {
      // Remove all custom CSS variables when switching away from weird theme
      Object.keys(colorPalette).forEach(key => {
        const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        root.style.removeProperty(`--${cssVarName}`)
      })
    }

    // Cleanup function
    return () => {
      if (theme === 'weird') {
        Object.keys(colorPalette).forEach(key => {
          const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
          root.style.removeProperty(`--${cssVarName}`)
        })
      }
    }
  }, [theme])

  return null
} 