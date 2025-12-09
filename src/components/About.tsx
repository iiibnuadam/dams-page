"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type AboutProps = {
  bio: string;
  skills: string[];
  title?: string;
  skillsTitle?: string;
};

export default function About({
  bio,
  skills,
  title = "About Me",
  skillsTitle = "Skills & Technologies",
}: AboutProps) {
  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 relative overflow-hidden"
      aria-label="Tentang Saya"
    >
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400 leading-tight"
        >
          {title}
        </motion.h2>

        <div className="grid md:grid-cols-[350px_1fr] gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group mx-auto md:mx-0 w-full max-w-[300px] md:max-w-full"
          >
            <motion.div
              animate={{
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition duration-500"
            />
            <motion.div
              animate={{
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative aspect-square overflow-hidden border-4 border-white/10 shadow-2xl"
            >
              <Image
                src="https://media.licdn.com/dms/image/v2/D5603AQEpAjotJThYXg/profile-displayphoto-crop_800_800/B56Zl6s38oH8AI-/0/1758700213131?e=1766620800&v=beta&t=nl4OFkDexdExnK0kniY0R9M-T1-6ocze4Y6qSpNsDo4"
                alt="Profile Photo"
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 md:p-8 rounded-2xl bg-background/80 dark:bg-card/50 backdrop-blur-sm border border-border/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
            >
              <p className="text-base md:text-xl text-foreground/90 leading-relaxed font-light">
                {bio}
              </p>
            </motion.div>

            <div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl font-semibold mb-6 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600"
              >
                {skillsTitle}
              </motion.h3>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      rotate: index % 2 === 0 ? 3 : -3,
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                    }}
                    className="px-5 py-2.5 bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-xl text-sm font-medium hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-default shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
