"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerfumeBottleScene } from "@/components/3d/PerfumeBottleScene";

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function Hero3D() {
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setCanRender3D(supportsWebGL());
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (canRender3D === false) {
    return (
      <img
        src="/brand/icon-3d-material-reference.png"
        alt=""
        aria-hidden
        className="h-full w-full object-contain opacity-90"
      />
    );
  }

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 3.4], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        {canRender3D && <PerfumeBottleScene reducedMotion={reducedMotion} />}
      </Suspense>
    </Canvas>
  );
}
