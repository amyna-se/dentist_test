import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../stores/auth';

export function AdminUserTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();
  const { exportUserData } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">{t('admin.userTable.title')}</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('admin.userTable.searchUsers')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
            />
          </div>
          <button
            onClick={exportUserData}
            className="px-4 py-2 rounded-lg bg-neon-green/20 text-neon-green hover:bg-neon-green/30 transition flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>{t('admin.userTable.export')}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-3 text-gray-400 font-medium">{t('admin.userTable.columns.user')}</th>
              <th className="pb-3 text-gray-400 font-medium">{t('admin.userTable.columns.role')}</th>
              <th className="pb-3 text-gray-400 font-medium">{t('admin.userTable.columns.location')}</th>
              <th className="pb-3 text-gray-400 font-medium">{t('admin.userTable.columns.progress')}</th>
              <th className="pb-3 text-gray-400 font-medium">{t('admin.userTable.columns.lastActive')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {/* User data will be populated here */}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}