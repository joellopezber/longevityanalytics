/**
 * biomarkersDict.js
 * Diccionario centralizado de biomarcadores y funciones auxiliares
 * SOLO biomarcadores - NO contiene lógica de paquetes
 * ARQUITECTURA: Single source of truth para todos los biomarcadores
 */

// ================================
// DICCIONARIO CENTRALIZADO DE BIOMARCADORES
// ================================
export const BIOMARKERS_DICTIONARY = {
  // === HEMATOLOGÍA ===
  "H0000": { name: "Hemograma completo", category: "Hematología, Hematopoyesis, Inmunidad", gender: "both" },
  "H0020": { name: "VSG", category: "Inflamación", gender: "both" },
  "H0050": { name: "Fibrinógeno", category: "Coagulación", gender: "both" },
  "H0850": { name: "Cefalina-APTT", category: "Coagulación", gender: "both" },
  "H0860": { name: "INR (Protrombina)", category: "Coagulación", gender: "both" },
  "H1420": { name: "Hemoglobina A1c", category: "Metabolismo glucídico", gender: "both" },

  // === BIOQUÍMICA BÁSICA ===
  "B0000": { name: "Glucosa en ayunas", category: "Metabolismo glucídico", gender: "both" },
  "B0010": { name: "Colesterol total", category: "Perfil lipídico", gender: "both" },
  "B0020": { name: "BUN (Urea)", category: "Función renal", gender: "both" },
  "B0030": { name: "Creatinina", category: "Función renal", gender: "both" },
  "B0040": { name: "Triglicéridos", category: "Perfil lipídico", gender: "both" },
  "B0050": { name: "GPT-ALT", category: "Enzimas hepáticas", gender: "both" },
  "B0060": { name: "GOT-AST", category: "Enzimas hepáticas", gender: "both" },
  "B0070": { name: "GGT", category: "Colestasis", gender: "both" },
  "B0080": { name: "Bilirrubina total", category: "Hígado, Hemólisis", gender: "both" },
  "B0100": { name: "Calcio total", category: "Mineral óseo", gender: "both" },
  "B0110": { name: "LDH", category: "Enzima celular", gender: "both" },
  "B0120": { name: "Fósforo", category: "Mineral óseo", gender: "both" },
  "B0130": { name: "Hierro", category: "Metabolismo hierro", gender: "both" },
  "B0170": { name: "HDL-C", category: "Perfil lipídico", gender: "both" },
  "B0180": { name: "LDL-C", category: "Perfil lipídico", gender: "both" },
  "B0190": { name: "VLDL", category: "Perfil lipídico", gender: "both" },
  "B0200": { name: "Albúmina", category: "Función hepática, Nutrición", gender: "both" },
  "B0220": { name: "CPK total", category: "Enzima muscular", gender: "both" },
  "B0240": { name: "Proteínas totales", category: "Nutrición", gender: "both" },
  "B0250": { name: "Ácido úrico", category: "Purinas, Riñón", gender: "both" },
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
  "B3015": { name: "Glutatión peroxidasa", category: "Antioxidante", gender: "both" },
  "B3041": { name: "G6PD", category: "Defensa antioxidante", gender: "both" },
  "B3100": { name: "ApoA-I", category: "Riesgo CV", gender: "both" },
  "B3110": { name: "ApoB", category: "Riesgo CV", gender: "both" },
  "B3130": { name: "Factor reumatoide", category: "Artritis", gender: "both" },
  "B3170": { name: "PCR (hsCRP)", category: "Inflamación cardiovascular", gender: "both" },
  "B3210": { name: "Transferrina", category: "Transporte hierro", gender: "both" },
  "B3340": { name: "Espermiograma", category: "Fertilidad", gender: "male" },
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
  "D0181": { name: "17-OH-Progesterona", category: "Suprarrenal", gender: "both" },
  "D0560": { name: "Vitamina D 1,25-OH", category: "Hormona calcitriol", gender: "both" },
  "D0601": { name: "Testosterona libre", category: "Hormona masculina", gender: "male" },
  "D0780": { name: "Estrona", category: "Estrógeno menopáusico", gender: "female" },
  "D0850": { name: "DHT", category: "Andrógeno potente", gender: "both" },
  "D1001": { name: "AMH", category: "Reserva ovárica", gender: "female" },
  "D1271": { name: "CA 72-4", category: "Marcador tumoral", gender: "both" },
  "D1111": { name: "ALP ósea", category: "Metabolismo óseo", gender: "both" },
  "D1760": { name: "β-HCG", category: "Embarazo", gender: "both" },
  "I0141": { name: "Nucleares An (ANA)", category: "Autoinmunidad", gender: "both" },
  "I2081": { name: "TNF-α", category: "Inflamación", gender: "both" },
  "I3291": { name: "CTX", category: "Resorción ósea", gender: "both" },
  "I5047": { name: "Cistatina-C", category: "Función renal", gender: "both" },
  "I5072": { name: "anti-CCP", category: "Artritis", gender: "both" },
  "I5080": { name: "Proteina s-100", category: "Marcador tumoral", gender: "both" },
  "I5090": { name: "NSE", category: "Marcador tumoral", gender: "both" },
  "I6740": { name: "ACTH", category: "Pituitaria", gender: "both" },
  "T0150": { name: "Pb sangre", category: "Metal pesado", gender: "both" },
  "T0302": { name: "Hg sangre", category: "Metal pesado", gender: "both" },
  "T0480": { name: "Cd sangre", category: "Metal pesado", gender: "both" },
  "T0500": { name: "Cromo", category: "Oligoelemento", gender: "both" },
  "T0811": { name: "Retinol (Vit A)", category: "Antioxidante", gender: "both" },
  "T0960": { name: "As sangre total", category: "Metal pesado", gender: "both" },
  "T1061": { name: "Vitamina C", category: "Antioxidante", gender: "both" },
  "T1191": { name: "α-Tocoferol", category: "Antioxidante", gender: "both" },
  "T1200A": { name: "α-Caroteno", category: "Antioxidante", gender: "both" },
  "T1200B": { name: "β-Caroteno", category: "Antioxidante", gender: "both" },
  "T1572": { name: "Calcio iónico", category: "Mineral óseo", gender: "both" },
  "T1720": { name: "Vitamina K1", category: "Coagulación", gender: "both" },
  "T2590": { name: "Ácidos grasos %", category: "Perfil lipídico", gender: "both" },
  "T2830": { name: "Coenzima Q10", category: "Energía mitoc.", gender: "both" },
  "T2841": { name: "γ-Tocoferol", category: "Antioxidante", gender: "both" },
  "T3920": { name: "Selenio", category: "Antioxidante", gender: "both" },
  "6897": { name: "Urianálisis + sedimento", category: "Función renal", gender: "both" },
  "M0010": { name: "Sangre oculta en heces", category: "Digestivo", gender: "both" },
  "M1190": { name: "Ova & Parasites stool", category: "Parasitología", gender: "both" },
  "AB001": { name: "Microbioma", category: "Microbiota", gender: "both" },
  "OG001": { name: "MyEpiAgeing", category: "Epigenética", gender: "both" }
};

