"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
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
      link: "https://abhinav-mahajan.vercel.app/",
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => (
              <CardContainer key={index} className="inter-var">
                <CardBody className="bg-card relative group/card dark:hover:shadow-2xl dark:hover:shadow-primary/50 hover:shadow-xl hover:shadow-primary/50 dark:bg-card dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {project.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="relative h-48 w-full overflow-hidden rounded-xl">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardItem>
                  <div className="flex justify-between items-center mt-4">
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="flex flex-wrap gap-2"
                    >
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
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="flex gap-2"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                      {project?.link !== "#" && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Demo
                        </a>
                      )}
                    </CardItem>
                  </div>
                  <CardItem
                    translateZ={20}
                    as="div"
                    className="mt-4"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details
                    </Button>
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent>
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg font-semibold leading-none">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-normal">{selectedProject?.description}</DialogDescription>
          </DialogHeader>

          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-md">
            {selectedProject && (
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {selectedProject?.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-[10px] px-1 py-0">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-xs text-muted-foreground leading-normal">
              <p>{selectedProject?.details}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedProject?.link && selectedProject.link !== "#" && (
                <Button asChild variant="outline" size="sm" className="h-7 px-2 text-xs">
                  <Link href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3 w-3" />
                    Demo
                  </Link>
                </Button>
              )}
              {selectedProject?.github && (
                <Button asChild variant="outline" size="sm" className="h-7 px-2 text-xs">
                  <Link href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-3 w-3" />
                    Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex justify-center items-center">
        <Link href="https://github.com/abhinav-m22" target="_blank">
          <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-primary/20 bg-background px-6 font-medium text-primary transition-all hover:border-primary/40 hover:bg-primary/5">
            <span className="relative">View More Projects</span>
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
          </button>
        </Link>
      </div>
    </section>
  )
}
