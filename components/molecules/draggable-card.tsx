"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function DraggableCardDemo({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const items = [
    {
      title: "My lil cousins & my poor attempt at face painting lol <3",
      image: "/assets/2.png",
      className: "absolute top-10 left-[8%] rotate-[10deg]",
    },
    {
      title: "My Birthday :)",
      image: "/assets/4.png",
      className: "absolute top-10 left-[20%] rotate-[-15deg]",
    },
    {
      title: "Me & Bestie",
      image: "/assets/3.png",
      className: "absolute top-10 left-[38%] rotate-[10deg]",
    },
    {
      title: "Random",
      image: "/assets/6.png",
      className: "absolute top-10 left-[55%] rotate-[-15deg]",
    },
    {
      title: "Me & My Sisters <3",
      image: "/assets/5.png",
      className: "absolute top-10 left-[70%] rotate-[10deg]",
    },
  ];

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance carousel every 4 seconds on mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, items.length]);

  // Mobile carousel render
  if (isMobile) {
    return (
      <DraggableCardContainer className="relative flex flex-col min-h-[50vh] w-full items-center justify-center overflow-hidden">
        <div className="relative w-full min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <DraggableCardBody
                className={`relative ${
                  currentIndex % 2 === 0 ? "rotate-[2deg]" : "rotate-[-2deg]"
                }`}
              >
                <Image
                  src={items[currentIndex].image}
                  alt={items[currentIndex].title}
                  width={280}
                  height={280}
                  className="pointer-events-none relative z-10 h-70 w-70 object-cover"
                  priority
                />
                <h3 className="mt-4 font-dokdo text-center font-bold text-neutral-700 dark:text-neutral-300 px-4 text-lg">
                  {items[currentIndex].title}
                </h3>
              </DraggableCardBody>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8" />
        {children}
      </DraggableCardContainer>
    );
  }

  // Desktop draggable cards render
  return (
    <DraggableCardContainer className="relative flex flex-col min-h-[50vh] w-full items-center justify-center overflow-clip ">
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <Image
            src={item.image}
            alt={item.title}
            width={320}
            height={320}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
            priority
          />
          <h3 className="mt-4 font-dokdo text-center  font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
      <div className="mt-[40vh]" />
      {children}
    </DraggableCardContainer>
  );
}
