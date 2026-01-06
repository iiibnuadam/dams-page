export interface Nav {
  experience: string;
  education: string;
  projects: string;
  contact: string;
  logo?: {
    light?: string;
    dark?: string;
  };
}

export interface Hero {
  name: string;
  tags: string[];
  description: string;
  cta: string;
  contact: string;
  status: {
    variant: "available" | "open" | "busy";
  };
  skills: string[];
}

export interface Experience {
  position: string;
  company: string;
  logo?: string;
  location: string;
  type: string;
  period: string;
  duration: string;
  description: string[];
  skills: string[];
}

export interface WorkExperience {
  title: string;
  experiences: Experience[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string[];
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  associatedWith: string;
  type: "gold" | "silver" | "bronze" | "star";
}

export interface Organization {
  role: string;
  organization: string;
  period: string;
  associatedWith: string;
}

export interface EducationAndAwards {
  title: string;
  educationTitle: string;
  awardsTitle: string;
  organizationsTitle: string;
  education: Education[];
  awards: Award[];
  organizations: Organization[];
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Projects {
  title: string;
  subtitle: string;
  moreComingSoon: string;
  viewProject: string;
  liveDemo: string;
  items: ProjectItem[];
}

export interface Contact {
  title: string;
  description: string;
  email: string;
  socials: {
    platform: string;
    url: string;
  }[];
  cta?: string;
}

export interface Footer {
  rights: string;
}

export interface PortfolioContent {
  nav: Nav;
  hero: Hero;
  workExperience: WorkExperience;
  educationAndAwards: EducationAndAwards;
  projects: Projects;
  contact: Contact;
  footer: Footer;
}
