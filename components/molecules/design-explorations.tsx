"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// Custom Cursor Component
function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Smooth spring animations for cursor movement
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY]);

  // Custom hook to manage cursor visibility
  useEffect(() => {
    const handleCursorEnter = () => setIsVisible(true);
    const handleCursorLeave = () => setIsVisible(false);

    // Listen to custom events
    window.addEventListener("cursor-enter", handleCursorEnter);
    window.addEventListener("cursor-leave", handleCursorLeave);

    return () => {
      window.removeEventListener("cursor-enter", handleCursorEnter);
      window.removeEventListener("cursor-leave", handleCursorLeave);
    };
  }, []);

  // Click effect management
  useEffect(() => {
    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.8,
      }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{
          scale: isVisible ? 1 : 0,
          rotate: isVisible ? 0 : -180,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.8,
        }}
      >
        {/* Main cursor circle */}
        <motion.div
          className="w-40 h-40 rounded-full border-2 border-white/5 flex items-center justify-center shadow-2xl relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          animate={{
            scale: isClicked ? 0.8 : 1,
            rotate: isClicked ? 15 : 0,
          }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 600,
            mass: 0.3,
          }}
        >
          {/* Animated backdrop blur effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{
              backdropFilter: "blur(0px)",
              backgroundColor: "rgba(0, 0, 0, 0)",
            }}
            animate={{
              backdropFilter: isVisible ? "blur(20px)" : "blur(0px)",
              backgroundColor: isVisible
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(0, 0, 0, 0)",
              scale: isVisible ? [1, 1.05, 1] : 1,
            }}
            transition={{
              backdropFilter: { duration: 0.6, ease: "easeOut" },
              backgroundColor: { duration: 0.6, ease: "easeOut" },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          <motion.div className="relative z-10 text-center">
            <motion.span
              className="text-white text-2xl font-cabinet-grotesk block leading-tight font-bold"
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
                y: isVisible ? 0 : 5,
              }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              View
            </motion.span>
            <motion.span
              className="text-white text-2xl font-cabinet-grotesk block leading-tight font-bold"
              initial={{ opacity: 0, scale: 0.8, y: -5 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
                y: isVisible ? 0 : -5,
              }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Project
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const projects = [
  {
    imageUrl: "/assets/finchat.png",
    description: "FinChat",
    width: "100%",
    website: "",
    bg: "#016938",
    year: "2025",
    category: "FINANCE AI ASSITANT",
  },
  {
    imageUrl: "/assets/menuhelp.png",
    description: "Menu Help",
    width: "100%",
    website: "",
    bg: "#FF2001",
    year: "2025",
    category: "FOOD REVIEW & EXPLORATION",
  },
  {
    imageUrl: "/assets/nafchs.png",
    description: "Nigerian Airforce College of Nursing Sciences",
    width: "100%",
    website: "",
    bg: "#0050D1",
    year: "2024",
    category: "SCHOOL SITE",
  },
  {
    imageUrl: "/assets/patchforge.jpg",
    description: "Patch Forge",
    width: "100%",
    website: "",
    bg: "#195588",
    year: "2024",
    category: "AI PRODUCT MANAGEMENT",
  },
  {
    imageUrl: "/assets/simplifi.jpg",
    description: "Simplifi",
    width: "100%",
    website: "",
    bg: "#152E88",
    year: "2023",
    category: "BANKING & INVESTMENT",
  },
  {
    imageUrl: "/assets/temphire.png",
    description: "Temp Hire",
    width: "100%",
    website: "",
    bg: "#F23715",
    year: "2024",
    category: "JOB APPLICATION PORTAL",
  },
  {
    imageUrl: "/assets/warton-enterprise.jpg",
    description: "Warton Enterprise",
    width: "100%",
    bg: "#DD1B1D",
    year: "2024",
    category: "PROPERTY MANAGEMENT",
  },
];

export default function DesignExplorations() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <CustomCursor />
      <div
        ref={containerRef}
        className="relative w-full container mx-auto md:px-0 px-4 "
        id="explorations"
      >
        <motion.h1
          className="font-gasoek-one text-4xl sm:text-8xl text-center text-white sticky top-20 z-0 md:py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0, 0.01, 0.02, 0.2],
              [1, 0.2, 0, 0]
            ),
          }}
        >
          Design Explorations
        </motion.h1>

        <div
          className="relative w-full"
          style={{ height: `${projects.length * 100}vh` }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              total={projects.length}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  total: number;
  scrollProgress: import("framer-motion").MotionValue<number>;
}

function ProjectCard({
  project,
  index,
  total,
  scrollProgress,
}: ProjectCardProps) {
  // Calculate scroll triggers for each card
  const cardStart = index / total;
  const cardEnd = (index + 1) / total;

  // Y position - cards slide up and snap into place
  const y = useTransform(
    scrollProgress,
    [cardStart, cardEnd],
    [100, 0] // Each card moves from below to exact position
  );

  // Cursor event handlers
  const handleMouseEnter = () => {
    document.body.style.cursor = "none";
    window.dispatchEvent(new CustomEvent("cursor-enter"));
  };

  const handleMouseLeave = () => {
    document.body.style.cursor = "auto";
    window.dispatchEvent(new CustomEvent("cursor-leave"));
  };

  return (
    <motion.div
      style={{
        y,
        backgroundColor: project.bg,
      }}
      className="sticky top-24 w-full h-[80vh] rounded-2xl overflow-hidden cursor-none z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-6 md:p-8 h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-white/20 pb-4 md:pb-6 font-cabinet-grotesk flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-left text-2xl md:text-4xl font-medium text-white leading-tight">
            {project.description}
          </h1>
          <div className="flex items-center font-cabinet-grotesk font-medium text-white/80 gap-2 text-sm md:text-lg flex-wrap">
            <div>{project.year}</div>
            <div className="h-2 w-2 rounded-full bg-white/50" />
            <span>UI/UX</span>
            <div className="h-2 w-2 rounded-full bg-white/50" />
            <div className="text-xs md:text-base">{project.category}</div>
          </div>
        </div>

        {/* Image Container */}
        <motion.div
          className="relative overflow-hidden mt-6 md:mt-8 rounded-xl flex-1 group"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10"
            transition={{ duration: 0.4 }}
          />

          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              src={project.imageUrl}
              alt={project.description}
              priority={index < 3}
            />
          </motion.div>

          {/* Enhanced Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 flex items-end p-6 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              className="text-white"
            >
              <motion.p
                className="text-sm font-cabinet-grotesk opacity-80 mb-2"
                initial={{ x: -20, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                Project Details
              </motion.p>
              <motion.h3
                className="text-xl font-medium"
                initial={{ x: -20, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                {project.description}
              </motion.h3>
              <motion.p
                className="text-sm opacity-70 mt-1"
                initial={{ x: -20, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {project.category} • {project.year}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
