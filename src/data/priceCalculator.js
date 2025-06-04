/**
 * priceCalculator.js
 * Calculadora dinámica de precios para paquetes y add-ons
 * Utiliza los datos de precios del CSV para cálculos automáticos
 * 
 * Funciones principales:
 * - calculateBiomarkerListPrice: Calcula precio de lista de biomarcadores
 * - calculatePackagePrice: Calcula precio de un paquete completo
 * - calculateAddOnPrice: Calcula precio de add-ons por género
 * - getPriceBreakdown: Obtiene desglose detallado de precios
 */

import { getPriceByCode, validatePriceData } from './priceData.js';

// Configuración de markup eliminada - ya no se utiliza markup en el sistema actual

/**
 * Calcula el precio total de una lista de biomarcadores
 * @param {Array} biomarkers - Array de objetos biomarcador con código
 * @param {string} priceType - Tipo de precio ('prevenii' o 'market')
 * @param {string} gender - Género para filtrar biomarcadores ('male', 'female', 'both')
 * @returns {object} - Resultado con precio total y detalles
 */
export const calculateBiomarkerListPrice = (biomarkers, priceType = 'prevenii', gender = 'both') => {
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

// Función de descuentos por volumen eliminada - ahora el precio final es la suma exacta

// Función applyMarkup eliminada - ya no se utiliza markup en el sistema actual

/**
 * Calcula precio completo de un paquete - suma directa sin descuentos
 * Suma todos los biomarcadores individuales sin aplicar modificaciones
 * @param {Array} biomarkers - Lista de biomarcadores
 * @param {string} gender - Género ('male', 'female', 'both')
 * @param {string} packageType - Tipo de paquete ('essential', 'addon', 'premium')
 * @returns {object} - Precio completo con todos los cálculos
 */
export const calculatePackagePrice = (biomarkers, gender = 'both', packageType = 'essential') => {
  // Calcular precio de costo (Prevenii) - ESTE ES EL PRECIO FINAL SIN DESCUENTOS
  const costCalculation = calculateBiomarkerListPrice(biomarkers, 'prevenii', gender);
  
  // Calcular precio de venta (Market/PVP) - SOLO REFERENCIAL
  const marketCalculation = calculateBiomarkerListPrice(biomarkers, 'market', gender);
  
  // El precio final es exactamente la suma de precios Prevenii sin modificaciones
  const finalPrice = costCalculation.totalPrice;
  const marginAmount = marketCalculation.totalPrice - finalPrice;
  const marginPercentage = marketCalculation.totalPrice > 0 ? 
    Math.round((marginAmount / marketCalculation.totalPrice) * 100 * 100) / 100 : 0;
  
  return {
    packageType,
    gender,
    testCount: costCalculation.testCount,
    costPrice: finalPrice, // Precio final = suma exacta de precios Prevenii
    marketPrice: marketCalculation.totalPrice, // Precio Market original (PVP referencial)
    finalPrice: finalPrice, // Precio final = suma exacta sin descuentos
    pricePerTest: Math.round((finalPrice / costCalculation.testCount) * 100) / 100,
    margin: {
      amount: Math.round(marginAmount * 100) / 100,
      percentage: marginPercentage
    },
    validation: costCalculation.validation,
    breakdown: costCalculation.priceDetails
  };
};

/**
 * Calcula precios de add-on diferenciados por género
 * @param {Array} biomarkers - Lista de biomarcadores del add-on
 * @param {string} addOnType - Tipo de add-on para markup específico
 * @returns {object} - Precios para ambos géneros
 */
export const calculateAddOnPrice = (biomarkers, addOnType = 'addon') => {
  const malePrice = calculatePackagePrice(biomarkers, 'male', addOnType);
  const femalePrice = calculatePackagePrice(biomarkers, 'female', addOnType);
  const bothPrice = calculatePackagePrice(biomarkers, 'both', addOnType);
  
  return {
    male: {
      price: malePrice.finalPrice,
      testCount: malePrice.testCount,
      details: malePrice
    },
    female: {
      price: femalePrice.finalPrice,
      testCount: femalePrice.testCount,
      details: femalePrice
    },
    both: {
      price: bothPrice.finalPrice,
      testCount: bothPrice.testCount,
      details: bothPrice
    },
    // Precio promedio para display general
    averagePrice: Math.round(((malePrice.finalPrice + femalePrice.finalPrice) / 2) * 100) / 100
  };
};

/**
 * Obtiene desglose detallado de precios por categorías
 * @param {Array} biomarkers - Lista de biomarcadores
 * @param {string} gender - Género para filtrar
 * @returns {object} - Desglose por categorías
 */
export const getPriceBreakdown = (biomarkers, gender = 'both') => {
  const calculation = calculateBiomarkerListPrice(biomarkers, 'prevenii', gender);
  
  // Agrupar por categoría
  const categoryBreakdown = calculation.priceDetails.reduce((acc, item) => {
    const category = item.category || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = {
        tests: [],
        totalPrice: 0,
        testCount: 0
      };
    }
    
    acc[category].tests.push(item);
    acc[category].totalPrice += item.price;
    acc[category].testCount += 1;
    
    return acc;
  }, {});
  
  // Calcular porcentajes
  Object.keys(categoryBreakdown).forEach(category => {
    const categoryData = categoryBreakdown[category];
    categoryData.totalPrice = Math.round(categoryData.totalPrice * 100) / 100;
    categoryData.percentage = Math.round((categoryData.totalPrice / calculation.totalPrice) * 100);
    categoryData.averagePerTest = Math.round((categoryData.totalPrice / categoryData.testCount) * 100) / 100;
  });
  
  return {
    totalPrice: calculation.totalPrice,
    totalTests: calculation.testCount,
    categories: categoryBreakdown,
    validation: calculation.validation
  };
};

