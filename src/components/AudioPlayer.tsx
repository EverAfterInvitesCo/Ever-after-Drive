import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  autoPlay?: boolean;
  audioSrc?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  autoPlay = true, 
  audioSrc = `${import.meta.env.BASE_URL}fostanekelabyad.mp3` 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;
    audio.loop = true;

    if (autoPlay) {
      const attemptPlay = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn('Auto-play blocked by browser policy. Waiting for user interaction.', err);
          setIsPlaying(false);
        }
      };
      attemptPlay();
    }

    const handleUserInteraction = () => {
      if (!isPlaying && audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => console.warn('Playback resume failed:', e));
      }
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [autoPlay, isPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.warn('Manual playback failed:', e));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#1C1815]/90 backdrop-blur-md border border-[#C8A85D]/40 text-[#FAF7F2] shadow-xl hover:border-[#C8A85D] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#C8A85D] animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-[#FAF7F2]/60" />
          )}

          <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-[#1C1815]/90 border border-[#C8A85D]/30 text-[10px] font-sans uppercase tracking-widest text-[#FAF7F2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
            {isPlaying ? "Music Playing" : "Play Music"}
          </span>
        </button>
      </div>
    </>
  );
};