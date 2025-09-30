"use client";
import React from "react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { Download, Phone } from "lucide-react";

export default function CTAs() {
  return (
    <div className="group-buttons flex gap-4 items-center justify-center w-full ">
      <InteractiveHoverButton
        icon={<Phone className="h-4 w-4" />}
        className="bg-white !text-black rounded-full px-4 py-4"
      >
        Book a Call
      </InteractiveHoverButton>
      <InteractiveHoverButton
        icon={<Download className="h-4 w-4" />}
        className="bg-transparent rounded-full px-4 py-4 border border-white/20 text-white/80"
        innerClass="group-hover:bg-indigo-600"
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/docs/AminaProductCV.pdf";
          link.download = "AminaProductCV.pdf";
          link.click();
        }}
      >
        Get my Resume
      </InteractiveHoverButton>
    </div>
  );
}
