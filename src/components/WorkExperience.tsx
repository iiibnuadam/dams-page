"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Experience = {
  position: string;
  company: string;
  location: string;
  type: string;
  period: string;
  duration: string;
  description: string[];
  skills: string[];
};

type WorkExperienceProps = {
  experiences: Experience[];
  title?: string;
};

export default function WorkExperience({
  experiences,
  title = "Work Experience",
}: WorkExperienceProps) {
  return (
    <section
      id="experience"
      className="py-20 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400 leading-tight"
        >
          {title}
        </motion.h2>

        <div className="relative space-y-12">
          {/* Vertical Line for Timeline (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-cyan-500/20 to-transparent -translate-x-1/2" />

          {/* Global Gradients for SVGs */}
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient
                id="connectorGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot & Connector */}
              <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 z-10">
                <div className="w-4 h-4 bg-background border-2 border-blue-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              </div>

              {/* S-Line Connector */}
              <svg
                className={`hidden md:block absolute top-8 w-24 h-24 z-0 pointer-events-none ${
                  index % 2 === 0 ? "left-1/2" : "right-1/2 scale-x-[-1]"
                }`}
                style={{ overflow: "visible" }}
              >
                <path
                  d="M 0 8 C 40 8, 40 40, 80 40"
                  fill="none"
                  stroke="url(#connectorGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Decorative Dot at end of connector */}
                <circle
                  cx="80"
                  cy="40"
                  r="3"
                  fill="#06b6d4"
                  className="animate-pulse"
                />
              </svg>

              {/* Content Card */}
              <div className="flex-1">
                <Card className="h-full bg-background/80 dark:bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
                  <CardHeader>
                    <div className="flex flex-col gap-2 mb-2">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <CardTitle className="text-xl md:text-2xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {exp.position}
                        </CardTitle>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                        >
                          {exp.type}
                        </Badge>
                      </div>
                      <div className="text-lg font-semibold text-foreground/90">
                        {exp.company}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground font-medium">
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {exp.location}
                        </span>
                        <span className="hidden sm:inline text-muted-foreground/50">
                          •
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                              ry="2"
                            />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                          {exp.period}
                        </span>
                        <span className="hidden sm:inline text-muted-foreground/50">
                          •
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {exp.duration}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground mb-6 text-base">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="leading-relaxed">
                          {desc}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-secondary/50 hover:bg-secondary text-secondary-foreground border-transparent hover:border-blue-500/30 transition-all"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Empty space for the other side of the timeline */}
              <div className="flex-1 hidden md:flex items-center justify-center opacity-10 pointer-events-none select-none">
                <span className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-transparent blur-[2px]">
                  {exp.period.match(/\d{4}/)?.[0] || ""}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
