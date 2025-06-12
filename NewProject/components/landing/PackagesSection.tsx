/**
 * PACKAGES SECTION COMPONENT
 * Sección completa de paquetes con datos reales y funcionalidad avanzada
 */

'use client';

import { useState } from 'react';
import { PACKAGES_DATA, type SimplePackage } from '@/lib/data/packages-simple';
import { ProfileBiomarkersModal } from './ProfileBiomarkersModal';
import PackageQuestionnaireModal from './PackageQuestionnaireModal';

type Gender = 'male' | 'female' | 'both';

interface ModalState {
  isOpen: boolean;
  profileId: string;
  profileName: string;
}

export default function PackagesSection() {
  const [selectedGender, setSelectedGender] = useState<Gender>('both');
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    profileId: '',
    profileName: ''
  });
  const [showPackageSelector, setShowPackageSelector] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPackagePrice = (pkg: SimplePackage, gender: Gender) => {
    return pkg.pricing[gender];
  };

  const getBiomarkersCount = (pkg: SimplePackage, gender: Gender) => {
    return pkg.biomarkersCount[gender];
  };

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
                onClick={() => setSelectedGender('both')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedGender === 'both'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Unisex
              </button>
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
          {PACKAGES_DATA.map((pkg) => {
            const pricing = getPackagePrice(pkg, selectedGender);
            const biomarkersCount = getBiomarkersCount(pkg, selectedGender);
            const discount = Math.round(((pricing.pvp - pricing.price) / pricing.pvp) * 100);

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
                        {formatPrice(pricing.price)}
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
                        {biomarkersCount}+
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
                        {formatPrice(pricing.price / biomarkersCount)}
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
          })}
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
        selectedGender={selectedGender === 'both' ? 'male' : selectedGender}
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