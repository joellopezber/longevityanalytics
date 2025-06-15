/**
 * ACTION CTA COMPONENT
 * Componente para el bloque CTA "Ahora es tu momento: Sin datos no hay acción!"
 */

'use client';

import { useState } from 'react';
import PackageQuestionnaireModal from '@/components/landing/PackageQuestionnaireModal';

export function ActionCTA() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  const handleOpenQuestionnaire = () => {
    setIsQuestionnaireOpen(true);
  };

  const handleCloseQuestionnaire = () => {
    setIsQuestionnaireOpen(false);
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ahora es tu momento: Sin datos no hay acción!
              </h3>
              <p className="text-green-100 mb-6 max-w-3xl mx-auto">
                No más suplementos innecesarios. No más dietas que no funcionan para ti. 
                No más ejercicios sin propósito. Solo acciones respaldadas por TUS datos que generan resultados reales y medibles.
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={handleOpenQuestionnaire}
                  className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Encontrar mi paquete ideal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire Modal */}
      <PackageQuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={handleCloseQuestionnaire}
        onRecommendation={(result) => {
          console.log('Paquete recomendado:', result);
          // Aquí podrías redirigir al configurador con el paquete recomendado
          // window.location.href = `/configurador?package=${result.recommendedPackage}`;
        }}
      />
    </>
  );
} 