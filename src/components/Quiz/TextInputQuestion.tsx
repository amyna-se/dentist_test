import { useState } from 'react'; // Import useState for local state management
import { motion } from 'framer-motion'; // Import motion for animations

interface TextInputQuestionProps {
  question: string; // The quiz question
  correctAnswer: string; // The correct answer for validation
  placeholder?: string; // Placeholder text for the input
  caseSensitive?: boolean; // Whether the answer comparison is case-sensitive
  onAnswer: (answer: string) => void; // Callback to handle user answer submission
  onNextQuestion: () => void; // Callback to move to the next question
  isLastQuestion: boolean; // Whether this is the last question
  emoji?: string; // Emoji to represent the question type
}

export function TextInputQuestion({
  question,
  correctAnswer,
  placeholder = 'Type your answer...',
  caseSensitive = false,
  onAnswer,
  onNextQuestion,
  isLastQuestion,
  emoji = '✍️',
}: TextInputQuestionProps) {
  const [input, setInput] = useState(''); // User input for the answer
  const [submitted, setSubmitted] = useState(false); // Whether the answer has been submitted

  // Determine if the submitted answer is correct
  const isCorrect =
    submitted &&
    (caseSensitive
      ? input === correctAnswer
      : input.toLowerCase() === correctAnswer.toLowerCase());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitted && input.trim()) {
      setSubmitted(true); // Mark the answer as submitted
      onAnswer(input); // Pass the answer back to the parent component
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-light rounded-lg p-6 border border-neon-blue/10"
      >
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-neon-blue/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">{emoji}</span>
          </div>
          <h3 className="text-xl font-bold text-white">{question}</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => !submitted && setInput(e.target.value)}
            placeholder={placeholder}
            disabled={submitted}
            className={`w-full p-4 rounded-lg border-2 transition-colors ${
              submitted
                ? isCorrect
                  ? 'bg-neon-green/10 border-neon-green'
                  : 'bg-red-500/10 border-red-500'
                : 'bg-dark border-neon-blue/10 focus:border-neon-blue'
            } text-white`}
          />

          {!submitted && (
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-full px-6 py-3 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition disabled:opacity-50"
            >
              Submit Answer
            </button>
          )}

          {submitted && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  isCorrect ? 'bg-neon-green/10' : 'bg-red-500/10'
                }`}
              >
                <p
                  className={`font-bold ${
                    isCorrect ? 'text-neon-green' : 'text-red-500'
                  }`}
                >
                  {isCorrect ? 'Correct! 🎉' : 'Not quite right 🤔'}
                </p>
                {!isCorrect && (
                  <p className="text-gray-400 mt-2">
                    The correct answer was:{' '}
                    <span className="text-neon-green">{correctAnswer}</span>
                  </p>
                )}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onNextQuestion}
                className="w-full px-6 py-3 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
              >
                {isLastQuestion ? 'Complete Quiz 🎉' : 'Next Question →'}
              </motion.button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
