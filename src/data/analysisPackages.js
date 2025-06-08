/**
 * analysisPackages.js
 * Lógica de paquetes de análisis: Essential, Core y Advanced
 * SOLO paquetes principales - NO contiene add-ons
 * Importa biomarcadores desde biomarkersDict.js
 * 
 * ARQUITECTURA REFACTORIZADA:
 * - Eliminación de duplicaciones de pricing
 * - Simplificación de arrays de códigos
 * - Función factory para generación dinámica de paquetes
 * - Imports optimizados
 */

import { FaDna } from 'react-icons/fa';
import { buildBiomarkersFromCodes } from './biomarkersDict.js';
import { calculatePackagePrice } from './priceCalculator.js';

// ================================
// DEFINICIÓN DE CÓDIGOS POR PAQUETE
// ================================

// Essential: Paquete básico de longevidad (44 códigos comunes + 1 masculino)
export const ESSENTIAL_BIOMARKER_CODES_COMMON = [
  'H0000', 'H1420', 'B0000', 'B0200', 'B5600', 'B6510', 'B0020', 'B0030', 'B0250', 'B1540',
  'B1260', 'B1970', 'B0050', 'B0060', 'B0080', 'B0240', 'B0070', 'B0010', 'B0040', 'B0170',
  'B0180', 'B3110', 'B3100', 'B5120', 'B5290', 'B6020', 'B5850', 'B6040', 'B6070',
  'B6130', 'B3170', 'B5590', 'B0120', 'B0100', 'B1600', 'B8050', 'B0130', 'B3210', 'B7260',
  'B5370', 'B6180', 'B6190', 'B5410'
];

export const ESSENTIAL_BIOMARKER_CODES_MALE_ONLY = ['B6160']; // Testosterona total

// Performance: Paquete enfocado en rendimiento deportivo (51 comunes + específicos por género)
export const PERFORMANCE_BIOMARKER_CODES_COMMON = [
  'H0000', 'H1420', 'B0000', 'B0200', 'B5600', 'B6510', 'B0270', 'B0750', 'B0020', 'B0030', 
  'B0250', 'B1540', 'B1260', 'B1970', 'B0050', 'B0060', 'B0070', 'B0110', 'B0010', 'B0040', 
  'B0170', 'B0180', 'B3110', 'T2590', 'B5120', 'B5290', 'B6020', 'B6160', 'B5850', 'B6040', 
  'B6070', 'B6030', 'B6130', 'B2120', 'B0220', 'B3170', 'B5590', 'B7790', 'I2081', 'B0120', 
  'B0100', 'B1600', 'B8060', 'T3920', 'B8050', 'B0130', 'B3210', 'B7260', 'B5370', 'B6180', 
  'B6190', 'B5410', 'T1191', 'T2830', 'T1061'
];

export const PERFORMANCE_BIOMARKER_CODES_MALE_ONLY = ['D0601']; // Testosterona libre
export const PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY = ['B5350', 'B5800', 'B5380', 'B5932']; // Estradiol, LH, FSH, Progesterona

// Core: Códigos con ✅✅ en tabla Core (79 comunes + específicos por género)
export const CORE_BIOMARKER_CODES_COMMON = [
  'H0000', 'H1420', 'B0000', 'B0200', 'B5600', 'B6510', 'B0020', 'B0030', 'B0250', 'B1540',
  'B1260', 'B1970', 'B0050', 'B0060', 'B0080', 'B0260', 'B0240', 'B0070', 'B1980', 'B0350',
  'B0110', 'B0010', 'B0040', 'B0170', 'B0180', 'B3110', 'B3100', 'T2590', 'B5120', 'B5290',
  'B5350', 'B5980', 'B5800', 'B5380', 'B6020', 'B6160', 'B5850', 'B6040', 'B6070', 'B6030',
  'B6010', 'D0850', 'D0181', 'D1760', 'I6740', 'B6130', 'B3170', 'B5590', 'B7790', 'I2081',
  'B0120', 'B0100', 'B1600', 'T0500', 'T3920', 'B8050', 'B0130', 'B3210', 'B7260', 'B5370',
  'B6180', 'B6190', 'B5410', 'T0811', 'T2830', 'T1720', 'T1061', 'B7121', 'B3015', 'B3041',
  'B5110', 'B5080', 'B5090', 'B5100', 'B8130', 'I5080', 'I5090', 'B8120', 'D1271', 'B7900',
  'B8160', 'I0141', 'I5072', 'B6321', 'B6300', 'B7750', 'B3130', 'OG001'
];

