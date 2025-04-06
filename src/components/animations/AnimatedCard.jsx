'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const AnimatedCard = ({ 
  title, 
  description, 
  image, 
  year,
  link,
  delay = 0,
  perspective = false,
  glare = false,
  tiltDegree = 5,
  hoverScale = 1.02,
  shadowColor = 'rgba(79, 70, 229, 0.2)',
  className = '',
}) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Card container animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        delay,
        ease: [0.22, 1, 0.36, 1],
      } 
    },
    hover: {
      scale: hoverScale,
      boxShadow: `0 10px 15px -5px ${shadowColor}`,
      transition: { duration: 0.2 }
    }
  };
  
  // Image container animation variants
  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.4 }
    }
  };
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current || !perspective) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation
    const rotateY = tiltDegree * ((mouseX - width / 2) / (width / 2));
    const rotateX = -tiltDegree * ((mouseY - height / 2) / (height / 2));
    
    // Only update if there's a significant change (0.5 degrees)
    if (Math.abs(rotateX - rotation.x) > 0.5 || Math.abs(rotateY - rotation.y) > 0.5) {
      setRotation({ x: rotateX, y: rotateY });
      
      // Calculate position for glare effect
      if (glare) {
        const x = (mouseX / width) * 100;
        const y = (mouseY / height) * 100;
        setMousePosition({ x, y });
      }
    }
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  // Set hovered state when mouse enters
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-50 ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{
        transformStyle: perspective ? 'preserve-3d' : 'flat',
        transform: perspective ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : undefined,
        transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
        willChange: 'transform, opacity',
      }}
      onMouseMove={perspective ? handleMouseMove : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={link || '#'} className="block h-full">
        <div className="h-full">
          {/* Image Section */}
          <div className="relative overflow-hidden h-64 rounded-t-xl">
            <motion.div
              variants={imageVariants}
              className="w-full h-full"
            >
              <Image 
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority={false}
                loading="lazy"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-4 w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                    {year}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6">
            <p className="text-gray-600 mb-6 line-clamp-3">{description}</p>
            <span className="btn-primary block w-full py-3 text-center">
              Learn More
            </span>
          </div>
        </div>
      </Link>
      
      {glare && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%)`,
            opacity: isHovered ? 0.8 : 0,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
          }} 
        />
      )}
    </motion.div>
  );
};

export default React.memo(AnimatedCard); 