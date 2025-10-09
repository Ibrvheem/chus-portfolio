import React from "react";
import { PicturesMarquee } from "./pictures-marquee";

export default function SideQuest() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen items-center container mx-auto md:px-0 ">
      <div className="space-y-4 px-8">
        <h1 className="font-gasoek-one text-5xl sm:text-7xl text-center md:text-left text-white ">
          Side Quests
        </h1>
        <div className="text-xl font-cabinet-grotesk text-center md:text-left space-y-8 text-white/70">
          <p>
            With 3+ years in design (and a dash of web dev skills), I spend most
            of my days shaping products.
          </p>
          <p className="">
            But here’s the fun side quest: I also speak about AI and
            design—sharing stories, ideas, and experiments on how tech and
            creativity collide. It’s my way of stepping out of Figma and into
            the world, sparking conversations about where design is headed.
          </p>
          <p className="">
            I also enjoy touring restaurants and fun places in my city, long
            walks at sunsets and activities like snooker, bowling and cycling!
          </p>
        </div>
      </div>
      <PicturesMarquee />
    </div>
  );
}
