import React from "react";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { div } from "motion/react-client";

const projects = [
  {
    imageUrl: "/assets/specilist_optimizer.jpg",
    description: "Specialist Optimizer",
    width: "25%",
    website: "",
  },
  {
    imageUrl: "/assets/schoola.png",
    description: "Schoola",
    width: "25%",
    website: "https://schoola.app",
  },
  {
    imageUrl: "/assets/lumi.jpg",
    description: "Lumi",
    width: "100%",
    website: "",
  },
  {
    imageUrl: "/assets/firm_lead.jpg",
    description: "Firm Lead",
    width: "35%",
    website: "",
  },
  {
    imageUrl: "/assets/community.jpg",
    description: "Community",
    width: "15%",
    website: "",
  },
];

export default function MyWork() {
  return (
    <div className="min-h-[300vh] container mx-auto space-y-16 ">
      <h1 className="font-gasoek-one text-4xl sm:text-8xl text-center text-white">
        My Work
      </h1>
      <div className="flex flex-wrap gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            style={{ width: project.width }}
            className="flex-grow relative"
          >
            <DirectionAwareHoverCard
              imageUrl={project.imageUrl}
              description={project.description}
              website={project.website}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DirectionAwareHoverCard({
  imageUrl,
  description,
  website,
}: {
  imageUrl: string;
  description: string;
  website?: string;
}) {
  return (
    <DirectionAwareHover
      imageUrl={imageUrl}
      imageClassName="!h-[60vh] object-center"
      className="!w-full !h-fit relative bg-"
      childrenClassName="backdrop-blur"
    >
      <div className="p-4   border border-white/15 rounded-xl flex justify-between items-center w-full transition-all duration-300 ease-in-out animate">
        <p className="font-bold">{description}</p>
        <div className="font-normal text-sm ">
          {website ? (
            <a
              href={website}
              target="_blank"
              className="underline"
              rel="noopener noreferrer"
            >
              Visit Site
            </a>
          ) : (
            <div className="text-white text-xs">NDA</div>
          )}
        </div>
      </div>
    </DirectionAwareHover>
  );
}
