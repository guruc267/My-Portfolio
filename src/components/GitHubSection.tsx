"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, ExternalLink, Activity } from "lucide-react";

interface RepoData {
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  updatedAt: string;
}

const FALLBACK_REPOS: RepoData[] = [
  {
    name: "Crop-Monitoring-using-Satellite-Imagery",
    url: "https://github.com/guruc267/Crop-Monitoring-using-Satellite-Imagery",
    description: "Precision agricultural monitoring using Sentinel-2 bands, NDVI indexes, and Random Forest models.",
    language: "Python",
    stars: 3,
    updatedAt: "2026-06-10",
  },
  {
    name: "gagan-electronic-labs",
    url: "https://github.com/guruc267/gagan-electronic-labs",
    description: "Management inventory dashboard and analysis suite for laboratory components.",
    language: "JavaScript",
    stars: 2,
    updatedAt: "2026-05-24",
  },
  {
    name: "Customer-Churn-Prediction",
    url: "https://github.com/guruc267/Customer-Churn-Prediction",
    description: "Predictive model analytics to classify target client retention rates.",
    language: "Python",
    stars: 1,
    updatedAt: "2026-04-18",
  },
  {
    name: "AirTix",
    url: "https://github.com/guruc267/AirTix",
    description: "Flight reservation and ticketing application with route matching.",
    language: "HTML",
    stars: 1,
    updatedAt: "2025-12-15",
  },
];

const LANG_COLORS: Record<string, string> = {
  Python: "#3b82f6",     // Blue
  JavaScript: "#f59e0b", // Amber
  HTML: "#f43f5e",       // Rose
  CSS: "#ec4899",        // Pink
  "C++": "#8b5cf6",      // Violet
  Other: "#71717a",      // Muted
};

