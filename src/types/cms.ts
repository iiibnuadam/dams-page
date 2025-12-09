import {
  Experience,
  Education,
  Award,
  Organization,
  ProjectItem,
} from "./portfolio";

export type Localized<T> = {
  en: T;
  id: T;
};

export interface CMSNav {
  experience: Localized<string>;
  education: Localized<string>;
  projects: Localized<string>;
  contact: Localized<string>;
}

export interface CMSHero {
  name: Localized<string>;
  tags: string[];
  description: Localized<string>;
  cta: Localized<string>;
  contact: Localized<string>;
  status: {
    variant: "available" | "open" | "busy";
  };
  skills: string[];
}

export interface CMSWorkExperience {
  title: Localized<string>;
  experiences: Localized<Experience>[];
}

export interface CMSEducationAndAwards {
  title: Localized<string>;
  educationTitle: Localized<string>;
  awardsTitle: Localized<string>;
  organizationsTitle: Localized<string>;
  education: Localized<Education>[];
  awards: Localized<Award>[];
  organizations: Localized<Organization>[];
}

export interface CMSProjects {
  title: Localized<string>;
  subtitle: Localized<string>;
  moreComingSoon: Localized<string>;
  viewProject: Localized<string>;
  liveDemo: Localized<string>;
  items: Localized<ProjectItem>[];
}

export interface CMSContact {
  title: Localized<string>;
  description: Localized<string>;
  email: string;
  socials: {
    platform: string;
    url: string;
  }[];
  cta?: Localized<string>;
}

export interface CMSFooter {
  rights: Localized<string>;
}

export type CMSSectionData =
  | CMSNav
  | CMSHero
  | CMSWorkExperience
  | CMSEducationAndAwards
  | CMSProjects
  | CMSContact
  | CMSFooter;

export interface CMSData {
  nav?: CMSNav;
  hero?: CMSHero;
  workExperience?: CMSWorkExperience;
  educationAndAwards?: CMSEducationAndAwards;
  projects?: CMSProjects;
  contact?: CMSContact;
  footer?: CMSFooter;
}
