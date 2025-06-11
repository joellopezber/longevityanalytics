/**
 * codes.js
 * Códigos de biomarcadores para add-ons y exclusiones por perfil
 * BLOQUE 1: Solo definición de códigos y reglas - sin lógica
 */

// ================================
// CÓDIGOS DE BIOMARCADORES POR ADD-ON
// ================================

// HORMONAS: Análisis hormonal completo (5 comunes + específicos por género)
export const HORMONAS_BIOMARKER_CODES_COMMON = ['B5350', 'B5380', 'B5420', 'B5800', 'B5980'];
export const HORMONAS_BIOMARKER_CODES_MALE_ONLY = ['B6480', 'D0601', 'D0850'];
export const HORMONAS_BIOMARKER_CODES_FEMALE_ONLY = ['B5932', 'B6160', 'D0181', 'D0780'];

// ENDOCRINO: Eje hormonal avanzado (3 básicos)
export const ENDOCRINO_BIOMARKER_CODES = ['B6030', 'B6010', 'I6740'];

// ANTIOXIDANTES: Vitaminas antioxidantes (5 tests)
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

// CÁNCER: Marcadores tumorales (14 comunes + específicos por género)
export const CANCER_BIOMARKER_CODES_COMMON = [
  'M0010', '6897', 'B5110', 'B5080', 'B5090', 'B5100', 'B8130', 
  'I5080', 'I5090', 'B8120', 'D1271', 'B7900', 'B8160', 'D1760'
];
export const CANCER_BIOMARKER_CODES_MALE_ONLY = ['B5830', 'B5840'];
export const CANCER_BIOMARKER_CODES_FEMALE_ONLY = ['B8110'];

// EDAD BIOLÓGICA: Tests epigenéticos (2 comunes + específicos por género)
export const BIOAGE_BIOMARKER_CODES_COMMON = ['G1465', 'OG001'];
export const BIOAGE_BIOMARKER_CODES_MALE_ONLY = ['B3340'];
export const BIOAGE_BIOMARKER_CODES_FEMALE_ONLY = ['D1001'];

// GUT GATE: Microbioma y permeabilidad (4 tests)
export const GUT_GATE_BIOMARKER_CODES = ['M1190', 'P3031', 'AB001', 'AB002'];

// GENOME: Análisis genético completo (5 tests)
export const GENOME_BIOMARKER_CODES = ['OG002', 'OG003', 'OG004', 'OG005', 'OG006'];

// ================================
// EXCLUSIONES POR PERFIL
// ================================

/**
 * Define qué códigos de biomarcadores excluir para cada add-on según el perfil base
 * Esto permite mostrar solo los biomarcadores que realmente agregan valor
 */
export const PROFILE_EXCLUSIONS = {
  inflammation: {
    essential: [],
    performance: ['B7790', 'I2081'],
    core: ['H0020', 'B7790', 'I2081'],
    advanced: ['H0020', 'B7790', 'I2081']
  },
  cardiovascular: {
    essential: [],
    performance: ['B0110', 'B0750', 'B2120', 'B0220', 'B1900'],
    core: ['B0110', 'B0750', 'B2120', 'B0220', 'B1900', 'B0190', 'I5047'],
    advanced: ['B0110', 'B0220', 'B0750', 'B1900', 'B2120', 'B0190', 'B7700', 'I5047']
  },
  antioxidantes: {
    essential: [],
    performance: ['T1191', 'T2830'],
    core: ['T1191', 'T2830', 'T0811'],
    advanced: ['T0811', 'T1191', 'T1200', 'T2830', 'T2841']
  },
  oxidative_cell: {
    essential: [],
    performance: ['T3920'],
    core: ['B7121', 'B3015', 'B3041', 'T3920'],
    advanced: ['B7121', 'B3015', 'B3041', 'T3920']
  },
  hormonas: {
    essential: [],
    performance: {
      male: ['B5420', 'D0601'],
      female: ['B5350', 'B5800', 'B5380', 'B5932', 'B5420']
    },
    core: ['B5350', 'B5370', 'B5380', 'B5410', 'B5420', 'B5600', 'B5800', 'B5980'],
    advanced: ['B5350', 'B5370', 'B5380', 'B5410', 'B5420', 'B5590', 'B5600', 'B5800', 'B5980']
  },
  endocrino: {
    essential: [],
    performance: ['B6030'],
    core: ['B6010', 'B6030', 'I6740'],
    advanced: ['B6010', 'B6030', 'I6740']
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
  immunity: {
    essential: [],
    performance: [],
    core: [],
    advanced: ['I0141', 'I5072', 'B6321', 'B6300', 'B7750', 'B3130']
  },
  digestion: {
    essential: [],
    performance: [],
    core: ['T2590', 'B1980', 'B0350', 'B0260'],
    advanced: ['T2590', 'B1980', 'B0350', 'B0260']
  },
  gut_gate: {
    essential: [],
    performance: [],
    core: [],
    advanced: ['M1190', 'AB001']
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
      male: ['M0010', '6897', 'B5110', 'B5080', 'B5090', 'B5100', 'B8130', 'I5080', 'I5090', 'B8120', 'D1271', 'B7900', 'B8160', 'D1760', 'B5830', 'B5840'],
      female: ['M0010', '6897', 'B5110', 'B5080', 'B5090', 'B5100', 'B8130', 'I5080', 'I5090', 'B8120', 'D1271', 'B7900', 'B8160', 'D1760', 'B8110']
    }
  },
  bioage: {
    essential: [],
    performance: [],
    core: ['OG001'],
    advanced: {
      male: ['OG001'],
      female: ['OG001', 'D1001']
    }
  }
};

/**
 * Obtiene las exclusiones específicas para un add-on y perfil
 * @param {string} addOnId - ID del add-on
 * @param {string} profileId - ID del perfil (essential, performance, core, advanced)
 * @param {string} gender - Género ('male', 'female', 'both')
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

console.log('✅ Códigos de add-ons cargados:', {
  addOns: 16,
  withGenderDifferences: 3, // hormonas, cancer, bioage
  profileExclusions: Object.keys(PROFILE_EXCLUSIONS).length
}); 