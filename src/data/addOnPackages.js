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

// METALS: Metales pesados (4 tests)
export const METALS_BIOMARKER_CODES = ['T0302', 'T0150', 'T0960', 'T0480'];

// IMMUNITY: Sistema inmunológico (6 tests)
export const IMMUNITY_BIOMARKER_CODES = ['I0141', 'I5072', 'B6321', 'B6300', 'B7750', 'B3130'];

// DIGESTIÓN: Función digestiva (4 tests)
export const DIGESTION_BIOMARKER_CODES = ['T2590', 'B1980', 'B0350', 'B0260'];


// COAGULATION: Sistema hemostático (3 tests)
export const COAGULATION_BIOMARKER_CODES = ['H0050', 'H0850', 'H0860'];

// BONE MINERAL: Salud ósea avanzada (4 tests)
export const BONE_MINERAL_BIOMARKER_CODES = ['D0560', 'D1111', 'I3291', 'T1572'];


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

// GUT GATE: Microbioma y permeabilidad (4 tests)
export const GUT_GATE_BIOMARKER_CODES = ['M1190', 'P3031', 'AB001', 'AB002'];

// GENOME: Análisis genético completo (5 tests)
export const GENOME_BIOMARKER_CODES = ['OG002', 'OG003', 'OG004', 'OG005', 'OG006']; 

// BONE MINERAL: Salud ósea avanzada (obsoleto - usar BONE_MINERAL_BIOMARKER_CODES de línea 79)
// export const BONE_MINERAL_BIOMARKER_CODES = ['D1111', 'I3291', 'T1572', 'D0560'];

// IMMUNITY: Inmunidad avanzada (obsoleto - usar IMMUNITY_BIOMARKER_CODES de línea 67)
// export const IMMUNITY_BIOMARKER_CODES = ['I0141', 'I5072', 'B6321', 'B6300', 'B7750'];

// ================================
// DEFINICIÓN DE EXCLUSIONES POR PERFIL
// ================================

/**
 * Define qué códigos de biomarcadores excluir para cada add-on según el perfil base
 * Esto permite mostrar solo los biomarcadores que realmente agregan valor
 */
