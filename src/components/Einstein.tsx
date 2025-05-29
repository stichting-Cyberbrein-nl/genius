'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { useFlags } from '@/hooks/useFlags';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface EinsteinProps {
  message?: string;
  showDecrypt?: boolean;
}

type DecryptMethod = 'caesar' | 'rot13' | 'binary' | 'hex' | 'base64';

export default function Einstein({ message, showDecrypt = false }: EinsteinProps) {
  const { t } = useLanguage();
  const { findFlag } = useFlags();
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<DecryptMethod>('caesar');
  const [caesarShift, setCaesarShift] = useState(3);
  const [hasDecryptedBefore, setHasDecryptedBefore] = useState(false);

  // Initialize hasDecryptedBefore from localStorage only once on component mount
  useEffect(() => {
    const decryptedBefore = localStorage.getItem('hasDecryptedBefore');
    if (decryptedBefore === 'true') {
      setHasDecryptedBefore(true);
    }
  }, []); // Empty dependency array means this runs only once on mount

  const handleClick = () => {
    findFlag('einstein_flag');
    setFlagMessage(t('einsteinFlagFound') as string);
    setShowFlagMessage(true);
    setTimeout(() => setShowFlagMessage(false), 3000);
    if (showDecrypt) {
      setShowPopup(true);
    }
  };

  const handleDecrypt = () => {
    try {
      let decrypted = null;

      switch (selectedMethod) {
        case 'caesar':
          decrypted = input.split('').map(char => {
            if (char.match(/[A-Z]/i)) {
              const code = char.charCodeAt(0);
              const isUpperCase = code >= 65 && code <= 90;
              const base = isUpperCase ? 65 : 97;
              return String.fromCharCode(((code - base - caesarShift + 26) % 26) + base);
            }
            return char;
          }).join('');
          break;

        case 'rot13':
          decrypted = input.split('').map(char => {
            if (char.match(/[A-Z]/i)) {
              const code = char.charCodeAt(0);
              const isUpperCase = code >= 65 && code <= 90;
              const base = isUpperCase ? 65 : 97;
              return String.fromCharCode(((code - base + 13) % 26) + base);
            }
            return char;
          }).join('');
          break;

        case 'binary':
          if (!input.match(/^[01\s]+$/)) {
            setError(t('invalidBinary') as string);
            return;
          }
          decrypted = input.split(' ').map(byte => {
            return String.fromCharCode(parseInt(byte, 2));
          }).join('');
          break;

        case 'hex':
          if (!input.match(/^[0-9A-Fa-f\s]+$/)) {
            setError(t('invalidHex') as string);
            return;
          }
          decrypted = input.split(' ').map(hex => {
            return String.fromCharCode(parseInt(hex, 16));
          }).join('');
          break;

        case 'base64':
          try {
            decrypted = atob(input);
          } catch {
            setError(t('invalidBase64') as string);
            return;
          }
          break;
      }

      if (decrypted) {
        setResult(decrypted);
        setError('');

        // Check if this is the first successful decryption
        if (!hasDecryptedBefore) {
          localStorage.setItem('hasDecryptedBefore', 'true');
          findFlag('first_decryption');
          setFlagMessage(t('firstDecryptionFlagFound') as string);
          setShowFlagMessage(true);
          setTimeout(() => setShowFlagMessage(false), 3000);
          setHasDecryptedBefore(true);
        }

        // Check if it's a valid flag
        if (decrypted.match(/FLAG_\d+{.*}/)) {
          findFlag('decryption_master');
        }
      } else {
        setError(t('decryptionError') as string);
      }
    } catch {
      setError(t('decryptionError') as string);
    }
  };

  const handleMethodChange = (method: DecryptMethod) => {
    setSelectedMethod(method);
    setError('');
    setResult('');
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

      {showDecrypt && showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('decryptionTool')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('selectMethod')}
                </label>
                <select
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={selectedMethod}
                  onChange={(e) => handleMethodChange(e.target.value as DecryptMethod)}
                >
                  <option value="caesar">{t('caesarCipher')}</option>
                  <option value="rot13">ROT13</option>
                  <option value="binary">{t('binaryCode')}</option>
                  <option value="hex">{t('hexCode')}</option>
                  <option value="base64">Base64</option>
                </select>
              </div>

              {selectedMethod === 'caesar' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('shiftAmount')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={caesarShift}
                    onChange={(e) => setCaesarShift(parseInt(e.target.value))}
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('enterEncryptedText')}
                </label>
                <textarea
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={4}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('encryptedTextPlaceholder') as string}
                />
              </div>

              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                onClick={handleDecrypt}
              >
                {t('decrypt')}
              </button>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {result && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">{t('decryptedResult')}</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                    <p className="font-mono text-gray-900 dark:text-white">{result}</p>
                  </div>
                </div>
              )}

              <button
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mt-4"
                onClick={() => setShowPopup(false)}
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 