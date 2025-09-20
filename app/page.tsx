import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import AboutMe from "@/components/molecules/about-me";
import DesignExplorations from "@/components/molecules/design-explorations";
import { DraggableCardDemo } from "@/components/molecules/draggable-card";
import { Experience } from "@/components/molecules/experience";
import MyWork from "@/components/molecules/my-work";
import Navbar from "@/components/molecules/navbar";
import Testimonials from "@/components/molecules/testimonials";
import { Button } from "@/components/ui/button";
import { Download, Phone } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans   gap-16  bg-[#0C121B]">
      <div className="container  mx-auto text-white text-center space-y-8">
        <div className="w-full flex items-center justify-center z-10 relative">
          <div>
            <Navbar />
          </div>
          <div className="max-w-3xl mx-auto space-y-8 mb-16">
            {" "}
            <div className="h-40" />
            <h1 className="font-gasoek-one text-4xl sm:text-8xl">
              Hi, it&#39;s amina!
            </h1>
            <p className="font-cabinet-grotesk text-lg sm:text-xl leading-8 text-white/80">
              A Product Designer that is passionate about creating meaningful
              digital experiences crafting designs that not only look great but
              also feel seamless to use.{" "}
            </p>
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
              >
                Get my Resume
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
        <div className=" w-full">
          <DraggableCardDemo />
        </div>
        <AboutMe />
        <MyWork />
        <DesignExplorations />
        <Experience />
        <Testimonials />
      </div>
    </div>
  );
}
