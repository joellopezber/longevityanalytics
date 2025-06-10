/**
 * addOnPackages_v2.js
 * Add-Ons especializados con ARQUITECTURA REFACTORIZADA
 * Misma estructura que analysisPackages.js para consistencia
 * 
 * ARQUITECTURA MODERNA:
 * - Definición de códigos como constantes exportadas
 * - Función factory para generación dinámica de add-ons
 * - Imports optimizados y separación de responsabilidades
 * - Compatible con biomarkersDict.js y priceCalculator.js
 */

import { 
  FaFlask, 
  FaShieldAlt, 
  FaAtom, 
  FaTint, 
  FaBone, 
  FaSearch,
  FaFire,
  FaUtensils,
  FaDna,
  FaBrain,
  FaHeartbeat,
  FaIndustry,
  FaShieldVirus,
  FaBandAid
} from 'react-icons/fa';
import { AiFillApple } from 'react-icons/ai';

import { buildBiomarkersFromCodes } from './biomarkersDict.js';
import { calculateAddOnPrice } from './priceCalculator.js';

// CONSTANTES DE CÓDIGOS DE BIOMARCADORES (constantes básicas para compatibilidad)

// ================================
// DEFINICIÓN DE CÓDIGOS POR ADD-ON
// ================================

// HORMONAS: Análisis hormonal completo (5 comunes + específicos por género)
export const HORMONAS_BIOMARKER_CODES_COMMON = ['B5350', 'B5380', 'B5420', 'B5800', 'B5980'];
export const HORMONAS_BIOMARKER_CODES_MALE_ONLY = ['B6480', 'D0601', 'D0850'];
export const HORMONAS_BIOMARKER_CODES_FEMALE_ONLY = ['B5932', 'B6160', 'D0181', 'D0780'];

// ENDOCRINO: Eje hormonal avanzado (3 básicos)
export const ENDOCRINO_BIOMARKER_CODES = ['B6030', 'B6010', 'I6740'];

// ANTIOXIDANTES: Vitaminas antioxidantes (6 tests)
export const ANTIOXIDANTES_BIOMARKER_CODES = ['T0811', 'T1191', 'T2841', 'T1200', 'T2830'];

// ESTRÉS OXIDATIVO: Sistema glutatión (4 tests)
export const ESTRES_OXIDATIVO_BIOMARKER_CODES = ['B7121', 'B3015', 'B3041', 'T3920'];

// INFLAMACIÓN: Marcadores inflamatorios (3 tests)
export const INFLAMACION_BIOMARKER_CODES = ['H0020', 'B7790', 'I2081'];

// CARDIOVASCULAR: Perfil cardiovascular avanzado (8 tests)
export const CARDIOVASCULAR_BIOMARKER_CODES = ['B0110', 'B0750', 'B2120', 'B0220', 'B1900', 'B0190', 'B7700', 'I5047'];

// IV & NUTRIENTES: Oligoelementos y vitaminas (5 tests)
export const IV_NUTRIENTS_BIOMARKER_CODES = ['T0500', 'T1720', 'T1061', 'B8060', 'B0270'];

// METALES PESADOS: Detoxificación (4 tests)
export const METALES_BIOMARKER_CODES = ['T0302', 'T0150', 'T0960', 'T0480'];

// INMUNIDAD: Sistema inmunológico (6 tests)
export const INMUNIDAD_BIOMARKER_CODES = ['I0141', 'I5072', 'B6321', 'B6300', 'B7750', 'B3130'];

// DIGESTIÓN: Función digestiva (4 tests)
export const DIGESTION_BIOMARKER_CODES = ['T2590', 'B1980', 'B0350', 'B0260'];

// PERMEABILIDAD INTESTINAL: Barrera intestinal (4 tests)
export const PERMEABILIDAD_INTESTINAL_BIOMARKER_CODES = ['M1190', 'P3031', 'AB001', 'AB002'];

// COAGULACIÓN: Sistema hemostático (3 tests)
export const COAGULACION_BIOMARKER_CODES = ['H0050', 'H0850', 'H0860'];

// SALUD ÓSEA: Metabolismo óseo (4 tests)
export const SALUD_OSEA_BIOMARKER_CODES = ['D0560', 'D1111', 'I3291', 'T1572'];

