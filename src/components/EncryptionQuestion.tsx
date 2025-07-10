'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';

interface EncryptionQuestionProps {
  type: 'caesar' | 'rot13';
  shift?: number;
  encryptedText: string;
  onCorrect: () => void;
}

export default function EncryptionQuestion({
  type,
  shift,
  encryptedText,
  onCorrect
}: EncryptionQuestionProps) {
  const { t } = useLanguage();
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (feedback === t('einsteinCorrect')) {
      const timer = setTimeout(() => {
        setFeedback('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const decrypted = decryptText(encryptedText, type, shift);
    
    if (input.trim().toUpperCase() === decrypted.toUpperCase()) {
      setFeedback(t('einsteinCorrect') as string);
      setInput('');
      onCorrect();
    } else {
      setFeedback(t('einsteinIncorrect') as string);
    }
  };

  const decryptText = (text: string, type: 'caesar' | 'rot13', shift?: number): string => {
    if (type === 'caesar' && shift) {
      return decryptCaesar(text, shift);
    } else if (type === 'rot13') {
      return decryptROT13(text);
    }
    return text;
  };

  const decryptCaesar = (text: string, shift: number): string => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          const shifted = ((code - base - shift + 26) % 26) + base;
          return String.fromCharCode(shifted);
        }
        return char;
      })
      .join('');
  };

  const decryptROT13 = (text: string): string => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          const shifted = ((code - base + 13) % 26) + base;
          return String.fromCharCode(shifted);
        }
        return char;
      })
      .join('');
  };

  const getCheatSheet = () => {
    if (type === 'caesar') {
      return (
        <div className="text-sm">
          <p className="font-bold mb-2">Caesar Cipher Cheat Sheet (Shift: {shift}):</p>
          <p>Bij een Caesar cipher wordt elke letter verschoven met een vast aantal posities.</p>
          <p className="mt-2">Voorbeeld met shift {shift}:</p>
          <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
            <p>A → {String.fromCharCode(((65 - 65 + shift!) % 26) + 65)}</p>
            <p>B → {String.fromCharCode(((66 - 65 + shift!) % 26) + 65)}</p>
            <p>C → {String.fromCharCode(((67 - 65 + shift!) % 26) + 65)}</p>
            <p>...</p>
            <p>Z → {String.fromCharCode(((90 - 65 + shift!) % 26) + 65)}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-sm">
          <p className="font-bold mb-2">ROT13 Cheat Sheet:</p>
          <p>ROT13 verschuift elke letter 13 posities in het alfabet.</p>
          <p className="mt-2">Voorbeeld:</p>
          <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
            <p>A → N</p>
            <p>B → O</p>
            <p>C → P</p>
            <p>...</p>
            <p>N → A</p>
            <p>O → B</p>
            <p>P → C</p>
            <p>...</p>
            <p>Z → M</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {t(`einstein${type.charAt(0).toUpperCase() + type.slice(1)}Title`)}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {t(`einstein${type.charAt(0).toUpperCase() + type.slice(1)}Desc`, { shift: shift || 0 })}
        </p>
        <div className="font-mono text-lg text-gray-900 dark:text-white">
          {encryptedText}
        </div>
      </div>

      <button
        onClick={() => setShowCheatSheet(!showCheatSheet)}
        className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        {showCheatSheet ? t('hideCheatSheet') : t('showCheatSheet')}
      </button>

      {showCheatSheet && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          {getCheatSheet()}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('einsteinQuestion')}
          </label>
          <input
            type="text"
            id="answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('einsteinPlaceholder') as string}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {t('einsteinSubmit')}
        </button>
      </form>

      {feedback && (
        <div className={`p-4 rounded-lg ${
          feedback === t('einsteinCorrect') 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
        }`}>
          {feedback}
        </div>
      )}
    </div>
  );
} 