"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/utils/mockData";
import { GitBranch, X, ArrowRight, AlertCircle, CheckCircle2, LayoutGrid, TrendingUp, Sparkles } from "lucide-react";

/* Case study data */
interface CaseStudy {
  problem: string;
  research: string;
  architecture: string[];
  implementation: string;
  results: string[];
  impact: string;
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  "crop-monitoring": {
    problem: "Agricultural fields are vast, making manual inspection of crop health slow and inefficient. Delayed detection of diseases or nutrient deficiencies leads to reduced yields and financial losses.",
    research: "Investigated multispectral satellite imagery analysis techniques. Studied NDVI (Normalized Difference Vegetation Index) as a vegetation health indicator using red and near-infrared spectral bands.",
    architecture: ["Sentinel-2 multispectral band ingestion", "OpenCV red & near-infrared channel extraction", "Pixel-level NDVI computation pipeline", "Random Forest multi-class classifier", "Spatial heatmap generation for distressed sectors"],
    implementation: "Built an end-to-end precision agriculture system. Downloads Sentinel-2 bands, extracts spectral channels using OpenCV, computes NDVI values, and classifies fields using a trained Random Forest model.",
    results: ["94.2% multi-class crop health classification accuracy", "5,000+ data coordinates processed and analyzed", "80% reduction in manual inspection overhead"],
    impact: "Enabled scalable, automated crop health monitoring that can be deployed across large agricultural regions, providing actionable insights for farmers and agronomists.",
  },
  gdp360: {
    problem: "Global economic data across 195 countries is scattered, inconsistently formatted, and difficult to query, preventing efficient high-level comparative analysis.",
    research: "Evaluated ETL pipeline tools for data normalization. Designed relational star schemas for optimal dashboard query performance across multiple economic dimensions.",
    architecture: ["SQL extraction of historical economic indicators", "Alteryx ETL workflows for data cleaning & normalization", "Relational star-schema design in Power BI", "DAX-powered interactive filtering & KPI reporting"],
    implementation: "Designed an interactive GDP analytics warehouse. Extracted 50K+ data points using SQL, built Alteryx ETL pipelines for normalization, and modeled a star schema in Power BI with executive dashboards.",
    results: ["195 countries merged with 100% data consistency", "Dashboard query response under 12ms", "Replaced manual spreadsheet operations with automated ETL"],
    impact: "Transformed scattered global economic data into an interactive intelligence platform enabling rapid cross-country economic analysis.",
  },
  "ginger-detection": {
    problem: "Commercial ginger adulteration is a food safety risk requiring expensive lab-based chemical validation, making rapid quality screening impossible at supply hubs.",
    research: "Explored computer vision approaches for food quality classification. Evaluated texture analysis (GLCM) and color histogram features for distinguishing pure vs. adulterated specimens.",
    architecture: ["Standardized specimen image capture pipeline", "OpenCV HSV color band & texture parameter extraction", "GLCM feature engineering for texture analysis", "SVM classification model training & validation"],
    implementation: "Designed a computer vision system that captures ginger images, extracts texture and color features using OpenCV, and classifies adulteration using a trained SVM classifier.",
    results: ["91.5% prediction accuracy on validation set", "1,200+ high-resolution specimens in training dataset", "Screening time reduced from days to milliseconds"],
    impact: "Enabled instant, non-destructive quality screening at supply chain checkpoints, dramatically reducing testing costs and time.",
  },
  "blinkit-analytics": {
    problem: "Fast-grocery retail faces high inventory wastage and stockouts due to volatile consumer demand patterns across different outlet types.",
    research: "Compared ensemble regression methods for demand forecasting. Analyzed feature importance across categorical attributes including outlet size, product type, and geography.",
    architecture: ["Transaction data loading & missing value resolution", "Categorical feature engineering (outlet, product, geo)", "XGBoost & Random Forest regressor training pipelines", "Predictive demand matrix output for replenishment"],
    implementation: "Built predictive analytics models comparing XGBoost and Random Forest regressors on historical transaction records. Engineered categorical features for multi-dimensional sales forecasting.",
    results: ["XGBoost R² validation score of 0.738", "Random Forest R² score of 0.503", "8,500+ items in the training dataset"],
    impact: "Provided data-driven demand forecasting models enabling smarter inventory management and reduced wastage for retail operations.",
  },
  "chitti-ai": {
    problem: "Standard rule-based portfolio chatbots lack contextual understanding, providing generic answers and poor recruiter engagement.",
    research: "Implemented TF-IDF vectorization for intent classification. Designed a mapping system connecting tokenized queries to structured portfolio data.",
    architecture: ["Natural language query input processing", "TF-IDF vector matrix tokenization", "Intent coordinate matching to portfolio data", "Flask micro-service with JSON response API"],
    implementation: "Developed an intelligent chatbot with intent recognition using TF-IDF tokenizers on a Flask backend, providing responsive conversational answers from structured candidate data.",
    results: ["88% intent classification accuracy", "Response round-trips under 200ms latency", "Clean fallback states routing to direct contact"],
    impact: "Created a conversational interface that engages recruiters with contextual, accurate portfolio information rather than static content.",
  },
};

