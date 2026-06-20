"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import CharacterModel from "@/components/hero/CharacterModel";
import { characterConfig } from "@/lib/characterConfig";
import { cn } from "@/lib/utils";

const { scroll: scrollCfg } = characterConfig;

function LoadingPulse() {
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-4">
      <div className="h-16 w-16 animate-pulse rounded-full bg-brand/15 ring-1 ring-brand/25 sm:h-24 sm:w-24" />
    </div>
  );
}

function useDeviceDpr() {
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (w < 768 || coarse) setDpr(1);
      else if (w < 1024) setDpr(1.25);
      else setDpr(Math.min(2, window.devicePixelRatio || 1.5));
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return dpr;
}

export default function CharacterCanvas({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const dpr = useDeviceDpr();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn("relative h-full min-h-0 w-full", className)}>
        <LoadingPulse />
      </div>
    );
  }

  return (
    <div className={cn("relative h-full min-h-0 w-full", className)}>
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-brand/15 blur-[60px] sm:blur-[90px]"
        aria-hidden
      />
      <Canvas
        shadows
        camera={{ position: [0, scrollCfg.cameraY, scrollCfg.cameraZStart], fov: 32 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="relative z-10 touch-none"
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <CharacterModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
