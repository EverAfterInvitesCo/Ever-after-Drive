import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ExternalLink, Clock, Sparkles } from 'lucide-react';

export const Venue: React.FC = () => {
  const venueName = "Villa Rosa Estate & Gardens";
  const venueAddress = "1200 St. Helena Highway, St. Helena, Napa Valley, CA 94574";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venueName} ${venueAddress}`
  )}`;

  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8A85D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-3 inline-flex items-center gap-2 text-[#C8A85D]"
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            Destination & Location
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C2C2C] tracking-wide mb-6"
        >
          The Venue
        </motion.h2>

        {/* Venue Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 sm:p-12 shadow-xl border border-[#C8A85D]/30 relative overflow-hidden"
        >
          {/* Top Decorative Icon */}
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#C8A85D]/40 flex items-center justify-center mx-auto mb-6 text-[#C8A85D] shadow-inner">
            <MapPin className="w-8 h-8 stroke-[1.5]" />
          </div>

          {/* Venue Details */}
          <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] mb-3">
            {venueName}
          </h3>

          <p className="font-sans text-sm sm:text-base text-[#2C2C2C]/70 max-w-lg mx-auto mb-6 leading-relaxed">
            {venueAddress}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#2C2C2C]/80 mb-8 font-sans">
            <div className="flex items-center gap-2 bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#C8A85D]/20">
              <Clock className="w-4 h-4 text-[#C8A85D]" />
              <span>Ceremony Begins: 4:00 PM</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF7F2] px-4 py-2 rounded-full border border-[#C8A85D]/20">
              <Sparkles className="w-4 h-4 text-[#C8A85D]" />
              <span>Reception & Dancing: 6:00 PM</span>
            </div>
          </div>

          {/* Styled Google Maps Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#2C2C2C] text-[#FAF7F2] font-sans text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-[#C8A85D] hover:text-[#1C1815] transition-all duration-500 shadow-lg group cursor-pointer"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-4 h-4 text-[#C8A85D] group-hover:text-[#1C1815] transition-colors" />
          </a>

          {/* Subtle Map Visual Preview */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-[#C8A85D]/20 shadow-md h-64 sm:h-80 relative group">
            <iframe
              title="Venue Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.2) contrast(1.05)' }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${venueName} ${venueAddress}`
              )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />
            <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
