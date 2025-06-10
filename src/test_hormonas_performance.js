/**
 * TEST ESPECÍFICO: Add-on Hormonas en Performance
 * Verificar biomarcadores para hombre y mujer paso a paso
 */

import { performancePackage } from './data/analysisPackages.js';
import { 
  hormonasPackage, 
  getAddOnPackagesForProfile, 
  getAddOnFilteringInfo,
  HORMONAS_BIOMARKER_CODES_COMMON,
  HORMONAS_BIOMARKER_CODES_MALE_ONLY,
  HORMONAS_BIOMARKER_CODES_FEMALE_ONLY,
  PROFILE_EXCLUSIONS
} from './data/addOnPackages.js';

console.log('🧪 TEST: Add-on Hormonas en Performance');
console.log('=====================================\n');

// PASO 1: CÓDIGOS ORIGINALES DEL ADD-ON HORMONAS
console.log('📋 PASO 1: Códigos originales del add-on Hormonas');
console.log('-'.repeat(50));
console.log(`Comunes: [${HORMONAS_BIOMARKER_CODES_COMMON.join(', ')}]`);
console.log(`Solo hombres: [${HORMONAS_BIOMARKER_CODES_MALE_ONLY.join(', ')}]`);
console.log(`Solo mujeres: [${HORMONAS_BIOMARKER_CODES_FEMALE_ONLY.join(', ')}]\n`);

// PASO 2: CÓDIGOS QUE INCLUYE PERFORMANCE
console.log('📋 PASO 2: Códigos que YA incluye Performance');
console.log('-'.repeat(50));

// Obtener códigos de Performance
const performanceMale = performancePackage.getForGender('male');
const performanceFemale = performancePackage.getForGender('female');

const performanceMaleCodes = performanceMale.biomarkers.map(bio => bio.code);
const performanceFemaleCodes = performanceFemale.biomarkers.map(bio => bio.code);

console.log(`Performance Hombre (${performanceMaleCodes.length} biomarcadores)`);
console.log(`Performance Mujer (${performanceFemaleCodes.length} biomarcadores)\n`);

// PASO 3: EXCLUSIONES CONFIGURADAS
console.log('📋 PASO 3: Exclusiones configuradas para Performance');
console.log('-'.repeat(50));
const hormonasExclusions = PROFILE_EXCLUSIONS.hormonas.performance;
console.log(`Exclusiones: [${hormonasExclusions.join(', ')}]`);
console.log(`Total exclusiones: ${hormonasExclusions.length}\n`);

// PASO 4: ANÁLISIS POR GÉNERO
console.log('📋 PASO 4: Análisis detallado por género');
console.log('='.repeat(50));

// HOMBRES
console.log('\n👨 PARA HOMBRES:');
console.log('-'.repeat(20));

const allHormonesMaleCodes = [...HORMONAS_BIOMARKER_CODES_COMMON, ...HORMONAS_BIOMARKER_CODES_MALE_ONLY];
console.log(`Códigos totales hormonas hombre: [${allHormonesMaleCodes.join(', ')}]`);

const duplicatesInPerformanceMale = allHormonesMaleCodes.filter(code => 
  performanceMaleCodes.includes(code)
);
console.log(`❌ Ya en Performance hombre: [${duplicatesInPerformanceMale.join(', ')}]`);

const uniqueForMale = allHormonesMaleCodes.filter(code => 
  !performanceMaleCodes.includes(code) && !hormonasExclusions.includes(code)
);
console.log(`✅ Únicos para hombre: [${uniqueForMale.join(', ')}]`);

// MUJERES
console.log('\n👩 PARA MUJERES:');
console.log('-'.repeat(20));

const allHormonesFemaleCodes = [...HORMONAS_BIOMARKER_CODES_COMMON, ...HORMONAS_BIOMARKER_CODES_FEMALE_ONLY];
console.log(`Códigos totales hormonas mujer: [${allHormonesFemaleCodes.join(', ')}]`);

