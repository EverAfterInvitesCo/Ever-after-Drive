import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IntroVideo } from './components/IntroVideo';
import { Hero } from './components/Hero';
import { ScratchDate } from './components/ScratchDate';
import { Venue } from './components/Venue';
import { PolaroidGallery } from './components/PolaroidGallery';
import { RSVP } from './components/RSVP';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  const scrollToScratchDate = () => {
    const section = document.getElementById('scratch-date');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const replayIntro = () => {
    setIntroFinished(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2C2C] font-sans relative selection:bg-[#C8A85D] selection:text-white">
      {/* Intro Curtain Video Overlay */}
      <AnimatePresence>
        {!introFinished && (
          <IntroVideo 
            onComplete={() => setIntroFinished(true)} 
            videoSrc={`${import.meta.env.BASE_URL}curtain.mp4`}
          />
        )}
      </AnimatePresence>

      {/* Main Single-Page Scroll Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: introFinished ? 1 : 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative"
      >
        {/* Floating Audio Player */}
        <AudioPlayer autoPlayTriggered={introFinished} />

        {/* Replay Intro Floating Button */}
        {introFinished && (
          <div className="fixed top-6 right-6 z-40">
            <button
              onClick={replayIntro}
              title="Replay Curtain Intro"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#C8A85D]/40 text-[#2C2C2C] text-xs font-sans uppercase tracking-widest hover:bg-[#C8A85D] hover:text-white transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C8A85D] group-hover:text-white" />
              <span className="hidden sm:inline">Intro</span>
            </button>
          </div>
        )}

        {/* 1. Hero Section */}
        <Hero onScrollToNext={scrollToScratchDate} />

        {/* 2. Interactive Scratch Date Section */}
        <ScratchDate />

        {/* 3. Venue Details & Location */}
        <Venue />

        {/* 4. Polaroid Memory Gallery */}
        <PolaroidGallery />

        {/* 5. RSVP Response Form */}
        <RSVP />

        {/* 6. Footer & Social Links */}
        <Footer />
      </motion.main>
    </div>
  );
}
