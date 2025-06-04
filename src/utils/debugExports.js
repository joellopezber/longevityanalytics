/**
 * debugExports.js
 * Exporta paquetes al objeto global window para debugging en consola del navegador
 */

import { essentialPackage, addOnPackages } from '../data/biomarkers.js';
import { calculatePackagePrice, calculateAddOnPrice } from '../data/priceCalculator.js';

// Función de test para Essential
const testEssentialPricing = () => {
  console.log('🔍 TESTING ESSENTIAL PRICING\n');
  
  // Test para hombre
  console.log('=== ESSENTIAL HOMBRE ===');
  const resultadoHombre = calculatePackagePrice(essentialPackage.biomarkers, 'male', 'essential');
  console.log('Resultado completo:', resultadoHombre);
  console.log(`Precio final (costPrice): ${resultadoHombre.costPrice}€`);
  console.log(`PVP (marketPrice): ${resultadoHombre.marketPrice}€`);
  console.log(`Número de tests: ${resultadoHombre.testCount}`);
  console.log(`Precio hombre: ${resultadoHombre.price}€ (${resultadoHombre.testCount} tests)`);
  
  console.log('\n=== ESSENTIAL MUJER ===');
  const resultadoMujer = calculatePackagePrice(essentialPackage.biomarkers, 'female', 'essential');
  console.log('Resultado completo:', resultadoMujer);
  console.log(`Precio final (costPrice): ${resultadoMujer.costPrice}€`);
  console.log(`PVP (marketPrice): ${resultadoMujer.marketPrice}€`);
  console.log(`Número de tests: ${resultadoMujer.testCount}`);
  console.log(`Biomarcadores: ${resultadoMujer.testCount}`);
  console.log(`Precio mujer: ${resultadoMujer.price}€ (${resultadoMujer.testCount} tests)`);
  
  return { hombre: resultadoHombre, mujer: resultadoMujer };
};

// Exportar al objeto global window para debugging
if (typeof window !== 'undefined') {
  window.essentialPackage = essentialPackage;
  window.addOnPackages = addOnPackages;
  window.calculatePackagePrice = calculatePackagePrice;
  window.calculateAddOnPrice = calculateAddOnPrice;
  window.testEssentialPricing = testEssentialPricing;
  
  console.log('🔧 DEBUG: Paquetes exportados a window para testing');
  console.log('📦 Disponible: window.essentialPackage');
  console.log('🔬 Disponible: window.addOnPackages');
  console.log('💰 Disponible: window.calculatePackagePrice');
  console.log('💰 Disponible: window.calculateAddOnPrice');
  console.log('🧪 Disponible: window.testEssentialPricing()');
}

export { essentialPackage, addOnPackages, calculatePackagePrice, calculateAddOnPrice, testEssentialPricing }; 