/**
 * addon-biomarkers.ts
 * Datos reales de biomarcadores para add-ons con clasificación esencial/opcional
 * Basado en el proyecto original LongevityAnalitycs
 */

export interface BiomarkerData {
  code: string;
  name: string;
  category: string;
  gender: 'both' | 'male' | 'female';
  price: number;
  essential: boolean; // true = no se puede excluir, false = opcional
}

// ================================
// HORMONAS ADD-ON
// ================================
export const HORMONAS_BIOMARKERS: BiomarkerData[] = [
  // ESENCIALES (no se pueden excluir)
  { code: 'B5350', name: 'Estradiol', category: 'Hormonas femeninas', gender: 'both', price: 25, essential: true },
  { code: 'B5380', name: 'FSH', category: 'Gonadotropina', gender: 'both', price: 22, essential: true },
  { code: 'B5420', name: 'Hormona de crecimiento (hGH)', category: 'Eje GH/IGF', gender: 'both', price: 35, essential: true },
  { code: 'B5800', name: 'LH', category: 'Gonadotropina', gender: 'both', price: 22, essential: true },
  { code: 'B5980', name: 'Prolactina', category: 'Hormonas femeninas', gender: 'both', price: 20, essential: true },
  { code: 'B5120', name: 'Cortisol', category: 'Eje HHA', gender: 'both', price: 18, essential: true },

  // OPCIONALES MASCULINOS (se pueden excluir)
  { code: 'B6480', name: 'Testosterona biodisp.', category: 'Hormona masculina', gender: 'male', price: 30, essential: false },
  { code: 'D0601', name: 'Testosterona libre', category: 'Hormona masculina', gender: 'male', price: 28, essential: false },
  { code: 'D0850', name: 'DHT', category: 'Andrógeno potente', gender: 'both', price: 32, essential: false },

  // OPCIONALES FEMENINOS (se pueden excluir)
  { code: 'B5932', name: 'Progesterona', category: 'Hormona femenina', gender: 'female', price: 24, essential: false },
  { code: 'B6160', name: 'Testosterona total', category: 'Hormona general', gender: 'both', price: 20, essential: false },
  { code: 'D0181', name: '17-OH-Progesterona', category: 'Suprarrenal', gender: 'both', price: 28, essential: false },
  { code: 'D0780', name: 'Estrona', category: 'Estrógeno menopáusico', gender: 'female', price: 26, essential: false },

  // OPCIONALES COMUNES (se pueden excluir)
  { code: 'B5290', name: 'DHEA-S', category: 'Andrógenos suprarrenales', gender: 'both', price: 22, essential: false },
  { code: 'B6020', name: 'SHBG', category: 'Transporte esteroides', gender: 'both', price: 18, essential: false },
  { code: 'B5600', name: 'Insulina basal', category: 'Resistencia insulínica', gender: 'both', price: 20, essential: false },
  { code: 'B6510', name: 'HOMA-R', category: 'Resistencia insulínica', gender: 'both', price: 15, essential: false },
  { code: 'B6030', name: 'IGF-1', category: 'Eje GH/IGF', gender: 'both', price: 30, essential: false }
];

// ================================
// CARDIOVASCULAR ADD-ON
// ================================
export const CARDIOVASCULAR_BIOMARKERS: BiomarkerData[] = [
  // ESENCIALES (no se pueden excluir)
  { code: 'B0010', name: 'Colesterol total', category: 'Perfil lipídico', gender: 'both', price: 8, essential: true },
  { code: 'B0180', name: 'LDL-C', category: 'Perfil lipídico', gender: 'both', price: 10, essential: true },
  { code: 'B0170', name: 'HDL-C', category: 'Perfil lipídico', gender: 'both', price: 10, essential: true },
  { code: 'B0040', name: 'Triglicéridos', category: 'Perfil lipídico', gender: 'both', price: 8, essential: true },
  { code: 'B3170', name: 'PCR (hsCRP)', category: 'Inflamación cardiovascular', gender: 'both', price: 15, essential: true },

  // OPCIONALES (se pueden excluir)
  { code: 'B0110', name: 'LDH', category: 'Enzima celular', gender: 'both', price: 12, essential: false },
  { code: 'B1900', name: 'LDL directo', category: 'Perfil lipídico', gender: 'both', price: 12, essential: false },
  { code: 'B2120', name: 'CK-MB', category: 'Cardíaco', gender: 'both', price: 18, essential: false },
  { code: 'B0220', name: 'CPK total', category: 'Enzima muscular', gender: 'both', price: 12, essential: false },
  { code: 'B0190', name: 'VLDL', category: 'Perfil lipídico', gender: 'both', price: 10, essential: false },
  { code: 'B7700', name: 'Lp(a)', category: 'Riesgo CV', gender: 'both', price: 25, essential: false },
  { code: 'I5047', name: 'Cistatina-C', category: 'Función renal', gender: 'both', price: 20, essential: false },
  { code: 'B3100', name: 'ApoA-I', category: 'Riesgo CV', gender: 'both', price: 22, essential: false },
  { code: 'B3110', name: 'ApoB', category: 'Riesgo CV', gender: 'both', price: 22, essential: false },
  { code: 'B5590', name: 'Homocisteína', category: 'Metionina / CV', gender: 'both', price: 18, essential: false }
];

