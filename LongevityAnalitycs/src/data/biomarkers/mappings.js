/**
 * mappings.js
 * Mapeos entre códigos de biomarcadores y variables de estado del contexto
 * BLOQUE 2: Mapeos y relaciones - sin lógica de negocio
 */

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

/**
 * Convierte código de biomarcador a nombre legible
 * @param {string} code - Código del biomarcador
 * @returns {string} Nombre legible
 */
export const CODE_TO_READABLE_NAME_MAP = {
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

console.log('✅ Mapeos de biomarcadores cargados:', {
  generalMappings: Object.keys(BIOMARKER_CODE_TO_STATE_MAP).length,
  contextSpecificMappings: Object.keys(CONTEXT_SPECIFIC_STATE_MAP).length,
  readableNames: Object.keys(CODE_TO_READABLE_NAME_MAP).length
}); 