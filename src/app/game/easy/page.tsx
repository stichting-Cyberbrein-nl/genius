'use client';

import { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { useGameProgress } from '@/hooks/useGameProgress';
import EncryptionQuestion from '@/components/EncryptionQuestion';
import { useLanguage } from '@/lib/i18n';
import { useFlags } from '@/hooks/useFlags';
import { motion } from 'framer-motion';

// Vooraf gedefinieerde vragen
const questions = [
  // Caesar cipher vragen
  { type: 'caesar' as const, shift: 3, encryptedText: 'fbehueuhlq' }, // CYBERBREIN
  { type: 'rot13' as const, encryptedText: 'rvafgrva' }, // EINSTEIN
  { type: 'caesar' as const, shift: 5, encryptedText: 'mfhpxmnjqi' }, // HACKSHIELD
  { type: 'rot13' as const, encryptedText: 'cnffjbeq' },   // PASSWORD
  { type: 'caesar' as const, shift: 7, encryptedText: 'cpybz' },     // VIRUS
  { type: 'caesar' as const, shift: 13, encryptedText: 'unpxre' },     // HACKER
  { type: 'caesar' as const, shift: 11, encryptedText: 'rpytfd' },   // GENIUS
  { type: 'caesar' as const, shift: 1, encryptedText: 'fodszqujpo' },   // ENCRYPTION
  { type: 'caesar' as const, shift: 4, encryptedText: 'dbftbs' },   // CAESAR
  { type: 'rot13' as const, encryptedText: 'cuvfuvat' },   // PHISHING

  

];

export default function EasyGame() {
  const { getProgress, updateProgress } = useGameProgress();
  const { currentLevel, points } = getProgress('easy');
  const [currentQuestion, setCurrentQuestion] = useState(currentLevel - 1);
  const { t } = useLanguage();
  const { findFlag } = useFlags();
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagAwarded, setFlagAwarded] = useState(false);

  useEffect(() => {
    if (currentQuestion >= questions.length && !flagAwarded) {
      findFlag('easy_game_flag');
      setFlagAwarded(true);
      setShowFlagMessage(true);
      setTimeout(() => setShowFlagMessage(false), 3000);
    }
  }, [currentQuestion, findFlag, flagAwarded]);

  const handleCorrect = () => {
    const newPoints = points + 10; // 10 punten per correct antwoord
    const newLevel = currentLevel + 1;
    updateProgress('easy', newLevel, newPoints);
    setCurrentQuestion(prev => prev + 1);
  };

  return (
    <GameLayout
      difficulty="easy"
      currentLevel={currentLevel}
      totalLevels={10}
      points={points}
    >
      {currentQuestion < questions.length ? (
        <EncryptionQuestion
          {...questions[currentQuestion]}
          onCorrect={handleCorrect}
        />
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('einsteinCongratulations')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('einsteinQuote')}
          </p>
          {showFlagMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg"
            >
              {t('easyGameFlagFound')}
            </motion.div>
          )}
        </div>
      )}
    </GameLayout>
  );
} 