/**
 * Compara precios entre diferentes configuraciones
 * @param {Array} configurations - Array de configuraciones a comparar
 * @returns {object} - Comparación de precios
 */
export const comparePrices = (configurations) => {
  const results = configurations.map(config => {
    const { biomarkers, gender, packageType, name } = config;
    const calculation = calculatePackagePrice(biomarkers, gender, packageType);
    
    return {
      name: name || `${packageType}-${gender}`,
      ...calculation
    };
  });
  
  // Encontrar el más económico y más caro
  const prices = results.map(r => r.finalPrice);
  const cheapest = results.find(r => r.finalPrice === Math.min(...prices));
  const mostExpensive = results.find(r => r.finalPrice === Math.max(...prices));
  
  return {
    results,
    comparison: {
      cheapest,
      mostExpensive,
      priceRange: {
        min: Math.min(...prices),
        max: Math.max(...prices),
        difference: Math.max(...prices) - Math.min(...prices)
      }
    }
  };
};

/**
 * Valida precios de todos los paquetes del sistema
 * @param {object} packagesData - Datos de paquetes del sistema
 * @returns {object} - Reporte de validación completo
 */
export const validateAllPackagePrices = (packagesData) => {
  const validationResults = {};
  
  // Validar Essential
  if (packagesData.essential) {
    validationResults.essential = calculatePackagePrice(
      packagesData.essential.biomarkers, 
      'both', 
      'essential'
    );
  }
  
  // Validar Add-ons
  if (packagesData.addOns) {
    validationResults.addOns = {};
    Object.keys(packagesData.addOns).forEach(addOnKey => {
      const addOn = packagesData.addOns[addOnKey];
      validationResults.addOns[addOnKey] = calculateAddOnPrice(
        addOn.biomarkers, 
        'addon'
      );
    });
  }
  
  return validationResults;
};

// Configuración PRICING_CONFIG eliminada - ya no se exporta 