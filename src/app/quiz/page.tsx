'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import Einstein from '@/components/Einstein';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const questions = [
  {
    question: 'Wat is een wachtwoord?',
    options: [
      'Een geheim woord of zin om toegang te krijgen',
      'Een computerprogramma',
      'Een soort virus',
      'Een website'
    ],
    correctAnswer: 0
  },
  {
    question: 'Wat is phishing?',
    options: [
      'Een soort vis',
      'Een manier om mensen te misleiden via e-mail of websites',
      'Een computerprogramma',
      'Een soort virus'
    ],
    correctAnswer: 1
  },
  {
    question: 'Wat is een firewall?',
    options: [
      'Een muur van vuur',
      'Een beveiligingssysteem dat je computer beschermt',
      'Een soort virus',
      'Een website'
    ],
    correctAnswer: 1
  },
  {
    question: 'Wat is encryptie?',
    options: [
      'Een soort virus',
      'Een website',
      'Het versleutelen van informatie zodat alleen de juiste mensen het kunnen lezen',
      'Een computerprogramma'
    ],
    correctAnswer: 2
  },
  {
    question: 'Wat is een virus?',
    options: [
      'Een ziekte',
      'Een website',
      'Een computerprogramma',
      'Een schadelijk programma dat je computer kan beschadigen'
    ],
    correctAnswer: 3
  }
];

export default function Quiz() {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizComplete(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {t('back')}
          </Link>
          {!quizComplete && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('question')} {currentQuestion + 1} {t('of')} {questions.length}
            </div>
          )}
        </div>

        <Einstein
          message={quizComplete 
            ? `${t('quizComplete')} ${t('yourScore')}: ${score} ${t('outOf')} ${questions.length} ${t('questions')}!`
            : t('quizTitle')
          }
          isThinking={!quizComplete}
          mood={quizComplete ? (score > questions.length / 2 ? 'happy' : 'neutral') : 'thinking'}
        />

        {!quizComplete ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    onClick={() => !showFeedback && handleAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg transition-colors ${
                      selectedAnswer === index
                        ? isCorrect
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                    disabled={showFeedback}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex justify-end"
                >
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {currentQuestion < questions.length - 1 ? t('next') : t('seeResults')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              {t('quizComplete')}
            </h2>
            <p className="text-lg mb-6">
              {t('yourScore')}: {score} {t('outOf')} {questions.length} {t('questions')}
            </p>
            <div className="space-x-4">
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t('tryAgain')}
              </button>
              <Link
                href="/"
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors inline-block"
              >
                {t('back')}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
} 