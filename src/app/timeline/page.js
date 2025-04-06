'use client';

import { useState, useEffect, useRef } from 'react';
import { inventions } from '@/data/inventions';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import FadeInSection from '@/components/animations/FadeInSection';

// Sort inventions by year (ascending)
const sortedInventions = [...inventions].sort((a, b) => a.year - b.year);

// Helper to get the correct image path for each invention
const getInventionImage = (id) => {
  const imageMap = {
    "printing-press": "/assets/images/inventions/printing-press.webp",
    "automobile": "/assets/images/inventions/benz-patent-motor-car.avif",
    "x-ray": "/assets/images/inventions/xrays.jpg",
    "aspirin": "/assets/images/inventions/aspirin.jpg",
    "diesel-engine": "/assets/images/inventions/diesel enginer.webp",
    "jet-engines": "/assets/images/inventions/jet-engines.jpg",
    "contact-lenses": "/assets/images/inventions/contact-lenses.jpg",
    "electron-microscope": "/assets/images/inventions/electron-microscope.avif",
    "fax-machine": "/assets/images/inventions/fax-machine.webp",
    "morphine": "/assets/images/inventions/morphine.png",
    "gramophone": "/assets/images/inventions/gramaphone.jpg",
    "tram": "/assets/images/inventions/electric-tram.jpg",
    "tape-recorder": "/assets/images/inventions/tape-recorder.webp",
    "glider": "/assets/images/inventions/glider-aircraft.webp",
    "z3-computer": "/assets/images/inventions/Z3 computer.JPG"
  };
  
  return imageMap[id] || `/assets/images/inventions/${id}.jpg`;
};

// Helper to get the correct image path for each inventor
const getInventorImage = (inventor) => {
  const imageMap = {
    "Johannes Gutenberg": "/assets/images/inventors/johannes-gutenberg.jpg",
    "Karl Benz": "/assets/images/inventors/karl-benz.jpg",
    "Wilhelm Conrad Röntgen": "/assets/images/inventors/Wilhelm Röntgen.webp",
    "Felix Hoffmann (Bayer)": "/assets/images/inventors/felix-hoffmann.jpeg",
    "Rudolf Diesel": "/assets/images/inventors/Rudolf-Diesel.jpg",
    "Hans von Ohain": "/assets/images/inventors/frank-whittle.webp",
    "Adolf Gaston Eugen Fick": "/assets/images/inventors/adolf-fick.jpg",
    "Ernst Ruska and Max Knoll": "/assets/images/inventors/ernst-ruska.jpg",
    "Alexander Bain": "/assets/images/inventors/alexander-bain.jpg",
    "Friedrich Wilhelm Sertürner": "/assets/images/inventors/Friedrich-Sertürner .jpg",
    "Emile Berliner": "/assets/images/inventors/Emile-Berliner .jpg",
    "Konrad Zuse": "/assets/images/inventors/Konrad-Zuse.jpg",
    "Werner von Siemens": "/assets/images/inventors/Werner-von-Siemens.jpg",
    "Fritz Pfleumer": "/assets/images/inventors/Fritz-Pfleumer .jpg",
    "Otto Lilienthal": "/assets/images/inventors/Otto-lilienthal.jpg"
  };
  
  return imageMap[inventor] || "/assets/images/inventors/placeholder-inventor.jpg";
};

