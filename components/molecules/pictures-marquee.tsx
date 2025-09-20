/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "../ui/marquee";

const pictures = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    alt: "Mountain landscape",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    alt: "Forest view",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=600&fit=crop",
    alt: "Ocean waves",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1464822759844-d150baec013c?w=400&h=600&fit=crop",
    alt: "Sunset sky",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&q=80",
    alt: "Desert landscape",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=600&fit=crop",
    alt: "City skyline",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&sat=-100",
    alt: "Abstract architecture",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
    alt: "Tropical beach",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=600&fit=crop",
    alt: "Snowy mountains",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&hue=120",
    alt: "Green valley",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=600&fit=crop",
    alt: "Urban street",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&hue=240",
    alt: "Blue horizon",
  },
];

// Split into 3 groups for 3 marquees
const firstRow = pictures.slice(0, 4);
const secondRow = pictures.slice(4, 8);
const thirdRow = pictures.slice(8, 12);

const PictureCard = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <figure
      className={cn(
        "group relative h-72 w-52 cursor-pointer overflow-hidden rounded-xl transition-all duration-300 bg-transparent"
      )}
    >
      <img
        className="h-full w-full object-cover transition-transform duration-500 grayscale group-hover:scale-110 group-hover:grayscale-0"
        src={src}
        alt={alt}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </figure>
  );
};

export function PicturesMarquee() {
  return (
    <div className="relative flex h-[70vh] w-full flex-row items-center justify-center overflow-hidden gap-4 ">
      {/* First Marquee */}
      <Marquee pauseOnHover vertical className="[--duration:25s]">
        {firstRow.map((picture) => (
          <PictureCard key={picture.id} src={picture.src} alt={picture.alt} />
        ))}
      </Marquee>

      {/* Second Marquee (Reverse) */}
      <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
        {secondRow.map((picture) => (
          <PictureCard key={picture.id} src={picture.src} alt={picture.alt} />
        ))}
      </Marquee>

      {/* Third Marquee */}
      <Marquee pauseOnHover vertical className="[--duration:30s]">
        {thirdRow.map((picture) => (
          <PictureCard key={picture.id} src={picture.src} alt={picture.alt} />
        ))}
      </Marquee>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#0C121B] to-black/0  z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0C121B] to-black/0  z-10" />
    </div>
  );
}
