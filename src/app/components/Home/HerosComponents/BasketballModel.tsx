import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { JSX, useRef } from "react";
import * as THREE from "three";

// Modèle basketball
export function BasketballModel(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/basketball.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} {...props} />
    </group>
  );
}
