import AboutMe from "@/components/molecules/about-me";
import { DraggableCardDemo } from "@/components/molecules/draggable-card";
import MyWork from "@/components/molecules/my-work";
import Navbar from "@/components/molecules/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans   gap-16  bg-[#0C121B]">
      <Navbar />
      <div className="h-40" />
      <div className="container  relative mx-auto text-white text-center space-y-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="font-gasoek-one text-4xl sm:text-8xl">
            Hi, it&#39;s amina!
          </h1>
          <p className="font-cabinet-grotesk text-lg sm:text-xl leading-8 text-white/80">
            A Product Designer that is passionate about creating meaningful
            digital experiences crafting designs that not only look great but
            also feel seamless to use.{" "}
          </p>
          <div className="group-buttons flex gap-4 items-center justify-center w-full ">
            <Button className="bg-white !text-black rounded-full px-8 py-8">
              Book a Call
            </Button>
            <Button
              variant={"outline"}
              className="bg-transparent rounded-full px-8 py-8 text-white/80"
            >
              Get my Resume
            </Button>
          </div>
        </div>
        <div className="mt-8 w-full">
          <DraggableCardDemo>
            <AboutMe />
            <MyWork />
          </DraggableCardDemo>
        </div>
      </div>
    </div>
  );
}
