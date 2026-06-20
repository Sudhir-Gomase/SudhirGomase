"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import ProjectPreview from "@/components/projects/ProjectPreview";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import type { Project } from "@/lib/data";

function StackBlock({
  title,
  stack,
  modules,
}: {
  title: string;
  stack: string[];
  modules: string[];
}) {
  return (
    <div className="rounded-xl border border-line bg-canvas/80 p-5">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-dark dark:text-brand">
        {title}
      </h4>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {stack.map((t) => (
          <span key={t} className="rounded-md bg-navy/5 px-2 py-0.5 text-[11px] font-medium text-navy dark:bg-white/5 dark:text-brand-light">
            {t}
          </span>
        ))}
      </div>
      <ul className="space-y-1.5">
        {modules.map((m) => (
          <li key={m} className="flex items-start gap-2 text-xs text-ink-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reversed = index % 2 === 1;

  useGSAP(
    () => {
      registerGsapPlugins();
      const card = ref.current;
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 64, autoAlpha: 0, scale: 0.97 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        card.querySelectorAll(".project-reveal"),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <article ref={ref} className="surface-card overflow-hidden invisible">
      <div className={`grid grid-cols-1 gap-0 lg:grid-cols-2 ${reversed ? "lg:[direction:rtl]" : ""}`}>
        <div
          className={`order-2 p-5 sm:p-7 md:p-8 lg:order-none lg:p-10 lg:[direction:ltr] ${reversed ? "lg:order-2" : ""}`}
        >
          <span className="project-reveal label-caps text-brand-dark dark:text-brand">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="project-reveal mb-4 mt-3">
            <span className="text-xs text-ink-faint">{project.role}</span>
          </div>

          <h3 className="project-reveal font-display text-xl text-ink-heading sm:text-2xl md:text-3xl">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="project-reveal mt-2 text-sm font-semibold text-brand-dark dark:text-brand">
              {project.subtitle}
            </p>
          )}
          <p className="project-reveal mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
            {project.longDescription || project.description}
          </p>

          <div className="project-reveal mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-faint">Key features</p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.slice(0, 6).map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-ink-muted">
                  <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="project-reveal mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="project-reveal mt-6 inline-flex items-center gap-2 rounded-xl border border-line bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark dark:bg-brand dark:text-[#0c0e16]"
            >
              Visit live site
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        <div
          className={`order-1 flex flex-col border-t border-line bg-canvas-muted/50 p-5 sm:p-6 md:p-8 lg:order-none lg:border-t-0 lg:[direction:ltr] ${reversed ? "lg:border-r lg:order-1" : "lg:border-l"}`}
        >
          <div className="project-reveal flex-1">
            <ProjectPreview project={project} />
          </div>
          {project.frontend && project.backend && (
            <div className="project-reveal mt-4 grid grid-cols-1 gap-3 sm:mt-5 lg:grid-cols-2">
              <StackBlock title="Frontend" stack={project.frontend.stack} modules={project.frontend.modules.slice(0, 3)} />
              <StackBlock title="Backend" stack={project.backend.stack} modules={project.backend.modules.slice(0, 3)} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProjects({ featured }: { featured: Project[] }) {
  return (
    <div className="space-y-8">
      {featured.map((project, i) => (
        <FeaturedProject key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
