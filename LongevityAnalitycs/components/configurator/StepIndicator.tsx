/**
 * STEP INDICATOR
 * Indicador visual de los pasos del configurador
 */

import Icon from '../ui/Icon';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-4 md:space-x-8">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    isCompleted
                      ? 'bg-green-600 text-white'
                      : isActive
                      ? 'bg-green-600 text-white ring-4 ring-green-200'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="check" size="md" />
                  ) : (
                    step.id
                  )}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div
                    className={`text-sm font-medium ${
                      isActive ? 'text-green-600' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 hidden md:block">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-12 md:w-20 h-0.5 mx-4 ${
                    step.id < currentStep ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 