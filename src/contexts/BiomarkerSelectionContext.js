/**
 * BiomarkerSelectionContext.js
 * Contexto para manejar las selecciones de biomarcadores individuales
 */

import React, { createContext, useContext, useState } from 'react';

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
  const [selectedGenomNutricion, setSelectedGenomNutricion] = useState(false);
  const [selectedGenomFarmaco, setSelectedGenomFarmaco] = useState(false);
  const [selectedGenomSuplem, setSelectedGenomSuplem] = useState(false);

  // Función para calcular precios adicionales basados en selecciones
  const calculateAdditionalPrices = () => {
    let digestExtra = { price: 0, pvp: 0 };
    let gutGateExtra = { price: 0, pvp: 0 };
    let genomeExtra = { price: 0, pvp: 0 };

    // Digestivo - Intolerancia Alimentaria
    if (selectedIntolerancia) {
      digestExtra = { price: 160, pvp: 180.69 };
    }

    // Gut Gate - Metaboloma
    if (selectedMetaboloma) {
      gutGateExtra = { price: 360, pvp: 399 };
    }

    // Genome - Análisis individuales
    let genomPrice = 0;
    let genomPvp = 0;
    if (selectedGenomNutricion) {
      genomPrice += 50;
      genomPvp += 83.33;
    }
    if (selectedGenomFarmaco) {
      genomPrice += 50;
      genomPvp += 83.33;
    }
    if (selectedGenomSuplem) {
      genomPrice += 50;
      genomPvp += 83.33;
    }
    genomeExtra = { price: genomPrice, pvp: genomPvp };

    return {
      digestExtra,
      gutGateExtra,
      genomeExtra
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
      default:
        return { price: basePrice, pvp: basePvp };
    }
  };

  // Función para obtener resumen de selecciones
  const getSelectionSummary = () => {
    const selected = [];
    if (selectedIntolerancia) selected.push('Intolerancia Alimentaria 200');
    if (selectedMetaboloma) selected.push('Metaboloma (orina/heces)');
    if (selectedGenomNutricion) selected.push('Genom Analisis - Nutrición');
    if (selectedGenomFarmaco) selected.push('Genom Analisis - Farmacogenómica');
    if (selectedGenomSuplem) selected.push('Genom Analisis - Suplementación');
    return selected;
  };

  const value = {
    // Estados
    selectedIntolerancia,
    setSelectedIntolerancia,
    selectedMetaboloma,
    setSelectedMetaboloma,
    selectedGenomNutricion,
    setSelectedGenomNutricion,
    selectedGenomFarmaco,
    setSelectedGenomFarmaco,
    selectedGenomSuplem,
    setSelectedGenomSuplem,
    
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