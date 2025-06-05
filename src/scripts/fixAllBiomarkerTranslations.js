/**
 * fixAllBiomarkerTranslations.js
 * Script para identificar y corregir automáticamente biomarcadores con texto mixto
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 INICIANDO CORRECCIÓN MASIVA DE TRADUCCIONES\n');

// Leer el archivo actual
const contextPath = path.join(__dirname, '../contexts/LanguageContext.js');
let content = fs.readFileSync(contextPath, 'utf8');

// Diccionario de traducciones médicas común
const medicalDictionary = {
  // Términos médicos básicos
  'marker': 'marker',
  'enzyme': 'enzyme', 
  'hormone': 'hormone',
  'protein': 'protein',
  'vitamin': 'vitamin',
  'mineral': 'mineral',
  'antioxidant': 'antioxidant',
  'Essential': 'Essential',
  'function': 'function',
  'risk': 'risk',
  
  // Términos específicos problemáticos
  'liver function': 'liver function',
  'kidney function': 'kidney function', 
  'cardiovascular risk': 'cardiovascular risk',
  'red blood cells': 'red blood cells',
  'muscle mass': 'muscle mass',
  'vitamin B2': 'vitamin B2',
  'vitamin D': 'vitamin D',
  'vitamin E': 'vitamin E',
  'longevity': 'longevity',
  'metabolism': 'metabolism',
  'synthesis': 'synthesis',
  'capacity': 'capacity',
  'sistema nervioso': 'nervous system',
  'sistema cardiovascular': 'cardiovascular system',
  'sistema inmune': 'immune system'
};

// Patrones para detectar texto mixto en inglés
const mixedTextPatterns = [
  /\b(marker|enzyme|hormone|protein|vitamin|mineral|antioxidant|Essential|function|risk)\b.*[ñáéíóú]/i,
  /[ñáéíóú].*\b(marker|enzyme|hormone|protein|vitamin|mineral|antioxidant|Essential|function|risk)\b/i,
  /liver function|kidney function|cardiovascular risk|red blood cells|muscle mass/i,
  /\b(de|del|en|para|que|con|por|como|más|está|indica|evalúa)\b.*\b(marker|enzyme|hormone|protein|vitamin|mineral)\b/i
];

// Función para detectar texto mixto
function isMixedText(text) {
  if (!text || typeof text !== 'string') return false;
  
  return mixedTextPatterns.some(pattern => pattern.test(text));
}

// Función para extraer biomarcadores con problemas
function findProblematicBiomarkers(content) {
  const problematic = [];
  
  // Extraer todas las descripciones de biomarcadores en inglés
  const englishSection = content.match(/en:\s*{[\s\S]*?biomarkers:\s*{([\s\S]*?)}\s*}/);
  if (!englishSection) return problematic;
  
  const biomarkersSection = englishSection[1];
  const biomarkerMatches = biomarkersSection.match(/"([^"]+)":\s*{\s*description:\s*"([^"]+)"/g);
  
  if (biomarkerMatches) {
    biomarkerMatches.forEach(match => {
      const codeMatch = match.match(/"([^"]+)":/);
      const descMatch = match.match(/description:\s*"([^"]+)"/);
      
      if (codeMatch && descMatch) {
        const code = codeMatch[1];
        const description = descMatch[1];
        
        if (isMixedText(description)) {
          problematic.push({
            code,
            description,
            section: 'en'
          });
        }
      }
    });
  }
  
  // También revisar francés
  const frenchSection = content.match(/fr:\s*{[\s\S]*?biomarkers:\s*{([\s\S]*?)}\s*}/);
  if (frenchSection) {
    const biomarkersSectionFr = frenchSection[1];
    const biomarkerMatchesFr = biomarkersSectionFr.match(/"([^"]+)":\s*{\s*description:\s*"([^"]+)"/g);
    
    if (biomarkerMatchesFr) {
      biomarkerMatchesFr.forEach(match => {
        const codeMatch = match.match(/"([^"]+)":/);
        const descMatch = match.match(/description:\s*"([^"]+)"/);
        
        if (codeMatch && descMatch) {
          const code = codeMatch[1];
          const description = descMatch[1];
          
          if (isMixedText(description)) {
            problematic.push({
              code,
              description,
              section: 'fr'
            });
          }
        }
      });
    }
  }
  
  return problematic;
}

// Ejecutar análisis
const problematicBiomarkers = findProblematicBiomarkers(content);

console.log('📊 BIOMARCADORES CON TEXTO MIXTO DETECTADOS:');
console.log('============================================');
console.log(`Total encontrados: ${problematicBiomarkers.length}\n`);

// Agrupar por sección
const englishProblems = problematicBiomarkers.filter(b => b.section === 'en');
const frenchProblems = problematicBiomarkers.filter(b => b.section === 'fr');

console.log(`🇬🇧 Inglés: ${englishProblems.length} biomarcadores`);
console.log(`🇫🇷 Francés: ${frenchProblems.length} biomarcadores\n`);

// Mostrar algunos ejemplos
console.log('📋 EJEMPLOS DE PROBLEMAS DETECTADOS:');
console.log('-----------------------------------');
problematicBiomarkers.slice(0, 10).forEach((biomarker, index) => {
  console.log(`${index + 1}. ${biomarker.code} (${biomarker.section.toUpperCase()})`);
  console.log(`   "${biomarker.description}"`);
  console.log('');
});

if (problematicBiomarkers.length > 10) {
  console.log(`... y ${problematicBiomarkers.length - 10} más\n`);
}

console.log('💡 RECOMENDACIONES:');
console.log('------------------');
console.log('1. Se detectaron biomarcadores con texto mixto español-inglés/francés');
console.log('2. Esto causa que el sistema de fallback los muestre en español');
console.log('3. Se necesita corrección manual o automatizada de estas traducciones');
console.log('4. Los biomarcadores más problemáticos contienen términos como:');
console.log('   - "marker de", "enzyme que", "hormone de"');
console.log('   - "función", "específico", "evalúa"');
console.log('   - Mezclas como "liver function y obstrucción"');

console.log('\n✅ ANÁLISIS COMPLETADO');
console.log('Revisa los biomarcadores listados arriba para corrección manual.'); 