import { motion } from 'framer-motion';

export const Sparkle: React.FC = () => (
  <motion.div
    initial={{ scale: 0, opacity: 1 }}
    animate={{ scale: 1.6, opacity: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      top: '-4px',
      left: '-4px',
      width: '66px',
      height: '66px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 200, 0, 0.6)',
      pointerEvents: 'none',
    }}
  />
);

// This component creates a sparkle effect using Framer Motion for animations.
