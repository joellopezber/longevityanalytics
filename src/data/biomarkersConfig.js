/**
 * biomarkersConfig.js (antes optionalBiomarkers.js)
 * Sistema simplificado para gestión de biomarcadores seleccionables en add-ons
 * 
 * NUEVA ARQUITECTURA SIMPLIFICADA:
 * - Todos los biomarcadores son seleccionables
 * - Solo se define el estado por defecto (true/false)
 * - Eliminada la separación artificial required/optional
 * - Mapeo a variables del contexto existente
 * - Funciones utilitarias para cálculos dinámicos
 * - Compatibilidad total con BiomarkerSelectionContext.js
 */

// ================================
// DEFINICIÓN SIMPLIFICADA DE BIOMARCADORES SELECCIONABLES
// ================================

/**
 * Define todos los biomarcadores seleccionables en cada add-on y sus estados por defecto
 * NUEVA ESTRUCTURA: Solo biomarkers con sus estados por defecto (true/false)
 * 
 * Filosofía:
 * - true: Seleccionado por defecto (aparece activo al cargar)
 * - false: No seleccionado por defecto (usuario puede activar manualmente)
 */
export const ADD_ON_BIOMARKERS_CONFIG = {
  genome: {
    biomarkers: {
      'OG002': true,   // MyPharma - SÍ seleccionado por defecto
      'OG003': true,   // MyDetox - SÍ seleccionado por defecto  
      'OG004': true,   // MyDiet - SÍ seleccionado por defecto
      'OG005': true,   // MyAgeing - SÍ seleccionado por defecto
      'OG006': true    // MySuplements - SÍ seleccionado por defecto
    }
  },
  hormonas: {
    biomarkers: {
      'B5350': true,   // Estradiol - SÍ seleccionado por defecto
      'B5380': true,   // FSH - SÍ seleccionado por defecto
      'B5420': true,   // Hormona de crecimiento (hGH) - SÍ seleccionado por defecto
      'B5800': true,   // LH - SÍ seleccionado por defecto
      'B5980': true,   // Prolactina - SÍ seleccionado por defecto
      'B6480': true,   // Testosterona biodisp. - SÍ seleccionado por defecto
      'D0601': true,   // Testosterona libre - SÍ seleccionado por defecto
      'D0850': true,   // DHT - SÍ seleccionado por defecto
      // Biomarcadores específicos femeninos
      'B5932': true,   // Progesterona - SÍ seleccionado por defecto
      'B6160': true,   // Testosterona total - SÍ seleccionado por defecto
      'D0181': true,   // 17-OH-Progesterona - SÍ seleccionado por defecto
      'D0780': true    // Estrona - SÍ seleccionado por defecto
    }
  },
  endocrino: {
    biomarkers: {
      'B6030': true,   // IGF-1 - SÍ seleccionado por defecto
      'B6010': true,   // IGFBP-3 - SÍ seleccionado por defecto
      'I6740': true    // ACTH - SÍ seleccionado por defecto
    }
  },
  cardiovascular: {
    biomarkers: {
      'B0110': true,   // LDH - SÍ seleccionado por defecto
      'B0750': true,   // Ácido láctico - SÍ seleccionado por defecto
      'B2120': true,   // CK-MB - SÍ seleccionado por defecto
      'B0220': true,   // CPK total - SÍ seleccionado por defecto
      'B1900': true,   // LDL directo - SÍ seleccionado por defecto
      'B0190': true,   // VLDL - SÍ seleccionado por defecto
      'B7700': true,   // Lp(a) * - SÍ seleccionado por defecto
      'I5047': true    // Cistatina-C - SÍ seleccionado por defecto
    }
  },
  antioxidantes: {
    biomarkers: {
      'T0811': true,   // Retinol (Vitamina A) - SÍ seleccionado por defecto
      'T1191': true,   // Alfa-tocoferol (Vit E) - SÍ seleccionado por defecto
      'T2841': true,   // Gamma-tocoferol (Vit E) - SÍ seleccionado por defecto
      'T1200': true,   // Beta-caroteno - SÍ seleccionado por defecto
      'T2830': true    // Coenzima Q10 - SÍ seleccionado por defecto
    }
  },
  iv_nutrients: {
    biomarkers: {
      'T0500': true,   // Cromo (Oligoelemento) - SÍ seleccionado por defecto
      'B8060': true,   // Cobre - SÍ seleccionado por defecto
      'B0270': true,   // Osmolalidad sérica - SÍ seleccionado por defecto
      'T1720': true,   // Vitamina K1 - SÍ seleccionado por defecto
      'T1061': true    // Vitamina C - SÍ seleccionado por defecto
    }
  },
  metals: {
    biomarkers: {
      'T0302': true,   // Mercurio - SÍ seleccionado por defecto
      'T0150': true,   // Plomo - SÍ seleccionado por defecto
      'T0960': true,   // Arsénico - SÍ seleccionado por defecto
      'T0480': true    // Cadmio - SÍ seleccionado por defecto
    }
  },
  oxidative_cell: {
    biomarkers: {
      'B7121': true,   // Glutatión reductasa - SÍ seleccionado por defecto
      'B3015': true,   // Glutatión peroxidasa - SÍ seleccionado por defecto
      'B3041': true,   // G6PD - SÍ seleccionado por defecto
      'T3920': true    // Selenio - SÍ seleccionado por defecto
    }
  },
  inflammation: {
    biomarkers: {
      'H0020': true,   // VSG - SÍ seleccionado por defecto
      'B7790': true,   // IL-6 - SÍ seleccionado por defecto
      'I2081': true    // TNF-α - SÍ seleccionado por defecto
    }
  },
  immunity: {
    biomarkers: {
      'I0141': true,   // ANA (Autoinmunidad) - SÍ seleccionado por defecto
      'I5072': true,   // Anti-CCP (Artritis) - SÍ seleccionado por defecto
      'B6321': true,   // Anti-tiroglobulina (Tiroides) - SÍ seleccionado por defecto
      'B6300': true,   // Anti-TPO (Tiroides) - SÍ seleccionado por defecto
      'B3130': true,   // Factor reumatoide - SÍ seleccionado por defecto
      'B7750': true    // H. pylori IgG (Infección) - SÍ seleccionado por defecto
    }
  },
  digestion: {
    biomarkers: {
      'T2590': true,   // Urianálisis + sedimento - SÍ seleccionado por defecto
      'B1980': true,   // Amilasa - SÍ seleccionado por defecto
      'B0350': true,   // Lipasa - SÍ seleccionado por defecto
      'B0260': true    // Elastasa - SÍ seleccionado por defecto
    }
  },
  gut_gate: {
    biomarkers: {
      'M1190': true,   // Parásitos en heces (Parasitología) - SÍ seleccionado por defecto
      'P3031': true,   // Intolerancia alimentaria (Intolerancia Igg) - SÍ seleccionado por defecto
      'AB001': true,   // Microbioma intestinal (Microbiota) - SÍ seleccionado por defecto
      'AB002': true    // Metaboloma (Microbiota) - SÍ seleccionado por defecto
    }
  },
  bone_mineral: {
    biomarkers: {
      'D0560': true,   // Calcitriol (Vit D [1,25-OH]) - SÍ seleccionado por defecto
      'D1111': true,   // ALP ósea - SÍ seleccionado por defecto
      'I3291': true,   // CTX - SÍ seleccionado por defecto
      'T1572': true    // Calcio iónico - SÍ seleccionado por defecto
    }
  },
  coagulation: {
    biomarkers: {
      'H0050': true,   // Fibrinógeno - SÍ seleccionado por defecto
      'H0850': true,   // Cefalina-APTT - SÍ seleccionado por defecto
      'H0860': true    // INR (Protrombina) - SÍ seleccionado por defecto
    }
  },
  bioage: {
    biomarkers: {
      'OG001': true,   // MyEpiAgeing* - SÍ seleccionado por defecto
      'G1465': true,   // Longitud telomérica - SÍ seleccionado por defecto
      'B3340': true,   // Espermiograma - SÍ seleccionado por defecto
      'D1001': true    // AMH - SÍ seleccionado por defecto
    }
  },
  cancer: {
    biomarkers: {
      // Biomarcadores comunes para ambos géneros
      'M0010': true,   // Sangre oculta en heces - SÍ seleccionado por defecto
      '6897': true,    // Urianálisis + sedimento - SÍ seleccionado por defecto
      'B5110': true,   // CEA - SÍ seleccionado por defecto
      'B5080': true,   // CA 125 - SÍ seleccionado por defecto
      'B5090': true,   // CA 15.3 - SÍ seleccionado por defecto
      'B5100': true,   // CA 19-9 - SÍ seleccionado por defecto
      'B8130': true,   // Células escamosas Ag (SCC) - SÍ seleccionado por defecto
      'I5080': true,   // Proteina s-100 - SÍ seleccionado por defecto
      'I5090': true,   // NSE - SÍ seleccionado por defecto
      'B8120': true,   // CYFRA 21-1 - SÍ seleccionado por defecto
      'D1271': true,   // CA 72-4 - SÍ seleccionado por defecto
      'B7900': true,   // Alfa-feto (AFP) - SÍ seleccionado por defecto
      'B8160': true,   // Péptido liberador gastrina (ProGRP) - SÍ seleccionado por defecto
      'D1760': true,   // β-HCG - SÍ seleccionado por defecto
      // Biomarcadores específicos masculinos
      'B5830': true,   // PSA total - SÍ seleccionado por defecto
      'B5840': true,   // PSA libre - SÍ seleccionado por defecto
      // Biomarcadores específicos femeninos
      'B8110': true    // Proteína Epididimal Humana 4 (HE4) - SÍ seleccionado por defecto
    }
  }
};

