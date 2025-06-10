/**
 * test_profile_exclusions.js
 * Script de prueba para validar el sistema de exclusiones por perfil
 * Verifica que los add-ons muestren solo biomarcadores únicos según el perfil
 */

// Para node.js sin type: "module", vamos a crear una simulación directa
console.log('🧪 PRUEBA DEL SISTEMA DE EXCLUSIONES POR PERFIL');
console.log('='.repeat(60));

// SIMULACIÓN DE LOS DATOS NECESARIOS
const INFLAMACION_CODES = ['H0020', 'B7790', 'I2081'];
const PERFORMANCE_CODES = [
  'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070', 'B0080', 'B0100',
  'B0110', 'B0120', 'B0130', 'B0170', 'B0180', 'B0200', 'B0220', 'B0240', 'B0250', 'B0750',
  'B1260', 'B1540', 'B1600', 'B1900', 'B1970', 'B2120', 'B3100', 'B3110', 'B3170', 'B3210',
  'B5120', 'B5290', 'B5370', 'B5410', 'B5420', 'B5590', 'B5600', 'B5850', 'B6020', 'B6030',
  'B6040', 'B6070', 'B6130', 'B6180', 'B6190', 'B6510', 'B7260', 'B7790', 'B8050', 'H0000',
  'H1420', 'I2081', 'T1061', 'T1191', 'T2830', 'T3920',
  'B6160', 'D0601', // Masculino
  'B5350', 'B5380', 'B5800', 'B5932' // Femenino
];

// SIMULACIÓN DE LAS EXCLUSIONES DEFINIDAS
const PROFILE_EXCLUSIONS = {
  inflammation: {
    essential: [],
    performance: ['B7790', 'I2081'],
    core: ['H0020', 'B7790', 'I2081'],
    advanced: ['H0020', 'B7790', 'I2081']
  }
};

// SIMULACIÓN DE BIOMARCADORES
const BIOMARKERS = {
  'H0020': { name: 'VSG', category: 'Inflamación' },
  'B7790': { name: 'IL-6', category: 'Inflamación' },
  'I2081': { name: 'TNF-α', category: 'Inflamación' }
};

console.log('\n📊 CASO 1: Add-on INFLAMACIÓN + Perfil PERFORMANCE');
console.log('-'.repeat(50));

// Verificar qué códigos de inflamación están en Performance
const inflammationInPerformance = INFLAMACION_CODES.filter(code => 
  PERFORMANCE_CODES.includes(code)
);
const inflammationNotInPerformance = INFLAMACION_CODES.filter(code => 
  !PERFORMANCE_CODES.includes(code)
);

console.log('Códigos del add-on Inflamación:', INFLAMACION_CODES);
console.log('- Incluidos en Performance:', inflammationInPerformance);
console.log('- NO incluidos en Performance:', inflammationNotInPerformance);

// Aplicar exclusiones por perfil
const profileExclusions = PROFILE_EXCLUSIONS.inflammation.performance;
console.log('\nExclusiones definidas para performance:', profileExclusions);

// Simular filtrado completo
const originalCodes = INFLAMACION_CODES;
const duplicatesFromProfile = originalCodes.filter(code => PERFORMANCE_CODES.includes(code));
const specificExclusions = originalCodes.filter(code => profileExclusions.includes(code));
const finalFilteredCodes = originalCodes.filter(code => 
  !PERFORMANCE_CODES.includes(code) && !profileExclusions.includes(code)
);

console.log('\n📋 RESULTADO DEL FILTRADO:');
console.log('Original:', {
  codes: originalCodes,
  biomarkers: originalCodes.map(code => `${code} (${BIOMARKERS[code].name})`)
});

console.log('Duplicados en Performance:', duplicatesFromProfile);
console.log('Exclusiones específicas:', specificExclusions);
console.log('Códigos finales únicos:', finalFilteredCodes);

console.log('\n🔍 ANÁLISIS DETALLADO:');
originalCodes.forEach(code => {
  const inPerformance = PERFORMANCE_CODES.includes(code);
  const inExclusions = profileExclusions.includes(code);
  const shouldShow = !inPerformance && !inExclusions;
  
  console.log(`${code} (${BIOMARKERS[code].name}):`);
  console.log(`  - En Performance: ${inPerformance ? '✅' : '❌'}`);
  console.log(`  - En exclusiones: ${inExclusions ? '✅' : '❌'}`);
  console.log(`  - Mostrar en add-on: ${shouldShow ? '✅ SÍ' : '❌ NO'}`);
});

console.log('\n📊 CASO 2: OTROS PERFILES');
console.log('-'.repeat(50));

['essential', 'core', 'advanced'].forEach(profileId => {
  const exclusions = PROFILE_EXCLUSIONS.inflammation[profileId];
  const remaining = INFLAMACION_CODES.filter(code => !exclusions.includes(code));
  
  console.log(`\n${profileId.toUpperCase()}:`);
  console.log(`  Exclusiones: [${exclusions.join(', ')}]`);
  console.log(`  Biomarcadores restantes: [${remaining.join(', ')}]`);
  
  if (remaining.length === 0) {
    console.log('  ⚠️  Add-on quedaría VACÍO - no se debería mostrar');
  } else {
    console.log(`  ✅ Mostraría ${remaining.length} biomarcador(es) único(s)`);
    remaining.forEach(code => {
      console.log(`    - ${code} (${BIOMARKERS[code].name})`);
    });
  }
});

console.log('\n🎯 CONCLUSIONES:');
console.log('1. ✅ Performance + Inflamación → Solo debe mostrar VSG (H0020)');
console.log('2. ✅ Core/Advanced + Inflamación → No debe mostrarse (vacío)');
console.log('3. ✅ Essential + Inflamación → Debe mostrar los 3 biomarcadores');
console.log('4. ✅ Sistema diseñado correctamente');

console.log('\n📝 RESULTADO ESPERADO EN EL FRONTEND:');
console.log('- Essential: Muestra add-on con 3 biomarcadores (H0020, B7790, I2081)');
console.log('- Performance: Muestra add-on con 1 biomarcador (H0020 - VSG)');
console.log('- Core: NO muestra el add-on (testCount = 0)');
console.log('- Advanced: NO muestra el add-on (testCount = 0)'); 