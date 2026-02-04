'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface RunawayButtonProps {
  onNoClick?: () => void;
}

export default function RunawayButton({ onNoClick }: RunawayButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorIdle, setCursorIdle] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cursorIdleTimeoutRef = useRef<NodeJS.Timeout>();
  const lastCursorPosRef = useRef({ x: 0, y: 0 });
  const driftDirectionRef = useRef({ x: Math.random() - 0.5, y: Math.random() - 0.5 });
  const animationFrameRef = useRef<number>();

  // Initialize button position next to Yes button (to the right of center)
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      // Position No button to the right of center, near where Yes button is
      // Yes button is centered, so No should be offset to the right
      const centerX = window.innerWidth / 2 + 120; // Offset to the right of Yes button
      const centerY = window.innerHeight / 2 + 80; // Slightly below center (below Yes button)
      setPosition({ x: centerX, y: centerY });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Track cursor/touch position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Check if cursor moved
      const moved = Math.abs(e.clientX - lastCursorPosRef.current.x) > 2 || 
                    Math.abs(e.clientY - lastCursorPosRef.current.y) > 2;
      
      if (moved) {
        setCursorIdle(false);
        if (cursorIdleTimeoutRef.current) {
          clearTimeout(cursorIdleTimeoutRef.current);
        }
        cursorIdleTimeoutRef.current = setTimeout(() => {
          setCursorIdle(true);
          // Change drift direction when idle starts
          driftDirectionRef.current = { 
            x: (Math.random() - 0.5) * 0.5, 
            y: (Math.random() - 0.5) * 0.5 
          };
        }, 1000);
      }
      
      lastCursorPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setCursorPos({ x: touch.clientX, y: touch.clientY });
        setCursorIdle(false);
        
        if (cursorIdleTimeoutRef.current) {
          clearTimeout(cursorIdleTimeoutRef.current);
        }
        cursorIdleTimeoutRef.current = setTimeout(() => {
          setCursorIdle(true);
          driftDirectionRef.current = { 
            x: (Math.random() - 0.5) * 0.5, 
            y: (Math.random() - 0.5) * 0.5 
          };
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (cursorIdleTimeoutRef.current) {
        clearTimeout(cursorIdleTimeoutRef.current);
      }
    };
  }, []);

  // Calculate distance between two points
  const distance = useCallback((x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!isInitialized || !buttonRef.current) return;

    const updatePosition = () => {
      setPosition((prevPos) => {
        const buttonRect = buttonRef.current?.getBoundingClientRect();
        if (!buttonRect) return prevPos;

        const buttonCenterX = prevPos.x + buttonRect.width / 2;
        const buttonCenterY = prevPos.y + buttonRect.height / 2;
        const dist = distance(cursorPos.x, cursorPos.y, buttonCenterX, buttonCenterY);

        let newX = prevPos.x;
        let newY = prevPos.y;
        const padding = 50;
        const maxX = window.innerWidth - buttonRect.width - padding;
        const maxY = window.innerHeight - buttonRect.height - padding;
        const minX = padding;
        const minY = padding;

        if (cursorIdle) {
          // Gentle drift when cursor is idle
          const driftSpeed = 0.3;
          newX = prevPos.x + driftDirectionRef.current.x * driftSpeed;
          newY = prevPos.y + driftDirectionRef.current.y * driftSpeed;

          // Bounce off edges
          if (newX <= minX || newX >= maxX) {
            driftDirectionRef.current.x *= -1;
            newX = Math.max(minX, Math.min(maxX, newX));
          }
          if (newY <= minY || newY >= maxY) {
            driftDirectionRef.current.y *= -1;
            newY = Math.max(minY, Math.min(maxY, newY));
          }
        } else if (dist < 150) {
          // Flee from cursor
          const escapeAngle = Math.atan2(
            buttonCenterY - cursorPos.y,
            buttonCenterX - cursorPos.x
          );

          // Speed increases as cursor gets closer
          let speed = 2;
          if (dist < 80) {
            speed = 8 + (80 - dist) / 10; // Very fast when very close
            // Add some randomness for erratic movement
            const randomAngle = escapeAngle + (Math.random() - 0.5) * 0.5;
            newX = prevPos.x + Math.cos(randomAngle) * speed;
            newY = prevPos.y + Math.sin(randomAngle) * speed;
          } else {
            speed = 2 + (150 - dist) / 20; // Gradual speed increase
            // 30% chance of curved escape
            const curveFactor = Math.random() < 0.3 ? 0.3 : 0;
            const curvedAngle = escapeAngle + curveFactor * (Math.random() - 0.5);
            newX = prevPos.x + Math.cos(curvedAngle) * speed;
            newY = prevPos.y + Math.sin(curvedAngle) * speed;
          }

          // Keep within bounds
          newX = Math.max(minX, Math.min(maxX, newX));
          newY = Math.max(minY, Math.min(maxY, newY));
        }

        return { x: newX, y: newY };
      });

      animationFrameRef.current = requestAnimationFrame(updatePosition);
    };

    animationFrameRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPos, cursorIdle, isInitialized, distance]);

  // Must be defined before early return to follow React hooks rules
  const handleNoButtonClick = useCallback(() => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    
    // Trigger punishment immediately when No is clicked
    if (onNoClick) {
      onNoClick();
    }
    
    // Make it harder to click by moving it away
    if (typeof window !== 'undefined') {
      setPosition({
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 100),
      });
    }
  }, [noClickCount, onNoClick]);

  if (!isInitialized) {
    return null;
  }

  return (
    <motion.div
      ref={buttonRef}
      className="fixed z-10 cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ 
        x: position.x, 
        y: position.y,
        opacity: 1 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
      style={{ 
        left: 0, 
        top: 0 
      }}
      // Add click handler to the entire container for better hit detection
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleNoButtonClick();
      }}
      onPointerDown={(e) => {
        // Use pointer down for immediate response
        e.preventDefault();
        e.stopPropagation();
        handleNoButtonClick();
      }}
    >
      {/* Invisible larger hit area */}
      <div className="absolute -inset-4 bg-transparent" />
      <button
        className="px-8 py-4 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-700 rounded-full font-medium text-lg transition-colors duration-200 shadow-lg select-none pointer-events-none"
      >
        No
      </button>
    </motion.div>
  );
}
