"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, createContext, useContext, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type TestimonialData = {
  category: string;
  name: string;
  src: string;
};

const data: TestimonialData[] = [
  {
    category: "Co-Founder & CTO Schoola",
    name: "Abdulalim Ladan",
    src: `./assets/alim.mov`,
  },
  {
    category: "Lead Venture Analyst Amiron Ventures",
    name: "Mackenzie Kyryluk",
    src: `./assets/mackenzie.mov`,
  },
  {
    category: "Manager of Operations and MVP Development Amiron Ventures",
    name: "Mat Kleisinger",
    src: `./assets/mat.mp4`,
  },
  {
    category: "Lead Product Designer/ Manager Amiron Ventures",
    name: "Bashir Mustapha",
    src: `./assets/bashir.mov`,
  },
];

// Context to manage which video is playing
const VideoContext = createContext<{
  currentPlayingId: string | null;
  setCurrentPlayingId: (id: string | null) => void;
}>({
  currentPlayingId: null,
  setCurrentPlayingId: () => {},
});

export default function Testimonials() {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  return (
    <VideoContext.Provider value={{ currentPlayingId, setCurrentPlayingId }}>
      <div className="md:min-h-screen mx-auto md:space-y-16" id="testimonials">
        <div className="space-y-4">
          <h1 className="font-gasoek-one text-4xl sm:text-6xl text-center text-white max-w-2xl mx-auto">
            What It&lsquo;s Like to Work With Me?
          </h1>
          <p className="text-xl font-cabinet-grotesk text-center text-white/70">
            Words from those I&lsquo;ve worked with
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:container mx-auto pt-8 px-4">
            {data.map((each, index) => (
              <VideoCard
                key={each.name}
                data={each}
                index={index}
                videoId={each.name}
              />
            ))}
          </div>
        </div>
      </div>
    </VideoContext.Provider>
  );
}

function VideoCard({
  data,
  index,
  videoId,
}: {
  data: TestimonialData;
  index: number;
  videoId: string;
}) {
  const { currentPlayingId, setCurrentPlayingId } = useContext(VideoContext);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isPlaying = currentPlayingId === videoId;

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pause video when another video starts playing
  useEffect(() => {
    if (!isPlaying && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setCurrentPlayingId(null);
      } else {
        videoRef.current.play();
        setCurrentPlayingId(videoId);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering video play/pause
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    if (isMobile) {
      togglePlay();
    }
  };

  const shouldShowControls = isMobile || showControls;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
    >
      <div
        className="relative h-[60vh] rounded-2xl overflow-hidden bg-black cursor-pointer"
        onClick={handleVideoClick}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={data.src}
          loop
          muted={isMuted}
          playsInline
        />

        {/* Subtle dark gradient overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Always visible name and position - Left bottom */}
        <div className="absolute bottom-4 left-4 z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-1"
          >
            <h3 className="text-white font-semibold text-sm drop-shadow-lg text-left">
              {data.name}
            </h3>
            <p className="text-white/80 text-xs  drop-shadow-lg text-left max-w-[70%]">
              {data.category}
            </p>
          </motion.div>
        </div>

        {/* Controls overlay */}
        <AnimatePresence>
          {shouldShowControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/20 z-30"
            >
              {/* Center play/pause button - Hidden on mobile, shown on desktop hover */}
              {!isMobile && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    onClick={togglePlay}
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated background circle */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full backdrop-blur-md"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 p-6">
                      <motion.div
                        key={isPlaying ? "pause" : "play"}
                        initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white fill-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white fill-white ml-1" />
                        )}
                      </motion.div>
                    </div>
                  </motion.button>
                </div>
              )}

              {/* Bottom controls bar - Mute button */}
              <motion.div
                className="absolute bottom-4 right-4 z-40"
                initial={{ y: isMobile ? 0 : 20, opacity: isMobile ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: isMobile ? 0 : 0.1 }}
              >
                {/* Mute/Unmute button */}
                <motion.button
                  onClick={toggleMute}
                  className="p-3 bg-white/30 rounded-full backdrop-blur-md border border-white/20 shadow-lg touch-manipulation"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    key={isMuted ? "muted" : "unmuted"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Mobile play/pause indicator */}
              {isMobile && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    key={isPlaying ? "playing" : "paused"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    exit={{ scale: 1.2, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/20 rounded-full p-4 backdrop-blur-md"
                  >
                    {isPlaying ? (
                      <Pause className="w-12 h-12 text-white fill-white" />
                    ) : (
                      <Play className="w-12 h-12 text-white fill-white ml-1" />
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
