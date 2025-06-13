/**
 * GENDER SELECTOR
 * Selector de género para el configurador
 */

'use client';

import { useConfiguratorStore, type Gender } from '@/lib/store/useConfiguratorStore';

export function GenderSelector() {
  const { selectedGender, setGender, selectedProfile } = useConfiguratorStore();

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
        <p className="text-gray-600">
          Selecciona tu género para obtener un análisis más preciso y personalizado.
          Los precios y biomarcadores pueden variar según la selección.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {genderOptions.map((option) => {
          const isSelected = selectedGender === option.value;
          const packagePricing = selectedProfile?.pricing[option.value];
          const biomarkersCount = selectedProfile?.biomarkersCount[option.value];
          
          return (
            <div
              key={option.value}
              onClick={() => setGender(option.value)}
              className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all hover:shadow-lg ${
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

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              ¿Por qué importa el género?
            </h4>
            <p className="text-sm text-blue-700">
              Los análisis específicos por género incluyen biomarcadores únicos como hormonas sexuales, 
              marcadores de próstata (hombres) o salud reproductiva (mujeres), proporcionando 
              información más precisa y relevante para tu salud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 