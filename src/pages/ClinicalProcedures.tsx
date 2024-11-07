import { motion } from 'framer-motion';
import { Stethoscope, AlertTriangle, FileCheck, Search } from 'lucide-react';
import { useClinicalProcedures } from '../stores/modules/clinicalProcedures';
import { useState } from 'react';

export function ClinicalProcedures() {
  const { procedures, categories, searchProcedures } = useClinicalProcedures();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string | null>(null);

  const filteredProcedures = searchQuery || selectedCategory || selectedRiskLevel
    ? searchProcedures(searchQuery, {
        category: selectedCategory,
        riskLevel: selectedRiskLevel
      })
    : Object.values(procedures);

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Clinical Procedures</h1>
            <p className="text-gray-400 mt-2">Standard operating procedures and guidelines</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search procedures..."
                className="w-full pl-10 pr-4 py-2 bg-dark-light rounded-lg border border-neon-blue/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-neon-purple text-white'
                      : 'bg-dark-light text-gray-400 hover:bg-neon-purple/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcedures.map((procedure) => (
            <motion.div
              key={procedure.id}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-neon-green/10 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{procedure.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">{procedure.category}</span>
                    <span className={`px-2 py-0.5 text-sm rounded-full ${
                      procedure.riskLevel === 'high'
                        ? 'bg-red-500/10 text-red-500'
                        : procedure.riskLevel === 'medium'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-green-500/10 text-green-500'
                    }`}>
                      {procedure.riskLevel} risk
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {procedure.requiredCertifications.length > 0 && (
                  <div className="flex items-center text-gray-400">
                    <FileCheck className="w-4 h-4 mr-2" />
                    <span>Required certifications: {procedure.requiredCertifications.length}</span>
                  </div>
                )}
                {procedure.contraindications.length > 0 && (
                  <div className="flex items-center text-gray-400">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span>{procedure.contraindications.length} contraindications</span>
                  </div>
                )}
              </div>

              <button
                className="w-full px-4 py-2 rounded-lg bg-neon-green/20 text-neon-green hover:bg-neon-green/30 transition"
              >
                View Procedure
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}