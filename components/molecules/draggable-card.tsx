import React from "react";
import Image from "next/image";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function DraggableCardDemo({
  children,
}: {
  children?: React.ReactNode;
}) {
  const items = [
    {
      title: "My lil cousins & my poor attempt at face painting lol <3",
      image: "/assets/2.png",
      className: "absolute top-10 left-[8%] rotate-[10deg]",
    },
    {
      title: "My Birthday :)",
      image: "/assets/4.png",
      className: "absolute top-10 left-[20%] rotate-[-15deg]",
    },
    {
      title: "Me & Bestie",
      image: "/assets/3.png",
      className: "absolute top-10 left-[38%] rotate-[10deg]",
    },
    {
      title: "Random",
      image: "/assets/6.png",
      className: "absolute top-10 left-[55%] rotate-[-15deg]",
    },
    {
      title: "Me & My Sisters <3",
      image: "/assets/5.png",
      className: "absolute top-10 left-[70%] rotate-[10deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex flex-col min-h-[50vh] w-full items-center justify-center overflow-clip ">
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <Image
            src={item.image}
            alt={item.title}
            width={320}
            height={320}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
            priority
          />
          <h3 className="mt-4 font-dokdo text-center  font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
      <div className="mt-[40vh]" />
      {children}
    </DraggableCardContainer>
  );
}
