import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_everafterinvites_/?hl=en',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61591686334310',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@_everafterinvites_',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.57-1.3 2.58.01.8.37 1.57.97 2.07.72.61 1.72.82 2.62.61.98-.21 1.81-.93 2.14-1.88.19-.57.24-1.18.22-1.78.03-4.98.01-9.96.01-14.94z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="py-16 px-6 bg-[#FAF7F2] border-t border-[#C8A85D]/20 text-[#2C2C2C] relative">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Monogram / Brand Icon */}
        <div className="font-script text-4xl text-[#C8A85D] mb-4">
          EverAfter
        </div>

        {/* Centered Credit Text */}
        <p className="font-sans text-xs sm:text-sm text-[#2C2C2C]/80 tracking-widest uppercase flex items-center justify-center gap-1.5 mb-6">
          <span>Made with</span>
          <Heart className="w-4 h-4 fill-red-500 text-red-500 animate-pulse" />
          <span>by</span>
          <span className="font-semibold text-[#2C2C2C]">EverAfterInvites</span>
        </p>

        {/* Social Icons with subtle hover animation */}
        <div className="flex items-center justify-center gap-5">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white border border-[#C8A85D]/30 text-[#2C2C2C] hover:text-[#C8A85D] hover:border-[#C8A85D] transition-colors shadow-sm"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright notice */}
        <div className="mt-8 text-[11px] font-sans text-[#2C2C2C]/40 tracking-wider">
          © {new Date().getFullYear()} Sophia & Alexander. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
