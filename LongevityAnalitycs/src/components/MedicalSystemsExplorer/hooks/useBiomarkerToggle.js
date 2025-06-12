/**
 * useBiomarkerToggle.js
 * Hook personalizado que centraliza todas las funciones toggle de biomarcadores
 * Extrae las ~80 funciones toggle del componente principal para mayor modularidad
 */

import { useBiomarkerSelection } from '../../../contexts/BiomarkerSelectionContext';

export const useBiomarkerToggle = () => {
  const biomarkerContext = useBiomarkerSelection();
  
  // Extraer todos los setters del contexto
  const {
    setSelectedIntolerancia,
    setSelectedMetaboloma,
    setSelectedLpA,
    setSelectedEstradiolHormonas,
    setSelectedProlactinaHormonas,
    setSelectedLHHormonas,
    setSelectedFSHHormonas,
    setSelectedHormonaCrecimientoHormonas,
    setSelectedTestosteronaBiodispHormonas,
    setSelectedTestosteronaLibreHormonas,
    setSelectedDHTHormonas,
    setSelectedProgesterona,
    setSelectedTestosteronaTotal,
    setSelected17OHProgesterona,
    setSelectedEstrona,
    setSelectedEstradiolEndocrino,
    setSelectedProlactinaEndocrino,
    setSelectedLHEndocrino,
    setSelectedFSHEndocrino,
    setSelectedVSGEndocrino,
    setSelectedVitaminaD125OHEndocrino,
    setSelectedIGF1Endocrino,
    setSelectedIGFBP3Endocrino,
    setSelectedACTHEndocrino,
    setSelectedSangreOcultaCancer,
    setSelectedUrinalisisCancer,
    setSelectedCEACancer,
    setSelectedCA125Cancer,
    setSelectedCA153Cancer,
    setSelectedCA199Cancer,
    setSelectedSCCCancer,
    setSelectedProteina100Cancer,
    setSelectedNSECancer,
    setSelectedCYFRA21Cancer,
    setSelectedCA724Cancer,
    setSelectedAFPCancer,
    setSelectedProGRPCancer,
    setSelectedBetaHCGCancer,
    setSelectedPSATotalCancer,
    setSelectedPSALibreCancer,
    setSelectedHE4Cancer,
    setSelectedMyPharmaGenome,
    setSelectedMyDetoxGenome,
    setSelectedMyDietGenome,
    setSelectedMyAgeingGenome,
    setSelectedMySuplementsGenome,
    setSelectedVitaminaCOxidativeCell,
    setSelectedVitaminaCIVNutrients,
    setSelectedCromoIVNutrients,
    setSelectedCobreIVNutrients,
    setSelectedOsmolalidadIVNutrients,
    setSelectedVitaminaK1IVNutrients,
    setSelectedMercurioHeavyMetals,
    setSelectedPlomoHeavyMetals,
    setSelectedArsenicoHeavyMetals,
    setSelectedCadmioHeavyMetals,
    setSelectedANAImmunity,
    setSelectedAntiCCPImmunity,
    setSelectedAntiTiroglobulinaImmunity,
    setSelectedAntiTPOImmunity,
    setSelectedFactorReumatoideImmunity,
    setSelectedHelicobacterImmunity,
    setSelectedParasitosGutGate,
    setSelectedPanelAlimentarioGutGate,
    setSelectedMicrobiomaGutGate,
    setSelectedMetabolomaGutGate,
    setSelectedCalcitriolBoneMineral,
    setSelectedALPOseaBoneMineral,
    setSelectedCTXBoneMineral,
    setSelectedCalcioIonicoBoneMineral,
    setSelectedFibrinogenoCoagulation,
    setSelectedAPTTCoagulation,
    setSelectedINRCoagulation,
    setSelectedMyEpiAgeingBioAge,
    setSelectedLongitudTelomericaBioAge,
    setSelectedEspermiogramaBioAge,
    setSelectedAMHBioAge,
    setSelectedOmega3Digestivo,
    setSelectedLipasaDigestivo,
    setSelectedAmilasaDigestivo,
    setSelectedBilirrubinaDirectaDigestivo,
    setSelectedRetinol,
    setSelectedAlfaTocoferol,
    setSelectedGammaTocoferol,
    setSelectedBetaCaroteno,
    setSelectedCoenzimaQ10,
    setSelectedGlutationReductasa,
    setSelectedGlutationPeroxidasa,
    setSelectedG6PD,
    setSelectedSelenio,
    setSelectedVSGInflammation,
    setSelectedIL6Inflammation,
    setSelectedTNFαInflammation,
    setSelectedLDHCardiovascular,
    setSelectedAcidoLacticoCardiovascular,
    setSelectedCKMBCardiovascular,
    setSelectedCPKTotalCardiovascular,
    setSelectedLDLDirectoCardiovascular,
    setSelectedVLDLCardiovascular,
    setSelectedLpACardiovascular,
    setSelectedCistatinaCardiovascular,
  } = biomarkerContext;

  // ================================================================
  // FUNCIONES TOGGLE CENTRALIZADAS
  // ================================================================

  // Biomarcadores básicos
  const toggleIntoleranciaSelection = () => {
    setSelectedIntolerancia(prev => !prev);
  };

  const toggleMetabolomaSelection = () => {
    setSelectedMetaboloma(prev => !prev);
  };

  const toggleLpASelection = () => {
    setSelectedLpA(prev => !prev);
  };

  // Hormonas add-on
  const toggleEstradiolHormonasSelection = () => {
    setSelectedEstradiolHormonas(prev => !prev);
  };

  const toggleProlactinaHormonasSelection = () => {
    setSelectedProlactinaHormonas(prev => !prev);
  };

  const toggleLHHormonasSelection = () => {
    setSelectedLHHormonas(prev => !prev);
  };

  const toggleFSHHormonasSelection = () => {
    setSelectedFSHHormonas(prev => !prev);
  };

  const toggleHormonaCrecimientoHormonasSelection = () => {
    setSelectedHormonaCrecimientoHormonas(prev => !prev);
  };

  const toggleTestosteronaBiodispHormonasSelection = () => {
    setSelectedTestosteronaBiodispHormonas(prev => !prev);
  };

  const toggleTestosteronaLibreHormonasSelection = () => {
    setSelectedTestosteronaLibreHormonas(prev => !prev);
  };

  const toggleDHTHormonasSelection = () => {
    setSelectedDHTHormonas(prev => !prev);
  };

  const toggleProgesterona = () => {
    setSelectedProgesterona(prev => !prev);
  };

  const toggleTestosteronaTotal = () => {
    setSelectedTestosteronaTotal(prev => !prev);
  };

  const toggle17OHProgesterona = () => {
    setSelected17OHProgesterona(prev => !prev);
  };

  const toggleEstrona = () => {
    setSelectedEstrona(prev => !prev);
  };

  // Endocrino add-on
  const toggleEstradiolEndocrinoSelection = () => {
    setSelectedEstradiolEndocrino(prev => !prev);
  };

  const toggleProlactinaEndocrinoSelection = () => {
    setSelectedProlactinaEndocrino(prev => !prev);
  };

  const toggleLHEndocrinoSelection = () => {
    setSelectedLHEndocrino(prev => !prev);
  };

  const toggleFSHEndocrinoSelection = () => {
    setSelectedFSHEndocrino(prev => !prev);
  };

  const toggleVSGEndocrinoSelection = () => {
    setSelectedVSGEndocrino(prev => !prev);
  };

  const toggleVitaminaD125OHEndocrinoSelection = () => {
    setSelectedVitaminaD125OHEndocrino(prev => !prev);
  };

  const toggleIGF1EndocrinoSelection = () => {
    setSelectedIGF1Endocrino(prev => !prev);
  };

  const toggleIGFBP3EndocrinoSelection = () => {
    setSelectedIGFBP3Endocrino(prev => !prev);
  };

  const toggleACTHEndocrinoSelection = () => {
    setSelectedACTHEndocrino(prev => !prev);
  };

  // Oxidative Cell add-on
  const toggleVitaminaCOxidativeCellSelection = () => {
    setSelectedVitaminaCOxidativeCell(prev => !prev);
  };

  // IV & Nutrients add-on
  const toggleVitaminaCIVNutrientsSelection = () => {
    setSelectedVitaminaCIVNutrients(prev => !prev);
  };

  const toggleCromoIVNutrientsSelection = () => {
    setSelectedCromoIVNutrients(prev => !prev);
  };

  const toggleCobreIVNutrientsSelection = () => {
    setSelectedCobreIVNutrients(prev => !prev);
  };

  const toggleOsmolalidadIVNutrientsSelection = () => {
    setSelectedOsmolalidadIVNutrients(prev => !prev);
  };

  const toggleVitaminaK1IVNutrientsSelection = () => {
    setSelectedVitaminaK1IVNutrients(prev => !prev);
  };

  // Heavy Metals add-on
  const toggleMercurioHeavyMetalsSelection = () => {
    setSelectedMercurioHeavyMetals(prev => !prev);
  };

  const togglePlomoHeavyMetalsSelection = () => {
    setSelectedPlomoHeavyMetals(prev => !prev);
  };

  const toggleArsenicoHeavyMetalsSelection = () => {
    setSelectedArsenicoHeavyMetals(prev => !prev);
  };

  const toggleCadmioHeavyMetalsSelection = () => {
    setSelectedCadmioHeavyMetals(prev => !prev);
  };

  // Immunity add-on
  const toggleANAImmunitySelection = () => {
    setSelectedANAImmunity(prev => !prev);
  };

  const toggleAntiCCPImmunitySelection = () => {
    setSelectedAntiCCPImmunity(prev => !prev);
  };

  const toggleAntiTiroglobulinaImmunitySelection = () => {
    setSelectedAntiTiroglobulinaImmunity(prev => !prev);
  };

  const toggleAntiTPOImmunitySelection = () => {
    setSelectedAntiTPOImmunity(prev => !prev);
  };

  const toggleFactorReumatoideImmunitySelection = () => {
    setSelectedFactorReumatoideImmunity(prev => !prev);
  };

  const toggleHelicobacterImmunitySelection = () => {
    setSelectedHelicobacterImmunity(prev => !prev);
  };

  // Gut Gate add-on
  const toggleParasitosGutGateSelection = () => {
    setSelectedParasitosGutGate(prev => !prev);
  };

  const togglePanelAlimentarioGutGateSelection = () => {
    setSelectedPanelAlimentarioGutGate(prev => !prev);
  };

  const toggleMicrobiomaGutGateSelection = () => {
    setSelectedMicrobiomaGutGate(prev => !prev);
  };

  const toggleMetabolomaGutGateSelection = () => {
    setSelectedMetabolomaGutGate(prev => !prev);
  };

  // Bone Mineral add-on
  const toggleCalcitriolBoneMineralSelection = () => {
    setSelectedCalcitriolBoneMineral(prev => !prev);
  };

  const toggleALPOseaBoneMineralSelection = () => {
    setSelectedALPOseaBoneMineral(prev => !prev);
  };

  const toggleCTXBoneMineralSelection = () => {
    setSelectedCTXBoneMineral(prev => !prev);
  };

  const toggleCalcioIonicoBoneMineralSelection = () => {
    setSelectedCalcioIonicoBoneMineral(prev => !prev);
  };

  // Coagulation add-on
  const toggleFibrinogenoCoagulationSelection = () => {
    setSelectedFibrinogenoCoagulation(prev => !prev);
  };

  const toggleAPTTCoagulationSelection = () => {
    setSelectedAPTTCoagulation(prev => !prev);
  };

  const toggleINRCoagulationSelection = () => {
    setSelectedINRCoagulation(prev => !prev);
  };

  // BioAge add-on
  const toggleMyEpiAgeingBioAgeSelection = () => {
    setSelectedMyEpiAgeingBioAge(prev => !prev);
  };

  const toggleLongitudTelomericaBioAgeSelection = () => {
    setSelectedLongitudTelomericaBioAge(prev => !prev);
  };

  const toggleEspermiogramaBioAgeSelection = () => {
    setSelectedEspermiogramaBioAge(prev => !prev);
  };

  const toggleAMHBioAgeSelection = () => {
    setSelectedAMHBioAge(prev => !prev);
  };

  // Cancer add-on
  const toggleSangreOcultaCancerSelection = () => {
    setSelectedSangreOcultaCancer(prev => !prev);
  };

  const toggleUrinalisisCancerSelection = () => {
    setSelectedUrinalisisCancer(prev => !prev);
  };

  const toggleCEACancerSelection = () => {
    setSelectedCEACancer(prev => !prev);
  };

  const toggleCA125CancerSelection = () => {
    setSelectedCA125Cancer(prev => !prev);
  };

  const toggleCA153CancerSelection = () => {
    setSelectedCA153Cancer(prev => !prev);
  };

  const toggleCA199CancerSelection = () => {
    setSelectedCA199Cancer(prev => !prev);
  };

  const toggleSCCCancerSelection = () => {
    setSelectedSCCCancer(prev => !prev);
  };

  const toggleProteina100CancerSelection = () => {
    setSelectedProteina100Cancer(prev => !prev);
  };

  const toggleNSECancerSelection = () => {
    setSelectedNSECancer(prev => !prev);
  };

  const toggleCYFRA21CancerSelection = () => {
    setSelectedCYFRA21Cancer(prev => !prev);
  };

  const toggleCA724CancerSelection = () => {
    setSelectedCA724Cancer(prev => !prev);
  };

  const toggleAFPCancerSelection = () => {
    setSelectedAFPCancer(prev => !prev);
  };

  const toggleProGRPCancerSelection = () => {
    setSelectedProGRPCancer(prev => !prev);
  };

  const toggleBetaHCGCancerSelection = () => {
    setSelectedBetaHCGCancer(prev => !prev);
  };

  const togglePSATotalCancerSelection = () => {
    setSelectedPSATotalCancer(prev => !prev);
  };

  const togglePSALibreCancerSelection = () => {
    setSelectedPSALibreCancer(prev => !prev);
  };

  const toggleHE4CancerSelection = () => {
    setSelectedHE4Cancer(prev => !prev);
  };

  // Genome add-on
  const toggleMyPharmaGenomeSelection = () => {
    setSelectedMyPharmaGenome(prev => !prev);
  };

  const toggleMyDetoxGenomeSelection = () => {
    setSelectedMyDetoxGenome(prev => !prev);
  };

  const toggleMyDietGenomeSelection = () => {
    setSelectedMyDietGenome(prev => !prev);
  };

  const toggleMyAgeingGenomeSelection = () => {
    setSelectedMyAgeingGenome(prev => !prev);
  };

  const toggleMySuplementsGenomeSelection = () => {
    setSelectedMySuplementsGenome(prev => !prev);
  };

  // Digestion add-on
  const toggleOmega3DigestivoSelection = () => {
    setSelectedOmega3Digestivo(prev => !prev);
  };

  const toggleLipasaDigestivoSelection = () => {
    setSelectedLipasaDigestivo(prev => !prev);
  };

  const toggleAmilasaDigestivoSelection = () => {
    setSelectedAmilasaDigestivo(prev => !prev);
  };

  const toggleBilirrubinaDirectaDigestivoSelection = () => {
    setSelectedBilirrubinaDirectaDigestivo(prev => !prev);
  };

  // Antioxidantes add-on
  const toggleRetinolSelection = () => {
    setSelectedRetinol(prev => !prev);
  };

  const toggleAlfaTocoferolSelection = () => {
    setSelectedAlfaTocoferol(prev => !prev);
  };

  const toggleGammaTocoferolSelection = () => {
    setSelectedGammaTocoferol(prev => !prev);
  };

  const toggleBetaCarotenoSelection = () => {
    setSelectedBetaCaroteno(prev => !prev);
  };

  const toggleCoenzimaQ10Selection = () => {
    setSelectedCoenzimaQ10(prev => !prev);
  };

  // Estrés Oxidativo add-on
  const toggleGlutationReductasaSelection = () => {
    setSelectedGlutationReductasa(prev => !prev);
  };

  const toggleGlutationPeroxidasaSelection = () => {
    setSelectedGlutationPeroxidasa(prev => !prev);
  };

  const toggleG6PDSelection = () => {
    setSelectedG6PD(prev => !prev);
  };

  const toggleSelenioSelection = () => {
    setSelectedSelenio(prev => !prev);
  };

  // Inflamación add-on
  const toggleVSGInflammationSelection = () => {
    setSelectedVSGInflammation(prev => !prev);
  };

  const toggleIL6InflammationSelection = () => {
    setSelectedIL6Inflammation(prev => !prev);
  };

  const toggleTNFαInflammationSelection = () => {
    setSelectedTNFαInflammation(prev => !prev);
  };

  // Cardiovascular add-on
  const toggleLDHCardiovascularSelection = () => {
    setSelectedLDHCardiovascular(prev => !prev);
  };

  const toggleAcidoLacticoCardiovascularSelection = () => {
    setSelectedAcidoLacticoCardiovascular(prev => !prev);
  };

  const toggleCKMBCardiovascularSelection = () => {
    setSelectedCKMBCardiovascular(prev => !prev);
  };

  const toggleCPKTotalCardiovascularSelection = () => {
    setSelectedCPKTotalCardiovascular(prev => !prev);
  };

  const toggleLDLDirectoCardiovascularSelection = () => {
    setSelectedLDLDirectoCardiovascular(prev => !prev);
  };

  const toggleVLDLCardiovascularSelection = () => {
    setSelectedVLDLCardiovascular(prev => !prev);
  };

  const toggleLpACardiovascularSelection = () => {
    setSelectedLpACardiovascular(prev => !prev);
  };

  const toggleCistatinaCardiovascularSelection = () => {
    setSelectedCistatinaCardiovascular(prev => !prev);
  };

  // ================================================================
  // RETORNAR TODAS LAS FUNCIONES TOGGLE
  // ================================================================
  return {
    // Biomarcadores básicos
    toggleIntoleranciaSelection,
    toggleMetabolomaSelection,
    toggleLpASelection,
    
    // Hormonas
    toggleEstradiolHormonasSelection,
    toggleProlactinaHormonasSelection,
    toggleLHHormonasSelection,
    toggleFSHHormonasSelection,
    toggleHormonaCrecimientoHormonasSelection,
    toggleTestosteronaBiodispHormonasSelection,
    toggleTestosteronaLibreHormonasSelection,
    toggleDHTHormonasSelection,
    toggleProgesterona,
    toggleTestosteronaTotal,
    toggle17OHProgesterona,
    toggleEstrona,
    
    // Endocrino
    toggleEstradiolEndocrinoSelection,
    toggleProlactinaEndocrinoSelection,
    toggleLHEndocrinoSelection,
    toggleFSHEndocrinoSelection,
    toggleVSGEndocrinoSelection,
    toggleVitaminaD125OHEndocrinoSelection,
    toggleIGF1EndocrinoSelection,
    toggleIGFBP3EndocrinoSelection,
    toggleACTHEndocrinoSelection,
    
    // Oxidative Cell
    toggleVitaminaCOxidativeCellSelection,
    
    // IV & Nutrients
    toggleVitaminaCIVNutrientsSelection,
    toggleCromoIVNutrientsSelection,
    toggleCobreIVNutrientsSelection,
    toggleOsmolalidadIVNutrientsSelection,
    toggleVitaminaK1IVNutrientsSelection,
    
    // Heavy Metals
    toggleMercurioHeavyMetalsSelection,
    togglePlomoHeavyMetalsSelection,
    toggleArsenicoHeavyMetalsSelection,
    toggleCadmioHeavyMetalsSelection,
    
    // Immunity
    toggleANAImmunitySelection,
    toggleAntiCCPImmunitySelection,
    toggleAntiTiroglobulinaImmunitySelection,
    toggleAntiTPOImmunitySelection,
    toggleFactorReumatoideImmunitySelection,
    toggleHelicobacterImmunitySelection,
    
    // Gut Gate
    toggleParasitosGutGateSelection,
    togglePanelAlimentarioGutGateSelection,
    toggleMicrobiomaGutGateSelection,
    toggleMetabolomaGutGateSelection,
    
    // Bone Mineral
    toggleCalcitriolBoneMineralSelection,
    toggleALPOseaBoneMineralSelection,
    toggleCTXBoneMineralSelection,
    toggleCalcioIonicoBoneMineralSelection,
    
    // Coagulation
    toggleFibrinogenoCoagulationSelection,
    toggleAPTTCoagulationSelection,
    toggleINRCoagulationSelection,
    
    // BioAge
    toggleMyEpiAgeingBioAgeSelection,
    toggleLongitudTelomericaBioAgeSelection,
    toggleEspermiogramaBioAgeSelection,
    toggleAMHBioAgeSelection,
    
    // Cancer
    toggleSangreOcultaCancerSelection,
    toggleUrinalisisCancerSelection,
    toggleCEACancerSelection,
    toggleCA125CancerSelection,
    toggleCA153CancerSelection,
    toggleCA199CancerSelection,
    toggleSCCCancerSelection,
    toggleProteina100CancerSelection,
    toggleNSECancerSelection,
    toggleCYFRA21CancerSelection,
    toggleCA724CancerSelection,
    toggleAFPCancerSelection,
    toggleProGRPCancerSelection,
    toggleBetaHCGCancerSelection,
    togglePSATotalCancerSelection,
    togglePSALibreCancerSelection,
    toggleHE4CancerSelection,
    
    // Genome
    toggleMyPharmaGenomeSelection,
    toggleMyDetoxGenomeSelection,
    toggleMyDietGenomeSelection,
    toggleMyAgeingGenomeSelection,
    toggleMySuplementsGenomeSelection,
    
    // Digestion
    toggleOmega3DigestivoSelection,
    toggleLipasaDigestivoSelection,
    toggleAmilasaDigestivoSelection,
    toggleBilirrubinaDirectaDigestivoSelection,
    
    // Antioxidantes
    toggleRetinolSelection,
    toggleAlfaTocoferolSelection,
    toggleGammaTocoferolSelection,
    toggleBetaCarotenoSelection,
    toggleCoenzimaQ10Selection,
    
    // Estrés Oxidativo
    toggleGlutationReductasaSelection,
    toggleGlutationPeroxidasaSelection,
    toggleG6PDSelection,
    toggleSelenioSelection,
    
    // Inflamación
    toggleVSGInflammationSelection,
    toggleIL6InflammationSelection,
    toggleTNFαInflammationSelection,
    
    // Cardiovascular
    toggleLDHCardiovascularSelection,
    toggleAcidoLacticoCardiovascularSelection,
    toggleCKMBCardiovascularSelection,
    toggleCPKTotalCardiovascularSelection,
    toggleLDLDirectoCardiovascularSelection,
    toggleVLDLCardiovascularSelection,
    toggleLpACardiovascularSelection,
    toggleCistatinaCardiovascularSelection,
  };
}; 