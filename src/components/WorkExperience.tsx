"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface Experience {
  position: string;
  company: string;
  logo?: string;
  location: string;
  type: string;
  period: string;
  duration: string;
  description: string[];
  skills: string[];
}

interface WorkExperienceProps {
  experiences?: Experience[];
  title?: string;
}

export default function WorkExperience({
  experiences = [],
  title = "Work Experience",
}: WorkExperienceProps) {
  const containerRef = useRef<HTMLElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback verified experiences if none passed
  const defaultExperiences: Experience[] = [
    {
      company: "PT. Pegadaian",
      position: "Core Developer",
      location: "Jakarta",
      type: "Fulltime - Onsite",
      period: "Aug 2024 - Present",
      duration: "1+ Year",
      description: [
        "Develop and maintain mission-critical internal enterprise platforms (SPRINT & Pegadaian Kita) using Vue 3, TypeScript, and micro-frontend architecture (Module Federation).",
        "Collaborate on core operational workflows, transaction processing, and enterprise service integrations using Vue, Go, and Java.",
        "Implement Progressive Web App (PWA) solutions to guarantee reliable performance across nationwide branch offices.",
      ],
      skills: ["Micro-Frontends", "Vue 3", "TypeScript", "Go", "Java", "Module Federation", "PWA"],
    },
    {
      company: "Universitas Nahdlatul Ulama Yogyakarta",
      position: "Frontend Developer",
      location: "Yogyakarta",
      type: "Contract - Hybrid",
      period: "Jul 2024 - Present",
      duration: "1+ Year",
      description: [
        "Engineered internal university platforms, academic information systems (SIAKAD), and PBM (Teaching & Learning Process) modules tailored to UNU Yogyakarta institutional workflows.",
        "Developed the official university web portal (unu-jogja.ac.id) with high-performance SSR using Nuxt 3, Vue 3, and Tailwind CSS.",
        "Built the Program Orang Tua Asuh philanthropy web platform (ota.unu-jogja.ac.id) for donor sponsorship and scholarship management.",
        "Structured reusable, accessible UI component libraries and integrated RESTful APIs with university academic data services.",
      ],
      skills: ["Nuxt 3", "Vue.js", "TypeScript", "Tailwind CSS", "REST APIs", "SSR", "Academic Systems"],
    },
    {
      company: "PT. GITS Indonesia",
      position: "Frontend Developer",
      location: "Bandung",
      type: "Fulltime - Remote",
      period: "Dec 2021 - Jun 2024",
      duration: "3 Years",
      description: [
        "Spearheaded development of multiple enterprise client products from scratch using Nuxt 3, Vue 3, and TypeScript.",
        "Engineered cloud infrastructure dashboards, e-commerce platforms, web merchant tools, and real-time collaboration applications, increasing user engagement by 20%.",
        "Architected Morpheme UI, an enterprise design system standardizing accessible UI tokens and components across multi-squad teams.",
        "Optimized Core Web Vitals and technical SEO, achieving a 30% increase in Lighthouse page speed scores.",
        "Integrated WebSocket channels for real-time reactivity and headless Strapi CMS for decoupled content delivery.",
        "Maintained high code quality and test coverage using Jest, following Scrum sprint cycles and Git Flow.",
      ],
      skills: ["Nuxt.js", "Vue.js", "TypeScript", "Pinia", "Morpheme UI", "WebSockets", "Strapi", "Jest"],
    },
    {
      company: "PT. Telkom Indonesia Squad Digital Amoeba",
      position: "Frontend Developer",
      location: "Bandung",
      type: "Contract - Remote",
      period: "Sep 2021 - Feb 2022",
      duration: "6 Months",
      description: [
        "Developed internal digital incubation products from scratch using React.js and TypeScript, increasing squad delivery productivity by 20%.",
        "Architected scalable state management using Redux and Redux Thunk for complex transactional workflows.",
        "Constructed reusable UI component libraries, cutting subsequent feature turnaround time by 30%.",
        "Delivered pixel-perfect implementations translated from high-fidelity Figma specifications with responsive layout fidelity.",
        "Collaborated within agile Scrum sprints to deliver continuous product iterations on schedule.",
      ],
      skills: ["React.js", "TypeScript", "Redux", "Redux Thunk", "REST APIs", "Scrum"],
    },
    {
      company: "PT. Qatros Teknologi Indonesia",
      position: "Frontend Developer",
      location: "Yogyakarta",
      type: "Fulltime - Hybrid",
      period: "Aug 2020 - Sep 2021",
      duration: "1 Year 2 Months",
      description: [
        "Developed enterprise client platforms and internal tooling from scratch using Vue.js and Nuxt.js.",
        "Structured reusable component architectures applying atomic design principles across diverse viewports.",
        "Engineered asynchronous state pipelines using Vuex, ensuring fluid user interaction and reliable data fetching.",
        "Converted Figma UI/UX prototypes into accessible, responsive web interfaces under agile Scrum methodology.",
      ],
      skills: ["Vue.js", "Nuxt.js", "Vuex", "JavaScript", "Atomic Design", "REST APIs"],
    },
  ];

  const items = experiences.length > 0 ? experiences : defaultExperiences;
  const current = items[selectedIndex] || items[0];

  // Sanitize any em dashes into standard hyphens (R-02) and clean up date commas
  const sanitizeText = (txt: string) =>
    txt
      .replace(/—|–/g, "-")
      .replace(/,\s*/g, " ")
      .replace(/Sept\b/g, "Sep")
      .replace(/Agust\b/g, "Agu")
      .replace(/Ags\b/g, "Agu");

  // Animate panel when tab changes
  useEffect(() => {
    if (!detailPanelRef.current) return;
    gsap.fromTo(
      detailPanelRef.current,
      { opacity: 0, x: 12 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [selectedIndex]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="slide-section snap-start snap-always relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-6 bg-secondary/20 border-t border-border overflow-hidden"
      aria-label="Work Experience"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-medium mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
            Over 5 years of hands-on software development across enterprise core systems, digital agencies, and startup incubation.
          </p>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-6 items-start">
          {/* Company List Tabs */}
          <div className="flex flex-col gap-2.5" role="tablist">
            {items.map((exp, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={exp.company}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-card border-primary/50 shadow-xs ring-1 ring-primary/20"
                      : "bg-card/40 border-border text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-sm text-foreground leading-snug">
                      {exp.company}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground whitespace-nowrap shrink-0 pt-0.5">
                      {sanitizeText(exp.period)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground font-medium truncate">
                      {exp.position}
                    </span>
                    {exp.duration && (
                      <span className="text-[10px] font-mono text-muted-foreground/80 shrink-0">
                        {sanitizeText(exp.duration)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Experience Details */}
          <div
            ref={detailPanelRef}
            className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm min-h-[380px] flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {current.position}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm font-medium text-primary">
                    <Building2 className="w-4 h-4" />
                    <span>{current.company}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary border border-border">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{sanitizeText(current.period)}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary border border-border">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{sanitizeText(current.location)}</span>
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="mt-6 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                  Responsibilities & Impact
                </span>
                {current.description.map((desc, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                    <span className="leading-relaxed text-foreground/90">
                      {sanitizeText(desc)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack used */}
            <div className="mt-8 pt-6 border-t border-border">
              <span className="text-xs font-mono text-muted-foreground block mb-2">
                Technologies Applied:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {current.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-secondary border border-border/80 text-xs font-mono font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
