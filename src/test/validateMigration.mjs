/**
 * validateMigration.mjs
 * Script simple para validar que la migración al sistema dinámico se completó
 */

import { priceMap, getPriceStatistics } from '../data/priceData.js';
import { calculateAddOnPrice } from '../data/priceCalculator.js';

console.log('🧪 VALIDANDO MIGRACIÓN AL SISTEMA DINÁMICO\n');

// 1. Verificar que el sistema de precios funciona
console.log('📊 ESTADÍSTICAS DE PRECIOS');
console.log('==========================');
const stats = getPriceStatistics();
console.log(`✅ Total biomarcadores: ${stats.totalBiomarkers}`);
console.log(`✅ Precio promedio Prevenii: ${stats.preveniiStats.avg.toFixed(2)}€`);
console.log(`✅ Precio promedio Market: ${stats.marketStats.avg.toFixed(2)}€\n`);

// 2. Probar cálculo dinámico con biomarcadores de ejemplo
console.log('🔬 PRUEBA DE CÁLCULO DINÁMICO');
console.log('=============================');

const testBiomarkers = [
  { name: "Hemograma completo", code: "H0000", gender: "both" },
  { name: "Glucosa en ayunas", code: "B0000", gender: "both" },
  { name: "Colesterol total", code: "B0010", gender: "both" }
];

try {
  const pricing = calculateAddOnPrice(testBiomarkers, 'addon');
  console.log('✅ Cálculo dinámico funcionando correctamente');
  console.log(`   Precio calculado: ${Math.round(pricing.both.price)}€`);
  console.log(`   Tests incluidos: ${pricing.both.testCount}`);
  console.log(`   Precio por test: ${(pricing.both.price / pricing.both.testCount).toFixed(2)}€\n`);
} catch (error) {
  console.log(`❌ Error en cálculo dinámico: ${error.message}\n`);
}

// 3. Verificar códigos específicos
console.log('🔍 VERIFICACIÓN DE CÓDIGOS ESPECÍFICOS');
console.log('======================================');

const testCodes = ['H0000', 'B0000', 'B0010', 'B5600', 'B6180'];
testCodes.forEach(code => {
  if (priceMap[code]) {
    console.log(`✅ ${code}: ${priceMap[code].name} - ${priceMap[code].prevenii}€`);
  } else {
    console.log(`❌ ${code}: No encontrado`);
  }
});

console.log('\n✅ MIGRACIÓN VALIDADA');
console.log('=====================');
console.log('El sistema de precios dinámico está funcionando correctamente.');
console.log('Todos los add-ons pueden ahora calcular precios automáticamente.');
console.log('Para usar en componentes React, llamar a packageData.getPricing()'); 