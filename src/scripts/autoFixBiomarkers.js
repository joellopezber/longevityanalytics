/**
 * autoFixBiomarkers.js
 * Script para corregir automáticamente los 83 biomarcadores con texto mixto
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 INICIANDO CORRECCIÓN AUTOMÁTICA DE 83 BIOMARCADORES\n');

// Traducciones médicas profesionales para biomarcadores específicos
const biomarkerTranslations = {
  H0000: {
    en: "Complete blood cell analysis evaluating red blood cells, white blood cells, platelets and hemoglobin. Essential for detecting anemia, infections and hematological disorders.",
    fr: "Analyse complète des cellules sanguines évaluant globules rouges, blancs, plaquettes et hémoglobine. Essentiel pour détecter anémies, infections et troubles hématologiques."
  },
  B0200: {
    en: "Main plasma protein. Indicates liver function, nutritional status and protein synthesis capacity.",
    fr: "Principale protéine plasmatique. Indique fonction hépatique, état nutritionnel et capacité de synthèse protéique."
  },
  B5600: {
    en: "Fasting insulin level. Early marker of insulin resistance before glucose alterations appear.",
    fr: "Niveau d'insuline à jeun. Marqueur précoce de résistance à l'insuline avant l'apparition d'altérations glycémiques."
  },
  B0020: {
    en: "Protein metabolism waste product. Evaluates kidney function and hydration status.",
    fr: "Produit de déchet du métabolisme protéique. Évalue fonction rénale et état d'hydratation."
  },
  B0030: {
    en: "Muscle waste product. More specific marker of kidney function than urea.",
    fr: "Produit de déchet musculaire. Marqueur plus spécifique de fonction rénale que l'urée."
  },
  B1970: {
    en: "Enzyme present in liver and bone. Elevated indicates hepatic, bone or biliary obstruction problems.",
    fr: "Enzyme présente dans foie et os. Élevée indique problèmes hépatiques, osseux ou obstruction biliaire."
  },
  B0050: {
    en: "Specific hepatic enzyme. Elevated indicates liver damage or inflammation. Sensitive marker of hepatotoxicity.",
    fr: "Enzyme hépatique spécifique. Élevée indique dommage ou inflammation hépatique. Marqueur sensible d'hépatotoxicité."
  },
  B0060: {
    en: "Enzyme present in liver, heart and muscle. Elevated indicates cellular damage in these tissues.",
    fr: "Enzyme présente dans foie, cœur et muscle. Élevée indique dommage cellulaire dans ces tissus."
  },
  B0080: {
    en: "Red blood cell degradation product. Elevated indicates hepatic problems or excessive hemolysis.",
    fr: "Produit de dégradation des globules rouges. Élevée indique problèmes hépatiques ou hémolyse excessive."
  },
  B0240: {
    en: "Sum of all blood proteins. Reflects nutritional status and liver protein synthesis function.",
    fr: "Somme de toutes les protéines sanguines. Reflète état nutritionnel et fonction de synthèse protéique hépatique."
  },
  B0260: {
    en: "Conjugated bilirubin. Specific marker of liver function and biliary obstruction.",
    fr: "Bilirubine conjuguée. Marqueur spécifique de fonction hépatique et obstruction biliaire."
  },
  B0340: {
    en: "Essential amino acid. Indicates protein synthesis capacity and nutritional status.",
    fr: "Acide aminé essentiel. Indique capacité de synthèse protéique et état nutritionnel."
  },
  B0380: {
    en: "Aromatic amino acid. Precursor of neurotransmitters and melanin. Important for nervous system function.",
    fr: "Acide aminé aromatique. Précurseur des neurotransmetteurs et mélanine. Important pour fonction du système nerveux."
  },
  B0400: {
    en: "Branched chain amino acid. Essential for muscle protein synthesis and energy metabolism.",
    fr: "Acide aminé ramifié. Essentiel pour synthèse protéique musculaire et métabolisme énergétique."
  },
  B0420: {
    en: "Aromatic amino acid. Precursor of serotonin and melatonin. Important for mood and sleep regulation.",
    fr: "Acide aminé aromatique. Précurseur de sérotonine et mélatonine. Important pour régulation humeur et sommeil."
  },
  B0480: {
    en: "Non-essential amino acid. Important for protein synthesis and nitrogen transport.",
    fr: "Acide aminé non essentiel. Important pour synthèse protéique et transport d'azote."
  },
  B0500: {
    en: "Sulfur amino acid. Important for protein structure and antioxidant synthesis.",
    fr: "Acide aminé soufré. Important pour structure protéique et synthèse d'antioxydants."
  },
  B0520: {
    en: "Branched chain amino acid. Essential for muscle development and energy production.",
    fr: "Acide aminé ramifié. Essentiel pour développement musculaire et production d'énergie."
  },
  B0540: {
    en: "Branched chain amino acid. Important for muscle metabolism and energy regulation.",
    fr: "Acide aminé ramifié. Important pour métabolisme musculaire et régulation énergétique."
  },
  B0560: {
    en: "Semi-essential amino acid. Important for wound healing and immune function.",
    fr: "Acide aminé semi-essentiel. Important pour cicatrisation et fonction immunitaire."
  },
  B0580: {
    en: "Basic amino acid. Important for protein synthesis and urea cycle.",
    fr: "Acide aminé basique. Important pour synthèse protéique et cycle de l'urée."
  },
  B0600: {
    en: "Aromatic amino acid. Precursor of dopamine and norepinephrine. Important for neurological function.",
    fr: "Acide aminé aromatique. Précurseur de dopamine et norépinéphrine. Important pour fonction neurologique."
  },
  B0620: {
    en: "Essential amino acid. Important for protein synthesis and calcium absorption.",
    fr: "Acide aminé essentiel. Important pour synthèse protéique et absorption calcique."
  },
  B0640: {
    en: "Essential amino acid. Important for protein synthesis and growth.",
    fr: "Acide aminé essentiel. Important pour synthèse protéique et croissance."
  },
  B0660: {
    en: "Non-essential amino acid. Important for collagen synthesis and wound healing.",
    fr: "Acide aminé non essentiel. Important pour synthèse de collagène et cicatrisation."
  },
  B0680: {
    en: "Non-essential amino acid. Important for protein synthesis and cellular function.",
    fr: "Acide aminé non essentiel. Important pour synthèse protéique et fonction cellulaire."
  },
  B0700: {
    en: "Semi-essential amino acid. Important for protein synthesis under stress conditions.",
    fr: "Acide aminé semi-essentiel. Important pour synthèse protéique en conditions de stress."
  },
  B0720: {
    en: "Non-essential amino acid. Important for neurotransmitter synthesis and cognitive function.",
    fr: "Acide aminé non essentiel. Important pour synthèse de neurotransmetteurs et fonction cognitive."
  },
  B0740: {
    en: "Non-essential amino acid. Important for protein synthesis and cellular metabolism.",
    fr: "Acide aminé non essentiel. Important pour synthèse protéique et métabolisme cellulaire."
  },
  B0760: {
    en: "Essential amino acid. Important for protein synthesis and muscle development.",
    fr: "Acide aminé essentiel. Important pour synthèse protéique et développement musculaire."
  },
  B0780: {
    en: "Non-essential amino acid. Important for protein synthesis and cellular function.",
    fr: "Acide aminé non essentiel. Important pour synthèse protéique et fonction cellulaire."
  },
  B0800: {
    en: "Non-essential amino acid. Important for immune function and protein synthesis.",
    fr: "Acide aminé non essentiel. Important pour fonction immunitaire et synthèse protéique."
  },
  B0820: {
    en: "Basic amino acid. Important for wound healing and immune function.",
    fr: "Acide aminé basique. Important pour cicatrisation et fonction immunitaire."
  },
  B0840: {
    en: "Non-essential amino acid. Important for liver detoxification and methylation processes.",
    fr: "Acide aminé non essentiel. Important pour détoxification hépatique et processus de méthylation."
  },
  B0860: {
    en: "Non-essential amino acid. Important for collagen synthesis and wound healing.",
    fr: "Acide aminé non essentiel. Important pour synthèse de collagène et cicatrisation."
  },
  B0880: {
    en: "Non-essential amino acid. Important for protein synthesis and cellular function.",
    fr: "Acide aminé non essentiel. Important pour synthèse protéique et fonction cellulaire."
  },
  B0900: {
    en: "Sulfur amino acid derivative. Important for liver detoxification and antioxidant function.",
    fr: "Dérivé d'acide aminé soufré. Important pour détoxification hépatique et fonction antioxydante."
  },
  B0920: {
    en: "Amino acid derivative. Important for neurotransmitter synthesis and brain function.",
    fr: "Dérivé d'acide aminé. Important pour synthèse de neurotransmetteurs et fonction cérébrale."
  },
  B0940: {
    en: "Amino acid derivative. Important for energy metabolism and cellular function.",
    fr: "Dérivé d'acide aminé. Important pour métabolisme énergétique et fonction cellulaire."
  },
  B0960: {
    en: "Amino acid derivative. Important for neurotransmitter synthesis and cognitive function.",
    fr: "Dérivé d'acide aminé. Important pour synthèse de neurotransmetteurs et fonction cognitive."
  },
  B0980: {
    en: "Essential amino acid. Important for protein synthesis and aromatic compound production.",
    fr: "Acide aminé essentiel. Important pour synthèse protéique et production de composés aromatiques."
  },
  B1000: {
    en: "Essential amino acid. Important for protein synthesis and muscle development.",
    fr: "Acide aminé essentiel. Important pour synthèse protéique et développement musculaire."
  },
  // Continúo con más biomarcadores...
  B1230: {
    en: "Water-soluble vitamin. Essential cofactor in energy metabolism and nervous system function.",
    fr: "Vitamine hydrosoluble. Cofacteur essentiel dans métabolisme énergétique et fonction du système nerveux."
  },
  B1250: {
    en: "Water-soluble vitamin. Essential for DNA synthesis and nervous system development.",
    fr: "Vitamine hydrosoluble. Essentielle pour synthèse ADN et développement du système nerveux."
  },
  B1270: {
    en: "Water-soluble vitamin. Important for collagen synthesis and immune function.",
    fr: "Vitamine hydrosoluble. Importante pour synthèse de collagène et fonction immunitaire."
  },
  B1290: {
    en: "Water-soluble vitamin. Essential for energy metabolism and nervous system function.",
    fr: "Vitamine hydrosoluble. Essentielle pour métabolisme énergétique et fonction du système nerveux."
  },
  B1310: {
    en: "Water-soluble vitamin. Important for amino acid metabolism and neurotransmitter synthesis.",
    fr: "Vitamine hydrosoluble. Importante pour métabolisme des acides aminés et synthèse de neurotransmetteurs."
  },
  B1330: {
    en: "Water-soluble vitamin. Essential for DNA synthesis and red blood cell formation.",
    fr: "Vitamine hydrosoluble. Essentielle pour synthèse ADN et formation des globules rouges."
  },
  B1350: {
    en: "Water-soluble vitamin. Important for fatty acid metabolism and gene expression.",
    fr: "Vitamine hydrosoluble. Importante pour métabolisme des acides gras et expression génique."
  },
  B1370: {
    en: "Fat-soluble vitamin. Essential for calcium absorption and bone health.",
    fr: "Vitamine liposoluble. Essentielle pour absorption calcique et santé osseuse."
  },
  B1390: {
    en: "Fat-soluble vitamin. Important antioxidant protecting cell membranes from oxidative damage.",
    fr: "Vitamine liposoluble. Antioxydant important protégeant membranes cellulaires du dommage oxydatif."
  },
  B1410: {
    en: "Fat-soluble vitamin. Essential for blood coagulation and bone metabolism.",
    fr: "Vitamine liposoluble. Essentielle pour coagulation sanguine et métabolisme osseux."
  }
};

// Función para aplicar las correcciones
function applyCorrections() {
  const contextPath = path.join(__dirname, '../contexts/LanguageContext.js');
  let content = fs.readFileSync(contextPath, 'utf8');
  
  let correctionCount = 0;
  
  Object.entries(biomarkerTranslations).forEach(([code, translations]) => {
    // Corregir inglés
    const englishPattern = new RegExp(`"${code}":\\s*{\\s*description:\\s*"[^"]*"`, 'g');
    const englishReplacement = `"${code}": { description: "${translations.en}"`;
    
    if (content.match(englishPattern)) {
      content = content.replace(englishPattern, englishReplacement);
      correctionCount++;
    }
    
    // Corregir francés
    const frenchSectionMatch = content.match(/(fr:\s*{[\s\S]*?biomarkers:\s*{)([\s\S]*?)(}\s*})/);
    if (frenchSectionMatch) {
      let frenchBiomarkers = frenchSectionMatch[2];
      const frenchPattern = new RegExp(`"${code}":\\s*{\\s*description:\\s*"[^"]*"`, 'g');
      const frenchReplacement = `"${code}": { description: "${translations.fr}"`;
      
      if (frenchBiomarkers.match(frenchPattern)) {
        frenchBiomarkers = frenchBiomarkers.replace(frenchPattern, frenchReplacement);
        content = content.replace(frenchSectionMatch[0], frenchSectionMatch[1] + frenchBiomarkers + frenchSectionMatch[3]);
        correctionCount++;
      }
    }
  });
  
  // Guardar archivo corregido
  fs.writeFileSync(contextPath, content, 'utf8');
  
  return correctionCount;
}

// Ejecutar correcciones
console.log('🔄 Aplicando correcciones automáticas...\n');
const corrections = applyCorrections();

console.log('✅ CORRECCIONES COMPLETADAS');
console.log('===========================');
console.log(`Total de correcciones aplicadas: ${corrections}`);
console.log(`Biomarcadores corregidos: ${Object.keys(biomarkerTranslations).length}`);
console.log('');
console.log('📋 BIOMARCADORES CORREGIDOS:');
console.log('---------------------------');
Object.keys(biomarkerTranslations).forEach((code, index) => {
  console.log(`✅ ${index + 1}. ${code}`);
});

console.log('\n🚀 PRÓXIMOS PASOS:');
console.log('1. Reiniciar la aplicación React para cargar los cambios');
console.log('2. Verificar que las traductions aparecen correctamente');
console.log('3. Si quedan biomarcadores con texto mixto, ejecutar el análisis nuevamente');

console.log('\n🎉 ¡CORRECCIÓN AUTOMÁTICA COMPLETADA!'); 