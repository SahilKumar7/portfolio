import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import ErrorBoundary from "./ErrorBoundary";
import { letterStagger, letterChild } from "../utils/motion";

const AnimatedText = ({ text, className }) => (
  <motion.span variants={letterStagger} initial="hidden" animate="show" className={className}>
    {text.split("").map((char, i) => (
      <motion.span key={i} variants={letterChild} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.span>
);

const roles = ["Frontend Developer", "Backend Developer", "Game Developer", "Pixel Artist"];

const floatingShapes = [
  { size: 80, top: "12%", left: "8%", color: "rgba(56,189,248,0.15)", delay: 0, dur: 6 },
  { size: 50, top: "25%", right: "12%", color: "rgba(168,85,247,0.12)", delay: 1, dur: 7 },
  { size: 120, bottom: "20%", left: "15%", color: "rgba(251,113,133,0.08)", delay: 2, dur: 8 },
  { size: 35, top: "60%", right: "20%", color: "rgba(56,189,248,0.1)", delay: 0.5, dur: 5 },
  { size: 60, top: "40%", left: "60%", color: "rgba(168,85,247,0.08)", delay: 1.5, dur: 9 },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(56,189,248,0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, rgba(168,85,247,0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 80%, rgba(251,113,133,0.1) 0%, transparent 50%)
          `,
        }}
      />

      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            border: `1px solid ${shape.color}`,
            background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 30%, #020b18 80%)",
        }}
      />

      <div
        className="absolute inset-0 top-0 left-0 w-[55%] pointer-events-none z-[5]"
        style={{
          background: "linear-gradient(to right, #020b18 30%, transparent 100%)",
        }}
      />

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-accent shadow-glow-sky" />
          <div className="w-[2px] sm:h-72 h-36 glow-line" />
        </div>

        <div className="max-w-[45%] md:max-w-[480px]">
          <h1 className={`${styles.heroHeadText} text-white`}>
            <AnimatedText text="Hi, I'm " className="" />
            <span className="gradient-text font-display" style={{ fontSize: "inherit" }}>
              <AnimatedText text="Sahil" className="" />
            </span>
          </h1>

          <div className="mt-3 h-[40px] sm:h-[48px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                className={`${styles.heroSubText} text-secondary`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ErrorBoundary>
        <ComputersCanvas />
      </ErrorBoundary>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-secondary/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileHover={{ opacity: 1 }}
        style={{ animation: "fadeOutScroll 4s ease-in-out 3s forwards" }}
      >
        <motion.svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.a>
    </section>
  );
};

export default Hero;
