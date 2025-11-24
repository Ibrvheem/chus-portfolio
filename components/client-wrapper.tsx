"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/ui/loading-screen";

const VIDEO_SOURCES = [
  "/assets/alim.mov",
  "/assets/mackenzie.mov",
  "/assets/mat.mp4",
  "/assets/bashir.mov",
];

const IMAGE_SOURCES = [
  "/assets/1.jpg", // Navbar profile picture
  "/assets/2.png", // Hero section images
  "/assets/3.png",
  "/assets/4.png",
  "/assets/5.png",
  "/assets/6.png",
];

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen
          videoSources={VIDEO_SOURCES}
          imageSources={IMAGE_SOURCES}
          onLoadComplete={handleLoadComplete}
        />
      )}
      {showContent && children}
    </>
  );
}
