'use client';

import React, { useState, useEffect } from 'react';
import { inventions } from '@/data/inventions';
import Link from 'next/link';
import Image from 'next/image';
import SketchfabEmbed from '@/components/3d/SketchfabEmbed';
import { motion } from 'framer-motion';
import FadeInSection from '@/components/animations/FadeInSection';

// Filter inventions with Sketchfab models
const modelsWithSketchfab = inventions.filter(invention => invention.sketchfabId);

// Utility function to get image path and handle different formats
const getInventionImagePath = (inventionId) => {
  // Special cases for known images with different formats
  switch(inventionId) {
    case 'aspirin':
      return `/assets/images/inventions/aspirin.jpeg`;
    case 'morphine':
      return `/assets/images/inventions/morphine.png`;
    case 'z3-computer':
      return `/assets/images/inventions/Z3 computer.JPG`;
    case 'diesel-engine':
      return `/assets/images/inventions/diesel enginer.webp`;
    case 'printing-press':
      return `/assets/images/inventions/printing-press.webp`;
    case 'x-ray':
      return `/assets/images/inventions/xrays.jpg`;
    case 'fax-machine':
      return `/assets/images/inventions/fax-machine.webp`;
    case 'tape-recorder':
      return `/assets/images/inventions/tape-recorder.webp`;
    case 'glider':
      return `/assets/images/inventions/glider-aircraft.webp`;
    case 'tram':
      return `/assets/images/inventions/electric-tram.jpg`;
    case 'gramophone':
      return `/assets/images/inventions/gramaphone.jpg`;
    case 'electron-microscope':
      return `/assets/images/inventions/electron-microscope.avif`;
    case 'automobile':
      return `/assets/images/inventions/benz-patent-motor-car.avif`;
    case 'jet-engines':
      return `/assets/images/inventions/jet-engines.jpg`;
    default:
      return `/assets/images/inventions/${inventionId}.jpg`;
  }
};

export default function GalleryPage() {
  const [selectedInvention, setSelectedInvention] = useState(modelsWithSketchfab[0] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Reset loading state when model changes
  useEffect(() => {
    if (selectedInvention) {
      setIsLoading(true);
      // Add a small delay to simulate loading and prevent flickering
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedInvention]);

  // Handle image error
  const handleImageError = (inventionId) => {
    setImageErrors(prev => ({
      ...prev,
      [inventionId]: true
    }));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-indigo-800 to-purple-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 pattern-dots-lg text-white/10" style={{ backgroundSize: '20px 20px' }} />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              3D Gallery of German Inventions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl text-indigo-100 mb-6"
            >
              Explore interactive 3D models of revolutionary German inventions that changed the world.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Gallery Layout - COMPLETELY REDONE */}
      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="mx-auto px-4 md:px-6">
          {/* Flex container with fixed sidebar width */}
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar - FIXED WIDTH */}
            <div className="w-full lg:w-[250px] lg:flex-shrink-0 mb-6 lg:mb-0 lg:mr-6">
              <div className="sticky top-24">
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-xl font-bold text-indigo-900 mb-4 pb-2 border-b border-indigo-100">
                    Available Models
                  </h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {modelsWithSketchfab.map((invention, index) => (
                      <div 
                        key={invention.id}
                        onClick={() => setSelectedInvention(invention)}
                        className={`
                          gallery-card cursor-pointer rounded-lg overflow-hidden p-2
                          hover:shadow-md transition-all duration-300
                          ${selectedInvention?.id === invention.id ? 'bg-indigo-50 border-2 border-indigo-500' : 'border border-gray-100'}
                        `}
                      >
                        <div className="flex items-center">
                          {/* Thumbnail */}
                          <div className="gallery-thumbnail w-10 h-10 relative rounded overflow-hidden flex-shrink-0 bg-gray-100">
                            {!imageErrors[invention.id] ? (
                              <Image 
                                src={getInventionImagePath(invention.id)}
                                alt={invention.name}
                                fill
                                className="object-cover"
                                onError={() => handleImageError(invention.id)}
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-indigo-50">
                                <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          
                          {/* Info */}
                          <div className="ml-2 flex-1 overflow-hidden">
                            <h4 className="font-medium text-indigo-900 text-xs truncate">{invention.name}</h4>
                            <p className="text-xs text-gray-500">{invention.year}</p>
                          </div>
                          
                          {/* 3D icon for selected invention */}
                          {selectedInvention?.id === invention.id && (
                            <div className="bg-indigo-600 p-1 rounded-full flex-shrink-0 ml-1">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - EXPANDING */}
            <div className="w-full lg:flex-1">
              {selectedInvention ? (
                <div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-indigo-50"
                >
                  {/* Model Info Header */}
                  <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-indigo-900 mb-2">{selectedInvention.name}</h2>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {selectedInvention.year}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {selectedInvention.inventor}
                          </span>
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            {selectedInvention.category}
                          </span>
                        </div>
                      </div>
                      <Link href={`/invention/${selectedInvention.id}`} className="btn-primary self-start whitespace-nowrap text-sm">
                        <span>View Details</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {Array.isArray(selectedInvention.description) 
                        ? selectedInvention.description[0] 
                        : selectedInvention.description}
                    </p>
                  </div>
                  
                  {/* 3D Model */}
                  <div className="w-full h-[600px] lg:h-[750px] relative border border-indigo-100 rounded-lg overflow-hidden">
                    {isLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                          <p className="mt-3 text-indigo-700 font-medium">Loading 3D Model...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="model-container relative w-full h-full">
                        <SketchfabEmbed
                          modelId={selectedInvention.sketchfabId}
                          title={selectedInvention.name}
                          className="sketchfab-embed"
                        />
                        <div className="absolute bottom-4 right-4 z-30">
                          <a 
                            href={`https://sketchfab.com/3d-models/${selectedInvention.sketchfabId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs font-medium text-indigo-700 hover:bg-white transition-all shadow-md"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open in Sketchfab
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg flex items-center justify-center h-[750px] border border-dashed border-indigo-200">
                  <div className="text-center p-8 max-w-md">
                    <div className="text-6xl mb-4 mx-auto bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-indigo-800">Explore in 3D</h3>
                    <p className="text-gray-600 mb-4">Select an invention from the sidebar to view its interactive 3D model. You can rotate, zoom, and inspect each model in detail.</p>
                    <div className="text-indigo-500 flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      <span className="font-medium">Select from the left sidebar</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SVG Filters for vector effect */}
      <svg width="0" height="0" className="hidden">
        <filter id="vector-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </svg>
    </div>
  );
} 