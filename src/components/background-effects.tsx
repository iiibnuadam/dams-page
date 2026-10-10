"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function BackgroundEffects() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle, low-friction cursor ambient light
    const handlePointerMove = (e: PointerEvent) => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden"
    >
      {/* Subtle single ambient follower; dose cap 1 (R-13) */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 dark:bg-primary/15 blur-[120px] will-change-transform opacity-70"
      />
    </div>
  );
}
