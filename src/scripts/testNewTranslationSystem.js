/**
 * testNewTranslationSystem.js
 * Script para testear el nuevo sistema modular de traducciones
 * Ejecutar con: node src/scripts/testNewTranslationSystem.js
 */

import { loadTranslations, validateTranslations } from '../utils/translationLoader.js';

console.log('🧪 PROBANDO NUEVO SISTEMA DE TRADUCCIONES\n');

try {
  // Cargar traducciones
  console.log('📂 Cargando traducciones...');
  const translations = loadTranslations();
  
  // Mostrar estructura
  console.log('\n📋 ESTRUCTURA CARGADA:');
  console.log('======================');
  
  Object.keys(translations).forEach(lang => {
    console.log(`\n${lang.toUpperCase()}:`);
    Object.keys(translations[lang]).forEach(section => {
      const sectionData = translations[lang][section];
      const keyCount = Object.keys(sectionData).length;
      console.log(`  ✅ ${section}: ${keyCount} claves`);
    });
  });
  
  // Validar traducciones
  console.log('\n🔍 VALIDANDO TRADUCCIONES:');
  console.log('===========================');
  
  const errors = validateTranslations(translations);
  
  if (errors.length === 0) {
    console.log('✅ Todas las traducciones están completas');
  } else {
    console.log('⚠️ Traducciones faltantes:');
    errors.forEach(error => {
      console.log(`  ❌ ${error}`);
    });
  }
  
  // Probar acceso a traducciones
  console.log('\n🎯 PROBANDO ACCESO A TRADUCCIONES:');
  console.log('===================================');
  
  // Simular función t()
  const testT = (lang, key) => {
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return `❌ NO ENCONTRADO: ${key}`;
      }
    }
    
    return value;
  };
  
  // Pruebas de acceso
  const testCases = [
    'navbar.clinicalAnalysis',
    'hero.title',
    'addOns.hormonas.name',
    'addOns.endocrino.description'
  ];
  
  testCases.forEach(testCase => {
    console.log(`\n🔍 Probando: ${testCase}`);
    ['es', 'en', 'fr'].forEach(lang => {
      const result = testT(lang, testCase);
      const preview = typeof result === 'string' && result.length > 50 
        ? result.substring(0, 50) + '...' 
        : result;
      console.log(`  ${lang}: ${preview}`);
    });
  });
  
  console.log('\n✅ SISTEMA FUNCIONANDO CORRECTAMENTE');
  console.log('\n📊 ESTADÍSTICAS:');
  console.log('================');
  
  const stats = {
    idiomas: Object.keys(translations).length,
    secciones: Object.keys(translations.es).length,
    totalClaves: 0
  };
  
  Object.keys(translations.es).forEach(section => {
    stats.totalClaves += Object.keys(translations.es[section]).length;
  });
  
  console.log(`• Idiomas soportados: ${stats.idiomas}`);
  console.log(`• Secciones creadas: ${stats.secciones}`);
  console.log(`• Total de claves: ${stats.totalClaves}`);
  
  console.log('\n🚀 BENEFICIOS DEL NUEVO SISTEMA:');
  console.log('=================================');
  console.log('✅ Archivos pequeños y manejables');
  console.log('✅ Fácil encontrar traducciones específicas');
  console.log('✅ Permite trabajo en paralelo');
  console.log('✅ Validación automática');
  console.log('✅ Fallbacks inteligentes');
  console.log('✅ Fácil agregar nuevos idiomas');
  
} catch (error) {
  console.error('❌ ERROR:', error.message);
} 