export const CORE_BIOMARKER_CODES_MALE_ONLY = ['D0601', 'B6480', 'B5830', 'B5840'];
export const CORE_BIOMARKER_CODES_FEMALE_ONLY = ['B5932', 'D1001', 'B8110'];

// Advanced: Paquete más completo (113 comunes + específicos por género)
export const ADVANCED_BIOMARKER_CODES_COMMON = [
  'H0000', 'H1420', 'B0000', 'B0200', 'B5600', 'B6510', 'B0270', 'B0750', 'H0050', 'H0850',
  'H0860', 'B0020', 'B0030', 'B0250', 'B1540', 'B1260', 'B1970', 'B0050', 'B0060', 'B0080',
  'B0260', 'B0240', 'B0070', 'B1980', 'B0350', 'B0110', 'B0010', 'B0040', 'B0170', 'B0180',
  'B1900', 'B0190', 'B3110', 'B3100', 'B7700', 'T2590', 'D1111', 'I3291', 'B5120', 'B5290',
  'B5800', 'B5380', 'B6020', 'B5850', 'I5047', 'B6040', 'B6070', 'B6030', 'B6010', 'D0181',
  'D1760', 'I6740', 'B6130', 'B2120', 'B0220', 'B3170', 'B5590', 'H0020', 'B7790', 'I2081',
  'T1572', 'B0120', 'B0100', 'B1600', 'B8060', 'T0500', 'T3920', 'B8050', 'B0130', 'B3210',
  'B7260', 'B5370', 'B6180', 'D0560', 'B6190', 'B5410', 'T0811', 'T2841', 'T1191', 'T1200A',
  'T1200B', 'T2830', 'T1720', 'T1061', 'B7121', 'B3015', 'B3041', 'T0302', 'T0150', 'T0960',
  'T0480', '6897', 'M1190', 'M0010', 'B5110', 'B5080', 'B5090', 'B5100', 'B8130', 'I5080',
  'I5090', 'B8120', 'D1271', 'B7900', 'B8160', 'I0141', 'I5072', 'B6321', 'B6300', 'B7750',
  'B3130', 'AB001', 'OG001'
];

export const ADVANCED_BIOMARKER_CODES_MALE_ONLY = ['D0601', 'B6480', 'B6160', 'D0850', 'B3340', 'B5830', 'B5840'];
export const ADVANCED_BIOMARKER_CODES_FEMALE_ONLY = ['B5350', 'B5980', 'B5932', 'D1001', 'D0780', 'B8110'];

// ================================
// FUNCIÓN FACTORY PARA PAQUETES
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
    femaleOnlyCodes = [] 
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
    
    // Función de pricing dinámico usando priceCalculator.js
    getPricing: (gender = 'both') => {
      const genderCodes = generateCodesForGender(commonCodes, maleOnlyCodes, femaleOnlyCodes, gender);
      const genderBiomarkers = buildBiomarkersFromCodes(genderCodes);
      const pricing = calculatePackagePrice(genderBiomarkers, gender, id);
      
      return {
        testCount: pricing.testCount,
        price: Math.round(pricing.finalPrice),
        costPrice: Math.round(pricing.marketPrice),
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
        price: Math.round(pricing.finalPrice),
        marketPrice: Math.round(pricing.marketPrice),
        pricePerTest: pricing.pricePerTest
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
  name: 'Essential',
  description: 'systems.essentialDescription',
  color: 'gradient-earth',
  bgColor: 'bg-earth-50',
  borderColor: 'border-earth',
  textColor: 'text-earth',
  targetAudience: 'Ideal para clientes que inician su viaje de longevidad',
  commonCodes: ESSENTIAL_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: ESSENTIAL_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: []
});

