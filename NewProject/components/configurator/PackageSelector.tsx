/**
 * PACKAGE SELECTOR
 * Selector de paquetes para el configurador
 */

'use client';

import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { PACKAGES_DATA } from '@/lib/data/packages-simple';

export function PackageSelector() {
  const { selectedPackage, setPackage } = useConfiguratorStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600">
          Selecciona el paquete base que mejor se adapte a tus objetivos de salud.
          Podrás personalizarlo con add-ons en el siguiente paso.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PACKAGES_DATA.map((pkg) => {
          const isSelected = selectedPackage?.id === pkg.id;
          
          return (
            <div
              key={pkg.id}
              onClick={() => setPackage(pkg)}
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

              {/* Package Header */}
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{pkg.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-sm text-gray-600">{pkg.title}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {pkg.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {pkg.biomarkersCount.both}+
                  </div>
                  <div className="text-xs text-gray-500">Biomarcadores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {pkg.addOnsCount}
                  </div>
                  <div className="text-xs text-gray-500">Add-ons disponibles</div>
                </div>
              </div>

              {/* Price */}
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                  }).format(pkg.pricing.both.price)}
                </div>
                <div className="text-sm text-gray-500">
                  Precio base (se ajustará por género)
                </div>
              </div>

              {/* Features Preview */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Incluye:</h4>
                <ul className="space-y-1">
                  {pkg.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs text-gray-600">{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 2 && (
                    <li className="text-xs text-gray-500 italic">
                      +{pkg.features.length - 2} análisis más...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Text */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          ¿No estás seguro? Puedes cambiar tu selección en cualquier momento.
        </p>
      </div>
    </div>
  );
} 