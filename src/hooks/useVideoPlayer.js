import { useRef, useState, useCallback, useEffect } from 'react';

export function useVideoPlayer(autoplay = false, onVideoEnd = null) {
    const videoRef = useRef(null);
    const [state, setState] = useState({
        playing: false,
        muted: true,
        progress: 0,
        duration: 0,
        currentTime: 0,
        loading: true,
        error: false,
    });

    const play = useCallback(() => {
        videoRef.current?.play().catch(() => null);
    }, []);

    const pause = useCallback(() => {
        videoRef.current?.pause();
    }, []);

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => null);
        else v.pause();
    }, []);

    const toggleMute = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setState(s => ({ ...s, muted: v.muted }));
    }, []);

    const seek = useCallback((pct) => {
        const v = videoRef.current;
        if (!v || !isFinite(v.duration)) return;
        v.currentTime = (pct / 100) * v.duration;
    }, []);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onPlay = () => setState(s => ({ ...s, playing: true }));
        const onPause = () => setState(s => ({ ...s, playing: false }));
        const onWaiting = () => setState(s => ({ ...s, loading: true }));
        const onCanPlay = () => setState(s => ({ ...s, loading: false }));
        const onError = () => setState(s => ({ ...s, loading: false, error: true }));
        const onLoadedMeta = () =>
            setState(s => ({ ...s, duration: v.duration, loading: false }));
        const onTimeUpdate = () =>
            setState(s => ({
                ...s,
                currentTime: v.currentTime,
                progress: v.duration ? (v.currentTime / v.duration) * 100 : 0,
            }));
        const onEnded = () => {
            if (typeof onVideoEnd === "function") {
                onVideoEnd();
            }
        };
        v.addEventListener('play', onPlay);
        v.addEventListener('pause', onPause);
        v.addEventListener('waiting', onWaiting);
        v.addEventListener('canplay', onCanPlay);
        v.addEventListener('error', onError);
        v.addEventListener('loadedmetadata', onLoadedMeta);
        v.addEventListener('timeupdate', onTimeUpdate);
        v.addEventListener("ended", onEnded);

        if (autoplay) v.play().catch(() => null);

        return () => {
            v.removeEventListener('play', onPlay);
            v.removeEventListener('pause', onPause);
            v.removeEventListener('waiting', onWaiting);
            v.removeEventListener('canplay', onCanPlay);
            v.removeEventListener('error', onError);
            v.removeEventListener('loadedmetadata', onLoadedMeta);
            v.removeEventListener('timeupdate', onTimeUpdate);
            v.removeEventListener("ended", onEnded);
        };
    }, [autoplay, onVideoEnd]);

    return { videoRef, state, togglePlay, toggleMute, seek, play, pause };
}
