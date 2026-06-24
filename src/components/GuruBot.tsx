"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Bot, User, Zap } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
  isStreaming?: boolean;
}

// Portfolio Knowledge Base
const KB: Record<string, string> = {
  about: `K. Guru Charan is an AI/ML Engineer and Data Analytics specialist in his final B.Tech year at SRM Institute of Science and Technology, maintaining a CGPA of 9.22. He combines Machine Learning, Computer Vision, and Business Intelligence to solve practical challenges.`,
  gdp360: `GDP360 is an interactive economic intelligence dashboard.\n• SQL extraction of 50K+ data points across 195 countries\n• Alteryx ETL pipelines for data normalization\n• Power BI star-schema design with DAX metrics\n• Interactive cross-filtered executive dashboards`,
  crop: `Crop Monitoring uses satellite imagery for precision agriculture.\n• Sentinel-2 multispectral band processing\n• NDVI computation using OpenCV\n• Random Forest classifier — 94.2% accuracy\n• Spatial heatmaps for crop distress detection`,
  projects: `5 core engineering systems:\n1. Crop Monitoring — Sentinel-2 + NDVI + Random Forest (94.2%)\n2. GDP360 — SQL + Alteryx ETL + Power BI\n3. Blinkit Sales — XGBoost (R²: 0.738)\n4. Ginger Detection — OpenCV + SVM (91.5%)\n5. Chitti AI — Flask NLP chatbot (<200ms)`,
  skills: `Core stack:\n• Python, C++, SQL\n• Scikit-Learn, OpenCV, XGBoost, SVM\n• Power BI, Alteryx ETL, Data Modeling\n• Git/GitHub, Linux`,
  certifications: `Verified Certifications:\n1. AWS ML Specialty (2024)\n2. Accenture Data Analytics (2024)\n3. ANZ Cyber Security (2023)\n4. MATLAB Image Processing (2023)`,
  hire: `Why hire Guru Charan:\n1. 9.22 CGPA with deep practical ML knowledge\n2. End-to-end capability: ETL → ML → BI dashboards\n3. Production codebases: satellite processing, chatbot servers\n4. AWS ML certified — rapid technology acquisition`,
  contact: `Reach K. Guru Charan:\n• LinkedIn: linkedin.com/in/kgurucharan\n• GitHub: github.com/guruc267\n• Resume: Available for download on the portfolio`,
  greetings: `Hello! I'm the Portfolio Intelligence Assistant. I can explain projects, skills, certifications, and help you navigate this portfolio. Ask me anything!`,
  help: `I can help with:\n• Projects & case studies\n• Technical skills & stack\n• Certifications & credentials\n• Why to hire Guru Charan\n• Contact information`,
};

const SUGGESTIONS = [
  { label: "About Guru Charan", key: "about", icon: "👤" },
  { label: "Show Projects", key: "projects", icon: "🚀" },
  { label: "Technical Skills", key: "skills", icon: "⚡" },
  { label: "Certifications", key: "certifications", icon: "🏅" },
  { label: "Why hire?", key: "hire", icon: "💡" },
];

