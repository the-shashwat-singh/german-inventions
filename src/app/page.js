'use client';

import React, { useState, useEffect, useRef } from 'react';
import { inventions } from '@/data/inventions';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import FadeInSection from '@/components/animations/FadeInSection';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ParallaxSection from '@/components/animations/ParallaxSection';
import ParticleBackground from '@/components/animations/ParticleBackground';
import AnimatedCard from '@/components/animations/AnimatedCard';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);

  // Transform values for parallax effect
  const heroTextY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const particleY = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter only featured inventions
  const featuredInventions = inventions.filter(invention => invention.featured);

  // Safely get image path without causing rendering issues
  const getInventionImagePath = (inventionId) => {
    if (inventionId === 'diesel-engine') return '/assets/images/inventions/diesel enginer.webp';
    if (inventionId === 'automobile') return '/assets/images/inventions/benz-patent-motor-car.avif';
    if (inventionId === 'x-ray') return '/assets/images/inventions/xrays.jpg';
    if (inventionId === 'z3-computer') return '/assets/images/inventions/Z3 computer.JPG';
    if (inventionId === 'printing-press') return '/assets/images/inventions/printing-press.webp';
    if (inventionId === 'aspirin') return '/assets/images/inventions/aspirin.jpg';
    return `/assets/images/inventions/${inventionId}.jpg`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Parallax and Particles */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Modern Enhanced Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 animate-gradient-x"></div>
          
          {/* 3D Mesh Background */}
          <div className="absolute inset-0 bg-[url('/assets/svg/mesh-grid.svg')] bg-repeat bg-center opacity-20 animate-pulse-slow"></div>
          
          {/* Modern Flowing Gradient Orbs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {/* Large animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-violet-600/30 to-indigo-600/30 animate-float blur-[120px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 animate-float-delay blur-[100px]"></div>
            <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-indigo-600/30 to-blue-600/30 animate-float-reverse blur-[80px]"></div>
            
            {/* Smaller floating elements for depth */}
            <div className="absolute top-[20%] right-[10%] w-24 h-24 rounded-full border border-indigo-500/20 animate-orbit"></div>
            <div className="absolute bottom-[30%] left-[15%] w-16 h-16 rounded-full border border-purple-500/20 animate-orbit-reverse"></div>
            
            {/* Tech-inspired line decorations */}
            <div className="absolute top-[15%] left-[20%] w-[150px] h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent transform rotate-45 animate-pulse-slow"></div>
            <div className="absolute bottom-[20%] right-[25%] w-[200px] h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent transform -rotate-45 animate-pulse-slow"></div>
          </div>
          
          {/* Interactive Particle Background - Enhanced */}
          <ParticleBackground
            count={80}
            colors={['#8B5CF6', '#C4B5FD', '#A78BFA', '#6366F1', '#4F46E5']}
            gradient={true}
            size={{ min: 1, max: 4 }}
            speed={{ min: 25, max: 60 }}
            direction="up"
            interactivity={true}
          />
          
          {/* Futuristic Grid Overlay */}
          <div className="absolute inset-0 bg-[url('/assets/svg/circuit-pattern.svg')] bg-repeat-space opacity-10"></div>
          
          {/* Modern Noise Texture for depth */}
          <div className="absolute inset-0 bg-[url('/assets/svg/noise.svg')] bg-repeat opacity-[0.03] mix-blend-overlay"></div>
          
          {/* Gradient overlay with improved colors */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-transparent to-indigo-950/70"></div>
        </div>

        <motion.div className="container mx-auto px-4 md:px-6 relative z-10 text-center" style={{ y: heroTextY, opacity: heroOpacity }}>
          <div className="text-white filter drop-shadow-xl backdrop-blur-sm bg-black/5 p-8 rounded-2xl border border-white/10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200 animate-shine">
                Discover German <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-200">Innovations</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                Explore the revolutionary inventions from Germany that changed the world through
                interactive 3D models and timelines.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/timeline" className="btn-rounded-primary px-8 py-4 group relative overflow-hidden backdrop-blur-md bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300">
                <span className="relative z-10 text-white font-bold text-lg tracking-wide">Explore Timeline</span>
                <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
              </Link>
              <Link href="/gallery" className="btn-rounded-secondary px-8 py-4 group relative overflow-hidden backdrop-blur-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300">
                <span className="relative z-10 text-white font-bold text-lg tracking-wide">View 3D Gallery</span>
                <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
              </Link>
              <Link href="/inventions" className="btn-rounded-accent px-8 py-4 group relative overflow-hidden backdrop-blur-md bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 transition-all duration-300">
                <span className="relative z-10 text-white font-bold text-lg tracking-wide">All Inventions</span>
                <span className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-sm mt-2 bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">Scroll Down</span>
        </motion.div>
      </section>

      {/* Featured Inventions with Animation */}
      <section className="py-20 bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div>
            <ScrollReveal effect="fade" direction="up">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-900 relative inline-block">
                  Revolutionary German Inventions
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Germany has been at the forefront of innovation for centuries. Explore these groundbreaking
                  inventions in interactive 3D.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredInventions.map((invention, index) => (
                <AnimatedCard
                  key={invention.id}
                  title={invention.name}
                  description={Array.isArray(invention.description) 
                    ? invention.description[0].substring(0, 120) + '...'
                    : invention.description.substring(0, 120) + '...'}
                  image={getInventionImagePath(invention.id)}
                  year={invention.year}
                  link={`/invention/${invention.id}`}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal effect="slide" direction="left">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-900 relative inline-block">
                    Experience Inventions in 3D
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Our interactive 3D models allow you to examine the details of these revolutionary 
                    German inventions from every angle. Rotate, zoom, and explore the components that 
                    changed the course of history.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Interactive 3D models of famous German inventions",
                      "Chronological timeline of German innovations",
                      "Detailed historical information and facts"
                    ].map((item, index) => (
                      <ScrollReveal key={index} effect="slide" direction="left" delay={index * 0.1 + 0.2}>
                        <li className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group">
                          <span className="w-6 h-6 text-indigo-600 mt-1 mr-3 relative">
                            <span className="absolute inset-0 rounded-full bg-indigo-100 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                            <svg className="relative z-10" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      </ScrollReveal>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link href="/gallery" className="btn-primary inline-flex items-center group relative overflow-hidden">
                      <span className="relative z-10">Explore 3D Gallery</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <Link href="/inventions" className="btn-secondary inline-flex items-center group relative overflow-hidden">
                      <span className="relative z-10">Inventors Gallery</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal effect="flip" direction="right" delay={0.2}>
                <div className="bg-white/80 backdrop-blur-sm h-[500px] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center border border-indigo-100 relative group">
                  {/* Added hover effect with layered elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-[url('/assets/svg/pattern-grid.svg')] bg-repeat opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  
                  <div className="text-center p-8 relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                    <motion.div 
                      className="text-6xl mb-4"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                      🔍
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2 text-indigo-800">Interactive 3D Models</h3>
                    <p className="text-indigo-700">Rotate, zoom, and explore German inventions in detail</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-30px) translateX(15px);
          }
          50% {
            transform: translateY(-15px) translateX(30px);
          }
          75% {
            transform: translateY(-25px) translateX(-15px);
          }
        }
        
        @keyframes animate-gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-30px) translateX(20px);
          }
          66% {
            transform: translateY(-15px) translateX(-20px);
          }
        }
        
        @keyframes float-delay {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(30px) translateX(-20px);
          }
          66% {
            transform: translateY(15px) translateX(20px);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(25px) translateX(-15px);
          }
          66% {
            transform: translateY(-20px) translateX(-25px);
          }
        }
        
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(50px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-reverse {
          from {
            transform: rotate(360deg) translateX(70px) rotate(-360deg);
          }
          to {
            transform: rotate(0deg) translateX(70px) rotate(0deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: animate-gradient-x 15s ease infinite;
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 25s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 22s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit 20s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 25s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-shine {
          background-size: 200% auto;
          animation: shine 3s linear infinite;
        }
        
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        
        .btn-rounded-primary,
        .btn-rounded-secondary,
        .btn-rounded-accent {
          font-weight: 600;
          border-radius: 0.5rem;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.02em;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.1) inset;
          animation: glow 3s ease-in-out infinite;
        }
        
        .btn-rounded-primary:hover,
        .btn-rounded-secondary:hover,
        .btn-rounded-accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 15px rgba(255, 255, 255, 0.2) inset;
        }
        
        .btn-rounded-primary:active,
        .btn-rounded-secondary:active,
        .btn-rounded-accent:active {
          transform: translateY(1px);
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
} 