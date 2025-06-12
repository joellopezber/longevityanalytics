/**
 * ADD-ON BIOMARKERS MODAL
 * Modal para gestionar biomarcadores específicos de un add-on
 */

'use client';

import { useState } from 'react';
import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { 
  getBiomarkersByAddOn, 
  filterBiomarkersByGender,
  getEssentialBiomarkers,
  getOptionalBiomarkers,
  getBiomarkerCategories,
  calculateBiomarkersPrice,
  type BiomarkerData 
} from '@/lib/data/addon-biomarkers';
import type { SimpleAddOn } from '@/lib/data/addons-simple';
import { Button } from '@/components/ui/Button';

interface AddOnBiomarkersModalProps {
  isOpen: boolean;
  onClose: () => void;
  addOn: SimpleAddOn;
}

export function AddOnBiomarkersModal({ isOpen, onClose, addOn }: AddOnBiomarkersModalProps) {
  const { 
    selectedGender, 
    excludedBiomarkers, 
    toggleBiomarkerExclusion, 
    clearExcludedBiomarkers 
  } = useConfiguratorStore();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  if (!isOpen) return null;
  
  // Obtener biomarcadores del add-on
  const allBiomarkers = getBiomarkersByAddOn(addOn.id);
  
  // Filtrar por género solo si no es 'both'
  const genderFilteredBiomarkers = selectedGender === 'both' 
    ? allBiomarkers 
    : filterBiomarkersByGender(allBiomarkers, selectedGender as 'male' | 'female');
  
  // Separar esenciales y opcionales
  const essentialBiomarkers = getEssentialBiomarkers(genderFilteredBiomarkers);
  const optionalBiomarkers = getOptionalBiomarkers(genderFilteredBiomarkers);
  
  // Obtener categorías
  const categories = getBiomarkerCategories(genderFilteredBiomarkers);
  
  // Filtrar por categoría seleccionada
  const filteredEssential = selectedCategory === 'all' 
    ? essentialBiomarkers 
    : essentialBiomarkers.filter(b => b.category === selectedCategory);
    
  const filteredOptional = selectedCategory === 'all' 
    ? optionalBiomarkers 
    : optionalBiomarkers.filter(b => b.category === selectedCategory);

  // Calcular precios
  const totalPrice = calculateBiomarkersPrice(genderFilteredBiomarkers);
  const excludedCodes = excludedBiomarkers[addOn.id] || [];
  const excludedPrice = calculateBiomarkersPrice(
    genderFilteredBiomarkers.filter(b => excludedCodes.includes(b.code))
  );
  const finalPrice = totalPrice - excludedPrice;

  // Estadísticas
  const totalBiomarkers = genderFilteredBiomarkers.length;
  const excludedCount = genderFilteredBiomarkers.filter(b => excludedCodes.includes(b.code)).length;
  const includedCount = totalBiomarkers - excludedCount;

  const handleToggleBiomarker = (biomarkerCode: string) => {
    toggleBiomarkerExclusion(addOn.id, biomarkerCode);
  };

  const handleClearAll = () => {
    clearExcludedBiomarkers(addOn.id);
  };

  const handleExcludeAllOptional = () => {
    optionalBiomarkers.forEach(biomarker => {
      if (!excludedCodes.includes(biomarker.code)) {
        toggleBiomarkerExclusion(addOn.id, biomarker.code);
      }
    });
  };

  const BiomarkerItem = ({ biomarker, isEssential }: { biomarker: BiomarkerData; isEssential: boolean }) => {
    const isExcluded = excludedCodes.includes(biomarker.code);
    
    return (
      <div className={`flex items-center justify-between p-3 rounded-lg border ${
        isEssential ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
      }`}>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm">{biomarker.name}</h4>
            {isEssential && (
              <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {biomarker.code}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">{biomarker.category}</p>
          <p className="text-xs font-medium text-green-600">€{biomarker.price}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {isEssential ? (
            <div className="flex items-center gap-1 text-blue-600">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Esencial</span>
            </div>
          ) : (
            <button
              onClick={() => handleToggleBiomarker(biomarker.code)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                isExcluded ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                  isExcluded ? 'translate-x-0.5' : 'translate-x-6'
                }`}
              />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">
                {addOn.icon}
              </div>
              <h2 className="text-xl font-bold">Personalizar Biomarcadores - {addOn.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Información */}
        <div className="p-6 bg-blue-50 border-b">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <h3 className="font-medium text-blue-900 mb-2">¿Cómo funciona la personalización?</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Biomarcadores Esenciales:</strong> No se pueden excluir ya que son fundamentales para garantizar la calidad del análisis.</p>
                <p><strong>Biomarcadores Opcionales:</strong> Puedes excluirlos según tus necesidades específicas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{essentialBiomarkers.length}</div>
              <div className="text-xs text-gray-600">Esenciales</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{includedCount}</div>
              <div className="text-xs text-gray-600">Incluidos</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{excludedCount}</div>
              <div className="text-xs text-gray-600">Excluidos</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">€{finalPrice}</div>
              <div className="text-xs text-gray-600">Precio Final</div>
            </div>
          </div>
        </div>

        {/* Filtros por categoría */}
        <div className="p-6 border-b">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              Todas las categorías
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de biomarcadores */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Biomarcadores Esenciales */}
            {filteredEssential.length > 0 && (
              <div>
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Biomarcadores Esenciales ({filteredEssential.length})
                </h3>
                <div className="space-y-2">
                  {filteredEssential.map(biomarker => (
                    <BiomarkerItem 
                      key={biomarker.code} 
                      biomarker={biomarker} 
                      isEssential={true} 
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredEssential.length > 0 && filteredOptional.length > 0 && (
              <div className="border-t border-gray-200 my-4"></div>
            )}

            {/* Biomarcadores Opcionales */}
            {filteredOptional.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-green-900 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                    Biomarcadores Opcionales ({filteredOptional.length})
                  </h3>
                                      <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleExcludeAllOptional}
                    >
                      Excluir Todos
                    </Button>
                </div>
                <div className="space-y-2">
                  {filteredOptional.map(biomarker => (
                    <BiomarkerItem 
                      key={biomarker.code} 
                      biomarker={biomarker} 
                      isEssential={false} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {excludedCount > 0 && (
                <span>Ahorro: €{excludedPrice} | </span>
              )}
              Precio final: <span className="font-bold text-green-600">€{finalPrice}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleClearAll}>
                Incluir Todos
              </Button>
              <Button variant="primary" onClick={onClose}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 