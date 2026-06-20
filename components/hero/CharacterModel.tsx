"use client";

import { ContactShadows } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { characterScroll } from "@/lib/characterScroll";
import { characterConfig, getScrollZoomProgress } from "@/lib/characterConfig";
import {
  applyArmGesture,
  computeGesture,
  findArmBones,
  pickClips,
  storeBoneRest,
} from "@/lib/modelAnimation";

const { scroll: scrollCfg } = characterConfig;

function fitModelToScene(model: THREE.Object3D, targetHeight: number) {
  model.scale.set(1, 1, 1);
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  model.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  if (size.y <= 0) return;

  const scale = targetHeight / size.y;
  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);

  const fitted = new THREE.Box3().setFromObject(model);
  const center = fitted.getCenter(new THREE.Vector3());
  model.position.x -= center.x;
  model.position.z -= center.z;
  model.position.y -= fitted.min.y;
}

function ScrollCamera() {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, scrollCfg.lookAtY, 0));
  const smoothZ = useRef<number>(scrollCfg.cameraZStart);
  const smoothY = useRef<number>(scrollCfg.cameraY);

  useFrame((_, delta) => {
    if (!characterScroll.visible || characterScroll.sectionIndex < 0) return;

    const zoom = getScrollZoomProgress(characterScroll.progress);

    const targetZ = THREE.MathUtils.lerp(scrollCfg.cameraZStart, scrollCfg.cameraZEnd, zoom);
    const targetY = scrollCfg.cameraY + zoom * 0.05;
    const smooth = 1 - Math.exp(-14 * delta);

    smoothZ.current = THREE.MathUtils.lerp(smoothZ.current, targetZ, smooth);
    smoothY.current = THREE.MathUtils.lerp(smoothY.current, targetY, smooth);

    camera.position.z = smoothZ.current;
    camera.position.y = smoothY.current;
    camera.lookAt(lookAt.current);
  });

  return null;
}

function ProceduralFigure() {
  return (
    <group>
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#f5d0a9" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.15, 0]} castShadow>
        <capsuleGeometry args={[0.32, 0.55, 8, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.55} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default function CharacterModel() {
  const root = useRef<THREE.Group>(null);
  const gestureGroup = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const waveAction = useRef<THREE.AnimationAction | null>(null);
  const idleAction = useRef<THREE.AnimationAction | null>(null);
  const armRest = useRef<ReturnType<typeof storeBoneRest>>([]);
  const hasRig = useRef(false);
  const waveTimer = useRef(0);
  const [gltfModel, setGltfModel] = useState<THREE.Group | null>(null);

  const smoothRotY = useRef(0);
  const smoothPosY = useRef(0);
  const smoothPosZ = useRef(0);
  const smoothScale = useRef(1);
  const gestureRotY = useRef(0);
  const gestureRotZ = useRef(0);

  useEffect(() => {
    const loader = new GLTFLoader();
    let active = true;

    loader.load(
      characterConfig.model,
      (gltf) => {
        if (!active) return;

        const model = gltf.scene;
        fitModelToScene(model, characterConfig.targetHeight);

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        const bones: THREE.Bone[] = [];
        model.traverse((child) => {
          if (child instanceof THREE.Bone) bones.push(child);
        });

        hasRig.current = bones.length > 0;

        if (hasRig.current) {
          const rightArm = findArmBones(model, "right");
          const armBones = [rightArm.upperArm, rightArm.foreArm, rightArm.hand].filter(
            Boolean
          ) as THREE.Bone[];
          armRest.current = storeBoneRest(armBones);

          const { wave, idle } = pickClips(gltf.animations);
          const animationMixer = new THREE.AnimationMixer(model);

          if (idle) {
            const action = animationMixer.clipAction(idle);
            action.play();
            idleAction.current = action;
          }

          if (wave) {
            const action = animationMixer.clipAction(wave);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.clampWhenFinished = true;
            waveAction.current = action;
          }

          mixer.current = animationMixer;
        }

        setGltfModel(model);
      },
      undefined,
      () => {
        if (active) setGltfModel(null);
      }
    );

    return () => {
      active = false;
      mixer.current?.stopAllAction();
      mixer.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    if (!characterScroll.visible || characterScroll.sectionIndex < 0) return;

    mixer.current?.update(delta);

    if (!root.current || !gestureGroup.current) return;

    const elapsed = state.clock.elapsedTime;
    const gesture = computeGesture(elapsed, hasRig.current);

    if (hasRig.current && armRest.current.length > 0) {
      applyArmGesture(armRest.current, gesture, "right");

      if (waveAction.current && idleAction.current) {
        waveTimer.current += delta;
        const cycleT = waveTimer.current % 9;
        const waving = cycleT < 2.2;

        if (waving && !waveAction.current.isRunning()) {
          idleAction.current.fadeOut(0.35);
          waveAction.current.reset().fadeIn(0.35).play();
        } else if (!waving && waveAction.current.isRunning()) {
          waveAction.current.fadeOut(0.45);
          idleAction.current.reset().fadeIn(0.45).play();
        }
      }
    }

    gestureRotY.current = THREE.MathUtils.lerp(gestureRotY.current, gesture.bodyRotY, 0.12);
    gestureRotZ.current = THREE.MathUtils.lerp(gestureRotZ.current, gesture.bodyRotZ, 0.12);
    gestureGroup.current.rotation.y = gestureRotY.current;
    gestureGroup.current.rotation.z = gestureRotZ.current;
    gestureGroup.current.position.y = gesture.bodyLift;

    const zoom = getScrollZoomProgress(characterScroll.progress);

    const faceBase = characterScroll.side === "right" ? -0.32 : 0.32;
    const rotateDir = characterScroll.side === "right" ? 1 : -1;
    const smooth = 1 - Math.exp(-16 * delta);

    const floatY =
      Math.sin(elapsed * scrollCfg.floatSpeed) * scrollCfg.floatAmplitude;
    const breathe =
      1 + Math.sin(elapsed * 0.85) * scrollCfg.breatheAmplitude;

    const targetRotY = faceBase + rotateDir * zoom * scrollCfg.rotateY;
    const targetY = zoom * scrollCfg.liftY + floatY;
    const targetZ = zoom * 0.02;
    const targetScale =
      THREE.MathUtils.lerp(scrollCfg.scaleMin, scrollCfg.scaleMax, zoom) * breathe;

    smoothRotY.current = THREE.MathUtils.lerp(smoothRotY.current, targetRotY, smooth);
    smoothPosY.current = THREE.MathUtils.lerp(smoothPosY.current, targetY, smooth);
    smoothPosZ.current = THREE.MathUtils.lerp(smoothPosZ.current, targetZ, smooth);
    smoothScale.current = THREE.MathUtils.lerp(smoothScale.current, targetScale, smooth);

    root.current.rotation.y = smoothRotY.current;
    root.current.position.y = smoothPosY.current;
    root.current.position.z = smoothPosZ.current;
    root.current.scale.setScalar(smoothScale.current);
  });

  return (
    <>
      <ScrollCamera />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 7, 5]} intensity={1.45} castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.45} color="#C4A052" />
      <pointLight position={[2, 2, 3]} intensity={0.35} color="#fff8ee" />

      <group ref={root}>
        <group ref={gestureGroup}>
          {gltfModel ? <primitive object={gltfModel} /> : <ProceduralFigure />}
        </group>
      </group>

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.32}
        scale={2}
        blur={2.2}
        far={1}
      />
    </>
  );
}
