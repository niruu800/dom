import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const VideoContext = createContext();

const API = "http://localhost:5000";

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [likedIds, setLikedIds] = useState(new Set());

  const fetchVideos = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/videos`);
      console.log("Response =>", res.data);

      setVideos(res?.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    // console.trace("alerttttttttttttttttttttttttttttt");
    setSelectedIndex(null);
  };

  // Like Video
  const handleLike = async (id, isLiked) => {
    try {
      console.log("Before");

      const targetVideo = videos.find((video) => video.id === id);

      const updatedLikes = isLiked
        ? targetVideo.likes - 1
        : targetVideo.likes + 1;

      //  const res = await axios.put(`${API}/videos/${id}`, {
      //    likes: updatedLikes,
      //  });

      //  console.log("PATCH Success", res.data);

      setVideos((prev) =>
        prev.map((video) =>
          video.id === id ? { ...video, likes: updatedLikes } : video,
        ),
      );

      console.log("After setVideos");
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (id) => {
    // 1. Current shares count nikalyein
    const targetVideo = videos.find((video) => video.id === id);
    if (!targetVideo) return;

    const updatedShares = (targetVideo.shares || 0) + 1;

    try {
      // const res = await axios.patch(`${API}/videos/${id}`, {
      //   shares: updatedShares,
      // });

      setVideos((prev) =>
        prev.map((video) =>
          video.id === id ? { ...video, shares: res.data.shares } : video,
        ),
      );
    } catch (err) {
      console.log("Share error:", err);
    }
  };

  useEffect(() => {
    console.log("VideoProvider Mounted");
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videos,
        loading,
        error,
        selectedIndex,
        likedIds,
        openModal,
        closeModal,
        handleLike,
        handleShare,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  return useContext(VideoContext);
};
