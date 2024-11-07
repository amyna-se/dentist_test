import { motion } from 'framer-motion';
import { Brain, Heart, Users } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neon-blue text-center mb-12">
            About NeuroStep
          </h1>

          <div className="prose prose-invert max-w-3xl mx-auto mb-16">
            <p className="text-xl text-gray-400 text-center">
              We're on a mission to transform how people understand and learn about
              neurodiversity through interactive, engaging experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neon-blue/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-neon-blue" />
              </div>
              <h3 className="text-xl font-bold text-neon-blue mb-4">Our Mission</h3>
              <p className="text-gray-400">
                To make learning about neurodiversity accessible, engaging, and effective
                through gamified education.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neon-purple/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold text-neon-purple mb-4">Our Values</h3>
              <p className="text-gray-400">
                We believe in inclusivity, understanding, and the power of education to
                create positive change.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neon-green/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-neon-green" />
              </div>
              <h3 className="text-xl font-bold text-neon-green mb-4">Our Community</h3>
              <p className="text-gray-400">
                Join thousands of learners committed to understanding and supporting
                neurodiversity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}