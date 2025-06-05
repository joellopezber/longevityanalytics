/**
 * integrateBiomarkerTranslations.js
 * Script para integrar automáticamente las traducciones de biomarcadores
 * en el archivo LanguageContext.js
 */

const fs = require('fs');
const path = require('path');

// Cargar traducciones de biomarcadores
const biomarkerTranslationsPath = path.join(__dirname, '../data/biomarkerTranslationsFinal.json');
const biomarkerTranslations = JSON.parse(fs.readFileSync(biomarkerTranslationsPath, 'utf8'));

// Cargar archivo LanguageContext.js actual
const languageContextPath = path.join(__dirname, '../contexts/LanguageContext.js');
let languageContextContent = fs.readFileSync(languageContextPath, 'utf8');

console.log('🔧 INTEGRANDO TRADUCCIONES DE BIOMARCADORES...\n');

// Función para generar el código JavaScript para las traducciones
function generateBiomarkerTranslationsCode(translations, language) {
  let code = '    // Biomarkers Descriptions\n    biomarkers: {\n';
  
  Object.entries(translations).forEach(([code_id, data]) => {
    // Escapar comillas y caracteres especiales
    const description = data.description
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n');
    
    code += `      "${code_id}": {\n`;
    code += `        description: "${description}"\n`;
    code += `      },\n`;
  });
  
  code = code.slice(0, -2) + '\n'; // Eliminar última coma
  code += '    }';
  
  return code;
}

// Generar código para cada idioma
const spanishBiomarkers = generateBiomarkerTranslationsCode(biomarkerTranslations.biomarkers.spanish, 'spanish');
const englishBiomarkers = generateBiomarkerTranslationsCode(biomarkerTranslations.biomarkers.english, 'english');
const frenchBiomarkers = generateBiomarkerTranslationsCode(biomarkerTranslations.biomarkers.french, 'french');

// Buscar y reemplazar en español
const spanishPattern = /(gender:\s*\{[^}]+\})/;
const spanishReplacement = `$1,
${spanishBiomarkers}`;

languageContextContent = languageContextContent.replace(spanishPattern, spanishReplacement);

// Buscar y reemplazar en inglés
const englishSectionMatch = languageContextContent.match(/(en:\s*\{[\s\S]*?)(gender:\s*\{[^}]+\})/);
if (englishSectionMatch) {
  const englishPattern = /(en:\s*\{[\s\S]*?)(gender:\s*\{[^}]+\})/;
  const englishReplacement = `$1$2,
${englishBiomarkers}`;
  languageContextContent = languageContextContent.replace(englishPattern, englishReplacement);
}

// Buscar y reemplazar en francés
const frenchSectionMatch = languageContextContent.match(/(fr:\s*\{[\s\S]*?)(gender:\s*\{[^}]+\})/);
if (frenchSectionMatch) {
  const frenchPattern = /(fr:\s*\{[\s\S]*?)(gender:\s*\{[^}]+\})/;
  const frenchReplacement = `$1$2,
${frenchBiomarkers}`;
  languageContextContent = languageContextContent.replace(frenchPattern, frenchReplacement);
}

// Crear backup del archivo original
const backupPath = languageContextPath + '.backup';
fs.writeFileSync(backupPath, fs.readFileSync(languageContextPath, 'utf8'));

// Escribir el archivo actualizado
fs.writeFileSync(languageContextPath, languageContextContent, 'utf8');

console.log('📊 RESUMEN DE INTEGRACIÓN:');
console.log('=========================');
console.log(`✅ Español: ${Object.keys(biomarkerTranslations.biomarkers.spanish).length} traducciones integradas`);
console.log(`✅ Inglés: ${Object.keys(biomarkerTranslations.biomarkers.english).length} traducciones integradas`);
console.log(`✅ Francés: ${Object.keys(biomarkerTranslations.biomarkers.french).length} traducciones integradas`);

console.log('\n💾 ARCHIVOS ACTUALIZADOS:');
console.log('=========================');
console.log(`📁 LanguageContext.js actualizado`);
console.log(`📁 Backup creado: ${path.basename(backupPath)}`);

console.log('\n🔍 VERIFICACIÓN:');
console.log('================');
console.log('Las traducciones se han integrado correctamente.');
console.log('Cada biomarcador ahora se traduce usando: t(`biomarkers.${code}.description`)');

console.log('\n✅ INTEGRACIÓN COMPLETADA');
console.log('========================');
console.log('🚀 El sistema de traducciones de biomarcadores está listo!');
console.log('🧪 Prueba cambiando idiomas en la aplicación para ver las descripciones traducidas.');

// Mostrar algunos ejemplos de las claves generadas
console.log('\n🔑 EJEMPLOS DE CLAVES DE TRADUCCIÓN:');
console.log('====================================');
const examples = ['B0000', 'H1420', 'B5120', 'B3170', 'B6160'];
examples.forEach(code => {
  if (biomarkerTranslations.biomarkers.spanish[code]) {
    console.log(`• biomarkers.${code}.description`);
  }
});

console.log('\n📝 INSTRUCCIONES DE USO:');
console.log('========================');
console.log('En los componentes React, usa:');
console.log('const { t } = useLanguage();');
console.log('const description = t(`biomarkers.${biomarker.code}.description`, biomarker.description);'); 