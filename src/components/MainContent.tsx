"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import EducationAndAwards from "@/components/EducationAndAwards";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingHireMe from "@/components/FloatingHireMe";
import { useTranslation } from "react-i18next";
import {
  Hero as HeroType,
  About as AboutType,
  WorkExperience as WorkExperienceType,
  EducationAndAwards as EducationAndAwardsType,
  Projects as ProjectsType,
  Contact as ContactType,
  Footer as FooterType,
} from "@/types/portfolio";

type MainContentProps = {
  cmsData?: Partial<{
    hero: Record<string, HeroType>;
    about: Record<string, AboutType>;
    workExperience: Record<string, WorkExperienceType>;
    educationAndAwards: Record<string, EducationAndAwardsType>;
    projects: Record<string, ProjectsType>;
    contact: Record<string, ContactType>;
    footer: Record<string, FooterType>;
  }>;
};

export default function MainContent({ cmsData }: MainContentProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("id") ? "id" : "en";

  const hero =
    cmsData?.hero?.[lang] || (t("hero", { returnObjects: true }) as HeroType);
  const about =
    cmsData?.about?.[lang] ||
    (t("about", { returnObjects: true }) as AboutType);
  const workExperience =
    cmsData?.workExperience?.[lang] ||
    (t("workExperience", {
      returnObjects: true,
    }) as WorkExperienceType);
  const educationAndAwards =
    cmsData?.educationAndAwards?.[lang] ||
    (t("educationAndAwards", {
      returnObjects: true,
    }) as EducationAndAwardsType);
  const projects =
    cmsData?.projects?.[lang] ||
    (t("projects", { returnObjects: true }) as ProjectsType);
  const contact =
    cmsData?.contact?.[lang] ||
    (t("contact", { returnObjects: true }) as ContactType);
  const footer =
    cmsData?.footer?.[lang] ||
    (t("footer", { returnObjects: true }) as FooterType);

  return (
    <>
      <Header />
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
