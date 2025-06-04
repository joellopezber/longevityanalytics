/**
 * BiomarkerSelectionContext.js
 * Contexto para manejar las selecciones de biomarcadores individuales
 */

import React, { createContext, useContext, useState } from 'react';
import { getPriceByCode } from '../data/priceData.js';

const BiomarkerSelectionContext = createContext();

export const useBiomarkerSelection = () => {
  const context = useContext(BiomarkerSelectionContext);
  if (!context) {
    throw new Error('useBiomarkerSelection must be used within a BiomarkerSelectionProvider');
  }
  return context;
};

export const BiomarkerSelectionProvider = ({ children }) => {
  // Estados para biomarcadores individuales seleccionados
  const [selectedIntolerancia, setSelectedIntolerancia] = useState(false);
  const [selectedMetaboloma, setSelectedMetaboloma] = useState(false);
  // Tests genómicos
  const [selectedMyPharma, setSelectedMyPharma] = useState(false);
  const [selectedMyDetox, setSelectedMyDetox] = useState(false);
  const [selectedMyDiet, setSelectedMyDiet] = useState(false);
  const [selectedMyAgeing, setSelectedMyAgeing] = useState(false);
  const [selectedMySport, setSelectedMySport] = useState(false);
  const [selectedMySuplements, setSelectedMySuplements] = useState(false);
  const [selectedLpA, setSelectedLpA] = useState(false); // Por defecto seleccionado
  const [selectedIL6, setSelectedIL6] = useState(true); // Por defecto seleccionado
  const [selectedTNFα, setSelectedTNFα] = useState(true); // Por defecto seleccionado
  const [selectedLongitudTelomerica, setSelectedLongitudTelomerica] = useState(false); // Por defecto deseleccionado
  const [selectedVitaminaC, setSelectedVitaminaC] = useState(true); // Por defecto seleccionada
  const [selectedAcidosGrasos, setSelectedAcidosGrasos] = useState(false); // Por defecto NO seleccionado
  const [selectedVitaminaK1, setSelectedVitaminaK1] = useState(true); // Por defecto SÍ seleccionado
  const [selectedHelicobacter, setSelectedHelicobacter] = useState(true); // Por defecto seleccionado
  // Estados específicos para add-on Hormonas
  const [selectedEstradiolHormonas, setSelectedEstradiolHormonas] = useState(true); // Por defecto seleccionado
  const [selectedProlactinaHormonas, setSelectedProlactinaHormonas] = useState(true); // Por defecto seleccionado
  const [selectedLHHormonas, setSelectedLHHormonas] = useState(true); // Por defecto seleccionado
  const [selectedFSHHormonas, setSelectedFSHHormonas] = useState(true); // Por defecto seleccionado
  
  // Estados específicos para add-on Endocrino
  const [selectedEstradiolEndocrino, setSelectedEstradiolEndocrino] = useState(true); // Por defecto seleccionado
  const [selectedProlactinaEndocrino, setSelectedProlactinaEndocrino] = useState(true); // Por defecto seleccionado
  const [selectedLHEndocrino, setSelectedLHEndocrino] = useState(true); // Por defecto seleccionado
  const [selectedFSHEndocrino, setSelectedFSHEndocrino] = useState(true); // Por defecto seleccionado
  const [selectedVSGEndocrino, setSelectedVSGEndocrino] = useState(false); // Por defecto NO seleccionado
  const [selectedVitaminaD125OHEndocrino, setSelectedVitaminaD125OHEndocrino] = useState(true); // Por defecto seleccionado
  
  // Estados específicos para add-on Cancer (FSH femenino)
  const [selectedFSHCancer, setSelectedFSHCancer] = useState(true); // Por defecto seleccionado
  
  // Estados específicos para biomarcadores con múltiples contextos
  const [selectedVitaminaCOxidativeCell, setSelectedVitaminaCOxidativeCell] = useState(true); // Estrés Oxidativo Celular
  const [selectedVitaminaCIVNutrients, setSelectedVitaminaCIVNutrients] = useState(true); // IV & Nutrientes
  
  // Estados específicos para digestivo
  const [selectedUrinalisisDigestivo, setSelectedUrinalisisDigestivo] = useState(true); // Por defecto seleccionado
  const [selectedOvaParasitesDigestivo, setSelectedOvaParasitesDigestivo] = useState(true); // Por defecto seleccionado
  


  // Función para calcular precios adicionales basados en selecciones
  const calculateAdditionalPrices = () => {
    let digestExtra = { price: 0, pvp: 0 };
    let gutGateExtra = { price: 0, pvp: 0 };
    let genomeExtra = { price: 0, pvp: 0 };
    let cardiovascularExtra = { price: 0, pvp: 0 };
    let bioAgeExtra = { price: 0, pvp: 0 };
    let oxidativeCellExtra = { price: 0, pvp: 0 };
    let ivNutrientsExtra = { price: 0, pvp: 0 };
    let immunityExtra = { price: 0, pvp: 0 };
    let endocrinoExtra = { price: 0, pvp: 0 };
    let hormonasExtra = { price: 0, pvp: 0 };

    // Digestivo - Intolerancia Alimentaria + Urianálisis + Ova & Parasites
    let digestPrice = 0;
    let digestPvp = 0;
    if (selectedIntolerancia) {
      digestPrice += getPriceByCode('P3031', 'prevenii');
      digestPvp += getPriceByCode('P3031', 'market');
    }
    if (selectedUrinalisisDigestivo) {
      digestPrice += getPriceByCode('6897', 'prevenii');
      digestPvp += getPriceByCode('6897', 'market');
    }
    if (selectedOvaParasitesDigestivo) {
      digestPrice += getPriceByCode('M1190', 'prevenii');
      digestPvp += getPriceByCode('M1190', 'market');
    }
    digestExtra = { price: digestPrice, pvp: digestPvp };

    // Gut Gate - Metaboloma
    if (selectedMetaboloma) {
      const price = getPriceByCode('AB002', 'prevenii');
      const pvp = getPriceByCode('AB002', 'market');
      gutGateExtra = { price, pvp };
    }

    // Cardiovascular - Lp(a), IL-6, TNF-α
    let cardioPrice = 0;
    let cardioPvp = 0;
    if (selectedLpA) {
      cardioPrice += getPriceByCode('B7700', 'prevenii');
      cardioPvp += getPriceByCode('B7700', 'market');
    }
    if (selectedIL6) {
      cardioPrice += getPriceByCode('B7790', 'prevenii');
      cardioPvp += getPriceByCode('B7790', 'market');
    }
    if (selectedTNFα) {
      cardioPrice += getPriceByCode('I2081', 'prevenii');
      cardioPvp += getPriceByCode('I2081', 'market');
    }
    cardiovascularExtra = { price: cardioPrice, pvp: cardioPvp };

    // Edad Biológica - Longitud telomérica
    if (selectedLongitudTelomerica) {
      const price = getPriceByCode('G1465', 'prevenii');
      const pvp = getPriceByCode('G1465', 'market');
      bioAgeExtra = { price, pvp };
    }

    // Estrés Oxidativo Celular - Vitamina C específica
    if (selectedVitaminaCOxidativeCell) {
      const price = getPriceByCode('T1061', 'prevenii');
      const pvp = getPriceByCode('T1061', 'market');
      oxidativeCellExtra = { price, pvp };
    }

    // IV & Nutrientes - Vitamina C específica, Ácidos grasos %, Vitamina K1
    let ivPrice = 0;
    let ivPvp = 0;
    if (selectedVitaminaCIVNutrients) {
      ivPrice += getPriceByCode('T1061', 'prevenii');
      ivPvp += getPriceByCode('T1061', 'market');
    }
    if (selectedAcidosGrasos) {
      ivPrice += getPriceByCode('T2590', 'prevenii');
      ivPvp += getPriceByCode('T2590', 'market');
    }
    if (selectedVitaminaK1) {
      ivPrice += getPriceByCode('T1720', 'prevenii');
      ivPvp += getPriceByCode('T1720', 'market');
    }
    ivNutrientsExtra = { price: ivPrice, pvp: ivPvp };

    // Genome - Tests genómicos
    let genomPrice = 0;
    let genomPvp = 0;
    
    // Tests genómicos
    if (selectedMyPharma) {
      genomPrice += getPriceByCode('GP001', 'prevenii');
      genomPvp += getPriceByCode('GP001', 'market');
    }
    if (selectedMyDetox) {
      genomPrice += getPriceByCode('GD001', 'prevenii');
      genomPvp += getPriceByCode('GD001', 'market');
    }
    if (selectedMyDiet) {
      genomPrice += getPriceByCode('GN001', 'prevenii');
      genomPvp += getPriceByCode('GN001', 'market');
    }
    if (selectedMyAgeing) {
      genomPrice += getPriceByCode('GA001', 'prevenii');
      genomPvp += getPriceByCode('GA001', 'market');
    }
    if (selectedMySport) {
      genomPrice += getPriceByCode('GS001', 'prevenii');
      genomPvp += getPriceByCode('GS001', 'market');
    }
    if (selectedMySuplements) {
      genomPrice += getPriceByCode('GU001', 'prevenii');
      genomPvp += getPriceByCode('GU001', 'market');
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

    return {
      digestExtra,
      gutGateExtra,
      genomeExtra,
      cardiovascularExtra,
      bioAgeExtra,
      oxidativeCellExtra,
      ivNutrientsExtra,
      immunityExtra,
      endocrinoExtra,
      hormonasExtra
    };
  };

  // Función para obtener precio ajustado de un add-on específico
  const getAdjustedAddOnPrice = (addOnId, basePrice, basePvp) => {
    const extras = calculateAdditionalPrices();
    
    switch (addOnId) {
      case 'digest':
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
      default:
        return { price: basePrice, pvp: basePvp };
    }
  };

  // Función para obtener resumen de selecciones
  const getSelectionSummary = () => {
    const selected = [];
    if (selectedIntolerancia) selected.push('Intolerancia Alimentaria 200');
    if (selectedMetaboloma) selected.push('Metaboloma (orina/heces)');
    if (selectedMyPharma) selected.push('MyPharma');
    if (selectedMyDetox) selected.push('MyDetox');
    if (selectedMyDiet) selected.push('MyDiet');
    if (selectedMyAgeing) selected.push('MyAgeing');
    if (selectedMySport) selected.push('MySport');
    if (selectedMySuplements) selected.push('MySuplements');
    if (selectedLpA) selected.push('Lp(a) *');
    if (selectedIL6) selected.push('IL-6');
    if (selectedTNFα) selected.push('TNF-α');
    if (selectedLongitudTelomerica) selected.push('Longitud telomérica');
    if (selectedVitaminaC) selected.push('Vitamina C');
    if (selectedAcidosGrasos) selected.push('Ácidos grasos %');
    if (selectedVitaminaK1) selected.push('Vitamina K1');
    if (selectedHelicobacter) selected.push('Helicobacter pylori IgG An');
    // Hormonas específicas
    if (selectedEstradiolHormonas) selected.push('Estradiol (Hormonas)');
    if (selectedProlactinaHormonas) selected.push('Prolactina (Hormonas)');
    if (selectedLHHormonas) selected.push('LH (Hormonas)');
    if (selectedFSHHormonas) selected.push('FSH (Hormonas)');
    // Endocrino específicas
    if (selectedEstradiolEndocrino) selected.push('Estradiol (Endocrino)');
    if (selectedProlactinaEndocrino) selected.push('Prolactina (Endocrino)');
    if (selectedLHEndocrino) selected.push('LH (Endocrino)');
    if (selectedFSHEndocrino) selected.push('FSH (Endocrino)');
    if (selectedVSGEndocrino) selected.push('VSG (Endocrino)');
    if (selectedVitaminaD125OHEndocrino) selected.push('Vitamina D 1,25-OH (Endocrino)');
    // Cancer específicas
    if (selectedFSHCancer) selected.push('FSH (Cancer)');
    // Vitamina C específicas
    if (selectedVitaminaCOxidativeCell) selected.push('Vitamina C (Estrés Oxidativo)');
    if (selectedVitaminaCIVNutrients) selected.push('Vitamina C (IV & Nutrientes)');
    // Digestivo específicas
    if (selectedUrinalisisDigestivo) selected.push('Urianálisis + sedimento (Digestivo)');
    if (selectedOvaParasitesDigestivo) selected.push('Ova & Parasites stool (Digestivo)');
    return selected;
  };

  const value = {
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
    selectedVitaminaC,
    setSelectedVitaminaC,
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
    // Estados específicos para Cancer
    selectedFSHCancer,
    setSelectedFSHCancer,
    // Estados específicos para Vitamina C
    selectedVitaminaCOxidativeCell,
    setSelectedVitaminaCOxidativeCell,
    selectedVitaminaCIVNutrients,
    setSelectedVitaminaCIVNutrients,
    // Estados específicos para Digestivo
    selectedUrinalisisDigestivo,
    setSelectedUrinalisisDigestivo,
    selectedOvaParasitesDigestivo,
    setSelectedOvaParasitesDigestivo,

    
    // Funciones
    calculateAdditionalPrices,
    getAdjustedAddOnPrice,
    getSelectionSummary
  };

  return (
    <BiomarkerSelectionContext.Provider value={value}>
      {children}
    </BiomarkerSelectionContext.Provider>
  );
}; 