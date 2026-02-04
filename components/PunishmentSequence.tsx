'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PunishmentSequenceProps {
  isActive: boolean;
  onComplete: () => void;
}

interface FallingImage {
  id: number;
  x: number;
  image: 'cat' | 'dog';
  delay: number;
  scale: number;
}

export default function PunishmentSequence({ isActive, onComplete }: PunishmentSequenceProps) {
  const [showFlash, setShowFlash] = useState(false);
  const [showDarkOverlay, setShowDarkOverlay] = useState(false);
  const [showGiantAnimals, setShowGiantAnimals] = useState(false);
  const [fallingImages, setFallingImages] = useState<FallingImage[]>([]);
  const [showVignette, setShowVignette] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [windowHeight, setWindowHeight] = useState(1000);
  const [windowWidth, setWindowWidth] = useState(1000);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!isActive) {
      // Reset all states
      setShowFlash(false);
      setShowDarkOverlay(false);
      setShowGiantAnimals(false);
      setFallingImages([]);
      setShowVignette(false);
      setShowText(false);
      setShowSubtext(false);
      return;
    }

    // Phase 1: Initial Impact (0-500ms) - Blackout + Rapid Flashes
    setShowDarkOverlay(true);
    
    // Multiple rapid flashes
    const flashTimes = [0, 50, 100, 150, 200, 300, 400, 500, 600, 700];
    flashTimes.forEach((time) => {
      setTimeout(() => {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 30);
      }, time);
    });

    // Phase 2: Giant Animals Zoom In (500ms-2000ms)
    setTimeout(() => {
      setShowGiantAnimals(true);
    }, 500);

    // Phase 3: Image Rain Starts (1000ms)
    setTimeout(() => {
      const images: FallingImage[] = Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        image: Math.random() > 0.5 ? 'cat' : 'dog',
        delay: Math.random() * 1,
        scale: 0.8 + Math.random() * 0.6, // Random scale between 0.8 and 1.4
      }));
      setFallingImages(images);
    }, 1000);

    // Phase 4: Red Vignette & Pulsing (1500ms)
    setTimeout(() => {
      setShowVignette(true);
    }, 1500);

    // Phase 5: Threatening Text (2000ms)
    setTimeout(() => {
      setShowText(true);
    }, 2000);

    // Phase 6: Subtext (2500ms)
    setTimeout(() => {
      setShowSubtext(true);
    }, 2500);

    // Phase 7: Fade Back (4500ms)
    setTimeout(() => {
      setShowGiantAnimals(false);
      setShowVignette(false);
      setShowText(false);
      setShowSubtext(false);
      setFallingImages([]);
    }, 4500);

    // Phase 8: Complete (5000ms)
    setTimeout(() => {
      setShowDarkOverlay(false);
      onComplete();
    }, 5000);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Dark Overlay - Full blackout */}
      <AnimatePresence>
        {showDarkOverlay && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Screen Flash - Gunshot effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 bg-white z-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.03 }}
          />
        )}
      </AnimatePresence>

      {/* Red Vignette with Pulsing Effect */}
      <AnimatePresence>
        {showVignette && (
          <motion.div
            className="absolute inset-0 z-55"
            style={{
              background: 'radial-gradient(circle, transparent 20%, rgba(220, 38, 38, 0.6) 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.6, 0.8, 0.6],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: {
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
          />
        )}
      </AnimatePresence>

      {/* Giant Angry Animals Zooming In */}
      <AnimatePresence>
        {showGiantAnimals && (
          <>
            {/* Giant Cat - Left Side */}
            <motion.div
              className="fixed left-0 top-1/2 -translate-y-1/2 z-40"
              initial={{ x: -400, scale: 0.5, opacity: 0 }}
              animate={{ 
                x: windowWidth * 0.15,
                scale: [1, 1.2, 1],
                opacity: 1,
                rotate: [0, -5, 5, -5, 0],
              }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ 
                x: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 0.5 },
                rotate: { duration: 0.2, repeat: Infinity },
              }}
              style={{ width: '350px', height: '350px' }}
            >
              <Image
                src="/IMG_0536.jpg"
                alt="Angry cat"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Giant Dog - Right Side */}
            <motion.div
              className="fixed right-0 top-1/2 -translate-y-1/2 z-40 scale-x-[-1]"
              initial={{ x: 400, scale: 0.5, opacity: 0 }}
              animate={{ 
                x: -windowWidth * 0.15,
                scale: [1, 1.2, 1],
                opacity: 1,
                rotate: [0, 5, -5, 5, 0],
              }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ 
                x: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 0.5 },
                rotate: { duration: 0.2, repeat: Infinity },
              }}
              style={{ width: '350px', height: '350px' }}
            >
              <Image
                src="/IMG_0535.jpg"
                alt="Angry dog"
                fill
                className="object-contain"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Falling Images Rain */}
      {fallingImages.map((item) => (
        <motion.div
          key={item.id}
          className="absolute z-30"
          style={{
            left: `${item.x}%`,
            width: `${120 * item.scale}px`,
            height: `${120 * item.scale}px`,
          }}
          initial={{ y: -200, rotate: 0, opacity: 1, scale: item.scale }}
          animate={{
            y: windowHeight + 300,
            rotate: 360 + Math.random() * 720,
            opacity: [1, 1, 0.9, 0],
            scale: [item.scale, item.scale * 1.2, item.scale * 0.8],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: item.delay,
            ease: 'easeIn',
          }}
        >
          <Image
            src={item.image === 'cat' ? '/IMG_0536.jpg' : '/IMG_0535.jpg'}
            alt={item.image}
            width={120}
            height={120}
            className="object-contain w-full h-full"
            style={{
              transform: item.image === 'dog' ? 'scaleX(-1)' : 'none',
            }}
          />
        </motion.div>
      ))}

      {/* Dramatic "WRONG ANSWER" Text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-7xl md:text-9xl font-black text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]"
              animate={{
                scale: [1, 1.15, 1],
                x: [0, -10, 10, -10, 10, 0],
                y: [0, -5, 5, -5, 5, 0],
              }}
              transition={{
                scale: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 0.1, repeat: Infinity, ease: "linear" },
                y: { duration: 0.1, repeat: Infinity, ease: "linear" },
              }}
              style={{ textShadow: '0 0 30px rgba(220, 38, 38, 1), 0 0 60px rgba(220, 38, 38, 0.8)' }}
            >
              WRONG ANSWER
            </motion.h1>
            
            {showSubtext && (
              <motion.p
                className="text-3xl md:text-5xl font-bold text-red-500 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Think again...
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
