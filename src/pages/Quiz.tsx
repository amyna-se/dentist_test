// Import necessary libraries and components
import { useState, useEffect } from 'react'; // React hooks for state management and side effects
import { useParams, useNavigate } from 'react-router-dom'; // Hooks for route parameters and navigation
import { AnimatePresence } from 'framer-motion'; // Library for handling animations during transitions
import { QuizCard } from '../components/Quiz/QuizCard'; // Component for displaying standard quiz questions
import { QuizProgress } from '../components/Quiz/QuizProgress'; // Component for showing quiz progress and score
import { QuizComplete } from '../components/Quiz/QuizComplete'; // Component for displaying quiz completion summary
import { TextInputQuestion } from '../components/Quiz/TextInputQuestion'; // Component for handling text-input-based questions
import { useAuth } from '../stores/auth'; // Hook for user authentication and state
import { useQuiz } from '../stores/quiz'; // Hook for quiz-related state management
import { quizData, QuizQuestion } from '../data/quizData'; // Quiz data and type definitions

/**
 * Quiz Component:
 * Handles the display and logic for course-specific quizzes.
 */
export function Quiz() {
  // Extracts the `courseId` from the URL parameters
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { updateCourseProgress } = useAuth(); // Updates the user's course progress
  const { initQuiz, recordResponse } = useQuiz(); // Initializes the quiz and records responses

  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question index
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Tracks the selected answer for the current question
  const [score, setScore] = useState(0); // Tracks the user's score
  const [questionStartTime, setQuestionStartTime] = useState(Date.now()); // Tracks the start time for the current question
  const [showComplete, setShowComplete] = useState(false); // Indicates whether the quiz is complete

  // Ensure courseId is valid; if not, show a loading message
  if (!courseId || !quizData[courseId]) {
    return <div>Loading...</div>;
  }

  // Extracts the course and its questions from `quizData`
  const course = quizData[courseId];
  const questions = course.questions;
  const currentQuestion = questions[currentQuestionIndex]; // The current question being displayed
  const isLastQuestion = currentQuestionIndex === questions.length - 1; // Check if this is the last question

  /**
   * Initializes the quiz when the component mounts.
   * Resets the question start time.
   */
  useEffect(() => {
    initQuiz(); // Call the `initQuiz` function from the `useQuiz` hook
    setQuestionStartTime(Date.now()); // Reset the start time for the current question
  }, [initQuiz]);

  /**
   * Handles the user's answer selection.
   * - Updates the selected answer.
   * - Records the response time.
   * - Increments the score if the answer is correct.
   */
  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer !== null) return; // Prevent selecting multiple answers

    setSelectedAnswer(answer); // Save the selected answer
    const responseTime = Date.now() - questionStartTime; // Calculate response time
    recordResponse(currentQuestion.id, responseTime); // Record the response time for analytics

    // Update score for non-info questions if the answer is correct
    if (currentQuestion.type !== 'info' && answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  /**
   * Handles navigation to the next question.
   * - If it's the last question, calculates progress and marks the quiz as complete.
   * - Otherwise, advances to the next question.
   */
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate progress and update it in the user's course progress
      const totalQuestions = questions.filter((q: QuizQuestion) => q.type !== 'info').length;
      const progress = Math.round((score / totalQuestions) * 100);
      updateCourseProgress(courseId, progress);
      setShowComplete(true); // Mark the quiz as complete
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer
      setQuestionStartTime(Date.now()); // Reset question start time
    }
  };

  /**
   * Resets the quiz state for a retry.
   */
  const handleRetry = () => {
    setCurrentQuestionIndex(0); // Reset to the first question
    setSelectedAnswer(null);
    setScore(0);
    setShowComplete(false);
    setQuestionStartTime(Date.now());
    initQuiz(); // Reinitialize the quiz
  };

  /**
   * Navigates the user back to the dashboard.
   */
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Display the quiz completion screen if the quiz is complete
  if (showComplete) {
    return (
      <div className="min-h-screen bg-dark p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <QuizComplete
            score={score}
            totalQuestions={questions.filter((q: QuizQuestion) => q.type !== 'info').length}
            onRetry={handleRetry} // Retry button callback
          />
        </div>
      </div>
    );
  }

  // Render the quiz interface
  return (
    <div className="min-h-screen bg-dark p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Progress and Back Button */}
        <div className="flex justify-between items-center mb-6">
          <QuizProgress
            currentQuestion={currentQuestionIndex + 1} // Current question number (1-based)
            totalQuestions={questions.length} // Total number of questions
            score={score} // Current score
          />
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* AnimatePresence for smooth transitions between questions */}
        <AnimatePresence mode="wait">
          {currentQuestion.type === 'info' ? (
            // Information-only question
            <QuizCard
              key={currentQuestion.id}
              info={{
                message: currentQuestion.message || '',
                emoji: currentQuestion.emoji || ''
              }}
              selectedAnswer={null}
              onSelectAnswer={() => {}} // No action for info-only questions
              onNextQuestion={handleNextQuestion}
              isLastQuestion={isLastQuestion}
            />
          ) : currentQuestion.type === 'text-input' ? (
            // Text-input question
            <TextInputQuestion
              key={currentQuestion.id}
              question={currentQuestion.question || ''}
              correctAnswer={currentQuestion.correctAnswer || ''}
              placeholder={currentQuestion.placeholder}
              caseSensitive={currentQuestion.caseSensitive}
              onAnswer={handleSelectAnswer}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={isLastQuestion}
              emoji={currentQuestion.emoji}
            />
          ) : (
            // Standard multiple-choice question
            <QuizCard
              key={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              correctAnswer={currentQuestion.correctAnswer}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleSelectAnswer}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={isLastQuestion}
              emoji={currentQuestion.emoji}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
