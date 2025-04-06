'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: '3D Gallery', path: '/gallery' },
    { name: 'Inventions', path: '/inventions' },
    { name: 'Nobel Laureates', path: '/nobel-laureates' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'About', path: '/about' },
  ];
  
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="container mx-auto py-8 px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="md:max-w-xs">
            <motion.div 
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              German<span className="text-indigo-300">Innovations</span>
            </motion.div>
            <motion.p 
              className="text-indigo-200 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Exploring Germany's rich history of invention and innovation.
            </motion.p>
          </div>
          
          <div>
            <motion.h3 
              className="text-lg font-semibold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Navigation
            </motion.h3>
            <motion.div 
              className="grid grid-cols-2 gap-x-8 gap-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {navItems.map((item, index) => (
                <div key={item.name}>
                  <Link href={item.path} className="text-indigo-200 hover:text-white transition-colors duration-300 text-sm">
                    {item.name}
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="border-t border-indigo-800 mt-6 pt-4 text-center text-indigo-300 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>© {currentYear} GermanInnovations. All rights reserved. Made by Shashwat Singh</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 