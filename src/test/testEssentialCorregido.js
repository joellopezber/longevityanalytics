/**
 * Test para verificar que el Essential muestre los precios correctos del CSV
 * Después de la corrección de precios fijos
 */

console.log('🔍 TEST ESSENTIAL CORREGIDO\n');
console.log('Verificando precios fijos del CSV: 259€ (Precio) y 402€ (PVP)\n');

const waitForPackages = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkPackages = () => {
      attempts++;
      if (window.essentialPackage && window.calculatePackagePrice) {
        resolve(true);
      } else if (attempts >= 10) {
        reject(new Error('Paquetes no disponibles'));
      } else {
        setTimeout(checkPackages, 500);
      }
    };
    checkPackages();
  });
};

waitForPackages().then(() => {
  console.log('📋 VERIFICACIÓN ESSENTIAL CORREGIDO:');
  console.log('===================================');

  // Test para hombre
  console.log('\n👨 ESSENTIAL HOMBRE:');
  const maleEssential = window.essentialPackage.getPricing('male');
  console.log(`Precio final: ${maleEssential.price}€`);
  console.log(`PVP referencial: ${maleEssential.costPrice}€`);
  console.log(`Tests: ${maleEssential.testCount}`);

  // Test para mujer
  console.log('\n👩 ESSENTIAL MUJER:');
  const femaleEssential = window.essentialPackage.getPricing('female');
  console.log(`Precio final: ${femaleEssential.price}€`);
  console.log(`PVP referencial: ${femaleEssential.costPrice}€`);
  console.log(`Tests: ${femaleEssential.testCount}`);

  // Test directo de la función
  console.log('\n🔧 TEST DIRECTO DE FUNCIÓN:');
  const directMale = window.calculatePackagePrice(window.essentialPackage.biomarkers, 'male', 'essential');
  console.log(`Función directa (male): Precio ${directMale.finalPrice}€, PVP ${directMale.marketPrice}€`);

  const directFemale = window.calculatePackagePrice(window.essentialPackage.biomarkers, 'female', 'essential');
  console.log(`Función directa (female): Precio ${directFemale.finalPrice}€, PVP ${directFemale.marketPrice}€`);

  // Verificación final
  console.log('\n✅ VERIFICACIÓN FINAL:');
  console.log('======================');
  
  const expectedMale = { precio: 259, pvp: 402 };
  const expectedFemale = { precio: 259, pvp: 384 };

  // Verificar hombre
  const maleOk = Math.abs(maleEssential.price - expectedMale.precio) <= 1 && 
                 Math.abs(maleEssential.costPrice - expectedMale.pvp) <= 1;
  console.log(`Hombre: ${maleOk ? '✅ CORRECTO' : '❌ INCORRECTO'}`);
  console.log(`  Esperado: ${expectedMale.precio}€ / ${expectedMale.pvp}€`);
  console.log(`  Obtenido: ${maleEssential.price}€ / ${maleEssential.costPrice}€`);

  // Verificar mujer
  const femaleOk = Math.abs(femaleEssential.price - expectedFemale.precio) <= 1 && 
                   Math.abs(femaleEssential.costPrice - expectedFemale.pvp) <= 1;
  console.log(`\nMujer: ${femaleOk ? '✅ CORRECTO' : '❌ INCORRECTO'}`);
  console.log(`  Esperado: ${expectedFemale.precio}€ / ${expectedFemale.pvp}€`);
  console.log(`  Obtenido: ${femaleEssential.price}€ / ${femaleEssential.costPrice}€`);

  if (maleOk && femaleOk) {
    console.log('\n🎉 ¡CORRECCIÓN EXITOSA! Los precios del Essential ahora coinciden con el CSV');
  } else {
    console.log('\n❌ Aún hay discrepancias que necesitan revisión');
  }

}).catch(error => {
  console.log('❌ Error:', error.message);
}); 