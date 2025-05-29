/**
 * MedicalSystemsExplorer.jsx
 * Componente que muestra Essential como card principal de doble ancho
 * seguido de los Add-Ons como cards individuales
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa';
import { getEssentialPackageForGender, getAddOnPackagesForGender } from '../data/biomarkers';

const MedicalSystemsExplorer = () => {
  const [selectedGender, setSelectedGender] = useState('male'); // Género por defecto
  const [expandedBiomarkers, setExpandedBiomarkers] = useState([]); // Ningún biomarcador expandido por defecto

  // Obtener datos filtrados por género
  const essentialPackage = getEssentialPackageForGender(selectedGender);
  const addOnPackages = getAddOnPackagesForGender(selectedGender);

  const toggleBiomarker = (biomarkerId) => {
    setExpandedBiomarkers(prev => 
      prev.includes(biomarkerId) 
        ? prev.filter(id => id !== biomarkerId)
        : [...prev, biomarkerId]
    );
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    // No forzar la apertura del Essential al cambiar género
  };

  // Función para verificar si un Add-On tiene diferencias por género
  const hasGenderDifferences = (addOnId) => {
    const genderSpecificAddOns = ['hormonas', 'cancer', 'bioage'];
    return genderSpecificAddOns.includes(addOnId);
  };

  // Función para obtener el indicador visual de género
  const getGenderIndicator = (addOnId, gender) => {
    if (!hasGenderDifferences(addOnId)) return null;
    
    return null;
  };

  const BiomarkerCard = ({ biomarker, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 }}
        className="border border-cream rounded-lg overflow-hidden bg-warm-white shadow-md hover:shadow-lg transition-all hover:border-earth"
      >
        <div 
          className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-earth-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-3 h-3 gradient-earth rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <h5 className="font-semibold text-stone text-sm mb-1">
                {biomarker.name}
              </h5>
              <p className="text-xs text-taupe">{biomarker.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {biomarker.description && (
              <div className="bg-earth-100 p-1.5 rounded-full text-earth hover:bg-earth-200 transition-colors">
                {isExpanded ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Descripción expandible */}
        <AnimatePresence>
          {isExpanded && biomarker.description && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 bg-earth-50 border-t border-earth">
                <div className="p-3 mt-2">
                  <p className="text-xs text-stone leading-relaxed italic">
                    {biomarker.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

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
              Essential <span className="gradient-text-earth">Análisis</span>
            </h2>
            <p className="text-lg text-taupe max-w-3xl mx-auto font-medium leading-relaxed">
              El <span className="font-bold text-earth">Essential</span> proporciona la información que forma el eje central de tu salud, y la adición de <span className="font-bold text-warm">Add-Ons especializados</span> según tus objetivos específicos te permite personalizar y adaptar tu analítica.
            </p>
          </div>
        </motion.div>

        {/* Essential Package - Card Principal de Doble Ancho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-warm-white rounded-2xl shadow-xl overflow-hidden border-2 border-earth w-full">
            {/* Essential Header */}
            <div className="bg-earth-50 p-6 border-b-2 border-earth">
              <div className="flex items-center justify-between">
                {/* Contenido principal */}
                <div className="flex items-center gap-6 flex-1">
                  <div className="w-16 h-16 gradient-earth rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">EA</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-stone">
                        {essentialPackage.name}
                      </h3>
                      
                      {/* Gender Selector - Al lado del título Essential */}
                      <div className="essential-gender-selector">
                        <button
                          onClick={() => handleGenderChange('male')}
                          className={`
                            essential-gender-button
                            ${selectedGender === 'male' 
                              ? 'bg-earth text-white shadow-sm' 
                              : 'bg-earth-50 text-earth hover:bg-earth-100'
                            }
                          `}
                        >
                          <span>♂</span>
                        </button>
                        <button
                          onClick={() => handleGenderChange('female')}
                          className={`
                            essential-gender-button
                            ${selectedGender === 'female' 
                              ? 'bg-warm text-white shadow-sm' 
                              : 'bg-warm-50 text-warm hover:bg-warm-100'
                            }
                          `}
                        >
                          <span>♀</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-taupe text-base mb-4 max-w-2xl">
                      {essentialPackage.description}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <div className="text-2xl font-bold text-earth">
                          {typeof essentialPackage.price === 'object' 
                            ? `${essentialPackage.price[selectedGender]}€` 
                            : `${essentialPackage.price}€`}
                        </div>
                        <div className="text-sm text-gray-500">
                          PVP: {typeof essentialPackage.pvpPrice === 'object' 
                            ? `${Math.round(essentialPackage.pvpPrice[selectedGender])}€` 
                            : `${Math.round(essentialPackage.pvpPrice)}€`}
                        </div>
                      </div>
                      <div className="text-taupe">
                        <span className="font-semibold text-sm">{essentialPackage.testCount} biomarcadores</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ver Biomarcadores Button - Mantener a la derecha */}
                <button 
                  onClick={() => toggleBiomarker('essential')}
                  className="biomarkers-button-position flex items-center gap-2 bg-warm-white text-earth px-6 py-3 rounded-full font-semibold border-2 border-earth hover:bg-earth-50 hover:border-warm transition-all shadow-md text-sm"
                >
                  Ver Biomarcadores
                  {expandedBiomarkers.includes('essential') ? (
                    <FaChevronUp className="text-sm" />
                  ) : (
                    <FaChevronDown className="text-sm" />
                  )}
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 ml-22">
                {essentialPackage.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheck className="text-earth text-sm" />
                    <span className="text-taupe text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Essential Biomarkers List */}
            <AnimatePresence>
              {expandedBiomarkers.includes('essential') && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-earth-50">
                    <div className="bg-warm-white rounded-xl p-6 border-2 border-earth shadow-lg">
                      <h4 className="text-lg font-bold text-stone mb-6 flex items-center gap-2 text-center justify-center">
                        🧬 Biomarcadores Incluidos en Essential ({essentialPackage.testCount} tests)
                      </h4>
                                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {essentialPackage.biomarkers.map((biomarker, index) => (
                          <BiomarkerCard key={biomarker.code} biomarker={biomarker} index={index} />
                        ))}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Add-Ons Grid */}
        <div className="mb-16">
          <div className="bg-warm-white rounded-xl p-6 shadow-lg border-2 border-warm mb-8">
            <h3 className="text-2xl font-bold text-stone mb-3 text-center">
              Add-Ons <span className="gradient-text-earth">Especializados</span>
            </h3>
            <p className="text-base text-taupe text-center max-w-2xl mx-auto">
              <span className="font-semibold text-earth">Complementa tu Essential</span> con estos módulos especializados. Cada Add-On se suma a los 46 biomarcadores base para una evaluación más profunda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(addOnPackages).map((addOn, index) => (
              <motion.div
                key={addOn.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-warm-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border-2 border-cream hover:border-earth"
              >
                {/* Add-On Header */}
                <div className={`${addOn.bgColor} ${addOn.borderColor} border-b p-6`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-2xl text-warm">
                      <addOn.icon />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xl font-bold text-stone">
                          {addOn.name}
                        </h4>
                        {hasGenderDifferences(addOn.id) && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warm-white border border-earth">
                            <span className="text-xs">
                              {selectedGender === 'male' ? '♂' : '♀'}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-taupe text-sm">
                        {addOn.description}
                      </p>
                      {hasGenderDifferences(addOn.id) && (
                        <div className="mt-2">
                          {getGenderIndicator(addOn.id, selectedGender)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold text-earth">
                        {typeof addOn.price === 'object' ? `${addOn.price[selectedGender]}€` : `${addOn.price}€`}
                      </div>
                      <div className="text-sm text-gray-500">
                        PVP: {typeof addOn.pvpPrice === 'object' ? `${Math.round(addOn.pvpPrice[selectedGender])}€` : `${Math.round(addOn.pvpPrice)}€`}
                      </div>
                    </div>
                    <div className="text-taupe text-sm">
                      {addOn.testCount} tests
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    {addOn.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FaCheck className={`${addOn.textColor} text-xs`} />
                        <span className="text-taupe text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-On Actions */}
                <div className="p-6">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => toggleBiomarker(addOn.id)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 border-cream hover:bg-earth-50 hover:border-earth transition-all font-medium"
                    >
                      <span className="text-stone font-semibold text-sm">Ver Biomarcadores</span>
                      {expandedBiomarkers.includes(addOn.id) ? (
                        <FaChevronUp className="text-taupe text-sm" />
                      ) : (
                        <FaChevronDown className="text-taupe text-sm" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Biomarkers */}
                  <AnimatePresence>
                    {expandedBiomarkers.includes(addOn.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="bg-earth-50 rounded-lg p-4 border-2 border-cream">
                          <h5 className="text-base font-bold text-stone mb-4 flex items-center gap-2 justify-center">
                            🔬 Biomarcadores de {addOn.name} ({addOn.testCount} tests)
                          </h5>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {addOn.biomarkers.map((biomarker, idx) => (
                              <BiomarkerCard key={biomarker.code} biomarker={biomarker} index={idx} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="gradient-earth rounded-2xl p-8 text-white shadow-xl border-2 border-warm">
            <h3 className="text-2xl font-bold mb-4 text-center">
              ¿Listo para optimizar tu <span className="text-cream">organismo</span>?
            </h3>
            <p className="text-white text-opacity-90 mb-6 max-w-2xl mx-auto text-base text-center leading-relaxed">
              Comienza con el <span className="font-bold text-cream">Essential</span> y añade los <span className="font-bold text-cream">Add-Ons</span> que necesites. 
              Obtén recomendaciones personalizadas de suplementación, nutrición y estilo de vida.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MedicalSystemsExplorer; 