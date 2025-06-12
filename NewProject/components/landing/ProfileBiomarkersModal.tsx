'use client';

import { useState } from 'react';
import { getProfileBiomarkers, getProfileBiomarkerCategories, getProfileStats, type ProfileBiomarker } from '@/lib/data/profile-biomarkers';
import { Button } from '@/components/ui/Button';

interface ProfileBiomarkersModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileId: string;
  profileName: string;
  selectedGender: 'male' | 'female';
}

export function ProfileBiomarkersModal({ 
  isOpen, 
  onClose, 
  profileId, 
  profileName, 
  selectedGender 
}: ProfileBiomarkersModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const biomarkers = getProfileBiomarkers(profileId, selectedGender);
  const categories = getProfileBiomarkerCategories(profileId, selectedGender);
  const stats = getProfileStats(profileId, selectedGender);

  const filteredBiomarkers = selectedCategory === 'all' 
    ? biomarkers 
    : biomarkers.filter(biomarker => biomarker.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Biomarcadores del Perfil {profileName}
              </h2>
              <p className="text-green-100">
                Estos son los biomarcadores FIJOS incluidos en este perfil
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
        <div className="p-6 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalBiomarkers}</div>
              <div className="text-xs text-gray-600">Total Biomarcadores</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.totalCategories}</div>
              <div className="text-xs text-gray-600">Categorías</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.biomarkersByGender.both}</div>
              <div className="text-xs text-gray-600">Ambos Géneros</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {selectedGender === 'male' ? stats.biomarkersByGender.male : stats.biomarkersByGender.female}
              </div>
              <div className="text-xs text-gray-600">Específicos de Género</div>
            </div>
          </div>
        </div>

        {/* Información */}
        <div className="p-6 border-b bg-blue-50">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Biomarcadores Fijos</h3>
              <p className="text-sm text-blue-800">
                Los biomarcadores mostrados aquí están incluidos de forma fija en el perfil {profileName}. 
                Estos no se pueden personalizar, a diferencia de los add-ons que sí permiten excluir biomarcadores opcionales.
              </p>
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
              Todas las categorías ({biomarkers.length})
            </Button>
            {categories.map(category => {
              const count = biomarkers.filter(b => b.category === category).length;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Lista de biomarcadores */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredBiomarkers.map((biomarker, index) => (
              <div 
                key={`${biomarker.code}-${index}`}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-green-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {biomarker.code}
                  </div>
                  {biomarker.gender !== 'both' && (
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      biomarker.gender === 'male' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {biomarker.gender === 'male' ? '♂' : '♀'}
                    </div>
                  )}
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">
                  {biomarker.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {biomarker.category}
                </p>
              </div>
            ))}
          </div>

          {filteredBiomarkers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron biomarcadores en esta categoría
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Mostrando {filteredBiomarkers.length} de {biomarkers.length} biomarcadores
            </div>
            <Button onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 