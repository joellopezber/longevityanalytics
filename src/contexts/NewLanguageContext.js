/**
 * NewLanguageContext.js
 * Nuevo contexto de idiomas optimizado con sistema modular de traducciones
 * Reemplaza el sistema monolítico anterior con archivos JSON organizados
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadTranslations, validateTranslations } from '../utils/translationLoader';

const LanguageContext = createContext();

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);

  // Cargar traducciones al inicializar
  useEffect(() => {
    try {
      const loadedTranslations = loadTranslations();
      setTranslations(loadedTranslations);
      
      // Validar traducciones
      const errors = validateTranslations(loadedTranslations);
      setValidationErrors(errors);
      
      if (errors.length > 0) {
        console.warn('⚠️ Faltan traducciones:', errors);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Error cargando traducciones:', error);
      setIsLoading(false);
    }
  }, []);

  // Función para cambiar idioma
  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem('selectedLanguage', language);
    } else {
      console.warn(`⚠️ Idioma no disponible: ${language}`);
    }
  };

  // Función para obtener traducciones con fallback
  const t = (key, defaultValue = null) => {
    if (isLoading) return defaultValue || key;
    
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    // Navegar por la estructura anidada
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback al español si no se encuentra la clave
        if (currentLanguage !== 'es') {
          let fallback = translations['es'];
          for (const k of keys) {
            if (fallback && typeof fallback === 'object' && k in fallback) {
              fallback = fallback[k];
            } else {
              fallback = null;
              break;
            }
          }
          if (fallback) {
            console.warn(`⚠️ Usando fallback para ${key} en ${currentLanguage}`);
            return fallback;
          }
        }
        
        // Si no hay fallback, devolver valor por defecto o la clave
        console.warn(`⚠️ Traducción no encontrada: ${key} en ${currentLanguage}`);
        return defaultValue || key;
      }
    }
    
    return value;
  };

  // Función para obtener todas las traducciones de una sección
  const getSection = (sectionKey) => {
    if (isLoading) return {};
    
    const section = translations[currentLanguage]?.[sectionKey];
    if (!section) {
      console.warn(`⚠️ Sección no encontrada: ${sectionKey} en ${currentLanguage}`);
      return translations['es']?.[sectionKey] || {};
    }
    
    return section;
  };

  // Función para verificar si una clave existe
  const hasTranslation = (key) => {
    if (isLoading) return false;
    
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return false;
      }
    }
    
    return value !== undefined;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getSection,
    hasTranslation,
    isLoading,
    validationErrors,
    availableLanguages: Object.keys(translations)
  };

  if (isLoading) {
    return (
      <LanguageContext.Provider value={value}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white">Cargando traducciones...</div>
        </div>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 