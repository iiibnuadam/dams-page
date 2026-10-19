"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ChevronUp,
  ChevronDown,
  Home,
  Briefcase,
  Layers,
  Mail,
  Command,
} from "lucide-react";

export interface SlideItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: typeof Home;
}

const SLIDES: SlideItem[] = [
  { id: "hero", label: "Home", shortLabel: "01", icon: Home },
  { id: "experience", label: "Experience", shortLabel: "02", icon: Briefcase },
  { id: "projects", label: "Projects", shortLabel: "03", icon: Layers },
  { id: "contact", label: "Contact", shortLabel: "04", icon: Mail },
];

export default function SlideNavigator() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showKeyHint, setShowKeyHint] = useState(true);

  const scrollToSlide = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const goToNextSlide = useCallback(() => {
    const nextIdx = Math.min(activeSlideIndex + 1, SLIDES.length - 1);
    scrollToSlide(SLIDES[nextIdx].id);
  }, [activeSlideIndex, scrollToSlide]);

  const goToPrevSlide = useCallback(() => {
    const prevIdx = Math.max(activeSlideIndex - 1, 0);
    scrollToSlide(SLIDES[prevIdx].id);
  }, [activeSlideIndex, scrollToSlide]);

  // Track active slide via IntersectionObserver
  useEffect(() => {
    const slideElements = SLIDES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (slideElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const foundIdx = SLIDES.findIndex((s) => s.id === entry.target.id);
            if (foundIdx !== -1) {
              setActiveSlideIndex(foundIdx);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    slideElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Global Keyboard Navigation (WCAG R-32 compliant)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input, textarea, or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToNextSlide();
        setShowKeyHint(false);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToPrevSlide();
        setShowKeyHint(false);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToSlide(SLIDES[0].id);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToSlide(SLIDES[SLIDES.length - 1].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, scrollToSlide]);

  return (
    <>
      {/* Deck Dock (Solid architectural surface, R-10 dose cap) */}
      <nav
        aria-label="Deck slide navigation"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center p-2 rounded-2xl bg-card border border-border shadow-md pointer-events-auto select-none"
      >
        {/* Slide Items List */}
        <div className="flex flex-col items-center gap-1.5 py-0.5">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === activeSlideIndex;
            const Icon = slide.icon;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollToSlide(slide.id)}
                className={`group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                aria-label={`Jump to ${slide.label}`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Tooltip (Left side - only visible on hover) */}
                <div
                  className={`absolute right-13 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 pointer-events-none flex items-center gap-2 shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-card ${
                    isActive
                      ? "text-foreground border-primary"
                      : "text-muted-foreground border-border"
                  }`}
                >
                  <span className="text-foreground font-semibold">
                    {slide.label}
                  </span>
                </div>

                {/* Icon Inside Dock */}
                <Icon
                  className={`transition-transform duration-200 ${
                    isActive
                      ? "w-4 h-4"
                      : "w-4 h-4 opacity-75 group-hover:opacity-100"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Hairline Divider */}
        <div className="w-6 h-px bg-border my-1.5" />

        {/* Integrated Up / Down Jump Controls */}
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            onClick={goToPrevSlide}
            disabled={activeSlideIndex === 0}
            className="w-8 h-7 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-25 disabled:pointer-events-none transition-colors"
            aria-label="Previous slide"
            title="Previous slide (Arrow Up)"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={goToNextSlide}
            disabled={activeSlideIndex === SLIDES.length - 1}
            className="w-8 h-7 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-25 disabled:pointer-events-none transition-colors"
            aria-label="Next slide"
            title="Next slide (Arrow Down)"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Floating Keyboard Navigation Prompt (Desktop only) */}
      {showKeyHint && (
        <aside
          aria-label="Keyboard navigation hint"
          className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-mono text-muted-foreground shadow-sm animate-fade-in"
        >
          <Command className="w-3.5 h-3.5 text-primary" />
          <span>Navigasi: [↑] [↓] atau scroll</span>
          <button
            type="button"
            onClick={() => setShowKeyHint(false)}
            className="ml-1 text-muted-foreground hover:text-foreground text-[10px] uppercase font-bold"
            aria-label="Dismiss keyboard hint"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Mobile Top Deck Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-secondary lg:hidden"
      >
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${((activeSlideIndex + 1) / SLIDES.length) * 100}%`,
          }}
        />
      </div>
    </>
  );
}
