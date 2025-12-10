import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BackgroundEffects } from "@/components/background-effects";
import Provider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL ||
      process.env.NEXTAUTH_URL ||
      "http://localhost:3000"
  ),
  title: {
    default: "Ibnu Adam - Portfolio",
    template: "%s | Ibnu Adam",
  },
  description:
    "Portfolio website of Ibnu Adam, showcasing projects, experience, and skills.",
  keywords: [
    "Ibnu Adam",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Ibnu Adam" }],
  creator: "Ibnu Adam",
  publisher: "Ibnu Adam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Ibnu Adam - Portfolio",
    description:
      "Portfolio website of Ibnu Adam, showcasing projects, experience, and skills.",
    siteName: "Ibnu Adam Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or update path
        width: 1200,
        height: 630,
        alt: "Ibnu Adam Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibnu Adam - Portfolio",
    description:
      "Portfolio website of Ibnu Adam, showcasing projects, experience, and skills.",
    images: ["/og-image.png"],
    creator: "@ibnuadam", // Update with actual handle if known
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <BackgroundEffects />
            {children}
            <Toaster richColors closeButton />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
