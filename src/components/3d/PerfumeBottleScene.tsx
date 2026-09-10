"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

const BOTTLE_PROFILE: [number, number][] = [
  [0, 0],
  [0.52, 0],
  [0.56, 0.04],
  [0.56, 0.62],
  [0.5, 0.72],
  [0.38, 0.8],
  [0.17, 0.88],
  [0.17, 1.02],
  [0, 1.02],
];

function useBottleGeometry() {
  return useMemo(() => {
    const points = BOTTLE_PROFILE.map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(points, 64);
  }, []);
}

function useLiquidGeometry() {
  return useMemo(() => {
    const points: [number, number][] = [
      [0, 0.02],
      [0.48, 0.02],
      [0.52, 0.06],
      [0.52, 0.6],
      [0.46, 0.68],
      [0, 0.68],
    ];
    return new THREE.LatheGeometry(
      points.map(([x, y]) => new THREE.Vector2(x, y)),
      64
    );
  }, []);
}

const RESTING_ROTATION_Y = -0.32;

function Bottle({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const elapsed = useRef(0);
  const bottleGeometry = useBottleGeometry();
  const liquidGeometry = useLiquidGeometry();
  const emblem = useTexture("/textures/icon-emblem.png");

  useFrame((state, delta) => {
    if (!group.current) return;
    elapsed.current += delta;

    // Entrada suave: assenta na pose final em ~1.8s, sem giro contínuo depois.
    const settleDuration = 1.8;
    const t = Math.min(elapsed.current / settleDuration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const introY = THREE.MathUtils.lerp(RESTING_ROTATION_Y - 0.5, RESTING_ROTATION_Y, eased);
    const introScale = THREE.MathUtils.lerp(0.94, 1, eased);

    const parallaxX = reducedMotion ? 0 : (state.pointer.y * Math.PI) / 40;
    const parallaxY = reducedMotion ? 0 : (state.pointer.x * Math.PI) / 60;

    group.current.rotation.y += (introY + parallaxY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (parallaxX - group.current.rotation.x) * 0.05;
    group.current.scale.setScalar(
      group.current.scale.x + (introScale - group.current.scale.x) * 0.08
    );
    void viewport;
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Vidro */}
      <mesh geometry={bottleGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#f3ead9"
          transmission={1}
          roughness={0.06}
          thickness={0.6}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Líquido */}
      <mesh geometry={liquidGeometry} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#bfa791"
          transmission={0.55}
          roughness={0.25}
          thickness={0.4}
          ior={1.4}
        />
      </mesh>

      {/* Tampa */}
      <mesh position={[0, 1.14, 0]} castShadow>
        <cylinderGeometry args={[0.19, 0.2, 0.24, 48]} />
        <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.22} />
      </mesh>

      {/* Emblema gravado no topo da tampa */}
      <mesh position={[0, 1.265, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.13, 48]} />
        <meshStandardMaterial
          map={emblem}
          transparent
          metalness={0.6}
          roughness={0.4}
          color="#efe3d0"
        />
      </mesh>
    </group>
  );
}

export function PerfumeBottleScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 4, 2]}
        intensity={1.4}
        color="#fff3e0"
        castShadow
      />
      <directionalLight position={[-3, 1, -2]} intensity={0.5} color="#6e5949" />
      <pointLight position={[0, 2, -3]} intensity={0.6} color="#bfa791" />

      <Float speed={reducedMotion ? 0 : 1} rotationIntensity={0} floatIntensity={reducedMotion ? 0 : 0.15}>
        <Bottle reducedMotion={reducedMotion} />
      </Float>

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.45}
        scale={6}
        blur={2.5}
        far={2}
      />

      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#fff3e0"
          scale={[4, 4, 1]}
          position={[2, 3, 2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.2}
          color="#bfa791"
          scale={[3, 3, 1]}
          position={[-3, 1, -2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          intensity={1.5}
          color="#ffffff"
          scale={[2, 2, 1]}
          position={[0, 2, -4]}
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  );
}
