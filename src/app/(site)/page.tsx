import MainContent from "@/components/MainContent";
import { reader } from "@/lib/keystatic";

export default async function Home() {
  const hero = await reader.singletons.hero.read();
  const about = await reader.singletons.about.read();
  const workExperience = await reader.singletons.workExperience.read();
  const educationAndAwards = await reader.singletons.educationAndAwards.read();
  const projects = await reader.singletons.projects.read();
  const contact = await reader.singletons.contact.read();
  const footer = await reader.singletons.footer.read();

  const cmsData = {
    hero: hero!,
    about: about!,
    workExperience: workExperience!,
    educationAndAwards: educationAndAwards!,
    projects: projects!,
    contact: contact!,
    footer: footer!,
  };

  return <MainContent cmsData={cmsData as any} />;
}
