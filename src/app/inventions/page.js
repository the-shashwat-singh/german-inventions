'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeInSection from '@/components/animations/FadeInSection';
import ScrollReveal from '@/components/animations/ScrollReveal';

// Array with well-known invention data
const inventions = [
  {
    id: "printing-press",
    name: "Printing Press",
    year: 1439,
    description: "The Gutenberg printing press revolutionized how knowledge was shared. Developed by Johannes Gutenberg in the 15th century, it allowed books to be mass-produced efficiently.",
    inventor: "Johannes Gutenberg",
    inventorImage: "/assets/images/inventors/johannes-gutenberg.jpg",
    inventionImage: "/assets/images/inventions/printing-press.webp",
    link: "/invention/printing-press"
  },
  {
    id: "automobile",
    name: "Automobile",
    year: 1886,
    description: "Karl Benz patented the world's first automobile powered by an internal combustion engine, revolutionizing transportation forever.",
    inventor: "Karl Benz",
    inventorImage: "/assets/images/inventors/karl-benz.jpg",
    inventionImage: "/assets/images/inventions/benz-patent-motor-car.avif",
    link: "/invention/automobile"
  },
  {
    id: "x-ray",
    name: "X-Ray",
    year: 1895,
    description: "Wilhelm Röntgen discovered X-rays, which could penetrate solid objects and create images of internal structures, revolutionizing medical diagnosis.",
    inventor: "Wilhelm Conrad Röntgen",
    inventorImage: "/assets/images/inventors/Wilhelm Röntgen.webp",
    inventionImage: "/assets/images/inventions/xrays.jpg",
    link: "/invention/x-ray"
  },
  {
    id: "diesel-engine",
    name: "Diesel Engine",
    year: 1893,
    description: "Rudolf Diesel invented the efficient, compression-ignition engine that bears his name, now used in everything from trucks to ships.",
    inventor: "Rudolf Diesel",
    inventorImage: "/assets/images/inventors/Rudolf-Diesel.jpg",
    inventionImage: "/assets/images/inventions/diesel enginer.webp",
    link: "/invention/diesel-engine"
  },
  {
    id: "glider-aircraft",
    name: "Glider Aircraft",
    year: 1894,
    description: "Otto Lilienthal, known as the 'Flying Man', conducted over 2,000 flights in gliders he designed, laying crucial groundwork for powered aircraft.",
    inventor: "Otto Lilienthal",
    inventorImage: "/assets/images/inventors/Otto-lilienthal.jpg",
    inventionImage: "/assets/images/inventions/glider-aircraft.webp",
    link: "/invention/glider-aircraft"
  },
  {
    id: "tape-recorder",
    name: "Magnetic Tape Recorder",
    year: 1928,
    description: "Fritz Pfleumer invented magnetic recording tape, revolutionizing audio recording and paving the way for modern data storage technologies.",
    inventor: "Fritz Pfleumer",
    inventorImage: "/assets/images/inventors/Fritz-Pfleumer .jpg",
    inventionImage: "/assets/images/inventions/tape-recorder.webp",
    link: "/invention/tape-recorder"
  },
  {
    id: "electric-tram",
    name: "Electric Tram",
    year: 1881,
    description: "Werner von Siemens demonstrated the world's first electric tram system, transforming urban public transportation worldwide.",
    inventor: "Werner von Siemens",
    inventorImage: "/assets/images/inventors/Werner-von-Siemens.jpg",
    inventionImage: "/assets/images/inventions/electric-tram.jpg",
    link: "/invention/electric-tram"
  },
  {
    id: "z3-computer",
    name: "Z3 Computer",
    year: 1941,
    description: "Konrad Zuse's Z3 was the world's first fully operational programmable computer, using binary and floating-point arithmetic.",
    inventor: "Konrad Zuse",
    inventorImage: "/assets/images/inventors/Konrad-Zuse.jpg",
    inventionImage: "/assets/images/inventions/Z3 computer.JPG",
    link: "/invention/z3-computer"
  },
  {
    id: "gramophone",
    name: "Gramophone",
    year: 1887,
    description: "Emile Berliner invented the gramophone, the first commercially viable record player using flat discs instead of cylinders.",
    inventor: "Emile Berliner",
    inventorImage: "/assets/images/inventors/Emile-Berliner .jpg",
    inventionImage: "/assets/images/inventions/gramaphone.jpg",
    link: "/invention/gramophone"
  },
  {
    id: "fax-machine",
    name: "Fax Machine",
    year: 1843,
    description: "Alexander Bain invented the first mechanical fax machine, which could transmit images over wires using a scanning mechanism.",
    inventor: "Alexander Bain",
    inventorImage: "/assets/images/inventors/alexander-bain.jpg",
    inventionImage: "/assets/images/inventions/fax-machine.webp",
    link: "/invention/fax-machine"
  },
  {
    id: "electron-microscope",
    name: "Electron Microscope",
    year: 1931,
    description: "Ernst Ruska co-invented the electron microscope, which uses electron beams to achieve magnification far beyond what light microscopes can achieve.",
    inventor: "Ernst Ruska",
    inventorImage: "/assets/images/inventors/ernst-ruska.jpg",
    inventionImage: "/assets/images/inventions/electron-microscope.avif",
    link: "/invention/electron-microscope"
  },
  {
    id: "contact-lenses",
    name: "Contact Lenses",
    year: 1887,
    description: "Adolf Gaston Eugen Fick created and fitted the first successful contact lenses, made of glass, revolutionizing vision correction.",
    inventor: "Adolf Gaston Eugen Fick",
    inventorImage: "/assets/images/inventors/adolf-fick.jpg",
    inventionImage: "/assets/images/inventions/contact-lenses.jpg",
    link: "/invention/contact-lenses"
  },
  {
    id: "jet-engine",
    name: "Jet Engine",
    year: 1940,
    description: "Hans von Ohain's design was used in the world's first jet aircraft, the Heinkel He 178, revolutionizing aviation.",
    inventor: "Hans von Ohain",
    inventorImage: "/assets/images/inventors/frank-whittle.webp", // Using available image
    inventionImage: "/assets/images/inventions/jet-engines.jpg",
    link: "/invention/jet-engine"
  },
  {
    id: "aspirin",
    name: "Aspirin",
    year: 1897,
    description: "Felix Hoffmann at Bayer synthesized acetylsalicylic acid in a stable form, creating aspirin, now one of the world's most widely used medications.",
    inventor: "Felix Hoffmann",
    inventorImage: "/assets/images/inventors/felix-hoffmann.jpeg",
    inventionImage: "/assets/images/inventions/aspirin.jpeg",
    link: "/invention/aspirin"
  },
  {
    id: "morphine",
    name: "Morphine",
    year: 1804,
    description: "Friedrich Sertürner isolated and named morphine from opium, revolutionizing pain management and establishing the field of alkaloid chemistry.",
    inventor: "Friedrich Wilhelm Sertürner",
    inventorImage: "/assets/images/inventors/Friedrich-Sertürner .jpg",
    inventionImage: "/assets/images/inventions/morphine.png",
    link: "/invention/morphine"
  }
];

