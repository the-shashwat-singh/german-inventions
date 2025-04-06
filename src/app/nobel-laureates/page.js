'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeInSection from '@/components/animations/FadeInSection';
import PageTransition from '@/components/animations/PageTransition';

// Nobel laureates data with detailed information
const laureates = [
  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    year: 1921,
    field: 'Physics',
    discovery: 'Theory of Relativity and the Photoelectric Effect',
    description: 'Albert Einstein revolutionized physics with his special and general theories of relativity, fundamentally changing our understanding of space, time, and gravity. His work on the photoelectric effect, which demonstrated the particle nature of light (photons), was specifically cited in his Nobel Prize award.',
    impact: 'Einstein\'s theories are foundational to modern physics, enabling technological advances from GPS systems to nuclear energy. The equation E=mc² has become part of our cultural vocabulary and played a crucial role in the development of atomic energy and weapons. His work laid the groundwork for quantum mechanics and continues to influence physics today.',
    breakthrough: 'His work was revolutionary because it completely transformed our fundamental understanding of the universe. The theory of relativity showed that time and space are not absolute but relative to the observer, contradicting Newton\'s laws which had dominated for centuries. His explanation of the photoelectric effect helped establish quantum theory.',
    image: '/albert-einstein.jpg',
  },
  {
    id: 'max-planck',
    name: 'Max Planck',
    year: 1918,
    field: 'Physics',
    discovery: 'Quantum Theory',
    description: 'Max Planck discovered that energy is emitted in discrete packets, or "quanta," rather than continuously—a revolutionary concept that gave birth to quantum physics. His work solved the ultraviolet catastrophe problem in physics by proposing that energy could only be emitted or absorbed in discrete quantum units.',
    impact: 'Planck\'s quantum theory fundamentally changed physics and our understanding of atomic and subatomic processes. It led to the development of technologies like lasers, transistors, and computers. Nearly all modern electronic devices rely on quantum mechanics in some way, making his discovery one of the most influential in modern science.',
    breakthrough: 'Planck\'s work was revolutionary because it broke with classical physics by introducing discontinuity at the atomic level. This idea that energy comes in discrete packets rather than continuous flows challenged the prevailing scientific paradigm and opened up entirely new fields of research.',
    image: '/max-plank.jpg',
  },
  {
    id: 'werner-heisenberg',
    name: 'Werner Heisenberg',
    year: 1932,
    field: 'Physics',
    discovery: 'Uncertainty Principle and Quantum Mechanics',
    description: 'Werner Heisenberg formulated the uncertainty principle, which states that the more precisely the position of a particle is determined, the less precisely its momentum can be known, and vice versa. He also developed matrix mechanics, one of the first mathematical formulations of quantum mechanics.',
    impact: 'Heisenberg\'s uncertainty principle imposed fundamental limits on how precisely we can know physical properties, transforming our understanding of measurement in quantum systems. His work has profound implications for technology development including electron microscopes, MRI machines, and quantum computers.',
    breakthrough: 'His breakthrough challenged the deterministic view of the universe and introduced fundamental uncertainty into physics. It showed that there are inherent limits to measurement at the quantum level—not due to inadequate instruments but as a fundamental property of nature itself.',
    image: '/werner-heisenberg.jpg',
  },
  {
    id: 'otto-hahn',
    name: 'Otto Hahn',
    year: 1944,
    field: 'Chemistry',
    discovery: 'Nuclear Fission',
    description: 'Otto Hahn discovered nuclear fission—the splitting of uranium atoms into lighter elements with the release of enormous energy. While working with Lise Meitner (who was denied recognition due to her exile from Nazi Germany), Hahn demonstrated that uranium nuclei could be split when bombarded with neutrons.',
    impact: 'Hahn\'s discovery directly led to the development of nuclear power and atomic weapons, fundamentally changing global politics and energy production. Nuclear energy now provides about 10% of the world\'s electricity while shifting geopolitical power structures through the nuclear arms race that followed.',
    breakthrough: 'This was revolutionary because it revealed that enormous energy could be released from atoms, contradicting earlier beliefs about atomic stability. It opened up entirely new possibilities for energy production and weapons development, while demonstrating the possibility of chain reactions in nuclear material.',
    image: '/otto-hahn.jpg',
  },
  {
    id: 'robert-koch',
    name: 'Robert Koch',
    year: 1905,
    field: 'Physiology or Medicine',
    discovery: 'Tuberculosis Bacterium and Infectious Disease Research',
    description: 'Robert Koch identified the bacterium responsible for tuberculosis (Mycobacterium tuberculosis) and developed methods for isolating, visualizing, and cultivating bacteria. He established a systematic approach to proving that specific microorganisms cause specific diseases, known as Koch\'s postulates.',
    impact: 'Koch\'s methods transformed medicine by providing a scientific framework for understanding infectious diseases. His work led to effective tuberculosis diagnosis and eventually to treatments, saving millions of lives. His postulates remain fundamental to identifying disease-causing organisms.',
    breakthrough: 'His discoveries were revolutionary because they provided definitive proof of the germ theory of disease at a time when many still believed diseases were caused by "miasma" or bad air. This paradigm shift enabled the development of targeted treatments and preventive measures for infectious diseases.',
    image: '/robert-koch.jpg',
  },
  {
    id: 'paul-ehrlich',
    name: 'Paul Ehrlich',
    year: 1908,
    field: 'Physiology or Medicine',
    discovery: 'Chemotherapy and Immunology',
    description: 'Paul Ehrlich developed the first systematic studies of the immune response and pioneered the concept of chemotherapy—targeted chemical treatment for disease. He created Salvarsan, the first effective treatment for syphilis, demonstrating that specific chemicals could selectively kill pathogens without harming the patient.',
    impact: 'Ehrlich\'s work laid the foundation for modern drug development and rational design of medications. His "magic bullet" concept—drugs that target specific pathogens—revolutionized medicine and led to antibiotics and targeted therapies. His contributions to immunology and staining techniques advanced medical diagnostics.',
    breakthrough: 'His approach was revolutionary because it introduced the possibility of selective chemical treatments for disease, moving beyond general antiseptics. Creating the first synthetic antimicrobial drug opened the door to the antibiotic revolution and established the field of medicinal chemistry.',
    image: '/paul-ehrlich.webp',
  },
];

