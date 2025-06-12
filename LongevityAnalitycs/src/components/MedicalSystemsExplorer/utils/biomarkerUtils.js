/**
 * biomarkerUtils.js
 * Utilidades para identificación de biomarcadores y lógica de selección
 * Extrae la lógica compleja del componente BiomarkerCard
 */

// ================================================================
// IDENTIFICADORES DE BIOMARCADORES
// ================================================================

/**
 * Genera todos los identificadores de biomarcadores para un biomarcador dado
 * @param {Object} biomarker - El objeto biomarcador
 * @param {string} addOnId - ID del add-on actual
 * @returns {Object} Objeto con todos los identificadores booleanos
 */
export const getBiomarkerIdentifiers = (biomarker, addOnId) => {
  const identifiers = {
    // Básicos
    isIntolerancia: biomarker.name === "Intolerancia Alimentaria 200",
    isMetaboloma: biomarker.name === "Metaboloma (orina/heces)",
    isLpA: biomarker.name === "Lp(a) *",
    
    // Genome
    isMyPharmaGenome: biomarker.code === "OG002" && addOnId === "genome",
    isMyDetoxGenome: biomarker.code === "OG003" && addOnId === "genome",
    isMyDietGenome: biomarker.code === "OG004" && addOnId === "genome",
    isMyAgeingGenome: biomarker.code === "OG005" && addOnId === "genome",
    isMySuplementsGenome: biomarker.code === "OG006" && addOnId === "genome",
  };

  return identifiers;
};

// ================================================================
// LÓGICA DE SELECCIÓN
// ================================================================

/**
 * Determina si un biomarcador está seleccionado basándose en todos sus estados
 * @param {Object} identifiers - Identificadores del biomarcador
 * @param {Object} selectedStates - Estados de selección del contexto
 * @returns {boolean} True si el biomarcador está seleccionado
 */
export const isBiomarkerSelected = (identifiers, selectedStates) => {
  const {
    isIntolerancia,
    isMetaboloma,
    isMyPharmaGenome,
    isMyDetoxGenome,
    isMyDietGenome,
    isMyAgeingGenome,
    isMySuplementsGenome,
    isLpA,
    isEstradiolHormonas,
    isProlactinaHormonas,
    isLHHormonas,
    isFSHHormonas,
    isHormonaCrecimientoHormonas,
    isTestosteronaBiodispHormonas,
    isTestosteronaLibreHormonas,
    isDHTHormonas,
    isEstradiolEndocrino,
    isProlactinaEndocrino,
    isLHEndocrino,
    isFSHEndocrino,
    isVSGEndocrino,
    isVitaminaD125OHEndocrino,
    isIGF1Endocrino,
    isIGFBP3Endocrino,
    isACTHEndocrino,
    isVitaminaCOxidativeCell,
    isVitaminaCIVNutrients,
    isProgesterona,
    isTestosteronaTotal,
    is17OHProgesterona,
    isEstrona,
    // ... resto de identificadores
  } = identifiers;

  const {
    selectedIntolerancia,
    selectedMetaboloma,
    selectedMyPharmaGenome,
    selectedMyDetoxGenome,
    selectedMyDietGenome,
    selectedMyAgeingGenome,
    selectedMySuplementsGenome,
    selectedLpA,
    selectedEstradiolHormonas,
    selectedProlactinaHormonas,
    selectedLHHormonas,
    selectedFSHHormonas,
    selectedHormonaCrecimientoHormonas,
    selectedTestosteronaBiodispHormonas,
    selectedTestosteronaLibreHormonas,
    selectedDHTHormonas,
    selectedEstradiolEndocrino,
    selectedProlactinaEndocrino,
    selectedLHEndocrino,
    selectedFSHEndocrino,
    selectedVSGEndocrino,
    selectedVitaminaD125OHEndocrino,
    selectedIGF1Endocrino,
    selectedIGFBP3Endocrino,
    selectedACTHEndocrino,
    selectedVitaminaCOxidativeCell,
    selectedVitaminaCIVNutrients,
    selectedProgesterona,
    selectedTestosteronaTotal,
    selected17OHProgesterona,
    selectedEstrona,
    // ... resto de estados seleccionados
  } = selectedStates;

  return (isIntolerancia && selectedIntolerancia) || 
         (isMetaboloma && selectedMetaboloma) || 
         (isMyPharmaGenome && selectedMyPharmaGenome) || 
         (isMyDetoxGenome && selectedMyDetoxGenome) || 
         (isMyDietGenome && selectedMyDietGenome) || 
         (isMyAgeingGenome && selectedMyAgeingGenome) || 
         (isMySuplementsGenome && selectedMySuplementsGenome) || 
         (isLpA && selectedLpA) || 
         (isEstradiolHormonas && selectedEstradiolHormonas) || 
         (isProlactinaHormonas && selectedProlactinaHormonas) || 
         (isLHHormonas && selectedLHHormonas) || 
         (isFSHHormonas && selectedFSHHormonas) || 
         (isHormonaCrecimientoHormonas && selectedHormonaCrecimientoHormonas) || 
         (isTestosteronaBiodispHormonas && selectedTestosteronaBiodispHormonas) || 
         (isTestosteronaLibreHormonas && selectedTestosteronaLibreHormonas) || 
         (isDHTHormonas && selectedDHTHormonas) || 
         (isEstradiolEndocrino && selectedEstradiolEndocrino) || 
         (isProlactinaEndocrino && selectedProlactinaEndocrino) || 
         (isLHEndocrino && selectedLHEndocrino) || 
         (isFSHEndocrino && selectedFSHEndocrino) || 
         (isVSGEndocrino && selectedVSGEndocrino) || 
         (isVitaminaD125OHEndocrino && selectedVitaminaD125OHEndocrino) || 
         (isIGF1Endocrino && selectedIGF1Endocrino) || 
         (isIGFBP3Endocrino && selectedIGFBP3Endocrino) || 
         (isACTHEndocrino && selectedACTHEndocrino) || 
         (isVitaminaCOxidativeCell && selectedVitaminaCOxidativeCell) || 
         (isVitaminaCIVNutrients && selectedVitaminaCIVNutrients) ||
         (isProgesterona && selectedProgesterona) ||
         (isTestosteronaTotal && selectedTestosteronaTotal) ||
         (is17OHProgesterona && selected17OHProgesterona) ||
         (isEstrona && selectedEstrona);
         // ... continuar con el resto de combinaciones
};

