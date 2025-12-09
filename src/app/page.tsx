import MainContent from "@/components/MainContent";
import { CMSData } from "@/types/cms";

export const dynamic = "force-dynamic";

async function getSectionData<T>(section: string): Promise<T | undefined> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/cms/${section}`, {
      cache: "no-store",
    });
    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${section}:`, error);
    return undefined;
  }
}

export default async function Home() {
  const [
    hero,
    about,
    workExperience,
    educationAndAwards,
    projects,
    contact,
    footer,
  ] = await Promise.all([
    getSectionData<CMSData["hero"]>("hero"),
    getSectionData<CMSData["about"]>("about"),
    getSectionData<CMSData["workExperience"]>("workExperience"),
    getSectionData<CMSData["educationAndAwards"]>("educationAndAwards"),
    getSectionData<CMSData["projects"]>("projects"),
    getSectionData<CMSData["contact"]>("contact"),
    getSectionData<CMSData["footer"]>("footer"),
  ]);

  const cmsData: CMSData = {
    hero,
    about,
    workExperience,
    educationAndAwards,
    projects,
    contact,
    footer,
  };

  return <MainContent cmsData={cmsData} />;
}
