"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import { Check, Copy, ArrowDown, Code2, Layers, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { FaNodeJs, FaJava } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGo,
  SiNuxtdotjs,
  SiDocker,
} from "react-icons/si";

interface HeroProps {
  name?: string;
  tags?: string[];
  description?: string;
  cta?: string;
  contact?: string;
  email?: string;
  image?: string;
  skills?: string[];
  status?: {
    variant: "available" | "open" | "busy";
  };
  lang?: "en" | "id";
}

export default function Hero({
  name = "Ibnu Adam",
  description,
  status = { variant: "available" },
  skills = [],
  email: emailProp,
  contact: contactProp,
  lang = "en",
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Email taken from backend props (cmsData.contact.email) with verified fallback
  const email =
    emailProp ||
    (contactProp && contactProp.includes("@") ? contactProp : "ibnuadam.biz@gmail.com");

  // GSAP Entrance Timeline (MOTION dial 3)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(badgeRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          titleRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          bioRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          metricsRef.current?.children ? Array.from(metricsRef.current.children) : [],
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            clearProps: "all",
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success(
        lang === "id"
          ? "Email disalin ke clipboard!"
          : "Email copied to clipboard!"
      );
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy email");
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Status mapping
  const statusConfig = {
    available: {
      text: lang === "id" ? "Tersedia untuk proyek baru" : "Available for opportunities",
      dotClass: "bg-emerald-500",
      pingClass: "bg-emerald-400",
      borderClass: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    },
    open: {
      text: lang === "id" ? "Terbuka untuk diskusi" : "Open to select roles",
      dotClass: "bg-amber-500",
      pingClass: "bg-amber-400",
      borderClass: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    },
    busy: {
      text: lang === "id" ? "Sedang aktif dalam proyek" : "Focused on current role",
      dotClass: "bg-rose-500",
      pingClass: "bg-rose-400",
      borderClass: "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    },
  };

  const currentStatus = statusConfig[status.variant] || statusConfig.available;

  // Real, verified credentials from CV (R-17, R-36, C-5)
  const credentials: Array<{
    value: string;
    label: string;
    sub: string;
    href?: string;
    topicId?: string;
  }> = [
    {
      value: "5+ Years",
      label: lang === "id" ? "Pengalaman Rekayasa" : "Engineering Experience",
      sub: "Enterprise & Scale",
    },
    {
      value: "BimbelKu",
      label: "Founder & Architect",
      sub: "bimbelku.web.id",
      href: "https://bimbelku.web.id",
    },
    {
      value: "3.79 GPA",
      label: lang === "id" ? "Teknik Informatika UNY" : "Informatics Engineering UNY",
      sub: lang === "id" ? "Cum Laude Honors" : "Cum Laude Honors",
    },
    {
      value: "Web Dev",
      label: lang === "id" ? "Jasa Pembuatan Website" : "Web Development Services",
      sub: lang === "id" ? "Landing Page & Web App" : "Landing Pages & Web Apps",
      href: "#contact",
      topicId: "project",
    },
  ];

  // Dynamic skill icon resolver for backend skills
  const getSkillIcon = (skillName: string) => {
    const s = skillName.toLowerCase();
    if (s.includes("micro") || s.includes("federation")) {
      return <Layers className="w-4 h-4 text-indigo-500" />;
    }
    if (s.includes("docker") || s.includes("container")) {
      return <SiDocker className="w-4 h-4 text-sky-500" />;
    }
    if (s.includes("java") && !s.includes("script")) {
      return <FaJava className="w-4 h-4 text-amber-600" />;
    }
    if (s.includes("go") || s.includes("golang")) {
      return <SiGo className="w-4 h-4 text-teal-500" />;
    }
    if (s.includes("vue") || s.includes("nuxt")) {
      return <SiNuxtdotjs className="w-4 h-4 text-emerald-500" />;
    }
    if (s.includes("react") || s.includes("next")) {
      return <SiNextdotjs className="w-4 h-4 text-sky-500" />;
    }
    if (s.includes("type") || s.includes("ts")) {
      return <SiTypescript className="w-4 h-4 text-blue-500" />;
    }
    if (s.includes("tailwind") || s.includes("css")) {
      return <SiTailwindcss className="w-4 h-4 text-cyan-500" />;
    }
    if (s.includes("node")) {
      return <FaNodeJs className="w-4 h-4 text-green-600" />;
    }
    return <Code2 className="w-4 h-4 text-primary" />;
  };

  const displayedSkills =
    skills && skills.length > 0
      ? skills.map((skill) => ({
          name: skill,
          icon: getSkillIcon(skill),
        }))
      : [
          { name: "Vue.js / Nuxt 3", icon: <SiNuxtdotjs className="w-4 h-4 text-emerald-500" /> },
          { name: "React / Next.js", icon: <SiNextdotjs className="w-4 h-4 text-sky-500" /> },
          { name: "TypeScript", icon: <SiTypescript className="w-4 h-4 text-blue-500" /> },
          { name: "Micro-Frontends", icon: <Layers className="w-4 h-4 text-indigo-500" /> },
          { name: "Go", icon: <SiGo className="w-4 h-4 text-teal-500" /> },
          { name: "Java", icon: <FaJava className="w-4 h-4 text-amber-600" /> },
          { name: "Docker", icon: <SiDocker className="w-4 h-4 text-sky-500" /> },
          { name: "Tailwind CSS", icon: <SiTailwindcss className="w-4 h-4 text-cyan-500" /> },
          { name: "Node.js", icon: <FaNodeJs className="w-4 h-4 text-green-600" /> },
        ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="slide-section snap-start snap-always relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 px-4 sm:px-6 overflow-hidden"
      aria-label="Hero Overview"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Availability Pill */}
        <div ref={badgeRef} className="mb-4 sm:mb-6 flex flex-wrap items-center gap-3">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium ${currentStatus.borderClass}`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStatus.pingClass}`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${currentStatus.dotClass}`}
              />
            </span>
            <span>{currentStatus.text}</span>
          </div>

          <span className="text-xs text-muted-foreground font-mono">
            Jakarta, Indonesia (WIB)
          </span>
        </div>

        {/* Main Headline (High contrast, purposeful editorial weight) */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] max-w-4xl"
        >
          {lang === "id" ? (
            <>
              Membangun aplikasi web performa tinggi dan arsitektur frontend presisi.
            </>
          ) : (
            <>
              Crafting high-performance web applications and resilient frontend architectures.
            </>
          )}
        </h1>

        {/* Introduction / Bio */}
        <p
          ref={bioRef}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          {description ||
            (lang === "id"
              ? `Halo, saya ${name}. Lulusan Teknik Informatika UNY (IPK 3.79, Mawapres). Software Engineer dengan pengalaman 5+ tahun merancang arsitektur web modern, sistem desain skala enterprise, dan modul platform modular.`
              : `Hello, I am ${name}. Informatics Engineering graduate from UNY (GPA 3.79, Honors). Software Engineer with over 5 years of production experience building resilient web applications, enterprise design systems, and core platforms.`)}
        </p>

        {/* Core Tech Stack Badges from Backend */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground mr-1">
            Tech Stack:
          </span>
          {displayedSkills.map((skill) => (
            <span
              key={skill.name}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/80 border border-border text-xs font-medium text-foreground hover:border-primary/40 transition-colors"
            >
              {skill.icon}
              <span>{skill.name}</span>
            </span>
          ))}
        </div>

        {/* Interactive Action Hub */}
        <div
          ref={ctaRef}
          className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("#projects")}
            className="h-11 sm:h-12 px-5 sm:px-6 rounded-full font-semibold shadow-sm group"
          >
            <span>{lang === "id" ? "Lihat Proyek Unggulan" : "Explore Featured Work"}</span>
            <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("#contact")}
            className="h-11 sm:h-12 px-5 sm:px-6 rounded-full font-semibold border-border hover:bg-secondary"
          >
            <span>{lang === "id" ? "Mulai Diskusi" : "Start a Conversation"}</span>
          </Button>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 h-11 sm:h-12 px-4 rounded-full border border-border bg-card hover:bg-secondary/70 text-xs font-mono text-muted-foreground hover:text-foreground transition-all duration-200"
            title="Copy email to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{email}</span>
          </button>
        </div>

        {/* Real Verified Proof / Metrics Strip (R-17, R-31, C-5) */}
        <div
          ref={metricsRef}
          className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
        >
          {credentials.map((item) => (
            <div key={item.value} className="flex flex-col">
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("#") ? undefined : "_blank"}
                  rel={item.href.startsWith("#") ? undefined : "noopener noreferrer"}
                  onClick={
                    item.href.startsWith("#")
                      ? (e) => {
                          e.preventDefault();
                          if (item.topicId && typeof window !== "undefined") {
                            window.dispatchEvent(
                              new CustomEvent("select-contact-topic", {
                                detail: { topicId: item.topicId },
                              })
                            );
                          }
                          scrollToSection(item.href!);
                        }
                      : undefined
                  }
                  className="group flex flex-col text-left -m-2 p-2 rounded-xl hover:bg-secondary/50 border border-transparent hover:border-border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  title={
                    item.href.startsWith("#")
                      ? lang === "id"
                        ? `Arahkan ke ${item.label}`
                        : `Go to ${item.label}`
                      : `Kunjungi ${item.value} (${item.sub})`
                  }
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground mt-1">
                    {item.label}
                  </span>
                  <span className="text-[11px] sm:text-xs text-primary underline underline-offset-2 mt-0.5 group-hover:text-primary/80 transition-colors">
                    {item.sub}
                  </span>
                </a>
              ) : (
                <>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono tracking-tight text-foreground">
                    {item.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground mt-1">
                    {item.label}
                  </span>
                  <span className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                    {item.sub}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Scroll Cue for Deck */}
        <div className="mt-8 hidden lg:flex items-center justify-center">
          <button
            type="button"
            onClick={() => scrollToSection("#experience")}
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group p-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Scroll to next slide: Work Experience"
          >
            <span>Scroll atau tekan panah bawah untuk lanjut</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
