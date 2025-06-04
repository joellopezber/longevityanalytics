/**
 * priceData.js
 * Procesamiento de datos de precios de biomarcadores desde CSV
 * Crea mapas eficientes para cálculos dinámicos de precios
 * 
 * Funciones principales:
 * - parsePrice: Convierte formato europeo "4,02 €" a número
 * - priceMap: Mapa de códigos a precios (Prevenii y Market)
 * - getPriceByCode: Obtiene precio de un biomarcador por código
 * - validatePriceData: Valida integridad de datos de precios
 */

// Datos del CSV procesados - Precios actualizados Diciembre 2024
const rawPriceData = [
  { name: "Hemograma completo", code: "H0000", prevenii: "4,02 €", market: "6,28 €" },
  { name: "Hemoglobina A1c", code: "H1420", prevenii: "8,20 €", market: "11,16 €" },
  { name: "Glucosa en ayunas", code: "B0000", prevenii: "1,16 €", market: "2,09 €" },
  { name: "Albúmina", code: "B0200", prevenii: "1,50 €", market: "9,30 €" },
  { name: "Insulina basal", code: "B5600", prevenii: "7,22 €", market: "16,28 €" },
  { name: "HOMA-R", code: "B6510", prevenii: "0,00 €", market: "0,00 €" },
  { name: "Osmolalidad sérica", code: "B0270", prevenii: "8,89 €", market: "9,33 €" },
  { name: "Ácido láctico", code: "B0750", prevenii: "13,28 €", market: "16,28 €" },
  { name: "Fibrinógeno", code: "H0050", prevenii: "8,75 €", market: "9,77 €" },
  { name: "Cefalina-APTT", code: "H0850", prevenii: "4,66 €", market: "9,77 €" },
  { name: "INR (Protrombina)", code: "H0860", prevenii: "4,66 €", market: "9,77 €" },
  { name: "BUN (Urea)", code: "B0020", prevenii: "1,30 €", market: "2,09 €" },
  { name: "Creatinina", code: "B0030", prevenii: "0,98 €", market: "2,09 €" },
  { name: "Ácido úrico", code: "B0250", prevenii: "1,58 €", market: "2,33 €" },
  { name: "eGFR", code: "B1540", prevenii: "0,00 €", market: "0,00 €" },
  { name: "Ionograma (Na⁺, K⁺, Cl⁻)", code: "B1260", prevenii: "6,50 €", market: "8,14 €" },
  { name: "Fosfatasa alcalina (ALP)", code: "B1970", prevenii: "1,20 €", market: "2,09 €" },
  { name: "GPT-ALT", code: "B0050", prevenii: "1,16 €", market: "2,56 €" },
  { name: "GOT-AST", code: "B0060", prevenii: "1,12 €", market: "2,56 €" },
  { name: "Bilirrubina total", code: "B0080", prevenii: "1,30 €", market: "3,49 €" },
  { name: "Bilirrubina directa", code: "B0260", prevenii: "1,42 €", market: "5,81 €" },
  { name: "Proteínas totales", code: "B0240", prevenii: "1,26 €", market: "2,33 €" },
  { name: "GGT", code: "B0070", prevenii: "1,30 €", market: "2,56 €" },
  { name: "Lipasa", code: "B1980", prevenii: "7,66 €", market: "9,30 €" },
  { name: "Amilasa", code: "B0350", prevenii: "3,58 €", market: "6,98 €" },
  { name: "LDH", code: "B0110", prevenii: "1,65 €", market: "6,98 €" },
  { name: "Colesterol total", code: "B0010", prevenii: "1,16 €", market: "1,16 €" },
  { name: "Triglicéridos", code: "B0040", prevenii: "1,80 €", market: "2,17 €" },
  { name: "HDL-C", code: "B0170", prevenii: "3,72 €", market: "16,74 €" },
  { name: "LDL-C", code: "B0180", prevenii: "0,00 €", market: "0,00 €" },
  { name: "LDL directo", code: "B1900", prevenii: "12,91 €", market: "14,65 €" },
  { name: "VLDL", code: "B0190", prevenii: "0,00 €", market: "0,00 €" },
  { name: "ApoB", code: "B3110", prevenii: "5,10 €", market: "5,97 €" },
  { name: "ApoA-I", code: "B3100", prevenii: "5,10 €", market: "5,97 €" },
  { name: "Lp(a)", code: "B7700", prevenii: "15,37 €", market: "18,60 €" },
  { name: "Ácidos grasos %", code: "T2590", prevenii: "51,64 €", market: "72,29 €" },
  { name: "ALP ósea", code: "D1111", prevenii: "47,11 €", market: "65,96 €" },
  { name: "CTX", code: "I3291", prevenii: "34,38 €", market: "47,85 €" },
  { name: "Cortisol", code: "B5120", prevenii: "10,89 €", market: "16,28 €" },
  { name: "DHEA-S", code: "B5290", prevenii: "8,12 €", market: "25,58 €" },
  { name: "Estradiol", code: "B5350", prevenii: "12,48 €", market: "16,28 €" },
  { name: "Prolactina", code: "B5980", prevenii: "7,52 €", market: "16,28 €" },
  { name: "LH", code: "B5800", prevenii: "7,52 €", market: "18,60 €" },
  { name: "FSH", code: "B5380", prevenii: "7,52 €", market: "18,60 €" },
  { name: "SHBG", code: "B6020", prevenii: "16,59 €", market: "18,60 €" },
  { name: "Testosterona libre", code: "D0601", prevenii: "21,28 €", market: "32,55 €" },
  { name: "Testosterona biodisp.", code: "B6480", prevenii: "0,00 €", market: "32,55 €" },
  { name: "Testosterona total", code: "B6160", prevenii: "12,68 €", market: "18,60 €" },
  { name: "PTH intacta (PTHi)", code: "B5850", prevenii: "15,12 €", market: "32,55 €" },
  { name: "Cistatina-C", code: "I5047", prevenii: "12,89 €", market: "16,28 €" },
  { name: "T3 libre", code: "B6040", prevenii: "8,72 €", market: "20,93 €" },
  { name: "T4 libre", code: "B6070", prevenii: "8,72 €", market: "11,16 €" },
  { name: "IGF-1", code: "B6030", prevenii: "20,38 €", market: "32,55 €" },
  { name: "IGFBP-3", code: "B6010", prevenii: "29,48 €", market: "32,55 €" },
  { name: "DHT", code: "D0850", prevenii: "36,06 €", market: "37,87 €" },
  { name: "Progesterona", code: "B5932", prevenii: "8,32 €", market: "16,28 €" },
  { name: "17-OH-Progesterona", code: "D0181", prevenii: "19,88 €", market: "25,58 €" },
  { name: "AMH", code: "D1001", prevenii: "49,50 €", market: "50,80 €" },
  { name: "β-HCG", code: "D1760", prevenii: "13,26 €", market: "20,93 €" },
  { name: "ACTH", code: "I6740", prevenii: "11,18 €", market: "32,55 €" },
  { name: "TSH", code: "B6130", prevenii: "7,28 €", market: "11,16 €" },
  { name: "Estrona", code: "D0780", prevenii: "39,07 €", market: "43,40 €" },
  { name: "CK-MB", code: "B2120", prevenii: "27,50 €", market: "38,50 €" },
  { name: "CPK total", code: "B0220", prevenii: "4,18 €", market: "6,98 €" },
  { name: "PCR (hsCRP)", code: "B3170", prevenii: "5,37 €", market: "20,93 €" },
  { name: "Homocisteína", code: "B5590", prevenii: "15,00 €", market: "16,80 €" },
  { name: "VSG", code: "H0020", prevenii: "1,96 €", market: "2,48 €" },
  { name: "IL-6", code: "B7790", prevenii: "39,06 €", market: "41,02 €" },
  { name: "TNF-α", code: "I2081", prevenii: "60,58 €", market: "84,81 €" },
  { name: "Calcio iónico", code: "T1572", prevenii: "15,84 €", market: "18,60 €" },
  { name: "Fósforo", code: "B0120", prevenii: "1,53 €", market: "3,49 €" },
  { name: "Calcio total", code: "B0100", prevenii: "1,95 €", market: "2,56 €" },
  { name: "Magnesio", code: "B1600", prevenii: "5,26 €", market: "6,20 €" },
  { name: "Cobre", code: "B8060", prevenii: "12,19 €", market: "17,06 €" },
  { name: "Cromo", code: "T0500", prevenii: "12,19 €", market: "12,40 €" },
  { name: "Selenio", code: "T3920", prevenii: "29,05 €", market: "32,54 €" },
  { name: "Zinc", code: "B8050", prevenii: "14,63 €", market: "17,06 €" },
  { name: "Hierro", code: "B0130", prevenii: "2,60 €", market: "3,49 €" },
  { name: "Transferrina", code: "B3210", prevenii: "8,64 €", market: "12,40 €" },
  { name: "Índice saturación transf.", code: "B7260", prevenii: "6,39 €", market: "9,30 €" },
  { name: "Ferritina", code: "B5370", prevenii: "7,14 €", market: "10,00 €" },
  { name: "Vitamina D (25-OH)", code: "B6180", prevenii: "25,58 €", market: "34,88 €" },
  { name: "Vitamina D 1,25-OH", code: "D0560", prevenii: "41,63 €", market: "46,50 €" },
  { name: "Vitamina B12", code: "B6190", prevenii: "12,26 €", market: "14,65 €" },
  { name: "Folato", code: "B5410", prevenii: "10,23 €", market: "14,65 €" },
  { name: "Retinol (Vit A)", code: "T0811", prevenii: "30,14 €", market: "31,00 €" },
  { name: "γ-Tocoferol", code: "T2841", prevenii: "27,46 €", market: "31,00 €" },
  { name: "α-Tocoferol", code: "T1191", prevenii: "29,83 €", market: "31,00 €" },
  { name: "α-Caroteno", code: "T1200", prevenii: "42,61 €", market: "59,65 €" },
  { name: "β-Caroteno", code: "T1200", prevenii: "42,61 €", market: "59,66 €" },
  { name: "Coenzima Q10", code: "T2830", prevenii: "37,91 €", market: "54,59 €" },
  { name: "Vitamina K1", code: "T1720", prevenii: "73,08 €", market: "74,50 €" },
  { name: "Vitamina C", code: "T1061", prevenii: "50,25 €", market: "70,35 €" },
  { name: "Glutatión reductasa + B2", code: "B7121", prevenii: "50,00 €", market: "70,00 €" },
  { name: "Glutatión peroxidasa", code: "B3015", prevenii: "72,19 €", market: "101,06 €" },
  { name: "G6PD", code: "B3041", prevenii: "21,86 €", market: "30,61 €" },
  { name: "Hg sangre", code: "T0302", prevenii: "12,19 €", market: "18,60 €" },
  { name: "Pb sangre", code: "T0150", prevenii: "21,88 €", market: "30,63 €" },
  { name: "As sangre total", code: "T0960", prevenii: "28,14 €", market: "42,50 €" },
  { name: "Cd sangre", code: "T0480", prevenii: "12,19 €", market: "18,60 €" },
  { name: "Espermiograma", code: "B3340", prevenii: "32,81 €", market: "34,10 €" },
  { name: "Urianálisis + sedimento", code: "6897", prevenii: "8,08 €", market: "9,30 €" },
  { name: "Ova & Parasites stool", code: "M1190", prevenii: "7,16 €", market: "16,28 €" },
  { name: "Sangre oculta en heces", code: "M0010", prevenii: "4,62 €", market: "4,65 €" },
  { name: "Intolerancia Alimentaria 200", code: "P3031", prevenii: "184,00 €", market: "200,00 €" },
  { name: "Microbioma", code: "AB001", prevenii: "273,90 €", market: "299,00 €" },
  { name: "Metaboloma - orina", code: "AB002", prevenii: "383,90 €", market: "399,00 €" },
  { name: "MyPharma", code: "GP001", prevenii: "319,00 €", market: "359,00 €" },
  { name: "MyDetox", code: "GD001", prevenii: "319,00 €", market: "359,00 €" },
  { name: "MyDiet", code: "GN001", prevenii: "199,00 €", market: "249,00 €" },
  { name: "MyAgeing", code: "GA001", prevenii: "319,00 €", market: "359,00 €" },
  { name: "MySport", code: "GS001", prevenii: "249,00 €", market: "299,00 €" },
  { name: "MySuplements", code: "GU001", prevenii: "199,00 €", market: "249,00 €" },
  { name: "MyEpiAgeing", code: "OG001", prevenii: "299,00 €", market: "350,00 €" },
  { name: "PSA total", code: "B5830", prevenii: "7,40 €", market: "18,60 €" },
  { name: "PSA libre", code: "B5840", prevenii: "5,56 €", market: "18,60 €" },
  { name: "CEA", code: "B5110", prevenii: "8,68 €", market: "12,32 €" },
  { name: "CA 125", code: "B5080", prevenii: "15,38 €", market: "16,74 €" },
  { name: "CA 15.3", code: "B5090", prevenii: "15,38 €", market: "27,90 €" },
  { name: "CA 19-9", code: "B5100", prevenii: "15,38 €", market: "16,74 €" },
  { name: "Proteína Epididimal Humana 4 (HE4)", code: "B8110", prevenii: "24,83 €", market: "34,76 €" },
  { name: "Células escamosas Ag (SCC)", code: "B8130", prevenii: "22,86 €", market: "32,00 €" },
  { name: "Proteina s-100", code: "I5080", prevenii: "21,78 €", market: "30,49 €" },
  { name: "NSE", code: "I5090", prevenii: "27,73 €", market: "43,40 €" },
  { name: "CYFRA 21-1", code: "B8120", prevenii: "30,47 €", market: "32,55 €" },
  { name: "CA 72-4", code: "D1271", prevenii: "24,22 €", market: "31,00 €" },
  { name: "Alfa-feto (AFP)", code: "B7900", prevenii: "7,53 €", market: "16,28 €" },
  { name: "Péptido liberador gastrina (ProGRP)", code: "B8160", prevenii: "44,06 €", market: "61,69 €" },
  { name: "Nucleares An (ANA)", code: "I0141", prevenii: "16,23 €", market: "24,80 €" },
  { name: "anti-CCP", code: "I5072", prevenii: "17,61 €", market: "24,65 €" },
  { name: "anti-Tg", code: "B6321", prevenii: "5,85 €", market: "24,80 €" },
  { name: "anti-TPO", code: "B6300", prevenii: "5,85 €", market: "24,80 €" },
  { name: "Helicobacter pylori IgG An", code: "B7750", prevenii: "14,75 €", market: "24,80 €" },
  { name: "Factor reumatoide", code: "B3130", prevenii: "6,33 €", market: "10,85 €" },
  { name: "Longitud telomérica", code: "G1465", prevenii: "541,75 €", market: "573,00 €" }
];

