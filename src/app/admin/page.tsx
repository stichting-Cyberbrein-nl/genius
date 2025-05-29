'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useFlags } from '@/hooks/useFlags';
import Link from 'next/link';
import Einstein from '@/components/Einstein';
import { motion } from 'framer-motion';

export default function Admin() {
  const { t } = useLanguage();
  const { findFlag } = useFlags();
  const flagFoundRef = useRef(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [einsteinMessage, setEinsteinMessage] = useState(t('adminMessage') as string);

  useEffect(() => {
    if (!flagFoundRef.current) {
      findFlag('admin_flag');
      flagFoundRef.current = true;
    }
  }, []); // Empty dependency array since we only want to run this once

  const handleDeleteAll = () => {
    if (deleteConfirm === 'DELETE_ALL') {
      findFlag('admin_delete_flag');
      setEinsteinMessage(t('adminDeleteFlagFound') as string);
      setShowDeleteWarning(false);
      setDeleteConfirm('');
    } else {
      setShowDeleteWarning(true);
    }
  };

  const handleToggleMaintenance = () => {
    findFlag('admin_maintenance_flag');
    setEinsteinMessage(t('adminMaintenanceFlagFound') as string);
  };

  const handleUpdateSettings = () => {
    findFlag('admin_settings_flag');
    setEinsteinMessage(t('adminSettingsFlagFound') as string);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {t('back')}
          </Link>
        </div>

        <Einstein message={einsteinMessage} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('adminPanel')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('adminPanelDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Maintenance Mode Toggle */}
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t('maintenanceMode')}</h3>
              <button
                onClick={handleToggleMaintenance}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                {t('toggleMaintenance')}
              </button>
            </div>

            {/* Settings Update */}
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t('updateSettings')}</h3>
              <button
                onClick={handleUpdateSettings}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t('applyUpdates')}
              </button>
            </div>

            {/* Delete All Data */}
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">{t('dangerZone')}</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder={t('typeToConfirm') as string}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={handleDeleteAll}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  {t('deleteAllData')}
                </button>
                {showDeleteWarning && (
                  <p className="text-red-500 text-sm">
                    {t('deleteWarning')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 