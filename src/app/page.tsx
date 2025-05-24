'use client';

import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import Einstein from '@/components/Einstein';
import { motion } from 'framer-motion';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-end">
          <button
            onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t('language')}: {language.toUpperCase()}
          </button>
        </div>

        <Einstein
          message={t('welcome')}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <Link
            href="/game/easy"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('startGameEasy')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('easyGameDescription')}
            </p>
          </Link>

          <Link
            href="/game/hard"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('startGameHard')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('hardGameDescription')}
            </p>
          </Link>

          <Link
            href="/hints"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('hints')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('hintsDescription')}
            </p>
          </Link>

          <Link
            href="/quiz"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('quiz')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('quizDescription')}
            </p>
          </Link>

          <Link
            href="/flags"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('flags')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('achievements')}
            </p>
          </Link>
          <Link
            href="/settings"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t('settings')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('settingsDescription')}
            </p>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