export default function GuruBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: KB.greetings },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const streamText = (text: string) => {
    setMessages(prev => [...prev, { role: "bot", text: "", isStreaming: true }]);
    const words = text.split(" ");
    let i = 0;
    let current = "";
    const interval = setInterval(() => {
      if (i < words.length) {
        current += (i === 0 ? "" : " ") + words[i];
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === "bot") last.text = current;
          return updated;
        });
        i++;
      } else {
        clearInterval(interval);
        setMessages(prev => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === "bot") last.isStreaming = false;
          return updated;
        });
      }
    }, 30);
  };

  const handleSend = (text: string) => {
    const q = text.trim();
    if (!q || messages.some(m => m.isStreaming)) return;

    setMessages(prev => [...prev, { role: "user", text: q }]);
    setInput("");

    setTimeout(() => {
      const n = q.toLowerCase();
      let key = "help";
      if (n.includes("gdp") || n.includes("360")) key = "gdp360";
      else if (n.includes("crop") || n.includes("satellite")) key = "crop";
      else if (n.includes("project") || n.includes("blinkit")) key = "projects";
      else if (n.includes("tech") || n.includes("skill") || n.includes("stack")) key = "skills";
      else if (n.includes("cert") || n.includes("aws")) key = "certifications";
      else if (n.includes("hire") || n.includes("why")) key = "hire";
      else if (n.includes("contact") || n.includes("email")) key = "contact";
      else if (n.includes("about") || n.includes("guru") || n.includes("charan")) key = "about";
      else if (n.includes("hi") || n.includes("hello")) key = "greetings";

      // Navigation commands
      const navMap: Record<string, string> = {
        skills: "#skills", projects: "#projects", github: "#github",
        contact: "#contact", journey: "#journey",
      };
      for (const [word, selector] of Object.entries(navMap)) {
        if (n.includes("go to " + word) || n.includes("show " + word) || n.includes("navigate " + word)) {
          document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
          streamText(`Navigating to the ${word} section for you.`);
          return;
        }
      }

      streamText(KB[key] || KB.help);
    }, 250);
  };

  return (
    <>
      {/* Floating toggle button — premium animated */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[150] cursor-pointer"
        style={{
          width: 52,
          height: 52,
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isOpen
            ? "rgba(24, 24, 27, 0.95)"
            : "linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(59, 130, 246, 0.8))",
          border: isOpen
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(139, 92, 246, 0.4)",
          color: "#fff",
          boxShadow: isOpen
            ? "0 4px 20px rgba(0,0,0,0.4)"
            : "0 4px 24px rgba(139, 92, 246, 0.35), 0 0 60px rgba(139, 92, 246, 0.1)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={18} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
              <Zap size={18} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "18px",
              border: "1px solid rgba(139, 92, 246, 0.5)",
              pointerEvents: "none",
            }}
          />
        )}
      </motion.button>

      {/* Chat panel — premium glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[88px] right-6 z-[150]"
            style={{
              width: 400,
              maxWidth: "calc(100vw - 48px)",
              height: 560,
              maxHeight: "calc(100vh - 120px)",
              borderRadius: 24,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "rgba(9, 9, 11, 0.92)",
              border: "1px solid rgba(139, 92, 246, 0.12)",
              backdropFilter: "blur(24px)",
              boxShadow: `
                0 25px 60px rgba(0, 0, 0, 0.6),
                0 0 1px rgba(139, 92, 246, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.03)`,
            }}
          >
            {/* Gradient border top */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, transparent, #8b5cf6, #3b82f6, #06b6d4, transparent)",
              opacity: 0.7,
              borderRadius: "24px 24px 0 0",
            }} />

            {/* Header */}
            <div style={{
              padding: "1.25rem 1.25rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
              background: "rgba(139, 92, 246, 0.03)",
            }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.15))",
                border: "1px solid rgba(139, 92, 246, 0.15)",
                position: "relative",
              }}>
                <Bot size={18} style={{ color: "#a78bfa" }} />
                {/* Online dot */}
                <div style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10b981",
                  border: "2px solid rgba(9, 9, 11, 0.9)",
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                }}>
                  Portfolio AI
                </h4>
                <span style={{
                  fontSize: "0.625rem",
                  color: "rgba(139, 92, 246, 0.7)",
                  fontFamily: "'Geist Mono', monospace",
                  letterSpacing: "0.03em",
                }}>
                  ● Online — Ask me anything
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--text-faint)",
                  cursor: "pointer",
                }}
              >
                <X size={13} />
              </motion.button>
            </div>

            {/* Messages */}
            <div ref={chatRef} style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.05 : 0 }}
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "flex-start",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                    background: msg.role === "bot"
                      ? "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))"
                      : "rgba(255,255,255,0.06)",
                    border: `1px solid ${msg.role === "bot" ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.06)"}`,
                  }}>
                    {msg.role === "bot" ? (
                      <Sparkles size={11} style={{ color: "#a78bfa" }} />
                    ) : (
                      <User size={11} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    style={{
                      padding: "0.7rem 0.9rem",
                      borderRadius: msg.role === "bot" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                      fontSize: "0.75rem",
                      lineHeight: 1.65,
                      maxWidth: "80%",
                      whiteSpace: "pre-wrap",
                      background: msg.role === "bot"
                        ? "rgba(255,255,255,0.03)"
                        : "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.12))",
                      border: `1px solid ${msg.role === "bot" ? "rgba(255,255,255,0.05)" : "rgba(139, 92, 246, 0.18)"}`,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {msg.text}
                    {msg.isStreaming && (
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 12,
                          marginLeft: 4,
                          background: "linear-gradient(180deg, #8b5cf6, #06b6d4)",
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick suggestions */}
            <div style={{
              padding: "0.6rem 1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.04)",
              background: "rgba(0, 0, 0, 0.25)",
            }}>
              {SUGGESTIONS.map(sug => (
                <motion.button
                  key={sug.key}
                  whileHover={{ scale: 1.04, borderColor: "rgba(139, 92, 246, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  disabled={messages.some(m => m.isStreaming)}
                  onClick={() => handleSend(sug.label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.3rem 0.6rem",
                    borderRadius: 8,
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "var(--text-muted)",
                    transition: "all 0.2s ease",
                    opacity: messages.some(m => m.isStreaming) ? 0.4 : 1,
                  }}
                >
                  <span style={{ fontSize: "0.6875rem" }}>{sug.icon}</span>
                  {sug.label}
                </motion.button>
              ))}
            </div>

            {/* Input area */}
            <div style={{
              padding: "0.75rem 1rem",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              borderTop: "1px solid rgba(255, 255, 255, 0.04)",
              background: "rgba(0, 0, 0, 0.3)",
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(input); }}
                placeholder="Ask about projects, skills..."
                style={{
                  flex: 1,
                  borderRadius: 12,
                  padding: "0.6rem 0.9rem",
                  fontSize: "0.75rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--text-primary)",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(input)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  cursor: "pointer",
                  background: input.trim()
                    ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                    : "rgba(255,255,255,0.04)",
                  border: input.trim()
                    ? "1px solid rgba(139, 92, 246, 0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                  color: input.trim() ? "#fff" : "var(--text-faint)",
                  boxShadow: input.trim() ? "0 2px 12px rgba(139, 92, 246, 0.3)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <Send size={14} />
              </motion.button>
            </div>

            {/* Bottom branding */}
            <div style={{
              textAlign: "center",
              padding: "0.4rem",
              fontSize: "0.5625rem",
              color: "rgba(161, 161, 170, 0.3)",
              fontFamily: "'Geist Mono', monospace",
              letterSpacing: "0.05em",
            }}>
              PORTFOLIO INTELLIGENCE v4.2
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
