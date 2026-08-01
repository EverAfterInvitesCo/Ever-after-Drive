import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

interface DateCircleProps {
  title: string;
  value: string;
  subtext: string;
  index: number;
  onReveal?: () => void;
}

// Robust helper to safely invoke canvas-confetti in Vite/React ESM environments
const fireConfetti = (options?: confetti.Options) => {
  try {
    const fn = (confetti as any)?.default || confetti;
    if (typeof fn === 'function') {
      fn(options);
    }
  } catch (err) {
    console.warn('Confetti trigger error:', err);
  }
};

const SingleScratchCircle: React.FC<DateCircleProps> = ({ title, value, subtext, index, onReveal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  // Initialize Canvas with Gold Foil Texture
  const drawGoldFoil = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    // Create Metallic Gold Radial & Linear Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#BF953F');
    gradient.addColorStop(0.25, '#FCF6BA');
    gradient.addColorStop(0.5, '#B38728');
    gradient.addColorStop(0.75, '#FBF5B7');
    gradient.addColorStop(1, '#AA771C');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle metallic sparkle texture dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 300; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Gold Foil Circular Border Frame
    ctx.strokeStyle = '#8A6218';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - 4, 0, Math.PI * 2);
    ctx.stroke();

    // Center "Scratch Me" overlay text
    ctx.save();
    ctx.font = '700 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#4A340C';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH HERE', width / 2, height / 2);
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = 180;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawGoldFoil(ctx, size, size);
    }
  }, [drawGoldFoil]);

  // Calculate Scratched Percentage
  const calculatePercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearedPixels = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) { // pixel is cleared or semi-transparent
          clearedPixels++;
        }
      }

      // Calculate percentage relative to canvas area
      const percent = Math.min(100, Math.round((clearedPixels / totalPixels) * 100 * 1.2));
      setScratchPercent(percent);

      if (percent >= 35 && !isRevealed) {
        setIsRevealed(true);
        if (onReveal) onReveal();
        
        // Trigger celebratory gold confetti sparkle for this circle
        fireConfetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#C8A85D', '#E2C779', '#FAF7F2', '#B38728', '#D4AF37'],
        });
      }
    } catch (err) {
      console.warn('Scratch percent check error:', err);
    }
  }, [isRevealed, onReveal]);

  // Handle Scratch Action on Canvas
  const scratchAt = useCallback((x: number, y: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2); // Scratch stroke radius
    ctx.fill();

    calculatePercent();
  }, [isRevealed, calculatePercent]);

  // Setup Global Window Pointer & Touch Listeners for Smooth Scratching
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    let scratching = false;

    const getCoordinates = (e: MouseEvent | TouchEvent | PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const x = ((clientX - rect.left) / rect.width) * canvas.width;
      const y = ((clientY - rect.top) / rect.height) * canvas.height;
      return { x, y };
    };

    const handleStart = (e: Event) => {
      scratching = true;
      const { x, y } = getCoordinates(e as any);
      scratchAt(x, y);
    };

    const handleMove = (e: Event) => {
      if (!scratching) return;
      if (e.cancelable) e.preventDefault();
      const { x, y } = getCoordinates(e as any);
      scratchAt(x, y);
    };

    const handleEnd = () => {
      scratching = false;
    };

    canvas.addEventListener('pointerdown', handleStart);
    window.addEventListener('pointermove', handleMove, { passive: false });
    window.addEventListener('pointerup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('pointerdown', handleStart);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleEnd);

      canvas.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [scratchAt, isRevealed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="flex flex-col items-center select-none"
    >
      <div className="font-sans text-xs uppercase tracking-[0.2em] text-[#C8A85D] mb-3 font-semibold">
        {title}
      </div>

      {/* Circle Container */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full shadow-xl overflow-hidden border-2 border-[#C8A85D]/40 bg-gradient-to-br from-[#FAF7F2] via-white to-[#F5EFE6] flex flex-col items-center justify-center text-center p-4 group">
        {/* Hidden Revealed Layer Underneath */}
        <div className="flex flex-col items-center justify-center z-0 w-full h-full select-none px-2">
          <span className={`font-serif font-bold text-[#2C2C2C] tracking-tight text-center leading-none ${
            value.length > 5 ? 'text-2xl sm:text-3xl' : 'text-4xl sm:text-5xl'
          }`}>
            {value}
          </span>
          <span className="font-sans text-xs sm:text-sm text-[#C8A85D] uppercase tracking-widest mt-1 font-medium">
            {subtext}
          </span>
          {isRevealed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-1.5 text-[#C8A85D]"
            >
              <CheckCircle2 className="w-5 h-5" />
            </motion.div>
          )}
        </div>

        {/* Scratchable Canvas Layer */}
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            animate={isRevealed ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full cursor-pointer z-10 touch-none rounded-full"
          />
        )}
      </div>

      {/* Status Indicator */}
      <div className="mt-3 min-h-[20px] flex items-center gap-2">
        {isRevealed && (
          <span className="font-sans text-[11px] text-[#C8A85D] font-medium tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Revealed
          </span>
        )}
      </div>
    </motion.div>
  );
};

export const ScratchDate: React.FC = () => {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleCircleReveal = useCallback(() => {
    setRevealedCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount === 3) {
        // Trigger Grand Celebration Confetti Burst
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;

        const frame = () => {
          fireConfetti({
            particleCount: 5,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.65 },
            colors: ['#C8A85D', '#E2C779', '#FAF7F2', '#B38728'],
          });
          fireConfetti({
            particleCount: 5,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.65 },
            colors: ['#C8A85D', '#E2C779', '#FAF7F2', '#B38728'],
          });

          if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      }
      return nextCount;
    });
  }, []);

  return (
    <section id="scratch-date" className="py-24 px-6 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Gold Accent Flourish */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C8A85D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C8A85D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-flex items-center gap-2 text-[#C8A85D]"
        >
          <Calendar className="w-5 h-5" />
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            Interactive Reveal
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2C2C2C] tracking-wide mb-4"
        >
          Our Wedding Date
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-sm sm:text-base text-[#2C2C2C]/70 max-w-lg mx-auto mb-16"
        >
          Scratch off the golden foil circles below using your mouse or finger to unveil when we say "I do".
        </motion.p>

        {/* Three Scratch Circles (Stacked vertically on mobile, row on tablet/desktop) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16">
          <SingleScratchCircle
            title="Day"
            value="24"
            subtext="Friday"
            index={0}
            onReveal={handleCircleReveal}
          />
          <SingleScratchCircle
            title="Month"
            value="September"
            subtext="Autumn"
            index={1}
            onReveal={handleCircleReveal}
          />
          <SingleScratchCircle
            title="Year"
            value="2027"
            subtext="Save The Year"
            index={2}
            onReveal={handleCircleReveal}
          />
        </div>

        {revealedCount === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 inline-block px-6 py-3 rounded-full bg-[#C8A85D]/15 border border-[#C8A85D]/40 text-[#8A6218] font-serif text-lg font-medium"
          >
            ✨ Save the date: September 24, 2027 ✨
          </motion.div>
        )}
      </div>
    </section>
  );
};
