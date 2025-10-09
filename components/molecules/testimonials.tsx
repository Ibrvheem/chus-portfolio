"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function Testimonials() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="md:min-h-screen mx-auto md:space-y-16 " id="testimonials">
      <div className="space-y-4">
        <h1 className="font-gasoek-one text-4xl sm:text-6xl text-center text-white max-w-2xl mx-auto">
          What It&lsquo;s Like to Work With Me?
        </h1>
        <p className="text-xl font-cabinet-grotesk text-center text-white/70">
          Words from those I&lsquo;ve worked with
        </p>
        <Carousel items={cards} />
      </div>
    </div>
  );
}

const DummyContent = ({
  videoId,
  clientName,
  testimonialText,
}: {
  videoId: string;
  clientName: string;
  testimonialText: string;
}) => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto mb-6">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {testimonialText}
              </span>{" "}
              - {clientName}
            </p>

            {/* Vertical Video Container */}
            <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-lg bg-black">
              <iframe
                src={`https://player.mux.com/${videoId}?primary_color=ffffff&secondary_color=000000`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full object-cover"
                title={`${clientName} Testimonial`}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              ></iframe>
            </div>
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Co-Founder & CTO Schoola",
    title: "Abdulalim Ladan",
    src: `https://image.mux.com/Ui2FMx4ZRKSq01r0000oQRSZ6YtZsVq5YePpS02WAD4AlNs/thumbnail.png`,
    content: (
      <DummyContent
        videoId="Ui2FMx4ZRKSq01r0000oQRSZ6YtZsVq5YePpS02WAD4AlNs"
        clientName="Alim"
        testimonialText="Working with this designer was incredible. The user experience design completely transformed our product and user engagement."
      />
    ),
  },
  {
    category: "Lead Venture Analyst Amiron Ventures",
    title: "Mackenzie Kyryluk",
    src: `https://image.mux.com/01iTJehQ8KqoKaAXELne6QY9QaoRmkla006tJWYHqyQGo/thumbnail.png`,
    content: (
      <DummyContent
        videoId="01iTJehQ8KqoKaAXELne6QY9QaoRmkla006tJWYHqyQGo"
        clientName="Mackenzie"
        testimonialText="The attention to detail and strategic thinking brought our vision to life. Exceptional work that exceeded all expectations."
      />
    ),
  },
  {
    category: "Manager of Operations and MVP Development Amiron Ventures r",
    title: "Mat Kleisinger",
    src: `https://image.mux.com/xPa01rE6mlMwISsFAtACaGtAp5X7ONllnKcQf7bfyMEI/thumbnail.png`,
    content: (
      <DummyContent
        videoId="xPa01rE6mlMwISsFAtACaGtAp5X7ONllnKcQf7bfyMEI"
        clientName="Kleis"
        testimonialText="Creative problem-solving at its finest. The design solutions were innovative and perfectly aligned with our brand goals."
      />
    ),
  },
  {
    category: "Lead Product Designer/ Manager Amiron Ventures",
    title: "Bashir Mustapha",
    src: `https://image.mux.com/ah9MhHKJ7d89CYjsjGL7F8tPzMMe5gBEqVVvxGUh2KY/thumbnail.png`,
    content: (
      <DummyContent
        videoId="ah9MhHKJ7d89CYjsjGL7F8tPzMMe5gBEqVVvxGUh2KY"
        clientName="Bash"
        testimonialText="The technical expertise and design skills are outstanding. Our platform performs beautifully and users love the interface."
      />
    ),
  },
];
