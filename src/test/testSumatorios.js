/**
 * Test específico para verificar sumatorios de precios
 * Para ejecutar en la consola del navegador
 */

console.log('🧮 TEST DE SUMATORIOS DE PRECIOS\n');

const waitForPackages = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkPackages = () => {
      attempts++;
      if (window.essentialPackage && window.addOnPackages && window.calculatePackagePrice) {
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
  console.log('🔍 COMPARANDO MÉTODOS DE CÁLCULO:');
  console.log('================================');

  // Método 1: Sumar precios individuales (INCORRECTO)
  console.log('\n📊 MÉTODO 1 - Suma Individual (Incorrecto):');
  const essentialPricing = window.essentialPackage.getPricing('male');
  const hormonasPricing = window.addOnPackages.hormonas.getPricing();
  const endocrinoPricing = window.addOnPackages.endocrino.getPricing();
  
  const sumaIndividual = essentialPricing.price + hormonasPricing.male.price + endocrinoPricing.price;
  const testsIndividual = essentialPricing.testCount + hormonasPricing.male.testCount + endocrinoPricing.testCount;
  
  console.log(`Essential: ${essentialPricing.price}€ (${essentialPricing.testCount} tests)`);
  console.log(`Hormonas: ${hormonasPricing.male.price}€ (${hormonasPricing.male.testCount} tests)`);
  console.log(`Endocrino: ${endocrinoPricing.price}€ (${endocrinoPricing.testCount} tests)`);
  console.log(`TOTAL SUMA: ${sumaIndividual}€ (${testsIndividual} tests)`);
  
  // Método 2: Cálculo conjunto con descuento por volumen (CORRECTO)
  console.log('\n📊 MÉTODO 2 - Cálculo Conjunto (Correcto):');
  
  // Combinar todos los biomarcadores
  let allBiomarkers = [...window.essentialPackage.biomarkers];
  
  // Agregar biomarcadores de hormonas (filtrados por género male)
  const hormonasBiomarkers = window.addOnPackages.hormonas.biomarkers.filter(biomarker => {
    if (!biomarker.gender || biomarker.gender === 'both') return true;
    return biomarker.gender === 'male';
  });
  
  // Agregar biomarcadores de endocrino
  const endocrinoBiomarkers = window.addOnPackages.endocrino.biomarkers.filter(biomarker => {
    if (!biomarker.gender || biomarker.gender === 'both') return true;
    return biomarker.gender === 'male';
  });
  
  allBiomarkers = [...allBiomarkers, ...hormonasBiomarkers, ...endocrinoBiomarkers];
  
  // Calcular precio conjunto
  const conjuntoPricing = window.calculatePackagePrice(allBiomarkers, 'male', 'essential');
  
  console.log(`Biomarcadores totales: ${conjuntoPricing.testCount}`);
  console.log(`Precio market original: ${conjuntoPricing.marketPrice}€`);
  // console.log(`Descuento por volumen: ${conjuntoPricing.volumeDiscount.discount}% (${conjuntoPricing.volumeDiscount.discountAmount}€)`);
  console.log(`PRECIO FINAL: ${conjuntoPricing.finalPrice}€`);
  
  // Calcular ahorro comparado con precio de mercado
  const ahorroMercado = conjuntoPricing.marketPrice - conjuntoPricing.finalPrice;
  const porcentajeAhorro = Math.round((ahorroMercado / conjuntoPricing.marketPrice) * 100);

  console.log(`\n🎯 COMPARACIÓN CON MERCADO:`);
  console.log(`Precio mercado (PVP): ${conjuntoPricing.marketPrice}€`);
  console.log(`Nuestro precio: ${conjuntoPricing.finalPrice}€`);
  console.log(`Ahorro total: ${ahorroMercado.toFixed(2)}€`);
  // console.log(`Ahorro con descuento por volumen: ${conjuntoPricing.volumeDiscount.discountAmount}€`);
  console.log(`Porcentaje ahorro: ${porcentajeAhorro}%`);

  // Desglose detallado
  console.log(`\n📊 DESGLOSE DETALLADO:`);
  console.log(`${conjuntoPricing.testCount} tests incluidos`);
  console.log(`Precio por test: ${conjuntoPricing.pricePerTest}€`);
  console.log(`\n${conjuntoPricing.biomarkers.map(biomarker => biomarker.name).join(', ')}`);
  
  // Verificar descuentos por volumen
  console.log('\n📈 DESCUENTOS POR VOLUMEN:');
  console.log('=========================');
  console.log('Configuración actual:');
  console.log('- 0-10 tests: 0% descuento');
  console.log('- 11-25 tests: 5% descuento');
  console.log('- 26-50 tests: 10% descuento');
  console.log('- 51+ tests: 15% descuento');
  // console.log(`\nEste paquete tiene ${conjuntoPricing.testCount} tests → ${conjuntoPricing.volumeDiscount.discount}% descuento`);
  
  console.log('\n🎉 ¡TEST COMPLETADO!');
  
}).catch(error => {
  console.log('❌ Error:', error.message);
}); 