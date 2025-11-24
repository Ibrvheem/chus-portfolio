"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  videoSources: string[];
  onLoadComplete: () => void;
}

export default function LoadingScreen({
  videoSources,
  onLoadComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalVideos = videoSources.length;

    if (totalVideos === 0) {
      onLoadComplete();
      return;
    }

    const checkVideoLoad = (videoSrc: string): Promise<void> => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = videoSrc;

        const onCanPlayThrough = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalVideos) * 100));
          cleanup();
          resolve();
        };

        const onError = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalVideos) * 100));
          cleanup();
          resolve();
        };

        const cleanup = () => {
          video.removeEventListener("canplaythrough", onCanPlayThrough);
          video.removeEventListener("error", onError);
          video.src = "";
        };

        video.addEventListener("canplaythrough", onCanPlayThrough);
        video.addEventListener("error", onError);
        video.load();
      });
    };

    Promise.all(videoSources.map((src) => checkVideoLoad(src))).then(() => {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onLoadComplete, 800);
      }, 500);
    });
  }, [videoSources, onLoadComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#0C121B] flex flex-col items-center justify-center"
        >
          {/* Logo or Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="font-gasoek-one text-4xl md:text-6xl text-white">
              Amina Mustapha
            </h1>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 md:w-96">
            <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Progress Text */}
            <motion.p
              className="text-white/60 text-center mt-4 font-cabinet-grotesk"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {progress}%
            </motion.p>
          </div>

          {/* Loading Text */}
          <motion.p
            className="text-white/40 text-sm mt-8 font-cabinet-grotesk"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
