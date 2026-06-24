"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CERTIFICATIONS } from "@/utils/mockData";
import { Award, CheckCircle2 } from "lucide-react";

const CERT_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6"];

/* 3D Tilt Card Component for Certifications */
function CertificationCard({ cert, index }: { cert: typeof CERTIFICATIONS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const color = CERT_COLORS[index % CERT_COLORS.length];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;

    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
    cardRef.current.style.borderColor = `${color}45`;
    cardRef.current.style.boxShadow = `0 8px 30px ${color}12, 0 0 20px ${color}04`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    cardRef.current.style.borderColor = "var(--border-subtle)";
    cardRef.current.style.boxShadow = "none";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{
        padding: "1.5rem",
        borderRadius: 18,
        display: "flex",
        alignItems: "flex-start",
        gap: "1.25rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="shine-sweep-card"
    >
      {/* Top glowing accent line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2.5,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        opacity: 0.65,
      }} />

      {/* Verified stamp icon */}
      <div style={{
        position: "absolute",
        top: 14,
        right: 14,
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
      }}>
        <CheckCircle2 size={11} style={{ color: color }} />
        <span style={{ fontSize: "0.5rem", fontFamily: "'Geist Mono', monospace", color: "var(--text-faint)", letterSpacing: "0.05em", fontWeight: 600 }}>
          VERIFIED
        </span>
      </div>

      {/* Emoji Icon Container */}
      <span style={{
        fontSize: "1.65rem",
        width: 50,
        height: 50,
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        background: `${color}10`,
        border: `1px solid ${color}20`,
        boxShadow: `0 4px 10px ${color}08`,
      }}>
        {cert.icon}
      </span>

      <div style={{ minWidth: 0, paddingTop: "0.2rem" }}>
        {/* Title */}
        <h3 style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.35,
          marginBottom: 4,
          paddingRight: "4rem", // Prevent collision with verified text
        }}>
          {cert.title}
        </h3>
        
        {/* Issuer */}
        <p style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          marginBottom: 8,
        }}>
          {cert.issuer}
        </p>

        {/* Year Label */}
        <span style={{
          fontSize: "0.5625rem",
          fontWeight: 700,
          fontFamily: "'Geist Mono', monospace",
          padding: "0.25rem 0.6rem",
          borderRadius: 6,
          background: `${color}12`,
          border: `1px solid ${color}22`,
          color: color,
          letterSpacing: "0.05em",
        }}>
          CLASS OF {cert.year}
        </span>
      </div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative select-none"
      style={{
        paddingTop: "7.5rem",   // Increased space to avoid any overlaps
        paddingBottom: "7.5rem", // Increased space to avoid any overlaps
        background: `
          radial-gradient(ellipse 50% 50% at 50% 50%, rgba(139, 92, 246, 0.02), transparent 70%),
          var(--bg-primary)`,
      }}
    >
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="label-uppercase" style={{ color: "var(--text-faint)", display: "block", marginBottom: "0.75rem" }}>
            Verified Credentials
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
          }}>
            <Award size={22} style={{ color: "var(--accent-amber)", opacity: 0.8 }} />
            Certifications
          </h2>
        </motion.div>

        {/* Grid of Certifications */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}>
          {CERTIFICATIONS.map((cert, i) => (
            <CertificationCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
