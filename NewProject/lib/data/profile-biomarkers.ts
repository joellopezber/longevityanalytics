/**
 * profile-biomarkers.ts
 * Biomarcadores FIJOS de cada perfil de análisis
 * Basado en el proyecto original LongevityAnalitycs
 */

export interface ProfileBiomarker {
  code: string;
  name: string;
  category: string;
  gender: 'both' | 'male' | 'female';
}

// ================================
// CÓDIGOS DE BIOMARCADORES POR PERFIL
// ================================

// ESSENTIAL - Paquete básico de longevidad
const ESSENTIAL_BIOMARKER_CODES_COMMON = [
  'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070', 'B0080', 'B0100',
  'B0120', 'B0130', 'B0170', 'B0180', 'B0200', 'B0240', 'B0250', 'B1260', 'B1540', 'B1600',
  'B1970', 'B3100', 'B3110', 'B3170', 'B3210', 'B5120', 'B5290', 'B5370', 'B5410', 'B5590',
  'B5600', 'B5850', 'B6020', 'B6040', 'B6070', 'B6130', 'B6180', 'B6190', 'B6510', 'B7260',
  'B8050', 'H0000', 'H1420'
];

const ESSENTIAL_BIOMARKER_CODES_MALE_ONLY = ['B6160'];
const ESSENTIAL_BIOMARKER_CODES_FEMALE_ONLY: string[] = [];

// PERFORMANCE - Enfocado en rendimiento deportivo
const PERFORMANCE_BIOMARKER_CODES_COMMON = [
  'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070', 'B0080', 'B0100',
  'B0110', 'B0120', 'B0130', 'B0170', 'B0180', 'B0200', 'B0220', 'B0240', 'B0250', 'B0750',
  'B1260', 'B1540', 'B1600', 'B1900', 'B1970', 'B2120', 'B3100', 'B3110', 'B3170', 'B3210',
  'B5120', 'B5290', 'B5370', 'B5410', 'B5420', 'B5590', 'B5600', 'B5850', 'B6020', 'B6030',
  'B6040', 'B6070', 'B6130', 'B6180', 'B6190', 'B6510', 'B7260', 'B7790', 'B8050', 'H0000',
  'H1420', 'I2081', 'T1061', 'T1191', 'T2830', 'T3920'
];

const PERFORMANCE_BIOMARKER_CODES_MALE_ONLY = ['B6160', 'D0601'];
const PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY = ['B5350', 'B5380', 'B5800', 'B5932'];

// CORE - Paquete intermedio avanzado
const CORE_BIOMARKER_CODES_COMMON = [
  'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070', 'B0080', 'B0100',
  'B0110', 'B0120', 'B0130', 'B0170', 'B0180', 'B0190', 'B0200', 'B0240', 'B0250', 'B0260',
  'B0350', 'B1260', 'B1540', 'B1600', 'B1900', 'B1970', 'B1980', 'B3015', 'B3041', 'B3100',
  'B3110', 'B3170', 'B3210', 'B5120', 'B5290', 'B5350', 'B5370', 'B5380', 'B5410', 'B5420',
  'B5590', 'B5600', 'B5800', 'B5850', 'B5980', 'B6010', 'B6020', 'B6030', 'B6040', 'B6070',
  'B6130', 'B6180', 'B6190', 'B6510', 'B7121', 'B7260', 'B7790', 'B8050', 'H0000', 'H0020',
  'H1420', 'I2081', 'I5047', 'I6740', 'OG001', 'T0500', 'T0811', 'T1061', 'T1191', 'T2590',
  'T2830', 'T3920'
];

const CORE_BIOMARKER_CODES_MALE_ONLY = ['B6160', 'B6480', 'D0601', 'D0850'];
const CORE_BIOMARKER_CODES_FEMALE_ONLY = ['B5932', 'D0181', 'D0780'];

// ADVANCED - Paquete más completo
const ADVANCED_BIOMARKER_CODES_COMMON = [
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
];