export const PROFILE_EXCLUSIONS = {
  inflammation: {
    essential: [],                     // Essential no incluye ningún marcador de inflamación
    performance: ['B7790', 'I2081'],  // Performance ya incluye IL-6 y TNF-α, solo mostrar VSG
    core: ['H0020', 'B7790', 'I2081'], // Core incluye todos, add-on quedaría vacío
    advanced: ['H0020', 'B7790', 'I2081'] // Advanced incluye todos, add-on quedaría vacío
  },
  cardiovascular: {
    essential: [], // Essential no incluye marcadores cardiovasculares
    performance: ['B0110', 'B0750', 'B2120', 'B0220', 'B1900'], // Performance incluye 5 marcadores básicos
    core: ['B0110', 'B0750', 'B2120', 'B0220', 'B1900', 'B0190', 'I5047'], // Core incluye Performance + 2 adicionales
    advanced: ['B0110', 'B0220', 'B0750', 'B1900', 'B2120', 'B0190', 'B7700', 'I5047'] // Advanced incluye todos
  },
  antioxidantes: {
    essential: [],                     // Essential no incluye antioxidantes específicos
    performance: ['T1191', 'T2830'],  // Performance incluye vitamina E y selenio
    core: ['T1191', 'T2830', 'T0811'], // Core incluye más antioxidantes
    advanced: ['T0811', 'T1191', 'T1200', 'T2830', 'T2841'] // Advanced incluye casi todos
  },
  oxidative_cell: {
    essential: [],                     // Essential no incluye marcadores de estrés oxidativo
    performance: ['T3920'],           // Performance incluye selenio  
    core: ['B7121', 'B3015', 'B3041', 'T3920'], // Core incluye todos los del estrés oxidativo
    advanced: ['B7121', 'B3015', 'B3041', 'T3920'] // Advanced incluye todos los del estrés oxidativo
  },
  hormonas: {
    essential: [], // Essential no incluye hormonas
    performance: {
      // Exclusiones específicas por género en Performance
      male: ['B5420', 'D0601'], // Hombres: excluir DHEA-S y testosterona libre (ya en Performance)
      female: ['B5350', 'B5800', 'B5380', 'B5932', 'B5420'] // Mujeres: excluir estradiol, LH, FSH, progesterona (ya en Performance)
    },
    core: ['B5350', 'B5370', 'B5380', 'B5410', 'B5420', 'B5600', 'B5800', 'B5980'], // Core incluye muchas
    advanced: ['B5350', 'B5370', 'B5380', 'B5410', 'B5420', 'B5590', 'B5600', 'B5800', 'B5980'] // Advanced incluye casi todas
  },
  endocrino: {
    essential: [],
    performance: ['B6030'], // Performance incluye TSH
    core: ['B6010', 'B6030', 'I6740'], // Core incluye todos los del endocrino
    advanced: ['B6010', 'B6030', 'I6740'] // Advanced incluye todos
  },
  iv_nutrients: {
    essential: [], 
    performance: ['T1061'], 
    core: ['T0500', 'T1061'], 
    advanced: ['T0500', 'T1720', 'T1061', 'B8060', 'B0270'] 
  },
  metals: { 
    essential: [], 
    performance: [], 
    core: [], 
    advanced: ['T0302', 'T0150', 'T0960', 'T0480'] 
  },
  immunity: { essential: [], performance: [], core: [], advanced: ['I0141', 'I5072', 'B6321', 'B6300', 'B7750', 'B3130'] },
  digestion: { essential: [], performance: [], core: ['T2590', 'B1980', 'B0350', 'B0260'], advanced: ['T2590', 'B1980', 'B0350', 'B0260'] },
  gut_gate: { 
    essential: [], 
    performance: [], 
    core: [], 
    advanced: ['M1190', 'AB001'] // Advanced incluye solo 2 de 4 - quedan P3031, AB002 únicos
  },
  coagulation: { 
    essential: [], 
    performance: [], 
    core: [], 
    advanced: ['H0050', 'H0850', 'H0860'] 
  },
  bone_mineral: { 
    essential: [], 
    performance: [], 
    core: [], 
    advanced: ['D0560', 'D1111', 'I3291', 'T1572'] 
  },
  genome: { 
    essential: [], 
    performance: [], 
    core: [], 
    advanced: [] 
  },
  cancer: {
    essential: [], 
    performance: [], 
    core: [], 
    advanced: {
      // Advanced incluye todos los marcadores tumorales - exclusiones específicas por género
      male: ['6897', 'B0110', 'B5080', 'B5090', 'B5100', 'B5110', 'B7900', 'B8120', 'B8130', 'B8160', 'D1271', 'D1760', 'I5080', 'I5090', 'M0010', 'B5830', 'B5840'], // Comunes + específicos masculinos
      female: ['6897', 'B0110', 'B5080', 'B5090', 'B5100', 'B5110', 'B7900', 'B8120', 'B8130', 'B8160', 'D1271', 'D1760', 'I5080', 'I5090', 'M0010', 'B5380', 'B8110'] // Comunes + específicos femeninos
    }
  },
  bioage: {
    essential: [], 
    performance: [], 
    core: ['OG001'], // Core incluye MyEpiAgeing (común)
    advanced: {
      male: ['OG001'], // Hombres: excluir MyEpiAgeing (queda G1465, B3340) - 2 únicos
      female: ['OG001', 'D1001'] // Mujeres: excluir MyEpiAgeing + AMH (queda G1465) - 1 único
    }
  }
};

/**
 * Obtiene las exclusiones específicas para un add-on y perfil
 * @param {string} addOnId - ID del add-on
 * @param {string} profileId - ID del perfil (essential, performance, core, advanced)
 * @param {string} gender - Género ('male', 'female', 'both') - opcional para exclusiones específicas por género
 * @returns {Array} Array de códigos a excluir
 */
export const getProfileExclusions = (addOnId, profileId, gender = 'both') => {
  const exclusions = PROFILE_EXCLUSIONS[addOnId];
  if (!exclusions) {
    console.warn(`⚠️ No se encontraron exclusiones para el add-on: ${addOnId}`);
    return [];
  }
  
  const profileExclusions = exclusions[profileId];
  if (!profileExclusions) {
    console.warn(`⚠️ No se encontraron exclusiones para el perfil ${profileId} en add-on ${addOnId}`);
    return [];
  }
  
  // Si las exclusiones son un objeto (exclusiones por género), usar el género específico
  if (typeof profileExclusions === 'object' && !Array.isArray(profileExclusions)) {
    const genderExclusions = profileExclusions[gender];
    if (Array.isArray(genderExclusions)) {
      return genderExclusions;
    } else {
      // Fallback a 'both' si el género específico no existe
      return profileExclusions.both || [];
    }
  }
  
  // Si las exclusiones son un array simple, devolverlo directamente
  return Array.isArray(profileExclusions) ? profileExclusions : [];
};

