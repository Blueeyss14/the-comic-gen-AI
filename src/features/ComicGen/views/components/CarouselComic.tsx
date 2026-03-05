import { useState, useEffect } from "react";
import { comicCarouselData, mapComicCarousel } from "../../data/comicCarouselData";

const comics = mapComicCarousel(comicCarouselData);

export default function CarouselComic() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const slotStyle = [
    {
      transform: "translateX(-22vw) rotateY(45deg) scale(0.72)",
      zIndex: 10,
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    },
    {
      transform: "translateX(0px) rotateY(0deg) scale(1)",
      zIndex: 20,
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    },
    {
      transform: "translateX(22vw) rotateY(-45deg) scale(0.72)",
      zIndex: 10,
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          perspective: "900px",
          width: "60vw",
          height: "90vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {comics.map((item, cardIdx) => {
          const slot = ((cardIdx - offset) % comics.length + comics.length) % comics.length;
          return (
            <div
              key={cardIdx}
              style={{
                position: "absolute",
                width: "20vw",
                height: "50vh",
                borderRadius: 14,
                overflow: "hidden",
                transition: "transform 2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.7s ease",
                willChange: "transform",
                ...slotStyle[slot],
              }}
            >
              <img
                src={item.comic}
                alt={`comic-${cardIdx}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}