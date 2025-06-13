/**
 * PACKAGES SECTION COMPONENT
 * Sección completa de paquetes con datos reales desde API
 * MIGRADO PARA USAR API EN LUGAR DE DATOS HARDCODEADOS
 */

'use client';

import { useState, useEffect } from 'react';
import { profilesAPI } from '@/lib/api-client';
import { ProfileBiomarkersModal } from './ProfileBiomarkersModal';
import PackageQuestionnaireModal from './PackageQuestionnaireModal';

type Gender = 'male' | 'female';

interface ModalState {
  isOpen: boolean;
  profileId: string;
  profileName: string;
}

export default function PackagesSection() {
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    profileId: '',
    profileName: ''
  });
  const [showPackageSelector, setShowPackageSelector] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar perfiles desde la API
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const profilesData = await profilesAPI.getAll();
        setProfiles(profilesData);
      } catch (error) {
        console.error('Error loading profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Función para obtener datos del perfil desde la API
  const getProfileData = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return { 
      biomarkers: 0, 
      pricing: { precio: 0, pvp: 0 },
      name: '',
      description: ''
    };
    
    return {
      biomarkers: profile.biomarkersCount?.[selectedGender] || 0,
      pricing: profile.pricing?.[selectedGender] || { precio: 0, pvp: 0 },
      name: profile.name || '',
      description: profile.description || ''
    };
  };

  // Datos de los paquetes con información estática
  const packagesInfo = [
    {
      id: 'essential',
      name: 'Essential',
      title: 'Seguimiento Básico',
      description: 'Análisis fundamental para el seguimiento básico de tu salud y bienestar general.',
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h5v2h2V6h1V4H9V1H7v3H4v2zm0 4h8v1H4v-1zm0 2h8v1H4v-1zm0 2h8v1H4v-1z"/>
        </svg>
      ),
      addOnsCount: 16,
      features: [
        'Perfil lipídico completo',
        'Función hepática',
        'Función renal',
        'Hemograma completo',
        'Marcadores inflamatorios básicos'
      ]
    },
    {
      id: 'performance',
      name: 'Performance',
      title: 'Rendimiento Deportivo',
      description: 'Optimización del rendimiento físico y cognitivo para deportistas y profesionales activos.',
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
        </svg>
      ),
      addOnsCount: 16,
      features: [
        'Perfil hormonal deportivo',
        'Marcadores de recuperación',
        'Análisis de estrés oxidativo',
        'Vitaminas y minerales',
        'Función cardiovascular avanzada'
      ]
    },
    {
      id: 'core',
      name: 'Core',
      title: 'Centros de Longevidad',
      description: 'Análisis integral diseñado para centros especializados en medicina de longevidad.',
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      isPopular: true,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.5 14.25l-5.584 2.718 1.84 3.837C7.234 20.405 9.53 20 12 20c2.47 0 4.766.405 6.244.805l1.84-3.837L14.5 14.25c-1.17.33-2.328.33-3.5 0zM12 14.5c1.438 0 2.562.5 2.562.5L16 13.5c0-1.5-1.79-2.5-4-2.5s-4 1-4 2.5L9.438 15S10.562 14.5 12 14.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
        </svg>
      ),
      addOnsCount: 11,
      features: [
        'Análisis epigenético',
        'Marcadores de envejecimiento',
        'Perfil hormonal completo',
        'Función mitocondrial',
        'Biomarcadores de longevidad'
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced',
      title: 'Análisis Completo',
      description: 'El análisis más completo disponible, sin dejar nada al azar en tu salud.',
      color: 'amber',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      ),
      addOnsCount: 3,
      features: [
        'Análisis genético completo',
        'Microbioma intestinal',
        'Marcadores tumorales',
        'Edad biológica',
        'Perfil completo de metales pesados'
      ]
    }
  ];

  const handleViewBiomarkers = (profileId: string, profileName: string) => {
    setModalState({
      isOpen: true,
      profileId,
      profileName
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      profileId: '',
      profileName: ''
    });
  };



  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ahora es tu momento: <span className="text-green-700">Sin datos no hay control</span>
          </h2>
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
           Pasa a la acción!
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Cada analítica está diseñada con un objetivo preventivo y un propósito claro: nuestro panel ampliado de biomarcadores detecta alteraciones invisibles para un chequeo convencional, anticipándose a los síntomas y ayudándote a prolongar tu longevidad.
          </p>
          
          {/* Gender Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedGender === 'male'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Hombre
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedGender === 'female'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mujer
              </button>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden animate-pulse">
                <div className="bg-gray-200 p-6 h-32"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            packagesInfo.map((pkg) => {
              const profileData = getProfileData(pkg.id);
              const pricing = profileData.pricing;
              const biomarkersCount = profileData.biomarkers;
              const discount = pricing.pvp > 0 ? Math.round(((pricing.pvp - pricing.precio) / pricing.pvp) * 100) : 0;

            return (
              <div 
                key={pkg.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200 overflow-hidden group ${
                  pkg.isPopular ? 'ring-2 ring-green-500 ring-opacity-20' : ''
                }`}
              >
                {/* Header */}
                <div className={`${pkg.bgColor} p-6 text-center relative`}>
                  {pkg.isPopular && (
                    <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MÁS POPULAR
                    </div>
                  )}
                  <div className="text-4xl mb-3">{pkg.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{pkg.title}</p>
                  
                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(pricing.precio)}
                      </span>
                      {discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(pricing.pvp)}
                        </span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div className="text-xs text-green-600 font-medium">
                        Ahorra {discount}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Biomarcadores:</span>
                      <span className={`font-semibold ${pkg.textColor}`}>
                        {biomarkersCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Add-ons disponibles:</span>
                      <span className={`font-semibold ${pkg.textColor}`}>
                        {pkg.addOnsCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Precio por test:</span>
                      <span className={`font-semibold ${pkg.textColor}`}>
                        {biomarkersCount > 0 ? formatPrice(pricing.precio / biomarkersCount) : '...'}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Incluye:</h4>
                    <ul className="space-y-2">
                      {pkg.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-xs text-gray-600">{feature}</span>
                        </li>
                      ))}
                      {pkg.features.length > 3 && (
                        <li className="text-xs text-gray-500 italic">
                          +{pkg.features.length - 3} análisis más...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => handleViewBiomarkers(pkg.id, pkg.name)}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
                      pkg.id === 'advanced'
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                        : `${pkg.bgColor} ${pkg.textColor} hover:bg-opacity-80`
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Ver Biomarcadores</span>
                  </button>
                </div>
              </div>
            );
          })
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿No estás seguro de qué paquete elegir?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Te ayudamos a encontrar el paquete perfecto para ti
              , basado en tus objetivos de salud y necesidades específicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/configurador"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl inline-block"
              >
                Configurador Inteligente
              </a>
              <button 
                onClick={() => setShowPackageSelector(true)}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                ¿Qué paquete elegir?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Biomarcadores */}
      <ProfileBiomarkersModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        profileId={modalState.profileId}
        profileName={modalState.profileName}
        selectedGender={selectedGender}
      />

      {/* Modal de Cuestionario de Paquetes */}
      <PackageQuestionnaireModal
        isOpen={showPackageSelector}
        onClose={() => setShowPackageSelector(false)}
        onRecommendation={(result) => {
          // El modal manejará el resultado internamente
          console.log('Paquete recomendado:', result.recommendedPackage);
        }}
      />
    </section>
  );
} 