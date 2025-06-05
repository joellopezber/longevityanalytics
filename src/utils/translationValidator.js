/**
 * translationValidator.js
 * Utilidad para validar que todas las traducciones están completas
 */

import { translations } from '../contexts/LanguageContext';

export const validateTranslations = () => {
  const languages = Object.keys(translations);
  const issues = [];

  // Función recursiva para obtener todas las claves anidadas
  const getAllKeys = (obj, prefix = '') => {
    const keys = [];
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys.push(...getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  };

  // Obtener todas las claves del idioma base (español)
  const baseKeys = getAllKeys(translations.es);

  // Verificar que todas las claves existen en todos los idiomas
  languages.forEach(lang => {
    const langKeys = getAllKeys(translations[lang]);
    
    // Verificar claves faltantes
    baseKeys.forEach(key => {
      if (!langKeys.includes(key)) {
        issues.push({
          type: 'missing_key',
          language: lang,
          key: key,
          message: `Clave faltante en ${lang}: ${key}`
        });
      }
    });

    // Verificar claves extra
    langKeys.forEach(key => {
      if (!baseKeys.includes(key)) {
        issues.push({
          type: 'extra_key',
          language: lang,
          key: key,
          message: `Clave extra en ${lang}: ${key}`
        });
      }
    });
  });

  return {
    isValid: issues.length === 0,
    issues: issues,
    summary: {
      totalKeys: baseKeys.length,
      languages: languages.length,
      totalIssues: issues.length
    }
  };
};

// Función para ejecutar validación y mostrar resultados
export const runTranslationValidation = () => {
  const result = validateTranslations();
  
  console.log('🌐 VALIDACIÓN DE TRADUCCIONES');
  console.log('============================');
  console.log(`Total de claves: ${result.summary.totalKeys}`);
  console.log(`Idiomas: ${result.summary.languages}`);
  console.log(`Problemas encontrados: ${result.summary.totalIssues}`);
  
  if (result.isValid) {
    console.log('✅ Todas las traducciones están completas!');
  } else {
    console.log('❌ Se encontraron problemas:');
    result.issues.forEach(issue => {
      console.log(`  - ${issue.message}`);
    });
  }
  
  return result;
};

export default { validateTranslations, runTranslationValidation }; 