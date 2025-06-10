/**
 * ANÁLISIS DETALLADO: Exclusiones de Performance
 * Verificar qué biomarcadores incluye Performance y qué debería excluir en cada add-on
 */

// ===== CÓDIGOS DE PERFORMANCE =====
const PERFORMANCE_COMMON = [
  'B0000', 'B0010', 'B0020', 'B0030', 'B0040', 'B0050', 'B0060', 'B0070', 'B0080', 'B0100',
  'B0110', 'B0120', 'B0130', 'B0170', 'B0180', 'B0200', 'B0220', 'B0240', 'B0250', 'B0750',
  'B1260', 'B1540', 'B1600', 'B1900', 'B1970', 'B2120', 'B3100', 'B3110', 'B3170', 'B3210',
  'B5120', 'B5290', 'B5370', 'B5410', 'B5420', 'B5590', 'B5600', 'B5850', 'B6020', 'B6030',
  'B6040', 'B6070', 'B6130', 'B6180', 'B6190', 'B6510', 'B7260', 'B7790', 'B8050', 'H0000',
  'H1420', 'I2081', 'T1061', 'T1191', 'T2830', 'T3920'
];

const PERFORMANCE_MALE = ['B6160', 'D0601'];
const PERFORMANCE_FEMALE = ['B5350', 'B5380', 'B5800', 'B5932'];

// ===== CÓDIGOS DE ADD-ONS =====
const ADD_ON_CODES = {
  hormonas: {
    common: ['B5350', 'B5380', 'B5420', 'B5800', 'B5980'],
    male: ['B6480', 'D0601', 'D0850'],
    female: ['B5932', 'B6160', 'D0181', 'D0780']
  },
  endocrino: ['B6030', 'B6010', 'I6740'],
  antioxidantes: ['T0811', 'T1191', 'T2841', 'T1200', 'T2830'],
  oxidative_cell: ['B7121', 'B3015', 'B3041', 'T3920'],
  inflammation: ['H0020', 'B7790', 'I2081'],
  cardiovascular: ['B0110', 'B0750', 'B2120', 'B0220', 'B1900', 'B0190', 'B7700', 'I5047'],
  iv_nutrients: ['T0500', 'T1720', 'T1061', 'B8060', 'B0270'],
  metals: ['T0302', 'T0150', 'T0960', 'T0480'],
  immunity: ['I0141', 'I5072', 'B6321', 'B6300', 'B7750', 'B3130'],
  digest: ['T2590', 'B1980', 'B0350', 'B0260'],
  gut_gate: ['M1190', 'P3031', 'AB001', 'AB002'],
  coagulation: ['H0050', 'H0850', 'H0860'],
  bone_mineral: ['D0560', 'D1111', 'I3291', 'T1572'],
  genome: ['OG004', 'OG002', 'OG003', 'OG006', 'OG005'],
  cancer: {
    common: ['6897', 'B0110', 'B5080', 'B5090', 'B5100', 'B5110', 'B7900', 'B8120', 'B8130', 'B8160', 'D1271', 'D1760', 'I5080', 'I5090', 'M0010'],
    male: ['B5830', 'B5840'],
    female: ['B5380', 'B8110']
  },
  bioage: {
    common: ['G1465', 'OG001'],
    male: ['B3340'],
    female: ['D1001']
  }
};

console.log('🔍 ANÁLISIS DE EXCLUSIONES PARA PERFORMANCE');
console.log('==========================================\n');

// Combinar todos los códigos de Performance
const ALL_PERFORMANCE_CODES = [
  ...PERFORMANCE_COMMON,
  ...PERFORMANCE_MALE,
  ...PERFORMANCE_FEMALE
];

console.log('📋 Biomarcadores incluidos en Performance:');
console.log(`- Comunes: ${PERFORMANCE_COMMON.length}`);
console.log(`- Solo masculinos: ${PERFORMANCE_MALE.length}`);
console.log(`- Solo femeninos: ${PERFORMANCE_FEMALE.length}`);
console.log(`- TOTAL: ${ALL_PERFORMANCE_CODES.length}\n`);

console.log('🧪 ANÁLISIS DE CADA ADD-ON:');
console.log('=' .repeat(50));

