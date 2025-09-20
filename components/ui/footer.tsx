import React from "react";
import CTAs from "../molecules/ctas";
import {} from "react-icons/fa";
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaBehance,
  FaMedium,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="min-h-[50vh] flex justify-around  flex-col">
      <div className="space-y-4">
        <h1 className="font-gasoek-one text-4xl sm:text-7xl text-center text-white ">
          Let's Connect
        </h1>
        <div className="text-xl font-cabinet-grotesk text-center space-y-8 text-white/70">
          <p>
            Feel free to contact me if having any questions. I'm available for
            new projects or just for a quick chat.
          </p>
          <CTAs />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex  text-left gap-20">
          <div className="space-y-2">
            <p className="text-base text-white/60">CONTACT</p>
            <p className="text-lg">+234 810 059 3631</p>
          </div>
          <div className="space-y-2">
            <p className="text-base text-white/60">EMAIL</p>
            <p className="text-lg">amiinarabiu20@gmail.com</p>
          </div>
        </div>
        <div className="socials flex gap-6 text-4xl text-white">
          <div className="p-2 rounded-full border border-white/50 bg-white/10">
            <FaLinkedinIn className="text-xl" />
          </div>
          <div className="p-2 rounded-full border border-white/50 bg-white/10">
            <FaInstagram className="text-xl" />
          </div>
          <div className="p-2 rounded-full border border-white/50 bg-white/10">
            <FaXTwitter className="text-xl" />
          </div>
          <div className="p-2 rounded-full border border-white/50 bg-white/10">
            <FaBehance className="text-xl" />
          </div>
          <div className="p-2 rounded-full border border-white/50 bg-white/10">
            <FaMedium className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
