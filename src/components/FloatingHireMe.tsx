"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "@/lib/gsap";

export default function FloatingHireMe() {
  const [isVisible, setIsVisible] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!dockRef.current) return;
    if (isVisible) {
      gsap.fromTo(
        dockRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [isVisible]);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Floating Quick Actions"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2"
    >
      <div
        ref={dockRef}
        className="flex items-center gap-2 p-1.5 rounded-xl bg-card border border-border shadow-md"
      >
        <button
          type="button"
          onClick={scrollToContact}
          className="min-h-[44px] min-w-[44px] px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
          aria-label="Scroll to contact section to talk with Ibnu Adam"
        >
          <span>Let&apos;s Talk</span>
        </button>

        <button
          type="button"
          onClick={scrollToTop}
          className="min-h-[44px] min-w-[44px] p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Back to top of page"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