// PANEL GENÓMICO: Análisis genético (5 tests)
export const PANEL_GENOMICO_BIOMARKER_CODES = ['OG004', 'OG002', 'OG003', 'OG006', 'OG005'];

// CÁNCER: Marcadores tumorales (15 comunes + específicos por género)
export const CANCER_BIOMARKER_CODES_COMMON = [
  '6897', 'B0110', 'B5080', 'B5090', 'B5100', 'B5110', 'B7900', 'B8120', 
  'B8130', 'B8160', 'D1271', 'D1760', 'I5080', 'I5090', 'M0010'
];
export const CANCER_BIOMARKER_CODES_MALE_ONLY = ['B5830', 'B5840'];
export const CANCER_BIOMARKER_CODES_FEMALE_ONLY = ['B5380', 'B8110'];

// EDAD BIOLÓGICA: Tests epigenéticos (2 comunes + específicos por género)
export const BIOAGE_BIOMARKER_CODES_COMMON = ['G1465', 'OG001'];
export const BIOAGE_BIOMARKER_CODES_MALE_ONLY = ['B3340'];
export const BIOAGE_BIOMARKER_CODES_FEMALE_ONLY = ['D1001'];

// GUT GATE: Microbioma y permeabilidad (2 tests)
export const GUT_GATE_BIOMARKER_CODES = ['AB001', 'AB002'];

// GENOME: Análisis genético completo (6 tests genómicos)
export const GENOME_BIOMARKER_CODES = ['GP001', 'GD001', 'GN001', 'GA001', 'GS001', 'GU001'];

// BONE MINERAL: Salud ósea avanzada (4 tests)
export const BONE_MINERAL_BIOMARKER_CODES = ['D1111', 'I3291', 'T1572', 'D0560'];

// IMMUNITY: Inmunidad avanzada (5 tests de inmunidad)
export const IMMUNITY_BIOMARKER_CODES = ['I0141', 'I5072', 'B6321', 'B6300', 'B7750'];

// ================================
// FUNCIÓN FACTORY PARA ADD-ONS
// ================================

/**
 * Genera códigos de biomarcadores para un add-on y género específico
 * @param {Array} commonCodes - Códigos comunes para ambos géneros
 * @param {Array} maleOnlyCodes - Códigos solo para hombres
 * @param {Array} femaleOnlyCodes - Códigos solo para mujeres
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {Array} Array de códigos según género
 */
const generateAddOnCodesForGender = (commonCodes, maleOnlyCodes = [], femaleOnlyCodes = [], gender) => {
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
 * Crea un add-on completo con pricing dinámico
 * @param {object} config - Configuración del add-on
 * @returns {object} Add-on completo con funcionalidad
 */
const createAddOnPackage = (config) => {
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
    getPricing: function(gender = 'both') {
      if (hasGenderDifferences) {
        const genderCodes = generateAddOnCodesForGender(codes, maleOnlyCodes, femaleOnlyCodes, gender);
        const genderBiomarkers = buildBiomarkersFromCodes(genderCodes);
        const pricing = calculateAddOnPrice(genderBiomarkers, id); // Usar ID específico del add-on
        
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
        // Add-on unisex
        const pricing = calculateAddOnPrice(baseBiomarkers, id); // Usar ID específico del add-on
      return {
          price: pricing.both?.price,
          marketPrice: pricing.both?.details?.marketPrice,
          testCount: codes.length,
        details: pricing
      };
    }
  },

    // Función para obtener add-on filtrado por género
    getForGender: function(gender = 'both') {
      if (hasGenderDifferences) {
        const genderCodes = generateAddOnCodesForGender(codes, maleOnlyCodes, femaleOnlyCodes, gender);
        const genderBiomarkers = buildBiomarkersFromCodes(genderCodes);
        const pricing = calculateAddOnPrice(genderBiomarkers, id); // Usar ID específico del add-on
        
        const result = {
          ...this,
          biomarkers: genderBiomarkers,
          testCount: genderCodes.length,
          price: Math.round(pricing.both?.price || 0),
          marketPrice: Math.round(pricing.both?.details?.marketPrice || 0)
        };
        // Preservar getPricing explícitamente
        result.getPricing = this.getPricing;
        return result;
      } else {
        const pricing = calculateAddOnPrice(baseBiomarkers, id); // Usar ID específico del add-on
        const result = {
          ...this,
          testCount: codes.length,
          price: Math.round(pricing.both?.price || 0),
          marketPrice: Math.round(pricing.both?.details?.marketPrice || 0)
        };
        // Preservar getPricing explícitamente
        result.getPricing = this.getPricing;
        return result;
      }
    }
  };
};

