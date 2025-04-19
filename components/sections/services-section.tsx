"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Palette, Lightbulb, Rocket } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Service = {
  icon: React.ReactNode
  title: string
  description: string
  price: string
  features: string[]
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const services: Service[] = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      price: "Starting at $3,000",
      features: [
        "Responsive design",
        "Interactive UI/UX",
        "Performance optimization",
        "SEO-friendly structure",
        "Content management system",
      ],
    },
    {
      icon: <Palette className="h-10 w-10 text-primary" />,
      title: "Creative Design",
      description: "Unique and engaging visual designs that stand out from the crowd",
      price: "Starting at $1,500",
      features: ["Brand identity", "UI/UX design", "Illustration", "Motion graphics", "Design systems"],
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-primary" />,
      title: "Consulting",
      description: "Expert advice on web technologies, design, and digital strategy",
      price: "$150/hour",
      features: [
        "Technology assessment",
        "Performance audits",
        "Accessibility reviews",
        "SEO strategy",
        "Technical planning",
      ],
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Digital Marketing",
      description: "Strategies to grow your online presence and reach your target audience",
      price: "Starting at $1,000/month",
      features: [
        "Social media management",
        "Content creation",
        "Email marketing",
        "Analytics and reporting",
        "Conversion optimization",
      ],
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-space">
            My <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto text-center">
            I offer a range of services to help businesses and individuals create exceptional digital experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-4">{service.icon}</div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="font-bold text-xl mb-4">{service.price}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-sm mr-3 mt-0.5">
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Get Started</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Client Testimonials</h3>
            <div className="flex overflow-x-auto pb-8 gap-6 snap-x">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="min-w-[300px] md:min-w-[400px] snap-center"
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} filled={true} />
                        ))}
                      </div>
                      <p className="mb-4 italic">
                        "Working with this developer was an absolute pleasure. They delivered a stunning website that
                        exceeded our expectations and helped grow our business."
                      </p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 mr-3 flex items-center justify-center text-primary font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                        <div>
                          <p className="font-bold">Client {i}</p>
                          <p className="text-sm text-muted-foreground">Company {i}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary mr-1"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
