import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { logo } from "../assets";

const COLORS = ["#38bdf8", "#a855f7", "#fb7185", "#f59e0b", "#34d399"];

function generateConstellation(count) {
  const nodes = [];
  const cx = 0.5, cy = 0.45;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const ring = i < count / 2 ? 0.18 + Math.random() * 0.06 : 0.28 + Math.random() * 0.08;
    nodes.push({
      x: cx + Math.cos(angle + (Math.random() - 0.5) * 0.4) * ring,
      y: cy + Math.sin(angle + (Math.random() - 0.5) * 0.4) * ring,
      color: COLORS[i % COLORS.length],
      size: 2.5 + Math.random() * 2,
    });
  }
  const lines = [];
  for (let i = 0; i < count; i++) {
    lines.push({ from: i, to: (i + 1) % count });
    if (i + Math.floor(count / 2) < count) {
      lines.push({ from: i, to: i + Math.floor(count / 2) });
    }
  }
  return { nodes, lines };
}

const STAR_COUNT = 80;

function generateStars() {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 1.2 + 0.3,
    opacity: Math.random() * 0.5 + 0.1,
    twinkle: 2 + Math.random() * 4,
  }));
}

const SplashLoader = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const constellation = useMemo(() => generateConstellation(12), []);
  const stars = useMemo(() => generateStars(), []);
  const svgRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) { clearInterval(interval); return p; }
        return p + Math.random() * 10;
      });
    }, 160);
    const timeout = setTimeout(() => setProgress(100), 3200);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(t);
    }
  }, [progress]);

  const p = Math.min(progress, 100);
  const visibleNodes = Math.floor((p / 100) * constellation.nodes.length);
  const visibleLines = Math.floor((p / 100) * constellation.lines.length);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at center, #0c0a1d 0%, #030014 60%, #010008 100%)",
          }}
        >
          {/* Ambient glow that intensifies with progress */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `
                radial-gradient(circle at 30% 35%, rgba(56,189,248,0.12) 0%, transparent 50%),
                radial-gradient(circle at 70% 55%, rgba(168,85,247,0.09) 0%, transparent 50%),
                radial-gradient(circle at 50% 80%, rgba(251,113,133,0.06) 0%, transparent 40%)
              `,
              opacity: 0.4 + (p / 100) * 0.6,
            }}
          />

          {/* Background stars with twinkle */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {stars.map((star, i) => (
              <circle
                key={i}
                cx={`${star.x}%`}
                cy={`${star.y}%`}
                r={star.r}
                fill="#fff"
                opacity={star.opacity}
              >
                <animate
                  attributeName="opacity"
                  values={`${star.opacity};${star.opacity * 0.3};${star.opacity}`}
                  dur={`${star.twinkle}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>

          {/* Constellation SVG */}
          <svg
            ref={svgRef}
            viewBox="0 0 1 1"
            className="absolute w-[min(80vw,500px)] h-[min(80vw,500px)]"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -55%)" }}
          >
            {/* Lines draw in */}
            {constellation.lines.slice(0, visibleLines).map((line, i) => {
              const a = constellation.nodes[line.from];
              const b = constellation.nodes[line.to];
              if (!a || !b) return null;
              const len = Math.hypot(b.x - a.x, b.y - a.y);
              return (
                <line
                  key={`l-${i}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={a.color}
                  strokeWidth={0.002}
                  strokeOpacity={0.4}
                  strokeDasharray={len}
                  strokeDashoffset={len}
                  style={{
                    animation: `constellation-draw 0.8s ease-out ${i * 0.06}s forwards`,
                  }}
                />
              );
            })}

            {/* Nodes pop in */}
            {constellation.nodes.slice(0, visibleNodes).map((node, i) => (
              <g key={`n-${i}`}>
                <circle
                  cx={node.x} cy={node.y} r={0.025}
                  fill={node.color}
                  opacity={0.15}
                >
                  <animate
                    attributeName="r"
                    values="0.025;0.035;0.025"
                    dur="3s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.15;0.25;0.15"
                    dur="3s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={node.x} cy={node.y} r={node.size * 0.003}
                  fill={node.color}
                  opacity={0}
                  style={{
                    animation: `splash-node-appear 0.4s ease-out ${i * 0.08}s forwards`,
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Center logo */}
          <motion.img
            src={logo}
            alt=""
            className="w-16 h-16 object-contain relative z-10 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: [1, 1.08, 1] }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Completion burst */}
          {p >= 95 && (
            <motion.div
              className="absolute rounded-full"
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 600, height: 600, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)",
              }}
            />
          )}

          {/* Progress bar and percentage */}
          <div className="absolute bottom-[15%] flex flex-col items-center gap-3 z-10">
            <div className="w-48 h-[2px] rounded-full overflow-hidden bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #38bdf8, #a855f7, #fb7185)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${p}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-[11px] font-medium tracking-[0.25em] text-white/40">
              {Math.round(p)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
