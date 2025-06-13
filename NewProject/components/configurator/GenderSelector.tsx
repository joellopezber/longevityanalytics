/**
 * GENDER SELECTOR
 * Selector de género para el configurador
 */

'use client';

import { useState } from 'react';
import { useConfiguratorStore, type Gender } from '@/lib/store/useConfiguratorStore';

export function GenderSelector() {
  const { selectedGender, setGender, selectedProfile } = useConfiguratorStore();
  const [showTooltip, setShowTooltip] = useState(false);

  const genderOptions: { value: Gender; label: string; description: string; icon: string }[] = [
    {
      value: 'male',
      label: 'Hombre',
      description: 'Análisis optimizado para fisiología masculina',
      icon: '👨'
    },
    {
      value: 'female',
      label: 'Mujer',
      description: 'Análisis optimizado para fisiología femenina',
      icon: '👩'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Primer paso: Selecciona tu género
          </h3>
          <p className="text-white">
            Comenzamos con tu género porque <strong>los precios y biomarcadores varían</strong> entre hombres y mujeres. 
            Esto nos permite mostrarte información exacta desde el inicio.
          </p>
        </div>
        <p className="text-gray-600">
          Cada género incluye biomarcadores específicos para obtener el análisis más preciso y personalizado.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
        {genderOptions.map((option) => {
          const isSelected = selectedGender === option.value;
          const packagePricing = selectedProfile?.pricing[option.value];
          const biomarkersCount = selectedProfile?.biomarkersCount[option.value];
          
          return (
            <div
              key={option.value}
              onClick={() => setGender(option.value)}
              className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all hover:shadow-lg w-full md:w-80 ${
                isSelected
                  ? 'border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Option Header */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{option.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{option.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>

              {/* Package Info */}
              {selectedProfile && packagePricing && biomarkersCount && (
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {biomarkersCount}
                    </div>
                    <div className="text-xs text-gray-500">Biomarcadores</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {formatPrice(packagePricing.precio)}
                    </div>
                    {packagePricing.pvp > packagePricing.precio && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(packagePricing.pvp)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Ventajas:</h4>
                <ul className="space-y-1">
                  {option.value === 'male' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600">Hormonas masculinas específicas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600">Marcadores de próstata</span>
                      </li>
                    </>
                  )}
                  {option.value === 'female' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600">Hormonas femeninas específicas</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600">Salud reproductiva</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
} 