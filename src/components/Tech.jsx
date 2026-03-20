import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion } from "motion/react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies, techCategories } from "../constants";
import { textVariant, scaleReveal, blurIn } from "../utils/motion";

const CLUSTER_CENTERS = {
  frontend: { cx: 0.22, cy: 0.24 },
  backend: { cx: 0.78, cy: 0.24 },
  devops: { cx: 0.22, cy: 0.76 },
  creative: { cx: 0.78, cy: 0.76 },
};

const PARTICLE_COLORS = ["#38bdf8", "#a855f7", "#ffffff", "#fb7185"];
const PARTICLE_COUNT = 65;

function computeLayout(width, height) {
  const nodes = [];
  const lines = [];
  const labels = [];

  techCategories.forEach((cat) => {
    const { cx, cy } = CLUSTER_CENTERS[cat.id];
    const catTechs = technologies.filter((t) => t.category === cat.id);
    const count = catTechs.length;
    const baseR = Math.min(width * 0.08, height * 0.12);
    const radius = baseR + count * 4;

    const catNodes = catTechs.map((tech, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const r = radius * (0.9 + ((i * 7 + 3) % 5) * 0.06);
      const a = angle + ((i * 13 + 7) % 9 - 4) * 0.025;
      return {
        ...tech,
        x: cx * width + Math.cos(a) * r,
        y: cy * height + Math.sin(a) * r,
        color: cat.color,
        catId: cat.id,
      };
    });

    nodes.push(...catNodes);

    for (let i = 0; i < count; i++) {
      const j = (i + 1) % count;
      lines.push({
        x1: catNodes[i].x, y1: catNodes[i].y,
        x2: catNodes[j].x, y2: catNodes[j].y,
        color: cat.color, catId: cat.id,
      });
    }
    if (count >= 4) {
      const half = Math.floor(count / 2);
      lines.push({
        x1: catNodes[0].x, y1: catNodes[0].y,
        x2: catNodes[half].x, y2: catNodes[half].y,
        color: cat.color, catId: cat.id,
      });
    }
    if (count >= 6) {
      const q = Math.floor(count / 4);
      lines.push({
        x1: catNodes[q].x, y1: catNodes[q].y,
        x2: catNodes[q + Math.floor(count / 2)].x,
        y2: catNodes[q + Math.floor(count / 2)].y,
        color: cat.color, catId: cat.id,
      });
    }

    const minY = Math.min(...catNodes.map((n) => n.y));
    labels.push({
      catId: cat.id,
      name: cat.name,
      color: cat.color,
      x: cx * width,
      y: Math.max(10, minY - 34),
    });
  });

  return { nodes, lines, labels };
}

const ParticleCanvas = ({ width, height, mouseRef }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef(null);
  const rafRef = useRef();

  useEffect(() => {
    if (!width || !height) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!particlesRef.current) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.3,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.3 + 0.08,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      }));
    }

    const particles = particlesRef.current;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = mouseRef.current?.x ?? 0.5;
      const my = mouseRef.current?.y ?? 0.5;
      const px = (mx - 0.5) * 4;
      const py = (my - 0.5) * 4;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x + px, p.y + py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

const ConstellationLines = ({ lines, width, height, effectiveCat }) => (
  <svg
    width={width}
    height={height}
    className="absolute inset-0 pointer-events-none"
  >
    {lines.map((line, i) => {
      const active = effectiveCat === "all" || effectiveCat === line.catId;
      const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
      return (
        <line
          key={i}
          x1={line.x1} y1={line.y1}
          x2={line.x2} y2={line.y2}
          stroke={line.color}
          strokeWidth={1.2}
          className="constellation-line"
          style={{
            opacity: active ? 0.35 : 0.06,
            strokeDasharray: len,
            strokeDashoffset: len,
            animation: `constellation-draw 1.2s ease-out ${0.3 + i * 0.08}s forwards`,
          }}
        />
      );
    })}
  </svg>
);