// ================================
// FUNCIONES AUXILIARES
// ================================

/**
 * Construye array de biomarcadores a partir de códigos
 * @param {Array} codes - Array de códigos de biomarcadores
 * @returns {Array} Array de objetos biomarcador con código incluido
 */
export const buildBiomarkersFromCodes = (codes) => {
  return codes.map(code => {
    const biomarker = BIOMARKERS_DICTIONARY[code];
    if (!biomarker) {
      console.warn(`Biomarcador con código ${code} no encontrado en diccionario`);
      return null;
    }
    return { code, ...biomarker };
  }).filter(Boolean);
};

/**
 * Filtra biomarcadores por género
 * @param {Array} biomarkers - Array de biomarcadores
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {Array} Biomarcadores filtrados por género
 */
export const filterBiomarkersByGender = (biomarkers, gender) => {
  return biomarkers.filter(biomarker => 
    biomarker.gender === 'both' || biomarker.gender === gender
  );
};

/**
 * Obtiene estadísticas del diccionario de biomarcadores
 * @returns {object} Estadísticas del diccionario
 */
export const getBiomarkerStats = () => {
  const allBiomarkers = Object.values(BIOMARKERS_DICTIONARY);
  const categories = [...new Set(allBiomarkers.map(b => b.category))];
  const genderDistribution = {
    both: allBiomarkers.filter(b => b.gender === 'both').length,
    male: allBiomarkers.filter(b => b.gender === 'male').length,
    female: allBiomarkers.filter(b => b.gender === 'female').length
  };

  return {
    total: allBiomarkers.length,
    categories: categories.length,
    categoriesList: categories.sort(),
    genderDistribution
  };
};

/**
 * Busca biomarcadores por nombre o categoría
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} Biomarcadores que coinciden con la búsqueda
 */
export const searchBiomarkers = (searchTerm) => {
  if (!searchTerm) return [];
  
  const term = searchTerm.toLowerCase();
  return Object.entries(BIOMARKERS_DICTIONARY)
    .filter(([code, biomarker]) => 
      biomarker.name.toLowerCase().includes(term) ||
      biomarker.category.toLowerCase().includes(term) ||
      code.toLowerCase().includes(term)
    )
    .map(([code, biomarker]) => ({ code, ...biomarker }));
};

/**
 * Valida que todos los códigos existan en el diccionario
 * @param {Array} codes - Array de códigos a validar
 * @returns {object} Resultado de validación
 */
export const validateBiomarkerCodes = (codes) => {
  const dictionaryKeys = Object.keys(BIOMARKERS_DICTIONARY);
  const missingCodes = codes.filter(code => !dictionaryKeys.includes(code));
  
  return {
    isValid: missingCodes.length === 0,
    missingCodes,
    validCodes: codes.filter(code => dictionaryKeys.includes(code))
  };
};

// ================================
// INFORMACIÓN DE INICIALIZACIÓN
// ================================

const stats = getBiomarkerStats();
console.log('✅ Biomarkers Dictionary cargado:', {
  totalBiomarkers: stats.total,
  categories: stats.categories,
  genderDistribution: stats.genderDistribution
}); 