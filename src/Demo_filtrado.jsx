/**
 * Demo_filtrado.jsx
 * Componente de demostración del filtrado automático de add-ons por perfil
 * Muestra cómo el add-on de inflamación se filtra para Performance
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaCheck, FaTimes, FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Importar las funciones de filtrado
import { performancePackage, getProfileCodes } from './data/analysisPackages';
import { inflamacionPackage, getAddOnPackagesForProfile } from './data/addOnPackages';

const Demo_filtrado = () => {
  const [selectedGender] = useState('male');
  const [showDetails, setShowDetails] = useState(false);

  // Datos del filtrado
  const performanceCodes = getProfileCodes(performancePackage, selectedGender);
  const inflamacionOriginal = inflamacionPackage.getForGender(selectedGender);
  const filteredAddOns = getAddOnPackagesForProfile(selectedGender, performanceCodes);
  const inflamacionFiltrado = filteredAddOns.inflammation;

  // Códigos que se filtraron
  const codigosOriginales = inflamacionOriginal.biomarkers.map(b => b.code);
  const codigosFiltrados = inflamacionFiltrado?.biomarkers?.map(b => b.code) || [];
  const codigosEliminados = codigosOriginales.filter(code => !codigosFiltrados.includes(code));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaFilter className="text-3xl text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Demo: Filtrado Automático de Add-Ons
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demostración de cómo el sistema filtra automáticamente biomarcadores duplicados 
            entre el perfil Performance y el add-on de Inflamación
          </p>
        </motion.div>

        {/* Performance Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Perfil Performance (Masculino)
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {performanceCodes.length} biomarcadores
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Biomarcadores de Inflamación incluidos:</h3>
              <div className="space-y-2">
                {[
                  { code: 'B7790', name: 'IL-6 (Interleucina-6)' },
                  { code: 'I2081', name: 'TNF-α (Factor de Necrosis Tumoral alfa)' },
                  { code: 'B3170', name: 'PCR (hsCRP)' }
                ].map((biomarker) => (
                  <div key={biomarker.code} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <FaCheck className="text-green-600 text-sm" />
                    <span className="text-sm">
                      <strong>{biomarker.code}</strong> - {biomarker.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">NO incluye:</h3>
              <div className="p-2 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-center gap-2">
                  <FaTimes className="text-orange-600 text-sm" />
                  <span className="text-sm">
                    <strong>H0020</strong> - VSG (Velocidad de Sedimentación Globular)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Add-on Original */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaFire className="text-2xl text-red-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">Add-on Inflamación</h3>
                <p className="text-sm text-gray-600">Versión completa (estándar)</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Total biomarcadores:</span>
                <span className="bg-gray-800 text-white px-2 py-1 rounded">{inflamacionOriginal.testCount}</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Biomarcadores incluidos:</h4>
                {inflamacionOriginal.biomarkers.map((biomarker, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">
                      <strong>{biomarker.code}</strong> - {biomarker.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Add-on Filtrado */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaFire className="text-2xl text-green-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">Add-on Inflamación</h3>
                <p className="text-sm text-green-600 font-medium">Filtrado para Performance ✨</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Total biomarcadores:</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded">{inflamacionFiltrado?.testCount || 0}</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Biomarcadores únicos:</h4>
                {inflamacionFiltrado?.biomarkers?.map((biomarker, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">
                      <strong>{biomarker.code}</strong> - {biomarker.name}
                    </span>
                  </div>
                )) || (
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-600 text-sm">No hay biomarcadores únicos - todos están en Performance</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filtrado Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg"
        >
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="text-xl font-bold">¿Cómo funciona el filtrado automático?</h3>
            {showDetails ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">1. Análisis del Perfil Base</h4>
                  <p className="text-sm">
                    Performance incluye B7790 (IL-6), I2081 (TNF-α) y B3170 (PCR) como parte de su análisis estándar.
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">2. Filtrado Inteligente</h4>
                  <p className="text-sm">
                    El sistema detecta automáticamente biomarcadores duplicados y los elimina del add-on.
                  </p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">3. Optimización de Valor</h4>
                  <p className="text-sm">
                    Solo se muestran biomarcadores únicos: H0020 (VSG), proporcionando valor real al cliente.
                  </p>
                </div>
              </div>
              
              {codigosEliminados.length > 0 && (
                <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Biomarcadores filtrados (duplicados):</h4>
                  <div className="flex flex-wrap gap-2">
                    {codigosEliminados.map((code) => (
                      <span key={code} className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="text-green-600 text-xl" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Sin Duplicados</h4>
            <p className="text-sm text-gray-600">Eliminación automática de biomarcadores ya incluidos en el perfil base</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFilter className="text-blue-600 text-xl" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Filtrado Inteligente</h4>
            <p className="text-sm text-gray-600">Adaptación automática del contenido según el perfil seleccionado</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaFire className="text-purple-600 text-xl" />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Máximo Valor</h4>
            <p className="text-sm text-gray-600">Solo se paga por biomarcadores únicos que añaden valor real</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo_filtrado; 