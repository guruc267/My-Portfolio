"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROFILE } from "@/utils/mockData";
import { GraduationCap, Star, Award, MapPin, Target, Lightbulb, Users, Rocket, Brain, Code2, Database, Eye } from "lucide-react";
import Image from "next/image";

const HIGHLIGHTS = [
  { icon: GraduationCap, label: "B.Tech AI & ML", sublabel: "SRMIST, Chennai", color: "#3b82f6" },
  { icon: Star, label: "9.22 CGPA", sublabel: "Top Percentile", color: "#f59e0b" },
  { icon: Award, label: "AWS ML Certified", sublabel: "Specialty", color: "#10b981" },
  { icon: MapPin, label: "Chennai, India", sublabel: "Final Year", color: "#8b5cf6" },
];

const EXPERTISE = [
  { icon: Brain, label: "Machine Learning", desc: "Scikit-Learn, XGBoost, Random Forest, SVM", color: "#8b5cf6" },
  { icon: Eye, label: "Computer Vision", desc: "OpenCV, Image Processing, GLCM, NDVI", color: "#06b6d4" },
  { icon: Database, label: "Data Analytics", desc: "Power BI, SQL, Alteryx ETL, DAX", color: "#3b82f6" },
  { icon: Code2, label: "AI Engineering", desc: "C++, Python, Flask, NLP, TF-IDF, REST APIs", color: "#10b981" },
];

const TRAITS = [
  { icon: Target, label: "Problem Solver", desc: "Tackling complex challenges with elegant AI solutions.", num: "01", color: "#3b82f6" },
  { icon: Lightbulb, label: "Continuous Learner", desc: "Always exploring cutting-edge technologies and methods.", num: "02", color: "#f59e0b" },
  { icon: Rocket, label: "Impact Focused", desc: "Building solutions that deliver measurable business value.", num: "03", color: "#10b981" },
  { icon: Users, label: "Collaborative", desc: "Thriving in diverse teams working toward shared goals.", num: "04", color: "#8b5cf6" },
];

