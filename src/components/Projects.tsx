"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import {
  Layers,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  // Complete, verified production projects from CV & Fallbacks
  const baseProjects: ProjectItem[] = [
    {
      title: "BimbelKu",
      description:
        "Platform manajemen operasional bimbingan belajar modern. Didukung arsitektur backend Go dan PostgreSQL, mengotomasi presensi foto kamera, jadwal kelas (privat & reguler), 3 skema tagihan SPP, kalkulasi honor tentor, hingga invoice WhatsApp instan.",
      technologies: ["Go", "PostgreSQL", "React", "TypeScript", "Tailwind CSS", "TanStack Router"],
      link: "https://bimbelku.web.id",
      category: "Product & SaaS",
      role: "Founder & Lead Architect",
      impactMetric: "Live EdTech SaaS Platform",
      architectureNotes: [
        "Dibangun dengan backend Go (Golang) REST API dan database PostgreSQL untuk keandalan transaksi multi-cabang.",
        "Dirancang khusus untuk alur operasional bimbel: manajemen jadwal terintegrasi, kuota sesi privat, dan deteksi bentrok ruang.",
        "Presensi live berbasis kamera dan jurnal perkembangan materi siswa tersimpan rapi tiap pertemuan.",
        "Automasi 3 skema penagihan SPP (bulanan, paket sesi, per pertemuan) dengan invoice dan reminder 1-klik ke WhatsApp orang tua.",
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
        "Optimalisasi caching aset statis dan performa rendering untuk melayani ribuan civitas akademika.",
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
        "Platform pemesanan dan pengantaran bahan bakar on-demand Pertamina Delivery Service untuk kebutuhan konsumen maupun armada komersial.",
      technologies: ["Vue.js", "Nuxt 3", "TypeScript", "Tailwind CSS"],
      link: "https://pds.mypertamina.id/",
      category: "Enterprise & Cloud",
      role: "Frontend Engineer",
      impactMetric: "Commercial Fleet Dispatch",
      architectureNotes: [
        "Merancang alur checkout modular yang mendukung pesanan personal serta penjadwalan armada korporat skala besar.",
        "Integrasi penentuan lokasi interaktif dan kalkulasi rute pengiriman berlatensi rendah.",
        "Optimalisasi client-side caching untuk menjaga responsivitas cepat selama jam operasional puncak.",
      ],
    },
    {
      title: "Morpheme UI Design System",
      description:
        "Sistem desain enterprise komprehensif yang dikembangkan di GITS Indonesia. Menstandarkan komponen UI yang aksesibel, token desain, dan konsistensi antar-squad.",
      technologies: ["Vue 3", "TypeScript", "Tailwind CSS", "Storybook"],
      link: "https://github.com/iiibnuadam",
      category: "Design Systems & Tools",
      role: "Design System Author",
      impactMetric: "+30% Accelerated Squad Delivery",
      architectureNotes: [
        "Menulis 50+ komponen primitif UI yang modular dan aksesibel dengan prinsip atomic design.",
        "Menetapkan token desain terpadu untuk warna, tipografi, spacing, dan tema dark mode.",
        "Membangun dokumentasi Storybook dan automated testing untuk keandalan ekosistem desain.",
      ],
    },
    {
      title: "Lintasarta Cloudeka",
      description:
        "Platform layanan cloud enterprise yang menyediakan provisi komputasi, manajemen kuota sumber daya, dan dashboard penagihan.",
      technologies: ["Vue.js", "Nuxt.js", "Cloud Services", "TypeScript"],
      link: "https://www.cloudeka.id/",
      category: "Enterprise & Cloud",
      role: "Frontend Engineer",
      impactMetric: "Enterprise Cloud Infrastructure Portal",
      architectureNotes: [
        "Menyusun hierarki organisasi enterprise dan autentikasi multi-tenant yang aman.",
        "Mengembangkan visualisasi analitik penggunaan kuota dan modul invoice dengan pengetikan ketat TypeScript.",
      ],
    },
  ];

  // Merge projects from props if custom CMS data exists, preserving enriched metadata
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
    { id: "Enterprise & Cloud", label: "Enterprise & Cloud" },
    { id: "Product & SaaS", label: "Product & SaaS" },
    { id: "Consumer & Web", label: "Consumer & Web" },
    { id: "Design Systems & Tools", label: "Design Systems & Tools" },
  ];

  const filteredProjects = allProjects.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const safeIndex = selectedIndex >= filteredProjects.length ? 0 : selectedIndex;
  const currentProject = filteredProjects[safeIndex] || filteredProjects[0];
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);

  const checkScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setCanScrollUp(scrollTop > 8);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 12);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = listRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [filteredProjects, selectedCategory]);

  const scrollList = (direction: "up" | "down") => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: direction === "down" ? 170 : -170,
        behavior: "smooth",
      });
    }
  };

  // Animate detail panel when selected project changes
  useEffect(() => {
    if (!detailPanelRef.current) return;
    gsap.fromTo(
      detailPanelRef.current,
      { opacity: 0, x: 12 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [safeIndex, selectedCategory]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedIndex(0);
  };

  const rawSubtitle = texts?.subtitle || "";
  const subtitle =
    rawSubtitle.includes("Geser") || rawSubtitle.includes("Swipe")
      ? "Platform web produksi, sistem enterprise, dan arsitektur frontend skala besar. Pilih proyek untuk melihat arsitektur & live demo."
      : rawSubtitle ||
        "Mission-critical web applications, enterprise platforms, and scalable design systems built for scale and reliability.";

  return (
    <section
      id="projects"
      className="slide-section snap-start snap-always relative min-h-screen lg:min-h-[100dvh] flex flex-col justify-start lg:justify-center pt-24 pb-16 sm:py-20 px-4 sm:px-6 bg-background border-t border-border overflow-x-hidden lg:overflow-visible w-full max-w-full min-w-0"
      aria-label="Featured Projects Showcase"
    >
      <div className="max-w-5xl mx-auto w-full min-w-0">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 sm:mb-8 w-full min-w-0">
          <div className="min-w-0 max-w-full">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-medium mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {texts?.title || "Featured Projects"}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm lg:text-base mt-1.5 sm:mt-2 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Category Filter Pills (Fluid scroll on small screens with min-w-0 containment) */}
          <div className="w-full md:w-auto min-w-0 max-w-full overflow-hidden">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/60 border border-border overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full min-w-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-card text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-4 sm:gap-6 items-start w-full min-w-0 max-w-full">
          {/* Projects Navigation Column */}
          <div className="flex flex-col w-full min-w-0 max-w-full">
            {/* Desktop Header with Project Count & Up/Down Arrows */}
            <div className="hidden lg:flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-mono text-muted-foreground">
                Daftar Proyek ({filteredProjects.length})
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollList("up")}
                  disabled={!canScrollUp}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors border border-border/60"
                  aria-label="Scroll list up"
                  title="Scroll ke atas"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollList("down")}
                  disabled={!canScrollDown}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors border border-border/60"
                  aria-label="Scroll list down"
                  title="Scroll ke bawah"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mobile Header with Count & Horizontal Swipe Cue */}
            <div className="flex lg:hidden items-center justify-between px-1 mb-2 w-full min-w-0">
              <span className="text-xs font-mono text-muted-foreground">
                Pilih Proyek ({filteredProjects.length})
              </span>
              <span className="text-[11px] font-mono text-primary flex items-center gap-1">
                <span>Geser kartu</span>
                <span>→</span>
              </span>
            </div>

            {/* Scroll Container */}
            <div className="relative w-full min-w-0 max-w-full overflow-hidden">
              {/* Top fade cue on desktop */}
              {canScrollUp && (
                <div
                  onClick={() => scrollList("up")}
                  className="hidden lg:flex cursor-pointer absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-background via-background/85 to-transparent z-10 items-start justify-center pt-1 transition-opacity"
                  title="Scroll ke atas"
                >
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-card/90 border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground shadow-xs">
                    <ChevronUp className="w-3 h-3 text-primary animate-bounce" />
                    <span>Ke atas</span>
                  </span>
                </div>
              )}

              {/* The scrollable list */}
              <div
                ref={listRef}
                className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto w-full min-w-0 max-w-full max-h-none lg:max-h-[460px] pb-3 lg:pb-12 pr-1.5 scroll-smooth snap-x snap-mandatory lg:snap-none [scrollbar-width:thin] [scrollbar-color:oklch(var(--border))_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-secondary/40 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 hover:[&::-webkit-scrollbar-thumb]:bg-primary/60 [&::-webkit-scrollbar-thumb]:rounded-full"
                role="tablist"
                aria-label="Projects list"
              >
                {filteredProjects.map((project, idx) => {
                  const isSelected = idx === safeIndex;
                  return (
                    <button
                      key={project.title}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-[220px] sm:w-[260px] lg:w-full shrink-0 snap-start text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 ${
                        isSelected
                          ? "bg-card border-primary/50 shadow-xs ring-1 ring-primary/20"
                          : "bg-card/40 border-border text-muted-foreground hover:bg-card hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-foreground leading-snug line-clamp-1">
                          {project.title}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground shrink-0 truncate max-w-[105px]">
                          {project.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate">
                          {project.role}
                        </span>
                        {project.link && (
                          <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Gradient Fade on Desktop */}
              {canScrollDown && (
                <div
                  onClick={() => scrollList("down")}
                  className="hidden lg:flex cursor-pointer absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background via-background/90 to-transparent items-end justify-center pb-1.5 z-10 transition-opacity"
                  title="Scroll ke bawah untuk proyek lainnya"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/95 border border-border text-[11px] font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 shadow-sm transition-all pointer-events-auto">
                    <span>Scroll ke bawah</span>
                    <ChevronDown className="w-3.5 h-3.5 text-primary animate-bounce" />
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Active Project Detail Panel */}
          {currentProject && (
            <div
              ref={detailPanelRef}
              className="w-full min-w-0 max-w-full p-4 sm:p-6 lg:p-8 rounded-2xl border border-border bg-card shadow-sm min-h-0 lg:min-h-[440px] flex flex-col justify-between"
            >
              <div className="w-full min-w-0">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border w-full min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] sm:text-xs font-mono px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold">
                        {currentProject.category}
                      </span>
                      {currentProject.role && (
                        <span className="text-[11px] sm:text-xs font-mono text-muted-foreground">
                          • {currentProject.role}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                      {currentProject.title}
                    </h3>
                    {currentProject.impactMetric && (
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] sm:text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{currentProject.impactMetric}</span>
                      </div>
                    )}
                  </div>

                  {/* External Live Action */}
                  {currentProject.link && (
                    <Button
                      asChild
                      size="sm"
                      className="w-full sm:w-auto min-h-[42px] sm:min-h-0 rounded-full px-4 text-xs font-medium shadow-xs shrink-0"
                    >
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 text-primary-foreground font-semibold"
                      >
                        <span>Visit Live Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    </Button>
                  )}
                </div>

                {/* Narrative Overview */}
                <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                  {currentProject.description}
                </p>

                {/* Architecture Highlights & Capabilities */}
                {currentProject.architectureNotes && currentProject.architectureNotes.length > 0 && (
                  <div className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5 w-full min-w-0">
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                      Key Architectural Highlights & Capabilities
                    </span>
                    {currentProject.architectureNotes.map((note, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-muted-foreground w-full min-w-0"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed text-foreground/90 break-words flex-1 min-w-0">
                          {note}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technologies Applied */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border w-full min-w-0">
                <span className="text-[11px] sm:text-xs font-mono text-muted-foreground block mb-2">
                  Technologies Applied:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-secondary border border-border/80 text-[11px] sm:text-xs font-mono font-medium text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
