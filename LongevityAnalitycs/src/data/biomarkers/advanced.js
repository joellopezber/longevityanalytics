/**
 * advanced.js
 * Funciones avanzadas y análisis para biomarcadores
 * BLOQUE 4: Análisis avanzados y reportes
 */

import { ADD_ON_BIOMARKERS_CONFIG } from './codes.js';
import { 
  getBiomarkerStateVariable, 
  getActiveBiomarkers,
  getBiomarkerReadableName 
} from './utils.js';

// ================================
// FUNCIONES AVANZADAS DE ANÁLISIS
// ================================

/**
 * Obtiene un resumen de los biomarcadores seleccionados manualmente
 * Solo incluye aquellos que están por defecto en FALSE pero el usuario los seleccionó
 * @param {Object} selectedStates - Estados actuales del contexto
 * @returns {Array} Array de nombres legibles de biomarcadores añadidos manualmente
 */
export const getManuallySelectedBiomarkers = (selectedStates = {}) => {
  const manuallySelected = [];
  
  // Iterar por todos los add-ons y sus biomarcadores
  Object.entries(ADD_ON_BIOMARKERS_CONFIG).forEach(([addOnId, config]) => {
    Object.entries(config.biomarkers || {}).forEach(([code, defaultState]) => {
      // Solo incluir si está por defecto en FALSE pero está seleccionado
      if (!defaultState) {
        const stateVariable = getBiomarkerStateVariable(addOnId, code);
        if (stateVariable && selectedStates[stateVariable]) {
          // Mapear código a nombre legible
          const readableName = getBiomarkerReadableName(code);
          manuallySelected.push(readableName);
        }
      }
    });
  });
  
  return manuallySelected;
};

/**
 * Función de migración para integrar con el sistema actual
 * Convierte el conteo actual del contexto a la nueva estructura
 * @param {string} addOnId - ID del add-on
 * @param {Object} selectedStates - Estados actuales del contexto
 * @param {string} gender - Género
 * @returns {number} Conteo de biomarcadores (compatible con getActualBiomarkerCount)
 */
export const migrateToNewBiomarkerSystem = (addOnId, selectedStates = {}, gender = 'both') => {
  // Si el add-on tiene configuración, usar el nuevo sistema
  if (ADD_ON_BIOMARKERS_CONFIG[addOnId]) {
    // Importar la función desde utils
    const { calculateDynamicBiomarkerCount } = require('./utils.js');
    return calculateDynamicBiomarkerCount(addOnId, selectedStates, gender);
  }
  
  // Fallback al sistema actual para add-ons sin migrar
  return 0;
};

/**
 * Genera un reporte detallado del estado de biomarcadores por add-on
 * @param {Object} selectedStates - Estados actuales del contexto
 * @returns {Object} Reporte detallado
 */
export const generateBiomarkersReport = (selectedStates = {}) => {
  const report = {
    summary: {
      totalAddOns: Object.keys(ADD_ON_BIOMARKERS_CONFIG).length,
      addOnsWithSelections: 0,
      totalBiomarkersAvailable: 0,
      totalBiomarkersSelected: 0,
      manuallyAdded: 0
    },
    byAddOn: {},
    manuallySelected: getManuallySelectedBiomarkers(selectedStates)
  };

  // Analizar cada add-on
  Object.entries(ADD_ON_BIOMARKERS_CONFIG).forEach(([addOnId, config]) => {
    const activeBiomarkers = getActiveBiomarkers(addOnId, selectedStates);
    const availableBiomarkers = Object.keys(config.biomarkers || {});
    
    const addOnReport = {
      addOnName: addOnId,
      available: availableBiomarkers.length,
      selected: activeBiomarkers.length,
      selectionRate: availableBiomarkers.length > 0 
        ? ((activeBiomarkers.length / availableBiomarkers.length) * 100).toFixed(1) + '%'
        : '0%',
      activeCodes: activeBiomarkers,
      manuallyAdded: activeBiomarkers.filter(code => {
        const defaultState = config.biomarkers[code];
        return !defaultState; // Solo los que están false por defecto pero seleccionados
      }).length
    };

    report.byAddOn[addOnId] = addOnReport;
    
    // Actualizar resumen
    if (activeBiomarkers.length > 0) {
      report.summary.addOnsWithSelections++;
    }
    report.summary.totalBiomarkersAvailable += availableBiomarkers.length;
    report.summary.totalBiomarkersSelected += activeBiomarkers.length;
    report.summary.manuallyAdded += addOnReport.manuallyAdded;
  });

  return report;
};

