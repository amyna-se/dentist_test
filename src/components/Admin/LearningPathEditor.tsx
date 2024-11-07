import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Save, X, ChevronDown, ChevronUp, BookOpen, Target, Calendar } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  prerequisites: string[];
  objectives: string[];
  courses: string[];
  requiredFor: string[];
  completionCriteria: {
    minScore: number;
    requiredModules: string[];
  };
}

const defaultPath: LearningPath = {
  id: '',
  title: '',
  description: '',
  duration: '',
  prerequisites: [],
  objectives: [],
  courses: [],
  requiredFor: [],
  completionCriteria: {
    minScore: 80,
    requiredModules: []
  }
};

export function LearningPathEditor() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  const handleAddPath = () => {
    const newPath = {
      ...defaultPath,
      id: `path-${Date.now()}`
    };
    setEditingPath(newPath);
  };

  const handleSavePath = () => {
    if (editingPath) {
      setPaths(prevPaths => {
        const existingPathIndex = prevPaths.findIndex(p => p.id === editingPath.id);
        if (existingPathIndex >= 0) {
          const updatedPaths = [...prevPaths];
          updatedPaths[existingPathIndex] = editingPath;
          return updatedPaths;
        }
        return [...prevPaths, editingPath];
      });
      setEditingPath(null);
    }
  };

  const handleArrayInput = (
    field: keyof Pick<LearningPath, 'prerequisites' | 'objectives' | 'courses' | 'requiredFor'>,
    value: string
  ) => {
    if (editingPath) {
      setEditingPath({
        ...editingPath,
        [field]: value.split(',').map(item => item.trim())
      });
    }
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-neon-purple" />
          <h2 className="text-xl font-bold text-white">Learning Paths</h2>
        </div>
        <button
          onClick={handleAddPath}
          className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Learning Path</span>
        </button>
      </div>

      <div className="space-y-4">
        {paths.map(path => (
          <div
            key={path.id}
            className="border border-neon-blue/10 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 bg-dark-light cursor-pointer"
              onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{path.title}</h3>
                <p className="text-gray-400">{path.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPath(path);
                  }}
                  className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {expandedPath === path.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {expandedPath === path.id && (
              <div className="p-4 border-t border-neon-blue/10 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Duration</h4>
                    <p className="text-white">{path.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Minimum Score</h4>
                    <p className="text-white">{path.completionCriteria.minScore}%</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Prerequisites</h4>
                  <ul className="list-disc list-inside text-white">
                    {path.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Courses</h4>
                  <ul className="list-disc list-inside text-white">
                    {path.courses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {editingPath && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-dark-light rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingPath.id ? 'Edit Learning Path' : 'New Learning Path'}
              </h3>
              <button
                onClick={() => setEditingPath(null)}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingPath.title}
                  onChange={(e) => setEditingPath({
                    ...editingPath,
                    title: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={editingPath.description}
                  onChange={(e) => setEditingPath({
                    ...editingPath,
                    description: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={editingPath.duration}
                  onChange={(e) => setEditingPath({
                    ...editingPath,
                    duration: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                  placeholder="e.g., 4 weeks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Prerequisites (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingPath.prerequisites.join(', ')}
                  onChange={(e) => handleArrayInput('prerequisites', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Courses (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingPath.courses.join(', ')}
                  onChange={(e) => handleArrayInput('courses', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Required For (comma-separated)
                </label>
                <input
                  type="text"
                  value={editingPath.requiredFor.join(', ')}
                  onChange={(e) => handleArrayInput('requiredFor', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Minimum Score (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingPath.completionCriteria.minScore}
                  onChange={(e) => setEditingPath({
                    ...editingPath,
                    completionCriteria: {
                      ...editingPath.completionCriteria,
                      minScore: Number(e.target.value)
                    }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingPath(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePath}
                  className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Path</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}