const ADVANCED_BIOMARKER_CODES_MALE_ONLY = ['B5830', 'B5840', 'B6160', 'B6480', 'D0601', 'D0850'];
const ADVANCED_BIOMARKER_CODES_FEMALE_ONLY = ['B5932', 'B8110', 'D0181', 'D0780', 'D1001'];

// ================================
// DICCIONARIO LOCAL DE BIOMARCADORES (SIMPLIFICADO)
// ================================

const LOCAL_BIOMARKERS_DICTIONARY: { [key: string]: { name: string; category: string; gender: 'both' | 'male' | 'female' } } = {
  // Hematología
  "H0000": { name: "Hemograma completo", category: "Hematología", gender: "both" },
  "H0020": { name: "VSG", category: "Inflamación", gender: "both" },
  "H0050": { name: "Fibrinógeno", category: "Coagulación", gender: "both" },
  "H1420": { name: "Hemoglobina A1c", category: "Metabolismo glucídico", gender: "both" },
  "H0850": { name: "Cefalina-APTT", category: "Coagulación", gender: "both" },
  "H0860": { name: "INR (Protrombina)", category: "Coagulación", gender: "both" },

  // Bioquímica básica
  "B0000": { name: "Glucosa en ayunas", category: "Metabolismo glucídico", gender: "both" },
  "B0010": { name: "Colesterol total", category: "Perfil lipídico", gender: "both" },
  "B0020": { name: "BUN (Urea)", category: "Función renal", gender: "both" },
  "B0030": { name: "Creatinina", category: "Función renal", gender: "both" },
  "B0040": { name: "Triglicéridos", category: "Perfil lipídico", gender: "both" },
  "B0050": { name: "GPT-ALT", category: "Enzimas hepáticas", gender: "both" },
  "B0060": { name: "GOT-AST", category: "Enzimas hepáticas", gender: "both" },
  "B0070": { name: "GGT", category: "Colestasis", gender: "both" },
  "B0080": { name: "Bilirrubina total", category: "Hígado", gender: "both" },
  "B0100": { name: "Calcio total", category: "Mineral óseo", gender: "both" },
  "B0110": { name: "LDH", category: "Enzima celular", gender: "both" },
  "B0120": { name: "Fósforo", category: "Mineral óseo", gender: "both" },
  "B0130": { name: "Hierro", category: "Metabolismo hierro", gender: "both" },
  "B0170": { name: "HDL-C", category: "Perfil lipídico", gender: "both" },
  "B0180": { name: "LDL-C", category: "Perfil lipídico", gender: "both" },
  "B0190": { name: "VLDL", category: "Perfil lipídico", gender: "both" },
  "B0200": { name: "Albúmina", category: "Función hepática", gender: "both" },
  "B0220": { name: "CPK total", category: "Enzima muscular", gender: "both" },
  "B0240": { name: "Proteínas totales", category: "Nutrición", gender: "both" },
  "B0250": { name: "Ácido úrico", category: "Purinas", gender: "both" },
  "B0260": { name: "Bilirrubina directa", category: "Hígado", gender: "both" },
  "B0270": { name: "Osmolalidad sérica", category: "Función renal", gender: "both" },
  "B0350": { name: "Amilasa", category: "Función pancreática", gender: "both" },
  "B0750": { name: "Ácido láctico", category: "Metabolismo", gender: "both" },
  "B1260": { name: "Ionograma (Na⁺, K⁺, Cl⁻)", category: "Electrolitos", gender: "both" },
  "B1540": { name: "eGFR", category: "Filtrado glomerular", gender: "both" },
  "B1600": { name: "Magnesio", category: "Mineral neuromuscular", gender: "both" },
  "B1900": { name: "LDL directo", category: "Perfil lipídico", gender: "both" },
  "B1970": { name: "Fosfatasa alcalina (ALP)", category: "Hígado / Hueso", gender: "both" },
  "B1980": { name: "Lipasa", category: "Función pancreática", gender: "both" },
  "B2120": { name: "CK-MB", category: "Cardíaco", gender: "both" },

  // Biomarcadores avanzados
  "B3015": { name: "Glutatión peroxidasa", category: "Antioxidante", gender: "both" },
  "B3041": { name: "G6PD", category: "Defensa antioxidante", gender: "both" },
  "B3100": { name: "ApoA-I", category: "Riesgo CV", gender: "both" },
  "B3110": { name: "ApoB", category: "Riesgo CV", gender: "both" },
  "B3130": { name: "Factor reumatoide", category: "Artritis", gender: "both" },
  "B3170": { name: "PCR (hsCRP)", category: "Inflamación cardiovascular", gender: "both" },
  "B3210": { name: "Transferrina", category: "Transporte hierro", gender: "both" },

  // Hormonas
  "B5080": { name: "CA 125", category: "Marcador tumoral", gender: "both" },
  "B5090": { name: "CA 15.3", category: "Marcador tumoral", gender: "both" },
  "B5100": { name: "CA 19-9", category: "Marcador tumoral", gender: "both" },
  "B5110": { name: "CEA", category: "Marcador tumoral", gender: "both" },
  "B5120": { name: "Cortisol", category: "Eje HHA", gender: "both" },
  "B5290": { name: "DHEA-S", category: "Andrógenos suprarrenales", gender: "both" },
  "B5350": { name: "Estradiol", category: "Hormonas femeninas", gender: "both" },
  "B5370": { name: "Ferritina", category: "Depósito hierro", gender: "both" },
  "B5380": { name: "FSH", category: "Gonadotropina", gender: "both" },
  "B5410": { name: "Folato", category: "Hematopoyesis", gender: "both" },
  "B5420": { name: "Hormona de crecimiento (hGH)", category: "Eje GH/IGF", gender: "both" },
  "B5590": { name: "Homocisteína", category: "Metionina / CV", gender: "both" },
  "B5600": { name: "Insulina basal", category: "Resistencia insulínica", gender: "both" },
  "B5800": { name: "LH", category: "Gonadotropina", gender: "both" },
  "B5830": { name: "PSA total", category: "Próstata", gender: "male" },
  "B5840": { name: "PSA libre", category: "Próstata", gender: "male" },
  "B5850": { name: "PTH intacta (PTHi)", category: "Paratiroides", gender: "both" },
  "B5932": { name: "Progesterona", category: "Hormona femenina", gender: "female" },
  "B5980": { name: "Prolactina", category: "Hormonas femeninas", gender: "both" },
  "B6010": { name: "IGFBP-3", category: "Regula IGF", gender: "both" },
  "B6020": { name: "SHBG", category: "Transporte esteroides", gender: "both" },
  "B6030": { name: "IGF-1", category: "Eje GH/IGF", gender: "both" },
  "B6040": { name: "T3 libre", category: "Tiroides", gender: "both" },
  "B6070": { name: "T4 libre", category: "Tiroides", gender: "both" },
  "B6130": { name: "TSH", category: "Tiroides", gender: "both" },
  "B6160": { name: "Testosterona total", category: "Hormona general", gender: "both" },
  "B6180": { name: "Vitamina D (25-OH)", category: "Mineral-inmune", gender: "both" },
  "B6190": { name: "Vitamina B12", category: "Hematopoyesis", gender: "both" },
  "B6300": { name: "anti-TPO", category: "Tiroides", gender: "both" },
  "B6321": { name: "anti-Tg", category: "Tiroides", gender: "both" },
  "B6480": { name: "Testosterona biodisp.", category: "Hormona masculina", gender: "male" },
  "B6510": { name: "HOMA-R", category: "Resistencia insulínica", gender: "both" },
  "B7121": { name: "Glutatión reductasa + B2", category: "Antioxidante", gender: "both" },
  "B7260": { name: "Índice saturación transf.", category: "Hierro", gender: "both" },
  "B7700": { name: "Lp(a)", category: "Riesgo CV", gender: "both" },
  "B7750": { name: "Helicobacter pylori IgG An", category: "Infección", gender: "both" },
  "B7790": { name: "IL-6", category: "Inflamación", gender: "both" },
  "B7900": { name: "Alfa-feto (AFP)", category: "Marcador tumoral", gender: "both" },
  "B8050": { name: "Zinc", category: "Inmunidad", gender: "both" },
  "B8060": { name: "Cobre", category: "Oligoelemento", gender: "both" },
  "B8110": { name: "Proteína Epididimal Humana 4 (HE4)", category: "Marcador tumoral", gender: "female" },
  "B8120": { name: "CYFRA 21-1", category: "Marcador tumoral", gender: "both" },
  "B8130": { name: "Células escamosas Ag (SCC)", category: "Marcador tumoral", gender: "both" },
  "B8160": { name: "Péptido liberador gastrina (ProGRP)", category: "Marcador tumoral", gender: "both" },

  // Hormonas específicas
  "D0181": { name: "17-OH-Progesterona", category: "Suprarrenal", gender: "both" },
  "D0560": { name: "Vitamina D 1,25-OH", category: "Hormona calcitriol", gender: "both" },
  "D0601": { name: "Testosterona libre", category: "Hormona masculina", gender: "male" },
  "D0780": { name: "Estrona", category: "Estrógeno menopáusico", gender: "female" },
  "D0850": { name: "DHT", category: "Andrógeno potente", gender: "both" },
  "D1001": { name: "AMH", category: "Reserva ovárica", gender: "female" },
  "D1271": { name: "CA 72-4", category: "Marcador tumoral", gender: "both" },
  "D1111": { name: "ALP ósea", category: "Metabolismo óseo", gender: "both" },
  "D1760": { name: "β-HCG", category: "Embarazo", gender: "both" },

  // Inmunología
  "I0141": { name: "Nucleares An (ANA)", category: "Autoinmunidad", gender: "both" },
  "I2081": { name: "TNF-α", category: "Inflamación", gender: "both" },
  "I3291": { name: "CTX", category: "Resorción ósea", gender: "both" },
  "I5047": { name: "Cistatina-C", category: "Función renal", gender: "both" },
  "I5072": { name: "anti-CCP", category: "Artritis", gender: "both" },
  "I5080": { name: "Proteina s-100", category: "Marcador tumoral", gender: "both" },
  "I5090": { name: "NSE", category: "Marcador tumoral", gender: "both" },
  "I6740": { name: "ACTH", category: "Pituitaria", gender: "both" },

  // Metales y vitaminas
  "T0150": { name: "Plomo", category: "Metal pesado", gender: "both" },
  "T0302": { name: "Mercurio", category: "Metal pesado", gender: "both" },
  "T0480": { name: "Cadmio", category: "Metal pesado", gender: "both" },
  "T0500": { name: "Cromo", category: "Oligoelemento", gender: "both" },
  "T0811": { name: "Retinol (Vit A)", category: "Antioxidante", gender: "both" },
  "T0960": { name: "Arsénico", category: "Metal pesado", gender: "both" },
  "T1061": { name: "Vitamina C", category: "Antioxidante", gender: "both" },
  "T1191": { name: "α-Tocoferol", category: "Antioxidante", gender: "both" },
  "T1200": { name: "β-Caroteno", category: "Antioxidante", gender: "both" },
  "T1572": { name: "Calcio iónico", category: "Mineral óseo", gender: "both" },
  "T1720": { name: "Vitamina K1", category: "Coagulación", gender: "both" },
  "T2590": { name: "Ácidos grasos %", category: "Perfil lipídico", gender: "both" },
  "T2830": { name: "Coenzima Q10", category: "Energía mitoc.", gender: "both" },
  "T2841": { name: "γ-Tocoferol", category: "Antioxidante", gender: "both" },
  "T3920": { name: "Selenio", category: "Antioxidante", gender: "both" },

  // Otros
  "6897": { name: "Urianálisis + sedimento", category: "Función renal", gender: "both" },
  "M0010": { name: "Sangre oculta en heces", category: "Digestivo", gender: "both" },
  "M1190": { name: "Parásitos en heces", category: "Parasitología", gender: "both" },
  "AB001": { name: "Microbioma intestinal", category: "Microbiota", gender: "both" },
  "OG001": { name: "MyEpiAgeing", category: "Epigenética", gender: "both" }
};

