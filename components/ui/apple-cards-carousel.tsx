"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image, { ImageProps } from "next/image";

interface CarouselProps {
  items: React.JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  videoId?: string; // Add optional videoId for direct video access
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
  playingVideoIndex: number | null;
  setPlayingVideoIndex: (index: number | null) => void;
}>({
  onCardClose: () => {},
  currentIndex: 0,
  playingVideoIndex: null,
  setPlayingVideoIndex: () => {},
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{
        onCardClose: handleCardClose,
        currentIndex,
        playingVideoIndex,
        setPlayingVideoIndex,
      }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 justify-end gap-2 hidden">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const { playingVideoIndex, setPlayingVideoIndex } =
    useContext(CarouselContext);
  const isPlaying = playingVideoIndex === index;
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Reset video loaded state when playback stops
  React.useEffect(() => {
    if (!isPlaying) {
      setIsVideoLoaded(false);
    }
  }, [isPlaying]);

  // Extract video ID from the Mux thumbnail URL
  const getVideoId = () => {
    const videoIdMatch = card.src.match(/image\.mux\.com\/([^\/]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  // Handler for direct video playback on the card
  const handleVideoPlay = () => {
    setPlayingVideoIndex(index); // Set this card as the playing one
  };

  const handleVideoStop = () => {
    setPlayingVideoIndex(null); // Stop all videos
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const videoId = getVideoId();

  return (
    <>
      {/* Commented out dialog/modal functionality */}
      {/* <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.category}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-semibold text-neutral-700 dark:text-white mt-4"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence> */}

      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 group"
      >
        {/* Always show thumbnail as base layer */}
        <div className="absolute inset-0 z-10">
          <div className="absolute h-full bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 z-40 p-8">
            <motion.p
              layoutId={layout ? `title-${card.title}` : undefined}
              className="text-white text-sm md:text-base font-cabinet-grotesk font-medium max-w-xs text-left [text-wrap:balance]"
            >
              {card.title}
            </motion.p>
            <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-left font-cabinet-grotesk text-sm font-medium text-white md:text-sm"
            >
              {card.category}
            </motion.p>
          </div>
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="absolute inset-0 z-10 object-cover rounded-3xl"
          />
        </div>

        {/* Play button overlay - only show when NOT playing */}
        {!isPlaying && (
          <button
            onClick={handleVideoPlay}
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-20 flex items-center justify-center"
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-4">
              <svg
                className="w-8 h-8 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}

        {/* Video Player - shows on top when playing and loaded */}
        {isPlaying && videoId && (
          <div
            className={`absolute inset-0 z-30 transition-opacity duration-300 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Close button */}
            <button
              onClick={handleVideoStop}
              className="absolute top-4 right-4 z-40 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video iframe */}
            <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden">
              {/* Blurred background layer for horizontal videos */}
              <iframe
                src={`https://player.mux.com/${videoId}?primary_color=ffffff&secondary_color=000000&autoplay=1&muted=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                title={`${card.title} Background`}
                onLoad={handleVideoLoad}
                style={{
                  border: "none",
                  outline: "none",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  filter: "blur(20px) brightness(0.7)",
                  transform: "scale(1.1)",
                  zIndex: 1,
                }}
              />

              {/* Main video layer - cropped to portrait */}
              <iframe
                src={`https://player.mux.com/${videoId}?primary_color=ffffff&secondary_color=000000&autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${card.title} Testimonial`}
                style={{
                  border: "none",
                  outline: "none",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100%",
                  height: "177.78%", // Portrait crop (16:9 to 9:16)
                  transform: "translate(-50%, -50%)",
                  transformOrigin: "center center",
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
}: Pick<
  ImageProps,
  "height" | "width" | "src" | "className" | "alt" | "fill"
>) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "h-full w-full transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src as string}
      width={fill ? undefined : width || 400}
      height={fill ? undefined : height || 400}
      fill={fill}
      loading="lazy"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
    />
  );
};
