"use client";

import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { educationJourney, professionalJourney, type JourneyItem } from "@/lib/data";

function Timeline({
  items,
  className,
}: {
  items: JourneyItem[];
  className?: string;
}) {
  return (
    <ol className={`relative space-y-0 ${className ?? ""}`}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className="journey-item relative grid grid-cols-1 gap-3 pb-10 pl-0 last:pb-0 md:grid-cols-[140px_1fr] md:gap-8 md:pl-2 lg:grid-cols-[160px_1fr]"
        >
          {index < items.length - 1 && (
            <span
              className="absolute bottom-0 left-[7px] top-8 hidden w-px bg-line md:block"
              aria-hidden
            />
          )}

          <div className="flex items-start gap-3 md:flex-col md:gap-2">
            <span className="mt-1.5 hidden h-3.5 w-3.5 shrink-0 rounded-full border-2 border-brand bg-surface md:mt-2 md:block" />
            <time className="font-mono text-xs font-medium tabular-nums text-brand-dark dark:text-brand">
              {item.period}
            </time>
          </div>

          <article className="surface-card rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-sm md:p-6">
            <h3 className="font-display text-lg text-ink-heading md:text-xl">{item.organization}</h3>
            <p className="mt-1 text-sm font-semibold text-brand-dark dark:text-brand">{item.title}</p>
            <p className="mt-2 font-mono text-[11px] tabular-nums text-ink-faint">
              {item.period}
              {item.location ? ` · ${item.location}` : ""}
            </p>
            {item.description && (
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            )}
            {item.highlights && item.highlights.length > 0 && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
                  Key achievements
                </p>
                <ul className="space-y-2">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-ink-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.projects && item.projects.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                {item.projects.map((project) => (
                  <span
                    key={project}
                    className="rounded-full border border-line bg-canvas-muted/80 px-3 py-1 text-[11px] font-medium text-ink-muted"
                  >
                    {project}
                  </span>
                ))}
              </div>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".journey-reveal"),
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section id="journey" ref={ref} className="section-muted py-20 md:py-28">
      <div className="section-wrap">
        <SectionHeader
          index="02 — Journey"
          title="Professional & education path"
          description="2+ years building scalable backend systems — from internship to enterprise platforms at WE-Matter."
          className="journey-reveal invisible mb-14 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="journey-reveal invisible mb-6 flex items-center gap-3 font-display text-xl text-ink-heading">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand-dark">
                P
              </span>
              Professional journey
            </h3>
            <Timeline items={professionalJourney} className="journey-reveal invisible" />
          </div>

          <div>
            <h3 className="journey-reveal invisible mb-6 flex items-center gap-3 font-display text-xl text-ink-heading">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                E
              </span>
              Education journey
            </h3>
            <Timeline items={educationJourney} className="journey-reveal invisible" />
          </div>
        </div>
      </div>
    </section>
  );
}
