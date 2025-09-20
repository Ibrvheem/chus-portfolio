"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

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
    <div ref={containerRef} className="relative w-full">
      <motion.h1
        className="font-gasoek-one text-4xl sm:text-8xl text-center text-white sticky top-20 z-10 py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

  return (
    <motion.div
      style={{
        y,
        backgroundColor: project.bg,
        zIndex: index + 20, // Much higher z-index to stack above title
      }}
      className="sticky top-24 w-full h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
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
          className="relative overflow-hidden mt-6 md:mt-8 rounded-xl flex-1"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0 bg-black/30 z-10"
            whileHover={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="h-full w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 flex items-end p-6 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-white"
            >
              <p className="text-sm font-cabinet-grotesk opacity-80 mb-2">
                Project Details
              </p>
              <h3 className="text-xl font-medium">{project.description}</h3>
              <p className="text-sm opacity-70 mt-1">
                {project.category} • {project.year}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
