"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkExperience from "@/components/WorkExperience";
import EducationAndAwards from "@/components/EducationAndAwards";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
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
import { CMSData } from "@/types/cms";

export default function PreviewPage() {
  const { i18n } = useTranslation();
  const [fullData, setFullData] = useState<CMSData | null>(null);
  const [state, setState] = useState<{
    section: string;
    data:
      | HeroType
      | WorkExperienceType
      | EducationAndAwardsType
      | ProjectsType
      | ContactType
      | FooterType
      | NavType
      | any;
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

        // Update language
        if (event.data.lang && i18n.language !== event.data.lang) {
          i18n.changeLanguage(event.data.lang);
        }
      } else if (event.data.type === "REFRESH") {
        // Force reload full data
        setFullData(null);
        // If we are in settings, this will trigger the useEffect to fetch data again
        // If we are not in settings, we might want to reload the page or just re-fetch
        if (state?.section === "settings") {
          // Trigger re-fetch by setting fullData to null (already done)
        } else {
          window.location.reload();
        }
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, [i18n]);

  useEffect(() => {
    if (state?.section === "settings" && !fullData) {
      const fetchAllData = async () => {
        try {
          const sections = [
            "nav",
            "hero",
            "workExperience",
            "educationAndAwards",
            "projects",
            "contact",
            "footer",
          ];
          const results = await Promise.all(
            sections.map((s) => fetch(`/api/cms/${s}`).then((r) => r.json()))
          );
          const data = sections.reduce((acc, section, idx) => {
            acc[section as keyof CMSData] = results[idx];
            return acc;
          }, {} as CMSData);
          setFullData(data);
        } catch (error) {
          console.error("Error fetching full data for preview:", error);
        }
      };
      fetchAllData();
    }
  }, [state?.section, fullData]);

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
      case "settings":
        if (!fullData) {
          return (
            <div className="flex items-center justify-center min-h-screen text-muted-foreground text-sm">
              Loading full preview...
            </div>
          );
        }
        // Merge the new settings (order) with the full data
        const mergedData: CMSData = {
          ...fullData,
          settings: data,
        };
        return <MainContent cmsData={mergedData} />;
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