// ================================
// MAPEO DE CÓDIGOS A VARIABLES DEL CONTEXTO
// ================================

/**
 * Mapeo de códigos de biomarcadores a nombres de variables del contexto
 * Facilita la integración con el sistema actual de BiomarkerSelectionContext
 * NOTA: Para códigos que aparecen en múltiples contextos, usar el addOnId para diferenciación
 */
export const BIOMARKER_CODE_TO_STATE_MAP = {
  
  // Cardiovascular
  'B7700': 'selectedLpA',
  'B7790': 'selectedIL6',
  'I2081': 'selectedTNFα',
  
  // IV & Nutrients
  'T1720': 'selectedVitaminaK1',
  'T2590': 'selectedAcidosGrasos', // Para IV Nutrients
  
  // Immunity
  'B7750': 'selectedHelicobacter',
  
  // Digestion
  'M1190': 'selectedOvaParasitesDigestivo',
  'P3031': 'selectedIntolerancia',
  
  // Gut Gate
  'AB002': 'selectedMetaboloma',
  
  // BioAge
  'G1465': 'selectedLongitudTelomerica'
};

/**
 * Mapeo específico por contexto para biomarcadores que aparecen en múltiples add-ons
 * Formato: { addOnId: { code: stateVariable } }
 */
export const CONTEXT_SPECIFIC_STATE_MAP = {
  genome: {
    'OG002': 'selectedMyPharmaGenome',
    'OG003': 'selectedMyDetoxGenome',
    'OG004': 'selectedMyDietGenome',
    'OG005': 'selectedMyAgeingGenome',
    'OG006': 'selectedMySuplementsGenome'
  },
  hormonas: {
    'B5350': 'selectedEstradiolHormonas',
    'B5980': 'selectedProlactinaHormonas', 
    'B5800': 'selectedLHHormonas',
    'B5380': 'selectedFSHHormonas',
    'B5420': 'selectedHormonaCrecimientoHormonas',
    'B6480': 'selectedTestosteronaBiodispHormonas',
    'D0601': 'selectedTestosteronaLibreHormonas',
    'D0850': 'selectedDHTHormonas',
    // Biomarcadores específicos femeninos
    'B5932': 'selectedProgesterona',
    'B6160': 'selectedTestosteronaTotal',
    'D0181': 'selected17OHProgesterona',
    'D0780': 'selectedEstrona'
  },
  antioxidantes: {
    'T0811': 'selectedRetinol',
    'T1191': 'selectedAlfaTocoferol',
    'T2841': 'selectedGammaTocoferol', 
    'T1200': 'selectedBetaCaroteno',
    'T2830': 'selectedCoenzimaQ10'
  },
  endocrino: {
    'B5350': 'selectedEstradiolEndocrino',
    'B5980': 'selectedProlactinaEndocrino',
    'B5800': 'selectedLHEndocrino', 
    'B5380': 'selectedFSHEndocrino',
    'H0020': 'selectedVSGEndocrino',
    'D0560': 'selectedVitaminaD125OHEndocrino',
    'B6030': 'selectedIGF1Endocrino',
    'B6010': 'selectedIGFBP3Endocrino',
    'I6740': 'selectedACTHEndocrino'
  },
  inflammation: {
    'H0020': 'selectedVSGInflammation',
    'B7790': 'selectedIL6Inflammation',
    'I2081': 'selectedTNFαInflammation'
  },
  oxidative_cell: {
    'B7121': 'selectedGlutationReductasa',
    'B3015': 'selectedGlutationPeroxidasa',
    'B3041': 'selectedG6PD',
    'T3920': 'selectedSelenio',
    'T1061': 'selectedVitaminaCOxidativeCell'
  },
  cardiovascular: {
    'B0110': 'selectedLDHCardiovascular',
    'B0750': 'selectedAcidoLacticoCardiovascular',
    'B2120': 'selectedCKMBCardiovascular',
    'B0220': 'selectedCPKTotalCardiovascular',
    'B1900': 'selectedLDLDirectoCardiovascular',
    'B0190': 'selectedVLDLCardiovascular',
    'B7700': 'selectedLpACardiovascular',
    'I5047': 'selectedCistatinaCardiovascular'
  },
  iv_nutrients: {
    'T0500': 'selectedCromoIVNutrients',
    'B8060': 'selectedCobreIVNutrients',
    'B0270': 'selectedOsmolalidadIVNutrients',
    'T1720': 'selectedVitaminaK1IVNutrients',
    'T1061': 'selectedVitaminaCIVNutrients'
  },
  metals: {
    'T0302': 'selectedMercurioHeavyMetals',
    'T0150': 'selectedPlomoHeavyMetals',
    'T0960': 'selectedArsenicoHeavyMetals',
    'T0480': 'selectedCadmioHeavyMetals'
  },
  digestion: {
    'T2590': 'selectedUrinalisisDigestivo' // Diferente significado que en iv_nutrients
  },
  immunity: {
    'I0141': 'selectedANAImmunity',
    'I5072': 'selectedAntiCCPImmunity',
    'B6321': 'selectedAntiTiroglobulinaImmunity',
    'B6300': 'selectedAntiTPOImmunity',
    'B3130': 'selectedFactorReumatoideImmunity',
    'B7750': 'selectedHelicobacterImmunity'
  },
  gut_gate: {
    'M1190': 'selectedParasitosGutGate',
    'P3031': 'selectedPanelAlimentarioGutGate',
    'AB001': 'selectedMicrobiomaGutGate',
    'AB002': 'selectedMetabolomaGutGate'
  },
  bone_mineral: {
    'D0560': 'selectedCalcitriolBoneMineral',
    'D1111': 'selectedALPOseaBoneMineral',
    'I3291': 'selectedCTXBoneMineral',
    'T1572': 'selectedCalcioIonicoBoneMineral'
  },
  coagulation: {
    'H0050': 'selectedFibrinogenoCoagulation',
    'H0850': 'selectedAPTTCoagulation',
    'H0860': 'selectedINRCoagulation'
  },
  cancer: {
    // Biomarcadores comunes
    'M0010': 'selectedSangreOcultaCancer',
    '6897': 'selectedUrinalisisCancer',
    'B5110': 'selectedCEACancer',
    'B5080': 'selectedCA125Cancer',
    'B5090': 'selectedCA153Cancer',
    'B5100': 'selectedCA199Cancer',
    'B8130': 'selectedSCCCancer',
    'I5080': 'selectedProteina100Cancer',
    'I5090': 'selectedNSECancer',
    'B8120': 'selectedCYFRA21Cancer',
    'D1271': 'selectedCA724Cancer',
    'B7900': 'selectedAFPCancer',
    'B8160': 'selectedProGRPCancer',
    'D1760': 'selectedBetaHCGCancer',
    // Biomarcadores específicos masculinos
    'B5830': 'selectedPSATotalCancer',
    'B5840': 'selectedPSALibreCancer',
    // Biomarcadores específicos femeninos
    'B8110': 'selectedHE4Cancer'
  },
  bioage: {
    'OG001': 'selectedMyEpiAgeingBioAge',
    'G1465': 'selectedLongitudTelomericaBioAge',
    'B3340': 'selectedEspermiogramaBioAge',
    'D1001': 'selectedAMHBioAge'
  }
};

