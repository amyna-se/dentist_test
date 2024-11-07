import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Book, Trophy, Heart } from 'lucide-react';
import { OnboardingLayout } from '../components/Onboarding/OnboardingLayout';
import { DrAttention } from '../components/Onboarding/DrAttention';

const steps = [
  {
    title: "Welcome to NeuroStep! 👋",
    content: "Hi! I'm Dr. Attention AI, your guide in understanding neurodiversity. I'm here to help you learn about Autism and ADHD in an engaging and interactive way.",
    emoji: "🤖",
    features: [
      { icon: Brain, text: "Interactive Learning", color: "blue" },
      { icon: Trophy, text: "Track Progress", color: "purple" },
      { icon: Heart, text: "Build Understanding", color: "green" },
    ]
  },
  {
    title: "Learn Through Play 🎮",
    content: "Our courses are designed like games! Complete quizzes, earn XP, and level up while gaining valuable knowledge about neurodiversity.",
    emoji: "🎯",
    demo: true
  },
  {
    title: "Track Your Journey 📈",
    content: "Watch your progress grow as you complete courses. Earn achievements and see your understanding deepen with each lesson.",
    emoji: "🏆",
    stats: true
  },
  {
    title: "Join Our Community 🤝",
    content: "Connect with others who are learning about neurodiversity. Share experiences and support each other on this journey.",
    emoji: "👥",
    community: true
  }
];

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const onboarded = localStorage.getItem('onboarded');
    if (onboarded) {
      setHasSeenOnboarding(true);
      navigate('/');
    }
  }, [navigate]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    localStorage.setItem('onboarded', 'true');
    navigate('/');
  };

  if (hasSeenOnboarding) return null;

  const currentStepData = steps[currentStep - 1];

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={steps.length}
      onNext={handleNext}
      onPrev={handlePrev}
      onComplete={handleComplete}
    >
      <div className="space-y-8">
        <DrAttention
          message={currentStepData.content}
          emoji={currentStepData.emoji}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-white mt-8"
        >
          {currentStepData.title}
        </motion.h2>

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
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-lg bg-neon-${feature.color}/10 border border-neon-${feature.color}/20`}
              >
                <feature.icon className={`w-8 h-8 text-neon-${feature.color} mb-4`} />
                <p className="text-gray-300">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

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
                    animate={{ width: "60%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

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
                whileHover={{ scale: 1.05 }}
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