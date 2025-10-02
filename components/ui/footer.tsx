"use client";
import React from "react";
import { easeInOut, motion } from "framer-motion";
import CTAs from "../molecules/ctas";
import {} from "react-icons/fa";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaBehance,
  FaMedium,
} from "react-icons/fa6";
import { ArrowUp } from "lucide-react";

const socialIcons = [
  {
    icon: FaLinkedinIn,
    href: "https://ng.linkedin.com/in/amina-mustapha-139151218",
    label: "LinkedIn",
    color: "#0077B5",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/amiinarabiu/",
    label: "Instagram",
    color: "#E4405F",
  },
  {
    icon: FaXTwitter,
    href: "https://x.com/amiinarabiu",
    label: "Twitter",
    color: "#1DA1F2",
  },
  {
    icon: FaBehance,
    href: "https://www.behance.net/aminamustapha1",
    label: "Behance",
    color: "#1769FF",
  },
  {
    icon: FaMedium,
    href: "https://medium.com/@aminarabiu",
    label: "Medium",
    color: "#00AB6C",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const iconVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut, // ✅ use easing function, not string
    },
  },
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

const liquidFillVariants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  hover: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easeInOut,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut, // use easing function instead of array
    },
  },
};

export default function Footer() {
  return (
    <div className="min-h-[40vh] flex justify-around flex-col container mx-auto">
      <div className="space-y-4">
        <h1 className="font-gasoek-one text-4xl sm:text-7xl text-center text-white">
          Let&apos;s Connect
        </h1>
        <div className="text-xl font-cabinet-grotesk text-center space-y-8 text-white/70">
          <p>
            Feel free to contact me if having any questions. I&apos;m available
            for new projects or just for a quick chat.
          </p>
          <CTAs />
        </div>
      </div>
      <div className="flex justify-between md:items-center md:flex-row flex-col md:px-0 p-8">
        <div className="flex md:flex-row flex-col text-left md:gap-20 ">
          <div className="space-y-2">
            <p className="text-base text-white/60">CONTACT</p>
            <p className="text-lg">+234 810 059 3631</p>
          </div>
          <div className="space-y-2">
            <p className="text-base text-white/60">EMAIL</p>
            <p className="text-lg">amiinarabiu20@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 md:hidden">
          <motion.div
            className="socials flex md:gap-6 gap-2 text-4xl text-white md:mt-0 "
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {socialIcons.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="relative p-3 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm cursor-pointer block overflow-hidden group"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Liquid Fill Background */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: social.color }}
                    variants={liquidFillVariants}
                    initial="initial"
                    whileHover="hover"
                    exit="exit"
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10 transition-colors duration-300"
                    whileHover={{ color: "#ffffff" }}
                  >
                    <IconComponent className="text-xl" />
                  </motion.div>
                </motion.a>
              );
            })}
          </motion.div>
          <a href="#">
            <div className="bg-white text-primary w-fit p-3 rounded-full ml-auto ">
              <ArrowUp />
            </div>
          </a>
        </div>
      </div>
      <a href="#">
        <div className="bg-white text-primary w-fit p-3 rounded-full ml-auto animate-bounce md:block hidden">
          <ArrowUp />
        </div>
      </a>
    </div>
  );
}
