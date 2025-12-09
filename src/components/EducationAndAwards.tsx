"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Trophy, Users } from "lucide-react";

type Education = {
  institution: string;
  degree: string;
  period: string;
  description: string[];
};

type Award = {
  title: string;
  issuer: string;
  date: string;
  associatedWith: string;
  type: "gold" | "silver" | "bronze" | "star";
};

type Organization = {
  role: string;
  organization: string;
  period: string;
  associatedWith: string;
};

type EducationAndAwardsProps = {
  education: Education[];
  awards: Award[];
  organizations: Organization[];
  titles: {
    main: string;
    education: string;
    awards: string;
    organizations: string;
  };
};

export default function EducationAndAwards({
  education,
  awards,
  organizations,
  titles,
}: EducationAndAwardsProps) {
  return (
    <section
      id="education"
      className="py-20 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 leading-tight"
        >
          {titles.main}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Education & Organizations */}
          <div className="space-y-12">
            {/* Education Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">{titles.education}</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-background/80 dark:bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-md">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2 gap-4">
                          <CardTitle className="text-xl font-bold leading-tight">
                            {edu.institution}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shrink-0"
                          >
                            {edu.period}
                          </Badge>
                        </div>
                        <div className="text-lg font-medium text-blue-600 dark:text-blue-400">
                          {edu.degree}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
                          {edu.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Organizations Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">{titles.organizations}</h3>
              </div>

              <div className="space-y-6">
                {organizations.map((org, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-background/80 dark:bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-md">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2 gap-4">
                          <h4 className="text-lg font-bold leading-tight">
                            {org.role}
                          </h4>
                          <Badge
                            variant="outline"
                            className="shrink-0 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300"
                          >
                            {org.period}
                          </Badge>
                        </div>
                        <div className="text-base font-medium text-cyan-600 dark:text-cyan-400 mb-1">
                          {org.organization}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {org.associatedWith}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Awards */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">{titles.awards}</h3>
            </div>

            <div className="relative border-l-2 border-border/50 ml-3 space-y-8 pl-8 py-2">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[41px] top-6 w-5 h-5 rounded-full border-4 border-background z-10 ${
                      award.type === "gold"
                        ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                        : award.type === "silver"
                        ? "bg-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.5)]"
                        : award.type === "bronze"
                        ? "bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.5)]"
                        : "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    }`}
                  />

                  <Card className="bg-background/80 dark:bg-card/50 backdrop-blur-sm border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-lg font-bold leading-tight group-hover:text-indigo-500 transition-colors">
                          {award.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                          <span className="font-medium text-foreground/80 flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {award.issuer}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="bg-secondary/50 px-2 py-0.5 rounded text-xs">
                            {award.date}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground/60 mt-1">
                          {award.associatedWith}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