const CARD_GRADIENTS: Record<string, { from: string; to: string; accent: string }> = {
  "crop-monitoring": { from: "#10b981", to: "#06b6d4", accent: "rgba(16, 185, 129, 0.15)" },
  gdp360: { from: "#3b82f6", to: "#8b5cf6", accent: "rgba(59, 130, 246, 0.15)" },
  "ginger-detection": { from: "#f59e0b", to: "#ef4444", accent: "rgba(245, 158, 11, 0.15)" },
  "blinkit-analytics": { from: "#06b6d4", to: "#3b82f6", accent: "rgba(6, 182, 212, 0.15)" },
  "chitti-ai": { from: "#8b5cf6", to: "#ec4899", accent: "rgba(139, 92, 246, 0.15)" },
};

/* Project Card */
function ProjectCard({ project, index, onExpand }: { project: Project; index: number; onExpand: () => void }) {
  const grad = CARD_GRADIENTS[project.id] || { from: "#8b5cf6", to: "#3b82f6", accent: "rgba(139,92,246,0.15)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onClick={onExpand}
      className="group cursor-pointer shine-sweep-card"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 20,
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        e.currentTarget.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
        e.currentTarget.style.borderColor = `${grad.from}40`;
        e.currentTarget.style.boxShadow = `0 8px 40px ${grad.from}15, 0 0 30px ${grad.from}08`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top gradient accent line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${grad.from}, ${grad.to})`,
        opacity: 0.6,
      }} />

      {/* Hover glow overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "40%",
        background: `linear-gradient(180deg, ${grad.accent}, transparent)`,
        opacity: 0,
        transition: "opacity 0.4s",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
           <span style={{
            fontSize: "2rem",
            width: 48,
            height: 48,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: grad.accent,
            border: `1px solid ${grad.from}20`,
            animation: "float-3d 6s ease-in-out infinite",
            transformStyle: "preserve-3d" as const,
            boxShadow: `0 4px 20px ${grad.from}15, 0 0 30px ${grad.from}06`,
          }}>
            {project.icon}
          </span>
          <span style={{
            fontSize: "0.625rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            padding: "0.25rem 0.625rem",
            borderRadius: 6,
            background: `${grad.from}15`,
            color: grad.from,
            border: `1px solid ${grad.from}25`,
          }}>
            Case Study
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "0.9375rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.25rem",
          lineHeight: 1.3,
        }}>
          {project.title}
        </h3>
        <p style={{
          fontSize: "0.625rem",
          fontFamily: "'Geist Mono', monospace",
          textTransform: "uppercase" as const,
          letterSpacing: "0.1em",
          color: "var(--text-faint)",
          marginBottom: "0.75rem",
        }}>
          {project.tagline}
        </p>

        {/* Description */}
        <p style={{
          fontSize: "0.75rem",
          lineHeight: 1.65,
          color: "var(--text-muted)",
          marginBottom: "1rem",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical" as const,
          overflow: "hidden",
        }}>
          {CASE_STUDIES[project.id]?.problem}
        </p>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Metrics */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          padding: "0.875rem 0",
          marginBottom: "0.75rem",
          borderTop: "1px solid var(--border-subtle)",
        }}>
          {project.metrics.slice(0, 2).map(m => (
            <div key={m.label}>
              <div style={{ fontSize: "0.5625rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-faint)", marginBottom: "0.125rem" }}>
                {m.label}
              </div>
              <div style={{
                fontSize: "0.875rem",
                fontWeight: 800,
                fontFamily: "'Geist Mono', monospace",
                background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="chip" style={{ fontSize: "0.5625rem" }}>{tech}</span>
          ))}
          {project.techStack.length > 3 && (
            <span style={{ fontSize: "0.5625rem", color: "var(--text-faint)", display: "flex", alignItems: "center" }}>
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* Project Story Mode */
function ProjectStory({ project, onClose }: { project: Project; onClose: () => void }) {
  const cs = CASE_STUDIES[project.id];
  if (!cs) return null;
  const grad = CARD_GRADIENTS[project.id] || { from: "#8b5cf6", to: "#3b82f6", accent: "rgba(139,92,246,0.15)" };

  const stages = [
    { label: "Problem", icon: AlertCircle, color: "#f43f5e", content: cs.problem },
    { label: "Research", icon: TrendingUp, color: "#f59e0b", content: cs.research },
    { label: "Architecture", icon: LayoutGrid, color: "#06b6d4", content: null, list: cs.architecture },
    { label: "Implementation", icon: CheckCircle2, color: "#10b981", content: cs.implementation },
    { label: "Results", icon: Sparkles, color: "#3b82f6", content: null, list: cs.results },
    { label: "Impact", icon: CheckCircle2, color: "#8b5cf6", content: cs.impact },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        cursor: "zoom-out",
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 30, opacity: 0, rotateX: 8 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.92, y: 20, opacity: 0, rotateX: -4 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 740,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          borderRadius: 20,
          padding: "2rem",
          cursor: "default",
          position: "relative",
          background: "rgba(9, 9, 11, 0.95)",
          border: `1px solid ${grad.from}25`,
          boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 80px ${grad.from}08, inset 0 1px 0 rgba(255,255,255,0.03)`,
          perspective: "1000px",
        }}
      >
        {/* Sci-fi scanning line animation */}
        <motion.div
          initial={{ top: "0%" }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${grad.from}40, transparent)`,
            pointerEvents: "none",
            zIndex: 20,
          }}
        />

        {/* Corner accents — sci-fi brackets */}
        {[
          { top: 0, left: 0, borderTop: `2px solid ${grad.from}60`, borderLeft: `2px solid ${grad.from}60`, borderRadius: "20px 0 0 0" },
          { top: 0, right: 0, borderTop: `2px solid ${grad.to}60`, borderRight: `2px solid ${grad.to}60`, borderRadius: "0 20px 0 0" },
          { bottom: 0, left: 0, borderBottom: `2px solid ${grad.from}40`, borderLeft: `2px solid ${grad.from}40`, borderRadius: "0 0 0 20px" },
          { bottom: 0, right: 0, borderBottom: `2px solid ${grad.to}40`, borderRight: `2px solid ${grad.to}40`, borderRadius: "0 0 20px 0" },
        ].map((pos, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              pointerEvents: "none",
              zIndex: 15,
              ...pos,
            }}
          />
        ))}

        {/* Accent line top — gradient pulse */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            borderRadius: "20px 20px 0 0",
            background: `linear-gradient(90deg, ${grad.from}, ${grad.to})`,
            transformOrigin: "left",
            boxShadow: `0 0 15px ${grad.from}50`,
          }}
        />

        {/* Holographic overlay */}
        <motion.div
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.02, 0.06, 0.02] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            pointerEvents: "none",
            background: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,92,246,0.01) 2px, rgba(139,92,246,0.01) 4px),
              radial-gradient(ellipse at 30% 20%, ${grad.from}06, transparent 60%)`,
          }}
        />

        {/* Close */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1, borderColor: `${grad.from}50` }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            padding: 8,
            borderRadius: 10,
            cursor: "pointer",
            color: "var(--text-muted)",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${grad.from}20`,
            transition: "all 0.2s",
            zIndex: 20,
          }}
        >
          <X size={14} />
        </motion.button>

        {/* Header — data file access style */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingBottom: "1.25rem",
            marginBottom: "1.5rem",
            borderBottom: `1px solid ${grad.from}15`,
          }}
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            style={{
              fontSize: "1.75rem",
              width: 56,
              height: 56,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: grad.accent,
              border: `1px solid ${grad.from}25`,
              boxShadow: `0 0 20px ${grad.from}15`,
            }}
          >
            {project.icon}
          </motion.span>
          <div>
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="label-uppercase"
              style={{
                marginBottom: 4,
                display: "block",
                color: grad.from,
                fontFamily: "'Geist Mono', monospace",
                letterSpacing: "0.12em",
              }}
            >
              ▸ CLASSIFIED PROJECT FILE
            </motion.span>
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)" }}>{project.title}</h2>
            <p style={{ fontSize: "0.75rem", fontFamily: "'Geist Mono', monospace", color: "var(--text-muted)", marginTop: 2 }}>{project.tagline}</p>
          </div>
        </motion.div>

        {/* Story flow — staggered data stream */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <h4 style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  color: "var(--text-primary)",
                }}>
                  <span style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${stage.color}12`,
                    border: `1px solid ${stage.color}20`,
                  }}>
                    <Icon size={12} style={{ color: stage.color }} />
                  </span>
                  <span style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>{stage.label}</span>
                  {i < stages.length - 1 && (
                    <ArrowRight size={10} style={{ color: "var(--text-faint)", marginLeft: "auto" }} />
                  )}
                </h4>
                {stage.content ? (
                  <p className="text-small" style={{ lineHeight: 1.7, paddingLeft: "2.25rem" }}>{stage.content}</p>
                ) : stage.list ? (
                  <div style={{
                    padding: "0.875rem",
                    marginLeft: "2.25rem",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${stage.color}12`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}>
                    {stage.list.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 + idx * 0.05 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.5rem",
                          fontSize: "0.75rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        <span style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          marginTop: 5,
                          flexShrink: 0,
                          background: stage.color,
                          opacity: 0.6,
                          boxShadow: `0 0 6px ${stage.color}40`,
                        }} />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        {/* Tech stack + link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: `1px solid ${grad.from}12` }}
        >
          <div className="label-uppercase" style={{ marginBottom: "0.5rem", fontFamily: "'Geist Mono', monospace" }}>Technologies Used</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1rem" }}>
            {project.techStack.map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.95 + idx * 0.04 }}
                className="chip"
                style={{ borderColor: `${grad.from}18` }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{
            fontSize: "0.75rem",
            borderColor: `${grad.from}20`,
          }}>
            <GitBranch size={14} />
            View Source Code
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* Projects Section */
export default function ProjectsSection() {
  const [expanded, setExpanded] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative section-spacing select-none">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="label-uppercase" style={{ color: "var(--text-faint)", display: "block", marginBottom: "0.75rem" }}>
            What I&apos;ve Built
          </span>
          <h2 style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            background: "linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.75rem",
          }}>
            Featured Projects
          </h2>
          <p className="text-small" style={{ maxWidth: 480, margin: "0 auto" }}>
            End-to-end engineering case studies. Click to explore the full story.
          </p>
        </motion.div>

        {/* Project grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onExpand={() => setExpanded(project)} />
          ))}
        </div>

        {/* Story modal */}
        <AnimatePresence>
          {expanded && <ProjectStory project={expanded} onClose={() => setExpanded(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
