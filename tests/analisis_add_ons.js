/**
 * analisis_add_ons.js
 * Análisis sistemático de qué add-ons aportan valor real a cada paquete
 * Evalúa biomarcadores únicos después del filtrado contextual
 */

import { 
  essentialPackage, 
  performancePackage, 
  corePackage, 
  advancedPackage,
  getProfileCodes 
} from './data/analysisPackages.js';
import { getAddOnPackagesForProfile } from './data/addOnPackages.js';

/**
 * Analiza todos los add-ons para un perfil específico
 * @param {object} profile - El perfil a analizar
 * @param {string} gender - Género ('male', 'female')
 * @returns {object} Análisis detallado
 */
export const analyzeAddOnsForProfile = (profile, gender = 'male') => {
  const baseCodes = getProfileCodes(profile, gender);
  const filteredAddOns = getAddOnPackagesForProfile(gender, baseCodes);
  
  const analysis = {
    profileName: profile.id,
    profileBiomarkers: baseCodes.length,
    addOnsAnalysis: {},
    recommendations: {
      highValue: [],      // Add-ons con muchos biomarcadores únicos
      mediumValue: [],    // Add-ons con algunos biomarcadores únicos
      lowValue: [],       // Add-ons con pocos biomarcadores únicos
      noValue: []         // Add-ons sin biomarcadores únicos
    }
  };

  // Analizar cada add-on
  Object.entries(filteredAddOns).forEach(([addOnId, addOn]) => {
    const uniqueBiomarkers = addOn.testCount;
    const originalBiomarkers = addOn.originalCodes ? addOn.originalCodes.length : addOn.testCount;
    const filteredOut = originalBiomarkers - uniqueBiomarkers;
    const valueRatio = uniqueBiomarkers / originalBiomarkers;
    
    analysis.addOnsAnalysis[addOnId] = {
      uniqueBiomarkers,
      originalBiomarkers,
      filteredOut,
      valueRatio: Math.round(valueRatio * 100),
      isFiltered: addOn.isFiltered || false,
      biomarkers: addOn.biomarkers?.map(b => ({ code: b.code, name: b.name })) || []
    };

    // Categorizar por valor
    if (uniqueBiomarkers === 0) {
      analysis.recommendations.noValue.push(addOnId);
    } else if (uniqueBiomarkers >= 8) {
      analysis.recommendations.highValue.push(addOnId);
    } else if (uniqueBiomarkers >= 4) {
      analysis.recommendations.mediumValue.push(addOnId);
    } else {
      analysis.recommendations.lowValue.push(addOnId);
    }
  });

  return analysis;
};

/**
 * Compara add-ons entre todos los perfiles
 * @param {string} gender - Género para el análisis
 * @returns {object} Comparación completa
 */
export const compareAddOnsAcrossProfiles = (gender = 'male') => {
  const profiles = [
    { profile: essentialPackage, name: 'Essential' },
    { profile: performancePackage, name: 'Performance' },
    { profile: corePackage, name: 'Core' },
    { profile: advancedPackage, name: 'Advanced' }
  ];

  const comparison = {};

  profiles.forEach(({ profile, name }) => {
    comparison[name] = analyzeAddOnsForProfile(profile, gender);
  });

  return comparison;
};

/**
 * Genera recomendaciones específicas para cada perfil
 * @param {string} gender - Género para el análisis
 * @returns {object} Recomendaciones por perfil
 */
