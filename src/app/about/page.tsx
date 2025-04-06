'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ParallaxSection from '@/components/animations/ParallaxSection';
import ParticleBackground from '@/components/animations/ParticleBackground';
import { useRef } from 'react';

export default function AboutPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  
  return (
    <div className="min-h-screen pt-16">
      {/* About Header with Parallax and Particles */}
      <section ref={targetRef} className="relative py-20 bg-gradient-to-r from-indigo-800 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("/assets/svg/pattern-bg.svg")' }} />
        
        {/* Interactive particles in the background */}
        <ParticleBackground
          count={30}
          colors={['#c4b5fd', '#a78bfa', '#8b5cf6']}
          size={{ min: 2, max: 5 }}
          speed={{ min: 20, max: 30 }}
          opacity={{ min: 0.2, max: 0.5 }}
          gradient={true}
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-purple-800/50"
          style={{ y, opacity }}
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 animate-shimmer">
              PROJECT BASED LEARNING - GERMAN
            </h1>
            <motion.p 
              className="text-xl md:text-2xl text-indigo-100 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              Topic: German Inventions
            </motion.p>
            
            {/* Animated underline */}
            <motion.div 
              className="h-1 w-0 bg-gradient-to-r from-white to-indigo-300 mx-auto mt-4"
              animate={{ width: "150px" }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            />
          </motion.div>
        </div>
        
        {/* Diagonal divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-2" />
      </section>
      
      {/* Team Section with Enhanced Cards */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-100 rounded-full opacity-50 filter blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-purple-100 rounded-full opacity-50 filter blur-3xl" />
      
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal effect="slide" direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-indigo-900">
                  Team Members
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-8"></div>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Shashwat Singh",
                  regNo: "RA2411043010075"
                },
                {
                  name: "Ishan Verma",
                  regNo: "RA2411043010088"
                },
                {
                  name: "Abheenav Sahu",
                  regNo: "RA2411043010110"
                },
                {
                  name: "Abhishek Singh",
                  regNo: "RA2411043010076"
                },
                {
                  name: "Anushka Rishivanshi",
                  regNo: "RA2411043010064"
                },
                {
                  name: "Himanshu Goyla",
                  regNo: "RA2411043010079"
                }
              ].map((person, index) => (
                <ScrollReveal
                  key={index}
                  effect="zoom"
                  direction="in"
                  delay={index * 0.1}
                >
                  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 group hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 flex items-center justify-center text-white text-2xl font-bold relative group-hover:scale-110 transition-transform duration-300">
                        {person.name.charAt(0)}
                        
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 rounded-full"></div>
                      </div>
                      <h3 className="text-xl font-bold mb-1 text-indigo-900">{person.name}</h3>
                      <p className="text-gray-600 font-medium">Reg No: {person.regNo}</p>
                      
                      {/* Hover reveal animated line */}
                      <div className="mt-3 w-full relative overflow-hidden h-0.5">
                        <div className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Section with Parallax */}
      <section className="py-16 bg-[#f5f3ff]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal effect="fade">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-indigo-900">
                  Tech Stack
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-8"></div>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Modern technologies powering our interactive experience
                </p>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Next.js",
                  description: "React framework for production-grade applications",
                  icon: "⚛️"
                },
                {
                  title: "React",
                  description: "JavaScript library for building user interfaces",
                  icon: "🔄"
                },
                {
                  title: "TypeScript",
                  description: "Strongly typed programming language",
                  icon: "📝"
                },
                {
                  title: "Tailwind CSS",
                  description: "Utility-first CSS framework",
                  icon: "🎨"
                },
                {
                  title: "Framer Motion",
                  description: "Animation library for React",
                  icon: "✨"
                },
                {
                  title: "Three.js",
                  description: "3D library for creating interactive content",
                  icon: "🧊"
                },
                {
                  title: "npm",
                  description: "Package manager for JavaScript",
                  icon: "📦"
                },
                {
                  title: "Git",
                  description: "Version control system",
                  icon: "🔄"
                }
              ].map((item, index) => (
                <ScrollReveal
                  key={index}
                  effect="flip"
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 0.05}
                >
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group h-full relative">
                    <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-indigo-800">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Project Description with Reveal Effects */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <ScrollReveal effect="slide" direction="left">
                <h2 className="text-3xl font-bold mb-6 text-indigo-900">
                  Our Mission
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 mb-8"></div>
                <div className="prose prose-lg text-gray-700 max-w-none">
                  <p className="mb-4">
                    German Innovations aims to showcase Germany's most influential inventions through an engaging, interactive experience. 
                    We blend modern web technologies with 3D visualization to bring these historical achievements to life.
                  </p>
                  <p>
                    From the revolutionary printing press to the modern automobile, German inventors have shaped our world in profound ways. 
                    Our goal is to make this rich history accessible and engaging, especially for students, educators, and history enthusiasts.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal effect="reveal" direction="right">
                <div className="rounded-xl overflow-hidden shadow-lg relative group">
                  <div className="w-full h-[400px] relative">
                    <Image
                      src="/assets/images/ui/our-mission.jpg"
                      alt="Our Mission"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Overlay gradient that appears on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-50 rounded-full opacity-70 filter blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-50 rounded-full opacity-70 filter blur-3xl"></div>
      </section>
      
      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 8s linear infinite;
        }
      `}</style>
    </div>
  );
} 