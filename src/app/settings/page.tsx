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
  const [mounted, setMounted] = useState(false);
  const { findFlag } = useFlags();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Apply animations setting
  useEffect(() => {
    const root = document.documentElement;
    if (animations) {
      root.style.setProperty('--enable-animations', '1');
      document.body.classList.remove('no-animations');
    } else {
      root.style.setProperty('--enable-animations', '0');
      document.body.classList.add('no-animations');
    }
  }, [animations]);

  // Apply sound setting
  useEffect(() => {
    const root = document.documentElement;
    if (sound) {
      root.style.setProperty('--enable-sound', '1');
      document.body.classList.remove('no-sound');
    } else {
      root.style.setProperty('--enable-sound', '0');
      document.body.classList.add('no-sound');
    }
  }, [sound]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    findFlag('theme_flag');
  };

  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize);
    findFlag('text_flag');
  };

  const handleSoundToggle = () => {
    setSound(!sound);
    findFlag('sound_flag');
    
    // Play a test sound if sound is enabled
    if (!sound) {
      playTestSound();
    }
  };

  const handleAnimationsToggle = () => {
    setAnimations(!animations);
    findFlag('animation_flag');
  };

  // Test sound function
  const playTestSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch {
      console.log('Audio not supported');
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 animate-slide-up">
          <Einstein message={String(t('settingsMessage'))} />
        </div>

        <div className="bg-card border border-border shadow-lg rounded-lg p-6 animate-slide-up">
          <div className="space-y-8">
            {/* Theme Settings */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                {t('appearance')}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('theme')}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'light', label: t('light'), icon: '☀️' },
                      { value: 'dark', label: t('dark'), icon: '🌙' },
                      { value: 'system', label: t('system'), icon: '💻' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleThemeChange(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          theme === option.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card hover:border-primary/50 hover:bg-accent'
                        }`}
                      >
                        <div className="text-2xl mb-1">{option.icon}</div>
                        <div className="text-sm font-medium">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('fontSize')}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'small', label: t('small'), size: 'text-sm' },
                      { value: 'medium', label: t('medium'), size: 'text-base' },
                      { value: 'large', label: t('large'), size: 'text-lg' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFontSizeChange(option.value)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          fontSize === option.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card hover:border-primary/50 hover:bg-accent'
                        }`}
                      >
                        <div className={`${option.size} font-medium mb-1`}>Aa</div>
                        <div className="text-sm">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sound Settings */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                {t('sound')}
              </h2>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{sound ? t('soundOn') : t('soundOff')}</div>
                    <div className="text-sm text-muted-foreground">Audio feedback voor interacties</div>
                  </div>
                </div>
                <button
                  onClick={handleSoundToggle}
                  className={`${
                    sound ? 'bg-primary' : 'bg-muted-foreground/20'
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                >
                  <span
                    className={`${
                      sound ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  />
                </button>
              </div>
            </div>

            {/* Animation Settings */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('animations')}
              </h2>
              
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{animations ? t('animationsOn') : t('animationsOff')}</div>
                    <div className="text-sm text-muted-foreground">Vloeiende overgangen en effecten</div>
                  </div>
                </div>
                <button
                  onClick={handleAnimationsToggle}
                  className={`${
                    animations ? 'bg-primary' : 'bg-muted-foreground/20'
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                >
                  <span
                    className={`${
                      animations ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center animate-slide-up">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
} 