// ================================
// FUNCIÓN FACTORY PARA ADD-ONS
// ================================

/**
 * Filtra códigos de biomarcadores eliminando duplicados con un perfil base
 * @param {Array} addOnCodes - Códigos del add-on
 * @param {Array} baseCodes - Códigos ya incluidos en el perfil base
 * @param {string} addOnId - ID del add-on para exclusiones específicas
 * @param {string} profileId - ID del perfil para exclusiones específicas
 * @returns {Array} Códigos filtrados sin duplicados
 */
const filterDuplicateCodes = (addOnCodes, baseCodes = [], addOnId = null, profileId = null, gender = 'both') => {
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
const generateAddOnCodesForGender = (commonCodes, maleOnlyCodes = [], femaleOnlyCodes = [], gender, baseCodes = [], addOnId = null, profileId = null) => {
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
    },

    // NUEVA: Función para obtener add-on filtrado por perfil base (sin duplicados)
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
          isFiltered: true, // Indicador de que está filtrado
          filteredCodes: genderCodes, // Códigos después del filtrado
          originalCodes: generateAddOnCodesForGender(codes, maleOnlyCodes, femaleOnlyCodes, gender), // Códigos originales
          profileExclusions: profileId ? getProfileExclusions(id, profileId, gender) : [] // Exclusiones aplicadas
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
          profileExclusions: profileId ? getProfileExclusions(id, profileId, gender) : [] // Exclusiones aplicadas
        };
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

// Metals (unisex)
export const metalesPackage = createAddOnPackage({
  id: 'metals',
  name: 'addOns.metals.name',
  description: 'addOns.metals.description',
  icon: FaIndustry,
  benefits: 'addOnBenefits.metals',
  codes: METALS_BIOMARKER_CODES
});

// Immunity (unisex)
export const inmunidadPackage = createAddOnPackage({
  id: 'immunity',
  name: 'addOns.immunity.name',
  description: 'addOns.immunity.description',
  icon: FaShieldVirus,
  benefits: 'addOnBenefits.immunity',
  codes: IMMUNITY_BIOMARKER_CODES
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

// Gut Gate (unisex)
export const permeabilidadIntestinalPackage = createAddOnPackage({
  id: 'gut_gate',
  name: 'addOns.gut_gate.name',
  description: 'addOns.gut_gate.description',
  icon: FaBandAid,
  benefits: 'addOnBenefits.gut_gate',
  codes: GUT_GATE_BIOMARKER_CODES
});

// Coagulation (unisex)
export const coagulacionPackage = createAddOnPackage({
    id: 'coagulation',
  name: 'addOns.coagulation.name',
  description: 'addOns.coagulation.description',
    icon: FaTint,
  benefits: 'addOnBenefits.coagulation',
  codes: COAGULATION_BIOMARKER_CODES
});

// Bone Mineral (unisex)
export const saludOseaPackage = createAddOnPackage({
  id: 'bone_mineral',
  name: 'addOns.bone_mineral.name',
  description: 'addOns.bone_mineral.description',
  icon: FaBone,
  benefits: 'addOnBenefits.bone_mineral',
  codes: BONE_MINERAL_BIOMARKER_CODES
});

// Panel Genómico (unisex)
export const panelGenomicoPackage = createAddOnPackage({
  id: 'genome',
  name: 'addOns.genome.name',
  description: 'addOns.genome.description',
  icon: FaDna,
  benefits: 'addOnBenefits.genome',
  codes: GENOME_BIOMARKER_CODES // Corregido: usar códigos que existen en el diccionario
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

/**
 * NUEVA: Función para obtener información detallada de filtrado de un add-on
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

console.log('✅ Add-Ons refactorizados cargados:', {
  totalPackages: Object.keys(addOnPackages).length,
  architecture: 'REFACTORIZADA ✅',
  profileExclusions: 'HABILITADAS ✅'
}); 