/**
 * ADD-ON SELECTOR
 * Selector de add-ons para el configurador
 * Integrado con nuestro sistema centralizado de datos
 */

'use client';

import { useState, useEffect } from 'react';
import { useConfiguratorStore, type AddOn } from '@/lib/store/useConfiguratorStore';
import { addonsAPI } from '@/lib/api-client';

// Categorías de add-ons del nuevo sistema
const ADDON_CATEGORIES = [
  'Hormonal',
  'Cardiovascular', 
  'Inmunología',
  'Oncología',
  'Neurología',
  'Vitaminas',
  'Alergias',
  'Genética'
];

export function AddOnSelector() {
  const { 
    selectedProfile, 
    selectedGender, 
    selectedAddOns, 
    toggleAddOn, 
    isAddOnSelected,
    canAddMoreAddOns,
    excludedBiomarkers,
    getCompatibleAddOns,
    isLoading
  } = useConfiguratorStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availableAddOns, setAvailableAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [biomarkersModalOpen, setBiomarkersModalOpen] = useState<AddOn | null>(null);

  // Cargar add-ons disponibles
  useEffect(() => {
    const loadAddOns = async () => {
      if (!selectedProfile) return;
      
      setLoading(true);
      try {
        const addons = await getCompatibleAddOns();
        setAvailableAddOns(addons);
      } catch (error) {
        console.error('Error loading add-ons:', error);
        setAvailableAddOns([]);
      } finally {
        setLoading(false);
      }
    };

    loadAddOns();
  }, [selectedProfile, selectedGender]);

  if (!selectedProfile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Primero selecciona un perfil base.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Cargando add-ons disponibles...</p>
      </div>
    );
  }

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
      {filteredAddOns.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {selectedCategory === 'all' 
              ? 'No hay add-ons disponibles para este perfil.'
              : `No hay add-ons disponibles en la categoría "${selectedCategory}".`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAddOns.map((addon) => {
            const isSelected = isAddOnSelected(addon.id);
            const pricing = addon.pricing[selectedGender];
            const biomarkersCount = addon.biomarkersCount[selectedGender];
            const discount = Math.round(((pricing.pvp - pricing.precio) / pricing.pvp) * 100);
            const canSelect = canAddMoreAddOns() || isSelected;

            return (
              <div
                key={addon.id}
                className={`relative rounded-2xl border-2 p-6 transition-all ${
                  !canSelect && !isSelected
                    ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                    : isSelected
                    ? 'border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200'
                    : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-lg cursor-pointer'
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
                    <div className="text-2xl mr-2">🧬</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{addon.name}</h3>
                      <p className="text-sm text-gray-600">{addon.description}</p>
                    </div>
                  </div>
                </div>

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
                      {formatPrice(pricing.precio)}
                    </div>
                    {discount > 0 && (
                      <div className="text-xs text-green-600">
                        Ahorra {discount}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing Details */}
                {pricing.pvp > pricing.precio && (
                  <div className="mb-4 text-center">
                    <div className="text-sm text-gray-500 line-through">
                      PVP: {formatPrice(pricing.pvp)}
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      Precio especial: {formatPrice(pricing.precio)}
                    </div>
                  </div>
                )}

                {/* Biomarcadores Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Biomarcadores incluidos:
                  </h4>
                  <div className="text-xs text-gray-600">
                    {addon.biomarkers.slice(0, 3).join(', ')}
                    {addon.biomarkers.length > 3 && ` y ${addon.biomarkers.length - 3} más...`}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => canSelect && toggleAddOn(addon)}
                    disabled={!canSelect}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isSelected
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : canSelect
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSelected ? 'Remover' : canSelect ? 'Añadir' : 'Límite alcanzado'}
                  </button>
                  
                  <button
                    onClick={() => setBiomarkersModalOpen(addon)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Biomarcadores Modal */}
      {biomarkersModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{biomarkersModalOpen.name}</h2>
                  <p className="text-gray-600">{biomarkersModalOpen.description}</p>
                </div>
                <button
                  onClick={() => setBiomarkersModalOpen(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <h3 className="font-semibold mb-4">Biomarcadores incluidos ({biomarkersModalOpen.biomarkersCount[selectedGender]}):</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {biomarkersModalOpen.biomarkers.map((code, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-mono text-gray-600 bg-white px-2 py-1 rounded mr-3">
                      {code}
                    </div>
                    <div className="text-sm text-gray-900">
                      {/* Aquí podrías mostrar el nombre del biomarcador si lo tienes */}
                      {code}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 