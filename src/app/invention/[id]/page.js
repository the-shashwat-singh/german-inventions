'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SketchfabEmbed from '@/components/3d/SketchfabEmbed';
import { getInventionById } from '@/data/inventions';
import { inventions } from '@/data/inventions';
import './styles.css';

// Helper to get the correct image path for each invention
const getInventionImagePath = (id) => {
  const imageMap = {
    "printing-press": "/assets/images/inventions/printing-press.webp",
    "automobile": "/assets/images/inventions/benz-patent-motor-car.avif",
    "x-ray": "/assets/images/inventions/xrays.jpg",
    "aspirin": "/assets/images/inventions/aspirin.jpeg",
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
const getInventorImagePath = (inventor) => {
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

// Helper function to get related inventions
const getRelatedInventions = (currentInvention) => {
  return inventions
    .filter(inv => inv.category === currentInvention.category && inv.id !== currentInvention.id)
    .slice(0, 3);
};

// Inventor details database
const inventorDetails = {
  "Johannes Gutenberg": {
    bio: "German blacksmith, goldsmith, printer, and publisher who introduced printing to Europe with his mechanical movable-type printing press.",
    contribution: "His introduction of mechanical movable type printing to Europe started the Printing Revolution and is regarded as a milestone of the second millennium.",
    funFact: "Gutenberg's printing technology spread rapidly throughout Europe and later the world, revolutionizing the way knowledge was shared."
  },
  "Karl Benz": {
    bio: "German engine designer and automobile engineer, generally regarded as the inventor of the first practical automobile.",
    contribution: "His Benz Patent-Motorwagen, built in 1885, is widely regarded as the world's first production automobile.",
    funFact: "The first long-distance journey with an automobile was performed by his wife Bertha Benz who traveled 106 km from Mannheim to Pforzheim."
  },
  "Wilhelm Conrad Röntgen": {
    bio: "German mechanical engineer and physicist who discovered X-rays, which earned him the first Nobel Prize in Physics in 1901.",
    contribution: "His discovery revolutionized medical diagnostics and led to numerous applications in science and industry.",
    funFact: "Röntgen refused to take out patents related to his discovery to ensure that society could benefit freely from his work."
  },
  "Felix Hoffmann (Bayer)": {
    bio: "German chemist known for synthesizing aspirin and heroin while working at Bayer.",
    contribution: "His synthesis of acetylsalicylic acid (aspirin) created one of the most widely used medications in the world.",
    funFact: "Hoffmann originally synthesized aspirin to help his father who suffered from arthritis."
  },
  "Rudolf Diesel": {
    bio: "German inventor and mechanical engineer famous for the invention of the Diesel engine.",
    contribution: "His engine design was a more efficient alternative to the steam engine and early gasoline engines.",
    funFact: "Diesel mysteriously disappeared from a ship in the English Channel in 1913, his body was found days later."
  },
  "Konrad Zuse": {
    bio: "German civil engineer, inventor and computer pioneer who built the first programmable computer.",
    contribution: "His Z3 was the world's first programmable computer, functioning years before similar developments elsewhere.",
    funFact: "Zuse also designed the first high-level programming language, Plankalkül, though it wasn't implemented during his lifetime."
  }
};

// Animation variants for framer motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Invention Card Component
const InventionCard = ({ invention, inventionImagePath }) => (
  <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl hover-lift group">
    <div className="absolute inset-0">
      <Image
        src={inventionImagePath}
        alt={invention.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-800/50 to-transparent"></div>
    </div>
    
    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
      <span className="text-sm bg-indigo-500/70 px-3 py-1 rounded-full w-max mb-3 animate-fadeIn delay-300">
        {invention.year}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fadeIn delay-400 gradient-text">
        {invention.name}
      </h1>
      <div className="flex items-center mb-6 animate-fadeIn delay-500">
        <span>By {invention.inventor}</span>
            </div>
        </div>
      </div>
    );

// Inventor Card Component
const InventorCard = ({ invention, inventorImagePath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <div 
      className="inventor-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={cardRef}
    >
      <div className="flex flex-col items-center relative">
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 inventor-image">
                    <Image
            src={inventorImagePath}
                      alt={invention.inventor}
                      fill
                      className="object-cover"
                    />
                  </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-indigo-900 mb-1">{invention.inventor}</h3>
          <p className="text-gray-600 text-sm">Inventor, {invention.year}</p>
                  </div>
                  
        {/* Inventor Info Card */}
        <div className="inventor-info right-0 md:right-auto md:left-full md:ml-8 top-0 p-6 md:w-72 w-full">
          <div className="absolute left-0 top-6 -ml-2 w-0 h-0 hidden md:block">
            <div className="w-2 h-4 overflow-hidden">
              <div className="w-3 h-3 bg-white rotate-45 transform origin-bottom-left"></div>
            </div>
          </div>
                    
                    {inventorDetails[invention.inventor] ? (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium text-indigo-700">Bio:</span> {inventorDetails[invention.inventor].bio}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium text-indigo-700">Contribution:</span> {inventorDetails[invention.inventor].contribution}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium text-indigo-700">Fun Fact:</span> {inventorDetails[invention.inventor].funFact}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium text-indigo-700">Known for:</span> Inventing the {invention.name} in {invention.year}.
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium text-indigo-700">Impact:</span> Revolutionized {invention.category.toLowerCase()} and changed how we approach technology.
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium text-indigo-700">Legacy:</span> Their work continues to influence modern innovations in this field.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
  );
};

// 3D Model Section Component
const ModelSection = ({ invention, isLoaded }) => {
  if (!invention.sketchfabId) return null;
  
  return (
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fadeIn">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4 relative inline-block gradient-border">
                  Explore in 3D
                </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                  Interact with this detailed 3D model to understand the mechanics and design of the {invention.name}.
                  Rotate, zoom, and examine all aspects of this revolutionary invention.
                </p>
                
                {/* 3D interaction instructions */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fadeIn delay-300">
              <div className="bg-indigo-50 p-3 rounded-lg flex items-center hover-lift">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <span className="text-sm text-indigo-700">Drag to rotate</span>
                  </div>
              <div className="bg-indigo-50 p-3 rounded-lg flex items-center hover-lift">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm text-indigo-700">Scroll to zoom</span>
                  </div>
              <div className="bg-indigo-50 p-3 rounded-lg flex items-center hover-lift">
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="text-sm text-indigo-700">Double-click for fullscreen</span>
                  </div>
                </div>
              </div>
              
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100 hover-glow transition-all duration-500">
            <div className="h-[600px] relative">
                {!isLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 z-10">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-indigo-800 font-medium">Loading 3D Model...</p>
                    </div>
                  </div>
              ) : null}
              
              <SketchfabEmbed
                modelId={invention.sketchfabId}
                    title={`${invention.name} 3D Model`}
                className="w-full h-full"
              />
            </div>
          </div>
            </div>
          </div>
        </section>
  );
};
      
// Facts Section Component
const FactsSection = ({ invention }) => (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Key Facts */}
          <div className="md:col-span-1 animate-slideInUp">
            <h3 className="text-xl font-bold mb-6 text-indigo-900 border-b border-indigo-100 pb-3 gradient-border">
                  Key Facts
                </h3>
                <ul className="space-y-4">
                  {invention.facts.map((fact, index) => (
                <li 
                  key={index} 
                  className="flex items-start bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400 hover-lift"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                      <svg className="w-5 h-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Historical Impact */}
          <div className="md:col-span-2 animate-slideInUp delay-200">
            <h3 className="text-xl font-bold mb-6 text-indigo-900 border-b border-indigo-100 pb-3 gradient-border">
                  Historical Impact
                </h3>
                <div className="prose prose-lg text-gray-700 max-w-none bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm">
                  <p className="mb-6">{invention.impact}</p>
                  <p>
                    The {invention.name} remains one of Germany's most significant contributions to global technology 
                    and innovation. Its influence continues to be felt today, having shaped modern society in 
                    countless ways and inspiring generations of inventors and engineers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
);

// Related Inventions Section Component
const RelatedInventionsSection = ({ relatedInventions }) => {
  if (relatedInventions.length === 0) return null;
      
  return (
        <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-indigo-900 relative inline-block gradient-border">
            Related Inventions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedInventions.map((relatedInvention, index) => (
                  <div
                    key={relatedInvention.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover-lift group animate-fadeIn"
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="h-48 relative overflow-hidden">
                      <Image 
                        src={getInventionImagePath(relatedInvention.id)}
                        fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={relatedInvention.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <h3 className="text-white font-bold p-4">{relatedInvention.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                          {relatedInvention.year}
                        </span>
                        <span className="text-sm text-gray-500">
                          by {relatedInvention.inventor.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {relatedInvention.description.substring(0, 100)}...
                      </p>
                      <Link href={`/invention/${relatedInvention.id}`}>
                        <div className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 font-medium text-sm flex items-center group">
                          Learn more 
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
};

// Main Component
export default function InventionPage() {
  const params = useParams();
  const router = useRouter();
  const [invention, setInvention] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    if (params.id) {
      const foundInvention = getInventionById(params.id);
      if (foundInvention) {
        setInvention(foundInvention);
        
        // Reset state when invention changes
        setIsModelLoaded(false);
        setActiveTab('overview');
        
        // Simulate model loading after a delay
        if (foundInvention.sketchfabId) {
          const timer = setTimeout(() => {
            setIsModelLoaded(true);
          }, 2000);
          return () => clearTimeout(timer);
        }
      } else {
        // Redirect to inventions page if not found
        router.push('/inventions');
      }
    }
  }, [params.id, router]);
  
  if (!invention) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-800 font-medium">Loading invention details...</p>
        </div>
      </div>
    );
  }
  
  const relatedInventions = getRelatedInventions(invention);
  const inventionImage = getInventionImagePath(invention.id);
  const inventorImage = getInventorImagePath(invention.inventor);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-indigo-900 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={inventionImage}
            alt={invention.name}
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/80 to-indigo-900/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 z-10 relative pt-20 pb-10">
          <div className="max-w-screen-xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Left Column: Content */}
              <motion.div variants={fadeIn} className="text-white">
                <Link 
                  href="/inventions" 
                  className="inline-flex items-center text-indigo-200 hover:text-white mb-6 transition duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to All Inventions</span>
                </Link>
                
                <div>
                  <span className="inline-block bg-indigo-500/30 backdrop-blur-sm text-indigo-100 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {invention.year}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                  {invention.name}
                </h1>
                
                <div className="mb-6 flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-300 mr-3">
                    <Image
                      src={inventorImage}
                      alt={invention.inventor}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-indigo-200 text-sm">Invented by</p>
                    <p className="font-semibold">{invention.inventor}</p>
                  </div>
                </div>
                
                <p className="text-lg text-indigo-100 mb-8 max-w-xl">
                  {Array.isArray(invention.description) 
                    ? invention.description[0] 
                    : invention.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      activeTab === 'overview' 
                        ? 'bg-white text-indigo-900 shadow-md' 
                        : 'bg-indigo-800/60 backdrop-blur-sm text-white hover:bg-indigo-700/60'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      activeTab === 'inventor' 
                        ? 'bg-white text-indigo-900 shadow-md' 
                        : 'bg-indigo-800/60 backdrop-blur-sm text-white hover:bg-indigo-700/60'
                    }`}
                    onClick={() => setActiveTab('inventor')}
                  >
                    The Inventor
                  </button>
                  {invention.sketchfabId && (
                    <button 
                      className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                        activeTab === '3d' 
                          ? 'bg-white text-indigo-900 shadow-md' 
                          : 'bg-indigo-800/60 backdrop-blur-sm text-white hover:bg-indigo-700/60'
                      }`}
                      onClick={() => setActiveTab('3d')}
                    >
                      3D Model
                    </button>
                  )}
                </div>
              </motion.div>
              
              {/* Right Column: Image */}
              <motion.div 
                variants={fadeIn}
                className="hidden md:block relative h-[400px] max-w-sm mx-auto"
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-indigo-300/30 shadow-2xl">
                  <div className="relative h-full w-full">
                    <Image
                      src={inventionImage}
                      alt={invention.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-indigo-400/20 rounded-full backdrop-blur-md"></div>
                <div className="absolute -top-6 -left-6 h-24 w-24 bg-indigo-300/10 rounded-full backdrop-blur-md"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Content Sections */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-screen-xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {/* About The Invention */}
              <section>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 inline-block relative">
                        About the {invention.name}
                        <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-600"></span>
                      </h2>
                      
                      <div className="prose prose-lg max-w-none text-gray-700">
                        {Array.isArray(invention.description) ? (
                          invention.description.map((paragraph, idx) => (
                            <p key={idx} className="mb-4">{paragraph}</p>
                          ))
                        ) : (
                          <p>{invention.description}</p>
                        )}
                        
                        <p className="mt-6 text-gray-900 font-semibold">
                          Impact: {invention.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-100 h-fit">
                    <h3 className="text-xl font-bold text-indigo-900 mb-4">Quick Facts</h3>
                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                          <svg className="w-5 h-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Year</p>
                          <p className="font-medium text-gray-900">{invention.year}</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                          <svg className="w-5 h-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Inventor</p>
                          <p className="font-medium text-gray-900">{invention.inventor}</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                          <svg className="w-5 h-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium text-gray-900">{invention.category}</p>
                        </div>
                      </li>
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t border-indigo-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Facts</h4>
                      <ul className="space-y-2">
                        {invention.facts.map((fact, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Related Inventions */}
              {relatedInventions.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 inline-block relative">
                    Related German Inventions
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-600"></span>
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedInventions.map((relatedInvention) => (
                      <Link 
                        href={`/invention/${relatedInvention.id}`} 
                        key={relatedInvention.id}
                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image 
                            src={getInventionImagePath(relatedInvention.id)}
                            alt={relatedInvention.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 text-white">
                            <span className="inline-block bg-indigo-600/80 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full">
                              {relatedInvention.year}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
                            {relatedInvention.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {Array.isArray(relatedInvention.description) 
                              ? relatedInvention.description[0]
                              : relatedInvention.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{relatedInvention.inventor}</span>
                            <span className="text-indigo-600 font-medium text-sm flex items-center">
                              Learn more
                              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          )}
          
          {/* Inventor Tab */}
          {activeTab === 'inventor' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <section className="py-6">
                <div className="max-w-5xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
                    <div className="md:flex">
                      {/* Inventor Image */}
                      <div className="md:flex-shrink-0 md:w-1/3 relative">
                        <div className="h-full relative md:absolute inset-0">
                          <Image 
                            src={inventorImage}
                            alt={invention.inventor}
                            fill
                            className="object-cover md:h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-900/70 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white"></div>
                        </div>
                      </div>
                      
                      {/* Inventor Info */}
                      <div className="p-8 md:p-10 md:w-2/3 relative">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">{invention.inventor}</h2>
                        <p className="text-indigo-600 font-medium mb-6">Inventor of {invention.name}</p>
                        
                        {inventorDetails[invention.inventor] ? (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Biography</h3>
                              <p className="text-gray-700">{inventorDetails[invention.inventor].bio}</p>
                            </div>
                            
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Contribution</h3>
                              <p className="text-gray-700">{inventorDetails[invention.inventor].contribution}</p>
                            </div>
                            
                            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                              <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                                <span className="flex items-center">
                                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Interesting Fact
                                </span>
                              </h3>
                              <p className="text-gray-700 italic">{inventorDetails[invention.inventor].funFact}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Known For</h3>
                              <p className="text-gray-700">Inventing the {invention.name} in {invention.year}, which revolutionized {invention.category.toLowerCase()}.</p>
                            </div>
                            
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Legacy</h3>
                              <p className="text-gray-700">{invention.inventor}'s work continues to influence modern innovations in {invention.category.toLowerCase()}.</p>
                            </div>
                            
                            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                              <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                                <span className="flex items-center">
                                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Impact
                                </span>
                              </h3>
                              <p className="text-gray-700 italic">{invention.impact}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
          
          {/* 3D Model Tab */}
          {activeTab === '3d' && invention.sketchfabId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <section className="py-6">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 inline-block relative">
                    Interactive 3D Model
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-indigo-600"></span>
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 max-w-3xl">
                    Explore the {invention.name} in three dimensions. You can rotate, zoom, and examine all aspects of this revolutionary invention.
                  </p>
                  
                  {/* 3D interaction instructions */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="bg-indigo-50 p-3 rounded-lg flex items-center transition-transform hover:scale-105">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      <span className="text-sm text-indigo-700">Drag to rotate</span>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg flex items-center transition-transform hover:scale-105">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-sm text-indigo-700">Scroll to zoom</span>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg flex items-center transition-transform hover:scale-105">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span className="text-sm text-indigo-700">Double-click for fullscreen</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100">
                    <div className="h-[600px] relative">
                      {!isModelLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 z-10">
                          <div className="text-center">
                            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-indigo-800 font-medium">Loading 3D Model...</p>
                          </div>
                        </div>
                      )}
                      
                      <SketchfabEmbed
                        modelId={invention.sketchfabId}
                        title={`${invention.name} 3D Model`}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 