/**
 * CALCULADORA DE PRECIOS - MIGRADO AUTOMÁTICAMENTE
 * Sistema de cálculo de precios tipado
 */

import type { 
  Biomarker, 
  BiomarkerListPriceResult, 
  PackagePriceResult, 
  AddOnPriceResult,
  Gender 
} from '../../types/biomarkers';






export const calculateBiomarkerListPrice = (biomarkers, priceType = 'precio', gender = 'both') => {
  // Filtrar biomarcadores por género si es necesario
  const filteredBiomarkers = biomarkers.filter(biomarker => {
    if (!biomarker.gender || biomarker.gender === 'both') return true;
    return biomarker.gender === gender;
  });

  // Validar que todos los códigos tengan precios
  const codes = filteredBiomarkers.map(b => b.code).filter(Boolean);
  const validation = validatePriceData(codes);
  
  if (!validation.isValid) {
    console.warn('Códigos sin precio encontrados:', validation.missingCodes);
  }

  // Calcular precio total
  let totalPrice = 0;
  const priceDetails = [];
  
  filteredBiomarkers.forEach(biomarker => {
    if (!biomarker.code) {
      console.warn('Biomarcador sin código:', biomarker.name);
      return;
    }
    
    const price = getPriceByCode(biomarker.code, priceType);
    totalPrice += price;
    
    priceDetails.push({
      name: biomarker.name,
      code: biomarker.code,
      price: price,
      category: biomarker.category || 'Sin categoría'
    });
  });

  return {
    totalPrice: Math.round(totalPrice * 100) / 100, // Redondear a 2 decimales
    testCount: filteredBiomarkers.length,
    priceDetails,
    validation,
    averagePerTest: filteredBiomarkers.length > 0 ? 
      Math.round((totalPrice / filteredBiomarkers.length) * 100) / 100 : 0
  };
};


export const calculatePackagePrice = (biomarkers, gender = 'both', packageType = 'essential') => {
  // Calcular precio de costo (nuestro precio) - suma de biomarcadores individuales
  const costCalculation = calculateBiomarkerListPrice(biomarkers, 'precio', gender);
  
  // Calcular precio de venta (PVP) - precio al público
  const marketCalculation = calculateBiomarkerListPrice(biomarkers, 'pvp', gender);
  
  // SOLO DOS PRECIOS PRINCIPALES
  const precio = Math.round(costCalculation.totalPrice * 100) / 100; // Nuestro costo
  const pvp = Math.round(marketCalculation.totalPrice * 100) / 100;   // Precio al público
  
  return {
    packageType,
    gender,
    testCount: costCalculation.testCount,
    
    // === PRECIOS PRINCIPALES ===
    precio: precio,     // Nuestro precio (suma de precios de costo)
    pvp: pvp,          // Precio al público (suma de pvp)
    
    // === CAMPOS AUXILIARES ===
    pricePerTest: Math.round((precio / costCalculation.testCount) * 100) / 100,
    validation: costCalculation.validation,
    breakdown: costCalculation.priceDetails,
    
    // === COMPATIBILIDAD (deprecados) ===
    basePrice: precio,     // Para compatibilidad - mismo que precio
    marketPrice: pvp,      // Para compatibilidad - mismo que pvp
    costPrice: precio,     // Para compatibilidad - mismo que precio
    markup: 0             // Siempre 0 tras eliminación
    // finalPrice eliminado - solo se usaba en comparePrices que fue eliminada
  };
};


export const calculateAddOnPrice = (biomarkers, addOnType = 'addon') => {
  const malePrice = calculatePackagePrice(biomarkers, 'male', `addon_${addOnType}`);
  const femalePrice = calculatePackagePrice(biomarkers, 'female', `addon_${addOnType}`);
  const bothPrice = calculatePackagePrice(biomarkers, 'both', `addon_${addOnType}`);
  
  return {
    male: {
      price: malePrice.basePrice,
      testCount: malePrice.testCount,
      details: malePrice
    },
    female: {
      price: femalePrice.basePrice,
      testCount: femalePrice.testCount,
      details: femalePrice
    },
    both: {
      price: bothPrice.basePrice,
      testCount: bothPrice.testCount,
      details: bothPrice
    },
    // Precio promedio para display general
    averagePrice: Math.round(((malePrice.basePrice + femalePrice.basePrice) / 2) * 100) / 100
  };
};

// getPriceBreakdown - ELIMINADA: No se usa en ningún lugar

// comparePrices - ELIMINADA: No se usa en ningún lugar

// validateAllPackagePrices - ELIMINADA: No se usa en ningún lugar 