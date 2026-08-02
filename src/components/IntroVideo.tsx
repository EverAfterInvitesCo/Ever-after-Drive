import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroVideoProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete, videoSrc = `${import.meta.env.BASE_URL}curtain.mp4` }) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Fallback timer if video takes too long to load or reach end event
    const fallbackTimer = setTimeout(() => {
      if (!isFading) {
        handleFinish();
      }
    }, 12000);

    return () => clearTimeout(fallbackTimer);
  }, [isFading]);

  const handleFinish = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const handleCanPlay = () => {
    setIsVideoReady(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay restricted by browser policy:', err);
        // If autoplay fails, skip straight to the main invitation so the user isn't stuck on a paused video frame
        handleFinish();
      });
    }
  };

  const handleError = () => {
    // If video fails to load entirely, bypass immediately
    handleFinish();
  };

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none"
        >
          {/* Main Intro Video - Hidden completely until ready to play, removing any flash of blank background or fallback graphics */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            autoPlay
            muted
            onCanPlayThrough={handleCanPlay}
            onEnded={handleFinish}
            onError={handleError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};