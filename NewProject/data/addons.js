/**
 * ADD-ONS DISPONIBLES
 * Extensiones modulares que se pueden agregar a cualquier paquete base
 */

export const ADDONS = {
  hormonas: {
    id: 'hormonas',
    name: 'Panel Hormonal Completo',
    description: 'Análisis exhaustivo del sistema endocrino y hormonas reproductivas',
    category: 'Hormonal',
    biomarkersCommon: ['B5350', 'B5380', 'B5420', 'B5800', 'B5980'],
    biomarkersMaleOnly: ['B6480', 'D0601', 'D0850'],
    biomarkersFemaleOnly: ['B5932', 'B6160', 'D0181', 'D0780'],
    basePrice: null,
    benefits: [
      'Optimización hormonal personalizada',
      'Detección temprana de desequilibrios',
      'Mejora del rendimiento y bienestar'
    ]
  },

  endocrino: {
    id: 'endocrino',
    name: 'Eje Endocrino Avanzado', 
    description: 'Evaluación del eje hipotalámico-pituitario y factores de crecimiento',
    category: 'Endocrinología',
    biomarkersCommon: ['B6030', 'B6010', 'I6740'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Evaluación del envejecimiento hormonal',
      'Optimización de GH/IGF-1',
      'Análisis de estrés suprarrenal'
    ]
  },

  antioxidantes: {
    id: 'antioxidantes',
    name: 'Perfil Antioxidante Completo',
    description: 'Vitaminas liposolubles y antioxidantes esenciales',
    category: 'Antioxidantes',
    biomarkersCommon: ['T0811', 'T1191', 'T2841', 'T1200', 'T2830'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Prevención del daño oxidativo',
      'Optimización de suplementación',
      'Protección cardiovascular'
    ]
  },

  estres_oxidativo: {
    id: 'estres_oxidativo',
    name: 'Estrés Oxidativo y Defensa',
    description: 'Sistemas enzimáticos antioxidantes y capacidad de defensa celular',
    category: 'Estrés Oxidativo',
    biomarkersCommon: ['B7121', 'B3015', 'B3041', 'T3920'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Evaluación del daño celular',
      'Capacidad antioxidante endógena',
      'Estrategias anti-envejecimiento'
    ]
  },

  inflamacion: {
    id: 'inflamacion',
    name: 'Inflamación Sistémica',
    description: 'Marcadores de inflamación crónica e inflamm-aging',
    category: 'Inflamación',
    biomarkersCommon: ['H0020', 'B7790', 'I2081'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Detección de inflamm-aging',
      'Guía para terapias anti-inflamatorias',
      'Prevención cardiovascular'
    ]
  },

  cardiovascular: {
    id: 'cardiovascular',
    name: 'Riesgo Cardiovascular Avanzado',
    description: 'Marcadores especializados de riesgo cardiovascular y cardiopatía',
    category: 'Cardiovascular',
    biomarkersCommon: ['B0110', 'B0750', 'B2120', 'B0220', 'B1900', 'B0190', 'B7700', 'I5047'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Predicción de eventos cardiovasculares',
      'Estratificación de riesgo precisa',
      'Monitoreo de terapias cardíacas'
    ]
  },

  iv_nutrients: {
    id: 'iv_nutrients',
    name: 'Nutrientes IV y Minerales',
    description: 'Micronutrientes esenciales para terapias intravenosas',
    category: 'Nutrición',
    biomarkersCommon: ['T0500', 'T1720', 'T1061', 'B8060', 'B0270'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Personalización de IV drips',
      'Optimización nutricional',
      'Corrección de deficiencias'
    ]
  },

  metals: {
    id: 'metals',
    name: 'Metales Pesados',
    description: 'Detección de toxicidad por metales pesados',
    category: 'Toxicología',
    biomarkersCommon: ['T0302', 'T0150', 'T0960', 'T0480'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Detección de intoxicación',
      'Guía para quelación',
      'Prevención neurológica'
    ]
  },

  immunity: {
    id: 'immunity',
    name: 'Sistema Inmune y Autoinmunidad',
    description: 'Evaluación del sistema inmunitario y marcadores autoinmunes',
    category: 'Inmunología',
    biomarkersCommon: ['I0141', 'I5072', 'B6321', 'B6300', 'B7750', 'B3130'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Detección de autoinmunidad',
      'Evaluación de inmunidad',
      'Prevención de enfermedades'
    ]
  },

  digestion: {
    id: 'digestion',
    name: 'Digestión y Metabolismo',
    description: 'Función digestiva y metabolismo de ácidos grasos',
    category: 'Digestivo',
    biomarkersCommon: ['T2590', 'B1980', 'B0350', 'B0260'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Optimización digestiva',
      'Perfil de ácidos grasos',
      'Salud pancreática'
    ]
  },

  coagulation: {
    id: 'coagulation',
    name: 'Coagulación Avanzada',
    description: 'Perfil completo de coagulación sanguínea',
    category: 'Hematología',
    biomarkersCommon: ['H0050', 'H0850', 'H0860'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Evaluación de trombofilia',
      'Monitoreo anticoagulación',
      'Riesgo trombótico'
    ]
  },

  bone_mineral: {
    id: 'bone_mineral',
    name: 'Metabolismo Óseo',
    description: 'Evaluación completa del metabolismo óseo y mineral',
    category: 'Metabolismo Óseo',
    biomarkersCommon: ['D0560', 'D1111', 'I3291', 'T1572'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Detección de osteoporosis',
      'Optimización de calcio/vitamina D',
      'Prevención de fracturas'
    ]
  },

  cancer: {
    id: 'cancer',
    name: 'Marcadores Tumorales',
    description: 'Panel completo de marcadores tumorales para screening',
    category: 'Oncología',
    biomarkersCommon: [
      'M0010', '6897', 'B5110', 'B5080', 'B5090', 'B5100', 'B8130', 
      'I5080', 'I5090', 'B8120', 'D1271', 'B7900', 'B8160', 'D1760'
    ],
    biomarkersMaleOnly: ['B5830', 'B5840'],
    biomarkersFemaleOnly: ['B8110'],
    basePrice: null,
    benefits: [
      'Detección temprana de cáncer',
      'Monitoreo oncológico',
      'Screening preventivo'
    ]
  },

  bioage: {
    id: 'bioage',
    name: 'Edad Biológica',
    description: 'Evaluación de la edad biológica y longevidad',
    category: 'Longevidad',
    biomarkersCommon: ['G1465', 'OG001'],
    biomarkersMaleOnly: ['B3340'],
    biomarkersFemaleOnly: ['D1001'],
    basePrice: null,
    benefits: [
      'Medición de edad biológica',
      'Evaluación de longevidad',
      'Estrategias anti-envejecimiento'
    ]
  },

  gut_gate: {
    id: 'gut_gate',
    name: 'Gut Gate - Microbioma',
    description: 'Análisis completo del microbioma intestinal',
    category: 'Microbioma',
    biomarkersCommon: ['M1190', 'P3031', 'AB001', 'AB002'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Optimización del microbioma',
      'Detección de intolerancias',
      'Salud intestinal integral'
    ]
  },

  genome: {
    id: 'genome',
    name: 'Análisis Genético Completo',
    description: 'Suite completa de análisis genéticos especializados',
    category: 'Genética',
    biomarkersCommon: ['OG002', 'OG003', 'OG004', 'OG005', 'OG006'],
    biomarkersMaleOnly: [],
    biomarkersFemaleOnly: [],
    basePrice: null,
    benefits: [
      'Farmacogenética personalizada',
      'Nutrigenética',
      'Genética deportiva',
      'Detoxificación genética'
    ]
  }
};

/**
 * Obtiene todos los biomarcadores para un add-on específico según el género
 * @param {string} addonId - ID del add-on
 * @param {string} gender - 'male', 'female' o 'both'
 * @returns {string[]} Array de códigos de biomarcadores
 */
export const getBiomarkersForAddon = (addonId, gender = 'both') => {
  const addon = ADDONS[addonId];
  if (!addon) return [];
  
  let biomarkers = [...addon.biomarkersCommon];
  
  if (gender === 'male') {
    biomarkers = [...biomarkers, ...addon.biomarkersMaleOnly];
  } else if (gender === 'female') {
    biomarkers = [...biomarkers, ...addon.biomarkersFemaleOnly];
  } else if (gender === 'both') {
    biomarkers = [...biomarkers, ...addon.biomarkersMaleOnly, ...addon.biomarkersFemaleOnly];
  }
  
  return biomarkers;
};

/**
 * Obtiene add-ons por categoría
 * @param {string} category - Categoría a filtrar
 * @returns {Object[]} Array de add-ons de la categoría
 */
export const getAddonsByCategory = (category) => {
  return Object.values(ADDONS).filter(addon => addon.category === category);
};

export default ADDONS; 