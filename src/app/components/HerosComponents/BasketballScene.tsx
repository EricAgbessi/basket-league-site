"use client";

import React, { useRef, useEffect, Suspense, useMemo, JSX } from "react";
import { OrbitControls, useGLTF, Environment, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { BasketballModel } from "./BasketballModel";

export default function BasketballScene({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const basketballRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current && basketballRef.current) {
      const targetRotation = scrollProgress * Math.PI * 4;
      meshRef.current.rotation.y += (targetRotation - meshRef.current.rotation.y) * 0.1;

      const targetX = scrollProgress * 2;
      const targetY = -0.2 + Math.sin(state.clock.elapsedTime) * 0.1;

      basketballRef.current.position.x += (targetX - basketballRef.current.position.x) * 0.1;
      basketballRef.current.position.y += (targetY - basketballRef.current.position.y) * 0.1;

      const scale = 1.2 - scrollProgress * 0.4;
      basketballRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <ambientLight intensity={theme === "dark" ? 0.4 : 0.8} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={theme === "dark" ? 1.2 : 1.5}
        color={theme === "dark" ? "#ff8c00" : "#ffaa33"}
        castShadow
      />
      <pointLight
        position={[-3, -3, -3]}
        intensity={theme === "dark" ? 0.8 : 0.5}
        color={theme === "dark" ? "#4f46e5" : "#6366f1"}
      />

      <Sparkles
        count={theme === "dark" ? 80 : 40}
        scale={6}
        size={0.8}
        speed={0.3}
        color={theme === "dark" ? "#f97316" : "#fb923c"}
        opacity={theme === "dark" ? 0.3 : 0.2}
      />

      <group ref={meshRef}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <group ref={basketballRef} position={[0, -0.2, 0]} scale={[1.2, 1.2, 1.2]}>
            <BasketballModel />
          </group>
        </Float>
      </group>

      <Environment preset={theme === "dark" ? "sunset" : "city"} background={false} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}
