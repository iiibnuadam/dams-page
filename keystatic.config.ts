import { config, fields, singleton } from '@keystatic/core';

// Keystatic menggunakan GitHub OAuth untuk autentikasi di mode Production.
// Di mode Development (Local), autentikasi tidak diperlukan karena file diedit langsung di disk.
const isLocal =
  process.env.NODE_ENV === 'development' ||
  !process.env.KEYSTATIC_GITHUB_CLIENT_ID;

export default config({
  storage: isLocal
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: 'iiibnuadam/dams-page',
      },
  singletons: {
    hero: singleton({
      label: 'Hero Section',
      path: 'src/content/hero',
      schema: {
        name: fields.text({ label: 'Name' }),
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        cta: fields.text({ label: 'CTA Button Text' }),
        contact: fields.text({ label: 'Contact Button Text' }),
      },
    }),
    about: singleton({
      label: 'About Section',
      path: 'src/content/about',
      schema: {
        title: fields.text({ label: 'Section Title' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        skillsTitle: fields.text({ label: 'Skills Title' }),
        skills: fields.array(fields.text({ label: 'Skill' }), {
          label: 'Skills',
          itemLabel: (props) => props.value,
        }),
      },
    }),
    workExperience: singleton({
      label: 'Work Experience',
      path: 'src/content/work-experience',
      schema: {
        title: fields.text({ label: 'Section Title' }),
        experiences: fields.array(
          fields.object({
            position: fields.text({ label: 'Position' }),
            company: fields.text({ label: 'Company' }),
            location: fields.text({ label: 'Location' }),
            type: fields.text({ label: 'Type' }),
            period: fields.text({ label: 'Period' }),
            duration: fields.text({ label: 'Duration' }),
            description: fields.array(fields.text({ label: 'Description Point' }), {
              label: 'Description Points',
              itemLabel: (props) => props.value,
            }),
            skills: fields.array(fields.text({ label: 'Skill' }), {
              label: 'Skills Used',
              itemLabel: (props) => props.value,
            }),
          }),
          {
            label: 'Experiences',
            itemLabel: (props) => `${props.fields.position.value} at ${props.fields.company.value}`,
          }
        ),
      },
    }),
    educationAndAwards: singleton({
      label: 'Education & Awards',
      path: 'src/content/education-awards',
      schema: {
        title: fields.text({ label: 'Main Title' }),
        educationTitle: fields.text({ label: 'Education Title' }),
        awardsTitle: fields.text({ label: 'Awards Title' }),
        organizationsTitle: fields.text({ label: 'Organizations Title' }),
        education: fields.array(
          fields.object({
            institution: fields.text({ label: 'Institution' }),
            degree: fields.text({ label: 'Degree' }),
            period: fields.text({ label: 'Period' }),
            description: fields.array(fields.text({ label: 'Description Point' }), {
              label: 'Description',
              itemLabel: (props) => props.value,
            }),
          }),
          {
            label: 'Education List',
            itemLabel: (props) => props.fields.institution.value,
          }
        ),
        awards: fields.array(
          fields.object({
            title: fields.text({ label: 'Award Title' }),
            issuer: fields.text({ label: 'Issuer' }),
            date: fields.text({ label: 'Date' }),
            associatedWith: fields.text({ label: 'Associated With' }),
            type: fields.select({
              label: 'Type',
              options: [
                { label: 'Gold', value: 'gold' },
                { label: 'Silver', value: 'silver' },
                { label: 'Bronze', value: 'bronze' },
                { label: 'Star', value: 'star' },
              ],
              defaultValue: 'star',
            }),
          }),
          {
            label: 'Awards List',
            itemLabel: (props) => props.fields.title.value,
          }
        ),
        organizations: fields.array(
          fields.object({
            role: fields.text({ label: 'Role' }),
            organization: fields.text({ label: 'Organization' }),
            period: fields.text({ label: 'Period' }),
            associatedWith: fields.text({ label: 'Associated With' }),
          }),
          {
            label: 'Organizations List',
            itemLabel: (props) => props.fields.organization.value,
          }
        ),
      },
    }),
    projects: singleton({
      label: 'Projects',
      path: 'src/content/projects',
      schema: {
        title: fields.text({ label: 'Section Title' }),
        subtitle: fields.text({ label: 'Subtitle' }),
        moreComingSoon: fields.text({ label: 'More Coming Soon Text' }),
        viewProject: fields.text({ label: 'View Project Button Text' }),
        liveDemo: fields.text({ label: 'Live Demo Button Text' }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Project Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
            technologies: fields.array(fields.text({ label: 'Tech' }), {
              label: 'Technologies',
              itemLabel: (props) => props.value,
            }),
            link: fields.text({ label: 'Project Link' }),
            github: fields.text({ label: 'GitHub Link' }),
          }),
          {
            label: 'Project Items',
            itemLabel: (props) => props.fields.title.value,
          }
        ),
      },
    }),
    contact: singleton({
      label: 'Contact Section',
      path: 'src/content/contact',
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        email: fields.text({ label: 'Email' }),
        github: fields.text({ label: 'GitHub URL' }),
        linkedin: fields.text({ label: 'LinkedIn URL' }),
        twitter: fields.text({ label: 'Twitter URL' }),
        cta: fields.text({ label: 'CTA Text' }),
      },
    }),
    footer: singleton({
      label: 'Footer',
      path: 'src/content/footer',
      schema: {
        rights: fields.text({ label: 'Rights Text' }),
      },
    }),
  },
});
