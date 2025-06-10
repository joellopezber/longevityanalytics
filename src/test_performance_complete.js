/**
 * Test Completo: Verificación de Add-Ons en Performance
 * Verifica que todos los add-ons necesarios estén presentes y con exclusiones correctas
 */

import { performancePackage } from './data/analysisPackages.js';
import { 
  getAddOnPackagesForProfile, 
  addOnPackages, 
  PROFILE_EXCLUSIONS,
  getAddOnFilteringInfo 
} from './data/addOnPackages.js';

console.log('🧪 TEST COMPLETO: Add-Ons en Performance');
console.log('========================================\n');

// 1. VERIFICAR ADD-ONS RECOMENDADOS
console.log('1. Add-ons recomendados en Performance:');
const recommendedAddOns = performancePackage.recommendedAddOns;
console.log('Recomendados:', recommendedAddOns);
console.log(`Total: ${recommendedAddOns.length}\n`);

// 2. OBTENER CÓDIGOS BASE DE PERFORMANCE
const selectedGender = 'both';
const performanceForGender = performancePackage.getForGender(selectedGender);
const baseCodes = performanceForGender.biomarkers.map(bio => bio.code);
console.log('2. Códigos base en Performance:');
console.log(`Total biomarcadores: ${baseCodes.length}`);
console.log('Códigos:', baseCodes.slice(0, 10), '...(mostrando 10 primeros)\n');

// 3. VERIFICAR ADD-ONS DISPONIBLES EN FRONTEND
console.log('3. Add-ons disponibles en el frontend:');
const filteredAddOns = getAddOnPackagesForProfile(selectedGender, baseCodes, 'performance');
const availableAddOns = Object.keys(filteredAddOns);
console.log(`Add-ons mostrados: ${availableAddOns.join(', ')}`);
console.log(`Total disponibles: ${availableAddOns.length}\n`);

// 4. VERIFICAR QUE TODOS LOS RECOMENDADOS APAREZCAN
console.log('4. Verificación de add-ons recomendados vs disponibles:');
const missingAddOns = recommendedAddOns.filter(addon => !availableAddOns.includes(addon));
const extraAddOns = availableAddOns.filter(addon => !recommendedAddOns.includes(addon));

if (missingAddOns.length > 0) {
  console.log(`❌ Add-ons recomendados pero NO disponibles: ${missingAddOns.join(', ')}`);
} else {
  console.log('✅ Todos los add-ons recomendados están disponibles');
}

if (extraAddOns.length > 0) {
  console.log(`ℹ️ Add-ons extra disponibles: ${extraAddOns.join(', ')}`);
}

console.log('\n');

// 5. ANÁLISIS DETALLADO DE CADA ADD-ON
console.log('5. Análisis detallado de exclusiones por add-on:');
console.log('=' .repeat(50));

for (const addOnId of recommendedAddOns) {
  console.log(`\n🔍 ADD-ON: ${addOnId.toUpperCase()}`);
  
  if (addOnId in filteredAddOns) {
    const addOn = filteredAddOns[addOnId];
    const filteringInfo = getAddOnFilteringInfo(addOnId, selectedGender, baseCodes, 'performance');
    
    console.log(`✅ Disponible - ${addOn.testCount} biomarcadores únicos`);
    console.log(`💰 Precio: €${addOn.price}`);
    
    if (filteringInfo.exclusions.totalExcluded > 0) {
      console.log(`📝 Exclusiones (${filteringInfo.exclusions.totalExcluded}):`);
      
      if (filteringInfo.exclusions.fromBaseCodes.length > 0) {
        console.log(`   - Duplicados en Performance: ${filteringInfo.exclusions.fromBaseCodes.map(e => e.code).join(', ')}`);
      }
      
      if (filteringInfo.exclusions.fromProfileRules.length > 0) {
        console.log(`   - Exclusiones específicas: ${filteringInfo.exclusions.fromProfileRules.map(e => e.code).join(', ')}`);
      }
    }
    
    console.log(`🧬 Biomarcadores únicos: ${filteringInfo.filtered.codes.join(', ')}`);
    
  } else {
    console.log(`❌ NO disponible`);
    // Verificar por qué no está disponible
    const originalAddOn = addOnPackages[addOnId];
    if (originalAddOn) {
      const originalForGender = originalAddOn.getForGender(selectedGender);
      const filteredForProfile = originalAddOn.getForProfile(selectedGender, baseCodes, 'performance');
      console.log(`   - Biomarcadores originales: ${originalForGender.testCount}`);
      console.log(`   - Biomarcadores después filtrado: ${filteredForProfile.testCount}`);
      console.log(`   - Razón: ${filteredForProfile.testCount === 0 ? 'Todos incluidos en Performance' : 'Error en filtrado'}`);
    }
  }
}

// 6. VERIFICAR EXCLUSIONES ESPECÍFICAS
console.log('\n\n6. Verificación de exclusiones específicas en PROFILE_EXCLUSIONS:');
console.log('=' .repeat(60));

for (const addOnId of recommendedAddOns) {
  const exclusions = PROFILE_EXCLUSIONS[addOnId]?.performance || [];
  console.log(`${addOnId}: [${exclusions.join(', ')}] (${exclusions.length} exclusiones)`);
}

// 7. RESUMEN FINAL
console.log('\n\n📋 RESUMEN FINAL:');
console.log('=' .repeat(30));
console.log(`✅ Add-ons recomendados: ${recommendedAddOns.length}`);
console.log(`✅ Add-ons disponibles: ${availableAddOns.length}`);
console.log(`${missingAddOns.length === 0 ? '✅' : '❌'} Todos recomendados disponibles: ${missingAddOns.length === 0 ? 'SÍ' : 'NO'}`);

if (missingAddOns.length === 0 && availableAddOns.length >= recommendedAddOns.length) {
  console.log('\n🎉 ÉXITO: Performance tiene todos los add-ons necesarios configurados correctamente');
} else {
  console.log('\n⚠️ ATENCIÓN: Revisar configuración de add-ons en Performance');
  if (missingAddOns.length > 0) {
    console.log(`   - Faltan: ${missingAddOns.join(', ')}`);
  }
} 