/**
 * Convierte precio en formato europeo "4,02 €" a número decimal
 * @param {string} priceString - Precio en formato "4,02 €"
 * @returns {number} - Precio como número decimal
 */
export const parsePrice = (priceString) => {
  if (!priceString || priceString === "0,00 €") return 0;
  
  // Remover símbolo € y espacios, reemplazar coma por punto
  const cleanPrice = priceString
    .replace(/€/g, '')
    .replace(/\s/g, '')
    .replace(/,/g, '.');
  
  const parsed = parseFloat(cleanPrice);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Mapa de códigos de biomarcadores a precios
 * Estructura: { código: { prevenii: number, market: number, name: string } }
 */
export const priceMap = rawPriceData.reduce((map, item) => {
  map[item.code] = {
    prevenii: parsePrice(item.prevenii),
    market: parsePrice(item.market),
    name: item.name
  };
  return map;
}, {});

/**
 * Obtiene precio de un biomarcador por código
 * @param {string} code - Código del biomarcador
 * @param {string} priceType - Tipo de precio ('prevenii' o 'market')
 * @returns {number} - Precio del biomarcador
 */
export const getPriceByCode = (code, priceType = 'prevenii') => {
  const priceData = priceMap[code];
  if (!priceData) {
    console.warn(`Precio no encontrado para código: ${code}`);
    return 0;
  }
  return priceData[priceType] || 0;
};

/**
 * Obtiene información completa de precio por código
 * @param {string} code - Código del biomarcador
 * @returns {object|null} - Objeto con precios y nombre, o null si no existe
 */
export const getPriceDataByCode = (code) => {
  return priceMap[code] || null;
};

/**
 * Valida que todos los códigos de una lista tengan precios
 * @param {Array} codes - Array de códigos de biomarcadores
 * @returns {object} - Resultado de validación con códigos faltantes
 */
export const validatePriceData = (codes) => {
  const missingCodes = codes.filter(code => !priceMap[code]);
  const validCodes = codes.filter(code => priceMap[code]);
  
  return {
    isValid: missingCodes.length === 0,
    missingCodes,
    validCodes,
    totalCodes: codes.length,
    validCount: validCodes.length
  };
};

/**
 * Obtiene estadísticas de precios
 * @returns {object} - Estadísticas generales de precios
 */
export const getPriceStatistics = () => {
  const prices = Object.values(priceMap);
  const preveniiPrices = prices.map(p => p.prevenii).filter(p => p > 0);
  const marketPrices = prices.map(p => p.market).filter(p => p > 0);
  
  return {
    totalBiomarkers: prices.length,
    preveniiStats: {
      min: Math.min(...preveniiPrices),
      max: Math.max(...preveniiPrices),
      avg: preveniiPrices.reduce((a, b) => a + b, 0) / preveniiPrices.length
    },
    marketStats: {
      min: Math.min(...marketPrices),
      max: Math.max(...marketPrices),
      avg: marketPrices.reduce((a, b) => a + b, 0) / marketPrices.length
    }
  };
};

// Exportar datos para debugging
export { rawPriceData }; 