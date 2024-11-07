import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash } from 'lucide-react';
import { Question } from '../../types/quiz';

interface QuestionEditorProps {
  question: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const EMOJI_OPTIONS = [
  '📝', '✍️', '💡', '🎯', '🧠', '💭', '👥', '🗣️', '👁️', '👂', '🌟',
  '🏃', '🤝', '❤️', '⭐', '🔄', '🦋', '⚡', '📋', '💪', '🎭'
];

export function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [editedQuestion, setEditedQuestion] = useState<Question>(question);

  const handleAddOption = () => {
    if ('options' in editedQuestion) {
      setEditedQuestion({
        ...editedQuestion,
        options: [...editedQuestion.options, `Option ${editedQuestion.options.length + 1}`]
      });
    }
  };

  const handleRemoveOption = (index: number) => {
    if ('options' in editedQuestion) {
      const newOptions = editedQuestion.options.filter((_, i) => i !== index);
      setEditedQuestion({
        ...editedQuestion,
        options: newOptions,
        correctAnswer: editedQuestion.correctAnswer === editedQuestion.options[index]
          ? newOptions[0]
          : editedQuestion.correctAnswer
      });
    }
  };

  const handleUpdateOption = (index: number, value: string) => {
    if ('options' in editedQuestion) {
      const newOptions = [...editedQuestion.options];
      newOptions[index] = value;
      setEditedQuestion({
        ...editedQuestion,
        options: newOptions,
        correctAnswer: editedQuestion.correctAnswer === editedQuestion.options[index]
          ? value
          : editedQuestion.correctAnswer
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-dark-light rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-xl font-bold text-white mb-6">
          Edit {editedQuestion.type === 'info' ? 'Info Card' : 'Question'}
        </h3>

        <div className="space-y-6">
          {/* Question Type Display */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Type:</span>
            <span className="px-3 py-1 rounded-full bg-neon-blue/10 text-neon-blue text-sm">
              {editedQuestion.type}
            </span>
          </div>

          {/* Emoji Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Emoji
            </label>
            <div className="grid grid-cols-7 gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setEditedQuestion({ ...editedQuestion, emoji })}
                  className={`text-2xl p-2 rounded-lg hover:bg-neon-blue/10 transition ${
                    editedQuestion.emoji === emoji ? 'bg-neon-blue/20 ring-2 ring-neon-blue' : ''
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Question Content */}
          {editedQuestion.type === 'info' ? (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea
                value={editedQuestion.message}
                onChange={(e) => setEditedQuestion({
                  ...editedQuestion,
                  message: e.target.value
                })}
                className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                rows={4}
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Question
                </label>
                <textarea
                  value={'question' in editedQuestion ? editedQuestion.question : ''}
                  onChange={(e) => setEditedQuestion({
                    ...editedQuestion,
                    question: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                  rows={3}
                />
              </div>

              {editedQuestion.type === 'multiple-choice' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Options
                  </label>
                  <div className="space-y-2">
                    {editedQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleUpdateOption(index, e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                        />
                        <button
                          onClick={() => handleRemoveOption(index)}
                          disabled={editedQuestion.options.length <= 2}
                          className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30 transition disabled:opacity-50"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddOption}
                      className="w-full px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Option</span>
                    </button>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Correct Answer
                    </label>
                    <select
                      value={editedQuestion.correctAnswer}
                      onChange={(e) => setEditedQuestion({
                        ...editedQuestion,
                        correctAnswer: e.target.value
                      })}
                      className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                    >
                      {editedQuestion.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {editedQuestion.type === 'text-input' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Correct Answer
                    </label>
                    <input
                      type="text"
                      value={editedQuestion.correctAnswer}
                      onChange={(e) => setEditedQuestion({
                        ...editedQuestion,
                        correctAnswer: e.target.value
                      })}
                      className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Placeholder Text
                    </label>
                    <input
                      type="text"
                      value={editedQuestion.placeholder}
                      onChange={(e) => setEditedQuestion({
                        ...editedQuestion,
                        placeholder: e.target.value
                      })}
                      className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="caseSensitive"
                      checked={editedQuestion.caseSensitive}
                      onChange={(e) => setEditedQuestion({
                        ...editedQuestion,
                        caseSensitive: e.target.checked
                      })}
                      className="rounded border-gray-700 text-neon-blue focus:ring-neon-blue"
                    />
                    <label htmlFor="caseSensitive" className="text-gray-400">
                      Case sensitive answer
                    </label>
                  </div>
                </>
              )}
            </>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(editedQuestion)}
              className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}