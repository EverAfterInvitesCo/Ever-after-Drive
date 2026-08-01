import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTriggered?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTriggered = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Attempt auto-play when intro finishes or component mounts
  useEffect(() => {
    if (autoPlayTriggered && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Autoplay prevented by browser policy, user interaction required:', err);
        setIsPlaying(false);
      });
    }
  }, [autoPlayTriggered]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Audio play error:', err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src="/fostanekelabyad.mp3"
        loop
        preload="auto"
      />

      {/* Floating Sound Toggle Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-md transition-all shadow-lg cursor-pointer ${
          isPlaying
            ? 'bg-[#C8A85D] border-[#C8A85D] text-white shadow-[#C8A85D]/30'
            : 'bg-white/90 border-[#C8A85D]/40 text-[#2C2C2C] hover:border-[#C8A85D]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#C8A85D]" />
          )}
        </div>

        <span className="font-sans text-xs uppercase tracking-wider font-medium">
          {isPlaying ? (
            <span className="flex items-center gap-1.5">
              <span>Music On</span>
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
                <span className="w-0.5 bg-white rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#2C2C2C]/80">
              <Music className="w-3.5 h-3.5 text-[#C8A85D]" />
              <span>Play Music</span>
            </span>
          )}
        </span>
      </motion.button>
    </div>
  );
};
