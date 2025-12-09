"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type HeroProps = {
  name: string;
  tags: string[];
  description: string;
  cta?: string;
  contact?: string;
};

export default function Hero({
  name,
  tags,
  description,
  cta = "View My Work",
}: HeroProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fallback if tags is undefined or empty
  const safeTags = tags && tags.length > 0 ? tags : ["Developer"];

  useEffect(() => {
    const currentTag = safeTags[currentTagIndex];

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayText(currentTag.substring(0, displayText.length - 1));
        } else {
          setDisplayText(currentTag.substring(0, displayText.length + 1));
        }

        if (!isDeleting && displayText === currentTag) {
          setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
        } else if (isDeleting && displayText === "") {
          setIsDeleting(false);
          setCurrentTagIndex((prev) => (prev + 1) % safeTags.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTagIndex, safeTags]);

  const handleScroll = (targetId: string) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Effects */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-6 md:p-12 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-2xl relative group"
        >
          {/* Playful decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-tr from-teal-400 to-emerald-400 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity"
          />

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-6 md:mb-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm"
          >
            {name}
          </motion.h1>

          <motion.div className="h-8 md:h-12 mb-8">
            <p className="text-xl md:text-3xl font-bold text-foreground/80">
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1 h-6 md:h-8 bg-primary ml-1 align-middle"
              />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="rounded-full text-white text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
              onClick={() => handleScroll("#projects")}
            >
              {cta}
            </Button>
            <Button
              size="lg"
              className="rounded-full text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              onClick={() => handleScroll("#contact")}
            >
              <span className="relative z-10 flex items-center gap-2">
                Hire Me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </span>
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
