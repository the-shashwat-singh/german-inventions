'use client';

import { useState, useEffect, useRef } from 'react';
import { inventions } from '@/data/inventions';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from 'react-intersection-observer';

// Sort inventions by year
const sortedInventions = [...inventions].sort((a, b) => a.year - b.year);

// Helper to get image paths
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

// Timeline item component
const TimelineItem = ({ invention, index, onView, isActive, onSelectInvention }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  
  const isEven = index % 2 === 0;
  
  useEffect(() => {
    if (inView) {
      onView(invention.id);
    }
  }, [inView, invention.id, onView]);
  
  return (
    <motion.div 
      ref={ref} 
      className={`relative ${isEven ? 'even' : 'odd'} mb-28 md:mb-32 pl-8 md:pl-0`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Connector to timeline */}
      <motion.div 
        className={`absolute top-[26px] h-1.5 bg-gradient-to-r from-transparent to-indigo-600 dark:to-indigo-400 w-16 md:w-52 ${isEven ? 'left-[12px] md:right-1/2 md:left-auto' : 'left-[12px] md:left-1/2'}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        style={{ 
          transformOrigin: isEven ? 'left center' : 'right center',
          marginLeft: isEven ? 'auto' : '0',
          marginRight: isEven ? '0' : 'auto',
        }}
      />
      
      {/* Year bubble */}
      <div className="absolute left-[12px] md:left-1/2 transform md:-translate-x-1/2 top-[18px] z-10">
        <motion.div 
          className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-white ${isActive ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-indigo-400 dark:bg-indigo-600'}`}
          initial={{ scale: 0 }}
          animate={{ scale: inView ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <motion.div 
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-white ${isActive ? 'opacity-100' : 'opacity-50'}`}
            animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
          />
        </motion.div>
      </div>
      
      {/* Year label */}
      <motion.div
        className={`absolute top-[20px] ${isEven ? 'left-[40px] md:right-[calc(50%+60px)] md:left-auto text-left md:text-right' : 'left-[40px] md:left-[calc(50%+60px)] text-left'} z-20`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <span className="text-lg md:text-xl font-bold text-indigo-800 dark:text-indigo-300 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-md border border-indigo-100 dark:border-indigo-800 hover:shadow-lg transition-shadow duration-300">
          {invention.year}
        </span>
      </motion.div>

      {/* Content card */}
      <motion.div 
        className={`relative w-full md:w-[calc(50%-80px)] mt-16 md:mt-0 ${isEven ? 'md:mr-auto' : 'md:ml-auto'} z-10`}
        variants={{
          hidden: { opacity: 0, y: 20, x: isEven ? -20 : 20 },
          visible: { opacity: 1, y: 0, x: 0 }
        }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        whileHover={{ y: -5 }}
        onClick={() => onSelectInvention(invention)}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="relative h-48 w-full">
            <Image
              src={getInventionImage(invention.id)}
              alt={invention.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
              <div className="p-4 w-full">
                <h3 className="text-xl font-bold text-white mb-1">
                  {invention.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-200 text-sm">
                    {invention.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  src={getInventorImage(invention.inventor)}
                  alt={invention.inventor}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">Invented by</p>
                <p className="text-sm font-semibold">{invention.inventor}</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {Array.isArray(invention.description) 
                ? invention.description[0].substring(0, 120) + '...'
                : invention.description.substring(0, 120) + '...'}
            </p>
            
            <div className="mt-5 flex justify-between items-center">
              <Link href={`/invention/${invention.id}`} className="text-indigo-600 dark:text-indigo-400 font-medium text-sm inline-flex items-center hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200">
                View details
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">
                {invention.featured ? 'Featured' : invention.category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Detailed invention modal
const InventionModal = ({ invention, onClose }) => {
  if (!invention) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 md:h-72 w-full">
          <Image
            src={getInventionImage(invention.id)}
            alt={invention.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
            <div className="p-6">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-3xl font-bold text-white">{invention.name}</h2>
                  <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full">
                    {invention.year}
                  </span>
                </div>
                <p className="text-gray-300 text-lg">{invention.inventor}</p>
              </motion.div>
            </div>
          </div>
          
          <button 
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 max-h-[calc(80vh-18rem)] overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">About</h3>
            {Array.isArray(invention.description) 
              ? invention.description.map((paragraph, i) => (
                <motion.p 
                  key={i} 
                  className="mb-3 text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  {paragraph}
                </motion.p>
              ))
              : <motion.p 
                  className="mb-3 text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {invention.description}
                </motion.p>
            }
          </div>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Impact</h3>
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border-l-4 border-indigo-500">
              <p className="text-gray-700 dark:text-gray-300">{invention.impact}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Key Facts</h3>
            <ul className="space-y-2">
              {invention.facts.map((fact, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1) }}
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{fact}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              href={`/invention/${invention.id}`}
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl"
            >
              Explore in 3D
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function TimelinePage() {
  const [activeInvention, setActiveInvention] = useState(null);
  const [selectedInvention, setSelectedInvention] = useState(null);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  
  // Parallax effects for hero section
  const heroTextY = useTransform(scrollY, [0, 400], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  
  // Handle timeline item visibility
  const handleInventionInView = (id) => {
    setActiveInvention(id);
  };
  
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Hero Section with Parallax */}
      <motion.section 
        ref={heroRef} 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-indigo-900 dark:bg-indigo-950"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-800/10 to-indigo-900/80 z-10"></div>
          <motion.div 
            className="absolute inset-0 bg-[url('/assets/images/pattern-grid.svg')] bg-repeat bg-center opacity-30"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 50, 
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </div>
        
        <motion.div 
          className="container mx-auto px-4 md:px-6 relative z-20 text-center"
          style={{ y: heroTextY }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
              German Inventions <br className="hidden md:block" /> Timeline
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-indigo-200 mb-10 max-w-3xl mx-auto"
          >
            Explore the revolutionary German innovations that shaped our modern world
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="#timeline" 
              className="animate-bounce inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Timeline Section */}
      <section id="timeline" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Evolution of German Innovation
            </span>
          </motion.h2>
          
          <div className="max-w-7xl mx-auto">
            {/* Timeline Track - Center line */}
            <div className="relative">
              <motion.div 
                className="absolute left-[12px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-400"
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
              />
              
              {/* Timeline Items */}
              <div className="relative z-10 pt-2">
                {sortedInventions.map((invention, index) => (
                  <TimelineItem 
                    key={invention.id}
                    invention={invention} 
                    index={index}
                    onView={handleInventionInView}
                    isActive={activeInvention === invention.id}
                    onSelectInvention={setSelectedInvention}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Invention Detail Modal */}
      <AnimatePresence>
        {selectedInvention && (
          <InventionModal 
            invention={selectedInvention} 
            onClose={() => setSelectedInvention(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
} 