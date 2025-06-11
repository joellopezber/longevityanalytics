/**
 * PackageComparison.jsx
 * Configurador interactivo: Essential + Add-Ons seleccionables
 * NUEVO DISEÑO: Grid de Add-Ons arriba + Resumen horizontal abajo
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaChartBar, FaStar } from 'react-icons/fa';
// Imports de la nueva arquitectura
import { 
  getPackageForGender, 
  essentialPackage,
  performancePackage,
  corePackage,
  advancedPackage
} from '../data/analysisPackages';
import { calculatePackagePrice } from '../data/priceCalculator';
// Imports de add-ons desde nueva arquitectura
import { addOnPackages } from '../data/addOnPackages';
import { useBiomarkerSelection } from '../contexts/BiomarkerSelectionContext';
import { getPriceByCode } from '../data/priceData.js';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  getActiveBiomarkers, 
  ADD_ON_BIOMARKERS_CONFIG 
} from '../data/biomarkersConfig';

const PackageComparison = () => {
  // Hook para traducciones
  const { t } = useLanguage();

  // Usar el contexto para obtener las selecciones de biomarcadores
  const biomarkerContext = useBiomarkerSelection();
  const {
    // Estados principales
    selectedProfile,
    gender: selectedGender,
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
    getActualBiomarkerCount
  } = biomarkerContext;

  // Función para obtener el paquete según el perfil seleccionado
  const getSelectedPackageData = () => {
    switch(selectedProfile) {
      case 'performance':
        return getPackageForGender(performancePackage, selectedGender);
      case 'core':
        return getPackageForGender(corePackage, selectedGender);
      case 'advanced':
        return getPackageForGender(advancedPackage, selectedGender);
      case 'essential':
      default:
        return getPackageForGender(essentialPackage, selectedGender);
    }
  };

  // Obtener datos filtrados por género y perfil seleccionado
  const selectedProfileData = getSelectedPackageData();

  // Función para detectar qué add-ons están activos basándose en biomarcadores seleccionados
  const getActiveAddOns = () => {
    const activeAddOns = [];
    
    // Usar todo el contexto para obtener todos los estados de selección
    const selectedStates = biomarkerContext;

    // Verificar cada add-on para ver si tiene biomarcadores activos
    Object.keys(ADD_ON_BIOMARKERS_CONFIG).forEach(addOnId => {
      const activeBiomarkers = getActiveBiomarkers(addOnId, selectedStates);
      if (activeBiomarkers.length > 0) {
        // Encontrar el add-on en los datos y agregarlo con información adicional
        const addOnData = addOnPackages[addOnId];
        if (addOnData) {
          activeAddOns.push({
            id: addOnId,
            title: addOnData.name, // Esto será una clave de traducción como 'addOns.hormonas.name'
            activeBiomarkersCount: activeBiomarkers.length,
            activeBiomarkers: activeBiomarkers
          });
        }
      }
    });

    return activeAddOns;
  };

  // Calcular totales dinámicos usando detección automática
  const calculateTotals = () => {
    // Obtener add-ons activos automáticamente
    const activeAddOns = getActiveAddOns();
    const activeAddOnIds = activeAddOns.map(addon => addon.id);
    
    // Recopilar todos los biomarcadores para cálculo conjunto
    let allBiomarkers = [...selectedProfileData.biomarkers];
    let selectedAddOnsList = [];

    // Agregar biomarcadores de add-ons detectados automáticamente
    activeAddOnIds.forEach(addOnId => {
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

    // CALCULAR NÚMERO REAL DE BIOMARCADORES
    // 1. Perfil base seleccionado
    let totalBiomarkersCount = selectedProfileData.biomarkers.length;
    
    // 2. Add-ons detectados automáticamente (usando función que cuenta dinámicamente)
    activeAddOnIds.forEach(addOnId => {
      if (getActualBiomarkerCount) {
        totalBiomarkersCount += getActualBiomarkerCount(addOnId, selectedGender);
      }
    });
    
    // 3. Biomarcadores personalizados adicionales (getSelectionSummary)
    totalBiomarkersCount += getSelectionSummary().length;

    // Calcular precio total sumando todos los biomarcadores (sin descuentos automáticos)
    const totalCalculation = calculatePackagePrice(allBiomarkers, selectedGender, selectedProfile);
    
    // Aplicar ajustes del contexto (Intolerancia, Metaboloma, etc.)
    // PRECIO FINAL = Suma exacta de tarifas Prevenii (sin descuentos automáticos)
    let adjustedPrice = totalCalculation.costPrice; // Usar costPrice (suma exacta Prevenii)
    let adjustedPvpPrice = totalCalculation.marketPrice; // Market como PVP referencial
    
    activeAddOnIds.forEach(addOnId => {
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
      totalBiomarkers: totalBiomarkersCount, // Usar conteo real calculado manualmente
      totalPrice: Math.round(adjustedPrice),
      totalPvpPrice: Math.round(adjustedPvpPrice),
      selectedAddOnsList,
      originalPrice: totalCalculation.marketPrice
    };
  };

  const { totalBiomarkers, totalPrice, totalPvpPrice } = calculateTotals();



  return (
    <section id="paquetes" className="pt-20 pb-8 bg-soft-cream">
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

        {/* NUEVO DISEÑO: Layout vertical con resumen horizontal */}
        <div className="max-w-7xl mx-auto space-y-8">
          


          

          {/* RESUMEN DE CONFIGURACIÓN DEL ANÁLISIS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-warm-white to-cream rounded-2xl shadow-xl border-2 border-warm p-8"
          >
            {/* DISEÑO COMPACTO HORIZONTAL */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-6">
              
              {/* 1. Perfil Analítico Elegido - Izquierda */}
              <div className="flex-shrink-0">
                <h3 className="text-xl font-bold text-stone mb-1">
                  Perfil Analítico
                </h3>
                <p className="text-lg text-warm font-semibold">
                  {(() => {
                    const activeAddOns = getActiveAddOns();
                    const profileName = selectedProfile.charAt(0).toUpperCase() + selectedProfile.slice(1);
                    return activeAddOns.length > 0 
                      ? `${profileName} + ${activeAddOns.length} Add-On${activeAddOns.length > 1 ? 's' : ''}`
                      : profileName;
                  })()}
                </p>
                {getSelectionSummary().length > 0 && (
                  <p className="text-sm text-green-600">
                    Con personalizaciones
                  </p>
                )}
              </div>

              {/* 2. Número de Biomarcadores */}
              <div className="flex-shrink-0 text-center">
                <div className="text-3xl font-bold text-warm mb-1">{totalBiomarkers}</div>
                <div className="text-sm text-taupe uppercase tracking-wide">
                  {t('systems.biomarkers')}
                </div>
                {getSelectionSummary().length > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    +{getSelectionSummary().length} extra
                  </div>
                )}
              </div>

              {/* 3. Precio */}
              <div className="flex-shrink-0 text-center">
                <div className="text-3xl font-bold text-stone mb-1">{totalPrice}€</div>
                <div className="text-sm text-taupe line-through">
                  PVP: {totalPvpPrice}€
                </div>
                <div className="text-xs text-warm font-semibold uppercase tracking-wide">
                  Precio Prevenii
                </div>
              </div>

              {/* 4. Add-Ons Añadidos - Derecha */}
              <div className="flex-grow min-w-0">
                <h4 className="text-sm font-bold text-stone mb-2 uppercase tracking-wide">
                  Add-Ons Incluidos:
                </h4>
                {(() => {
                  const activeAddOns = getActiveAddOns();
                  
                  if (activeAddOns.length === 0) {
                    return (
                      <p className="text-sm text-taupe italic">Ninguno</p>
                    );
                  }
                  
                  return (
                    <div className="flex flex-wrap gap-2">
                      {activeAddOns.map(addon => (
                        <div key={addon.id} className="flex items-center gap-1 bg-warm-50 rounded-full px-3 py-1 text-xs">
                          <FaCheck className="text-warm" />
                          <span className="text-stone font-medium">
                            {t(addon.title)}
                          </span>
                          <span className="text-warm-600 ml-1">
                            ({addon.activeBiomarkersCount} biomarcadores)
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Biomarcadores Adicionales Personalizados */}
            {getSelectionSummary().length > 0 && (
              <div className="mt-6 pt-6 border-t border-warm-200">
                <h5 className="font-semibold text-warm mb-3">
                  {t('packageComparison.additionalBiomarkers')}
                </h5>
                <div className="grid md:grid-cols-3 gap-2">
                  {getSelectionSummary().map((biomarker, idx) => (
                    <div key={idx} className="text-sm text-stone bg-white rounded-lg px-3 py-1 border">
                      {biomarker}
                    </div>
                  ))}
                </div>
              </div>
            )}
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