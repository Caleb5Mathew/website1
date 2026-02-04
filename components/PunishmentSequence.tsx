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
}

export default function PunishmentSequence({ isActive, onComplete }: PunishmentSequenceProps) {
  const [showFlash, setShowFlash] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const [fallingImages, setFallingImages] = useState<FallingImage[]>([]);
  const [showVignette, setShowVignette] = useState(false);
  const [showText, setShowText] = useState(false);
  const [windowHeight, setWindowHeight] = useState(1000);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!isActive) {
      // Reset all states
      setShowFlash(false);
      setShowShake(false);
      setFallingImages([]);
      setShowVignette(false);
      setShowText(false);
      return;
    }

    // Timeline of effects
    // 0ms - First flash
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 50);
    
    // 100ms - Screen shake begins
    setTimeout(() => {
      setShowShake(true);
    }, 100);

    // 200ms - Image rain starts
    setTimeout(() => {
      const images: FallingImage[] = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        image: Math.random() > 0.5 ? 'cat' : 'dog',
        delay: Math.random() * 0.5,
      }));
      setFallingImages(images);
    }, 200);

    // 500ms - More flashes
    setTimeout(() => {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 50);
    }, 500);

    setTimeout(() => {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 50);
    }, 600);

    setTimeout(() => {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 50);
    }, 700);

    // 1000ms - Red vignette appears
    setTimeout(() => {
      setShowVignette(true);
    }, 1000);

    // 2000ms - Text appears
    setTimeout(() => {
      setShowText(true);
    }, 2000);

    // 3000ms - Stop shake, fade out
    setTimeout(() => {
      setShowShake(false);
    }, 3000);

    // 3500ms - Complete
    setTimeout(() => {
      setShowVignette(false);
      setShowText(false);
      setFallingImages([]);
      onComplete();
    }, 3500);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Screen Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
          />
        )}
      </AnimatePresence>


      {/* Red Vignette */}
      <AnimatePresence>
        {showVignette && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, transparent 30%, rgba(220, 38, 38, 0.4) 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Falling Images */}
      {fallingImages.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            width: '120px',
            height: '120px',
          }}
          initial={{ y: -150, rotate: 0, opacity: 1 }}
          animate={{
            y: windowHeight + 200,
            rotate: 360 + Math.random() * 360,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 1,
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

      {/* Dramatic Text */}
      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-red-600 drop-shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Wrong answer...
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
