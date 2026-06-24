"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  speed: number;
  color: string;
  cellX: number;
  cellY: number;
}

const CELL_SIZE = 120; // spatial grid cell size for O(1) neighbor lookup

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = window.innerWidth;
    let h = window.innerHeight;
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 30; // Throttle to 30fps — smooth enough for slow particles

    const setSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Reduced particle count: 40 instead of 80
    const particlesCount = Math.min(Math.floor((w * h) / 32000), 45);
    const particles: Particle[] = [];
    const colors = [
      "139, 92, 246",  // Violet
      "59, 130, 246",  // Blue
      "6, 182, 212",   // Cyan
      "255, 255, 255"  // White
    ];

    for (let i = 0; i < particlesCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.2 + 0.6,
        alpha: 0.05 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
        cellX: Math.floor(x / CELL_SIZE),
        cellY: Math.floor(y / CELL_SIZE),
      });
    }

    // Spatial grid for O(n) neighbor lookups instead of O(n²)
    const grid = new Map<string, number[]>();

    const updateGrid = () => {
      grid.clear();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.cellX = Math.floor(p.x / CELL_SIZE);
        p.cellY = Math.floor(p.y / CELL_SIZE);
        const key = `${p.cellX},${p.cellY}`;
        const cell = grid.get(key);
        if (cell) cell.push(i);
        else grid.set(key, [i]);
      }
    };

    const getNeighbors = (cx: number, cy: number): number[] => {
      const result: number[] = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const cell = grid.get(`${cx + dx},${cy + dy}`);
          if (cell) result.push(...cell);
        }
      }
      return result;
    };

    const render = (timestamp: number) => {
      animId = requestAnimationFrame(render);

      // Skip if tab is hidden
      if (document.hidden) return;

      // Throttle to 30fps
      if (timestamp - lastFrame < FRAME_INTERVAL) return;
      lastFrame = timestamp;

      ctx.clearRect(0, 0, w, h);

      // Update particle positions
      for (const p of particles) {
        p.phase += p.speed;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse influence
        let mouseGlow = 0;
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            mouseGlow = (1 - dist / 150) * 0.25;
            p.x -= dx * 0.002;
            p.y -= dy * 0.002;
          }
        }

        const pulse = Math.sin(p.phase) * 0.12 + 0.88;
        const currentAlpha = Math.min(1, p.alpha * pulse + mouseGlow);

        // Glow
        if (currentAlpha > 0.15) {
          const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
          glowGrad.addColorStop(0, `rgba(${p.color}, ${currentAlpha * 0.25})`);
          glowGrad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fill();
      }

      // Spatial grid connections — O(n) instead of O(n²)
      updateGrid();
      const drawn = new Set<string>();

      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        const neighbors = getNeighbors(pi.cellX, pi.cellY);

        for (const j of neighbors) {
          if (j <= i) continue;
          const pairKey = `${i}-${j}`;
          if (drawn.has(pairKey)) continue;
          drawn.add(pairKey);

          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CELL_SIZE) {
            const alpha = (1 - dist / CELL_SIZE) * 0.06;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);

            const grad = ctx.createLinearGradient(pi.x, pi.y, pj.x, pj.y);
            grad.addColorStop(0, `rgba(${pi.color}, ${alpha})`);
            grad.addColorStop(1, `rgba(${pj.color}, ${alpha})`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    animId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
