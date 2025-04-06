'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  
  // Add blur effect on scroll
  const { scrollY } = useScroll();
  const blurValue = useTransform(scrollY, [0, 100], [0, 8]);
  const opacityValue = useTransform(scrollY, [0, 100], [0, 0.95]);
  
  // Check if we're on an invention page (Learn More page)
  const isInventionPage = pathname.includes('/invention/');
  
  // Pages that need a dark header background when not scrolled
  const needsDarkBg = isInventionPage || 
                      pathname === '/quiz' || 
                      pathname === '/inventions' ||
                      pathname === '/nobel-laureates' ||
                      pathname === '/about';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Get current active nav item index
  useEffect(() => {
    const index = navItems.findIndex(item => item.path === pathname);
    setActiveIndex(index !== -1 ? index : null);
  }, [pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: '3D Gallery', path: '/gallery' },
    { name: 'Inventions', path: '/inventions' },
    { name: 'Nobel Laureates', path: '/nobel-laureates' },
    { name: 'About', path: '/about' },
    { name: 'Quiz', path: '/quiz', special: true },
  ];

  // Determine the header background class based on scroll state and current page
  const headerBgClass = isScrolled 
    ? 'bg-white/90 shadow-lg py-3 border-b border-gray-100' 
    : needsDarkBg
      ? 'bg-indigo-900/90 py-4 shadow-md' // Use dark background on pages that need it
      : 'bg-transparent py-5';
  
  // Determine text color classes
  const logoTextClass = isScrolled 
    ? 'text-indigo-700' 
    : isInventionPage || pathname === '/quiz'
      ? 'text-white' 
      : 'text-white';
  
  const navLinkClass = isScrolled 
    ? 'text-gray-700 hover:text-indigo-700' 
    : isInventionPage || pathname === '/quiz'
      ? 'text-white hover:text-indigo-200'
      : 'text-white hover:text-white';
  
  const navIndicatorClass = isScrolled 
    ? 'bg-indigo-50 border border-indigo-100' 
    : 'bg-white/10';
  
  const ctaButtonClass = isScrolled 
    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white' 
    : 'bg-white/15 text-white hover:bg-white/25';
    
  // Logo animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Navigation link animations
  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };
  
  const navItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Mobile menu variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: { 
      opacity: 1, 
      height: 'auto', 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Glow overlay effect on hover for active nav item
  const glowVariants = {
    inactive: { 
      opacity: 0,
      scale: 0.8
    },
    active: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBgClass}`}
      style={{ 
        backdropFilter: `blur(${isScrolled ? blurValue.get() : 0}px)`,
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none'
      }}
    >
      <motion.div 
        className="container mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div 
              className="flex items-center"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="flex items-center">
                <div className="mr-2.5 relative">
                  <motion.div 
                    className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md"
                    whileHover={{ 
                      scale: 1.12, 
                      rotate: 5,
                      boxShadow: "0 0 25px rgba(79, 70, 229, 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-white font-bold text-lg">G</span>
                    
                    {/* Add subtle glow effect */}
                    <motion.div 
                      className="absolute inset-0 rounded-lg bg-indigo-500/30 blur-md z-0"
                      animate={{ 
                        opacity: [0.5, 0.8, 0.5],
                        scale: [0.8, 1.1, 0.8]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <div className="flex space-x-1">
                    <motion.span 
                      className={`text-xl font-bold leading-none ${logoTextClass}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      German
                    </motion.span>
                    <motion.span 
                      className={`text-xl font-bold leading-none text-transparent bg-clip-text bg-gradient-to-r ${isScrolled ? 'from-indigo-600 to-violet-600' : 'from-indigo-300 to-violet-300'}`}
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ 
                        duration: 10, 
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      Innovations
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-1.5"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <Link 
                key={item.name} 
                href={item.path}
              >
                <motion.div
                  className={`
                    relative px-3 py-2 rounded-lg flex items-center justify-center
                    ${item.special 
                      ? isScrolled 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-5 shadow-md' 
                        : 'bg-indigo-600/90 text-white font-semibold px-5 shadow-md backdrop-blur-sm' 
                      : navLinkClass
                    } 
                    font-medium transition-all duration-200
                    overflow-hidden
                  `}
                  variants={navItemVariants}
                  whileHover={{ 
                    scale: item.special ? 1.08 : 1.05, 
                    transition: { duration: 0.2 }
                  }}
                  onHoverStart={() => setActiveIndex(index)}
                  onHoverEnd={() => setActiveIndex(null)}
                >
                  <span className="relative z-10 text-sm">
                    {item.name}
                  </span>
                  
                  {/* Active indicator */}
                  {pathname === item.path && !item.special && (
                    <motion.div
                      className={`absolute inset-0 rounded-lg ${navIndicatorClass}`}
                      layoutId="navbar-indicator"
                      style={{ zIndex: 0 }}
                      initial={{ borderRadius: 8 }}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  {!item.special && (
                    <motion.div
                      className={`absolute inset-0 rounded-lg bg-indigo-100/80 ${isScrolled ? 'bg-indigo-100/80' : 'bg-white/20'}`}
                      variants={glowVariants}
                      initial="inactive"
                      animate={activeIndex === index && pathname !== item.path ? "active" : "inactive"}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  
                  {/* Special glow effect for quiz */}
                  {item.special && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-lg"
                      animate={{ 
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 2,
                      }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </motion.nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              className={`p-2 rounded-lg focus:outline-none ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <motion.nav 
                className="flex flex-col space-y-2"
                variants={navContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {navItems.map((item, index) => (
                  <Link 
                    key={item.name} 
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <motion.div
                      className={`px-4 py-3 rounded-lg transition-all duration-200 
                        ${pathname === item.path 
                          ? 'bg-indigo-50 text-indigo-700 font-medium' 
                          : item.special
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md'
                            : 'text-gray-700 hover:bg-gray-50'
                        } flex items-center`}
                      variants={navItemVariants}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                      {item.special && (
                        <span className="ml-2 inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800">
                          Quiz
                        </span>
                      )}
                      
                      {/* Arrow indicator */}
                      {pathname === item.path && (
                        <motion.svg 
                          className="w-4 h-4 ml-auto" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      )}
                    </motion.div>
                  </Link>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header; 