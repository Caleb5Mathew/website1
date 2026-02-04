'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from '@/components/Confetti';
import Link from 'next/link';

export default function YesPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Keep confetti for 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-romantic-cream to-romantic-blush">
      {showConfetti && <Confetti />}
      
      <div className="text-center z-10 px-4 max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <span className="text-8xl md:text-9xl">♥</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-romantic-deep mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          I knew you'd say yes!
        </motion.h1>

        <motion.p
          className="text-2xl md:text-3xl font-light text-romantic-deep mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          You've made me the happiest person in the world!
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="text-romantic-rose"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ♥
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12"
        >
          <Link href="/">
            <button className="px-8 py-4 bg-romantic-rose text-white rounded-full font-medium text-lg hover:bg-romantic-deep transition-colors duration-300 shadow-lg">
              Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
