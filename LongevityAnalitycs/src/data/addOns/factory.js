/**
 * factory.js
 * Factory functions y lógicas core para add-ons
 * BLOQUE 2: Funciones de creación, filtrado y configuración
 */

import { buildBiomarkersFromCodes } from '../biomarkersDict.js';
import { calculateAddOnPrice } from '../priceCalculator.js';
import { getProfileExclusions } from './codes.js';
import { getActiveBiomarkers } from '../biomarkersConfig.js';

// ================================
// FUNCIONES UTILITARIAS
// ================================

/**
 * Filtra códigos de biomarcadores eliminando duplicados con un perfil base
 * @param {Array} addOnCodes - Códigos del add-on
 * @param {Array} baseCodes - Códigos ya incluidos en el perfil base
 * @param {string} addOnId - ID del add-on para exclusiones específicas
 * @param {string} profileId - ID del perfil para exclusiones específicas
 * @param {string} gender - Género para exclusiones específicas
 * @returns {Array} Códigos filtrados sin duplicados
 */
export const filterDuplicateCodes = (addOnCodes, baseCodes = [], addOnId = null, profileId = null, gender = 'both') => {
  let filteredCodes = addOnCodes.filter(code => !baseCodes.includes(code));
  
  // Si se proporciona addOnId y profileId, aplicar exclusiones específicas
  if (addOnId && profileId) {
    const profileExclusions = getProfileExclusions(addOnId, profileId, gender);
    filteredCodes = filteredCodes.filter(code => !profileExclusions.includes(code));
  }
  
  return filteredCodes;
};

/**
 * Genera códigos de add-on filtrados por género y perfil base
 * @param {Array} commonCodes - Códigos comunes del add-on
 * @param {Array} maleOnlyCodes - Códigos solo masculinos
 * @param {Array} femaleOnlyCodes - Códigos solo femeninos  
 * @param {string} gender - Género ('male', 'female', 'both')
 * @param {Array} baseCodes - Códigos del perfil base para filtrar duplicados
 * @param {string} addOnId - ID del add-on para exclusiones específicas
 * @param {string} profileId - ID del perfil para exclusiones específicas
 * @returns {Array} Códigos filtrados sin duplicados
 */
export const generateAddOnCodesForGender = (commonCodes, maleOnlyCodes = [], femaleOnlyCodes = [], gender, baseCodes = [], addOnId = null, profileId = null) => {
  let resultCodes;
  
  switch (gender) {
    case 'male':
      resultCodes = [...commonCodes, ...maleOnlyCodes];
      break;
    case 'female':
      resultCodes = [...commonCodes, ...femaleOnlyCodes];
      break;
    case 'both':
    default:
      resultCodes = [...commonCodes, ...maleOnlyCodes, ...femaleOnlyCodes];
      break;
  }
  
  // Filtrar duplicados si se proporciona un perfil base, incluyendo exclusiones específicas por género
  return baseCodes.length > 0 || (addOnId && profileId) 
    ? filterDuplicateCodes(resultCodes, baseCodes, addOnId, profileId, gender) 
    : resultCodes;
};

// ================================
// FACTORY PRINCIPAL
// ================================

/**
 * Crea un add-on completo con pricing dinámico
 * @param {object} config - Configuración del add-on
 * @returns {object} Add-on completo con funcionalidad
 */
