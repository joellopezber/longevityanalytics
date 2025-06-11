/**
 * ANÁLISIS SIMPLE: Biomarcadores de Hormonas en Performance
 * Respuesta directa para el usuario
 */

// Códigos del add-on de Hormonas
const HORMONAS_COMMON = ['B5350', 'B5380', 'B5420', 'B5800', 'B5980'];
const HORMONAS_MALE = ['B6480', 'D0601', 'D0850'];
const HORMONAS_FEMALE = ['B5932', 'B6160', 'D0181', 'D0780'];

// Códigos que YA incluye Performance (según análisis)
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

// Exclusiones configuradas para Performance
const EXCLUSIONS_PERFORMANCE = ['B5350', 'B5380', 'B5420', 'B5800', 'D0601', 'B5932', 'B6160'];

console.log('🔍 ANÁLISIS DIRECTO: Hormonas en Performance');
console.log('============================================\n');

// Para HOMBRES
console.log('👨 PARA HOMBRES (Performance + Add-on Hormonas):');
console.log('-'.repeat(50));

const allHormonesMale = [...HORMONAS_COMMON, ...HORMONAS_MALE];
console.log(`📋 Hormonas totales para hombres: [${allHormonesMale.join(', ')}]`);

const allPerformanceMale = [...PERFORMANCE_COMMON, ...PERFORMANCE_MALE];
const duplicatesMale = allHormonesMale.filter(code => allPerformanceMale.includes(code));
const uniqueMale = allHormonesMale.filter(code => !EXCLUSIONS_PERFORMANCE.includes(code));

console.log(`❌ Ya incluidos en Performance: [${duplicatesMale.join(', ')}]`);
console.log(`✅ BIOMARCADORES ÚNICOS QUE VERÁ: [${uniqueMale.join(', ')}]`);
console.log(`📊 Total biomarcadores únicos: ${uniqueMale.length}\n`);

// Para MUJERES
console.log('👩 PARA MUJERES (Performance + Add-on Hormonas):');
console.log('-'.repeat(50));

const allHormonesFemale = [...HORMONAS_COMMON, ...HORMONAS_FEMALE];
console.log(`📋 Hormonas totales para mujeres: [${allHormonesFemale.join(', ')}]`);

const allPerformanceFemale = [...PERFORMANCE_COMMON, ...PERFORMANCE_FEMALE];
const duplicatesFemale = allHormonesFemale.filter(code => allPerformanceFemale.includes(code));
const uniqueFemale = allHormonesFemale.filter(code => !EXCLUSIONS_PERFORMANCE.includes(code));

console.log(`❌ Ya incluidos en Performance: [${duplicatesFemale.join(', ')}]`);
console.log(`✅ BIOMARCADORES ÚNICOS QUE VERÁ: [${uniqueFemale.join(', ')}]`);
console.log(`📊 Total biomarcadores únicos: ${uniqueFemale.length}\n`);

// RESUMEN FINAL
console.log('📋 RESUMEN FINAL:');
console.log('='.repeat(30));
console.log(`👨 HOMBRES - Add-on Hormonas mostrará: ${uniqueMale.length} biomarcadores`);
console.log(`   Códigos: [${uniqueMale.join(', ')}]`);
console.log(`\n👩 MUJERES - Add-on Hormonas mostrará: ${uniqueFemale.length} biomarcadores`);
console.log(`   Códigos: [${uniqueFemale.join(', ')}]`);

console.log('\n💡 EXPLICACIÓN:');
console.log('- Performance YA incluye varias hormonas básicas');
console.log('- El add-on Hormonas solo muestra las hormonas adicionales');
console.log('- Esto evita duplicación y confusión al usuario');
console.log('- El precio se ajusta automáticamente al número de tests únicos'); 