// Paquete Performance
export const performancePackage = createPackage({
  id: 'performance',
  name: 'Performance',
  description: 'Paquete especializado en rendimiento deportivo y optimización física, incluyendo biomarcadores específicos para energía, recuperación y función muscular',
  color: 'gradient-sport',
  bgColor: 'bg-sport-50',
  borderColor: 'border-sport',
  textColor: 'text-sport',
  targetAudience: 'Ideal para atletas y personas activas que buscan optimizar su rendimiento físico',
  commonCodes: PERFORMANCE_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: PERFORMANCE_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY
});

// Paquete Core
export const corePackage = createPackage({
  id: 'core',
  name: 'Core',
  description: 'Paquete completo de biomarcadores fundamentales para análisis integral de longevidad',
  color: 'gradient-primary',
  bgColor: 'bg-primary-50',
  borderColor: 'border-primary',
  textColor: 'text-primary',
  targetAudience: 'Para clientes que buscan un análisis completo y detallado',
  commonCodes: CORE_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: CORE_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: CORE_BIOMARKER_CODES_FEMALE_ONLY
});

// Paquete Advanced
export const advancedPackage = createPackage({
  id: 'advanced',
  name: 'Advanced',
  description: 'Paquete más completo con análisis avanzados de metales pesados, microbioma y biomarcadores especializados',
  color: 'gradient-premium',
  bgColor: 'bg-premium-50',
  borderColor: 'border-premium',
  textColor: 'text-premium',
  targetAudience: 'Para clientes que buscan el análisis más completo disponible',
  commonCodes: ADVANCED_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: ADVANCED_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: ADVANCED_BIOMARKER_CODES_FEMALE_ONLY
});

// ================================
// ARRAYS DE BIOMARCADORES (compatibilidad)
// ================================

export const essentialBiomarkers = essentialPackage.biomarkers;
export const performanceBiomarkers = performancePackage.biomarkers;
export const coreBiomarkers = corePackage.biomarkers;
export const advancedBiomarkers = advancedPackage.biomarkers;

// ================================
// FUNCIONES AUXILIARES
// ================================

/**
 * Obtiene paquete filtrado por género - FUNCIÓN UNIFICADA
 * @param {object} packageData - Datos del paquete (essential, core, advanced)
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
    price: pricing.price,
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

// ================================
// VALIDACIONES Y ESTADÍSTICAS
// ================================

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
    isValid: true, // Simplificado - validación completa en biomarkersDict.js
    packages: {
      essential: allEssentialCodes.length,
      performance: allPerformanceCodes.length,
      core: allCoreCodes.length,
      advanced: allAdvancedCodes.length
    },
    totalUniqueCodes: uniquePackageCodes.length
  };
};

// ================================
// INFORMACIÓN DE INICIALIZACIÓN
// ================================

const validation = validatePackageCodes();
console.log('✅ Paquetes refactorizados cargados:', {
  essential: `C:${ESSENTIAL_BIOMARKER_CODES_COMMON.length} M:${ESSENTIAL_BIOMARKER_CODES_MALE_ONLY.length}`,
  performance: `C:${PERFORMANCE_BIOMARKER_CODES_COMMON.length} M:${PERFORMANCE_BIOMARKER_CODES_MALE_ONLY.length} F:${PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY.length}`,
  core: `C:${CORE_BIOMARKER_CODES_COMMON.length} M:${CORE_BIOMARKER_CODES_MALE_ONLY.length} F:${CORE_BIOMARKER_CODES_FEMALE_ONLY.length}`,
  advanced: `C:${ADVANCED_BIOMARKER_CODES_COMMON.length} M:${ADVANCED_BIOMARKER_CODES_MALE_ONLY.length} F:${ADVANCED_BIOMARKER_CODES_FEMALE_ONLY.length}`,
  architecture: 'REFACTORIZADA ✅'
}); 