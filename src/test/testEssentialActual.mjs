/**
 * Test para verificar qué está devolviendo calculatePackagePrice para Essential
 */

import { calculatePackagePrice } from '../data/priceCalculator.js';
import { essentialPackage } from '../data/biomarkers.js';

console.log('🔍 TESTING ESSENTIAL ACTUAL\n');

// Test para hombre
console.log('=== ESSENTIAL HOMBRE ===');
const resultadoHombre = calculatePackagePrice(essentialPackage.biomarkers, 'male', 'essential');
console.log('Resultado completo:', JSON.stringify(resultadoHombre, null, 2));
console.log(`Precio final (costPrice): ${resultadoHombre.costPrice}€`);
console.log(`PVP (marketPrice): ${resultadoHombre.marketPrice}€`);
console.log(`Número de tests: ${resultadoHombre.testCount}`);

console.log('\n=== ESSENTIAL MUJER ===');
const resultadoMujer = calculatePackagePrice(essentialPackage.biomarkers, 'female', 'essential');
console.log('Resultado completo:', JSON.stringify(resultadoMujer, null, 2));
console.log(`Precio final (costPrice): ${resultadoMujer.costPrice}€`);
console.log(`PVP (marketPrice): ${resultadoMujer.marketPrice}€`);
console.log(`Número de tests: ${resultadoMujer.testCount}`);

console.log('\n=== VERIFICACIÓN BIOMARCADORES ===');
console.log(`Total biomarcadores en Essential: ${essentialPackage.biomarkers.length}`);

// Filtrar por género para ver cuántos aplican
const biomarkersHombre = essentialPackage.biomarkers.filter(biomarker => {
  if (!biomarker.gender || biomarker.gender === 'both') return true;
  return biomarker.gender === 'male';
});

const biomarkersMujer = essentialPackage.biomarkers.filter(biomarker => {
  if (!biomarker.gender || biomarker.gender === 'both') return true;
  return biomarker.gender === 'female';
});

console.log(`Biomarcadores para hombre: ${biomarkersHombre.length}`);
console.log(`Biomarcadores para mujer: ${biomarkersMujer.length}`);

console.log('\n=== COMPARACIÓN CON VALORES ESPERADOS ===');
console.log('Valores esperados del CSV Longevity Analytics:');
console.log('Hombre: Precio 259€, PVP 402€');
console.log('Mujer: Precio 259€, PVP 384€');

const hombreOk = Math.abs(resultadoHombre.costPrice - 259) < 0.01;
const mujerOk = Math.abs(resultadoMujer.costPrice - 259) < 0.01;

console.log(`\n✅ Hombre correcto: ${hombreOk}`);
console.log(`✅ Mujer correcto: ${mujerOk}`);

if (!hombreOk || !mujerOk) {
  console.log('\n❌ HAY PROBLEMAS EN EL CÁLCULO DEL ESSENTIAL');
} else {
  console.log('\n🎉 Essential calculando correctamente');
} 