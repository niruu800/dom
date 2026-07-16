import React, { useEffect } from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import LoadingSpinner from "./spinner";
import VideoControls from "./videoControl";

const ModalVideoItem = ({
  video,
  onLike,
  onShare,
  isActive,
  onVideoEnd,
  likedIds,
}) => {
  // console.log(likedIds + "item");
  // console.log(video);

  const { videoRef, state, play, pause, togglePlay, toggleMute, seek } =
    useVideoPlayer(true);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch((err) => console.log(err));
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={video.url}
        poster={video.thumbnail}
        muted={state.muted}
        loop={false}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-contain"
        onEnded={() => onVideoEnd?.()}
        onLoadedMetadata={() => console.log("Metadata Loaded")}
        onCanPlay={() => console.log("Can Play")}
        onPlay={() => console.log("Playing")}
        onError={(e) => console.log("Video Error", e.target.error)}
      />

      {state.loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      <VideoControls
        video={video}
        playing={state.playing}
        muted={state.muted}
        progress={state.progress}
        duration={state.duration}
        currentTime={state.currentTime}
        liked={false}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onSeek={seek}
        onLike={(isLiked) => onLike(video.id, isLiked)}
        onShare={() => onShare(video.id)}
      />
    </div>
  );
};

export default React.memo(ModalVideoItem);
