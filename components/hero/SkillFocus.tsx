"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { techStackGroups } from "@/lib/data";

/** Unique skills only — split alternately so no skill appears in both marquee rows */
const uniqueSkills = [...new Set(techStackGroups.flatMap((g) => g.items))];
const rowA = uniqueSkills.filter((_, i) => i % 2 === 0);
const rowB = uniqueSkills.filter((_, i) => i % 2 === 1);

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];

  return (
    <div className="marquee-mask group/marquee overflow-hidden py-2.5">
      <div
        className={`marquee-track flex w-max gap-3 group-hover/marquee:[animation-play-state:paused] ${reverse ? "marquee-reverse" : ""}`}
        aria-hidden
      >
        {loop.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="skill-pill shrink-0 rounded-full border border-line bg-surface/90 px-5 py-2 text-sm font-medium text-ink-muted shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-brand/35 hover:text-ink-heading"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillFocus() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".skills-reveal"),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      id="skills"
      ref={ref}
      aria-label="Tech stack"
      className="relative border-b border-line bg-canvas-muted/50 py-14 md:py-16"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-brand/[0.03] to-transparent" aria-hidden />

      <div className="section-wrap !px-5 md:!pl-6 md:!pr-8">
        <div className="skills-reveal invisible mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label-caps mb-2">Stack</p>
            <h2 className="font-display text-display-lg text-ink-heading">Technologies I work with</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            {techStackGroups.map((group) => (
              <span
                key={group.label}
                className="rounded-full border border-line bg-surface/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-faint"
              >
                {group.label}
              </span>
            ))}
          </div>
        </div>

        <div className="skills-reveal invisible space-y-1 rounded-2xl border border-line/80 bg-surface/40 p-3 backdrop-blur-sm md:p-4">
          <MarqueeRow items={rowA.length ? rowA : uniqueSkills} />
          <div className="mx-auto h-px w-[92%] bg-line" aria-hidden />
          <MarqueeRow items={rowB.length ? rowB : rowA} reverse />
        </div>

        {/* Screen-reader list — one entry per skill, no marquee duplicates */}
        <ul className="sr-only">
          {uniqueSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
