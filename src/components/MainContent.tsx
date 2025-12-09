"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import EducationAndAwards from "@/components/EducationAndAwards";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingHireMe from "@/components/FloatingHireMe";
import { extractLocalizedData } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import {
  Hero as HeroType,
  About as AboutType,
  WorkExperience as WorkExperienceType,
  EducationAndAwards as EducationAndAwardsType,
  Projects as ProjectsType,
  Contact as ContactType,
  Footer as FooterType,
  Nav as NavType,
} from "@/types/portfolio";
import { CMSData } from "@/types/cms";

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

  const nav: NavType = hasData(cmsData?.nav)
    ? extractLocalizedData<NavType>(cmsData?.nav, lang)
    : (t("nav", { returnObjects: true }) as NavType);
  const hero: HeroType = hasData(cmsData?.hero)
    ? extractLocalizedData<HeroType>(cmsData?.hero, lang)
    : (t("hero", { returnObjects: true }) as HeroType);
  const about: AboutType = hasData(cmsData?.about)
    ? extractLocalizedData<AboutType>(cmsData?.about, lang)
    : (t("about", { returnObjects: true }) as AboutType);
  const workExperience: WorkExperienceType = hasData(cmsData?.workExperience)
    ? extractLocalizedData<WorkExperienceType>(cmsData?.workExperience, lang)
    : (t("workExperience", {
        returnObjects: true,
      }) as WorkExperienceType);
  const educationAndAwards: EducationAndAwardsType = hasData(
    cmsData?.educationAndAwards
  )
    ? extractLocalizedData<EducationAndAwardsType>(
        cmsData?.educationAndAwards,
        lang
      )
    : (t("educationAndAwards", {
        returnObjects: true,
      }) as EducationAndAwardsType);
  const projects: ProjectsType = hasData(cmsData?.projects)
    ? extractLocalizedData<ProjectsType>(cmsData?.projects, lang)
    : (t("projects", { returnObjects: true }) as ProjectsType);
  const contact: ContactType = hasData(cmsData?.contact)
    ? extractLocalizedData<ContactType>(cmsData?.contact, lang)
    : (t("contact", { returnObjects: true }) as ContactType);
  const footer: FooterType = hasData(cmsData?.footer)
    ? extractLocalizedData<FooterType>(cmsData?.footer, lang)
    : (t("footer", { returnObjects: true }) as FooterType);

  return (
    <>
      <Header nav={nav} />
      <main>
        <Hero {...hero} />
        <About {...about} />
        <WorkExperience
          experiences={workExperience.experiences}
          title={workExperience.title}
        />
        <EducationAndAwards
          education={educationAndAwards.education}
          awards={educationAndAwards.awards}
          organizations={educationAndAwards.organizations}
          titles={{
            main: educationAndAwards.title,
            education: educationAndAwards.educationTitle,
            awards: educationAndAwards.awardsTitle,
            organizations: educationAndAwards.organizationsTitle,
          }}
        />
        <Projects projects={projects.items} texts={projects} />
        <Contact contact={contact} />
      </main>
      <Footer text={footer.rights} />
      <FloatingHireMe />
    </>
  );
}
