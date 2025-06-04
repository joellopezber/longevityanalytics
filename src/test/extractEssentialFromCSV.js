/**
 * Extrae los biomarcadores correctos del Essential según Longevity Analytics.csv
 */

console.log('🔍 EXTRAYENDO ESSENTIAL CORRECTO DEL CSV\n');

// Datos del CSV Longevity Analytics - Solo biomarcadores con ✅ en LA_Essential_M
const essentialMaleFromCSV = [
  { name: "Hemograma completo", code: "H0000" },
  { name: "Hemoglobina A1c", code: "H1420" },
  { name: "Glucosa en ayunas", code: "B0000" },
  { name: "Albúmina", code: "B0200" },
  { name: "Insulina basal", code: "B5600" },
  { name: "HOMA-R", code: "B6510" },
  { name: "BUN (Urea)", code: "B0020" },
  { name: "Creatinina", code: "B0030" },
  { name: "Ácido úrico", code: "B0250" },
  { name: "eGFR", code: "B1540" },
  { name: "Ionograma (Na⁺, K⁺, Cl⁻)", code: "B1260" },
  { name: "Fosfatasa alcalina (ALP)", code: "B1970" },
  { name: "GPT-ALT", code: "B0050" },
  { name: "GOT-AST", code: "B0060" },
  { name: "Bilirrubina total", code: "B0080" },
  { name: "Proteínas totales", code: "B0240" },
  { name: "GGT", code: "B0070" },
  { name: "Colesterol total", code: "B0010" },
  { name: "Triglicéridos", code: "B0040" },
  { name: "HDL-C", code: "B0170" },
  { name: "LDL-C", code: "B0180" },
  { name: "ApoB", code: "B3110" },
  { name: "ApoA-I", code: "B3100" },
  { name: "Cortisol", code: "B5120" },
  { name: "DHEA-S", code: "B5290" },
  { name: "SHBG", code: "B6020" },
  { name: "Testosterona total", code: "B6160" }, // Solo para hombre
  { name: "PTH intacta (PTHi)", code: "B5850" },
  { name: "T3 libre", code: "B6040" },
  { name: "T4 libre", code: "B6070" },
  { name: "TSH", code: "B6130" },
  { name: "PCR (hsCRP)", code: "B3170" },
  { name: "Homocisteína", code: "B5590" },
  { name: "Fósforo", code: "B0120" },
  { name: "Calcio total", code: "B0100" },
  { name: "Magnesio", code: "B1600" },
  { name: "Zinc", code: "B8050" },
  { name: "Hierro", code: "B0130" },
  { name: "Transferrina", code: "B3210" },
  { name: "Índice saturación transf.", code: "B7260" },
  { name: "Ferritina", code: "B5370" },
  { name: "Vitamina D (25-OH)", code: "B6180" },
  { name: "Vitamina B12", code: "B6190" },
  { name: "Folato", code: "B5410" }
];

console.log(`📋 ESSENTIAL HOMBRE SEGÚN CSV: ${essentialMaleFromCSV.length} biomarcadores\n`);

// Calcular precios usando los precios del CSV de precios
const priceData = {
  "H0000": { prevenii: 4.02, market: 6.28 },
  "H1420": { prevenii: 8.20, market: 11.16 },
  "B0000": { prevenii: 1.16, market: 2.09 },
  "B0200": { prevenii: 1.50, market: 9.30 },
  "B5600": { prevenii: 7.22, market: 16.28 },
  "B6510": { prevenii: 0.00, market: 0.00 },
  "B0020": { prevenii: 1.30, market: 2.09 },
  "B0030": { prevenii: 0.98, market: 2.09 },
  "B0250": { prevenii: 1.58, market: 2.33 },
  "B1540": { prevenii: 0.00, market: 0.00 },
  "B1260": { prevenii: 6.50, market: 8.14 },
  "B1970": { prevenii: 1.20, market: 2.09 },
  "B0050": { prevenii: 1.16, market: 2.56 },
  "B0060": { prevenii: 1.12, market: 2.56 },
  "B0080": { prevenii: 1.30, market: 3.49 },
  "B0240": { prevenii: 1.26, market: 2.33 },
  "B0070": { prevenii: 1.30, market: 2.56 },
  "B0010": { prevenii: 1.16, market: 1.16 },
  "B0040": { prevenii: 1.80, market: 2.17 },
  "B0170": { prevenii: 3.72, market: 16.74 },
  "B0180": { prevenii: 0.00, market: 0.00 },
  "B3110": { prevenii: 5.10, market: 5.97 },
  "B3100": { prevenii: 5.10, market: 5.97 },
  "B5120": { prevenii: 10.89, market: 16.28 },
  "B5290": { prevenii: 8.12, market: 25.58 },
  "B6020": { prevenii: 16.59, market: 18.60 },
  "B6160": { prevenii: 12.68, market: 18.60 },
  "B5850": { prevenii: 15.12, market: 32.55 },
  "B6040": { prevenii: 8.72, market: 20.93 },
  "B6070": { prevenii: 8.72, market: 11.16 },
  "B6130": { prevenii: 7.28, market: 11.16 },
  "B3170": { prevenii: 5.37, market: 20.93 },
  "B5590": { prevenii: 15.00, market: 16.80 },
  "B0120": { prevenii: 1.53, market: 3.49 },
  "B0100": { prevenii: 1.95, market: 2.56 },
  "B1600": { prevenii: 5.26, market: 6.20 },
  "B8050": { prevenii: 14.63, market: 17.06 },
  "B0130": { prevenii: 2.60, market: 3.49 },
  "B3210": { prevenii: 8.64, market: 12.40 },
  "B7260": { prevenii: 6.39, market: 9.30 },
  "B5370": { prevenii: 7.14, market: 10.00 },
  "B6180": { prevenii: 25.58, market: 34.88 },
  "B6190": { prevenii: 12.26, market: 14.65 },
  "B5410": { prevenii: 10.23, market: 14.65 }
};

let totalPrevenii = 0;
let totalMarket = 0;

essentialMaleFromCSV.forEach((biomarker, index) => {
  const prices = priceData[biomarker.code];
  if (prices) {
    console.log(`${index + 1}. ${biomarker.name} (${biomarker.code}) - Prevenii: ${prices.prevenii}€, Market: ${prices.market}€`);
    totalPrevenii += prices.prevenii;
    totalMarket += prices.market;
  } else {
    console.log(`${index + 1}. ❌ ${biomarker.name} (${biomarker.code}) - PRECIO NO ENCONTRADO`);
  }
});

console.log('\n📊 TOTALES SIN DESCUENTO:');
console.log(`Prevenii: ${totalPrevenii.toFixed(2)}€`);
console.log(`Market: ${totalMarket.toFixed(2)}€`);

// Aplicar descuento por volumen (44 tests = 10% descuento)
const testCount = essentialMaleFromCSV.length;
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

console.log('\n🎯 VALORES CALCULADOS:');
console.log(`Precio final (Prevenii): ${Math.round(finalPrevenii)}€`);
console.log(`PVP referencial (Market): ${Math.round(finalMarket)}€`);

console.log('\n📋 VALORES ESPERADOS DEL CSV:');
console.log(`Precio: 259€`);
console.log(`PVP: 402€`);

console.log('\n🔍 DIFERENCIAS:');
console.log(`Diferencia precio: ${Math.abs(Math.round(finalPrevenii) - 259)}€`);
console.log(`Diferencia PVP: ${Math.abs(Math.round(finalMarket) - 402)}€`); 