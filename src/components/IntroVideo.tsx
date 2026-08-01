import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Timer fallback in case video event doesn't fire or video finishes in ~6-8 seconds
    const fallbackTimer = setTimeout(() => {
      if (!isFading) {
        handleFinish();
      }
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, [isFading]);

  const handleFinish = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 1200); // 1.2s smooth cinematic fade duration
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay restricted by browser policy:', err);
      });
    }
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1815] text-[#FAF7F2] overflow-hidden select-none"
        >
          {/* Main Intro Video */}
          {!hasError ? (
            <video
              ref={videoRef}
              src="/curtain.mp4"
              playsInline
              autoPlay
              muted
              onLoadedData={handleVideoLoaded}
              onEnded={handleFinish}
              onError={handleVideoError}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            />
          ) : null}

          {/* Animated Fallback Silk Curtain (Renders when video is missing or loading) */}
          {(hasError || !isVideoLoaded) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#241F1C] via-[#1A1614] to-[#120F0E]">
              {/* Elegant Silk Curtain Graphic / Decorative Framing */}
              <div className="absolute inset-0 flex">
                <motion.div
                  initial={{ x: '0%' }}
                  animate={isFading ? { x: '-100%' } : { x: '0%' }}
                  transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                  className="w-1/2 h-full bg-gradient-to-r from-[#2F2620] to-[#1F1814] border-r border-[#C8A85D]/20 shadow-2xl relative"
                >
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent" />
                  {/* Decorative Fold Lines */}
                  <div className="h-full w-full bg-[radial-gradient(#C8A85D_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
                </motion.div>
                <motion.div
                  initial={{ x: '0%' }}
                  animate={isFading ? { x: '100%' } : { x: '0%' }}
                  transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                  className="w-1/2 h-full bg-gradient-to-l from-[#2F2620] to-[#1F1814] border-l border-[#C8A85D]/20 shadow-2xl relative"
                >
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 to-transparent" />
                  <div className="h-full w-full bg-[radial-gradient(#C8A85D_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
                </motion.div>
              </div>

              {/* Central Monogram Card */}
              <div className="relative z-10 text-center px-6 max-w-md">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="inline-block p-8 rounded-full border border-[#C8A85D]/40 bg-black/40 backdrop-blur-md mb-6 gold-glow"
                >
                  <span className="font-script text-5xl md:text-6xl text-[#E2C779]">S & A</span>
                </motion.div>
                
                <h1 className="font-serif text-2xl md:text-3xl tracking-widest uppercase text-[#FAF7F2] mb-3">
                  Sophia & Alexander
                </h1>
                
                <p className="font-sans text-xs md:text-sm tracking-widest text-[#C8A85D] uppercase mb-8">
                  The Grand Reveal
                </p>

                <button
                  onClick={handleFinish}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#C8A85D] text-[#FAF7F2] font-sans text-xs uppercase tracking-widest hover:bg-[#C8A85D] hover:text-[#1C1815] transition-all duration-500 shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C8A85D] group-hover:text-[#1C1815] transition-colors" />
                  <span>Open Invitation</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Skip / Enter Button Overlay */}
          <div className="absolute bottom-8 right-8 z-20">
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/50 border border-[#C8A85D]/30 backdrop-blur-md text-[#FAF7F2] font-sans text-xs tracking-widest uppercase hover:bg-[#C8A85D] hover:text-[#1C1815] transition-all duration-300 cursor-pointer shadow-lg"
            >
              <span>Skip Intro</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
