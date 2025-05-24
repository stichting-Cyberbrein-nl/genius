'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';

type EncryptionType = 'morse' | 'binary' | 'hex' | 'base64' | 'caesar' | 'rot13';

interface HardEncryptionQuestionProps {
  type: EncryptionType;
  shift?: number;
  encryptedText: string;
  onCorrect: () => void;
}

export default function HardEncryptionQuestion({
  type,
  shift,
  encryptedText,
  onCorrect
}: HardEncryptionQuestionProps) {
  const { t } = useLanguage();
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const decrypted = decryptText(encryptedText, type, shift);
    
    if (answer.toLowerCase() === decrypted.toLowerCase()) {
      setMessage(t('einsteinCorrect'));
      onCorrect();
    } else {
      setMessage(t('einsteinIncorrect'));
    }
  };

  const decryptText = (text: string, type: EncryptionType, shift?: number): string => {
    switch (type) {
      case 'morse':
        return decodeMorse(text);
      case 'binary':
        return decodeBinary(text);
      case 'hex':
        return decodeHex(text);
      case 'base64':
        return decodeBase64(text);
      case 'caesar':
        return decryptCaesar(text, shift || 0);
      case 'rot13':
        return decryptROT13(text);
      default:
        return text;
    }
  };

  const decodeMorse = (text: string): string => {
    const morseCode: { [key: string]: string } = {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
      '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
      '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
      '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
      '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
      '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3',
      '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
      '----.': '9', '/': ' '
    };
    
    return text.split(' ')
      .map(code => morseCode[code] || code)
      .join('');
  };

  const decodeBinary = (text: string): string => {
    return text.split(' ')
      .map(binary => String.fromCharCode(parseInt(binary, 2)))
      .join('');
  };

  const decodeHex = (text: string): string => {
    return text.split(' ')
      .map(hex => String.fromCharCode(parseInt(hex, 16)))
      .join('');
  };

  const decodeBase64 = (text: string): string => {
    return atob(text);
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
    switch (type) {
      case 'morse':
        return (
          <div className="text-sm">
            <p className="font-bold mb-2">Morse Code Cheat Sheet:</p>
            <p>A: .- | B: -... | C: -.-. | D: -.. | E: .</p>
            <p>F: ..-. | G: --. | H: .... | I: .. | J: .---</p>
            <p>K: -.- | L: .-.. | M: -- | N: -. | O: ---</p>
            <p>P: .--. | Q: --.- | R: .-. | S: ... | T: -</p>
            <p>U: ..- | V: ...- | W: .-- | X: -..- | Y: -.--</p>
            <p>Z: --.. | Space: /</p>
          </div>
        );
      case 'binary':
        return (
          <div className="text-sm">
            <p className="font-bold mb-2">Binary to ASCII:</p>
            <p>Each 8 bits (1 byte) represents one character</p>
            <p>Example: 01001000 01101001 = "Hi"</p>
          </div>
        );
      case 'hex':
        return (
          <div className="text-sm">
            <p className="font-bold mb-2">Hexadecimal to ASCII:</p>
            <p>Each pair of hex digits represents one character</p>
            <p>Example: 48 69 = "Hi"</p>
          </div>
        );
      case 'base64':
        return (
          <div className="text-sm">
            <p className="font-bold mb-2">Base64:</p>
            <p>Uses A-Z, a-z, 0-9, +, and /</p>
            <p>Example: SGVsbG8 = "Hello"</p>
          </div>
        );
      default:
        return null;
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
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={t('einsteinPlaceholder')}
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

      {message && (
        <div className={`p-4 rounded-lg ${
          message === t('einsteinCorrect') 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
} 