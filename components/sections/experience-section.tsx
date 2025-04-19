"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

type Experience = {
  company: string
  position: string
  period: string
  location: string
  description: string
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const experiences: Experience[] = [
    {
      company: "Ridecell",
      position: "Backend Developer Intern",
      period: "January 2025 - Present",
      location: "Pune, India",
      description:
        "Lead the development of interactive web applications using React, Next.js, and Three.js. Implemented advanced animations and 3D visualizations for client projects.",
    },
    {
      company: "SellerSetu",
      position: "Software Developer Intern",
      period: "January 2024 - December 2024",
      location: "Remote",
      description:
        "Developed responsive web applications using React and TypeScript. Collaborated with designers to implement pixel-perfect UI components and animations.",
    },
    {
      company: "Barclays",
      position: "Technology Summer Intern",
      period: "June 2024 - July 2024",
      location: "Pune, India",
      description:
        "Built and maintained websites for various clients using HTML, CSS, JavaScript, and WordPress. Implemented responsive designs and optimized website performance.",
    },
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 font-space">
            Work <span className="text-primary">Experience</span>
          </h2>

          <div className="relative border-l-2 border-muted pl-8 ml-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-12 relative"
              >
                <div className="absolute -left-[41px] top-0 h-6 w-6 rounded-full border-4 border-background bg-primary" />

                <div className="group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {exp.period}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="font-medium text-primary">{exp.company}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {exp.location}
                    </div>
                  </div>

                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
