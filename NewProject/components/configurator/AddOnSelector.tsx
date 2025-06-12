/**
 * ADD-ON SELECTOR
 * Selector de add-ons para el configurador
 */

'use client';

import { useState } from 'react';
import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { getAddOnsByPackage, ADDON_CATEGORIES } from '@/lib/data/addons-simple';
import { AddOnBiomarkersModal } from './AddOnBiomarkersModal';
import type { SimpleAddOn } from '@/lib/data/addons-simple';

export function AddOnSelector() {
  const { 
    selectedPackage, 
    selectedGender, 
    selectedAddOns, 
    toggleAddOn, 
    isAddOnSelected,
    canAddMoreAddOns,
    excludedBiomarkers 
  } = useConfiguratorStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [biomarkersModalOpen, setBiomarkersModalOpen] = useState<SimpleAddOn | null>(null);

  if (!selectedPackage) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Primero selecciona un paquete base.</p>
      </div>
    );
  }

  const availableAddOns = getAddOnsByPackage(selectedPackage.id);
  const filteredAddOns = selectedCategory === 'all' 
    ? availableAddOns 
    : availableAddOns.filter(addon => addon.category === selectedCategory);

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
          Personaliza tu análisis añadiendo add-ons específicos para tus objetivos de salud.
          Puedes seleccionar hasta 10 add-ons adicionales.
        </p>
        <div className="mt-2 text-sm text-gray-500">
          {selectedAddOns.length}/10 add-ons seleccionados
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos ({availableAddOns.length})
        </button>
        {ADDON_CATEGORIES.map((category) => {
          const count = availableAddOns.filter(addon => addon.category === category).length;
          if (count === 0) return null;
          
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Add-ons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAddOns.map((addon) => {
          const isSelected = isAddOnSelected(addon.id);
          const pricing = addon.pricing[selectedGender];
          const biomarkersCount = addon.biomarkersCount[selectedGender];
          const discount = Math.round(((pricing.pvp - pricing.price) / pricing.pvp) * 100);
          const canSelect = canAddMoreAddOns() || isSelected;

          return (
            <div
              key={addon.id}
              onClick={() => canSelect && toggleAddOn(addon)}
              className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all ${
                !canSelect && !isSelected
                  ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                  : isSelected
                  ? 'border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-lg'
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

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {addon.category}
                </span>
              </div>

              {/* Add-on Header */}
              <div className="mt-8 mb-4">
                <div className="flex items-center mb-2">
                  <div className="text-2xl mr-2">{addon.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{addon.name}</h3>
                    <p className="text-sm text-gray-600">{addon.title}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {addon.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">
                    {biomarkersCount}
                  </div>
                  <div className="text-xs text-gray-500">Biomarcadores</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {formatPrice(pricing.price)}
                  </div>
                  {discount > 0 && (
                    <div className="text-xs text-green-600">
                      Ahorra {discount}%
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Beneficios:</h4>
                <ul className="space-y-1">
                  {addon.benefits.slice(0, 2).map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs text-gray-600">{benefit}</span>
                    </li>
                  ))}
                  {addon.benefits.length > 2 && (
                    <li className="text-xs text-gray-500 italic">
                      +{addon.benefits.length - 2} beneficios más...
                    </li>
                  )}
                </ul>
              </div>

              {/* Recommended For */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Recomendado para:</h4>
                <div className="flex flex-wrap gap-1">
                  {addon.recommendedFor.slice(0, 2).map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                    >
                      {item}
                    </span>
                  ))}
                  {addon.recommendedFor.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{addon.recommendedFor.length - 2} más
                    </span>
                  )}
                </div>
              </div>

              {/* Customize Biomarkers Button */}
              {isSelected && (
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBiomarkersModalOpen(addon);
                    }}
                    className="w-full px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    <span>Personalizar Biomarcadores</span>
                    {excludedBiomarkers[addon.id] && excludedBiomarkers[addon.id].length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        -{excludedBiomarkers[addon.id].length}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Add-ons Summary */}
      {selectedAddOns.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">
            Add-ons seleccionados ({selectedAddOns.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedAddOns.map((addon) => (
              <span
                key={addon.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {addon.icon} {addon.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAddOn(addon);
                  }}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Los add-ons son opcionales. Puedes continuar sin seleccionar ninguno o añadir más tarde.
        </p>
      </div>

      {/* Biomarkers Modal */}
      {biomarkersModalOpen && (
        <AddOnBiomarkersModal
          addOn={biomarkersModalOpen}
          isOpen={true}
          onClose={() => setBiomarkersModalOpen(null)}
        />
      )}
    </div>
  );
} 