// ================================
// FUNCIONES UTILITARIAS SIMPLIFICADAS
// ================================

/**
 * Obtiene la configuración de biomarcadores para un add-on específico
 * @param {string} addOnId - ID del add-on
 * @returns {Object} Objeto con configuración de biomarcadores
 */
export const getBiomarkersConfig = (addOnId) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) {
    console.warn(`⚠️ No se encontró configuración de biomarcadores para ${addOnId}`);
    return { biomarkers: {} };
  }
  return config;
};

/**
 * Obtiene el estado por defecto de un biomarcador
 * @param {string} addOnId - ID del add-on
 * @param {string} biomarkerCode - Código del biomarcador
 * @returns {boolean} Estado por defecto (true/false)
 */
export const getDefaultBiomarkerState = (addOnId, biomarkerCode) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config || !config.biomarkers) {
    return false; // Por defecto no seleccionado si no hay configuración
  }
  return config.biomarkers[biomarkerCode] || false;
};

/**
 * Verifica si un biomarcador existe en un add-on específico
 * @param {string} addOnId - ID del add-on
 * @param {string} biomarkerCode - Código del biomarcador
 * @returns {boolean} true si existe, false si no existe
 */
export const biomarkerExistsInAddOn = (addOnId, biomarkerCode) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) return false;
  
  return Object.keys(config.biomarkers || {}).includes(biomarkerCode);
};

