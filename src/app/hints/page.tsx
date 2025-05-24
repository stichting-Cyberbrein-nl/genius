'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import Einstein from '@/components/Einstein';
import Link from 'next/link';

interface HintSection {
  title: string;
  description: string;
  examples: string[];
  solution?: string;
}

export default function HintsPage() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  const hintSections: Record<string, HintSection> = {
    caesar: {
      title: t('caesarTitle'),
      description: t('caesarDesc'),
      examples: [
        'KHOOR → HELLO (shift: 3)',
        'MJQQT → HELLO (shift: 5)',
        'OLSSV → HELLO (shift: 7)'
      ]
    },
    rot13: {
      title: t('rot13Title'),
      description: t('rot13Desc'),
      examples: [
        'EBG13 → ROT13',
        'PNGURF → CHATRE',
        'EBG13_VF_FUN → ROT13_IS_SHA'
      ]
    },
    morse: {
      title: t('einsteinMorseTitle'),
      description: t('einsteinMorseDesc'),
      examples: [
        '.... . .-.. .-.. --- → HELLO',
        '.-- --- .-. .-.. -.. → WORLD',
        '.-. --- - .---- ...-- → ROT13'
      ]
    },
    binary: {
      title: t('einsteinBinaryTitle'),
      description: t('einsteinBinaryDesc'),
      examples: [
        '01001000 01100101 01101100 01101100 01101111 → HELLO',
        '01010111 01101111 01110010 01101100 01100100 → WORLD',
        '01010010 01001111 01010100 00110001 00110011 → ROT13'
      ]
    },
    hex: {
      title: t('einsteinHexTitle'),
      description: t('einsteinHexDesc'),
      examples: [
        '48 65 6C 6C 6F → HELLO',
        '57 6F 72 6C 64 → WORLD',
        '52 4F 54 31 33 → ROT13'
      ]
    },
    base64: {
      title: t('einsteinBase64Title'),
      description: t('einsteinBase64Desc'),
      examples: [
        'SEVMTE8= → HELLO',
        'V09STEQ= → WORLD',
        'Uk9UMTM= → ROT13'
      ]
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← {t('back')}
          </Link>
        </div>
        <Einstein message={t('encryptionHints')} />
        <div className="space-y-4">
          {Object.entries(hintSections).map(([, section], idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <button
                className="w-full text-left font-bold text-lg text-gray-900 dark:text-white focus:outline-none"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                {section.title}
              </button>
              {expanded === idx && (
                <div className="mt-2 text-gray-700 dark:text-gray-200">
                  <p>{section.description}</p>
                  {section.examples && (
                    <ul className="mt-2 list-disc list-inside space-y-1">
                      {section.examples.map((ex, i) => (
                        <li key={i}><span className="font-mono">{ex}</span></li>
                      ))}
                    </ul>
                  )}
                  {section.solution && (
                    <div className="mt-2">
                      <span className="font-semibold">{t('solution')}:</span> {section.solution}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 