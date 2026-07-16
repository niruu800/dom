import { useCallback } from "react";

export default function ProgressBar({ progress, onSeek }) {
  const handleClick = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();

      const percent = ((e.clientX - rect.left) / rect.width) * 100;

      onSeek(Math.max(0, Math.min(100, percent)));
    },
    [onSeek],
  );

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-1 bg-white/30 rounded-full cursor-pointer"
    >
      <div
        className="absolute top-0 left-0 h-full bg-white rounded-full"
        style={{
          width: `${progress}%`,
        }}
      />

      <div
        className="absolute top-1/2 w-3 h-3 bg-white rounded-full -translate-y-1/2"
        style={{
          left: `${progress}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

