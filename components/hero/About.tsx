"use client";

import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { aboutContent, siteConfig } from "@/lib/data";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".about-reveal"),
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section id="about" ref={ref} className="border-y border-line py-20 md:py-28">
      <div className="section-wrap">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              index="01 — About"
              title="Building systems that last"
              className="about-reveal invisible"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="about-reveal invisible text-lg leading-[1.8] text-ink-muted md:text-xl">
              {aboutContent.bio}
            </p>

            <div className="about-reveal invisible mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutContent.highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur-sm"
                >
                  <p className="font-display text-2xl text-brand-dark dark:text-brand">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-ink-faint">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="about-reveal invisible mt-10 flex flex-wrap gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="rounded-full border border-line px-5 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors hover:border-brand/40 hover:text-brand-dark dark:hover:text-brand"
              >
                GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="rounded-full border border-line px-5 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors hover:border-brand/40 hover:text-brand-dark dark:hover:text-brand"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.cv}
                download
                data-cursor="hover"
                className="rounded-full border border-brand/30 bg-brand/5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-brand-dark transition-colors hover:bg-brand/10 dark:text-brand"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
