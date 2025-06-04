/**
 * Verificar que los precios del sistema coincidan exactamente con Price_Biomarker.csv
 * Versión para Node.js
 */

import { getPriceByCode } from '../data/priceData.js';

console.log('🔍 VERIFICANDO PRECIOS vs Price_Biomarker.csv\n');

// Precios del CSV Price_Biomarker.csv (convertidos a números)
const preciosCSV = {
  "H0000": { prevenii: 4.02, market: 6.28 },
  "H1420": { prevenii: 8.20, market: 11.16 },
  "B0000": { prevenii: 1.16, market: 2.09 },
  "B0200": { prevenii: 1.50, market: 9.30 },
  "B5600": { prevenii: 7.22, market: 16.28 },
  "B6510": { prevenii: 0.00, market: 0.00 },
  "B0270": { prevenii: 8.89, market: 9.33 },
  "B0750": { prevenii: 13.28, market: 16.28 },
  "H0050": { prevenii: 8.75, market: 9.77 },
  "H0850": { prevenii: 4.66, market: 9.77 },
  "H0860": { prevenii: 4.66, market: 9.77 },
  "B0020": { prevenii: 1.30, market: 2.09 },
  "B0030": { prevenii: 0.98, market: 2.09 },
  "B0250": { prevenii: 1.58, market: 2.33 },
  "B1540": { prevenii: 0.00, market: 0.00 },
  "B1260": { prevenii: 6.50, market: 8.14 },
  "B1970": { prevenii: 1.20, market: 2.09 },
  "B0050": { prevenii: 1.16, market: 2.56 },
  "B0060": { prevenii: 1.12, market: 2.56 },
  "B0080": { prevenii: 1.30, market: 3.49 },
  "B0260": { prevenii: 1.42, market: 5.81 },
  "B0240": { prevenii: 1.26, market: 2.33 },
  "B0070": { prevenii: 1.30, market: 2.56 },
  "B1980": { prevenii: 7.66, market: 9.30 },
  "B0350": { prevenii: 3.58, market: 6.98 },
  "B0110": { prevenii: 1.65, market: 6.98 },
  "B0010": { prevenii: 1.16, market: 1.16 },
  "B0040": { prevenii: 1.80, market: 2.17 },
  "B0170": { prevenii: 3.72, market: 16.74 },
  "B0180": { prevenii: 0.00, market: 0.00 },
  "B1900": { prevenii: 12.91, market: 14.65 },
  "B0190": { prevenii: 0.00, market: 0.00 },
  "B3110": { prevenii: 5.10, market: 5.97 },
  "B3100": { prevenii: 5.10, market: 5.97 },
  "B7700": { prevenii: 15.37, market: 18.60 },
  "T2590": { prevenii: 51.64, market: 72.29 },
  "D1111": { prevenii: 47.11, market: 65.96 },
  "I3291": { prevenii: 34.38, market: 47.85 },
  "B5120": { prevenii: 10.89, market: 16.28 },
  "B5290": { prevenii: 8.12, market: 25.58 },
  "B5350": { prevenii: 12.48, market: 16.28 },
  "B5980": { prevenii: 7.52, market: 16.28 },
  "B5800": { prevenii: 7.52, market: 18.60 },
  "B5380": { prevenii: 7.52, market: 18.60 },
  "B6020": { prevenii: 16.59, market: 18.60 },
  "D0601": { prevenii: 21.28, market: 32.55 },
  "B6480": { prevenii: 0.00, market: 32.55 },
  "B6160": { prevenii: 12.68, market: 18.60 },
  "B5850": { prevenii: 15.12, market: 32.55 },
  "I5047": { prevenii: 12.89, market: 16.28 },
  "B6040": { prevenii: 8.72, market: 20.93 },
  "B6070": { prevenii: 8.72, market: 11.16 },
  "B6030": { prevenii: 20.38, market: 32.55 },
  "B6010": { prevenii: 29.48, market: 32.55 },
  "D0850": { prevenii: 36.06, market: 37.87 },
  "B5932": { prevenii: 8.32, market: 16.28 },
  "D0181": { prevenii: 19.88, market: 25.58 },
  "D1001": { prevenii: 49.50, market: 50.80 },
  "D1760": { prevenii: 13.26, market: 20.93 },
  "I6740": { prevenii: 11.18, market: 32.55 },
  "B6130": { prevenii: 7.28, market: 11.16 },
  "D0780": { prevenii: 39.07, market: 43.40 },
  "B2120": { prevenii: 27.50, market: 38.50 },
  "B0220": { prevenii: 4.18, market: 6.98 },
  "B3170": { prevenii: 5.37, market: 20.93 },
  "B5590": { prevenii: 15.00, market: 16.80 },
  "H0020": { prevenii: 1.96, market: 2.48 },
  "B7790": { prevenii: 39.06, market: 41.02 },
  "I2081": { prevenii: 60.58, market: 84.81 },
  "T1572": { prevenii: 15.84, market: 18.60 },
  "B0120": { prevenii: 1.53, market: 3.49 },
  "B0100": { prevenii: 1.95, market: 2.56 },
  "B1600": { prevenii: 5.26, market: 6.20 },
  "B8060": { prevenii: 12.19, market: 17.06 },
  "T0500": { prevenii: 12.19, market: 12.40 },
  "T3920": { prevenii: 29.05, market: 32.54 },
  "B8050": { prevenii: 14.63, market: 17.06 },
  "B0130": { prevenii: 2.60, market: 3.49 },
  "B3210": { prevenii: 8.64, market: 12.40 },
  "B7260": { prevenii: 6.39, market: 9.30 },
  "B5370": { prevenii: 7.14, market: 10.00 },
  "B6180": { prevenii: 25.58, market: 34.88 },
  "D0560": { prevenii: 41.63, market: 46.50 },
  "B6190": { prevenii: 12.26, market: 14.65 },
  "B5410": { prevenii: 10.23, market: 14.65 }
};

