"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Music, Book, Code, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function NowPlayingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="now-playing" ref={sectionRef} className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-5xl font-bold font-space">
              Now <span className="text-primary">Playing</span>
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">Updated {currentTime.toLocaleTimeString()}</span>
            </div>
          </div>

          <Tabs defaultValue="music">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="music" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Music
              </TabsTrigger>
              <TabsTrigger value="reading" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Reading
              </TabsTrigger>
              <TabsTrigger value="coding" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Coding
              </TabsTrigger>
            </TabsList>

            <TabsContent value="music" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Currently Listening</CardTitle>
                  <CardDescription>Tracks I've been enjoying lately</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Midnight City",
                        artist: "M83",
                        album: "Hurry Up, We're Dreaming",
                        cover: "/placeholder.svg?height=80&width=80",
                      },
                      {
                        title: "Redbone",
                        artist: "Childish Gambino",
                        album: "Awaken, My Love!",
                        cover: "/placeholder.svg?height=80&width=80",
                      },
                      {
                        title: "Tame Impala",
                        artist: "The Less I Know The Better",
                        album: "Currents",
                        cover: "/placeholder.svg?height=80&width=80",
                      },
                    ].map((track, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={track.cover || "/placeholder.svg"}
                            alt={track.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{track.title}</h4>
                          <p className="text-sm text-muted-foreground">{track.artist}</p>
                          <p className="text-xs text-muted-foreground">{track.album}</p>
                        </div>
                        <div className="ml-auto">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Music className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reading" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Currently Reading</CardTitle>
                  <CardDescription>Books and articles I'm exploring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Atomic Habits",
                        author: "James Clear",
                        type: "Book",
                        cover: "/placeholder.svg?height=120&width=80",
                        progress: 65,
                      },
                      {
                        title: "The Future of Web Animation",
                        author: "CSS-Tricks",
                        type: "Article",
                        cover: "/placeholder.svg?height=120&width=80",
                        progress: 100,
                      },
                      {
                        title: "Design Systems Handbook",
                        author: "InVision",
                        type: "E-Book",
                        cover: "/placeholder.svg?height=120&width=80",
                        progress: 42,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={item.cover || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">by {item.author}</p>
                          <p className="text-xs text-muted-foreground mb-2">{item.type}</p>
                          <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${item.progress}%` }} />
                          </div>
                          <p className="text-xs text-right mt-1">{item.progress}% complete</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="coding" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Current Projects</CardTitle>
                  <CardDescription>What I'm building right now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        name: "AI-Powered Design Tool",
                        language: "TypeScript, Python",
                        lastCommit: "2 hours ago",
                        progress: 75,
                      },
                      {
                        name: "3D Portfolio Template",
                        language: "Three.js, React",
                        lastCommit: "Yesterday",
                        progress: 90,
                      },
                      {
                        name: "Open Source UI Library",
                        language: "React, Tailwind CSS",
                        lastCommit: "3 days ago",
                        progress: 45,
                      },
                    ].map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{project.name}</h4>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            {project.lastCommit}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{project.language}</p>
                        <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mb-2">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${project.progress}%` }} />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
