"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import {
  Code2,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SiNuxtdotjs,
  SiNextdotjs,
  SiTypescript,
  SiGo,
} from "react-icons/si";

interface TechItem {
  id: string;
  name: string;
  category: "Frontend" | "Architecture" | "Systems";
  icon: React.ReactNode;
  summary: string;
  provenWork: {
    companyOrProject: string;
    impact: string;
  }[];
  associatedAnchor: string;
}

interface TechStackExplorerProps {
  skills?: string[];
}

export default function TechStackExplorer({ skills = [] }: TechStackExplorerProps) {
  const [selectedTech, setSelectedTech] = useState<string>("vue-nuxt");
  const detailCardRef = useRef<HTMLDivElement>(null);

  const techData: TechItem[] = [
    {
      id: "vue-nuxt",
      name: "Vue.js & Nuxt 3",
      category: "Frontend",
      icon: <SiNuxtdotjs className="w-5 h-5 text-emerald-500" />,
      summary:
        "Primary stack for building reactive web platforms, SEO-optimized portals, and enterprise dashboards with SSR and TypeScript.",
      provenWork: [
        {
          companyOrProject: "PT. Pegadaian (SPRINT & Pegadaian Kita)",
          impact: "Engineered enterprise micro-frontend platforms and internal ecosystem using Vue 3 and Module Federation.",
        },
        {
          companyOrProject: "UNU Yogyakarta (Portal & OTA)",
          impact: "Built official university web portal and Orang Tua Asuh scholarship platform with Nuxt 3 and SSR.",
        },
        {
          companyOrProject: "PT. GITS Indonesia / My Pertamina PDS",
          impact: "Developed commercial fuel delivery app and production client products with Nuxt 3, improving load speeds by 30%.",
        },
      ],
      associatedAnchor: "#projects",
    },
    {
      id: "react-next",
      name: "React & Next.js",
      category: "Frontend",
      icon: <SiNextdotjs className="w-5 h-5 text-sky-500" />,
      summary:
        "Specialized in modern React architectures, Next.js server components, client-side state handling, and interactive interfaces.",
      provenWork: [
        {
          companyOrProject: "BimbelKu (Founder & Architect)",
          impact: "Built live tutoring management SaaS with React, TypeScript, and automated WhatsApp invoicing at bimbelku.web.id.",
        },
        {
          companyOrProject: "PT. Telkom Indonesia Squad Amoeba",
          impact: "Developed internal products with React.js, raising team productivity by 20%.",
        },
        {
          companyOrProject: "Component Reusability",
          impact: "Built modular UI components reducing development time for new features by 30%.",
        },
      ],
      associatedAnchor: "#projects",
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "Frontend",
      icon: <SiTypescript className="w-5 h-5 text-blue-500" />,
      summary:
        "Strict static typing across frontend codebases, API payload contracts, and shared component design systems.",
      provenWork: [
        {
          companyOrProject: "Type-Safe Enterprise Apps",
          impact: "Authored end-to-end typed interfaces preventing runtime anomalies in production.",
        },
        {
          companyOrProject: "Full Stack Contracts",
          impact: "Standardized API schemas and form validations using Zod and TypeScript.",
        },
      ],
      associatedAnchor: "#experience",
    },
    {
      id: "design-systems",
      name: "Morpheme UI & Tailwind CSS",
      category: "Architecture",
      icon: <Layers className="w-5 h-5 text-cyan-500" />,
      summary:
        "Architected Morpheme UI design system at GITS Indonesia. Deep expertise in Tailwind CSS, atomic design, and accessibility.",
      provenWork: [
        {
          companyOrProject: "Morpheme UI Design System",
          impact: "Unified component library across multiple teams, streamlining development efficiency.",
        },
        {
          companyOrProject: "Pixel-Perfect Implementation",
          impact: "Accurate UI slicing from Figma specifications ensuring high fidelity and WCAG compliance.",
        },
      ],
      associatedAnchor: "#experience",
    },
    {
      id: "backend-core",
      name: "Go, PostgreSQL & Core Systems",
      category: "Systems",
      icon: <SiGo className="w-5 h-5 text-teal-500" />,
      summary:
        "Core backend development background in Go (Golang) and PostgreSQL databases, coupled with enterprise integrations at PT. Pegadaian.",
      provenWork: [
        {
          companyOrProject: "BimbelKu Backend",
          impact: "Engineered Go REST API microservices and PostgreSQL database for multi-tenant tutoring SaaS operations.",
        },
        {
          companyOrProject: "PT. Pegadaian (Core Developer)",
          impact: "Maintained internal enterprise service integrations and operational workflows using Go and Java.",
        },
      ],
      associatedAnchor: "#experience",
    },
  ];

  const currentItem = techData.find((item) => item.id === selectedTech) || techData[0];

  useEffect(() => {
    if (!detailCardRef.current) return;
    gsap.fromTo(
      detailCardRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [selectedTech]);

  const handleScrollTo = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="stack"
      className="slide-section snap-start snap-always relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-6 bg-secondary/30 border-t border-border overflow-hidden"
      aria-label="Interactive Stack Explorer"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-medium mb-2">
              <Code2 className="w-3.5 h-3.5" />
              <span>Interactive Tech Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Tech Stack Explorer
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
              Click a technology to see how and where it was deployed in production systems.
            </p>
          </div>
        </div>

        {/* Backend Verified Skills Pill Bar */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-6 p-2 rounded-xl bg-secondary/50 border border-border">
            <span className="text-xs font-mono text-muted-foreground mr-1.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>Core Stack:</span>
            </span>
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md bg-card border border-border text-xs font-medium text-foreground shadow-2xs font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6 items-start">
          {/* Tech selector buttons */}
          <div className="flex flex-col gap-2.5">
            {techData.map((tech) => {
              const isSelected = tech.id === selectedTech;
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => setSelectedTech(tech.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-card border-primary/50 shadow-xs ring-1 ring-primary/20 text-foreground"
                      : "bg-card/50 border-border text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-secondary border border-border">
                      {tech.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-sm text-foreground">
                        {tech.name}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {tech.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-primary translate-x-1" : "text-muted-foreground opacity-50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Detail Card */}
          <div
            ref={detailCardRef}
            className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between min-h-[340px]"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 rounded-xl bg-secondary border border-border">
                  {currentItem.icon}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {currentItem.name}
                  </h3>
                  <span className="text-xs font-mono text-primary font-medium">
                    Verified Production Deployment
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {currentItem.summary}
              </p>

              <div className="space-y-3 pt-4 border-t border-border">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                  Proven Impact & Milestones
                </span>
                {currentItem.provenWork.map((pw, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-secondary/50 border border-border/70 text-xs flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground block">
                        {pw.companyOrProject}
                      </span>
                      <span className="text-muted-foreground">
                        {pw.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">
                Source: CV & Verified Work
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScrollTo(currentItem.associatedAnchor)}
                className="text-xs font-medium text-foreground hover:text-primary gap-1.5"
              >
                <span>Inspect in Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
