'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface QuizIntroProps {
  onStartQuiz: () => void;
}

const QuizIntro = ({ onStartQuiz }: QuizIntroProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-indigo-100"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-10 px-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-lg"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              German Quiz Challenge
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Test your knowledge of German culture, history, and innovations!
            </motion.p>
          </div>
        </div>
        
        {/* Quiz information */}
        <div className="p-8 md:p-10 bg-gradient-to-b from-white/80 to-white/95">
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-4 relative inline-block">
                How It Works
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              </h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start rounded-lg p-3 hover:bg-indigo-50/80 transition-colors">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center mt-0.5 mr-3 shadow-md">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <span>15 questions about German inventions, culture, and general knowledge</span>
                </li>
                <li className="flex items-start rounded-lg p-3 hover:bg-indigo-50/80 transition-colors">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center mt-0.5 mr-3 shadow-md">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <span>15 seconds to answer each question</span>
                </li>
                <li className="flex items-start rounded-lg p-3 hover:bg-indigo-50/80 transition-colors">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center mt-0.5 mr-3 shadow-md">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <span>See your results at the end</span>
                </li>
                <li className="flex items-start rounded-lg p-3 hover:bg-indigo-50/80 transition-colors">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-7 h-7 flex items-center justify-center mt-0.5 mr-3 shadow-md">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <span>Some questions include helpful hints</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-4 relative inline-block">
                What To Expect
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></span>
              </h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start rounded-lg p-3 hover:bg-indigo-50/80 transition-colors">
                  <div className="text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span>Questions about famous German inventions</span>
                </li>
                <li className="flex items-start rounded-lg p-3 hover:bg-indigo-50/80 transition-colors">
                  <div className="text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <span>German history and cultural trivia</span>
                </li>
                <li className="flex items-start rounded-lg p-3 hover:bg-indigo-50/80 transition-colors">
                  <div className="text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>Image-based questions to identify inventions</span>
                </li>
                <li className="flex items-start rounded-lg p-3 hover:bg-indigo-50/80 transition-colors">
                  <div className="text-indigo-600 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <span>Fascinating facts about German achievements</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              onClick={onStartQuiz}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
            >
              Start Quiz
            </button>
            <p className="mt-4 text-gray-500 text-sm">Ready to test your knowledge of Germany?</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizIntro; 