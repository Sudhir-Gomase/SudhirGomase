"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/data";

const AUTO_INTERVAL_MS = 4500;

function ScreenshotImage({ src, alt }: { src: string; alt: string }) {
  const [aspect, setAspect] = useState<number | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setAspect(img.naturalWidth / img.naturalHeight);
      }
    };
    img.src = src;
  }, [src]);

  const isPortrait = aspect !== null && aspect < 0.85;

  return (
    <div
      className="flex w-full items-center justify-center bg-[#eef1f5] px-1 py-2 dark:bg-[#141622] sm:px-2 sm:py-3"
      style={
        aspect
          ? {
              aspectRatio: `${aspect}`,
              maxHeight: isPortrait ? "min(72vh, 560px)" : "min(52vh, 480px)",
            }
          : { minHeight: "220px", aspectRatio: "16 / 10" }
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full select-none object-contain object-center"
      />
    </div>
  );
}

export default function ProjectPreview({ project }: { project: Project }) {
  const shots = project.screenshots ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (shots.length === 0) return;
      setActive((index + shots.length) % shots.length);
    },
    [shots.length]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    if (shots.length <= 1 || paused) return;
    const id = window.setInterval(next, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [shots.length, paused, next]);

  if (shots.length === 0) {
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl border border-line bg-canvas-muted sm:min-h-[260px]">
        <span className="text-sm text-ink-faint">{project.title}</span>
      </div>
    );
  }

  const current = shots[active];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-xl border border-line shadow-soft">
        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ScreenshotImage src={current.src} alt={current.caption} />
            </motion.div>
          </AnimatePresence>

          {shots.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                data-cursor="hover"
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/95 text-lg text-ink-muted shadow-soft backdrop-blur-sm transition-colors hover:text-ink-heading sm:left-3 sm:h-10 sm:w-10"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                data-cursor="hover"
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/95 text-lg text-ink-muted shadow-soft backdrop-blur-sm transition-colors hover:text-ink-heading sm:right-3 sm:h-10 sm:w-10"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-3 py-2.5 sm:px-4 sm:py-3">
          <p className="min-w-0 flex-1 text-xs font-medium leading-snug text-ink-muted sm:text-sm">
            {current.caption}
          </p>
          {shots.length > 1 && (
            <span className="shrink-0 font-mono text-[10px] tabular-nums text-ink-faint">
              {String(active + 1).padStart(2, "0")}/{String(shots.length).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      {shots.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => goTo(i)}
              data-cursor="hover"
              aria-label={`Go to screenshot ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-2 min-w-[8px] rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-brand" : "w-2 bg-line hover:bg-brand/40"
              }`}
            />
          ))}
        </div>
      )}

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-dark transition-colors hover:text-navy dark:text-brand dark:hover:text-brand-light sm:text-sm"
        >
          View live product
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>
  );
}
