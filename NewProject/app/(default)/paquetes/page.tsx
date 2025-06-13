/**
 * PACKAGES PAGE
 * Página dedicada a mostrar todos los paquetes disponibles
 * INTEGRADO CON API PARA DATOS REALES
 */

'use client';

import { useState } from 'react';
import { usePackagesData } from '@/hooks/usePackagesData';
import { PackageCard } from '@/components/shared/PackageCard';
import { PackageSelectionCTA } from '@/components/shared/PackageSelectionCTA';
import { ProfileBiomarkersModal } from '@/components/landing/ProfileBiomarkersModal';
import { PACKAGE_DESCRIPTIONS } from '@/lib/data/questionnaire';
import { getProfileBiomarkers, getProfileStats } from '@/lib/data/profile-biomarkers';

interface ModalState {
  isOpen: boolean;
  profileId: string;
  profileName: string;
}

export default function PaquetesPage() {
  const { 
    selectedGender, 
    setSelectedGender, 
    loading, 
    getProfileData, 
    formatPrice,
    packagesInfo 
  } = usePackagesData();
  
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    profileId: '',
    profileName: ''
  });

  // Los datos y funciones ahora vienen del hook usePackagesData

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

  // formatPrice ahora viene del hook usePackagesData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">La información que</span><br />
              que cambiarán tu vida
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Desde lo esencial hasta lo extraordinario. Cuatro niveles de análisis que van 
              <span className="font-semibold text-gray-900"> mucho más allá</span> de cualquier chequeo médico convencional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Essential: Tu base sólida
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Performance: Para atletas
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Core: Análisis completo
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Advanced: Lo nunca visto
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Package Explanations */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Conoce nuestros paquetes en profundidad
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada paquete ha sido diseñado científicamente para diferentes objetivos de salud y longevidad. 
              Descubre cuál se adapta mejor a tus necesidades específicas.
            </p>
          </div>

          <div className="space-y-20">
            {/* Essential Package */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-blue-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-600 text-white p-4 rounded-xl mr-4 shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Essential</h3>
                      <p className="text-blue-600 font-medium">Perfecto para comenzar</p>
                    </div>
                  </div>
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {loading ? '...' : getProfileData('essential').male}
                  </div>
                  <div className="text-sm text-gray-600">biomarcadores fundamentales</div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Para quién es ideal?</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Perfecto para personas que buscan un monitoreo básico pero completo de su salud. 
                  Ideal si es tu primera analítica avanzada o quieres establecer una línea base sólida 
                  para el seguimiento de tu salud a largo plazo.
                </p>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Qué incluye?</h4>
                <ul className="space-y-3">
                  {PACKAGE_DESCRIPTIONS.essential.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Performance Package */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-orange-50 to-red-100 p-8 rounded-2xl shadow-lg border border-orange-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-600 text-white p-4 rounded-xl mr-4 shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Performance</h3>
                      <p className="text-orange-600 font-medium">Optimiza tu rendimiento</p>
                    </div>
                  </div>
                  <div className="text-6xl font-bold text-orange-600 mb-2">
                    {loading ? '...' : getProfileData('performance').male}
                  </div>
                  <div className="text-sm text-gray-600">biomarcadores especializados</div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Para quién es ideal?</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Diseñado específicamente para atletas, deportistas y personas muy activas que buscan 
                  optimizar su rendimiento físico. Incluye biomarcadores especializados para monitorear 
                  recuperación, adaptaciones al entrenamiento y optimización nutricional.
                </p>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Qué incluye?</h4>
                <ul className="space-y-3">
                  {PACKAGE_DESCRIPTIONS.performance.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Package */}
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl shadow-lg border border-purple-200">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-600 text-white p-4 rounded-xl mr-4 shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Core</h3>
                      <p className="text-purple-600 font-medium">Análisis integral</p>
                    </div>
                  </div>
                  <div className="text-6xl font-bold text-purple-600 mb-2">
                    {loading ? '...' : getProfileData('core').male}
                  </div>
                  <div className="text-sm text-gray-600">biomarcadores completos</div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Para quién es ideal?</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Perfecto para centros de longevidad y personas que buscan un análisis completo y 
                  exhaustivo de su salud. Ideal para quienes priorizan la prevención y quieren una 
                  evaluación integral de todos los sistemas corporales.
                </p>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Qué incluye?</h4>
                <ul className="space-y-3">
                  {PACKAGE_DESCRIPTIONS.core.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Advanced Package */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg border-2 border-green-200 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      MÁS POPULAR
                    </div>
                  </div>
                  <div className="flex items-center mb-6 mt-4">
                    <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 rounded-xl mr-4 shadow-lg">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Advanced</h3>
                      <p className="text-green-600 font-medium">Lo más completo</p>
                    </div>
                  </div>
                  <div className="text-6xl font-bold text-green-600 mb-2">
                    {loading ? '...' : getProfileData('advanced').male}
                  </div>
                  <div className="text-sm text-gray-600">biomarcadores avanzados</div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Para quién es ideal?</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  El análisis más exhaustivo disponible, ideal para quienes buscan la máxima información 
                  sobre su salud y longevidad. Incluye análisis genético, epigenético y biomarcadores 
                  avanzados que no encontrarás en análisis convencionales.
                </p>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Qué incluye?</h4>
                <ul className="space-y-3">
                  {PACKAGE_DESCRIPTIONS.advanced.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selector Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Configura tu análisis personalizado
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Selecciona tu género para ver precios personalizados y biomarcadores específicos para tu perfil.
            </p>
            
            {/* Gender Selector */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setSelectedGender('male')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                    selectedGender === 'male'
                      ? 'bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Hombre
                </button>
                <button
                  onClick={() => setSelectedGender('female')}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                    selectedGender === 'female'
                      ? 'bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mujer
                </button>
              </div>
            </div>
          </div>

          {/* Packages Grid - Using shared component */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {packagesInfo.map((pkg) => {
              const biomarkers = getProfileBiomarkers(pkg.id, selectedGender);
              const stats = getProfileStats(pkg.id, selectedGender);
              
              // Obtener datos del perfil desde la API
              const profileData = getProfileData(pkg.id);

              return (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  profileData={{
                    biomarkers: biomarkers.length,
                    male: profileData.male,
                    female: profileData.female,
                    pricing: profileData.pricing
                  }}
                  selectedGender={selectedGender}
                  onViewBiomarkers={handleViewBiomarkers}
                  variant="detailed"
                  showStats={true}
                  showComparison={true}
                />
              );
            })}
          </div>
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
                  {packagesInfo.map((pkg) => (
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
                  {packagesInfo.map((pkg) => {
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
                  {packagesInfo.map((pkg) => {
                    const profileData = getProfileData(pkg.id);
                    return (
                      <td key={pkg.id} className="text-center p-4">
                        <span className={`font-semibold ${pkg.textColor}`}>
                          {formatPrice(profileData.pricing.precio)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-900">Precio por biomarcador</td>
                  {packagesInfo.map((pkg) => {
                    const biomarkers = getProfileBiomarkers(pkg.id, selectedGender);
                    const profileData = getProfileData(pkg.id);
                    const pricePerBiomarker = biomarkers.length > 0 ? profileData.pricing.precio / biomarkers.length : 0;
                    return (
                      <td key={pkg.id} className="text-center p-4">
                        <span className={`font-semibold ${pkg.textColor}`}>
                          {formatPrice(pricePerBiomarker)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Comparison vs Insurance Companies */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestros análisis?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Comparación con chequeos médicos tradicionales de aseguradoras
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Traditional Insurance Analysis */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200">
              <div className="text-center mb-6">
                <div className="bg-red-100 text-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Chequeo Tradicional</h3>
                <p className="text-red-600 font-medium">Sanitas, Adeslas, DKV...</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Biomarcadores:</span>
                  <span className="font-semibold text-red-600">15-25</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Precio típico:</span>
                  <span className="font-semibold text-red-600">150-300€</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Precio por biomarcador:</span>
                  <span className="font-semibold text-red-600">10-20€</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Enfoque:</span>
                  <span className="font-semibold text-red-600">Reactivo</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Limitaciones:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">Solo detecta problemas ya establecidos</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">Biomarcadores básicos y limitados</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">No incluye análisis de longevidad</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">Sin personalización por género</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Essential Analysis */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200 relative">
              <div className="text-center mb-6">
                <div className="bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nuestro Essential</h3>
                <p className="text-green-600 font-medium">Medicina preventiva accesible</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Biomarcadores:</span>
                  <span className="font-semibold text-green-600">{getProfileBiomarkers('essential', 'both').length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Precio:</span>
                  <span className="font-semibold text-green-600">
                    {(() => {
                      const essentialData = getProfileData('essential');
                      return formatPrice(essentialData.pricing.precio || 0);
                    })()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Precio por biomarcador:</span>
                  <span className="font-semibold text-green-600">
                    {(() => {
                      const essentialData = getProfileData('essential');
                      const biomarkersCount = getProfileBiomarkers('essential', 'both').length;
                      return biomarkersCount > 0 ? formatPrice((essentialData.pricing.precio || 0) / biomarkersCount) : '...';
                    })()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Enfoque:</span>
                  <span className="font-semibold text-green-600">Preventivo</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Ventajas exclusivas:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">Detecta alteraciones antes de síntomas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">Biomarcadores de longevidad avanzados</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">Análisis genético y epigenético</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">Personalización total por género</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600">Add-ons especializados disponibles</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                La diferencia es clara: Essential vs. Chequeo tradicional
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Mientras los chequeos tradicionales solo detectan problemas ya establecidos, 
                nuestro paquete Essential te permite <span className="font-semibold text-green-600">prevenir y optimizar</span> tu salud antes de que aparezcan síntomas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">2x</div>
                  <div className="text-sm text-gray-600">Más biomarcadores que un chequeo tradicional</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                  <div className="text-sm text-gray-600">Mejor precio por biomarcador</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Enfoque preventivo y personalizado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PackageSelectionCTA variant="packages" />
        </div>
      </div>

      {/* Biomarkers Modal */}
      <ProfileBiomarkersModal
        isOpen={modalState.isOpen}
        profileId={modalState.profileId}
        profileName={modalState.profileName}
        selectedGender={selectedGender}
        onClose={closeModal}
      />


    </div>
  );
} 