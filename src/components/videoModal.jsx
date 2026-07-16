import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ModalVideoItem from "./ModalVideoItem";

export default function VideoModal({
  videos,
  initialIndex,
  likedIds,
  onClose,
  onLike,
  onShare,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const nextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const distance = touchStartY.current - touchEndY.current;

    if (distance > 80) {
      nextVideo();
    }

    if (distance < -80) {
      prevVideo();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-0 right-4 z-50 bg-black/60 p-2 rounded-full"
      >
        <X color="white" />
      </button>

      {/* Previous */}
      {currentIndex > 0 && (
        <button
          onClick={prevVideo}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-black/60 p-2 rounded-full"
        >
          <ChevronLeft color="white" />
        </button>
      )}

      {/* Next */}
      {currentIndex < videos.length - 1 && (
        <button
          onClick={nextVideo}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-black/60 p-2 rounded-full"
        >
          <ChevronRight color="white" />
        </button>
      )}

      <ModalVideoItem
        video={videos[currentIndex]}
        liked={likedIds?.has(videos[currentIndex].id)}
        onLike={onLike}
        likedIds={likedIds}
        onShare={onShare}
        onVideoEnd={nextVideo}
        isActive={true}
      />
    </div>
  );
}
