"use client";
import React from "react";
import EmblaCarousel from "@/components/molecules/embla/EmblaCarousel";

export default function Testimonials() {
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className="min-h-screen mx-auto space-y-16 " id="testimonials">
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
