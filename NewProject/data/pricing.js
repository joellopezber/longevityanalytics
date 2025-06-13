/**
 * PRECIOS POR CÓDIGO DE BIOMARCADOR
 * Base de datos de precios actualizada para todos los biomarcadores
 */

export const PRICING = {
  // ANÁLISIS BÁSICOS
  "6897": { precio: 8.08, pvp: 9.30, name: "Urianálisis + sedimento" },
  "AB001": { precio: 273.90, pvp: 299.00, name: "Microbioma intestinal" },
  "AB002": { precio: 383.90, pvp: 399.00, name: "Metaboloma" },
  
  // BIOQUÍMICA BÁSICA
  "B0000": { precio: 1.16, pvp: 2.09, name: "Glucosa en ayunas" },
  "B0010": { precio: 1.16, pvp: 1.16, name: "Colesterol total" },
  "B0020": { precio: 1.30, pvp: 2.09, name: "BUN (Urea)" },
  "B0030": { precio: 0.98, pvp: 2.09, name: "Creatinina" },
  "B0040": { precio: 1.80, pvp: 2.17, name: "Triglicéridos" },
  "B0050": { precio: 1.16, pvp: 2.56, name: "GPT-ALT" },
  "B0060": { precio: 1.12, pvp: 2.56, name: "GOT-AST" },
  "B0070": { precio: 1.30, pvp: 2.56, name: "GGT" },
  "B0080": { precio: 1.30, pvp: 3.49, name: "Bilirrubina total" },
  "B0100": { precio: 1.95, pvp: 2.56, name: "Calcio total" },
  "B0110": { precio: 1.65, pvp: 6.98, name: "LDH" },
  "B0120": { precio: 1.53, pvp: 3.49, name: "Fósforo" },
  "B0130": { precio: 2.60, pvp: 3.49, name: "Hierro" },
  "B0170": { precio: 3.72, pvp: 16.74, name: "HDL-C" },
  "B0180": { precio: 0.00, pvp: 0.00, name: "LDL-C" },
  "B0190": { precio: 0.00, pvp: 0.00, name: "VLDL" },
  "B0200": { precio: 1.50, pvp: 9.30, name: "Albúmina" },
  "B0220": { precio: 4.18, pvp: 6.98, name: "CPK total" },
  "B0240": { precio: 1.26, pvp: 2.33, name: "Proteínas totales" },
  "B0250": { precio: 1.58, pvp: 2.33, name: "Ácido úrico" },
  "B0260": { precio: 1.42, pvp: 5.81, name: "Bilirrubina directa" },
  "B0270": { precio: 8.89, pvp: 9.33, name: "Osmolalidad sérica" },
  "B0350": { precio: 3.58, pvp: 6.98, name: "Amilasa" },
  "B0750": { precio: 13.28, pvp: 16.28, name: "Ácido láctico" },
  
  // ELECTROLITOS Y MINERALES
  "B1260": { precio: 6.50, pvp: 8.14, name: "Ionograma" },
  "B1540": { precio: 0.00, pvp: 0.00, name: "eGFR" },
  "B1600": { precio: 5.26, pvp: 6.20, name: "Magnesio" },
  "B1900": { precio: 12.91, pvp: 14.65, name: "LDL directo" },
  "B1970": { precio: 1.20, pvp: 2.09, name: "Fosfatasa alcalina" },
  "B1980": { precio: 7.66, pvp: 9.30, name: "Lipasa" },
  "B2120": { precio: 27.50, pvp: 38.50, name: "CK-MB" },
  
  // ANTIOXIDANTES Y ESTRÉS OXIDATIVO
  "B3015": { precio: 72.19, pvp: 101.06, name: "Glutatión peroxidasa" },
  "B3041": { precio: 21.86, pvp: 30.61, name: "G6PD" },
  "B7121": { precio: 50.00, pvp: 70.00, name: "Glutatión reductasa + B2" },
  
  // PERFIL CARDIOVASCULAR
  "B3100": { precio: 5.10, pvp: 5.97, name: "ApoA-I" },
  "B3110": { precio: 5.10, pvp: 5.97, name: "ApoB" },
  "B3170": { precio: 5.37, pvp: 20.93, name: "PCR (hsCRP)" },
  "B7700": { precio: 15.37, pvp: 18.60, name: "Lp(a)" },
  
  // METABOLISMO HIERRO
  "B3210": { precio: 8.64, pvp: 12.40, name: "Transferrina" },
  "B5370": { precio: 7.14, pvp: 10.00, name: "Ferritina" },
  "B7260": { precio: 6.39, pvp: 9.30, name: "Índice saturación transf." },
  
  // HORMONAS GENERALES
  "B5120": { precio: 10.89, pvp: 16.28, name: "Cortisol" },
  "B5290": { precio: 8.12, pvp: 25.58, name: "DHEA-S" },
  "B5350": { precio: 12.48, pvp: 16.28, name: "Estradiol" },
  "B5380": { precio: 7.52, pvp: 18.60, name: "FSH" },
  "B5420": { precio: 10.48, pvp: 18.60, name: "Hormona de crecimiento" },
  "B5800": { precio: 7.52, pvp: 18.60, name: "LH" },
  "B5850": { precio: 15.12, pvp: 32.55, name: "PTH intacta" },
  "B5980": { precio: 7.52, pvp: 16.28, name: "Prolactina" },
  "B6020": { precio: 16.59, pvp: 18.60, name: "SHBG" },
  "B6160": { precio: 12.68, pvp: 18.60, name: "Testosterona total" },
  
  // HORMONAS ESPECÍFICAS
  "B6480": { precio: 0.00, pvp: 0.00, name: "Testosterona biodisp." },
  "D0601": { precio: 21.28, pvp: 32.55, name: "Testosterona libre" },
  "D0850": { precio: 36.06, pvp: 37.87, name: "DHT" },
  "B5830": { precio: 7.40, pvp: 18.60, name: "PSA total" },
  "B5840": { precio: 5.56, pvp: 18.60, name: "PSA libre" },
  "B3340": { precio: 32.81, pvp: 34.10, name: "Espermiograma" },
  "B5932": { precio: 8.32, pvp: 16.28, name: "Progesterona" },
  "D0181": { precio: 19.88, pvp: 25.58, name: "17-OH-Progesterona" },
  "D0780": { precio: 39.07, pvp: 43.40, name: "Estrona" },
  "D1001": { precio: 49.50, pvp: 50.80, name: "AMH" },
  "B8110": { precio: 24.83, pvp: 34.76, name: "HE4" },
  
  // EJE GH/IGF
  "B6010": { precio: 29.48, pvp: 32.55, name: "IGFBP-3" },
  "B6030": { precio: 20.38, pvp: 32.55, name: "IGF-1" },
  "I6740": { precio: 11.18, pvp: 32.55, name: "ACTH" },
  
  // TIROIDES
  "B6040": { precio: 8.72, pvp: 20.93, name: "T3 libre" },
  "B6070": { precio: 8.72, pvp: 11.16, name: "T4 libre" },
  "B6130": { precio: 7.28, pvp: 11.16, name: "TSH" },
  "B6300": { precio: 5.85, pvp: 24.80, name: "anti-TPO" },
  "B6321": { precio: 5.85, pvp: 24.80, name: "anti-Tg" },
  
  // VITAMINAS
  "B5410": { precio: 10.23, pvp: 14.65, name: "Folato" },
  "B6180": { precio: 25.58, pvp: 34.88, name: "Vitamina D (25-OH)" },
  "B6190": { precio: 12.26, pvp: 14.65, name: "Vitamina B12" },
  "D0560": { precio: 41.63, pvp: 46.50, name: "Vitamina D 1,25-OH" },
  "T0811": { precio: 30.14, pvp: 31.00, name: "Retinol (Vit A)" },
  "T1061": { precio: 50.25, pvp: 70.35, name: "Vitamina C" },
  "T1191": { precio: 29.83, pvp: 31.00, name: "α-Tocoferol (Vit E)" },
  "T2841": { precio: 27.46, pvp: 31.00, name: "γ-Tocoferol" },
  "T1720": { precio: 73.08, pvp: 74.50, name: "Vitamina K1" },
  
  // METABOLISMO
  "B5590": { precio: 15.00, pvp: 16.80, name: "Homocisteína" },
  "B5600": { precio: 7.22, pvp: 16.28, name: "Insulina basal" },
  "B6510": { precio: 0.00, pvp: 0.00, name: "HOMA-R" },
  
  // MINERALES Y OLIGOELEMENTOS
  "T0500": { precio: 12.19, pvp: 12.40, name: "Cromo" },
  "B8050": { precio: 14.63, pvp: 17.06, name: "Zinc" },
  "B8060": { precio: 12.19, pvp: 17.06, name: "Cobre" },
  "T3920": { precio: 29.05, pvp: 32.54, name: "Selenio" },
  "T1572": { precio: 15.84, pvp: 18.60, name: "Calcio iónico" },
  
  // METALES PESADOS
  "T0150": { precio: 21.88, pvp: 30.63, name: "Plomo" },
  "T0302": { precio: 12.19, pvp: 18.60, name: "Mercurio" },
  "T0480": { precio: 12.19, pvp: 18.60, name: "Cadmio" },
  "T0960": { precio: 28.14, pvp: 42.50, name: "Arsénico" },
  
  // INFLAMACIÓN
  "B7790": { precio: 39.06, pvp: 41.02, name: "IL-6" },
  "I2081": { precio: 60.58, pvp: 84.81, name: "TNF-α" },
  
  // AUTOINMUNIDAD
  "B3130": { precio: 6.33, pvp: 10.85, name: "Factor reumatoide" },
  "I0141": { precio: 16.23, pvp: 24.80, name: "Nucleares An (ANA)" },
  "I5072": { precio: 17.61, pvp: 24.65, name: "anti-CCP" },
  "B7750": { precio: 14.75, pvp: 24.80, name: "Helicobacter pylori IgG An" },
  
  // FUNCIÓN RENAL
  "I5047": { precio: 12.89, pvp: 16.28, name: "Cistatina-C" },
  
  // METABOLISMO ÓSEO
  "D1111": { precio: 47.11, pvp: 65.96, name: "ALP ósea" },
  "I3291": { precio: 34.38, pvp: 47.85, name: "CTX" },
  
  // MARCADORES TUMORALES
  "B5080": { precio: 15.38, pvp: 16.74, name: "CA 125" },
  "B5090": { precio: 15.38, pvp: 27.90, name: "CA 15.3" },
  "B5100": { precio: 15.38, pvp: 16.74, name: "CA 19-9" },
  "B5110": { precio: 8.68, pvp: 12.32, name: "CEA" },
  "B7900": { precio: 7.53, pvp: 16.28, name: "Alfa-feto (AFP)" },
  "B8120": { precio: 30.47, pvp: 32.55, name: "CYFRA 21-1" },
  "B8130": { precio: 22.86, pvp: 32.00, name: "Células escamosas Ag" },
  "B8160": { precio: 44.06, pvp: 61.69, name: "ProGRP" },
  "D1271": { precio: 24.22, pvp: 31.00, name: "CA 72-4" },
  "D1760": { precio: 13.26, pvp: 20.93, name: "β-HCG" },
  "I5080": { precio: 21.78, pvp: 30.49, name: "Proteina s-100" },
  "I5090": { precio: 27.73, pvp: 43.40, name: "NSE" },
  
  // PERFIL LIPÍDICO AVANZADO
  "T2590": { precio: 51.64, pvp: 72.29, name: "Ácidos grasos %" },
  "T2830": { precio: 37.91, pvp: 54.59, name: "Coenzima Q10" },
  "T1200": { precio: 42.61, pvp: 59.65, name: "β-Caroteno" },
  
  // HEMATOLOGÍA
  "H0000": { precio: 4.02, pvp: 6.28, name: "Hemograma completo" },
  "H0020": { precio: 1.96, pvp: 2.48, name: "VSG" },
  "H0050": { precio: 8.75, pvp: 9.77, name: "Fibrinógeno" },
  "H0850": { precio: 4.66, pvp: 9.77, name: "Cefalina-APTT" },
  "H0860": { precio: 4.66, pvp: 9.77, name: "INR (Protrombina)" },
  "H1420": { precio: 8.20, pvp: 11.16, name: "Hemoglobina A1c" },
  
  // ANÁLISIS DIGESTIVOS
  "M0010": { precio: 4.62, pvp: 4.65, name: "Sangre oculta en heces" },
  "M1190": { precio: 7.16, pvp: 16.28, name: "Parásitos en heces" },
  
  // TESTS ESPECIALIZADOS
  "P3031": { precio: 184.00, pvp: 200.00, name: "Intolerancia alimentaria" },
  
  // ANÁLISIS GENÉTICOS
  "OG001": { precio: 171.35, pvp: 199.00, name: "MyEpiAgeing" },
  "G1465": { precio: 541.75, pvp: 573.00, name: "Longitud telomérica" },
  "OG002": { precio: 343.75, pvp: 359.10, name: "MyPharma" },
  "OG003": { precio: 187.50, pvp: 225.00, name: "MyDetox" },
  "OG004": { precio: 343.75, pvp: 359.10, name: "MyDiet" },
  "OG005": { precio: 250.00, pvp: 269.10, name: "MySport" },
  "OG006": { precio: 200.00, pvp: 261.00, name: "MySupplements" }
};

