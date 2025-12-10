import MainContent from "@/components/MainContent";
import { CMSData } from "@/types/cms";
import { Metadata } from "next";

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

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getSectionData<CMSData["hero"]>("hero");

  const title = hero?.name?.en || "Ibnu Adam";
  const description =
    hero?.description?.en ||
    "Portfolio website showcasing projects and experience.";

  return {
    title: `${title} - Portfolio`,
    description: description,
    openGraph: {
      title: `${title} - Portfolio`,
      description: description,
    },
    twitter: {
      title: `${title} - Portfolio`,
      description: description,
    },
  };
}

export default async function Home() {
  const [
    nav,
    hero,
    workExperience,
    educationAndAwards,
    projects,
    contact,
    footer,
    settings,
  ] = await Promise.all([
    getSectionData<CMSData["nav"]>("nav"),
    getSectionData<CMSData["hero"]>("hero"),
    getSectionData<CMSData["workExperience"]>("workExperience"),
    getSectionData<CMSData["educationAndAwards"]>("educationAndAwards"),
    getSectionData<CMSData["projects"]>("projects"),
    getSectionData<CMSData["contact"]>("contact"),
    getSectionData<CMSData["footer"]>("footer"),
    getSectionData<CMSData["settings"]>("settings"),
  ]);

  const cmsData: CMSData = {
    nav,
    hero,
    workExperience,
    educationAndAwards,
    projects,
    contact,
    footer,
    settings,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: hero?.name?.en || "Ibnu Adam",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    jobTitle: hero?.tags?.[0] || "Web Developer",
    description: hero?.description?.en,
    sameAs: contact?.socials?.map((s) => s.url) || [],
    knowsAbout: hero?.skills || [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainContent cmsData={cmsData} />
    </>
  );
}
