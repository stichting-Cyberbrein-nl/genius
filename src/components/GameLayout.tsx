'use client';

import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import Einstein from '@/components/Einstein';

interface GameLayoutProps {
  children: React.ReactNode;
  difficulty: 'easy' | 'hard';
  currentLevel: number;
  totalLevels: number;
  points: number;
  message?: string;
}

export default function GameLayout({
  children,
  difficulty,
  currentLevel,
  totalLevels,
  points,
  message
}: GameLayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button and level */}
        <div className="mb-8 flex justify-between items-center">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {t('back')}
          </Link>
          <div className="text-lg font-medium text-gray-900 dark:text-white">
            {t(difficulty)} - {t('level')} {currentLevel}/{totalLevels}
          </div>
        </div>

        {/* Einstein with message */}
        <div className="mb-8">
          <Einstein message={message || t('levelWelcome') + ' ' + currentLevel} />
        </div>

        {/* Points */}
        <div className="mb-8 text-right">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {points} {t('points')}
          </span>
        </div>

        {/* Main content */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 