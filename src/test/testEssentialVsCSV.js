/**
 * Test para verificar que los precios del Essential coincidan exactamente con el CSV
 * Compara cada biomarcador del Essential con los precios del CSV
 */

console.log('🔍 TEST ESSENTIAL vs CSV\n');
console.log('Verificando que cada biomarcador tenga el precio correcto del CSV\n');

const waitForPackages = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkPackages = () => {
      attempts++;
      if (window.essentialPackage && window.getPriceByCode) {
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
  console.log('📋 VERIFICACIÓN BIOMARCADOR POR BIOMARCADOR:');
  console.log('============================================');

  // Obtener biomarcadores del Essential para hombre
  const essentialBiomarkers = window.essentialPackage.biomarkers.filter(biomarker => {
    if (!biomarker.gender || biomarker.gender === 'both') return true;
    return biomarker.gender === 'male';
  });

  console.log(`Total biomarcadores Essential (male): ${essentialBiomarkers.length}\n`);

  let totalPrevenii = 0;
  let totalMarket = 0;
  let errores = [];

  essentialBiomarkers.forEach((biomarker, index) => {
    const code = biomarker.code;
    const name = biomarker.name;
    
    if (!code) {
      console.log(`${index + 1}. ❌ ${name} - SIN CÓDIGO`);
      errores.push(`${name} sin código`);
      return;
    }

    const prevenii = window.getPriceByCode(code, 'prevenii');
    const market = window.getPriceByCode(code, 'market');

    if (prevenii === 0 && market === 0) {
      console.log(`${index + 1}. ⚠️  ${name} (${code}) - Prevenii: ${prevenii}€, Market: ${market}€ (GRATIS)`);
    } else if (prevenii === 0 || market === 0) {
      console.log(`${index + 1}. ❌ ${name} (${code}) - Prevenii: ${prevenii}€, Market: ${market}€ (ERROR)`);
      errores.push(`${name} (${code}) tiene precio 0`);
    } else {
      console.log(`${index + 1}. ✅ ${name} (${code}) - Prevenii: ${prevenii}€, Market: ${market}€`);
    }

    totalPrevenii += prevenii;
    totalMarket += market;
  });

  console.log('\n📊 TOTALES CALCULADOS MANUALMENTE:');
  console.log('==================================');
  console.log(`Total Prevenii (sin descuentos): ${totalPrevenii.toFixed(2)}€`);
  console.log(`Total Market (sin descuentos): ${totalMarket.toFixed(2)}€`);

  // Aplicar descuentos por volumen manualmente
  const testCount = essentialBiomarkers.length;
  let descuentoPrevenii = 0;
  let descuentoMarket = 0;

  if (testCount >= 51) {
    descuentoPrevenii = 0.15;
    descuentoMarket = 0.15;
  } else if (testCount >= 26) {
    descuentoPrevenii = 0.10;
    descuentoMarket = 0.10;
  } else if (testCount >= 11) {
    descuentoPrevenii = 0.05;
    descuentoMarket = 0.05;
  }

  const finalPrevenii = totalPrevenii * (1 - descuentoPrevenii);
  const finalMarket = totalMarket * (1 - descuentoMarket);

  console.log(`\nDescuento por volumen (${testCount} tests): ${(descuentoPrevenii * 100)}%`);
  console.log(`Prevenii con descuento: ${finalPrevenii.toFixed(2)}€`);
  console.log(`Market con descuento: ${finalMarket.toFixed(2)}€`);

  // Comparar con el cálculo del sistema
  console.log('\n🔍 COMPARACIÓN CON SISTEMA:');
  console.log('===========================');
  
  const systemPricing = window.essentialPackage.getPricing('male');
  console.log(`Sistema - Precio final: ${systemPricing.price}€`);
  console.log(`Sistema - PVP: ${systemPricing.costPrice}€`);
  console.log(`Sistema - Tests: ${systemPricing.testCount}`);

  console.log(`\nManual - Precio final: ${Math.round(finalPrevenii)}€`);
  console.log(`Manual - PVP: ${Math.round(finalMarket)}€`);
  console.log(`Manual - Tests: ${testCount}`);

  // Verificar diferencias
  const diffPrecio = Math.abs(systemPricing.price - Math.round(finalPrevenii));
  const diffPvp = Math.abs(systemPricing.costPrice - Math.round(finalMarket));
  const diffTests = Math.abs(systemPricing.testCount - testCount);

  console.log('\n✅ VERIFICACIÓN FINAL:');
  console.log('======================');
  console.log(`Diferencia precio: ${diffPrecio}€ ${diffPrecio <= 1 ? '✅' : '❌'}`);
  console.log(`Diferencia PVP: ${diffPvp}€ ${diffPvp <= 1 ? '✅' : '❌'}`);
  console.log(`Diferencia tests: ${diffTests} ${diffTests === 0 ? '✅' : '❌'}`);

  if (errores.length > 0) {
    console.log('\n⚠️ ERRORES ENCONTRADOS:');
    console.log('=======================');
    errores.forEach(error => console.log(`- ${error}`));
  }

  if (diffPrecio <= 1 && diffPvp <= 1 && diffTests === 0 && errores.length === 0) {
    console.log('\n🎉 ¡PRECIOS CORRECTOS! El Essential coincide con el CSV');
  } else {
    console.log('\n❌ HAY DISCREPANCIAS que necesitan revisión');
  }

}).catch(error => {
  console.log('❌ Error:', error.message);
}); 