/**
 * Obtiene estadísticas de uso de biomarcadores
 * @param {Object} selectedStates - Estados actuales del contexto
 * @returns {Object} Estadísticas de uso
 */
export const getBiomarkersUsageStats = (selectedStates = {}) => {
  const stats = {
    mostUsedAddOns: [],
    leastUsedAddOns: [],
    fullyConfiguredAddOns: [],
    emptyAddOns: [],
    optimalSelections: 0
  };

  const addOnStats = [];

  Object.entries(ADD_ON_BIOMARKERS_CONFIG).forEach(([addOnId, config]) => {
    const activeBiomarkers = getActiveBiomarkers(addOnId, selectedStates);
    const availableBiomarkers = Object.keys(config.biomarkers || {});
    const usageRate = availableBiomarkers.length > 0 
      ? (activeBiomarkers.length / availableBiomarkers.length) * 100 
      : 0;

    addOnStats.push({
      addOnId,
      usageRate,
      selected: activeBiomarkers.length,
      available: availableBiomarkers.length
    });

    // Clasificar add-ons
    if (usageRate === 100) {
      stats.fullyConfiguredAddOns.push(addOnId);
    } else if (usageRate === 0) {
      stats.emptyAddOns.push(addOnId);
    }

    // Contar selecciones óptimas (entre 30-70% de uso)
    if (usageRate >= 30 && usageRate <= 70) {
      stats.optimalSelections++;
    }
  });

  // Ordenar por tasa de uso
  addOnStats.sort((a, b) => b.usageRate - a.usageRate);
  
  stats.mostUsedAddOns = addOnStats.slice(0, 3).map(stat => ({
    addOn: stat.addOnId,
    rate: stat.usageRate.toFixed(1) + '%'
  }));

  stats.leastUsedAddOns = addOnStats.slice(-3).reverse().map(stat => ({
    addOn: stat.addOnId,
    rate: stat.usageRate.toFixed(1) + '%'
  }));

  return stats;
};

/**
 * Valida la configuración de biomarcadores
 * @returns {Object} Resultado de validación
 */
export const validateBiomarkersConfiguration = () => {
  const validation = {
    isValid: true,
    errors: [],
    warnings: [],
    summary: {
      totalAddOns: Object.keys(ADD_ON_BIOMARKERS_CONFIG).length,
      totalBiomarkers: 0,
      duplicatedCodes: [],
      orphanedCodes: []
    }
  };

  const allCodes = new Set();
  const duplicatedCodes = [];

  // Validar cada add-on
  Object.entries(ADD_ON_BIOMARKERS_CONFIG).forEach(([addOnId, config]) => {
    if (!config.biomarkers) {
      validation.errors.push(`Add-on ${addOnId} no tiene configuración de biomarcadores`);
      validation.isValid = false;
      return;
    }

    Object.keys(config.biomarkers).forEach(code => {
      if (allCodes.has(code)) {
        duplicatedCodes.push(code);
      } else {
        allCodes.add(code);
      }
      validation.summary.totalBiomarkers++;
    });
  });

  validation.summary.duplicatedCodes = [...new Set(duplicatedCodes)];

  if (duplicatedCodes.length > 0) {
    validation.warnings.push(`Códigos duplicados encontrados: ${duplicatedCodes.join(', ')}`);
  }

  return validation;
};

console.log('✅ Funciones avanzadas de biomarcadores cargadas:', {
  functions: [
    'getManuallySelectedBiomarkers',
    'migrateToNewBiomarkerSystem',
    'generateBiomarkersReport',
    'getBiomarkersUsageStats',
    'validateBiomarkersConfiguration'
  ]
}); 