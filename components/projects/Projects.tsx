"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import PersonalProjects from "@/components/projects/PersonalProjects";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { personalProjects, projects } from "@/lib/data";

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".section-reveal"),
        { y: 32, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".section-header-wrap"),
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section id="projects" ref={ref} className="py-20 md:py-28">
      <div className="section-wrap">
        <div className="section-header-wrap">
          <SectionHeader
            index="04 — Work"
            title="Selected projects"
            description="Enterprise systems built at WE-Matter — real products, real architecture."
            className="section-reveal invisible"
          />
        </div>
        <FeaturedProjects featured={projects.filter((p) => p.featured)} />

        <div className="section-reveal invisible mt-16 border-t border-line pt-14 md:mt-20 md:pt-16">
          <SectionHeader
            index="Personal"
            title="Personal projects"
            description="Academic builds from my B.Sc. and MCA — security, Java web apps, and early full-stack foundations."
          />
          <PersonalProjects projects={personalProjects} />
        </div>
      </div>
    </section>
  );
}