export const generateProfileRecommendations = (gender = 'male') => {
  const comparison = compareAddOnsAcrossProfiles(gender);
  
  const recommendations = {
    Essential: {
      recommended: [],
      reasoning: {}
    },
    Performance: {
      recommended: [],
      reasoning: {}
    },
    Core: {
      recommended: [],
      reasoning: {}
    },
    Advanced: {
      recommended: [],
      reasoning: {}
    }
  };

  // Análisis por perfil
  Object.entries(comparison).forEach(([profileName, analysis]) => {
    const profile = recommendations[profileName];
    
    // Recomendar add-ons de alto y medio valor
    profile.recommended = [
      ...analysis.recommendations.highValue,
      ...analysis.recommendations.mediumValue
    ];

    // Generar razones
    analysis.recommendations.highValue.forEach(addOnId => {
      const addOnData = analysis.addOnsAnalysis[addOnId];
      profile.reasoning[addOnId] = `Alto valor: ${addOnData.uniqueBiomarkers} biomarcadores únicos (${addOnData.valueRatio}% del add-on original)`;
    });

    analysis.recommendations.mediumValue.forEach(addOnId => {
      const addOnData = analysis.addOnsAnalysis[addOnId];
      profile.reasoning[addOnId] = `Valor medio: ${addOnData.uniqueBiomarkers} biomarcadores únicos (${addOnData.valueRatio}% del add-on original)`;
    });

    analysis.recommendations.lowValue.forEach(addOnId => {
      const addOnData = analysis.addOnsAnalysis[addOnId];
      profile.reasoning[addOnId] = `Valor bajo: Solo ${addOnData.uniqueBiomarkers} biomarcadores únicos (${addOnData.valueRatio}% del add-on original)`;
    });

    analysis.recommendations.noValue.forEach(addOnId => {
      profile.reasoning[addOnId] = `Sin valor: Todos los biomarcadores ya están incluidos en ${profileName}`;
    });
  });

  return recommendations;
};

/**
 * Ejecuta análisis completo y muestra resultados en consola
 */
export const runCompleteAnalysis = () => {
  console.log('🔬 ANÁLISIS COMPLETO DE ADD-ONS POR PERFIL');
  console.log('=' .repeat(60));

  const recommendations = generateProfileRecommendations('male');
  
  Object.entries(recommendations).forEach(([profileName, data]) => {
    console.log(`\n📊 ${profileName.toUpperCase()}`);
    console.log('-' .repeat(40));
    
    console.log('✅ RECOMENDADOS (' + data.recommended.length + '):');
    data.recommended.forEach(addOnId => {
      console.log(`  • ${addOnId}: ${data.reasoning[addOnId]}`);
    });

    // Mostrar también los de bajo valor y sin valor para contexto
    const comparison = compareAddOnsAcrossProfiles('male');
    const analysis = comparison[profileName];
    
    if (analysis.recommendations.lowValue.length > 0) {
      console.log('⚠️  VALOR BAJO (' + analysis.recommendations.lowValue.length + '):');
      analysis.recommendations.lowValue.forEach(addOnId => {
        console.log(`  • ${addOnId}: ${data.reasoning[addOnId]}`);
      });
    }

    if (analysis.recommendations.noValue.length > 0) {
      console.log('❌ SIN VALOR (' + analysis.recommendations.noValue.length + '):');
      analysis.recommendations.noValue.forEach(addOnId => {
        console.log(`  • ${addOnId}: ${data.reasoning[addOnId]}`);
      });
    }
  });

  return recommendations;
};

/**
 * Análisis específico de un add-on en todos los perfiles
 * @param {string} addOnId - ID del add-on a analizar
 * @param {string} gender - Género para el análisis
 */
export const analyzeSpecificAddOn = (addOnId, gender = 'male') => {
  console.log(`🔍 ANÁLISIS ESPECÍFICO: ${addOnId.toUpperCase()}`);
  console.log('=' .repeat(50));

  const profiles = [
    { profile: essentialPackage, name: 'Essential' },
    { profile: performancePackage, name: 'Performance' },
    { profile: corePackage, name: 'Core' },
    { profile: advancedPackage, name: 'Advanced' }
  ];

  profiles.forEach(({ profile, name }) => {
    const baseCodes = getProfileCodes(profile, gender);
    const filteredAddOns = getAddOnPackagesForProfile(gender, baseCodes);
    const addOn = filteredAddOns[addOnId];

    console.log(`\n📋 ${name}:`);
    if (addOn && addOn.testCount > 0) {
      console.log(`  ✅ Biomarcadores únicos: ${addOn.testCount}`);
      console.log(`  📊 Valor: ${Math.round((addOn.testCount / (addOn.originalCodes?.length || addOn.testCount)) * 100)}%`);
      if (addOn.biomarkers && addOn.biomarkers.length > 0) {
        console.log(`  🧬 Biomarcadores:`);
        addOn.biomarkers.forEach(b => {
          console.log(`    • ${b.code} - ${b.name}`);
        });
      }
    } else {
      console.log(`  ❌ Sin biomarcadores únicos - ya incluidos en ${name}`);
    }
  });
};

// Ejecutar análisis si se importa directamente
if (typeof window === 'undefined') {
  // Solo en Node.js para testing
  runCompleteAnalysis();
} 