export default function AboutMeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section id="about" ref={sectionRef} className="relative" style={{ overflow: "hidden", padding: "6rem 0 5rem" }}>
      {/* Parallax ambient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 15% 20%, rgba(139, 92, 246, 0.05), transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 80%, rgba(59, 130, 246, 0.04), transparent 60%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(6, 182, 212, 0.02), transparent 50%)`,
        }} />
      </motion.div>

      <div className="container-main" style={{ position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="label-uppercase" style={{
            color: "rgba(139, 92, 246, 0.7)",
            display: "block",
            marginBottom: "0.75rem",
            fontFamily: "'Geist Mono', monospace",
            letterSpacing: "0.15em",
          }}>
            ▸ ABOUT ME
          </span>
          <h2 style={{
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #ffffff 30%, rgba(139, 92, 246, 0.8) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}>
            The Engineer Behind The Code
          </h2>
          <p style={{
            fontSize: "0.875rem",
            color: "var(--text-muted)",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Bridging the gap between research and real-world applications
            through intelligent, scalable solutions.
          </p>
        </motion.div>

        {/* ===== ROW 1: Profile Photo + Bio + Highlights ===== */}
        <div className="about-hero-row" style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "3rem",
          alignItems: "start",
          marginBottom: "3rem",
        }}>
          {/* Left — Photo card with glow */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              background: "var(--bg-card)",
              border: "1px solid rgba(139, 92, 246, 0.12)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 100px rgba(139, 92, 246, 0.04)",
              transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
              const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
              e.currentTarget.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
              e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 100px rgba(139, 92, 246, 0.08)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
              e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3), 0 0 100px rgba(139, 92, 246, 0.04)";
            }}
            >
              {/* Top gradient */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4)",
                zIndex: 2,
              }} />

              {/* Profile image */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden" }}>
                <Image
                  src="/profile.jpeg"
                  alt="K. Guru Charan"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                {/* Bottom gradient */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(to top, rgba(9, 9, 11, 0.95), rgba(9,9,11,0.4), transparent)",
                }} />
              </div>

              {/* Name overlay */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1.25rem 1.5rem",
                zIndex: 2,
              }}>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 4,
                  letterSpacing: "-0.02em",
                }}>
                  {PROFILE.name}
                </h3>
                <p style={{
                  fontSize: "0.625rem",
                  color: "rgba(139, 92, 246, 0.85)",
                  fontFamily: "'Geist Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}>
                  {PROFILE.title} · {PROFILE.subtitle}
                </p>
              </div>

              {/* Decorative corner brackets on photo */}
              {[
                { top: 8, left: 8, borderTop: "2px solid rgba(139,92,246,0.3)", borderLeft: "2px solid rgba(139,92,246,0.3)" },
                { top: 8, right: 8, borderTop: "2px solid rgba(59,130,246,0.3)", borderRight: "2px solid rgba(59,130,246,0.3)" },
                { bottom: 8, left: 8, borderBottom: "2px solid rgba(139,92,246,0.2)", borderLeft: "2px solid rgba(139,92,246,0.2)" },
                { bottom: 8, right: 8, borderBottom: "2px solid rgba(6,182,212,0.2)", borderRight: "2px solid rgba(6,182,212,0.2)" },
              ].map((pos, idx) => (
                <div key={idx} style={{
                  position: "absolute",
                  width: 16,
                  height: 16,
                  zIndex: 3,
                  pointerEvents: "none",
                  ...pos,
                }} />
              ))}
            </div>
          </motion.div>

          {/* Right — Bio content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h3 style={{
                fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
                lineHeight: 1.15,
              }}>
                <span style={{ color: "var(--text-primary)" }}>K. Guru </span>
                <span style={{
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Charan</span>
              </h3>

              <p style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                background: "linear-gradient(90deg, #8b5cf6, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "1.25rem",
              }}>
                AI/ML Engineer & Data Analytics Enthusiast
              </p>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginBottom: "1.75rem",
              }}>
                <p style={{
                  fontSize: "0.8125rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                }}>
                  I am a final-year B.Tech student specializing in Artificial Intelligence and Machine Learning at SRM Institute of Science and Technology, with a CGPA of 9.22. My work focuses on building practical AI solutions that transform complex data into meaningful insights and real-world impact.
                </p>
                <p style={{
                  fontSize: "0.8125rem",
                  lineHeight: 1.8,
                  color: "var(--text-muted)",
                }}>
                  I have hands-on experience in C++, Python, Machine Learning, Data Analytics, Business Intelligence, and ETL development. From satellite-based crop monitoring systems and food adulteration detection models to economic analytics dashboards and predictive retail forecasting, I enjoy solving challenging problems through data-driven engineering.
                </p>
              </div>

              {/* Quote — Mission statement */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                style={{
                  padding: "1rem 1.25rem",
                  borderRadius: 14,
                  background: "rgba(139, 92, 246, 0.04)",
                  borderLeft: "3px solid rgba(139, 92, 246, 0.4)",
                  marginBottom: "1.75rem",
                }}
              >
                <p style={{
                  fontSize: "0.8125rem",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                }}>
                  &ldquo;My goal is to bridge the gap between research and real-world applications by creating intelligent, scalable, and impactful solutions that help businesses and communities make better decisions.&rdquo;
                </p>
              </motion.div>
            </motion.div>

            {/* Highlight cards */}
            <div className="about-highlights-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.625rem",
            }}>
              {HIGHLIGHTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    style={{
                      padding: "0.875rem 0.625rem",
                      borderRadius: 14,
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${item.color}30`;
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 6px 25px ${item.color}12`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: "20%",
                      right: "20%",
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${item.color}50, transparent)`,
                    }} />
                    <Icon size={18} style={{ color: item.color, marginBottom: "0.4rem" }} />
                    <div style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 2,
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: "0.5625rem",
                      color: "var(--text-faint)",
                    }}>
                      {item.sublabel}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== ROW 2: Expertise Areas (full width) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "2.5rem" }}
        >
          <h4 style={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--text-faint)",
            fontFamily: "'Geist Mono', monospace",
            marginBottom: "1rem",
            textAlign: "center",
          }}>
            Core Expertise
          </h4>

          <div className="about-expertise-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.75rem",
          }}>
            {EXPERTISE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="shine-sweep-card"
                  style={{
                    padding: "1.25rem",
                    borderRadius: 16,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    position: "relative",
                    overflow: "hidden",
                    transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
                    e.currentTarget.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
                    e.currentTarget.style.borderColor = `${item.color}25`;
                    e.currentTarget.style.boxShadow = `0 8px 30px ${item.color}10, 0 0 40px ${item.color}05`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Background shimmer */}
                  <div style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-20%",
                    width: "140%",
                    height: "200%",
                    pointerEvents: "none",
                    background: `radial-gradient(ellipse at 30% 30%, ${item.color}05, transparent 60%)`,
                  }} />

                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${item.color}10`,
                    border: `1px solid ${item.color}18`,
                    marginBottom: "0.875rem",
                    position: "relative",
                  }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>

                  <h5 style={{
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.375rem",
                  }}>
                    {item.label}
                  </h5>
                  <p style={{
                    fontSize: "0.6875rem",
                    lineHeight: 1.6,
                    color: "var(--text-muted)",
                    fontFamily: "'Geist Mono', monospace",
                  }}>
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ===== ROW 3: What Drives Me + Trait Cards ===== */}
        <div className="about-bottom-row" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.25rem",
          alignItems: "start",
        }}>
          {/* What Drives Me — left card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              padding: "2rem",
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.04), rgba(59, 130, 246, 0.03), var(--bg-card))",
              border: "1px solid rgba(139, 92, 246, 0.1)",
              position: "relative",
              overflow: "hidden",
              height: "100%",
            }}
          >
            {/* Top accent */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, #8b5cf6, #3b82f6, transparent)",
            }} />

            {/* Decorative glow */}
            <div style={{
              position: "absolute",
              top: "-30%",
              right: "-20%",
              width: "60%",
              height: "80%",
              pointerEvents: "none",
              background: "radial-gradient(circle, rgba(139,92,246,0.04), transparent 60%)",
            }} />

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(139, 92, 246, 0.1)",
                border: "1px solid rgba(139, 92, 246, 0.15)",
              }}>
                <Rocket size={18} style={{ color: "#8b5cf6" }} />
              </div>
              <h4 style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}>
                What Drives Me
              </h4>
            </div>

            <p style={{
              fontSize: "0.8125rem",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
              marginBottom: "1.25rem",
              position: "relative",
            }}>
              My goal is to bridge the gap between research and real-world applications by creating intelligent, scalable, and impactful solutions that help businesses and communities make better decisions.
            </p>

            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}>
              {["5+ Projects", "AWS Certified", "AI & ML", "94.2% Accuracy", "End-to-End Systems"].map((tag) => (
                <span key={tag} style={{
                  padding: "0.3rem 0.65rem",
                  borderRadius: 8,
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  background: "rgba(139, 92, 246, 0.08)",
                  border: "1px solid rgba(139, 92, 246, 0.12)",
                  color: "rgba(139, 92, 246, 0.8)",
                  letterSpacing: "0.02em",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — 4 trait cards in 2x2 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}>
            {TRAITS.map((trait, i) => {
              const Icon = trait.icon;
              return (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  style={{
                    padding: "1.125rem",
                    borderRadius: 16,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${trait.color}25`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 6px 25px ${trait.color}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Faded number */}
                  <span style={{
                    position: "absolute",
                    top: 6,
                    right: 10,
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.025)",
                    fontFamily: "'Geist Mono', monospace",
                    lineHeight: 1,
                  }}>
                    {trait.num}
                  </span>

                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${trait.color}10`,
                    border: `1px solid ${trait.color}18`,
                    marginBottom: "0.625rem",
                  }}>
                    <Icon size={14} style={{ color: trait.color }} />
                  </div>

                  <h5 style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}>
                    {trait.label}
                  </h5>
                  <p style={{
                    fontSize: "0.625rem",
                    lineHeight: 1.55,
                    color: "var(--text-muted)",
                  }}>
                    {trait.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .about-hero-row {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .about-hero-row > div:first-child {
            max-width: 280px;
            margin: 0 auto;
          }
          .about-highlights-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-expertise-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-bottom-row {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .about-highlights-grid {
            grid-template-columns: 1fr !important;
          }
          .about-expertise-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
