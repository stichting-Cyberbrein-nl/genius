'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { useState } from 'react';

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Genius
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/levels/1"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('levels')}
            </Link>
            <Link
              href="/flags"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('flags')}
            </Link>
            <Link
              href="/hints"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('hints')}
            </Link>
            <Link
              href="/quiz"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('quiz')}
            </Link>
            <Link
              href="/settings"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              {t('settings')}
            </Link>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'nl' | 'en')}
              className="ml-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              <option value="nl">NL</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/levels/1"
              className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              {t('levels')}
            </Link>
            <Link
              href="/flags"
              className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              {t('flags')}
            </Link>
            <Link
              href="/hints"
              className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              {t('hints')}
            </Link>
            <Link
              href="/quiz"
              className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              {t('quiz')}
            </Link>
            <Link
              href="/settings"
              className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              {t('settings')}
            </Link>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'nl' | 'en')}
              className="block w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              <option value="nl">NL</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
} 