'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sound, setSound] = useState(true);

  // Load sound setting
  useEffect(() => {
    const savedSound = localStorage.getItem('sound');
    if (savedSound !== null) setSound(savedSound === 'true');
  }, []);

  const playClickSound = () => {
    if (!sound) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(500, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const handleMenuToggle = () => {
    playClickSound();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (newLanguage: 'nl' | 'en') => {
    playClickSound();
    setLanguage(newLanguage);
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center" onClick={playClickSound}>
              <span className="text-xl font-bold text-foreground">
                Genius
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/levels/1"
              className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('levels')}
            </Link>
            <Link
              href="/flags"
              className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('flags')}
            </Link>
            <Link
              href="/hints"
              className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('hints')}
            </Link>
            <Link
              href="/quiz"
              className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('quiz')}
            </Link>
            <Link
              href="/settings"
              className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('settings')}
            </Link>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as 'nl' | 'en')}
              className="ml-4 bg-muted text-foreground px-3 py-2 rounded-md text-sm font-medium border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
            >
              <option value="nl">NL</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={handleMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none transition-colors duration-200"
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
        <div className="sm:hidden border-t border-border bg-card">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/levels/1"
              className="block text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('levels')}
            </Link>
            <Link
              href="/flags"
              className="block text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('flags')}
            </Link>
            <Link
              href="/hints"
              className="block text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('hints')}
            </Link>
            <Link
              href="/quiz"
              className="block text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('quiz')}
            </Link>
            <Link
              href="/settings"
              className="block text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={playClickSound}
            >
              {t('settings')}
            </Link>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as 'nl' | 'en')}
              className="block w-full bg-muted text-foreground px-3 py-2 rounded-md text-base font-medium border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
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