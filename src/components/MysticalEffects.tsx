import { motion } from 'framer-motion';
import { useCallback } from 'react';

const mysticalSymbols = [
  '☥', '⛧', '⛤', '⚝', '☫', '⚯', '☤', '⚕', '☽', '☾', 
  'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ',
  'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ'
];

const glowColors = [
  'text-purple-500',
  'text-indigo-500',
  'text-violet-500',
  'text-fuchsia-500'
];

interface MysticalParticleProps {
  delay?: number;
}

export const MysticalParticle = ({ delay = 0 }: MysticalParticleProps) => {
  const getRandomInRange = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  const randomSymbol = mysticalSymbols[Math.floor(Math.random() * mysticalSymbols.length)];
  const glowColor = glowColors[Math.floor(Math.random() * glowColors.length)];
  
  const startX = getRandomInRange(0, window.innerWidth);
  const startY = -50;
  const directionX = getRandomInRange(-100, 100);
  const speed = getRandomInRange(15, 25);
  const endY = window.innerHeight + 50;
  const rotate = getRandomInRange(-180, 180);
  const size = getRandomInRange(0.8, 1.2);
  
  return (
    <motion.div
      initial={{ 
        x: startX,
        y: startY,
        scale: 0,
        opacity: 0,
        rotate: 0
      }}
      animate={{ 
        x: startX + directionX,
        y: endY,
        scale: [0, size, size, 0],
        opacity: [0, 0.7, 0.7, 0],
        rotate: rotate
      }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        position: 'fixed',
        pointerEvents: 'none'
      }}
      className={`text-2xl ${glowColor} flex items-center justify-center`}
    >
      <motion.span
        animate={{
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="filter drop-shadow-[0_0_8px_currentColor]"
      >
        {randomSymbol}
      </motion.span>
    </motion.div>
  );
};

export const MysticalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent opacity-30" />
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <MysticalParticle key={i} delay={i * 0.3} />
        ))}
      </div>
    </div>
  );
};

export const RitualMark = () => (
  <motion.div
    className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg z-0"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);