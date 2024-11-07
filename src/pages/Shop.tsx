import { motion } from 'framer-motion';
import { Brain, Activity, Star, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../stores/auth';

const courses = [
  {
    id: 'autism-101',
    title: 'Understanding Autism',
    description: 'A comprehensive course on understanding autism spectrum disorder.',
    price: 49.99,
    icon: Brain,
    color: 'purple',
    features: ['10 Interactive Modules', 'Progress Tracking', 'Certificate', 'Community Access'],
  },
  {
    id: 'adhd-101',
    title: 'ADHD Essentials',
    description: 'Learn about ADHD, its impacts, and effective management strategies.',
    price: 49.99,
    icon: Activity,
    color: 'green',
    features: ['8 Interactive Modules', 'Progress Tracking', 'Certificate', 'Community Access'],
  },
];

export function Shop() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-blue text-center mb-12">
            Available Courses
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg bg-neon-${course.color}/10 flex items-center justify-center`}>
                    <course.icon className={`w-6 h-6 text-neon-${course.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    <p className="text-gray-400">${course.price}</p>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">{course.description}</p>

                <ul className="space-y-3 mb-6">
                  {course.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <Star className={`w-4 h-4 text-neon-${course.color}`} />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={isAuthenticated ? `/quiz/${course.id}` : '/auth'}
                  className={`w-full px-4 py-2 rounded-lg bg-neon-${course.color}/20 text-neon-${course.color} hover:bg-neon-${course.color}/30 transition flex items-center justify-center space-x-2`}
                >
                  <span>{isAuthenticated ? 'Start Learning' : 'Sign In to Enroll'}</span>
                  <LinkIcon className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}