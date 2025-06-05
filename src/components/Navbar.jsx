/**
 * Navbar.jsx
 * Componente de navegación con selector de idiomas integrado
 */

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FaGlobe, FaBars, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getLanguageDisplay = (lang) => {
    const flags = { es: '🇪🇸', en: '🇬🇧', fr: '🇫🇷' };
    const names = { es: 'Español', en: 'English', fr: 'Français' };
    return { flag: flags[lang], name: names[lang] };
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-earth rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">LA</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Longevity Analytics
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#systems" className="text-gray-600 hover:text-earth transition-colors font-medium no-underline">
              {t('navbar.clinicalAnalysis')}
            </a>
            <a href="#paquetes" className="text-gray-600 hover:text-earth transition-colors font-medium no-underline">
              {t('navbar.addons')}
            </a>
            <a href="#proceso" className="text-gray-600 hover:text-earth transition-colors font-medium no-underline">
              {t('navbar.process')}
            </a>
            
            {/* Selector de idiomas minimalista */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="text-gray-600 hover:text-earth transition-colors text-sm"
              >
                {getLanguageDisplay(currentLanguage).flag}
              </button>

              {/* Menú desplegable minimalista */}
              {isLanguageMenuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded shadow-lg border border-gray-100 z-50">
                  {['es', 'en', 'fr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full px-3 py-1.5 text-center hover:bg-gray-50 ${
                        currentLanguage === lang ? 'bg-earth-50' : ''
                      }`}
                    >
                      {getLanguageDisplay(lang).flag}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <a href="#contacto" className="bg-earth text-white px-6 py-2 rounded-full font-semibold hover:bg-stone transition-colors no-underline">
              {t('navbar.contact')}
            </a>
          </div>
          
          {/* Menú móvil */}
          <div className="md:hidden flex items-center gap-3">
            {/* Selector de idiomas móvil minimalista */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="text-gray-600 hover:text-earth transition-colors"
              >
                {getLanguageDisplay(currentLanguage).flag}
              </button>

              {/* Menú desplegable móvil */}
              {isLanguageMenuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white rounded shadow-lg border border-gray-100 z-50">
                  {['es', 'en', 'fr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full px-3 py-1.5 text-center hover:bg-gray-50 ${
                        currentLanguage === lang ? 'bg-earth-50' : ''
                      }`}
                    >
                      {getLanguageDisplay(lang).flag}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 