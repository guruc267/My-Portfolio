"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/* ====================================================
   SCI-FI INTERACTIVE CORE & SYSTEM BOOT DIAGNOSTICS
   Hexagonal grid, cascading digital rain, and shockwaves
   ==================================================== */

interface HexNode {
  cx: number;
  cy: number;
  row: number;
  col: number;
}

function EnhancedSciFiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let time = 0;
    let animId: number;
    let lastHeartbeat = 0;

    // Generate floating particles (reduced from 60 for perf)
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        color: ["139,92,246", "59,130,246", "6,182,212"][Math.floor(Math.random() * 3)],
      });
    }

    // Matrix Digital Rain columns (wider spacing = fewer columns)
    const matrixCols: { x: number; y: number; speed: number; chars: string[] }[] = [];
    const colSpacing = 55;
    const colCount = Math.ceil(w / colSpacing);
    for (let i = 0; i < colCount; i++) {
      matrixCols.push({
        x: i * colSpacing + Math.random() * 15,
        y: Math.random() * -h,
        speed: 1.2 + Math.random() * 2.0,
        chars: Array.from({ length: 14 }, () => "01"[Math.floor(Math.random() * 2)]),
      });
    }

    // Ripples array
    const ripples: { x: number; y: number; r: number; maxR: number; speed: number; color: string }[] = [];

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Add a ripple wave
      ripples.push({
        x: clickX,
        y: clickY,
        r: 0,
        maxR: Math.max(w, h) * 0.45,
        speed: 4.5,
        color: ["139,92,246", "6,182,212", "59,130,246"][Math.floor(Math.random() * 3)],
      });
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", handleCanvasClick);

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Periodic core heartbeat ripple
      const now = Date.now();
      if (now - lastHeartbeat > 2000) {
        lastHeartbeat = now;
        ripples.push({
          x: w / 2,
          y: h / 2,
          r: 0,
          maxR: Math.max(w, h) * 0.35,
          speed: 2.2,
          color: "139,92,246", // Purple central pulse
        });
      }

      // 1. Draw Digital Rain Background (binary stream)
      ctx.font = "8px 'Geist Mono', monospace";
      for (const col of matrixCols) {
        col.y += col.speed;
        if (col.y > h + 150) {
          col.y = -150;
          col.speed = 1.0 + Math.random() * 1.8;
        }
        for (let j = 0; j < col.chars.length; j++) {
          const charY = col.y - j * 12;
          if (charY < 0 || charY > h) continue;

          // Soft opacity trail
          const alpha = (1 - j / col.chars.length) * 0.04;
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.fillText(col.chars[j], col.x, charY);

          // Mutate code occasionally
          if (Math.random() < 0.02) {
            col.chars[j] = Math.random() > 0.5 ? "1" : "0";
          }
        }
      }

      // 2. Draw Hexagonal Grid
      const hexSize = 34;
      const hexH = hexSize * Math.sqrt(3);
      const cols = Math.ceil(w / (hexSize * 1.5)) + 1;
      const rows = Math.ceil(h / hexH) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * hexSize * 1.5;
          const cy = row * hexH + (col % 2 === 0 ? 0 : hexH / 2);
          const dist = Math.sqrt((cx - w / 2) ** 2 + (cy - h / 2) ** 2);
          const maxDist = Math.sqrt((w / 2) ** 2 + (h / 2) ** 2);
          const normDist = dist / maxDist;

          // Pulse wave
          const wave = Math.sin(time * 1.6 - normDist * 6.5);
          let alpha = Math.max(0, (wave * 0.22 + 0.12) * (1 - normDist * 0.8));

          // Enhance hex glow near mouse clicks (ripples)
          for (const rp of ripples) {
            const hexDist = Math.sqrt((cx - rp.x) ** 2 + (cy - rp.y) ** 2);
            const distFromWave = Math.abs(hexDist - rp.r);
            if (distFromWave < 45) {
              const boost = (1 - distFromWave / 45) * 0.45 * (1 - rp.r / rp.maxR);
              alpha = Math.min(1, alpha + boost);
            }
          }

          if (alpha < 0.005) continue;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const hx = cx + hexSize * 0.35 * Math.cos(angle);
            const hy = cy + hexSize * 0.35 * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // 3. Draw Scanning Beam
      const scanY = (time * 75) % (h + 200) - 100;
      const scanGradient = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
      scanGradient.addColorStop(0, "rgba(139, 92, 246, 0)");
      scanGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.035)");
      scanGradient.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 80, w, 160);

      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 4. Draw Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += rp.speed;
        const progress = rp.r / rp.maxR;
        const alpha = Math.max(0, (1 - progress) * 0.25);

        if (alpha <= 0.005) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rp.color}, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, Math.max(0, rp.r - 25), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rp.color}, ${alpha * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 5. Draw Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const pulse = Math.sin(time * 2.5 + p.x * 0.01) * 0.35 + 0.65;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * pulse})`;
        ctx.fill();
      }

      // 6. Draw central glow
      const coreGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 220);
      coreGrad.addColorStop(0, `rgba(139, 92, 246, ${0.06 + Math.sin(time) * 0.02})`);
      coreGrad.addColorStop(0.5, `rgba(59, 130, 246, ${0.03 + Math.sin(time * 1.2) * 0.01})`);
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coreGrad;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "pointer" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}

const BOOT_SEQUENCE = [
  { text: "[SYS]: Initializing cognitive neural interface v4.2...", delay: 0 },
  { text: "[KERN]: Allocating high-dimensional intent memory spaces...", delay: 200 },
  { text: "[MODEL]: Loading predictive sales XGBoost regressor...", delay: 450 },
  { text: "[CV]: Streaming convolutional texture GLCM model weights...", delay: 750 },
  { text: "[GRAPH]: Ingesting relational data structures and metrics...", delay: 1050 },
  { text: "[SYS]: Synthesis interface compiled successfully. Entering core.", delay: 1350 },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const fullName = "K. GURU CHARAN";

  // Progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 9 + 4;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Sync log sequence
  useEffect(() => {
    BOOT_SEQUENCE.forEach((item, i) => {
      setTimeout(() => setVisibleLines(i + 1), item.delay);
    });
  }, []);

  // Text scrambling reveal linked to progress
  useEffect(() => {
    const chars = "XYZ0123456789@#$%&*+=-_[]<>";
    const resolvedCount = Math.floor((progress / 100) * fullName.length);

    const nextText = fullName
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";
        if (index < resolvedCount) return char;
        // Deterministic scramble shuffler
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    setDisplayText(nextText);
  }, [progress]);

  // Handle load completion transition
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#040406",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        overflow: "hidden",
      }}
    >
      {/* Sci-fi dynamic background */}
      <EnhancedSciFiCanvas />

      {/* Main loading interface container */}
      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2.2rem",
        padding: "2rem",
        borderRadius: "24px",
        background: "rgba(9, 9, 11, 0.45)",
        border: "1px solid rgba(139, 92, 246, 0.08)",
        backdropFilter: "blur(12px)",
        width: "90%",
        maxWidth: "420px",
      }}>

        {/* Orbiting rings + central core */}
        <div style={{ position: "relative", width: 110, height: 110 }}>
          {/* Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px dashed rgba(139, 92, 246, 0.25)",
              borderTop: "2px solid rgba(139, 92, 246, 0.8)",
            }}
          />
          {/* Middle Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: 12,
              borderRadius: "50%",
              border: "1px solid rgba(59, 130, 246, 0.15)",
              borderBottom: "2px solid rgba(59, 130, 246, 0.7)",
            }}
          />
          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: 24,
              borderRadius: "50%",
              border: "1px dashed rgba(6, 182, 212, 0.1)",
              borderRight: "2px solid rgba(6, 182, 212, 0.6)",
            }}
          />
          {/* Glowing central synapse */}
          <motion.div
            animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 36,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.5), rgba(6,182,212,0.25), transparent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              boxShadow: "0 0 16px rgba(139, 92, 246, 0.75), 0 0 32px rgba(6, 182, 212, 0.4)",
            }} />
          </motion.div>

          {/* Electron satellites */}
          {[0, 1].map(i => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 3.5 + i * 1.5, repeat: Infinity, ease: "linear", delay: i * 0.6 }}
              style={{
                position: "absolute",
                inset: -6 - i * 6,
                borderRadius: "50%",
              }}
            >
              <div style={{
                position: "absolute",
                top: "50%",
                left: -2,
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: i === 0 ? "#8b5cf6" : "#06b6d4",
                boxShadow: `0 0 10px ${i === 0 ? "#8b5cf6" : "#06b6d4"}`,
              }} />
            </motion.div>
          ))}
        </div>

        {/* Matrix scrambled name */}
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              fontFamily: "'Geist Mono', monospace",
              background: "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.7), #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 15px rgba(139, 92, 246, 0.15)",
            }}
          >
            {displayText}
          </h1>
          <p style={{
            fontSize: "0.5625rem",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: "0.4rem",
            fontFamily: "'Geist Mono', monospace",
          }}>
            Systems Architect
          </p>
        </div>

        {/* Custom Progress Bar */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
          <div style={{
            width: "100%",
            height: 4,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 6,
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)",
                borderRadius: 6,
                width: `${Math.min(progress, 100)}%`,
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.6)",
              }}
              transition={{ duration: 0.12 }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "0 4px" }}>
            <span style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "0.625rem",
              fontWeight: 500,
              color: "rgba(139, 92, 246, 0.75)",
            }}>
              SECURE_CONN_ESTABLISHED
            </span>
            <span style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "0.625rem",
              fontWeight: 700,
              color: "rgba(6, 182, 212, 0.85)",
              letterSpacing: "0.05em",
            }}>
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>

        {/* Telemetry output logs */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
          width: "100%",
          padding: "0.75rem",
          background: "rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.03)",
          minHeight: "75px",
        }}>
          {BOOT_SEQUENCE.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: i === visibleLines - 1 ? 0.85 : 0.35, x: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: "0.5625rem",
                fontFamily: "'Geist Mono', monospace",
                color: i === BOOT_SEQUENCE.length - 1 && visibleLines === BOOT_SEQUENCE.length
                  ? "#10b981"
                  : "#8b5cf6",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span style={{
                color: i < visibleLines - 1 || (i === BOOT_SEQUENCE.length - 1 && visibleLines === BOOT_SEQUENCE.length)
                  ? "#10b981"
                  : "#06b6d4",
              }}>
                {i < visibleLines - 1 || (i === BOOT_SEQUENCE.length - 1 && visibleLines === BOOT_SEQUENCE.length) ? "●" : "»"}
              </span>
              {line.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bypass Action Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        whileHover={{ opacity: 0.95, scale: 1.03, borderColor: "rgba(139,92,246,0.4)" }}
        onClick={() => setProgress(100)}
        style={{
          position: "absolute",
          bottom: "2rem",
          background: "transparent",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          borderRadius: "100px",
          color: "rgba(139, 92, 246, 0.8)",
          padding: "0.45rem 1.25rem",
          fontSize: "0.625rem",
          fontFamily: "'Geist Mono', monospace",
          cursor: "pointer",
          letterSpacing: "0.08em",
          zIndex: 20,
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        [ BYPASS SEQUENCE ]
      </motion.button>
    </motion.div>
  );
}
