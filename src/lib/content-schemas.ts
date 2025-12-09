export type FieldType = "text" | "textarea" | "list" | "object" | "array";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  fields?: Field[]; // For object type
  itemFields?: Field[]; // For array type (if array of objects)
}

export interface Schema {
  name: string;
  fields: Field[];
}

export const SCHEMAS: Record<string, Schema> = {
  nav: {
    name: "Navigation",
    fields: [
      {
        name: "about",
        label: "About",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "experience",
        label: "Experience",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "education",
        label: "Education",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "contact",
        label: "Contact",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
    ],
  },
  hero: {
    name: "Hero",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "tags",
        label: "Tags (Roles)",
        type: "list",
      },
      {
        name: "description",
        label: "Description",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "textarea" },
          { name: "id", label: "Indonesian", type: "textarea" },
        ],
      },
      {
        name: "cta",
        label: "Call to Action",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "contact",
        label: "Contact Button",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
    ],
  },
  about: {
    name: "About",
    fields: [
      {
        name: "title",
        label: "Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "bio",
        label: "Bio",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "textarea" },
          { name: "id", label: "Indonesian", type: "textarea" },
        ],
      },
      {
        name: "skillsTitle",
        label: "Skills Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "skills",
        label: "Skills",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "list" },
          { name: "id", label: "Indonesian", type: "list" },
        ],
      },
    ],
  },
  workExperience: {
    name: "Work Experience",
    fields: [
      {
        name: "title",
        label: "Section Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "experiences",
        label: "Experiences",
        type: "array",
        itemFields: [
          {
            name: "en",
            label: "English",
            type: "object",
            fields: [
              { name: "position", label: "Position", type: "text" },
              { name: "company", label: "Company", type: "text" },
              { name: "location", label: "Location", type: "text" },
              { name: "type", label: "Type", type: "text" },
              { name: "period", label: "Period", type: "text" },
              { name: "duration", label: "Duration", type: "text" },
              { name: "description", label: "Description", type: "list" },
              { name: "skills", label: "Skills", type: "list" },
            ],
          },
          {
            name: "id",
            label: "Indonesian",
            type: "object",
            fields: [
              { name: "position", label: "Position", type: "text" },
              { name: "company", label: "Company", type: "text" },
              { name: "location", label: "Location", type: "text" },
              { name: "type", label: "Type", type: "text" },
              { name: "period", label: "Period", type: "text" },
              { name: "duration", label: "Duration", type: "text" },
              { name: "description", label: "Description", type: "list" },
              { name: "skills", label: "Skills", type: "list" },
            ],
          },
        ],
      },
    ],
  },
  educationAndAwards: {
    name: "Education & Awards",
    fields: [
      {
        name: "title",
        label: "Main Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "educationTitle",
        label: "Education Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "awardsTitle",
        label: "Awards Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "organizationsTitle",
        label: "Organizations Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "education",
        label: "Education List",
        type: "array",
        itemFields: [
          {
            name: "en",
            label: "English",
            type: "object",
            fields: [
              { name: "institution", label: "Institution", type: "text" },
              { name: "degree", label: "Degree", type: "text" },
              { name: "period", label: "Period", type: "text" },
              { name: "description", label: "Description", type: "list" },
            ],
          },
          {
            name: "id",
            label: "Indonesian",
            type: "object",
            fields: [
              { name: "institution", label: "Institution", type: "text" },
              { name: "degree", label: "Degree", type: "text" },
              { name: "period", label: "Period", type: "text" },
              { name: "description", label: "Description", type: "list" },
            ],
          },
        ],
      },
      {
        name: "awards",
        label: "Awards List",
        type: "array",
        itemFields: [
          {
            name: "en",
            label: "English",
            type: "object",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "issuer", label: "Issuer", type: "text" },
              { name: "date", label: "Date", type: "text" },
              { name: "associatedWith", label: "Associated With", type: "text" },
              { name: "type", label: "Type (gold, silver, bronze, star)", type: "text" },
            ],
          },
          {
            name: "id",
            label: "Indonesian",
            type: "object",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "issuer", label: "Issuer", type: "text" },
              { name: "date", label: "Date", type: "text" },
              { name: "associatedWith", label: "Associated With", type: "text" },
              { name: "type", label: "Type (gold, silver, bronze, star)", type: "text" },
            ],
          },
        ],
      },
      {
        name: "organizations",
        label: "Organizations List",
        type: "array",
        itemFields: [
          {
            name: "en",
            label: "English",
            type: "object",
            fields: [
              { name: "role", label: "Role", type: "text" },
              { name: "organization", label: "Organization", type: "text" },
              { name: "period", label: "Period", type: "text" },
              { name: "associatedWith", label: "Associated With", type: "text" },
            ],
          },
          {
            name: "id",
            label: "Indonesian",
            type: "object",
            fields: [
              { name: "role", label: "Role", type: "text" },
              { name: "organization", label: "Organization", type: "text" },
              { name: "period", label: "Period", type: "text" },
              { name: "associatedWith", label: "Associated With", type: "text" },
            ],
          },
        ],
      },
    ],
  },
  projects: {
    name: "Projects",
    fields: [
      {
        name: "title",
        label: "Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "subtitle",
        label: "Subtitle",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "moreComingSoon",
        label: "More Coming Soon Text",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "viewProject",
        label: "View Project Text",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "liveDemo",
        label: "Live Demo Text",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "items",
        label: "Project Items",
        type: "array",
        itemFields: [
          {
            name: "en",
            label: "English",
            type: "object",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "technologies", label: "Technologies", type: "list" },
              { name: "link", label: "Link", type: "text" },
              { name: "github", label: "GitHub", type: "text" },
            ],
          },
          {
            name: "id",
            label: "Indonesian",
            type: "object",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "technologies", label: "Technologies", type: "list" },
              { name: "link", label: "Link", type: "text" },
              { name: "github", label: "GitHub", type: "text" },
            ],
          },
        ],
      },
    ],
  },
  contact: {
    name: "Contact",
    fields: [
      {
        name: "title",
        label: "Title",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "description",
        label: "Description",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "textarea" },
          { name: "id", label: "Indonesian", type: "textarea" },
        ],
      },
      {
        name: "email",
        label: "Email",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "github",
        label: "GitHub URL",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "linkedin",
        label: "LinkedIn URL",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "twitter",
        label: "Twitter URL",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
      {
        name: "cta",
        label: "Call to Action",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
    ],
  },
  footer: {
    name: "Footer",
    fields: [
      {
        name: "rights",
        label: "Rights Text",
        type: "object",
        fields: [
          { name: "en", label: "English", type: "text" },
          { name: "id", label: "Indonesian", type: "text" },
        ],
      },
    ],
  },
};