for (const [addOnId, addOnCodes] of Object.entries(ADD_ON_CODES)) {
  console.log(`\n🔍 ${addOnId.toUpperCase()}:`);
  
  let allAddOnCodes = [];
  if (Array.isArray(addOnCodes)) {
    allAddOnCodes = addOnCodes;
  } else {
    allAddOnCodes = [
      ...addOnCodes.common,
      ...(addOnCodes.male || []),
      ...(addOnCodes.female || [])
    ];
  }
  
  // Encontrar intersecciones con Performance
  const duplicatesInPerformance = allAddOnCodes.filter(code => 
    ALL_PERFORMANCE_CODES.includes(code)
  );
  
  const uniqueInAddOn = allAddOnCodes.filter(code => 
    !ALL_PERFORMANCE_CODES.includes(code)
  );
  
  console.log(`  📊 Total biomarcadores: ${allAddOnCodes.length}`);
  console.log(`  ❌ Ya en Performance: ${duplicatesInPerformance.length} - [${duplicatesInPerformance.join(', ')}]`);
  console.log(`  ✅ Únicos en add-on: ${uniqueInAddOn.length} - [${uniqueInAddOn.join(', ')}]`);
  
  // Generar recomendación de exclusión
  if (duplicatesInPerformance.length > 0) {
    console.log(`  🛠️ EXCLUSIÓN RECOMENDADA: [${duplicatesInPerformance.map(c => `'${c}'`).join(', ')}]`);
  } else {
    console.log(`  🛠️ EXCLUSIÓN RECOMENDADA: [] (ninguna exclusión necesaria)`);
  }
}

console.log('\n\n📝 CONFIGURACIÓN RECOMENDADA PARA PROFILE_EXCLUSIONS:');
console.log('=' .repeat(60));
console.log(`
export const PROFILE_EXCLUSIONS = {
  // ... otras configuraciones ...
  
  // EXCLUSIONES PARA PERFORMANCE (actualizadas):`);

for (const [addOnId, addOnCodes] of Object.entries(ADD_ON_CODES)) {
  let allAddOnCodes = [];
  if (Array.isArray(addOnCodes)) {
    allAddOnCodes = addOnCodes;
  } else {
    allAddOnCodes = [
      ...addOnCodes.common,
      ...(addOnCodes.male || []),
      ...(addOnCodes.female || [])
    ];
  }
  
  const duplicatesInPerformance = allAddOnCodes.filter(code => 
    ALL_PERFORMANCE_CODES.includes(code)
  );
  
  const uniqueCount = allAddOnCodes.length - duplicatesInPerformance.length;
  
  console.log(`  ${addOnId}: {`);
  console.log(`    performance: [${duplicatesInPerformance.map(c => `'${c}'`).join(', ')}], // ${uniqueCount}/${allAddOnCodes.length} únicos`);
  console.log(`  },`);
}

console.log(`
  // ... otras configuraciones ...
};`);

console.log('\n\n🎯 RESUMEN DE VALIDEZ DE ADD-ONS EN PERFORMANCE:');
console.log('=' .repeat(50));

let totalRecommended = 0;
let totalWithValue = 0;

for (const [addOnId, addOnCodes] of Object.entries(ADD_ON_CODES)) {
  let allAddOnCodes = [];
  if (Array.isArray(addOnCodes)) {
    allAddOnCodes = addOnCodes;
  } else {
    allAddOnCodes = [
      ...addOnCodes.common,
      ...(addOnCodes.male || []),
      ...(addOnCodes.female || [])
    ];
  }
  
  const uniqueCount = allAddOnCodes.filter(code => 
    !ALL_PERFORMANCE_CODES.includes(code)
  ).length;
  
  const hasValue = uniqueCount > 0;
  const status = hasValue ? '✅ RECOMENDADO' : '❌ SIN VALOR';
  
  console.log(`${addOnId}: ${status} (${uniqueCount} biomarcadores únicos)`);
  
  totalRecommended++;
  if (hasValue) totalWithValue++;
}

console.log(`\n📊 ESTADÍSTICAS FINALES:`);
console.log(`- Add-ons analizados: ${totalRecommended}`);
console.log(`- Add-ons con valor para Performance: ${totalWithValue}`);
console.log(`- Add-ons sin valor: ${totalRecommended - totalWithValue}`);
console.log(`- Porcentaje de utilidad: ${((totalWithValue / totalRecommended) * 100).toFixed(1)}%`); 