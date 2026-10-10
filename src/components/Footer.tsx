"use client";

import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface FooterProps {
  text?: string;
  email?: string;
}

export default function Footer({ text, email = "ibnuadam.biz@gmail.com" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-border bg-background">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
              <Image
                src="/logo-dark.png"
                alt="Ibnu Adam Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain dark:hidden"
              />
              <Image
                src="/logo-white.png"
                alt="Ibnu Adam Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain hidden dark:block"
              />
            </div>
            <span className="text-sm font-semibold text-foreground">
              Ibnu Adam
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            © {currentYear} Ibnu Adam. {text || "All rights reserved."} Crafted with Next.js, Tailwind CSS & GSAP.
          </p>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a
            href="https://github.com/iiibnuadam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/iiibnuadam/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-4 h-4 text-blue-500" />
          </a>
          <a
            href={`mailto:${email}`}
            className="hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
            aria-label="Send direct email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-xs font-mono flex items-center gap-1 hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-secondary"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
