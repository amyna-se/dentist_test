// Import necessary libraries and components
import { useState } from 'react'; // React hook for managing state
import { motion } from 'framer-motion'; // Library for animations
import { Users, BookOpen, Award, Brain } from 'lucide-react'; // Icon components for visual representation
import { ModuleCard } from '../components/Admin/ModuleCard'; // Component to display each admin module as a card
import { ModuleEditor } from '../components/Admin/ModuleEditor'; // Modal-like component for editing modules
import { CourseEditor } from '../components/Admin/CourseEditor'; // Component for managing courses
import { LearningPathEditor } from '../components/Admin/LearningPathEditor'; // Component for managing learning paths
import { OnboardingEditor } from '../components/Admin/OnboardingEditor'; // Component for managing the onboarding process
import { UserManager } from '../components/Admin/UserManager'; // Component for managing users

/**
 * AdminDashboard Component:
 * Provides an interface for admins to manage the platform, including users, courses, learning paths, and onboarding flows.
 */
export function AdminDashboard() {
  // State to track the currently active module being edited
  const [activeModule, setActiveModule] = useState<string | null>(null);

  /**
   * Defines the available modules on the admin dashboard.
   * Each module includes:
   * - `id`: Unique identifier for the module
   * - `title`: Display name of the module
   * - `description`: A short description of the module's purpose
   * - `icon`: Icon component for visual representation
   * - `color`: A color to style the module's card
   * - `component`: The React component to render when the module is active
   */
  const modules = [
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage users and permissions',
      icon: Users,
      color: 'green',
      component: UserManager,
    },
    {
      id: 'courses',
      title: 'Course Editor',
      description: 'Create and edit courses',
      icon: BookOpen,
      color: 'blue',
      component: CourseEditor,
    },
    {
      id: 'learning-paths',
      title: 'Learning Paths',
      description: 'Design and manage learning paths',
      icon: Award,
      color: 'purple',
      component: LearningPathEditor,
    },
    {
      id: 'onboarding',
      title: 'Onboarding Manager',
      description: 'Customize onboarding flow',
      icon: Brain,
      color: 'pink',
      component: OnboardingEditor,
    },
  ];

  /**
   * Renders the component associated with the active module.
   * - Finds the currently active module from the `modules` array.
   * - If a module is active, it renders its associated component.
   */
  const renderModule = () => {
    const module = modules.find((m) => m.id === activeModule); // Find the active module
    if (!module) return null; // If no module is active, render nothing
    const Component = module.component; // Extract the associated component
    return <Component />; // Render the component
  };

  return (
    <div className="min-h-screen bg-dark py-12">
      {/* Main container for the dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neon-blue">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your learning platform</p>
          </div>
        </div>

        {/* Grid of module cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {modules.map((module) => (
            <ModuleCard
              key={module.id} // Unique key for each module
              title={module.title} // Module title
              description={module.description} // Short description
              icon={module.icon} // Associated icon
              color={module.color} // Color for styling the card
              stats={[]} // Placeholder for stats (optional, could be used for future expansion)
              onEdit={() => setActiveModule(module.id)} // Set the module as active when the "Edit" button is clicked
            />
          ))}
        </div>

        {/* Active module editor */}
        {activeModule && (
          <ModuleEditor
            title={modules.find((m) => m.id === activeModule)?.title || ''} // Title of the active module
            onClose={() => setActiveModule(null)} // Close the editor when requested
          >
            {renderModule()} {/* Render the component for the active module */}
          </ModuleEditor>
        )}
      </div>
    </div>
  );
}
