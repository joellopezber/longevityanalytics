/**
 * PACKAGES SECTION COMPONENT
 * Sección de paquetes para la landing page
 * REFACTORIZADO PARA USAR COMPONENTES COMPARTIDOS
 */

'use client';

import { useState } from 'react';
import { usePackagesData } from '@/hooks/usePackagesData';
import { PackageCard } from '@/components/shared/PackageCard';
import { PackageSelectionCTA } from '@/components/shared/PackageSelectionCTA';
import { TestimonialsCarousel } from '@/components/shared/TestimonialsCarousel';
import { ProfileBiomarkersModal } from './ProfileBiomarkersModal';

interface ModalState {
  isOpen: boolean;
  profileId: string;
  profileName: string;
}

export default function PackagesSection() {
  const { 
    selectedGender, 
    setSelectedGender, 
    loading, 
    getProfileData, 
    packagesInfo 
  } = usePackagesData();
  
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
            packagesInfo.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                profileData={getProfileData(pkg.id)}
                selectedGender={selectedGender}
                onViewBiomarkers={handleViewBiomarkers}
                variant="compact"
              />
            ))
          )}
        </div>

        {/* Testimonials Section */}
        <TestimonialsCarousel />

        {/* CTA Section */}
        <PackageSelectionCTA variant="landing" />
      </div>

      {/* Modals */}
      <ProfileBiomarkersModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        profileId={modalState.profileId}
        profileName={modalState.profileName}
        selectedGender={selectedGender}
      />


    </section>
  );
} 