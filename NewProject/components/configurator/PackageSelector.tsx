/**
 * PACKAGE SELECTOR
 * Selector de perfiles para el configurador
 * Integrado con nuestro sistema centralizado de datos
 */

'use client';

import { useState, useEffect } from 'react';
import { useConfiguratorStore, type Profile } from '@/lib/store/useConfiguratorStore';
import { ProfileBiomarkersModal } from '@/components/landing/ProfileBiomarkersModal';

export function PackageSelector() {
  const { selectedProfile, selectedGender, setProfile, loadProfiles } = useConfiguratorStore();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBiomarkersModal, setShowBiomarkersModal] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('');
  const [selectedProfileName, setSelectedProfileName] = useState<string>('');
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);

  // Cargar perfiles disponibles
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const profilesData = await loadProfiles();
        setProfiles(profilesData);
      } catch (error) {
        console.error('Error loading profiles:', error);
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Cargando perfiles disponibles...</p>
      </div>
    );
  }

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
            Segundo paso: Selecciona tu perfil base
          </h3>
          <p className="text-white">
            Selecciona el perfil base que mejor se adapte a tus objetivos de salud. 
            Podrás personalizarlo con add-ons en el siguiente paso.
          </p>
        </div>
        <p className="text-gray-600">
          Los precios y biomarcadores mostrados son específicos para tu género seleccionado.
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay perfiles disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile) => {
            const isSelected = selectedProfile?.id === profile.id;
            
            // Usar datos específicos del género seleccionado
            const genderPricing = profile.pricing[selectedGender];
            const genderBiomarkers = profile.biomarkersCount[selectedGender];
            const discount = Math.round(((genderPricing.pvp - genderPricing.precio) / genderPricing.pvp) * 100);
            
            return (
              <div
                key={profile.id}
                onClick={() => setProfile(profile)}
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
                <div className="mb-4">
                  <div className="flex items-center justify-center relative">
                    <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProfileId(profile.id);
                          setSelectedProfileName(profile.name);
                          setShowBiomarkersModal(true);
                        }}
                        onMouseEnter={() => setHoveredProfile(profile.id)}
                        onMouseLeave={() => setHoveredProfile(null)}
                        className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Tooltip personalizado */}
                      {hoveredProfile === profile.id && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                          <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 max-w-xs whitespace-normal shadow-lg">
                            {profile.description}
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
                    {genderBiomarkers}
                  </div>
                  <div className="text-xs text-gray-500">Biomarcadores</div>
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(genderPricing.precio)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Precio para {selectedGender === 'male' ? 'hombre' : 'mujer'}
                  </div>
                  {discount > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      Ahorra {discount}% sobre PVP ({formatPrice(genderPricing.pvp)})
                    </div>
                  )}
                </div>



                {/* Biomarkers Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProfileId(profile.id);
                      setSelectedProfileName(profile.name);
                      setShowBiomarkersModal(true);
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

      {/* Help Text */}
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          ¿No estás seguro? Puedes cambiar tu selección en cualquier momento.
        </p>
      </div>

      {/* Biomarkers Modal */}
      <ProfileBiomarkersModal
        isOpen={showBiomarkersModal}
        onClose={() => setShowBiomarkersModal(false)}
        profileId={selectedProfileId}
        profileName={selectedProfileName}
        selectedGender={selectedGender}
      />
    </div>
  );
} 