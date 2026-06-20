globalThis.self = globalThis;

import { readFileSync } from "fs";
import { Box3, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const modelPath = process.argv[2] ?? "./public/models/avatar.glb";
const buf = readFileSync(modelPath);
const loader = new GLTFLoader();

loader.parse(
  buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
  "",
  (gltf) => {
    console.log("File:", modelPath);
    console.log("Animations:", gltf.animations.map((a) => a.name));
    const bones = [];
    const meshes = [];
    gltf.scene.traverse((c) => {
      if (c.isBone) bones.push(c.name);
      if (c.isMesh) meshes.push(c.name);
    });
    console.log(`Bones (${bones.length}):`, bones.join(", ") || "(none)");
    console.log(`Meshes (${meshes.length}):`, meshes.join(", ") || "(none)");
    const box = new Box3().setFromObject(gltf.scene);
    console.log("Size:", box.getSize(new Vector3()).toArray());
  },
  (e) => console.error(e)
);
