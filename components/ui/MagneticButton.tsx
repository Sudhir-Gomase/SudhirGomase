"use client";

import { motion } from "framer-motion";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantStyles = {
  primary:
    "bg-ink-heading text-canvas border-ink-heading hover:bg-navy-dark shadow-soft hover:shadow-glow dark:bg-brand dark:text-navy-dark dark:hover:bg-brand-light",
  secondary:
    "bg-surface/80 text-ink-heading border-line backdrop-blur-sm hover:border-brand/45 hover:shadow-glow",
  ghost:
    "bg-transparent text-ink-muted border-line/80 hover:text-ink-heading hover:bg-surface/60 hover:border-brand/30",
};

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - rect.left - rect.width / 2) * 0.1,
      y: (e.clientY - rect.top - rect.height / 2) * 0.1,
    });
  };

  const motionProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: () => setPosition({ x: 0, y: 0 }),
    animate: { x: position.x, y: position.y },
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
    className: cn(
      "inline-flex items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300",
      variantStyles[variant],
      disabled && "pointer-events-none opacity-50",
      className
    ),
  };

  if (href) {
    return <motion.a href={href} {...motionProps}>{children}</motion.a>;
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  );
}
