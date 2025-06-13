/**
 * PACKAGE SELECTION CTA COMPONENT
 * Componente reutilizable para la sección CTA de selección de paquetes
 * Usado en: Landing, Proceso, Paquetes
 */

'use client';

import { useState } from 'react';
import PackageQuestionnaireModal from '@/components/landing/PackageQuestionnaireModal';

interface PackageSelectionCTAProps {
  variant?: 'landing' | 'process' | 'packages';
  className?: string;
}

export function PackageSelectionCTA({ 
  variant = 'landing', 
  className = '' 
}: PackageSelectionCTAProps) {
  const [showPackageSelector, setShowPackageSelector] = useState(false);

  // Configuración por variante
  const config = {
    landing: {
      containerClass: 'bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-8 text-white',
      title: '¿No estás seguro de qué paquete elegir?',
      description: 'Responde nuestro cuestionario personalizado y te recomendaremos el paquete perfecto para ti.',
      primaryButton: {
        text: 'Encontrar mi paquete ideal',
        class: 'bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg'
      },
      showSecondaryButton: false
    },
    process: {
      containerClass: 'bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-8 text-white',
      title: '¿No estás seguro de qué paquete elegir?',
      description: 'Responde nuestro cuestionario personalizado y te recomendaremos el paquete perfecto para ti.',
      primaryButton: {
        text: 'Encontrar mi paquete ideal',
        class: 'bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg'
      },
      showSecondaryButton: false
    },
    packages: {
      containerClass: 'bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto',
      title: '¿No estás seguro de qué paquete elegir?',
      description: 'Te ayudamos a encontrar el paquete perfecto para ti, basado en tus objetivos de salud y necesidades específicas.',
      primaryButton: {
        text: 'Configurador Inteligente',
        class: 'bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl inline-block'
      },
      secondaryButton: {
        text: '¿Qué paquete elegir?',
        class: 'border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors'
      },
      showSecondaryButton: true
    }
  };

  const currentConfig = config[variant];

  return (
    <>
      <div className={`text-center ${className}`}>
        <div className={currentConfig.containerClass}>
          <h3 className={`text-2xl font-bold mb-4 ${variant === 'landing' || variant === 'process' ? 'text-white' : 'text-gray-900'}`}>
            {currentConfig.title}
          </h3>
          <p className={`text-lg mb-6 ${variant === 'landing' || variant === 'process' ? 'opacity-90' : 'text-gray-600 max-w-2xl mx-auto'}`}>
            {currentConfig.description}
          </p>
          <div className={`flex ${currentConfig.showSecondaryButton ? 'flex-col sm:flex-row gap-4 justify-center' : 'justify-center'}`}>
            {variant === 'landing' || variant === 'process' ? (
              <button
                onClick={() => setShowPackageSelector(true)}
                className={currentConfig.primaryButton.class}
              >
                {currentConfig.primaryButton.text}
              </button>
            ) : (
              <a
                href="/configurador"
                className={currentConfig.primaryButton.class}
              >
                {currentConfig.primaryButton.text}
              </a>
            )}
            
            {currentConfig.showSecondaryButton && 'secondaryButton' in currentConfig && (
              <button
                onClick={() => setShowPackageSelector(true)}
                className={currentConfig.secondaryButton.class}
              >
                {currentConfig.secondaryButton.text}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Cuestionario de Paquetes */}
      <PackageQuestionnaireModal
        isOpen={showPackageSelector}
        onClose={() => setShowPackageSelector(false)}
        onRecommendation={(result) => {
          console.log('Paquete recomendado:', result.recommendedPackage);
        }}
      />
    </>
  );
} 