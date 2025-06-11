/**
 * analysisPackages.js
 * ARCHIVO LEGACY - USAR analysisProfiles/index.js
 * 
 * ⚠️ DEPRECIADO: Este archivo será eliminado gradualmente
 * ✅ USAR: import { ... } from './analysisProfiles/index.js'
 * 
 * Nueva estructura modular:
 * - analysisProfiles/codes.js    - Solo códigos de biomarcadores
 * - analysisProfiles/packages.js - Factory functions + paquetes
 * - analysisProfiles/index.js    - API pública unificada
 */

// Re-exportar todo desde la nueva estructura modular
export * from './analysisProfiles/index.js';

console.log('⚠️ analysisPackages.js es LEGACY - usar ./analysisProfiles/index.js'); 