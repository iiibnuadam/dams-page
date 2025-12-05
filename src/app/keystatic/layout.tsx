import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keystatic Admin",
  description: "Admin UI for Keystatic",
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
