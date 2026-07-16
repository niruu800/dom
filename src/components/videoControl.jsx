import { useCallback, useEffect, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  Check,
} from "lucide-react";

import ProgressBar from "./progressCheck";

export default function VideoControls({
  video,
  playing,
  muted,
  progress,
  duration,
  currentTime,
  liked,
  onTogglePlay,
  onToggleMute,
  onSeek,
  onLike,
  onShare,
}) {
  // console.log(liked);
  const [shared, setShared] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);

  useEffect(() => {
    setLikeCount(video.likes);
  }, []);

  const handleShare = useCallback(async () => {
    await triggerNativeShare(window.location.href, video.title);

    onShare(video.id);

    setShared(true);

    setTimeout(() => {
      setShared(false);
    }, 2000);
  }, [video, onShare]);

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4">
      <div className="flex justify-end">
        <button
          onClick={onToggleMute}
          className="bg-black/50 p-2 rounded-full text-white mt-5 cursor-pointer"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onTogglePlay}
          className="bg-black/50 p-4 rounded-full text-white"
        >
          {playing ? <Pause size={28} /> : <Play size={28} />}
        </button>
      </div>

      <div>
        <h3 className="text-white font-bold">{video.title}</h3>

        <p className="text-white/70 text-sm mb-3">{video.description}</p>

        <ProgressBar progress={progress} onSeek={onSeek} />

        <div className="flex justify-between items-center mt-3">
          <span className="text-white text-sm">
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </span>

          <div className="flex gap-5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (isLiked) {
                  setIsLiked(false);
                  setLikeCount((p) => p - 1);
                } else {
                  setIsLiked(true);
                  setLikeCount((p) => p + 1);
                }

                onLike(isLiked);
              }}
              className={isLiked ? "text-red-500" : "text-white"}
            >
              <Heart size={22} className={isLiked ? "fill-red-500" : ""} />

              <p className="text-xs">{likeCount}</p>
            </button>

            <button onClick={handleShare} className="text-white">
              {shared ? <Check size={22} /> : <Share2 size={22} />}

              <p className="text-xs">{formatCount(video.shares)}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const formatCount = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
};

const formatDuration = (seconds) => {
  if (!seconds) return "0:00";

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${m}:${String(s).padStart(2, "0")}`;
};

const triggerNativeShare = async (url, title) => {
  if (navigator.share) {
    await navigator.share({
      title,
      url,
    });
  } else {
    await navigator.clipboard.writeText(url);
    alert("Link Copied");
  }
};