/**
 * Obtiene el precio de un biomarcador específico
 * @param {string} code - Código del biomarcador
 * @param {boolean} usePVP - Si usar PVP o precio base
 * @returns {number} Precio del biomarcador
 */
export const getBiomarkerPrice = (code, usePVP = false) => {
  const pricing = PRICING[code];
  if (!pricing) return 0;
  return usePVP ? pricing.pvp : pricing.precio;
};

/**
 * Calcula el precio total para un array de códigos de biomarcadores
 * @param {string[]} codes - Array de códigos de biomarcadores
 * @param {boolean} usePVP - Si usar PVP o precio base
 * @returns {number} Precio total
 */
export const calculateTotalPrice = (codes, usePVP = false) => {
  return codes.reduce((total, code) => {
    return total + getBiomarkerPrice(code, usePVP);
  }, 0);
};

/**
 * Obtiene detalles de precios para un array de códigos
 * @param {string[]} codes - Array de códigos de biomarcadores
 * @returns {Object} Objeto con detalles de precios
 */
export const getPriceBreakdown = (codes) => {
  const breakdown = codes.map(code => {
    const pricing = PRICING[code];
    return {
      code,
      name: pricing?.name || 'Desconocido',
      precio: pricing?.precio || 0,
      pvp: pricing?.pvp || 0
    };
  });
  
  const totalPrecio = breakdown.reduce((sum, item) => sum + item.precio, 0);
  const totalPVP = breakdown.reduce((sum, item) => sum + item.pvp, 0);
  
  return {
    breakdown,
    totals: {
      precio: totalPrecio,
      pvp: totalPVP,
      discount: totalPVP - totalPrecio,
      discountPercentage: totalPVP > 0 ? ((totalPVP - totalPrecio) / totalPVP * 100).toFixed(1) : 0
    }
  };
};

export default PRICING; 