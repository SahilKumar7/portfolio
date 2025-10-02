import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function safePositions(count, radius) {
  const positions = random.inSphere(new Float32Array(count * 3), { radius });
  for (let i = 0; i < positions.length; i++) {
    if (!Number.isFinite(positions[i])) positions[i] = 0;
  }
  return positions;
}

const StarLayer = ({ count, radius, color, size, speedX, speedY }) => {
  const ref = useRef(null);
  const [sphere] = useState(() => safePositions(count, radius));

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta * speedX;
    ref.current.rotation.y -= delta * speedY;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarLayer count={1200} radius={1.2} color="#7dd3fc" size={0.002} speedX={0.1} speedY={0.067} />
          <StarLayer count={600} radius={1.0} color="#c4b5fd" size={0.0015} speedX={0.05} speedY={0.04} />
          <StarLayer count={400} radius={0.8} color="#fda4af" size={0.0018} speedX={0.08} speedY={-0.05} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
