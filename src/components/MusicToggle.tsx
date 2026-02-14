"use client";

import { useState, useRef, useEffect } from "react";

const MUSIC_SRC = "/music/romantic.mp3"; // Đặt file nhạc vào public/music/romantic.mp3

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    audio.addEventListener("canplaythrough", () => {
      setReady(true);
      audio.play().then(() => setPlaying(true)).catch(() => {});
    });
    audio.addEventListener("error", () => setReady(false));
    // Nếu autoplay bị chặn: bật nhạc ngay khi user chạm/click lần đầu (vd. "Chạm để bắt đầu")
    const onFirstInteraction = () => {
      if (audioRef.current && !audioRef.current.paused) return;
      audio.play().then(() => setPlaying(true)).catch(() => {});
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
    };
    document.addEventListener("click", onFirstInteraction, { once: true });
    document.addEventListener("touchstart", onFirstInteraction, { once: true });
    return () => {
      audio.pause();
      audioRef.current = null;
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
    };
  }, []);

  const toggle = () => {
    if (!ready || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setReady(false));
    }
    setPlaying((p) => !p);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
        ready
          ? "bg-valentine-rose/90 text-white hover:bg-valentine-deep hover:scale-110"
          : "bg-stone-400/80 text-white cursor-help hover:bg-stone-500/80"
      }`}
      aria-label={ready ? (playing ? "Tắt nhạc" : "Bật nhạc") : "Chưa có nhạc"}
      title={
        ready
          ? playing
            ? "Tắt nhạc"
            : "Bật nhạc nền"
          : "Chưa có nhạc — Thêm file romantic.mp3 vào thư mục public/music/"
      }
    >
      {ready ? (
        playing ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        )
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      )}
    </button>
  );
}
