/**
 * PACKAGES PAGE
 * Página dedicada a mostrar todos los paquetes disponibles
 */

'use client';

import { useState } from 'react';
import { PACKAGES_DATA } from '@/lib/data/packages-simple';
import { getProfileBiomarkers, getProfileStats } from '@/lib/data/profile-biomarkers';
import { ProfileBiomarkersModal } from '@/components/landing/ProfileBiomarkersModal';

interface ModalState {
  isOpen: boolean;
  profileId: string;
  profileName: string;
}

export default function PaquetesPage() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'both'>('both');
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    profileId: '',
    profileName: ''
  });

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ahora es tu momento: <span className="text-green-700">Sin datos no hay control</span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Elige tu paquete
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Cada paquete está diseñado con un propósito claro en función de tus objetivos y necesidades específicas. 
              Toma el control de tu salud con datos precisos y análisis especializados.
            </p>
            
            {/* Gender Selector */}
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-lg p-1 shadow-sm border border-gray-200">
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
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {PACKAGES_DATA.map((pkg) => {
            const biomarkers = getProfileBiomarkers(pkg.id, selectedGender);
            const stats = getProfileStats(pkg.id, selectedGender);
            const biomarkersCount = biomarkers.length;
            
            // Calcular precio por biomarcador
            const pricing = pkg.pricing[selectedGender] || pkg.pricing.both;
            const pricePerBiomarker = pricing.price / biomarkersCount;

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  pkg.id === 'advanced' 
                    ? 'border-green-500 ring-2 ring-green-200' 
                    : 'border-gray-200 hover:border-gray-300'
                } overflow-hidden`}
              >
                {/* Header */}
                <div className={`p-6 ${pkg.bgColor} ${pkg.textColor}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{pkg.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold">{pkg.name}</h3>
                        {pkg.id === 'advanced' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                            Más Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      {formatPrice(pricing.price)}
                    </div>
                    <div className="text-sm opacity-80">
                      {formatPrice(pricePerBiomarker)} por biomarcador
                    </div>
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
                      <span className="text-sm text-gray-600">Categorías:</span>
                      <span className={`font-semibold ${pkg.textColor}`}>
                        {stats.totalCategories}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Add-ons disponibles:</span>
                      <span className={`font-semibold ${pkg.textColor}`}>
                        {pkg.addOnsCount}
                      </span>
                    </div>
                    {selectedGender !== 'both' && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Específicos de género:</span>
                        <span className={`font-semibold ${pkg.textColor}`}>
                          {selectedGender === 'male' ? stats.biomarkersByGender.male : stats.biomarkersByGender.female}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Incluye:</h4>
                    <ul className="space-y-2">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-gray-600">{feature}</span>
                        </li>
                      ))}
                      {pkg.features.length > 4 && (
                        <li className="text-xs text-gray-500 italic">
                          +{pkg.features.length - 4} análisis más...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
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
                    
                    <a
                      href={`/configurador?package=${pkg.id}`}
                      className="w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Configurar Paquete</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comparación de Paquetes
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra el paquete perfecto para tus necesidades
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-900">Característica</th>
                  {PACKAGES_DATA.map((pkg) => (
                    <th key={pkg.id} className={`text-center p-4 font-semibold ${pkg.textColor}`}>
                      <div className="flex flex-col items-center">
                        <span className="text-lg mb-1">{pkg.icon}</span>
                        <span>{pkg.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900">Biomarcadores</td>
                  {PACKAGES_DATA.map((pkg) => {
                    const biomarkers = getProfileBiomarkers(pkg.id, selectedGender);
                    return (
                      <td key={pkg.id} className="text-center p-4">
                        <span className={`font-semibold ${pkg.textColor}`}>
                          {biomarkers.length}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Precio</td>
                  {PACKAGES_DATA.map((pkg) => {
                    const pricing = pkg.pricing[selectedGender] || pkg.pricing.both;
                    return (
                      <td key={pkg.id} className="text-center p-4">
                        <span className={`font-semibold ${pkg.textColor}`}>
                          {formatPrice(pricing.price)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900">Add-ons disponibles</td>
                  {PACKAGES_DATA.map((pkg) => (
                    <td key={pkg.id} className="text-center p-4">
                      <span className={`font-semibold ${pkg.textColor}`}>
                        {pkg.addOnsCount}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Ideal para</td>
                  {PACKAGES_DATA.map((pkg) => (
                    <td key={pkg.id} className="text-center p-4">
                      <span className="text-sm text-gray-600">
                        {pkg.id === 'essential' && 'Principiantes'}
                        {pkg.id === 'performance' && 'Deportistas'}
                        {pkg.id === 'core' && 'Prevención'}
                        {pkg.id === 'advanced' && 'Longevidad'}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿No estás seguro cuál elegir?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Nuestro cuestionario te ayudará a encontrar el paquete perfecto para ti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#questionnaire"
                className="bg-white text-green-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
              >
                Hacer Cuestionario
              </a>
              <a
                href="/configurador"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-green-700 transition-all"
              >
                Configurar Directamente
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Biomarkers Modal */}
      <ProfileBiomarkersModal
        isOpen={modalState.isOpen}
        profileId={modalState.profileId}
        profileName={modalState.profileName}
        selectedGender={selectedGender === 'both' ? 'male' : selectedGender}
        onClose={closeModal}
      />
    </div>
  );
} 