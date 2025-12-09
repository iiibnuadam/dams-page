"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

type HeroProps = {
  name: string;
  tags: string[];
  description: string;
  cta?: string;
  contact?: string;
  skills?: string[];
};

export default function Hero({
  name,
  tags,
  description,
  cta = "View My Work",
  contact = "Contact Me",
  skills = [],
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
      className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      aria-label="Hero"
    >
      {/* Minimalist Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-background to-background dark:from-blue-900/10" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium"
          >
            Available for work
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
            {name}
          </h1>

          <div className="h-8 md:h-10 mb-8 flex justify-center lg:justify-start items-center text-xl md:text-2xl text-muted-foreground font-medium">
            <span>I am a </span>
            <span className="ml-2 text-foreground font-semibold">
              {displayText}
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-0.5 h-6 md:h-8 bg-primary ml-1"
            />
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {description}
          </p>

          {/* Tech Stack */}
          {skills && skills.length > 0 && (
            <div className="mb-10">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Tech Stack
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.5 }}
                    className="px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-secondary-foreground text-sm font-medium transition-colors cursor-default border border-border/50"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="rounded-full text-base px-8 h-12"
              onClick={() => handleScroll("#projects")}
            >
              {cta}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 h-12"
              onClick={() => handleScroll("#contact")}
            >
              {contact}
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-[2rem] rotate-6 opacity-20 blur-2xl" />
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl bg-background">
              <Image
                src="https://media.licdn.com/dms/image/v2/D5603AQEpAjotJThYXg/profile-displayphoto-crop_800_800/B56Zl6s38oH8AI-/0/1758700213131?e=1766620800&v=beta&t=nl4OFkDexdExnK0kniY0R9M-T1-6ocze4Y6qSpNsDo4"
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
