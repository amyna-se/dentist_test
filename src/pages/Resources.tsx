import { motion } from 'framer-motion';
import { FileText, Video, Headphones, Link as LinkIcon, Search } from 'lucide-react';
import { useResources } from '../stores/modules/resources';
import { useState } from 'react';

export function Resources() {
  const { resources, categories, searchResources } = useResources();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = searchQuery || selectedCategory
    ? searchResources(searchQuery, selectedCategory ? { category: selectedCategory } : undefined)
    : Object.values(resources);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'audio':
        return Headphones;
      case 'link':
        return LinkIcon;
      default:
        return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Resources</h1>
            <p className="text-gray-400 mt-2">Access training materials and documentation</p>
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
                placeholder="Search resources..."
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
          {filteredResources.map((resource) => {
            const Icon = getResourceIcon(resource.type);
            return (
              <motion.div
                key={resource.id}
                whileHover={{ scale: 1.02 }}
                className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                    <p className="text-gray-400">{resource.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm rounded-full bg-neon-blue/10 text-neon-blue"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-gray-400 text-sm">
                    Last updated: {new Date(resource.content.lastUpdated).toLocaleDateString()}
                  </div>

                  <button
                    className="w-full px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                  >
                    View Resource
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