/**
 * Test detallado de cálculos de precios para navegador
 * 
 * INSTRUCCIONES:
 * 1. Abrir http://localhost:3000 en el navegador
 * 2. Abrir DevTools (F12) → Console
 * 3. Copiar y pegar este código
 * 4. Presionar Enter
 */

console.log('🧮 TEST DETALLADO DE CÁLCULOS DE PRECIOS\n');

// Esperar a que los paquetes estén disponibles
const waitForPackages = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkPackages = () => {
      attempts++;
      if (window.essentialPackage && window.addOnPackages) {
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
    const essentialPricing = window.essentialPackage.getPricing('male');
    console.log('✅ Essential (male):');
    console.log(`   - Tests: ${essentialPricing.testCount}`);
    console.log(`   - Precio final: ${essentialPricing.price}€`);
    console.log(`   - Precio de costo: ${essentialPricing.costPrice}€`);
    console.log(`   - Precio por test: ${essentialPricing.pricePerTest}€`);
    console.log(`   - Detalles:`, essentialPricing.details);
    
    // Verificar biomarcadores del Essential
    console.log(`   - Biomarcadores en array: ${window.essentialPackage.biomarkers.length}`);
    
  } catch (error) {
    console.log(`❌ Error en Essential: ${error.message}`);
  }

  console.log('\n🔬 ADD-ON PACKAGES - ANÁLISIS DETALLADO:');
  console.log('=======================================');

  // Test algunos add-ons específicos
  const testAddOns = ['hormonas', 'endocrino', 'antioxidantes'];

  testAddOns.forEach(addOnKey => {
    const addOn = window.addOnPackages[addOnKey];
    if (addOn && addOn.getPricing) {
      console.log(`\n${addOn.name}:`);
      try {
        const pricing = addOn.getPricing();
        
        if (pricing.male && pricing.female) {
          console.log(`  👨 Hombre: ${pricing.male.price}€ (${pricing.male.testCount} tests)`);
          console.log(`  👩 Mujer: ${pricing.female.price}€ (${pricing.female.testCount} tests)`);
        } else {
          console.log(`  🔬 Precio: ${pricing.price}€ (${pricing.testCount} tests)`);
        }
        
        console.log(`  📊 Detalles:`, pricing.details);
        console.log(`  🧬 Biomarcadores en array: ${addOn.biomarkers.length}`);
        
      } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
      }
    }
  });

  console.log('\n🧮 SIMULACIÓN DE SUMATORIO:');
  console.log('===========================');

  // Simular un paquete Essential + 2 add-ons
  try {
    const essentialPricing = window.essentialPackage.getPricing('male');
    const hormonasPricing = window.addOnPackages.hormonas.getPricing();
    const endocrinoPricing = window.addOnPackages.endocrino.getPricing();
    
    console.log('Simulando: Essential + Hormonas + Endocrino (male)');
    console.log(`Essential: ${essentialPricing.price}€ (${essentialPricing.testCount} tests)`);
    console.log(`Hormonas: ${hormonasPricing.male.price}€ (${hormonasPricing.male.testCount} tests)`);
    console.log(`Endocrino: ${endocrinoPricing.price}€ (${endocrinoPricing.testCount} tests)`);
    
    const totalPrice = essentialPricing.price + hormonasPricing.male.price + endocrinoPricing.price;
    const totalTests = essentialPricing.testCount + hormonasPricing.male.testCount + endocrinoPricing.testCount;
    
    console.log(`\n📊 TOTAL CALCULADO:`);
    console.log(`   - Precio total: ${totalPrice}€`);
    console.log(`   - Tests totales: ${totalTests}`);
    console.log(`   - Precio por test: ${(totalPrice / totalTests).toFixed(2)}€`);
    
  } catch (error) {
    console.log(`❌ Error en simulación: ${error.message}`);
  }

  console.log('\n🎯 VERIFICACIÓN MANUAL DE PRECIOS:');
  console.log('==================================');
  
  // Verificar algunos precios específicos del CSV
  try {
    console.log('Verificando precios individuales de biomarcadores:');
    
    // Usar la función de cálculo directamente
    if (window.calculatePackagePrice) {
      const testBiomarkers = [
        { code: "H0000", name: "Hemograma completo", gender: "both" },
        { code: "B0000", name: "Glucosa en ayunas", gender: "both" },
        { code: "B5600", name: "Insulina basal", gender: "both" }
      ];
      
      const testPricing = window.calculatePackagePrice(testBiomarkers, 'male', 'test');
      console.log('Test con 3 biomarcadores específicos:');
      console.log(`   - Tests: ${testPricing.testCount}`);
      console.log(`   - Precio final: ${testPricing.finalPrice}€`);
      console.log(`   - Precio de costo: ${testPricing.costPrice}€`);
      console.log(`   - Precio market: ${testPricing.marketPrice}€`);
    }
    
  } catch (error) {
    console.log(`❌ Error en verificación manual: ${error.message}`);
  }

  console.log('\n🎉 ¡TEST COMPLETADO!');
  console.log('\n💡 Para más detalles, puedes ejecutar:');
  console.log('window.essentialPackage.getPricing("male")');
  console.log('window.addOnPackages.hormonas.getPricing()');
  
}).catch(error => {
  console.log('❌ Error esperando paquetes:', error.message);
}); 