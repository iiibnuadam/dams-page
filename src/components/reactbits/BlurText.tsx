"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const BlurText = ({ text, delay = 0, className = "" }: BlurTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as unknown as any, // ESLint fix
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 10,
    },
  };

  return (
    <motion.h1
      style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      ref={ref}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};
