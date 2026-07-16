import React, { useCallback } from "react";
import { Flame, TrendingUp } from "lucide-react";
import { useVideoContext } from "../context/videocontext.jsx";
import LoadingSpinner from "../components/spinner.jsx";
import OuterCarousel from "../components/carousel.jsx";
import VideoModal from "../components/videoModal.jsx";

export default function HomePage() {
  const {
    videos,
    likedIds,
    loading,
    error,
    selectedIndex,
    openModal,
    closeModal,
    handleLike,
    handleShare,
  } = useVideoContext();
// console.log("selectedIndex =", selectedIndex);
  const handleVideoClick = (index) => {
    openModal(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="lg" />
          <p className="text-white/40 text-sm">Loading videos…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-rose-400 font-medium">Failed to load videos</p>
          <p className="text-white/40 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
              <Flame size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">SocialFeed</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-white/40" />
            <span className="text-white/40 text-sm">
              {videos.length} videos
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <section className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 text-xs font-semibold uppercase tracking-wider">
              <Flame size={10} />
              Trending
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Socially Approved
          </h1>
          <p className="text-white/40 text-sm">
            Tap any video to watch, like, and share.
          </p>
        </section>

        <section>
          <OuterCarousel videos={videos} onVideoClick={handleVideoClick} />
        </section>

        {/* {videos.length > 10 && (
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-white/70">
              More to watch
            </h2>
            <OuterCarousel
              videos={[...videos].sort(() => Math.random() - 0.5).slice(0, 20)}
              onVideoClick={handleVideoClick}
            />
          </section>
        )} */}
      </main>

      {selectedIndex !== null && (
        <VideoModal
          videos={videos}
          initialIndex={selectedIndex}
          onClose={closeModal}
          onLike={handleLike}
          onShare={handleShare}
          likedIds={likedIds}
        />
      )}
    </div>
  );
}
