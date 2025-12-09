"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type Experience = {
  position: string;
  company: string;
  logo?: string;
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
              <div className="flex-1 z-10">
                <Card className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border-black/5 dark:border-white/10 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group rounded-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-4">
                        {exp.logo && (
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shadow-sm border border-border/50 flex-shrink-0 p-2">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-xl md:text-2xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors mb-1">
                            {exp.position}
                          </CardTitle>
                          <div className="flex flex-col gap-1 mt-1">
                            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground/70">
                              <span>{exp.company}</span>
                              <span className="hidden md:inline text-foreground/30">
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
                                  className="text-muted-foreground"
                                >
                                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                {exp.location}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="font-medium text-foreground/80">
                                {exp.period}
                              </span>
                              <span className="text-foreground/30">•</span>
                              <span>{exp.duration}</span>
                            </div>
                            <div className="mt-1">
                              <Badge
                                variant="secondary"
                                className="bg-blue-100/50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40 text-xs font-normal"
                              >
                                {exp.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 flex-shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-secondary/30 hover:bg-secondary/50 text-secondary-foreground/80 border-border/50 transition-colors text-xs py-0.5"
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
