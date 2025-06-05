/**
 * testBiomarkerTranslations.js
 * Script para probar traducciones específicas de biomarcadores
 */

import { translations } from '../contexts/LanguageContext.js';

console.log('🧪 PROBANDO TRADUCCIONES DE BIOMARCADORES ESPECÍFICOS\n');

// Biomarcadores de prueba
const testBiomarkers = [
  'GP001', // Farmacogenómica
  'H0050', // Fibrinógeno  
  'B5110', // CEA
  'OG001'  // MyEpiAgeing
];

console.log('📋 BIOMARCADORES DE PRUEBA:');
console.log('==========================');

testBiomarkers.forEach(code => {
  console.log(`\n🔬 Biomarcador: ${code}`);
  console.log('-'.repeat(30));
  
  // Español
  const spanish = translations.es?.biomarkers?.[code]?.description;
  console.log(`🇪🇸 ES: ${spanish || 'NO ENCONTRADO'}`);
  
  // Inglés  
  const english = translations.en?.biomarkers?.[code]?.description;
  console.log(`🇬🇧 EN: ${english || 'NO ENCONTRADO'}`);
  
  // Francés
  const french = translations.fr?.biomarkers?.[code]?.description;
  console.log(`🇫🇷 FR: ${french || 'NO ENCONTRADO'}`);
});

console.log('\n✅ PRUEBA COMPLETADA'); 