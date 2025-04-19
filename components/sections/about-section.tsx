"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const factItems = [
    "I've won over 5 hackathons by brainstorming creative projects",
    "I've contributed to over 20 open source projects",
    "I can type at ~100 words per minute",
    "I enjoy learning new technologies and improving my skills",
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-space">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <p className="text-lg">
                I'm a creative developer with a passion for building immersive digital experiences that blend design, technology, and strong backend foundations.
              </p>
              <p className="text-lg">
                With over 2 years of experience in Software Development, I specialize in creating interactive, visually stunning tools and applications that push the boundaries of what's possible on the web.
              </p>
              <p className="text-lg">
                My approach combines technical expertise using modern frameworks and scalable systems to transform complex ideas into simple solutions.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25"></div>
              <Card className="relative">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                    Did You Know?
                  </h3>

                  <ul className="space-y-4">
                    {factItems.map((fact, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-sm mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{fact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
