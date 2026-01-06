export type FieldType = "text" | "textarea" | "list" | "object" | "array" | "select" | "image";

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  fields?: Field[]; // For object type
  itemFields?: Field[]; // For array type (if array of objects)
  options?: { label: string; value: string }[]; // For select type
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
        name: "logo",
        label: "Logo",
        type: "object",
        fields: [
            { name: "light", label: "Light Mode Logo", type: "image" },
            { name: "dark", label: "Dark Mode Logo", type: "image" },
        ]
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
        name: "image",
        label: "Hero Image",
        type: "image",
      },
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
      {
        name: "status",
        label: "Availability Status",
        type: "object",
        fields: [
          {
            name: "variant",
            label: "Status Variant",
            type: "select",
            options: [
              { label: "Available (Green)", value: "available" },
              { label: "Open to Opportunities (Yellow)", value: "open" },
              { label: "Busy / Not Looking (Red)", value: "busy" },
            ],
          },
        ],
      },
      {
        name: "skills",
        label: "Skills",
        type: "list",
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
              { name: "logo", label: "Company Logo URL", type: "image" },
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
              { name: "logo", label: "Company Logo URL", type: "image" },
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
        type: "text",
      },
      {
        name: "socials",
        label: "Social Media",
        type: "array",
        itemFields: [
          {
            name: "platform",
            label: "Platform (Icon)",
            type: "select",
            options: [
              { label: "GitHub", value: "github" },
              { label: "LinkedIn", value: "linkedin" },
              { label: "Twitter", value: "twitter" },
              { label: "Instagram", value: "instagram" },
              { label: "Facebook", value: "facebook" },
              { label: "YouTube", value: "youtube" },
              { label: "GitLab", value: "gitlab" },
              { label: "Dribbble", value: "dribbble" },
            ],
          },
          {
            name: "url",
            label: "URL",
            type: "text",
          },
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
  settings: {
    name: "Settings",
    fields: [],
  },
};
