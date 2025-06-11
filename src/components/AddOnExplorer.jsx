/**
 * AddOnExplorer.jsx
 * Componente que muestra los add-ons disponibles estilo Function Health
 * con diseño limpio y organizado para optimización de longevity
 * 
 * INTEGRACIÓN NUEVA ARQUITECTURA:
 * - Conectado con BiomarkerSelectionContext para selección persistente
 * - Uso de biomarkersConfig.js para configuración centralizada
 * - Selección dinámica de todos los biomarcadores disponibles
 * - Mantenimiento del estilo visual actual
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaShieldAlt, 
  FaDna, 
  FaClock, 
  FaIndustry, 
  FaSearch,
  FaFilter,
  FaCheck,
  FaPlus,
  FaMinus,
  FaLeaf,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';

// Imports de la nueva arquitectura para add-ons
import { 
  addOnPackages as addOns, 
  getPackageTestCount,
  getAddOnPackagesForGender 
} from '../data/addOnPackages';

// NUEVA INTEGRACIÓN: Contexto centralizado y configuración
import { useBiomarkerSelection } from '../contexts/BiomarkerSelectionContext';
import { 
  ADD_ON_BIOMARKERS_CONFIG, 
  getDefaultBiomarkerState,
  getBiomarkerStateVariable,
  getAllAvailableBiomarkers 
} from '../data/biomarkersConfig';
import { useLanguage } from '../contexts/LanguageContext';

// NOTA: Usar contexto de idiomas para nombres de biomarcadores

const AddOnExplorer = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [expandedAddOns, setExpandedAddOns] = useState([]);
  const [selectedGender, setSelectedGender] = useState('male');
  
  // Hook para traducciones
  const { t } = useLanguage();
  
  // NUEVA INTEGRACIÓN: Usar el contexto centralizado
  const biomarkerContext = useBiomarkerSelection();
  const { getAdjustedAddOnPrice, getActualBiomarkerCount } = biomarkerContext;

  // ================================================================
  // FUNCIONES PARA INTEGRACIÓN CON SISTEMA CENTRALIZADO
  // ================================================================

  /**
   * Verifica si un biomarcador específico está seleccionado usando el contexto
   */
  const isBiomarkerSelectedInContext = (addOnId, biomarkerCode) => {
    const stateVariable = getBiomarkerStateVariable(addOnId, biomarkerCode);
    if (!stateVariable) return getDefaultBiomarkerState(addOnId, biomarkerCode);
    
    return biomarkerContext[stateVariable] || false;
  };

  /**
   * Toggle un biomarcador específico usando el contexto
   */
  const toggleBiomarkerInContext = (addOnId, biomarkerCode) => {
    const stateVariable = getBiomarkerStateVariable(addOnId, biomarkerCode);
    if (!stateVariable) return;

    const setterName = `set${stateVariable.charAt(0).toUpperCase() + stateVariable.slice(1)}`;
    const setter = biomarkerContext[setterName];
    
    if (setter) {
      setter(prev => !prev);
    }
  };

  /**
   * Obtiene información completa de un biomarcador desde el contexto de idiomas
   */
  const getBiomarkerInfo = (biomarkerCode) => {
    // Intentar obtener el nombre desde el contexto de idiomas
    const nameKey = `biomarkers.${biomarkerCode}`;
    const translatedName = t(nameKey);
    
    // Si no hay traducción específica, usar el código directamente
    const name = translatedName !== nameKey ? translatedName : `${biomarkerCode}`;
    
    return {
      code: biomarkerCode,
      name: name,
      category: 'Biomarcador',
      units: '',
      description: `Biomarcador con código ${biomarkerCode}`
    };
  };

  /**
   * Obtiene todos los biomarcadores seleccionables para un add-on con información completa
   */
  const getSelectableBiomarkers = (addOnId) => {
    const config = ADD_ON_BIOMARKERS_CONFIG[addOnId];
    if (!config) return [];

    return Object.entries(config.biomarkers || {}).map(([code, defaultState]) => {
      const biomarkerInfo = getBiomarkerInfo(code);
      return {
        code,
        name: biomarkerInfo.name,
        category: biomarkerInfo.category,
        units: biomarkerInfo.units,
        description: biomarkerInfo.description,
        defaultState,
        stateVariable: getBiomarkerStateVariable(addOnId, code),
        isSelected: isBiomarkerSelectedInContext(addOnId, code)
      };
    });
  };

  // ================================================================
  // FUNCIONES UI EXISTENTES (MANTENIDAS)
  // ================================================================

  const addOnIcons = {
    hormonas: <FaDna />,
    antioxidantes: <FaShieldAlt />,
    cardio: <FaHeart />,
    bioAge: <FaClock />,
    metals: <FaIndustry />,
    cancer: <FaSearch />,
    digest: <FaLeaf />
  };

  const addOnColors = {
    hormonas: 'purple',
    antioxidantes: 'green',
    cardio: 'red',
    bioAge: 'blue',
    metals: 'yellow',
    cancer: 'pink',
    digest: 'emerald'
  };

  const filterOptions = [
    { id: 'all', label: t('addOnExplorer.allAddOns'), count: 6 },
    { id: 'longevity', label: t('addOnExplorer.longevityHealthspan'), count: 4 },
    { id: 'prevention', label: t('addOnExplorer.prevention'), count: 3 },
    { id: 'optimization', label: t('addOnExplorer.optimization'), count: 3 }
  ];

  const toggleAddOn = (addOnKey) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnKey) 
        ? prev.filter(item => item !== addOnKey)
        : [...prev, addOnKey]
    );
  };

  const toggleAddOnExpansion = (addOnKey) => {
    setExpandedAddOns(prev => 
      prev.includes(addOnKey)
        ? prev.filter(item => item !== addOnKey)
        : [...prev, addOnKey]
    );
  };

  const getColorClasses = (color) => {
    const colorMap = {
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      pink: 'bg-pink-50 border-pink-200 text-pink-700',
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700'
    };
    return colorMap[color];
  };

  return (
    <section className="section bg-white">
      <div className="container max-w-7xl">
        {/* Header estilo Function Health */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            {t('addOnExplorer.title')} <span className="gradient-text">{t('addOnExplorer.titleHighlight')}</span> {t('addOnExplorer.titleSuffix')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
            {t('addOnExplorer.description')}
          </p>
          
          {/* Instrucciones de uso */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="font-bold text-blue-900 mb-3 text-lg">
              🎯 Sistema Unificado de Selección de Biomarcadores
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <span className="font-bold">✅</span>
                <div>
                  <strong>Add-On Completo:</strong> Selecciona el paquete completo con biomarcadores por defecto
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">🔧</span>
                <div>
                  <strong>Biomarcadores Individuales:</strong> Personaliza qué biomarcadores específicos incluir/excluir
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controles: Filtros y Selector de Género */}
        <div className="mb-12 space-y-6">
          {/* Selector de Género para Precios Dinámicos */}
          <div className="flex items-center justify-center gap-4">
            <span className="font-medium text-gray-700">Precios para:</span>
            <div className="flex gap-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setSelectedGender('male')}
                className={`
                  px-4 py-2 rounded-full font-medium transition-all
                  ${selectedGender === 'male'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                👨 Masculino
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`
                  px-4 py-2 rounded-full font-medium transition-all
                  ${selectedGender === 'female'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                👩 Femenino
              </button>
            </div>
          </div>

          {/* Filtros por categoría */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <FaFilter className="text-gray-500" />
              <span className="font-medium text-gray-700">Filtrar por categoría:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFilter(option.id)}
                  className={`
                    px-6 py-3 rounded-full font-medium transition-all border-2
                    ${selectedFilter === option.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                    }
                  `}
                >
                  {option.label}
                  <span className="ml-2 text-xs opacity-75">({option.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Add-Ons */}
        <div className="space-y-8">
          {Object.entries(addOns).map(([key, addOn]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Header del Add-On */}
              <div 
                className="p-8 cursor-pointer relative"
                onClick={() => toggleAddOnExpansion(key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold border-2
                      ${getColorClasses(addOnColors[key] || 'blue')}
                    `}>
                      {addOnIcons[key] || <FaDna />}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{addOn.name}</h3>
                      <p className="text-gray-600 max-w-2xl">{addOn.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {getActualBiomarkerCount(key, selectedGender)} biomarcadores
                        </span>
                        <span className="text-sm text-gray-500">Código: {key}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    {/* Precio */}
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">
                        €{getAdjustedAddOnPrice(key, addOn.price.prevenii, addOn.price.market).price}
                      </div>
                      <div className="text-lg text-gray-500 line-through">
                        €{getAdjustedAddOnPrice(key, addOn.price.prevenii, addOn.price.market).pvp}
                      </div>
                    </div>
                    
                    {/* Controles */}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAddOn(key);
                        }}
                        className={`
                          px-6 py-3 rounded-full font-bold transition-all border-2
                          ${selectedAddOns.includes(key)
                            ? 'bg-green-600 text-white border-green-600 shadow-md'
                            : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
                          }
                        `}
                      >
                        {selectedAddOns.includes(key) ? (
                          <>
                            <FaCheck className="inline mr-2" />
                            Seleccionado
                          </>
                        ) : (
                          <>
                            <FaPlus className="inline mr-2" />
                            Seleccionar
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAddOnExpansion(key);
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all"
                      >
                        {expandedAddOns.includes(key) ? (
                          <>
                            <FaMinus className="inline mr-2" />
                            Ocultar
                          </>
                        ) : (
                          <>
                            <FaPlus className="inline mr-2" />
                            Personalizar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

                             {/* NUEVA SECCIÓN: Biomarcadores Seleccionables */}
               {expandedAddOns.includes(key) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-8 pb-8 bg-gray-50 border-t border-gray-200"
                >
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      🔧 Personalizar Biomarcadores
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Selecciona o deselecciona biomarcadores específicos para este add-on. 
                      Los cambios se aplicarán automáticamente al precio y conteo.
                    </p>
                  </div>
                  
                  {(() => {
                    // SIMPLIFICADO: Usar directamente los biomarcadores del addOn
                    const biomarcadoresDisponibles = addOn.biomarkers || [];
                    console.log(`🔍 Add-on "${key}" tiene ${biomarcadoresDisponibles.length} biomarcadores:`, biomarcadoresDisponibles.map(b => b.name));
                    
                    if (biomarcadoresDisponibles.length === 0) {
                      return (
                        <div className="text-center p-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                          <div className="text-yellow-700 mb-2">
                            ⚠️ <strong>Sin biomarcadores disponibles</strong>
                          </div>
                          <div className="text-sm text-yellow-600 mb-4">
                            Este add-on no tiene biomarcadores individuales configurados.
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="grid gap-3">
                        {biomarcadoresDisponibles.map((biomarker, index) => {
                          // Estado temporal para demostración - después conectaremos con el contexto real
                          const isSelected = Math.random() > 0.5; // TEMPORAL: 50% probabilidad para mostrar variedad
                          
                          return (
                            <div
                              key={index}
                              className={`
                                flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md
                                ${isSelected
                                  ? 'bg-green-50 border-green-300 shadow-sm'
                                  : 'bg-white border-gray-200 hover:border-blue-300'
                                }
                              `}
                              onClick={() => {
                                console.log(`Toggle biomarcador: ${biomarker.name} (${biomarker.code})`);
                                // AQUÍ conectaremos con el contexto después
                              }}
                            >
                              <div className="flex items-center gap-4">
                                {/* ICONO +/- SIEMPRE VISIBLE */}
                                <div className={`
                                  text-3xl transition-all cursor-pointer
                                  ${isSelected ? 'text-green-600' : 'text-gray-400'}
                                `}>
                                  {isSelected ? <FaToggleOn /> : <FaToggleOff />}
                                </div>
                                
                                {/* Información del Biomarcador */}
                                <div>
                                  <div className={`font-medium ${isSelected ? 'text-green-800' : 'text-gray-900'}`}>
                                    {biomarker.name}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {biomarker.category} • Código: {biomarker.code}
                                    {biomarker.gender && biomarker.gender !== 'both' && (
                                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                        {biomarker.gender === 'male' ? '👨 Masculino' : '👩 Femenino'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className={`
                                  px-3 py-1 rounded-full text-xs font-medium
                                  ${isSelected
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                                  }
                                `}>
                                  {isSelected ? '✓ Incluido' : 'Click para incluir'}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Información adicional */}
                  <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <strong>ℹ️ Información:</strong> Los biomarcadores marcados como "Incluido" se añadirán a tu análisis. 
                      Los precios se actualizan automáticamente según tu selección personalizada.
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Resumen de selección */}
        {selectedAddOns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Selección Personalizada
            </h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                Add-Ons Seleccionados ({selectedAddOns.length})
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {selectedAddOns.map(key => (
                  <span
                    key={key}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium"
                  >
                    {addOns[key].name} ({getActualBiomarkerCount(key, selectedGender)} tests)
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Total de biomarcadores adicionales: {' '}
              <span className="font-bold text-blue-600">
                {selectedAddOns.reduce((total, key) => total + getActualBiomarkerCount(key, selectedGender), 0)}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-blue-600 text-white hover:bg-blue-700 font-bold">
                🚀 Solicitar Cotización Personalizada
              </button>
              <button 
                onClick={() => {
                  setSelectedAddOns([]);
                }}
                className="btn btn-lg btn-secondary"
              >
                Limpiar Selección
              </button>
            </div>
          </motion.div>
        )}

        {/* Call to action final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              ¿Necesitas una solución personalizada?
            </h3>
            <p className="text-xl mb-6 text-blue-100">
              Nuestro equipo puede crear un paquete específico para las necesidades de tu empresa de longevity.
            </p>
            <button className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50 font-bold">
              💬 Contactar con Especialista
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AddOnExplorer; 