export default function TimelinePage() {
  const [hoveredInvention, setHoveredInvention] = useState(null);
  const [visibleSections, setVisibleSections] = useState([]);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  
  // Transform values for parallax effect in hero section
  const heroTextY = useTransform(scrollY, [0, 400], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  useEffect(() => {
    // Setup intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id && !visibleSections.includes(id)) {
              setVisibleSections(prev => [...prev, id]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Get all timeline items and observe them
    const timelineItems = document.querySelectorAll('[data-id]');
    timelineItems.forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [visibleSections]);
  
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative py-24 bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('/assets/svg/pattern-grid.svg')] bg-repeat"></div>
        
        <motion.div className="container mx-auto px-4 md:px-6 relative z-10" style={{ y: heroTextY }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200"
            >
              German Inventions Timeline
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl text-violet-100 mb-8"
            >
              Discover revolutionary German innovations throughout history
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <a href="#timeline" className="animate-bounce inline-block mt-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Timeline Section */}
      <section id="timeline" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <FadeInSection direction="up">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-16 drop-shadow-sm">
              Evolution of German Innovation
            </h2>
          </FadeInSection>
          
          <div className="max-w-7xl mx-auto">
            {/* Timeline Track */}
            <div className="relative z-0">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gradient-to-b from-indigo-300 via-violet-300 to-purple-300 h-full z-0"></div>
              
              {/* Invention Items */}
              <div className="relative z-10 space-y-28">
                {sortedInventions.map((invention, index) => (
                  <div 
                    key={invention.id} 
                    data-id={invention.id}
                    className={`
                      transition-all duration-1000 ease-out 
                      ${visibleSections.includes(invention.id) 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-16'
                      }
                    `}
                  >
                    <div 
                      className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} relative`}
                      onMouseEnter={() => setHoveredInvention(invention.id)}
                      onMouseLeave={() => setHoveredInvention(null)}
                    >
                      {/* Timeline Dot */}
                      <div className={`
                        absolute left-0 md:left-1/2 transform md:-translate-x-1/2 
                        w-5 h-5 rounded-full border-2 border-white shadow-md z-20 
                        transition-all duration-300 ease-in-out
                        ${hoveredInvention === invention.id 
                          ? 'scale-125 bg-indigo-500 shadow-md' 
                          : 'bg-indigo-600'}
                      `}></div>
                      
                      {/* Year Badge */}
                      <div className={`
                        absolute left-10 top-0
                        ${index % 2 === 0 
                          ? 'md:left-auto md:right-[calc(50%+20px)]' 
                          : 'md:left-[calc(50%+20px)]'}
                        md:top-0
                        transition-all duration-300 ease-in-out z-20
                        ${hoveredInvention === invention.id 
                          ? 'scale-105' 
                          : ''}
                      `}>
                        <div className={`
                          inline-flex items-center justify-center py-1.5 px-4
                          ${hoveredInvention === invention.id
                            ? 'bg-indigo-500'
                            : 'bg-indigo-600'}
                          text-white text-base font-bold rounded-full shadow-md border border-white/80
                          transition-all duration-300
                        `}>
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="tracking-wide">{invention.year}</span>
                        </div>
                      </div>
                      
                      {/* Content Card - Medium size by default, expands on hover */}
                      <div className={`
                        w-full md:w-5/12 ml-16 md:ml-0 mt-6 md:mt-0 
                        ${index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}
                        transition-all duration-500 ease-in-out
                        ${hoveredInvention === invention.id ? 'transform-gpu ' + (index % 2 === 0 ? 'md:-translate-x-2' : 'md:translate-x-2') : ''}
                      `}>
                        <Link href={`/invention/${invention.id}`}>
                          <div
                            className={`
                              bg-white rounded-xl overflow-hidden shadow-md
                              transition-all duration-500 ease-in-out cursor-pointer
                              transform-gpu hover:-translate-y-1 border border-transparent
                              ${hoveredInvention === invention.id ? 'border-indigo-300 shadow-2xl -translate-y-2' : ''}
                              group
                            `}
                          >
                            {/* Medium sized view - Always visible */}
                            <div className="p-0">
                              {/* Top section with image and basic info */}
                              <div className="flex flex-col">
                                {/* Medium sized image thumbnail */}
                                <div className="relative h-40 w-full overflow-hidden">
                                  <Image
                                    src={getInventionImage(invention.id)}
                                    alt={invention.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
                                    <div className="p-4 w-full">
                                      <h3 className="text-xl font-bold text-white mb-1">
                                        {invention.name}
                                      </h3>
                                      <div className="flex justify-between items-center">
                                        <p className="text-indigo-200 text-sm">
                                          {invention.category}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Basic content with inventor and short description */}
                                <div className="p-4">
                                  <div className="flex items-center mb-3">
                                    {/* Inventor image */}
                                    <div className="w-10 h-10 relative rounded-full overflow-hidden border border-indigo-100 flex-shrink-0 mr-3">
                                      <Image
                                        src={getInventorImage(invention.inventor)}
                                        alt={invention.inventor}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-semibold text-indigo-900">
                                        {invention.inventor}
                                      </h4>
                                      <p className="text-xs text-gray-600">Inventor</p>
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                                    {Array.isArray(invention.description) 
                                      ? invention.description[0].substring(0, 150) + '...'
                                      : invention.description.substring(0, 150) + '...'}
                                  </p>
                                  
                                  <div className="pt-2 flex justify-between items-center">
                                    <span className="text-indigo-600 text-xs font-medium flex items-center hover:text-indigo-800 transition-all duration-300">
                                      Learn more
                                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Expanded content - Visible only on hover */}
                            <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[800px] group-hover:opacity-100">
                              <div className="p-4 pt-0 border-t border-indigo-100">
                                {/* Additional facts */}
                                <div className="mb-4">
                                  <h5 className="font-semibold text-indigo-900 mb-2 text-sm">Key Highlights:</h5>
                                  <ul className="space-y-1.5 pl-1">
                                    {invention.facts.map((fact, idx) => (
                                      <li key={idx} className="flex">
                                        <div className="min-w-[12px] h-[12px] rounded-full bg-indigo-500 mt-1 mr-3 flex-shrink-0"></div>
                                        <span className="text-xs text-gray-700 leading-relaxed">{fact}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {/* Impact */}
                                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-3 rounded-lg mb-4">
                                  <h5 className="font-semibold text-indigo-900 mb-1 text-sm">Historical Impact:</h5>
                                  <p className="text-xs text-gray-700">
                                    {invention.impact}
                                  </p>
                                </div>
                                
                                {/* Learn more button */}
                                <div className="flex justify-end">
                                  <span className="bg-indigo-600 hover:bg-indigo-700 transition-colors inline-flex items-center px-3 py-1.5 text-sm font-bold text-white rounded-md shadow-md">
                                    View 3D Model
                                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
} 