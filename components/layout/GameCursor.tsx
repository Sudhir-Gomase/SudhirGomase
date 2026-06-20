"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};


export default function GameCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 620, damping: 34, mass: 0.22 });
  const ringY = useSpring(cursorY, { stiffness: 620, damping: 34, mass: 0.22 });
  const glowX = useSpring(cursorX, { stiffness: 120, damping: 28, mass: 0.65 });
  const glowY = useSpring(cursorY, { stiffness: 120, damping: 28, mass: 0.65 });
  const trailX = useSpring(cursorX, { stiffness: 180, damping: 26, mass: 0.5 });
  const trailY = useSpring(cursorY, { stiffness: 180, damping: 26, mass: 0.5 });

  const spawnParticle = useCallback((x: number, y: number, burst = false) => {
    const count = burst ? 12 : 2;
    for (let i = 0; i < count; i++) {
      const angle = burst ? (Math.PI * 2 * i) / count : Math.random() * Math.PI * 2;
      const speed = burst ? 1.2 + Math.random() * 2.4 : 0.3 + Math.random() * 0.8;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: burst ? 1 : 0.6 + Math.random() * 0.4,
        maxLife: burst ? 1 : 0.6 + Math.random() * 0.4,
        size: burst ? 2 + Math.random() * 2.5 : 1.5 + Math.random() * 2,
        hue: 38 + Math.random() * 18,
      });
    }
    if (particles.current.length > 120) {
      particles.current = particles.current.slice(-120);
    }
  }, []);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    setEnabled(true);
    document.documentElement.classList.add("game-cursor");

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      mouse.current = { x: e.clientX, y: e.clientY };
      spawnParticle(e.clientX, e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']"));
    };

    const onDown = (e: MouseEvent) => {
      setClicking(true);
      spawnParticle(e.clientX, e.clientY, true);
    };
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("game-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [cursorX, cursorY, spawnParticle]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.life -= 0.018;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        const alpha = (p.life / p.maxLife) * 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife + 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 58%, ${alpha})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = hovering ? 44 : clicking ? 24 : 32;
  const glowSize = hovering ? 120 : clicking ? 80 : 96;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Soft glow blob — lags behind cursor */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          width: glowSize,
          height: glowSize,
          background:
            "radial-gradient(circle, rgba(212,175,103,0.22) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Trailing ring */}
      <motion.div
        className="absolute rounded-full border border-brand/25 bg-brand/5"
        style={{
          left: trailX,
          top: trailY,
          x: "-50%",
          y: "-50%",
          width: hovering ? 52 : 40,
          height: hovering ? 52 : 40,
        }}
      />

      <motion.div
        className="absolute rounded-full border-2 border-brand/80 bg-brand/10 backdrop-blur-[1px]"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
          width: ringSize,
          height: ringSize,
          boxShadow: hovering
            ? "0 0 24px rgba(212,175,103,0.55), inset 0 0 12px rgba(212,175,103,0.15)"
            : "0 0 12px rgba(212,175,103,0.35)",
        }}
      />

      <motion.div className="absolute" style={{ left: ringX, top: ringY, x: "-50%", y: "-50%" }}>
        <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-brand/80" />
        <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-brand/80" />
        <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
      </motion.div>

      <motion.div
        className="absolute rounded-full bg-brand shadow-glow-sm"
        style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%", width: 5, height: 5 }}
      />
    </div>
  );
}
