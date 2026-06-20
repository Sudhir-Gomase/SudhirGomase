"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { getAvatarBreakpoint, getAvatarScrollX } from "@/lib/avatarLayout";
import { characterScroll } from "@/lib/characterScroll";
import { getScrollZoomProgress } from "@/lib/characterConfig";
import { gsap, registerGsapPlugins, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CharacterCanvas = dynamic(() => import("@/components/hero/CharacterCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-end justify-center">
      <div className="h-20 w-20 animate-pulse rounded-full bg-brand/15 ring-1 ring-brand/25 sm:h-28 sm:w-28" />
    </div>
  ),
});

const SCRUB = 0.28;
const FADE_START = 0.82;

export default function CharacterCompanion() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const update = () => setBreakpoint(getAvatarBreakpoint(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(
    () => {
      registerGsapPlugins();
      const inner = innerRef.current;
      const role = roleRef.current;
      if (!inner) return;

      gsap.set(inner, { transformOrigin: "50% 100%" });

      const applyPose = () => {
        const inHero = characterScroll.inHero;

        if (!inHero) {
          gsap.set(inner, { autoAlpha: 0 });
          if (role) gsap.set(role, { autoAlpha: 0 });
          return;
        }

        characterScroll.side = "right";
        characterScroll.visible = true;

        const width = window.innerWidth;
        const bp = getAvatarBreakpoint(width);
        const heroZoom = getScrollZoomProgress(characterScroll.progress);
        const scrollX = getAvatarScrollX(width);

        let opacity = 1;
        if (heroZoom >= FADE_START) {
          opacity = 1 - (heroZoom - FADE_START) / (1 - FADE_START);
        }

        if (bp === "mobile") {
          gsap.set(inner, {
            left: "auto",
            right: "0%",
            x: 0,
            xPercent: 0,
            y: 0,
            scale: 1,
            autoAlpha: opacity,
          });
        } else if (bp === "tablet") {
          gsap.set(inner, {
            left: "58%",
            right: "auto",
            x: `${scrollX}vw`,
            xPercent: -50,
            y: 0,
            scale: 1,
            autoAlpha: opacity,
          });
        } else {
          gsap.set(inner, {
            left: "50%",
            right: "auto",
            x: `${scrollX}vw`,
            xPercent: -50,
            y: 0,
            scale: 1,
            autoAlpha: opacity,
          });
        }

        if (role) {
          const showRole = bp !== "mobile" && heroZoom > 0.08 && heroZoom < FADE_START + 0.05;
          gsap.set(role, { autoAlpha: showRole ? opacity : 0 });
        }
      };

      gsap.ticker.add(applyPose);

      const hero = document.getElementById("hero");
      if (hero && role) {
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            gsap.timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "+=130%",
                scrub: SCRUB,
              },
            })
              .fromTo(role, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, ease: "none" }, 0.1)
              .fromTo(
                role.querySelectorAll(".hero-role-line"),
                { y: 16, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, stagger: 0.05, ease: "none" },
                0.16
              );
          },
        });
      }

      ScrollTrigger.refresh();

      return () => {
        gsap.ticker.remove(applyPose);
      };
    },
    { scope: wrapRef, dependencies: [breakpoint] }
  );

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 z-[25] overflow-hidden"
      aria-hidden
    >
      <div
        ref={innerRef}
        data-breakpoint={breakpoint}
        className="character-companion-inner invisible absolute flex flex-col justify-end will-change-transform"
      >
        <div
          ref={roleRef}
          className="invisible absolute -right-1 top-[6%] z-20 hidden text-right md:block md:right-0 md:top-[8%] lg:top-[10%]"
        >
          <p className="hero-role-line text-sm font-medium tracking-wide text-brand">
            A Backend
          </p>
          <p className="hero-role-line text-stroke font-display text-[clamp(1.2rem,2vw,2.25rem)] leading-none">
            Engineer
          </p>
          <p className="hero-role-line font-display text-[clamp(1.35rem,2.4vw,2.65rem)] leading-none text-ink-heading">
            Developer
          </p>
        </div>

        <CharacterCanvas className="h-full min-h-0 w-full flex-1" />
      </div>
    </div>
  );
}
