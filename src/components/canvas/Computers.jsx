import React, { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ mousePos }) => {
  const _base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
  const computer = useGLTF(_base + 'desktop_pc/scene.gltf');
  const groupRef = useRef();
  const lightRef = useRef();
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;

    const targetRotY = mousePos.current ? mousePos.current.x * 0.15 : 0;
    const targetRotX = mousePos.current ? mousePos.current.y * 0.05 : 0;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03;

    if (lightRef.current) {
      const t = timeRef.current * 0.5;
      const r = Math.sin(t) * 0.5 + 0.5;
      const g = Math.sin(t + 2.1) * 0.3 + 0.3;
      const b = Math.sin(t + 4.2) * 0.5 + 0.5;
      lightRef.current.color.setRGB(r * 0.3 + 0.2, g * 0.5 + 0.4, b * 0.6 + 0.4);
    }
  });

  return (
    <group ref={groupRef}>
      <hemisphereLight intensity={0.12} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={0.8} position={[0, -2, 2]} />

      <pointLight
        ref={lightRef}
        intensity={1.5}
        position={[2, 0, 3]}
        distance={12}
        decay={2}
        color="#38bdf8"
      />

      <mesh position={[5, -4.8, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.04} />
      </mesh>

      <primitive
        object={computer.scene}
        scale={0.75}
        position={[5, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  const handleMouseMove = useCallback((e) => {
    mousePos.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, handleMouseMove]);

  if (isMobile) return null;

  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      style={{ touchAction: 'auto' }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Computers mousePos={mousePos} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
