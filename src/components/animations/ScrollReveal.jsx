'use client';

import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

const ScrollReveal = ({ 
  children, 
  effect = 'fade', // fade, slide, zoom
  direction = 'up', // up, down, left, right
  duration = 0.5, // Reduced duration for better performance
  delay = 0,
  threshold = 0.3, 
  once = true,
  distance = 30, // Reduced distance for smoother animations
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Default styles
  let initial = { opacity: 0 };
  let animate = { opacity: 1 };
  
  // Effect-specific animations - simplified
  switch (effect) {
    case 'slide':
      if (direction === 'up') {
        initial = { ...initial, y: distance };
        animate = { ...animate, y: 0 };
      } else if (direction === 'down') {
        initial = { ...initial, y: -distance };
        animate = { ...animate, y: 0 };
      } else if (direction === 'left') {
        initial = { ...initial, x: distance };
        animate = { ...animate, x: 0 };
      } else if (direction === 'right') {
        initial = { ...initial, x: -distance };
        animate = { ...animate, x: 0 };
      }
      break;
      
    case 'zoom':
      initial = { ...initial, scale: direction === 'in' ? 0.95 : 1.05 };
      animate = { ...animate, scale: 1 };
      break;
      
    // Removed complex animations like flip and rotate to improve performance
  }
  
  // Simplified transition
  const transition = { 
    duration, 
    delay, 
    ease: [0.25, 0.1, 0.25, 1] 
  };
  
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={transition}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(ScrollReveal); 