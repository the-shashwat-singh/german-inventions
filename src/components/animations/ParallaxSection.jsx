'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({ 
  children, 
  bgImage = null,
  bgColor = null,
  speed = 0.5, 
  direction = 'vertical', // vertical or horizontal
  className = '',
  contentClassName = '',
  overlay = false,
  overlayColor = 'rgba(0,0,0,0.3)',
  zoomOnScroll = false,
  zoomFactor = 1.1,
  applyToChildren = false, // apply parallax to children with staggered speeds
  childrenSpeed = [0.2, 0.3, 0.4, 0.5], // speeds for children if applyToChildren is true
  perspective = false,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Calculate transforms based on direction and speed
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'vertical' ? [100 * speed, -100 * speed] : [0, 0]
  );
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'horizontal' ? [100 * speed, -100 * speed] : [0, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    zoomOnScroll ? [1, zoomFactor, 1] : [1, 1, 1]
  );
  
  // If we're applying parallax to children
  if (applyToChildren && React.Children.count(children) > 0) {
    const staggeredChildren = React.Children.map(children, (child, index) => {
      // Use modulo to cycle through the speeds if there are more children than speeds
      const childSpeed = childrenSpeed[index % childrenSpeed.length];
      
      const childY = useTransform(
        scrollYProgress, 
        [0, 1], 
        direction === 'vertical' ? [100 * childSpeed, -100 * childSpeed] : [0, 0]
      );
      
      const childX = useTransform(
        scrollYProgress, 
        [0, 1], 
        direction === 'horizontal' ? [100 * childSpeed, -100 * childSpeed] : [0, 0]
      );
      
      const childRotate = useTransform(
        scrollYProgress,
        [0, 1],
        perspective ? [0, index % 2 === 0 ? 5 : -5] : [0, 0]
      );
      
      return (
        <motion.div
          style={{ 
            y: childY, 
            x: childX, 
            rotate: childRotate,
            transition: 'all 0.1s linear'
          }}
          className="parallax-child"
        >
          {child}
        </motion.div>
      );
    });
    
    // Return container with parallax children
    return (
      <div 
        ref={ref} 
        className={`parallax-section ${className}`}
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: bgColor || undefined,
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          perspective: perspective ? '1000px' : 'none',
        }}
      >
        {overlay && (
          <div 
            className="absolute inset-0 z-0" 
            style={{ backgroundColor: overlayColor }}
          />
        )}
        <div className={`parallax-content relative z-10 ${contentClassName}`}>
          {staggeredChildren}
        </div>
      </div>
    );
  }
  
  // Regular parallax effect on the container
  return (
    <div 
      ref={ref} 
      className={`parallax-section ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {bgImage && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y,
            x,
            scale,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      
      {bgColor && (
        <div 
          className="absolute inset-0 z-0" 
          style={{ backgroundColor: bgColor }}
        />
      )}
      
      {overlay && (
        <div 
          className="absolute inset-0 z-0" 
          style={{ backgroundColor: overlayColor }}
        />
      )}
      
      <motion.div 
        className={`parallax-content relative z-10 ${contentClassName}`}
        style={{
          y: !bgImage ? y : 0,
          x: !bgImage ? x : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection; 