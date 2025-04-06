'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Question types
export interface BaseQuestion {
  id: number;
  type: 'text' | 'image' | 'gk';
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
}

export interface GKQuestion extends BaseQuestion {
  type: 'gk';
  hint: string;
}

export interface ImageQuestion extends BaseQuestion {
  type: 'image';
  imageUrl: string;
  hint?: string;
}

export type Question = TextQuestion | ImageQuestion | GKQuestion;

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  timeLeft: number;
}

// Default image path if none is available
const FALLBACK_IMAGE = '/assets/svg/pattern-grid.svg';

const QuizQuestion = ({ question, onAnswer, timeLeft }: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setHasAnswered(false);
    setImageError(false);
    setShowHint(false);
    
    // Debug log to check image URL
    if (question.type === 'image') {
      console.log(`Loading image: ${(question as ImageQuestion).imageUrl}`);
    }
  }, [question]);
  
  const handleOptionSelect = (option: string) => {
    if (hasAnswered) return;
    
    setSelectedOption(option);
    setHasAnswered(true);
    
    // Slight delay before moving to next question
    setTimeout(() => {
      onAnswer(option);
    }, 1000);
  };
  
  const getOptionClassName = (option: string) => {
    if (!hasAnswered) {
      return selectedOption === option 
        ? 'border-indigo-300 bg-indigo-50 shadow-md' 
        : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50';
    }
    
    if (option === question.correctAnswer && hasAnswered) {
      return 'border-green-300 bg-green-50 shadow-md';
    }
    
    if (selectedOption === option && option !== question.correctAnswer) {
      return 'border-red-300 bg-red-50 shadow-md';
    }
    
    return 'border-gray-200 opacity-60';
  };
  
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>
        
        {/* Image display for image questions with fallback */}
        {question.type === 'image' && (
          <motion.div 
            className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6 shadow-md bg-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {imageError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-50">
                <div className="text-center p-6">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-gray-500 font-medium">Image Not Available</p>
                  <p className="text-gray-400 text-sm mt-2">Please answer based on the question</p>
                </div>
                <Image
                  src={FALLBACK_IMAGE}
                  alt="Background pattern"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover opacity-10"
                  priority
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={(question as ImageQuestion).imageUrl}
                  alt="Quiz question image"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain"
                  priority
                  onError={() => {
                    console.error(`Failed to load image: ${(question as ImageQuestion).imageUrl}`);
                    setImageError(true);
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
        
        {/* Hint button for GK questions or image questions with hints */}
        {((question.type === 'gk' && question.hint) || 
          (question.type === 'image' && (question as ImageQuestion).hint)) && (
          <div className="mb-4">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            
            {showHint && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 p-3 bg-indigo-50 rounded-md text-indigo-700 text-sm"
              >
                <span className="font-medium">Hint:</span> {
                  question.type === 'gk' 
                    ? question.hint 
                    : (question as ImageQuestion).hint
                }
              </motion.div>
            )}
          </div>
        )}
        
        {/* Timer Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200" 
                strokeWidth="8" 
                stroke="currentColor" 
                fill="transparent" 
                r="42" 
                cx="50" 
                cy="50" 
              />
              <motion.circle 
                className="text-indigo-600" 
                strokeWidth="8" 
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="42" 
                cx="50" 
                cy="50" 
                initial={{ strokeDasharray: 264, strokeDashoffset: 0 }}
                animate={{ 
                  strokeDashoffset: 264 - (timeLeft / 15) * 264
                }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-lg font-bold text-indigo-700">{timeLeft}</span>
            </div>
          </div>
        </div>
        
        {/* Options list */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            // Only show correct/incorrect styling after user has answered
            const isSelected = selectedOption === option;
            const isCorrect = option === question.correctAnswer && hasAnswered;
            const isIncorrect = isSelected && option !== question.correctAnswer && hasAnswered;
            
            return (
              <motion.button
                key={option}
                className={`w-full text-left p-4 border rounded-lg transition-all ${getOptionClassName(option)}`}
                onClick={() => handleOptionSelect(option)}
                disabled={hasAnswered}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: index * 0.1 + 0.2,
                    duration: 0.3
                  }
                }}
                whileHover={!hasAnswered ? { 
                  scale: 1.02,
                  borderColor: '#818cf8',
                  backgroundColor: '#eef2ff',
                  transition: { duration: 0.2 }
                } : undefined}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors ${
                    isCorrect
                      ? 'bg-green-100 text-green-700'
                      : isIncorrect
                      ? 'bg-red-100 text-red-700'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    <span className="font-medium">{String.fromCharCode(97 + index)})</span>
                  </div>
                  <span className="font-medium text-gray-800">{option}</span>
                  
                  {/* Correct/incorrect indicators - only show after user has answered */}
                  {isCorrect && hasAnswered && (
                    <motion.div 
                      className="ml-auto" 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                  
                  {isIncorrect && hasAnswered && (
                    <motion.div 
                      className="ml-auto" 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
        
        {/* Quick timer pulse effect */}
        {timeLeft <= 5 && (
          <motion.div 
            className="fixed inset-0 pointer-events-none bg-red-500/5 z-0"
            animate={{ 
              opacity: [0, 1, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 0.8,
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default QuizQuestion; 