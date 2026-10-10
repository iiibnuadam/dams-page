"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export interface SlideItem {
  id: string;
  label: string;
  shortLabel: string;
}

const SLIDES: SlideItem[] = [
  { id: "hero", label: "Intro", shortLabel: "01" },
  { id: "stack", label: "Tech Stack", shortLabel: "02" },
  { id: "experience", label: "Experience", shortLabel: "03" },
  { id: "education", label: "Education", shortLabel: "04" },
  { id: "projects", label: "Projects", shortLabel: "05" },
  { id: "contact", label: "Contact", shortLabel: "06" },
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
      {/* Desktop Vertical Slide Indicator */}
      <nav
        aria-label="Deck slide navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2.5 pointer-events-auto"
      >
        {/* Navigation Dots with Accessible Tap Area */}
        <div className="flex flex-col items-end gap-1 p-1.5 rounded-full bg-card/70 backdrop-blur-md border border-border shadow-md">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === activeSlideIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollToSlide(slide.id)}
                className="group relative min-w-[44px] min-h-[44px] flex items-center justify-end px-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Jump to slide ${slide.shortLabel}: ${slide.label}`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Hover / Active Label Tooltip */}
                <span
                  className={`absolute right-12 px-2.5 py-1 rounded-md text-xs font-medium font-sans border transition-all duration-200 pointer-events-none whitespace-nowrap ${
                    isActive
                      ? "opacity-100 translate-x-0 bg-primary text-primary-foreground border-primary shadow-xs"
                      : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-card text-foreground border-border shadow-xs"
                  }`}
                >
                  {slide.label}
                </span>

                {/* Dot / Pill visual */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-7 h-2.5 bg-primary"
                      : "w-2.5 h-2.5 bg-muted-foreground/40 group-hover:bg-foreground group-hover:scale-125"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Up / Down Arrow Jump Controls */}
        <div className="flex flex-col gap-1 mt-1">
          <button
            type="button"
            onClick={goToPrevSlide}
            disabled={activeSlideIndex === 0}
            className="w-8 h-8 rounded-full bg-card/80 border border-border text-foreground hover:bg-secondary flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Previous slide"
            title="Previous slide (Arrow Up)"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={goToNextSlide}
            disabled={activeSlideIndex === SLIDES.length - 1}
            className="w-8 h-8 rounded-full bg-card/80 border border-border text-foreground hover:bg-secondary flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors"
            aria-label="Next slide"
            title="Next slide (Arrow Down)"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Floating Keyboard Navigation Prompt (Desktop only) */}
      {showKeyHint && (
        <aside
          aria-label="Keyboard navigation hint"
          className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/85 backdrop-blur-md border border-border text-xs font-mono text-muted-foreground shadow-md animate-fade-in"
        >
          <span className="text-foreground font-semibold">Tip:</span>
          <span>Gunakan panah [↑] [↓] untuk navigasi slide</span>
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
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-secondary/40 lg:hidden"
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
