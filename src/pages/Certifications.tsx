import { motion } from 'framer-motion';
import { Award, Download, Clock, CheckCircle, BookOpen, Star } from 'lucide-react';
import { useState } from 'react';
import { useCertifications } from '../stores/modules/certifications';

export function Certifications() {
  const { certificates, progress, downloadCertificate } = useCertifications();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Certificates' },
    { id: 'completed', label: 'Completed' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'available', label: 'Available' }
  ];

  const filteredCertificates = certificates.filter(cert => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'completed') return progress[cert.id]?.completed;
    if (selectedFilter === 'in-progress') return progress[cert.id]?.started && !progress[cert.id]?.completed;
    if (selectedFilter === 'available') return !progress[cert.id]?.started;
    return true;
  });

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Certifications</h1>
            <p className="text-gray-400 mt-2">Track your professional development and achievements</p>
          </div>
          
          <div className="flex gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedFilter === filter.id
                    ? 'bg-neon-purple text-white'
                    : 'bg-dark-light text-gray-400 hover:bg-neon-purple/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map(certificate => {
            const certProgress = progress[certificate.id] || { completed: false, started: false, progress: 0 };
            
            return (
              <motion.div
                key={certificate.id}
                whileHover={{ scale: 1.02 }}
                className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{certificate.title}</h3>
                    <p className="text-gray-400">{certificate.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-300">{certificate.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {certificate.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {certificate.modules} modules
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {certificate.credits} credits
                    </span>
                  </div>

                  {certProgress.started && !certProgress.completed && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-neon-blue">{certProgress.progress}%</span>
                      </div>
                      <div className="h-2 bg-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neon-blue transition-all duration-500"
                          style={{ width: `${certProgress.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {certProgress.completed ? (
                    <button
                      onClick={() => downloadCertificate(certificate.id)}
                      className="w-full px-4 py-2 rounded-lg bg-neon-green/20 text-neon-green hover:bg-neon-green/30 transition flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Certificate</span>
                    </button>
                  ) : certProgress.started ? (
                    <button className="w-full px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition">
                      Continue Learning
                    </button>
                  ) : (
                    <button className="w-full px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition">
                      Start Certification
                    </button>
                  )}

                  {certificate.expiresAt && (
                    <p className="text-sm text-gray-400 flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Expires: {new Date(certificate.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}