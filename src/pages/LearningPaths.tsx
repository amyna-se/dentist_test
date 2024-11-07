import { motion } from 'framer-motion';
import { BookOpen, Star, Clock, Award } from 'lucide-react';
import { useLearningPaths } from '../stores/modules/learningPaths';
import { useAuth } from '../stores/auth';
import { Link } from 'react-router-dom';

export function LearningPaths() {
  const { paths } = useLearningPaths();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Learning Paths</h1>
            <p className="text-gray-400 mt-2">Master your skills with structured learning paths</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(paths).map((path) => (
            <motion.div
              key={path.id}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{path.title}</h3>
                  <p className="text-gray-400">{path.category}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{path.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{path.estimatedHours} hours</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Star className="w-4 h-4 mr-2" />
                  <span>{path.modules.length} modules</span>
                </div>
                {path.certificationId && (
                  <div className="flex items-center text-gray-400">
                    <Award className="w-4 h-4 mr-2" />
                    <span>Includes certification</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <Link
                  to={`/learning-paths/${path.id}`}
                  className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                >
                  Start Learning
                </Link>
                {path.prerequisites.length > 0 && (
                  <div className="text-sm text-gray-400">
                    Prerequisites: {path.prerequisites.length}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}