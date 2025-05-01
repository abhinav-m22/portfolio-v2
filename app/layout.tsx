import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WeirdThemeProvider } from "@/components/weird-theme-provider"
import CustomCursor from "@/components/custom-cursor"
import Navigation from "@/components/navigation"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

export const metadata: Metadata = {
  title: "Abhinav Mahajan",
  description: "A highly interactive, visually captivating personal portfolio",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" }
    ],
    apple: { url: "/favicon.png" }
  },
  openGraph: {
    title: "Abhinav's Portfolio",
    description: "Interactive & visually captivating personal portfolio",
    url: "https://abhinav-mahajan.vercel.app",
    siteName: "Abhinav Mahajan",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/ceeff8e2-433a-4a46-9339-2280545c6b91.png?token=k8PNoiziHvtg7sFydRpgeRYxxGAsep-zrD6Mmzw4lZ0&height=525&width=1200&expires=33282100329",
        width: 1200,
        height: 525,
        alt: "Abhinav's Portfolio Preview"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav's Portfolio",
    description: "Interactive & visually captivating personal portfolio",
    images: [
      "https://opengraph.b-cdn.net/production/images/ceeff8e2-433a-4a46-9339-2280545c6b91.png?token=k8PNoiziHvtg7sFydRpgeRYxxGAsep-zrD6Mmzw4lZ0&height=525&width=1200&expires=33282100329"
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <WeirdThemeProvider />
          {/* <CustomCursor /> */}
          <Navigation />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'