/**
 * Obtiene la variable de estado correspondiente a un biomarcador
 * @param {string} addOnId - ID del add-on para contexto específico
 * @param {string} biomarkerCode - Código del biomarcador
 * @returns {string|null} Nombre de la variable de estado o null si no existe
 */
export const getBiomarkerStateVariable = (addOnId, biomarkerCode) => {
  // Primero verificar mapeo específico por contexto
  if (CONTEXT_SPECIFIC_STATE_MAP[addOnId] && CONTEXT_SPECIFIC_STATE_MAP[addOnId][biomarkerCode]) {
    return CONTEXT_SPECIFIC_STATE_MAP[addOnId][biomarkerCode];
  }
  
  // Fallback al mapeo general
  return BIOMARKER_CODE_TO_STATE_MAP[biomarkerCode] || null;
};

/**
 * Obtiene todos los biomarcadores activos para un add-on
 * @param {string} addOnId - ID del add-on
 * @param {Object} selectedStates - Estados actuales de selección del contexto
 * @returns {Array} Array de códigos de biomarcadores activos
 */
export const getActiveBiomarkers = (addOnId, selectedStates = {}) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) return [];
  
  const activeBiomarkers = [];
  
  // Añadir biomarcadores que están seleccionados
  Object.entries(config.biomarkers || {}).forEach(([code, defaultState]) => {
    const stateVariable = getBiomarkerStateVariable(addOnId, code);
    const isSelected = stateVariable ? selectedStates[stateVariable] : defaultState;
    
    if (isSelected) {
      activeBiomarkers.push(code);
    }
  });
  
  return activeBiomarkers;
};

