/**
 * TEST FINAL: Verificación completa de Performance
 * Verifica que todos los add-ons funcionen correctamente con las exclusiones actualizadas
 */

import { performancePackage } from './data/analysisPackages.js';
import { getAddOnPackagesForProfile, getAddOnFilteringInfo } from './data/addOnPackages.js';

console.log('🧪 TEST FINAL: Performance con Add-Ons Actualizados');
console.log('===================================================\n');

const selectedGender = 'both';
const selectedProfile = 'performance';

// 1. VERIFICAR ADD-ONS RECOMENDADOS
console.log('1. Add-ons recomendados en Performance:');
const recommendedAddOns = performancePackage.recommendedAddOns;
console.log(`Total recomendados: ${recommendedAddOns.length}`);
console.log(`Lista: ${recommendedAddOns.join(', ')}\n`);

// 2. OBTENER CÓDIGOS BASE
const performanceForGender = performancePackage.getForGender(selectedGender);
const baseCodes = performanceForGender.biomarkers.map(bio => bio.code);
console.log('2. Perfil Performance:');
console.log(`Biomarcadores base: ${baseCodes.length}`);

// 3. VERIFICAR ADD-ONS DISPONIBLES
console.log('\n3. Add-ons disponibles en el frontend:');
const filteredAddOns = getAddOnPackagesForProfile(selectedGender, baseCodes, selectedProfile);
const availableAddOns = Object.keys(filteredAddOns);
console.log(`Total disponibles: ${availableAddOns.length}`);
console.log(`Disponibles: ${availableAddOns.join(', ')}\n`);

// 4. ANÁLISIS DETALLADO
console.log('4. Análisis detallado de cada add-on:');
console.log('=' .repeat(50));

let totalUniqueTests = 0;
let totalAddOnPrice = 0;

for (const addOnId of recommendedAddOns) {
  if (addOnId in filteredAddOns) {
    const addOn = filteredAddOns[addOnId];
    const filteringInfo = getAddOnFilteringInfo(addOnId, selectedGender, baseCodes, selectedProfile);
    
    console.log(`\n✅ ${addOnId.toUpperCase()}`);
    console.log(`   Tests únicos: ${addOn.testCount}`);
    console.log(`   Precio: €${addOn.price}`);
    console.log(`   Exclusiones: ${filteringInfo.exclusions.totalExcluded}`);
    console.log(`   Biomarcadores: ${filteringInfo.filtered.codes.join(', ')}`);
    
    totalUniqueTests += addOn.testCount;
    totalAddOnPrice += addOn.price;
  } else {
    console.log(`\n❌ ${addOnId.toUpperCase()} - NO DISPONIBLE`);
  }
}

// 5. CASOS ESPECÍFICOS DE INTERÉS
console.log('\n\n5. Verificación de casos específicos:');
console.log('=' .repeat(40));

// Digest
if ('digest' in filteredAddOns) {
  console.log(`✅ DIGEST está disponible con ${filteredAddOns.digest.testCount} biomarcadores`);
} else {
  console.log('❌ DIGEST no está disponible');
}

// Inflamación
if ('inflammation' in filteredAddOns) {
  const inflammationAddOn = filteredAddOns.inflammation;
  console.log(`✅ INFLAMMATION está disponible con ${inflammationAddOn.testCount} biomarcador(es)`);
  console.log(`   Debería mostrar solo VSG (H0020)`);
  const codes = inflammationAddOn.biomarkers.map(bio => bio.code);
  console.log(`   Códigos reales: ${codes.join(', ')}`);
} else {
  console.log('❌ INFLAMMATION no está disponible');
}

// Hormonas
if ('hormonas' in filteredAddOns) {
  const hormonasAddOn = filteredAddOns.hormonas;
  console.log(`✅ HORMONAS está disponible con ${hormonasAddOn.testCount} biomarcadores únicos`);
} else {
  console.log('❌ HORMONAS no está disponible');
}

// 6. RESUMEN FINAL
console.log('\n\n📋 RESUMEN FINAL:');
console.log('=' .repeat(30));
console.log(`✅ Add-ons recomendados: ${recommendedAddOns.length}`);
console.log(`✅ Add-ons disponibles: ${availableAddOns.length}`);
console.log(`✅ Tests únicos totales: ${totalUniqueTests}`);
console.log(`💰 Precio total add-ons: €${totalAddOnPrice}`);
console.log(`📊 Precio base Performance: €${performanceForGender.price || performanceForGender.precio}`);

const missingAddOns = recommendedAddOns.filter(addon => !availableAddOns.includes(addon));
const successRate = ((availableAddOns.length / recommendedAddOns.length) * 100).toFixed(1);

console.log(`\n🎯 Tasa de éxito: ${successRate}%`);

if (missingAddOns.length === 0) {
  console.log('\n🎉 ÉXITO: Todos los add-ons recomendados están disponibles y funcionando');
  console.log('👨‍⚕️ Performance está listo para usar en el frontend');
} else {
  console.log(`\n⚠️ ATENCIÓN: ${missingAddOns.length} add-on(s) faltan: ${missingAddOns.join(', ')}`);
}

// 7. VERIFICACIÓN ESPECÍFICA DE DIGEST
console.log('\n\n🔍 VERIFICACIÓN ESPECÍFICA DE DIGEST:');
console.log('=' .repeat(40));

if ('digest' in filteredAddOns) {
  const digestAddOn = filteredAddOns.digest;
  const digestInfo = getAddOnFilteringInfo('digest', selectedGender, baseCodes, selectedProfile);
  
  console.log(`✅ Add-on digest disponible`);
  console.log(`📊 Biomarcadores: ${digestAddOn.testCount}/4 (esperado: 4)`);
  console.log(`💰 Precio: €${digestAddOn.price}`);
  console.log(`🧬 Códigos: ${digestInfo.filtered.codes.join(', ')}`);
  console.log(`📝 Exclusiones: ${digestInfo.exclusions.totalExcluded} (esperado: 0)`);
  
  if (digestAddOn.testCount === 4 && digestInfo.exclusions.totalExcluded === 0) {
    console.log('🎉 DIGEST funciona perfectamente para Performance');
  } else {
    console.log('⚠️ DIGEST tiene configuración inesperada');
  }
} else {
  console.log('❌ Add-on digest NO disponible - revisar configuración');
} 