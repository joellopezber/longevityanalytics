/**
 * index.js
 * Exports unificados y API pública del módulo biomarkers
 * Punto de entrada único para el sistema de biomarcadores
 */

// ================================
// EXPORTACIONES PRINCIPALES
// ================================

// Re-exportar configuración base
export { ADD_ON_BIOMARKERS_CONFIG } from './codes.js';

// Re-exportar mapeos
export {
  BIOMARKER_CODE_TO_STATE_MAP,
  CONTEXT_SPECIFIC_STATE_MAP,
  CODE_TO_READABLE_NAME_MAP
} from './mappings.js';

// Re-exportar funciones utilitarias principales
export {
  getBiomarkersConfig,
  getDefaultBiomarkerState,
  biomarkerExistsInAddOn,
  getBiomarkerStateVariable,
  getActiveBiomarkers,
  calculateDynamicBiomarkerCount,
  getAllAvailableBiomarkers,
  getInitialStateValue,
  getBiomarkerReadableName
} from './utils.js';

// Re-exportar funciones avanzadas
export {
  getManuallySelectedBiomarkers,
  migrateToNewBiomarkerSystem,
  generateBiomarkersReport,
  getBiomarkersUsageStats,
  validateBiomarkersConfiguration
} from './advanced.js';

// ================================
// INFORMACIÓN DEL SISTEMA
// ================================

export const BIOMARKERS_SYSTEM_INFO = {
  version: '2.0.0',
  architecture: 'modular_biomarkers_system',
  compatible_with: 'BiomarkerSelectionContext.js v2.x',
  modules: ['codes.js', 'mappings.js', 'utils.js', 'advanced.js', 'index.js'],
  philosophy: 'all_biomarkers_selectable_with_default_states',
  features: [
    'Modular Architecture',
    'Centralized Configuration',
    'Context State Mapping',
    'Advanced Analytics',
    'Migration Support',
    'Validation Tools'
  ]
};

// ================================
// FUNCIONES DE CONVENIENCIA
// ================================

/**
 * Función de conveniencia para obtener información completa del sistema
 * @returns {Object} Información completa del sistema de biomarcadores
 */
export const getBiomarkersSystemInfo = () => {
  const { ADD_ON_BIOMARKERS_CONFIG } = require('./codes.js');
  
  const totalAddOns = Object.keys(ADD_ON_BIOMARKERS_CONFIG).length;
  const totalBiomarkers = Object.values(ADD_ON_BIOMARKERS_CONFIG).reduce(
    (total, config) => total + Object.keys(config.biomarkers || {}).length, 0
  );

  return {
    ...BIOMARKERS_SYSTEM_INFO,
    statistics: {
      totalAddOns,
      totalBiomarkers,
      averageBiomarkersPerAddOn: (totalBiomarkers / totalAddOns).toFixed(1)
    }
  };
};

/**
 * Función de validación rápida del sistema
 * @returns {boolean} true si el sistema está correctamente configurado
 */
export const validateSystemIntegrity = () => {
  try {
    const { validateBiomarkersConfiguration } = require('./advanced.js');
    const validation = validateBiomarkersConfiguration();
    return validation.isValid;
  } catch (error) {
    console.error('❌ Error validando integridad del sistema de biomarcadores:', error);
    return false;
  }
};

console.log('✅ Sistema modular de biomarcadores cargado:', getBiomarkersSystemInfo()); 