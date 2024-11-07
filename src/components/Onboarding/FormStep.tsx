import { motion } from 'framer-motion';
import { useOnboarding } from '../../stores/onboarding';
import { useState } from 'react';

interface FormStepProps {
  stepId: string;
  onComplete: () => void;
}

export function FormStep({ stepId, onComplete }: FormStepProps) {
  const { steps, updateFormData } = useOnboarding();
  const step = steps.find(s => s.id === stepId);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!step || !step.formFields) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validate required fields
    step.formFields?.forEach(field => {
      if (field.required && !formValues[field.id]) {
        newErrors[field.id] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFormData(formValues);
    onComplete();
  };

  const handleInputChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
        <p className="text-gray-400">{step.content}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step.formFields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'text' || field.type === 'email' ? (
              <input
                type={field.type}
                value={formValues[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-2 rounded-lg bg-dark border ${
                  errors[field.id] ? 'border-red-500' : 'border-neon-blue/10'
                } text-white focus:outline-none focus:ring-2 focus:ring-neon-blue`}
              />
            ) : field.type === 'select' ? (
              <select
                value={formValues[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-dark border ${
                  errors[field.id] ? 'border-red-500' : 'border-neon-blue/10'
                } text-white focus:outline-none focus:ring-2 focus:ring-neon-blue`}
              >
                <option value="">Select an option</option>
                {field.options?.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <div className="space-y-2">
                {field.options?.map(option => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formValues[field.id]?.includes(option)}
                      onChange={(e) => {
                        const currentValues = formValues[field.id] || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter((v: string) => v !== option);
                        handleInputChange(field.id, newValues);
                      }}
                      className="rounded border-gray-700 text-neon-blue focus:ring-neon-blue"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            ) : field.type === 'radio' ? (
              <div className="space-y-2">
                {field.options?.map(option => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={field.id}
                      value={option}
                      checked={formValues[field.id] === option}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="border-gray-700 text-neon-blue focus:ring-neon-blue"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            ) : null}

            {errors[field.id] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </motion.div>
  );
}