// Import necessary libraries and components
import { useState, useEffect } from 'react'; // React hooks for managing state and side effects
import { useNavigate } from 'react-router-dom'; // Hook for navigating between routes programmatically
import { Brain, Trophy, Star, BookOpen, ArrowRight, Settings } from 'lucide-react'; // Icon components for visual cues
import { useAuth } from '../stores/auth'; // Custom hook to access user authentication and state
import { CourseEditor } from '../components/Admin/CourseEditor'; // Admin-only component for managing courses
import { UserSettings } from '../components/Dashboard/UserSettings'; // Component for displaying and modifying user settings
import { quizData } from '../data/quizData'; // Data source for available quizzes

// Define the structure of a Course object
export interface Course {
  id: string; // Unique identifier for the course
  title: string; // Name of the course
  description: string; // Brief description of the course
  progress: number; // Percentage of completion
  icon: JSX.Element; // Icon associated with the course
  category: string; // Course category (e.g., Autism, ADHD)
}

/**
 * Maps the `quizData` to an array of `Course` objects, adding icons and categories.
 */
const mapQuizDataToCourses = (): Course[] => {
  return Object.entries(quizData).map(([id, data]) => ({
    id,
    title: data.title,
    description: data.description,
    progress: 0, // Default progress is set to 0
    icon: getIconForCategory(data.title), // Dynamically determine the icon
    category: getCategoryFromTitle(data.title), // Dynamically determine the category
  }));
};

/**
 * Determines the appropriate icon for a course based on its title.
 * @param {string} title - The title of the course
 * @returns {JSX.Element} - The icon element
 */
const getIconForCategory = (title: string): JSX.Element => {
  if (title.toLowerCase().includes('autism')) {
    return <Brain className="w-8 h-8 text-blue-500" />;
  } else if (title.toLowerCase().includes('adhd')) {
    return <Star className="w-8 h-8 text-pink-500" />;
  } else if (title.toLowerCase().includes('relationship')) {
    return <Trophy className="w-8 h-8 text-purple-500" />;
  } else {
    return <BookOpen className="w-8 h-8 text-green-500" />;
  }
};

/**
 * Determines the category of a course based on its title.
 * @param {string} title - The title of the course
 * @returns {string} - The category (e.g., Autism, ADHD, etc.)
 */
const getCategoryFromTitle = (title: string): string => {
  if (title.toLowerCase().includes('autism')) {
    return 'Autism';
  } else if (title.toLowerCase().includes('adhd')) {
    return 'ADHD';
  } else if (title.toLowerCase().includes('relationship')) {
    return 'Relationships';
  } else {
    return 'General';
  }
};

/**
 * Dashboard Component:
 * Displays the user's progress, available courses, and admin tools (if applicable).
 */
export function Dashboard() {
  const navigate = useNavigate(); // Hook for navigation
  const { user, courseProgress, userStats, isAdmin } = useAuth(); // Destructure values from the auth store
  const [courses, setCourses] = useState<Course[]>(mapQuizDataToCourses()); // State for courses
  const [showCourseEditor, setShowCourseEditor] = useState(false); // State for toggling the Course Editor
  const [showSettings, setShowSettings] = useState(false); // State for toggling User Settings

  /**
   * Effect to synchronize course progress with user data.
   * Redirects to `/auth` if the user is not logged in.
   */
  useEffect(() => {
    if (!user) {
      navigate('/auth'); // Redirect unauthenticated users to the login page
      return;
    }

    // Update course progress based on the user's progress data
    setCourses((prevCourses) =>
      prevCourses.map((course) => ({
        ...course,
        progress: Math.round(courseProgress[course.id] || 0), // Set progress or default to 0
      }))
    );
  }, [user, navigate, courseProgress]); // Runs whenever user or courseProgress changes

  // Navigate to a specific course's quiz
  const handleStartCourse = (courseId: string) => {
    navigate(`/quiz/${courseId}`);
  };

  // Navigate to the onboarding process
  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  // Render nothing if the user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-400">Continue your learning journey</p>
            </div>
            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Open User Settings */}
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition"
              >
                <Settings className="w-5 h-5" />
              </button>
              {/* Restart Onboarding */}
              <button
                onClick={handleStartOnboarding}
                className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition"
              >
                Restart Onboarding
              </button>
              {/* Toggle Course Editor for Admins */}
              {isAdmin && (
                <button
                  onClick={() => setShowCourseEditor(!showCourseEditor)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition"
                >
                  <span>{showCourseEditor ? 'Hide Course Editor' : 'Show Course Editor'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Admin Course Editor */}
        {showCourseEditor && isAdmin && <CourseEditor />}

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total XP" value={userStats.totalXP} icon={<Trophy className="w-6 h-6 text-yellow-500" />} />
          <StatCard title="Courses Completed" value={userStats.completedCourses} icon={<BookOpen className="w-6 h-6 text-green-500" />} />
          <StatCard title="Current Streak" value={`${userStats.currentStreak} days`} icon={<Star className="w-6 h-6 text-orange-500" />} />
        </div>

        {/* User Courses */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onClick={handleStartCourse} />
            ))}
          </div>
        </div>
      </div>

      {/* User Settings Modal */}
      <UserSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

/**
 * Helper Component: Displays a single statistic.
 */
const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: JSX.Element }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold text-white mt-2">{value}</p>
  </div>
);

/**
 * Helper Component: Displays a single course.
 */
const CourseCard = ({ course, onClick }: { course: Course; onClick: (courseId: string) => void }) => (
  <div
    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
    onClick={() => onClick(course.id)}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-4">
        {course.icon}
        <div>
          <h3 className="text-xl font-semibold text-white">{course.title}</h3>
          <p className="text-gray-400 mt-1">{course.description}</p>
        </div>
      </div>
      <ArrowRight className="w-6 h-6 text-gray-400" />
    </div>
    <div className="mt-4">
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${course.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-400 mt-2">{course.progress}% complete</p>
    </div>
  </div>
);
