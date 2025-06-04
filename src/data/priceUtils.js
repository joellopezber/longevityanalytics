/**
 * priceUtils.js
 * Utilidades para el sistema de precios dinámico
 * Facilita la migración de precios hardcodeados y proporciona funciones helper
 * 
 * Funciones principales:
 * - getPackagePricing: Obtiene precios dinámicos para cualquier paquete
 * - updateLegacyPricing: Actualiza estructura de precios legacy
 * - validatePackagePricing: Valida precios de paquetes
 * - formatPriceDisplay: Formatea precios para display
 */

import { calculatePackagePrice, calculateAddOnPrice } from './priceCalculator.js';

/**
 * Obtiene precios dinámicos para un paquete
 * @param {Array} biomarkers - Lista de biomarcadores
 * @param {string} packageType - Tipo de paquete ('essential', 'addon', 'premium')
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {object} - Precios formateados para uso en componentes
 */
export const getPackagePricing = (biomarkers, packageType = 'addon', gender = 'both') => {
  if (packageType === 'essential' || gender === 'both') {
    const pricing = calculatePackagePrice(biomarkers, gender, packageType);
    return {
      price: Math.round(pricing.finalPrice),
      testCount: pricing.testCount,
      pricePerTest: pricing.pricePerTest,
      costPrice: Math.round(pricing.costPrice), // Precio Prevenii (costo)
      marketPrice: Math.round(pricing.marketPrice), // Precio Market original
      details: pricing
    };
  } else {
    // Para add-ons con diferenciación por género
    const pricing = calculateAddOnPrice(biomarkers, packageType);
    return {
      male: {
        price: Math.round(pricing.male.price),
        testCount: pricing.male.testCount
      },
      female: {
        price: Math.round(pricing.female.price),
        testCount: pricing.female.testCount
      },
      both: {
        price: Math.round(pricing.both.price),
        testCount: pricing.both.testCount
      },
      details: pricing
    };
  }
};

/**
 * Actualiza un paquete legacy para usar precios dinámicos
 * @param {object} packageData - Datos del paquete con precios hardcodeados
 * @param {string} packageType - Tipo de paquete
 * @returns {object} - Paquete actualizado con precios dinámicos
 */
export const updateLegacyPricing = (packageData, packageType = 'addon') => {
  const { price, pvpPrice, testCount, ...rest } = packageData;
  
  return {
    ...rest,
    getPricing: (gender = 'both') => {
      return getPackagePricing(packageData.biomarkers, packageType, gender);
    }
  };
};

/**
 * Formatea precio para display en la UI
 * @param {number} price - Precio numérico
 * @param {string} currency - Moneda (default: '€')
 * @returns {string} - Precio formateado
 */
export const formatPriceDisplay = (price, currency = '€') => {
  if (typeof price !== 'number' || isNaN(price)) return `0 ${currency}`;
  return `${Math.round(price)} ${currency}`;
};

/**
 * Obtiene precios comparativos entre costo y venta
 * @param {Array} biomarkers - Lista de biomarcadores
 * @param {string} packageType - Tipo de paquete
 * @returns {object} - Comparación de precios
 */
export const getPriceComparison = (biomarkers, packageType = 'addon') => {
  const pricing = calculatePackagePrice(biomarkers, 'both', packageType);
  
  return {
    costPrice: Math.round(pricing.costPrice), // Precio Prevenii (costo)
    marketPrice: Math.round(pricing.marketPrice), // Precio Market original
    salePrice: Math.round(pricing.finalPrice), // Precio final con descuentos
    margin: pricing.margin.amount,
    marginPercentage: pricing.margin.percentage,
    testCount: pricing.testCount,
    costPerTest: Math.round((pricing.costPrice / pricing.testCount) * 100) / 100,
    salePerTest: pricing.pricePerTest
  };
};

/**
 * Valida que todos los biomarcadores de un paquete tengan precios
 * @param {Array} biomarkers - Lista de biomarcadores
 * @returns {object} - Resultado de validación
 */
