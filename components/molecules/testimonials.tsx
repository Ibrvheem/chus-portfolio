"use client";
import React from "react";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { div } from "motion/react-client";
import { LinkPreview } from "../ui/link-preview";
import Image from "next/image";
import { cn } from "@/lib/utils";
import EmblaCarousel from "@/app/js/EmblaCarousel";

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

export default function Testimonials() {
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="min-h-[300vh] mx-auto space-y-16 ">
      <div className="space-y-4">
        <h1 className="font-gasoek-one text-4xl sm:text-6xl text-center text-white max-w-2xl mx-auto">
          What It’s Like to Work With Me?
        </h1>
        <p className="text-xl font-cabinet-grotesk">
          Words from those I’ve worked with
        </p>
        <EmblaCarousel slides={SLIDES} />
      </div>
    </div>
  );
}
