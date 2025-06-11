/**
 * BiomarkerSelectionContext.js
 * Contexto para manejar las selecciones de biomarcadores individuales
 */

import React, { createContext, useContext, useState } from 'react';
import { getPriceByCode } from '../data/priceData.js';
// Import desde nueva arquitectura de add-ons
import { addOnPackages } from '../data/addOnPackages.js';
// Import del nuevo sistema simplificado de biomarcadores
import { 
  calculateDynamicBiomarkerCount,
  getManuallySelectedBiomarkers,
  ADD_ON_BIOMARKERS_CONFIG,
  getInitialStateValue 
} from '../data/biomarkersConfig.js';
// Import del sistema de paquetes y precios dinámicos
import { 
  essentialPackage, 
  performancePackage, 
  corePackage, 
  advancedPackage 
} from '../data/analysisProfiles/index.js';

const BiomarkerSelectionContext = createContext();

export const useBiomarkerSelection = () => {
  const context = useContext(BiomarkerSelectionContext);
  if (!context) {
    throw new Error('useBiomarkerSelection must be used within a BiomarkerSelectionProvider');
  }
  return context;
};

export const BiomarkerSelectionProvider = ({ children }) => {
  // ================================================================
  // NUEVA ARQUITECTURA SIMPLIFICADA - ESTADOS CENTRALIZADOS
  // ================================================================
  // Todos los estados iniciales se obtienen desde biomarkersConfig.js
  // Esto elimina duplicación y garantiza consistencia entre configuración y contexto
  // Los valores por defecto se definen UNA SOLA VEZ en ADD_ON_BIOMARKERS_CONFIG
  
  // Estados para biomarcadores individuales - AHORA USANDO CONFIGURACIÓN CENTRALIZADA
  const [selectedIntolerancia, setSelectedIntolerancia] = useState(() => getInitialStateValue('selectedIntolerancia'));
  const [selectedMetaboloma, setSelectedMetaboloma] = useState(() => getInitialStateValue('selectedMetaboloma'));
  // Tests genómicos
  const [selectedMyPharma, setSelectedMyPharma] = useState(() => getInitialStateValue('selectedMyPharma'));
  const [selectedMyDetox, setSelectedMyDetox] = useState(() => getInitialStateValue('selectedMyDetox'));
  const [selectedMyDiet, setSelectedMyDiet] = useState(() => getInitialStateValue('selectedMyDiet'));
  const [selectedMyAgeing, setSelectedMyAgeing] = useState(() => getInitialStateValue('selectedMyAgeing'));
  const [selectedMySport, setSelectedMySport] = useState(() => getInitialStateValue('selectedMySport'));
  const [selectedMySuplements, setSelectedMySuplements] = useState(() => getInitialStateValue('selectedMySuplements'));
  const [selectedLpA, setSelectedLpA] = useState(() => getInitialStateValue('selectedLpA'));
  const [selectedIL6, setSelectedIL6] = useState(() => getInitialStateValue('selectedIL6'));
  const [selectedTNFα, setSelectedTNFα] = useState(() => getInitialStateValue('selectedTNFα'));
  const [selectedLongitudTelomerica, setSelectedLongitudTelomerica] = useState(() => getInitialStateValue('selectedLongitudTelomerica'));
  
  // Estados específicos para add-on BioAge
  const [selectedMyEpiAgeingBioAge, setSelectedMyEpiAgeingBioAge] = useState(() => getInitialStateValue('selectedMyEpiAgeingBioAge'));
  const [selectedLongitudTelomericaBioAge, setSelectedLongitudTelomericaBioAge] = useState(() => getInitialStateValue('selectedLongitudTelomericaBioAge'));
  const [selectedEspermiogramaBioAge, setSelectedEspermiogramaBioAge] = useState(() => getInitialStateValue('selectedEspermiogramaBioAge'));
  const [selectedAMHBioAge, setSelectedAMHBioAge] = useState(() => getInitialStateValue('selectedAMHBioAge'));

  const [selectedAcidosGrasos, setSelectedAcidosGrasos] = useState(() => getInitialStateValue('selectedAcidosGrasos'));
  const [selectedVitaminaK1, setSelectedVitaminaK1] = useState(() => getInitialStateValue('selectedVitaminaK1'));
  const [selectedHelicobacter, setSelectedHelicobacter] = useState(() => getInitialStateValue('selectedHelicobacter'));
  // Estados específicos para add-on Hormonas
  const [selectedEstradiolHormonas, setSelectedEstradiolHormonas] = useState(() => getInitialStateValue('selectedEstradiolHormonas'));
  const [selectedProlactinaHormonas, setSelectedProlactinaHormonas] = useState(() => getInitialStateValue('selectedProlactinaHormonas'));
  const [selectedLHHormonas, setSelectedLHHormonas] = useState(() => getInitialStateValue('selectedLHHormonas'));
  const [selectedFSHHormonas, setSelectedFSHHormonas] = useState(() => getInitialStateValue('selectedFSHHormonas'));
  
  // Nuevos estados para biomarcadores de Hormonas faltantes
  const [selectedHormonaCrecimientoHormonas, setSelectedHormonaCrecimientoHormonas] = useState(() => getInitialStateValue('selectedHormonaCrecimientoHormonas'));
  const [selectedTestosteronaBiodispHormonas, setSelectedTestosteronaBiodispHormonas] = useState(() => getInitialStateValue('selectedTestosteronaBiodispHormonas'));
  const [selectedTestosteronaLibreHormonas, setSelectedTestosteronaLibreHormonas] = useState(() => getInitialStateValue('selectedTestosteronaLibreHormonas'));
  const [selectedDHTHormonas, setSelectedDHTHormonas] = useState(() => getInitialStateValue('selectedDHTHormonas'));
  
  // Estados para biomarcadores femeninos de Hormonas
  const [selectedProgesterona, setSelectedProgesterona] = useState(() => getInitialStateValue('selectedProgesterona'));
  const [selectedTestosteronaTotal, setSelectedTestosteronaTotal] = useState(() => getInitialStateValue('selectedTestosteronaTotal'));
  const [selected17OHProgesterona, setSelected17OHProgesterona] = useState(() => getInitialStateValue('selected17OHProgesterona'));
  const [selectedEstrona, setSelectedEstrona] = useState(() => getInitialStateValue('selectedEstrona'));
  
  // Estados específicos para add-on Endocrino
  const [selectedEstradiolEndocrino, setSelectedEstradiolEndocrino] = useState(() => getInitialStateValue('selectedEstradiolEndocrino'));
  const [selectedProlactinaEndocrino, setSelectedProlactinaEndocrino] = useState(() => getInitialStateValue('selectedProlactinaEndocrino'));
  const [selectedLHEndocrino, setSelectedLHEndocrino] = useState(() => getInitialStateValue('selectedLHEndocrino'));
  const [selectedFSHEndocrino, setSelectedFSHEndocrino] = useState(() => getInitialStateValue('selectedFSHEndocrino'));
  const [selectedVSGEndocrino, setSelectedVSGEndocrino] = useState(() => getInitialStateValue('selectedVSGEndocrino'));
  const [selectedVitaminaD125OHEndocrino, setSelectedVitaminaD125OHEndocrino] = useState(() => getInitialStateValue('selectedVitaminaD125OHEndocrino'));
  
  // Nuevos estados para biomarcadores de Endocrino faltantes
  const [selectedIGF1Endocrino, setSelectedIGF1Endocrino] = useState(() => getInitialStateValue('selectedIGF1Endocrino'));
  const [selectedIGFBP3Endocrino, setSelectedIGFBP3Endocrino] = useState(() => getInitialStateValue('selectedIGFBP3Endocrino'));
  const [selectedACTHEndocrino, setSelectedACTHEndocrino] = useState(() => getInitialStateValue('selectedACTHEndocrino'));
  
  // Estados específicos para add-on Cancer
  // Biomarcadores comunes
  const [selectedSangreOcultaCancer, setSelectedSangreOcultaCancer] = useState(() => getInitialStateValue('selectedSangreOcultaCancer'));
  const [selectedUrinalisisCancer, setSelectedUrinalisisCancer] = useState(() => getInitialStateValue('selectedUrinalisisCancer'));
  const [selectedCEACancer, setSelectedCEACancer] = useState(() => getInitialStateValue('selectedCEACancer'));
  const [selectedCA125Cancer, setSelectedCA125Cancer] = useState(() => getInitialStateValue('selectedCA125Cancer'));
  const [selectedCA153Cancer, setSelectedCA153Cancer] = useState(() => getInitialStateValue('selectedCA153Cancer'));
  const [selectedCA199Cancer, setSelectedCA199Cancer] = useState(() => getInitialStateValue('selectedCA199Cancer'));
  const [selectedSCCCancer, setSelectedSCCCancer] = useState(() => getInitialStateValue('selectedSCCCancer'));
  const [selectedProteina100Cancer, setSelectedProteina100Cancer] = useState(() => getInitialStateValue('selectedProteina100Cancer'));
  const [selectedNSECancer, setSelectedNSECancer] = useState(() => getInitialStateValue('selectedNSECancer'));
  const [selectedCYFRA21Cancer, setSelectedCYFRA21Cancer] = useState(() => getInitialStateValue('selectedCYFRA21Cancer'));
  const [selectedCA724Cancer, setSelectedCA724Cancer] = useState(() => getInitialStateValue('selectedCA724Cancer'));
  const [selectedAFPCancer, setSelectedAFPCancer] = useState(() => getInitialStateValue('selectedAFPCancer'));
  const [selectedProGRPCancer, setSelectedProGRPCancer] = useState(() => getInitialStateValue('selectedProGRPCancer'));
  const [selectedBetaHCGCancer, setSelectedBetaHCGCancer] = useState(() => getInitialStateValue('selectedBetaHCGCancer'));
  // Biomarcadores específicos masculinos
  const [selectedPSATotalCancer, setSelectedPSATotalCancer] = useState(() => getInitialStateValue('selectedPSATotalCancer'));
  const [selectedPSALibreCancer, setSelectedPSALibreCancer] = useState(() => getInitialStateValue('selectedPSALibreCancer'));
  // Biomarcadores específicos femeninos
  const [selectedHE4Cancer, setSelectedHE4Cancer] = useState(() => getInitialStateValue('selectedHE4Cancer'));
  
  // Estados específicos para add-on Genome
  const [selectedMyPharmaGenome, setSelectedMyPharmaGenome] = useState(() => getInitialStateValue('selectedMyPharmaGenome'));
  const [selectedMyDetoxGenome, setSelectedMyDetoxGenome] = useState(() => getInitialStateValue('selectedMyDetoxGenome'));
  const [selectedMyDietGenome, setSelectedMyDietGenome] = useState(() => getInitialStateValue('selectedMyDietGenome'));
  const [selectedMyAgeingGenome, setSelectedMyAgeingGenome] = useState(() => getInitialStateValue('selectedMyAgeingGenome'));
  const [selectedMySuplementsGenome, setSelectedMySuplementsGenome] = useState(() => getInitialStateValue('selectedMySuplementsGenome'));
  
  // Estados específicos para biomarcadores con múltiples contextos
  const [selectedVitaminaCOxidativeCell, setSelectedVitaminaCOxidativeCell] = useState(() => getInitialStateValue('selectedVitaminaCOxidativeCell'));
  const [selectedVitaminaCIVNutrients, setSelectedVitaminaCIVNutrients] = useState(() => getInitialStateValue('selectedVitaminaCIVNutrients'));

  // Estados específicos para add-on IV & Nutrientes
  const [selectedCromoIVNutrients, setSelectedCromoIVNutrients] = useState(() => getInitialStateValue('selectedCromoIVNutrients'));
  const [selectedCobreIVNutrients, setSelectedCobreIVNutrients] = useState(() => getInitialStateValue('selectedCobreIVNutrients'));
  const [selectedOsmolalidadIVNutrients, setSelectedOsmolalidadIVNutrients] = useState(() => getInitialStateValue('selectedOsmolalidadIVNutrients'));
  const [selectedVitaminaK1IVNutrients, setSelectedVitaminaK1IVNutrients] = useState(() => getInitialStateValue('selectedVitaminaK1IVNutrients'));

  // Estados específicos para add-on Metales Pesados
  const [selectedMercurioHeavyMetals, setSelectedMercurioHeavyMetals] = useState(() => getInitialStateValue('selectedMercurioHeavyMetals'));
  const [selectedPlomoHeavyMetals, setSelectedPlomoHeavyMetals] = useState(() => getInitialStateValue('selectedPlomoHeavyMetals'));
  const [selectedArsenicoHeavyMetals, setSelectedArsenicoHeavyMetals] = useState(() => getInitialStateValue('selectedArsenicoHeavyMetals'));
  const [selectedCadmioHeavyMetals, setSelectedCadmioHeavyMetals] = useState(() => getInitialStateValue('selectedCadmioHeavyMetals'));

  // Estados específicos para add-on Inmunidad
  const [selectedANAImmunity, setSelectedANAImmunity] = useState(() => getInitialStateValue('selectedANAImmunity'));
  const [selectedAntiCCPImmunity, setSelectedAntiCCPImmunity] = useState(() => getInitialStateValue('selectedAntiCCPImmunity'));
  const [selectedAntiTiroglobulinaImmunity, setSelectedAntiTiroglobulinaImmunity] = useState(() => getInitialStateValue('selectedAntiTiroglobulinaImmunity'));
  const [selectedAntiTPOImmunity, setSelectedAntiTPOImmunity] = useState(() => getInitialStateValue('selectedAntiTPOImmunity'));
  const [selectedFactorReumatoideImmunity, setSelectedFactorReumatoideImmunity] = useState(() => getInitialStateValue('selectedFactorReumatoideImmunity'));
  const [selectedHelicobacterImmunity, setSelectedHelicobacterImmunity] = useState(() => getInitialStateValue('selectedHelicobacterImmunity'));

  // Estados específicos para add-on Gut Gate
  const [selectedParasitosGutGate, setSelectedParasitosGutGate] = useState(() => getInitialStateValue('selectedParasitosGutGate'));
  const [selectedPanelAlimentarioGutGate, setSelectedPanelAlimentarioGutGate] = useState(() => getInitialStateValue('selectedPanelAlimentarioGutGate'));
  const [selectedMicrobiomaGutGate, setSelectedMicrobiomaGutGate] = useState(() => getInitialStateValue('selectedMicrobiomaGutGate'));
  const [selectedMetabolomaGutGate, setSelectedMetabolomaGutGate] = useState(() => getInitialStateValue('selectedMetabolomaGutGate'));
  
  // Estados específicos para add-on Bone Mineral
  const [selectedCalcitriolBoneMineral, setSelectedCalcitriolBoneMineral] = useState(() => getInitialStateValue('selectedCalcitriolBoneMineral'));
  const [selectedALPOseaBoneMineral, setSelectedALPOseaBoneMineral] = useState(() => getInitialStateValue('selectedALPOseaBoneMineral'));
  const [selectedCTXBoneMineral, setSelectedCTXBoneMineral] = useState(() => getInitialStateValue('selectedCTXBoneMineral'));
  const [selectedCalcioIonicoBoneMineral, setSelectedCalcioIonicoBoneMineral] = useState(() => getInitialStateValue('selectedCalcioIonicoBoneMineral'));
  
  // Estados específicos para add-on Coagulation
  const [selectedFibrinogenoCoagulation, setSelectedFibrinogenoCoagulation] = useState(() => getInitialStateValue('selectedFibrinogenoCoagulation'));
  const [selectedAPTTCoagulation, setSelectedAPTTCoagulation] = useState(() => getInitialStateValue('selectedAPTTCoagulation'));
  const [selectedINRCoagulation, setSelectedINRCoagulation] = useState(() => getInitialStateValue('selectedINRCoagulation'));
  
  // Estados específicos para digestivo - Biomarcadores reales del add-on
  const [selectedOmega3Digestivo, setSelectedOmega3Digestivo] = useState(() => getInitialStateValue('selectedOmega3Digestivo'));
  const [selectedLipasaDigestivo, setSelectedLipasaDigestivo] = useState(() => getInitialStateValue('selectedLipasaDigestivo'));
  const [selectedAmilasaDigestivo, setSelectedAmilasaDigestivo] = useState(() => getInitialStateValue('selectedAmilasaDigestivo'));
  const [selectedBilirrubinaDirectaDigestivo, setSelectedBilirrubinaDirectaDigestivo] = useState(() => getInitialStateValue('selectedBilirrubinaDirectaDigestivo'));
  
  // Estados específicos para add-on Antioxidantes
  const [selectedRetinol, setSelectedRetinol] = useState(() => getInitialStateValue('selectedRetinol'));
  const [selectedAlfaTocoferol, setSelectedAlfaTocoferol] = useState(() => getInitialStateValue('selectedAlfaTocoferol'));
  const [selectedGammaTocoferol, setSelectedGammaTocoferol] = useState(() => getInitialStateValue('selectedGammaTocoferol'));
  const [selectedBetaCaroteno, setSelectedBetaCaroteno] = useState(() => getInitialStateValue('selectedBetaCaroteno'));
  const [selectedCoenzimaQ10, setSelectedCoenzimaQ10] = useState(() => getInitialStateValue('selectedCoenzimaQ10'));

  // Estados específicos para add-on Estrés Oxidativo
  const [selectedGlutationReductasa, setSelectedGlutationReductasa] = useState(() => getInitialStateValue('selectedGlutationReductasa'));
  const [selectedGlutationPeroxidasa, setSelectedGlutationPeroxidasa] = useState(() => getInitialStateValue('selectedGlutationPeroxidasa'));
  const [selectedG6PD, setSelectedG6PD] = useState(() => getInitialStateValue('selectedG6PD'));
  const [selectedSelenio, setSelectedSelenio] = useState(() => getInitialStateValue('selectedSelenio'));

  // Estados específicos para add-on Inflamación
  const [selectedVSGInflammation, setSelectedVSGInflammation] = useState(() => getInitialStateValue('selectedVSGInflammation'));
  const [selectedIL6Inflammation, setSelectedIL6Inflammation] = useState(() => getInitialStateValue('selectedIL6Inflammation'));
  const [selectedTNFαInflammation, setSelectedTNFαInflammation] = useState(() => getInitialStateValue('selectedTNFαInflammation'));

  // Estados específicos para add-on Cardiovascular
  const [selectedLDHCardiovascular, setSelectedLDHCardiovascular] = useState(() => getInitialStateValue('selectedLDHCardiovascular'));
  const [selectedAcidoLacticoCardiovascular, setSelectedAcidoLacticoCardiovascular] = useState(() => getInitialStateValue('selectedAcidoLacticoCardiovascular'));
  const [selectedCKMBCardiovascular, setSelectedCKMBCardiovascular] = useState(() => getInitialStateValue('selectedCKMBCardiovascular'));
  const [selectedCPKTotalCardiovascular, setSelectedCPKTotalCardiovascular] = useState(() => getInitialStateValue('selectedCPKTotalCardiovascular'));
  const [selectedLDLDirectoCardiovascular, setSelectedLDLDirectoCardiovascular] = useState(() => getInitialStateValue('selectedLDLDirectoCardiovascular'));
  const [selectedVLDLCardiovascular, setSelectedVLDLCardiovascular] = useState(() => getInitialStateValue('selectedVLDLCardiovascular'));
  const [selectedLpACardiovascular, setSelectedLpACardiovascular] = useState(() => getInitialStateValue('selectedLpACardiovascular'));
  const [selectedCistatinaCardiovascular, setSelectedCistatinaCardiovascular] = useState(() => getInitialStateValue('selectedCistatinaCardiovascular'));

  // ================================================================
  // ESTADOS PRINCIPALES PARA SELECCIÓN DE PERFILES Y USUARIO
  // ================================================================
  // Estados básicos para la aplicación principal
  // Perfil seleccionado (essential, performance, core, advanced)
  const [selectedProfile, setSelectedProfileState] = useState('essential'); // Perfil por defecto
  const [gender, setGender] = useState('male'); // Género por defecto
  const [user, setUser] = useState(null); // Usuario actual
  
  // Estados para biomarcadores seleccionados (sistema existente)
  const [selectedBiomarkers, setSelectedBiomarkers] = useState([]);
  const [activeBiomarkers, setActiveBiomarkers] = useState([]);
  
  // Estado para detalles de biomarcadores
  const [biomarkerDetails] = useState({});

  // ================================================================
  // PERFILES ANALÍTICOS - IMPORTADOS DESDE SISTEMA EXISTENTE
  // ================================================================
  // Los precios se calculan automáticamente en analysisProfiles/packages.js
  const profiles = {
    essential: essentialPackage,
    performance: performancePackage,
    core: corePackage,
    advanced: advancedPackage
  };

  // Función para obtener precios de perfiles (usando el sistema existente)
  const profilePrices = {
    essential: essentialPackage.getPricing(gender),
    performance: performancePackage.getPricing(gender),
    core: corePackage.getPricing(gender),
    advanced: advancedPackage.getPricing(gender)
  };

  // Función para calcular precio total
  const getTotalPrice = () => {
    const currentProfilePricing = profiles[selectedProfile]?.getPricing(gender);
    const basePrice = currentProfilePricing?.precio || 0;
    const additionalPrices = calculateAdditionalPrices();
    return basePrice + additionalPrices.price;
  };

  // Función para calcular precio de add-on individual
  const calculateAddOnPrice = (addOnId) => {
    // Implementación básica - se puede expandir según necesidades
    return getAdjustedAddOnPrice(addOnId, 0, 0);
  };

  // Función para calcular precios adicionales basados en selecciones
  const calculateAdditionalPrices = () => {
    let digestExtra = { price: 0, pvp: 0 };
    let gutGateExtra = { price: 0, pvp: 0 };
    let genomeExtra = { price: 0, pvp: 0 };
    let cardiovascularExtra = { price: 0, pvp: 0 };
    let bioAgeExtra = { price: 0, pvp: 0 };
    let oxidativeCellExtra = { price: 0, pvp: 0 };
    let ivNutrientsExtra = { price: 0, pvp: 0 };
    let heavyMetalsExtra = { price: 0, pvp: 0 };
    let immunityExtra = { price: 0, pvp: 0 };
    let endocrinoExtra = { price: 0, pvp: 0 };
    let hormonasExtra = { price: 0, pvp: 0 };
    let antioxidantesExtra = { price: 0, pvp: 0 };
    let inflammationExtra = { price: 0, pvp: 0 };
    let boneMineralExtra = { price: 0, pvp: 0 };
    let coagulationExtra = { price: 0, pvp: 0 };
    let cancerExtra = { price: 0, pvp: 0 };

    // Digestivo - 4 biomarcadores específicos del add-on
    let digestPrice = 0;
    let digestPvp = 0;
    if (selectedOmega3Digestivo) {
      digestPrice += getPriceByCode('T2590', 'prevenii');
      digestPvp += getPriceByCode('T2590', 'market');
    }
    if (selectedLipasaDigestivo) {
      digestPrice += getPriceByCode('B1980', 'prevenii');
      digestPvp += getPriceByCode('B1980', 'market');
    }
    if (selectedAmilasaDigestivo) {
      digestPrice += getPriceByCode('B0350', 'prevenii');
      digestPvp += getPriceByCode('B0350', 'market');
    }
    if (selectedBilirrubinaDirectaDigestivo) {
      digestPrice += getPriceByCode('B0260', 'prevenii');
      digestPvp += getPriceByCode('B0260', 'market');
    }
    digestExtra = { price: digestPrice, pvp: digestPvp };

    // Gut Gate - 4 biomarcadores específicos
    let gutGatePrice = 0;
    let gutGatePvp = 0;
    if (selectedParasitosGutGate) {
      gutGatePrice += getPriceByCode('M1190', 'prevenii');
      gutGatePvp += getPriceByCode('M1190', 'market');
    }
    if (selectedPanelAlimentarioGutGate) {
      gutGatePrice += getPriceByCode('P3031', 'prevenii');
      gutGatePvp += getPriceByCode('P3031', 'market');
    }
    if (selectedMicrobiomaGutGate) {
      gutGatePrice += getPriceByCode('AB001', 'prevenii');
      gutGatePvp += getPriceByCode('AB001', 'market');
    }
    if (selectedMetabolomaGutGate) {
      gutGatePrice += getPriceByCode('AB002', 'prevenii');
      gutGatePvp += getPriceByCode('AB002', 'market');
    }
    gutGateExtra = { price: gutGatePrice, pvp: gutGatePvp };

    // Cardiovascular - 8 biomarcadores específicos
    let cardioPrice = 0;
    let cardioPvp = 0;
    if (selectedLDHCardiovascular) {
      cardioPrice += getPriceByCode('B0110', 'prevenii');
      cardioPvp += getPriceByCode('B0110', 'market');
    }
    if (selectedAcidoLacticoCardiovascular) {
      cardioPrice += getPriceByCode('B0750', 'prevenii');
      cardioPvp += getPriceByCode('B0750', 'market');
    }
    if (selectedCKMBCardiovascular) {
      cardioPrice += getPriceByCode('B2120', 'prevenii');
      cardioPvp += getPriceByCode('B2120', 'market');
    }
    if (selectedCPKTotalCardiovascular) {
      cardioPrice += getPriceByCode('B0220', 'prevenii');
      cardioPvp += getPriceByCode('B0220', 'market');
    }
    if (selectedLDLDirectoCardiovascular) {
      cardioPrice += getPriceByCode('B1900', 'prevenii');
      cardioPvp += getPriceByCode('B1900', 'market');
    }
    if (selectedVLDLCardiovascular) {
      cardioPrice += getPriceByCode('B0190', 'prevenii');
      cardioPvp += getPriceByCode('B0190', 'market');
    }
    if (selectedLpACardiovascular) {
      cardioPrice += getPriceByCode('B7700', 'prevenii');
      cardioPvp += getPriceByCode('B7700', 'market');
    }
    if (selectedCistatinaCardiovascular) {
      cardioPrice += getPriceByCode('I5047', 'prevenii');
      cardioPvp += getPriceByCode('I5047', 'market');
    }
    cardiovascularExtra = { price: cardioPrice, pvp: cardioPvp };

    // Edad Biológica - 4 biomarcadores específicos
    let bioAgePrice = 0;
    let bioAgePvp = 0;
    if (selectedMyEpiAgeingBioAge) {
      bioAgePrice += getPriceByCode('OG001', 'prevenii');
      bioAgePvp += getPriceByCode('OG001', 'market');
    }
    if (selectedLongitudTelomericaBioAge) {
      bioAgePrice += getPriceByCode('G1465', 'prevenii');
      bioAgePvp += getPriceByCode('G1465', 'market');
    }
    if (selectedEspermiogramaBioAge) {
      bioAgePrice += getPriceByCode('B3340', 'prevenii');
      bioAgePvp += getPriceByCode('B3340', 'market');
    }
    if (selectedAMHBioAge) {
      bioAgePrice += getPriceByCode('D1001', 'prevenii');
      bioAgePvp += getPriceByCode('D1001', 'market');
    }
    bioAgeExtra = { price: bioAgePrice, pvp: bioAgePvp };

    // Estrés Oxidativo - Biomarcadores específicos
    let oxidativeCellPrice = 0;
    let oxidativeCellPvp = 0;
    if (selectedGlutationReductasa) {
      oxidativeCellPrice += getPriceByCode('B7121', 'prevenii');
      oxidativeCellPvp += getPriceByCode('B7121', 'market');
    }
    if (selectedGlutationPeroxidasa) {
      oxidativeCellPrice += getPriceByCode('B3015', 'prevenii');
      oxidativeCellPvp += getPriceByCode('B3015', 'market');
    }
    if (selectedG6PD) {
      oxidativeCellPrice += getPriceByCode('B3041', 'prevenii');
      oxidativeCellPvp += getPriceByCode('B3041', 'market');
    }
    if (selectedSelenio) {
      oxidativeCellPrice += getPriceByCode('T3920', 'prevenii');
      oxidativeCellPvp += getPriceByCode('T3920', 'market');
    }
    if (selectedVitaminaCOxidativeCell) {
      oxidativeCellPrice += getPriceByCode('T1061', 'prevenii');
      oxidativeCellPvp += getPriceByCode('T1061', 'market');
    }
    oxidativeCellExtra = { price: oxidativeCellPrice, pvp: oxidativeCellPvp };

    // IV & Nutrientes - 5 biomarcadores específicos
    let ivPrice = 0;
    let ivPvp = 0;
    if (selectedCromoIVNutrients) {
      ivPrice += getPriceByCode('T0500', 'prevenii');
      ivPvp += getPriceByCode('T0500', 'market');
    }
    if (selectedCobreIVNutrients) {
      ivPrice += getPriceByCode('B8060', 'prevenii');
      ivPvp += getPriceByCode('B8060', 'market');
    }
    if (selectedOsmolalidadIVNutrients) {
      ivPrice += getPriceByCode('B0270', 'prevenii');
      ivPvp += getPriceByCode('B0270', 'market');
    }
    if (selectedVitaminaK1IVNutrients) {
      ivPrice += getPriceByCode('T1720', 'prevenii');
      ivPvp += getPriceByCode('T1720', 'market');
    }
    if (selectedVitaminaCIVNutrients) {
      ivPrice += getPriceByCode('T1061', 'prevenii');
      ivPvp += getPriceByCode('T1061', 'market');
    }
    ivNutrientsExtra = { price: ivPrice, pvp: ivPvp };

    // Metales Pesados - 4 biomarcadores específicos
    let heavyMetalsPrice = 0;
    let heavyMetalsPvp = 0;
    if (selectedMercurioHeavyMetals) {
      heavyMetalsPrice += getPriceByCode('T0302', 'prevenii');
      heavyMetalsPvp += getPriceByCode('T0302', 'market');
    }
    if (selectedPlomoHeavyMetals) {
      heavyMetalsPrice += getPriceByCode('T0150', 'prevenii');
      heavyMetalsPvp += getPriceByCode('T0150', 'market');
    }
    if (selectedArsenicoHeavyMetals) {
      heavyMetalsPrice += getPriceByCode('T0960', 'prevenii');
      heavyMetalsPvp += getPriceByCode('T0960', 'market');
    }
    if (selectedCadmioHeavyMetals) {
      heavyMetalsPrice += getPriceByCode('T0480', 'prevenii');
      heavyMetalsPvp += getPriceByCode('T0480', 'market');
    }
    heavyMetalsExtra = { price: heavyMetalsPrice, pvp: heavyMetalsPvp };

    // Inmunidad - 6 biomarcadores específicos
    let immunityPrice = 0;
    let immunityPvp = 0;
    if (selectedANAImmunity) {
      immunityPrice += getPriceByCode('I0141', 'prevenii');
      immunityPvp += getPriceByCode('I0141', 'market');
    }
    if (selectedAntiCCPImmunity) {
      immunityPrice += getPriceByCode('I5072', 'prevenii');
      immunityPvp += getPriceByCode('I5072', 'market');
    }
    if (selectedAntiTiroglobulinaImmunity) {
      immunityPrice += getPriceByCode('B6321', 'prevenii');
      immunityPvp += getPriceByCode('B6321', 'market');
    }
    if (selectedAntiTPOImmunity) {
      immunityPrice += getPriceByCode('B6300', 'prevenii');
      immunityPvp += getPriceByCode('B6300', 'market');
    }
    if (selectedFactorReumatoideImmunity) {
      immunityPrice += getPriceByCode('B3130', 'prevenii');
      immunityPvp += getPriceByCode('B3130', 'market');
    }
    if (selectedHelicobacterImmunity) {
      immunityPrice += getPriceByCode('B7750', 'prevenii');
      immunityPvp += getPriceByCode('B7750', 'market');
    }
    immunityExtra = { price: immunityPrice, pvp: immunityPvp };

    // Genome - Tests genómicos específicos
    let genomPrice = 0;
    let genomPvp = 0;
    if (selectedMyPharmaGenome) {
      genomPrice += getPriceByCode('OG002', 'prevenii');
      genomPvp += getPriceByCode('OG002', 'market');
    }
    if (selectedMyDetoxGenome) {
      genomPrice += getPriceByCode('OG003', 'prevenii');
      genomPvp += getPriceByCode('OG003', 'market');
    }
    if (selectedMyDietGenome) {
      genomPrice += getPriceByCode('OG004', 'prevenii');
      genomPvp += getPriceByCode('OG004', 'market');
    }
    if (selectedMyAgeingGenome) {
      genomPrice += getPriceByCode('OG005', 'prevenii');
      genomPvp += getPriceByCode('OG005', 'market');
    }
    if (selectedMySuplementsGenome) {
      genomPrice += getPriceByCode('OG006', 'prevenii');
      genomPvp += getPriceByCode('OG006', 'market');
    }
    genomeExtra = { price: genomPrice, pvp: genomPvp };

    // Inmunidad - Helicobacter pylori IgG An
    if (selectedHelicobacter) {
      const price = getPriceByCode('B7750', 'prevenii');
      const pvp = getPriceByCode('B7750', 'market');
      immunityExtra = { price, pvp };
    }

    // Endocrino - Estradiol, Prolactina, LH, FSH específicos del Endocrino
    let endocrinoPrice = 0;
    let endocrinoPvp = 0;
    if (selectedEstradiolEndocrino) {
      endocrinoPrice += getPriceByCode('B5350', 'prevenii');
      endocrinoPvp += getPriceByCode('B5350', 'market');
    }
    if (selectedProlactinaEndocrino) {
      endocrinoPrice += getPriceByCode('B5980', 'prevenii');
      endocrinoPvp += getPriceByCode('B5980', 'market');
    }
    if (selectedLHEndocrino) {
      endocrinoPrice += getPriceByCode('B5800', 'prevenii');
      endocrinoPvp += getPriceByCode('B5800', 'market');
    }
    if (selectedFSHEndocrino) {
      endocrinoPrice += getPriceByCode('B5380', 'prevenii');
      endocrinoPvp += getPriceByCode('B5380', 'market');
    }
    if (selectedVSGEndocrino) {
      endocrinoPrice += getPriceByCode('H0020', 'prevenii');
      endocrinoPvp += getPriceByCode('H0020', 'market');
    }
    if (selectedVitaminaD125OHEndocrino) {
      endocrinoPrice += getPriceByCode('D0560', 'prevenii');
      endocrinoPvp += getPriceByCode('D0560', 'market');
    }
    endocrinoExtra = { price: endocrinoPrice, pvp: endocrinoPvp };

    // Hormonas - Estradiol, Prolactina, LH, FSH específicos de Hormonas
    let hormonasPrice = 0;
    let hormonasPvp = 0;
    if (selectedEstradiolHormonas) {
      hormonasPrice += getPriceByCode('B5350', 'prevenii');
      hormonasPvp += getPriceByCode('B5350', 'market');
    }
    if (selectedProlactinaHormonas) {
      hormonasPrice += getPriceByCode('B5980', 'prevenii');
      hormonasPvp += getPriceByCode('B5980', 'market');
    }
    if (selectedLHHormonas) {
      hormonasPrice += getPriceByCode('B5800', 'prevenii');
      hormonasPvp += getPriceByCode('B5800', 'market');
    }
    if (selectedFSHHormonas) {
      hormonasPrice += getPriceByCode('B5380', 'prevenii');
      hormonasPvp += getPriceByCode('B5380', 'market');
    }
    hormonasExtra = { price: hormonasPrice, pvp: hormonasPvp };

    // Antioxidantes - Retinol, Alfa-tocoferol, Gamma-tocoferol, Beta-caroteno, Coenzima Q10
    let antioxidantesPrice = 0;
    let antioxidantesPvp = 0;
    if (selectedRetinol) {
      antioxidantesPrice += getPriceByCode('T0811', 'prevenii');
      antioxidantesPvp += getPriceByCode('T0811', 'market');
    }
    if (selectedAlfaTocoferol) {
      antioxidantesPrice += getPriceByCode('T1191', 'prevenii');
      antioxidantesPvp += getPriceByCode('T1191', 'market');
    }
    if (selectedGammaTocoferol) {
      antioxidantesPrice += getPriceByCode('T2841', 'prevenii');
      antioxidantesPvp += getPriceByCode('T2841', 'market');
    }
    if (selectedBetaCaroteno) {
      antioxidantesPrice += getPriceByCode('T1200', 'prevenii');
      antioxidantesPvp += getPriceByCode('T1200', 'market');
    }
    if (selectedCoenzimaQ10) {
      antioxidantesPrice += getPriceByCode('T2830', 'prevenii');
      antioxidantesPvp += getPriceByCode('T2830', 'market');
    }
    antioxidantesExtra = { price: antioxidantesPrice, pvp: antioxidantesPvp };

    // Inflamación - VSG, IL-6, TNF-α
    let inflammationPrice = 0;
    let inflammationPvp = 0;
    if (selectedVSGInflammation) {
      inflammationPrice += getPriceByCode('H0020', 'prevenii');
      inflammationPvp += getPriceByCode('H0020', 'market');
    }
    if (selectedIL6Inflammation) {
      inflammationPrice += getPriceByCode('B7790', 'prevenii');
      inflammationPvp += getPriceByCode('B7790', 'market');
    }
    if (selectedTNFαInflammation) {
      inflammationPrice += getPriceByCode('I2081', 'prevenii');
      inflammationPvp += getPriceByCode('I2081', 'market');
    }
    inflammationExtra = { price: inflammationPrice, pvp: inflammationPvp };

    // Bone Mineral - Calcitriol, ALP ósea, CTX, Calcio iónico
    let boneMineralPrice = 0;
    let boneMineralPvp = 0;
    if (selectedCalcitriolBoneMineral) {
      boneMineralPrice += getPriceByCode('D0560', 'prevenii');
      boneMineralPvp += getPriceByCode('D0560', 'market');
    }
    if (selectedALPOseaBoneMineral) {
      boneMineralPrice += getPriceByCode('D1111', 'prevenii');
      boneMineralPvp += getPriceByCode('D1111', 'market');
    }
    if (selectedCTXBoneMineral) {
      boneMineralPrice += getPriceByCode('I3291', 'prevenii');
      boneMineralPvp += getPriceByCode('I3291', 'market');
    }
    if (selectedCalcioIonicoBoneMineral) {
      boneMineralPrice += getPriceByCode('T1572', 'prevenii');
      boneMineralPvp += getPriceByCode('T1572', 'market');
    }
    boneMineralExtra = { price: boneMineralPrice, pvp: boneMineralPvp };

    // Coagulation - Fibrinógeno, Cefalina-APTT, INR (Protrombina)
    let coagulationPrice = 0;
    let coagulationPvp = 0;
    if (selectedFibrinogenoCoagulation) {
      coagulationPrice += getPriceByCode('H0050', 'prevenii');
      coagulationPvp += getPriceByCode('H0050', 'market');
    }
    if (selectedAPTTCoagulation) {
      coagulationPrice += getPriceByCode('H0850', 'prevenii');
      coagulationPvp += getPriceByCode('H0850', 'market');
    }
    if (selectedINRCoagulation) {
      coagulationPrice += getPriceByCode('H0860', 'prevenii');
      coagulationPvp += getPriceByCode('H0860', 'market');
    }
    coagulationExtra = { price: coagulationPrice, pvp: coagulationPvp };

    // Cancer - Marcadores tumorales (comunes + específicos por género)
    let cancerPrice = 0;
    let cancerPvp = 0;
    // Biomarcadores comunes
    if (selectedSangreOcultaCancer) {
      cancerPrice += getPriceByCode('M0010', 'prevenii');
      cancerPvp += getPriceByCode('M0010', 'market');
    }
    if (selectedUrinalisisCancer) {
      cancerPrice += getPriceByCode('6897', 'prevenii');
      cancerPvp += getPriceByCode('6897', 'market');
    }
    if (selectedCEACancer) {
      cancerPrice += getPriceByCode('B5110', 'prevenii');
      cancerPvp += getPriceByCode('B5110', 'market');
    }
    if (selectedCA125Cancer) {
      cancerPrice += getPriceByCode('B5080', 'prevenii');
      cancerPvp += getPriceByCode('B5080', 'market');
    }
    if (selectedCA153Cancer) {
      cancerPrice += getPriceByCode('B5090', 'prevenii');
      cancerPvp += getPriceByCode('B5090', 'market');
    }
    if (selectedCA199Cancer) {
      cancerPrice += getPriceByCode('B5100', 'prevenii');
      cancerPvp += getPriceByCode('B5100', 'market');
    }
    if (selectedSCCCancer) {
      cancerPrice += getPriceByCode('B8130', 'prevenii');
      cancerPvp += getPriceByCode('B8130', 'market');
    }
    if (selectedProteina100Cancer) {
      cancerPrice += getPriceByCode('I5080', 'prevenii');
      cancerPvp += getPriceByCode('I5080', 'market');
    }
    if (selectedNSECancer) {
      cancerPrice += getPriceByCode('I5090', 'prevenii');
      cancerPvp += getPriceByCode('I5090', 'market');
    }
    if (selectedCYFRA21Cancer) {
      cancerPrice += getPriceByCode('B8120', 'prevenii');
      cancerPvp += getPriceByCode('B8120', 'market');
    }
    if (selectedCA724Cancer) {
      cancerPrice += getPriceByCode('D1271', 'prevenii');
      cancerPvp += getPriceByCode('D1271', 'market');
    }
    if (selectedAFPCancer) {
      cancerPrice += getPriceByCode('B7900', 'prevenii');
      cancerPvp += getPriceByCode('B7900', 'market');
    }
    if (selectedProGRPCancer) {
      cancerPrice += getPriceByCode('B8160', 'prevenii');
      cancerPvp += getPriceByCode('B8160', 'market');
    }
    if (selectedBetaHCGCancer) {
      cancerPrice += getPriceByCode('D1760', 'prevenii');
      cancerPvp += getPriceByCode('D1760', 'market');
    }
    // Biomarcadores específicos masculinos
    if (selectedPSATotalCancer) {
      cancerPrice += getPriceByCode('B5830', 'prevenii');
      cancerPvp += getPriceByCode('B5830', 'market');
    }
    if (selectedPSALibreCancer) {
      cancerPrice += getPriceByCode('B5840', 'prevenii');
      cancerPvp += getPriceByCode('B5840', 'market');
    }
    // Biomarcadores específicos femeninos
    if (selectedHE4Cancer) {
      cancerPrice += getPriceByCode('B8110', 'prevenii');
      cancerPvp += getPriceByCode('B8110', 'market');
    }
    cancerExtra = { price: cancerPrice, pvp: cancerPvp };

    return {
      digestExtra,
      gutGateExtra,
      genomeExtra,
      cardiovascularExtra,
      bioAgeExtra,
      oxidativeCellExtra,
      ivNutrientsExtra,
      heavyMetalsExtra,
      immunityExtra,
      endocrinoExtra,
      hormonasExtra,
      antioxidantesExtra,
      inflammationExtra,
      boneMineralExtra,
      coagulationExtra,
      cancerExtra
    };
  };

  // Función para obtener precio ajustado de un add-on específico
  const getAdjustedAddOnPrice = (addOnId, basePrice, basePvp) => {
    const extras = calculateAdditionalPrices();
    
    switch (addOnId) {
      case 'digestion':
        return {
          price: basePrice + extras.digestExtra.price,
          pvp: basePvp + extras.digestExtra.pvp
        };
      case 'gut_gate':
        return {
          price: basePrice + extras.gutGateExtra.price,
          pvp: basePvp + extras.gutGateExtra.pvp
        };
      case 'genome':
        return {
          price: basePrice + extras.genomeExtra.price,
          pvp: basePvp + extras.genomeExtra.pvp
        };
      case 'cardiovascular':
        return {
          price: basePrice + extras.cardiovascularExtra.price,
          pvp: basePvp + extras.cardiovascularExtra.pvp
        };
      case 'bioage':
        return {
          price: basePrice + extras.bioAgeExtra.price,
          pvp: basePvp + extras.bioAgeExtra.pvp
        };
      case 'oxidative_cell':
        return {
          price: basePrice + extras.oxidativeCellExtra.price,
          pvp: basePvp + extras.oxidativeCellExtra.pvp
        };
      case 'iv_nutrients':
        return {
          price: basePrice + extras.ivNutrientsExtra.price,
          pvp: basePvp + extras.ivNutrientsExtra.pvp
        };
          case 'metals':
      return {
        price: basePrice + extras.heavyMetalsExtra.price,
        pvp: basePvp + extras.heavyMetalsExtra.pvp
      };
      case 'immunity':
        return {
          price: basePrice + extras.immunityExtra.price,
          pvp: basePvp + extras.immunityExtra.pvp
        };
      case 'endocrino':
        return {
          price: basePrice + extras.endocrinoExtra.price,
          pvp: basePvp + extras.endocrinoExtra.pvp
        };
      case 'hormonas':
        return {
          price: basePrice + extras.hormonasExtra.price,
          pvp: basePvp + extras.hormonasExtra.pvp
        };
      case 'antioxidantes':
        return {
          price: basePrice + extras.antioxidantesExtra.price,
          pvp: basePvp + extras.antioxidantesExtra.pvp
        };
      case 'inflammation':
        return {
          price: basePrice + extras.inflammationExtra.price,
          pvp: basePvp + extras.inflammationExtra.pvp
        };
      case 'bone_mineral':
        return {
          price: basePrice + extras.boneMineralExtra.price,
          pvp: basePvp + extras.boneMineralExtra.pvp
        };
      case 'coagulation':
        return {
          price: basePrice + extras.coagulationExtra.price,
          pvp: basePvp + extras.coagulationExtra.pvp
        };
      case 'cancer':
        return {
          price: basePrice + extras.cancerExtra.price,
          pvp: basePvp + extras.cancerExtra.pvp
        };
      default:
        return { price: basePrice, pvp: basePvp };
    }
  };

  // NUEVO: Función helper para migración gradual al sistema formal de opcionales
  const getEnhancedBiomarkerCount = (addOnId, gender = 'both') => {
    // Si el add-on tiene configuración formal, usar el nuevo sistema
    if (ADD_ON_BIOMARKERS_CONFIG[addOnId]) {
      const selectedStates = {
        selectedMyPharma,
        selectedMyDetox,
        selectedMyDiet,
        selectedMyAgeing,
        selectedMySport,
        selectedMySuplements,
        selectedLpA,
        selectedIL6,
        selectedTNFα,
        selectedVitaminaK1,
        selectedAcidosGrasos,
        selectedVitaminaCIVNutrients,
        selectedVitaminaCOxidativeCell,
        selectedHelicobacter,
        selectedIntolerancia,
        selectedMetaboloma,
        selectedLongitudTelomerica,
        selectedEstradiolHormonas,
        selectedProlactinaHormonas,
        selectedLHHormonas,
        selectedFSHHormonas,
        selectedEstradiolEndocrino,
        selectedProlactinaEndocrino,
        selectedLHEndocrino,
        selectedFSHEndocrino,
        selectedVSGEndocrino,
        selectedVitaminaD125OHEndocrino,
        // Estados de Cancer
        selectedSangreOcultaCancer,
        selectedUrinalisisCancer,
        selectedCEACancer,
        selectedCA125Cancer,
        selectedCA153Cancer,
        selectedCA199Cancer,
        selectedSCCCancer,
        selectedProteina100Cancer,
        selectedNSECancer,
        selectedCYFRA21Cancer,
        selectedCA724Cancer,
        selectedAFPCancer,
        selectedProGRPCancer,
        selectedBetaHCGCancer,
        selectedPSATotalCancer,
        selectedPSALibreCancer,
        selectedHE4Cancer,
        selectedOmega3Digestivo,
        selectedLipasaDigestivo,
        selectedAmilasaDigestivo,
        selectedBilirrubinaDirectaDigestivo,
        selectedRetinol,
        selectedAlfaTocoferol,
        selectedGammaTocoferol,
        selectedBetaCaroteno,
        selectedCoenzimaQ10,
        selectedGlutationReductasa,
        selectedGlutationPeroxidasa,
        selectedG6PD,
        selectedSelenio,
        selectedVSGInflammation,
        selectedIL6Inflammation,
        selectedTNFαInflammation,
        selectedCalcitriolBoneMineral,
        selectedALPOseaBoneMineral,
        selectedCTXBoneMineral,
        selectedCalcioIonicoBoneMineral,
        selectedFibrinogenoCoagulation,
        selectedAPTTCoagulation,
        selectedINRCoagulation,
        // Estados de BioAge
        selectedMyEpiAgeingBioAge,
        selectedLongitudTelomericaBioAge,
        selectedEspermiogramaBioAge,
        selectedAMHBioAge
      };
      
      console.log(`🔄 Usando sistema formal para ${addOnId}:`, calculateDynamicBiomarkerCount(addOnId, selectedStates, gender));
      return calculateDynamicBiomarkerCount(addOnId, selectedStates, gender);
    }
    
    // Fallback al sistema actual para add-ons sin migrar
    return getActualBiomarkerCount(addOnId, gender);
  };

  // Función para calcular número real de biomarcadores seleccionados por add-on (SISTEMA ACTUAL)
  const getActualBiomarkerCount = (addOnId, gender = 'both') => {
    switch (addOnId) {
      case 'hormonas':
        const hormonasBase = gender === 'male' ? 7 : 8; // Biomarcadores base por género
        let hormonasOptional = 0;
        if (selectedEstradiolHormonas) hormonasOptional++;
        if (selectedProlactinaHormonas) hormonasOptional++;
        if (selectedLHHormonas) hormonasOptional++;
        if (selectedFSHHormonas) hormonasOptional++;
        return hormonasBase + hormonasOptional;

      case 'endocrino':
        const endocrinoBase = 7; // Biomarcadores obligatorios
        let endocrinoOptional = 0;
        if (selectedEstradiolEndocrino) endocrinoOptional++;
        if (selectedProlactinaEndocrino) endocrinoOptional++;
        if (selectedLHEndocrino) endocrinoOptional++;
        if (selectedFSHEndocrino) endocrinoOptional++;
        if (selectedVSGEndocrino) endocrinoOptional++; // Solo suma si está seleccionado
        if (selectedVitaminaD125OHEndocrino) endocrinoOptional++;
        return endocrinoBase + endocrinoOptional;

      case 'oxidative_cell':
        const oxidativeCellBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let oxidativeCellOptional = 0;
        if (selectedGlutationReductasa) oxidativeCellOptional++;
        if (selectedGlutationPeroxidasa) oxidativeCellOptional++;
        if (selectedG6PD) oxidativeCellOptional++;
        if (selectedSelenio) oxidativeCellOptional++;
        if (selectedVitaminaCOxidativeCell) oxidativeCellOptional++;
        return oxidativeCellBase + oxidativeCellOptional;

      case 'iv_nutrients':
        const ivNutrientsBase = 5; // Biomarcadores obligatorios
        let ivNutrientsOptional = 0;
        if (selectedAcidosGrasos) ivNutrientsOptional++;
        if (selectedVitaminaK1) ivNutrientsOptional++;
        if (selectedVitaminaCIVNutrients) ivNutrientsOptional++;
        return ivNutrientsBase + ivNutrientsOptional;

      case 'cardiovascular':
        const cardiovascularBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let cardiovascularOptional = 0;
        if (selectedLDHCardiovascular) cardiovascularOptional++;
        if (selectedAcidoLacticoCardiovascular) cardiovascularOptional++;
        if (selectedCKMBCardiovascular) cardiovascularOptional++;
        if (selectedCPKTotalCardiovascular) cardiovascularOptional++;
        if (selectedLDLDirectoCardiovascular) cardiovascularOptional++;
        if (selectedVLDLCardiovascular) cardiovascularOptional++;
        if (selectedLpACardiovascular) cardiovascularOptional++;
        if (selectedCistatinaCardiovascular) cardiovascularOptional++;
        return cardiovascularBase + cardiovascularOptional;

      case 'immunity':
        const immunityBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let immunityOptional = 0;
        if (selectedANAImmunity) immunityOptional++;
        if (selectedAntiCCPImmunity) immunityOptional++;
        if (selectedAntiTiroglobulinaImmunity) immunityOptional++;
        if (selectedAntiTPOImmunity) immunityOptional++;
        if (selectedFactorReumatoideImmunity) immunityOptional++;
        if (selectedHelicobacterImmunity) immunityOptional++;
        return immunityBase + immunityOptional;

              case 'digestion':
          let digestTotal = 0;
          if (selectedOmega3Digestivo) digestTotal++;
          if (selectedLipasaDigestivo) digestTotal++;
          if (selectedAmilasaDigestivo) digestTotal++;
          if (selectedBilirrubinaDirectaDigestivo) digestTotal++;
          return digestTotal;

      case 'gut_gate':
        const gutGateBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let gutGateOptional = 0;
        if (selectedParasitosGutGate) gutGateOptional++;
        if (selectedPanelAlimentarioGutGate) gutGateOptional++;
        if (selectedMicrobiomaGutGate) gutGateOptional++;
        if (selectedMetabolomaGutGate) gutGateOptional++;
        return gutGateBase + gutGateOptional;

      case 'genome':
        let genomeCount = 0; // Todos los biomarcadores son opcionales
        if (selectedMyPharmaGenome) genomeCount++;
        if (selectedMyDetoxGenome) genomeCount++;
        if (selectedMyDietGenome) genomeCount++;
        if (selectedMyAgeingGenome) genomeCount++;
        if (selectedMySuplementsGenome) genomeCount++;
        return genomeCount;

      case 'bioage':
        const bioAgeBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let bioAgeOptional = 0;
        if (selectedMyEpiAgeingBioAge) bioAgeOptional++;
        if (selectedLongitudTelomericaBioAge) bioAgeOptional++;
        if (selectedEspermiogramaBioAge) bioAgeOptional++;
        if (selectedAMHBioAge) bioAgeOptional++;
        return bioAgeBase + bioAgeOptional;

      case 'cancer':
        // Cancer tiene biomarcadores específicos por género - conteo dinámico
        const cancerBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let cancerOptional = 0;
        // Biomarcadores comunes
        if (selectedSangreOcultaCancer) cancerOptional++;
        if (selectedUrinalisisCancer) cancerOptional++;
        if (selectedCEACancer) cancerOptional++;
        if (selectedCA125Cancer) cancerOptional++;
        if (selectedCA153Cancer) cancerOptional++;
        if (selectedCA199Cancer) cancerOptional++;
        if (selectedSCCCancer) cancerOptional++;
        if (selectedProteina100Cancer) cancerOptional++;
        if (selectedNSECancer) cancerOptional++;
        if (selectedCYFRA21Cancer) cancerOptional++;
        if (selectedCA724Cancer) cancerOptional++;
        if (selectedAFPCancer) cancerOptional++;
        if (selectedProGRPCancer) cancerOptional++;
        if (selectedBetaHCGCancer) cancerOptional++;
        // Biomarcadores específicos masculinos
        if (selectedPSATotalCancer) cancerOptional++;
        if (selectedPSALibreCancer) cancerOptional++;
        // Biomarcadores específicos femeninos
        if (selectedHE4Cancer) cancerOptional++;
        return cancerBase + cancerOptional;

      case 'antioxidantes':
        const antioxidantesBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let antioxidantesOptional = 0;
        if (selectedRetinol) antioxidantesOptional++;
        if (selectedAlfaTocoferol) antioxidantesOptional++;
        if (selectedGammaTocoferol) antioxidantesOptional++;
        if (selectedBetaCaroteno) antioxidantesOptional++;
        if (selectedCoenzimaQ10) antioxidantesOptional++;
        return antioxidantesBase + antioxidantesOptional;

      case 'inflammation':
        const inflammationBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let inflammationOptional = 0;
        if (selectedVSGInflammation) inflammationOptional++;
        if (selectedIL6Inflammation) inflammationOptional++;
        if (selectedTNFαInflammation) inflammationOptional++;
        return inflammationBase + inflammationOptional;

      case 'metals':
        return 4; // Metales pesados fijos

      case 'coagulation':
        const coagulationBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let coagulationOptional = 0;
        if (selectedFibrinogenoCoagulation) coagulationOptional++;
        if (selectedAPTTCoagulation) coagulationOptional++;
        if (selectedINRCoagulation) coagulationOptional++;
        return coagulationBase + coagulationOptional;

      case 'bone_mineral':
        const boneMineralBase = 0; // Todos los biomarcadores son opcionales, no hay obligatorios
        let boneMineralOptional = 0;
        if (selectedCalcitriolBoneMineral) boneMineralOptional++;
        if (selectedALPOseaBoneMineral) boneMineralOptional++;
        if (selectedCTXBoneMineral) boneMineralOptional++;
        if (selectedCalcioIonicoBoneMineral) boneMineralOptional++;
        return boneMineralBase + boneMineralOptional;

      default:
        // Para add-ons sin biomarcadores opcionales, usar el conteo estático
        const addOn = addOnPackages[addOnId];
        if (addOn && addOn.biomarkers) {
          return addOn.biomarkers.filter(b => 
            (b.gender === 'both' || b.gender === gender) && !b.isOptional
          ).length;
        }
        return 0;
    }
  };

  // MEJORADO: Función para obtener resumen usando el sistema formal de opcionales
  const getSelectionSummary = () => {
    const selectedStates = {
      selectedMyPharma,
      selectedMyDetox,
      selectedMyDiet,
      selectedMyAgeing,
      selectedMySport,
      selectedMySuplements,
      selectedLpA,
      selectedIL6,
      selectedTNFα,
      selectedVitaminaK1,
      selectedAcidosGrasos,
      selectedVitaminaCIVNutrients,
      selectedVitaminaCOxidativeCell,
      selectedHelicobacter,
      selectedIntolerancia,
      selectedMetaboloma,
      selectedLongitudTelomerica,
      selectedEstradiolHormonas,
      selectedProlactinaHormonas,
      selectedLHHormonas,
      selectedFSHHormonas,
      selectedEstradiolEndocrino,
      selectedProlactinaEndocrino,
      selectedLHEndocrino,
      selectedFSHEndocrino,
      selectedVSGEndocrino,
      selectedVitaminaD125OHEndocrino,
      selectedOmega3Digestivo,
      selectedLipasaDigestivo,
      selectedAmilasaDigestivo,
      selectedBilirrubinaDirectaDigestivo,
      selectedRetinol,
      selectedAlfaTocoferol,
      selectedGammaTocoferol,
      selectedBetaCaroteno,
      selectedCoenzimaQ10,
      selectedGlutationReductasa,
      selectedGlutationPeroxidasa,
      selectedG6PD,
      selectedSelenio,
      selectedVSGInflammation,
      selectedIL6Inflammation,
      selectedTNFαInflammation
    };

    // Usar el nuevo sistema formal para obtener biomarcadores añadidos manualmente
    const manuallySelected = getManuallySelectedBiomarkers(selectedStates);
    
    console.log('📋 Biomarcadores añadidos manualmente (sistema formal):', manuallySelected);
    
    return manuallySelected;
  };

  const value = {
    // ================================================================
    // ESTADOS PRINCIPALES DE LA APLICACIÓN
    // ================================================================
    // Estados básicos para perfiles y usuario
    selectedProfile,
    // Exponemos un setter claro y estable para el perfil analítico
    setSelectedProfile: setSelectedProfileState,
    gender,
    setGender,
    user,
    selectedBiomarkers,
    setSelectedBiomarkers,
    activeBiomarkers,
    setActiveBiomarkers,
    biomarkerDetails,
    profiles: profiles,
    profilePrices: profilePrices,
    
    // Funciones principales
    getTotalPrice,
    calculateAddOnPrice,
    
    // ================================================================
    // ESTADOS DE BIOMARCADORES ESPECÍFICOS
    // ================================================================
    // Estados
    selectedIntolerancia,
    setSelectedIntolerancia,
    selectedMetaboloma,
    setSelectedMetaboloma,
    // Tests genómicos
    selectedMyPharma,
    setSelectedMyPharma,
    selectedMyDetox,
    setSelectedMyDetox,
    selectedMyDiet,
    setSelectedMyDiet,
    selectedMyAgeing,
    setSelectedMyAgeing,
    selectedMySport,
    setSelectedMySport,
    selectedMySuplements,
    setSelectedMySuplements,
    selectedLpA,
    setSelectedLpA,
    selectedIL6,
    setSelectedIL6,
    selectedTNFα,
    setSelectedTNFα,
    selectedLongitudTelomerica,
    setSelectedLongitudTelomerica,

    selectedAcidosGrasos,
    setSelectedAcidosGrasos,
    selectedVitaminaK1,
    setSelectedVitaminaK1,
    selectedHelicobacter,
    setSelectedHelicobacter,
    // Estados específicos para Hormonas
    selectedEstradiolHormonas,
    setSelectedEstradiolHormonas,
    selectedProlactinaHormonas,
    setSelectedProlactinaHormonas,
    selectedLHHormonas,
    setSelectedLHHormonas,
    selectedFSHHormonas,
    setSelectedFSHHormonas,
    // Nuevos estados para biomarcadores de Hormonas faltantes
    selectedHormonaCrecimientoHormonas,
    setSelectedHormonaCrecimientoHormonas,
    selectedTestosteronaBiodispHormonas,
    setSelectedTestosteronaBiodispHormonas,
    selectedTestosteronaLibreHormonas,
    setSelectedTestosteronaLibreHormonas,
    selectedDHTHormonas,
    setSelectedDHTHormonas,
    // Estados para biomarcadores femeninos de Hormonas
    selectedProgesterona,
    setSelectedProgesterona,
    selectedTestosteronaTotal,
    setSelectedTestosteronaTotal,
    selected17OHProgesterona,
    setSelected17OHProgesterona,
    selectedEstrona,
    setSelectedEstrona,
    // Estados específicos para Endocrino
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
    // Nuevos estados para biomarcadores de Endocrino faltantes
    selectedIGF1Endocrino,
    setSelectedIGF1Endocrino,
    selectedIGFBP3Endocrino,
    setSelectedIGFBP3Endocrino,
    selectedACTHEndocrino,
    setSelectedACTHEndocrino,
    // Estados específicos para Cancer
    // Biomarcadores comunes
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
    // Biomarcadores específicos masculinos
    selectedPSATotalCancer,
    setSelectedPSATotalCancer,
    selectedPSALibreCancer,
    setSelectedPSALibreCancer,
    // Biomarcadores específicos femeninos
    selectedHE4Cancer,
    setSelectedHE4Cancer,
    // Estados específicos para Genome
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
    // Estados específicos para Vitamina C
    selectedVitaminaCOxidativeCell,
    setSelectedVitaminaCOxidativeCell,
    selectedVitaminaCIVNutrients,
    setSelectedVitaminaCIVNutrients,
    // Estados específicos para Digestivo
    selectedOmega3Digestivo,
    setSelectedOmega3Digestivo,
    selectedLipasaDigestivo,
    setSelectedLipasaDigestivo,
    selectedAmilasaDigestivo,
    setSelectedAmilasaDigestivo,
    selectedBilirrubinaDirectaDigestivo,
    setSelectedBilirrubinaDirectaDigestivo,
    // Estados específicos para Antioxidantes
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
    // Estados específicos para Estrés Oxidativo
    selectedGlutationReductasa,
    setSelectedGlutationReductasa,
    selectedGlutationPeroxidasa,
    setSelectedGlutationPeroxidasa,
    selectedG6PD,
    setSelectedG6PD,
    selectedSelenio,
    setSelectedSelenio,
    // Estados específicos para Inflamación
    selectedVSGInflammation,
    setSelectedVSGInflammation,
    selectedIL6Inflammation,
    setSelectedIL6Inflammation,
    selectedTNFαInflammation,
    setSelectedTNFαInflammation,
    // Estados específicos para Cardiovascular
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
    // Estados específicos para IV & Nutrientes
    selectedCromoIVNutrients,
    setSelectedCromoIVNutrients,
    selectedCobreIVNutrients,
    setSelectedCobreIVNutrients,
    selectedOsmolalidadIVNutrients,
    setSelectedOsmolalidadIVNutrients,
    selectedVitaminaK1IVNutrients,
    setSelectedVitaminaK1IVNutrients,
    // Estados específicos para Metales Pesados
    selectedMercurioHeavyMetals,
    setSelectedMercurioHeavyMetals,
    selectedPlomoHeavyMetals,
    setSelectedPlomoHeavyMetals,
    selectedArsenicoHeavyMetals,
    setSelectedArsenicoHeavyMetals,
    selectedCadmioHeavyMetals,
    setSelectedCadmioHeavyMetals,
    // Estados específicos para Inmunidad
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
    // Estados específicos para Gut Gate
    selectedParasitosGutGate,
    setSelectedParasitosGutGate,
    selectedPanelAlimentarioGutGate,
    setSelectedPanelAlimentarioGutGate,
    selectedMicrobiomaGutGate,
    setSelectedMicrobiomaGutGate,
    selectedMetabolomaGutGate,
    setSelectedMetabolomaGutGate,
    // Estados específicos para Bone Mineral
    selectedCalcitriolBoneMineral,
    setSelectedCalcitriolBoneMineral,
    selectedALPOseaBoneMineral,
    setSelectedALPOseaBoneMineral,
    selectedCTXBoneMineral,
    setSelectedCTXBoneMineral,
    selectedCalcioIonicoBoneMineral,
    setSelectedCalcioIonicoBoneMineral,
    // Estados específicos para Coagulation
    selectedFibrinogenoCoagulation,
    setSelectedFibrinogenoCoagulation,
    selectedAPTTCoagulation,
    setSelectedAPTTCoagulation,
    selectedINRCoagulation,
    setSelectedINRCoagulation,
    // Estados específicos para BioAge
    selectedMyEpiAgeingBioAge,
    setSelectedMyEpiAgeingBioAge,
    selectedLongitudTelomericaBioAge,
    setSelectedLongitudTelomericaBioAge,
    selectedEspermiogramaBioAge,
    setSelectedEspermiogramaBioAge,
    selectedAMHBioAge,
    setSelectedAMHBioAge,

    
    // Funciones
    calculateAdditionalPrices,
    getAdjustedAddOnPrice,
    getSelectionSummary,
    getActualBiomarkerCount,
    getEnhancedBiomarkerCount // NUEVO: Sistema formal de opcionales
  };

  return (
    <BiomarkerSelectionContext.Provider value={value}>
      {children}
    </BiomarkerSelectionContext.Provider>
  );
}; 