export const createAddOnPackage = (config) => {
  const { 
    id, 
    name, 
    description, 
    color = 'gradient-warm',
    bgColor = 'bg-warm-50', 
    borderColor = 'border-warm',
    textColor = 'text-warm',
    icon,
    benefits,
    codes,
    maleOnlyCodes = [], 
    femaleOnlyCodes = [],
    hasGenderDifferences = false
  } = config;

  // Construir biomarcadores base
  const allCodes = hasGenderDifferences 
    ? [...codes, ...maleOnlyCodes, ...femaleOnlyCodes]
    : codes;
  const baseBiomarkers = buildBiomarkersFromCodes(allCodes);

  return {
    id,
    name,
    description,
    color,
    bgColor,
    borderColor,
    textColor,
    icon,
    benefits,
    biomarkers: baseBiomarkers,
    
    // Función de pricing dinámico
    getPricing: function(gender = 'both', selectedStates = {}) {
      // NUEVO: Usar solo biomarcadores activos según biomarkersConfig.js
      const activeCodes = getActiveBiomarkers(id, selectedStates);
      
      if (activeCodes.length === 0) {
        // Si no hay biomarcadores seleccionados, precio = 0
        return {
          price: 0,
          marketPrice: 0,
          testCount: 0,
          details: { basePrice: 0, marketPrice: 0, testCount: 0 }
        };
      }
      
      if (hasGenderDifferences) {
        // Filtrar códigos activos por género
        const allGenderCodes = generateAddOnCodesForGender(codes, maleOnlyCodes, femaleOnlyCodes, gender);
        const activeGenderCodes = activeCodes.filter(code => allGenderCodes.includes(code));
        const genderBiomarkers = buildBiomarkersFromCodes(activeGenderCodes);
        const pricing = calculateAddOnPrice(genderBiomarkers, id);
        
        return {
          male: {
            price: pricing.male?.price || pricing.both?.price,
            marketPrice: pricing.male?.details?.marketPrice || pricing.both?.details?.marketPrice,
            testCount: pricing.male?.testCount || pricing.both?.testCount
          },
          female: {
            price: pricing.female?.price || pricing.both?.price,
            marketPrice: pricing.female?.details?.marketPrice || pricing.both?.details?.marketPrice,
            testCount: pricing.female?.testCount || pricing.both?.testCount
          },
          both: {
            price: pricing.both?.price,
            marketPrice: pricing.both?.details?.marketPrice,
            testCount: pricing.both?.testCount
          },
          details: pricing
        };
      } else {
        // Add-on unisex - usar solo biomarcadores activos
        const activeBiomarkers = buildBiomarkersFromCodes(activeCodes);
        const pricing = calculateAddOnPrice(activeBiomarkers, id);
        
        return {
          price: pricing.both?.price,
          marketPrice: pricing.both?.details?.marketPrice,
          testCount: activeCodes.length,
          details: pricing
        };
      }
    },

    // Función para obtener add-on filtrado por género
    getForGender: function(gender = 'both') {
      if (hasGenderDifferences) {
        const genderCodes = generateAddOnCodesForGender(codes, maleOnlyCodes, femaleOnlyCodes, gender);
        const genderBiomarkers = buildBiomarkersFromCodes(genderCodes);
        const pricing = calculateAddOnPrice(genderBiomarkers, id);
        
        const result = {
          ...this,
          biomarkers: genderBiomarkers,
          testCount: genderCodes.length,
          price: Math.round(pricing.both?.price || 0),
          marketPrice: Math.round(pricing.both?.details?.marketPrice || 0)
        };
        result.getPricing = this.getPricing;
        return result;
      } else {
        const pricing = calculateAddOnPrice(baseBiomarkers, id);
        const result = {
          ...this,
          testCount: codes.length,
          price: Math.round(pricing.both?.price || 0),
          marketPrice: Math.round(pricing.both?.details?.marketPrice || 0)
        };
        result.getPricing = this.getPricing;
        return result;
      }
    },

    // Función para obtener add-on filtrado por perfil base (sin duplicados)
    getForProfile: function(gender = 'both', baseCodes = [], profileId = null) {
      if (hasGenderDifferences) {
        const genderCodes = generateAddOnCodesForGender(codes, maleOnlyCodes, femaleOnlyCodes, gender, baseCodes, id, profileId);
        const genderBiomarkers = buildBiomarkersFromCodes(genderCodes);
        const pricing = calculateAddOnPrice(genderBiomarkers, id);
        
        const result = {
          ...this,
          biomarkers: genderBiomarkers,
          testCount: genderCodes.length,
          price: Math.round(pricing.both?.price || 0),
          marketPrice: Math.round(pricing.both?.details?.marketPrice || 0),
          isFiltered: true,
          filteredCodes: genderCodes,
          originalCodes: generateAddOnCodesForGender(codes, maleOnlyCodes, femaleOnlyCodes, gender),
          profileExclusions: profileId ? getProfileExclusions(id, profileId, gender) : []
        };
        result.getPricing = this.getPricing;
        return result;
      } else {
        const filteredCodes = filterDuplicateCodes(codes, baseCodes, id, profileId, gender);
        const filteredBiomarkers = buildBiomarkersFromCodes(filteredCodes);
        const pricing = calculateAddOnPrice(filteredBiomarkers, id);
        
        const result = {
          ...this,
          biomarkers: filteredBiomarkers,
          testCount: filteredCodes.length,
          price: Math.round(pricing.both?.price || 0),
          marketPrice: Math.round(pricing.both?.details?.marketPrice || 0),
          isFiltered: true,
          filteredCodes: filteredCodes,
          originalCodes: codes,
          profileExclusions: profileId ? getProfileExclusions(id, profileId, gender) : []
        };
        result.getPricing = this.getPricing;
        return result;
      }
    }
  };
};

console.log('✅ Factory de add-ons cargado:', {
  functions: ['createAddOnPackage', 'generateAddOnCodesForGender', 'filterDuplicateCodes']
}); 