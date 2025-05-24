'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useFlags } from '@/hooks/useFlags';
import Link from 'next/link';
import Einstein from '@/components/Einstein';

export default function Admin() {
  const { t } = useLanguage();
  const { findFlag, getFlagByType } = useFlags();

  useEffect(() => {
    const flag = getFlagByType('admin');
    if (flag && !flag.found) {
      findFlag('admin');
    }
  }, [findFlag, getFlagByType]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t('adminPanel')}
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {t('adminPanelDescription')}
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('backToHome')}
          </Link>
        </div>
        <div className="mt-8">
          <Einstein message={t('adminMessage')} />
        </div>
      </div>
    </div>
  );
} 