/**
 * Calcula el conteo dinámico de biomarcadores para un add-on
 * @param {string} addOnId - ID del add-on
 * @param {Object} selectedStates - Estados de selección del contexto
 * @param {string} gender - Género para add-ons con diferencias por género
 * @returns {number} Número total de biomarcadores activos
 */
export const calculateDynamicBiomarkerCount = (addOnId, selectedStates = {}, gender = 'both') => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) {
    // Fallback: devolver 0 para add-ons sin configuración
    console.warn(`⚠️ Add-on ${addOnId} no tiene configuración de biomarcadores`);
    return 0;
  }
  
  const activeBiomarkers = getActiveBiomarkers(addOnId, selectedStates);
  
  // Para add-ons con diferencias por género, aplicar ajustes específicos
  if (['hormonas', 'cancer', 'bioage'].includes(addOnId)) {
    // Aplicar lógica específica por género si es necesario
    return activeBiomarkers.length;
  }
  
  return activeBiomarkers.length;
};

/**
 * Obtiene un resumen de los biomarcadores seleccionados manualmente
 * Solo incluye aquellos que están por defecto en FALSE pero el usuario los seleccionó
 * @param {Object} selectedStates - Estados actuales del contexto
 * @returns {Array} Array de nombres legibles de biomarcadores añadidos manualmente
 */
