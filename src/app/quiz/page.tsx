'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { inventions } from '@/data/inventions';
import QuizQuestion, { Question, TextQuestion, ImageQuestion, GKQuestion } from '../../components/quiz/QuizQuestion';
import QuizResults from '../../components/quiz/QuizResults';
import QuizIntro from '../../components/quiz/QuizIntro';
import Image from 'next/image';

// Create GK questions about Germany 
const germanGKQuestions: GKQuestion[] = [
  {
    id: 1001,
    type: 'gk',
    question: 'Which famous wall divided East and West Berlin until 1989?',
    options: ['The Great Wall', 'The Berlin Wall', 'The Iron Curtain', 'The German Wall'],
    correctAnswer: 'The Berlin Wall',
    hint: 'Cold War symbol.'
  },
  {
    id: 1002,
    type: 'gk',
    question: 'What is the name of the famous German festival known for beer and traditional clothing?',
    options: ['Oktoberfest', 'Beerfest', 'Springfest', 'Autoberfest'],
    correctAnswer: 'Oktoberfest',
    hint: 'Celebrated in Munich.'
  },
  {
    id: 1003,
    type: 'gk',
    question: 'Which city was divided among four Allied powers after WW2?',
    options: ['Munich', 'Berlin', 'Cologne', 'Dresden'],
    correctAnswer: 'Berlin',
    hint: 'Same city where the famous wall was.'
  },
  {
    id: 1004,
    type: 'gk',
    question: 'What colors are on the German flag?',
    options: ['Red, white, blue', 'Green, white, black', 'Black, red, gold', 'Blue, red, yellow'],
    correctAnswer: 'Black, red, gold',
    hint: 'Think horizontal stripes.'
  },
  {
    id: 1005,
    type: 'gk',
    question: 'What is the currency of Germany?',
    options: ['Deutsche Mark', 'Franc', 'Euro', 'Krona'],
    correctAnswer: 'Euro',
    hint: 'Common in many EU countries.'
  },
  {
    id: 1006,
    type: 'gk',
    question: 'Which German city is famous for its automobile industry and is home to Mercedes-Benz and Porsche?',
    options: ['Stuttgart', 'Frankfurt', 'Leipzig', 'Bremen'],
    correctAnswer: 'Stuttgart',
    hint: 'Car capital of Germany.'
  },
  {
    id: 1007,
    type: 'gk',
    question: 'Which treaty ended World War I and placed heavy reparations on Germany?',
    options: ['Treaty of Berlin', 'Treaty of Paris', 'Treaty of Versailles', 'Treaty of Munich'],
    correctAnswer: 'Treaty of Versailles',
    hint: 'We all studied this in 10th standard'
  },
  {
    id: 1008,
    type: 'gk',
    question: 'Who is the current (2025) Chancellor of Germany?',
    options: ['Olaf Scholz', 'Angela Merkel', 'Frank-Walter Steinmeier', 'Friedrich Merz'],
    correctAnswer: 'Olaf Scholz',
    hint: 'He succeeded Merkel.'
  },
  {
    id: 1009,
    type: 'gk',
    question: 'What is the name of the famous castle in Germany that inspired Disney\'s Cinderella Castle?',
    options: ['Heidelberg Castle', 'Hohenzollern Castle', 'Neuschwanstein Castle', 'Wartburg Castle'],
    correctAnswer: 'Neuschwanstein Castle',
    hint: 'Looks like a fairy tale dream.'
  },
  {
    id: 1010,
    type: 'gk',
    question: 'What was the name of the German air force during World War II?',
    options: ['Panzerwaffe', 'Luftwaffe', 'Wehrmacht', 'Kriegsmarine'],
    correctAnswer: 'Luftwaffe',
    hint: '"Luft" means air.'
  }
];

