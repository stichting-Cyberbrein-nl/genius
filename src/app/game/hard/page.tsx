'use client';

import { useState, useEffect } from 'react';
import GameLayout from '@/components/GameLayout';
import { useGameProgress } from '@/hooks/useGameProgress';
import HardEncryptionQuestion from '@/components/HardEncryptionQuestion';
import { useLanguage } from '@/lib/i18n';
import { useFlags } from '@/hooks/useFlags';
import { motion } from 'framer-motion';

// Vooraf gedefinieerde vragen
const questions = [
  // Morse code - Basis woorden
  { type: 'morse' as const, encryptedText: '.... . .-.. .-.. --- / .-- --- .-. .-.. -..' }, // HELLO WORLD
  { type: 'morse' as const, encryptedText: '... -. .- -.- . -... --- -.--' }, // snakeboy
  { type: 'morse' as const, encryptedText: '-.-. --- -.. . -.- .-. .- -.- . .-.' }, // codekraker 
  
  // Binary - Basis woorden
  { type: 'binary' as const, encryptedText: '01001000 01100101 01101100 01101100 01101111' }, // HELLO
  { type: 'binary' as const, encryptedText: '01000011 01101111 01100100 01101001 01101110 01100111' }, // CODING
  { type: 'binary' as const, encryptedText: '01000010 01101001 01101110 01100001 01110010 01111001' }, // BINARY
  
  // Hexadecimal - Basis woorden
  { type: 'hex' as const, encryptedText: '48 65 78 61 64 65 63 69 6D 61 6C' }, // HEXADECIMAL
  { type: 'hex' as const, encryptedText: '43 6F 6D 70 75 74 65 72 20 53 63 69 65 6E 63 65' }, // COMPUTER SCIENCE
  { type: 'hex' as const, encryptedText: '50 72 6F 67 72 61 6D 6D 69 6E 67' }, // PROGRAMMING
  
  // Base64 - Basis woorden
  { type: 'base64' as const, encryptedText: 'U2VjdXJpdHk=' }, // SECURITY
  { type: 'base64' as const, encryptedText: 'RW5jcnlwdGlvbg==' }, // ENCRYPTION
  { type: 'base64' as const, encryptedText: 'Q3liZXJzZWN1cml0eQ==' }, // CYBERSECURITY
  
  // Caesar cipher - Moeilijkere shifts
  { type: 'caesar' as const, shift: 7, encryptedText: 'OLSSV' }, // HELLO
  { type: 'caesar' as const, shift: 13, encryptedText: 'EBG13' }, // ROT13
  { type: 'caesar' as const, shift: 5, encryptedText: 'HTRUZYJW' }, // COMPUTER
  
  // ROT13 - Moeilijkere combinaties
  { type: 'rot13' as const, encryptedText: 'syvccremreb' }, // flipperzero
  { type: 'rot13' as const, encryptedText: 'qnexjro' }, // darkweb
  { type: 'rot13' as const, encryptedText: 'oehgr-sbepr' } // bruteforce
];

export default function HardGame() {
  const { getProgress, updateProgress } = useGameProgress();
  const { currentLevel, points } = getProgress('hard');
  const [currentQuestion, setCurrentQuestion] = useState(currentLevel - 1);
  const { t } = useLanguage();
  const { findFlag } = useFlags();
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagAwarded, setFlagAwarded] = useState(false);

  useEffect(() => {
    if (currentQuestion >= questions.length && !flagAwarded) {
      findFlag('hard_game_flag');
      setFlagAwarded(true);
      setShowFlagMessage(true);
      setTimeout(() => setShowFlagMessage(false), 3000);
    }
  }, [currentQuestion, findFlag, flagAwarded]);

  const handleCorrect = () => {
    const newPoints = points + 20; // Meer punten voor moeilijke vragen
    const newLevel = currentLevel + 1;
    updateProgress('hard', newLevel, newPoints);
    setCurrentQuestion(prev => prev + 1);
  };

  return (
    <GameLayout
      difficulty="hard"
      currentLevel={currentLevel}
      totalLevels={18}
      points={points}
    >
      {currentQuestion < questions.length ? (
        <HardEncryptionQuestion
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
              {t('hardGameFlagFound')}
            </motion.div>
          )}
        </div>
      )}
    </GameLayout>
  );
} 