"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import AboutMeSection from "@/components/AboutMeSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import CertificationsSection from "@/components/CertificationsSection";
import GitHubSection from "@/components/GitHubSection";
import ContactSection from "@/components/ContactSection";
import GuruBot from "@/components/GuruBot";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import BackgroundParticles from "@/components/BackgroundParticles";
import Floating3DElements from "@/components/Floating3DElements";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />
            <BackgroundParticles />

            <main>
              <HeroSection />

              {/* 3D transition: Hero → About */}
              <Floating3DElements variant="default" />

              <AboutMeSection />

              {/* 3D transition: About → Skills */}
              <Floating3DElements variant="alternate" />

              <SkillsSection />

              {/* 3D transition: Skills → Projects */}
              <Floating3DElements variant="default" />

              <ProjectsSection />

              {/* 3D transition: Projects → Journey */}
              <Floating3DElements variant="alternate" />

              <JourneySection />

              {/* Minimal transition: Journey → GitHub */}
              <Floating3DElements variant="minimal" />

              <GitHubSection />

              {/* Minimal transition: GitHub → Certs */}
              <Floating3DElements variant="minimal" />

              <CertificationsSection />

              {/* Minimal transition: Certs → Contact */}
              <Floating3DElements variant="minimal" />

              <ContactSection />
            </main>

            <GuruBot />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
