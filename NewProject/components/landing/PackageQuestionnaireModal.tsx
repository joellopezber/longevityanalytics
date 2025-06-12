/**
 * PACKAGE QUESTIONNAIRE MODAL
 * Modal con cuestionario para recomendar el paquete ideal
 */

'use client';

import { useState } from 'react';
import { 
  QUESTIONNAIRE_QUESTIONS, 
  calculateRecommendation, 
  PACKAGE_DESCRIPTIONS,
  type QuestionnaireResult 
} from '@/lib/data/questionnaire';

interface PackageQuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecommendation?: (result: QuestionnaireResult) => void;
}

export default function PackageQuestionnaireModal({ 
  isOpen, 
  onClose, 
  onRecommendation 
}: PackageQuestionnaireModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<QuestionnaireResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const handleAnswer = (questionId: string, optionId: string, isMultiple: boolean) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || [];
        const isSelected = currentAnswers.includes(optionId);
        
        if (isSelected) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter(id => id !== optionId)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionId]
          };
        }
      } else {
        return {
          ...prev,
          [questionId]: [optionId]
        };
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < QUESTIONNAIRE_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calcular resultado
      const recommendation = calculateRecommendation(answers);
      setResult(recommendation);
      setShowResult(true);
      onRecommendation?.(recommendation);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuestionnaire = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
  };

  const currentQ = QUESTIONNAIRE_QUESTIONS[currentQuestion];
  const currentAnswers = answers[currentQ?.id] || [];
  const canProceed = currentAnswers.length > 0;
  const progress = ((currentQuestion + 1) / QUESTIONNAIRE_QUESTIONS.length) * 100;

  if (showResult && result) {
    const packageInfo = PACKAGE_DESCRIPTIONS[result.recommendedPackage];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                🎯 Tu Paquete Recomendado
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Result Content */}
          <div className="p-6">
            {/* Recommended Package */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {packageInfo.title.charAt(0)}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {packageInfo.title}
              </h3>
              <p className="text-lg text-green-600 font-medium mb-4">
                {packageInfo.subtitle}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-sm text-gray-600">Confianza:</span>
                <div className="bg-gray-200 rounded-full h-2 w-32">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {result.confidence}%
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-gray-700 mb-4">
                {packageInfo.description}
              </p>
              <h4 className="font-semibold text-gray-900 mb-3">
                ¿Por qué es perfecto para ti?
              </h4>
              <ul className="space-y-2">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Beneficios principales:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageInfo.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scores Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-center">
                Puntuaciones por paquete
              </h4>
              <div className="space-y-3">
                {Object.entries(result.scores).map(([packageId, score]) => {
                  const isRecommended = packageId === result.recommendedPackage;
                  const maxScore = Math.max(...Object.values(result.scores));
                  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
                  
                  return (
                    <div key={packageId} className="flex items-center space-x-3">
                      <div className="w-20 text-sm font-medium text-gray-700 capitalize">
                        {packageId}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            isRecommended ? 'bg-green-500' : 'bg-gray-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm font-medium text-gray-900">
                        {score}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  // Aquí podrías redirigir al configurador con el paquete preseleccionado
                  window.location.href = `/configurador?package=${result.recommendedPackage}`;
                }}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Configurar {packageInfo.title}
              </button>
              <button
                onClick={() => {
                  onClose();
                  // Verificar si estamos en la página de procesos
                  if (window.location.pathname === '/proceso') {
                    // En la página de procesos, ir a la página de paquetes
                    window.location.href = '/paquetes';
                  } else {
                    // En la landing, hacer scroll a la sección de paquetes
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Ver Todos los Paquetes
              </button>
              <button
                onClick={resetQuestionnaire}
                className="sm:w-auto px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Repetir Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Encuentra tu Paquete Ideal
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              Pregunta {currentQuestion + 1} de {QUESTIONNAIRE_QUESTIONS.length}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {currentQ.title}
            </h3>
            {currentQ.description && (
              <p className="text-gray-600 mb-4">
                {currentQ.description}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option) => {
              const isSelected = currentAnswers.includes(option.id);
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQ.id, option.id, currentQ.type === 'multiple')}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">
                      {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              ← Anterior
            </button>

            <div className="text-sm text-gray-500">
              {currentQ.type === 'multiple' && 'Puedes seleccionar múltiples opciones'}
            </div>

            <button
              onClick={nextQuestion}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                canProceed
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === QUESTIONNAIRE_QUESTIONS.length - 1 ? 'Ver Resultado' : 'Siguiente →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 