// Array with less known invention data
const lessKnownInventions = [
  {
    name: "Haber-Bosch Process",
    year: "1909",
    category: "Science & Medicine",
    inventors: ["Fritz Haber", "Carl Bosch"],
    inventorImage: "/assets/images/inventors/lessknown/bosch-haber.webp",
    inventionImage: "/assets/images/inventions/lessknown/Haber-Bosch.png",
    description: "This breakthrough enabled the synthesis of ammonia from atmospheric nitrogen, revolutionizing agriculture by providing a reliable way to produce fertilizers on an industrial scale.",
    keyFacts: [
      "The process combines nitrogen from the air with hydrogen to form ammonia",
      "It operates under high pressure (200-300 atmospheres) and high temperature (400-500°C)",
      "Uses an iron catalyst to speed up the reaction"
    ],
    impact: "The Haber-Bosch process directly influenced global food production and supported rapid population growth in the 20th century. It's estimated that 40% of the world's population relies on food grown with fertilizers produced through this process.",
    inventorBio: "Fritz Haber (1868-1934) was a German chemist who received the Nobel Prize in Chemistry in 1918. Carl Bosch (1874-1940) was a German chemical engineer who industrialized the process and received the Nobel Prize in 1931."
  },
  {
    name: "Anti-lock Braking System (ABS)",
    year: "1978",
    category: "Engineering & Technology",
    inventors: ["Bosch Engineers"],
    inventorImage: "/assets/images/inventors/lessknown/bosch-engineers.jpg", 
    inventionImage: "/assets/images/inventions/lessknown/ABS.jpg",
    description: "ABS is a critical automotive safety innovation that prevents wheel lock-up during braking, improving vehicle control and reducing accidents.",
    keyFacts: [
      "First introduced in production vehicles by Mercedes-Benz in 1978",
      "Uses speed sensors on each wheel to detect lock-up",
      "Computer controls modulate brake pressure multiple times per second"
    ],
    impact: "ABS has become standard equipment in most vehicles worldwide, significantly reducing road accidents and setting the foundation for other advanced driver assistance systems like stability control and traction control.",
    inventorBio: "The modern ABS system was developed by a team at Bosch led by engineers such as Heinz Leiber, who built on earlier aircraft anti-skid systems from the 1950s."
  },
  {
    name: "Smartcard (Chip Card)",
    year: "1968",
    category: "Engineering & Technology",
    inventors: ["Jürgen Dethloff", "Helmut Gröttrup"],
    inventorImage: "/assets/images/inventors/lessknown/dethloff-grottrup.jpg",
    inventionImage: "/assets/images/inventions/lessknown/smart-card.jpg",
    description: "The smartcard is a secure microprocessor-based card used worldwide in banking, identification, and public transport systems.",
    keyFacts: [
      "Contains a secure integrated circuit for storing and processing data",
      "Provides advanced security features like encryption and secure authentication",
      "First patented in 1968, but widely adopted in the 1980s"
    ],
    impact: "Smartcard technology underpins secure transactions and data storage in countless applications, from credit cards to SIM cards in phones and secure ID documents, creating a global standard for secure portable data.",
    inventorBio: "Jürgen Dethloff and Helmut Gröttrup filed their patent for the 'identification switch' in 1968, which evolved into the modern smartcard. Gröttrup was also a rocket scientist who previously worked with Wernher von Braun."
  },
  {
    name: "Otto Engine (4-Stroke Combustion Engine)",
    year: "1876",
    category: "Engineering & Technology",
    inventors: ["Nikolaus Otto"],
    inventorImage: "/assets/images/inventors/lessknown/Nikolaus-otto.png",
    inventionImage: "/assets/images/inventions/lessknown/otto-engine.jpg",
    description: "The Otto Engine established the foundation for modern internal combustion engines using a four-stroke cycle, dramatically improving efficiency and reliability.",
    keyFacts: [
      "First practical, efficient alternative to the steam engine",
      "Four-stroke cycle: intake, compression, power, exhaust",
      "Patent granted in 1876, though concepts were developed earlier"
    ],
    impact: "The Otto cycle became the foundation for nearly all automobile engines. It enabled personal transportation and revolutionized industries worldwide, becoming one of the most influential mechanical innovations in history.",
    inventorBio: "Nikolaus Otto (1832-1891) was a German engineer who, despite having no formal engineering education, developed the first practical four-stroke internal combustion engine. His invention was initially used for stationary industrial applications."
  },
  {
    name: "Coffee Filter",
    year: "1908",
    category: "Everyday Life & Media",
    inventors: ["Melitta Bentz"],
    inventorImage: "/assets/images/inventors/lessknown/melitta-bentz.jpg",
    inventionImage: "/assets/images/inventions/lessknown/coffee-filter.avif",
    description: "Melitta Bentz invented the paper coffee filter, revolutionizing coffee preparation by creating a simple method to brew coffee without grounds in the cup.",
    keyFacts: [
      "Created by puncturing holes in a brass pot and using blotting paper from her son's school notebook",
      "Patent granted in 1908",
      "Founded Melitta company which still operates today"
    ],
    impact: "The paper coffee filter transformed how coffee is brewed worldwide, creating cleaner, less bitter coffee that was easier to prepare. This simple invention launched a global company and established the pour-over method still popular today.",
    inventorBio: "Melitta Bentz (1873-1950) was a German entrepreneur who sought to improve the coffee experience. Frustrated with the bitter taste and grounds in her coffee, she experimented with various filtering methods until developing her successful paper filter system."
  },
  {
    name: "Modern Rockets (V-2)",
    year: "1942",
    category: "Engineering & Technology",
    inventors: ["Wernher von Braun"],
    inventorImage: "/assets/images/inventors/lessknown/Wernher-von-Braun.jpg",
    inventionImage: "/assets/images/inventions/lessknown/Rocket-technology.webp",
    description: "The V-2 was the world's first long-range ballistic missile and first object to reach space, laying the groundwork for modern rockets and space exploration.",
    keyFacts: [
      "First human-made object to cross the boundary of space (80 km)",
      "Liquid-fueled rocket with sophisticated guidance systems",
      "Reaching speeds of over 5,800 km/h (3,600 mph)"
    ],
    impact: "Despite its devastating wartime use, the V-2's technology directly informed post-war space programs worldwide. The designs and principles developed for the V-2 became fundamental to the rockets that later launched satellites and humans into space.",
    inventorBio: "Wernher von Braun (1912-1977) was a German-American aerospace engineer who led the V-2 rocket program during WWII. After the war, he was brought to the United States where he became a pioneer of rocket technology and space science for NASA."
  },
  {
    name: "Kindergarten",
    year: "1837",
    category: "Everyday Life & Media",
    inventors: ["Friedrich Fröbel"],
    inventorImage: "/assets/images/inventors/lessknown/Frederick-Froebel.jpeg",
    inventionImage: "/assets/images/inventions/lessknown/kindergarten.jpg",
    description: "Friedrich Fröbel invented kindergarten as a comprehensive educational approach for young children, focusing on play-based learning and development.",
    keyFacts: [
      "The term 'kindergarten' (children's garden) reflects Fröbel's view of nurturing children's growth",
      "Introduced educational toys called 'Fröbel's gifts'",
      "Emphasized learning through guided play rather than formal instruction"
    ],
    impact: "Kindergarten revolutionized early childhood education worldwide. Fröbel's approach recognized the importance of early development and established a model that balances structured learning with creative play, influencing educational systems globally.",
    inventorBio: "Friedrich Fröbel (1782-1852) was a German educator who believed in the importance of early childhood development. His educational philosophy emphasized self-activity, creativity, social participation, and motor expression as essential components of early learning."
  },
  {
    name: "Autobahn (Modern Highway System)",
    year: "1913",
    category: "Engineering & Technology",
    inventors: ["AVUS Project Engineers"],
    inventorImage: "/assets/images/inventors/lessknown/avus-engineers.jpg",
    inventionImage: "/assets/images/inventions/lessknown/autobahn.webp",
    description: "The German Autobahn pioneered the concept of high-speed, limited-access highways with separated lanes, becoming the model for modern freeway systems worldwide.",
    keyFacts: [
      "First section (AVUS) opened in 1921 as a race and testing track",
      "First public Autobahn opened in 1932 between Cologne and Bonn",
      "Features included multiple lanes, grade separation, and limited access"
    ],
    impact: "The Autobahn concept revolutionized road transport by enabling faster, safer long-distance travel. Its design principles were adopted globally, influencing systems like the American Interstate Highway System and facilitating the growth of automobile-based transportation.",
    inventorBio: "The Autobahn concept developed through multiple engineers and planners. The Association for the Preparation of an Automobile Road (AVUS) laid groundwork in 1909, while engineers like Fritz Todt later expanded the system into a national network."
  },
  {
    name: "Passive House Standard",
    year: "1990",
    category: "Green Technology",
    inventors: ["Wolfgang Feist", "Bo Adamson"],
    inventorImage: "/assets/images/inventors/lessknown/wolfgang-feist.jpg",
    inventionImage: "/assets/images/inventions/lessknown/passive-house-standard.avif",
    description: "The Passive House (Passivhaus) standard is a rigorous, voluntary energy efficiency building standard that dramatically reduces energy consumption while maintaining exceptional comfort.",
    keyFacts: [
      "Buildings require approximately 90% less energy than conventional buildings",
      "Uses super-insulation, airtight construction, and heat recovery ventilation",
      "First Passive House built in Darmstadt, Germany in 1991"
    ],
    impact: "The Passive House standard has transformed green building worldwide, providing a practical pathway to ultra-low energy buildings. It has been adopted internationally and demonstrates that dramatic energy reductions are possible with existing technology.",
    inventorBio: "Dr. Wolfgang Feist is a German physicist who, along with Swedish professor Bo Adamson, developed the Passive House concept. Feist founded the Passive House Institute and continues to advance energy-efficient building practices globally."
  }
];

