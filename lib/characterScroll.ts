export type CharacterSide = "left" | "right";

export const characterScroll = {
  /** 0–1 progress inside hero scroll (drives zoom) */
  progress: 0,
  /** 0 = hero; -1 = avatar disabled after hero */
  sectionIndex: 0,
  side: "right" as CharacterSide,
  /** Master visibility — false after hero section */
  visible: true,
  /** True while the hero section is driving scroll / pin */
  inHero: true,
};
