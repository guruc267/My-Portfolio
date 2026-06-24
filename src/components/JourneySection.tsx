"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Eye, Award, Briefcase, Rocket, Star } from "lucide-react";

const MILESTONES = [
  {
    year: "2022",
    title: "Started AI & Machine Learning",
    description: "Began exploring Python, data structures, and fundamental ML concepts. Built first data analysis projects and entered competitive programming.",
    icon: BookOpen,
    accent: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    highlight: "Core Algorithm Development",
  },
  {
    year: "2023",
    title: "Computer Vision Projects",
    description: "Developed Ginger Adulteration Detection using OpenCV + SVM (91.5% accuracy) and Crop Monitoring using satellite imagery with NDVI analysis.",
    icon: Eye,
    accent: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    highlight: "91.5% CV Classification Accuracy",
  },
  {
    year: "2024",
    title: "AWS Machine Learning Certification",
    description: "Earned AWS Machine Learning Specialty certification. Participated in hackathons. Built the Chitti AI Chatbot with NLP intent classification.",
    icon: Award,
    accent: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    highlight: "AWS Specialty Certified",
  },
  {
    year: "2025",
    title: "Data Analytics & Predictive Systems",
    description: "Mastered Power BI, Alteryx ETL, and advanced SQL. Built GDP360 Analytics Dashboard (195 countries), Blinkit Sales Prediction (XGBoost R²=0.738).",
    icon: Briefcase,
    accent: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    highlight: "XGBoost R²=0.738 Sales Forecast",
  },
  {
    year: "2026",
    title: "AI Engineer — Seeking Opportunities",
    description: "Building production-ready AI/ML systems. Combining predictive modeling, computer vision, and business intelligence into complete engineering solutions.",
    icon: Rocket,
    accent: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    highlight: "Production-ready AI Architectures",
  },
];

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Grow vertical timeline gradient line based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative section-spacing"
      style={{
        background: `
          radial-gradient(ellipse 60% 40% at 20% 50%, rgba(139, 92, 246, 0.03), transparent 60%),
          radial-gradient(ellipse 50% 40% at 80% 50%, rgba(59, 130, 246, 0.03), transparent 60%),
          var(--bg-primary)`,
      }}
    >
      <div className="container-main" style={{ maxWidth: 840 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "4.5rem" }}
        >
          <span className="label-uppercase" style={{ color: "var(--text-faint)", display: "block", marginBottom: "0.75rem" }}>
            Career Journey
          </span>
          <h2 style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            background: "linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
          }}>
            The Path So Far
          </h2>
          <p className="text-small" style={{ maxWidth: 420, margin: "0 auto" }}>
            Five years of building, learning, and creating intelligent systems.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div style={{ position: "relative", paddingLeft: "1rem" }} className="sm:!pl-[3rem]">
          
          {/* Base Background Line (Faint Gray) */}
          <div style={{
            position: "absolute",
            left: 36,
            top: 24,
            bottom: 24,
            width: 2,
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 2,
          }} />

          {/* Active Growing Line (Glowing Neon Gradient) */}
          <motion.div
            style={{
              position: "absolute",
              left: 36,
              top: 24,
              bottom: 24,
              width: 2,
              background: "linear-gradient(180deg, #3b82f6, #06b6d4, #f59e0b, #10b981, #8b5cf6)",
              borderRadius: 2,
              scaleY,
              originY: 0,
              boxShadow: "0 0 10px rgba(139, 92, 246, 0.4)",
            }}
          />

          {MILESTONES.map((milestone, i) => {
            const Icon = milestone.icon;
            const isLast = i === MILESTONES.length - 1;

            return (
              <div
                key={milestone.year}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: isLast ? 0 : "3.5rem",
                  position: "relative",
                }}
              >
                {/* Timeline node */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", paddingTop: 4, width: 72 }}>
                  {/* Glowing Year badge */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, delay: i * 0.12 }}
                    whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${milestone.accent}40`, borderColor: `${milestone.accent}80` }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(9, 9, 11, 0.9)",
                      border: `1px solid ${milestone.accent}30`,
                      position: "relative",
                      zIndex: 2,
                      cursor: "pointer",
                      boxShadow: `0 4px 15px rgba(0, 0, 0, 0.3), 0 0 12px ${milestone.accent}12`,
                      transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
                      animation: "pulse-glow-3d 3s ease-in-out infinite",
                    }}
                  >
                    <Icon size={18} style={{ color: milestone.accent }} />
                  </motion.div>

                  {/* Year text label */}
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: "0.8125rem",
                      fontWeight: 800,
                      background: milestone.gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {milestone.year}
                  </motion.span>
                </div>

                {/* Content card */}
                <motion.div
                  initial={{ opacity: 0, x: 45 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  style={{
                    flex: 1,
                    padding: "1.75rem",
                    borderRadius: 18,
                    background: "rgba(255, 255, 255, 0.015)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "default",
                    transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
                    e.currentTarget.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
                    e.currentTarget.style.borderColor = `${milestone.accent}35`;
                    e.currentTarget.style.boxShadow = `0 8px 30px rgba(0, 0, 0, 0.35), 0 0 25px ${milestone.accent}08`;
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.035)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.015)";
                  }}
                >
                  {/* Decorative glowing gradient top bar */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: milestone.gradient,
                    opacity: 0.45,
                  }} />

                  {/* Header info */}
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <h3 style={{
                      fontSize: "1.0625rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}>
                      {milestone.title}
                    </h3>

                    {/* Milestone Highlight Badge */}
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      fontFamily: "'Geist Mono', monospace",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                      background: `${milestone.accent}15`,
                      border: `1px solid ${milestone.accent}25`,
                      color: milestone.accent,
                      letterSpacing: "0.02em",
                      boxShadow: `0 0 8px ${milestone.accent}08`,
                    }}>
                      <Star size={10} style={{ color: milestone.accent, fill: milestone.accent }} />
                      {milestone.highlight}
                    </span>
                  </div>

                  <p style={{
                    fontSize: "0.8125rem",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                  }}>
                    {milestone.description}
                  </p>

                  {/* Highlight indicator for current (2026) */}
                  {isLast && (
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      marginTop: "1rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: 100,
                      background: `${milestone.accent}15`,
                      border: `1px solid ${milestone.accent}30`,
                    }}>
                      <span style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: milestone.accent,
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }} />
                      <span style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        color: milestone.accent,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}>
                        Current Target
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
