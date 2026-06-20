"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import type { Project } from "@/lib/data";

function PersonalProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const card = ref.current;
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <article ref={ref} className="surface-card invisible flex h-full flex-col p-6 sm:p-7 md:p-8">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="label-caps text-brand-dark dark:text-brand">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-ink-faint">{project.year}</span>
      </div>

      <h3 className="font-display text-xl text-ink-heading sm:text-2xl">{project.title}</h3>
      {project.subtitle && (
        <p className="mt-2 text-sm font-medium text-brand-dark dark:text-brand">{project.subtitle}</p>
      )}

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
        {project.longDescription || project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {project.features.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-line pt-5">
          {project.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-ink-muted">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {project.frontend && (
          <div className="rounded-xl border border-line bg-canvas/80 p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-brand-dark dark:text-brand">
              Frontend
            </p>
            <div className="flex flex-wrap gap-1">
              {project.frontend.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-navy/5 px-2 py-0.5 text-[10px] font-medium text-ink-muted dark:bg-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
        {project.backend && (
          <div className="rounded-xl border border-line bg-canvas/80 p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-brand-dark dark:text-brand">
              Backend
            </p>
            <div className="flex flex-wrap gap-1">
              {project.backend.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-navy/5 px-2 py-0.5 text-[10px] font-medium text-ink-muted dark:bg-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand/30 bg-brand/5 px-5 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand/10 dark:text-brand sm:w-auto"
        >
          View on GitHub
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.996 8.996 0 0012 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
          </svg>
        </a>
      )}
    </article>
  );
}

export default function PersonalProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:mt-24">
      {projects.map((project, i) => (
        <PersonalProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
