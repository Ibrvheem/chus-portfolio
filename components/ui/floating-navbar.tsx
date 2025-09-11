"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      if (current <= 0) {
        setVisible(true); // Always show at the very top
      } else if (current > lastScrollY.current) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      lastScrollY.current = current;
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "font-satoshi flex max-w-fit fixed top-10 h-20 inset-x-0 mx-auto border-[2px] border-white/15 dark:border-white/[0.2] rounded-full  bg-white/15 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-3 py-3  items-center justify-center space-x-8 uppercase",
          className
        )}
      >
        <div className="h-14 w-14 bg-white/5 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src="/assets/1.jpg"
            alt="Logo"
            width={100}
            height={100}
            className="h-full w-full object-cover object-top"
            priority
          />
        </div>

        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn("relative  items-center flex  space-x-1 text-white")}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </a>
        ))}
        <button className="bg-white border text-sm font-medium relative border-neutral-200 text-black px-5 py-3 rounded-full h-full ">
          <span>LET'S TALK</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
