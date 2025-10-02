import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { logo } from "../assets";

const ORBITS = [
  { color: "#38bdf8", tilt: 0, duration: 3, threshold: 0 },
  { color: "#a855f7", tilt: 60, duration: 3.5, threshold: 30 },
  { color: "#fb7185", tilt: 120, duration: 4, threshold: 60 },
];

const SplashLoader = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) {
          clearInterval(interval);
          return p;
        }
        return p + Math.random() * 10;
      });
    }, 160);
    const timeout = setTimeout(() => setProgress(100), 3200);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setVisible(false), 700);
      return () => clearTimeout(t);
    }
  }, [progress]);

  const p = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at center, #0c0a1d 0%, #030014 60%, #010008 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, rgba(56,189,248,0.10) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.07) 0%, transparent 50%)",
              opacity: 0.5 + (p / 100) * 0.5,
            }}
          />

          <div
            className="relative flex items-center justify-center"
            style={{ width: 200, height: 200, perspective: 600 }}
          >
            {ORBITS.map((orbit, i) => {
              const orbitOpacity =
                p >= orbit.threshold
                  ? Math.min((p - orbit.threshold) / 20, 1)
                  : 0;
              const glowSize = 8 + p * 0.12;

              return (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    transform: `rotateX(70deg) rotateZ(${orbit.tilt}deg)`,
                    transformStyle: "preserve-3d",
                    opacity: orbitOpacity,
                  }}
                >
                  <div
                    className="absolute inset-0 orbit-spin"
                    style={{ animationDuration: `${orbit.duration}s` }}
                  >
                    <div
                      className="absolute inset-2 rounded-full"
                      style={{
                        border: `1.5px solid ${orbit.color}30`,
                        boxShadow: `0 0 ${glowSize}px ${orbit.color}15`,
                      }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 10,
                        height: 10,
                        top: 0,
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: orbit.color,
                        boxShadow: `0 0 12px 4px ${orbit.color}80, 0 0 24px 8px ${orbit.color}30`,
                      }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 5,
                        height: 5,
                        bottom: 0,
                        left: "50%",
                        transform: "translate(-50%, 50%)",
                        background: `${orbit.color}60`,
                        boxShadow: `0 0 6px 2px ${orbit.color}30`,
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {p >= 95 && (
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(168,85,247,0.15) 40%, transparent 70%)",
                }}
              />
            )}

            <motion.img
              src={logo}
              alt=""
              className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 relative z-10">
            <div
              className="w-48 h-[3px] rounded-full overflow-hidden gradient-border-multi"
              style={{ padding: 0 }}
            >
              <div className="w-full h-full bg-[#0c1222] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #38bdf8, #a855f7, #fb7185)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${p}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
            <span className="text-[13px] font-medium tracking-[0.2em] gradient-text-static">
              {Math.round(p)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
