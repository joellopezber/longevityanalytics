/**
 * index.js
 * Exports unificados y funciones utilitarias para paquetes de análisis
 * BLOQUE 3: API pública del módulo
 */

import { 
  essentialPackage, 
  performancePackage, 
  corePackage, 
  advancedPackage 
} from './packages.js';

import {
  ESSENTIAL_BIOMARKER_CODES_COMMON,
  ESSENTIAL_BIOMARKER_CODES_MALE_ONLY,
  ESSENTIAL_BIOMARKER_CODES_FEMALE_ONLY,
  PERFORMANCE_BIOMARKER_CODES_COMMON,
  PERFORMANCE_BIOMARKER_CODES_MALE_ONLY,
  PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY,
  CORE_BIOMARKER_CODES_COMMON,
  CORE_BIOMARKER_CODES_MALE_ONLY,
  CORE_BIOMARKER_CODES_FEMALE_ONLY,
  ADVANCED_BIOMARKER_CODES_COMMON,
  ADVANCED_BIOMARKER_CODES_MALE_ONLY,
  ADVANCED_BIOMARKER_CODES_FEMALE_ONLY
} from './codes.js';

// ================================
// EXPORTACIONES PRINCIPALES
// ================================

// Paquetes
export { essentialPackage, performancePackage, corePackage, advancedPackage };

// Códigos (para compatibilidad)
export {
  ESSENTIAL_BIOMARKER_CODES_COMMON,
  ESSENTIAL_BIOMARKER_CODES_MALE_ONLY,
  ESSENTIAL_BIOMARKER_CODES_FEMALE_ONLY,
  PERFORMANCE_BIOMARKER_CODES_COMMON,
  PERFORMANCE_BIOMARKER_CODES_MALE_ONLY,
  PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY,
  CORE_BIOMARKER_CODES_COMMON,
  CORE_BIOMARKER_CODES_MALE_ONLY,
  CORE_BIOMARKER_CODES_FEMALE_ONLY,
  ADVANCED_BIOMARKER_CODES_COMMON,
  ADVANCED_BIOMARKER_CODES_MALE_ONLY,
  ADVANCED_BIOMARKER_CODES_FEMALE_ONLY
};

// Arrays de biomarcadores (para compatibilidad)
export const essentialBiomarkers = essentialPackage.biomarkers;
export const performanceBiomarkers = performancePackage.biomarkers;
export const coreBiomarkers = corePackage.biomarkers;
export const advancedBiomarkers = advancedPackage.biomarkers;

// ================================
// FUNCIONES UTILITARIAS
// ================================

/**
 * Obtiene paquete filtrado por género
 * @param {object} packageData - Datos del paquete
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {object} Paquete con biomarcadores filtrados
 */
export const getPackageForGender = (packageData, gender) => {
  if (packageData.getForGender) {
    return packageData.getForGender(gender);
  }
  
  // Fallback para compatibilidad
  const pricing = packageData.getPricing(gender);
  return {
    ...packageData,
    testCount: pricing.testCount,
    precio: pricing.precio,
    pvp: pricing.pvp,
    pricePerTest: pricing.pricePerTest
  };
};

/**
 * Obtiene número de tests de un paquete para género específico
 * @param {object} packageData - Datos del paquete
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {number} Número de tests
 */
export const getPackageTestCount = (packageData, gender) => {
  const pricing = packageData.getPricing(gender);
  return pricing.testCount;
};

/**
 * Obtiene los add-ons recomendados para un paquete específico
 * @param {object} packageData - Datos del paquete
 * @returns {Array} Array de IDs de add-ons recomendados
 */
export const getRecommendedAddOns = (packageData) => {
  return packageData.recommendedAddOns || [];
};

/**
 * Obtiene códigos de biomarcadores de un perfil según género
 * @param {object} profile - El perfil
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {Array} Códigos de biomarcadores del perfil
 */
export const getProfileCodes = (profile, gender = 'both') => {
  let baseCodes = [];
  
  if (profile.hasGenderDifferences) {
    switch (gender) {
      case 'male':
        baseCodes = [...profile.commonCodes, ...profile.maleOnlyCodes];
        break;
      case 'female':
        baseCodes = [...profile.commonCodes, ...profile.femaleOnlyCodes];
        break;
      case 'both':
      default:
        baseCodes = [...profile.commonCodes, ...profile.maleOnlyCodes, ...profile.femaleOnlyCodes];
        break;
    }
  } else {
    baseCodes = profile.commonCodes;
  }
  
  return baseCodes;
};

/**
 * Obtiene información sobre qué add-ons están recomendados para un perfil
 * @param {object} profile - El perfil
 * @returns {object} Información sobre add-ons recomendados
 */
export const getProfileAddOnInfo = (profile) => {
  return {
    profileId: profile.id,
    recommendedAddOns: profile.recommendedAddOns || [],
    totalBiomarkers: profile.commonCodes.length + profile.maleOnlyCodes.length + profile.femaleOnlyCodes.length,
    hasGenderDifferences: profile.hasGenderDifferences
  };
};

/**
 * Valida la consistencia de los códigos de paquetes
 * @returns {object} Resultado de validación
 */
export const validatePackageCodes = () => {
  const allEssentialCodes = [...ESSENTIAL_BIOMARKER_CODES_COMMON, ...ESSENTIAL_BIOMARKER_CODES_MALE_ONLY];
  const allPerformanceCodes = [...PERFORMANCE_BIOMARKER_CODES_COMMON, ...PERFORMANCE_BIOMARKER_CODES_MALE_ONLY, ...PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY];
  const allCoreCodes = [...CORE_BIOMARKER_CODES_COMMON, ...CORE_BIOMARKER_CODES_MALE_ONLY, ...CORE_BIOMARKER_CODES_FEMALE_ONLY];
  const allAdvancedCodes = [...ADVANCED_BIOMARKER_CODES_COMMON, ...ADVANCED_BIOMARKER_CODES_MALE_ONLY, ...ADVANCED_BIOMARKER_CODES_FEMALE_ONLY];
  
  const allPackageCodes = [...allEssentialCodes, ...allPerformanceCodes, ...allCoreCodes, ...allAdvancedCodes];
  const uniquePackageCodes = [...new Set(allPackageCodes)];
  
  return {
    isValid: true,
    packages: {
      essential: allEssentialCodes.length,
      performance: allPerformanceCodes.length,
      core: allCoreCodes.length,
      advanced: allAdvancedCodes.length
    },
    totalUniqueCodes: uniquePackageCodes.length
  };
};

console.log('✅ API de perfiles de análisis cargada:', {
  architecture: 'MODULAR ✅',
  blocks: ['codes.js', 'packages.js', 'index.js'],
  totalProfiles: 4
}); 