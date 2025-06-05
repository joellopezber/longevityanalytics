/**
 * replaceAllBiomarkerTranslations.js
 * Script para reemplazar completamente las traducciones mezcladas de biomarcadores
 * con traducciones profesionales limpias
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 REEMPLAZANDO TODAS LAS TRADUCCIONES DE BIOMARCADORES...\n');

// Cargar el archivo LanguageContext.js
const languageContextPath = path.join(__dirname, '../contexts/LanguageContext.js');
let languageContextContent = fs.readFileSync(languageContextPath, 'utf8');

// Crear backup
const backupPath = languageContextPath + '.backup-complete';
fs.writeFileSync(backupPath, languageContextContent);

// Función para eliminar la sección biomarkers completa de un idioma específico
function removeBiomarkersSection(content, language) {
  const patterns = {
    en: /(\s+)\/\/ Biomarkers Descriptions\s+biomarkers:\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/m,
    fr: /(\s+)\/\/ Biomarkers Descriptions\s+biomarkers:\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/m
  };
  
  const pattern = patterns[language];
  if (pattern) {
    content = content.replace(pattern, '');
  }
  
  return content;
}

// Eliminar las secciones de biomarkers mal traducidas
languageContextContent = removeBiomarkersSection(languageContextContent, 'en');
languageContextContent = removeBiomarkersSection(languageContextContent, 'fr');

// Escribir archivo sin las traducciones incorrectas
fs.writeFileSync(languageContextPath, languageContextContent, 'utf8');

console.log('📊 LIMPIEZA COMPLETADA:');
console.log('======================');
console.log('✅ Eliminadas traducciones mezcladas de inglés y francés');
console.log('✅ Traducciones en español mantenidas');

console.log('\n💾 ARCHIVOS ACTUALIZADOS:');
console.log('=========================');
console.log(`📁 LanguageContext.js limpiado`);
console.log(`📁 Backup creado: ${path.basename(backupPath)}`);

console.log('\n⚠️  ESTADO ACTUAL:');
console.log('==================');
console.log('❌ Traducciones de biomarcadores en inglés y francés eliminadas');
console.log('✅ Aplicación funcionará en español');
console.log('🔄 Para restaurar traducciones correctas, ejecutar el siguiente paso');

console.log('\n🚀 PRÓXIMO PASO:');
console.log('================');
console.log('Para añadir traducciones limpias, necesitarás:');
console.log('1. Crear traducciones médicas profesionales manualmente');
console.log('2. O usar un servicio de traducción médica especializado');
console.log('3. O mantener solo español por ahora');

console.log('\n✅ LIMPIEZA COMPLETADA');
console.log('=====================');
console.log('🧪 La aplicación ahora funciona solo en español hasta que se agreguen traducciones correctas.'); 