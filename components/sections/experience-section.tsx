"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin, ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { GlowingEffect } from "@/components/ui/glowing-effect"

type Experience = {
  company: string
  position: string
  period: string
  location: string
  description?: string
  logo: string
  contributions?: string[]
  color: string
  link?: string | null
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
      // description:
      //   "Lead the development of interactive web applications using React, Next.js, and Three.js. Implemented advanced animations and 3D visualizations for client projects.",
      logo: "/assets/company/ridecell.png",
      color: "#FF6B6B",
      contributions: [
        "Contributed to payment and rental workflows using Django by developing features, fixing bugs, and deploying hotfixes.",
        "Built utility scripts to reduce manual efforts and made minor UI enhancements and optimizations in React.",
        // "Reduced page load time by 40% through code splitting and lazy loading",
        // "Mentored junior developers and conducted code reviews"
      ],
      link: "https://ridecell.com/"
    },
    {
      company: "SellerSetu",
      position: "Software Developer Intern",
      period: "January 2024 - December 2024",
      location: "Remote",
      // description:
      //   "Developed responsive web applications using React and TypeScript. Collaborated with designers to implement pixel-perfect UI components and animations.",
      logo: "/assets/company/sellersetu.png",
      color: "#4ECDC4",
      contributions: [
        "Built scalable backend systems using Django, Go, and microservices with performance optimizations and efficient API design.",
        "Improved system efficiency by automating tasks, optimizing storage, and enhancing database performance with strategic migrations.",
        // "Created interactive data visualizations using D3.js",
        // "Optimized build process reducing bundle size by 30%"
      ],
      link: "https://sellersetu.in"
    },
    {
      company: "Barclays",
      position: "Technology Summer Intern",
      period: "June 2024 - July 2024",
      location: "Pune, India",
      // description:
      //   "Built and maintained websites for various clients using HTML, CSS, JavaScript, and WordPress. Implemented responsive designs and optimized website performance.",
      logo: "/assets/company/barclays.png",
      color: "#45B7D1",
      contributions: [
        "Built automation tools using .NET Core to streamline developer workflows and reduce meeting overhead.",
        "Integrated CI logs with JIRA and SQL for accurate tracking of commits, PRs, and release events.",
        // "Created custom WordPress themes and plugins",
        // "Optimized website performance and accessibility"
      ],
      link: "https://barclays.com/"
    }
  ]

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />

      <div className="container mx-auto px-4 relative">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 font-space">
            Work <span className="text-primary">Experience</span>
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
                style={{
                  '--exp-color': exp.color,
                } as React.CSSProperties}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--exp-color)] to-primary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                  <div className="relative bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-[var(--exp-color)]/10 rounded-lg" />
                        <Link
                          href={exp.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative flex items-center justify-center h-full w-full transition-transform duration-300 hover:scale-105"
                        >
                          <Image
                            src={exp.logo}
                            alt={exp.company}
                            fill
                            className="object-contain p-2"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{exp.position}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {exp.period}
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <Link
                            href={exp.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            <div className="font-medium text-primary">{exp.company}</div>
                          </Link>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {exp.location}
                          </div>
                        </div>

                        {exp.description && <p className="text-muted-foreground mb-4">{exp.description}</p>}

                        {exp.contributions?.length !== 0 && <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          whileInView={{ height: "auto", opacity: 1 }}
                          viewport={{ once: true }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2">
                            {/* <div className="flex items-center gap-2 text-primary">
                              <h4 className="font-medium">Key Contributions</h4>
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div> */}
                            <ul className="space-y-2">
                              {exp.contributions?.map((contribution, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.2, delay: idx * 0.1 }}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  {contribution}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
