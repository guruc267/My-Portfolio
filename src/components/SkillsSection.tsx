"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Code2, Database, Star, Layers, Cpu, Award, GitBranch } from "lucide-react";

/* ====================================================
   SKILL NODE DATA
   ==================================================== */

interface SkillNodeData {
  name: string;
  category: string;
  icon: typeof Code2;
  color: string;
  summary: string;
  projects: string[];
  technologies: string[];
  experience: string;
  certifications: string[];
}

const SKILL_NODES: SkillNodeData[] = [
  {
    name: "Python",
    category: "Programming",
    icon: Code2,
    color: "#3b82f6",
    summary: "Core language for ML architectures, image preprocessing, OpenCV pipelines, and automation models.",
    projects: ["Crop Monitoring Using Satellite Imagery", "Ginger Adulteration Detection", "Blinkit Grocery Sales Prediction", "Chitti AI Chatbot"],
    technologies: ["Pandas", "NumPy", "Flask API", "Scikit-Learn"],
    experience: "Core language for ML scripting, convolutional calculations, and pipeline construction.",
    certifications: ["AWS Machine Learning Specialty", "MATLAB Image Processing"],
  },
  {
    name: "Machine Learning",
    category: "AI/ML",
    icon: Layers,
    color: "#8b5cf6",
    summary: "Developing predictive models, validation metric matrices, and hyperparameter tuning pipelines.",
    projects: ["Crop Monitoring Using Satellite Imagery", "Blinkit Grocery Sales Prediction"],
    technologies: ["Random Forest", "XGBoost", "Hyperparameter Grid Search"],
    experience: "Feature engineering, loss monitoring, model fitting, and cross-validation comparisons.",
    certifications: ["AWS Machine Learning Specialty"],
  },
  {
    name: "Computer Vision",
    category: "AI/ML",
    icon: Cpu,
    color: "#06b6d4",
    summary: "Image processing, spatial transforms, color channel separation, and SVM object classification.",
    projects: ["Ginger Adulteration Detection", "Crop Monitoring Using Satellite Imagery"],
    technologies: ["OpenCV", "NDVI Analysis", "Support Vector Machines (SVM)"],
    experience: "Edge filters, custom texture extractors, and multispectral raster file processing.",
    certifications: ["MATLAB Image Processing"],
  },
  {
    name: "SQL",
    category: "Programming",
    icon: Database,
    color: "#10b981",
    summary: "Relational database querying, schema design, data modeling, and ingestion pipeline construction.",
    projects: ["GDP360 Analytics Dashboard", "Blinkit Grocery Sales Prediction"],
    technologies: ["PostgreSQL", "Database Schemas", "Query Optimization"],
    experience: "Optimized joins, partition queries, and tables for data warehousing operations.",
    certifications: ["Accenture Data Analytics & Visualization"],
  },
  {
    name: "Power BI",
    category: "Data",
    icon: Star,
    color: "#f59e0b",
    summary: "Building executive dashboards, star schemas, KPI indexes, and DAX formula engineering.",
    projects: ["GDP360 Analytics Dashboard"],
    technologies: ["DAX Formulas", "Data Modeling", "KPI Reporting"],
    experience: "Translating business specs into interactive, cross-filtered executive dashboards.",
    certifications: ["Accenture Data Analytics & Visualization"],
  },
  {
    name: "Alteryx",
    category: "Data",
    icon: Award,
    color: "#ec4899",
    summary: "Structuring automated ETL pipelines to prepare, clean, and consolidate disparate datasets.",
    projects: ["GDP360 Analytics Dashboard"],
    technologies: ["Data Cleansing", "Data Blending", "Ingestion Workflows"],
    experience: "Reusable ETL workflows to extract and join global data structures.",
    certifications: ["Accenture Data Analytics & Visualization"],
  },
  {
    name: "XGBoost",
    category: "AI/ML",
    icon: Cpu,
    color: "#f43f5e",
    summary: "Extreme gradient boosting models for multi-dimensional regression forecasts.",
    projects: ["Blinkit Grocery Sales Prediction"],
    technologies: ["Gradient Boosting", "Scikit-Learn", "Model Comparison"],
    experience: "Achieved R² of 0.738, outperforming Random Forest on the same dataset.",
    certifications: ["AWS Machine Learning Specialty"],
  },
  {
    name: "GitHub",
    category: "Tools",
    icon: GitBranch,
    color: "#a78bfa",
    summary: "Version control, branch operations, CI/CD pipelines, and repository management.",
    projects: ["25+ Personal Public Repositories"],
    technologies: ["Git Flow", "CI/CD Workflows", "Release Management"],
    experience: "Active open source contributions, release versioning, and workflow automation.",
    certifications: ["ANZ Cyber Security Virtual Program"],
  },
];

