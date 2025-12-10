"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkExperience from "@/components/WorkExperience";
import EducationAndAwards from "@/components/EducationAndAwards";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { extractLocalizedData } from "@/lib/utils";
import {
  Hero as HeroType,
  WorkExperience as WorkExperienceType,
  EducationAndAwards as EducationAndAwardsType,
  Projects as ProjectsType,
  Contact as ContactType,
  Footer as FooterType,
  Nav as NavType,
} from "@/types/portfolio";

export default function PreviewPage() {
  const [state, setState] = useState<{
    section: string;
    data: any;
    lang: "en" | "id";
  } | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "UPDATE_PREVIEW") {
        setState({
          section: event.data.section,
          data: event.data.data,
          lang: event.data.lang,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!state || !state.data) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground text-sm">
        Loading preview...
      </div>
    );
  }

  const { section, data, lang } = state;
  const localizedData = extractLocalizedData(data, lang);

  const renderContent = () => {
    switch (section) {
      case "nav":
        return (
          <div className="relative min-h-[100px] w-full bg-background/50 p-4 rounded-lg border">
            <Header nav={localizedData as NavType} />
            <div className="mt-20 text-center text-muted-foreground text-sm">
              (Header is fixed to top of viewport)
            </div>
          </div>
        );
      case "hero":
        return <Hero {...(localizedData as HeroType)} lang={lang} />;
      case "workExperience":
        const weData = localizedData as WorkExperienceType;
        return (
          <WorkExperience
            experiences={weData.experiences || []}
            title={weData.title}
          />
        );
      case "educationAndAwards":
        const eaData = localizedData as EducationAndAwardsType;
        return (
          <EducationAndAwards
            education={eaData.education || []}
            awards={eaData.awards || []}
            organizations={eaData.organizations || []}
            titles={{
              main: eaData.title,
              education: eaData.educationTitle,
              awards: eaData.awardsTitle,
              organizations: eaData.organizationsTitle,
            }}
          />
        );
      case "projects":
        const pData = localizedData as ProjectsType;
        return <Projects projects={pData.items || []} texts={pData} />;
      case "contact":
        return <Contact contact={localizedData as ContactType} />;
      case "footer":
        return <Footer text={(localizedData as FooterType).rights} />;
      default:
        return <div>No preview available</div>;
    }
  };

  return <div className="min-h-screen bg-background">{renderContent()}</div>;
}
