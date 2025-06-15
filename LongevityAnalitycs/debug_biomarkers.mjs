import pkg from './data/profiles.js';
const { PROFILES, getBiomarkersForProfile } = pkg;

console.log('=== DEBUG BIOMARCADORES ESSENTIAL ===\n');

const essential = PROFILES.essential;

console.log('📋 BIOMARCADORES COMUNES:');
console.log('Cantidad:', essential.biomarkersCommon.length);
console.log('Lista:', essential.biomarkersCommon);

console.log('\n👨 BIOMARCADORES SOLO HOMBRES:');
console.log('Cantidad:', essential.biomarkersMaleOnly.length);
console.log('Lista:', essential.biomarkersMaleOnly);

console.log('\n👩 BIOMARCADORES SOLO MUJERES:');
console.log('Cantidad:', essential.biomarkersFemaleOnly.length);
console.log('Lista:', essential.biomarkersFemaleOnly);

console.log('\n🧮 CÁLCULOS:');
const maleTotal = essential.biomarkersCommon.length + essential.biomarkersMaleOnly.length;
const femaleTotal = essential.biomarkersCommon.length + essential.biomarkersFemaleOnly.length;

console.log('Total Hombres:', maleTotal);
console.log('Total Mujeres:', femaleTotal);
console.log('Promedio:', Math.round((maleTotal + femaleTotal) / 2));

console.log('\n🔧 FUNCIÓN getBiomarkersForProfile:');
const maleBiomarkers = getBiomarkersForProfile('essential', 'male');
const femaleBiomarkers = getBiomarkersForProfile('essential', 'female');

console.log('Función - Hombres:', maleBiomarkers.length);
console.log('Función - Mujeres:', femaleBiomarkers.length);

console.log('\n📝 BIOMARCADORES HOMBRES (función):');
console.log(maleBiomarkers);

console.log('\n📝 BIOMARCADORES MUJERES (función):');
console.log(femaleBiomarkers); 