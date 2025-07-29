'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import Einstein from '@/components/Einstein';
import Link from 'next/link';

interface HintSection {
  title: string;
  description: string;
  examples: string[];
  steps: string[];
  tips: string[];
  cheatsheet: string;
  cheatsheetDesc: string;
}

export default function HintsPage() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  const hintSections: Record<string, HintSection> = {
    caesar: {
      title: t('caesarTitle') as string,
      description: t('caesarDesc') as string,
      steps: t('caesarSteps') as string[],
      tips: t('caesarTips') as string[],
      examples: [
        'KHOOR → HELLO (shift: 3)',
        'MJQQT → HELLO (shift: 5)',
        'OLSSV → HELLO (shift: 7)'
      ],
      cheatsheet: t('caesarCheatSheet') as string,
      cheatsheetDesc: t('caesarCheatSheetDesc') as string
    },
    rot13: {
      title: t('rot13Title') as string,
      description: t('rot13Desc') as string,
      steps: t('rot13Steps') as string[],
      tips: t('rot13Tips') as string[],
      examples: [
        'EBG13 → ROT13',
        'PNGURF → CHATRE',
        'EBG13_VF_FUN → ROT13_IS_SHA'
      ],
      cheatsheet: t('rot13CheatSheet') as string,
      cheatsheetDesc: t('rot13CheatSheetDesc') as string
    },
    morse: {
      title: t('morseTitle') as string,
      description: t('morseDesc') as string,
      steps: t('morseSteps') as string[],
      tips: t('morseTips') as string[],
      examples: [
        '.... . .-.. .-.. --- → HELLO',
        '.-- --- .-. .-.. -.. → WORLD',
        '.-. --- - .---- ...-- → ROT13'
      ],
      cheatsheet: t('morseCheatSheet') as string,
      cheatsheetDesc: t('morseCheatSheetDesc') as string
    },
    binary: {
      title: t('binaryTitle') as string,
      description: t('binaryDesc') as string,
      steps: t('binarySteps') as string[],
      tips: t('binaryTips') as string[],
      examples: [
        '01001000 01100101 01101100 01101100 01101111 → HELLO',
        '01010111 01101111 01110010 01101100 01100100 → WORLD',
        '01010010 01001111 01010100 00110001 00110011 → ROT13'
      ],
      cheatsheet: t('binaryCheatSheet') as string,
      cheatsheetDesc: t('binaryCheatSheetDesc') as string
    },
    hex: {
      title: t('hexTitle') as string,
      description: t('hexDesc') as string,
      steps: t('hexSteps') as string[],
      tips: t('hexTips') as string[],
      examples: [
        '48 65 6C 6C 6F → HELLO',
        '57 6F 72 6C 64 → WORLD',
        '52 4F 54 31 33 → ROT13'
      ],
      cheatsheet: t('hexCheatSheet') as string,
      cheatsheetDesc: t('hexCheatSheetDesc') as string
    },
    base64: {
      title: t('base64Title') as string,
      description: t('base64Desc') as string,
      steps: t('base64Steps') as string[],
      tips: t('base64Tips') as string[],
      examples: [
        'SEVMTE8= → HELLO',
        'V09STEQ= → WORLD',
        'Uk9UMTM= → ROT13'
      ],
      cheatsheet: t('base64CheatSheet') as string,
      cheatsheetDesc: t('base64CheatSheetDesc') as string
    }
  };

  const getCheatsheet = (type: string) => {
    switch (type) {
      case 'caesar':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">Shift 3 (Veel gebruikt):</h4>
                <div className="font-mono">
                  <div>Encrypted: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
                  <div>Original:  X Y Z A B C D E F G H I J K L M N O P Q R S T U V W</div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Shift 5:</h4>
                <div className="font-mono">
                  <div>Encrypted: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
                  <div>Original:  V W X Y Z A B C D E F G H I J K L M N O P Q R S T U</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold mb-2">Shift 7:</h4>
                <div className="font-mono">
                  <div>Encrypted: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
                  <div>Original:  T U V W X Y Z A B C D E F G H I J K L M N O P Q R S</div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Shift 13 (ROT13):</h4>
                <div className="font-mono">
                  <div>Encrypted: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
                  <div>Original:  N O P Q R S T U V W X Y Z A B C D E F G H I J K L M</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'rot13':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2">Encrypted:</h4>
              <div className="font-mono">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Original:</h4>
              <div className="font-mono">N O P Q R S T U V W X Y Z A B C D E F G H I J K L M</div>
            </div>
          </div>
        );
      case 'morse':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2">Letters:</h4>
              <div className="font-mono">
                A: .- | B: -... | C: -.-. | D: -.. | E: .<br />
                F: ..-. | G: --. | H: .... | I: .. | J: .---<br />
                K: -.- | L: .-.. | M: -- | N: -. | O: ---<br />
                P: .--. | Q: --.- | R: .-. | S: ... | T: -<br />
                U: ..- | V: ...- | W: .-- | X: -..- | Y: -.--<br />
                Z: --.. | spatie: /
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Numbers:</h4>
              <div className="font-mono">
                0: ----- | 1: .---- | 2: ..--- | 3: ...-- | 4: ....-<br />
                5: ..... | 6: -.... | 7: --... | 8: ---.. | 9: ----.
              </div>
            </div>
          </div>
        );
      case 'binary':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2">Uppercase Letters:</h4>
              <div className="font-mono">
                A: 01000001 | B: 01000010 | C: 01000011 | D: 01000100 | E: 01000101<br />
                F: 01000110 | G: 01000111 | H: 01001000 | I: 01001001 | J: 01001010<br />
                K: 01001011 | L: 01001100 | M: 01001101 | N: 01001110 | O: 01001111<br />
                P: 01010000 | Q: 01010001 | R: 01010010 | S: 01010011 | T: 01010100<br />
                U: 01010101 | V: 01010110 | W: 01010111 | X: 01011000 | Y: 01011001<br />
                Z: 01011010
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Lowercase Letters:</h4>
              <div className="font-mono">
                a: 01100001 | b: 01100010 | c: 01100011 | d: 01100100 | e: 01100101<br />
                f: 01100110 | g: 01100111 | h: 01101000 | i: 01101001 | j: 01101010<br />
                k: 01101011 | l: 01101100 | m: 01101101 | n: 01101110 | o: 01101111<br />
                p: 01110000 | q: 01110001 | r: 01110010 | s: 01110011 | t: 01110100<br />
                u: 01110101 | v: 01110110 | w: 01110111 | x: 01111000 | y: 01111001<br />
                z: 01111010
              </div>
            </div>
          </div>
        );
      case 'hex':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2">Uppercase Letters:</h4>
              <div className="font-mono">
                A: 41 | B: 42 | C: 43 | D: 44 | E: 45<br />
                F: 46 | G: 47 | H: 48 | I: 49 | J: 4A<br />
                K: 4B | L: 4C | M: 4D | N: 4E | O: 4F<br />
                P: 50 | Q: 51 | R: 52 | S: 53 | T: 54<br />
                U: 55 | V: 56 | W: 57 | X: 58 | Y: 59<br />
                Z: 5A
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Lowercase Letters:</h4>
              <div className="font-mono">
                a: 61 | b: 62 | c: 63 | d: 64 | e: 65<br />
                f: 66 | g: 67 | h: 68 | i: 69 | j: 6A<br />
                k: 6B | l: 6C | m: 6D | n: 6E | o: 6F<br />
                p: 70 | q: 71 | r: 72 | s: 73 | t: 74<br />
                u: 75 | v: 76 | w: 77 | x: 78 | y: 79<br />
                z: 7A
              </div>
            </div>
          </div>
        );
      case 'base64':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2">Characters:</h4>
              <div className="font-mono">
                A-Z: 0-25 | a-z: 26-51 | 0-9: 52-61<br />
                +: 62 | /: 63 | =: padding
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Examples:</h4>
              <div className="font-mono">
                HELLO → SEVMTE8=<br />
                WORLD → V09STEQ=<br />
                ROT13 → Uk9UMTM=
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← {t('back')}
          </Link>
        </div>
        <Einstein message={t('encryptionHints') as string} showDecrypt={true} />
        <div className="space-y-4">
          {Object.entries(hintSections).map(([type, section], idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <button
                className="w-full text-left font-bold text-lg text-gray-900 dark:text-white focus:outline-none"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                {section.title}
              </button>
              {expanded === idx && (
                <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-200">
                  <p className="text-lg">{section.description}</p>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{t('stepByStep')}</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      {section.steps.map((step, i) => (
                        <li key={i} className="ml-4">{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{t('tipsAndTricks')}</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="ml-4">{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{t('examples')}</h3>
                    <ul className="space-y-2">
                      {section.examples.map((ex, i) => (
                        <li key={i} className="font-mono bg-white dark:bg-gray-800 p-2 rounded">
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{section.cheatsheet}</h3>
                    <p className="mb-4">{section.cheatsheetDesc}</p>
                    {getCheatsheet(type)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 