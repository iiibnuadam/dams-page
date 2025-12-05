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
import "@/lib/i18n";
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

export default function MainContent() {
  const { t } = useTranslation();

  const hero = t("hero", { returnObjects: true }) as HeroType;
  const about = t("about", { returnObjects: true }) as AboutType;
  const workExperience = t("workExperience", {
    returnObjects: true,
  }) as WorkExperienceType;
  const educationAndAwards = t("educationAndAwards", {
    returnObjects: true,
  }) as EducationAndAwardsType;
  const projects = t("projects", { returnObjects: true }) as ProjectsType;
  const contact = t("contact", { returnObjects: true }) as ContactType;
  const footer = t("footer", { returnObjects: true }) as FooterType;

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
