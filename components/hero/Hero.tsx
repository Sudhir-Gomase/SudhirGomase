"use client";

import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import TypingEffect from "@/components/hero/TypingEffect";
import { characterScroll } from "@/lib/characterScroll";
import { gsap, registerGsapPlugins, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { siteConfig, typingPhrases, stats } from "@/lib/data";

const heroStats = [
  { value: `${stats.yearsExperience}+`, label: "Years experience" },
  { value: `${stats.performanceImprovement}%`, label: "API speed gain" },
  { value: `${stats.errorReduction}%`, label: "Error reduction" },
];

const [firstName, lastName] = siteConfig.name.split(" ");

function setHeroScrollState(progress: number, inHero: boolean) {
  characterScroll.progress = progress;
  characterScroll.inHero = inHero;
  characterScroll.visible = inHero;
  characterScroll.sectionIndex = inHero ? 0 : -1;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      const section = ref.current;
      if (!section) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".hero-word",
          { y: 72, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09 }
        )
        .fromTo(
          ".hero-line",
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07 },
          "-=0.45"
        );

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=130%",
              pin: true,
              scrub: 0.22,
              onEnter: () => setHeroScrollState(0, true),
              onEnterBack: () => setHeroScrollState(characterScroll.progress, true),
              onLeave: () => setHeroScrollState(1, false),
              onLeaveBack: () => setHeroScrollState(0, true),
              onUpdate: (self) => setHeroScrollState(self.progress, true),
            },
          }).to(".hero-content", { y: -72, autoAlpha: 0.1, ease: "none" }, 0.08);
        },
        "(max-width: 1023px)": () => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
            onEnter: () => setHeroScrollState(0, true),
            onEnterBack: () => setHeroScrollState(0, true),
            onLeave: () => setHeroScrollState(1, false),
            onUpdate: (self) => setHeroScrollState(self.progress, self.progress < 0.98),
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="hero" className="relative overflow-x-hidden bg-canvas bg-hero-mesh">
      <div className="pointer-events-none absolute -left-40 top-16 h-[200px] w-[200px] rounded-full bg-brand/12 blur-[80px] sm:h-[320px] sm:w-[320px] sm:blur-[100px] md:h-[380px] md:w-[380px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[180px] w-[180px] rounded-full bg-accent/10 blur-[70px] sm:h-[280px] sm:w-[280px] sm:blur-[90px]" />

      <div className="hero-wrap relative z-10 min-h-[100svh] pt-[var(--nav-h)] pb-6 sm:pb-10 md:pb-12">
        <div className="grid min-h-[calc(100svh-var(--nav-h))] grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-8 lg:gap-10">
          <div className="hero-content relative z-20 pb-[38vh] md:col-span-6 md:pb-0 lg:col-span-6 xl:col-span-5">
            <h1 className="font-display text-display-hero font-semibold text-ink-heading" aria-label={siteConfig.name}>
              <span className="hero-word block invisible">{firstName}</span>
              <span className="hero-word text-stroke mt-1 block invisible sm:mt-2">{lastName}</span>
            </h1>

            <p className="hero-line invisible mt-4 max-w-lg text-[15px] leading-[1.75] text-ink-muted sm:mt-5 sm:text-base md:mt-6 md:text-lg">
              I craft production-grade APIs and cloud systems that scale — from database
              design to AWS deployment.
            </p>

            <div className="hero-line invisible mt-3 sm:mt-4 md:mt-5">
              <TypingEffect phrases={typingPhrases} />
            </div>

            <div className="hero-line invisible mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap md:mt-8">
              <MagneticButton href="#projects" className="w-full sm:w-auto">
                View my work
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary" className="w-full sm:w-auto">
                Get in touch
              </MagneticButton>
            </div>

            <div className="hero-line invisible mt-6 grid grid-cols-3 gap-2 border-t border-line pt-5 sm:mt-8 sm:gap-3 sm:pt-6 md:mt-10 md:gap-4 md:pt-8">
              {heroStats.map((stat) => (
                <div key={stat.label} className="min-w-0">
                  <p className="font-display text-lg text-ink-heading sm:text-xl md:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[8px] font-medium uppercase leading-snug tracking-wide text-ink-faint sm:text-[9px] md:text-[10px] lg:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer column — avatar renders in fixed overlay aligned to this area on md+ */}
          <div className="hidden md:col-span-6 md:block lg:col-span-6 xl:col-span-7" aria-hidden />
        </div>
      </div>
    </section>
  );
}
