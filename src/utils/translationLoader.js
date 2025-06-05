/**
 * translationLoader.js
 * Sistema de carga automática de traducciones desde archivos JSON organizados
 * Reemplaza el sistema monolítico anterior con arquitectura modular
 */

// Importaciones dinámicas de todos los archivos de traducción
import esNavbar from '../locales/es/navbar.json';
import enNavbar from '../locales/en/navbar.json';
import frNavbar from '../locales/fr/navbar.json';

import esHero from '../locales/es/hero.json';
import enHero from '../locales/en/hero.json';
import frHero from '../locales/fr/hero.json';

import esAddons from '../locales/es/addons.json';
import enAddons from '../locales/en/addons.json';
import frAddons from '../locales/fr/addons.json';

/**
 * Carga y organiza todas las traducciones desde archivos JSON
 * @returns {Object} Objeto con todas las traducciones organizadas por idioma
 */
export const loadTranslations = () => {
  return {
    es: {
      navbar: esNavbar,
      hero: esHero,
      addOns: esAddons,
      // Aquí iremos agregando más secciones conforme las creemos
    },
    en: {
      navbar: enNavbar,
      hero: enHero,
      addOns: enAddons,
      // Aquí iremos agregando más secciones conforme las creemos
    },
    fr: {
      navbar: frNavbar,
      hero: frHero,
      addOns: frAddons,
      // Aquí iremos agregando más secciones conforme las creemos
    }
  };
};

/**
 * Valida que todas las claves de traducción existan en todos los idiomas
 * @param {Object} translations - Objeto de traducciones
 * @returns {Array} Array de claves faltantes
 */
export const validateTranslations = (translations) => {
  const missingKeys = [];
  const languages = Object.keys(translations);
  const baseLanguage = 'es'; // Idioma base para comparación
  
  if (!translations[baseLanguage]) {
    return ['Base language (es) not found'];
  }

  const baseKeys = extractAllKeys(translations[baseLanguage]);
  
  languages.forEach(lang => {
    if (lang === baseLanguage) return;
    
    const langKeys = extractAllKeys(translations[lang]);
    const missing = baseKeys.filter(key => !langKeys.includes(key));
    
    missing.forEach(key => {
      missingKeys.push(`${lang}.${key}`);
    });
  });
  
  return missingKeys;
};

/**
 * Extrae recursivamente todas las claves de un objeto
 * @param {Object} obj - Objeto del cual extraer claves
 * @param {string} prefix - Prefijo para las claves anidadas
 * @returns {Array} Array de todas las claves
 */
const extractAllKeys = (obj, prefix = '') => {
  let keys = [];
  
  Object.keys(obj).forEach(key => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(extractAllKeys(obj[key], newKey));
    } else {
      keys.push(newKey);
    }
  });
  
  return keys;
}; 