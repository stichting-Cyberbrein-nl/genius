'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { useFlags } from '@/hooks/useFlags';
import { useState } from 'react';
import Image from 'next/image';

interface EinsteinProps {
  message?: string;
}

export default function Einstein({ message }: EinsteinProps) {
  const { t } = useLanguage();
  const { findFlag, getFlagByType } = useFlags();
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState('');

  const handleClick = () => {
    const einsteinFlag = getFlagByType('einstein');
    if (einsteinFlag && !einsteinFlag.found) {
      findFlag('einstein');
      setFlagMessage(t('einsteinFlagFound'));
      setShowFlagMessage(true);
      setTimeout(() => setShowFlagMessage(false), 3000);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="cursor-pointer relative"
      >
        <div className="w-48 h-48 relative">
          <Image
            src="/einstein.png"
            alt="Einstein"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs"
        >
          <div className="relative">
            <p className="text-gray-700 dark:text-gray-300 text-center">{message}</p>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 rotate-45"></div>
          </div>
        </motion.div>
      )}

      {showFlagMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mt-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          {flagMessage}
        </motion.div>
      )}
    </div>
  );
} 