console.log('📋 VERIFICACIÓN PRECIO POR PRECIO:');
console.log('==================================');

let errores = [];
let correctos = 0;
let total = 0;

// Verificar cada código del CSV
Object.keys(preciosCSV).forEach(codigo => {
  const csvPrevenii = preciosCSV[codigo].prevenii;
  const csvMarket = preciosCSV[codigo].market;
  
  const sistemaPrevenii = getPriceByCode(codigo, 'prevenii');
  const sistemaMarket = getPriceByCode(codigo, 'market');
  
  total++;
  
  const preveniiiOk = Math.abs(sistemaPrevenii - csvPrevenii) < 0.01;
  const marketOk = Math.abs(sistemaMarket - csvMarket) < 0.01;
  
  if (preveniiiOk && marketOk) {
    correctos++;
    console.log(`✅ ${codigo}: Prevenii ${sistemaPrevenii}€, Market ${sistemaMarket}€`);
  } else {
    errores.push({
      codigo,
      csvPrevenii,
      csvMarket,
      sistemaPrevenii,
      sistemaMarket,
      preveniiiOk,
      marketOk
    });
    console.log(`❌ ${codigo}:`);
    console.log(`   CSV: Prevenii ${csvPrevenii}€, Market ${csvMarket}€`);
    console.log(`   Sistema: Prevenii ${sistemaPrevenii}€, Market ${sistemaMarket}€`);
  }
});

console.log('\n📊 RESUMEN DE VERIFICACIÓN:');
console.log('===========================');
console.log(`Total códigos verificados: ${total}`);
console.log(`Correctos: ${correctos}`);
console.log(`Con errores: ${errores.length}`);
console.log(`Porcentaje de acierto: ${((correctos / total) * 100).toFixed(1)}%`);

if (errores.length > 0) {
  console.log('\n❌ ERRORES ENCONTRADOS:');
  console.log('=======================');
  errores.forEach(error => {
    console.log(`${error.codigo}:`);
    if (!error.preveniiiOk) {
      console.log(`  Prevenii: CSV ${error.csvPrevenii}€ vs Sistema ${error.sistemaPrevenii}€`);
    }
    if (!error.marketOk) {
      console.log(`  Market: CSV ${error.csvMarket}€ vs Sistema ${error.sistemaMarket}€`);
    }
  });
}

if (errores.length === 0) {
  console.log('\n🎉 ¡PERFECTO! Todos los precios coinciden exactamente con Price_Biomarker.csv');
} else {
  console.log(`\n⚠️ Hay ${errores.length} códigos con precios que no coinciden con el CSV`);
} 