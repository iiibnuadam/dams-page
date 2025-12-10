"use client";

import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
};

type ProjectsProps = {
  projects: Project[];
  texts: {
    title: string;
    subtitle: string;
    moreComingSoon: string;
    viewProject: string;
  };
};

export default function Projects({ projects, texts }: ProjectsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 relative overflow-hidden"
      aria-label="Proyek"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-background to-background -z-10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400 leading-tight">
              {texts.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              {texts.subtitle}
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full hover:bg-blue-500/10 hover:text-blue-500 border-black/10 dark:border-white/10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full hover:bg-cyan-500/10 hover:text-cyan-500 border-black/10 dark:border-white/10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 snap-center w-[85vw] md:w-[450px]"
              >
                <Card className="h-full flex flex-col bg-background/80 dark:bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 group overflow-hidden">
                  {/* Decorative Header Gradient */}
                  <div
                    className={`h-2 w-full bg-gradient-to-r ${
                      index % 2 === 0
                        ? "from-blue-600 to-indigo-500"
                        : "from-cyan-500 to-blue-500"
                    }`}
                  />

                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-2xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-secondary rounded-full"
                            aria-label={`View ${project.title} source code on GitHub`}
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-secondary rounded-full"
                            aria-label={`Visit ${project.title} live site`}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-base mt-2 line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-end gap-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-secondary/50 hover:bg-secondary text-secondary-foreground border-transparent"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.link && (
                      <Button
                        variant="ghost"
                        className="w-full group/btn hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 justify-between"
                        asChild
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${texts.viewProject} - ${project.title}`}
                        >
                          {texts.viewProject}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* "Add More" Placeholder Card (Optional, visual cue) */}
          <div className="flex-shrink-0 w-[200px] flex items-center justify-center snap-center">
            <div className="text-center text-muted-foreground/50 text-sm">
              <p>{texts.moreComingSoon}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
