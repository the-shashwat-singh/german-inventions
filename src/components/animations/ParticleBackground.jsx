'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = ({
  count = 30,
  color = '#6366F1',
  size = { min: 2, max: 6 },
  speed = { min: 15, max: 40 },
  opacity = { min: 0.1, max: 0.4 },
  interactivity = false,
  direction = 'up', // 'up', 'down', 'left', 'right', 'random'
  blending = true,
  gradient = false,
  colors = ['#6366F1', '#8B5CF6', '#D946EF'],
  className = '',
  zIndex = -1,
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const resizeTimeoutRef = useRef(null);
  
  // Generate a random number between min and max
  const random = (min, max) => Math.random() * (max - min) + min;
  
  // Generate a random color from the colors array or use the main color
  const getColor = (index) => {
    if (gradient) {
      return colors[index % colors.length];
    }
    return color;
  };
  
  // Initialize dimensions on component mount
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    };
    
    // Initial update with a small delay to ensure the DOM has rendered
    const initialTimer = setTimeout(() => {
      updateDimensions();
    }, 100);
    
    updateDimensions();
    
    // Update dimensions when window is resized, but throttled
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        updateDimensions();
      }, 200); // Throttle resize events
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      clearTimeout(initialTimer);
    };
  }, []);
  
  // Memoize particles to avoid recreating them on every render
  const particles = useMemo(() => {
    // Ensure we have valid dimensions before creating particles
    if (!dimensions.width || !dimensions.height) {
      return [];
    }
    
    return Array.from({ length: count }, (_, i) => {
      const particleSize = random(size.min, size.max);
      
      return {
        id: i,
        x: random(0, dimensions.width),
        y: random(0, dimensions.height),
        size: particleSize,
        opacity: random(opacity.min, opacity.max),
        speed: random(speed.min, speed.max),
        color: getColor(i),
        direction: direction === 'random' 
                 ? ['up', 'down', 'left', 'right'][Math.floor(random(0, 4))]
                 : direction
      };
    });
  }, [count, dimensions.width, dimensions.height, size, opacity, speed, direction, gradient, colors, color]);
  
  // Handle mouse movement for interactivity - debounced
  const handleMouseMove = (e) => {
    if (!interactivity || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Only update if position changed significantly (by 10px)
    if (Math.abs(x - mousePosition.x) > 10 || Math.abs(y - mousePosition.y) > 10) {
      setMousePosition({ x, y });
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden absolute inset-0 ${className}`}
      style={{ zIndex }}
      onMouseMove={interactivity ? handleMouseMove : undefined}
    >
      {dimensions.width > 0 && dimensions.height > 0 && particles.length > 0 && particles.map((particle) => {
        // Calculate animation properties based on particle direction
        let xMove = 0;
        let yMove = 0;
        
        switch (particle.direction) {
          case 'up':
            yMove = -dimensions.height - particle.size;
            break;
          case 'down':
            yMove = dimensions.height + particle.size;
            break;
          case 'left':
            xMove = -dimensions.width - particle.size;
            break;
          case 'right':
            xMove = dimensions.width + particle.size;
            break;
          default:
            yMove = -dimensions.height - particle.size;
        }
        
        // Apply mixed blend mode for light effects
        const blendMode = blending ? 'screen' : 'normal';
        
        // Ensure we're not trying to animate with undefined or zero dimensions
        if (!dimensions.width || !dimensions.height) {
          return null;
        }
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              mixBlendMode: blendMode,
              willChange: 'transform',
              boxShadow: gradient ? `0 0 ${particle.size * 2}px ${particle.color}` : 'none',
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [particle.y, particle.y + yMove],
              x: [particle.x, particle.x + xMove],
            }}
            transition={{
              duration: particle.speed,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        );
      })}
    </div>
  );
};

export default React.memo(ParticleBackground); 