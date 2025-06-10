/**
 * test_analisis.js
 * Ejecuta el análisis de add-ons para cada perfil
 */

import { runCompleteAnalysis, analyzeSpecificAddOn } from './analisis_add_ons.js';

console.log('🚀 INICIANDO ANÁLISIS DE ADD-ONS...\n');

// Ejecutar análisis completo
runCompleteAnalysis();

// Análisis específicos de algunos add-ons clave
console.log('\n\n🔍 ANÁLISIS ESPECÍFICOS:\n');

// Analizar inflamación
analyzeSpecificAddOn('inflammation', 'male');

// Analizar antioxidantes
analyzeSpecificAddOn('antioxidantes', 'male');

// Analizar hormonas
analyzeSpecificAddOn('hormonas', 'male'); 