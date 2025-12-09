import { z } from "zod";

export const NavSchema = z.object({
  about: z.object({
    en: z.string().min(1, "About text is required"),
    id: z.string().min(1, "About text is required"),
  }),
  experience: z.object({
    en: z.string().min(1, "Experience text is required"),
    id: z.string().min(1, "Experience text is required"),
  }),
  education: z.object({
    en: z.string().min(1, "Education text is required"),
    id: z.string().min(1, "Education text is required"),
  }),
  projects: z.object({
    en: z.string().min(1, "Projects text is required"),
    id: z.string().min(1, "Projects text is required"),
  }),
  contact: z.object({
    en: z.string().min(1, "Contact text is required"),
    id: z.string().min(1, "Contact text is required"),
  }),
});

export const HeroSchema = z.object({
  name: z.object({
    en: z.string().min(1, "Name is required"),
    id: z.string().min(1, "Name is required"),
  }),
  title: z.object({
    en: z.string().min(1, "Title is required"),
    id: z.string().min(1, "Title is required"),
  }),
  description: z.object({
    en: z.string().min(1, "Description is required"),
    id: z.string().min(1, "Description is required"),
  }),
  cta: z.object({
    en: z.string().min(1, "CTA is required"),
    id: z.string().min(1, "CTA is required"),
  }),
  contact: z.object({
    en: z.string().min(1, "Contact button text is required"),
    id: z.string().min(1, "Contact button text is required"),
  }),
});

export const AboutSchema = z.object({
  title: z.object({
    en: z.string().min(1, "Title is required"),
    id: z.string().min(1, "Title is required"),
  }),
  bio: z.object({
    en: z.string().min(1, "Bio is required"),
    id: z.string().min(1, "Bio is required"),
  }),
  skillsTitle: z.object({
    en: z.string().min(1, "Skills Title is required"),
    id: z.string().min(1, "Skills Title is required"),
  }),
  skills: z.object({
    en: z.array(z.string()).min(1, "At least one skill is required"),
    id: z.array(z.string()).min(1, "At least one skill is required"),
  }),
});

const ExperienceItemSchema = z.object({
  en: z.object({
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().min(1, "Location is required"),
    type: z.string().min(1, "Type is required"),
    period: z.string().min(1, "Period is required"),
    duration: z.string().min(1, "Duration is required"),
    description: z.array(z.string()).min(1, "At least one description point is required"),
    skills: z.array(z.string()).optional(),
  }),
  id: z.object({
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().min(1, "Location is required"),
    type: z.string().min(1, "Type is required"),
    period: z.string().min(1, "Period is required"),
    duration: z.string().min(1, "Duration is required"),
    description: z.array(z.string()).min(1, "At least one description point is required"),
    skills: z.array(z.string()).optional(),
  }),
});

export const WorkExperienceSchema = z.object({
  title: z.object({
    en: z.string().min(1, "Section Title is required"),
    id: z.string().min(1, "Section Title is required"),
  }),
  experiences: z.array(ExperienceItemSchema),
});

const EducationItemSchema = z.object({
  en: z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    period: z.string().min(1, "Period is required"),
    description: z.array(z.string()).optional(),
  }),
  id: z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    period: z.string().min(1, "Period is required"),
    description: z.array(z.string()).optional(),
  }),
});

const AWARD_TYPES = ["gold", "silver", "bronze", "star"] as const;

const AwardItemSchema = z.object({
  en: z.object({
    title: z.string().min(1, "Title is required"),
    issuer: z.string().min(1, "Issuer is required"),
    date: z.string().min(1, "Date is required"),
    associatedWith: z.string().optional(),
    type: z.enum(AWARD_TYPES, {
      errorMap: () => ({ message: "Type must be one of: gold, silver, bronze, star" }),
    }).optional(),
  }),
  id: z.object({
    title: z.string().min(1, "Title is required"),
    issuer: z.string().min(1, "Issuer is required"),
    date: z.string().min(1, "Date is required"),
    associatedWith: z.string().optional(),
    type: z.enum(AWARD_TYPES, {
      errorMap: () => ({ message: "Type must be one of: gold, silver, bronze, star" }),
    }).optional(),
  }),
});

