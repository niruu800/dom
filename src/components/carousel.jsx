import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VideoCard from "./videoCard.jsx";
//

export default function Carousel({ videos, onVideoClick }) {
  const [visibleCount, setVisibleCount] = useState(10);
  const scrollRef = useRef();
  const observer = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  const lastVideoRef = useCallback(
    (node) => {
      if (!node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < videos.length) {
          console.log("Loading next 10...");
          setVisibleCount((prev) => Math.min(prev + 10, videos.length));
        }
      });

      observer.current.observe(node);
    },
    [visibleCount, videos.length],
  );
  useEffect(()=>{
    console.log("total video",visibleCount)
  },[visibleCount])

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full"
      >
        <ChevronLeft color="white" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {videos.slice(0, visibleCount).map((video, index) => {
          if (index === visibleCount - 1) {
            return (
              <div ref={lastVideoRef} key={video.id}>
                <VideoCard video={video} index={index} onClick={onVideoClick} />
              </div>
            );
          }

          return (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onClick={onVideoClick}
            />
          );
        })}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full"
      >
        <ChevronRight color="white" />
      </button>
    </div>
  );
}
