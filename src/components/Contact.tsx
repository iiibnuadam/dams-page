"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { gsap } from "@/lib/gsap";
import {
  Mail,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  Clock,
  ArrowUpRight,
  Send,
  ArrowUp,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";

interface Social {
  platform: string;
  url: string;
}

interface ContactInfo {
  title?: string;
  description?: string;
  email?: string;
  socials?: Social[];
  cta?: string;
}

interface ContactProps {
  contact?: ContactInfo;
  footerText?: string;
}

export default function Contact({ contact, footerText }: ContactProps) {
  const containerRef = useRef<HTMLElement>(null);
  const emailBoxRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("fulltime");

  const email = contact?.email || "ibnuadam.biz@gmail.com";

  const topics = [
    {
      id: "fulltime",
      label: "Full-Time / Core Engineer Role",
      subject: "Engineering Opportunity: Ibnu Adam",
      starter: "Hi Adam, we have an opening for a frontend / core engineer role that aligns with your expertise in Vue, React, and design systems.",
    },
    {
      id: "project",
      label: "Web Application / Freelance Project",
      subject: "Project Inquiry for Ibnu Adam",
      starter: "Hi Adam, I would like to discuss building a web application with you. Here are some brief details about our scope and timeline:",
    },
    {
      id: "chat",
      label: "Technical Consultation & Chat",
      subject: "Tech Consultation: Ibnu Adam",
      starter: "Hi Adam, I'd love to connect and chat regarding frontend architecture, design systems, or a quick technical inquiry.",
    },
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    currentTopic.subject
  )}&body=${encodeURIComponent(currentTopic.starter)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email address copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy email");
    }
  };

  // GSAP subtle animation when topic switches
  useEffect(() => {
    if (!emailBoxRef.current) return;
    gsap.fromTo(
      emailBoxRef.current,
      { opacity: 0.7, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  }, [selectedTopic]);

  useEffect(() => {
    const handleSelectTopic = (e: Event) => {
      const customEvent = e as CustomEvent<{ topicId?: string }>;
      if (customEvent.detail?.topicId) {
        setSelectedTopic(customEvent.detail.topicId);
      }
    };

    window.addEventListener("select-contact-topic", handleSelectTopic);
    return () => {
      window.removeEventListener("select-contact-topic", handleSelectTopic);
    };
  }, []);

  const socials = contact?.socials || [
    { platform: "github", url: "https://github.com/iiibnuadam" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/iiibnuadam/" },
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="slide-section snap-start snap-always relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-between pt-16 pb-6 px-4 sm:px-6 bg-background border-t border-border overflow-hidden"
      aria-label="Contact Section"
    >
      <div className="max-w-5xl mx-auto w-full my-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground text-xs font-mono font-medium mb-2 sm:mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Start a Conversation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            {contact?.title || "Let's build something remarkable."}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
            {contact?.description ||
              "Whether you are hiring for an engineering role, scoping a new web application, or discussing design systems, feel free to reach out directly."}
          </p>
        </div>

        {/* Interactive Contact Hub */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          {/* Left Column: Interactive Topic Selector & Composer */}
          <div className="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-3">
              1. What would you like to discuss?
            </span>

            <div className="flex flex-col gap-2.5 mb-6">
              {topics.map((topic) => {
                const isSelected = topic.id === selectedTopic;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-secondary border-primary text-foreground font-semibold"
                        : "bg-background border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span>{topic.label}</span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border"
                      }`}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
              2. Starter Draft Ready
            </span>

            {/* Email Preview Box */}
            <div
              ref={emailBoxRef}
              className="p-4 rounded-xl bg-secondary border border-border text-xs sm:text-sm space-y-2 mb-6"
            >
              <div>
                <span className="font-mono text-muted-foreground text-xs block">
                  Subject:
                </span>
                <span className="font-medium text-foreground">
                  {currentTopic.subject}
                </span>
              </div>
              <div className="pt-2 border-t border-border">
                <span className="font-mono text-muted-foreground text-xs block mb-1">
                  Draft Body:
                </span>
                <p className="text-muted-foreground leading-relaxed italic">
                  &ldquo;{currentTopic.starter}&rdquo;
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 rounded-lg font-semibold shadow-xs flex-1 sm:flex-initial"
              >
                <a href={mailtoUrl}>
                  <Send className="w-4 h-4 mr-2" />
                  <span>Launch in Email App</span>
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleCopyEmail}
                className="h-12 px-5 rounded-lg border-border hover:bg-secondary font-medium"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2 text-primary" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                <span>{copied ? "Email Copied!" : "Copy Email"}</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Direct Channels & Live Availability */}
          <div className="space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2.5 rounded-xl bg-secondary border border-border text-foreground">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-mono text-muted-foreground block">
                    Direct Inbox
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-bold text-foreground text-sm sm:text-base hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Send a message directly from any client or mail service.
              </p>
            </div>

            {/* Timezone & Response Time */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-foreground block">
                    Response Expectation
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Typically responds within 24 hours on business days.
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Location: Jakarta, Indonesia</span>
                <span>Timezone: UTC+7 (WIB)</span>
              </div>
            </div>

            {/* Verified Social Profiles */}
            <div className="p-6 rounded-2xl border border-border bg-card shadow-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-3">
                Verified Socials
              </span>
              <div className="flex flex-col gap-2">
                {socials.map((social) => {
                  const isGithub = social.platform.toLowerCase() === "github";
                  const isLinkedin = social.platform.toLowerCase() === "linkedin";
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-secondary border border-border hover:border-primary transition-all flex items-center justify-between text-sm font-medium text-foreground group"
                    >
                      <div className="flex items-center gap-2.5">
                        {isGithub ? (
                          <FaGithub className="w-4 h-4" />
                        ) : isLinkedin ? (
                          <FaLinkedin className="w-4 h-4 text-foreground" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
                        <span className="capitalize">{social.platform}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 6 Integrated Footer Bar */}
      <footer className="max-w-5xl mx-auto w-full pt-4 mt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
            <Image
              src="/logo-dark.png"
              alt="Ibnu Adam Logo"
              width={20}
              height={20}
              className="w-full h-full object-contain dark:hidden"
            />
            <Image
              src="/logo-white.png"
              alt="Ibnu Adam Logo"
              width={20}
              height={20}
              className="w-full h-full object-contain hidden dark:block"
            />
          </div>
          <span>
            © {new Date().getFullYear()} Ibnu Adam. {footerText || "All rights reserved."}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              const hero = document.getElementById("hero");
              if (hero) hero.scrollIntoView({ behavior: "smooth", block: "start" });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-mono flex items-center gap-1.5 hover:text-foreground transition-colors px-2.5 py-1 rounded-md hover:bg-secondary"
            aria-label="Back to top of deck"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </section>
  );
}
