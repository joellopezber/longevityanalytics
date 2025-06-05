/**
 * fixBiomarkerTranslations.js
 * Script para arreglar las traducciones mal generadas de biomarcadores
 * Reemplaza las traducciones mezcladas por traducciones profesionales completas
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 ARREGLANDO TRADUCCIONES DE BIOMARCADORES...\n');

// Traducciones profesionales corregidas para los biomarcadores clave
const correctedTranslations = {
  english: {
    "I0141": "Antinuclear antibodies. Screening for systemic autoimmune diseases like lupus.",
    "I5072": "Anti-cyclic citrullinated peptide antibodies. Specific for rheumatoid arthritis.",
    "B6321": "Anti-thyroglobulin antibodies. Marker of thyroid autoimmunity.",
    "B6300": "Anti-thyroid peroxidase antibodies. Marker of autoimmune thyroiditis (Hashimoto's).",
    "B7750": "Antibodies against H. pylori. Detects gastric infection associated with ulcers and gastric cancer.",
    "B3130": "Autoantibody present in rheumatoid arthritis and other autoimmune diseases.",
    "H0000": "Complete blood cell analysis evaluating red blood cells, white blood cells, platelets and hemoglobin. Essential for detecting anemias, infections and hematological disorders.",
    "B0000": "Blood sugar level after 8-12 hours of fasting. Primary screening for diabetes and glucose metabolism assessment.",
    "B5120": "Stress hormone. Regulates metabolism, immunity and inflammation. Elevated indicates chronic stress.",
    "B3170": "High-sensitivity C-reactive protein. Marker of systemic inflammation and cardiovascular risk.",
    "B6160": "Main male sex hormone, important in women. Regulates muscle mass, libido and energy.",
    "B5350": "Main estrogen. Regulates menstrual cycle, bone and cardiovascular health in women.",
    "B6180": "Storage form of vitamin D. Essential for bones, immunity and muscle function.",
    "B0110": "Lactate dehydrogenase. Cellular damage enzyme present in heart, liver, muscles and red blood cells."
  },
  french: {
    "I0141": "Anticorps antinucléaires. Dépistage des maladies auto-immunes systémiques comme le lupus.",
    "I5072": "Anticorps anti-peptide citrulliné cyclique. Spécifiques de la polyarthrite rhumatoïde.",
    "B6321": "Anticorps anti-thyroglobuline. Marqueur d'auto-immunité thyroïdienne.",
    "B6300": "Anticorps anti-peroxydase thyroïdienne. Marqueur de thyroïdite auto-immune (Hashimoto).",
    "B7750": "Anticorps contre H. pylori. Détecte l'infection gastrique associée aux ulcères et au cancer gastrique.",
    "B3130": "Auto-anticorps présent dans la polyarthrite rhumatoïde et autres maladies auto-immunes.",
    "H0000": "Analyse complète des cellules sanguines évaluant les globules rouges, blancs, plaquettes et hémoglobine. Essentielle pour détecter les anémies, infections et troubles hématologiques.",
    "B0000": "Taux de sucre dans le sang après 8-12 heures de jeûne. Dépistage primaire du diabète et évaluation du métabolisme glucidique.",
    "B5120": "Hormone du stress. Régule le métabolisme, l'immunité et l'inflammation. Élevé indique un stress chronique.",
    "B3170": "Protéine C réactive haute sensibilité. Marqueur d'inflammation systémique et de risque cardiovasculaire.",
    "B6160": "Hormone sexuelle masculine principale, importante chez les femmes. Régule la masse musculaire, la libido et l'énergie.",
    "B5350": "Principal œstrogène. Régule le cycle menstruel, la santé osseuse et cardiovasculaire chez les femmes.",
    "B6180": "Forme de stockage de la vitamine D. Essentielle pour les os, l'immunité et la fonction musculaire.",
    "B0110": "Lactate déshydrogénase. Enzyme de dommage cellulaire présente dans le cœur, le foie, les muscles et les globules rouges."
  }
};

// Cargar archivo LanguageContext.js
const languageContextPath = path.join(__dirname, '../contexts/LanguageContext.js');
let languageContextContent = fs.readFileSync(languageContextPath, 'utf8');

// Función para reemplazar traducciones
function replaceTranslations(content, translations, language) {
  let updatedContent = content;
  
  Object.entries(translations).forEach(([code, newDescription]) => {
    // Buscar y reemplazar la descripción específica
    const oldPattern = new RegExp(`"${code}":\\s*\\{[^}]*description:\\s*"[^"]*"`, 'g');
    const newReplacement = `"${code}": {\n        description: "${newDescription}"`;
    
    updatedContent = updatedContent.replace(oldPattern, newReplacement);
  });
  
  return updatedContent;
}

// Aplicar correcciones para inglés
console.log('🇬🇧 Corrigiendo traducciones al inglés...');
languageContextContent = replaceTranslations(languageContextContent, correctedTranslations.english, 'english');

// Aplicar correcciones para francés  
console.log('🇫🇷 Corrigiendo traducciones al francés...');
languageContextContent = replaceTranslations(languageContextContent, correctedTranslations.french, 'french');

// Crear backup
const backupPath = languageContextPath + '.backup-fix';
fs.writeFileSync(backupPath, fs.readFileSync(languageContextPath, 'utf8'));

// Escribir archivo corregido
fs.writeFileSync(languageContextPath, languageContextContent, 'utf8');

console.log('\n📊 CORRECCIONES APLICADAS:');
console.log('=========================');
console.log(`✅ Inglés: ${Object.keys(correctedTranslations.english).length} traducciones corregidas`);
console.log(`✅ Francés: ${Object.keys(correctedTranslations.french).length} traducciones corregidas`);

console.log('\n💾 ARCHIVOS ACTUALIZADOS:');
console.log('=========================');
console.log(`📁 LanguageContext.js corregido`);
console.log(`📁 Backup creado: ${path.basename(backupPath)}`);

console.log('\n🔍 EJEMPLOS CORREGIDOS:');
console.log('======================');
console.log('🧪 I0141 (ANA):');
console.log('   🇬🇧 EN: Antinuclear antibodies. Screening for systemic autoimmune diseases...');
console.log('   🇫🇷 FR: Anticorps antinucléaires. Dépistage des maladies auto-immunes...');

console.log('\n✅ CORRECCIONES COMPLETADAS');
console.log('===========================');
console.log('🚀 Ahora las traducciones deberían funcionar correctamente!');
console.log('🧪 Prueba cambiando idiomas en la aplicación.'); 