'use client';

import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";

const FadeInSection = ({ children, delay = 0, direction = null, duration = 0.6, amount = 0.3, once = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  
  const variants = {
    hidden: { 
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className="w-full"
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(FadeInSection); 