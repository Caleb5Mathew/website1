'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import RunawayButton from '@/components/RunawayButton';
import FloatingHearts from '@/components/FloatingHearts';
import PunishmentSequence from '@/components/PunishmentSequence';

export default function Home() {
  const router = useRouter();
  const [showPunishment, setShowPunishment] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleYesClick = () => {
    router.push('/yes');
  };

  const handleNoClick = () => {
    setShowPunishment(true);
    setIsShaking(true);
    // Stop shaking after 3 seconds
    setTimeout(() => setIsShaking(false), 3000);
  };

  const handlePunishmentComplete = () => {
    setShowPunishment(false);
    setIsShaking(false);
  };

  return (
    <motion.main 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      animate={isShaking ? {
        x: [0, -10, 10, -10, 10, -8, 8, -8, 8, 0],
        y: [0, 5, -5, 5, -5, 3, -3, 3, -3, 0],
      } : { x: 0, y: 0 }}
      transition={isShaking ? {
        duration: 0.5,
        repeat: Infinity,
        ease: "linear",
      } : { duration: 0.3 }}
    >
      <FloatingHearts />
      
      {/* Cat Guard - Left Side */}
      <motion.div
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-5 hidden md:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-40 h-40 md:w-48 md:h-48"
        >
          <Image
            src="/IMG_0536.jpg"
            alt="Cat guard"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Dog Guard - Right Side (flipped) */}
      <motion.div
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-5 hidden md:block scale-x-[-1]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="relative w-40 h-40 md:w-48 md:h-48"
        >
          <Image
            src="/IMG_0535.jpg"
            alt="Dog guard"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
      
      <div className="text-center z-10 px-4 flex flex-col items-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-light text-romantic-deep mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hey Melody
        </motion.h1>
        
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-romantic-deep mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Will you be my Valentine?
        </motion.h2>

        {/* Yes Button - Static position below question */}
        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/yes">
            <motion.button
              className="px-12 py-6 bg-gradient-to-r from-romantic-rose to-romantic-blush text-white rounded-full font-semibold text-xl shadow-xl hover:shadow-2xl active:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYesClick}
            >
              Yes ♥
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <RunawayButton onNoClick={handleNoClick} />
      
      <PunishmentSequence isActive={showPunishment} onComplete={handlePunishmentComplete} />
    </motion.main>
  );
}