export const validatePackagePricing = (biomarkers) => {
  const codesWithoutPrice = [];
  const validBiomarkers = [];
  
  biomarkers.forEach(biomarker => {
    if (!biomarker.code) {
      codesWithoutPrice.push({ name: biomarker.name, issue: 'Sin código' });
    } else {
      validBiomarkers.push(biomarker);
    }
  });
  
  return {
    isValid: codesWithoutPrice.length === 0,
    issues: codesWithoutPrice,
    validCount: validBiomarkers.length,
    totalCount: biomarkers.length
  };
};

/**
 * Genera reporte de precios para todos los paquetes
 * @param {object} packagesData - Datos de todos los paquetes
 * @returns {object} - Reporte completo de precios
 */
export const generatePricingReport = (packagesData) => {
  const report = {
    essential: null,
    addOns: {},
    summary: {
      totalPackages: 0,
      totalTests: 0,
      averagePrice: 0,
      priceRange: { min: Infinity, max: 0 }
    }
  };
  
  // Procesar Essential
  if (packagesData.essential) {
    const essentialPricing = getPackagePricing(
      packagesData.essential.biomarkers, 
      'essential', 
      'both'
    );
    report.essential = essentialPricing;
    report.summary.totalPackages++;
    report.summary.totalTests += essentialPricing.testCount;
  }
  
  // Procesar Add-ons
  if (packagesData.addOns) {
    Object.keys(packagesData.addOns).forEach(key => {
      const addOn = packagesData.addOns[key];
      const addOnPricing = getPackagePricing(addOn.biomarkers, 'addon', 'both');
      report.addOns[key] = addOnPricing;
      report.summary.totalPackages++;
      report.summary.totalTests += addOnPricing.testCount;
      
      // Actualizar rango de precios
      if (addOnPricing.price < report.summary.priceRange.min) {
        report.summary.priceRange.min = addOnPricing.price;
      }
      if (addOnPricing.price > report.summary.priceRange.max) {
        report.summary.priceRange.max = addOnPricing.price;
      }
    });
  }
  
  // Calcular precio promedio
  const allPrices = [
    report.essential?.price || 0,
    ...Object.values(report.addOns).map(addon => addon.price)
  ].filter(price => price > 0);
  
  report.summary.averagePrice = allPrices.length > 0 ? 
    Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length) : 0;
  
  return report;
};

/**
 * Compara precios actuales vs legacy para validación
 * @param {object} packageData - Paquete con precios legacy
 * @param {string} packageType - Tipo de paquete
 * @returns {object} - Comparación de precios
 */
export const compareLegacyPricing = (packageData, packageType = 'addon') => {
  const dynamicPricing = getPackagePricing(packageData.biomarkers, packageType);
  const legacyPricing = packageData.price;
  
  const comparison = {
    packageName: packageData.name,
    legacy: legacyPricing,
    dynamic: dynamicPricing,
    differences: {}
  };
  
  if (typeof legacyPricing === 'object') {
    // Precios por género
    comparison.differences.male = dynamicPricing.male?.price - (legacyPricing.male || 0);
    comparison.differences.female = dynamicPricing.female?.price - (legacyPricing.female || 0);
  } else {
    // Precio único
    comparison.differences.price = dynamicPricing.price - (legacyPricing || 0);
  }
  
  return comparison;
};

/**
 * Función helper para componentes React que necesitan precios
 * @param {object} packageData - Datos del paquete
 * @param {string} gender - Género solicitado
 * @returns {object} - Precios listos para usar en componentes
 */
export const getPackagePricingData = (packageData, gender = 'both') => {
  if (packageData.getPricing && typeof packageData.getPricing === 'function') {
    // Paquete ya actualizado con sistema dinámico
    return packageData.getPricing(gender);
  } else if (packageData.price) {
    // Paquete legacy con precios hardcodeados
    return {
      price: typeof packageData.price === 'object' ? 
        packageData.price[gender] || packageData.price.both : packageData.price,
      testCount: packageData.testCount || packageData.biomarkers?.length || 0,
      isLegacy: true
    };
  } else {
    // Calcular dinámicamente si no hay precios
    return getPackagePricing(packageData.biomarkers, 'addon', gender);
  }
}; 