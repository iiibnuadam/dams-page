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
                    <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-md border-black/5 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl font-bold">
                            {edu.institution}
                          </CardTitle>
                          <Badge
                            variant="secondary"
                            className="bg-blue-500/10 text-blue-600 dark:text-blue-300"
                          >
                            {edu.period}
                          </Badge>
                        </div>
                        <div className="text-lg font-medium text-foreground/80">
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
                    <Card className="bg-white/60 dark:bg-white/5 backdrop-blur-md border-black/5 dark:border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold">{org.role}</h4>
                          <span className="text-sm text-muted-foreground bg-black/5 dark:bg-white/10 px-2 py-1 rounded-md">
                            {org.period}
                          </span>
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

            <div className="relative border-l-2 border-black/5 dark:border-white/10 ml-3 space-y-8 pl-8 py-2">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background ${
                      award.type === "gold"
                        ? "bg-yellow-400"
                        : award.type === "silver"
                        ? "bg-slate-300"
                        : award.type === "bronze"
                        ? "bg-amber-600"
                        : "bg-blue-500"
                    }`}
                  />

                  <div className="flex flex-col gap-1">
                    <h4 className="text-lg font-bold leading-tight group-hover:text-indigo-500 transition-colors">
                      {award.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">
                        {award.issuer}
                      </span>
                      <span>•</span>
                      <span>{award.date}</span>
                    </div>
                    <div className="text-sm text-muted-foreground/60">
                      {award.associatedWith}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