// ================================================================
// MAPEO DE SELECTORES
// ================================================================

/**
 * Mapea identificadores a sus funciones toggle correspondientes
 * @param {Object} identifiers - Identificadores del biomarcador
 * @param {Object} toggleFunctions - Funciones toggle del hook
 * @returns {Function|null} Función toggle correspondiente o null
 */
export const getToggleFunction = (identifiers, toggleFunctions) => {
  const {
    isIntolerancia,
    isMetaboloma,
    isLpA,
    isMyPharmaGenome,
    isMyDetoxGenome,
    isMyDietGenome,
    isMyAgeingGenome,
    isMySuplementsGenome,
    isEstradiolHormonas,
    isProlactinaHormonas,
    isLHHormonas,
    isFSHHormonas,
    // ... resto de identificadores
  } = identifiers;

  const {
    toggleIntoleranciaSelection,
    toggleMetabolomaSelection,
    toggleLpASelection,
    toggleMyPharmaGenomeSelection,
    toggleMyDetoxGenomeSelection,
    toggleMyDietGenomeSelection,
    toggleMyAgeingGenomeSelection,
    toggleMySuplementsGenomeSelection,
    toggleEstradiolHormonasSelection,
    toggleProlactinaHormonasSelection,
    toggleLHHormonasSelection,
    toggleFSHHormonasSelection,
    // ... resto de funciones toggle
  } = toggleFunctions;

  // Retorna la primera función toggle que coincida
  if (isIntolerancia) return toggleIntoleranciaSelection;
  if (isMetaboloma) return toggleMetabolomaSelection;
  if (isLpA) return toggleLpASelection;
  if (isMyPharmaGenome) return toggleMyPharmaGenomeSelection;
  if (isMyDetoxGenome) return toggleMyDetoxGenomeSelection;
  if (isMyDietGenome) return toggleMyDietGenomeSelection;
  if (isMyAgeingGenome) return toggleMyAgeingGenomeSelection;
  if (isMySuplementsGenome) return toggleMySuplementsGenomeSelection;
  if (isEstradiolHormonas) return toggleEstradiolHormonasSelection;
  if (isProlactinaHormonas) return toggleProlactinaHormonasSelection;
  if (isLHHormonas) return toggleLHHormonasSelection;
  if (isFSHHormonas) return toggleFSHHormonasSelection;
  // ... continuar con el resto

  return null; // No hay función toggle disponible
};

// ================================================================
// VALIDACIONES
// ================================================================

/**
 * Verifica si un biomarcador debe mostrar un selector
 * @param {Object} identifiers - Identificadores del biomarcador
 * @param {string} addOnId - ID del add-on actual
 * @returns {boolean} True si debe mostrar selector
 */
export const shouldShowSelector = (identifiers, addOnId) => {
  const { isIntolerancia, isMetaboloma, isLpA } = identifiers;
  return isIntolerancia || isMetaboloma || isLpA || addOnId != null;
}; 