'use client';

import { useLanguage } from '@/lib/i18n';
import { useFlags } from '@/hooks/useFlags';
import Link from 'next/link';
import Einstein from '@/components/Einstein';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

export default function Flags() {
  const { t } = useLanguage();
  const { foundFlags, totalPoints } = useFlags();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedFlags = localStorage.getItem('flags');
      if (savedFlags) {
        const parsedFlags = JSON.parse(savedFlags);
        const foundFlags = parsedFlags.filter((f: { found: boolean; name: string; description: string; points: number; foundAt?: string; id: string }) => f.found);
        if (foundFlags.length !== foundFlags.length) {
          setIsClient(false);
          setTimeout(() => setIsClient(true), 0);
        }
      }
    }
  }, [foundFlags, isClient]);

  const handleDownload = async () => {
    setDownloading(true);
    const doc = new jsPDF();
    
    // Add Einstein image
    try {
      const img = new Image();
      img.src = '/einstein.png';
      await new Promise((resolve) => { img.onload = resolve; });
      doc.addImage(img, 'PNG', 80, 10, 50, 50);
    } catch {}

    // Set colors
    const primaryColor = '#4F46E5'; // Indigo
    const secondaryColor = '#10B981'; // Emerald
    const textColor = '#1F2937'; // Dark gray

    // Title
    doc.setFontSize(24);
    doc.setTextColor(primaryColor);
    doc.text(t('certificateTitle'), 105, 70, { align: 'center' });

    // Congratulations message
    doc.setFontSize(16);
    doc.setTextColor(textColor);
    const name = userName || (t('certificateNameLabel') as string);
    doc.text(t('certificateCongrats', { name }), 105, 85, { align: 'center' });

    // Achievement section
    doc.setFontSize(14);
    doc.setTextColor(secondaryColor);
    doc.text(t('certificateFoundFlags') + ': ' + foundFlags.length, 105, 95, { align: 'center' });
    doc.text(t('certificateDate') + ': ' + new Date().toLocaleDateString(), 105, 102, { align: 'center' });

    // Flag list
    if (foundFlags.length > 0) {
      doc.setFontSize(13);
      doc.setTextColor(primaryColor);
      doc.text(t('certificateFlagList'), 20, 115);
      
      doc.setFontSize(11);
      doc.setTextColor(textColor);
      let y = 125;
      foundFlags.forEach((flag) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(t('certificateFlag') + ': ' + flag.name, 25, y);
        y += 6;
        doc.text(flag.description, 30, y);
        y += 6;
        doc.text(t('certificatePoints') + ': ' + flag.points + ' | ' + t('certificateDate') + ': ' + (flag.foundAt ? new Date(flag.foundAt).toLocaleString() : ''), 30, y);
        y += 10;
      });
    }

    // Cyberbrein information
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(primaryColor);
    doc.text('Over Stichting Cyberbrein', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    const cyberbreinText = [
      'Stichting Cyberbrein is dé plek om meer te leren over cybersecurity!',
      '',
      'Leer spelenderwijs over cybersecurity',
      'Ontmoet andere jonge hackers',
      'Doe mee aan spannende challenges',
      'Leer van ervaren cybersecurity experts',
      '',
      'Wil je meer leren?',
      '• Bezoek cyberbrein.nl',
      '• Word lid van onze Discord community',
      '• Doe mee aan onze workshops en events',
      '',
      'Samen maken we het internet veiliger!'
    ];

    let y = 35;
    cyberbreinText.forEach(line => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(line, 20, y);
      y += 8;
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text(t('certificateFooter'), 105, 280, { align: 'center' });
    
    doc.save(`genius-certificate-${userName || 'participant'}.pdf`);
    setDownloading(false);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Terug
          </Link>
        </div>

        <div className="mb-8">
          {isClient && (
            <Einstein message={foundFlags.length === 0 ? t('noFlags') as string : `${t('flagsMessage') as string} ${t('totalPoints') as string}: ${totalPoints}`} />
          )}
        </div>

        {/* Opslaan knop */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Certificaat opslaan
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs">
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{t('certificateNameLabel')}</h2>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
                placeholder="Jouw naam"
                disabled={downloading}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                  disabled={downloading}
                >Annuleren</button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={downloading || !userName.trim()}
                >{downloading ? 'Downloaden...' : 'Download PDF'}</button>
              </div>
            </div>
          </div>
        )}

        {isClient && foundFlags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {foundFlags.map((flag) => (
              <motion.div
                key={flag.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {flag.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {flag.description}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      {t('foundAt')}: {new Date(flag.foundAt!).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {flag.points} {t('points')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
} 