// ================================
// ANTIOXIDANTES ADD-ON
// ================================
export const ANTIOXIDANTES_BIOMARKERS: BiomarkerData[] = [
  // ESENCIALES (no se pueden excluir)
  { code: 'T0811', name: 'Retinol (Vit A)', category: 'Antioxidante', gender: 'both', price: 20, essential: true },
  { code: 'T1191', name: 'α-Tocoferol', category: 'Antioxidante', gender: 'both', price: 22, essential: true },
  { code: 'T1061', name: 'Vitamina C', category: 'Antioxidante', gender: 'both', price: 15, essential: true },

  // OPCIONALES (se pueden excluir)
  { code: 'T2841', name: 'γ-Tocoferol', category: 'Antioxidante', gender: 'both', price: 25, essential: false },
  { code: 'T1200', name: 'β-Caroteno', category: 'Antioxidante', gender: 'both', price: 18, essential: false },
  { code: 'T2830', name: 'Coenzima Q10', category: 'Energía mitoc.', gender: 'both', price: 30, essential: false },
  { code: 'T3920', name: 'Selenio', category: 'Antioxidante', gender: 'both', price: 16, essential: false }
];

// ================================
// INFLAMACIÓN ADD-ON
// ================================
export const INFLAMACION_BIOMARKERS: BiomarkerData[] = [
  // ESENCIALES (no se pueden excluir)
  { code: 'H0020', name: 'VSG', category: 'Inflamación', gender: 'both', price: 8, essential: true },
  { code: 'B3170', name: 'PCR (hsCRP)', category: 'Inflamación cardiovascular', gender: 'both', price: 15, essential: true },

  // OPCIONALES (se pueden excluir)
  { code: 'B7790', name: 'IL-6', category: 'Inflamación', gender: 'both', price: 35, essential: false },
  { code: 'I2081', name: 'TNF-α', category: 'Inflamación', gender: 'both', price: 40, essential: false }
];

// ================================
// FUNCIONES AUXILIARES
// ================================

/**
 * Obtiene biomarcadores por add-on ID
 */
export const getBiomarkersByAddOn = (addOnId: string): BiomarkerData[] => {
  switch (addOnId) {
    case 'hormonas':
      return HORMONAS_BIOMARKERS;
    case 'cardiovascular':
      return CARDIOVASCULAR_BIOMARKERS;
    case 'antioxidantes':
      return ANTIOXIDANTES_BIOMARKERS;
    case 'inflammation':
      return INFLAMACION_BIOMARKERS;
    default:
      return [];
  }
};

/**
 * Filtra biomarcadores por género
 */
export const filterBiomarkersByGender = (biomarkers: BiomarkerData[], gender: 'male' | 'female'): BiomarkerData[] => {
  return biomarkers.filter(biomarker => 
    biomarker.gender === 'both' || biomarker.gender === gender
  );
};

/**
 * Obtiene biomarcadores esenciales (no excluibles)
 */
export const getEssentialBiomarkers = (biomarkers: BiomarkerData[]): BiomarkerData[] => {
  return biomarkers.filter(biomarker => biomarker.essential);
};

/**
 * Obtiene biomarcadores opcionales (excluibles)
 */
export const getOptionalBiomarkers = (biomarkers: BiomarkerData[]): BiomarkerData[] => {
  return biomarkers.filter(biomarker => !biomarker.essential);
};

/**
 * Calcula precio total de biomarcadores
 */
export const calculateBiomarkersPrice = (biomarkers: BiomarkerData[], excludedCodes: string[] = []): number => {
  return biomarkers
    .filter(biomarker => !excludedCodes.includes(biomarker.code))
    .reduce((total, biomarker) => total + biomarker.price, 0);
};

/**
 * Obtiene categorías únicas de biomarcadores
 */
export const getBiomarkerCategories = (biomarkers: BiomarkerData[]): string[] => {
  return Array.from(new Set(biomarkers.map(biomarker => biomarker.category)));
}; 