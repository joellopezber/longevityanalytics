/**
 * Cálculo manual del Essential para verificar precios exactos
 * Basado en el CSV real y biomarcadores del Essential
 */

console.log('🧮 CÁLCULO MANUAL ESSENTIAL HOMBRE\n');

// Biomarcadores del Essential para hombre (excluyendo los específicos de mujer)
const essentialBiomarkersHombre = [
  { name: "Hemograma completo", code: "H0000", prevenii: 4.02, market: 6.28 },
  { name: "Hemoglobina A1c", code: "H1420", prevenii: 8.20, market: 11.16 },
  { name: "Glucosa en ayunas", code: "B0000", prevenii: 1.16, market: 2.09 },
  { name: "Albúmina", code: "B0200", prevenii: 1.50, market: 9.30 },
  { name: "Insulina basal", code: "B5600", prevenii: 7.22, market: 16.28 },
  { name: "HOMA-R", code: "B6510", prevenii: 0.00, market: 0.00 },
  { name: "BUN (Urea)", code: "B0020", prevenii: 1.30, market: 2.09 },
  { name: "Creatinina", code: "B0030", prevenii: 0.98, market: 2.09 },
  { name: "Ácido úrico", code: "B0250", prevenii: 1.58, market: 2.33 },
  { name: "eGFR", code: "B1540", prevenii: 0.00, market: 0.00 },
  { name: "Ionograma (Na⁺, K⁺, Cl⁻)", code: "B1260", prevenii: 6.50, market: 8.14 },
  { name: "Fosfatasa alcalina (ALP)", code: "B1970", prevenii: 1.20, market: 2.09 },
  { name: "GPT-ALT", code: "B0050", prevenii: 1.16, market: 2.56 },
  { name: "GOT-AST", code: "B0060", prevenii: 1.12, market: 2.56 },
  { name: "Bilirrubina total", code: "B0080", prevenii: 1.30, market: 3.49 },
  { name: "Proteínas totales", code: "B0240", prevenii: 1.26, market: 2.33 },
  { name: "GGT", code: "B0070", prevenii: 1.30, market: 2.56 },
  { name: "Colesterol total", code: "B0010", prevenii: 1.16, market: 1.16 },
  { name: "Triglicéridos", code: "B0040", prevenii: 1.80, market: 2.17 },
  { name: "HDL-C", code: "B0170", prevenii: 3.72, market: 16.74 },
  { name: "LDL-C", code: "B0180", prevenii: 0.00, market: 0.00 },
  { name: "ApoB", code: "B3110", prevenii: 5.10, market: 5.97 },
  { name: "ApoA-I", code: "B3100", prevenii: 5.10, market: 5.97 },
  { name: "Lp(a)", code: "B7700", prevenii: 15.37, market: 18.60 },
  { name: "Cortisol", code: "B5120", prevenii: 10.89, market: 16.28 },
  { name: "DHEA-S", code: "B5290", prevenii: 8.12, market: 25.58 },
  { name: "SHBG", code: "B6020", prevenii: 16.59, market: 18.60 },
  { name: "Testosterona total", code: "B6160", prevenii: 12.68, market: 18.60 },
  { name: "PTH intacta", code: "B5850", prevenii: 15.12, market: 32.55 },
  { name: "Cistatina-C", code: "I5047", prevenii: 12.89, market: 16.28 },
  { name: "T3 libre", code: "B6040", prevenii: 8.72, market: 20.93 },
  { name: "T4 libre", code: "B6070", prevenii: 8.72, market: 11.16 },
  { name: "TSH", code: "B6130", prevenii: 7.28, market: 11.16 },
  { name: "Homocisteína", code: "B5590", prevenii: 15.00, market: 16.80 },
  { name: "Fósforo", code: "B0120", prevenii: 1.53, market: 3.49 },
  { name: "Calcio total", code: "B0100", prevenii: 1.95, market: 2.56 },
  { name: "Magnesio", code: "B1600", prevenii: 5.26, market: 6.20 },
  { name: "Zinc", code: "B8050", prevenii: 14.63, market: 17.06 },
  { name: "Hierro", code: "B0130", prevenii: 2.60, market: 3.49 },
  { name: "Transferrina", code: "B3210", prevenii: 8.64, market: 12.40 },
  { name: "Índice saturación transf.", code: "B7260", prevenii: 6.39, market: 9.30 },
  { name: "Ferritina", code: "B5370", prevenii: 7.14, market: 10.00 },
  { name: "Vitamina D (25-OH)", code: "B6180", prevenii: 25.58, market: 34.88 },
  { name: "Vitamina B12", code: "B6190", prevenii: 12.26, market: 14.65 },
  { name: "Folato", code: "B5410", prevenii: 10.23, market: 14.65 }
];

console.log(`Total biomarcadores: ${essentialBiomarkersHombre.length}`);

// Calcular totales sin descuento
let totalPrevenii = 0;
let totalMarket = 0;

essentialBiomarkersHombre.forEach((biomarker, index) => {
  console.log(`${index + 1}. ${biomarker.name} (${biomarker.code}) - Prevenii: ${biomarker.prevenii}€, Market: ${biomarker.market}€`);
  totalPrevenii += biomarker.prevenii;
  totalMarket += biomarker.market;
});

console.log('\n📊 TOTALES SIN DESCUENTO:');
console.log(`Prevenii: ${totalPrevenii.toFixed(2)}€`);
console.log(`Market: ${totalMarket.toFixed(2)}€`);

// Aplicar descuento por volumen (45 tests = 10% descuento)
const testCount = essentialBiomarkersHombre.length;
let descuento = 0;

if (testCount >= 51) {
  descuento = 0.15;
} else if (testCount >= 26) {
  descuento = 0.10;
} else if (testCount >= 11) {
  descuento = 0.05;
}

const finalPrevenii = totalPrevenii * (1 - descuento);
const finalMarket = totalMarket * (1 - descuento);

console.log(`\n💰 DESCUENTO POR VOLUMEN (${testCount} tests): ${(descuento * 100)}%`);
console.log(`Prevenii con descuento: ${finalPrevenii.toFixed(2)}€`);
console.log(`Market con descuento: ${finalMarket.toFixed(2)}€`);

console.log('\n🎯 VALORES ESPERADOS:');
console.log(`Precio final (Prevenii): ${Math.round(finalPrevenii)}€`);
console.log(`PVP referencial (Market): ${Math.round(finalMarket)}€`);

console.log('\n📋 VALORES QUE DEBERÍAS VER:');
console.log(`Precio: ${Math.round(finalPrevenii)}€`);
console.log(`PVP: ${Math.round(finalMarket)}€`); 