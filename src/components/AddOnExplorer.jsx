/**
 * AddOnExplorer.jsx
 * Componente que muestra los add-ons disponibles estilo Function Health
 * con diseño limpio y organizado para optimización de longevity
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
  FaLeaf
} from 'react-icons/fa';
import { addOnPackages as addOns } from '../data/biomarkers';

const AddOnExplorer = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [expandedAddOns, setExpandedAddOns] = useState([]);
  const [selectedBiomarkers, setSelectedBiomarkers] = useState({}); // {addOnKey: [biomarkerIndex, ...]}

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
    { id: 'all', label: 'Todos los Add-Ons', count: 6 },
    { id: 'longevity', label: 'Longevity / Healthspan', count: 4 },
    { id: 'prevention', label: 'Prevención', count: 3 },
    { id: 'optimization', label: 'Optimización', count: 3 }
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

  const toggleBiomarker = (addOnKey, biomarkerIndex) => {
    setSelectedBiomarkers(prev => {
      const currentSelected = prev[addOnKey] || [];
      const isSelected = currentSelected.includes(biomarkerIndex);
      
      if (isSelected) {
        // Quitar biomarcador
        const newSelected = currentSelected.filter(idx => idx !== biomarkerIndex);
        if (newSelected.length === 0) {
          const { [addOnKey]: removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, [addOnKey]: newSelected };
      } else {
        // Añadir biomarcador
        return { ...prev, [addOnKey]: [...currentSelected, biomarkerIndex] };
      }
    });
  };

  const isBiomarkerSelected = (addOnKey, biomarkerIndex) => {
    return selectedBiomarkers[addOnKey]?.includes(biomarkerIndex) || false;
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
            Los <span className="gradient-text">Add-Ons</span> del Essential
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
            Amplía tu análisis Essential con módulos especializados. Cada add-on aporta insights únicos 
            para optimizar aspectos específicos de tu longevity, siguiendo el modelo de Function Health.
          </p>
          
          {/* Instrucciones de uso */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="font-bold text-blue-900 mb-3 text-lg">
              🎯 Nueva Funcionalidad: Selección Personalizada
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <span className="font-bold">✅</span>
                <div>
                  <strong>Add-on Completo:</strong> Click en la card del add-on para seleccionar todos los biomarcadores
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold">🔍</span>
                <div>
                  <strong>Biomarcadores Individuales:</strong> Click en el botón <FaPlus className="inline mx-1" /> para expandir y seleccionar solo los que necesites
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtros estilo Function Health */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <FaFilter className="text-gray-500" />
            <span className="font-medium text-gray-700">Filtrar por categoría</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`
                  px-4 py-2 rounded-full border-2 transition-all font-medium
                  ${selectedFilter === filter.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }
                `}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Add-Ons estilo Function Health - Más horizontal */}
        <div className="space-y-4 mb-16">
          {Object.entries(addOns).map(([key, addOn], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                bg-white border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg
                ${selectedAddOns.includes(key) 
                  ? `${getColorClasses(addOnColors[key])} border-2 shadow-md` 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              {/* Layout horizontal estilo Function Health */}
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAddOn(key)}
              >
                {/* Lado izquierdo - Info principal */}
                <div className="flex items-center gap-6 flex-1">
                  {/* Icono */}
                  <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-md
                    ${selectedAddOns.includes(key)
                      ? 'bg-white text-gray-700'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {addOnIcons[key]}
                  </div>
                  
                  {/* Info principal */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-bold text-xl text-gray-900">
                        {addOn.name}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {addOn.testCount} biomarcadores
                      </span>
                      {/* Botón de expansión para ver biomarcadores */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAddOnExpansion(key);
                        }}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all font-medium text-sm
                          ${expandedAddOns.includes(key)
                            ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200'
                            : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-blue-300'
                          }
                        `}
                        title={expandedAddOns.includes(key) ? "Ocultar biomarcadores" : "Ver biomarcadores individuales"}
                      >
                        {expandedAddOns.includes(key) ? (
                          <>
                            <FaMinus className="text-blue-600" />
                            <span>Ocultar</span>
                          </>
                        ) : (
                          <>
                            <FaPlus className="text-gray-600" />
                            <span>Ver detalles</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {addOn.description}
                    </p>
                    
                    {/* Tests en línea horizontal - solo si no está expandido */}
                    {!expandedAddOns.includes(key) && (
                      <div className="flex flex-wrap gap-2">
                        {addOn.biomarkers?.slice(0, 4).map((biomarker, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-md border"
                          >
                            {biomarker.name}
                          </span>
                        )) || addOn.tests?.slice(0, 4).map((test, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-md border"
                          >
                            {test}
                          </span>
                        ))}
                        {(addOn.biomarkers?.length > 4 || addOn.tests?.length > 4) && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-md border">
                            +{(addOn.biomarkers?.length || addOn.tests?.length) - 4} más
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Lado derecho - Selección */}
                <div className="flex flex-col items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                    ${selectedAddOns.includes(key)
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-400'
                    }
                  `}>
                    {selectedAddOns.includes(key) && <FaCheck className="text-sm" />}
                  </div>
                  <span className="text-xs text-gray-500 text-center">
                    {selectedAddOns.includes(key) ? 'Seleccionado' : 'Seleccionar'}
                  </span>
                </div>
              </div>

              {/* Lista expandida de biomarcadores */}
              {expandedAddOns.includes(key) && addOn.biomarkers && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Biomarcadores incluidos en {addOn.name}:
                    </h4>
                    <p className="text-sm text-gray-600">
                      💡 <strong>Haz click en cualquier biomarcador</strong> para añadirlo o quitarlo individualmente de tu selección
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {addOn.biomarkers.map((biomarker, biomarkerIndex) => (
                      <div
                        key={biomarkerIndex}
                        className={`
                          flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md
                          ${isBiomarkerSelected(key, biomarkerIndex)
                            ? 'bg-green-50 border-green-300 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-blue-300'
                          }
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBiomarker(key, biomarkerIndex);
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-all
                              ${isBiomarkerSelected(key, biomarkerIndex)
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'bg-gray-100 border-gray-300 text-gray-500'
                              }
                            `}>
                              {isBiomarkerSelected(key, biomarkerIndex) ? (
                                <FaCheck className="text-sm" />
                              ) : (
                                <FaPlus className="text-sm" />
                              )}
                            </div>
                            <div>
                              <div className={`font-medium ${isBiomarkerSelected(key, biomarkerIndex) ? 'text-green-800' : 'text-gray-900'}`}>
                                {biomarker.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {biomarker.category} • Código: {biomarker.code}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`
                            px-3 py-1 rounded-full text-xs font-medium
                            ${isBiomarkerSelected(key, biomarkerIndex)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                            }
                          `}>
                            {isBiomarkerSelected(key, biomarkerIndex) ? '✓ Seleccionado' : 'Click para añadir'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Información adicional para biomarcadores seleccionados */}
                  {selectedBiomarkers[key]?.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCheck className="text-blue-600" />
                        <div className="font-semibold text-blue-800">
                          {selectedBiomarkers[key].length} biomarcador{selectedBiomarkers[key].length !== 1 ? 'es' : ''} seleccionado{selectedBiomarkers[key].length !== 1 ? 's' : ''} de {addOn.name}
                        </div>
                      </div>
                      <div className="text-sm text-blue-700">
                        Estos biomarcadores se añadirán a tu análisis Essential personalizado
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBiomarkers(prev => {
                            const { [key]: removed, ...rest } = prev;
                            return rest;
                          });
                        }}
                        className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Limpiar selección de {addOn.name}
                      </button>
                    </div>
                  )}

                  {/* Mensaje si no hay biomarcadores seleccionados */}
                  {(!selectedBiomarkers[key] || selectedBiomarkers[key].length === 0) && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
                      <div className="text-sm text-gray-600">
                        <FaPlus className="inline mr-2" />
                        Ningún biomarcador individual seleccionado
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Haz click en cualquier biomarcador de arriba para añadirlo individualmente
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Resumen de selección estilo Function Health */}
        {(selectedAddOns.length > 0 || Object.keys(selectedBiomarkers).length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Selección Personalizada
            </h3>
            
            {/* Add-Ons completos seleccionados */}
            {selectedAddOns.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Add-Ons Completos ({selectedAddOns.length})
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {selectedAddOns.map(key => (
                    <span
                      key={key}
                      className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium"
                    >
                      {addOns[key].name} ({addOns[key].testCount} tests)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Biomarcadores individuales seleccionados */}
            {Object.keys(selectedBiomarkers).length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Biomarcadores Individuales
                </h4>
                <div className="space-y-3">
                  {Object.entries(selectedBiomarkers).map(([addOnKey, biomarkerIndices]) => (
                    <div key={addOnKey} className="bg-white rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">
                        {addOns[addOnKey].name}:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {biomarkerIndices.map(biomarkerIndex => (
                          <span
                            key={biomarkerIndex}
                            className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                          >
                            {addOns[addOnKey].biomarkers[biomarkerIndex].name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-gray-600 mb-6">
              Total de biomarcadores adicionales: {' '}
              <span className="font-bold text-blue-600">
                {selectedAddOns.reduce((total, key) => total + addOns[key].testCount, 0) + 
                 Object.values(selectedBiomarkers).reduce((total, indices) => total + indices.length, 0)}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-blue-600 text-white hover:bg-blue-700 font-bold">
                🚀 Solicitar Cotización Personalizada
              </button>
              <button 
                onClick={() => {
                  setSelectedAddOns([]);
                  setSelectedBiomarkers({});
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
              Hablar con un Especialista
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AddOnExplorer; 