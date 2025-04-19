import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ExperienceSection from "@/components/sections/experience-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"
// import ServicesSection from "@/components/sections/services-section"
// import NowPlayingSection from "@/components/sections/now-playing-section"
import SmoothScroll from "@/components/smooth-scroll"

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />

        <SkillsSection />
        {/* <ServicesSection /> */}
        {/* <NowPlayingSection /> */}
        <ContactSection />
      </main>
    </SmoothScroll>
  )
}
