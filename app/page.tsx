import Hero from "@/components/hero/Hero";
import About from "@/components/hero/About";
import SkillFocus from "@/components/hero/SkillFocus";
import Journey from "@/components/journey/Journey";
import ScrollStory from "@/components/scroll-story/ScrollStory";
import ProjectsSection from "@/components/projects/Projects";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillFocus />
      <About />
      <Journey />
      <ScrollStory />
      <div className="section-muted">
        <ProjectsSection />
      </div>
      <Contact />
      <Footer />
    </>
  );
}