export default function InventionsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = ['all', 'Science & Medicine', 'Engineering & Technology', 'Everyday Life & Media', 'Green Technology'];

  // Check if an image exists
  const checkImageExists = (url) => {
    // These are known to be missing based on 404 errors
    const missingImages = [
      '/assets/images/inventors/lessknown/bosch-haber.webp',
      '/assets/images/inventors/lessknown/bosch-engineers.jpg',
      '/assets/images/inventors/lessknown/dethloff-grottrup.jpg',
      '/assets/images/inventors/lessknown/avus-engineers.jpg',
      '/assets/images/inventors/lessknown/wolfgang-feist.jpg'
    ];
    
    return !missingImages.includes(url);
  };

  // Add hasInventorImage property to each invention
  const processedLessKnown = lessKnownInventions.map(invention => ({
    ...invention,
    hasInventorImage: invention.inventorImage && checkImageExists(invention.inventorImage)
  }));

  // Filter inventions based on active category, and sort by those with images first
  const filteredLessKnown = (activeCategory === 'all' 
    ? processedLessKnown 
    : processedLessKnown.filter(invention => invention.category === activeCategory)
  ).sort((a, b) => {
    // Sort by inventor image availability (those with images first)
    if (a.hasInventorImage && !b.hasInventorImage) return -1;
    if (!a.hasInventorImage && b.hasInventorImage) return 1;
    return 0;
  });

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-indigo-50 pt-28 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal effect="fade" direction="up">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
              German Inventions & Inventors
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover the revolutionary German inventions and the brilliant minds behind them that changed the course of history.
            </p>
          </div>
        </ScrollReveal>

        {/* Famous Inventions Section */}
        <div className="mb-20">
          <ScrollReveal effect="fade" direction="up">
            <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center">
              <span className="inline-block relative">
                Famous German Inventions
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              </span>
            </h2>
          </ScrollReveal>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {inventions.map((invention, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="relative h-56 bg-indigo-100 overflow-hidden">
                  <img 
                    src={invention.inventionImage} 
                    alt={invention.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-indigo-900">{invention.name}</h3>
                    <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                      {invention.year}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {invention.description}
                  </p>
                  
                  <div className="flex items-center mt-6 pb-2">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-200">
                      <img 
                        src={invention.inventorImage} 
                        alt={invention.inventor}
                        className="w-full h-full object-contain bg-indigo-50"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-indigo-800">{invention.inventor}</p>
                      <p className="text-sm text-gray-500">Inventor</p>
                    </div>
                  </div>
                  
                  <Link href={invention.link} className="mt-4 block w-full py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Less Known Inventions Section */}
        <div className="mt-20">
          <ScrollReveal effect="fade" direction="up">
            <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center">
              <span className="inline-block relative">
                Less Known German Innovations
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              </span>
            </h2>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto text-center mb-8">
              Discover the lesser-known but equally influential German innovations that have transformed our world.
            </p>
          </ScrollReveal>

          {/* Category Filter */}
          <FadeInSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-indigo-700 hover:bg-indigo-100'
                  }`}
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                >
                  {category === 'all' ? 'All Categories' : category}
                </motion.button>
              ))}
            </div>
          </FadeInSection>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            key={activeCategory} // Remount the component when category changes for animation
          >
            {filteredLessKnown.map((invention, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="flex flex-col">
                  {invention.inventionImage && (
                    <div className="w-full h-72 sm:h-80 relative">
                      <img 
                        src={invention.inventionImage} 
                        alt={invention.name}
                        className="w-full h-full object-contain bg-indigo-50 p-2"
                      />
                      <div className="absolute top-0 right-0 bg-indigo-800 text-white text-xs px-2 py-1 rounded-bl-md">
                        {invention.category}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-indigo-900">{invention.name}</h3>
                      <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                        {invention.year}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {invention.description}
                    </p>

                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h4 className="font-semibold text-indigo-800 mb-2">Key Facts:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        {invention.keyFacts.map((fact, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                          >
                            {fact}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="font-semibold text-indigo-800 mb-2">Historical Impact:</h4>
                      <p className="text-gray-600">{invention.impact}</p>
                    </motion.div>
                    
                    <motion.div 
                      className="mt-6 pb-4 border-t border-gray-100 pt-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center">
                        {invention.hasInventorImage && (
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-200 mr-4 flex-shrink-0">
                            <img 
                              src={invention.inventorImage} 
                              alt={invention.inventors.join(', ')}
                              className="w-full h-full object-contain bg-indigo-50"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-indigo-800 text-lg">{invention.inventors.join(', ')}</p>
                          <p className="text-sm text-gray-500">Inventor{invention.inventors.length > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Back to top button with animation */}
      <ScrollReveal>
        <div className="fixed bottom-6 right-6 z-50">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, backgroundColor: '#4338ca' }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </div>
      </ScrollReveal>
    </motion.div>
  );
} 