/* ====================================================
   ROTATING KNOWLEDGE GRAPH WITH CANVAS
   ==================================================== */

const drawRoundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r);
  } else {
    // Fallback: rounded rectangle drawing
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
  }
};

function KnowledgeGraphCanvas({
  selected,
  hovered,
  onSelect,
  onHover,
  onLeave,
}: {
  selected: SkillNodeData;
  hovered: string | null;
  onSelect: (node: SkillNodeData) => void;
  onHover: (name: string) => void;
  onLeave: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const hoveredRef = useRef<string | null>(null);
  const selectedRef = useRef<string>(selected.name);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  hoveredRef.current = hovered;
  selectedRef.current = selected.name;

  const getNodePositions = useCallback((w: number, h: number, rotation: number) => {
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) * 0.62;
    return SKILL_NODES.map((node, i) => {
      const baseAngle = (i / SKILL_NODES.length) * Math.PI * 2 - Math.PI / 2;
      const angle = baseAngle + rotation;
      return {
        node,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        angle,
      };
    });
  }, []);

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

    const cx = () => w / 2;
    const cy = () => h / 2;
    let time = 0;
    let currentSpeed = 0.0038;

    const render = () => {
      try {
        // Skip rendering when off-screen or tab hidden
        if (!isVisibleRef.current || document.hidden) {
          animId = requestAnimationFrame(render);
          return;
        }
        time += 0.016;
        
        // Smoothly slow down rotation on hover so nodes can be hovered/clicked easily
        const targetSpeed = hoveredRef.current ? 0.0006 : 0.0038;
        currentSpeed += (targetSpeed - currentSpeed) * 0.08;
        rotationRef.current += currentSpeed;

        ctx.clearRect(0, 0, w, h);

        const cX = cx();
        const cY = cy();
        const radius = Math.min(cX, cY) * 0.62;
        const positions = getNodePositions(w, h, rotationRef.current);

        // Draw orbit ring
        ctx.beginPath();
        ctx.arc(cX, cY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.06)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Inner orbit ring
        ctx.beginPath();
        ctx.arc(cX, cY, radius * 0.45, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(59, 130, 246, 0.04)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Core glow
        const coreGrad = ctx.createRadialGradient(cX, cY, 0, cX, cY, 50);
        coreGrad.addColorStop(0, "rgba(139, 92, 246, 0.12)");
        coreGrad.addColorStop(0.6, "rgba(59, 130, 246, 0.03)");
        coreGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = coreGrad;
        ctx.fillRect(cX - 60, cY - 60, 120, 120);

        // Draw connections
        for (const pos of positions) {
          const isSel = selectedRef.current === pos.node.name;
          const isHov = hoveredRef.current === pos.node.name;
          const alpha = isSel ? 0.35 : isHov ? 0.2 : 0.04;

          ctx.beginPath();
          ctx.moveTo(cX, cY);
          ctx.lineTo(pos.x, pos.y);
          ctx.strokeStyle = isSel || isHov
            ? `${pos.node.color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`
            : `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = isSel ? 2 : isHov ? 1.5 : 0.6;
          ctx.stroke();

          // Energy pulse on selected connections
          if (isSel) {
            const pulseT = (time * 0.5) % 1;
            const px = cX + (pos.x - cX) * pulseT;
            const py = cY + (pos.y - cY) * pulseT;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fillStyle = `${pos.node.color}90`;
            ctx.fill();
          }
        }

        // Center hub
        ctx.beginPath();
        drawRoundRect(ctx, cX - 36, cY - 26, 72, 52, 12);
        ctx.fillStyle = "rgba(9, 9, 11, 0.95)";
        ctx.fill();
        ctx.strokeStyle = "rgba(139, 92, 246, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "700 9px 'Geist Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#8b5cf6";
        ctx.fillText("AI & DATA", cX, cY - 3);
        ctx.font = "600 7px 'Geist Mono', monospace";
        ctx.fillStyle = "rgba(82, 82, 91, 0.8)";
        ctx.fillText("SYSTEMS", cX, cY + 10);

        // Draw nodes
        for (const pos of positions) {
          const isSel = selectedRef.current === pos.node.name;
          const isHov = hoveredRef.current === pos.node.name;
          const nodeSize = isSel ? 30 : isHov ? 28 : 24;

          // Glow backdrop
          if (isSel || isHov) {
            const glowGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, nodeSize * 2.2);
            glowGrad.addColorStop(0, `${pos.node.color}25`);
            glowGrad.addColorStop(1, `${pos.node.color}00`);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, nodeSize * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();
          }

          // Node boundary box
          ctx.beginPath();
          drawRoundRect(ctx, pos.x - nodeSize, pos.y - nodeSize, nodeSize * 2, nodeSize * 2, nodeSize * 0.4);
          ctx.fillStyle = isSel ? `${pos.node.color}20` : isHov ? `${pos.node.color}12` : "rgba(9,9,11,0.92)";
          ctx.fill();
          ctx.strokeStyle = isSel ? `${pos.node.color}75` : isHov ? `${pos.node.color}40` : "rgba(255,255,255,0.06)";
          ctx.lineWidth = isSel ? 2 : 1;
          ctx.stroke();

          // Outer glowing halo ring
          if (isSel || isHov) {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, nodeSize + 5, 0, Math.PI * 2);
            ctx.strokeStyle = isSel ? `${pos.node.color}35` : `${pos.node.color}15`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Icon text placeholder
          ctx.font = `${isSel || isHov ? "600" : "400"} ${nodeSize * 0.55}px 'Geist Mono', monospace`;
          ctx.textAlign = "center";
          ctx.fillStyle = isSel || isHov ? pos.node.color : "rgba(161,161,170,0.7)";
          ctx.fillText(pos.node.name.substring(0, 2).toUpperCase(), pos.x, pos.y + nodeSize * 0.18);

          // Label
          ctx.font = `600 ${isSel ? 11 : 10}px 'Geist Mono', monospace`;
          ctx.textAlign = "center";
          ctx.fillStyle = isSel ? pos.node.color : isHov ? pos.node.color : "rgba(82,82,91,0.8)";
          ctx.fillText(pos.node.name, pos.x, pos.y + nodeSize + 16);
        }
      } catch (err) {
        console.error("Skills Canvas Render Error:", err);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse interactions
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      const positions = getNodePositions(w, h, rotationRef.current);
      let found = false;
      for (const pos of positions) {
        const dx = mouseRef.current.x - pos.x;
        const dy = mouseRef.current.y - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) {
          onHover(pos.node.name);
          container.style.cursor = "pointer";
          found = true;
          break;
        }
      }
      if (!found) {
        onLeave();
        container.style.cursor = "default";
      }
    };

    const onClick = () => {
      const positions = getNodePositions(w, h, rotationRef.current);
      for (const pos of positions) {
        const dx = mouseRef.current.x - pos.x;
        const dy = mouseRef.current.y - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) {
          onSelect(pos.node);
          break;
        }
      }
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);
    container.addEventListener("mouseleave", () => { onLeave(); container.style.cursor = "default"; });

    // IntersectionObserver — pause canvas when skills section is out of view
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
      container.removeEventListener("click", onClick);
    };
  }, [getNodePositions, onSelect, onHover, onLeave]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}

/* ====================================================
   SKILLS SECTION
   ==================================================== */

export default function SkillsSection() {
  const [selected, setSelected] = useState<SkillNodeData>(SKILL_NODES[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleSelect = useCallback((node: SkillNodeData) => setSelected(node), []);
  const handleHover = useCallback((name: string) => setHovered(name), []);
  const handleLeave = useCallback(() => setHovered(null), []);

  return (
    <section
      id="skills"
      className="relative section-spacing select-none"
      style={{
        background: `
          radial-gradient(ellipse 50% 50% at 35% 50%, rgba(139, 92, 246, 0.04), transparent 60%),
          radial-gradient(ellipse 50% 50% at 65% 50%, rgba(59, 130, 246, 0.03), transparent 60%),
          var(--bg-primary)`,
      }}
    >
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="label-uppercase" style={{ color: "var(--text-faint)", display: "block", marginBottom: "0.75rem" }}>
            What I Know
          </span>
          <h2 style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            background: "linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            marginBottom: "0.75rem",
          }}>
            <Network size={24} style={{ color: "var(--accent-violet)", opacity: 0.8 }} />
            Engineering Knowledge Graph
          </h2>
          <p className="text-small" style={{ maxWidth: 520, margin: "0 auto" }}>
            Interactive rotating skill map. Click any node to explore related projects and technologies.
          </p>
        </motion.div>

        {/* Graph + Panel grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", alignItems: "start", minHeight: 480 }}
             className="lg:!grid-cols-[58%_42%]"
        >
          {/* Graph Area */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              height: 480,
              position: "relative",
              borderRadius: 20,
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              overflow: "hidden",
            }}
          >
            {/* Grid dots */}
            <div className="absolute inset-0 bg-dots pointer-events-none" style={{ opacity: 0.15 }} />

            <KnowledgeGraphCanvas
              selected={selected}
              hovered={hovered}
              onSelect={handleSelect}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          </motion.div>

          {/* Information Panel */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                style={{
                  borderRadius: 20,
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top accent */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${selected.color}, ${selected.color}60)`,
                  opacity: 0.7,
                }} />

                {/* Panel header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "1rem", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color: selected.color,
                  }}>
                    {selected.name}
                  </span>
                  <span className="chip" style={{ borderColor: `${selected.color}30`, color: selected.color }}>{selected.category}</span>
                </div>

                {/* Summary */}
                <p className="text-small" style={{ lineHeight: 1.7 }}>{selected.summary}</p>

                {/* Related Projects */}
                <div>
                  <div className="label-uppercase" style={{ marginBottom: "0.5rem", color: "var(--text-faint)" }}>Related Projects</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {selected.projects.map(proj => (
                      <div key={proj} style={{ fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: selected.color, opacity: 0.5, flexShrink: 0 }} />
                        {proj}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <div className="label-uppercase" style={{ marginBottom: "0.375rem", color: "var(--text-faint)" }}>Experience</div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    {selected.experience}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <div className="label-uppercase" style={{ marginBottom: "0.5rem", color: "var(--text-faint)" }}>Technologies</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {selected.technologies.map(tech => (
                      <span key={tech} className="chip" style={{ borderColor: `${selected.color}20` }}>{tech}</span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {selected.certifications.length > 0 && (
                  <div>
                    <div className="label-uppercase" style={{ marginBottom: "0.5rem", color: "var(--text-faint)" }}>Certifications</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                      {selected.certifications.map(cert => (
                        <span key={cert} className="chip" style={{ borderColor: `${selected.color}20` }}>{cert}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .lg\\:!grid-cols-\\[58\\%_42\\%\\] {
            grid-template-columns: 58% 42% !important;
          }
        }
      `}</style>
    </section>
  );
}
