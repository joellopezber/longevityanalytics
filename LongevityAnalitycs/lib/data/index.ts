/**
 * ÍNDICE PRINCIPAL DEL SISTEMA DE DATOS
 * Exportaciones centralizadas para el sistema de longevidad
 */

// Tipos
export type * from '../types/biomarkers';

// Biomarcadores
export * from './biomarkers/dictionary';

// Paquetes principales
export * from './packages/codes';
export * from './packages/main';

// Add-ons
export * from './addons/codes';
export * from './addons/main';
export * from './addons/factory';

// Sistema de precios
export * from './pricing/calculator';
export * from './pricing/data';

// Configuración del sistema
import { essentialPackage, performancePackage, corePackage, advancedPackage } from './packages/main';
import { addOnPackages } from './addons/main';
import { BIOMARKERS_DICTIONARY } from './biomarkers/dictionary';
import { PROFILE_EXCLUSIONS } from './addons/codes';

export const LONGEVITY_SYSTEM = {
  packages: {
    essential: essentialPackage,
    performance: performancePackage,
    core: corePackage,
    advanced: advancedPackage
  },
  addOns: addOnPackages,
  biomarkers: BIOMARKERS_DICTIONARY,
  profileExclusions: PROFILE_EXCLUSIONS
};

export default LONGEVITY_SYSTEM;