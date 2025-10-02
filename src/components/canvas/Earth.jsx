import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
  const _base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/';
  const earth = useGLTF(_base + 'planet/scene.gltf');
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={ref}>
      <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
    </group>
  );
};

const Atmosphere = () => {
  const innerRef = useRef();
  const outerRef = useRef();

  useFrame((_, delta) => {
    if (innerRef.current) innerRef.current.rotation.y -= delta * 0.05;
    if (outerRef.current) outerRef.current.rotation.y += delta * 0.03;
  });

  return (
    <>
      <mesh ref={innerRef} scale={2.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.025} />
      </mesh>
      <mesh ref={outerRef} scale={3.0}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.015} />
      </mesh>
    </>
  );
};

const OrbitalRing = ({ radius, tilt, speed, color, opacity }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.012, 16, 120]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='always'
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      style={{ touchAction: 'auto' }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={0.5} />
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#38bdf8" distance={15} decay={2} />
        <pointLight position={[3, -1, -3]} intensity={0.5} color="#a855f7" distance={12} decay={2} />

        <Earth />
        <Atmosphere />
        <OrbitalRing radius={3.5} tilt={1.2} speed={0.12} color="#38bdf8" opacity={0.18} />
        <OrbitalRing radius={4.2} tilt={0.8} speed={-0.08} color="#a855f7" opacity={0.12} />
        <OrbitalRing radius={4.8} tilt={1.5} speed={0.05} color="#fb7185" opacity={0.08} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
