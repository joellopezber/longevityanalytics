/**
 * PERFILES DE PAQUETES
 * Definición de los paquetes disponibles y sus biomarcadores incluidos
 */

export const PROFILES = {
  essential: {
    id: 'essential',
    name: 'Essential',
    description: 'Paquete básico de longevidad con biomarcadores fundamentales',
    targetAudience: 'Personas que buscan un análisis básico completo de salud y longevidad',
    biomarkersCommon: [
      'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070', 'B0080', 'B0100',
      'B0120', 'B0130', 'B0170', 'B0180', 'B0200', 'B0240', 'B0250', 'B1260', 'B1540', 'B1600',
      'B1970', 'B3100', 'B3110', 'B3170', 'B3210', 'B5120', 'B5290', 'B5370', 'B5410', 'B5590',
      'B5600', 'B5850', 'B6020', 'B6040', 'B6070', 'B6130', 'B6180', 'B6190', 'B6510', 'B7260',
      'B8050', 'H0000', 'H1420'
    ],
    biomarkersMaleOnly: ['B6160'],
    biomarkersFemaleOnly: [],
    basePrice: null, // Calculado dinámicamente
    categories: [
      'Metabolismo glucídico',
      'Perfil lipídico', 
      'Función renal',
      'Función hepática',
      'Tiroides',
      'Vitaminas esenciales',
      'Mineral óseo',
      'Resistencia insulínica'
    ]
  },

  performance: {
    id: 'performance',
    name: 'Performance',
    description: 'Enfocado en rendimiento deportivo y optimización física',
    targetAudience: 'Atletas y personas activas que buscan optimizar su rendimiento',
    biomarkersCommon: [
      'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070', 'B0080', 'B0100',
      'B0110', 'B0120', 'B0130', 'B0170', 'B0180', 'B0200', 'B0220', 'B0240', 'B0250', 'B0750',
      'B1260', 'B1540', 'B1600', 'B1900', 'B1970', 'B2120', 'B3100', 'B3110', 'B3170', 'B3210',
      'B5120', 'B5290', 'B5370', 'B5410', 'B5420', 'B5590', 'B5600', 'B5850', 'B6020', 'B6030',
      'B6040', 'B6070', 'B6130', 'B6180', 'B6190', 'B6510', 'B7260', 'B7790', 'B8050', 'H0000',
      'H1420', 'I2081', 'T1061', 'T1191', 'T2830', 'T3920'
    ],
    biomarkersMaleOnly: ['B6160', 'D0601'],
    biomarkersFemaleOnly: ['B5350', 'B5380', 'B5800', 'B5932'],
    basePrice: null,
    categories: [
      'Rendimiento muscular',
      'Inflamación',
      'Hormonas deportivas',
      'Energía mitocondrial',
      'Antioxidantes',
      'Cardio-metabólico'
    ]
  },

  core: {
    id: 'core',
    name: 'Core',
    description: 'Paquete intermedio avanzado con análisis hormonal completo',
    targetAudience: 'Personas que buscan un análisis integral de salud hormonal y longevidad',
    biomarkersCommon: [
      'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070', 'B0080', 'B0100',
      'B0110', 'B0120', 'B0130', 'B0170', 'B0180', 'B0190', 'B0200', 'B0240', 'B0250', 'B0260',
      'B0350', 'B1260', 'B1540', 'B1600', 'B1900', 'B1970', 'B1980', 'B3015', 'B3041', 'B3100',
      'B3110', 'B3170', 'B3210', 'B5120', 'B5290', 'B5350', 'B5370', 'B5380', 'B5410', 'B5420',
      'B5590', 'B5600', 'B5800', 'B5850', 'B5980', 'B6010', 'B6020', 'B6030', 'B6040', 'B6070',
      'B6130', 'B6180', 'B6190', 'B6510', 'B7121', 'B7260', 'B7790', 'B8050', 'H0000', 'H0020',
      'H1420', 'I2081', 'I5047', 'I6740', 'OG001', 'T0500', 'T0811', 'T1061', 'T1191', 'T2590',
      'T2830', 'T3920'
    ],
    biomarkersMaleOnly: ['B6160', 'B6480', 'D0601', 'D0850'],
    biomarkersFemaleOnly: ['B5932', 'D0181', 'D0780'],
    basePrice: null,
    categories: [
      'Panel hormonal completo',
      'Epigenética básica',
      'Estrés oxidativo',
      'Perfil lipídico avanzado',
      'Inflamación sistémica'
    ]
  },

  advanced: {
    id: 'advanced',
    name: 'Advanced',
    description: 'Paquete más completo con análisis genético y marcadores tumorales',
    targetAudience: 'Personas que buscan el análisis más exhaustivo disponible',
    biomarkersCommon: [
      '6897', 'AB001', 'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070',
      'B0080', 'B0100', 'B0110', 'B0120', 'B0130', 'B0170', 'B0180', 'B0190', 'B0200', 'B0220',
      'B0240', 'B0250', 'B0260', 'B0270', 'B0350', 'B0750', 'B1260', 'B1540', 'B1600', 'B1900',
      'B1970', 'B1980', 'B2120', 'B3015', 'B3041', 'B3100', 'B3110', 'B3130', 'B3170', 'B3210',
      'B5080', 'B5090', 'B5100', 'B5110', 'B5120', 'B5290', 'B5350', 'B5370', 'B5380', 'B5410',
      'B5420', 'B5590', 'B5600', 'B5800', 'B5850', 'B5980', 'B6010', 'B6020', 'B6030', 'B6040',
      'B6070', 'B6130', 'B6180', 'B6190', 'B6300', 'B6321', 'B6510', 'B7121', 'B7260', 'B7700',
      'B7750', 'B7790', 'B7900', 'B8050', 'B8060', 'B8120', 'B8130', 'B8160', 'D0560', 'D1111',
      'D1271', 'D1760', 'H0000', 'H0020', 'H0050', 'H0850', 'H0860', 'H1420', 'I0141', 'I2081',
      'I3291', 'I5047', 'I5072', 'I5080', 'I5090', 'I6740', 'M0010', 'M1190', 'OG001', 'T0150',
      'T0302', 'T0480', 'T0500', 'T0811', 'T0960', 'T1061', 'T1191', 'T1200', 'T1572', 'T1720',
      'T2590', 'T2830', 'T2841', 'T3920'
    ],
    biomarkersMaleOnly: ['B5830', 'B5840', 'B6160', 'B6480', 'D0601', 'D0850'],
    biomarkersFemaleOnly: ['B5932', 'B8110', 'D0181', 'D0780', 'D1001'],
    basePrice: null,
    categories: [
      'Marcadores tumorales',
      'Metales pesados',
      'Microbioma intestinal',
      'Epigenética avanzada',
      'Perfil autoinmune',
      'Metabolismo óseo completo',
      'Coagulación avanzada'
    ]
  }
};

/**
 * Obtiene todos los biomarcadores para un perfil específico según el género
 * @param {string} profileId - ID del perfil
 * @param {string} gender - 'male', 'female' o 'both'
 * @returns {string[]} Array de códigos de biomarcadores
 */
export const getBiomarkersForProfile = (profileId, gender = 'both') => {
  const profile = PROFILES[profileId];
  if (!profile) return [];
  
  let biomarkers = [...profile.biomarkersCommon];
  
  if (gender === 'male') {
    biomarkers = [...biomarkers, ...profile.biomarkersMaleOnly];
  } else if (gender === 'female') {
    biomarkers = [...biomarkers, ...profile.biomarkersFemaleOnly];
  } else if (gender === 'both') {
    biomarkers = [...biomarkers, ...profile.biomarkersMaleOnly, ...profile.biomarkersFemaleOnly];
  }
  
  return biomarkers;
};

export default PROFILES; 