/* 3D Tilt Card Component for GitHub Repos */
function RepoCard({ repo, index }: { repo: RepoData; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const color = LANG_COLORS[repo.language] || LANG_COLORS.Other;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;

    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
    cardRef.current.style.borderColor = `${color}45`;
    cardRef.current.style.boxShadow = `0 8px 35px ${color}14, 0 0 25px ${color}05`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    cardRef.current.style.borderColor = "var(--border-subtle)";
    cardRef.current.style.boxShadow = "none";
  };

  return (
    <motion.a
      ref={cardRef}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="no-underline group shine-sweep-card"
      style={{
        padding: "1.5rem",
        borderRadius: 18,
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        minHeight: 150,
        transition: "border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease",
      }}
    >
      {/* Dynamic top line marker matching language color */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2.5,
        background: `linear-gradient(90deg, ${color}, ${color}40)`,
        opacity: 0.65,
      }} />

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
          {/* Language tag */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
            <span style={{ fontSize: "0.625rem", fontFamily: "'Geist Mono', monospace", fontWeight: 600, color: "var(--text-secondary)" }}>
              {repo.language}
            </span>
          </div>

          <ExternalLink size={11} style={{ color: "var(--text-faint)" }} className="group-hover:text-white transition-colors" />
        </div>

        {/* Repository Name */}
        <h4 style={{
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.4rem",
          fontFamily: "'Geist Mono', monospace",
        }} className="group-hover:text-white transition-colors">
          {repo.name}
        </h4>

        {/* Repository Description */}
        <p style={{
          fontSize: "0.75rem",
          lineHeight: 1.65,
          color: "var(--text-muted)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          margin: 0,
        }}>
          {repo.description}
        </p>
      </div>

      {/* Repo metadata */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        marginTop: "1.25rem",
        paddingTop: "0.75rem",
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.6875rem", fontFamily: "'Geist Mono', monospace", color: "var(--text-faint)" }}>
          <Star size={11} style={{ color: "var(--accent-amber)", fill: "var(--accent-amber)" }} />
          {repo.stars}
        </span>
        <span style={{ fontSize: "0.6875rem", fontFamily: "'Geist Mono', monospace", color: "var(--text-faint)", marginLeft: "auto" }}>
          UPDATED: {repo.updatedAt}
        </span>
      </div>
    </motion.a>
  );
}

export default function GitHubSection() {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [stats, setStats] = useState({ publicRepos: 25 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const profileRes = await fetch("https://api.github.com/users/guruc267");
        if (!profileRes.ok) throw new Error("API failed");
        const profile = await profileRes.json();

        const reposRes = await fetch("https://api.github.com/users/guruc267/repos?sort=updated&per_page=100");
        if (!reposRes.ok) throw new Error("Repos API failed");
        const raw = await reposRes.json();

        setRepos(raw.slice(0, 4).map((r: any) => ({
          name: r.name,
          url: r.html_url,
          description: r.description || "No description provided.",
          language: r.language || "Other",
          stars: r.stargazers_count,
          updatedAt: r.updated_at.split("T")[0],
        })));
        setStats({ publicRepos: profile.public_repos });
      } catch {
        setRepos(FALLBACK_REPOS);
        setStats({ publicRepos: 25 });
      } finally {
        setLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  return (
    <section id="github" className="relative section-spacing select-none">
      <div className="container-main">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span className="label-uppercase" style={{ color: "var(--text-faint)", display: "block", marginBottom: "0.75rem" }}>
            Open Source
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
            <GitBranch size={22} style={{ color: "var(--accent-emerald)", opacity: 0.8 }} />
            GitHub Contributions
          </h2>
        </motion.div>

        {/* Dynamic Holographic Heatmap Panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: "relative",
            borderRadius: 24,
            padding: "2rem",
            background: "linear-gradient(180deg, rgba(255,255,255,0.015), var(--bg-card))",
            border: "1px solid var(--border-default)",
            overflow: "hidden",
            marginBottom: "3.5rem",
            boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
          }}
        >
          {/* Glowing purple backing aura */}
          <div style={{
            position: "absolute",
            inset: "-20%",
            background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.04), transparent 60%)",
            pointerEvents: "none",
          }} />

          {/* Cybernetic header details */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
            paddingBottom: "0.75rem",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Activity size={12} style={{ color: "var(--accent-emerald)" }} />
              <span style={{ fontSize: "0.5625rem", fontFamily: "'Geist Mono', monospace", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
                [INGEST: SECURE_GITHUB_STREAM_ACTIVE]
              </span>
            </div>
            <span style={{ fontSize: "0.5625rem", fontFamily: "'Geist Mono', monospace", color: "var(--accent-emerald)" }}>
              SYNC_STATUS: 100% OK
            </span>
          </div>

          {/* Heatmap graph */}
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }} className="w-full overflow-x-auto py-2">
            {/* Grid scanning effect */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(139,92,246,0.015) 1px, transparent 1px)",
              backgroundSize: "100% 4px",
              pointerEvents: "none",
            }} />
            <img
              src="https://ghchart.rshah.org/8b5cf6/guruc267"
              alt="guruc267 GitHub Contributions"
              className="w-full h-auto min-w-[720px] max-w-[850px] opacity-80"
              style={{
                filter: "drop-shadow(0 0 12px rgba(139, 92, 246, 0.12))",
              }}
            />
          </div>
        </motion.div>

        {/* Featured Repos Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 className="label-uppercase" style={{ color: "var(--text-muted)" }}>
            Featured Repositories ({loading ? "..." : stats.publicRepos})
          </h3>
          <a
            href="https://github.com/guruc267"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs"
            style={{
              padding: "0.45rem 1rem",
              fontSize: "0.6875rem",
              borderRadius: "100px",
              gap: "0.35rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <ExternalLink size={11} />
            View Profile
          </a>
        </div>

        {/* Repository Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 150,
                    borderRadius: 18,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                  }}
                  className="animate-pulse"
                />
              ))
            : repos.map((repo, i) => (
                <RepoCard key={repo.name} repo={repo} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}
