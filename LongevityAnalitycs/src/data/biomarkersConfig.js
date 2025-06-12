/**
 * biomarkersConfig.js - REFACTORIZADO A ARQUITECTURA MODULAR
 * Sistema simplificado para gestión de biomarcadores seleccionables en add-ons
 * 
 * NUEVA ARQUITECTURA MODULAR (siguiendo patrón /addOns):
 * - /biomarkers/codes.js: Solo códigos y estados por defecto
 * - /biomarkers/mappings.js: Mapeos de códigos a variables de estado
 * - /biomarkers/utils.js: Funciones utilitarias principales
 * - /biomarkers/advanced.js: Análisis avanzados y reportes
 * - /biomarkers/index.js: API pública unificada
 * 
 * COMPATIBILIDAD: Este archivo mantiene las exportaciones originales para no romper imports existentes
 */

// ================================
// IMPORTACIONES DESDE EL NUEVO SISTEMA MODULAR
// ================================

// Importar todo desde el módulo biomarkers
export {
  // Configuración base
  ADD_ON_BIOMARKERS_CONFIG,
  
  // Mapeos
  BIOMARKER_CODE_TO_STATE_MAP,
  CONTEXT_SPECIFIC_STATE_MAP,
  CODE_TO_READABLE_NAME_MAP,
  
  // Funciones utilitarias principales
  getBiomarkersConfig,
  getDefaultBiomarkerState,
  biomarkerExistsInAddOn,
  getBiomarkerStateVariable,
  getActiveBiomarkers,
  calculateDynamicBiomarkerCount,
  getAllAvailableBiomarkers,
  getInitialStateValue,
  getBiomarkerReadableName,
  
  // Funciones avanzadas
  getManuallySelectedBiomarkers,
  migrateToNewBiomarkerSystem,
  generateBiomarkersReport,
  getBiomarkersUsageStats,
  validateBiomarkersConfiguration,
  
  // Información del sistema
  BIOMARKERS_SYSTEM_INFO,
  getBiomarkersSystemInfo,
  validateSystemIntegrity
} from './biomarkers/index.js';

// ================================
// INFORMACIÓN DE MIGRACIÓN
// ================================

export const MIGRATION_INFO = {
  status: 'REFACTORED_TO_MODULAR',
  previousVersion: '1.0.0-monolithic',
  currentVersion: '2.0.0-modular',
  architecture: 'MODULAR (siguiendo patrón /addOns)',
  modules: [
    'biomarkers/codes.js - Códigos y estados',
    'biomarkers/mappings.js - Mapeos de estado', 
    'biomarkers/utils.js - Utilidades principales',
    'biomarkers/advanced.js - Análisis avanzados',
    'biomarkers/index.js - API pública'
  ],
  compatibility: 'FULL_BACKWARD_COMPATIBILITY',
  benefits: [
    'Separación clara de responsabilidades',
    'Código más mantenible y legible',
    'Facilita testing y debugging',
    'Escalabilidad mejorada',
    'Siguiendo patrón ya establecido en /addOns'
  ],
  migration_date: new Date().toISOString(),
  original_file_size: '605 líneas',
  new_modular_structure: '5 archivos especializados'
};

console.log('✅ biomarkersConfig.js migrado a arquitectura modular:', MIGRATION_INFO); 