import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Trophy, Star, BookOpen, ArrowRight, Settings } from 'lucide-react';
import { useAuth } from '../stores/auth';
import { CourseEditor } from '../components/Admin/CourseEditor';
import { UserSettings } from '../components/Dashboard/UserSettings';
import { quizData } from '../data/quizData';

export interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
  icon: JSX.Element;
  category: string;
}

const mapQuizDataToCourses = (): Course[] => {
  return Object.entries(quizData).map(([id, data]) => ({
    id,
    title: data.title,
    description: data.description,
    progress: 0,
    icon: getIconForCategory(data.title),
    category: getCategoryFromTitle(data.title)
  }));
};

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

export function Dashboard() {
  const navigate = useNavigate();
  const { user, courseProgress, userStats, isAdmin } = useAuth();
  const [courses, setCourses] = useState<Course[]>(mapQuizDataToCourses());
  const [showCourseEditor, setShowCourseEditor] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setCourses(prevCourses =>
      prevCourses.map(course => ({
        ...course,
        progress: Math.round(courseProgress[course.id] || 0)
      }))
    );
  }, [user, navigate, courseProgress]);

  const handleStartCourse = (courseId: string) => {
    navigate(`/quiz/${courseId}`);
  };

  const handleStartOnboarding = () => {
    navigate('/onboarding');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-400">Continue your learning journey</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleStartOnboarding}
                className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition"
              >
                Restart Onboarding
              </button>
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

        {showCourseEditor && isAdmin && <CourseEditor />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Total XP</h3>
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{userStats.totalXP}</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Courses Completed</h3>
              <BookOpen className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{userStats.completedCourses}</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Current Streak</h3>
              <Star className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">
              {userStats.currentStreak} days
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => handleStartCourse(course.id)}
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
            ))}
          </div>
        </div>
      </div>

      <UserSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}