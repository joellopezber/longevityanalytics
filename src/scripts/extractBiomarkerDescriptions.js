/**
 * extractBiomarkerDescriptions.js
 * Script para extraer automáticamente todas las descripciones de biomarcadores
 * y generar las traducciones estructuradas para los archivos de idiomas
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo biomarkers.js
const biomarkersPath = path.join(__dirname, '../data/biomarkers.js');
const biomarkersContent = fs.readFileSync(biomarkersPath, 'utf8');

// Extraer todos los objetos de biomarcadores usando regex
const biomarkerMatches = biomarkersContent.match(/{\s*name:[^}]+description:\s*"[^"]+"\s*[^}]*}/g);

if (!biomarkerMatches) {
  console.log('No se encontraron biomarcadores');
  process.exit(1);
}

// Procesar cada biomarcador para extraer código y descripción
const biomarkers = [];
const uniqueDescriptions = new Map();

biomarkerMatches.forEach(match => {
  // Extraer código
  const codeMatch = match.match(/code:\s*"([^"]+)"/);
  // Extraer descripción
  const descriptionMatch = match.match(/description:\s*"([^"]+)"/);
  // Extraer nombre para referencia
  const nameMatch = match.match(/name:\s*"([^"]+)"/);
  
  if (codeMatch && descriptionMatch && nameMatch) {
    const code = codeMatch[1];
    const description = descriptionMatch[1];
    const name = nameMatch[1];
    
    biomarkers.push({ code, name, description });
    uniqueDescriptions.set(code, { name, description });
  }
});

console.log(`\n📊 RESUMEN DE EXTRACCIÓN:`);
console.log(`=========================`);
console.log(`✅ Total biomarcadores procesados: ${biomarkers.length}`);
console.log(`✅ Descripciones únicas: ${uniqueDescriptions.size}`);

// Generar estructura para traducciones en español
const spanishTranslations = {};
uniqueDescriptions.forEach((data, code) => {
  spanishTranslations[code] = {
    description: data.description
  };
});

// Generar estructura para traducciones en inglés (base para traducir)
const englishTranslations = {};
uniqueDescriptions.forEach((data, code) => {
  // Traducciones básicas para algunos términos comunes
  let englishDesc = data.description
    .replace(/Hormona/g, 'Hormone')
    .replace(/Enzima/g, 'Enzyme')
    .replace(/Proteína/g, 'Protein')
    .replace(/Mineral/g, 'Mineral')
    .replace(/Vitamina/g, 'Vitamin')
    .replace(/Oligoelemento/g, 'Trace element')
    .replace(/Antioxidante/g, 'Antioxidant')
    .replace(/Marcador/g, 'Marker')
    .replace(/función/g, 'function')
    .replace(/metabolismo/g, 'metabolism')
    .replace(/sistema/g, 'system');
  
  englishTranslations[code] = {
    description: `[EN] ${englishDesc}` // Marcado para traducir posteriormente
  };
});

// Generar estructura para traducciones en francés (base para traducir)
const frenchTranslations = {};
uniqueDescriptions.forEach((data, code) => {
  frenchTranslations[code] = {
    description: `[FR] ${data.description}` // Marcado para traducir posteriormente
  };
});

// Generar archivo de salida con las estructuras
const outputStructure = {
  biomarkers: {
    spanish: spanishTranslations,
    english: englishTranslations,
    french: frenchTranslations
  }
};

// Guardar en archivo JSON para revisión
const outputPath = path.join(__dirname, '../data/biomarkerTranslations.json');
fs.writeFileSync(outputPath, JSON.stringify(outputStructure, null, 2), 'utf8');

console.log(`\n💾 ARCHIVO GENERADO:`);
console.log(`==================`);
console.log(`📁 Ubicación: ${outputPath}`);
console.log(`📋 Estructura: biomarkers.{spanish/english/french}.{code}.description`);

// Mostrar algunos ejemplos
console.log(`\n🔍 EJEMPLOS DE EXTRACCIÓN:`);
console.log(`=========================`);
Array.from(uniqueDescriptions.entries()).slice(0, 5).forEach(([code, data]) => {
  console.log(`\n🧪 ${code}: ${data.name}`);
  console.log(`   📝 ES: ${data.description.substring(0, 60)}...`);
});

console.log(`\n✅ PROCESO COMPLETADO`);
console.log(`====================`);
console.log(`🔧 Próximos pasos:`);
console.log(`1. Revisar biomarkerTranslations.json`);
console.log(`2. Completar traducciones al inglés y francés`);
console.log(`3. Integrar en LanguageContext.js`);
console.log(`4. Probar traduciones dinámicas`); 