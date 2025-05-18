import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import { Decal, Float, useTexture, Preload } from "@react-three/drei";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";
import ErrorBoundary from "./ErrorBoundary";

const COLS = 7;
const SPACING_X = 2.8;
const SPACING_Y = 2.8;

function getGridPosition(index, total) {
  const row = Math.floor(index / COLS);
  const col = index % COLS;
  const totalRows = Math.ceil(total / COLS);
  const itemsInRow = row < totalRows - 1 ? COLS : total - row * COLS;
  const rowOffset = (COLS - itemsInRow) * SPACING_X / 2;

  const x = col * SPACING_X - (COLS - 1) * SPACING_X / 2 + rowOffset;
  const y = -row * SPACING_Y + (totalRows - 1) * SPACING_Y / 2;

  return [x, y, 0];
}

const Ball = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh castShadow receiveShadow scale={1} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (isMobile) {
    return (
      <>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>What I work with</p>
          <h2 className={`${styles.sectionHeadText} text-center`}>Technologies</h2>
        </motion.div>
        <div className='mt-10 flex flex-row flex-wrap justify-center gap-6'>
          {technologies.map((technology) => (
            <div
              key={technology.name}
              className='flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-200'
            >
              <div className='green-pink-gradient p-[1px] rounded-full'>
                <div className='w-24 h-24 rounded-full bg-tertiary flex items-center justify-center'>
                  <img
                    src={technology.icon}
                    alt={technology.name}
                    className='w-14 h-14 object-contain'
                  />
                </div>
              </div>
              <span className='text-secondary text-[12px] font-medium'>{technology.name}</span>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>What I work with</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Technologies</h2>
      </motion.div>
      <div className='mt-10 w-full h-[500px]'>
      <ErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 22], fov: 30 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.25} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            {technologies.map((tech, index) => (
              <Ball
                key={tech.name}
                imgUrl={tech.icon}
                position={getGridPosition(index, technologies.length)}
              />
            ))}
          </Suspense>
          <Preload all />
        </Canvas>
      </ErrorBoundary>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
