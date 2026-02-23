"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export const ShinyText = ({ text, className, speed = 3 }: ShinyTextProps) => {
  return (
    <motion.span
      initial={{ backgroundPosition: "100%" }}
      animate={{ backgroundPosition: "-100%" }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: "linear",
      }}
      className={cn(
        "inline-block text-transparent bg-clip-text",
        "bg-[linear-gradient(110deg,#939393,45%,#ffffff,55%,#939393)]",
        "dark:bg-[linear-gradient(110deg,#a3a3a3,45%,#ffffff,55%,#a3a3a3)]",
        "bg-[length:200%_100%]",
        className
      )}
    >
      {text}
    </motion.span>
  );
};
