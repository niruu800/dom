import { useState } from "react";
import { Play } from "lucide-react";

export default function VideoCard({ video, index, onClick }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      onClick={() => onClick(index)}
      className="relative w-40 h-64 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group"
    >
      {imgError ? (
        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs text-center p-2">
          {video.title}
        </div>
      ) : (
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onError={() => setImgError(true)} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
      {/* Play Button */}
      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
        <div className="bg-white/30 p-3 rounded-full">
          <Play size={22} className="text-white" />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
        <p className="text-white text-sm font-medium">{video.title}</p>
      </div>
    </div>
  );
}
