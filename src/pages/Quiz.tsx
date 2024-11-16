import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { QuizCard } from '../components/Quiz/QuizCard';
import { QuizProgress } from '../components/Quiz/QuizProgress';
import { QuizComplete } from '../components/Quiz/QuizComplete';
import { TextInputQuestion } from '../components/Quiz/TextInputQuestion';
import { useAuth } from '../stores/auth';
import { useQuiz } from '../stores/quiz';
import { quizData, QuizQuestion } from '../data/quizData';

export function Quiz() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { updateCourseProgress } = useAuth();
  const { initQuiz, recordResponse } = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showComplete, setShowComplete] = useState(false);

  if (!courseId || !quizData[courseId]) {
    return <div>Loading...</div>;
  }

  const course = quizData[courseId];
  const questions = course.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    initQuiz();
    setQuestionStartTime(Date.now());
  }, [initQuiz]);

  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const responseTime = Date.now() - questionStartTime;
    recordResponse(currentQuestion.id, responseTime);

    if (currentQuestion.type !== 'info' && answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const totalQuestions = questions.filter((q: QuizQuestion) => q.type !== 'info').length;
      const progress = Math.round((score / totalQuestions) * 100);
      updateCourseProgress(courseId, progress);
      setShowComplete(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowComplete(false);
    setQuestionStartTime(Date.now());
    initQuiz();
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (showComplete) {
    return (
      <div className="min-h-screen bg-dark p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <QuizComplete
            score={score}
            totalQuestions={questions.filter((q: QuizQuestion) => q.type !== 'info').length}
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <QuizProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            score={score}
          />
          <button
            onClick={handleBackToDashboard}
            className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
          >
            Back to Dashboard
          </button>
        </div>

        <AnimatePresence mode="wait">
          {currentQuestion.type === 'info' ? (
            <QuizCard
              key={currentQuestion.id}
              info={{
                message: currentQuestion.message || '',
                emoji: currentQuestion.emoji || ''
              }}
              selectedAnswer={null}
              onSelectAnswer={() => {}}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={isLastQuestion}
            />
          ) : currentQuestion.type === 'text-input' ? (
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