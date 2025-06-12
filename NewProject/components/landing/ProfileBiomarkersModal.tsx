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
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
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
        <div className="p-4 border-b flex-shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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


      </div>
    </div>
  );
} 