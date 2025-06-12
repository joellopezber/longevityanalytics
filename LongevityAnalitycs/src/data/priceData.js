/**
 * priceData.js
 * Datos de precios de biomarcadores por código
 * Estructura simplificada: solo código, precio (nuestro costo) y pvp (precio al público)
 * 
 * ACTUALIZADO DESDE: LongevityBiomarkers.csv
 * Fecha de actualización: 2025-01-22
 * Total de biomarcadores: 137
 * 
 * Funciones principales:
 * - parsePrice: Convierte formato europeo "4,02 €" a número
 * - priceMap: Mapa de códigos a precios (precio y pvp)
 * - getPriceByCode: Obtiene precio de un biomarcador por código
 * - validatePriceData: Valida integridad de datos de precios
 */

// Datos de precios actualizados desde CSV de referencia - Solo códigos y precios
const rawPriceData = [
  { code: "6897", precio: "8,08 €", pvp: "9,30 €" },
  { code: "AB001", precio: "273,90 €", pvp: "299,00 €" },
  { code: "AB002", precio: "383,90 €", pvp: "399,00 €" },
  { code: "B0000", precio: "1,16 €", pvp: "2,09 €" },
  { code: "B0010", precio: "1,16 €", pvp: "1,16 €" },
  { code: "B0020", precio: "1,30 €", pvp: "2,09 €" },
  { code: "B0030", precio: "0,98 €", pvp: "2,09 €" },
  { code: "B0040", precio: "1,80 €", pvp: "2,17 €" },
  { code: "B0050", precio: "1,16 €", pvp: "2,56 €" },
  { code: "B0060", precio: "1,12 €", pvp: "2,56 €" },
  { code: "B0070", precio: "1,30 €", pvp: "2,56 €" },
  { code: "B0080", precio: "1,30 €", pvp: "3,49 €" },
  { code: "B0100", precio: "1,95 €", pvp: "2,56 €" },
  { code: "B0110", precio: "1,65 €", pvp: "6,98 €" },
  { code: "B0120", precio: "1,53 €", pvp: "3,49 €" },
  { code: "B0130", precio: "2,60 €", pvp: "3,49 €" },
  { code: "B0170", precio: "3,72 €", pvp: "16,74 €" },
  { code: "B0180", precio: "0,00 €", pvp: "0,00 €" },
  { code: "B0190", precio: "0,00 €", pvp: "0,00 €" },
  { code: "B0200", precio: "1,50 €", pvp: "9,30 €" },
  { code: "B0220", precio: "4,18 €", pvp: "6,98 €" },
  { code: "B0240", precio: "1,26 €", pvp: "2,33 €" },
  { code: "B0250", precio: "1,58 €", pvp: "2,33 €" },
  { code: "B0260", precio: "1,42 €", pvp: "5,81 €" },
  { code: "B0270", precio: "8,89 €", pvp: "9,33 €" },
  { code: "B0350", precio: "3,58 €", pvp: "6,98 €" },
  { code: "B0750", precio: "13,28 €", pvp: "16,28 €" },
  { code: "B1260", precio: "6,50 €", pvp: "8,14 €" },
  { code: "B1540", precio: "0,00 €", pvp: "0,00 €" },
  { code: "B1600", precio: "5,26 €", pvp: "6,20 €" },
  { code: "B1900", precio: "12,91 €", pvp: "14,65 €" },
  { code: "B1970", precio: "1,20 €", pvp: "2,09 €" },
  { code: "B1980", precio: "7,66 €", pvp: "9,30 €" },
  { code: "B2120", precio: "27,50 €", pvp: "38,50 €" },
  { code: "B3015", precio: "72,19 €", pvp: "101,06 €" },
  { code: "B3041", precio: "21,86 €", pvp: "30,61 €" },
  { code: "B3100", precio: "5,10 €", pvp: "5,97 €" },
  { code: "B3110", precio: "5,10 €", pvp: "5,97 €" },
  { code: "B3130", precio: "6,33 €", pvp: "10,85 €" },
  { code: "B3170", precio: "5,37 €", pvp: "20,93 €" },
  { code: "B3210", precio: "8,64 €", pvp: "12,40 €" },
  { code: "B3340", precio: "32,81 €", pvp: "34,10 €" },
  { code: "B5080", precio: "15,38 €", pvp: "16,74 €" },
  { code: "B5090", precio: "15,38 €", pvp: "27,90 €" },
  { code: "B5100", precio: "15,38 €", pvp: "16,74 €" },
  { code: "B5110", precio: "8,68 €", pvp: "12,32 €" },
  { code: "B5120", precio: "10,89 €", pvp: "16,28 €" },
  { code: "B5290", precio: "8,12 €", pvp: "25,58 €" },
  { code: "B5350", precio: "12,48 €", pvp: "16,28 €" },
  { code: "B5370", precio: "7,14 €", pvp: "10,00 €" },
  { code: "B5380", precio: "7,52 €", pvp: "18,60 €" },
  { code: "B5410", precio: "10,23 €", pvp: "14,65 €" },
  { code: "B5420", precio: "10,48 €", pvp: "18,60 €" },
  { code: "B5590", precio: "15,00 €", pvp: "16,80 €" },
  { code: "B5600", precio: "7,22 €", pvp: "16,28 €" },
  { code: "B5800", precio: "7,52 €", pvp: "18,60 €" },
  { code: "B5830", precio: "7,40 €", pvp: "18,60 €" },
  { code: "B5840", precio: "5,56 €", pvp: "18,60 €" },
  { code: "B5850", precio: "15,12 €", pvp: "32,55 €" },
  { code: "B5932", precio: "8,32 €", pvp: "16,28 €" },
  { code: "B5980", precio: "7,52 €", pvp: "16,28 €" },
  { code: "B6010", precio: "29,48 €", pvp: "32,55 €" },
  { code: "B6020", precio: "16,59 €", pvp: "18,60 €" },
  { code: "B6030", precio: "20,38 €", pvp: "32,55 €" },
  { code: "B6040", precio: "8,72 €", pvp: "20,93 €" },
  { code: "B6070", precio: "8,72 €", pvp: "11,16 €" },
  { code: "B6130", precio: "7,28 €", pvp: "11,16 €" },
  { code: "B6160", precio: "12,68 €", pvp: "18,60 €" },
  { code: "B6180", precio: "25,58 €", pvp: "34,88 €" },
  { code: "B6190", precio: "12,26 €", pvp: "14,65 €" },
  { code: "B6300", precio: "5,85 €", pvp: "24,80 €" },
  { code: "B6321", precio: "5,85 €", pvp: "24,80 €" },
  { code: "B6480", precio: "0,00 €", pvp: "0,00 €" },
  { code: "B6510", precio: "0,00 €", pvp: "0,00 €" },
  { code: "B7121", precio: "50,00 €", pvp: "70,00 €" },
  { code: "B7260", precio: "6,39 €", pvp: "9,30 €" },
  { code: "B7700", precio: "15,37 €", pvp: "18,60 €" },
  { code: "B7750", precio: "14,75 €", pvp: "24,80 €" },
  { code: "B7790", precio: "39,06 €", pvp: "41,02 €" },
  { code: "B7900", precio: "7,53 €", pvp: "16,28 €" },
  { code: "B8050", precio: "14,63 €", pvp: "17,06 €" },
  { code: "B8060", precio: "12,19 €", pvp: "17,06 €" },
  { code: "B8110", precio: "24,83 €", pvp: "34,76 €" },
  { code: "B8120", precio: "30,47 €", pvp: "32,55 €" },
  { code: "B8130", precio: "22,86 €", pvp: "32,00 €" },
  { code: "B8160", precio: "44,06 €", pvp: "61,69 €" },
  { code: "D0181", precio: "19,88 €", pvp: "25,58 €" },
  { code: "D0560", precio: "41,63 €", pvp: "46,50 €" },
  { code: "D0601", precio: "21,28 €", pvp: "32,55 €" },
  { code: "D0780", precio: "39,07 €", pvp: "43,40 €" },
  { code: "D0850", precio: "36,06 €", pvp: "37,87 €" },
  { code: "D1001", precio: "49,50 €", pvp: "50,80 €" },
  { code: "D1111", precio: "47,11 €", pvp: "65,96 €" },
  { code: "D1271", precio: "24,22 €", pvp: "31,00 €" },
  { code: "D1760", precio: "13,26 €", pvp: "20,93 €" },
  { code: "DL001", precio: "383,90 €", pvp: "399,00 €" },
  { code: "G1465", precio: "541,75 €", pvp: "573,00 €" },
  { code: "GT001", precio: "62,50 €", pvp: "71,25 €" },
  { code: "H0000", precio: "4,02 €", pvp: "6,28 €" },
  { code: "H0020", precio: "1,96 €", pvp: "2,48 €" },
  { code: "H0050", precio: "8,75 €", pvp: "9,77 €" },
  { code: "H0850", precio: "4,66 €", pvp: "9,77 €" },
  { code: "H0860", precio: "4,66 €", pvp: "9,77 €" },
  { code: "H1420", precio: "8,20 €", pvp: "11,16 €" },
  { code: "I0141", precio: "16,23 €", pvp: "24,80 €" },
  { code: "I2081", precio: "60,58 €", pvp: "84,81 €" },
  { code: "I3291", precio: "34,38 €", pvp: "47,85 €" },
  { code: "I5047", precio: "12,89 €", pvp: "16,28 €" },
  { code: "I5072", precio: "17,61 €", pvp: "24,65 €" },
  { code: "I5080", precio: "21,78 €", pvp: "30,49 €" },
  { code: "I5090", precio: "27,73 €", pvp: "43,40 €" },
  { code: "I6740", precio: "11,18 €", pvp: "32,55 €" },
  { code: "M0010", precio: "4,62 €", pvp: "4,65 €" },
  { code: "M1190", precio: "7,16 €", pvp: "16,28 €" },
  { code: "OG001", precio: "171,35 €", pvp: "199,00 €" },
  { code: "OG002", precio: "343,75 €", pvp: "359,10 €" },
  { code: "OG003", precio: "187,50 €", pvp: "225,00 €" },
  { code: "OG004", precio: "343,75 €", pvp: "359,10 €" },
  { code: "OG005", precio: "250,00 €", pvp: "269,10 €" },
  { code: "OG006", precio: "200,00 €", pvp: "261,00 €" },
  { code: "OG007", precio: "343,75 €", pvp: "287,10 €" },
  { code: "P3031", precio: "184,00 €", pvp: "200,00 €" },
  { code: "T0150", precio: "21,88 €", pvp: "30,63 €" },
  { code: "T0302", precio: "12,19 €", pvp: "18,60 €" },
  { code: "T0480", precio: "12,19 €", pvp: "18,60 €" },
  { code: "T0500", precio: "12,19 €", pvp: "12,40 €" },
  { code: "T0811", precio: "30,14 €", pvp: "31,00 €" },
  { code: "T0960", precio: "28,14 €", pvp: "42,50 €" },
  { code: "T1061", precio: "50,25 €", pvp: "70,35 €" },
  { code: "T1191", precio: "29,83 €", pvp: "31,00 €" },
  { code: "T1200", precio: "42,61 €", pvp: "59,65 €" },
  { code: "T1572", precio: "15,84 €", pvp: "18,60 €" },
  { code: "T1720", precio: "73,08 €", pvp: "74,50 €" },
  { code: "T2590", precio: "51,64 €", pvp: "72,29 €" },
  { code: "T2830", precio: "37,91 €", pvp: "54,59 €" },
  { code: "T2841", precio: "27,46 €", pvp: "31,00 €" },
  { code: "T3920", precio: "29,05 €", pvp: "32,54 €" }
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
 * Estructura: { código: { precio: number, pvp: number } }
 */
export const priceMap = rawPriceData.reduce((map, item) => {
  map[item.code] = {
    precio: parsePrice(item.precio),
    pvp: parsePrice(item.pvp)
  };
  return map;
}, {});

/**
 * Obtiene precio de un biomarcador por código
 * @param {string} code - Código del biomarcador
 * @param {string} priceType - Tipo de precio ('precio' o 'pvp')
 * @returns {number} - Precio del biomarcador
 */
export const getPriceByCode = (code, priceType = 'precio') => {
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
 * @returns {object|null} - Objeto con precios, o null si no existe
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
  const precioValues = prices.map(p => p.precio).filter(p => p > 0);
  const pvpValues = prices.map(p => p.pvp).filter(p => p > 0);
  
  return {
    totalBiomarkers: prices.length,
    precioStats: {
      min: Math.min(...precioValues),
      max: Math.max(...precioValues),
      avg: precioValues.reduce((a, b) => a + b, 0) / precioValues.length
    },
    pvpStats: {
      min: Math.min(...pvpValues),
      max: Math.max(...pvpValues),
      avg: pvpValues.reduce((a, b) => a + b, 0) / pvpValues.length
    }
  };
};

// Exportar datos para debugging
export { rawPriceData }; 

// Compatibilidad con CommonJS para scripts de validación
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    rawPriceData,
    parsePrice,
    priceMap,
    getPriceByCode,
    getPriceDataByCode,
    validatePriceData,
    getPriceStatistics
  };
} 