import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Brain, Activity, Calendar, FileText } from 'lucide-react';
import { ModuleCard } from '../components/Admin/ModuleCard';
import { ModuleEditor } from '../components/Admin/ModuleEditor';
import { CourseEditor } from '../components/Admin/CourseEditor';
import { LearningPathEditor } from '../components/Admin/LearningPathEditor';
import { OnboardingEditor } from '../components/Admin/OnboardingEditor';
import { UserManager } from '../components/Admin/UserManager';

export function AdminDashboard() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage users and permissions',
      icon: Users,
      color: 'green',
      component: UserManager
    },
    {
      id: 'courses',
      title: 'Course Editor',
      description: 'Create and edit courses',
      icon: BookOpen,
      color: 'blue',
      component: CourseEditor
    },
    {
      id: 'learning-paths',
      title: 'Learning Paths',
      description: 'Design and manage learning paths',
      icon: Award,
      color: 'purple',
      component: LearningPathEditor
    },
    {
      id: 'onboarding',
      title: 'Onboarding Manager',
      description: 'Customize onboarding flow',
      icon: Brain,
      color: 'pink',
      component: OnboardingEditor
    }
  ];

  const renderModule = () => {
    const module = modules.find(m => m.id === activeModule);
    if (!module) return null;
    const Component = module.component;
    return <Component />;
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your learning platform</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              icon={module.icon}
              color={module.color}
              stats={[]}
              onEdit={() => setActiveModule(module.id)}
            />
          ))}
        </div>

        {activeModule && (
          <ModuleEditor
            title={modules.find(m => m.id === activeModule)?.title || ''}
            onClose={() => setActiveModule(null)}
          >
            {renderModule()}
          </ModuleEditor>
        )}
      </div>
    </div>
  );
}