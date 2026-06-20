export const characterConfig = {
  model: "/models/avatar.glb",
  /** Sized to fill hero frame at scroll start */
  targetHeight: 1.42,
  scroll: {
    zoomStart: 0,
    zoomEnd: 1,
    /** 3D mesh scale stays fixed; only camera moves on scroll */
    scaleMin: 1,
    scaleMax: 1,
    containerScaleMin: 1,
    containerScaleMax: 1,
    /** Subtle push-in — ~6% closer at full scroll */
    cameraZStart: 5.15,
    cameraZEnd: 4.85,
    cameraY: 0.6,
    lookAtY: 0.36,
    liftY: 0.012,
    rotateY: 0.1,
    floatAmplitude: 0.006,
    floatSpeed: 0.95,
    breatheAmplitude: 0.004,
  },
} as const;

export function getScrollZoomProgress(raw: number): number {
  const { zoomStart, zoomEnd } = characterConfig.scroll;
  const t = Math.min(1, Math.max(0, (raw - zoomStart) / (zoomEnd - zoomStart)));
  return t * t * (3 - 2 * t);
}
