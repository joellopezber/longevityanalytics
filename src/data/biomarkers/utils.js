/**
 * utils.js
 * Funciones utilitarias principales para biomarcadores
 * BLOQUE 3: Lógica de negocio y utilidades
 */

import { ADD_ON_BIOMARKERS_CONFIG } from './codes.js';
import { 
  BIOMARKER_CODE_TO_STATE_MAP, 
  CONTEXT_SPECIFIC_STATE_MAP,
  CODE_TO_READABLE_NAME_MAP 
} from './mappings.js';

// ================================
// FUNCIONES UTILITARIAS PRINCIPALES
// ================================

/**
 * Obtiene la configuración de biomarcadores para un add-on específico
 * @param {string} addOnId - ID del add-on
 * @returns {Object} Objeto con configuración de biomarcadores
 */
export const getBiomarkersConfig = (addOnId) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) {
    console.warn(`⚠️ No se encontró configuración de biomarcadores para ${addOnId}`);
    return { biomarkers: {} };
  }
  return config;
};

/**
 * Obtiene el estado por defecto de un biomarcador
 * @param {string} addOnId - ID del add-on
 * @param {string} biomarkerCode - Código del biomarcador
 * @returns {boolean} Estado por defecto (true/false)
 */
export const getDefaultBiomarkerState = (addOnId, biomarkerCode) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config || !config.biomarkers) {
    return false; // Por defecto no seleccionado si no hay configuración
  }
  return config.biomarkers[biomarkerCode] || false;
};

/**
 * Verifica si un biomarcador existe en un add-on específico
 * @param {string} addOnId - ID del add-on
 * @param {string} biomarkerCode - Código del biomarcador
 * @returns {boolean} true si existe, false si no existe
 */
export const biomarkerExistsInAddOn = (addOnId, biomarkerCode) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) return false;
  
  return Object.keys(config.biomarkers || {}).includes(biomarkerCode);
};

/**
 * Obtiene la variable de estado correspondiente a un biomarcador
 * @param {string} addOnId - ID del add-on para contexto específico
 * @param {string} biomarkerCode - Código del biomarcador
 * @returns {string|null} Nombre de la variable de estado o null si no existe
 */
export const getBiomarkerStateVariable = (addOnId, biomarkerCode) => {
  // Primero verificar mapeo específico por contexto
  if (CONTEXT_SPECIFIC_STATE_MAP[addOnId] && CONTEXT_SPECIFIC_STATE_MAP[addOnId][biomarkerCode]) {
    return CONTEXT_SPECIFIC_STATE_MAP[addOnId][biomarkerCode];
  }
  
  // Fallback al mapeo general
  return BIOMARKER_CODE_TO_STATE_MAP[biomarkerCode] || null;
};

/**
 * Obtiene todos los biomarcadores activos para un add-on
 * @param {string} addOnId - ID del add-on
 * @param {Object} selectedStates - Estados actuales de selección del contexto
 * @returns {Array} Array de códigos de biomarcadores activos
 */
export const getActiveBiomarkers = (addOnId, selectedStates = {}) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) {
    console.warn(`⚠️ No hay configuración para add-on: ${addOnId}`);
    return [];
  }
  
  const activeBiomarkers = [];
  
  // Añadir biomarcadores que están seleccionados
  Object.entries(config.biomarkers || {}).forEach(([code, defaultState]) => {
    const stateVariable = getBiomarkerStateVariable(addOnId, code);
    const isSelected = stateVariable ? selectedStates[stateVariable] : defaultState;
    
    if (isSelected) {
      activeBiomarkers.push(code);
    }
  });
  
  return activeBiomarkers;
};

/**
 * Calcula el conteo dinámico de biomarcadores para un add-on
 * @param {string} addOnId - ID del add-on
 * @param {Object} selectedStates - Estados de selección del contexto
 * @param {string} gender - Género para add-ons con diferencias por género
 * @returns {number} Número total de biomarcadores activos
 */
export const calculateDynamicBiomarkerCount = (addOnId, selectedStates = {}, gender = 'both') => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) {
    // Fallback: devolver 0 para add-ons sin configuración
    console.warn(`⚠️ Add-on ${addOnId} no tiene configuración de biomarcadores`);
    return 0;
  }
  
  const activeBiomarkers = getActiveBiomarkers(addOnId, selectedStates);
  
  // Para add-ons con diferencias por género, aplicar ajustes específicos
  if (['hormonas', 'cancer', 'bioage'].includes(addOnId)) {
    // Aplicar lógica específica por género si es necesario
    return activeBiomarkers.length;
  }
  
  return activeBiomarkers.length;
};

/**
 * Obtiene todos los biomarcadores disponibles para un add-on
 * @param {string} addOnId - ID del add-on
 * @returns {Array} Array de códigos de biomarcadores disponibles
 */
export const getAllAvailableBiomarkers = (addOnId) => {
  const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
  if (!config) return [];
  
  return Object.keys(config.biomarkers || {});
};

/**
 * Obtiene el valor inicial para un useState basado en la configuración centralizada
 * @param {string} stateVariable - Nombre de la variable de estado (ej: 'selectedMyPharma')
 * @returns {boolean} Estado inicial basado en la configuración
 */
export const getInitialStateValue = (stateVariable) => {
  // Buscar en todas las configuraciones de add-ons
  for (const [addOnId, config] of Object.entries(ADD_ON_BIOMARKERS_CONFIG)) {
    for (const [code, defaultState] of Object.entries(config.biomarkers || {})) {
      const mappedVariable = getBiomarkerStateVariable(addOnId, code);
      if (mappedVariable === stateVariable) {
        return defaultState;
      }
    }
  }
  
  // Si no se encuentra, devolver false como valor por defecto seguro
  return false;
};

/**
 * Convierte código de biomarcador a nombre legible
 * @param {string} code - Código del biomarcador
 * @returns {string} Nombre legible
 */
export const getBiomarkerReadableName = (code) => {
  return CODE_TO_READABLE_NAME_MAP[code] || code;
};

console.log('✅ Utilidades de biomarcadores cargadas:', {
  functions: [
    'getBiomarkersConfig',
    'getDefaultBiomarkerState', 
    'biomarkerExistsInAddOn',
    'getBiomarkerStateVariable',
    'getActiveBiomarkers',
    'calculateDynamicBiomarkerCount',
    'getAllAvailableBiomarkers',
    'getInitialStateValue',
    'getBiomarkerReadableName'
  ]
}); 