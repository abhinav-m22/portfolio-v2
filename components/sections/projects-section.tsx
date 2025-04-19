"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

type Project = {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  github: string
  details: string
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState("all")

  const projects: Project[] = [
    {
      title: "Portfolio",
      description: "My personal portfolio showcasing my work and skills",
      image: "/assets/projects/portfolio.png",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Framer Motion",],
      link: "#",
      github: "https://github.com/abhinav-m22/portfolio-v2",
      details: "This portfolio is a showcase of my work and skills as a developer. It features a clean and modern design, with sections highlighting my projects, skills, and experience. The site is built using Next.js and TypeScript, ensuring a fast and responsive user experience. The use of Tailwind CSS allows for easy customization and styling, while Framer Motion adds smooth animations to enhance the overall look and feel.",
    },
    {
      title: "JobScout.ai",
      description: "AI-Powered Personalized Career Navigator",
      image: "/assets/projects/jobscout.png",
      tags: ["Next.js", "Tailwind CSS", "TypeScript", "FastAPI", "PostgreSQL", "OpenAI", "Bright Data Web Scraper API", "AWS S3"],
      link: "https://jobscout-ai.vercel.app/",
      github: "https://github.com/abhinav-m22/jobscout.ai",
      details: `This platform revolutionizes job hunting by leveraging AI and Bright Data's Web Scraper API to provide personalized, real-time job recommendations. Users upload their resume, and the AI matches them with tailored job opportunities based on skills, preferences, and aspirations. The platform offers an intuitive, conversational job search, personalized dashboards to track applications, and interview preparation tools. It simplifies the job search experience by eliminating the need for repetitive filtering and manual searching, saving time and reducing stress while enhancing career decision-making.`,
    },
    {
      title: "FashionGen",
      description: "Your Style, Your Story: Fashion Reimagined with GenAI",
      image: "/assets/projects/fashiongen.png",
      tags: ["React.js", "Node.js", "FastAPI", "OpenAI", "Firebase", "Gemini", "SQL"],
      link: "#",
      github: "https://github.com/abhinav-m22/FashionGen",
      details:
        "FashionGen is a GenAI-powered fashion platform that redefines online shopping by making it personal, inclusive, and engaging. With features like personalized outfit recommendations, a virtual try-on, and culturally resonant style suggestions, FashionGen adapts to diverse backgrounds and speaks your language. Users can explore trends, receive real-time fashion advice, and shop effortlessly through Amazon, creating a truly global fashion experience.",
    },
    {
      title: "CodeArena",
      description: "A challenging coding arena to enhance your algorithmic skills",
      image: "/assets/projects/codearena.png",
      tags: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
      link: "https://codearena.vercel.app",
      github: "https://github.com/abhinav-m22/codearena",
      details:
        "CodeArena is a web platform designed to help developers enhance their coding skills by providing a diverse collection of data structures and algorithms questions. With various difficulty levels ranging from easy to hard, you can challenge yourself and improve your problem-solving abilities.",
    },
    {
      title: "APIscape",
      description: "Full-Stack API for text-similarity analysis",
      image: "/assets/projects/apiscape.png",
      tags: ["Next.js", "TypeScript", "Prisma"],
      link: "https://apiscape.vercel.app/",
      github: "https://github.com/abhinav-m22/APIscape",
      details:
        "APIscape is a Full-Stack API for text-similarity analysis, allowing users to generate unique API keys, make rate-limited POST requests to determine similarity scores between texts, and manage key access. Built using Next.js and Prisma, this API provides a robust solution for developers looking to integrate text analysis into their applications.",
    },
    {
      title: "Flipkart Clone",
      description: "A clone of the popular e-commerce platform Flipkart",
      image: "/assets/projects/flipkart.png",
      tags: ["React.js", "Node.js", "MongoDB", "Express.js"],
      link: "#",
      github: "https://github.com/abhinav-m22/Flipkart-Clone",
      details: "This project aims to replicate the core features of Flipkart, providing users with a familiar shopping experience. Built using React, Node.js, and MongoDB, the project includes features such as user authentication, product listings, and a shopping cart functionality with a fully responsive design.",
    },
  ]

  const uniqueTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.tags.includes(filter))

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-space">
            My <span className="text-primary">Projects</span>
          </h2>

          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            {uniqueTags.map((tag) => (
              <Button
                key={tag}
                variant={filter === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-lg bg-card"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-background/20 backdrop-blur-sm border-white/20 text-white hover:bg-background/40"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      {project?.link !== "#" && <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </a>}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">{selectedProject?.description}</DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="relative h-64 md:h-80 overflow-hidden rounded-md">
            {selectedProject && (
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="space-y-4">
            <p>{selectedProject?.details}</p>

            <div className="flex flex-wrap gap-2">
              {selectedProject?.tags.map((tag, i) => (
                <Badge key={i} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
            {selectedProject?.link !== "#" && <Button asChild>
                <a href={selectedProject?.link || "#"} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Project
                </a>
              </Button>}
              
              <Button variant="outline" asChild>
                <a href={selectedProject?.github || "#"} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
