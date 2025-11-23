"use client";

const data = [
  {
    category: "Co-Founder & CTO Schoola",
    title: "Abdulalim Ladan",
    videoId: "Ui2FMx4ZRKSq01r0000oQRSZ6YtZsVq5YePpS02WAD4AlNs",
    src: `https://image.mux.com/Ui2FMx4ZRKSq01r0000oQRSZ6YtZsVq5YePpS02WAD4AlNs/thumbnail.png`,
  },
  {
    category: "Lead Venture Analyst Amiron Ventures",
    title: "Mackenzie Kyryluk",

    videoId: "01iTJehQ8KqoKaAXELne6QY9QaoRmkla006tJWYHqyQGo",
    src: `https://image.mux.com/01iTJehQ8KqoKaAXELne6QY9QaoRmkla006tJWYHqyQGo/thumbnail.png`,
  },
  {
    category: "Manager of Operations and MVP Development Amiron Ventures r",
    title: "Mat Kleisinger",

    videoId: "xPa01rE6mlMwISsFAtACaGtAp5X7ONllnKcQf7bfyMEI",
    src: `https://image.mux.com/xPa01rE6mlMwISsFAtACaGtAp5X7ONllnKcQf7bfyMEI/thumbnail.png`,
  },
  {
    category: "Lead Product Designer/ Manager Amiron Ventures",
    title: "Bashir Mustapha",
    videoId: "ah9MhHKJ7d89CYjsjGL7F8tPzMMe5gBEqVVvxGUh2KY",
    src: `https://image.mux.com/ah9MhHKJ7d89CYjsjGL7F8tPzMMe5gBEqVVvxGUh2KY/thumbnail.png`,
  },
];

export default function Testimonials() {
  return (
    <div className="md:min-h-screen mx-auto md:space-y-16" id="testimonials">
      <div className="space-y-4">
        <h1 className="font-gasoek-one text-4xl sm:text-6xl text-center text-white max-w-2xl mx-auto">
          What It&lsquo;s Like to Work With Me?
        </h1>
        <p className="text-xl font-cabinet-grotesk text-center text-white/70">
          Words from those I&lsquo;ve worked with
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6  md:container mx-auto pt-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-lg bg-black"
            >
              <iframe
                src={`https://player.mux.com/${item.videoId}?primary_color=ffffff&secondary_color=000000&controls=false`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full object-cover"
                title={`${item.title} Testimonial`}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
