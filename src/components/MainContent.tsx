"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkExperience from "@/components/WorkExperience";
import EducationAndAwards from "@/components/EducationAndAwards";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import FloatingHireMe from "@/components/FloatingHireMe";
import TechStackExplorer from "@/components/TechStackExplorer";
import SlideNavigator from "@/components/SlideNavigator";
import { extractLocalizedData } from "@/lib/utils";
import { useTranslation } from "react-i18next";
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
import { fallbackTranslations } from "@/lib/fallback-translations";

type MainContentProps = {
  cmsData?: CMSData;
};

export default function MainContent({ cmsData }: MainContentProps) {
  const { t, i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const effectiveLang = mounted ? i18n.language : "en";
  const lang = (effectiveLang?.startsWith("id") ? "id" : "en") as "en" | "id";

  const hasData = (data: unknown) =>
    data && typeof data === "object" && Object.keys(data).length > 0;

  const getSection = <T extends object>(
    sectionKey: keyof typeof fallbackTranslations.en,
    cmsValue: unknown
  ): T => {
    if (hasData(cmsValue)) {
      return extractLocalizedData<T>(cmsValue, lang);
    }
    const tValue = t(sectionKey, { returnObjects: true });
    if (tValue && typeof tValue === "object" && !Array.isArray(tValue)) {
      return tValue as T;
    }
    return fallbackTranslations[lang][sectionKey] as unknown as T;
  };

  const nav = getSection<NavType>("nav", cmsData?.nav);
  const hero = getSection<HeroType>("hero", cmsData?.hero);
  const workExperience = getSection<WorkExperienceType>("workExperience", cmsData?.workExperience);
  const educationAndAwards = getSection<EducationAndAwardsType>("educationAndAwards", cmsData?.educationAndAwards);
  const projects = getSection<ProjectsType>("projects", cmsData?.projects);
  const contact = getSection<ContactType>("contact", cmsData?.contact);
  const footer = getSection<FooterType>("footer", cmsData?.footer);

  const sectionOrder = (
    cmsData?.settings?.sectionOrder || [
      "workExperience",
      "projects",
      "contact",
    ]
  ).filter((s) => s !== "educationAndAwards");

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "workExperience":
        return (
          <WorkExperience
            key="workExperience"
            experiences={workExperience.experiences}
            title={workExperience.title}
          />
        );
      case "educationAndAwards":
        return null;
      case "projects":
        return (
          <Projects key="projects" projects={projects.items} texts={projects} />
        );
      case "contact":
        return (
          <Contact
            key="contact"
            contact={contact}
            footerText={footer.rights}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header nav={nav} />
      <main className="w-full min-w-0 max-w-full overflow-x-hidden">
        <Hero {...hero} email={contact.email} lang={lang} />
        {sectionOrder.map(renderSection)}
      </main>
      <SlideNavigator />
      <FloatingHireMe />
    </>
  );
}