// ================================
// DEFINICIÓN DE ADD-ONS
// ================================

// Hormonas (con diferencias por género)
export const hormonasPackage = createAddOnPackage({
  id: 'hormonas',
  name: 'addOns.hormonas.name',
  description: 'addOns.hormonas.description',
  icon: FaFlask,
  benefits: 'addOnBenefits.hormonas',
  codes: HORMONAS_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: HORMONAS_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: HORMONAS_BIOMARKER_CODES_FEMALE_ONLY,
  hasGenderDifferences: true
});

// Endocrino (unisex)
export const endocrinoPackage = createAddOnPackage({
  id: 'endocrino',
  name: 'addOns.endocrino.name',
  description: 'addOns.endocrino.description',
  icon: FaBrain,
  benefits: 'addOnBenefits.endocrino',
  codes: ENDOCRINO_BIOMARKER_CODES
});

// Antioxidantes (unisex)
export const antioxidantesPackage = createAddOnPackage({
  id: 'antioxidantes',
  name: 'addOns.antioxidantes.name',
  description: 'addOns.antioxidantes.description',
  icon: FaShieldAlt,
  benefits: 'addOnBenefits.antioxidantes',
  codes: ANTIOXIDANTES_BIOMARKER_CODES
});

// Estrés Oxidativo (unisex)
export const estresOxidativoPackage = createAddOnPackage({
  id: 'oxidative_cell',
  name: 'addOns.oxidative_cell.name',
  description: 'addOns.oxidative_cell.description',
  icon: FaAtom,
  benefits: 'addOnBenefits.oxidative_cell',
  codes: ESTRES_OXIDATIVO_BIOMARKER_CODES
});

// Inflamación (unisex)
export const inflamacionPackage = createAddOnPackage({
  id: 'inflammation',
  name: 'addOns.inflammation.name',
  description: 'addOns.inflammation.description',
  icon: FaFire,
  benefits: 'addOnBenefits.inflammation',
  codes: INFLAMACION_BIOMARKER_CODES
});

// Cardiovascular (unisex)
export const cardiovascularPackage = createAddOnPackage({
  id: 'cardiovascular',
  name: 'addOns.cardiovascular.name',
  description: 'addOns.cardiovascular.description',
  icon: FaHeartbeat,
  benefits: 'addOnBenefits.cardiovascular',
  codes: CARDIOVASCULAR_BIOMARKER_CODES
});

// IV & Nutrientes (unisex)
export const ivNutrientsPackage = createAddOnPackage({
  id: 'iv_nutrients',
  name: 'addOns.iv_nutrients.name',
  description: 'addOns.iv_nutrients.description',
  icon: FaTint,
  benefits: 'addOnBenefits.iv_nutrients',
  codes: IV_NUTRIENTS_BIOMARKER_CODES
});

// Metales Pesados (unisex)
export const metalesPackage = createAddOnPackage({
  id: 'metals',
  name: 'addOns.metals.name',
  description: 'addOns.metals.description',
  icon: FaIndustry,
  benefits: 'addOnBenefits.metals',
  codes: METALES_BIOMARKER_CODES
});

// Inmunidad (unisex)
export const inmunidadPackage = createAddOnPackage({
  id: 'immunity',
  name: 'addOns.immunity.name',
  description: 'addOns.immunity.description',
  icon: FaShieldVirus,
  benefits: 'addOnBenefits.immunity',
  codes: INMUNIDAD_BIOMARKER_CODES
});

// Digestión (unisex)
export const digestionPackage = createAddOnPackage({
  id: 'digest',
  name: 'addOns.digest.name',
  description: 'addOns.digest.description',
  icon: FaUtensils,
  benefits: 'addOnBenefits.digest',
  codes: DIGESTION_BIOMARKER_CODES
});

