/**
 * index.js
 * Punto de entrada principal del módulo MedicalSystemsExplorer refactorizado
 * Exporta el componente principal manteniendo compatibilidad con imports existentes
 */

import MedicalSystemsExplorer from './MedicalSystemsExplorer';

export default MedicalSystemsExplorer;

// Exportaciones nombradas para compatibilidad futura
export { default as BiomarkerCard } from './components/BiomarkerCard';
export { useBiomarkerToggle } from './hooks/useBiomarkerToggle';
export * from './utils/biomarkerUtils'; 