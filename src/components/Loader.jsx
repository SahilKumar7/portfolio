import { Html, useProgress } from "@react-three/drei";

const RADIUS = 28;
const STROKE = 3;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CanvasLoader = () => {
  const { progress } = useProgress();
  const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div style={{ position: "relative", width: 72, height: 72 }}>
        <svg
          width={72}
          height={72}
          style={{ transform: "rotate(-90deg)" }}
        >
          <defs>
            <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
          <circle
            cx={36}
            cy={36}
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={STROKE}
          />
          <circle
            cx={36}
            cy={36}
            r={RADIUS}
            fill="none"
            stroke="url(#arc-grad)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke-dashoffset 0.3s ease-out",
              filter: "drop-shadow(0 0 6px rgba(56,189,248,0.4))",
            }}
          />
        </svg>
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#e2e8f0",
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
};

export default CanvasLoader;
