import * as THREE from "three";

export type ArmBones = {
  shoulder?: THREE.Bone;
  upperArm?: THREE.Bone;
  foreArm?: THREE.Bone;
  hand?: THREE.Bone;
};

const ARM_PATTERNS = {
  shoulder: /shoulder|clavicle/i,
  upperArm: /(?:Left|Right)Arm$/i,
  foreArm: /ForeArm/i,
  hand: /(?:Left|Right)Hand$/i,
};

export function findArmBones(root: THREE.Object3D, side: "left" | "right"): ArmBones {
  const bones: ArmBones = {};
  const sidePattern = side === "right" ? /right/i : /left/i;

  root.traverse((child) => {
    if (!(child instanceof THREE.Bone)) return;
    const name = child.name;
    if (!sidePattern.test(name)) return;

    if (ARM_PATTERNS.shoulder.test(name) && !bones.shoulder) bones.shoulder = child;
    else if (ARM_PATTERNS.upperArm.test(name) && !bones.upperArm) bones.upperArm = child;
    else if (ARM_PATTERNS.foreArm.test(name) && !bones.foreArm) bones.foreArm = child;
    else if (ARM_PATTERNS.hand.test(name) && !bones.hand) bones.hand = child;
  });

  return bones;
}

export function pickClips(clips: THREE.AnimationClip[]) {
  const wave =
    clips.find((c) => /wave|hello|greet|hi/i.test(c.name)) ??
    clips.find((c) => /shrug|react/i.test(c.name));
  const idle =
    clips.find((c) => /idle|stand|breath/i.test(c.name)) ??
    clips.find((c) => /pockets/i.test(c.name));

  return { wave, idle: idle ?? clips[0], all: clips };
}

/** Rest pose for procedural bones (stored once) */
export function storeBoneRest(bones: THREE.Bone[]) {
  return bones.map((b) => ({
    bone: b,
    rot: b.rotation.clone(),
  }));
}

export type ProceduralGesture = {
  /** Torso / full-body wave illusion for static meshes */
  bodyRotY: number;
  bodyRotZ: number;
  bodyLift: number;
  /** Bone offsets when rig exists */
  armLift: number;
  forearmBend: number;
  handTwist: number;
};

const WAVE_CYCLE = 9;
const WAVE_DURATION = 2.2;

/**
 * Idle sway + periodic wave. Works for rigged models (bones) and static meshes (body).
 */
export function computeGesture(elapsed: number, hasRig: boolean): ProceduralGesture {
  const idle = {
    bodyRotY: Math.sin(elapsed * 0.45) * 0.025,
    bodyRotZ: Math.sin(elapsed * 0.55 + 1) * 0.012,
    bodyLift: Math.sin(elapsed * 0.9) * 0.004,
    armLift: Math.sin(elapsed * 0.7) * 0.04,
    forearmBend: Math.sin(elapsed * 0.85 + 0.5) * 0.06,
    handTwist: Math.sin(elapsed * 1.1) * 0.08,
  };

  const cycleT = elapsed % WAVE_CYCLE;
  if (cycleT > WAVE_DURATION) return idle;

  const p = cycleT / WAVE_DURATION;
  const envelope = Math.sin(p * Math.PI);
  const waveCurve = Math.sin(p * Math.PI * 2.5);

  return {
    bodyRotY: idle.bodyRotY + envelope * (hasRig ? 0.06 : 0.13) * waveCurve,
    bodyRotZ: idle.bodyRotZ - envelope * (hasRig ? 0.035 : 0.055),
    bodyLift: idle.bodyLift + envelope * (hasRig ? 0.018 : 0.024),
    armLift: idle.armLift + envelope * (hasRig ? 0.55 : 0),
    forearmBend: idle.forearmBend + envelope * (hasRig ? 0.85 : 0),
    handTwist: idle.handTwist + envelope * (hasRig ? 0.35 : 0) * waveCurve,
  };
}

export function applyArmGesture(
  rest: { bone: THREE.Bone; rot: THREE.Euler }[],
  gesture: ProceduralGesture,
  side: "left" | "right"
) {
  const sign = side === "right" ? 1 : -1;

  for (const { bone, rot } of rest) {
    const name = bone.name.toLowerCase();
    const isRight = /right/.test(name);
    const isLeft = /left/.test(name);
    if (side === "right" && !isRight) continue;
    if (side === "left" && !isLeft) continue;

    bone.rotation.copy(rot);

    if (ARM_PATTERNS.upperArm.test(bone.name)) {
      bone.rotation.z -= sign * gesture.armLift;
      bone.rotation.x -= sign * gesture.armLift * 0.35;
    } else if (ARM_PATTERNS.foreArm.test(bone.name)) {
      bone.rotation.z -= sign * gesture.forearmBend;
    } else if (ARM_PATTERNS.hand.test(bone.name)) {
      bone.rotation.y += sign * gesture.handTwist;
    }
  }
}
