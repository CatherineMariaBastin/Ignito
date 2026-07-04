// src/components/MusicPlayer.jsx
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Try to autoplay on mount. Browsers often block audio with sound
  // until the user interacts with the page at least once.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // keep it subtle
    const tryPlay = () => audio.play().catch(() => {
      // Autoplay was blocked — wait for first user interaction
      const resume = () => {
        audio.play().catch(() => {});
        window.removeEventListener("click", resume);
        window.removeEventListener("keydown", resume);
      };
      window.addEventListener("click", resume, { once: true });
      window.addEventListener("keydown", resume, { once: true });
    });

    if (isPlaying) tryPlay();
  }, []); // run once on mount

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/theme.mp3`}
        loop
    />

      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-star-yellow hover:text-star-orange transition-colors shadow-lg"
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>
    </>
  );
}