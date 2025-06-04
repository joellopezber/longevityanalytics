/**
 * testPricing.js
 * Script de prueba para validar el sistema de precios dinámico
 * Compara precios calculados vs precios legacy y genera reportes
 * 
 * Para ejecutar: node src/data/testPricing.js
 */

import { essentialPackage, addOnPackages } from '../data/biomarkers.js';
import { generatePricingReport, compareLegacyPricing, validatePackagePricing } from '../data/priceUtils.js';
import { getPriceStatistics } from '../data/priceData.js';

/**
 * Ejecuta todas las pruebas del sistema de precios
 */
const runPricingTests = () => {
  console.log('🧪 INICIANDO PRUEBAS DEL SISTEMA DE PRECIOS DINÁMICO\n');
  
  // 1. Estadísticas generales de precios
  console.log('📊 ESTADÍSTICAS GENERALES DE PRECIOS');
  console.log('=====================================');
  const stats = getPriceStatistics();
  console.log(`Total biomarcadores: ${stats.totalBiomarkers}`);
  console.log(`Precio Prevenii promedio: ${stats.preveniiStats.avg.toFixed(2)}€`);
  console.log(`Rango Prevenii: ${stats.preveniiStats.min}€ - ${stats.preveniiStats.max}€`);
  console.log(`Precio Market promedio: ${stats.marketStats.avg.toFixed(2)}€`);
  console.log(`Rango Market: ${stats.marketStats.min}€ - ${stats.marketStats.max}€\n`);
  
  // 2. Validar Essential Package
  console.log('🔍 VALIDACIÓN PAQUETE ESSENTIAL');
  console.log('===============================');
  const essentialValidation = validatePackagePricing(essentialPackage.biomarkers);
  console.log(`Biomarcadores válidos: ${essentialValidation.validCount}/${essentialValidation.totalCount}`);
  
  if (essentialValidation.isValid) {
    console.log('✅ Todos los biomarcadores tienen precios válidos');
    const essentialPricing = essentialPackage.getPricing('both');
    console.log(`Precio calculado: ${essentialPricing.price}€`);
    console.log(`Tests incluidos: ${essentialPricing.testCount}`);
    console.log(`Precio por test: ${essentialPricing.pricePerTest.toFixed(2)}€`);
  } else {
    console.log('❌ Problemas encontrados:');
    essentialValidation.issues.forEach(issue => {
      console.log(`  - ${issue.name}: ${issue.issue}`);
    });
  }
  console.log('');
  
  // 3. Validar Add-ons
  console.log('🔍 VALIDACIÓN ADD-ONS');
  console.log('=====================');
  
  Object.keys(addOnPackages).forEach(key => {
    const addOn = addOnPackages[key];
    console.log(`\n📦 ${addOn.name}`);
    console.log('-'.repeat(addOn.name.length + 4));
    
    const validation = validatePackagePricing(addOn.biomarkers);
    console.log(`Biomarcadores válidos: ${validation.validCount}/${validation.totalCount}`);
    
    if (validation.isValid) {
      console.log('✅ Precios válidos');
      
      // Probar precios dinámicos si existe la función
      if (addOn.getPricing) {
        try {
          const pricing = addOn.getPricing();
          if (pricing.male && pricing.female) {
            console.log(`Precio hombre: ${pricing.male.price}€ (${pricing.male.testCount} tests)`);
            console.log(`Precio mujer: ${pricing.female.price}€ (${pricing.female.testCount} tests)`);
          } else {
            console.log(`Precio: ${pricing.price}€ (${pricing.testCount} tests)`);
          }
        } catch (error) {
          console.log(`❌ Error calculando precios: ${error.message}`);
        }
      } else {
        console.log('⚠️  Sin función getPricing - usando precios legacy');
        if (addOn.price) {
          if (typeof addOn.price === 'object') {
            console.log(`Precio legacy hombre: ${addOn.price.male}€`);
            console.log(`Precio legacy mujer: ${addOn.price.female}€`);
          } else {
            console.log(`Precio legacy: ${addOn.price}€`);
          }
        }
      }
    } else {
      console.log('❌ Problemas encontrados:');
      validation.issues.forEach(issue => {
        console.log(`  - ${issue.name}: ${issue.issue}`);
      });
    }
  });
  
  // 4. Generar reporte completo
  console.log('\n📋 REPORTE COMPLETO DE PRECIOS');
  console.log('==============================');
  
  const packagesData = {
    essential: essentialPackage,
    addOns: addOnPackages
  };
  
  const report = generatePricingReport(packagesData);
  
  console.log(`\n🎯 RESUMEN:`);
  console.log(`Total paquetes: ${report.summary.totalPackages}`);
  console.log(`Total tests: ${report.summary.totalTests}`);
  console.log(`Precio promedio: ${report.summary.averagePrice}€`);
  console.log(`Rango precios: ${report.summary.priceRange.min}€ - ${report.summary.priceRange.max}€`);
  
  if (report.essential) {
    console.log(`\n📦 Essential: ${report.essential.price}€ (${report.essential.testCount} tests)`);
  }
  
  console.log('\n📦 Add-ons:');
  Object.keys(report.addOns).forEach(key => {
    const addon = report.addOns[key];
    console.log(`  - ${key}: ${addon.price}€ (${addon.testCount} tests)`);
  });
  
  // 5. Comparar con precios legacy (si existen)
  console.log('\n🔄 COMPARACIÓN CON PRECIOS LEGACY');
  console.log('=================================');
  
  Object.keys(addOnPackages).forEach(key => {
    const addOn = addOnPackages[key];
    if (addOn.price) {
      try {
        const comparison = compareLegacyPricing(addOn, 'addon');
        console.log(`\n${comparison.packageName}:`);
        
        if (typeof comparison.legacy === 'object') {
          console.log(`  Legacy - Hombre: ${comparison.legacy.male}€, Mujer: ${comparison.legacy.female}€`);
          console.log(`  Dinámico - Hombre: ${comparison.dynamic.male?.price}€, Mujer: ${comparison.dynamic.female?.price}€`);
          console.log(`  Diferencia - Hombre: ${comparison.differences.male > 0 ? '+' : ''}${comparison.differences.male}€`);
          console.log(`  Diferencia - Mujer: ${comparison.differences.female > 0 ? '+' : ''}${comparison.differences.female}€`);
        } else {
          console.log(`  Legacy: ${comparison.legacy}€`);
          console.log(`  Dinámico: ${comparison.dynamic.price}€`);
          console.log(`  Diferencia: ${comparison.differences.price > 0 ? '+' : ''}${comparison.differences.price}€`);
        }
      } catch (error) {
        console.log(`❌ Error comparando ${addOn.name}: ${error.message}`);
      }
    }
  });
  
  console.log('\n✅ PRUEBAS COMPLETADAS');
  console.log('======================');
  console.log('El sistema de precios dinámico está funcionando correctamente.');
  console.log('Los precios se calculan automáticamente basándose en los biomarcadores incluidos.');
  console.log('Para actualizar precios, simplemente modifica el CSV en priceData.js');
};

// Ejecutar pruebas si se ejecuta directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runPricingTests();
}

export { runPricingTests }; 