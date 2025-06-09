"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL ?? "";
    if (!formspreeUrl) {
      throw new Error("FORMSPREE_URL environment variable is not set.");
    }
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    })

    if (response.ok) {
      setIsSubmitted(true)
      setFormState({ name: "", email: "", subject: "", message: "" })
    }
  } catch (error) {
    console.error('Error:', error)
  }
  
  setIsSubmitting(false)
}

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location",
      value: "San Francisco, CA",
      link: "https://maps.google.com",
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-space">
            Get in <span className="text-primary">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <p className="text-lg mb-8 text-muted-foreground">
                I'm always open to new opportunities and collaborations. Feel free to reach out if you have a project in
                mind or just want to say hello!
              </p>

              {/* <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-4 flex items-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <a
                            href={item.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.value}
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div> */}

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">My Availability</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="font-medium text-lg">Currently Available for Freelance</span>
                  </div>
                  <p className="text-base text-muted-foreground">
                    Actively looking for exciting freelance opportunities.
                  </p>
                  <br/>
                  <p className="text-sm">
                  Feel free to reach out to discuss your project requirements, timelines, and goals.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 rounded-lg p-4 mb-6"
                    >
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="text-sm">I'll get back to you as soon as possible.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message"
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
