/**
 * Test específico para verificar precios del Essential
 * Objetivo: Verificar que muestra 261,37€ (Prevenii) y 428,57€ (Market)
 * Para ejecutar en la consola del navegador
 */

console.log('🔍 TEST ESPECÍFICO DEL ESSENTIAL\n');
console.log('Objetivo: Verificar precios correctos');
console.log('Esperado: Precio ~261€ (Prevenii), PVP ~429€ (Market)\n');

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
  console.log('📦 ESSENTIAL PACKAGE - ANÁLISIS DETALLADO:');
  console.log('==========================================');

  try {
    // Test para hombre
    console.log('\n👨 ESSENTIAL HOMBRE:');
    const essentialMale = window.essentialPackage.getPricing('male');
    console.log(`Tests: ${essentialMale.testCount}`);
    console.log(`Precio final (Prevenii): ${essentialMale.price}€`);
    console.log(`PVP referencial (Market): ${essentialMale.costPrice}€`);
    console.log(`Precio por test: ${essentialMale.pricePerTest}€`);
    
    // Verificar detalles internos
    console.log('\n🔍 DETALLES INTERNOS:');
    const details = essentialMale.details;
    console.log(`finalPrice: ${details.finalPrice}€`);
    console.log(`costPrice: ${details.costPrice}€`);
    console.log(`marketPrice: ${details.marketPrice}€`);
    // console.log(`Descuento por volumen: ${details.volumeDiscount.discount}%`);
// console.log(`Cantidad descuento: ${details.volumeDiscount.discountAmount}€`);
    
    // Test para mujer
    console.log('\n👩 ESSENTIAL MUJER:');
    const essentialFemale = window.essentialPackage.getPricing('female');
    console.log(`Tests: ${essentialFemale.testCount}`);
    console.log(`Precio final (Prevenii): ${essentialFemale.price}€`);
    console.log(`PVP referencial (Market): ${essentialFemale.costPrice}€`);
    
    // Verificación de valores esperados
    console.log('\n✅ VERIFICACIÓN:');
    console.log('================');
    
    const expectedPrice = 261;
    const expectedPvp = 429;
    const tolerance = 10; // ±10€ de tolerancia
    
    const priceOk = Math.abs(essentialMale.price - expectedPrice) <= tolerance;
    const pvpOk = Math.abs(essentialMale.costPrice - expectedPvp) <= tolerance;
    
    console.log(`Precio esperado: ~${expectedPrice}€, obtenido: ${essentialMale.price}€ ${priceOk ? '✅' : '❌'}`);
    console.log(`PVP esperado: ~${expectedPvp}€, obtenido: ${essentialMale.costPrice}€ ${pvpOk ? '✅' : '❌'}`);
    
    if (priceOk && pvpOk) {
      console.log('\n🎉 ¡ESSENTIAL CORREGIDO CORRECTAMENTE!');
    } else {
      console.log('\n⚠️ Valores no coinciden con lo esperado');
      
      // Calcular manualmente para debug
      console.log('\n🔧 DEBUG - Cálculo manual:');
      const manualCalc = window.calculatePackagePrice(window.essentialPackage.biomarkers, 'male', 'essential');
      console.log('Cálculo directo:', manualCalc);
    }
    
  } catch (error) {
    console.log(`❌ Error en test: ${error.message}`);
    console.log('Stack:', error.stack);
  }
  
}).catch(error => {
  console.log('❌ Error esperando paquetes:', error.message);
}); 