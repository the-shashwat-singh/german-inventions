'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    return () => setIsVisible(false);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`page-${isVisible}`}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition; 