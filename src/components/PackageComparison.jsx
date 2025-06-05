/**
 * PackageComparison.jsx
 * Configurador interactivo: Essential + Add-Ons seleccionables
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaChartBar, FaStar, FaPlus } from 'react-icons/fa';
import { 
  getEssentialPackageForGender, 
  getAddOnPackagesForGender, 
  getPackageTestCount
} from '../data/biomarkers';
import { calculatePackagePrice } from '../data/priceCalculator';
import { useBiomarkerSelection } from '../contexts/BiomarkerSelectionContext';
import { getPriceByCode } from '../data/priceData.js';
import { useLanguage } from '../contexts/LanguageContext';

const PackageComparison = () => {
  const [selectedGender, setSelectedGender] = useState('male');
  const [selectedAddOns, setSelectedAddOns] = useState([]); // Array de IDs de Add-Ons seleccionados

  // Hook para traducciones
  const { t } = useLanguage();

  // Usar el contexto para obtener las selecciones de biomarcadores
  const { 
    getSelectionSummary,
    selectedIntolerancia,
    selectedMetaboloma,
    // Tests genómicos
    selectedMyPharma,
    selectedMyDetox,
    selectedMyDiet,
    selectedMyAgeing,
    selectedMySport,
    selectedMySuplements,
    selectedLpA,
    selectedLongitudTelomerica,
    selectedAcidosGrasos,
    selectedVitaminaK1,
    getAdjustedAddOnPrice,
    getActualBiomarkerCount
  } = useBiomarkerSelection();

  // Obtener datos filtrados por género
  const essentialPackage = getEssentialPackageForGender(selectedGender);
  const addOnPackages = getAddOnPackagesForGender(selectedGender);

  // Calcular totales dinámicos
  const calculateTotals = () => {
    // Recopilar todos los biomarcadores para cálculo conjunto
    let allBiomarkers = [...essentialPackage.biomarkers];
    let selectedAddOnsList = [];

    // Agregar biomarcadores de add-ons seleccionados
    selectedAddOns.forEach(addOnId => {
      const addOn = addOnPackages[addOnId];
      if (addOn) {
        // Filtrar biomarcadores por género si es necesario
        const addOnBiomarkers = addOn.biomarkers.filter(biomarker => {
          if (!biomarker.gender || biomarker.gender === 'both') return true;
          return biomarker.gender === selectedGender;
        });
        
        allBiomarkers = [...allBiomarkers, ...addOnBiomarkers];
        selectedAddOnsList.push(addOn.name);
      }
    });

    // Calcular precio total sumando todos los biomarcadores (sin descuentos automáticos)
    const totalCalculation = calculatePackagePrice(allBiomarkers, selectedGender, 'essential');
    
    // Aplicar ajustes del contexto (Intolerancia, Metaboloma, etc.)
    // PRECIO FINAL = Suma exacta de tarifas Prevenii (sin descuentos automáticos)
    let adjustedPrice = totalCalculation.costPrice; // Usar costPrice (suma exacta Prevenii)
    let adjustedPvpPrice = totalCalculation.marketPrice; // Market como PVP referencial
    
    selectedAddOns.forEach(addOnId => {
      if (addOnId === 'digest' && selectedIntolerancia) {
        adjustedPrice += getPriceByCode('P3031', 'prevenii');
        adjustedPvpPrice += getPriceByCode('P3031', 'market');
      } else if (addOnId === 'gut_gate' && selectedMetaboloma) {
        adjustedPrice += getPriceByCode('AB002', 'prevenii');
        adjustedPvpPrice += getPriceByCode('AB002', 'market');
      } else if (addOnId === 'genome') {
        let genomExtra = 0;
        let genomExtraPvp = 0;
        // Tests genómicos
        if (selectedMyPharma) {
          genomExtra += getPriceByCode('GP001', 'prevenii');
          genomExtraPvp += getPriceByCode('GP001', 'market');
        }
        if (selectedMyDetox) {
          genomExtra += getPriceByCode('GD001', 'prevenii');
          genomExtraPvp += getPriceByCode('GD001', 'market');
        }
        if (selectedMyDiet) {
          genomExtra += getPriceByCode('GN001', 'prevenii');
          genomExtraPvp += getPriceByCode('GN001', 'market');
        }
        if (selectedMyAgeing) {
          genomExtra += getPriceByCode('GA001', 'prevenii');
          genomExtraPvp += getPriceByCode('GA001', 'market');
        }
        if (selectedMySport) {
          genomExtra += getPriceByCode('GS001', 'prevenii');
          genomExtraPvp += getPriceByCode('GS001', 'market');
        }
        if (selectedMySuplements) {
          genomExtra += getPriceByCode('GU001', 'prevenii');
          genomExtraPvp += getPriceByCode('GU001', 'market');
        }
        adjustedPrice += genomExtra;
        adjustedPvpPrice += genomExtraPvp;
      } else if (addOnId === 'cardiovascular' && selectedLpA) {
        adjustedPrice += getPriceByCode('B7700', 'prevenii');
        adjustedPvpPrice += getPriceByCode('B7700', 'market');
      } else if (addOnId === 'bioage' && selectedLongitudTelomerica) {
        adjustedPrice += getPriceByCode('G1465', 'prevenii');
        adjustedPvpPrice += getPriceByCode('G1465', 'market');

      } else if (addOnId === 'iv_nutrients') {
        let ivExtra = 0;
        let ivExtraPvp = 0;

        if (selectedAcidosGrasos) {
          ivExtra += getPriceByCode('T2590', 'prevenii');
          ivExtraPvp += getPriceByCode('T2590', 'market');
        }
        if (selectedVitaminaK1) {
          ivExtra += getPriceByCode('T1720', 'prevenii');
          ivExtraPvp += getPriceByCode('T1720', 'market');
        }
        adjustedPrice += ivExtra;
        adjustedPvpPrice += ivExtraPvp;
      }
    });

    return {
      totalBiomarkers: totalCalculation.testCount,
      totalPrice: Math.round(adjustedPrice),
      totalPvpPrice: Math.round(adjustedPvpPrice),
      selectedAddOnsList,
      originalPrice: totalCalculation.marketPrice
    };
  };

  const { totalBiomarkers, totalPrice, totalPvpPrice } = calculateTotals();

  // Toggle Add-On selection
  const toggleAddOn = (addOnId) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  // Generar lista de inclusiones dinámicas
  const getDynamicIncludes = () => {
    const baseIncludes = [
      t('packageComparison.glucidMetabolism'),
      t('packageComparison.renalHepaticFunction'),
      t('packageComparison.advancedLipidProfile'),
      t('packageComparison.basicHormones'),
      t('packageComparison.completeThyroid'),
      t('packageComparison.essentialMinerals'),
      t('packageComparison.inflammatoryMarkers'),
      t('packageComparison.biologicalAgeCalculation')
    ];

    const addOnIncludes = selectedAddOns.map(addOnId => {
      const addOn = addOnPackages[addOnId];
      return addOn ? `+ ${addOn.name}` : '';
    }).filter(Boolean);

    return [...baseIncludes, ...addOnIncludes];
  };

  return (
    <section id="paquetes" className="section bg-soft-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone mb-4">
            {t('packageComparison.title')} <span className="gradient-text-earth">{t('packageComparison.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-taupe max-w-3xl mx-auto">
            {t('packageComparison.description')}
          </p>
        </motion.div>

        {/* Configurador: Essential + Add-Ons */}
        <div className="grid lg:grid-cols-2 max-w-7xl mx-auto package-cards-container">
          
          {/* CARD ESSENTIAL - Izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-warm-white rounded-2xl shadow-xl overflow-hidden border-2 border-earth hover:border-warm transition-all duration-300 hover:shadow-2xl package-card"
          >
            <div className="p-8">
              {/* Header del Essential */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <h3 className="text-3xl font-bold text-stone">{t('packages.essential')}</h3>
                  
                  {/* Gender Selector */}
                  <div className="essential-gender-selector">
                    <button
                      onClick={() => setSelectedGender('male')}
                      className={`essential-gender-button ${
                        selectedGender === 'male' 
                          ? 'bg-earth text-white shadow-sm' 
                          : 'bg-earth-50 text-earth hover:bg-earth-100'
                      }`}
                    >
                      <span>♂</span>
                    </button>
                    <button
                      onClick={() => setSelectedGender('female')}
                      className={`essential-gender-button ${
                        selectedGender === 'female' 
                          ? 'bg-warm text-white shadow-sm' 
                          : 'bg-warm-50 text-warm hover:bg-warm-100'
                      }`}
                    >
                      <span>♀</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-lg text-taupe mb-6 leading-relaxed">
                  {t('systems.essentialDescription')}
                </p>

                {/* Contador dinámico de biomarcadores */}
                <div className="flex flex-col items-center justify-center gap-0 mb-6 px-6 py-3 rounded-full bg-earth-50 border-2 border-earth">
                  <span className="text-4xl font-bold text-stone leading-none">{totalBiomarkers}</span>
                  <span className="text-lg text-taupe font-medium leading-none -mt-1">{t('systems.biomarkers')}</span>
                </div>

                {/* Precio dinámico */}
                <div className="text-3xl font-bold mb-2 text-earth">{totalPrice}€</div>
                <div className="text-sm text-gray-500 mb-2">
                  {t('systems.pvp')}: {Math.round(totalPvpPrice)}€
                </div>
                <div className="text-sm text-taupe mb-4">
                  {selectedAddOns.length === 0 
                    ? t('packageComparison.basePriceEssential') 
                    : t('packageComparison.essentialPlusAddOns')
                        .replace('{count}', selectedAddOns.length)
                        .replace('{plural}', selectedAddOns.length > 1 ? 's' : '')
                  }
                </div>
              </div>

              {/* Inclusiones dinámicas */}
              <div className="mb-8">
                <h4 className="font-bold text-stone mb-6 text-lg">{t('packageComparison.includes')}</h4>
                <div className="grid gap-3 max-h-80 overflow-y-auto">
                  {getDynamicIncludes().map((feature, idx) => (
                    <div key={idx} className={`
                      flex items-center gap-3 p-3 rounded-lg border
                      ${feature.startsWith('+') 
                        ? 'bg-warm-50 border-warm' 
                        : 'bg-earth-50 border-earth'
                      }
                    `}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        feature.startsWith('+') ? 'bg-warm' : 'bg-earth'
                      }`}>
                        {feature.startsWith('+') ? (
                          <FaPlus className="text-white text-xs" />
                        ) : (
                          <FaCheck className="text-white text-xs" />
                        )}
                      </div>
                      <span className={`font-medium text-sm ${
                        feature.startsWith('+') ? 'text-warm font-semibold' : 'text-taupe'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONFIGURADOR ADD-ONS - Derecha */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-warm-white rounded-2xl shadow-xl overflow-hidden border-2 border-warm transition-all duration-300 hover:shadow-2xl package-card self-start"
          >
            <div className="p-8">
              {/* Header del Configurador */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-stone mb-3">{t('packages.addons')}</h3>
                <p className="text-lg text-taupe mb-6 leading-relaxed">
                  {t('packageComparison.selectSpecializedModules')}
                </p>
              </div>

              {/* Resumen de biomarcadores individuales seleccionados */}
              {getSelectionSummary().length > 0 && (
                <div className="mb-6 p-4 bg-warm-50 border border-warm rounded-lg">
                  <h5 className="text-sm font-semibold text-warm mb-2 text-center">
                    {t('packageComparison.additionalBiomarkers')}
                  </h5>
                  <div className="space-y-1" style={{paddingLeft: '24px'}}>
                    <ul className="list-disc space-y-1">
                      {getSelectionSummary().map((biomarker, idx) => (
                        <li key={idx} className="text-xs text-stone">
                          {biomarker}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Grid de Add-Ons */}
              <div className="space-y-8 max-h-96 overflow-y-auto px-2">
                {Object.values(addOnPackages).map((addOn, index) => {
                  const isSelected = selectedAddOns.includes(addOn.id);
                  const testCount = getActualBiomarkerCount ? getActualBiomarkerCount(addOn.id, selectedGender) : getPackageTestCount(addOn, selectedGender);
                  
                  return (
                    <motion.div
                      key={addOn.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`
                        border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 mb-4
                        ${isSelected 
                          ? 'border-warm bg-warm-50 shadow-md' 
                          : 'border-cream bg-white hover:border-warm hover:bg-warm-50'
                        }
                      `}
                      onClick={() => toggleAddOn(addOn.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          {/* Checkbox visual */}
                          <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                            ${isSelected 
                              ? 'bg-warm border-warm' 
                              : 'border-cream hover:border-warm'
                            }
                          `}>
                            {isSelected && <FaCheck className="text-white text-xs" />}
                          </div>
                          
                          {/* Info del Add-On */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="text-lg text-warm">
                                <addOn.icon />
                              </div>
                              <h4 className="font-bold text-stone text-sm">{addOn.name}</h4>
                            </div>
                            <p className="text-xs text-taupe mb-2">{t(`addOns.${addOn.id}.description`)}</p>
                            <div className="flex items-center gap-4 text-xs">
                              {(() => {
                                // Usar pricing directo del add-on
                                const pricing = addOn.getPricing();
                                
                                // Obtener precio base según género
                                let basePrice, basePvp;
                                
                                if (pricing[selectedGender]) {
                                  basePrice = pricing[selectedGender].price;
                                  basePvp = pricing[selectedGender].marketPrice;
                                } else if (pricing.both) {
                                  basePrice = pricing.both.price;
                                  basePvp = pricing.both.marketPrice;
                                } else {
                                  basePrice = pricing.price;
                                  basePvp = pricing.marketPrice;
                                }
                                
                                // Aplicar ajustes del contexto (Full Genome, Metaboloma, etc.)
                                const adjustedPrices = getAdjustedAddOnPrice(addOn.id, basePrice, basePvp);
                                
                                return (
                                  <div className="flex flex-col gap-1">
                                    <span className="text-warm font-semibold">
                                      {Math.round(adjustedPrices.price)}€
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                      {t('systems.pvp')}: {Math.round(adjustedPrices.pvp)}€
                                    </span>
                                  </div>
                                );
                              })()}
                              <span className="text-taupe">{testCount} {t('systems.biomarkers')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-warm-white rounded-2xl shadow-lg p-8 max-w-6xl mx-auto border-2 border-earth">
            <h3 className="text-2xl font-bold text-stone mb-4">
              {t('packageComparison.allPackagesInclude')}
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-earth-100 text-earth rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaCheck className="text-xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">{t('hero.supplementation')}</h4>
                <p className="text-taupe text-sm">
                  {t('hero.supplementationDesc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-warm-100 text-warm rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaChartBar className="text-xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">{t('hero.nutrition')}</h4>
                <p className="text-taupe text-sm">
                  {t('hero.nutritionDesc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                  <FaChartBar className="text-xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">{t('hero.lifestyle')}</h4>
                <p className="text-taupe text-sm">
                  {t('hero.lifestyleDesc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-earth-200 text-earth rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaStar className="text-xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">{t('hero.monitoring')}</h4>
                <p className="text-taupe text-sm">
                  {t('hero.monitoringDesc')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageComparison; 