export const getManuallySelectedBiomarkers = (selectedStates = {}) => {
  const manuallySelected = [];
  
  // Iterar por todos los add-ons y sus biomarcadores
  Object.entries(ADD_ON_BIOMARKERS_CONFIG).forEach(([addOnId, config]) => {
    Object.entries(config.biomarkers || {}).forEach(([code, defaultState]) => {
      // Solo incluir si está por defecto en FALSE pero está seleccionado
      if (!defaultState) {
        const stateVariable = getBiomarkerStateVariable(addOnId, code);
        if (stateVariable && selectedStates[stateVariable]) {
          // Mapear código a nombre legible
          const readableName = getBiomarkerReadableName(code);
          manuallySelected.push(readableName);
        }
      }
    });
  });
  
  return manuallySelected;
};

/**
 * Obtiene todos los biomarcadores disponibles para un add-on
 * @param {string} addOnId - ID del add-on
 * @returns {Array} Array de códigos de biomarcadores disponibles
 */
export const getAllAvailableBiomarkers = (addOnId) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) return [];
  
  return Object.keys(config.biomarkers || {});
};

/**
 * Obtiene el valor inicial para un useState basado en la configuración centralizada
 * @param {string} stateVariable - Nombre de la variable de estado (ej: 'selectedMyPharma')
 * @returns {boolean} Estado inicial basado en la configuración
 */
export const getInitialStateValue = (stateVariable) => {
  // Buscar en todas las configuraciones de add-ons
  for (const [addOnId, config] of Object.entries(ADD_ON_BIOMARKERS_CONFIG)) {
    for (const [code, defaultState] of Object.entries(config.biomarkers || {})) {
      const mappedVariable = getBiomarkerStateVariable(addOnId, code);
      if (mappedVariable === stateVariable) {
        return defaultState;
      }
    }
  }
  
  // Si no se encuentra, devolver false como valor por defecto seguro
  return false;
};

/**
 * Convierte código de biomarcador a nombre legible
 * @param {string} code - Código del biomarcador
 * @returns {string} Nombre legible
 */
const getBiomarkerReadableName = (code) => {
  // Mapeo manual de códigos principales a nombres legibles
  const codeToNameMap = {
    'OG002': 'MyPharma',
    'OG003': 'MyDetox',
    'OG004': 'MyDiet',
    'OG005': 'MyAgeing',
    'OG006': 'MySuplements',
    'B7700': 'Lp(a) *',
    'B7790': 'IL-6',
    'I2081': 'TNF-α',
    'T1720': 'Vitamina K1',
    'T2590': 'Ácidos grasos %',
    'T1061': 'Vitamina C',
    'B7750': 'Helicobacter pylori IgG An',
    'M1190': 'Ova & Parasites stool',
    'P3031': 'Intolerancia Alimentaria 200',
    'AB002': 'Metaboloma (orina/heces)',
    'G1465': 'Longitud telomérica',
    'H0020': 'VSG (Endocrino)'
  };
  
  return codeToNameMap[code] || code;
};

/**
 * Función de migración para integrar con el sistema actual
 * Convierte el conteo actual del contexto a la nueva estructura
 * @param {string} addOnId - ID del add-on
 * @param {Object} selectedStates - Estados actuales del contexto
 * @param {string} gender - Género
 * @returns {number} Conteo de biomarcadores (compatible con getActualBiomarkerCount)
 */
export const migrateToNewBiomarkerSystem = (addOnId, selectedStates = {}, gender = 'both') => {
  // Si el add-on tiene configuración, usar el nuevo sistema
  if (ADD_ON_BIOMARKERS_CONFIG[addOnId]) {
    return calculateDynamicBiomarkerCount(addOnId, selectedStates, gender);
  }
  
  // Fallback al sistema actual para add-ons sin migrar
  return 0;
};

// ================================
// INFORMACIÓN DE DEBUGGING
// ================================

export const BIOMARKERS_SYSTEM_INFO = {
  version: '2.0.0',
  architecture: 'simplified_selectable_biomarkers',
  compatible_with: 'BiomarkerSelectionContext.js v2.x',
  total_add_ons_configured: Object.keys(ADD_ON_BIOMARKERS_CONFIG).length,
  migration_status: 'simplified_ready',
  philosophy: 'all_biomarkers_selectable_with_default_states'
};

console.log('✅ Sistema simplificado de biomarcadores seleccionables cargado:', BIOMARKERS_SYSTEM_INFO); 