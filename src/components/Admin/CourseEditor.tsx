import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useCourses } from '../../stores/courses';

export function CourseEditor() {
  const { courses, addCourse, updateCourse, assignCourseToAllUsers } = useCourses();
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);

  const handleAddCourse = () => {
    const newCourse = {
      id: `course-${Date.now()}`,
      title: 'New Course',
      description: 'Course description',
      questions: []
    };
    setEditingCourse(newCourse);
  };

  const handleSaveCourse = () => {
    if (editingCourse) {
      // Add or update course
      addCourse(editingCourse.id, editingCourse);
      // Assign to all users
      assignCourseToAllUsers(editingCourse.id, editingCourse);
      setEditingCourse(null);
    }
  };

  const handleAddQuestion = () => {
    if (editingCourse) {
      const newQuestion = {
        id: `q-${Date.now()}`,
        type: 'multiple-choice',
        question: 'New Question',
        options: ['Option 1', 'Option 2'],
        correctAnswer: 'Option 1',
        emoji: '📝'
      };
      setEditingQuestion(newQuestion);
    }
  };

  const handleSaveQuestion = (question: any) => {
    if (editingCourse) {
      const updatedQuestions = editingQuestion 
        ? editingCourse.questions.map((q: any) => q.id === editingQuestion.id ? question : q)
        : [...editingCourse.questions, question];

      setEditingCourse({
        ...editingCourse,
        questions: updatedQuestions
      });
      setEditingQuestion(null);
    }
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
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

      <div className="space-y-4">
        {Object.entries(courses || {}).map(([courseId, course]) => (
          <div
            key={courseId}
            className="border border-neon-blue/10 rounded-lg overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-4 bg-dark-light cursor-pointer"
              onClick={() => setExpandedCourse(expandedCourse === courseId ? null : courseId)}
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                <p className="text-gray-400">{course.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCourse({
                      id: courseId,
                      ...course,
                      questions: course.questions || []
                    });
                  }}
                  className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {expandedCourse === courseId ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

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
                            ? question.message 
                            : question.question}
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

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({
                    ...editingCourse,
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
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({
                    ...editingCourse,
                    description: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                  rows={3}
                />
              </div>

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