const duplicatesInPerformanceFemale = allHormonesFemaleCodes.filter(code => 
  performanceFemaleCodes.includes(code)
);
console.log(`❌ Ya en Performance mujer: [${duplicatesInPerformanceFemale.join(', ')}]`);

const uniqueForFemale = allHormonesFemaleCodes.filter(code => 
  !performanceFemaleCodes.includes(code) && !hormonasExclusions.includes(code)
);
console.log(`✅ Únicos para mujer: [${uniqueForFemale.join(', ')}]`);

// PASO 5: VERIFICACIÓN FRONTEND
console.log('\n\n📋 PASO 5: Verificación en el frontend');
console.log('='.repeat(50));

// Test para hombres
console.log('\n👨 FRONTEND - HOMBRES:');
const filteredAddOnsMale = getAddOnPackagesForProfile('male', performanceMaleCodes, 'performance');
if ('hormonas' in filteredAddOnsMale) {
  const hormonasAddOnMale = filteredAddOnsMale.hormonas;
  const hormonasMaleCodes = hormonasAddOnMale.biomarkers.map(bio => bio.code);
  console.log(`✅ Add-on disponible: ${hormonasAddOnMale.testCount} biomarcadores`);
  console.log(`📊 Códigos: [${hormonasMaleCodes.join(', ')}]`);
  console.log(`💰 Precio: €${hormonasAddOnMale.price}`);
  
  // Verificar nombres de biomarcadores
  console.log('\n🧬 Biomarcadores con nombres:');
  hormonasAddOnMale.biomarkers.forEach(bio => {
    console.log(`   ${bio.code}: ${bio.name}`);
  });
} else {
  console.log('❌ Add-on hormonas NO disponible para hombres');
}

// Test para mujeres
console.log('\n👩 FRONTEND - MUJERES:');
const filteredAddOnsFemale = getAddOnPackagesForProfile('female', performanceFemaleCodes, 'performance');
if ('hormonas' in filteredAddOnsFemale) {
  const hormonasAddOnFemale = filteredAddOnsFemale.hormonas;
  const hormonasFemaleCodes = hormonasAddOnFemale.biomarkers.map(bio => bio.code);
  console.log(`✅ Add-on disponible: ${hormonasAddOnFemale.testCount} biomarcadores`);
  console.log(`📊 Códigos: [${hormonasFemaleCodes.join(', ')}]`);
  console.log(`💰 Precio: €${hormonasAddOnFemale.price}`);
  
  // Verificar nombres de biomarcadores
  console.log('\n🧬 Biomarcadores con nombres:');
  hormonasAddOnFemale.biomarkers.forEach(bio => {
    console.log(`   ${bio.code}: ${bio.name}`);
  });
} else {
  console.log('❌ Add-on hormonas NO disponible para mujeres');
}

// PASO 6: RESUMEN FINAL
console.log('\n\n📋 PASO 6: Resumen final');
console.log('='.repeat(30));
console.log(`👨 Hombres - Biomarcadores únicos esperados: ${uniqueForMale.length}`);
console.log(`   Códigos: [${uniqueForMale.join(', ')}]`);
console.log(`👩 Mujeres - Biomarcadores únicos esperados: ${uniqueForFemale.length}`);
console.log(`   Códigos: [${uniqueForFemale.join(', ')}]`);

// Verificar coherencia
const maleMatch = filteredAddOnsMale.hormonas && 
  filteredAddOnsMale.hormonas.testCount === uniqueForMale.length;
const femaleMatch = filteredAddOnsFemale.hormonas && 
  filteredAddOnsFemale.hormonas.testCount === uniqueForFemale.length;

console.log(`\n🎯 Coherencia:`);
console.log(`   Hombres: ${maleMatch ? '✅ CORRECTO' : '❌ ERROR'}`);
console.log(`   Mujeres: ${femaleMatch ? '✅ CORRECTO' : '❌ ERROR'}`);

if (maleMatch && femaleMatch) {
  console.log('\n🎉 ÉXITO: El add-on de hormonas funciona correctamente en Performance');
} else {
  console.log('\n⚠️ PROBLEMA: Revisar configuración del add-on de hormonas');
} 