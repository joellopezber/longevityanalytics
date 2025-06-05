/**
 * autoFixBiomarkers2.js
 * Segunda parte: Corrección de los biomarcadores restantes con texto mixto
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 PARTE 2: CORRECCIÓN DE BIOMARCADORES RESTANTES\n');

// Traducciones médicas profesionales para los biomarcadores restantes
const biomarkerTranslations2 = {
  B0070: {
    en: "Hepatic enzyme sensitive to alcohol and medications. Marker of cholestasis and chronic liver damage.",
    fr: "Enzyme hépatique sensible à l'alcool et médicaments. Marqueur de cholestase et dommage hépatique chronique."
  },
  B0010: {
    en: "Sum of all cholesterol fractions. Basic marker of cardiovascular risk.",
    fr: "Somme de toutes les fractions de cholestérol. Marqueur de base du risque cardiovasculaire."
  },
  B0040: {
    en: "Blood fats. Elevated indicates cardiovascular risk and insulin resistance.",
    fr: "Graisses sanguines. Élevées indiquent risque cardiovasculaire et résistance à l'insuline."
  },
  B0180: {
    en: "Bad cholesterol. Transports cholesterol to tissues. Elevated increases cardiovascular risk.",
    fr: "Mauvais cholestérol. Transporte cholestérol vers tissus. Élevé augmente risque cardiovasculaire."
  },
  B3110: {
    en: "Protein of atherogenic particles (LDL, VLDL). Better predictor of cardiovascular risk than LDL-cholesterol.",
    fr: "Protéine des particules athérogènes (LDL, VLDL). Meilleur prédicteur du risque cardiovasculaire que LDL-cholestérol."
  },
  B6160: {
    en: "Main male sex hormone, important in women. Regulates muscle mass, libido and energy.",
    fr: "Principale hormone sexuelle masculine, importante chez les femmes. Régule masse musculaire, libido et énergie."
  },
  B2800: {
    en: "Thyroid stimulating hormone. Controls thyroid function and metabolism regulation.",
    fr: "Hormone stimulant la thyroïde. Contrôle fonction thyroïdienne et régulation métabolique."
  },
  B2810: {
    en: "Active thyroid hormone. Regulates metabolism, heart rate and body temperature.",
    fr: "Hormone thyroïdienne active. Régule métabolisme, rythme cardiaque et température corporelle."
  },
  B2820: {
    en: "Total thyroid hormone. Indicates thyroid function and metabolic activity.",
    fr: "Hormone thyroïdienne totale. Indique fonction thyroïdienne et activité métabolique."
  },
  B0160: {
    en: "Good cholesterol. Transports cholesterol from tissues to liver. High levels are protective.",
    fr: "Bon cholestérol. Transporte cholestérol des tissus vers foie. Niveaux élevés sont protecteurs."
  },
  B0220: {
    en: "Iron transport protein. Reflects iron stores and liver synthesis capacity.",
    fr: "Protéine de transport du fer. Reflète réserves de fer et capacité de synthèse hépatique."
  },
  B6140: {
    en: "Male sex hormone bound to proteins. More stable indicator than total testosterone.",
    fr: "Hormone sexuelle masculine liée aux protéines. Indicateur plus stable que testostérone totale."
  },
  B6150: {
    en: "Unbound active testosterone. Biological activity and androgenic effects.",
    fr: "Testostérone libre non liée. Activité biologique et effets androgéniques."
  },
  B5350: {
    en: "Main female sex hormone. Regulates menstrual cycle, bone health and cardiovascular protection.",
    fr: "Principale hormone sexuelle féminine. Régule cycle menstruel, santé osseuse et protection cardiovasculaire."
  },
  B5380: {
    en: "Luteinizing hormone. Controls ovarian and testicular function.",
    fr: "Hormone lutéinisante. Contrôle fonction ovarienne et testiculaire."
  },
  B5390: {
    en: "Follicle stimulating hormone. Regulates gamete production and sexual development.",
    fr: "Hormone folliculo-stimulante. Régule production de gamètes et développement sexuel."
  },
  B6050: {
    en: "Stress hormone. Indicates adrenal function and stress response.",
    fr: "Hormone du stress. Indique fonction surrénale et réponse au stress."
  },
  B5400: {
    en: "Prolactin hormone. Regulates lactation and reproductive function.",
    fr: "Hormone prolactine. Régule lactation et fonction reproductive."
  },
  B5410: {
    en: "Growth hormone. Essential for growth, muscle mass and metabolism.",
    fr: "Hormone de croissance. Essentielle pour croissance, masse musculaire et métabolisme."
  },
  B1430: {
    en: "Essential mineral. Important for oxygen transport and energy metabolism.",
    fr: "Minéral essentiel. Important pour transport d'oxygène et métabolisme énergétique."
  },
  B1450: {
    en: "Essential mineral. Important for bone health, muscle function and nerve transmission.",
    fr: "Minéral essentiel. Important pour santé osseuse, fonction musculaire et transmission nerveuse."
  },
  B1470: {
    en: "Essential mineral. Important for bone and teeth formation, energy metabolism.",
    fr: "Minéral essentiel. Important pour formation osseuse et dentaire, métabolisme énergétique."
  },
  B1490: {
    en: "Essential mineral. Important for cardiovascular health and bone formation.",
    fr: "Minéral essentiel. Important pour santé cardiovasculaire et formation osseuse."
  },
  B1510: {
    en: "Essential trace mineral. Important for immune function and wound healing.",
    fr: "Oligo-élément essentiel. Important pour fonction immunitaire et cicatrisation."
  },
  B1530: {
    en: "Essential trace mineral. Important for iron metabolism and connective tissue formation.",
    fr: "Oligo-élément essentiel. Important pour métabolisme du fer et formation du tissu conjonctif."
  },
  B1550: {
    en: "Essential trace mineral. Important for thyroid function and antioxidant protection.",
    fr: "Oligo-élément essentiel. Important pour fonction thyroïdienne et protection antioxydante."
  },
  B1570: {
    en: "Essential trace mineral. Important for glucose metabolism and cholesterol regulation.",
    fr: "Oligo-élément essentiel. Important pour métabolisme du glucose et régulation du cholestérol."
  },
  B1590: {
    en: "Essential trace mineral. Important for enzyme function and uric acid metabolism.",
    fr: "Oligo-élément essentiel. Important pour fonction enzymatique et métabolisme de l'acide urique."
  },
  B1610: {
    en: "Potentially toxic heavy metal. Exposure assessment and neurological risk evaluation.",
    fr: "Métal lourd potentiellement toxique. Évaluation d'exposition et risque neurologique."
  },
  B1630: {
    en: "Toxic heavy metal. Exposure assessment and cardiovascular risk evaluation.",
    fr: "Métal lourd toxique. Évaluation d'exposition et risque cardiovasculaire."
  },
  B1650: {
    en: "Toxic heavy metal. Exposure assessment and nephrotoxicity risk evaluation.",
    fr: "Métal lourd toxique. Évaluation d'exposition et risque de néphrotoxicité."
  },
  B1670: {
    en: "Potentially toxic heavy metal. Exposure assessment and neurological risk evaluation.",
    fr: "Métal lourd potentiellement toxique. Évaluation d'exposition et risque neurologique."
  },
  B1690: {
    en: "Toxic heavy metal. Exposure assessment and multiple organ toxicity evaluation.",
    fr: "Métal lourd toxique. Évaluation d'exposition et toxicité multi-organes."
  },
  B6000: {
    en: "Adrenal steroid hormone. Indicates stress response and adrenal function.",
    fr: "Hormone stéroïde surrénale. Indique réponse au stress et fonction surrénale."
  },
  B5550: {
    en: "Insulin-like growth factor. Reflects growth hormone activity and longevity marker.",
    fr: "Facteur de croissance similaire à l'insuline. Reflète activité hormone de croissance et marqueur de longévité."
  },
  B8000: {
    en: "Inflammatory marker. Indicates systemic inflammation and cardiovascular risk.",
    fr: "Marqueur inflammatoire. Indique inflammation systémique et risque cardiovasculaire."
  },
  B8020: {
    en: "General inflammatory marker. Indicates acute inflammation and tissue damage.",
    fr: "Marqueur inflammatoire général. Indique inflammation aiguë et dommage tissulaire."
  },
  B8040: {
    en: "Inflammatory cytokine. Indicates chronic inflammation and metabolic dysfunction.",
    fr: "Cytokine inflammatoire. Indique inflammation chronique et dysfonction métabolique."
  },
  B8060: {
    en: "Anti-inflammatory marker. Indicates inflammatory resolution capacity.",
    fr: "Marqueur anti-inflammatoire. Indique capacité de résolution inflammatoire."
  },
  B8080: {
    en: "Inflammatory marker. Indicates vascular inflammation and atherosclerosis risk.",
    fr: "Marqueur inflammatoire. Indique inflammation vasculaire et risque d'athérosclérose."
  }
};

// Función para aplicar las correcciones
function applyCorrections2() {
  const contextPath = path.join(__dirname, '../contexts/LanguageContext.js');
  let content = fs.readFileSync(contextPath, 'utf8');
  
  let correctionCount = 0;
  
  Object.entries(biomarkerTranslations2).forEach(([code, translations]) => {
    // Patrón más específico para capturar la descripción completa
    const englishPattern = new RegExp(`("${code}":\\s*{\\s*description:\\s*")[^"]*("\\s*})`, 'g');
    const englishReplacement = `$1${translations.en}$2`;
    
    if (content.match(englishPattern)) {
      content = content.replace(englishPattern, englishReplacement);
      correctionCount++;
    }
    
    // Corregir francés con patrón similar
    const frenchSectionRegex = /(fr:\s*{[\s\S]*?biomarkers:\s*{)([\s\S]*?)(}\s*}[\s\S]*?})/;
    const frenchMatch = content.match(frenchSectionRegex);
    
    if (frenchMatch) {
      let frenchBiomarkers = frenchMatch[2];
      const frenchPattern = new RegExp(`("${code}":\\s*{\\s*description:\\s*")[^"]*("\\s*})`, 'g');
      const frenchReplacement = `$1${translations.fr}$2`;
      
      if (frenchBiomarkers.match(frenchPattern)) {
        frenchBiomarkers = frenchBiomarkers.replace(frenchPattern, frenchReplacement);
        content = content.replace(frenchMatch[0], frenchMatch[1] + frenchBiomarkers + frenchMatch[3]);
        correctionCount++;
      }
    }
  });
  
  // Guardar archivo corregido
  fs.writeFileSync(contextPath, content, 'utf8');
  
  return correctionCount;
}

// Ejecutar correcciones
console.log('🔄 Aplicando correcciones automáticas parte 2...\n');
const corrections = applyCorrections2();

console.log('✅ CORRECCIONES PARTE 2 COMPLETADAS');
console.log('===================================');
console.log(`Total de correcciones aplicadas: ${corrections}`);
console.log(`Biomarcadores corregidos: ${Object.keys(biomarkerTranslations2).length}`);
console.log('');
console.log('📋 BIOMARCADORES CORREGIDOS EN PARTE 2:');
console.log('--------------------------------------');
Object.keys(biomarkerTranslations2).forEach((code, index) => {
  console.log(`✅ ${index + 1}. ${code}`);
});

console.log('\n🔄 VERIFICANDO PROGRESO...');
console.log('Ejecuta: node src/scripts/fixAllBiomarkerTranslations.js');
console.log('Para ver cuántos biomarcadores quedan pendientes.');

console.log('\n🎉 ¡CORRECCIÓN AUTOMÁTICA PARTE 2 COMPLETADA!'); 