const TechNode = ({ tech, isActive, onHover, onLeave, delay, index }) => (
  <motion.div
    className={`constellation-node${isActive ? "" : " dimmed"}`}
    style={{
      position: "absolute",
      left: tech.x,
      top: tech.y,
      x: "-50%",
      y: "-40%",
      "--glow-color": tech.color,
      "--float-delay": `${(index * 0.7) % 5}s`,
    }}
    variants={scaleReveal(delay, 0.5)}
    onMouseEnter={() => onHover(tech.catId)}
    onMouseLeave={onLeave}
  >
    <div
      className="constellation-node-icon"
      style={{ borderColor: `${tech.color}40` }}
    >
      <img
        src={tech.icon}
        alt={tech.name}
        className="w-7 h-7 object-contain"
        draggable={false}
      />
    </div>
    <span
      className="constellation-node-label"
      style={{ color: `${tech.color}cc` }}
    >
      {tech.name}
    </span>
  </motion.div>
);

const LABEL_DELAYS = { frontend: 0.1, backend: 0.2, devops: 0.3, creative: 0.4 };

const ClusterLabel = ({ label, isActive }) => (
  <motion.div
    className="absolute pointer-events-none select-none text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
    style={{
      left: label.x,
      top: label.y,
      transform: "translate(-50%, -100%)",
      color: label.color,
    }}
    variants={blurIn(LABEL_DELAYS[label.catId] || 0.1, 0.7)}
    animate={{ opacity: isActive ? 0.7 : 0.15 }}
    transition={{ duration: 0.3 }}
  >
    {label.name}
  </motion.div>
);

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const { nodes, lines, labels } = useMemo(
    () =>
      size.w > 0
        ? computeLayout(size.w, size.h)
        : { nodes: [], lines: [], labels: [] },
    [size.w, size.h],
  );

  const effectiveCat = hoveredCategory || activeCategory;

  if (isMobile) {
    return (
      <>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>
            What I work with
          </p>
          <h2 className={`${styles.sectionHeadText} text-center`}>
            <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        <div className="mt-8 space-y-6">
          {techCategories.map((cat) => {
            const catTechs = technologies.filter(
              (t) => t.category === cat.id,
            );
            return (
              <div key={cat.id}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <span
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ color: cat.color }}
                  >
                    {cat.name}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: `linear-gradient(90deg, ${cat.color}40, transparent)`,
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  {catTechs.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      variants={scaleReveal(index * 0.03, 0.4)}
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <div
                        className="rounded-xl p-[1px] transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${cat.color}, ${cat.color}88)`,
                        }}
                      >
                        <div className="bg-[#0c1222] rounded-[calc(0.75rem-1px)] w-[60px] h-[60px] flex items-center justify-center">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      </div>
                      <span className="text-secondary text-[9px] font-medium">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My toolkit</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          <span className="gradient-text">Technologies</span>
        </h2>
      </motion.div>

      <div className="flex justify-center gap-2 mt-8 mb-4 flex-wrap">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
            activeCategory === "all"
              ? "bg-white/10 text-white border-white/20"
              : "text-secondary border-white/[0.06] hover:border-white/15"
          }`}
        >
          All
        </motion.button>
        {techCategories.map((cat) => (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.id)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
            style={{
              color: activeCategory === cat.id ? "#fff" : cat.color,
              background:
                activeCategory === cat.id ? `${cat.color}25` : "transparent",
              border: `1px solid ${
                activeCategory === cat.id ? `${cat.color}50` : `${cat.color}20`
              }`,
            }}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="w-full h-[650px] relative overflow-hidden mt-4 mb-4"
        onMouseMove={handleMouseMove}
      >
        {size.w > 0 && (
          <>
            <ParticleCanvas
              width={size.w}
              height={size.h}
              mouseRef={mouseRef}
            />
            <ConstellationLines
              lines={lines}
              width={size.w}
              height={size.h}
              effectiveCat={effectiveCat}
            />
            {labels.map((label) => (
              <ClusterLabel
                key={label.catId}
                label={label}
                isActive={
                  effectiveCat === "all" || effectiveCat === label.catId
                }
              />
            ))}
            {nodes.map((tech, i) => (
              <TechNode
                key={tech.name}
                tech={tech}
                isActive={
                  effectiveCat === "all" || effectiveCat === tech.catId
                }
                onHover={setHoveredCategory}
                onLeave={() => setHoveredCategory(null)}
                delay={i * 0.03}
                index={i}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
