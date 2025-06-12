/**
 * packages.js
 * Factory functions y definición de paquetes de análisis
 * BLOQUE 2: Lógica de creación y configuración de paquetes
 */

import { FaDna } from 'react-icons/fa';
import { buildBiomarkersFromCodes } from '../biomarkersDict.js';
import { calculatePackagePrice } from '../priceCalculator.js';
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
// FACTORY FUNCTIONS
// ================================

/**
 * Genera códigos de biomarcadores para un paquete y género específico
 * @param {Array} commonCodes - Códigos comunes para ambos géneros
 * @param {Array} maleOnlyCodes - Códigos solo para hombres
 * @param {Array} femaleOnlyCodes - Códigos solo para mujeres
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {Array} Array de códigos según género
 */
const generateCodesForGender = (commonCodes, maleOnlyCodes = [], femaleOnlyCodes = [], gender) => {
  switch (gender) {
    case 'male':
      return [...commonCodes, ...maleOnlyCodes];
    case 'female':
      return [...commonCodes, ...femaleOnlyCodes];
    case 'both':
    default:
      return commonCodes; // Solo códigos comunes para evitar duplicados
  }
};

/**
 * Crea un paquete completo con pricing dinámico
 * @param {object} config - Configuración del paquete
 * @returns {object} Paquete completo con funcionalidad
 */
const createPackage = (config) => {
  const { 
    id, 
    name, 
    description, 
    color, 
    bgColor, 
    borderColor, 
    textColor, 
    targetAudience,
    commonCodes, 
    maleOnlyCodes = [], 
    femaleOnlyCodes = [],
    recommendedAddOns = []
  } = config;

  // Construir biomarcadores base (todos los códigos para compatibilidad)
  const allCodes = [...commonCodes, ...maleOnlyCodes, ...femaleOnlyCodes];
  const baseBiomarkers = buildBiomarkersFromCodes(allCodes);

  return {
    id,
    name,
    description,
    color,
    bgColor,
    borderColor,
    textColor,
    icon: FaDna,
    targetAudience,
    biomarkers: baseBiomarkers,
    recommendedAddOns,
    
    // Función de pricing dinámico usando priceCalculator.js
    getPricing: (gender = 'both') => {
      const genderCodes = generateCodesForGender(commonCodes, maleOnlyCodes, femaleOnlyCodes, gender);
      const genderBiomarkers = buildBiomarkersFromCodes(genderCodes);
      const pricing = calculatePackagePrice(genderBiomarkers, gender, id);
      
      return {
        testCount: pricing.testCount,
        precio: pricing.precio,
        pvp: pricing.pvp,
        pricePerTest: pricing.pricePerTest,
        details: pricing
      };
    },

    // Función para obtener paquete filtrado por género
    getForGender: (gender = 'both') => {
      const genderCodes = generateCodesForGender(commonCodes, maleOnlyCodes, femaleOnlyCodes, gender);
      const genderBiomarkers = buildBiomarkersFromCodes(genderCodes);
      const pricing = calculatePackagePrice(genderBiomarkers, gender, id);
      
      return {
        ...this,
        biomarkers: genderBiomarkers,
        testCount: pricing.testCount,
        precio: pricing.precio,
        pvp: pricing.pvp,
        pricePerTest: pricing.pricePerTest,
        
        // === COMPATIBILIDAD (deprecados) ===
        price: pricing.precio,
        marketPrice: pricing.pvp
      };
    }
  };
};

// ================================
// DEFINICIÓN DE PAQUETES
// ================================

// Paquete Essential
export const essentialPackage = createPackage({
  id: 'essential',
  name: 'systems.analysisProfiles.essential.title',
  description: 'systems.essentialDescription',
  color: 'gradient-earth',
  bgColor: 'bg-earth-50',
  borderColor: 'border-earth',
  textColor: 'text-earth',
  targetAudience: 'systems.essentialTargetAudience',
  commonCodes: ESSENTIAL_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: ESSENTIAL_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: ESSENTIAL_BIOMARKER_CODES_FEMALE_ONLY,
  recommendedAddOns: [
    'hormonas', 'endocrino', 'antioxidantes', 'oxidative_cell', 'inflammation',
    'cardiovascular', 'iv_nutrients', 'metals', 'immunity', 'digestion',
    'gut_gate', 'coagulation', 'bone_mineral', 'genome', 'cancer', 'bioage'
  ]
});

// Paquete Performance
export const performancePackage = createPackage({
  id: 'performance',
  name: 'systems.analysisProfiles.performance.title',
  description: 'systems.performanceDescription',
  color: 'gradient-earth',
  bgColor: 'bg-earth-50',
  borderColor: 'border-earth',
  textColor: 'text-earth',
  targetAudience: 'systems.performanceTargetAudience',
  commonCodes: PERFORMANCE_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: PERFORMANCE_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY,
  recommendedAddOns: [
    'hormonas', 'cardiovascular', 'metals', 'endocrino', 'iv_nutrients',
    'antioxidantes', 'oxidative_cell', 'bone_mineral', 'inflammation',
    'digestion', 'immunity', 'gut_gate', 'coagulation', 'cancer', 'bioage', 'genome'
  ]
});

// Paquete Core
export const corePackage = createPackage({
  id: 'core',
  name: 'systems.analysisProfiles.core.title',
  description: 'systems.coreDescription',
  color: 'gradient-warm',
  bgColor: 'bg-warm-50',
  borderColor: 'border-warm',
  textColor: 'text-warm',
  targetAudience: 'systems.coreTargetAudience',
  commonCodes: CORE_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: CORE_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: CORE_BIOMARKER_CODES_FEMALE_ONLY,
  recommendedAddOns: [
    'cardiovascular', 'metals', 'antioxidantes', 'immunity', 'digestion',
    'gut_gate', 'coagulation', 'bone_mineral', 'cancer', 'bioage', 'genome'
  ]
});

// Paquete Advanced
export const advancedPackage = createPackage({
  id: 'advanced',
  name: 'systems.analysisProfiles.advanced.title',
  description: 'systems.advancedDescription',
  color: 'gradient-cool',
  bgColor: 'bg-cool-50',
  borderColor: 'border-cool',
  textColor: 'text-cool',
  targetAudience: 'systems.advancedTargetAudience',
  commonCodes: ADVANCED_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: ADVANCED_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: ADVANCED_BIOMARKER_CODES_FEMALE_ONLY,
  recommendedAddOns: [
    'genome', 'gut_gate', 'bioage'
  ]
});

console.log('✅ Paquetes de análisis creados:', {
  total: 4,
  packages: ['essential', 'performance', 'core', 'advanced']
}); 