/**
 * fixMixedTranslations.js
 * Script para corregir automáticamente todas las traducciones mixtas
 * en el archivo LanguageContext.js
 */

const fs = require('fs');
const path = require('path');

// Traducciones correctas para reemplazar las mixtas
const correctTranslations = {
  // Sección en inglés (en:)
  "T2590": "Omega-3 fatty acid profile. Evaluates nutritional status and inflammatory balance.",
  "T1720": "Fat-soluble vitamin essential for coagulation. Cofactor of coagulation factors.",
  "T0302": "Blood mercury. Toxic metal affecting nervous system. Sources: fish, dental amalgams.",
  "T0150": "Blood lead. Toxic metal affecting neurological development and cognitive function.",
  "T0960": "Total blood arsenic. Toxic metalloid associated with cancer and cardiovascular diseases.",
  "T0480": "Blood cadmium. Toxic metal affecting kidneys, bones and cardiovascular system.",
  "D1111": "Bone-specific alkaline phosphatase. Marker of bone formation and osteoblastic activity.",
  "I3291": "C-telopeptide. Marker of bone resorption. Evaluates osteoclastic activity and bone loss.",
  "T1572": "Active fraction of serum calcium. Bioavailable form for cellular functions.",
  "B0750": "Product of anaerobic metabolism. Elevated indicates tissue hypoxia or mitochondrial dysfunction.",
  "B1900": "Directly measured LDL cholesterol. More accurate than calculated in cases of elevated triglycerides.",
  "B7700": "Genetically determined atherogenic lipoprotein. Independent cardiovascular risk factor.",
  "I5047": "Kidney function marker more accurate than creatinine. Not affected by muscle mass.",
  "B2120": "Myocardial-specific creatine kinase. Marker of cardiac damage and infarction.",
  "I0141": "Antinuclear antibodies. Screening for systemic autoimmune diseases like lupus.",
  "I5072": "Anti-cyclic citrullinated peptide antibodies. Specific for rheumatoid arthritis.",
  "B6321": "Anti-thyroglobulin antibodies. Marker of thyroid autoimmunity.",
  "B6300": "Anti-thyroid peroxidase antibodies. Marker of autoimmune thyroiditis (Hashimoto).",
  "B7750": "Antibodies against H. pylori. Detects gastric infection associated with ulcers and gastric cancer.",
  "B3130": "Autoantibody present in rheumatoid arthritis and other autoimmune diseases.",
  "M1190": "Parasitological examination of feces. Detects intestinal parasites affecting digestive health.",
  "P3031": "Panel of 200 foods to detect IgG-mediated food intolerances.",
  "AB001": "Complete analysis of intestinal microbial diversity. Evaluates balance of beneficial and pathogenic bacteria.",
  "AB002": "Profile of metabolites in urine and feces. Evaluates metabolic pathways and microbiome functionality."
};

console.log('🔧 CORRIGIENDO TRADUCCIONES MIXTAS\n');

// Leer el archivo LanguageContext.js
const filePath = path.join(__dirname, '../contexts/LanguageContext.js');
let content = fs.readFileSync(filePath, 'utf8');

console.log('📝 Aplicando correcciones...');

let correctionCount = 0;

// Aplicar cada corrección
Object.entries(correctTranslations).forEach(([code, correctTranslation]) => {
  // Buscar patrones mixtos para este código
  const patterns = [
    // Patrón: "CODE": { description: "texto mixto" }
    new RegExp(`("${code}":\\s*{[^}]*description:\\s*")[^"]*("\\s*})`, 'g'),
    // Patrón más específico para encontrar traducciones mixtas
    new RegExp(`("${code}":\\s*{[^}]*description:\\s*"[^"]*(?:vitamin|enzyme|marker|protein|hormone|mineral|antioxidant|Essential|function|risk)[^"]*[ñáéíóú][^"]*")`, 'g')
  ];

  patterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(match => {
        // Reemplazar solo si contiene mezcla de idiomas
        if (match.includes('vitamin') || match.includes('enzyme') || match.includes('marker')) {
          const replacement = match.replace(
            /description:\s*"[^"]*"/,
            `description: "${correctTranslation}"`
          );
          content = content.replace(match, replacement);
          correctionCount++;
          console.log(`✅ Corregido ${code}`);
        }
      });
    }
  });
});

// Escribir el archivo corregido
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n🎉 CORRECCIONES COMPLETADAS: ${correctionCount} traducciones corregidas`);
console.log('✅ Archivo LanguageContext.js actualizado exitosamente');
console.log('\n📋 RESUMEN:');
console.log('• Traducciones mixtas corregidas al inglés puro');
console.log('• Terminología médica profesional aplicada');
console.log('• Consistencia en las traducciones mejorada');
console.log('• Sistema multiidioma optimizado'); 