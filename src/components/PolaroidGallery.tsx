import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ZoomIn, Heart } from 'lucide-react';

import fallbackPhoto1 from '../assets/images/wedding_couple_1_1785625252073.jpg';
import fallbackPhoto2 from '../assets/images/wedding_couple_2_1785625264545.jpg';
import fallbackPhoto3 from '../assets/images/wedding_couple_3_1785625276688.jpg';
import fallbackPhoto4 from '../assets/images/wedding_couple_4_1785625292716.jpg';

interface PolaroidItem {
  id: number;
  src: string;
  fallbackSrc: string;
  title: string;
  date: string;
  rotation: string;
}

const polaroidData: PolaroidItem[] = [
  {
    id: 1,
    src: `${import.meta.env.BASE_URL}img1.jpg`,
    fallbackSrc: fallbackPhoto1,
    title: 'Sunset Whispers on the Coast',
    date: 'Big Sur, June 2025',
    rotation: '-rotate-3',
  },
  {
    id: 2,
    src: `${import.meta.env.BASE_URL}img2.jpg`,
    fallbackSrc: fallbackPhoto2,
    title: 'Vintage Getaway Ride',
    date: 'Tuscany, August 2025',
    rotation: 'rotate-4',
  },
  {
    id: 3,
    src: `${import.meta.env.BASE_URL}img3.jpg`,
    fallbackSrc: fallbackPhoto3,
    title: 'Dancing Under Fairy Lights',
    date: 'Napa Valley, October 2025',
    rotation: '-rotate-2',
  },
  {
    id: 4,
    src: `${import.meta.env.BASE_URL}img4.jpg`,
    fallbackSrc: fallbackPhoto4,
    title: 'The Proposal Moment',
    date: 'Amalfi, December 2025',
    rotation: 'rotate-3',
  },
];

export const PolaroidGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<PolaroidItem | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-24 px-6 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-3 inline-flex items-center gap-2 text-[#C8A85D]"
        >
          <Camera className="w-4 h-4" />
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            Photo Journal
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C2C2C] tracking-wide mb-4"
        >
          Our Memories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-sm sm:text-base text-[#2C2C2C]/70 max-w-md mx-auto mb-16"
        >
          A glimpse into our journey, quiet moments, and shared adventures together.
        </motion.p>

        {/* Scattered Polaroid Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 items-center justify-center pt-6"
        >
          {polaroidData.map((photo) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              whileHover={{
                y: -14,
                scale: 1.05,
                rotate: 0,
                zIndex: 30,
                transition: { duration: 0.35, ease: 'easeOut' },
              }}
              onClick={() => setActivePhoto(photo)}
              className={`relative bg-white p-4 pb-6 rounded-sm shadow-xl polaroid-shadow border border-[#2C2C2C]/10 transition-shadow duration-300 cursor-pointer ${photo.rotation} hover:shadow-2xl group`}
            >
              {/* Top Washi Tape Decor */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#E2C779]/40 backdrop-blur-sm border-t border-b border-white/50 rotate-1 z-10 pointer-events-none shadow-sm" />

              {/* Photo Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 rounded-xs mb-4">
                <img
                  src={photo.src}
                  alt={photo.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = photo.fallbackSrc;
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Hover Glare Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Click Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300">
                  <span className="p-3 rounded-full bg-white/90 text-[#2C2C2C] shadow-lg transform group-hover:scale-110 transition-transform">
                    <ZoomIn className="w-5 h-5 text-[#C8A85D]" />
                  </span>
                </div>
              </div>

              {/* Polaroid Handwritten Style Caption */}
              <div className="text-center">
                <p className="font-script text-2xl text-[#2C2C2C] tracking-wide leading-tight">
                  {photo.title}
                </p>
                <p className="font-sans text-[11px] uppercase tracking-widest text-[#C8A85D] mt-1">
                  {photo.date}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white p-5 sm:p-6 pb-8 rounded-sm max-w-lg w-full polaroid-shadow shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-stone-100 text-[#2C2C2C] hover:bg-[#C8A85D] hover:text-white transition-colors cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xs mb-4 bg-stone-100">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = activePhoto.fallbackSrc;
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center pt-2">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Heart className="w-4 h-4 fill-[#C8A85D] text-[#C8A85D]" />
                  <p className="font-script text-3xl text-[#2C2C2C]">
                    {activePhoto.title}
                  </p>
                </div>
                <p className="font-sans text-xs uppercase tracking-widest text-[#C8A85D]">
                  {activePhoto.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};