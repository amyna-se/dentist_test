import { motion } from 'framer-motion';
import { Shield, Clock, FileCheck, AlertTriangle } from 'lucide-react';
import { useCompliance } from '../stores/modules/compliance';
import { useAuth } from '../stores/auth';

export function Compliance() {
  const { requirements } = useCompliance();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Compliance</h1>
            <p className="text-gray-400 mt-2">Track and maintain regulatory compliance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(requirements).map((req) => (
            <motion.div
              key={req.id}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-neon-green/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{req.title}</h3>
                  <p className="text-gray-400">{req.category}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{req.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Renewal every {req.frequency} months</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FileCheck className="w-4 h-4 mr-2" />
                  <span>Required documents: {req.documents.length}</span>
                </div>
                {req.auditRequirements && (
                  <div className="flex items-center text-gray-400">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span>Next audit: {new Date(req.auditRequirements.nextAudit || '').toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  className="px-4 py-2 rounded-lg bg-neon-green/20 text-neon-green hover:bg-neon-green/30 transition"
                >
                  View Details
                </button>
                <div className="text-sm text-gray-400">
                  {req.regulatoryBody}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}