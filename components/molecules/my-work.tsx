"use client";
import React from "react";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { LinkPreview } from "../ui/link-preview";

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
    <div className="container mx-auto space-y-16 min-h-screen mb-96 md:px-0 px-4">
      <h1 className="font-gasoek-one text-4xl sm:text-8xl text-center text-white">
        My Work
      </h1>
      <div className="flex  flex-wrap gap-8 ">
        {projects.map((project, idx) => (
          <div
            key={idx}
            style={{
              width: window.innerWidth >= 1024 ? project.width : "100%",
            }}
            className="flex-grow relative overflow-visible lg:w-auto w-full"
          >
            <DirectionAwareHoverCard
              imageUrl={project.imageUrl}
              description={project.description}
              website={project.website}
            />
            <div className="md:hidden flex justify-between items-center mt-4 ">
              <h4 className="font-cabinet-grotesk text-2xl">
                {project.description}
              </h4>
              <a href={project.website} className="text-white/50">
                {project.website ? "LIVE" : "NDA"}
              </a>
            </div>
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
      imageClassName="!h-[40vh] md:!h-[60vh] object-center"
      className="!w-full !h-fit relative "
      childrenClassName="max-w-full overflow-visible backdrop-blur p-4 border border-white/15 rounded-xl flex flex-row justify-between items-center"
    >
      <>
        <p className="font-bold">{description}</p>
        <div className="font-normal text-sm relative">
          {website ? (
            <LinkPreview url={website} className="text-white relative z-200 ">
              <a
                href={website}
                target="_blank"
                className="underline"
                rel="noopener noreferrer"
              >
                Visit Site
              </a>
            </LinkPreview>
          ) : (
            <div className="text-white text-xs">NDA</div>
          )}
        </div>
      </>
    </DirectionAwareHover>
  );
}
