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
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      if (current <= 0) {
        setVisible(true); // Always show at the very top
      } else if (current > lastScrollY.current) {
        setVisible(false); // Scrolling down
        setIsOpen(false); // Close dropdown when scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      lastScrollY.current = current;
    }
  });

  return (
    <>
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
            " font-satoshi flex w-[90%] md:max-w-fit fixed top-10 inset-x-0  mx-auto border-[2px] border-white/15 dark:border-white/[0.2] rounded-full bg-white/15 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[9998] px-3 py-3 items-center justify-between md:justify-center space-x-8 uppercase",
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(
              (
                navItem: { name: string; link: string; icon?: React.ReactNode },
                idx: number
              ) => (
                <a
                  key={`link=${idx}`}
                  href={navItem.link}
                  className={cn(
                    "relative items-center flex space-x-1 text-white font-cabinet-grotesk font-medium cursor-pointer hover:text-white/80 transition-colors"
                  )}
                >
                  <span className="text-sm">{navItem.name}</span>
                </a>
              )
            )}
            <button className="bg-white border text-sm font-medium relative border-neutral-200 text-black px-5 py-3 rounded-full h-full hover:bg-gray-100 transition-colors">
              <span>LET&apos;S TALK</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className=" md:hidden relative bg-white/10 h-10 w-10 flex items-center justify-center rounded-full">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col items-center justify-center w-6 h-6 space-y-1"
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 6 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-white origin-center"
              />
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-white"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -6 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 bg-white origin-center"
              />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9997] bg-black/95 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex flex-col items-center justify-center h-full px-8"
            >
              {/* Navigation Items */}
              <div className="flex flex-col items-center space-y-8 mb-12">
                {navItems.map(
                  (
                    navItem: {
                      name: string;
                      link: string;
                      icon?: React.ReactNode;
                    },
                    idx: number
                  ) => (
                    <motion.a
                      key={`fullscreen-link=${idx}`}
                      href={navItem.link}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.1 + 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="flex flex-col items-center group"
                    >
                      {navItem.icon && (
                        <motion.div
                          className="text-white/60 mb-2 group-hover:text-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {navItem.icon}
                        </motion.div>
                      )}
                      <span className="text-white text-3xl font-cabinet-grotesk font-medium group-hover:text-white/80 transition-colors uppercase tracking-wider">
                        {navItem.name}
                      </span>
                    </motion.a>
                  )
                )}
              </div>

              {/* Let's Talk Button */}
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: navItems.length * 0.1 + 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onClick={() => setIsOpen(false)}
                className="bg-white text-black px-12 py-4 rounded-full text-lg font-cabinet-grotesk font-medium hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LET&apos;S TALK
              </motion.button>

              {/* Footer Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: navItems.length * 0.1 + 0.6,
                }}
                className="text-white/40 text-sm font-cabinet-grotesk mt-8 text-center"
              >
                Ready to bring your ideas to life?
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
