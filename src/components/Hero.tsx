import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ChevronDown } from 'lucide-react';

interface HeroProps {
  onScrollToNext: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToNext }) => {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <section className="relative w-full h-screen min-h-[650px] flex flex-col items-center justify-center overflow-hidden bg-[#1C1815]">
      {/* Hero Background Video (driving.mp4) */}
      {!videoError ? (
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}driving.mp4`}
          playsInline
          autoPlay
          loop
          muted
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />
      ) : (
        /* Fallback Romantic Luxury Ambient Background */
        <div className="absolute inset-0 bg-gradient-to-br from-[#29221C] via-[#1F1814] to-[#120E0C]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C8A85D]/15 via-transparent to-transparent opacity-60" />
        </div>
      )}

      {/* Subtle Dark & Ivory Gradient Overlay for Superior Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-10" />

      {/* Decorative Border Frame */}
      <div className="absolute inset-6 md:inset-10 border border-[#C8A85D]/30 pointer-events-none z-20 rounded-lg hidden sm:block">
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C8A85D]" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C8A85D]" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C8A85D]" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C8A85D]" />
      </div>

      {/* Centered Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Monogram Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-[#C8A85D] to-transparent" />
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#E2C779]">
            Save The Date
          </span>
          <span className="w-12 h-px bg-gradient-to-r from-transparent via-[#C8A85D] to-transparent" />
        </motion.div>

        {/* Bride & Groom Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 my-4 text-white"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-wide text-[#FAF7F2] drop-shadow-md">
            Sophia
          </h1>
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-[#C8A85D] py-1"
          >
            <Heart className="w-7 h-7 sm:w-10 sm:h-10 fill-[#C8A85D] stroke-none" />
          </motion.div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-wide text-[#FAF7F2] drop-shadow-md">
            Alexander
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-script text-3xl sm:text-4xl md:text-5xl text-[#E2C779] mt-3 mb-10 font-normal drop-shadow"
        >
          A celebration of love
        </motion.p>

        {/* Scroll to Begin Button with gentle bounce */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button
            onClick={onScrollToNext}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#C8A85D]/60 text-[#FAF7F2] font-sans text-xs sm:text-sm uppercase tracking-[0.25em] hover:bg-[#C8A85D] hover:text-[#1C1815] transition-all duration-500 shadow-2xl animate-gentle-bounce cursor-pointer"
          >
            <span>Scroll to Begin</span>
            <ChevronDown className="w-4 h-4 text-[#C8A85D] group-hover:text-[#1C1815] transition-colors" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};