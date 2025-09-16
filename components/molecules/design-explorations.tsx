import React from "react";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { div } from "motion/react-client";
import { LinkPreview } from "../ui/link-preview";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    width: "100&",
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
  return (
    <div className="min-h-[300vh] container mx-auto space-y-16 ">
      <h1 className="font-gasoek-one text-4xl sm:text-8xl text-center text-white">
        Design Explorations
      </h1>
      <div className="flex flex-wrap gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            style={{ width: project.width, background: project.bg }}
            className="flex-grow relative overflow-visible p-6 rounded-md "
          >
            <div className="border-b my-4 pb-6 font-cabinet-grotesk flex justify-between items-center">
              <h1 className="text-left text-4xl font-medium">
                {project.description}
              </h1>
              <div className="flex items-center font-cabinet-grotesk font-medium text-white/80 gap-2 text-lg">
                <div>{project.year}</div>
                <div className="h-2 w-2 rounded-full bg-white/50" />
                UI/UX
                <div className="h-2 w-2 rounded-full bg-white/50" />
                <div>{project.category}</div>
              </div>
            </div>
            <div className="relative  overflow-hidden mt-8">
              <div className="absolute inset-0  bg-black/50 " />
              <Image
                width={10000}
                height={10000}
                className="h-[70vh] w-full object-cover "
                src={project.imageUrl}
                alt={project.description}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
