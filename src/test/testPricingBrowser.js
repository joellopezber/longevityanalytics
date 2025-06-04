/**
 * Test de precios para ejecutar en la consola del navegador
 * 
 * INSTRUCCIONES:
 * 1. Abrir http://localhost:3000 en el navegador
 * 2. Abrir DevTools (F12)
 * 3. Ir a la pestaña Console
 * 4. Copiar y pegar este código
 * 5. Presionar Enter
 */

console.log('🧪 PROBANDO SISTEMA DE PRECIOS EN NAVEGADOR\n');

// Función helper para esperar a que los paquetes estén disponibles
const waitForPackages = (maxAttempts = 10) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkPackages = () => {
      attempts++;
      if (window.essentialPackage && window.addOnPackages) {
        resolve(true);
      } else if (attempts >= maxAttempts) {
        reject(new Error('Paquetes no disponibles después de ' + maxAttempts + ' intentos'));
      } else {
        setTimeout(checkPackages, 500);
      }
    };
    checkPackages();
  });
};

// Test Essential Package
console.log('📦 ESSENTIAL PACKAGE:');
console.log('====================');

waitForPackages().then(() => {
  try {
    const { essentialPackage } = window;
    
    if (essentialPackage && essentialPackage.getPricing) {
      console.log('✅ Essential package encontrado');
      
      // Test para ambos géneros
      ['male', 'female', 'both'].forEach(gender => {
        try {
          const essentialPricing = essentialPackage.getPricing(gender);
          console.log(`✅ Essential (${gender}): ${essentialPricing.price}€ (${essentialPricing.testCount} tests)`);
          console.log(`   Costo: ${essentialPricing.costPrice}€, Precio por test: ${essentialPricing.pricePerTest}€`);
        } catch (error) {
          console.log(`❌ Error en Essential (${gender}): ${error.message}`);
        }
      });
    } else {
      console.log('❌ essentialPackage no tiene función getPricing');
    }
  } catch (error) {
    console.log(`❌ Error en Essential: ${error.message}`);
  }

  console.log('\n🔬 ADD-ON PACKAGES:');
  console.log('==================');

  try {
    const { addOnPackages } = window;
    
    if (addOnPackages) {
      const testAddOns = ['hormonas', 'endocrino', 'antioxidantes', 'inflammation', 'genome', 'cancer'];
      
      testAddOns.forEach(addOnKey => {
        const addOn = addOnPackages[addOnKey];
        if (addOn && addOn.getPricing) {
          console.log(`\n${addOn.name}:`);
          try {
            const pricing = addOn.getPricing();
            
            if (pricing.male && pricing.female) {
              // Add-on con diferenciación por género
              console.log(`  ✅ Hombre: ${pricing.male.price}€ (${pricing.male.testCount} tests)`);
              console.log(`  ✅ Mujer: ${pricing.female.price}€ (${pricing.female.testCount} tests)`);
            } else {
              // Add-on sin diferenciación por género
              console.log(`  ✅ Precio: ${pricing.price}€ (${pricing.testCount} tests)`);
            }
          } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
          }
        } else {
          console.log(`❌ Add-on '${addOnKey}' no encontrado o sin getPricing`);
        }
      });
    } else {
      console.log('❌ addOnPackages no disponible en window');
    }
  } catch (error) {
    console.log(`❌ Error en Add-ons: ${error.message}`);
  }

  console.log('\n🎯 VERIFICACIÓN MANUAL:');
  console.log('======================');
  console.log('Puedes probar manualmente:');
  console.log('- window.essentialPackage.getPricing("male")');
  console.log('- window.addOnPackages.hormonas.getPricing()');
  console.log('- window.addOnPackages.genome.getPricing()');

  console.log('\n🎉 ¡TEST COMPLETADO!');
}).catch(error => {
  console.log('❌ Error esperando paquetes:', error.message);
  console.log('\n🔍 DEBUGGING INFO:');
  console.log('window.essentialPackage:', typeof window.essentialPackage);
  console.log('window.addOnPackages:', typeof window.addOnPackages);
  console.log('\nSi los paquetes no están disponibles, verifica que:');
  console.log('1. La aplicación se haya cargado completamente');
  console.log('2. No hay errores en la consola');
  console.log('3. Los imports en App.jsx funcionan correctamente');
}); 