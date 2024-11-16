// Import necessary libraries and components
import { useState } from 'react'; // React hook for managing local state
import { motion } from 'framer-motion'; // For animations and transitions
import { Plus, Edit2, Save, X, ChevronDown, ChevronUp } from 'lucide-react'; // Icon components
import { useCourses } from '../../stores/courses'; // Custom hook for managing course data

/**
 * CourseEditor Component:
 * Provides an interface for creating, editing, and managing courses and their questions.
 */
export function CourseEditor() {
  // Access course-related actions and state from the `useCourses` store
  const { courses, addCourse, updateCourse, assignCourseToAllUsers } = useCourses();

  // State variables
  const [editingCourse, setEditingCourse] = useState<any | null>(null); // Tracks the course being edited or created
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null); // Tracks which course is expanded in the UI
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null); // Tracks the question being edited

  /**
   * Adds a new course by initializing its structure and enabling the edit mode.
   */
  const handleAddCourse = () => {
    const newCourse = {
      id: `course-${Date.now()}`, // Unique ID for the new course
      title: 'New Course', // Default title
      description: 'Course description', // Default description
      questions: [] // Empty array for questions
    };
    setEditingCourse(newCourse); // Set the new course for editing
  };

  /**
   * Saves the current course being edited.
   * - Adds the course to the global state.
   * - Assigns the course to all users.
   * - Resets the editing state.
   */
  const handleSaveCourse = () => {
    if (editingCourse) {
      addCourse(editingCourse.id, editingCourse); // Add course to the global store
      assignCourseToAllUsers(editingCourse.id, editingCourse); // Assign course to all users
      setEditingCourse(null); // Exit editing mode
    }
  };

  /**
   * Adds a new question to the currently editing course.
   */
  const handleAddQuestion = () => {
    if (editingCourse) {
      const newQuestion = {
        id: `q-${Date.now()}`, // Unique ID for the question
        type: 'multiple-choice', // Default question type
        question: 'New Question', // Placeholder question text
        options: ['Option 1', 'Option 2'], // Default options
        correctAnswer: 'Option 1', // Default correct answer
        emoji: '📝' // Default emoji
      };
      setEditingQuestion(newQuestion); // Set the new question for editing
    }
  };

  /**
   * Saves the current question being edited.
   * - Updates or adds the question to the course's question list.
   */
  const handleSaveQuestion = (question: any) => {
    if (editingCourse) {
      const updatedQuestions = editingQuestion
        ? editingCourse.questions.map((q: any) =>
            q.id === editingQuestion.id ? question : q
          ) // Update existing question
        : [...editingCourse.questions, question]; // Add new question

      setEditingCourse({
        ...editingCourse,
        questions: updatedQuestions // Update course's questions
      });
      setEditingQuestion(null); // Exit question editing mode
    }
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Course Editor</h2>
        <button
          onClick={handleAddCourse}
          className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </button>
      </div>

      {/* List of Courses */}
      <div className="space-y-4">
        {Object.entries(courses || {}).map(([courseId, course]) => (
          <div
            key={courseId}
            className="border border-neon-blue/10 rounded-lg overflow-hidden"
          >
            {/* Course Header */}
            <div
              className="flex items-center justify-between p-4 bg-dark-light cursor-pointer"
              onClick={() =>
                setExpandedCourse(expandedCourse === courseId ? null : courseId)
              } // Toggle course expansion
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                <p className="text-gray-400">{course.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from toggling expansion
                    setEditingCourse({
                      ...course,
                      id: courseId,
                      questions: course.questions || []
                    }); // Set course for editing
                  }}
                  className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {expandedCourse === courseId ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" /> // Expanded state icon
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" /> // Collapsed state icon
                )}
              </div>
            </div>

            {/* Expanded Course Details */}
            {expandedCourse === courseId && (
              <div className="p-4 border-t border-neon-blue/10">
                <div className="space-y-2">
                  {course.questions?.map((question: any, index: number) => (
                    <div
                      key={question.id}
                      className="flex items-center justify-between p-3 bg-dark rounded-lg"
                    >
                      <div>
                        <span className="text-gray-400">#{index + 1}</span>
                        <span className="ml-2 text-white">
                          {question.type === 'info'
                            ? question.message // Info message
                            : question.question} // Question text
                        </span>
                      </div>
                      <div className="text-gray-400">{question.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Course Editing Modal */}
      {editingCourse && (
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
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingCourse.id ? 'Edit Course' : 'New Course'}
              </h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Course Form */}
            <div className="space-y-6">
              {/* Course Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      title: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              {/* Course Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  value={editingCourse.description}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      description: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                  rows={3}
                />
              </div>

              {/* Questions Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-gray-400">
                    Questions ({editingCourse.questions.length})
                  </label>
                  <button
                    onClick={handleAddQuestion}
                    className="px-3 py-1 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Question</span>
                  </button>
                </div>

                {/* List of Questions */}
                <div className="space-y-2">
                  {editingCourse.questions.map((question: any, index: number) => (
                    <div
                      key={question.id}
                      className="flex items-center justify-between p-3 bg-dark rounded-lg"
                    >
                      <div>
                        <span className="text-gray-400">#{index + 1}</span>
                        <span className="ml-2 text-white">
                          {question.type === 'info'
                            ? question.message
                            : question.question}
                        </span>
                      </div>
                      <button
                        onClick={() => setEditingQuestion(question)}
                        className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCourse}
                  className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Course</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