const OrganizationItemSchema = z.object({
  en: z.object({
    role: z.string().min(1, "Role is required"),
    organization: z.string().min(1, "Organization is required"),
    period: z.string().min(1, "Period is required"),
    associatedWith: z.string().optional(),
  }),
  id: z.object({
    role: z.string().min(1, "Role is required"),
    organization: z.string().min(1, "Organization is required"),
    period: z.string().min(1, "Period is required"),
    associatedWith: z.string().optional(),
  }),
});

export const EducationAndAwardsSchema = z.object({
  title: z.object({
    en: z.string().min(1, "Main Title is required"),
    id: z.string().min(1, "Main Title is required"),
  }),
  educationTitle: z.object({
    en: z.string().min(1, "Education Title is required"),
    id: z.string().min(1, "Education Title is required"),
  }),
  awardsTitle: z.object({
    en: z.string().min(1, "Awards Title is required"),
    id: z.string().min(1, "Awards Title is required"),
  }),
  organizationsTitle: z.object({
    en: z.string().min(1, "Organizations Title is required"),
    id: z.string().min(1, "Organizations Title is required"),
  }),
  education: z.array(EducationItemSchema),
  awards: z.array(AwardItemSchema),
  organizations: z.array(OrganizationItemSchema),
});

const ProjectItemSchema = z.object({
  en: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    technologies: z.array(z.string()).min(1, "At least one technology is required"),
    link: z.string().optional(),
    github: z.string().optional(),
  }),
  id: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    technologies: z.array(z.string()).min(1, "At least one technology is required"),
    link: z.string().optional(),
    github: z.string().optional(),
  }),
});

export const ProjectsSchema = z.object({
  title: z.object({
    en: z.string().min(1, "Title is required"),
    id: z.string().min(1, "Title is required"),
  }),
  subtitle: z.object({
    en: z.string().optional(),
    id: z.string().optional(),
  }),
  moreComingSoon: z.object({
    en: z.string().optional(),
    id: z.string().optional(),
  }),
  viewProject: z.object({
    en: z.string().optional(),
    id: z.string().optional(),
  }),
  liveDemo: z.object({
    en: z.string().optional(),
    id: z.string().optional(),
  }),
  items: z.array(ProjectItemSchema),
});

export const ContactSchema = z.object({
  title: z.object({
    en: z.string().min(1, "Title is required"),
    id: z.string().min(1, "Title is required"),
  }),
  description: z.object({
    en: z.string().min(1, "Description is required"),
    id: z.string().min(1, "Description is required"),
  }),
  email: z.object({
    en: z.string().email("Invalid email address"),
    id: z.string().email("Invalid email address"),
  }),
  github: z.object({
    en: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    id: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  }),
  linkedin: z.object({
    en: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    id: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  }),
  twitter: z.object({
    en: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
    id: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
  }),
  cta: z.object({
    en: z.string().min(1, "CTA is required"),
    id: z.string().min(1, "CTA is required"),
  }),
});

export const FooterSchema = z.object({
  rights: z.object({
    en: z.string().min(1, "Rights text is required"),
    id: z.string().min(1, "Rights text is required"),
  }),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword.length > 0 && data.newPassword.length < 6) {
    return false;
  }
  return true;
}, {
  message: "Password must be at least 6 characters",
  path: ["newPassword"],
});

export const SectionSchemas = {
  nav: NavSchema,
  hero: HeroSchema,
  about: AboutSchema,
  workExperience: WorkExperienceSchema,
  educationAndAwards: EducationAndAwardsSchema,
  projects: ProjectsSchema,
  contact: ContactSchema,
  footer: FooterSchema,
};
