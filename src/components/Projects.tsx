"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  category?: string;
  role?: string;
  impactMetric?: string;
  architectureNotes?: string[];
}

interface ProjectsProps {
  projects?: ProjectItem[];
  texts?: {
    title?: string;
    subtitle?: string;
    moreComingSoon?: string;
    viewProject?: string;
  };
}

export default function Projects({ projects = [], texts }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"cards" | "index">("cards");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Complete, verified production projects from CV & Fallbacks
  const baseProjects: ProjectItem[] = [
    {
      title: "BimbelKu",
      description:
        "Platform manajemen operasional bimbingan belajar modern. Didukung arsitektur backend Go dan PostgreSQL, mengotomasi presensi foto kamera, jadwal kelas (privat & reguler), 3 skema tagihan SPP, kalkulasi honor tentor, hingga invoice WhatsApp instan.",
      technologies: ["Go", "PostgreSQL", "React", "TypeScript", "Tailwind CSS", "TanStack Router"],
      link: "https://bimbelku.web.id",
      category: "Product & SaaS",
      role: "Creator & Lead Architect",
      impactMetric: "Live EdTech SaaS Platform",
      architectureNotes: [
        "Dibangun dengan backend Go (Golang) REST API dan database PostgreSQL untuk keandalan transaksi multi-cabang.",
        "Dirancang khusus untuk alur operasional bimbel: manajemen jadwal terintegrasi, kuota sesi privat, dan deteksi bentrok ruang.",
        "Presensi live berbasis kamera dan jurnal perkembangan materi siswa tersimpan rapi tiap pertemuan.",
        "Automasi 3 skema penagihan SPP (bulanan, paket sesi, per pertemuan) dengan invoice & reminder 1-klik ke WhatsApp orang tua.",
        "Perhitungan honor tentor otomatis berbasis absensi valid dan rekapitulasi laba rugi operasional.",
      ],
    },
    {
      title: "SPRINT Pegadaian",
      description:
        "Platform operasional dan administrasi cabang berbasis arsitektur micro-frontend di PT. Pegadaian untuk alur kerja transaksi, manajemen operasional, serta otomasi layanan kantor cabang seluruh Indonesia.",
      technologies: ["Micro-Frontends", "Module Federation", "Vue 3", "TypeScript", "PWA"],
      link: "https://sprint.pegadaian.co.id/",
      category: "Enterprise & Cloud",
      role: "Core Developer",
      impactMetric: "Pegadaian Enterprise Operations",
      architectureNotes: [
        "Dibangun dengan arsitektur micro-frontend modular menggunakan Vite Module Federation dan Vue 3.",
        "Mendukung kapabilitas Progressive Web App (PWA) untuk keandalan akses operasional cabang.",
        "Terintegrasi dengan core service, autentikasi terpusat, dan alur transaksi bisnis PT. Pegadaian.",
      ],
    },
    {
      title: "Pegadaian Kita",
      description:
        "Portal ekosistem internal enterprise PT. Pegadaian berbasis micro-frontend, menyatukan Single Sign-On (SSO), modul operasional multi-squad, dan pusat layanan terpadu insan Pegadaian.",
      technologies: ["Micro-Frontends", "Module Federation", "Vue.js", "TypeScript", "REST API"],
      link: "https://kita.pegadaian.co.id/",
      category: "Enterprise & Cloud",
      role: "Core Developer",
      impactMetric: "Pegadaian Internal Ecosystem Portal",
      architectureNotes: [
        "Arsitektur micro-frontend enterprise berbasis Module Federation untuk integrasi dinamis antar-squad dan layanan internal.",
        "Menyediakan integrasi Single Sign-On (SSO) dan akses terpusat ke berbagai layanan internal Pegadaian.",
        "Dashboard responsif untuk pengumuman korporat, administrasi pegawai, dan pemantauan operasional.",
      ],
    },
    {
      title: "UNU Yogyakarta Web Portal",
      description:
        "Portal web resmi Universitas Nahdlatul Ulama Yogyakarta yang menyajikan informasi akademik, direktori fakultas, program unggulan, dan penerimaan mahasiswa baru dengan performa tinggi.",
      technologies: ["Nuxt 3", "Vue 3", "TypeScript", "Tailwind CSS", "SSR"],
      link: "https://www.unu-jogja.ac.id/",
      category: "Consumer & Web",
      role: "Frontend Engineer",
      impactMetric: "Higher Education Digital Portal",
      architectureNotes: [
        "Dibangun dengan arsitektur Server-Side Rendering (SSR) Nuxt 3 dan Vue 3 untuk optimalisasi SEO dan Core Web Vitals.",
        "Antarmuka responsif modern dengan transisi animasi halus dan navigasi terstruktur untuk civitas akademika.",
        "Optimalisasi caching aset statis dan performa rendering untuk melayani ribuan pengunjung kampus.",
      ],
    },
    {
      title: "Program Orang Tua Asuh UNU Jogja",
      description:
        "Platform filantropi dan sponsorship program Orang Tua Asuh UNU Yogyakarta untuk menghubungkan donatur dengan mahasiswa berprestasi dari keluarga prasejahtera.",
      technologies: ["Nuxt 3", "Vue 3", "TypeScript", "Tailwind CSS", "REST API"],
      link: "https://ota.unu-jogja.ac.id/",
      category: "Consumer & Web",
      role: "Frontend Engineer",
      impactMetric: "Student Scholarship Platform",
      architectureNotes: [
        "Merancang alur komitmen donasi dan sponsorship yang transparan dan intuitif menggunakan Nuxt 3 dan Tailwind CSS.",
        "Integrasi formulir pendaftaran orang tua asuh, pelaporan dampak beasiswa, dan profil mahasiswa asuh.",
        "Desain antarmuka mobile-first yang cepat dan mudah diakses oleh donatur dari berbagai kanal.",
      ],
    },
    {
      title: "My Pertamina PDS",
      description:
        "Pertamina Delivery Service on-demand fuel ordering and scheduling platform for personal and corporate fleet operations.",
      technologies: ["Vue.js", "Nuxt 3", "TypeScript", "Tailwind CSS"],
      link: "https://pds.mypertamina.id/",
      category: "Enterprise & Cloud",
      role: "Frontend Engineer",
      impactMetric: "Commercial & Consumer Fleet Dispatch",
      architectureNotes: [
        "Architected modular checkout flow supporting both consumer orders and high-volume corporate fuel dispatch.",
        "Integrated interactive location mapping and route calculation with low latency.",
        "Optimized client state caching to maintain instant responsiveness during peak operational hours.",
      ],
    },
    {
      title: "Morpheme UI Design System",
      description:
        "Comprehensive enterprise design system developed at GITS Indonesia. Standardized UI components, tokens, and accessibility across multi-squad applications.",
      technologies: ["Vue 3", "TypeScript", "Tailwind CSS", "Storybook"],
      link: "https://github.com/iiibnuadam",
      category: "Design Systems & Tools",
      role: "Design System Author",
      impactMetric: "+30% Accelerated Squad Delivery",
      architectureNotes: [
        "Authored 50+ accessible, customizable UI primitives with atomic design principles.",
        "Established unified design tokens for color, typography, spacing, and dark mode themes.",
        "Created Storybook documentation and automated testing pipelines for design system reliability.",
      ],
    },
    {
      title: "Lintasarta Cloudeka",
      description:
        "Enterprise cloud services platform delivering compute provisioning, resource quota management, and billing dashboards.",
      technologies: ["Vue.js", "Nuxt.js", "Cloud Services", "TypeScript"],
      link: "https://www.cloudeka.id/",
      category: "Enterprise & Cloud",
      role: "Frontend Engineer",
      impactMetric: "Enterprise Cloud Infrastructure Portal",
      architectureNotes: [
        "Structured multi-tenant user authentication and enterprise organization hierarchies.",
        "Developed data-heavy analytics charts and billing invoice viewers with strict typings.",
      ],
    },
  ];

  // Merge projects from props if custom CMS data exists, or ensure all base projects are present
  const allProjects = baseProjects.map((bp) => {
    const match = projects.find(
      (p) =>
        p.title.toLowerCase().includes(bp.title.toLowerCase()) ||
        bp.title.toLowerCase().includes(p.title.toLowerCase())
    );
    if (match) {
      return {
        ...bp,
        ...match,
        // Preserve enriched metadata
        category: bp.category,
        role: bp.role,
        impactMetric: bp.impactMetric,
        architectureNotes: bp.architectureNotes,
      };
    }
    return bp;
  });

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "Product & SaaS", label: "Product & SaaS" },
    { id: "Enterprise & Cloud", label: "Enterprise & Cloud" },
    { id: "Design Systems & Tools", label: "Design Systems & Tools" },
    { id: "Consumer & Web", label: "Consumer & Web" },
  ];

  const filteredProjects = allProjects.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <section
      id="projects"
      className="slide-section snap-start snap-always relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-6 bg-background border-t border-border overflow-hidden"
      aria-label="Featured Projects Showcase"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-medium mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              {texts?.title || "Featured Projects"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              {texts?.subtitle ||
                "A curated selection of mission-critical web applications, enterprise platforms, and scalable design systems."}
            </p>
          </div>

          {/* Controls: View Switcher, Category Filters & Mobile Nav */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle: Cards vs Index */}
            <div className="inline-flex items-center p-1 rounded-xl bg-secondary/70 border border-border">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  viewMode === "cards"
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Cards View"
                aria-pressed={viewMode === "cards"}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("index")}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  viewMode === "index"
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Index View"
                aria-pressed={viewMode === "index"}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Index</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-secondary/70 p-1 rounded-xl border border-border">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-card text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Scroll Arrows */}
            {viewMode === "cards" && (
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("left")}
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg border-border"
                  aria-label="Scroll projects left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scroll("right")}
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg border-border"
                  aria-label="Scroll projects right"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Swipe Cue */}
        {viewMode === "cards" && (
          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-3">
            <span>{filteredProjects.length} Verified Production Projects</span>
            <span className="hidden sm:inline">Gunakan tombol panah atau geser horizontal ➔</span>
            <span className="sm:hidden">Swipe ➔</span>
          </div>
        )}

        {/* View Mode: Cards Horizontal Swipe Carousel */}
        {viewMode === "cards" && (
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-5 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="w-[85vw] sm:w-[350px] lg:w-[380px] shrink-0 snap-start group flex flex-col justify-between rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-xs hover:shadow-md overflow-hidden opacity-100"
              >
                {/* Visual Header / Mockup Bar */}
                <div className="p-4 bg-secondary/50 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        0{index + 1}
                      </span>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                          aria-label={`Open external link for ${project.title}`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {project.impactMetric && (
                      <span className="inline-block mt-1 text-xs font-mono text-primary font-medium">
                        {project.impactMetric}
                      </span>
                    )}

                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-secondary text-[11px] font-mono text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveProject(project)}
                        className="w-full text-xs h-9 rounded-lg border-border hover:bg-secondary font-medium"
                      >
                        Inspect Details
                      </Button>
                      {project.link && (
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-9 px-2.5 rounded-lg text-muted-foreground hover:text-foreground"
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Visit Live Application"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode: Index Table (All projects in clean tabular list) */}
        {viewMode === "index" && (
          <div className="border border-border rounded-2xl bg-card overflow-hidden">
            <div className="divide-y divide-border">
              {filteredProjects.map((project, idx) => (
                <div
                  key={project.title}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground w-6">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-foreground">
                          {project.title}
                        </h4>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {project.impactMetric || project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="hidden md:flex items-center gap-1">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-secondary text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveProject(project)}
                      className="text-xs h-8 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      Inspect
                    </Button>

                    {project.link && (
                      <Button
                        asChild
                        size="sm"
                        className="text-xs h-8 px-3 rounded-full"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Live Site</span>
                          <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Accessible Project Details Modal (Keyboard operable, Escape closes) */}
      <Dialog
        open={!!activeProject}
        onOpenChange={(open) => !open && setActiveProject(null)}
      >
        <DialogContent className="sm:max-w-xl p-6 sm:p-8 rounded-2xl bg-card border-border">
          {activeProject && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-primary font-semibold">
                    {activeProject.category?.toUpperCase() || "PROJECT"} • {activeProject.role || "ENGINEER"}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {activeProject.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {activeProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Technologies Deployed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-secondary border border-border text-xs font-mono font-medium text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {activeProject.architectureNotes && activeProject.architectureNotes.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                      Key Architectural Decisions
                    </h4>
                    <div className="space-y-2">
                      {activeProject.architectureNotes.map((note, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-secondary/50 border border-border/80 text-xs flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-foreground/90 leading-relaxed">
                            {note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-border flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setActiveProject(null)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Close
                </Button>
                {activeProject.link && (
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full px-5 font-medium gap-2"
                  >
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Visit Live Application</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
