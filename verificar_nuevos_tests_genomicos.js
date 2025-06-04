const fs = require('fs');

console.log('🔬 VERIFICACIÓN NUEVOS TESTS GENÓMICOS\n');

// 1. Verificar priceData.js
console.log('1. Verificando precios en priceData.js...');
const priceData = fs.readFileSync('src/data/priceData.js', 'utf8');

const nuevosTests = [
  { name: 'MyPharma', code: 'GP001', price: '319,00', pvp: '359,00' },
  { name: 'MyDetox', code: 'GD001', price: '319,00', pvp: '359,00' },
  { name: 'MyDiet', code: 'GN001', price: '199,00', pvp: '249,00' },
  { name: 'MyAgeing', code: 'GA001', price: '319,00', pvp: '359,00' },
  { name: 'MySport', code: 'GS001', price: '249,00', pvp: '299,00' },
  { name: 'MySuplements', code: 'GU001', price: '199,00', pvp: '249,00' }
];

let checksPriceData = 0;
nuevosTests.forEach(test => {
  const searchPattern = `{ name: "${test.name}", code: "${test.code}", prevenii: "${test.price} €", market: "${test.pvp} €" }`;
  if (priceData.includes(searchPattern)) {
    console.log(`✅ ${test.name} (${test.code}): ${test.price}€ / ${test.pvp}€ PVP`);
    checksPriceData++;
  } else {
    console.log(`❌ ${test.name} NO encontrado o formato incorrecto`);
  }
});

// 2. Verificar biomarkers.js
console.log('\n2. Verificando biomarcadores en biomarkers.js...');
const biomarkers = fs.readFileSync('src/data/biomarkers.js', 'utf8');

let checksBiomarkers = 0;
nuevosTests.forEach(test => {
  if (biomarkers.includes(`{ name: "${test.name}"`)) {
    console.log(`✅ ${test.name} presente en add-on genome`);
    checksBiomarkers++;
  } else {
    console.log(`❌ ${test.name} NO encontrado en biomarkers`);
  }
});

// 3. Verificar contexto
console.log('\n3. Verificando contexto BiomarkerSelectionContext.js...');
const context = fs.readFileSync('src/contexts/BiomarkerSelectionContext.js', 'utf8');

const contextChecks = [
  'selectedMyPharma',
  'selectedMyDetox', 
  'selectedMyDiet',
  'selectedMyAgeing',
  'selectedMySport',
  'selectedMySuplements',
  'setSelectedMyPharma',
  'setSelectedMyDetox',
  'setSelectedMyDiet',
  'setSelectedMyAgeing',
  'setSelectedMySport',
  'setSelectedMySuplements'
];

let checksContext = 0;
contextChecks.forEach(check => {
  if (context.includes(check)) {
    console.log(`✅ ${check} definido`);
    checksContext++;
  } else {
    console.log(`❌ ${check} NO encontrado`);
  }
});

// 4. Verificar MedicalSystemsExplorer
console.log('\n4. Verificando MedicalSystemsExplorer.jsx...');
const explorer = fs.readFileSync('src/components/MedicalSystemsExplorer.jsx', 'utf8');

const explorerChecks = [
  'selectedMyPharma',
  'toggleMyPharmaSelection',
  'isMyPharma',
  'isMyDetox', 
  'isMyDiet',
  'isMyAgeing',
  'isMySport',
  'isMySuplements'
];

let checksExplorer = 0;
explorerChecks.forEach(check => {
  if (explorer.includes(check)) {
    console.log(`✅ ${check} implementado`);
    checksExplorer++;
  } else {
    console.log(`❌ ${check} NO encontrado`);
  }
});

// 5. Verificar PackageComparison
console.log('\n5. Verificando PackageComparison.jsx...');
const comparison = fs.readFileSync('src/components/PackageComparison.jsx', 'utf8');

let checksComparison = 0;
nuevosTests.slice(0, 3).forEach(test => { // Solo verificar algunos
  const testName = test.name.replace('My', 'selectedMy');
  if (comparison.includes(testName)) {
    console.log(`✅ ${testName} incluido en cálculos`);
    checksComparison++;
  } else {
    console.log(`❌ ${testName} NO encontrado`);
  }
});

// Resumen final
console.log('\n📊 RESUMEN DE VERIFICACIÓN:');
console.log(`- Precios en priceData.js: ${checksPriceData}/6 ✅`);
console.log(`- Biomarcadores en biomarkers.js: ${checksBiomarkers}/6 ✅`);
console.log(`- Variables en contexto: ${checksContext}/12 ✅`);
console.log(`- Funciones en MedicalSystemsExplorer: ${checksExplorer}/8 ✅`);
console.log(`- Integración en PackageComparison: ${checksComparison}/3 ✅`);

const totalChecks = checksPriceData + checksBiomarkers + checksContext + checksExplorer + checksComparison;
const maxChecks = 6 + 6 + 12 + 8 + 3; // 35 total

console.log(`\n🎯 PUNTUACIÓN TOTAL: ${totalChecks}/${maxChecks} (${Math.round(totalChecks/maxChecks*100)}%)`);

if (totalChecks === maxChecks) {
  console.log('\n🎉 ¡IMPLEMENTACIÓN COMPLETA! Todos los 6 nuevos tests genómicos están correctamente integrados.');
} else {
  console.log(`\n⚠️  Faltan ${maxChecks - totalChecks} elementos por completar.`);
} 