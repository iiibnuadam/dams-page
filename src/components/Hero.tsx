"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";

type HeroProps = {
  name: string;
  tags: string[];
  description: string;
  cta?: string;
  contact?: string;
  image?: string;
  skills?: string[];
  status?: {
    variant: "available" | "open" | "busy";
  };
  lang?: "en" | "id";
};

import { AuroraBackground } from "@/components/reactbits/AuroraBackground";
import { BlurText } from "@/components/reactbits/BlurText";
import { Magnet } from "@/components/reactbits/Magnet";
import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaAws,
  FaDocker,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiNestjs,
  SiGo,
  SiMysql,
} from "react-icons/si";

// Map to return the correct icon for a given tech stack string
const getTechIcon = (skillName: string) => {
  const normName = skillName.toLowerCase();
  if (normName.includes("react")) return <FaReact className="text-[#61DAFB]" />;
  if (normName.includes("vue")) return <FaVuejs className="text-[#4FC08D]" />;
  if (normName.includes("next")) return <SiNextdotjs />;
  if (normName.includes("typescript") || normName.includes("ts")) return <SiTypescript className="text-[#3178C6]" />;
  if (normName.includes("javascript") || normName.includes("js")) return <SiJavascript className="text-[#F7DF1E]" />;
  if (normName.includes("node")) return <FaNodeJs className="text-[#339933]" />;
  if (normName.includes("tailwind")) return <SiTailwindcss className="text-[#06B6D4]" />;
  if (normName.includes("python")) return <FaPython className="text-[#3776AB]" />;
  if (normName.includes("aws")) return <FaAws className="text-[#FF9900]" />;
  if (normName.includes("docker")) return <FaDocker className="text-[#2496ED]" />;
  if (normName.includes("mongo")) return <SiMongodb className="text-[#47A248]" />;
  if (normName.includes("postgres") || normName.includes("sql")) return <SiPostgresql className="text-[#4169E1]" />;
  if (normName.includes("mysql")) return <SiMysql className="text-[#4169E1]" />;
  if (normName.includes("mongo")) return <SiMongodb className="text-[#47A248]" />;
  if (normName.includes("nest")) return <SiNestjs className="text-[#E0234E]" />;
  if (normName.includes("go")) return <SiGo className="text-[#00ADD8]" />;
  if (normName.includes("java")) return <FaJava className="text-[#00ADD8]" />;
  return <span className="text-xl">🚀</span>; // Fallback
};

export default function Hero({
  name,
  tags,
  description,
  cta = "View My Work",
  contact = "Contact Me",
  image,
  skills = [],
  status = { variant: "available" },
  lang = "en",
}: HeroProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fallback if tags is undefined or empty
  const safeTags = React.useMemo(() => tags && tags.length > 0 ? tags : ["Developer"], [tags]);

  const statusVariants = {
    available: {
      container:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]",
      text: {
        en: "Available for work",
        id: "Tersedia untuk bekerja",
      },
    },
    open: {
      container:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      dot: "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]",
      text: {
        en: "Open to opportunities",
        id: "Terbuka untuk peluang",
      },
    },
    busy: {
      container:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      dot: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]",
      text: {
        en: "Busy / Not looking",
        id: "Sedang sibuk / Tidak mencari",
      },
    },
  };

  const currentStatus =
    statusVariants[status.variant] || statusVariants.available;

  useEffect(() => {
    const currentTag = safeTags[currentTagIndex];

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayText(currentTag.substring(0, displayText.length - 1));
        } else {
          setDisplayText(currentTag.substring(0, displayText.length + 1));
        }

        if (!isDeleting && displayText === currentTag) {
          setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
        } else if (isDeleting && displayText === "") {
          setIsDeleting(false);
          setCurrentTagIndex((prev) => (prev + 1) % safeTags.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTagIndex, safeTags]);

  const handleScroll = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AuroraBackground
      className="px-4 py-20 min-h-[100vh]"
      showRadialGradient={true}
      aria-label="Hero"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center z-10">
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border backdrop-blur-sm ${currentStatus.container}`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStatus.dot}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentStatus.dot}`}
              ></span>
            </span>
            <span className="text-sm font-medium tracking-wide uppercase text-[11px]">
              {currentStatus.text[lang]}
            </span>
          </motion.div>

          {/* Using React Bits BlurText */}
          <BlurText 
            text={name} 
            delay={0.05} 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground justify-center lg:justify-start" 
          />

          <div className="h-8 md:h-10 mb-8 flex justify-center lg:justify-start items-center text-xl md:text-2xl text-muted-foreground font-medium">
            <span>I am a </span>
            <span className="ml-2 text-foreground font-semibold">
              {displayText}
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1"
            />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {description}
          </p>

          {/* Tech Stack */}
          {skills && skills.length > 0 && (
            <div className="mb-10">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Tech Stack
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {skills.map((skill, index) => (
                  <Magnet key={skill} padding={4}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.5 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/80 dark:bg-card/50 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all cursor-default group"
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {getTechIcon(skill)}
                      </span>
                      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                        {skill}
                      </span>
                    </motion.div>
                  </Magnet>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Magnet padding={4}>
              <Button
                size="lg"
                className="rounded-full text-base px-8 h-12 w-full sm:w-auto"
                onClick={() => handleScroll("#projects")}
              >
                {cta}
              </Button>
            </Magnet>
            <Magnet padding={4}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base px-8 h-12 w-full sm:w-auto bg-background/50 backdrop-blur-sm"
                onClick={() => handleScroll("#contact")}
              >
                {contact}
              </Button>
            </Magnet>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] group">
            {/* Animated Glow Background */}
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" />

            {/* Rotating Tech Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full border border-blue-500/30 border-dashed z-0"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-cyan-400/20 border-dotted z-0"
            />

            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 bg-background z-10 shadow-2xl ring-1 ring-white/20 group-hover:scale-[1.02] transition-transform duration-500">
              <Image
                src={image || "https://media.licdn.com/dms/image/v2/D5603AQEpAjotJThYXg/profile-displayphoto-crop_800_800/B56Zl6s38oH8AI-/0/1758700213131?e=1766620800&v=beta&t=nl4OFkDexdExnK0kniY0R9M-T1-6ocze4Y6qSpNsDo4"}
                alt={name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-background/80 backdrop-blur-md border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-lg z-20"
            >
              <span className="text-2xl">💻</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-4 -left-4 w-14 h-14 bg-background/80 backdrop-blur-md border border-cyan-500/30 rounded-full flex items-center justify-center shadow-lg z-20"
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
