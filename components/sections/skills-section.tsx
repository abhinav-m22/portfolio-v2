"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

type Skill = {
  name: string
  level: number
  category: "frontend" | "backend" | "db" | "tools" | "#"
  icon: string
  color: string
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const skills: Skill[] = [
    { name: "React", level: 90, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
    { name: "Next.js", level: 85, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg", color: "#000000" }, // fallback to line icon
    { name: "TypeScript", level: 80, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
    { name: "Tailwind CSS", level: 95, category: "frontend", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", color: "#06B6D4" },
    { name: "JavaScript", level: 90, category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
    { name: "Node.js", level: 75, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
    { name: "Golang", level: 70, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", color: "#00ADD8" },
    { name: "Django", level: 70, category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", color: "#092E20" }, // switched to plain variant
    { name: "MongoDB", level: 65, category: "db", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
    { name: "PostgreSQL", level: 60, category: "db", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791" },
    { name: "SQL", level: 60, category: "db", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
    { name: "Java", level: 70, category: "#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#007396" },
    { name: "Python", level: 80, category: "#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
    { name: "Git", level: 85, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
    { name: "AWS", level: 85, category: "tools", icon: "https://www.svgrepo.com/show/448266/aws.svg", color: "#FF9900" },
    { name: "Docker", level: 60, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ED" },
    { name: "Linux", level: 70, category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", color: "#FCC624" },
    // c, c++
    { name: "C", level: 70, category: "#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "#00599C" },
    { name: "C++", level: 70, category: "#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "#00599C" },
    // firebase
    { name: "Firebase", level: 70, category: "db", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "#FFCA28" },
  ];
  
  const [activeTab, setActiveTab] = useState("all")
  const filteredSkills = activeTab === "all" ? skills : skills.filter((skill) => skill.category === activeTab)

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-space">
            My <span className="text-primary">Skills</span>
          </h2>

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid grid-cols-5 mb-8 bg-background/50 backdrop-blur-sm border border-primary/10">
              <TabsTrigger value="all" onClick={() => setActiveTab("all")} className="data-[state=active]:bg-primary/10">
                All
              </TabsTrigger>
              <TabsTrigger value="frontend" onClick={() => setActiveTab("frontend")} className="data-[state=active]:bg-primary/10">
                Frontend
              </TabsTrigger>
              <TabsTrigger value="backend" onClick={() => setActiveTab("backend")} className="data-[state=active]:bg-primary/10">
                Backend
              </TabsTrigger>
              <TabsTrigger value="db" onClick={() => setActiveTab("db")} className="data-[state=active]:bg-primary/10">
                Databases
              </TabsTrigger>
              <TabsTrigger value="tools" onClick={() => setActiveTab("tools")} className="data-[state=active]:bg-primary/10">
                Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="frontend" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="backend" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="db" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="tools" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

function SkillsGrid({ skills }: { skills: Skill[] }) {
  const tooltipItems = skills.map((skill, index) => ({
    id: index,
    name: skill.name,
    designation: "",
    image: skill.icon,
    color: skill.color
  }));

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      <AnimatedTooltip items={tooltipItems} />
    </motion.div>
  );
}
