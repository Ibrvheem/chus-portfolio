"use client";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function SmoothScrolling() {
  useEffect(() => {
    // Simple CSS smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth";

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return null;
}

// Enhanced scroll progress indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
}
