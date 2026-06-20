/** Responsive avatar layout — used by CSS variables + GSAP pose */

export type AvatarBreakpoint = "mobile" | "tablet" | "desktop";

export function getAvatarBreakpoint(width: number): AvatarBreakpoint {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export const AVATAR_FRAME = {
  baseScale: 1,
  /** Desktop horizontal nudge from center (vw) */
  xVwDesktop: 10,
  xVwTablet: 6,
} as const;

export function getAvatarScrollX(width: number): number {
  const bp = getAvatarBreakpoint(width);
  if (bp === "mobile") return 0;
  if (bp === "tablet") return AVATAR_FRAME.xVwTablet;
  return AVATAR_FRAME.xVwDesktop;
}
