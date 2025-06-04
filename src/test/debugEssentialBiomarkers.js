/**
 * Debug: Listar exactamente qué biomarcadores tiene el Essential
 */

console.log('🔍 DEBUG: BIOMARCADORES DEL ESSENTIAL\n');

const waitForPackages = () => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkPackages = () => {
      attempts++;
      if (window.essentialPackage) {
        resolve(true);
      } else if (attempts >= 10) {
        reject(new Error('Essential package no disponible'));
      } else {
        setTimeout(checkPackages, 500);
      }
    };
    checkPackages();
  });
};

waitForPackages().then(() => {
  console.log('📋 BIOMARCADORES DEL ESSENTIAL (TODOS):');
  console.log('=====================================');

  const allBiomarkers = window.essentialPackage.biomarkers;
  console.log(`Total biomarcadores en Essential: ${allBiomarkers.length}\n`);

  allBiomarkers.forEach((biomarker, index) => {
    console.log(`${index + 1}. ${biomarker.name} (${biomarker.code || 'SIN CÓDIGO'}) - Género: ${biomarker.gender || 'both'}`);
  });

  // Filtrar para hombre
  console.log('\n👨 BIOMARCADORES PARA HOMBRE:');
  console.log('============================');
  
  const maleBiomarkers = allBiomarkers.filter(biomarker => {
    if (!biomarker.gender || biomarker.gender === 'both') return true;
    return biomarker.gender === 'male';
  });

  console.log(`Total para hombre: ${maleBiomarkers.length}\n`);

  maleBiomarkers.forEach((biomarker, index) => {
    const code = biomarker.code || 'SIN_CÓDIGO';
    const prevenii = window.getPriceByCode ? window.getPriceByCode(code, 'prevenii') : 'N/A';
    const market = window.getPriceByCode ? window.getPriceByCode(code, 'market') : 'N/A';
    
    console.log(`${index + 1}. ${biomarker.name} (${code}) - Prevenii: ${prevenii}€, Market: ${market}€`);
  });

  // Filtrar para mujer
  console.log('\n👩 BIOMARCADORES PARA MUJER:');
  console.log('============================');
  
  const femaleBiomarkers = allBiomarkers.filter(biomarker => {
    if (!biomarker.gender || biomarker.gender === 'both') return true;
    return biomarker.gender === 'female';
  });

  console.log(`Total para mujer: ${femaleBiomarkers.length}\n`);

  femaleBiomarkers.forEach((biomarker, index) => {
    const code = biomarker.code || 'SIN_CÓDIGO';
    const prevenii = window.getPriceByCode ? window.getPriceByCode(code, 'prevenii') : 'N/A';
    const market = window.getPriceByCode ? window.getPriceByCode(code, 'market') : 'N/A';
    
    console.log(`${index + 1}. ${biomarker.name} (${code}) - Prevenii: ${prevenii}€, Market: ${market}€`);
  });

}).catch(error => {
  console.log('❌ Error:', error.message);
}); 