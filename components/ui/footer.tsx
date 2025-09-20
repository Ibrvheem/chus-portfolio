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
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn", color: "#0077B5" },
  { icon: FaInstagram, href: "#", label: "Instagram", color: "#E4405F" },
  { icon: FaXTwitter, href: "#", label: "Twitter", color: "#1DA1F2" },
  { icon: FaBehance, href: "#", label: "Behance", color: "#1769FF" },
  { icon: FaMedium, href: "#", label: "Medium", color: "#00AB6C" },
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
    <div className="min-h-[40vh] flex justify-around flex-col">
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
      <div className="flex justify-between items-center">
        <div className="flex text-left gap-20">
          <div className="space-y-2">
            <p className="text-base text-white/60">CONTACT</p>
            <p className="text-lg">+234 810 059 3631</p>
          </div>
          <div className="space-y-2">
            <p className="text-base text-white/60">EMAIL</p>
            <p className="text-lg">amiinarabiu20@gmail.com</p>
          </div>
        </div>
        <div>
          <motion.div
            className="socials flex gap-6 text-4xl text-white"
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
        </div>
      </div>
      <a href="#">
        <div className="bg-white text-primary w-fit p-3 rounded-full ml-auto animate-bounce">
          <ArrowUp />
        </div>
      </a>
    </div>
  );
}
