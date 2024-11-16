// Import necessary libraries and components
import { useState, useEffect } from 'react'; // React hooks for managing state and lifecycle events
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import { motion } from 'framer-motion'; // Library for animations
import { Brain, Book, Trophy, Heart } from 'lucide-react'; // Icon components for visual cues
import { OnboardingLayout } from '../components/Onboarding/OnboardingLayout'; // Layout component for onboarding steps
import { DrAttention } from '../components/Onboarding/DrAttention'; // Component for displaying a guide character

// Define the steps of the onboarding process
const steps = [
  {
    title: "Welcome to NeuroStep! 👋",
    content: "Hi! I'm Dr. Attention AI, your guide in understanding neurodiversity. I'm here to help you learn about Autism and ADHD in an engaging and interactive way.",
    emoji: "🤖", // Emoji displayed with the message
    features: [
      { icon: Brain, text: "Interactive Learning", color: "blue" },
      { icon: Trophy, text: "Track Progress", color: "purple" },
      { icon: Heart, text: "Build Understanding", color: "green" },
    ], // Features shown on this step
  },
  {
    title: "Learn Through Play 🎮",
    content: "Our courses are designed like games! Complete quizzes, earn XP, and level up while gaining valuable knowledge about neurodiversity.",
    emoji: "🎯",
    demo: true, // Indicates a demo element is shown on this step
  },
  {
    title: "Track Your Journey 📈",
    content: "Watch your progress grow as you complete courses. Earn achievements and see your understanding deepen with each lesson.",
    emoji: "🏆",
    stats: true, // Indicates stats are displayed on this step
  },
  {
    title: "Join Our Community 🤝",
    content: "Connect with others who are learning about neurodiversity. Share experiences and support each other on this journey.",
    emoji: "👥",
    community: true, // Indicates community features are shown on this step
  },
];

/**
 * Onboarding Component:
 * Guides new users through a series of steps to introduce the platform.
 */
export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1); // Tracks the current onboarding step
  const navigate = useNavigate(); // Hook for navigation
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false); // Tracks if the user has completed onboarding

  /**
   * Checks if the user has already seen the onboarding process.
   * - If `onboarded` is stored in localStorage, redirects the user to the home page.
   */
  useEffect(() => {
    const onboarded = localStorage.getItem('onboarded'); // Retrieve onboarding status from localStorage
    if (onboarded) {
      setHasSeenOnboarding(true); // Mark as seen
      navigate('/'); // Redirect to the home page
    }
  }, [navigate]);

  /**
   * Advances to the next step of the onboarding process.
   * Ensures the current step does not exceed the total number of steps.
   */
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length)); // Increment step, capped at the total number of steps
  };

  /**
   * Goes back to the previous step of the onboarding process.
   * Ensures the current step does not go below 1.
   */
  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Decrement step, capped at 1
  };

  /**
   * Completes the onboarding process.
   * - Stores the onboarding status in localStorage.
   * - Redirects the user to the home page.
   */
  const handleComplete = () => {
    localStorage.setItem('onboarded', 'true'); // Mark onboarding as complete
    navigate('/'); // Redirect to the home page
  };

  // If the user has already completed onboarding, render nothing
  if (hasSeenOnboarding) return null;

  // Get data for the current step
  const currentStepData = steps[currentStep - 1];

  return (
    <OnboardingLayout
      currentStep={currentStep} // Pass current step to layout
      totalSteps={steps.length} // Pass total number of steps to layout
      onNext={handleNext} // Callback for advancing steps
      onPrev={handlePrev} // Callback for going back
      onComplete={handleComplete} // Callback for completing onboarding
    >
      <div className="space-y-8">
        {/* Display guide character and message */}
        <DrAttention
          message={currentStepData.content} // Message for the current step
          emoji={currentStepData.emoji} // Emoji for the current step
        />

        {/* Animated step title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Final animation state
          className="text-3xl font-bold text-center text-white mt-8"
        >
          {currentStepData.title}
        </motion.h2>

        {/* Features section */}
        {currentStepData.features && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6 mt-8"
          >
            {currentStepData.features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }} // Scale animation on hover
                className={`p-6 rounded-lg bg-neon-${feature.color}/10 border border-neon-${feature.color}/20`}
              >
                <feature.icon className={`w-8 h-8 text-neon-${feature.color} mb-4`} />
                <p className="text-gray-300">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Demo section */}
        {currentStepData.demo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-dark rounded-lg p-6 border border-neon-purple/20"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                <Book className="w-6 h-6 text-neon-purple" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">Sample Question</h3>
                <div className="h-2 bg-neon-purple/20 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-neon-purple rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }} // Simulates progress bar animation
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats section */}
        {currentStepData.stats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6"
          >
            {[
              { label: "XP Earned", value: "1,234", color: "blue" },
              { label: "Courses Completed", value: "3", color: "purple" },
              { label: "Current Level", value: "5", color: "green" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }} // Scale animation on hover
                className={`p-6 rounded-lg bg-neon-${stat.color}/10 border border-neon-${stat.color}/20`}
              >
                <p className="text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold text-neon-${stat.color}`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Community section */}
        {currentStepData.community && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="p-6 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
              <h3 className="text-xl font-bold text-white mb-4">Learn Together</h3>
              <p className="text-gray-400">Join study groups and share insights</p>
            </div>
            <div className="p-6 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
              <h3 className="text-xl font-bold text-white mb-4">Get Support</h3>
              <p className="text-gray-400">Connect with mentors and peers</p>
            </div>
          </motion.div>
        )}
      </div>
    </OnboardingLayout>
  );
}
