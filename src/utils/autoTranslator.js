/**
 * autoTranslator.js
 * Sistema de traducción automática para facilitar la gestión de idiomas
 * Utiliza LibreTranslate (API gratuita) para traducciones automáticas
 */

// Función para traducir texto usando LibreTranslate (gratuito)
const translateText = async (text, fromLang = 'es', toLang = 'en') => {
  try {
    // LibreTranslate API gratuita
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: fromLang,
        target: toLang,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error de traducción: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.warn(`Error traduciendo "${text}":`, error.message);
    return text; // Retorna el texto original si falla
  }
};

// Función para traducir un objeto de traducciones completo
const translateObject = async (obj, fromLang = 'es', toLang = 'en') => {
  const translated = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Traducir recursivamente objetos anidados
      translated[key] = await translateObject(obj[key], fromLang, toLang);
    } else if (typeof obj[key] === 'string') {
      // Traducir strings
      console.log(`Traduciendo: ${obj[key]}`);
      translated[key] = await translateText(obj[key], fromLang, toLang);
      
      // Pausa pequeña para no sobrecargar la API
      await new Promise(resolve => setTimeout(resolve, 100));
    } else {
      translated[key] = obj[key];
    }
  }

  return translated;
};

// Función principal para generar traducciones automáticas
export const generateAutoTranslations = async (spanishTranslations) => {
  console.log('🌐 INICIANDO TRADUCCIÓN AUTOMÁTICA');
  console.log('==================================');
  
  try {
    console.log('📝 Traduciendo al inglés...');
    const englishTranslations = await translateObject(spanishTranslations, 'es', 'en');
    
    console.log('📝 Traduciendo al francés...');
    const frenchTranslations = await translateObject(spanishTranslations, 'es', 'fr');

    console.log('✅ Traducciones automáticas completadas');
    
    return {
      es: spanishTranslations,
      en: englishTranslations,
      fr: frenchTranslations
    };
  } catch (error) {
    console.error('❌ Error en la traducción automática:', error);
    return null;
  }
};

// Función para agregar nuevas claves y traducirlas automáticamente
export const addNewTranslationKey = async (keyPath, spanishText, existingTranslations) => {
  console.log(`🔄 Agregando nueva clave: ${keyPath}`);
  
  try {
    // Traducir automáticamente
    const englishText = await translateText(spanishText, 'es', 'en');
    const frenchText = await translateText(spanishText, 'es', 'fr');

    // Función para agregar clave anidada
    const addNestedKey = (obj, path, value) => {
      const keys = path.split('.');
      let current = obj;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
    };

    // Agregar a cada idioma
    const updatedTranslations = JSON.parse(JSON.stringify(existingTranslations));
    addNestedKey(updatedTranslations.es, keyPath, spanishText);
    addNestedKey(updatedTranslations.en, keyPath, englishText);
    addNestedKey(updatedTranslations.fr, keyPath, frenchText);

    console.log('✅ Nueva clave agregada y traducida:');
    console.log(`   ES: ${spanishText}`);
    console.log(`   EN: ${englishText}`);
    console.log(`   FR: ${frenchText}`);

    return updatedTranslations;
  } catch (error) {
    console.error('❌ Error agregando nueva clave:', error);
    return existingTranslations;
  }
};

// Función para detectar idioma automáticamente
export const detectLanguage = async (text) => {
  try {
    const response = await fetch('https://libretranslate.de/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: text }),
    });

    if (!response.ok) {
      throw new Error(`Error detectando idioma: ${response.status}`);
    }

    const data = await response.json();
    return data[0]?.language || 'es'; // Default a español
  } catch (error) {
    console.warn('Error detectando idioma:', error.message);
    return 'es'; // Default a español
  }
};

// Validador de traducciones automáticas
export const validateAutoTranslations = (translations) => {
  const languages = Object.keys(translations);
  const issues = [];

  // Verificar que todos los idiomas tengan las mismas claves
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

  const baseKeys = getAllKeys(translations.es);

  languages.forEach(lang => {
    const langKeys = getAllKeys(translations[lang]);
    
    baseKeys.forEach(key => {
      if (!langKeys.includes(key)) {
        issues.push(`Clave faltante en ${lang}: ${key}`);
      }
    });
  });

  return {
    isValid: issues.length === 0,
    issues: issues
  };
};

// Utilidades para exportar/importar traducciones
export const exportTranslationsToJSON = (translations) => {
  return JSON.stringify(translations, null, 2);
};

export const importTranslationsFromJSON = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error importando traducciones:', error);
    return null;
  }
};

export default {
  translateText,
  translateObject,
  generateAutoTranslations,
  addNewTranslationKey,
  detectLanguage,
  validateAutoTranslations,
  exportTranslationsToJSON,
  importTranslationsFromJSON
}; 