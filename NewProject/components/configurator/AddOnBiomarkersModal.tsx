/**
 * ADD-ON BIOMARKERS MODAL
 * Modal para gestionar biomarcadores específicos de un add-on usando API
 */

'use client';

import { useState, useEffect } from 'react';
import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { biomarkersAPI, addonsAPI } from '@/lib/api-client';

interface AddOnBiomarkersModalProps {
  isOpen: boolean;
  onClose: () => void;
  addonId: string;
  addonName: string;
}

export function AddOnBiomarkersModal({ isOpen, onClose, addonId, addonName }: AddOnBiomarkersModalProps) {
  const { 
    selectedGender, 
    excludedBiomarkers, 
    toggleBiomarkerExclusion, 
    clearExcludedBiomarkers 
  } = useConfiguratorStore();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [biomarkers, setBiomarkers] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<{precio: number, pvp: number}>({precio: 0, pvp: 0});
  
  // Cargar biomarcadores desde la API cuando se abre el modal
  useEffect(() => {
    if (!isOpen || !addonId) return;

    const loadBiomarkers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Obtener detalles del add-on con biomarcadores desde la API
        const addonData = await addonsAPI.getById(addonId, { 
          gender: selectedGender, 
          details: true 
        });
        
        if (addonData && addonData.biomarkerCodes && addonData.biomarkerCodes.length > 0) {
          // Usar los detalles que ya vienen de la API (más eficiente)
          const biomarkersData = addonData.biomarkersDetails || [];
          
          // Extraer categorías únicas
          const categoriesSet = new Set<string>();
          biomarkersData.forEach(b => categoriesSet.add(b.category || ''));
          const uniqueCategories = Array.from(categoriesSet);
          
          setBiomarkers(biomarkersData);
          setCategories(uniqueCategories);
        } else {
          setBiomarkers([]);
          setCategories([]);
          setError('No se encontraron biomarcadores para este add-on');
        }
        
      } catch (err) {
        console.error('Error loading biomarkers:', err);
        setError('Error cargando biomarcadores');
      } finally {
        setLoading(false);
      }
    };

    loadBiomarkers();
  }, [isOpen, addonId, selectedGender]);

  if (!isOpen) return null;

  const excludedCodes = excludedBiomarkers[addonId] || [];
  const includedBiomarkers = biomarkers.filter(b => !excludedCodes.includes(b.code));
  const excludedBiomarkersList = biomarkers.filter(b => excludedCodes.includes(b.code));

  // Calcular precio dinámicamente basado en biomarcadores incluidos
  const calculateCurrentPrice = async (includedBiomarkerCodes: string[]) => {
    if (includedBiomarkerCodes.length === 0) {
      setCurrentPrice({precio: 0, pvp: 0});
      return;
    }

    try {
      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codes: includedBiomarkerCodes,
          gender: selectedGender
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentPrice({
          precio: data.pricing.precio || 0,
          pvp: data.pricing.pvp || 0
        });
      }
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  // Recalcular precio cuando cambian los biomarcadores incluidos
  useEffect(() => {
    if (biomarkers.length > 0) {
      const includedCodes = includedBiomarkers.map(b => b.code);
      calculateCurrentPrice(includedCodes);
    }
  }, [biomarkers, excludedCodes, selectedGender]);

  const filteredBiomarkers = selectedCategory === 'all' 
    ? biomarkers 
    : biomarkers.filter(biomarker => biomarker.category === selectedCategory);

  const handleToggleBiomarker = (biomarkerCode: string) => {
    toggleBiomarkerExclusion(addonId, biomarkerCode);
  };

  const handleClearAll = () => {
    clearExcludedBiomarkers(addonId);
  };

  const handleExcludeAll = () => {
    biomarkers.forEach(biomarker => {
      if (!excludedCodes.includes(biomarker.code)) {
        toggleBiomarkerExclusion(addonId, biomarker.code);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Personalizar Biomarcadores - {addonName}
              </h2>
              <p className="text-green-100">
                Puedes excluir biomarcadores según tus necesidades específicas
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        {/* Loading y Estadísticas */}
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando biomarcadores...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="p-4 border-b flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{biomarkers.length}</div>
                <div className="text-xs text-gray-600">Total Biomarcadores</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{includedBiomarkers.length}</div>
                <div className="text-xs text-gray-600">Incluidos</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{excludedBiomarkersList.length}</div>
                <div className="text-xs text-gray-600">Excluidos</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(currentPrice.precio)}
                </div>
                <div className="text-xs text-gray-600">Precio Total</div>
                {currentPrice.pvp > currentPrice.precio && (
                  <div className="text-xs text-gray-400 line-through">
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(currentPrice.pvp)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filtros por categoría */}
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todas las categorías
            </button>
            {categories.slice(0, 8).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de biomarcadores */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {filteredBiomarkers.map((biomarker, index) => {
              const isExcluded = excludedCodes.includes(biomarker.code);
              
              return (
                <div 
                  key={`${biomarker.code}-${index}`}
                  className={`relative bg-gray-50 rounded-lg p-3 border transition-colors ${
                    isExcluded
                      ? 'border-red-200 hover:border-red-300 opacity-60'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-xs font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      {biomarker.code}
                    </div>
                    <button
                      onClick={() => handleToggleBiomarker(biomarker.code)}
                      className={`w-12 h-6 rounded-full transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isExcluded 
                          ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' 
                          : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                      }`}
                      title={isExcluded ? 'Excluido - Click para incluir' : 'Incluido - Click para excluir'}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-200 absolute top-0.5 flex items-center justify-center ${
                          isExcluded ? 'translate-x-0.5' : 'translate-x-6'
                        }`}
                      >
                        <span className={`text-xs font-bold ${isExcluded ? 'text-red-500' : 'text-green-500'}`}>
                          {isExcluded ? '✕' : '✓'}
                        </span>
                      </div>
                    </button>
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {biomarker.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {biomarker.category}
                  </p>
                  {biomarker.gender !== 'both' && (
                    <div className={`text-xs mt-1 px-2 py-1 rounded-full ${
                      biomarker.gender === 'male' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {biomarker.gender === 'male' ? '♂ Hombre' : '♀ Mujer'}
                    </div>
                  )}
                  {isExcluded && (
                    <div className="absolute top-2 left-2">
                      <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full border border-red-200">
                        EXCLUIDO
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredBiomarkers.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron biomarcadores en esta categoría
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {excludedBiomarkersList.length > 0 && (
                <span className="text-red-600">
                  {excludedBiomarkersList.length} biomarcadores excluidos | 
                </span>
              )}
              <span className="text-green-600 font-medium">
                {includedBiomarkers.length} biomarcadores incluidos
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExcludeAll}
                className="px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors text-sm"
              >
                Excluir Todos
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Incluir Todos
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 