/**
 * MedicalSystemsExplorer.jsx
 * Componente que muestra Essential como card principal de doble ancho
 * seguido de los Add-Ons como cards individuales
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
// Imports de la nueva arquitectura (Essential, Performance, Core, Advanced)
import { 
  essentialPackage,
  performancePackage,
  corePackage,
  advancedPackage,
  getRecommendedAddOns,
  getProfileCodes
} from '../data/analysisPackages';
// Imports de add-ons desde nueva arquitectura
import { /* getAddOnPackagesForGender, */ getAddOnPackagesForProfile } from '../data/addOnPackages';
import { useBiomarkerSelection } from '../contexts/BiomarkerSelectionContext';
import { useLanguage } from '../contexts/LanguageContext';

const MedicalSystemsExplorer = () => {
  const { t } = useLanguage(); // Hook para traducciones
  const [selectedGender, setSelectedGender] = useState('male'); // Género por defecto
  const [expandedBiomarkers, setExpandedBiomarkers] = useState([]); // Ningún biomarcador expandido por defecto

  const [showAddOns, setShowAddOns] = useState(false); // Estado para mostrar/ocultar add-ons
  
  // Usar el contexto para las selecciones de biomarcadores
  const {
    // user,  // No usado por ahora
    // selectedBiomarkers,  // No usado por ahora
    // setSelectedBiomarkers,  // No usado por ahora
    // activeBiomarkers,  // No usado por ahora
    // setActiveBiomarkers,  // No usado por ahora
    // biomarkerDetails,  // No usado por ahora
    selectedProfile,
    setSelectedProfile,
    // profilePrices,  // No usado por ahora
    // profiles,  // No usado por ahora
    // gender,  // No usado por ahora (se usa selectedGender)
    // setGender,  // No usado por ahora (se usa handleGenderChange)
    // calculateAdditionalPrices,  // No usado por ahora
    // getTotalPrice,  // No usado por ahora
    // getEnhancedBiomarkerCount,  // No usado por ahora  
    // getActualBiomarkerCount,  // No usado por ahora
    // calculateAddOnPrice,  // No usado por ahora
    selectedIntolerancia,
    setSelectedIntolerancia,
    selectedMetaboloma,
    setSelectedMetaboloma,
    selectedLpA,
    setSelectedLpA,

    selectedEstradiolHormonas,
    setSelectedEstradiolHormonas,
    selectedProlactinaHormonas,
    setSelectedProlactinaHormonas,
    selectedLHHormonas,
    setSelectedLHHormonas,
    selectedFSHHormonas,
    setSelectedFSHHormonas,
    selectedHormonaCrecimientoHormonas,
    setSelectedHormonaCrecimientoHormonas,
    selectedTestosteronaBiodispHormonas,
    setSelectedTestosteronaBiodispHormonas,
    selectedTestosteronaLibreHormonas,
    setSelectedTestosteronaLibreHormonas,
    selectedDHTHormonas,
    setSelectedDHTHormonas,
    selectedProgesterona,
    setSelectedProgesterona,
    selectedTestosteronaTotal,
    setSelectedTestosteronaTotal,
    selected17OHProgesterona,
    setSelected17OHProgesterona,
    selectedEstrona,
    setSelectedEstrona,
    selectedEstradiolEndocrino,
    setSelectedEstradiolEndocrino,
    selectedProlactinaEndocrino,
    setSelectedProlactinaEndocrino,
    selectedLHEndocrino,
    setSelectedLHEndocrino,
    selectedFSHEndocrino,
    setSelectedFSHEndocrino,
    selectedVSGEndocrino,
    setSelectedVSGEndocrino,
    selectedVitaminaD125OHEndocrino,
    setSelectedVitaminaD125OHEndocrino,
    selectedIGF1Endocrino,
    setSelectedIGF1Endocrino,
    selectedIGFBP3Endocrino,
    setSelectedIGFBP3Endocrino,
    selectedACTHEndocrino,
    setSelectedACTHEndocrino,
    selectedSangreOcultaCancer,
    setSelectedSangreOcultaCancer,
    selectedUrinalisisCancer,
    setSelectedUrinalisisCancer,
    selectedCEACancer,
    setSelectedCEACancer,
    selectedCA125Cancer,
    setSelectedCA125Cancer,
    selectedCA153Cancer,
    setSelectedCA153Cancer,
    selectedCA199Cancer,
    setSelectedCA199Cancer,
    selectedSCCCancer,
    setSelectedSCCCancer,
    selectedProteina100Cancer,
    setSelectedProteina100Cancer,
    selectedNSECancer,
    setSelectedNSECancer,
    selectedCYFRA21Cancer,
    setSelectedCYFRA21Cancer,
    selectedCA724Cancer,
    setSelectedCA724Cancer,
    selectedAFPCancer,
    setSelectedAFPCancer,
    selectedProGRPCancer,
    setSelectedProGRPCancer,
    selectedBetaHCGCancer,
    setSelectedBetaHCGCancer,
    selectedPSATotalCancer,
    setSelectedPSATotalCancer,
    selectedPSALibreCancer,
    setSelectedPSALibreCancer,
    selectedHE4Cancer,
    setSelectedHE4Cancer,
    selectedMyPharmaGenome,
    setSelectedMyPharmaGenome,
    selectedMyDetoxGenome,
    setSelectedMyDetoxGenome,
    selectedMyDietGenome,
    setSelectedMyDietGenome,
    selectedMyAgeingGenome,
    setSelectedMyAgeingGenome,
    selectedMySuplementsGenome,
    setSelectedMySuplementsGenome,
    selectedVitaminaCOxidativeCell,
    setSelectedVitaminaCOxidativeCell,
    selectedVitaminaCIVNutrients,
    setSelectedVitaminaCIVNutrients,
    selectedCromoIVNutrients,
    setSelectedCromoIVNutrients,
    selectedCobreIVNutrients,
    setSelectedCobreIVNutrients,
    selectedOsmolalidadIVNutrients,
    setSelectedOsmolalidadIVNutrients,
    selectedVitaminaK1IVNutrients,
    setSelectedVitaminaK1IVNutrients,
    selectedMercurioHeavyMetals,
    setSelectedMercurioHeavyMetals,
    selectedPlomoHeavyMetals,
    setSelectedPlomoHeavyMetals,
    selectedArsenicoHeavyMetals,
    setSelectedArsenicoHeavyMetals,
    selectedCadmioHeavyMetals,
    setSelectedCadmioHeavyMetals,
    selectedANAImmunity,
    setSelectedANAImmunity,
    selectedAntiCCPImmunity,
    setSelectedAntiCCPImmunity,
    selectedAntiTiroglobulinaImmunity,
    setSelectedAntiTiroglobulinaImmunity,
    selectedAntiTPOImmunity,
    setSelectedAntiTPOImmunity,
    selectedFactorReumatoideImmunity,
    setSelectedFactorReumatoideImmunity,
    selectedHelicobacterImmunity,
    setSelectedHelicobacterImmunity,
    selectedParasitosGutGate,
    setSelectedParasitosGutGate,
    selectedPanelAlimentarioGutGate,
    setSelectedPanelAlimentarioGutGate,
    selectedMicrobiomaGutGate,
    setSelectedMicrobiomaGutGate,
    selectedMetabolomaGutGate,
    setSelectedMetabolomaGutGate,
    selectedCalcitriolBoneMineral,
    setSelectedCalcitriolBoneMineral,
    selectedALPOseaBoneMineral,
    setSelectedALPOseaBoneMineral,
    selectedCTXBoneMineral,
    setSelectedCTXBoneMineral,
    selectedCalcioIonicoBoneMineral,
    setSelectedCalcioIonicoBoneMineral,
    selectedFibrinogenoCoagulation,
    setSelectedFibrinogenoCoagulation,
    selectedAPTTCoagulation,
    setSelectedAPTTCoagulation,
    selectedINRCoagulation,
    setSelectedINRCoagulation,
    selectedMyEpiAgeingBioAge,
    setSelectedMyEpiAgeingBioAge,
    selectedLongitudTelomericaBioAge,
    setSelectedLongitudTelomericaBioAge,
    selectedEspermiogramaBioAge,
    setSelectedEspermiogramaBioAge,
    selectedAMHBioAge,
    setSelectedAMHBioAge,

    selectedRetinol,
    setSelectedRetinol,
    selectedAlfaTocoferol,
    setSelectedAlfaTocoferol,
    selectedGammaTocoferol,
    setSelectedGammaTocoferol,
    selectedBetaCaroteno,
    setSelectedBetaCaroteno,
    selectedCoenzimaQ10,
    setSelectedCoenzimaQ10,
    selectedGlutationReductasa,
    setSelectedGlutationReductasa,
    selectedGlutationPeroxidasa,
    setSelectedGlutationPeroxidasa,
    selectedG6PD,
    setSelectedG6PD,
    selectedSelenio,
    setSelectedSelenio,
    selectedVSGInflammation,
    setSelectedVSGInflammation,
    selectedIL6Inflammation,
    setSelectedIL6Inflammation,
    selectedTNFαInflammation,
    setSelectedTNFαInflammation,
    selectedLDHCardiovascular,
    setSelectedLDHCardiovascular,
    selectedAcidoLacticoCardiovascular,
    setSelectedAcidoLacticoCardiovascular,
    selectedCKMBCardiovascular,
    setSelectedCKMBCardiovascular,
    selectedCPKTotalCardiovascular,
    setSelectedCPKTotalCardiovascular,
    selectedLDLDirectoCardiovascular,
    setSelectedLDLDirectoCardiovascular,
    selectedVLDLCardiovascular,
    setSelectedVLDLCardiovascular,
    selectedLpACardiovascular,
    setSelectedLpACardiovascular,
    selectedCistatinaCardiovascular,
    setSelectedCistatinaCardiovascular,
    // Estados específicos para Digestivo
    selectedOmega3Digestivo,
    setSelectedOmega3Digestivo,
    selectedLipasaDigestivo,
    setSelectedLipasaDigestivo,
    selectedAmilasaDigestivo,
    setSelectedAmilasaDigestivo,
    selectedBilirrubinaDirectaDigestivo,
    setSelectedBilirrubinaDirectaDigestivo,
    getAdjustedAddOnPrice
  } = useBiomarkerSelection();

  // Función para obtener todos los estados del contexto para el nuevo sistema de precios
  const getAllSelectedStates = () => {
    return {
      // Genome add-on
      selectedMyPharma: selectedMyPharmaGenome,
      selectedMyDetox: selectedMyDetoxGenome,
      selectedMyDiet: selectedMyDietGenome,
      selectedMyAgeing: selectedMyAgeingGenome,
      selectedMySuplements: selectedMySuplementsGenome,
      // Hormonas add-on - CORREGIDO: usar nombres exactos de biomarkersConfig.js
      selectedEstradiolHormonas: selectedEstradiolHormonas,
      selectedFSHHormonas: selectedFSHHormonas,
      selectedHormonaCrecimientoHormonas: selectedHormonaCrecimientoHormonas,
      selectedLHHormonas: selectedLHHormonas,
      selectedProlactinaHormonas: selectedProlactinaHormonas,
      selectedTestosteronaBiodispHormonas: selectedTestosteronaBiodispHormonas,
      selectedTestosteronaLibreHormonas: selectedTestosteronaLibreHormonas,
      selectedDHTHormonas: selectedDHTHormonas,
      selectedProgesterona: selectedProgesterona,
      selectedTestosteronaTotal: selectedTestosteronaTotal,
      selected17OHProgesterona: selected17OHProgesterona,
      selectedEstrona: selectedEstrona,
      // Endocrino add-on
      selectedIGF1Endocrino: selectedIGF1Endocrino,
      selectedIGFBP3Endocrino: selectedIGFBP3Endocrino,
      selectedACTHEndocrino: selectedACTHEndocrino,
      // Cardiovascular add-on
      selectedLDHCardiovascular: selectedLDHCardiovascular,
      selectedAcidoLacticoCardiovascular: selectedAcidoLacticoCardiovascular,
      selectedCKMBCardiovascular: selectedCKMBCardiovascular,
      selectedCPKTotalCardiovascular: selectedCPKTotalCardiovascular,
      selectedLDLDirectoCardiovascular: selectedLDLDirectoCardiovascular,
      selectedVLDLCardiovascular: selectedVLDLCardiovascular,
      selectedLpACardiovascular: selectedLpACardiovascular,
      selectedCistatinaCardiovascular: selectedCistatinaCardiovascular,
      // Antioxidantes add-on
      selectedRetinol: selectedRetinol,
      selectedAlfaTocoferol: selectedAlfaTocoferol,
      selectedGammaTocoferol: selectedGammaTocoferol,
      selectedBetaCaroteno: selectedBetaCaroteno,
      selectedCoenzimaQ10: selectedCoenzimaQ10,
      // IV Nutrients add-on
      selectedCromoIVNutrients: selectedCromoIVNutrients,
      selectedCobreIVNutrients: selectedCobreIVNutrients,
      selectedOsmolalidadIVNutrients: selectedOsmolalidadIVNutrients,
      selectedVitaminaK1IVNutrients: selectedVitaminaK1IVNutrients,
      selectedVitaminaCIVNutrients: selectedVitaminaCIVNutrients,
      // Metals add-on
      selectedMercurioHeavyMetals: selectedMercurioHeavyMetals,
      selectedPlomoHeavyMetals: selectedPlomoHeavyMetals,
      selectedArsenicoHeavyMetals: selectedArsenicoHeavyMetals,
      selectedCadmioHeavyMetals: selectedCadmioHeavyMetals,
      // Oxidative Cell add-on
      selectedGlutationReductasa: selectedGlutationReductasa,
      selectedGlutationPeroxidasa: selectedGlutationPeroxidasa,
      selectedG6PD: selectedG6PD,
      selectedSelenio: selectedSelenio,
      // Inflammation add-on
      selectedVSGInflammation: selectedVSGInflammation,
      selectedIL6Inflammation: selectedIL6Inflammation,
      selectedTNFαInflammation: selectedTNFαInflammation,
      // Immunity add-on
      selectedANAImmunity: selectedANAImmunity,
      selectedAntiCCPImmunity: selectedAntiCCPImmunity,
      selectedAntiTiroglobulinaImmunity: selectedAntiTiroglobulinaImmunity,
      selectedAntiTPOImmunity: selectedAntiTPOImmunity,
      selectedFactorReumatoideImmunity: selectedFactorReumatoideImmunity,
      selectedHelicobacterImmunity: selectedHelicobacterImmunity,
      // Digestion add-on
      selectedOmega3Digestivo: selectedOmega3Digestivo,
      selectedLipasaDigestivo: selectedLipasaDigestivo,
      selectedAmilasaDigestivo: selectedAmilasaDigestivo,
      selectedBilirrubinaDirectaDigestivo: selectedBilirrubinaDirectaDigestivo,
      // Gut Gate add-on
      selectedParasitosGutGate: selectedParasitosGutGate,
      selectedIntolerancia: selectedIntolerancia,
      selectedMicrobiomaGutGate: selectedMicrobiomaGutGate,
      selectedMetabolomaGutGate: selectedMetabolomaGutGate,
      // Bone Mineral add-on
      selectedCalcitriolBoneMineral: selectedCalcitriolBoneMineral,
      selectedALPOseaBoneMineral: selectedALPOseaBoneMineral,
      selectedCTXBoneMineral: selectedCTXBoneMineral,
      selectedCalcioIonicoBoneMineral: selectedCalcioIonicoBoneMineral,
      // Coagulation add-on
      selectedFibrinogenoCoagulation: selectedFibrinogenoCoagulation,
      selectedAPTTCoagulation: selectedAPTTCoagulation,
      selectedINRCoagulation: selectedINRCoagulation,
      // BioAge add-on
      selectedMyEpiAgeingBioAge: selectedMyEpiAgeingBioAge,
      selectedLongitudTelomericaBioAge: selectedLongitudTelomericaBioAge,
      selectedEspermiogramaBioAge: selectedEspermiogramaBioAge,
      selectedAMHBioAge: selectedAMHBioAge,
      // Cancer add-on
      selectedSangreOcultaCancer: selectedSangreOcultaCancer,
      selectedUrinalisisCancer: selectedUrinalisisCancer,
      selectedCEACancer: selectedCEACancer,
      selectedCA125Cancer: selectedCA125Cancer,
      selectedCA153Cancer: selectedCA153Cancer,
      selectedCA199Cancer: selectedCA199Cancer,
      selectedSCCCancer: selectedSCCCancer,
      selectedProteina100Cancer: selectedProteina100Cancer,
      selectedNSECancer: selectedNSECancer,
      selectedCYFRA21Cancer: selectedCYFRA21Cancer,
      selectedCA724Cancer: selectedCA724Cancer,
      selectedAFPCancer: selectedAFPCancer,
      selectedProGRPCancer: selectedProGRPCancer,
      selectedBetaHCGCancer: selectedBetaHCGCancer,
      selectedPSATotalCancer: selectedPSATotalCancer,
      selectedPSALibreCancer: selectedPSALibreCancer,
      selectedHE4Cancer: selectedHE4Cancer
    };
  };

  // Obtener datos filtrados por género usando nueva arquitectura
  const essentialData = essentialPackage.getForGender(selectedGender);
  const performanceData = performancePackage.getForGender(selectedGender);
  const coreData = corePackage.getForGender(selectedGender);
  const advancedData = advancedPackage.getForGender(selectedGender);
  // const addOnPackages = getAddOnPackagesForGender(selectedGender); // No usado directamente

  // Función para obtener las características traducidas del Essential
  const getEssentialFeatures = () => {
    return [
      t('packageComparison.glucidMetabolism'),
      t('packageComparison.renalHepaticFunction'),
      t('packageComparison.advancedLipidProfile'),
      t('packageComparison.basicHormones'),
      t('packageComparison.completeThyroid'),
      t('packageComparison.essentialMinerals'),
      t('packageComparison.inflammatoryMarkers'),
      t('packageComparison.biologicalAgeCalculation')
    ];
  };

  // Función para obtener add-ons recomendados del perfil seleccionado
  const getRecommendedAddOnsForSelectedProfile = () => {
    let profilePackage;
    switch(selectedProfile) {
      case 'essential':
        profilePackage = essentialPackage;
        break;
      case 'performance':
        profilePackage = performancePackage;
        break;
      case 'core':
        profilePackage = corePackage;
        break;
      case 'advanced':
        profilePackage = advancedPackage;
        break;
      default:
        profilePackage = essentialPackage;
    }

    // NUEVO: Usar el sistema de filtrado contextual
    // Obtener códigos del perfil base
    const baseCodes = getProfileCodes(profilePackage, selectedGender);
    
    // Obtener add-ons filtrados sin duplicados CON EXCLUSIONES POR PERFIL
    const filteredAddOns = getAddOnPackagesForProfile(selectedGender, baseCodes, selectedProfile);
    
    // Filtrar solo los add-ons recomendados para este perfil
    const recommendedIds = getRecommendedAddOns(profilePackage);
    const recommendedFilteredAddOns = recommendedIds
      .map(id => filteredAddOns[id])
      .filter(Boolean); // Solo incluir add-ons que existen y tienen biomarcadores únicos
    
    return recommendedFilteredAddOns;
  };

  const toggleBiomarker = (biomarkerId) => {
    setExpandedBiomarkers(prev => 
      prev.includes(biomarkerId) 
        ? prev.filter(id => id !== biomarkerId)
        : [...prev, biomarkerId]
    );
  };

  // ================================================================
  // FUNCIÓN PARA RESETEAR TODOS LOS BIOMARCADORES SELECCIONADOS
  // ================================================================
  const resetAllSelectedBiomarkers = () => {
    // Reset Hormonas add-on
    setSelectedEstradiolHormonas(false);
    setSelectedProlactinaHormonas(false);
    setSelectedLHHormonas(false);
    setSelectedFSHHormonas(false);
    setSelectedHormonaCrecimientoHormonas(false);
    setSelectedTestosteronaBiodispHormonas(false);
    setSelectedTestosteronaLibreHormonas(false);
    setSelectedDHTHormonas(false);
    setSelectedProgesterona(false);
    setSelectedTestosteronaTotal(false);
    setSelected17OHProgesterona(false);
    setSelectedEstrona(false);
    
    // Reset Endocrino add-on
    setSelectedEstradiolEndocrino(false);
    setSelectedProlactinaEndocrino(false);
    setSelectedLHEndocrino(false);
    setSelectedFSHEndocrino(false);
    setSelectedVSGEndocrino(false);
    setSelectedVitaminaD125OHEndocrino(false);
    setSelectedIGF1Endocrino(false);
    setSelectedIGFBP3Endocrino(false);
    setSelectedACTHEndocrino(false);
    
    // Reset Cardiovascular add-on
    setSelectedLDHCardiovascular(false);
    setSelectedAcidoLacticoCardiovascular(false);
    setSelectedCKMBCardiovascular(false);
    setSelectedCPKTotalCardiovascular(false);
    setSelectedLDLDirectoCardiovascular(false);
    setSelectedVLDLCardiovascular(false);
    setSelectedLpACardiovascular(false);
    setSelectedCistatinaCardiovascular(false);
    
    // Reset Antioxidantes add-on
    setSelectedRetinol(false);
    setSelectedAlfaTocoferol(false);
    setSelectedGammaTocoferol(false);
    setSelectedBetaCaroteno(false);
    setSelectedCoenzimaQ10(false);
    
    // Reset IV Nutrients add-on
    setSelectedCromoIVNutrients(false);
    setSelectedCobreIVNutrients(false);
    setSelectedOsmolalidadIVNutrients(false);
    setSelectedVitaminaK1IVNutrients(false);
    setSelectedVitaminaCIVNutrients(false);
    
    // Reset Heavy Metals add-on
    setSelectedMercurioHeavyMetals(false);
    setSelectedPlomoHeavyMetals(false);
    setSelectedArsenicoHeavyMetals(false);
    setSelectedCadmioHeavyMetals(false);
    
    // Reset Oxidative Cell add-on
    setSelectedGlutationReductasa(false);
    setSelectedGlutationPeroxidasa(false);
    setSelectedG6PD(false);
    setSelectedSelenio(false);
    
    // Reset Inflammation add-on
    setSelectedVSGInflammation(false);
    setSelectedIL6Inflammation(false);
    setSelectedTNFαInflammation(false);
    
    // Reset Immunity add-on
    setSelectedANAImmunity(false);
    setSelectedAntiCCPImmunity(false);
    setSelectedAntiTiroglobulinaImmunity(false);
    setSelectedAntiTPOImmunity(false);
    setSelectedFactorReumatoideImmunity(false);
    setSelectedHelicobacterImmunity(false);
    
    // Reset Digestion add-on
    setSelectedOmega3Digestivo(false);
    setSelectedLipasaDigestivo(false);
    setSelectedAmilasaDigestivo(false);
    setSelectedBilirrubinaDirectaDigestivo(false);
    
    // Reset Gut Gate add-on
    setSelectedParasitosGutGate(false);
    setSelectedIntolerancia(false);
    setSelectedMicrobiomaGutGate(false);
    setSelectedMetabolomaGutGate(false);
    
    // Reset Bone Mineral add-on
    setSelectedCalcitriolBoneMineral(false);
    setSelectedALPOseaBoneMineral(false);
    setSelectedCTXBoneMineral(false);
    setSelectedCalcioIonicoBoneMineral(false);
    
    // Reset Coagulation add-on
    setSelectedFibrinogenoCoagulation(false);
    setSelectedAPTTCoagulation(false);
    setSelectedINRCoagulation(false);
    
    // Reset BioAge add-on
    setSelectedMyEpiAgeingBioAge(false);
    setSelectedLongitudTelomericaBioAge(false);
    setSelectedEspermiogramaBioAge(false);
    setSelectedAMHBioAge(false);
    
    // Reset Cancer add-on
    setSelectedSangreOcultaCancer(false);
    setSelectedUrinalisisCancer(false);
    setSelectedCEACancer(false);
    setSelectedCA125Cancer(false);
    setSelectedCA153Cancer(false);
    setSelectedCA199Cancer(false);
    setSelectedSCCCancer(false);
    setSelectedProteina100Cancer(false);
    setSelectedNSECancer(false);
    setSelectedCYFRA21Cancer(false);
    setSelectedCA724Cancer(false);
    setSelectedAFPCancer(false);
    setSelectedProGRPCancer(false);
    setSelectedBetaHCGCancer(false);
    setSelectedPSATotalCancer(false);
    setSelectedPSALibreCancer(false);
    setSelectedHE4Cancer(false);
    
    // Reset Genome add-on
    setSelectedMyPharmaGenome(false);
    setSelectedMyDetoxGenome(false);
    setSelectedMyDietGenome(false);
    setSelectedMyAgeingGenome(false);
    setSelectedMySuplementsGenome(false);
    
    // Reset otros biomarcadores básicos
    setSelectedLpA(false);
    setSelectedMetaboloma(false);
    
    console.log('🔄 Todos los biomarcadores han sido reseteados');
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    // NUEVO: Resetear todos los biomarcadores seleccionados al cambiar género
    resetAllSelectedBiomarkers();
    // Cerrar biomarcadores expandidos
    setExpandedBiomarkers([]);
    console.log(`👤 Género cambiado a: ${gender} - Biomarcadores reseteados`);
  };

  const handleProfileSelection = (profile) => {
    setSelectedProfile(profile);
    // NUEVO: Resetear todos los biomarcadores seleccionados al cambiar perfil
    resetAllSelectedBiomarkers();
    // Cerrar biomarcadores expandidos al cambiar perfil
    setExpandedBiomarkers([]);
    console.log(`📊 Perfil cambiado a: ${profile} - Biomarcadores reseteados`);
  };

  // Función para obtener datos del perfil seleccionado
  const getSelectedProfileData = () => {
    switch(selectedProfile) {
      case 'essential':
        return {
          name: t('systems.analysisProfiles.essential.title'),
          description: t('systems.essentialDescription'),
          biomarkers: essentialData.biomarkers,
          testCount: essentialData.testCount,
          features: getEssentialFeatures(),
          price: `${essentialData.precio}€`, // Precio Prevenii (nuestro precio de venta)
          pvp: `${essentialData.pvp}€` // Precio Market (PVP/precio referencial)
        };
      case 'performance':
        return {
          name: t('systems.analysisProfiles.performance.title'),
          description: t('systems.analysisProfiles.performance.description'),
          biomarkers: performanceData.biomarkers,
          testCount: performanceData.testCount,
          features: (() => {
            const translatedFeatures = t('systems.analysisProfiles.performance.features');
            return Array.isArray(translatedFeatures) ? translatedFeatures : [
              "Todo lo incluido en Essential",
              "Biomarcadores de rendimiento deportivo",
              "Marcadores de recuperación muscular", 
              "Perfil energético y metabólico",
              "Hormonas específicas para atletas",
              "Evaluación de estrés físico",
              "Marcadores de hidratación",
              "Biomarcadores de fatiga"
            ];
          })(),
          price: `${performanceData.precio}€`,
          pvp: `${performanceData.pvp}€`
        };
      case 'core':
        return {
          name: t('systems.analysisProfiles.core.title'),
          description: t('systems.analysisProfiles.core.description'),
          biomarkers: coreData.biomarkers,
          testCount: coreData.testCount,
          features: (() => {
            const translatedFeatures = t('systems.analysisProfiles.core.features');
            return Array.isArray(translatedFeatures) ? translatedFeatures : [
              "Todo lo incluido en Essential",
              "Perfil cardiovascular avanzado",
              "Hormonas completas (hombre/mujer)",
              "Marcadores inflamatorios específicos", 
              "Estrés oxidativo y antioxidantes",
              "Evaluación nutricional detallada",
              "Marcadores tumorales básicos",
              "Biomarcadores de envejecimiento"
            ];
          })(),
          price: `${coreData.precio}€`,
          pvp: `${coreData.pvp}€`
        };
      case 'advanced':
        return {
          name: t('systems.analysisProfiles.advanced.title'),
          description: t('systems.analysisProfiles.advanced.description'),
          biomarkers: advancedData.biomarkers,
          testCount: advancedData.testCount,
          features: (() => {
            const translatedFeatures = t('systems.analysisProfiles.advanced.features');
            return Array.isArray(translatedFeatures) ? translatedFeatures : [
              "Todo lo incluido en Core",
              "Panel completo de metales pesados",
              "Análisis de microbioma intestinal",
              "Marcadores tumorales ampliados",
              "Evaluación de longevidad avanzada",
              "Perfil de coagulación completo",
              "Biomarcadores de fertilidad",
              "Assessment de estrés oxidativo completo"
            ];
          })(),
          price: `${advancedData.precio}€`,
          pvp: `${advancedData.pvp}€`
        };
      default:
        return {
          name: t('systems.analysisProfiles.essential.title'),
          description: t('systems.essentialDescription'),
          biomarkers: essentialData.biomarkers,
          testCount: essentialData.testCount,
          features: getEssentialFeatures(),
          price: `${essentialData.precio}€`,
          pvp: `${essentialData.pvp}€`
        };
    }
  };

  // Función para toggle de Intolerancia Alimentaria
  const toggleIntoleranciaSelection = () => {
    setSelectedIntolerancia(prev => !prev);
  };

  // Función para toggle de Metaboloma (orina/heces)
  const toggleMetabolomaSelection = () => {
    setSelectedMetaboloma(prev => !prev);
  };



  // Función para toggle de Lp(a) *
  const toggleLpASelection = () => {
    setSelectedLpA(prev => !prev);
  };



  // Función para toggle de Ácidos grasos %




  // Función para toggle de Helicobacter pylori


  // Funciones para toggle de biomarcadores del add-on Endocrino
  // Funciones toggle para Hormonas
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

  // Nuevas funciones toggle para biomarcadores de Hormonas faltantes
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

  // Funciones toggle para biomarcadores femeninos de Hormonas
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

  // Funciones toggle para Endocrino
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

  // Nuevas funciones toggle para biomarcadores de Endocrino faltantes
  const toggleIGF1EndocrinoSelection = () => {
    setSelectedIGF1Endocrino(prev => !prev);
  };

  const toggleIGFBP3EndocrinoSelection = () => {
    setSelectedIGFBP3Endocrino(prev => !prev);
  };

  const toggleACTHEndocrinoSelection = () => {
    setSelectedACTHEndocrino(prev => !prev);
  };

  // Funciones toggle para Vitamina C específicas
  const toggleVitaminaCOxidativeCellSelection = () => {
    setSelectedVitaminaCOxidativeCell(prev => !prev);
  };

  const toggleVitaminaCIVNutrientsSelection = () => {
    setSelectedVitaminaCIVNutrients(prev => !prev);
  };

  // Funciones toggle para IV & Nutrientes
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

  // Funciones toggle para Metales Pesados
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

  // Funciones toggle para Inmunidad
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

  // Funciones para toggle de biomarcadores del add-on Gut Gate
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

  // Funciones para toggle de biomarcadores del add-on Bone Mineral
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

  // Funciones para toggle de biomarcadores del add-on Coagulation
  const toggleFibrinogenoCoagulationSelection = () => {
    setSelectedFibrinogenoCoagulation(prev => !prev);
  };

  const toggleAPTTCoagulationSelection = () => {
    setSelectedAPTTCoagulation(prev => !prev);
  };

  const toggleINRCoagulationSelection = () => {
    setSelectedINRCoagulation(prev => !prev);
  };

  // Funciones para toggle de biomarcadores del add-on BioAge
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

  // Funciones para toggle de biomarcadores del add-on Cancer
  // Biomarcadores comunes
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

  // Biomarcadores específicos masculinos
  const togglePSATotalCancerSelection = () => {
    setSelectedPSATotalCancer(prev => !prev);
  };

  const togglePSALibreCancerSelection = () => {
    setSelectedPSALibreCancer(prev => !prev);
  };

  // Biomarcadores específicos femeninos
  const toggleHE4CancerSelection = () => {
    setSelectedHE4Cancer(prev => !prev);
  };

  // Funciones toggle para Genome
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

  // Funciones toggle para Digestivo específicas - biomarcadores reales
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

  // Funciones toggle para Antioxidantes
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

  // Funciones toggle para Estrés Oxidativo
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

  // Funciones toggle para Inflamación
  const toggleVSGInflammationSelection = () => {
    setSelectedVSGInflammation(prev => !prev);
  };

  const toggleIL6InflammationSelection = () => {
    setSelectedIL6Inflammation(prev => !prev);
  };

  const toggleTNFαInflammationSelection = () => {
    setSelectedTNFαInflammation(prev => !prev);
  };

  // Funciones toggle para Cardiovascular
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

  // Función para mostrar/ocultar Add-Ons
  const toggleAddOnsView = () => {
    setShowAddOns(prev => !prev);
    // Si se ocultan los add-ons, cerrar también cualquier biomarcador expandido
    if (showAddOns) {
      setExpandedBiomarkers([]);
    }
  };



  // Función para verificar si un Add-On tiene diferencias por género
  const hasGenderDifferences = (addOnId) => {
    const genderSpecificAddOns = ['hormonas', 'cancer', 'bioage'];
    return genderSpecificAddOns.includes(addOnId);
  };

  // Función para obtener el indicador visual de género
  const getGenderIndicator = (addOnId, gender) => {
    if (!hasGenderDifferences(addOnId)) return null;
    
    return null;
  };

  const BiomarkerCard = ({ biomarker, index, addOnId }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isIntolerancia = biomarker.name === "Intolerancia Alimentaria 200";
    const isMetaboloma = biomarker.name === "Metaboloma (orina/heces)";
    // Identificadores específicos para Genome basados en códigos
    const isMyPharmaGenome = biomarker.code === "OG002" && addOnId === "genome";
    const isMyDetoxGenome = biomarker.code === "OG003" && addOnId === "genome";
    const isMyDietGenome = biomarker.code === "OG004" && addOnId === "genome";
    const isMyAgeingGenome = biomarker.code === "OG005" && addOnId === "genome";
    const isMySuplementsGenome = biomarker.code === "OG006" && addOnId === "genome";
    const isLpA = biomarker.name === "Lp(a) *";




    const isEstradiol = biomarker.name === "Estradiol";
    const isProlactina = biomarker.name === "Prolactina";
    const isLH = biomarker.name === "LH";
    const isFSH = biomarker.name === "FSH";
    const isVSG = biomarker.name === "VSG";
    const isVitaminaD125OH = biomarker.name === "Vitamina D 1,25-OH";
    
    // Nuevos biomarcadores faltantes de Hormonas
    const isHormonaCrecimiento = biomarker.name === "Hormona de crecimiento (hGH)";
    const isTestosteronaBiodisp = biomarker.name === "Testosterona biodisp.";
    const isTestosteronaLibre = biomarker.name === "Testosterona libre";
    const isDHT = biomarker.name === "DHT";
    
    // Biomarcadores de Endocrino
    const isIGF1 = biomarker.name === "IGF-1";
    const isIGFBP3 = biomarker.name === "IGFBP-3";
    const isACTH = biomarker.name === "ACTH";
    
    // Biomarcadores específicos femeninos
    const isProgesterona = biomarker.name === "Progesterona";
    const isTestosteronaTotal = biomarker.name === "Testosterona total";
    const is17OHProgesterona = biomarker.name === "17-OH-Progesterona";
    const isEstrona = biomarker.name === "Estrona";
    
    // Biomarcadores de Antioxidantes (usando códigos)
    const isRetinol = biomarker.code === "T0811";
    const isAlfaTocoferol = biomarker.code === "T1191";
    const isGammaTocoferol = biomarker.code === "T2841";
    const isBetaCaroteno = biomarker.code === "T1200";
    const isCoenzimaQ10 = biomarker.code === "T2830";

    // Biomarcadores de Estrés Oxidativo (usando códigos)
    const isGlutationReductasa = biomarker.code === "B7121";
    const isGlutationPeroxidasa = biomarker.code === "B3015";
    const isG6PD = biomarker.code === "B3041";
    const isSelenio = biomarker.code === "T3920";

    // Biomarcadores de Inflamación (usando códigos)
    const isVSGInflammation = biomarker.code === "H0020" && addOnId === "inflammation";
    const isIL6Inflammation = biomarker.code === "B7790" && addOnId === "inflammation";
    const isTNFαInflammation = biomarker.code === "I2081" && addOnId === "inflammation";

    // Biomarcadores de Cardiovascular (usando códigos)
    const isLDHCardiovascular = biomarker.code === "B0110" && addOnId === "cardiovascular";
    const isAcidoLacticoCardiovascular = biomarker.code === "B0750" && addOnId === "cardiovascular";
    const isCKMBCardiovascular = biomarker.code === "B2120" && addOnId === "cardiovascular";
    const isCPKTotalCardiovascular = biomarker.code === "B0220" && addOnId === "cardiovascular";
    const isLDLDirectoCardiovascular = biomarker.code === "B1900" && addOnId === "cardiovascular";
    const isVLDLCardiovascular = biomarker.code === "B0190" && addOnId === "cardiovascular";
    const isLpACardiovascular = biomarker.code === "B7700" && addOnId === "cardiovascular";
    const isCistatinaCardiovascular = biomarker.code === "I5047" && addOnId === "cardiovascular";
    
    // Estados específicos por add-on para biomarcadores compartidos
    const isEstradiolHormonas = isEstradiol && addOnId === "hormonas";
    const isProlactinaHormonas = isProlactina && addOnId === "hormonas";
    const isLHHormonas = isLH && addOnId === "hormonas";
    const isFSHHormonas = isFSH && addOnId === "hormonas";
    
    // Nuevos estados específicos para Hormonas
    const isHormonaCrecimientoHormonas = isHormonaCrecimiento && addOnId === "hormonas";
    const isTestosteronaBiodispHormonas = isTestosteronaBiodisp && addOnId === "hormonas";
    const isTestosteronaLibreHormonas = isTestosteronaLibre && addOnId === "hormonas";
    const isDHTHormonas = isDHT && addOnId === "hormonas";
    
    const isEstradiolEndocrino = isEstradiol && addOnId === "endocrino";
    const isProlactinaEndocrino = isProlactina && addOnId === "endocrino";
    const isLHEndocrino = isLH && addOnId === "endocrino";
    const isFSHEndocrino = isFSH && addOnId === "endocrino";
    const isVSGEndocrino = isVSG && addOnId === "endocrino";
    const isVitaminaD125OHEndocrino = isVitaminaD125OH && addOnId === "endocrino";
    
    // Estados específicos para Endocrino
    const isIGF1Endocrino = isIGF1 && addOnId === "endocrino";
    const isIGFBP3Endocrino = isIGFBP3 && addOnId === "endocrino";
    const isACTHEndocrino = isACTH && addOnId === "endocrino";
    
    // const isFSHCancer = isFSH && addOnId === "cancer"; // No usado
    
    const isVitaminaCOxidativeCell = biomarker.name === "Vitamina C" && addOnId === "oxidative_cell";
    const isVitaminaCIVNutrients = biomarker.name === "Vitamina C" && addOnId === "iv_nutrients";
    
    // Identificadores específicos para IV & Nutrientes basados en códigos
    const isCromoIVNutrients = biomarker.code === "T0500" && addOnId === "iv_nutrients";
    const isCobreIVNutrients = biomarker.code === "B8060" && addOnId === "iv_nutrients";
    const isOsmolalidadIVNutrients = biomarker.code === "B0270" && addOnId === "iv_nutrients";
    const isVitaminaK1IVNutrients = biomarker.code === "T1720" && addOnId === "iv_nutrients";
    
    // Identificadores específicos para Metales Pesados basados en códigos
    const isMercurioHeavyMetals = biomarker.code === "T0302" && addOnId === "metals";
    const isPlomoHeavyMetals = biomarker.code === "T0150" && addOnId === "metals";
    const isArsenicoHeavyMetals = biomarker.code === "T0960" && addOnId === "metals";
    const isCadmioHeavyMetals = biomarker.code === "T0480" && addOnId === "metals";
    
    // Identificadores específicos para Inmunidad basados en códigos
    const isANAImmunity = biomarker.code === "I0141" && addOnId === "immunity";
    const isAntiCCPImmunity = biomarker.code === "I5072" && addOnId === "immunity";
    const isAntiTiroglobulinaImmunity = biomarker.code === "B6321" && addOnId === "immunity";
    const isAntiTPOImmunity = biomarker.code === "B6300" && addOnId === "immunity";
    const isFactorReumatoideImmunity = biomarker.code === "B3130" && addOnId === "immunity";
    const isHelicobacterImmunity = biomarker.code === "B7750" && addOnId === "immunity";
    
    // Identificadores específicos para Gut Gate basados en códigos
    const isParasitosGutGate = biomarker.code === "M1190" && addOnId === "gut_gate";
    const isPanelAlimentarioGutGate = biomarker.code === "P3031" && addOnId === "gut_gate";
    const isMicrobiomaGutGate = biomarker.code === "AB001" && addOnId === "gut_gate";
    const isMetabolomaGutGate = biomarker.code === "AB002" && addOnId === "gut_gate";
    
    // Identificadores específicos para Bone Mineral basados en códigos
    const isCalcitriolBoneMineral = biomarker.code === "D0560" && addOnId === "bone_mineral";
    const isALPOseaBoneMineral = biomarker.code === "D1111" && addOnId === "bone_mineral";
    const isCTXBoneMineral = biomarker.code === "I3291" && addOnId === "bone_mineral";
    const isCalcioIonicoBoneMineral = biomarker.code === "T1572" && addOnId === "bone_mineral";
    
    // Identificadores específicos para Coagulation basados en códigos
    const isFibrinogenoCoagulation = biomarker.code === "H0050" && addOnId === "coagulation";
    const isAPTTCoagulation = biomarker.code === "H0850" && addOnId === "coagulation";
    const isINRCoagulation = biomarker.code === "H0860" && addOnId === "coagulation";
    
    // Identificadores específicos para Cancer basados en códigos
    const isSangreOcultaCancer = biomarker.code === "M0010" && addOnId === "cancer";
    const isUrinalisisCancer = biomarker.code === "6897" && addOnId === "cancer";
    const isCEACancer = biomarker.code === "B5110" && addOnId === "cancer";
    const isCA125Cancer = biomarker.code === "B5080" && addOnId === "cancer";
    const isCA153Cancer = biomarker.code === "B5090" && addOnId === "cancer";
    const isCA199Cancer = biomarker.code === "B5100" && addOnId === "cancer";
    const isSCCCancer = biomarker.code === "B8130" && addOnId === "cancer";
    const isProteina100Cancer = biomarker.code === "I5080" && addOnId === "cancer";
    const isNSECancer = biomarker.code === "I5090" && addOnId === "cancer";
    const isCYFRA21Cancer = biomarker.code === "B8120" && addOnId === "cancer";
    const isCA724Cancer = biomarker.code === "D1271" && addOnId === "cancer";
    const isAFPCancer = biomarker.code === "B7900" && addOnId === "cancer";
    const isProGRPCancer = biomarker.code === "B8160" && addOnId === "cancer";
    const isBetaHCGCancer = biomarker.code === "D1760" && addOnId === "cancer";
    const isPSATotalCancer = biomarker.code === "B5830" && addOnId === "cancer";
    const isPSALibreCancer = biomarker.code === "B5840" && addOnId === "cancer";
    const isHE4Cancer = biomarker.code === "B8110" && addOnId === "cancer";
    
    // Identificadores específicos para BioAge basados en códigos
    const isMyEpiAgeingBioAge = biomarker.code === "OG001" && addOnId === "bioage";
    const isLongitudTelomericaBioAge = biomarker.code === "G1465" && addOnId === "bioage";
    const isEspermiogramaBioAge = biomarker.code === "B3340" && addOnId === "bioage";
    const isAMHBioAge = biomarker.code === "D1001" && addOnId === "bioage";
    
    // Identificadores específicos para Digestion basados en códigos
    const isOmega3Digestivo = biomarker.code === "T2590" && addOnId === "digestion";
    const isLipasaDigestivo = biomarker.code === "B1980" && addOnId === "digestion";
    const isAmilasaDigestivo = biomarker.code === "B0350" && addOnId === "digestion";
    const isBilirrubinaDirectaDigestivo = biomarker.code === "B0260" && addOnId === "digestion";

    // Helper function para determinar si un biomarcador está seleccionado
    const isBiomarkerSelected = () => {
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
             (isCromoIVNutrients && selectedCromoIVNutrients) ||
             (isCobreIVNutrients && selectedCobreIVNutrients) ||
             (isOsmolalidadIVNutrients && selectedOsmolalidadIVNutrients) ||
             (isVitaminaK1IVNutrients && selectedVitaminaK1IVNutrients) ||
             (isMercurioHeavyMetals && selectedMercurioHeavyMetals) ||
             (isPlomoHeavyMetals && selectedPlomoHeavyMetals) ||
             (isArsenicoHeavyMetals && selectedArsenicoHeavyMetals) ||
             (isCadmioHeavyMetals && selectedCadmioHeavyMetals) ||
             (isANAImmunity && selectedANAImmunity) ||
             (isAntiCCPImmunity && selectedAntiCCPImmunity) ||
             (isAntiTiroglobulinaImmunity && selectedAntiTiroglobulinaImmunity) ||
             (isAntiTPOImmunity && selectedAntiTPOImmunity) ||
             (isFactorReumatoideImmunity && selectedFactorReumatoideImmunity) ||
             (isHelicobacterImmunity && selectedHelicobacterImmunity) ||
             (isParasitosGutGate && selectedParasitosGutGate) ||
             (isPanelAlimentarioGutGate && selectedPanelAlimentarioGutGate) ||
             (isMicrobiomaGutGate && selectedMicrobiomaGutGate) ||
             (isMetabolomaGutGate && selectedMetabolomaGutGate) ||
             (isCalcitriolBoneMineral && selectedCalcitriolBoneMineral) ||
             (isALPOseaBoneMineral && selectedALPOseaBoneMineral) ||
             (isCTXBoneMineral && selectedCTXBoneMineral) ||
             (isCalcioIonicoBoneMineral && selectedCalcioIonicoBoneMineral) ||
             (isFibrinogenoCoagulation && selectedFibrinogenoCoagulation) ||
             (isAPTTCoagulation && selectedAPTTCoagulation) ||
             (isINRCoagulation && selectedINRCoagulation) ||
             (isSangreOcultaCancer && selectedSangreOcultaCancer) ||
             (isUrinalisisCancer && selectedUrinalisisCancer) ||
             (isCEACancer && selectedCEACancer) ||
             (isCA125Cancer && selectedCA125Cancer) ||
             (isCA153Cancer && selectedCA153Cancer) ||
             (isCA199Cancer && selectedCA199Cancer) ||
             (isSCCCancer && selectedSCCCancer) ||
             (isProteina100Cancer && selectedProteina100Cancer) ||
             (isNSECancer && selectedNSECancer) ||
             (isCYFRA21Cancer && selectedCYFRA21Cancer) ||
             (isCA724Cancer && selectedCA724Cancer) ||
             (isAFPCancer && selectedAFPCancer) ||
             (isProGRPCancer && selectedProGRPCancer) ||
             (isBetaHCGCancer && selectedBetaHCGCancer) ||
             (isPSATotalCancer && selectedPSATotalCancer) ||
             (isPSALibreCancer && selectedPSALibreCancer) ||
             (isHE4Cancer && selectedHE4Cancer) ||
             (isOmega3Digestivo && selectedOmega3Digestivo) || 
             (isLipasaDigestivo && selectedLipasaDigestivo) ||
             (isAmilasaDigestivo && selectedAmilasaDigestivo) ||
             (isBilirrubinaDirectaDigestivo && selectedBilirrubinaDirectaDigestivo) ||
             (isProgesterona && selectedProgesterona) ||
             (isTestosteronaTotal && selectedTestosteronaTotal) ||
             (is17OHProgesterona && selected17OHProgesterona) ||
             (isEstrona && selectedEstrona) ||
             (isRetinol && selectedRetinol) ||
             (isAlfaTocoferol && selectedAlfaTocoferol) ||
             (isGammaTocoferol && selectedGammaTocoferol) ||
             (isBetaCaroteno && selectedBetaCaroteno) ||
             (isCoenzimaQ10 && selectedCoenzimaQ10) ||
             (isGlutationReductasa && selectedGlutationReductasa) ||
             (isGlutationPeroxidasa && selectedGlutationPeroxidasa) ||
             (isG6PD && selectedG6PD) ||
             (isSelenio && selectedSelenio) ||
             (isVSGInflammation && selectedVSGInflammation) ||
             (isIL6Inflammation && selectedIL6Inflammation) ||
             (isTNFαInflammation && selectedTNFαInflammation) ||
             (isLDHCardiovascular && selectedLDHCardiovascular) ||
             (isAcidoLacticoCardiovascular && selectedAcidoLacticoCardiovascular) ||
             (isCKMBCardiovascular && selectedCKMBCardiovascular) ||
             (isCPKTotalCardiovascular && selectedCPKTotalCardiovascular) ||
             (isLDLDirectoCardiovascular && selectedLDLDirectoCardiovascular) ||
             (isVLDLCardiovascular && selectedVLDLCardiovascular) ||
             (isLpACardiovascular && selectedLpACardiovascular) ||
             (isCistatinaCardiovascular && selectedCistatinaCardiovascular) ||
             (isMyEpiAgeingBioAge && selectedMyEpiAgeingBioAge) ||
             (isLongitudTelomericaBioAge && selectedLongitudTelomericaBioAge) ||
             (isEspermiogramaBioAge && selectedEspermiogramaBioAge) ||
             (isAMHBioAge && selectedAMHBioAge);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 }}
        className={`
          border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all
          ${isBiomarkerSelected()
            ? 'border-earth bg-earth-50 hover:border-warm' 
            : 'border-cream bg-warm-white hover:border-earth'
          }
        `}
      >
        <div 
          className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-earth-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-3 h-3 gradient-earth rounded-full flex-shrink-0"></div>
            
            {/* Selector específico para Intolerancia Alimentaria - Lado Izquierdo - SOLO en add-ons */}
            {isIntolerancia && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleIntoleranciaSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedIntolerancia
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedIntolerancia ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedIntolerancia ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}
            
            {/* Selector específico para Metaboloma (orina/heces) - Lado Izquierdo - SOLO en add-ons */}
            {isMetaboloma && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMetabolomaSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMetaboloma
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMetaboloma ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMetaboloma ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}
            


            {/* Selectores específicos para Genome basados en códigos */}
            {isMyPharmaGenome && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyPharmaGenomeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyPharmaGenome
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyPharmaGenome ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyPharmaGenome ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMyDetoxGenome && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyDetoxGenomeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyDetoxGenome
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyDetoxGenome ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyDetoxGenome ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMyDietGenome && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyDietGenomeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyDietGenome
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyDietGenome ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyDietGenome ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMyAgeingGenome && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyAgeingGenomeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyAgeingGenome
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyAgeingGenome ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyAgeingGenome ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMySuplementsGenome && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMySuplementsGenomeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMySuplementsGenome
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMySuplementsGenome ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMySuplementsGenome ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Lp(a) * - SOLO en add-ons */}
            {isLpA && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLpASelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLpA
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLpA ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLpA ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}







            {/* Selector específico para Ácidos grasos % - SOLO en add-ons */}





            {/* Selector específico para Estradiol en Hormonas */}
            {isEstradiolHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEstradiolHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedEstradiolHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedEstradiolHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedEstradiolHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Estradiol en Endocrino */}
            {isEstradiolEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEstradiolEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedEstradiolEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedEstradiolEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedEstradiolEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Prolactina en Hormonas */}
            {isProlactinaHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProlactinaHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedProlactinaHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedProlactinaHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedProlactinaHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Prolactina en Endocrino */}
            {isProlactinaEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProlactinaEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedProlactinaEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedProlactinaEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedProlactinaEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para LH en Hormonas */}
            {isLHHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLHHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLHHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLHHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLHHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para LH en Endocrino */}
            {isLHEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLHEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLHEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLHEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLHEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para FSH en Hormonas */}
            {isFSHHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFSHHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedFSHHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedFSHHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedFSHHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para FSH en Endocrino */}
            {isFSHEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFSHEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedFSHEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedFSHEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedFSHEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Vitamina C en Estrés Oxidativo */}
            {isVitaminaCOxidativeCell && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVitaminaCOxidativeCellSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVitaminaCOxidativeCell
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVitaminaCOxidativeCell ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVitaminaCOxidativeCell ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Vitamina C en IV & Nutrientes */}
            {isVitaminaCIVNutrients && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVitaminaCIVNutrientsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVitaminaCIVNutrients
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVitaminaCIVNutrients ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVitaminaCIVNutrients ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Cromo en IV & Nutrientes */}
            {isCromoIVNutrients && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCromoIVNutrientsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCromoIVNutrients
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCromoIVNutrients ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCromoIVNutrients ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Cobre en IV & Nutrientes */}
            {isCobreIVNutrients && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCobreIVNutrientsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCobreIVNutrients
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCobreIVNutrients ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCobreIVNutrients ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Osmolalidad sérica en IV & Nutrientes */}
            {isOsmolalidadIVNutrients && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOsmolalidadIVNutrientsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedOsmolalidadIVNutrients
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedOsmolalidadIVNutrients ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedOsmolalidadIVNutrients ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Vitamina K1 en IV & Nutrientes */}
            {isVitaminaK1IVNutrients && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVitaminaK1IVNutrientsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVitaminaK1IVNutrients
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVitaminaK1IVNutrients ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVitaminaK1IVNutrients ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores específicos para Metales Pesados */}
            {isMercurioHeavyMetals && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMercurioHeavyMetalsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMercurioHeavyMetals
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMercurioHeavyMetals ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMercurioHeavyMetals ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isPlomoHeavyMetals && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlomoHeavyMetalsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedPlomoHeavyMetals
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedPlomoHeavyMetals ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedPlomoHeavyMetals ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isArsenicoHeavyMetals && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleArsenicoHeavyMetalsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedArsenicoHeavyMetals
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedArsenicoHeavyMetals ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedArsenicoHeavyMetals ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isCadmioHeavyMetals && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCadmioHeavyMetalsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCadmioHeavyMetals
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCadmioHeavyMetals ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCadmioHeavyMetals ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores específicos para Inmunidad */}
            {isANAImmunity && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleANAImmunitySelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedANAImmunity
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedANAImmunity ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedANAImmunity ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isAntiCCPImmunity && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAntiCCPImmunitySelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAntiCCPImmunity
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAntiCCPImmunity ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAntiCCPImmunity ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isAntiTiroglobulinaImmunity && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAntiTiroglobulinaImmunitySelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAntiTiroglobulinaImmunity
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAntiTiroglobulinaImmunity ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAntiTiroglobulinaImmunity ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isAntiTPOImmunity && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAntiTPOImmunitySelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAntiTPOImmunity
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAntiTPOImmunity ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAntiTPOImmunity ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isFactorReumatoideImmunity && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFactorReumatoideImmunitySelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedFactorReumatoideImmunity
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedFactorReumatoideImmunity ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedFactorReumatoideImmunity ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isHelicobacterImmunity && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleHelicobacterImmunitySelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedHelicobacterImmunity
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedHelicobacterImmunity ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedHelicobacterImmunity ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Parásitos en heces en Gut Gate */}
            {isParasitosGutGate && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleParasitosGutGateSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedParasitosGutGate
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedParasitosGutGate ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedParasitosGutGate ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Intolerancia alimentaria IgG en Gut Gate */}
            {isPanelAlimentarioGutGate && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePanelAlimentarioGutGateSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedPanelAlimentarioGutGate
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedPanelAlimentarioGutGate ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedPanelAlimentarioGutGate ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Microbioma intestinal en Gut Gate */}
            {isMicrobiomaGutGate && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMicrobiomaGutGateSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMicrobiomaGutGate
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMicrobiomaGutGate ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMicrobiomaGutGate ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Metaboloma en Gut Gate */}
            {isMetabolomaGutGate && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMetabolomaGutGateSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMetabolomaGutGate
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMetabolomaGutGate ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMetabolomaGutGate ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Calcitriol (Vit D [1,25-OH]) en Bone Mineral */}
            {isCalcitriolBoneMineral && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCalcitriolBoneMineralSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCalcitriolBoneMineral
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCalcitriolBoneMineral ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCalcitriolBoneMineral ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para ALP ósea en Bone Mineral */}
            {isALPOseaBoneMineral && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleALPOseaBoneMineralSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedALPOseaBoneMineral
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedALPOseaBoneMineral ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedALPOseaBoneMineral ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para CTX en Bone Mineral */}
            {isCTXBoneMineral && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCTXBoneMineralSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCTXBoneMineral
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCTXBoneMineral ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCTXBoneMineral ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Calcio iónico en Bone Mineral */}
            {isCalcioIonicoBoneMineral && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCalcioIonicoBoneMineralSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCalcioIonicoBoneMineral
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCalcioIonicoBoneMineral ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCalcioIonicoBoneMineral ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Fibrinógeno en Coagulation */}
            {isFibrinogenoCoagulation && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFibrinogenoCoagulationSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedFibrinogenoCoagulation
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedFibrinogenoCoagulation ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedFibrinogenoCoagulation ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Cefalina-APTT en Coagulation */}
            {isAPTTCoagulation && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAPTTCoagulationSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAPTTCoagulation
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAPTTCoagulation ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAPTTCoagulation ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para INR (Protrombina) en Coagulation */}
            {isINRCoagulation && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleINRCoagulationSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedINRCoagulation
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedINRCoagulation ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedINRCoagulation ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores específicos para Cancer - Biomarcadores comunes */}
            {/* Selector específico para Sangre oculta en heces en Cancer */}
            {isSangreOcultaCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSangreOcultaCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedSangreOcultaCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedSangreOcultaCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedSangreOcultaCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Urianálisis + sedimento en Cancer */}
            {isUrinalisisCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUrinalisisCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedUrinalisisCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedUrinalisisCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedUrinalisisCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para CEA en Cancer */}
            {isCEACancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCEACancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCEACancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCEACancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCEACancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para CA 125 en Cancer */}
            {isCA125Cancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCA125CancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCA125Cancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCA125Cancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCA125Cancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para CA 15.3 en Cancer */}
            {isCA153Cancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCA153CancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCA153Cancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCA153Cancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCA153Cancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para CA 19-9 en Cancer */}
            {isCA199Cancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCA199CancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCA199Cancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCA199Cancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCA199Cancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para SCC en Cancer */}
            {isSCCCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSCCCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedSCCCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedSCCCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedSCCCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Proteina s-100 en Cancer */}
            {isProteina100Cancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProteina100CancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedProteina100Cancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedProteina100Cancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedProteina100Cancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para NSE en Cancer */}
            {isNSECancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNSECancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedNSECancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedNSECancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedNSECancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para CYFRA 21-1 en Cancer */}
            {isCYFRA21Cancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCYFRA21CancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCYFRA21Cancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCYFRA21Cancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCYFRA21Cancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para CA 72-4 en Cancer */}
            {isCA724Cancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCA724CancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCA724Cancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCA724Cancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCA724Cancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Alfa-feto (AFP) en Cancer */}
            {isAFPCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAFPCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAFPCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAFPCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAFPCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para ProGRP en Cancer */}
            {isProGRPCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProGRPCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedProGRPCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedProGRPCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedProGRPCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para β-HCG en Cancer */}
            {isBetaHCGCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBetaHCGCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedBetaHCGCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedBetaHCGCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedBetaHCGCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores específicos para biomarcadores masculinos de Cancer */}
            {/* Selector específico para PSA total en Cancer */}
            {isPSATotalCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePSATotalCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedPSATotalCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedPSATotalCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedPSATotalCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para PSA libre en Cancer */}
            {isPSALibreCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePSALibreCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedPSALibreCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedPSALibreCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedPSALibreCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para HE4 en Cancer (femenino) */}
            {isHE4Cancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleHE4CancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedHE4Cancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedHE4Cancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedHE4Cancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Ácidos grasos omega-3 en Digestivo */}
            {isOmega3Digestivo && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOmega3DigestivoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedOmega3Digestivo
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedOmega3Digestivo ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedOmega3Digestivo ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Lipasa en Digestivo */}
            {isLipasaDigestivo && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLipasaDigestivoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLipasaDigestivo
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLipasaDigestivo ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLipasaDigestivo ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Amilasa en Digestivo */}
            {isAmilasaDigestivo && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAmilasaDigestivoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAmilasaDigestivo
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAmilasaDigestivo ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAmilasaDigestivo ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Bilirrubina directa en Digestivo */}
            {isBilirrubinaDirectaDigestivo && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBilirrubinaDirectaDigestivoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedBilirrubinaDirectaDigestivo
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedBilirrubinaDirectaDigestivo ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedBilirrubinaDirectaDigestivo ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para VSG en Endocrino */}
            {isVSGEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVSGEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVSGEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVSGEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVSGEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Vitamina D 1,25-OH en Endocrino */}
            {isVitaminaD125OHEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVitaminaD125OHEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVitaminaD125OHEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVitaminaD125OHEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVitaminaD125OHEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para IGF-1 en Endocrino */}
            {isIGF1Endocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleIGF1EndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedIGF1Endocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedIGF1Endocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedIGF1Endocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para IGFBP-3 en Endocrino */}
            {isIGFBP3Endocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleIGFBP3EndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedIGFBP3Endocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedIGFBP3Endocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedIGFBP3Endocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para ACTH en Endocrino */}
            {isACTHEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleACTHEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedACTHEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedACTHEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedACTHEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Hormona de crecimiento en Hormonas */}
            {isHormonaCrecimientoHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleHormonaCrecimientoHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedHormonaCrecimientoHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedHormonaCrecimientoHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedHormonaCrecimientoHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Testosterona biodisp en Hormonas */}
            {isTestosteronaBiodispHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTestosteronaBiodispHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedTestosteronaBiodispHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedTestosteronaBiodispHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedTestosteronaBiodispHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Testosterona libre en Hormonas */}
            {isTestosteronaLibreHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTestosteronaLibreHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedTestosteronaLibreHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedTestosteronaLibreHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedTestosteronaLibreHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para DHT en Hormonas */}
            {isDHTHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDHTHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedDHTHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedDHTHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedDHTHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Progesterona */}
            {isProgesterona && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProgesterona();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedProgesterona
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedProgesterona ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedProgesterona ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Testosterona total */}
            {isTestosteronaTotal && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTestosteronaTotal();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedTestosteronaTotal
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedTestosteronaTotal ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedTestosteronaTotal ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para 17-OH-Progesterona */}
            {is17OHProgesterona && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle17OHProgesterona();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selected17OHProgesterona
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selected17OHProgesterona ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selected17OHProgesterona ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Estrona */}
            {isEstrona && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEstrona();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedEstrona
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedEstrona ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedEstrona ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para FSH en Endocrino */}
            {isFSHEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFSHEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedFSHEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedFSHEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedFSHEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores para biomarcadores de BioAge */}
            {isMyEpiAgeingBioAge && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyEpiAgeingBioAgeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyEpiAgeingBioAge
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyEpiAgeingBioAge ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyEpiAgeingBioAge ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isLongitudTelomericaBioAge && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLongitudTelomericaBioAgeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLongitudTelomericaBioAge
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLongitudTelomericaBioAge ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLongitudTelomericaBioAge ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isEspermiogramaBioAge && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEspermiogramaBioAgeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedEspermiogramaBioAge
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedEspermiogramaBioAge ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedEspermiogramaBioAge ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isAMHBioAge && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAMHBioAgeSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAMHBioAge
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAMHBioAge ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAMHBioAge ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores para biomarcadores de Antioxidantes */}
            {isRetinol && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRetinolSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedRetinol
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedRetinol ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedRetinol ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isAlfaTocoferol && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAlfaTocoferolSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAlfaTocoferol
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAlfaTocoferol ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAlfaTocoferol ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isGammaTocoferol && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleGammaTocoferolSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedGammaTocoferol
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedGammaTocoferol ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedGammaTocoferol ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isBetaCaroteno && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBetaCarotenoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedBetaCaroteno
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedBetaCaroteno ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedBetaCaroteno ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isCoenzimaQ10 && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCoenzimaQ10Selection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCoenzimaQ10
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCoenzimaQ10 ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCoenzimaQ10 ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores para Estrés Oxidativo */}
            {isGlutationReductasa && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleGlutationReductasaSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedGlutationReductasa
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedGlutationReductasa ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedGlutationReductasa ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isGlutationPeroxidasa && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleGlutationPeroxidasaSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedGlutationPeroxidasa
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedGlutationPeroxidasa ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedGlutationPeroxidasa ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isG6PD && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleG6PDSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedG6PD
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedG6PD ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedG6PD ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isSelenio && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelenioSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedSelenio
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedSelenio ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedSelenio ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores para Inflamación */}
            {isVSGInflammation && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVSGInflammationSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVSGInflammation
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVSGInflammation ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVSGInflammation ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isIL6Inflammation && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleIL6InflammationSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedIL6Inflammation
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedIL6Inflammation ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedIL6Inflammation ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isTNFαInflammation && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTNFαInflammationSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedTNFαInflammation
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedTNFαInflammation ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedTNFαInflammation ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selectores para Cardiovascular */}
            {isLDHCardiovascular && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLDHCardiovascularSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLDHCardiovascular
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLDHCardiovascular ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLDHCardiovascular ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isAcidoLacticoCardiovascular && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAcidoLacticoCardiovascularSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAcidoLacticoCardiovascular
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAcidoLacticoCardiovascular ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAcidoLacticoCardiovascular ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isCKMBCardiovascular && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCKMBCardiovascularSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCKMBCardiovascular
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCKMBCardiovascular ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCKMBCardiovascular ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isCPKTotalCardiovascular && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCPKTotalCardiovascularSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCPKTotalCardiovascular
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCPKTotalCardiovascular ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCPKTotalCardiovascular ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isLDLDirectoCardiovascular && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLDLDirectoCardiovascularSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLDLDirectoCardiovascular
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLDLDirectoCardiovascular ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLDLDirectoCardiovascular ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isVLDLCardiovascular && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVLDLCardiovascularSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVLDLCardiovascular
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVLDLCardiovascular ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVLDLCardiovascular ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isLpACardiovascular && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLpACardiovascularSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLpACardiovascular
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLpACardiovascular ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLpACardiovascular ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isCistatinaCardiovascular && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCistatinaCardiovascularSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedCistatinaCardiovascular
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedCistatinaCardiovascular ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedCistatinaCardiovascular ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            
            <div className="flex-1">
              <h5 className={`font-semibold text-sm mb-1 ${isBiomarkerSelected() ? 'text-earth' : 'text-taupe'}`}>
                {t(`biomarkerNames.${biomarker.code}`, biomarker.name)}
              </h5>
              <p className="text-xs text-taupe">{t(`biomarkerCategories.${biomarker.category}`, biomarker.category)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {t(`biomarkers.${biomarker.code}.description`) && (
              <div className="bg-earth-100 p-1.5 rounded-full text-earth hover:bg-earth-200 transition-colors">
                {isExpanded ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Descripción expandible */}
        <AnimatePresence>
          {isExpanded && t(`biomarkers.${biomarker.code}.description`) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 bg-earth-50 border-t border-earth">
                <div className="p-3 mt-2">
                  <p className="text-xs text-stone leading-relaxed italic">
                    {t(`biomarkers.${biomarker.code}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section className="bg-soft-cream py-20" id="systems">
      <div className="container max-w-7xl">


        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="bg-warm-white rounded-2xl p-8 shadow-xl border-2 border-earth">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone mb-4">
              {t('systems.title')} <span className="gradient-text-earth">{t('systems.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-taupe max-w-3xl mx-auto font-medium leading-relaxed">
              {t('systems.description')}
            </p>
          </div>
        </motion.div>

        {/* Cuatro Perfiles de Análisis - Entre Header y Essential Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-4 gap-6 mb-12 items-stretch"
        >
          {/* Perfil 1: Essential */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => handleProfileSelection('essential')}
            className={`package-profile-card cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 w-full h-80 flex flex-col ${
              selectedProfile === 'essential' 
                ? 'bg-earth-100 border-earth shadow-xl ring-2 ring-earth' 
                : 'bg-warm-white border-earth hover:shadow-xl hover:border-warm'
            }`}
          >
            <div className="text-center flex-1 flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  selectedProfile === 'essential' ? 'shadow-lg' : ''
                }`}>
                  <span className="text-white text-xl font-bold">LA</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedProfile === 'essential' ? 'text-stone' : 'text-stone'
                }`}>
                  {t('systems.analysisProfiles.essential.title')}
                </h3>
                <div className={`text-2xl font-bold mb-3 ${
                  selectedProfile === 'essential' ? 'text-earth' : 'text-earth'
                }`}>
                  {t('systems.analysisProfiles.essential.highlight')}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                selectedProfile === 'essential' ? 'text-taupe' : 'text-taupe'
              }`}>
                {t('systems.analysisProfiles.essential.description')}
              </p>
            </div>
          </motion.div>

          {/* Perfil 2: Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onClick={() => handleProfileSelection('performance')}
            className={`package-profile-card cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 w-full h-80 flex flex-col ${
              selectedProfile === 'performance' 
                ? 'bg-earth-100 border-earth shadow-xl ring-2 ring-earth' 
                : 'bg-warm-white border-earth hover:shadow-xl hover:border-warm'
            }`}
          >
            <div className="text-center flex-1 flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  selectedProfile === 'performance' ? 'shadow-lg' : ''
                }`}>
                  <span className="text-white text-xl font-bold">LA</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedProfile === 'performance' ? 'text-stone' : 'text-stone'
                }`}>
                  {t('systems.analysisProfiles.performance.title')}
                </h3>
                <div className={`text-2xl font-bold mb-3 ${
                  selectedProfile === 'performance' ? 'text-earth' : 'text-earth'
                }`}>
                  {t('systems.analysisProfiles.performance.highlight')}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                selectedProfile === 'performance' ? 'text-taupe' : 'text-taupe'
              }`}>
                {t('systems.analysisProfiles.performance.description')}
              </p>
            </div>
          </motion.div>

          {/* Perfil 3: Core */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handleProfileSelection('core')}
            className={`package-profile-card cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 w-full h-80 flex flex-col ${
              selectedProfile === 'core' 
                ? 'bg-warm-100 border-warm shadow-xl ring-2 ring-warm' 
                : 'bg-warm-white border-warm hover:shadow-xl hover:border-earth'
            }`}
          >
            <div className="text-center flex-1 flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  selectedProfile === 'core' ? 'shadow-lg' : ''
                }`}>
                  <span className="text-white text-xl font-bold">LA</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedProfile === 'core' ? 'text-stone' : 'text-stone'
                }`}>
                  {t('systems.analysisProfiles.core.title')}
                </h3>
                <div className={`text-2xl font-bold mb-3 ${
                  selectedProfile === 'core' ? 'text-warm' : 'text-warm'
                }`}>
                  {t('systems.analysisProfiles.core.highlight')}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                selectedProfile === 'core' ? 'text-taupe' : 'text-taupe'
              }`}>
                {t('systems.analysisProfiles.core.description')}
              </p>
            </div>
          </motion.div>

          {/* Perfil 4: Advanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => handleProfileSelection('advanced')}
            className={`package-profile-card cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 w-full h-80 flex flex-col ${
              selectedProfile === 'advanced' 
                ? 'bg-earth-100 border-earth shadow-xl ring-2 ring-earth' 
                : 'bg-warm-white border-earth hover:shadow-xl hover:border-warm'
            }`}
          >
            <div className="text-center flex-1 flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  selectedProfile === 'advanced' ? 'shadow-lg' : ''
                }`}>
                  <span className="text-white text-xl font-bold">LA</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedProfile === 'advanced' ? 'text-stone' : 'text-stone'
                }`}>
                  {t('systems.analysisProfiles.advanced.title')}
                </h3>
                <div className={`text-2xl font-bold mb-3 ${
                  selectedProfile === 'advanced' ? 'text-earth' : 'text-earth'
                }`}>
                  {t('systems.analysisProfiles.advanced.highlight')}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                selectedProfile === 'advanced' ? 'text-taupe' : 'text-taupe'
              }`}>
                {t('systems.analysisProfiles.advanced.description')}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Essential Package - Card Principal de Doble Ancho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-warm-white rounded-2xl shadow-xl overflow-hidden border-2 border-earth w-full">
            {/* Essential Header */}
            <div className="bg-earth-50 p-6 border-b-2 border-earth">
              {/* Header con ícono, título y precio en esquina superior derecha */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 gradient-earth rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">LA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-stone">
                      {getSelectedProfileData().name}
                    </h3>
                    
                    {/* Gender Selector - Al lado del título */}
                    <div className="essential-gender-selector">
                      <button
                        onClick={() => handleGenderChange('male')}
                        className={`
                          essential-gender-button
                          ${selectedGender === 'male' 
                            ? 'bg-earth text-white shadow-sm' 
                            : 'bg-earth-50 text-earth hover:bg-earth-100'
                          }
                        `}
                      >
                        <span>♂</span>
                      </button>
                      <button
                        onClick={() => handleGenderChange('female')}
                        className={`
                          essential-gender-button
                          ${selectedGender === 'female' 
                            ? 'bg-warm text-white shadow-sm' 
                            : 'bg-warm-50 text-warm hover:bg-warm-100'
                          }
                        `}
                      >
                        <span>♀</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Precio en esquina superior derecha */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-earth">
                    {getSelectedProfileData().price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('systems.pvp')}: {getSelectedProfileData().pvp}
                  </div>
                  <div className="text-taupe text-sm font-semibold mt-1">
                    {getSelectedProfileData().testCount} {t('systems.biomarkers')}
                  </div>
                </div>
              </div>

              {/* Descripción abajo */}
              <div className="ml-22" style={{ marginRight: '224px' }}>
                <p className="text-taupe text-base leading-relaxed">
                  {getSelectedProfileData().description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 ml-22">
                {getSelectedProfileData().features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheck className="text-earth text-sm" />
                    <span className="text-taupe text-sm">{feature}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Profile Actions - Mismo estilo que Add-Ons */}
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => toggleBiomarker(selectedProfile)}
                  className="flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 border-cream hover:bg-earth-50 hover:border-earth transition-all font-medium"
                >
                  <span className="text-stone font-semibold text-sm">{t('systems.viewBiomarkers')}</span>
                  {expandedBiomarkers.includes(selectedProfile) ? (
                    <FaChevronUp className="text-taupe text-sm" />
                  ) : (
                    <FaChevronDown className="text-taupe text-sm" />
                  )}
                </button>
              </div>
            </div>

            {/* Profile Biomarkers List */}
            <AnimatePresence>
              {expandedBiomarkers.includes(selectedProfile) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-earth-50">
                    <div className="bg-warm-white rounded-xl p-6 border-2 border-earth shadow-lg">
                      <h4 className="text-lg font-bold text-stone mb-6 flex items-center gap-2 text-center justify-center">
                        {t('systems.biomarkersOf')} {getSelectedProfileData().name} ({getSelectedProfileData().testCount} {t('systems.tests')})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
                        {getSelectedProfileData().biomarkers.map((biomarker, index) => (
                          <BiomarkerCard key={biomarker.code} biomarker={biomarker} index={index} addOnId={null} />
                        ))}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Add-Ons Grid */}
        <div className="mb-8">
          <div className="bg-warm-white rounded-xl p-6 shadow-lg border-2 border-warm mb-8">
            <h3 className="text-2xl font-bold text-stone mb-3 text-center">
              {t('systems.addOnsSpecialized')}
            </h3>
            <p className="text-base text-taupe text-center max-w-2xl mx-auto">
              <span className="font-semibold text-earth">{t('systems.complementEssential')}</span> {t('systems.withSpecializedModules')}
            </p>
            <p className="text-sm text-gray-600 text-center italic mt-8 max-w-2xl mx-auto">
              <em>* {t('systems.geneticPricesDisclaimer')}</em>
            </p>
            
            {/* Botón Ver Add-Ons - Mismo estilo que ver biomarcadores */}
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <button 
                  onClick={toggleAddOnsView}
                  className="flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 border-cream hover:bg-earth-50 hover:border-earth transition-all font-medium"
                >
                  <span className="text-stone font-semibold text-sm">
                    {showAddOns 
                      ? t('systems.hideAddOns') 
                      : `Add-Ons (${getRecommendedAddOnsForSelectedProfile().length})`
                    }
                  </span>
                  {showAddOns ? (
                    <FaChevronUp className="text-taupe text-sm" />
                  ) : (
                    <FaChevronDown className="text-taupe text-sm" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Grid de Add-Ons con animación */}
          <AnimatePresence>
            {showAddOns && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-8">
                  {getRecommendedAddOnsForSelectedProfile().map((addOn, index) => (
              <motion.div
                key={addOn.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-warm-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border-2 border-cream hover:border-earth self-start"
              >
                {/* Add-On Header */}
                <div className={`${addOn.bgColor} ${addOn.borderColor} border-b p-6 relative`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-2xl text-warm">
                      <addOn.icon />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xl font-bold text-stone">
                          {t(`addOns.${addOn.id}.name`)}
                        </h4>
                        {hasGenderDifferences(addOn.id) && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warm-white border border-earth">
                            <span className="text-xs">
                              {selectedGender === 'male' ? '♂' : '♀'}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-taupe text-sm">
                        {t(`addOns.${addOn.id}.description`)}
                      </p>
                      {hasGenderDifferences(addOn.id) && (
                        <div className="mt-2">
                          {getGenderIndicator(addOn.id, selectedGender)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold text-earth">
                        {(() => {
                          // NUEVO: Obtener precios dinámicos usando el nuevo sistema
                          const selectedStates = getAllSelectedStates();
                          const addOnPricing = addOn.getPricing(selectedGender, selectedStates);
                          
                          let basePrice = 0;
                          if (addOnPricing.male && addOnPricing.female) {
                            // Add-on con diferenciación por género
                            basePrice = addOnPricing[selectedGender].price;
                          } else {
                            // Add-on sin diferenciación por género
                            basePrice = addOnPricing.price;
                          }
                          
                          // Aplicar ajustes adicionales del contexto (si los hay)
                          const adjustedPrices = getAdjustedAddOnPrice(addOn.id, basePrice, 0);
                          return `${Math.round(adjustedPrices.price)}€`;
                        })()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t('systems.pvp')}: {(() => {
                          // NUEVO: Obtener precios dinámicos usando el nuevo sistema
                          const selectedStates = getAllSelectedStates();
                          const addOnPricing = addOn.getPricing(selectedGender, selectedStates);
                          
                          let basePrice = 0;
                          let basePvp = 0;
                          if (addOnPricing.male && addOnPricing.female) {
                            // Add-on con diferenciación por género
                            basePrice = addOnPricing[selectedGender].price;
                            basePvp = addOnPricing[selectedGender].marketPrice;
                          } else {
                            // Add-on sin diferenciación por género
                            basePrice = addOnPricing.price;
                            basePvp = addOnPricing.marketPrice;
                          }
                          
                          // Aplicar ajustes adicionales del contexto (si los hay)
                          const adjustedPrices = getAdjustedAddOnPrice(addOn.id, basePrice, basePvp);
                          return `${Math.round(adjustedPrices.pvp)}€`;
                        })()}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-taupe text-sm">
                        {addOn.testCount || 0} {t('systems.tests')}
                      </div>
                      {/* Indicador de filtrado contextual */}
                      {addOn.isFiltered && addOn.originalCodes && addOn.originalCodes.length > addOn.testCount && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 font-medium">
                            Optimizado para {selectedProfile === 'essential' ? 'Essential' : 
                              selectedProfile === 'performance' ? 'Performance' : 
                              selectedProfile === 'core' ? 'Core' : 'Advanced'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2" style={{marginLeft: '32px'}}>
                    {(() => {
                      const benefits = t(`addOnBenefits.${addOn.id}`);
                      // Verificar si benefits es un array válido
                      if (Array.isArray(benefits)) {
                        return benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <FaCheck className={`${addOn.textColor} text-xs`} />
                            <span className="text-taupe text-sm">{benefit}</span>
                          </div>
                        ));
                      } else {
                        // Fallback si no es un array
                        return (
                          <div className="flex items-center gap-2">
                            <FaCheck className={`${addOn.textColor} text-xs`} />
                            <span className="text-taupe text-sm">{benefits || 'Beneficios no disponibles'}</span>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </div>

                {/* Add-On Actions */}
                <div className="p-6">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => toggleBiomarker(addOn.id)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 border-cream hover:bg-earth-50 hover:border-earth transition-all font-medium"
                    >
                      <span className="text-stone font-semibold text-sm">{t('systems.viewBiomarkers')}</span>
                      {expandedBiomarkers.includes(addOn.id) ? (
                        <FaChevronUp className="text-taupe text-sm" />
                      ) : (
                        <FaChevronDown className="text-taupe text-sm" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Biomarkers */}
                  <AnimatePresence>
                    {expandedBiomarkers.includes(addOn.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="bg-earth-50 rounded-lg p-4 border-2 border-cream">
                          <h5 className="text-base font-bold text-stone mb-4 flex items-center gap-2 justify-center">
                            {t('systems.biomarkersOf')} {t(`addOns.${addOn.id}.name`)} ({addOn.testCount || 0} {t('systems.tests')})
                          </h5>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {addOn.biomarkers.map((biomarker, idx) => (
                              <BiomarkerCard key={biomarker.code} biomarker={biomarker} index={idx} addOnId={addOn.id} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MedicalSystemsExplorer; 