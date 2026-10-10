"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Nav } from "@/types/portfolio";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function FlagID({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[3px] overflow-hidden border border-border/80 shadow-xs shrink-0 inline-block align-middle`}
      viewBox="0 0 24 16"
      aria-hidden="true"
    >
      <rect width="24" height="8" fill="#E70011" />
      <rect y="8" width="24" height="8" fill="#FFFFFF" />
    </svg>
  );
}

function FlagEN({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`${className} rounded-[3px] overflow-hidden border border-border/80 shadow-xs shrink-0 inline-block align-middle`}
      viewBox="0 0 60 30"
      aria-hidden="true"
    >
      <clipPath id="uk-flag-clip-header">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-flag-diags-header">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip-header)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#uk-flag-diags-header)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

interface HeaderProps {
  nav?: Nav;
}

export default function Header({ nav: navProp }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [wibTime, setWibTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  const nav = navProp || {
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    contact: "Contact",
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setWibTime(`${timeStr} WIB`);
      } catch {
        setWibTime("Jakarta, ID");
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ["hero", "experience", "projects", "contact"];
      let currentSection = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation: Escape key closes mobile menu (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { href: "#experience", label: nav.experience || "Experience", id: "experience" },
    { href: "#projects", label: nav.projects || "Projects", id: "projects" },
    { href: "#contact", label: nav.contact || "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/85 backdrop-blur-md border-b border-border shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand / Live Status Widget */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="flex items-center gap-2 group font-bold tracking-tight text-foreground focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="Ibnu Adam Homepage"
          >
            <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <Image
                src="/logo-dark.png"
                alt="Ibnu Adam Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain dark:hidden"
                priority
              />
              <Image
                src="/logo-white.png"
                alt="Ibnu Adam Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain hidden dark:block"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-tight">
                Ibnu Adam
              </span>
              <span className="text-[11px] text-muted-foreground font-mono leading-none">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Time & Live Status Pill (Hydration-safe with suppressHydrationWarning) */}
          <div
            className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary/80 border border-border text-[11px] text-muted-foreground font-mono"
            title="Current time in Jakarta (UTC+7)"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span suppressHydrationWarning>{wibTime || "Jakarta WIB"}</span>
          </div>
        </div>


        {/* Right Controls: Language, Theme, Contact CTA */}
        <div className="flex items-center gap-2">
          {/* Language Selector with Flags (Hydration-safe) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 rounded-lg hover:bg-secondary flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Change Language"
                title={mounted && i18n.language?.startsWith("id") ? "Bahasa Indonesia" : "English"}
              >
                <span suppressHydrationWarning className="flex items-center justify-center">
                  {mounted && i18n.language?.startsWith("id") ? (
                    <FlagID className="w-5 h-3.5" />
                  ) : (
                    <FlagEN className="w-5 h-3.5" />
                  )}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px] p-1.5">
              <DropdownMenuItem
                onClick={() => i18n.changeLanguage("en")}
                className={`flex items-center gap-2.5 cursor-pointer py-2 rounded-lg text-xs ${
                  !i18n.language?.startsWith("id")
                    ? "font-semibold text-primary bg-secondary/60"
                    : "text-foreground"
                }`}
              >
                <FlagEN className="w-4 h-3" />
                <span>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => i18n.changeLanguage("id")}
                className={`flex items-center gap-2.5 cursor-pointer py-2 rounded-lg text-xs ${
                  i18n.language?.startsWith("id")
                    ? "font-semibold text-primary bg-secondary/60"
                    : "text-foreground"
                }`}
              >
                <FlagID className="w-4 h-3" />
                <span>Bahasa (ID)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          {/* Quick Header CTA */}
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex h-9 px-4 rounded-full font-medium shadow-xs"
          >
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
            >
              Let&apos;s Talk
            </a>
          </Button>

          {/* Mobile Menu Toggle Button (tap target >= 44px, R-03) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden h-11 w-11 rounded-lg text-foreground focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer (Accessible, keyboard navigable, R-03, R-32) */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed inset-x-0 top-[65px] bg-background/95 backdrop-blur-lg border-b border-border p-6 shadow-xl animate-in slide-in-from-top-4 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`min-h-[44px] flex items-center px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-border mt-2">
              <Button
                asChild
                className="w-full min-h-[44px] rounded-lg font-medium"
              >
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                >
                  Let&apos;s Talk
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
