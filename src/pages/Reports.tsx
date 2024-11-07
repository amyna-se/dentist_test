import { motion } from 'framer-motion';
import { BarChart, Download, FileText, Filter } from 'lucide-react';
import { useReporting } from '../stores/modules/reporting';
import { useState } from 'react';

export function Reports() {
  const { reports, generateReport, exportReport } = useReporting();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const reportTypes = [
    'compliance',
    'progress',
    'certification',
    'audit'
  ];

  const filteredReports = selectedType
    ? Object.values(reports).filter(report => report.type === selectedType)
    : Object.values(reports);

  const handleExport = async (reportId: string) => {
    try {
      const url = await exportReport(reportId, 'pdf');
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Reports</h1>
            <p className="text-gray-400 mt-2">Generate and view analytical reports</p>
          </div>
          <button
            onClick={() => generateReport('template-1', {})}
            className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition"
          >
            Generate Report
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" />
            <div className="flex gap-2">
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedType === type
                      ? 'bg-neon-blue text-white'
                      : 'bg-dark-light text-gray-400 hover:bg-neon-blue/20'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{report.title}</h3>
                  <p className="text-gray-400">{report.type}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-gray-400">
                  Generated: {new Date(report.metadata.generatedAt).toLocaleDateString()}
                </div>
                <div className="text-gray-400">
                  Format: {report.metadata.format}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport(report.id)}
                  className="flex-1 px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  className="flex-1 px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>View</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}