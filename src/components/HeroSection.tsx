"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE } from "@/utils/mockData";
import { ArrowDown, Sparkles } from "lucide-react";

/* ====================================================
   NEURAL INTELLIGENCE SYSTEM — 500+ Kinetic Nodes
   Dense, bright, mouse-reactive, continuously orbiting
   with orbital rings, data-stream particles, and pulses
   ==================================================== */

interface NeuralNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  phase: number;
  speed: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitPhase: number;
  region: string;
  brightness: number;
  color: string;
  shape: "circle" | "diamond" | "ring";
  pulseSpeed: number;
}

interface NeuralEdge {
  from: number;
  to: number;
  strength: number;
}

const REGIONS = [
  { name: "Resume", angle: -2.7, distance: 0.32, color: "168, 85, 247", section: "/resume.pdf" },
  { name: "LinkedIn", angle: -1.8, distance: 0.34, color: "6, 182, 212", section: "https://linkedin.com/in/kgurucharan" },
  { name: "Machine Learning", angle: -0.9, distance: 0.33, color: "139, 92, 246", section: "#skills" },
  { name: "Data Analytics", angle: 0.0, distance: 0.34, color: "59, 130, 246", section: "#skills" },
  { name: "Projects", angle: 0.9, distance: 0.30, color: "16, 185, 129", section: "#projects" },
  { name: "GitHub", angle: 1.8, distance: 0.33, color: "245, 158, 11", section: "#github" },
  { name: "Contact", angle: 2.7, distance: 0.31, color: "244, 63, 94", section: "#contact" },
];function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const hoveredRegion = useRef<string | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = container.offsetWidth;
    let h = container.offsetHeight;

    const setSize = () => {
      w = container.offsetWidth;
      h = container.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const nodes: NeuralNode[] = [];
    const cx = 0.5, cy = 0.5;

    // Core cluster — dense center (50 nodes)
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 0.16 + 0.02;
      const bx = cx + Math.cos(angle) * dist;
      const by = cy + Math.sin(angle) * dist;
      nodes.push({
        x: bx, y: by, baseX: bx, baseY: by,
        radius: Math.random() * 1.5 + 1.0,
        phase: Math.random() * Math.PI * 2,
        speed: 0.006 + Math.random() * 0.012,
        orbitRadius: 0.008 + Math.random() * 0.018,
        orbitSpeed: 0.003 + Math.random() * 0.008,
        orbitPhase: Math.random() * Math.PI * 2,
        region: "core",
        brightness: 0.6 + Math.random() * 0.4,
        color: "255, 255, 255",
        shape: "circle",
        pulseSpeed: 0.02 + Math.random() * 0.04,
      });
    }

    // Region clusters (24 nodes each = 168)
    REGIONS.forEach((region) => {
      for (let i = 0; i < 24; i++) {
        const a = region.angle + (Math.random() - 0.5) * 0.65;
        const d = region.distance + (Math.random() - 0.5) * 0.20;
        const bx = cx + Math.cos(a) * d;
        const by = cy + Math.sin(a) * d;
        nodes.push({
          x: bx, y: by, baseX: bx, baseY: by,
          radius: Math.random() * 1.5 + 1.0,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.01,
          orbitRadius: 0.006 + Math.random() * 0.016,
          orbitSpeed: 0.002 + Math.random() * 0.006,
          orbitPhase: Math.random() * Math.PI * 2,
          region: region.name,
          brightness: 0.35 + Math.random() * 0.45,
          color: region.color,
          shape: "circle",
          pulseSpeed: 0.015 + Math.random() * 0.035,
        });
      }
    });

    // Gap-fill nodes (30 nodes) — full circle
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 0.15 + Math.random() * 0.30;
      const bx = cx + Math.cos(angle) * dist;
      const by = cy + Math.sin(angle) * dist;
      const colors = ["139, 92, 246", "6, 182, 212", "59, 130, 246", "168, 85, 247", "200, 200, 220"];
      nodes.push({
        x: bx, y: by, baseX: bx, baseY: by,
        radius: Math.random() * 1.2 + 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.008,
        orbitRadius: 0.007 + Math.random() * 0.012,
        orbitSpeed: 0.002 + Math.random() * 0.005,
        orbitPhase: Math.random() * Math.PI * 2,
        region: "ambient",
        brightness: 0.2 + Math.random() * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: "circle",
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    // Scattered ambient particles (25 nodes — reduced from 60 for perf)
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 0.06 + Math.random() * 0.42;
      const bx = cx + Math.cos(angle) * dist;
      const by = cy + Math.sin(angle) * dist;
      nodes.push({
        x: bx, y: by, baseX: bx, baseY: by,
        radius: Math.random() * 0.8 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.006,
        orbitRadius: 0.005 + Math.random() * 0.01,
        orbitSpeed: 0.001 + Math.random() * 0.004,
        orbitPhase: Math.random() * Math.PI * 2,
        region: "ambient",
        brightness: 0.1 + Math.random() * 0.2,
        color: "180, 180, 200",
        shape: "circle",
        pulseSpeed: 0.005 + Math.random() * 0.015,
      });
    }

    // Build edges
    const edges: NeuralEdge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].region === "ambient") continue;
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[j].region === "ambient") continue;
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.10) {
          edges.push({ from: i, to: j, strength: 1 - dist / 0.10 });
        }
      }
    }

    // Data stream particles — orbit around center like a solar system
    interface StreamParticle {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      color: string;
      trail: number[];
    }
    const streamParticles: StreamParticle[] = [];
    const streamColors = ["139, 92, 246", "6, 182, 212", "59, 130, 246", "168, 85, 247", "16, 185, 129"];
    for (let i = 0; i < 6; i++) {
      streamParticles.push({
        angle: (Math.PI * 2 / 6) * i + Math.random() * 0.5,
        radius: 0.22 + Math.random() * 0.18,
        speed: 0.004 + Math.random() * 0.006,
        size: 1.5 + Math.random() * 1.5,
        color: streamColors[i % streamColors.length],
        trail: [],
      });
    }

    let time = 0;

    const render = () => {
      // Skip rendering when off-screen or tab hidden
      if (!isVisibleRef.current || document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isActive = mouseRef.current.active;

      let closestRegion: string | null = null;
      let closestDist = Infinity;

      // ── Orbital rings (subtle) ──
      for (let ring = 0; ring < 3; ring++) {
        const ringR = (0.18 + ring * 0.1) * Math.min(w, h);
        const ringAlpha = 0.03 + Math.sin(time * 0.5 + ring) * 0.015;
        ctx.beginPath();
        ctx.arc(cx * w, cy * h, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${ringAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // ── Central pulse ──
      const pulseR = (0.05 + Math.sin(time * 1.2) * 0.015) * Math.min(w, h);
      const pulseGrad = ctx.createRadialGradient(cx * w, cy * h, 0, cx * w, cy * h, pulseR);
      pulseGrad.addColorStop(0, `rgba(139, 92, 246, ${0.12 + Math.sin(time * 1.5) * 0.04})`);
      pulseGrad.addColorStop(0.5, `rgba(59, 130, 246, 0.04)`);
      pulseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(cx * w, cy * h, pulseR, 0, Math.PI * 2);
      ctx.fillStyle = pulseGrad;
      ctx.fill();

      // ── Update data stream particles ──
      for (const sp of streamParticles) {
        sp.angle += sp.speed;
        const wobble = Math.sin(time * 2 + sp.angle * 3) * 0.01;
        const spx = cx + Math.cos(sp.angle) * (sp.radius + wobble);
        const spy = cy + Math.sin(sp.angle) * (sp.radius + wobble);

        // Trail
        sp.trail.push(spx * w, spy * h);
        if (sp.trail.length > 16) {
          sp.trail.splice(0, 2);
        }

        // Draw trail
        if (sp.trail.length >= 4) {
          for (let t = 0; t < sp.trail.length - 2; t += 2) {
            const alpha = (t / sp.trail.length) * 0.25;
            ctx.beginPath();
            ctx.arc(sp.trail[t], sp.trail[t + 1], sp.size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${sp.color}, ${alpha})`;
            ctx.fill();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(spx * w, spy * h, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sp.color}, 0.7)`;
        ctx.fill();

        // Glow
        const spGlow = ctx.createRadialGradient(spx * w, spy * h, 0, spx * w, spy * h, sp.size * 4);
        spGlow.addColorStop(0, `rgba(${sp.color}, 0.15)`);
        spGlow.addColorStop(1, `rgba(${sp.color}, 0)`);
        ctx.beginPath();
        ctx.arc(spx * w, spy * h, sp.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = spGlow;
        ctx.fill();
      }

      // ── Update nodes ──
      for (const node of nodes) {
        node.phase += node.speed;
        node.orbitPhase += node.orbitSpeed;

        const orbitX = Math.cos(node.orbitPhase) * node.orbitRadius;
        const orbitY = Math.sin(node.orbitPhase * 0.73 + node.phase * 0.3) * node.orbitRadius;
        const breathX = Math.sin(node.phase) * 0.003;
        const breathY = Math.cos(node.phase * 0.7) * 0.003;

        let tx = node.baseX + orbitX + breathX;
        let ty = node.baseY + orbitY + breathY;

        if (isActive) {
          const dx = mx - node.baseX;
          const dy = my - node.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 0.18) * 0.04;
          tx += dx * influence;
          ty += dy * influence;

          const boost = Math.max(0, 1 - dist / 0.12) * 0.6;
          node.brightness = Math.min(1, (node.region === "core" ? 0.6 : 0.35) + boost);

          if (node.region !== "core" && node.region !== "ambient" && dist < closestDist) {
            closestDist = dist;
            closestRegion = node.region;
          }
        } else {
          node.brightness += ((node.region === "core" ? 0.6 : node.region === "ambient" ? 0.15 : 0.35) - node.brightness) * 0.03;
        }

        node.x += (tx - node.x) * 0.06;
        node.y += (ty - node.y) * 0.06;
      }

      hoveredRegion.current = closestDist < 0.15 ? closestRegion : null;

      // ── Draw edges ──
      for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const avgBright = (a.brightness + b.brightness) / 2;
        const isHovReg = hoveredRegion.current &&
          (a.region === hoveredRegion.current || b.region === hoveredRegion.current);
        const isCore = a.region === "core" || b.region === "core";

        const alpha = edge.strength * avgBright * (isHovReg ? 0.5 : isCore ? 0.15 : 0.08);
        if (alpha < 0.01) continue;

        ctx.beginPath();
        ctx.moveTo(a.x * w, a.y * h);
        ctx.lineTo(b.x * w, b.y * h);

        const col = isHovReg
          ? (a.region !== "core" && a.region !== "ambient" ? a.color : b.color)
          : "255, 255, 255";
        ctx.strokeStyle = `rgba(${col}, ${alpha})`;
        ctx.lineWidth = isHovReg ? 1.2 : 0.5;
        ctx.stroke();
      }

      // ── Energy pulses along edges ──
      const pulseT = (time * 0.3) % 1;
      for (let ei = 0; ei < edges.length; ei += 5) {
        const edge = edges[ei];
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const isHovReg = hoveredRegion.current &&
          (a.region === hoveredRegion.current || b.region === hoveredRegion.current);
        if (!isHovReg && !((a.region === "core" || b.region === "core") && ei % 15 === 0)) continue;

        const t = (pulseT + ei * 0.011) % 1;
        const px = a.x * w + (b.x * w - a.x * w) * t;
        const py = a.y * h + (b.y * h - a.y * h) * t;
        const col = isHovReg
          ? (a.region !== "core" && a.region !== "ambient" ? a.color : b.color)
          : "255, 255, 255";

        ctx.beginPath();
        ctx.arc(px, py, isHovReg ? 2.2 : 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col}, ${isHovReg ? 0.85 : 0.4})`;
        ctx.fill();
      }

      // ── Draw nodes with varied shapes ──
      for (const node of nodes) {
        const px = node.x * w;
        const py = node.y * h;
        const isHovered = hoveredRegion.current === node.region;

        // Glow
        if (node.brightness > 0.35 || isHovered) {
          const glowR = node.radius * (isHovered ? 9 : 5);
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, glowR);
          gradient.addColorStop(0, `rgba(${node.color}, ${node.brightness * (isHovered ? 0.28 : 0.12)})`);
          gradient.addColorStop(1, `rgba(${node.color}, 0)`);
          ctx.beginPath();
          ctx.arc(px, py, glowR, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        const r = node.radius * (isHovered ? 1.5 : 1);
        const pulse = Math.sin(time * node.pulseSpeed * 60) * 0.15 + 0.85;
        const alpha = node.brightness * pulse;

        // Circle (default)
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color}, ${alpha})`;
        ctx.fill();
      }

      // ── Region labels on hover ──
      if (hoveredRegion.current && isActive) {
        const regionNodes = nodes.filter(n => n.region === hoveredRegion.current);
        if (regionNodes.length > 0) {
          const region = REGIONS.find(r => r.name === hoveredRegion.current);
          const avgX = regionNodes.reduce((s, n) => s + n.x, 0) / regionNodes.length * w;
          const avgY = regionNodes.reduce((s, n) => s + n.y, 0) / regionNodes.length * h;

          ctx.font = "600 12px 'Inter', sans-serif";
          const text = hoveredRegion.current;
          const tw = ctx.measureText(text).width;
          const px2 = 10, rh = 24;

          ctx.fillStyle = `rgba(0, 0, 0, 0.75)`;
          ctx.beginPath();
          const rx = avgX - tw / 2 - px2;
          const ry = avgY - 28;
          const rw = tw + px2 * 2;
          if (ctx.roundRect) {
            ctx.roundRect(rx, ry, rw, rh, 8);
          } else {
            ctx.rect(rx, ry, rw, rh);
          }
          ctx.fill();

          // Accent line on tooltip
          ctx.fillStyle = `rgba(${region?.color || "255,255,255"}, 0.6)`;
          ctx.fillRect(rx, ry + rh - 2, rw, 2);

          ctx.fillStyle = `rgba(${region?.color || "255,255,255"}, 0.95)`;
          ctx.textAlign = "center";
          ctx.fillText(text, avgX, avgY - 13);

          ctx.font = "400 9px 'Inter', sans-serif";
          ctx.fillStyle = "rgba(161, 161, 170, 0.8)";
          const actionText = hoveredRegion.current === "LinkedIn" ? "Click to visit →" : hoveredRegion.current === "Resume" ? "Click to view →" : "Click to explore →";
          ctx.fillText(actionText, avgX, avgY + 2);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => { mouseRef.current.active = false; };
    const onClick = () => {
      if (hoveredRegion.current) {
        const region = REGIONS.find(r => r.name === hoveredRegion.current);
        if (region) {
          if (region.section.startsWith("http") || region.section.startsWith("/")) {
            window.open(region.section, "_blank", "noopener,noreferrer");
          } else {
            document.querySelector(region.section)?.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = (e.touches[0].clientX - rect.left) / rect.width;
        mouseRef.current.y = (e.touches[0].clientY - rect.top) / rect.height;
        mouseRef.current.active = true;
      }
    };
    const onTouchEnd = () => { mouseRef.current.active = false; };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("click", onClick);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    // IntersectionObserver — pause canvas when hero is out of view
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", setSize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("click", onClick);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-crosshair">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}

/* ====================================================
   ROTATING STATEMENTS
   ==================================================== */

const STATEMENTS = [
  { from: "Data", to: "Decisions", color: "#8b5cf6" },
  { from: "Images", to: "Insights", color: "#06b6d4" },
  { from: "Models", to: "Products", color: "#3b82f6" },
  { from: "Ideas", to: "Impact", color: "#10b981" },
  { from: "Research", to: "Applications", color: "#f59e0b" },
];

function RotatingStatement() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % STATEMENTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "1.4em", position: "relative", overflow: "visible", minWidth: "100%" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.85)" }}>{STATEMENTS[index].from}</span>
          <span style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "0.75em",
          }}>→</span>
          <span
            style={{
              background: `linear-gradient(135deg, ${STATEMENTS[index].color}, ${STATEMENTS[index].color}99)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 20px ${STATEMENTS[index].color}40)`,
            }}
          >
            {STATEMENTS[index].to}
          </span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ====================================================
   HERO SECTION
   ==================================================== */

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 40% 50% at 70% 50%, rgba(139, 92, 246, 0.06), transparent 60%),
            radial-gradient(ellipse 30% 40% at 30% 60%, rgba(59, 130, 246, 0.04), transparent 60%)`,
        }}
      />

      <div className="container-main hero-grid relative">
        {/* Left: Content */}
        <div style={{ zIndex: 2 }}>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0.85rem",
              borderRadius: 20,
              background: "rgba(16, 185, 129, 0.08)",
              border: "1px solid rgba(16, 185, 129, 0.15)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#10b981",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
            Available for opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "0.75rem",
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>{PROFILE.name}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              fontWeight: 400,
            }}
          >
            Building AI Systems That Turn
          </motion.p>

          {/* Rotating statement */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            <RotatingStatement />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.7,
              color: "var(--text-muted)",
              maxWidth: 420,
            }}
          >
            AI/ML Engineer specializing in predictive modeling, computer vision systems, and data-driven business intelligence.
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}
          >
            <a href="#projects" className="btn-primary" style={{
              background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
            }}>
              <Sparkles size={14} />
              Explore My Work
            </a>
          </motion.div>
        </div>

        {/* Right: Neural Intelligence System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          style={{ position: "relative" }}
          className="h-[320px] lg:h-[560px] w-full block"
        >
          {/* Ambient glow behind brain */}
          <div
            style={{
              position: "absolute",
              inset: "-20%",
              pointerEvents: "none",
              background: `
                radial-gradient(circle at 45% 45%, rgba(139, 92, 246, 0.08), transparent 50%),
                radial-gradient(circle at 55% 55%, rgba(59, 130, 246, 0.05), transparent 50%)`,
            }}
          />
          <NeuralCanvas />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span className="label-uppercase" style={{ fontSize: "0.625rem", color: "var(--text-faint)" }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={14} style={{ color: "var(--text-faint)" }} />
        </motion.div>
      </motion.div>

      <style jsx>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4.5rem;
          }
        }
      `}</style>
    </section>
  );
}
