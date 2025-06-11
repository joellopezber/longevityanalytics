/**
 * index.js
 * Exports unificados y funciones utilitarias para add-ons
 * API PÚBLICA del módulo addOns
 */

import { addOnPackages } from './packages.js';
import { getProfileExclusions } from './codes.js';

// ================================
// EXPORTACIONES PRINCIPALES
// ================================

// Re-exportar los add-ons
export { addOnPackages } from './packages.js';

// Re-exportar códigos individuales (para compatibilidad)
export * from './codes.js';

// Re-exportar factory functions
export { createAddOnPackage, generateAddOnCodesForGender, filterDuplicateCodes } from './factory.js';

// ================================
// FUNCIONES UTILITARIAS GLOBALES
// ================================

/**
 * Obtiene add-on filtrado por género - FUNCIÓN UNIFICADA
 * @param {object} packageData - Datos del add-on
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {object} Add-on con biomarcadores filtrados
 */
export const getAddOnForGender = (packageData, gender) => {
  if (packageData.getForGender) {
    return packageData.getForGender(gender);
  }
  
  // Fallback para compatibilidad - PRESERVAR getPricing SIEMPRE
  const pricing = packageData.getPricing(gender);
  const result = {
    ...packageData,
    testCount: pricing.testCount || pricing.both?.testCount,
    price: pricing.price || pricing.both?.price,
    pricePerTest: pricing.pricePerTest
  };
  
  // FORZAR preservación de getPricing
  result.getPricing = packageData.getPricing;
  return result;
};

/**
 * Obtiene número de tests de un add-on para género específico
 * @param {object} packageData - Datos del add-on
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {number} Número de tests
 */
export const getPackageTestCount = (packageData, gender = 'both') => {
  const pricing = packageData.getPricing(gender);
  return pricing.testCount || pricing.both?.testCount || 0;
};

/**
 * Obtiene add-ons filtrados por género
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {object} Add-ons filtrados
 */
export const getAddOnPackagesForGender = (gender) => {
  const filteredPackages = {};
  Object.entries(addOnPackages).forEach(([key, packageData]) => {
    filteredPackages[key] = getAddOnForGender(packageData, gender);
  });
  return filteredPackages;
};

/**
 * Obtiene precios dinámicos para cualquier add-on
 * @param {object} packageData - Datos del add-on
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {object} - Datos de precio formateados
 */
export const getPackagePricing = (packageData, gender = 'both') => {
  // Si tiene función propia de pricing, la usamos
  if (packageData.getPricing) {
    return packageData.getPricing(gender);
  }
  
  // Fallback simple
  return {
    price: packageData.price || 0,
    marketPrice: packageData.marketPrice || 0,
    testCount: packageData.testCount || 0
  };
};

/**
 * Obtiene add-ons filtrados para un perfil específico (sin duplicados)
 * @param {string} gender - Género ('male', 'female', 'both')
 * @param {Array} baseCodes - Códigos del perfil base para filtrar duplicados
 * @param {string} profileId - ID del perfil para aplicar exclusiones específicas
 * @returns {object} Objeto de add-ons filtrados
 */
export const getAddOnPackagesForProfile = (gender, baseCodes = [], profileId = null) => {
  const addOns = getAddOnPackagesForGender(gender);
  const filteredAddOns = {};
  
  Object.entries(addOns).forEach(([key, addOn]) => {
    if (addOn.getForProfile) {
      const filteredAddOn = addOn.getForProfile(gender, baseCodes, profileId);
      if (filteredAddOn.testCount > 0) { // Solo incluir si tiene biomarcadores después del filtrado
        filteredAddOns[key] = filteredAddOn;
      }
    } else if (addOn.testCount > 0) {
      filteredAddOns[key] = addOn;
    }
  });
  
  return filteredAddOns;
};

/**
 * Función para obtener información detallada de filtrado de un add-on
 * @param {string} addOnId - ID del add-on
 * @param {string} gender - Género ('male', 'female', 'both')
 * @param {Array} baseCodes - Códigos del perfil base
 * @param {string} profileId - ID del perfil
 * @returns {object} Información detallada del filtrado
 */
export const getAddOnFilteringInfo = (addOnId, gender = 'both', baseCodes = [], profileId = null) => {
  const addOn = addOnPackages[addOnId];
  if (!addOn) {
    return { error: `Add-on ${addOnId} no encontrado` };
  }

  const originalAddOn = addOn.getForGender(gender);
  const filteredAddOn = addOn.getForProfile(gender, baseCodes, profileId);
  
  const profileExclusions = profileId ? getProfileExclusions(addOnId, profileId, gender) : [];
  const duplicatesFromBase = originalAddOn.biomarkers.filter(bio => 
    baseCodes.includes(bio.code)
  );
  const duplicatesFromProfile = originalAddOn.biomarkers.filter(bio => 
    profileExclusions.includes(bio.code)
  );

  return {
    addOnId,
    addOnName: originalAddOn.name,
    profileId,
    gender,
    original: {
      testCount: originalAddOn.testCount,
      codes: originalAddOn.biomarkers.map(bio => bio.code),
      price: originalAddOn.price
    },
    filtered: {
      testCount: filteredAddOn.testCount,
      codes: filteredAddOn.biomarkers.map(bio => bio.code),
      price: filteredAddOn.price
    },
    exclusions: {
      fromBaseCodes: duplicatesFromBase.map(bio => ({ code: bio.code, name: bio.name })),
      fromProfileRules: duplicatesFromProfile.map(bio => ({ code: bio.code, name: bio.name })),
      totalExcluded: duplicatesFromBase.length + duplicatesFromProfile.length
    },
    valueAdded: {
      hasValue: filteredAddOn.testCount > 0,
      uniqueTests: filteredAddOn.testCount,
      priceReduction: originalAddOn.price - filteredAddOn.price
    }
  };
};

// ================================
// INFORMACIÓN DEL SISTEMA
// ================================

export const getAddOnSystemInfo = () => {
  return {
    totalAddOns: Object.keys(addOnPackages).length,
    withGenderDifferences: Object.values(addOnPackages).filter(pkg => 
      pkg.maleOnlyCodes?.length > 0 || pkg.femaleOnlyCodes?.length > 0
    ).length,
    architecture: 'MODULAR',
    modules: ['codes.js', 'factory.js', 'packages.js', 'index.js'],
    features: [
      'Profile Exclusions',
      'Gender Filtering', 
      'Dynamic Pricing',
      'Factory Pattern',
      'Modular Architecture'
    ]
  };
};

console.log('✅ Add-Ons módulo cargado:', getAddOnSystemInfo()); 