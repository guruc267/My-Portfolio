"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ====================================================
   FLOATING 3D ELEMENTS
   Pure CSS 3D geometric decorations with scroll parallax.
   No canvas, no JS animation loops — GPU-accelerated.
   ==================================================== */

/* Wireframe Cube — pure CSS 3D */
function WireframeCube({ size = 40, color = "rgba(139, 92, 246, 0.15)" }: { size?: number; color?: string }) {
  const half = size / 2;
  const faces = [
    { transform: `rotateY(0deg) translateZ(${half}px)` },
    { transform: `rotateY(180deg) translateZ(${half}px)` },
    { transform: `rotateY(90deg) translateZ(${half}px)` },
    { transform: `rotateY(-90deg) translateZ(${half}px)` },
    { transform: `rotateX(90deg) translateZ(${half}px)` },
    { transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  return (
    <div style={{
      width: size,
      height: size,
      transformStyle: "preserve-3d",
      animation: "spin-slow 20s linear infinite",
    }}>
      {faces.map((face, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size,
            height: size,
            border: `1px solid ${color}`,
            background: "rgba(139, 92, 246, 0.01)",
            transform: face.transform,
            backfaceVisibility: "visible",
          }}
        />
      ))}
    </div>
  );
}

/* Wireframe Octahedron — CSS 3D with 8 triangular faces */
function WireframeOctahedron({ size = 36, color = "rgba(59, 130, 246, 0.18)" }: { size?: number; color?: string }) {
  return (
    <div style={{
      width: size,
      height: size,
      transformStyle: "preserve-3d",
      animation: "spin-reverse-slow 25s linear infinite",
      position: "relative",
    }}>
      {/* Top pyramid */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`top-${i}`}
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            left: size / 2,
            top: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            transformOrigin: `0 ${size}px`,
            transform: `rotateY(${i * 90}deg) rotateX(35deg) translateX(-${size / 2}px)`,
            opacity: 0.5,
          }}
        />
      ))}
      {/* Bottom pyramid (inverted) */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`bot-${i}`}
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            left: size / 2,
            bottom: 0,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderTop: `${size}px solid ${color}`,
            transformOrigin: `0 0`,
            transform: `rotateY(${i * 90}deg) rotateX(-35deg) translateX(-${size / 2}px)`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* Orbit Ring — glowing circular ring rotating in 3D */
function OrbitRing({ size = 80, color = "rgba(6, 182, 212, 0.2)", duration = 12 }: {
  size?: number; color?: string; duration?: number;
}) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "50%",
      border: `1px solid ${color}`,
      transformStyle: "preserve-3d",
      animation: `orbit-ring ${duration}s linear infinite`,
      position: "relative",
    }}>
      {/* Orbiting dot */}
      <div style={{
        position: "absolute",
        top: -3,
        left: "50%",
        transform: "translateX(-50%)",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color.replace(/[\d.]+\)$/, "0.8)"),
        boxShadow: `0 0 12px ${color.replace(/[\d.]+\)$/, "0.5)")}`,
      }} />
    </div>
  );
}

/* Floating dots constellation */
function FloatingDots({ count = 5, spread = 100, color = "rgba(139, 92, 246, 0.3)" }: {
  count?: number; spread?: number; color?: string;
}) {
  return (
    <div style={{
      width: spread,
      height: spread,
      position: "relative",
      transformStyle: "preserve-3d",
      animation: "float-3d 8s ease-in-out infinite",
    }}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const r = spread * 0.35;
        const x = spread / 2 + Math.cos(angle) * r;
        const y = spread / 2 + Math.sin(angle) * r;
        const z = Math.sin(angle * 2) * 15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              borderRadius: "50%",
              background: color,
              transform: `translateZ(${z}px)`,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
        );
      })}
      {/* Connection lines between dots */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {Array.from({ length: count }).map((_, i) => {
          const next = (i + 1) % count;
          const angle1 = (i / count) * Math.PI * 2;
          const angle2 = (next / count) * Math.PI * 2;
          const r = spread * 0.35;
          return (
            <line
              key={i}
              x1={spread / 2 + Math.cos(angle1) * r}
              y1={spread / 2 + Math.sin(angle1) * r}
              x2={spread / 2 + Math.cos(angle2) * r}
              y2={spread / 2 + Math.sin(angle2) * r}
              stroke={color}
              strokeWidth={0.5}
              opacity={0.4}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ====================================================
   MAIN EXPORT: Floating 3D Scene between sections
   Uses scroll-linked parallax for depth effect
   ==================================================== */

export default function Floating3DElements({ variant = "default" }: {
  variant?: "default" | "alternate" | "minimal";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for depth
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  if (variant === "minimal") {
    return (
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: 120,
          width: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Simple centered gradient line */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 200,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), transparent)",
        }} />
        {/* Single floating orbit ring */}
        <motion.div style={{ y: y2, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <OrbitRing size={50} color="rgba(139, 92, 246, 0.1)" duration={15} />
        </motion.div>
      </div>
    );
  }

  if (variant === "alternate") {
    return (
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: 180,
          width: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Gradient divider */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.25), rgba(6, 182, 212, 0.25), transparent)",
        }} />

        {/* Left: Wireframe Octahedron */}
        <motion.div
          style={{
            y: y1,
            rotate: rotate2,
            position: "absolute",
            left: "15%",
            top: "30%",
          }}
        >
          <WireframeOctahedron size={32} color="rgba(6, 182, 212, 0.12)" />
        </motion.div>

        {/* Center: Orbit Ring */}
        <motion.div
          style={{
            y: y2,
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -40,
            marginTop: -40,
          }}
        >
          <OrbitRing size={80} color="rgba(59, 130, 246, 0.12)" duration={10} />
        </motion.div>

        {/* Right: Floating Dots */}
        <motion.div
          style={{
            y: y3,
            position: "absolute",
            right: "12%",
            top: "20%",
          }}
        >
          <FloatingDots count={4} spread={60} color="rgba(139, 92, 246, 0.15)" />
        </motion.div>
      </div>
    );
  }

  // Default variant — full scene
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: 200,
        width: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Gradient divider */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 250,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), transparent)",
      }} />

      {/* Left: Wireframe Cube */}
      <motion.div
        style={{
          y: y1,
          rotate: rotate1,
          position: "absolute",
          left: "10%",
          top: "25%",
        }}
      >
        <WireframeCube size={35} color="rgba(139, 92, 246, 0.12)" />
      </motion.div>

      {/* Center-left: Orbit Ring */}
      <motion.div
        style={{
          y: y2,
          position: "absolute",
          left: "32%",
          top: "40%",
        }}
      >
        <OrbitRing size={60} color="rgba(6, 182, 212, 0.1)" duration={14} />
      </motion.div>

      {/* Center: Floating Dots */}
      <motion.div
        style={{
          y: y3,
          position: "absolute",
          left: "50%",
          top: "10%",
          marginLeft: -40,
        }}
      >
        <FloatingDots count={6} spread={80} color="rgba(139, 92, 246, 0.18)" />
      </motion.div>

      {/* Center-right: Octahedron */}
      <motion.div
        style={{
          y: y1,
          rotate: rotate2,
          position: "absolute",
          right: "28%",
          top: "30%",
        }}
      >
        <WireframeOctahedron size={28} color="rgba(59, 130, 246, 0.14)" />
      </motion.div>

      {/* Right: Small Cube */}
      <motion.div
        style={{
          y: y3,
          position: "absolute",
          right: "8%",
          top: "20%",
        }}
      >
        <WireframeCube size={22} color="rgba(6, 182, 212, 0.1)" />
      </motion.div>
    </div>
  );
}
