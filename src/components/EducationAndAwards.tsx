"use client";

import { useState, useRef } from "react";
import { GraduationCap, Users, Trophy, Star, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string[];
}

interface Award {
  title: string;
  issuer: string;
  date: string;
  associatedWith: string;
  type: "gold" | "silver" | "bronze" | "star";
}

interface Organization {
  role: string;
  organization: string;
  period: string;
  associatedWith: string;
}

interface EducationAndAwardsProps {
  education?: Education[];
  awards?: Award[];
  organizations?: Organization[];
  titles?: {
    main?: string;
    education?: string;
    awards?: string;
    organizations?: string;
  };
}

export default function EducationAndAwards({
  education = [],
  awards = [],
  organizations = [],
  titles,
}: EducationAndAwardsProps) {
  const [activeTab, setActiveTab] = useState<"education" | "awards" | "leadership">("education");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sanitize any em dashes into standard hyphens (R-02)
  const clean = (val: string) => val.replace(/—|–/g, "-");

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const defaultEducation: Education[] = [
    {
      institution: "Universitas Negeri Yogyakarta",
      degree: "Undergraduate of Informatics Engineering",
      period: "2018 - 2023",
      description: [
        "Concentration: Software Engineering and Information Systems",
        "GPA: 3.79 (Graduate with Honors)",
        "Key Coursework: Software Engineering, Data Structures, Information Systems Management",
      ],
    },
  ];

  const defaultAwards: Award[] = [
    {
      title: "Mahasiswa Berprestasi 2021",
      issuer: "Universitas Negeri Yogyakarta",
      date: "Apr 2021",
      associatedWith: "UNY",
      type: "gold",
    },
    {
      title: "Awardee Bank Indonesia Scholarship",
      issuer: "Bank Indonesia",
      date: "Feb 2021",
      associatedWith: "Bank Indonesia",
      type: "gold",
    },
    {
      title: "3rd Winner of Software Development - Techcomfest",
      issuer: "Politeknik Negeri Semarang",
      date: "Jan 2021",
      associatedWith: "Polines",
      type: "bronze",
    },
    {
      title: "Mahasiswa Berprestasi 2020",
      issuer: "Universitas Negeri Yogyakarta",
      date: "Nov 2020",
      associatedWith: "UNY",
      type: "gold",
    },
    {
      title: "Gemastik 13 - Finalist of Software Development",
      issuer: "Kemendikbud",
      date: "Sep 2020",
      associatedWith: "Kemendikbud",
      type: "star",
    },
    {
      title: "Gemastik 12 - Finalist of User Experience",
      issuer: "Kemenristekdikti",
      date: "Sep 2019",
      associatedWith: "Kemenristekdikti",
      type: "star",
    },
  ];

  const defaultOrganizations: Organization[] = [
    {
      role: "Media Kreatif",
      organization: "GenBI DIY",
      period: "Feb 2021 - Dec 2022",
      associatedWith: "GenBI DIY",
    },
    {
      role: "Koordinator Fakultas",
      organization: "GenBI DIY Komisariat UNY",
      period: "Feb 2020 - Dec 2020",
      associatedWith: "UNY",
    },
    {
      role: "Wakil Ketua",
      organization: "HIMANIKA FT UNY",
      period: "Feb 2020 - Dec 2020",
      associatedWith: "UNY",
    },
  ];

  const eduItems = education.length > 0 ? education : defaultEducation;
  const awardItems = awards.length > 0 ? awards : defaultAwards;
  const orgItems = organizations.length > 0 ? organizations : defaultOrganizations;

  return (
    <section
      id="education"
      className="slide-section snap-start snap-always relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-6 bg-background border-t border-border overflow-hidden"
      aria-label="Education and Achievements"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-medium mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Background</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {titles?.education || "Education"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
              Academic foundation in Informatics Engineering from Universitas Negeri Yogyakarta with honors graduation.
            </p>
          </div>

          {/* Controls: Tab Selector & Mobile Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tab Selector */}
            <div className="flex items-center gap-1 bg-secondary/70 p-1.5 rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setActiveTab("education")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "education"
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={activeTab === "education"}
              >
                Education
              </button>
              <button
                type="button"
                disabled
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground/60 cursor-not-allowed flex items-center gap-1.5 opacity-60"
                title="Awards & Honors is locked for now"
                aria-disabled="true"
              >
                <Lock className="w-3 h-3 text-muted-foreground" />
                <span>Awards & Honors ({awardItems.length})</span>
              </button>
              <button
                type="button"
                disabled
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground/60 cursor-not-allowed flex items-center gap-1.5 opacity-60"
                title="Leadership is locked for now"
                aria-disabled="true"
              >
                <Lock className="w-3 h-3 text-muted-foreground" />
                <span>Leadership</span>
              </button>
            </div>

            {/* Mobile Navigation Arrows (Visible on mobile/tablet) */}
            <div className="flex md:hidden items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="h-9 w-9 rounded-lg border-border"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="h-9 w-9 rounded-lg border-border"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center justify-between text-[11px] font-mono text-muted-foreground mb-3">
          <span>Geser horizontal untuk melihat kartu</span>
          <span>Swipe ➔</span>
        </div>

        {/* Content depending on tab: Mobile Carousel / Desktop Grid */}
        {activeTab === "awards" && (
          <div
            ref={scrollContainerRef}
            className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid-cols-2 lg:grid-cols-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {awardItems.map((item, index) => (
              <div
                key={index}
                className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-start p-5 rounded-2xl border border-border bg-card flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Star className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {clean(item.date)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground leading-snug">
                    {clean(item.title)}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>{clean(item.issuer)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "education" && (
          <div
            ref={scrollContainerRef}
            className="flex md:flex-col overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {eduItems.map((edu, index) => (
              <div
                key={index}
                className="w-[85vw] sm:w-[420px] md:w-auto shrink-0 snap-start p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-primary font-medium text-sm">
                      <GraduationCap className="w-4 h-4" />
                      <span>{edu.institution}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-secondary border border-border text-muted-foreground self-start sm:self-auto">
                    {clean(edu.period)}
                  </span>
                </div>

                <div className="mt-6 space-y-2.5">
                  {edu.description.map((desc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{clean(desc)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "leadership" && (
          <div
            ref={scrollContainerRef}
            className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid-cols-2 lg:grid-cols-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {orgItems.map((org, index) => (
              <div
                key={index}
                className="w-[82vw] sm:w-[320px] md:w-auto shrink-0 snap-start p-5 rounded-2xl border border-border bg-card flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="p-2 rounded-lg bg-secondary text-foreground">
                      <Users className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {clean(org.period)}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {clean(org.role)}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {clean(org.organization)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
