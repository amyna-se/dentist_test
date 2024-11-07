import { motion } from 'framer-motion';
import { Users, Search, Video, FileText, BookOpen } from 'lucide-react';
import { usePatientEducation } from '../stores/modules/patientEducation';
import { useState } from 'react';

export function PatientEducation() {
  const { materials, categories, languages, searchMaterials } = usePatientEducation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const filteredMaterials = searchQuery || selectedCategory || selectedLanguage
    ? searchMaterials(searchQuery, {
        category: selectedCategory,
        language: selectedLanguage
      })
    : Object.values(materials);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'interactive':
        return Users;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Patient Education</h1>
            <p className="text-gray-400 mt-2">Educational materials for patients and caregivers</p>
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
                placeholder="Search materials..."
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

          <div className="mt-4 flex gap-2">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => setSelectedLanguage(selectedLanguage === language ? null : language)}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  selectedLanguage === language
                    ? 'bg-neon-green text-white'
                    : 'bg-dark-light text-gray-400 hover:bg-neon-green/20'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => {
            const Icon = getTypeIcon(material.type);
            return (
              <motion.div
                key={material.id}
                whileHover={{ scale: 1.02 }}
                className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{material.title}</h3>
                    <p className="text-gray-400">{material.category}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{material.content.description}</p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {material.targetAudience.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-1 text-sm rounded-full bg-neon-green/10 text-neon-green"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>

                  {material.interactions && (
                    <div className="flex items-center space-x-4 text-gray-400">
                      {material.interactions.hasQuiz && (
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          Quiz
                        </span>
                      )}
                      {material.interactions.hasInteractiveElements && (
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          Interactive
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-gray-400 text-sm">
                    Last updated: {new Date(material.metadata.lastUpdated).toLocaleDateString()}
                  </div>

                  <button
                    className="w-full px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                  >
                    View Material
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}