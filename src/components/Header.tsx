"use client";

// Header component
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Nav } from "@/types/portfolio";

export default function Header({ nav: navProp }: { nav?: Nav }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const nav = navProp || (t("nav", { returnObjects: true }) as Nav);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ["experience", "education", "projects", "contact"];

      // Find the section that is currently most visible in the viewport
      let currentSection = "";

      // Check if we are at the top of the page (Hero)
      if (window.scrollY < 100) {
        setActiveSection("");
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is within the viewport (with some offset)
          // or if the bottom of the section is still visible
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{
        y: 0,
        opacity: 1,
        x: "-50%",
        top: isScrolled ? "1.5rem" : "0rem",
        width: isScrolled ? "90%" : "100%",
        maxWidth: isScrolled ? "56rem" : "100%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-1/2 z-50"
    >
      <div
        className={`transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-full shadow-lg px-6 py-3"
            : "bg-transparent border-transparent shadow-none rounded-none px-6 py-4 md:px-12 md:py-6"
        }`}
      >
        <nav aria-label="Main navigation">
          <div className="flex justify-between items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              DAMS
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-1 sm:gap-2 items-center">
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleClick(e, "#experience")}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-cyan-400 ${
                    activeSection === "experience"
                      ? "text-blue-600 dark:text-cyan-400"
                      : "text-foreground/80"
                  }`}
                >
                  {activeSection === "experience" && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 bg-blue-100/50 dark:bg-blue-900/20 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  {nav.experience}
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  onClick={(e) => handleClick(e, "#education")}
                  suppressHydrationWarning
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeSection === "education"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm font-bold"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {nav.education}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleClick(e, "#projects")}
                  suppressHydrationWarning
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeSection === "projects"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm font-bold"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "#contact")}
                  suppressHydrationWarning
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    activeSection === "contact"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm font-bold"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {nav.contact}
                </a>
              </li>
              <li className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full w-8 h-8"
                    >
                      <span
                        className="text-lg leading-none"
                        suppressHydrationWarning
                      >
                        {i18n.language?.startsWith("id") ? "🇮🇩" : "🇬🇧"}
                      </span>
                      <span className="sr-only">Switch Language</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                      <span className="mr-2">🇬🇧</span> English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => i18n.changeLanguage("id")}>
                      <span className="mr-2">🇮🇩</span> Indonesia
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ThemeToggle />
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-8 h-8"
                  >
                    <span
                      className="text-lg leading-none"
                      suppressHydrationWarning
                    >
                      {i18n.language?.startsWith("id") ? "🇮🇩" : "🇬🇧"}
                    </span>
                    <span className="sr-only">Switch Language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                    <span className="mr-2">🇬🇧</span> English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => i18n.changeLanguage("id")}>
                    <span className="mr-2">🇮🇩</span> Indonesia
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-10 h-10 bg-white/10 hover:bg-white/20"
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-3xl bg-white/80 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl md:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleClick(e, "#experience")}
                  suppressHydrationWarning
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeSection === "experience"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold"
                      : "text-foreground/80 hover:text-blue-500 dark:hover:text-cyan-400 hover:bg-blue-500/10 dark:hover:bg-cyan-500/10"
                  }`}
                >
                  {nav.experience}
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  onClick={(e) => handleClick(e, "#education")}
                  suppressHydrationWarning
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeSection === "education"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold"
                      : "text-foreground/80 hover:text-blue-500 dark:hover:text-cyan-400 hover:bg-blue-500/10 dark:hover:bg-cyan-500/10"
                  }`}
                >
                  {nav.education}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleClick(e, "#projects")}
                  suppressHydrationWarning
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeSection === "projects"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold"
                      : "text-foreground/80 hover:text-blue-500 dark:hover:text-cyan-400 hover:bg-blue-500/10 dark:hover:bg-cyan-500/10"
                  }`}
                >
                  {nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "#contact")}
                  suppressHydrationWarning
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    activeSection === "contact"
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-bold"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {nav.contact}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