// ================================
// FUNCIONES AUXILIARES
// ================================

/**
 * Convierte códigos de biomarcadores a objetos ProfileBiomarker
 */
function buildBiomarkersFromCodes(codes: string[]): ProfileBiomarker[] {
  return codes.map(code => {
    const biomarker = LOCAL_BIOMARKERS_DICTIONARY[code];
    if (!biomarker) {
      console.warn(`Biomarcador con código ${code} no encontrado en diccionario`);
      return {
        code,
        name: `Biomarcador ${code}`,
        category: 'Desconocido',
        gender: 'both' as const
      };
    }
    return { code, ...biomarker };
  }).filter(Boolean);
}

/**
 * Obtiene biomarcadores de un perfil por género
 */
export function getProfileBiomarkers(profileId: string, gender: 'male' | 'female' | 'both'): ProfileBiomarker[] {
  let commonCodes: string[] = [];
  let maleOnlyCodes: string[] = [];
  let femaleOnlyCodes: string[] = [];

  switch (profileId) {
    case 'essential':
      commonCodes = ESSENTIAL_BIOMARKER_CODES_COMMON;
      maleOnlyCodes = ESSENTIAL_BIOMARKER_CODES_MALE_ONLY;
      femaleOnlyCodes = ESSENTIAL_BIOMARKER_CODES_FEMALE_ONLY;
      break;
    case 'performance':
      commonCodes = PERFORMANCE_BIOMARKER_CODES_COMMON;
      maleOnlyCodes = PERFORMANCE_BIOMARKER_CODES_MALE_ONLY;
      femaleOnlyCodes = PERFORMANCE_BIOMARKER_CODES_FEMALE_ONLY;
      break;
    case 'core':
      commonCodes = CORE_BIOMARKER_CODES_COMMON;
      maleOnlyCodes = CORE_BIOMARKER_CODES_MALE_ONLY;
      femaleOnlyCodes = CORE_BIOMARKER_CODES_FEMALE_ONLY;
      break;
    case 'advanced':
      commonCodes = ADVANCED_BIOMARKER_CODES_COMMON;
      maleOnlyCodes = ADVANCED_BIOMARKER_CODES_MALE_ONLY;
      femaleOnlyCodes = ADVANCED_BIOMARKER_CODES_FEMALE_ONLY;
      break;
    default:
      return [];
  }

  let allCodes = [...commonCodes];

  if (gender === 'male' || gender === 'both') {
    allCodes = [...allCodes, ...maleOnlyCodes];
  }

  if (gender === 'female' || gender === 'both') {
    allCodes = [...allCodes, ...femaleOnlyCodes];
  }

  // Eliminar duplicados
  allCodes = Array.from(new Set(allCodes));

  return buildBiomarkersFromCodes(allCodes);
}

/**
 * Obtiene categorías únicas de biomarcadores de un perfil
 */
export function getProfileBiomarkerCategories(profileId: string, gender: 'male' | 'female' | 'both'): string[] {
  const biomarkers = getProfileBiomarkers(profileId, gender);
  const categories = biomarkers.map(biomarker => biomarker.category);
  return Array.from(new Set(categories));
}

/**
 * Obtiene estadísticas de un perfil
 */
export function getProfileStats(profileId: string, gender: 'male' | 'female' | 'both') {
  const biomarkers = getProfileBiomarkers(profileId, gender);
  const categories = getProfileBiomarkerCategories(profileId, gender);
  
  return {
    totalBiomarkers: biomarkers.length,
    totalCategories: categories.length,
    biomarkersByGender: {
      both: biomarkers.filter(b => b.gender === 'both').length,
      male: biomarkers.filter(b => b.gender === 'male').length,
      female: biomarkers.filter(b => b.gender === 'female').length
    }
  };
}
