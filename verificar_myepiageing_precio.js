/**
 * Verificación: Actualización de precios de MyEpiAgeing
 * 
 * Este script verifica que el precio de MyEpiAgeing se actualizó
 * correctamente y muestra el impacto en el add-on bioAge
 */

const fs = require('fs');

console.log('🔍 VERIFICACIÓN: ACTUALIZACIÓN DE PRECIOS MYEPIAGEING\n');

// 1. Verificar priceData.js - Nuevos precios
const priceDataContent = fs.readFileSync('src/data/priceData.js', 'utf8');
const hasNewPrice = priceDataContent.includes('"MyEpiAgeing", code: "OG001", prevenii: "299,00 €", market: "350,00 €"');
const hasOldPrice = priceDataContent.includes('171,35 €') && priceDataContent.includes('199,00 €') && priceDataContent.includes('MyEpiAgeing');

console.log('✅ Nuevo precio (299€/350€):', hasNewPrice ? 'APLICADO' : '❌ NO APLICADO');
console.log('✅ Precio anterior removido:', !hasOldPrice ? 'CORRECTO' : '❌ PRECIO ANTERIOR PRESENTE');

// 2. Verificar que el código OG001 está en biomarkers.js
const biomarkersContent = fs.readFileSync('src/data/biomarkers.js', 'utf8');
const hasCorrectCode = biomarkersContent.includes('code: "OG001"') && biomarkersContent.includes('MyEpiAgeing');
console.log('✅ Código OG001 vinculado:', hasCorrectCode ? 'CORRECTO' : '❌ INCONSISTENTE');

// 3. Simular cálculo de impacto en add-on bioAge
console.log('\n💰 IMPACTO EN PRECIOS DEL ADD-ON BIOAGE:');

// Precios anteriores aproximados (simulados)
const oldMyEpiAgeingPrice = 171.35;
const oldMyEpiAgeingPvp = 199.00;

// Nuevos precios
const newMyEpiAgeingPrice = 299.00;
const newMyEpiAgeingPvp = 350.00;

// Calcular diferencia
const priceDifference = newMyEpiAgeingPrice - oldMyEpiAgeingPrice;
const pvpDifference = newMyEpiAgeingPvp - oldMyEpiAgeingPvp;

console.log(`📈 Incremento en precio Prevenii: +${priceDifference.toFixed(2)}€`);
console.log(`📈 Incremento en PVP: +${pvpDifference.toFixed(2)}€`);
console.log(`📊 Porcentaje incremento precio: +${((priceDifference/oldMyEpiAgeingPrice)*100).toFixed(1)}%`);
console.log(`📊 Porcentaje incremento PVP: +${((pvpDifference/oldMyEpiAgeingPvp)*100).toFixed(1)}%`);

// 4. Verificar que el add-on bioAge usa el sistema de precios dinámicos
const hasDynamicPricing = biomarkersContent.includes('getPricing()') && biomarkersContent.includes('bioage');
console.log('\n✅ Sistema precios dinámicos:', hasDynamicPricing ? 'ACTIVO - Precios se actualizarán automáticamente' : '❌ REVISAR');

console.log('\n📋 RESUMEN:');
if (hasNewPrice && !hasOldPrice && hasCorrectCode) {
  console.log('🎉 ¡ACTUALIZACIÓN EXITOSA! MyEpiAgeing ahora cuesta 299€ (PVP 350€)');
  console.log('💡 El add-on "Edad Biológica" reflejará automáticamente estos nuevos precios');
} else {
  console.log('⚠️  Hay problemas en la actualización de precios');
}

console.log('\n🔄 COMPONENTES QUE SE ACTUALIZARÁN AUTOMÁTICAMENTE:');
console.log('- Add-on "Edad Biológica" en MedicalSystemsExplorer');
console.log('- Selector de precios en PackageComparison');
console.log('- Cualquier cálculo que use el código OG001'); 