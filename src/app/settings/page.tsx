'use client';

import { useLanguage } from '@/lib/i18n';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Einstein from '@/components/Einstein';
import { useFlags } from '@/hooks/useFlags';

export default function Settings() {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState('medium');
  const [sound, setSound] = useState(true);
  const [animations, setAnimations] = useState(true);
  const { findFlag, getFlagByType } = useFlags();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    const savedSound = localStorage.getItem('sound');
    const savedAnimations = localStorage.getItem('animations');

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedSound !== null) setSound(savedSound === 'true');
    if (savedAnimations !== null) setAnimations(savedAnimations === 'true');
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('sound', sound.toString());
    localStorage.setItem('animations', animations.toString());
  }, [fontSize, sound, animations]);

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement;
    switch (fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
    }
  }, [fontSize]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    const themeFlag = getFlagByType('theme');
    if (themeFlag && !themeFlag.found) {
      findFlag('theme');
    }
  };

  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize);
    const textFlag = getFlagByType('text');
    if (textFlag && !textFlag.found) {
      findFlag('text');
    }
  };

  const handleSoundToggle = () => {
    setSound(!sound);
    const soundFlag = getFlagByType('sound');
    if (soundFlag && !soundFlag.found) {
      findFlag('sound');
    }
  };

  const handleAnimationsToggle = () => {
    setAnimations(!animations);
    const animationFlag = getFlagByType('animation');
    if (animationFlag && !animationFlag.found) {
      findFlag('animation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Einstein message={t('settingsMessage')} />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Theme Settings */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('appearance')}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('theme')}
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="light">{t('light')}</option>
                    <option value="dark">{t('dark')}</option>
                    <option value="system">{t('system')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('fontSize')}
                  </label>
                  <select
                    value={fontSize}
                    onChange={(e) => handleFontSizeChange(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="small">{t('small')}</option>
                    <option value="medium">{t('medium')}</option>
                    <option value="large">{t('large')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sound Settings */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('sound')}
              </h2>
              <div className="flex items-center">
                <button
                  onClick={handleSoundToggle}
                  className={`${
                    sound ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span
                    className={`${
                      sound ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  />
                </button>
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  {sound ? t('soundOn') : t('soundOff')}
                </span>
              </div>
            </div>

            {/* Animation Settings */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                {t('animations')}
              </h2>
              <div className="flex items-center">
                <button
                  onClick={handleAnimationsToggle}
                  className={`${
                    animations ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <span
                    className={`${
                      animations ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  />
                </button>
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  {animations ? t('animationsOn') : t('animationsOff')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
} 