'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Invention } from '@/data/inventions';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineProps {
  inventions: Invention[];
}

const Timeline = ({ inventions }: TimelineProps) => {
  const [selectedInvention, setSelectedInvention] = useState<Invention | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sort inventions by year
  const sortedInventions = [...inventions].sort((a, b) => a.year - b.year);
  
  useEffect(() => {
    if (!timelineRef.current || !containerRef.current) return;
    
    // Initialize timeline scrolling animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.6,
      }
    });
    
    // Animate the timeline line drawing
    timeline.fromTo(
      '.timeline-line',
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1, ease: 'power2.out' }
    );
    
    // Animate each node
    sortedInventions.forEach((_, index) => {
      timeline.fromTo(
        `.timeline-node-${index}`,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' },
        '<+=0.1'
      );
    });
    
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [sortedInventions]);

  return (
    <div 
      ref={containerRef}
      className="w-full py-24 px-6 md:px-12 bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 relative"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-indigo-900 relative">
        <span className="relative inline-block">
          Journey Through Time: German Innovations
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
        </span>
      </h2>
      
      <div className="max-w-4xl mx-auto relative" ref={timelineRef}>
        {/* Vertical Timeline line */}
        <div className="timeline-line w-1.5 bg-gradient-to-b from-indigo-500 to-purple-600 absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 h-full rounded-full"></div>
        
        {/* Timeline nodes and content */}
        <div className="relative">
          {sortedInventions.map((invention, index) => (
            <motion.div
              key={invention.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`timeline-node-${index} relative mb-28 flex items-center`}
            >
              {/* Timeline node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
                <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-4 border-white shadow-lg ring-2 ring-indigo-200 ring-opacity-50"></div>
                <div className="text-sm font-semibold text-indigo-800 mt-1 bg-white px-2 py-1 rounded-full shadow-sm">{invention.year}</div>
              </div>
              
              {/* Content card - alternating left and right */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                <motion.div 
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-indigo-100"
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setSelectedInvention(invention)}
                  onMouseLeave={() => setSelectedInvention(null)}
                >
                  <Link href={`/invention/${invention.id}`} className="block">
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">{invention.name}</h3>
                    <div className="flex items-center mb-4">
                      <span className="text-sm text-indigo-700 font-medium">
                        Invented by: <span className="font-bold">{invention.inventor}</span>
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4 text-sm">
                      {Array.isArray(invention.description) 
                        ? invention.description[0].substring(0, 120) + '...'
                        : invention.description.substring(0, 120) + '...'}
                    </p>
                    
                    <div className="text-indigo-600 font-medium text-sm flex items-center hover:text-indigo-800 transition-colors duration-300">
                      View details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Invention details popup */}
        <AnimatePresence>
          {selectedInvention && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg p-6 bg-white rounded-xl shadow-2xl z-50 backdrop-blur-sm bg-opacity-95 border border-indigo-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-indigo-900">{selectedInvention.name}</h3>
                <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                  {selectedInvention.year}
                </span>
              </div>
              
              <div className="text-gray-700 mb-4">
                {Array.isArray(selectedInvention.description) 
                  ? selectedInvention.description.map((paragraph, i) => (
                    <p key={i} className="mb-2">
                      {paragraph}
                    </p>
                  ))
                  : <p>{selectedInvention.description}</p>}
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-indigo-800 mb-2 border-l-4 border-indigo-500 pl-2">Impact:</h4>
                <p className="text-gray-600">{selectedInvention.impact}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-indigo-800 mb-2 border-l-4 border-indigo-500 pl-2">Key Facts:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {selectedInvention.facts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </div>
              
              <Link href={`/invention/${selectedInvention.id}`}>
                <div className="text-center w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0">
                  Explore in 3D
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Timeline; 