import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Save, X, Edit2, DragDropContext, Droppable, Draggable } from 'lucide-react';
import { useAuth } from '../../stores/auth';

interface OnboardingStep {
  id: string;
  title: string;
  content: string;
  emoji: string;
  type: 'info' | 'form' | 'guide';
  order: number;
  features?: {
    icon: string;
    text: string;
    color: string;
  }[];
}

export function OnboardingEditor() {
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [editingStep, setEditingStep] = useState<OnboardingStep | null>(null);
  const { updateOnboardingSteps } = useAuth();

  const handleAddStep = () => {
    const newStep: OnboardingStep = {
      id: `step-${Date.now()}`,
      title: 'New Step',
      content: '',
      emoji: '👋',
      type: 'info',
      order: steps.length,
      features: []
    };
    setEditingStep(newStep);
  };

  const handleSaveStep = (step: OnboardingStep) => {
    const updatedSteps = editingStep?.id
      ? steps.map(s => s.id === editingStep.id ? step : s)
      : [...steps, step];
    
    setSteps(updatedSteps);
    setEditingStep(null);
    updateOnboardingSteps(updatedSteps);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedSteps = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setSteps(updatedSteps);
    updateOnboardingSteps(updatedSteps);
  };

  return (
    <div className="bg-dark-light rounded-lg p-6 border border-neon-purple/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Onboarding Editor</h2>
        <button
          onClick={handleAddStep}
          className="px-4 py-2 rounded-lg bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Step</span>
        </button>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark p-4 rounded-lg border border-neon-blue/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{step.emoji}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.type}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingStep(step)}
                className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {editingStep && (
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
                {editingStep.id ? 'Edit Step' : 'New Step'}
              </h3>
              <button
                onClick={() => setEditingStep(null)}
                className="p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingStep.title}
                  onChange={(e) => setEditingStep({
                    ...editingStep,
                    title: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Content
                </label>
                <textarea
                  value={editingStep.content}
                  onChange={(e) => setEditingStep({
                    ...editingStep,
                    content: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Type
                </label>
                <select
                  value={editingStep.type}
                  onChange={(e) => setEditingStep({
                    ...editingStep,
                    type: e.target.value as OnboardingStep['type']
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                >
                  <option value="info">Information</option>
                  <option value="form">Form</option>
                  <option value="guide">Guide</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Emoji
                </label>
                <input
                  type="text"
                  value={editingStep.emoji}
                  onChange={(e) => setEditingStep({
                    ...editingStep,
                    emoji: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-dark border border-neon-blue/10 text-white"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingStep(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveStep(editingStep)}
                  className="px-4 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Step</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}