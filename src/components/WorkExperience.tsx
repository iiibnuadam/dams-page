"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { BlurText } from "@/components/reactbits/BlurText";

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
  const [activeTab, setActiveTab] = useState(experiences[0]?.company || "");

  return (
    <section
      id="experience"
      className="py-20 md:py-32 px-4 relative overflow-hidden bg-background"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-16 relative z-10">
          <BlurText 
            text={title} 
            delay={0.05} 
            className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400 leading-tight" 
          />
        </div>

        <Tabs.Root
          defaultValue={experiences[0]?.company}
          onValueChange={setActiveTab}
          className="flex flex-col md:flex-row gap-6 md:gap-10 min-h-[600px] items-stretch"
        >
          {/* Sidebar / Tabs List */}
          <Tabs.List
            className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible md:w-[350px] lg:w-[400px] shrink-0 gap-4 hide-scrollbar pb-4 md:pb-0 h-full"
            aria-label="Work Experience Tabs"
          >
            {experiences.map((exp) => {
              const isActive = activeTab === exp.company;
              return (
                <Tabs.Trigger
                  key={exp.company}
                  value={exp.company}
                  className={`relative flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 p-5 md:p-8 rounded-3xl border text-left transition-all duration-300 focus-visible:outline-none group overflow-hidden ${
                    isActive
                      ? "bg-white/90 dark:bg-zinc-900/90 border-blue-500/30 dark:border-cyan-500/30 shadow-xl shadow-blue-500/5 dark:shadow-cyan-400/5 text-foreground"
                      : "bg-secondary/20 border-border/50 hover:bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {/* Decorative Background Glow on Active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 dark:from-blue-500/10 dark:to-cyan-400/10 -z-10" />
                  )}

                  {/* Tab Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0 rounded-2xl overflow-hidden bg-background/50 p-2 md:p-3 border border-border/50 transition-transform duration-500 ${isActive ? 'scale-110 shadow-md ring-1 ring-blue-500/20' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                    {exp.logo && (
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                  
                  {/* Tab Text Content */}
                  <div className="flex flex-col justify-center">
                    <span className={`font-bold text-lg md:text-2xl tracking-tight mb-1 ${isActive ? 'text-blue-600 dark:text-cyan-400' : ''}`}>
                      {exp.company}
                    </span>
                    <span className="text-sm md:text-base font-medium leading-snug">
                      {exp.position}
                    </span>
                    {isActive && (
                      <motion.span 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3"
                      >
                        {exp.period}
                      </motion.span>
                    )}
                  </div>
                </Tabs.Trigger>
              );
            })}
          </Tabs.List>

          {/* Main Content Area */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              {experiences.map((exp) =>
                activeTab === exp.company ? (
                  <Tabs.Content
                    key={exp.company}
                    value={exp.company}
                    asChild
                    forceMount
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 20, filter: "blur(8px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0 }}
                      className="h-full"
                    >
                      <Card className="h-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden group/card relative">
                        {/* Decorative Top Gradient */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-50 group-hover/card:opacity-100 transition-opacity duration-500" />
                        
                        <div className="p-6 md:p-8 flex flex-col h-full gap-8">
                          {/* Header Section */}
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 pb-6 border-b border-border/50">
                            <div>
                              <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-2">
                                {exp.position}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 text-muted-foreground font-medium">
                                <span className="text-blue-600 dark:text-cyan-400">
                                  {exp.company}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span>{exp.location}</span>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <Badge variant="secondary" className="bg-secondary/50 font-normal">
                                  {exp.type}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex flex-col md:items-end text-sm text-muted-foreground/80 bg-secondary/30 px-3 py-2 rounded-lg border border-border/50 shrink-0">
                              <span className="font-semibold text-foreground/90">{exp.period}</span>
                              <span>{exp.duration}</span>
                            </div>
                          </div>

                          {/* Details List */}
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-widest mb-4">
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-4">
                              {exp.description.map((desc, i) => (
                                <motion.li
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 + 0.2 }}
                                  key={i}
                                  className="flex items-start gap-3.5 text-muted-foreground/90 leading-relaxed max-w-3xl"
                                >
                                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                  <span className="text-[15px]">{desc}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Skills Footer */}
                          <div className="pt-6 mt-auto bg-secondary/10 -mx-6 -mb-6 p-6 md:-mx-8 md:-mb-8 md:p-8 border-t border-border/50">
                            <h4 className="text-sm font-semibold mb-4 text-foreground/80 flex items-center gap-2">
                              <span className="w-4 h-[1px] bg-border" />
                              Technologies Used
                              <span className="flex-1 h-[1px] bg-border" />
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, i) => (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 + 0.4 }}
                                  key={skill}
                                >
                                  <Badge
                                    variant="outline"
                                    className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-secondary hover:border-blue-500/30 transition-all font-medium py-1 px-3 shadow-sm"
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </Tabs.Content>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </Tabs.Root>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
