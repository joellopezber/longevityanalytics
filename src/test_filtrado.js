/**
 * test_filtrado.js
 * Archivo de prueba para demostrar el filtrado de add-ons por perfil
 * Muestra cómo el add-on de inflamación se filtra automáticamente para Performance
 */

import { performancePackage, essentialPackage, getProfileCodes } from './data/analysisPackages.js';
import { inflamacionPackage, getAddOnPackagesForProfile } from './data/addOnPackages.js';

// Función de prueba principal
export const testInflamationFiltering = () => {
  console.log('🔥 PRUEBA: Filtrado de Add-On de Inflamación para Performance');
  console.log('=' .repeat(60));

  // 1. Biomarcadores del Performance masculino
  const performanceCodes = getProfileCodes(performancePackage, 'male');
  console.log('\n📊 Biomarcadores de Performance (masculino):');
  console.log('Total:', performanceCodes.length);
  console.log('Códigos inflamatorios incluidos:');
  console.log('- B7790 (IL-6):', performanceCodes.includes('B7790') ? '✅ SÍ' : '❌ NO');
  console.log('- I2081 (TNF-α):', performanceCodes.includes('I2081') ? '✅ SÍ' : '❌ NO');
  console.log('- H0020 (VSG):', performanceCodes.includes('H0020') ? '✅ SÍ' : '❌ NO');

  // 2. Add-on de inflamación original
  const inflamacionOriginal = inflamacionPackage.getForGender('male');
  console.log('\n🔬 Add-On Inflamación ORIGINAL:');
  console.log('Tests:', inflamacionOriginal.testCount);
  console.log('Biomarcadores:', inflamacionOriginal.biomarkers.map(b => `${b.code} (${b.name})`));

  // 3. Add-on de inflamación filtrado para Performance
  const inflamacionFiltrado = inflamacionPackage.getForProfile('male', performanceCodes);
  console.log('\n🎯 Add-On Inflamación FILTRADO para Performance:');
  console.log('Tests:', inflamacionFiltrado.testCount);
  console.log('Biomarcadores únicos:', inflamacionFiltrado.biomarkers.map(b => `${b.code} (${b.name})`));
  console.log('¿Está filtrado?:', inflamacionFiltrado.isFiltered ? '✅ SÍ' : '❌ NO');

  // 4. Mostrar qué biomarcadores se filtraron
  console.log('\n🔍 ANÁLISIS DEL FILTRADO:');
  console.log('Códigos originales:', inflamacionFiltrado.originalCodes);
  console.log('Códigos después del filtrado:', inflamacionFiltrado.filteredCodes);
  
  const removedCodes = inflamacionFiltrado.originalCodes.filter(
    code => !inflamacionFiltrado.filteredCodes.includes(code)
  );
  console.log('Biomarcadores eliminados (duplicados):', removedCodes);

  // 5. Obtener todos los add-ons filtrados para Performance
  console.log('\n📋 TODOS LOS ADD-ONS FILTRADOS PARA PERFORMANCE:');
  const allFilteredAddOns = getAddOnPackagesForProfile('male', performanceCodes);
  
  Object.entries(allFilteredAddOns).forEach(([key, addOn]) => {
    const hasFilteredOut = addOn.isFiltered && 
      addOn.originalCodes && 
      addOn.originalCodes.length > addOn.testCount;
    
    console.log(`\n${key.toUpperCase()}:`);
    console.log(`  Tests: ${addOn.testCount}`);
    console.log(`  Filtrado: ${hasFilteredOut ? '✅ Sí' : '❌ No'}`);
    
    if (hasFilteredOut) {
      const removed = addOn.originalCodes.length - addOn.testCount;
      console.log(`  Biomarcadores eliminados: ${removed}`);
    }
  });

  return {
    performanceCodes,
    inflamacionOriginal,
    inflamacionFiltrado,
    allFilteredAddOns
  };
};

// Función para mostrar ejemplo específico de inflamación
export const showInflamationExample = () => {
  console.log('\n🎯 EJEMPLO ESPECÍFICO: Add-On Inflamación');
  console.log('=' .repeat(50));
  
  const performanceCodes = getProfileCodes(performancePackage, 'male');
  const inflamacion = inflamacionPackage.getForProfile('male', performanceCodes);
  
  console.log('\n📝 RESULTADO PARA PERFORMANCE:');
  console.log('- Add-on de Inflamación para Performance');
  console.log('- Solo muestra: VSG (H0020)');
  console.log('- Oculta: IL-6 y TNF-α (ya incluidos en Performance)');
  console.log(`- Tests visibles: ${inflamacion.testCount} de 3 originales`);
  console.log(`- Precio ajustado: €${inflamacion.price}`);
  
  return inflamacion;
};

// Función para comparar con Essential
export const compareWithEssential = () => {
  console.log('\n⚖️ COMPARACIÓN: Essential vs Performance');
  console.log('=' .repeat(50));
  
  // Essential no incluye marcadores de inflamación
  const essentialCodes = getProfileCodes(essentialPackage, 'male');
  const inflamacionForEssential = inflamacionPackage.getForProfile('male', essentialCodes);
  
  // Performance ya incluye algunos marcadores de inflamación
  const performanceCodes = getProfileCodes(performancePackage, 'male');
  const inflamacionForPerformance = inflamacionPackage.getForProfile('male', performanceCodes);
  
  console.log('\n📊 Essential + Add-on Inflamación:');
  console.log(`Tests: ${inflamacionForEssential.testCount}`);
  console.log(`Biomarcadores: ${inflamacionForEssential.biomarkers.map(b => b.code).join(', ')}`);
  
  console.log('\n🏃 Performance + Add-on Inflamación:');
  console.log(`Tests: ${inflamacionForPerformance.testCount}`);
  console.log(`Biomarcadores: ${inflamacionForPerformance.biomarkers.map(b => b.code).join(', ')}`);
  
  console.log('\n✨ RESULTADO:');
  console.log('- Essential: Obtiene los 3 biomarcadores completos');
  console.log('- Performance: Solo obtiene VSG (evita duplicados)');
  console.log('- El precio se ajusta automáticamente');
  
  return {
    essential: inflamacionForEssential,
    performance: inflamacionForPerformance
  };
};

// Ejecutar pruebas si se importa directamente
if (typeof window !== 'undefined') {
  // Solo en navegador
  console.log('🧪 Ejecutando pruebas de filtrado...');
  testInflamationFiltering();
  showInflamationExample();
  compareWithEssential();
} 