"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Skill = {
  name: string
  level: number
  category: "frontend" | "backend" | "design" | "tools"
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
    { name: "React", level: 90, category: "frontend" },
    { name: "Next.js", level: 85, category: "frontend" },
    { name: "TypeScript", level: 80, category: "frontend" },
    { name: "Tailwind CSS", level: 95, category: "frontend" },
    { name: "Framer Motion", level: 75, category: "frontend" },
    { name: "Three.js", level: 70, category: "frontend" },
    { name: "GSAP", level: 65, category: "frontend" },
    { name: "Node.js", level: 75, category: "backend" },
    { name: "Express", level: 70, category: "backend" },
    { name: "MongoDB", level: 65, category: "backend" },
    { name: "PostgreSQL", level: 60, category: "backend" },
    { name: "GraphQL", level: 55, category: "backend" },
    { name: "Figma", level: 80, category: "design" },
    { name: "Adobe XD", level: 70, category: "design" },
    { name: "Photoshop", level: 65, category: "design" },
    { name: "Illustrator", level: 60, category: "design" },
    { name: "Git", level: 85, category: "tools" },
    { name: "Docker", level: 60, category: "tools" },
    { name: "Jest", level: 70, category: "tools" },
    { name: "Webpack", level: 65, category: "tools" },
  ]

  const [activeTab, setActiveTab] = useState("all")

  const filteredSkills = activeTab === "all" ? skills : skills.filter((skill) => skill.category === activeTab)

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, y }} className="max-wxl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-space">
            My <span className="text-primary">Skills</span>
          </h2>

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="frontend" onClick={() => setActiveTab("frontend")}>
                Frontend
              </TabsTrigger>
              <TabsTrigger value="backend" onClick={() => setActiveTab("backend")}>
                Backend
              </TabsTrigger>
              <TabsTrigger value="design" onClick={() => setActiveTab("design")}>
                Design
              </TabsTrigger>
              <TabsTrigger value="tools" onClick={() => setActiveTab("tools")}>
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
            <TabsContent value="design" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="tools" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
          </Tabs>

          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Badge variant="outline" className="text-sm py-1.5 px-3">
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillsGrid({ skills }: { skills: Skill[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {skills.map((skill) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex justify-between mb-1">
            <span className="font-medium">{skill.name}</span>
            <span className="text-sm text-muted-foreground">{skill.level}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
