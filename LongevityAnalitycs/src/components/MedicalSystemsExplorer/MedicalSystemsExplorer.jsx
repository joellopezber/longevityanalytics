/**
 * MedicalSystemsExplorer.jsx - REFACTORIZADO
 * Componente principal que muestra los sistemas médicos y paquetes de análisis
 * Versión modular con componentes y hooks extraídos
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Imports de la nueva arquitectura
import { 
  essentialPackage,
  performancePackage,
  corePackage,
  advancedPackage
} from '../../data/analysisPackages';
import { getAddOnPackagesForProfile } from '../../data/addOnPackages';
import { useBiomarkerSelection } from '../../contexts/BiomarkerSelectionContext';
import { useLanguage } from '../../contexts/LanguageContext';

// Componentes modularizados
import BiomarkerCard from './components/BiomarkerCard';

const MedicalSystemsExplorer = () => {
  const { t } = useLanguage();
  const [selectedGender, setSelectedGender] = useState('male');
  const [showAddOns, setShowAddOns] = useState(false);
  
  const { selectedProfile, setSelectedProfile } = useBiomarkerSelection();

  // ================================================================
  // FUNCIONES PRINCIPALES
  // ================================================================

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleProfileSelection = (profile) => {
    setSelectedProfile(profile);
  };

  const getSelectedProfileData = () => {
    switch (selectedProfile) {
      case 'essential': return essentialPackage;
      case 'performance': return performancePackage;
      case 'core': return corePackage;
      case 'advanced': return advancedPackage;
      default: return essentialPackage;
    }
  };

  const getRecommendedAddOnsForSelectedProfile = () => {
    // Obtener códigos del perfil seleccionado para filtrar duplicados
    const profileData = getSelectedProfileData();
    const genderData = profileData.getForGender(selectedGender);
    const baseCodes = genderData.biomarkers.map(bio => bio.code);
    
    // Usar getAddOnPackagesForProfile desde la nueva arquitectura
    const addOnPackagesObject = getAddOnPackagesForProfile(selectedGender, baseCodes, selectedProfile);
    // Convertir objeto a array para compatibilidad con el map
    return Object.values(addOnPackagesObject);
  };

  const toggleAddOnsView = () => {
    setShowAddOns(prev => !prev);
  };

  const hasGenderDifferences = (addOnId) => {
    // Obtener códigos del perfil seleccionado para filtrar duplicados
    const profileData = getSelectedProfileData();
    const genderData = profileData.getForGender(selectedGender);
    const baseCodes = genderData.biomarkers.map(bio => bio.code);
    
    // Obtener los add-ons como objeto
    const addOnPackagesObject = getAddOnPackagesForProfile(selectedGender, baseCodes, selectedProfile);
    const addOn = addOnPackagesObject[addOnId];
    return addOn?.genderSpecific || false;
  };

  const getGenderIndicator = (addOnId, gender) => {
    if (!hasGenderDifferences(addOnId)) return '';
    return gender === 'male' ? ' ♂' : ' ♀';
  };

  // ================================================================
  // RENDERIZADO
  // ================================================================

  return (
    <section className="bg-soft-cream py-20" id="systems">
      <div className="container max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="bg-warm-white rounded-2xl p-8 shadow-xl border-2 border-earth">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone mb-4">
              {t('systems.title')} <span className="gradient-text-earth">{t('systems.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-taupe max-w-3xl mx-auto font-medium leading-relaxed">
              {t('systems.description')}
            </p>
          </div>
        </motion.div>

        {/* Selector de Género */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-warm-white rounded-xl p-2 shadow-lg border-2 border-earth">
            <div className="flex">
              <button
                onClick={() => handleGenderChange('male')}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${selectedGender === 'male'
                    ? 'bg-earth text-white shadow-md'
                    : 'text-stone hover:bg-earth-50'
                  }
                `}
              >
                👨 {t('systems.gender.male')}
              </button>
              <button
                onClick={() => handleGenderChange('female')}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${selectedGender === 'female'
                    ? 'bg-earth text-white shadow-md'
                    : 'text-stone hover:bg-earth-50'
                  }
                `}
              >
                👩 {t('systems.gender.female')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Perfiles de Análisis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-4 gap-6 mb-12 items-stretch"
        >
          {[
            { id: 'essential', package: essentialPackage },
            { id: 'performance', package: performancePackage },
            { id: 'core', package: corePackage },
            { id: 'advanced', package: advancedPackage }
          ].map(({ id, package: pkg }, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              onClick={() => handleProfileSelection(id)}
              className={`
                package-profile-card cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 w-full h-80 flex flex-col
                ${selectedProfile === id 
                  ? 'bg-earth-100 border-earth shadow-xl ring-2 ring-earth' 
                  : 'bg-warm-white border-earth hover:shadow-xl hover:border-warm'
                }
              `}
            >
              <div className="text-center flex-1 flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    selectedProfile === id ? 'shadow-lg' : ''
                  }`}>
                    <span className="text-white text-xl font-bold">LA</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    selectedProfile === id ? 'text-stone' : 'text-stone'
                  }`}>
                    {t(`systems.analysisProfiles.${id}.title`)}
                  </h3>
                  <div className={`text-2xl font-bold mb-3 ${
                    selectedProfile === id ? 'text-earth' : 'text-earth'
                  }`}>
                    {t(`systems.analysisProfiles.${id}.highlight`)}
                  </div>
                </div>
                <p className={`text-sm leading-relaxed ${
                  selectedProfile === id ? 'text-taupe' : 'text-taupe'
                }`}>
                  {t(`systems.analysisProfiles.${id}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Paquete Seleccionado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {(() => {
            const profileData = getSelectedProfileData();
            const genderData = profileData.getForGender(selectedGender);
            const pricing = profileData.getPricing(selectedGender);
            
            return (
              <div className="bg-warm-white rounded-2xl shadow-xl border-2 border-earth overflow-hidden">
                <div className="bg-gradient-to-r from-earth to-warm p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {t(`systems.analysisProfiles.${selectedProfile}.title`)}
                      </h3>
                      <p className="text-earth-50 text-lg">
                        {genderData.biomarkers?.length || 0} {t('systems.biomarkers')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">
                        €{pricing.precio}
                      </div>
                      <div className="text-earth-50">
                        {t('systems.finalPrice')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {genderData.biomarkers?.map((biomarker, index) => (
                      <BiomarkerCard 
                        key={`${biomarker.code}-${index}`}
                        biomarker={biomarker}
                        index={index}
                        addOnId={null}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>

        {/* Botón para mostrar Add-Ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <button
            onClick={toggleAddOnsView}
            className="bg-earth text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-warm transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            {showAddOns ? (
              <>
                <FaChevronUp /> {t('systems.hideAddOns')}
              </>
            ) : (
              <>
                <FaChevronDown /> {t('systems.showAddOns')}
              </>
            )}
          </button>
        </motion.div>

        {/* Add-Ons */}
        {showAddOns && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="grid gap-6">
              {getRecommendedAddOnsForSelectedProfile().map((addOn, index) => {
                const genderData = addOn.getForGender ? addOn.getForGender(selectedGender) : addOn;
                const pricing = addOn.getPricing ? addOn.getPricing(selectedGender) : genderData;
                
                return (
                  <motion.div
                    key={addOn.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-warm-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-earth transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-warm to-earth-300 p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold text-white">
                          {t(`addOns.${addOn.id}.title`)}{getGenderIndicator(addOn.id, selectedGender)}
                        </h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            €{pricing.precio || pricing.price || genderData.price}
                          </div>
                          <div className="text-warm-100 text-sm">
                            +{genderData.biomarkers?.length || 0} {t('systems.biomarkers')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-taupe mb-4 text-sm">
                        {t(`addOns.${addOn.id}.description`)}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {genderData.biomarkers?.map((biomarker, bioIndex) => (
                          <BiomarkerCard 
                            key={`${addOn.id}-${biomarker.code}-${bioIndex}`}
                            biomarker={biomarker}
                            index={bioIndex}
                            addOnId={addOn.id}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MedicalSystemsExplorer; 