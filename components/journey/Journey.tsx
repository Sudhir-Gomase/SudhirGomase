"use client";

import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { gsap, registerGsapPlugins, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  educationJourney,
  professionalJourney,
  type JourneyItem,
} from "@/lib/data";
import { cn } from "@/lib/utils";

type JourneyEntry = JourneyItem & { kind: "professional" | "education" };

const journeyPath: JourneyEntry[] = [
  { ...educationJourney[1], kind: "education" },
  { ...educationJourney[0], kind: "education" },
  { ...professionalJourney[1], kind: "professional" },
  { ...professionalJourney[0], kind: "professional" },
];

function TravellerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-brand">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function JourneyStop({
  item,
  layout,
}: {
  item: JourneyEntry;
  layout: "desktop" | "mobile";
}) {
  const isPro = item.kind === "professional";

  return (
    <article
      className={cn(
        "journey-stop flex flex-col",
        layout === "desktop"
          ? "w-full items-center"
          : "w-[min(88vw,340px)] shrink-0 snap-center sm:w-[320px] md:w-[340px]"
      )}
    >
      <div className="flex w-full flex-col items-center">
        <time className="mb-3 whitespace-nowrap text-center font-mono text-[11px] font-medium tabular-nums text-brand-dark dark:text-brand sm:text-xs">
          {item.period}
        </time>
        <span
          className={cn(
            "journey-dot relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 bg-surface sm:h-6 sm:w-6",
            isPro ? "border-brand" : "border-accent"
          )}
        >
          <span className={cn("h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5", isPro ? "bg-brand" : "bg-accent")} />
        </span>
      </div>

      <div
        className={cn(
          "journey-card surface-card mt-5 flex w-full flex-col rounded-2xl border border-line bg-surface/90 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/25 hover:shadow-elevated",
          layout === "desktop"
            ? "min-h-[380px] p-6 xl:min-h-[400px] xl:p-7"
            : "min-h-[360px] p-5 md:min-h-[380px] md:p-6"
        )}
      >
        <span
          className={cn(
            "mb-3 w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            isPro ? "bg-brand/10 text-brand-dark dark:text-brand" : "bg-accent/10 text-accent"
          )}
        >
          {isPro ? "Professional" : "Education"}
        </span>

        <h3 className="font-display text-lg leading-snug text-ink-heading xl:text-xl">{item.organization}</h3>
        <p className="mt-2 text-sm font-semibold text-brand-dark dark:text-brand">{item.title}</p>

        {item.location && (
          <p className="mt-2 font-mono text-[10px] text-ink-faint sm:text-[11px]">{item.location}</p>
        )}

        {item.highlights && item.highlights.length > 0 && (
          <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
            {item.highlights.slice(0, 3).map((point) => (
              <li key={point} className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted sm:text-[13px]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {item.projects && item.projects.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {item.projects.slice(0, 2).map((project) => (
              <span
                key={project}
                className="rounded-md bg-canvas-muted/80 px-2 py-0.5 text-[10px] font-medium text-ink-muted"
              >
                {project}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function MobileConnector() {
  return (
    <div className="journey-connector mt-[2.65rem] flex w-8 shrink-0 items-start self-start sm:w-10 md:w-12" aria-hidden>
      <div className="journey-segment h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand/40 via-brand/25 to-brand/40" />
    </div>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const desktopRailRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".journey-reveal"),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const rail = desktopRailRef.current;
          if (!rail) return;

          const pathFill = rail.querySelector(".journey-path-fill");
          const cards = rail.querySelectorAll(".journey-card");
          const dots = rail.querySelectorAll(".journey-dot");
          const traveller = rail.querySelector(".journey-traveller") as HTMLElement | null;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rail,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });

          tl.fromTo(
            pathFill,
            { scaleX: 0, autoAlpha: 0 },
            { scaleX: 1, autoAlpha: 1, duration: 1.2, ease: "power2.out" },
            0
          );

          tl.fromTo(
            dots,
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.45, stagger: 0.15, ease: "back.out(2.5)" },
            0.15
          );

          tl.fromTo(
            cards,
            { y: 48, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.15, ease: "power3.out" },
            0.2
          );

          if (traveller) {
            gsap.set(traveller, { left: "12.5%", xPercent: -50, autoAlpha: 0, scale: 0.5 });
            tl.to(traveller, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 0.35);

            const travel = gsap.timeline({ repeat: -1, repeatDelay: 1.5, paused: true });
            travel
              .set(traveller, { left: "12.5%", xPercent: -50 })
              .to(traveller, { left: "37.5%", xPercent: -50, duration: 1.1, ease: "power2.inOut" })
              .to(traveller, { scale: 1.18, duration: 0.15, yoyo: true, repeat: 1 }, "-=0.55")
              .to(traveller, { left: "62.5%", xPercent: -50, duration: 1.1, ease: "power2.inOut" })
              .to(traveller, { scale: 1.18, duration: 0.15, yoyo: true, repeat: 1 }, "-=0.55")
              .to(traveller, { left: "87.5%", xPercent: -50, duration: 1.1, ease: "power2.inOut" })
              .to(traveller, { scale: 1.18, duration: 0.15, yoyo: true, repeat: 1 }, "-=0.55");

            tl.add(() => travel.play(), 0.9);

            ScrollTrigger.create({
              trigger: rail,
              start: "top 90%",
              end: "bottom 5%",
              onLeave: () => travel.pause(),
              onEnterBack: () => travel.play(),
            });
          }
        },

        "(max-width: 1023px)": () => {
          const rail = mobileRailRef.current;
          if (!rail) return;

          const segments = rail.querySelectorAll(".journey-segment");
          const cards = rail.querySelectorAll(".journey-card");
          const dots = rail.querySelectorAll(".journey-dot");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rail,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          tl.fromTo(
            segments,
            { scaleX: 0, autoAlpha: 0 },
            { scaleX: 1, autoAlpha: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" },
            0
          );

          tl.fromTo(
            dots,
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.12, ease: "back.out(2)" },
            0.1
          );

          tl.fromTo(
            cards,
            { y: 36, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.12, ease: "power3.out" },
            0.15
          );
        },
      });
    },
    { scope: ref }
  );

  return (
    <section id="journey" ref={ref} className="section-muted section-pad overflow-hidden">
      <div className="section-wrap">
        <SectionHeader
          index="02 — Journey"
          title="Professional & education path"
          description="2+ years building scalable backend systems — from internship to enterprise platforms at WE-Matter."
          className="journey-reveal invisible mb-6 md:mb-8"
        />

        <div className="journey-reveal invisible mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-faint sm:text-sm">
          <span className="inline-flex items-center gap-2">
           <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-accent/15" />
            Education
          </span>
          <span className="h-2.5 w-2.5 rounded-full border-2 border-brand bg-brand/20" />
            Professional
          </span>
          <span className="hidden sm:inline text-ink-faint/60">·</span>
          <span className="text-ink-faint/80 lg:hidden">Swipe to follow the path →</span>
          <span className="hidden text-ink-faint/80 lg:inline"></span>
        </div>

        {/* Desktop — full-width 4-column grid */}
        <div ref={desktopRailRef} className="relative hidden lg:block">
          <div
            className="pointer-events-none absolute inset-x-[12.5%] top-[2.65rem] z-0 h-0.5 -translate-y-1/2"
            aria-hidden
          >
            <div className="journey-path-fill h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent/45 via-brand/55 to-brand" />
          </div>

          <div
            className="journey-traveller pointer-events-none absolute top-[2.65rem] z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand bg-surface will-change-[left,transform]"
            aria-hidden
          >
            <TravellerIcon />
          </div>

          <div className="relative z-10 grid grid-cols-4 gap-6 xl:gap-8">
            {journeyPath.map((item) => (
              <JourneyStop key={item.id} item={item} layout="desktop" />
            ))}
          </div>
        </div>

        {/* Mobile / tablet — horizontal scroll */}
        <div ref={mobileRailRef} className="relative lg:hidden">
          <div className="journey-horizontal flex items-start overflow-x-auto pb-3 pt-1 lg:hidden">
            {journeyPath.map((item, index) => (
              <div key={item.id} className="flex shrink-0 items-start">
                {index > 0 && <MobileConnector />}
                <JourneyStop item={item} layout="mobile" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