// Permeabilidad Intestinal (unisex)
export const permeabilidadIntestinalPackage = createAddOnPackage({
  id: 'gut_gate',
  name: 'addOns.gut_gate.name',
  description: 'addOns.gut_gate.description',
  icon: FaBandAid,
  benefits: 'addOnBenefits.gut_gate',
  codes: PERMEABILIDAD_INTESTINAL_BIOMARKER_CODES
});

// Coagulación (unisex)
export const coagulacionPackage = createAddOnPackage({
    id: 'coagulation',
  name: 'addOns.coagulation.name',
  description: 'addOns.coagulation.description',
    icon: FaTint,
  benefits: 'addOnBenefits.coagulation',
  codes: COAGULACION_BIOMARKER_CODES
});

// Salud Ósea (unisex)
export const saludOseaPackage = createAddOnPackage({
  id: 'bone_mineral',
  name: 'addOns.bone_mineral.name',
  description: 'addOns.bone_mineral.description',
  icon: FaBone,
  benefits: 'addOnBenefits.bone_mineral',
  codes: SALUD_OSEA_BIOMARKER_CODES
});

// Panel Genómico (unisex)
export const panelGenomicoPackage = createAddOnPackage({
  id: 'genome',
  name: 'addOns.genome.name',
  description: 'addOns.genome.description',
  icon: FaDna,
  benefits: 'addOnBenefits.genome',
  codes: PANEL_GENOMICO_BIOMARKER_CODES
});

// Cáncer (con diferencias por género)
export const cancerPackage = createAddOnPackage({
    id: 'cancer',
  name: 'addOns.cancer.name',
  description: 'addOns.cancer.description',
    icon: FaSearch,
  benefits: 'addOnBenefits.cancer',
  codes: CANCER_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: CANCER_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: CANCER_BIOMARKER_CODES_FEMALE_ONLY,
  hasGenderDifferences: true
});

// Edad Biológica (con diferencias por género)
export const bioagePackage = createAddOnPackage({
    id: 'bioage',
  name: 'addOns.bioage.name',
  description: 'addOns.bioage.description',
  icon: AiFillApple,
  benefits: 'addOnBenefits.bioage',
  codes: BIOAGE_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: BIOAGE_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: BIOAGE_BIOMARKER_CODES_FEMALE_ONLY,
  hasGenderDifferences: true
});

// Se define al final después de todos los packages individuales

// ================================
// FUNCIONES AUXILIARES
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
  if (!packageData || !packageData.getPricing) {
    console.warn('Package data inválido o sin método getPricing:', packageData);
    return { price: 0, marketPrice: 0, testCount: 0 };
  }

  try {
    const pricing = packageData.getPricing(gender);
    
    // Si el add-on tiene precios por género
    if (pricing[gender]) {
      return {
        price: pricing[gender].price,
        marketPrice: pricing[gender].marketPrice || pricing[gender].price,
        testCount: pricing[gender].testCount
      };
    }
    
    // Si solo tiene precio general (add-ons unisex)
    if (pricing.price !== undefined) {
      return {
        price: pricing.price,
        marketPrice: pricing.marketPrice || pricing.price,
        testCount: pricing.testCount
      };
    }
    
    return { price: 0, marketPrice: 0, testCount: 0 };
  } catch (error) {
    console.error('Error calculando precio del add-on:', error);
    return { price: 0, marketPrice: 0, testCount: 0 };
  }
};

// ================================
// OBJETO DE ADD-ONS (compatibilidad)
// ================================

export const addOnPackages = {
  hormonas: hormonasPackage,
  endocrino: endocrinoPackage,
  antioxidantes: antioxidantesPackage,
  oxidative_cell: estresOxidativoPackage,
  inflammation: inflamacionPackage,
  cardiovascular: cardiovascularPackage,
  iv_nutrients: ivNutrientsPackage,
  metals: metalesPackage,
  immunity: inmunidadPackage,
  digestion: digestionPackage,
  gut_gate: permeabilidadIntestinalPackage,
  coagulation: coagulacionPackage,
  bone_mineral: saludOseaPackage,
  genome: panelGenomicoPackage,
  cancer: cancerPackage,
  bioage: bioagePackage
};

console.log('✅ Add-Ons refactorizados cargados:', {
  totalPackages: Object.keys(addOnPackages).length,
  architecture: 'REFACTORIZADA ✅'
}); 