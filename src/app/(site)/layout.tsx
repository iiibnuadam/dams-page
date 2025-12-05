import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nama Anda — Portofolio",
  description:
    "Frontend Developer & UI/UX Enthusiast. Membangun pengalaman web yang cepat, aksesibel, dan indah.",
  openGraph: {
    title: "Nama Anda — Portofolio",
    description: "Frontend Developer & UI/UX Enthusiast",
    type: "website",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
