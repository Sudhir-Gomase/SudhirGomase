"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { techStackGroups } from "@/lib/data";
import { cn } from "@/lib/utils";

const uniqueSkills = [...new Set(techStackGroups.flatMap((g) => g.items))];
const rowA = uniqueSkills.filter((_, i) => i % 2 === 0);
const rowB = uniqueSkills.filter((_, i) => i % 2 === 1);

function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-line bg-surface/90 px-4 py-2 text-sm font-medium text-ink-muted shadow-soft backdrop-blur-sm transition-colors hover:border-brand/35 hover:text-ink-heading md:px-5">
      {skill}
    </span>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];

  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div
        className={cn(
          "marquee-track flex w-max flex-nowrap gap-3 md:gap-4",
          reverse && "marquee-reverse"
        )}
      >
        {loop.map((skill, i) => (
          <SkillPill key={`${skill}-${i}`} skill={skill} />
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
      className="section-pad-sm relative overflow-hidden border-b border-line bg-canvas-muted/50"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-brand/[0.03] to-transparent" aria-hidden />

      <div className="section-wrap">
        <div className="skills-reveal invisible mb-5 flex flex-col gap-3 md:mb-6 md:flex-row md:items-end md:justify-between md:gap-4">
          <div className="min-w-0">
            <p className="label-caps mb-2">Stack</p>
            <h2 className="font-display text-[1.35rem] leading-tight text-ink-heading sm:text-2xl md:text-display-lg">
              Technologies I work with
            </h2>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
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

        <div className="skills-reveal invisible overflow-hidden rounded-2xl border border-line/80 bg-surface/40 p-3 backdrop-blur-sm md:p-4">
          <div className="group/skills space-y-1">
            <MarqueeRow items={rowA.length ? rowA : uniqueSkills} />
            <div className="mx-auto h-px w-[92%] bg-line" aria-hidden />
            <MarqueeRow items={rowB.length ? rowB : rowA} reverse />
          </div>
        </div>

        <ul className="sr-only">
          {uniqueSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
