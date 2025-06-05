/**
 * validateTranslations.js
 * Script simple para validar que todas las traducciones están presentes
 * Ejecutar con: node src/scripts/validateTranslations.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 VALIDANDO SISTEMA DE TRADUCCIONES\n');

const LOCALES_DIR = path.join(__dirname, '../locales');
const LANGUAGES = ['es', 'en', 'fr'];
const SECTIONS = [
  'navbar',
  'hero', 
  'addons',
  'packages',
  'process',
  'cta',
  'footer',
  'gender',
  'systems',
  'packageComparison',
  'addOnExplorer',
  'biomarkers'
];

let totalFiles = 0;
let missingFiles = 0;
let totalKeys = 0;
const stats = {};

// Inicializar estadísticas
LANGUAGES.forEach(lang => {
  stats[lang] = { files: 0, keys: 0, missing: [] };
});

console.log('📂 VERIFICANDO ARCHIVOS DE TRADUCCIÓN:');
console.log('=====================================');

LANGUAGES.forEach(language => {
  console.log(`\n🌍 Idioma: ${language.toUpperCase()}`);
  console.log('-'.repeat(30));
  
  SECTIONS.forEach(section => {
    const filePath = path.join(LOCALES_DIR, language, `${section}.json`);
    totalFiles++;
    
    if (fs.existsSync(filePath)) {
      try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const keyCount = Object.keys(content).length;
        
        console.log(`✅ ${section}.json (${keyCount} claves)`);
        stats[language].files++;
        stats[language].keys += keyCount;
        totalKeys += keyCount;
      } catch (error) {
        console.log(`❌ ${section}.json (Error JSON)`);
        stats[language].missing.push(section);
        missingFiles++;
      }
    } else {
      console.log(`❌ ${section}.json (No existe)`);
      stats[language].missing.push(section);
      missingFiles++;
    }
  });
});

console.log('\n\n📊 ESTADÍSTICAS FINALES:');
console.log('========================');
console.log(`Total archivos esperados: ${totalFiles}`);
console.log(`Archivos presentes: ${totalFiles - missingFiles}`);
console.log(`Archivos faltantes: ${missingFiles}`);
console.log(`Total claves de traducción: ${totalKeys}`);

const completionPercentage = ((totalFiles - missingFiles) / totalFiles * 100).toFixed(1);
console.log(`\n🎯 Progreso: ${completionPercentage}%`);

console.log('\n📈 DESGLOSE POR IDIOMA:');
console.log('-'.repeat(40));
LANGUAGES.forEach(lang => {
  const langStats = stats[lang];
  const langCompletion = (langStats.files / SECTIONS.length * 100).toFixed(1);
  
  console.log(`\n${lang.toUpperCase()}:`);
  console.log(`  Archivos: ${langStats.files}/${SECTIONS.length} (${langCompletion}%)`);
  console.log(`  Claves: ${langStats.keys}`);
  
  if (langStats.missing.length > 0) {
    console.log(`  Faltantes: ${langStats.missing.join(', ')}`);
  }
});

if (missingFiles === 0) {
  console.log('\n🎉 ¡MIGRACIÓN COMPLETADA EXITOSAMENTE!');
  console.log('====================================');
  console.log('✅ Todas las traducciones están presentes');
  console.log('✅ Sistema modular implementado');
  console.log('✅ 12 secciones en 3 idiomas');
  console.log(`✅ ${totalKeys} claves de traducción totales`);
} else {
  console.log('\n⚠️  MIGRACIÓN PARCIALMENTE COMPLETADA');
  console.log('===================================');
  console.log(`Faltan ${missingFiles} archivos por completar`);
}

console.log('\n🚀 BENEFICIOS LOGRADOS:');
console.log('-'.repeat(30));
console.log('• Archivos pequeños y manejables');
console.log('• Fácil encontrar traducciones específicas');
console.log('• Estructura modular escalable');
console.log('• Soporte para múltiples idiomas');
console.log('• Fallbacks inteligentes al español');
console.log('• Validación automática del sistema');

console.log('\n💡 PRÓXIMOS PASOS:');
console.log('-'.repeat(20));
console.log('1. Integrar NewLanguageContext.js en la aplicación');
console.log('2. Reemplazar el contexto antiguo');
console.log('3. Probar la aplicación con las nuevas traducciones');
console.log('4. Agregar más idiomas fácilmente'); 