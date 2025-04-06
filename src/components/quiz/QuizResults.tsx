'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  answers: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
  }[];
  onRestartQuiz: () => void;
}

const QuizResults = ({ score, totalQuestions, answers, onRestartQuiz }: QuizResultsProps) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [error, setError] = useState(false);
  
  // Validate props to prevent rendering errors
  useEffect(() => {
    try {
      if (isNaN(score) || score < 0 || isNaN(totalQuestions) || totalQuestions <= 0 || !Array.isArray(answers)) {
        console.error("Invalid quiz results data", { score, totalQuestions, answersLength: answers?.length });
        setError(true);
      }
    } catch (err) {
      console.error("Error in QuizResults component:", err);
      setError(true);
    }
  }, [score, totalQuestions, answers]);
  
  // Calculate percentage score
  const percentage = !error ? Math.round((score / totalQuestions) * 100) : 0;
  
  // Determine feedback based on score percentage
  const getFeedback = () => {
    if (percentage >= 90) {
      return {
        emoji: "🏆",
        title: "Excellent!",
        message: "You're a German Innovation Expert! Outstanding knowledge of German inventions and their history.",
      };
    } else if (percentage >= 70) {
      return {
        emoji: "🎓",
        title: "Great Job!",
        message: "You have impressive knowledge about German innovations. Just a few details to master!",
      };
    } else if (percentage >= 50) {
      return {
        emoji: "👍",
        title: "Good Effort!",
        message: "You know quite a bit about German inventions! A few more details to learn.",
      };
    } else {
      return {
        emoji: "📚",
        title: "Keep Learning!",
        message: "There's more to discover about German innovations. Explore the website to learn more!",
      };
    }
  };
  
  const feedback = getFeedback();
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't display your quiz results properly. Please try again.</p>
          <button
            onClick={onRestartQuiz}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100"
      >
        {/* Top score section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                delay: 0.2 
              }}
              className="text-6xl mb-4"
            >
              {feedback.emoji}
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {feedback.title}
            </motion.h2>
            
            <motion.div
              className="flex justify-center items-center gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="text-5xl font-bold">{score}</div>
              <div className="text-2xl font-light opacity-80">/ {totalQuestions}</div>
            </motion.div>
            
            <motion.div 
              className="w-full max-w-xs mx-auto h-3 bg-white/30 rounded-full overflow-hidden mb-4"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.div 
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.div>
            
            <motion.p
              className="text-lg text-white/90 max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {feedback.message}
            </motion.p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              onClick={onRestartQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              Try Again
            </motion.button>
            
            <motion.button
              onClick={() => setShowAnswers(!showAnswers)}
              className="px-6 py-3 bg-white border border-indigo-200 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              {showAnswers ? "Hide Answers" : "Review Answers"}
            </motion.button>
            
            <Link href="/inventions" passHref>
              <motion.button
                className="px-6 py-3 bg-white border border-indigo-200 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                Explore Inventions
              </motion.button>
            </Link>
          </div>
        </div>
        
        {/* Answers section */}
        {showAnswers && answers.length > 0 && (
          <motion.div 
            className="p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Answers</h3>
            
            <div className="space-y-4">
              {answers.map((answer, index) => (
                <motion.div 
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        {index + 1}. {answer.question}
                      </h4>
                      
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center">
                          <div className="w-20 text-sm font-semibold text-gray-500">Your answer:</div>
                          <div className={`flex items-center ${answer.userAnswer === answer.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                            <span className="mr-2">{answer.userAnswer}</span>
                            {answer.userAnswer === answer.correctAnswer ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </div>
                        </div>
                        
                        {answer.userAnswer !== answer.correctAnswer && (
                          <div className="flex items-center">
                            <div className="w-20 text-sm font-semibold text-gray-500">Correct:</div>
                            <div className="text-green-600">{answer.correctAnswer}</div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      answer.userAnswer === answer.correctAnswer 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {answer.userAnswer === answer.correctAnswer ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizResults; 