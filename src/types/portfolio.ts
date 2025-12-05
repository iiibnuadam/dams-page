export interface Nav {
  about: string;
  experience: string;
  education: string;
  projects: string;
  contact: string;
}

export interface Hero {
  name: string;
  title: string;
  description: string;
  cta: string;
  contact: string;
}

export interface About {
  title: string;
  bio: string;
  skillsTitle: string;
  skills: string[];
}

export interface Experience {
  position: string;
  company: string;
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
  github: string;
  linkedin: string;
  cta?: string;
  twitter?: string;
}

export interface Footer {
  rights: string;
}

export interface PortfolioContent {
  nav: Nav;
  hero: Hero;
  about: About;
  workExperience: WorkExperience;
  educationAndAwards: EducationAndAwards;
  projects: Projects;
  contact: Contact;
  footer: Footer;
}
