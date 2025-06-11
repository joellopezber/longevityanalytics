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
      'OG002': false,   // MyPharma - Solo se suma si se selecciona manualmente
      'OG003': false,   // MyDetox - Solo se suma si se selecciona manualmente  
      'OG004': false,   // MyDiet - Solo se suma si se selecciona manualmente
      'OG005': false,   // MyAgeing - Solo se suma si se selecciona manualmente
      'OG006': false    // MySuplements - Solo se suma si se selecciona manualmente
    }
  },
  hormonas: {
    biomarkers: {
      // ============================================
      // BIOMARCADORES OPCIONALES (precio base = 0€)
      // ============================================
      'B5350': false,   // Estradiol - Solo se suma si se selecciona manualmente
      'B5380': false,   // FSH - Solo se suma si se selecciona manualmente
      'B5420': false,   // Hormona de crecimiento (hGH) - Solo se suma si se selecciona manualmente
      'B5800': false,   // LH - Solo se suma si se selecciona manualmente
      'B5980': false,   // Prolactina - Solo se suma si se selecciona manualmente
      
      // ============================================
      // BIOMARCADORES ESPECÍFICOS POR GÉNERO (OPCIONALES)
      // ============================================
      'B6480': false,   // Testosterona biodisp. - Solo se suma si se selecciona manualmente
      'D0601': false,   // Testosterona libre - Solo se suma si se selecciona manualmente
      'D0850': false,   // DHT - Solo se suma si se selecciona manualmente
      
      // Biomarcadores específicos femeninos (OPCIONALES)
      'B5932': false,   // Progesterona - Solo se suma si se selecciona manualmente
      'B6160': false,   // Testosterona total - Solo se suma si se selecciona manualmente
      'D0181': false,   // 17-OH-Progesterona - Solo se suma si se selecciona manualmente
      'D0780': false    // Estrona - Solo se suma si se selecciona manualmente
    }
  },
  endocrino: {
    biomarkers: {
      'B6030': false,   // IGF-1 - Solo se suma si se selecciona manualmente
      'B6010': false,   // IGFBP-3 - Solo se suma si se selecciona manualmente
      'I6740': false    // ACTH - Solo se suma si se selecciona manualmente
    }
  },
  cardiovascular: {
    biomarkers: {
      'B0110': false,   // LDH - Solo se suma si se selecciona manualmente
      'B0750': false,   // Ácido láctico - Solo se suma si se selecciona manualmente
      'B2120': false,   // CK-MB - Solo se suma si se selecciona manualmente
      'B0220': false,   // CPK total - Solo se suma si se selecciona manualmente
      'B1900': false,   // LDL directo - Solo se suma si se selecciona manualmente
      'B0190': false,   // VLDL - Solo se suma si se selecciona manualmente
      'B7700': false,   // Lp(a) * - Solo se suma si se selecciona manualmente
      'I5047': false    // Cistatina-C - Solo se suma si se selecciona manualmente
    }
  },
  antioxidantes: {
    biomarkers: {
      'T0811': false,   // Retinol (Vitamina A) - Solo se suma si se selecciona manualmente
      'T1191': false,   // Alfa-tocoferol (Vit E) - Solo se suma si se selecciona manualmente
      'T2841': false,   // Gamma-tocoferol (Vit E) - Solo se suma si se selecciona manualmente
      'T1200': false,   // Beta-caroteno - Solo se suma si se selecciona manualmente
      'T2830': false    // Coenzima Q10 - Solo se suma si se selecciona manualmente
    }
  },
  iv_nutrients: {
    biomarkers: {
      'T0500': false,   // Cromo (Oligoelemento) - Solo se suma si se selecciona manualmente
      'B8060': false,   // Cobre - Solo se suma si se selecciona manualmente
      'B0270': false,   // Osmolalidad sérica - Solo se suma si se selecciona manualmente
      'T1720': false,   // Vitamina K1 - Solo se suma si se selecciona manualmente
      'T1061': false    // Vitamina C - Solo se suma si se selecciona manualmente
    }
  },
  metals: {
    biomarkers: {
      'T0302': false,   // Mercurio - Solo se suma si se selecciona manualmente
      'T0150': false,   // Plomo - Solo se suma si se selecciona manualmente
      'T0960': false,   // Arsénico - Solo se suma si se selecciona manualmente
      'T0480': false    // Cadmio - Solo se suma si se selecciona manualmente
    }
  },
  oxidative_cell: {
    biomarkers: {
      'B7121': false,   // Glutatión reductasa - Solo se suma si se selecciona manualmente
      'B3015': false,   // Glutatión peroxidasa - Solo se suma si se selecciona manualmente
      'B3041': false,   // G6PD - Solo se suma si se selecciona manualmente
      'T3920': false    // Selenio - Solo se suma si se selecciona manualmente
    }
  },
  inflammation: {
    biomarkers: {
      'H0020': false,   // VSG - Solo se suma si se selecciona manualmente
      'B7790': false,   // IL-6 - Solo se suma si se selecciona manualmente
      'I2081': false    // TNF-α - Solo se suma si se selecciona manualmente
    }
  },
  immunity: {
    biomarkers: {
      'I0141': false,   // ANA (Autoinmunidad) - Solo se suma si se selecciona manualmente
      'I5072': false,   // Anti-CCP (Artritis) - Solo se suma si se selecciona manualmente
      'B6321': false,   // Anti-tiroglobulina (Tiroides) - Solo se suma si se selecciona manualmente
      'B6300': false,   // Anti-TPO (Tiroides) - Solo se suma si se selecciona manualmente
      'B3130': false,   // Factor reumatoide - Solo se suma si se selecciona manualmente
      'B7750': false    // H. pylori IgG (Infección) - Solo se suma si se selecciona manualmente
    }
  },
  digestion: {
    biomarkers: {
      'T2590': false,   // Urianálisis + sedimento - Solo se suma si se selecciona manualmente
      'B1980': false,   // Amilasa - Solo se suma si se selecciona manualmente
      'B0350': false,   // Lipasa - Solo se suma si se selecciona manualmente
      'B0260': false    // Elastasa - Solo se suma si se selecciona manualmente
    }
  },
  gut_gate: {
    biomarkers: {
      'M1190': false,   // Parásitos en heces (Parasitología) - Solo se suma si se selecciona manualmente
      'P3031': false,   // Intolerancia alimentaria (Intolerancia Igg) - Solo se suma si se selecciona manualmente
      'AB001': false,   // Microbioma intestinal (Microbiota) - Solo se suma si se selecciona manualmente
      'AB002': false    // Metaboloma (Microbiota) - Solo se suma si se selecciona manualmente
    }
  },
  bone_mineral: {
    biomarkers: {
      'D0560': false,   // Calcitriol (Vit D [1,25-OH]) - Solo se suma si se selecciona manualmente
      'D1111': false,   // ALP ósea - Solo se suma si se selecciona manualmente
      'I3291': false,   // CTX - Solo se suma si se selecciona manualmente
      'T1572': false    // Calcio iónico - Solo se suma si se selecciona manualmente
    }
  },
  coagulation: {
    biomarkers: {
      'H0050': false,   // Fibrinógeno - Solo se suma si se selecciona manualmente
      'H0850': false,   // Cefalina-APTT - Solo se suma si se selecciona manualmente
      'H0860': false    // INR (Protrombina) - Solo se suma si se selecciona manualmente
    }
  },
  bioage: {
    biomarkers: {
      'OG001': false,   // MyEpiAgeing* - Solo se suma si se selecciona manualmente
      'G1465': false,   // Longitud telomérica - Solo se suma si se selecciona manualmente
      'B3340': false,   // Espermiograma - Solo se suma si se selecciona manualmente
      'D1001': false    // AMH - Solo se suma si se selecciona manualmente
    }
  },
  cancer: {
    biomarkers: {
      // Biomarcadores comunes para ambos géneros
      'M0010': false,   // Sangre oculta en heces - Solo se suma si se selecciona manualmente
      '6897': false,    // Urianálisis + sedimento - Solo se suma si se selecciona manualmente
      'B5110': false,   // CEA - Solo se suma si se selecciona manualmente
      'B5080': false,   // CA 125 - Solo se suma si se selecciona manualmente
      'B5090': false,   // CA 15.3 - Solo se suma si se selecciona manualmente
      'B5100': false,   // CA 19-9 - Solo se suma si se selecciona manualmente
      'B8130': false,   // Células escamosas Ag (SCC) - Solo se suma si se selecciona manualmente
      'I5080': false,   // Proteina s-100 - Solo se suma si se selecciona manualmente
      'I5090': false,   // NSE - Solo se suma si se selecciona manualmente
      'B8120': false,   // CYFRA 21-1 - Solo se suma si se selecciona manualmente
      'D1271': false,   // CA 72-4 - Solo se suma si se selecciona manualmente
      'B7900': false,   // Alfa-feto (AFP) - Solo se suma si se selecciona manualmente
      'B8160': false,   // Péptido liberador gastrina (ProGRP) - Solo se suma si se selecciona manualmente
      'D1760': false,   // β-HCG - Solo se suma si se selecciona manualmente
      // Biomarcadores específicos masculinos
      'B5830': false,   // PSA total - Solo se suma si se selecciona manualmente
      'B5840': false,   // PSA libre - Solo se suma si se selecciona manualmente
      // Biomarcadores específicos femeninos
      'B8110': false    // Proteína Epididimal Humana 4 (HE4) - Solo se suma si se selecciona manualmente
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
    'T2590': 'selectedOmega3Digestivo',
    'B1980': 'selectedLipasaDigestivo',
    'B0350': 'selectedAmilasaDigestivo',
    'B0260': 'selectedBilirrubinaDirectaDigestivo'
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
  if (!config) {
    console.warn(`⚠️ No hay configuración para add-on: ${addOnId}`);
    return [];
  }
  
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