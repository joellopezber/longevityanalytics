/**
 * PACKAGE SELECTOR
 * Selector de perfiles para el configurador
 * Integrado con nuestro sistema centralizado de datos
 */

'use client';

import { useState, useEffect } from 'react';
import { useConfiguratorStore, type Profile } from '@/lib/store/useConfiguratorStore';

export function PackageSelector() {
  const { selectedProfile, setProfile, loadProfiles } = useConfiguratorStore();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Iconos para los perfiles
  const profileIcons = {
    'essential': '🧬',
    'performance': '🏃‍♂️',
    'core': '💎',
    'advanced': '🔬'
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600">
          Selecciona el perfil base que mejor se adapte a tus objetivos de salud.
          Podrás personalizarlo con add-ons en el siguiente paso.
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
            
            // Calcular promedios de precio y biomarcadores
            const avgPrice = Math.round((profile.pricing.male.precio + profile.pricing.female.precio) / 2);
            const avgBiomarkers = Math.round((profile.biomarkersCount.male + profile.biomarkersCount.female) / 2);
            const avgPvp = Math.round((profile.pricing.male.pvp + profile.pricing.female.pvp) / 2);
            const discount = Math.round(((avgPvp - avgPrice) / avgPvp) * 100);
            
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
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{profileIcons[profile.id] || '🧬'}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {avgBiomarkers}
                    </div>
                    <div className="text-xs text-gray-500">Biomarcadores</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {profile.biomarkers.length}
                    </div>
                    <div className="text-xs text-gray-500">Análisis incluidos</div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(avgPrice)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Precio promedio (varía por género)
                  </div>
                  {discount > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      Ahorra {discount}% sobre PVP
                    </div>
                  )}
                </div>

                {/* Pricing Details by Gender */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-gray-700">👨 Hombre</div>
                      <div className="text-green-600 font-semibold">
                        {formatPrice(profile.pricing.male.precio)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {profile.biomarkersCount.male} biomarcadores
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-700">👩 Mujer</div>
                      <div className="text-green-600 font-semibold">
                        {formatPrice(profile.pricing.female.precio)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {profile.biomarkersCount.female} biomarcadores
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biomarkers Preview */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Biomarcadores incluidos:</h4>
                  <div className="text-xs text-gray-600">
                    {profile.biomarkers.slice(0, 3).join(', ')}
                    {profile.biomarkers.length > 3 && ` y ${profile.biomarkers.length - 3} más...`}
                  </div>
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
    </div>
  );
} 