export default function NobelLaureatesPage() {
  const [visibleSections, setVisibleSections] = useState([]);
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 400], [0, 80]);

  useEffect(() => {
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
    
    const laureateSections = document.querySelectorAll('[data-id]');
    laureateSections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [visibleSections]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-28 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-slate-900 to-blue-900 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/assets/svg/pattern-grid.svg')] bg-repeat"></div>
          <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/50"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-sky-400 rounded-full shadow-lg shadow-sky-400/50"></div>
          
          <motion.div 
            className="relative container mx-auto px-4 z-10" 
            style={{ y: heroTextY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                German Nobel Laureates
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Brilliant minds whose discoveries transformed science and shaped our modern world
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href="#laureates" className="relative inline-block px-8 py-3 rounded-md bg-white text-blue-900 font-semibold transition duration-300 hover:bg-blue-50 hover:shadow-lg hover:shadow-white/20 overflow-hidden group">
                  <span className="relative z-10">Explore Laureates</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Laureates Section */}
        <section id="laureates" className="py-20">
          <div className="container mx-auto px-4">
            <FadeInSection direction="up">
              <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">Nobel Prize Winners</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Revolutionary Discoveries
                </h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Germany's Nobel laureates made groundbreaking contributions that revolutionized our understanding of physics, chemistry, and medicine.
                </p>
              </div>
            </FadeInSection>
            
            <div className="max-w-7xl mx-auto space-y-24">
              {laureates.map((laureate, index) => (
                <motion.div
                  key={laureate.id}
                  data-id={laureate.id}
                  className={`
                    relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-1000 ease-out
                    hover:shadow-xl hover:shadow-blue-100/50 border border-slate-100
                    ${visibleSections.includes(laureate.id) ? 'opacity-100' : 'opacity-0 translate-y-20'}
                  `}
                >
                  {/* Decorative element */}
                  <div className="absolute top-0 right-0 h-24 w-24 overflow-hidden z-10">
                    <div className="absolute rotate-45 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg w-32 h-6 
                    flex items-center justify-center text-xs font-bold tracking-wider" style={{top: '14px', right: '-26px'}}>
                      NOBEL
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Column */}
                    <div className="w-full lg:w-2/5 relative group">
                      <div className="relative h-[400px] lg:h-full w-full overflow-hidden">
                        <Image
                          src={`/assets/images/nobel-laureates${laureate.image}`}
                          alt={laureate.name}
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'top center' }}
                          className="transition-transform duration-700 ease-in-out group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="inline-block px-3 py-1 rounded-md bg-blue-600 text-white text-sm font-medium shadow-md">
                            {laureate.year}
                          </span>
                          <span className="inline-block px-3 py-1 rounded-md bg-slate-800/80 backdrop-blur-sm text-white text-sm font-medium shadow-md">
                            {laureate.field}
                          </span>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-3xl font-bold mb-2 drop-shadow-md">{laureate.name}</h3>
                          <p className="text-lg text-blue-100 drop-shadow-md">{laureate.discovery}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Column */}
                    <div className="w-full lg:w-3/5 p-8 lg:p-10">
                      <div className="prose prose-lg max-w-none">
                        <div className="mb-8">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h4 className="text-xl font-semibold text-slate-900">The Discovery</h4>
                          </div>
                          <p className="text-slate-700">{laureate.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                              <h4 className="text-xl font-semibold text-slate-900">Revolutionary Impact</h4>
                            </div>
                            <p className="text-slate-700">{laureate.breakthrough}</p>
                          </div>
                          
                          <div>
                            <div className="flex items-center mb-3">
                              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </div>
                              <h4 className="text-xl font-semibold text-slate-900">Lasting Legacy</h4>
                            </div>
                            <p className="text-slate-700">{laureate.impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4 relative">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
            
            <div className="max-w-4xl mx-auto text-center mb-16 relative">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-sm font-medium mb-4">Scientific Excellence</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The German Scientific Legacy</h2>
              <p className="text-xl text-slate-600">
                Germany's contribution to scientific advancement has shaped our modern world
                and continues to influence research and innovation today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-blue-50/50 hover:translate-y-[-5px]">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 mb-6 shadow-inner">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Paradigm Shifts</h3>
                <p className="text-slate-600">
                  German Nobel laureates didn't just add to existing knowledge—they fundamentally
                  transformed their fields with revolutionary ideas that changed scientific paradigms.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-blue-50/50 hover:translate-y-[-5px]">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 mb-6 shadow-inner">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Technological Innovation</h3>
                <p className="text-slate-600">
                  Their theoretical discoveries laid the groundwork for world-changing technologies,
                  from nuclear energy and quantum computing to modern pharmaceuticals and medical treatments.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-blue-50/50 hover:translate-y-[-5px]">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-sky-50 to-sky-100 text-sky-600 mb-6 shadow-inner">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Global Influence</h3>
                <p className="text-slate-600">
                  The impact of German scientific contributions extends globally, influencing research
                  methodologies, educational approaches, and scientific institutions around the world.
                </p>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto mt-16 text-center">
              <Link 
                href="/timeline" 
                className="inline-block px-8 py-3 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold transition duration-300 hover:shadow-lg hover:shadow-blue-300/30 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Explore German Inventions Timeline</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
} 