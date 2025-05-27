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
  FaCheck
} from 'react-icons/fa';
import { addOns } from '../data/biomarkers';

const AddOnExplorer = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const addOnIcons = {
    hormonas: <FaDna />,
    antioxidantes: <FaShieldAlt />,
    cardio: <FaHeart />,
    bioAge: <FaClock />,
    metals: <FaIndustry />,
    cancer: <FaSearch />
  };

  const addOnColors = {
    hormonas: 'purple',
    antioxidantes: 'green',
    cardio: 'red',
    bioAge: 'blue',
    metals: 'yellow',
    cancer: 'pink'
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

  const getColorClasses = (color) => {
    const colorMap = {
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      pink: 'bg-pink-50 border-pink-200 text-pink-700'
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
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Amplía tu análisis Essential con módulos especializados. Cada add-on aporta insights únicos 
            para optimizar aspectos específicos de tu longevity, siguiendo el modelo de Function Health.
          </p>
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
                bg-white border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer
                ${selectedAddOns.includes(key) 
                  ? `${getColorClasses(addOnColors[key])} border-2 shadow-md` 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              onClick={() => toggleAddOn(key)}
            >
              {/* Layout horizontal estilo Function Health */}
              <div className="flex items-center justify-between">
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
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {addOn.description}
                    </p>
                    
                    {/* Tests en línea horizontal */}
                    <div className="flex flex-wrap gap-2">
                      {addOn.tests.slice(0, 4).map((test, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-md border"
                        >
                          {test}
                        </span>
                      ))}
                      {addOn.tests.length > 4 && (
                        <span className="px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-md border">
                          +{addOn.tests.length - 4} más
                        </span>
                      )}
                    </div>
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
            </motion.div>
          ))}
        </div>

        {/* Resumen de selección estilo Function Health */}
        {selectedAddOns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Add-Ons Seleccionados ({selectedAddOns.length})
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {selectedAddOns.map(key => (
                <span
                  key={key}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium"
                >
                  {addOns[key].name}
                </span>
              ))}
            </div>

            <p className="text-gray-600 mb-6">
              Total de biomarcadores adicionales: {' '}
              <span className="font-bold text-blue-600">
                {selectedAddOns.reduce((total, key) => total + addOns[key].testCount, 0)}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-lg bg-blue-600 text-white hover:bg-blue-700 font-bold">
                🚀 Solicitar Cotización Personalizada
              </button>
              <button 
                onClick={() => setSelectedAddOns([])}
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