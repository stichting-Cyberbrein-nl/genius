'use client';

import { useLanguage } from '@/lib/i18n';
import { useFlags } from '@/hooks/useFlags';
import Link from 'next/link';
import Einstein from '@/components/Einstein';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import einsteinImg from '@/public/einstein.png';

export default function Flags() {
  const { t } = useLanguage();
  const { foundFlags, totalPoints } = useFlags();
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const handleDownload = async () => {
    setDownloading(true);
    const doc = new jsPDF();
    // Einstein afbeelding toevoegen
    try {
      const img = new Image();
      img.src = '/einstein.png';
      await new Promise((resolve) => { img.onload = resolve; });
      doc.addImage(img, 'PNG', 80, 10, 50, 50);
    } catch {}
    let y = 70;
    doc.setFontSize(20);
    doc.text(t('certificateTitle'), 105, y, { align: 'center' });
    y += 15;
    doc.setFontSize(14);
    doc.text(t('certificateCongrats', { name: userName || t('certificateNameLabel') }), 105, y, { align: 'center' });
    y += 10;
    doc.setFontSize(12);
    doc.text(`${t('certificateFoundFlags')}: ${foundFlags.length}`, 105, y, { align: 'center' });
    y += 8;
    doc.text(`${t('certificateDate')}: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 105, y, { align: 'center' });
    y += 12;
    // Vlaggenlijst
    if (foundFlags.length > 0) {
      doc.setFontSize(13);
      doc.text(t('certificateFlagList'), 20, y);
      y += 7;
      doc.setFontSize(11);
      foundFlags.forEach((flag) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`${t('certificateFlag')}: ${flag.name}`, 25, y);
        y += 6;
        doc.text(`${flag.description}`, 30, y);
        y += 6;
        doc.text(`${t('certificatePoints')}: ${flag.points} | ${t('certificateDate')}: ${flag.foundAt ? new Date(flag.foundAt).toLocaleString() : ''}`, 30, y);
        y += 10;
      });
    }
    y += 5;
    doc.setFontSize(12);
    doc.text(t('certificateFooter'), 105, y, { align: 'center' });
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
            <Einstein message={foundFlags.length === 0 ? t('noFlags') : `${t('flagsMessage')} ${t('totalPoints')}: ${totalPoints}`} />
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