// Create quiz questions from inventions data
const generateQuizQuestions = (): Question[] => {
  try {
    // Shuffle array to get random inventions
    const shuffledInventions = [...inventions].sort(() => Math.random() - 0.5);
    
    // Get random GK questions
    const shuffledGKQuestions = [...germanGKQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    
    // Generate text questions about inventions (no years or true/false)
    const textQuestions: TextQuestion[] = shuffledInventions
      .filter(inv => inv.id !== 'morphine') // Exclude morphine
      .slice(0, 10)
      .map((invention, index): TextQuestion => { // Explicitly return TextQuestion type
        // Only create "who invented" and "category" questions
        const questionType = index % 2;
        let question: string;
        let options: string[];
        let correctAnswer: string;
        
        if (questionType === 0) { // "Who invented" questions
          question = `Who invented the ${invention.name}?`;
          options = [
            invention.inventor,
            ...shuffledInventions
              .filter(inv => inv.inventor !== invention.inventor)
              .slice(0, 3)
              .map(inv => inv.inventor)
          ].sort(() => Math.random() - 0.5);
          correctAnswer = invention.inventor;
        } else { // "What category" questions
          question = `What category does the ${invention.name} belong to?`;
          options = [
            invention.category,
            ...shuffledInventions
              .filter(inv => inv.category !== invention.category)
              .slice(0, 3)
              .map(inv => inv.category)
          ].sort(() => Math.random() - 0.5);
          correctAnswer = invention.category;
        }
        
        return {
          id: index,
          type: 'text',
          question,
          options,
          correctAnswer
        };
      })
      .slice(0, 5); // Only take 5 invention questions
    
    // Define known working image paths - using dedicated quiz directory with consistent naming
    const workingImages = [
      {
        id: 'automobile',
        path: '/assets/images/quiz/automobile.jpg'
      },
      {
        id: 'x-ray',
        path: '/assets/images/quiz/x-ray.jpg'
      },
      {
        id: 'diesel-engine',
        path: '/assets/images/quiz/diesel-engine.jpg'
      },
      {
        id: 'printing-press',
        path: '/assets/images/quiz/printing-press.jpg'
      },
      // New custom image questions
      {
        id: 'cinderella-castle',
        path: '/assets/images/quiz/cindrella.jpeg',
        customQuestion: 'Which fantasy folk tale featured this Neuschwanstein Castle?',
        options: ['Snow White', 'Cinderella', 'Sleeping Beauty', 'Rapunzel'],
        correctAnswer: 'Cinderella',
        hint: 'Glass Footwear'
      },
      {
        id: 'volkswagen',
        path: '/assets/images/quiz/volkswagen.jpeg',
        customQuestion: 'Which is the mother company of all these companies shown in the image?',
        options: ['BMW', 'Mercedes', 'Volkswagen', 'Audi'],
        correctAnswer: 'Volkswagen',
        hint: 'Logo contains two alphabets'
      }
    ];
    
    // List of invention IDs with verified working images
    const imageInventionIds = workingImages.map(img => img.id);
    
    console.log("Available image invention IDs:", imageInventionIds);
    
    // Generate questions for the standard invention images
    const inventionImageQuestions: ImageQuestion[] = shuffledInventions
      .filter(inv => {
        // Exclude morphine and any non-working images, also exclude aspirin and gramophone
        return inv.id !== 'morphine' && 
               inv.id !== 'aspirin' && 
               inv.id !== 'gramophone' && 
               imageInventionIds.includes(inv.id);
      })
      .slice(0, 3) // Only take 3 invention image questions, as we'll add 2 custom ones
      .map((invention, index) => {
        // Get correct image path from our verified list
        const imageInfo = workingImages.find(img => img.id === invention.id);
        
        // Use fallback pattern if image not found (should never happen due to the filter above)
        const imageUrl = imageInfo ? imageInfo.path : '/assets/svg/pattern-grid.svg';
        
        // Log the image path for debugging
        console.log(`Creating image question for ${invention.id} with image: ${imageUrl}`);
        
        return {
          id: 500 + index, // Use different ID range to avoid conflicts
          type: 'image',
          question: `What invention is shown in this image?`,
          imageUrl,
          options: [
            invention.name,
            ...shuffledInventions
              .filter(inv => inv.name !== invention.name)
              .slice(0, 3)
              .map(inv => inv.name)
          ].sort(() => Math.random() - 0.5),
          correctAnswer: invention.name
        };
      });
    
    // Generate custom image questions
    const customImageQuestions: ImageQuestion[] = workingImages
      .filter(img => img.customQuestion)
      .map((img, index) => {
        console.log(`Creating custom image question: ${img.customQuestion}`);
        
        return {
          id: 600 + index, // Use different ID range to avoid conflicts
          type: 'image',
          question: img.customQuestion || '',
          imageUrl: img.path,
          options: img.options || [],
          correctAnswer: img.correctAnswer || '',
          hint: img.hint
        };
      });
    
    // Combine all image questions
    const allImageQuestions = [...inventionImageQuestions, ...customImageQuestions];
    
    // First show text and GK questions, then image questions at the end
    const textAndGKQuestions = [...textQuestions, ...shuffledGKQuestions];
    textAndGKQuestions.sort(() => Math.random() - 0.5); // Shuffle the text and GK questions
    
    const allQuestions = [...textAndGKQuestions, ...allImageQuestions];
    
    // Make sure we have exactly 15 questions
    if (allQuestions.length > 15) {
      return allQuestions.slice(0, 15);
    }
    
    console.log(`Generated ${allQuestions.length} questions (${textQuestions.length} text, ${shuffledGKQuestions.length} GK, ${allImageQuestions.length} image)`);
    
    return allQuestions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    // Return a fallback set of questions
    return [
      {
        id: 0,
        type: 'text',
        question: 'Who invented the automobile?',
        options: ['Karl Benz', 'Rudolf Diesel', 'Werner von Siemens', 'Johannes Gutenberg'],
        correctAnswer: 'Karl Benz'
      },
      {
        id: 1001,
        type: 'gk',
        question: 'Which famous wall divided East and West Berlin until 1989?',
        options: ['The Great Wall', 'The Berlin Wall', 'The Iron Curtain', 'The German Wall'],
        correctAnswer: 'The Berlin Wall',
        hint: 'Cold War symbol.'
      }
    ];
  }
};

export default function QuizPage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string, userAnswer: string, correctAnswer: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Generate questions when quiz starts
  useEffect(() => {
    if (quizStarted) {
      setIsLoading(true);
      try {
        const generatedQuestions = generateQuizQuestions();
        setQuestions(generatedQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setAnswers([]);
        setTimeLeft(15);
        setQuizCompleted(false);
      } catch (error) {
        console.error("Error starting quiz:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [quizStarted]);
  
  // Handle answer selection
  const handleAnswer = useCallback((selectedAnswer: string) => {
    if (!questions.length || quizCompleted || currentQuestionIndex >= questions.length) return;
    
    try {
      const currentQuestion = questions[currentQuestionIndex];
      
      // Save the answer
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      
      setAnswers(prev => [
        ...prev, 
        {
          question: currentQuestion.question,
          userAnswer: selectedAnswer || 'No answer',
          correctAnswer: currentQuestion.correctAnswer
        }
      ]);
      
      // Move to next question or end quiz
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(15);
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setQuizCompleted(true);
      }
    } catch (error) {
      console.error("Error handling answer:", error);
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, questions, quizCompleted]);
  
  // Timer effect
  useEffect(() => {
    if (!quizStarted || quizCompleted || !questions.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up, go to next question
          handleAnswer('');
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [quizStarted, currentQuestionIndex, quizCompleted, questions.length, handleAnswer]);
  
  const restartQuiz = useCallback(() => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    const generatedQuestions = generateQuizQuestions();
    setQuestions(generatedQuestions);
    setTimeLeft(15);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-400 to-blue-100 relative overflow-hidden">
        {/* Darker overlay at the top for better navbar contrast */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-900 to-transparent z-0"></div>
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading quiz questions...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-indigo-800 via-purple-400 to-blue-100 relative overflow-hidden">
      {/* Background patterns and decorative elements */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/svg/pattern-grid.svg')] bg-repeat"></div>
      </div>
      {/* Darker overlay at the top for better navbar contrast */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-900 to-transparent z-0"></div>
      
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-300/20 rounded-full filter blur-[80px]"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-purple-300/20 rounded-full filter blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-300/20 rounded-full filter blur-[60px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {!quizStarted ? (
          <QuizIntro onStartQuiz={() => setQuizStarted(true)} />
        ) : quizCompleted ? (
          <QuizResults 
            score={score} 
            totalQuestions={questions.length} 
            answers={answers} 
            onRestartQuiz={restartQuiz} 
          />
        ) : questions.length > 0 && currentQuestionIndex < questions.length ? (
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-indigo-100">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6 text-white">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">German Quiz Challenge</h1>
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/15 rounded-full px-4 py-1 text-sm font-medium">
                        Question {currentQuestionIndex + 1}/{questions.length}
                      </div>
                      <div className="bg-white/15 rounded-full px-4 py-1 text-sm font-medium">
                        Score: {score}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <QuizQuestion 
                    question={questions[currentQuestionIndex]} 
                    onAnswer={handleAnswer}
                    timeLeft={timeLeft}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center p-8 bg-white/90 backdrop-blur-lg rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h2>
            <p className="mb-6">We encountered an issue with the quiz. Please try again.</p>
            <button 
              onClick={restartQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 