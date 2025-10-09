import AboutMe from "@/components/molecules/about-me";
import CTAs from "@/components/molecules/ctas";
import DesignExplorations from "@/components/molecules/design-explorations";
import { DraggableCardDemo } from "@/components/molecules/draggable-card";
import { Experience } from "@/components/molecules/experience";
import MyWork from "@/components/molecules/my-work";
import Navbar from "@/components/molecules/navbar";
import SideQuest from "@/components/molecules/side-quest";
import Testimonials from "@/components/molecules/testimonials";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="font-sans   gap-16  bg-[#0C121B]">
      <div className="  mx-auto text-white text-center space-y-8">
        <div className="w-full flex items-center justify-center  relative">
          <div>
            <Navbar />
          </div>
          <div className="max-w-3xl mx-auto space-y-8 mb-16 md:px-0 px-4">
            {" "}
            <div className="h-40" />
            <h1 className="font-gasoek-one text-7xl sm:text-8xl">
              Hi, it&#39;s amina!
            </h1>
            <p className="font-cabinet-grotesk text-lg sm:text-xl leading-8 text-white/80">
              A Product Designer that is passionate about creating meaningful
              digital experiences crafting designs that not only look great but
              also feel seamless to use.{" "}
            </p>
            <CTAs />
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
        <SideQuest />
        <Footer />
      </div>
    </div>
  );
}
