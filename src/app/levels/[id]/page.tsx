'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { verifyFlag, getFlagById } from '@/lib/flags';
import Einstein from '@/components/Einstein';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Level() {
  const { id } = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentFlag = getFlagById(`FLAG_${id}`);

  useEffect(() => {
    // Reset state when level changes
    setInput('');
    setMessage('');
    setShowHint(false);
    setAttempts(0);
    setIsCorrect(false);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(prev => prev + 1);
    
    if (verifyFlag(input)) {
      setMessage(t('correctFlag'));
      setIsCorrect(true);
      // Automatically redirect to next level after 2 seconds
      setTimeout(() => {
        const nextLevel = Number(id) + 1;
        router.push(`/levels/${nextLevel}`);
      }, 2000);
    } else {
      setMessage(t('wrongFlag'));
      // Show hint after 3 failed attempts
      if (attempts >= 2) {
        setShowHint(true);
      }
    }
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
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t('attempts')}: {attempts}
          </div>
        </div>

        <Einstein
          message={isCorrect 
            ? t('correctFlag')
            : id === '1' 
              ? `${t('decodeMessage')} "uryyb_jbeyq"`
              : `${t('levelWelcome')} ${id}`
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="flag" className="block text-sm font-medium mb-2">
                {t('enterFlag')}
              </label>
              <input
                type="text"
                id="flag"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder={t('flagPlaceholder')}
                disabled={isCorrect}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={isCorrect}
            >
              {t('submit')}
            </button>
          </form>

          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 text-center ${
                  message.includes('Correct') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>

          {showHint && currentFlag && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg"
            >
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                {currentFlag.hint}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
} 