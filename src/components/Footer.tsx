"use client";

import { motion } from "framer-motion";

type FooterProps = {
  text: string;
};

export default function Footer({ text }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md">
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          © {currentYear} Built with{" "}
          <span className="text-blue-500 dark:text-blue-400 font-medium">
            Next.js
          </span>
          ,{" "}
          <span className="text-cyan-500 dark:text-cyan-400 font-medium">
            Tailwind
          </span>{" "}
          &{" "}
          <span className="text-indigo-500 dark:text-indigo-400 font-medium">
            Passion
          </span>
          .
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs text-muted-foreground mt-2"
        >
          {text}
        </motion.p>
      </div>
    </footer>
  );
}
