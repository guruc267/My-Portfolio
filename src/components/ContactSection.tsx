"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PROFILE } from "@/utils/mockData";
import { Mail, Link2, GitBranch, Download, ExternalLink } from "lucide-react";

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    color: "#06b6d4",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "K. Guru Charan",
    href: PROFILE.linkedin,
    color: "#3b82f6",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "@guruc267",
    href: PROFILE.github,
    color: "#a78bfa",
  },
  {
    icon: Download,
    label: "Resume",
    value: "View PDF",
    href: "/resume.pdf",
    color: "#8b5cf6",
  },
];

export default function ContactSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setMousePos({ x, y });
  };

  return (
    <section id="contact" className="relative section-spacing">
      <div className="container-main" style={{ maxWidth: 720 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span className="label-uppercase" style={{ color: "var(--text-faint)", display: "block", marginBottom: "0.75rem" }}>
            Get In Touch
          </span>
          <h2 style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            background: "linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}>
            Let&apos;s Build Something Meaningful
          </h2>
          <p className="text-small" style={{ maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            I&apos;m currently seeking opportunities as an AI/ML Engineer or Data Analyst.
            Let&apos;s connect and explore how we can create intelligent systems together.
          </p>
        </motion.div>

        {/* 3D Contact Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            borderRadius: 20,
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(139,92,246,0.04), rgba(59,130,246,0.03), var(--bg-card))",
            border: "1px solid var(--border-default)",
            transform: `perspective(800px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
            transition: "transform 0.15s ease",
          }}
        >
          {/* Shimmer overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(400px circle at ${50 + mousePos.x * 5}% ${50 + mousePos.y * 5}%, rgba(139,92,246,0.04), transparent 60%)`,
            }}
          />

          {/* Top accent */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)",
            opacity: 0.6,
          }} />

          <div style={{ position: "relative", zIndex: 10 }}>
            {/* Name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: 4,
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {PROFILE.name}
              </h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                {PROFILE.title} · {PROFILE.subtitle}
              </p>
            </div>

            {/* Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    borderRadius: 14,
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border-subtle)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${link.color}35`;
                    e.currentTarget.style.transform = "translateX(6px)";
                    e.currentTarget.style.boxShadow = `0 2px 20px ${link.color}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <link.icon size={18} style={{ color: link.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="label-uppercase" style={{ fontSize: "0.5625rem", marginBottom: 2 }}>{link.label}</div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--text-secondary)" }}>
                      {link.value}
                    </div>
                  </div>
                  <ExternalLink size={13} style={{ color: "var(--text-faint)", flexShrink: 0 }} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginTop: "4rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <p style={{ fontSize: "0.6875rem", color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} {PROFILE.name}.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
