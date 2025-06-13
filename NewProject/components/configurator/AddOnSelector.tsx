/**
 * ADD-ON SELECTOR
 * Selector de add-ons para el configurador
 * Integrado con nuestro sistema centralizado de datos
 */

'use client';

import { useState, useEffect } from 'react';
import { useConfiguratorStore, type AddOn } from '@/lib/store/useConfiguratorStore';
import { addonsAPI } from '@/lib/api-client';
import { BIOMARKERS_DICTIONARY } from '@/data/biomarkers';
import { AddOnBiomarkersModal } from './AddOnBiomarkersModal';

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
  const [biomarkersModalOpen, setBiomarkersModalOpen] = useState<{id: string, name: string} | null>(null);
  const [hoveredAddon, setHoveredAddon] = useState<string | null>(null);

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
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Tercer paso: Personaliza con Add-ons
          </h3>
          <p className="text-white">
            Añade análisis específicos para completar tu perfil de salud personalizado. 
            Puedes seleccionar hasta 10 add-ons adicionales.
          </p>
        </div>
        <div className="text-sm text-gray-500">
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
                onClick={() => canSelect && toggleAddOn(addon)}
                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all hover:shadow-lg ${
                  !canSelect && !isSelected
                    ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                    : isSelected
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

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {addon.category}
                  </span>
                </div>

                {/* Add-on Header */}
                <div className="mt-8 mb-4">
                  <div className="flex items-center justify-center relative">
                    <h3 className="text-xl font-bold text-gray-900">{addon.name}</h3>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBiomarkersModalOpen({id: addon.id, name: addon.name});
                        }}
                        onMouseEnter={() => setHoveredAddon(addon.id)}
                        onMouseLeave={() => setHoveredAddon(null)}
                        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Tooltip personalizado */}
                      {hoveredAddon === addon.id && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                          <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 max-w-xs whitespace-normal shadow-lg">
                            {addon.description}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    {biomarkersCount}
                  </div>
                  <div className="text-xs text-gray-500">Biomarcadores</div>
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(pricing.precio)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Precio para {selectedGender === 'male' ? 'hombre' : 'mujer'}
                  </div>
                  {discount > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      Ahorra {discount}% sobre PVP ({formatPrice(pricing.pvp)})
                    </div>
                  )}
                </div>

                {/* Biomarkers Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setBiomarkersModalOpen({id: addon.id, name: addon.name});
                    }}
                    className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg transition-colors border border-green-200 hover:border-green-300"
                  >
                    Ver biomarcadores
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Biomarcadores Modal */}
      {biomarkersModalOpen && (
        <AddOnBiomarkersModal
          isOpen={true}
          onClose={() => setBiomarkersModalOpen(null)}
          addonId={biomarkersModalOpen.id}
          addonName={biomarkersModalOpen.name}
        />
      )}
    </div>
  );
} 