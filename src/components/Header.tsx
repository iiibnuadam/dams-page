"use client";

// Header component
import { useState } from "react";
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const nav = t("nav", { returnObjects: true }) as Nav;

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
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 md:top-6 left-1/2 z-50 w-[95%] md:w-[90%] max-w-4xl"
    >
      <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-full shadow-lg transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-primary/20 hover:shadow-2xl px-6 py-3">
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
              Portofolio
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-1 sm:gap-2 items-center">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleClick(e, "#about")}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
                >
                  {nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleClick(e, "#experience")}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
                >
                  {nav.experience}
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  onClick={(e) => handleClick(e, "#education")}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
                >
                  {nav.education}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleClick(e, "#projects")}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
                >
                  {nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "#contact")}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10"
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
                      <span className="text-lg leading-none">
                        {i18n.language === "id" ? "🇮🇩" : "🇬🇧"}
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
                    <span className="text-lg leading-none">
                      {i18n.language === "id" ? "🇮🇩" : "🇬🇧"}
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
                  href="#about"
                  onClick={(e) => handleClick(e, "#about")}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:text-blue-500 dark:hover:text-cyan-400 hover:bg-blue-500/10 dark:hover:bg-cyan-500/10 transition-all duration-300"
                >
                  {nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  onClick={(e) => handleClick(e, "#experience")}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:text-blue-500 dark:hover:text-cyan-400 hover:bg-blue-500/10 dark:hover:bg-cyan-500/10 transition-all duration-300"
                >
                  {nav.experience}
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  onClick={(e) => handleClick(e, "#education")}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:text-blue-500 dark:hover:text-cyan-400 hover:bg-blue-500/10 dark:hover:bg-cyan-500/10 transition-all duration-300"
                >
                  {nav.education}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleClick(e, "#projects")}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:text-blue-500 dark:hover:text-cyan-400 hover:bg-blue-500/10 dark:hover:bg-cyan-500/10 transition-all duration-300"
                >
                  {nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "#contact")}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
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
