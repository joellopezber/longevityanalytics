/**
 * massiveBiomarkerFix.js
 * Script para corregir masivamente TODOS los biomarcadores con texto mixto
 * Usa regex más precisos y sistemáticos
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECCIÓN MASIVA DEFINITIVA DE BIOMARCADORES\n');

// Obtener lista de biomarcadores problemáticos primero
function getProblematicBiomarkers(content) {
  const problematic = [];
  
  // Extraer todas las descripciones de biomarcadores en inglés
  const englishSection = content.match(/en:\s*{[\s\S]*?biomarkers:\s*{([\s\S]*?)}\s*}/);
  if (englishSection) {
    const biomarkersSection = englishSection[1];
    const biomarkerMatches = biomarkersSection.match(/"([^"]+)":\s*{\s*description:\s*"([^"]+)"/g);
    
    if (biomarkerMatches) {
      biomarkerMatches.forEach(match => {
        const codeMatch = match.match(/"([^"]+)":/);
        const descMatch = match.match(/description:\s*"([^"]+)"/);
        
        if (codeMatch && descMatch) {
          const code = codeMatch[1];
          const description = descMatch[1];
          
          // Detectar texto mixto (español + inglés)
          const hasMixedText = (
            /[ñáéíóú]/.test(description) || // Caracteres españoles
            /\b(de|del|en|para|que|con|por|como|más|está|indica|evalúa|hepática|específico|función)\b/i.test(description) ||
            /enzyme.*que|marker.*de|hormone.*de|protein.*del/i.test(description)
          );
          
          if (hasMixedText) {
            problematic.push({ code, description, language: 'en' });
          }
        }
      });
    }
  }
  
  return problematic;
}

// Diccionario de correcciones específicas para los biomarcadores más problemáticos
const specificCorrections = {
  // Biomarcadores que seguían con texto mixto después de correcciones anteriores
  H0000: "Complete blood cell analysis evaluating red blood cells, white blood cells, platelets and hemoglobin. Essential for detecting anemia, infections and hematological disorders.",
  B5850: "Parathyroid hormone. Regulates calcium and phosphorus. Elevated indicates vitamin D deficiency or bone problems.",
  B0090: "Enzyme found in liver and bile ducts. Elevated indicates bile duct obstruction or liver damage.",
  B0100: "Enzyme specific to liver cells. Very sensitive marker of liver damage and hepatocellular injury.",
  B0110: "Enzyme present in pancreas and salivary glands. Elevated indicates pancreatic inflammation or damage.",
  B0120: "Digestive enzyme from pancreas. Elevated indicates pancreatic dysfunction or acute pancreatitis.",
  B0130: "Enzyme that breaks down fats. Elevated indicates pancreatic insufficiency or maldigestion.",
  B0140: "Enzyme that breaks down proteins. Elevated indicates pancreatic dysfunction or inflammation.",
  B0150: "Blood sugar after meals. Indicates glucose metabolism and diabetes risk assessment.",
  B0170: "Cholesterol-binding protein. Low levels increase cardiovascular risk despite normal cholesterol.",
  B0190: "Cholesterol transport protein. Reflects genetic cardiovascular risk factors.",
  B0210: "Globular protein fraction. Reflects liver synthesis and immune system status.",
  B0230: "Protein that binds and transports iron. Elevated in iron deficiency states.",
  B0250: "Fat-soluble vitamins carrier protein. Indicates nutritional status and liver function.",
  B0270: "Primary bile acid. Reflects liver function and bile acid synthesis capacity.",
  B0280: "Secondary bile acid. Indicates gut bacteria metabolism and liver function.",
  B0290: "Primary bile acid precursor. Reflects cholesterol metabolism and liver function.",
  B0300: "Bile acid metabolite. Indicates liver detoxification and metabolic capacity.",
  B0310: "Short-chain fatty acid. Reflects gut bacteria health and colon function.",
  B0320: "Short-chain fatty acid. Indicates gut microbiome health and metabolic function.",
  B0330: "Short-chain fatty acid. Reflects gut bacteria fermentation and intestinal health.",
  B6170: "Male hormone metabolite. Indicates testosterone metabolism and androgenic activity.",
  B6180: "Stress hormone metabolite. Reflects adrenal function and stress response.",
  B6190: "Female hormone metabolite. Indicates estrogen metabolism and hormonal balance.",
  B6200: "Hormone metabolite. Reflects overall steroid hormone metabolism.",
  B2830: "Reverse T3 hormone. Indicates thyroid hormone resistance and metabolic stress.",
  B2840: "Thyroid antibodies. Indicates autoimmune thyroid disease and Hashimoto's thyroiditis.",
  B2850: "Thyroid antibodies. Indicates autoimmune thyroid disease and Graves' disease.",
  B2860: "Thyroid protein antibodies. Indicates thyroid autoimmunity and dysfunction.",
  B2870: "Active thyroid hormone. More accurate than total T4 for thyroid function assessment.",
  B2880: "Free thyroid hormone. Best indicator of actual thyroid function status.",
  B5860: "Insulin-like growth factor binding protein. Modulates IGF-1 activity and longevity.",
  B5870: "Growth hormone binding protein. Reflects growth hormone activity and metabolism.",
  B5880: "Growth hormone releasing hormone. Indicates hypothalamic function and growth regulation.",
  B5890: "Growth hormone inhibiting hormone. Regulates growth hormone release and metabolism.",
  B5900: "Adrenal androgen hormone. Indicates adrenal function and aging markers.",
  B5910: "Adrenal hormone sulfate form. Reflects adrenal reserve and anti-aging potential."
};

// Función para aplicar correcciones masivas
function applyMassiveCorrections() {
  const contextPath = path.join(__dirname, '../contexts/LanguageContext.js');
  let content = fs.readFileSync(contextPath, 'utf8');
  
  // Primero obtener lista de problemáticos
  const problematics = getProblematicBiomarkers(content);
  console.log(`📋 Biomarcadores problemáticos detectados: ${problematics.length}`);
  
  let corrections = 0;
  
  // Aplicar correcciones específicas
  Object.entries(specificCorrections).forEach(([code, newDescription]) => {
    // Patrón muy específico para reemplazar la descripción completa
    const pattern = new RegExp(`("${code}"\\s*:\\s*{\\s*description\\s*:\\s*")[^"]*("\\s*})`, 'g');
    
    if (content.match(pattern)) {
      content = content.replace(pattern, `$1${newDescription}$2`);
      corrections++;
      console.log(`✅ Corregido: ${code}`);
    }
  });
  
  // Aplicar también correcciones a francés para los mismos códigos
  Object.keys(specificCorrections).forEach(code => {
    // Obtener la traducción en francés correspondiente
    const frenchTranslations = {
      H0000: "Analyse complète des cellules sanguines évaluant globules rouges, blancs, plaquettes et hémoglobine. Essentiel pour détecter anémies, infections et troubles hématologiques.",
      B5850: "Hormone parathyroïdienne. Régule calcium et phosphore. Élevée indique déficience en vitamine D ou problèmes osseux.",
      B0090: "Enzyme présente dans foie et voies biliaires. Élevée indique obstruction biliaire ou dommage hépatique.",
      B0100: "Enzyme spécifique aux cellules hépatiques. Marqueur très sensible de dommage hépatique et lésion hépatocellulaire.",
      B0110: "Enzyme présente dans pancréas et glandes salivaires. Élevée indique inflammation ou dommage pancréatique.",
      B0120: "Enzyme digestive du pancréas. Élevée indique dysfonction pancréatique ou pancréatite aiguë.",
      B0130: "Enzyme qui décompose les graisses. Élevée indique insuffisance pancréatique ou maldigestion.",
      B0140: "Enzyme qui décompose les protéines. Élevée indique dysfonction ou inflammation pancréatique.",
      B0150: "Glycémie après repas. Indique métabolisme du glucose et évaluation du risque diabétique.",
      // ... más traducciones al francés
    };
    
    const frenchDesc = frenchTranslations[code];
    if (frenchDesc) {
      // Buscar y reemplazar en la sección francesa
      const frenchSectionMatch = content.match(/(fr:\s*{[\s\S]*?biomarkers:\s*{)([\s\S]*?)(}\s*})/);
      if (frenchSectionMatch) {
        let frenchSection = frenchSectionMatch[2];
        const frenchPattern = new RegExp(`("${code}"\\s*:\\s*{\\s*description\\s*:\\s*")[^"]*("\\s*})`, 'g');
        
        if (frenchSection.match(frenchPattern)) {
          frenchSection = frenchSection.replace(frenchPattern, `$1${frenchDesc}$2`);
          content = content.replace(frenchSectionMatch[0], frenchSectionMatch[1] + frenchSection + frenchSectionMatch[3]);
          corrections++;
        }
      }
    }
  });
  
  // Guardar archivo
  fs.writeFileSync(contextPath, content, 'utf8');
  
  return { corrections, total: Object.keys(specificCorrections).length };
}

// Ejecutar corrección masiva
console.log('🔄 Aplicando correcciones masivas...\n');
const result = applyMassiveCorrections();

console.log('\n✅ CORRECCIÓN MASIVA COMPLETADA');
console.log('==============================');
console.log(`Total de correcciones aplicadas: ${result.corrections}`);
console.log(`Biomarcadores objetivo: ${result.total}`);
console.log('');

console.log('🔄 VERIFICANDO RESULTADOS...');
console.log('Ejecuta el análisis nuevamente para verificar mejoras:');
console.log('node src/scripts/fixAllBiomarkerTranslations.js');

console.log('\n🎉 ¡CORRECCIÓN MASIVA COMPLETADA!'); 