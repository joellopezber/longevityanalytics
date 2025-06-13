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
  
  // Filtrar por género
  const genderFilteredBiomarkers = filterBiomarkersByGender(allBiomarkers, selectedGender);
  
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
      <div className={`relative bg-gray-50 rounded-lg p-3 border transition-colors ${
        isEssential 
          ? 'border-blue-200 hover:border-blue-300' 
          : isExcluded
          ? 'border-red-200 hover:border-red-300 opacity-60'
          : 'border-gray-200 hover:border-green-300'
      }`}>
        <div className="flex items-start justify-between mb-2">
          <div className="text-xs font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">
            {biomarker.code}
          </div>
          <div className="flex items-center gap-1">
            {isEssential ? (
              <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Esencial
              </div>
            ) : (
              <button
                onClick={() => handleToggleBiomarker(biomarker.code)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  isExcluded ? 'bg-red-500' : 'bg-green-500'
                }`}
                title={isExcluded ? 'Excluido - Click para incluir' : 'Incluido - Click para excluir'}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform absolute top-0.5 ${
                    isExcluded ? 'translate-x-0.5' : 'translate-x-5'
                  }`}
                />
              </button>
            )}
          </div>
        </div>
        <h4 className="font-medium text-gray-900 text-sm mb-1">
          {biomarker.name}
        </h4>
        <p className="text-xs text-gray-600 mb-1">
          {biomarker.category}
        </p>
        <p className="text-xs font-medium text-green-600">
          €{biomarker.price}
        </p>
        {isExcluded && !isEssential && (
          <div className="absolute inset-0 bg-red-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <span className="text-xs font-medium text-red-600 bg-white px-2 py-1 rounded shadow">
              EXCLUIDO
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Personalizar Biomarcadores - {addOn.name}
              </h2>
              <p className="text-green-100">
                Puedes excluir biomarcadores opcionales según tus necesidades específicas
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



        {/* Estadísticas */}
        <div className="p-4 border-b flex-shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{essentialBiomarkers.length}</div>
              <div className="text-xs text-gray-600">Esenciales</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{includedCount}</div>
              <div className="text-xs text-gray-600">Incluidos</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{excludedCount}</div>
              <div className="text-xs text-gray-600">Excluidos</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">€{finalPrice}</div>
              <div className="text-xs text-gray-600">Precio Final</div>
            </div>
          </div>
        </div>

        {/* Filtros por categoría */}
        <div className="p-4 border-b">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              Todas las categorías
            </Button>
            {categories.slice(0, 8).map(category => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {filteredEssential.map((biomarker) => (
              <BiomarkerItem 
                key={biomarker.code} 
                biomarker={biomarker} 
                isEssential={true} 
              />
            ))}
            {filteredOptional.map((biomarker) => (
              <BiomarkerItem 
                key={biomarker.code} 
                biomarker={biomarker} 
                isEssential={false} 
              />
            ))}
          </div>

          {(filteredEssential.length === 0 && filteredOptional.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron biomarcadores en esta categoría
            </div>
          )}

          {/* Actions for optional biomarkers */}
          {filteredOptional.length > 0 && (
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExcludeAllOptional}
                >
                  Excluir Todos los Opcionales
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex-shrink-0">
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