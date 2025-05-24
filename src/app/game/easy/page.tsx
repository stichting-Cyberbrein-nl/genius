'use client';

import { useState } from 'react';
import GameLayout from '@/components/GameLayout';
import { useGameProgress } from '@/hooks/useGameProgress';
import EncryptionQuestion from '@/components/EncryptionQuestion';
import { useLanguage } from '@/lib/i18n';

// Vooraf gedefinieerde vragen
const questions = [
  // Caesar cipher vragen
  { type: 'caesar' as const, shift: 3, encryptedText: 'KHOOR' }, // HELLO
  { type: 'caesar' as const, shift: 5, encryptedText: 'MJQQT' }, // HELLO
  { type: 'caesar' as const, shift: 7, encryptedText: 'OLSSV' }, // HELLO
  { type: 'caesar' as const, shift: 13, encryptedText: 'URYYB' }, // HELLO
  { type: 'caesar' as const, shift: 1, encryptedText: 'IFMMP' }, // HELLO
  
  // ROT13 vragen
  { type: 'rot13' as const, encryptedText: 'EBG13' }, // ROT13
  { type: 'rot13' as const, encryptedText: 'PNGURF' }, // CHATRE
  { type: 'rot13' as const, encryptedText: 'EBG13_VF_FUN' }, // ROT13_IS_SHA
  { type: 'rot13' as const, encryptedText: 'PNGURF_EBG13' }, // CHATRE_ROT13
  { type: 'rot13' as const, encryptedText: 'EBG13_EBG13_EBG13' } // ROT13_ROT13_ROT13
];

export default function EasyGame() {
  const { getProgress, updateProgress } = useGameProgress();
  const { currentLevel, points } = getProgress('easy');
  const [currentQuestion, setCurrentQuestion] = useState(currentLevel - 1);
  const { t } = useLanguage();

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
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg inline-block">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {t('einsteinReward')}
            </p>
            <div className="font-mono text-lg text-gray-900 dark:text-white">
              {"FLAG{EINSTEIN_WAS_A_GENIUS}"}
            </div>
          </div>
        </div>
      )}
    </GameLayout>
  );
} 