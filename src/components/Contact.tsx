"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Gitlab,
  Dribbble,
} from "lucide-react";

type Social = {
  platform: string;
  url: string;
};

type ContactInfo = {
  title: string;
  description: string;
  email: string;
  socials: Social[];
  cta?: string;
};

type ContactProps = {
  contact: ContactInfo;
};

const getIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-8 h-8" />;
    case "linkedin":
      return <Linkedin className="w-8 h-8" />;
    case "twitter":
      return <Twitter className="w-8 h-8" />;
    case "instagram":
      return <Instagram className="w-8 h-8" />;
    case "facebook":
      return <Facebook className="w-8 h-8" />;
    case "youtube":
      return <Youtube className="w-8 h-8" />;
    case "gitlab":
      return <Gitlab className="w-8 h-8" />;
    case "dribbble":
      return <Dribbble className="w-8 h-8" />;
    default:
      return null;
  }
};

export default function Contact({ contact }: ContactProps) {
  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-4 relative"
      aria-label="Kontak"
    >
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-blue-500/10 to-transparent -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <div className="p-6 md:p-12 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-x leading-tight"
          >
            {contact.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {contact.description}
          </motion.p>

          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="h-16 px-10 text-xl rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] transition-all duration-300"
                asChild
              >
                <a href={`mailto:${contact.email}`}>
                  {contact.cta || "Send Email"}
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-8 mt-8"
            >
              {contact.socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-blue-500 dark:hover:text-cyan-400 transition-colors hover:scale-125 transform duration-200"
                  aria-label={social.platform}
                >
                  {getIcon(social.platform)}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
