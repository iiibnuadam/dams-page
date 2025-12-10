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
  Copy,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

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
      return <Github className="w-6 h-6" />;
    case "linkedin":
      return <Linkedin className="w-6 h-6" />;
    case "twitter":
      return <Twitter className="w-6 h-6" />;
    case "instagram":
      return <Instagram className="w-6 h-6" />;
    case "facebook":
      return <Facebook className="w-6 h-6" />;
    case "youtube":
      return <Youtube className="w-6 h-6" />;
    case "gitlab":
      return <Gitlab className="w-6 h-6" />;
    case "dribbble":
      return <Dribbble className="w-6 h-6" />;
    default:
      return <ArrowUpRight className="w-6 h-6" />;
  }
};

export default function Contact({ contact }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Kontak"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column: Text & Email */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 leading-tight">
              {contact.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              {contact.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
                asChild
              >
                <a href={`mailto:${contact.email}`}>
                  <Mail className="mr-2 w-5 h-5" />
                  {contact.cta || "Send Email"}
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50 transition-all"
                onClick={handleCopyEmail}
              >
                {copied ? (
                  <Check className="mr-2 w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="mr-2 w-5 h-5" />
                )}
                {copied ? "Copied!" : "Copy Email"}
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Social Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {contact.socials?.map((social, index) => (
              <motion.div
                key={social.platform}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className="group hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 bg-background/50 backdrop-blur-sm">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6"
                    aria-label={social.platform}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-secondary group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                        {getIcon(social.platform)}
                      </div>
                      <span className="font-medium capitalize text-lg">
                        {social.platform}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
