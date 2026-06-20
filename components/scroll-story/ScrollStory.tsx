"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Counter from "@/components/ui/Counter";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { pillars } from "@/lib/data";

export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".section-reveal"),
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".section-header-wrap"),
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll(".pillar-card"),
        { y: 48, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".pillar-grid"),
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section id="expertise" ref={ref} className="py-20 md:py-28">
      <div className="section-wrap">
        <div className="section-header-wrap">
          <SectionHeader
            index="03 — Expertise"
            title="Engineering principles"
            description="Four foundations behind every system I architect and ship."
            className="section-reveal invisible"
          />
        </div>

        <div className="pillar-grid grid grid-cols-1 gap-5 md:grid-cols-2">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="pillar-card surface-card surface-card-hover group invisible p-8"
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand-dark">
                  {pillar.number}
                </span>
                <span className="font-display text-4xl text-brand/20 transition-colors group-hover:text-brand/35">
                  {pillar.metric}{pillar.suffix}
                </span>
              </div>

              <h3 className="font-display text-2xl text-ink-heading">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{pillar.description}</p>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs text-ink-faint">{pillar.label}</p>
                <p className="mt-1 font-display text-3xl text-brand-dark">
                  <Counter target={pillar.metric} suffix={pillar.suffix} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
