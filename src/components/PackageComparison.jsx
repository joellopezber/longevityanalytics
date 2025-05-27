/**
 * PackageComparison.jsx
 * Configurador interactivo: Essential + Add-Ons seleccionables
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaChartBar, FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { getEssentialPackageForGender, getAddOnPackagesForGender, getPackageTestCount } from '../data/biomarkers';

const PackageComparison = () => {
  const [selectedGender, setSelectedGender] = useState('male');
  const [selectedAddOns, setSelectedAddOns] = useState([]); // Array de IDs de Add-Ons seleccionados

  // Obtener datos filtrados por género
  const essentialPackage = getEssentialPackageForGender(selectedGender);
  const addOnPackages = getAddOnPackagesForGender(selectedGender);

  // Calcular totales dinámicos
  const calculateTotals = () => {
    let totalBiomarkers = essentialPackage.testCount;
    let totalPrice = 299; // Precio base del Essential
    let selectedAddOnsList = [];

    selectedAddOns.forEach(addOnId => {
      const addOn = addOnPackages[addOnId];
      if (addOn) {
        totalBiomarkers += getPackageTestCount(addOn, selectedGender);
        let price = typeof addOn.price === 'object' ? addOn.price[selectedGender] : addOn.price;
        totalPrice += price;
        selectedAddOnsList.push(addOn.name);
      }
    });

    return {
      totalBiomarkers,
      totalPrice,
      selectedAddOnsList
    };
  };

  const { totalBiomarkers, totalPrice, selectedAddOnsList } = calculateTotals();

  // Toggle Add-On selection
  const toggleAddOn = (addOnId) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  // Generar lista de inclusiones dinámicas
  const getDynamicIncludes = () => {
    const baseIncludes = [
      'Metabolismo glucídico completo',
      'Función renal y hepática',
      'Perfil lipídico avanzado',
      'Hormonas básicas',
      'Tiroides completo',
      'Minerales esenciales',
      'Marcadores inflamatorios'
    ];

    const addOnIncludes = selectedAddOns.map(addOnId => {
      const addOn = addOnPackages[addOnId];
      return addOn ? `+ ${addOn.name}` : '';
    }).filter(Boolean);

    return [...baseIncludes, ...addOnIncludes];
  };

  return (
    <section id="paquetes" className="section bg-soft-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone mb-4">
            Configura tu <span className="gradient-text-earth">Análisis Personalizado</span>
          </h2>
          <p className="text-xl text-taupe max-w-3xl mx-auto">
            Comienza con el Essential y añade los Add-Ons que necesites. 
            Precio y biomarcadores se actualizan automáticamente.
          </p>
        </motion.div>

        {/* Configurador: Essential + Add-Ons */}
        <div className="grid lg:grid-cols-2 max-w-7xl mx-auto package-cards-container">
          
          {/* CARD ESSENTIAL - Izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-warm-white rounded-2xl shadow-xl overflow-hidden border-2 border-earth hover:border-warm transition-all duration-300 hover:shadow-2xl package-card"
          >
            <div className="p-8">
              {/* Header del Essential */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-16 h-16 gradient-earth rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">EA</span>
                  </div>
                  <h3 className="text-3xl font-bold text-stone">Essential</h3>
                  
                  {/* Gender Selector */}
                  <div className="essential-gender-selector">
                    <button
                      onClick={() => setSelectedGender('male')}
                      className={`essential-gender-button ${
                        selectedGender === 'male' 
                          ? 'bg-earth text-white shadow-sm' 
                          : 'bg-earth-50 text-earth hover:bg-earth-100'
                      }`}
                    >
                      <span>♂</span>
                    </button>
                    <button
                      onClick={() => setSelectedGender('female')}
                      className={`essential-gender-button ${
                        selectedGender === 'female' 
                          ? 'bg-warm text-white shadow-sm' 
                          : 'bg-warm-50 text-warm hover:bg-warm-100'
                      }`}
                    >
                      <span>♀</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-lg text-taupe mb-6 leading-relaxed">
                  {essentialPackage.description}
                </p>

                {/* Contador dinámico de biomarcadores */}
                <div className="inline-flex items-center justify-center gap-3 mb-6 px-6 py-3 rounded-full bg-earth-50 border-2 border-earth">
                  <span className="text-4xl font-bold text-stone">{totalBiomarkers}</span>
                  <span className="text-lg text-taupe font-medium"> biomarcadores</span>
                </div>

                {/* Precio dinámico */}
                <div className="text-3xl font-bold mb-2 text-earth">{totalPrice}€</div>
                <div className="text-sm text-taupe">
                  {selectedAddOns.length === 0 ? 'Precio base Essential' : `Essential + ${selectedAddOns.length} Add-On${selectedAddOns.length > 1 ? 's' : ''}`}
                </div>
              </div>

              {/* Inclusiones dinámicas */}
              <div className="mb-8">
                <h4 className="font-bold text-stone mb-6 text-lg">Incluye:</h4>
                <div className="grid gap-3 max-h-80 overflow-y-auto">
                  {getDynamicIncludes().map((feature, idx) => (
                    <div key={idx} className={`
                      flex items-center gap-3 p-3 rounded-lg border
                      ${feature.startsWith('+') 
                        ? 'bg-warm-50 border-warm' 
                        : 'bg-earth-50 border-earth'
                      }
                    `}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        feature.startsWith('+') ? 'bg-warm' : 'bg-earth'
                      }`}>
                        {feature.startsWith('+') ? (
                          <FaPlus className="text-white text-xs" />
                        ) : (
                          <FaCheck className="text-white text-xs" />
                        )}
                      </div>
                      <span className={`font-medium text-sm ${
                        feature.startsWith('+') ? 'text-warm font-semibold' : 'text-taupe'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONFIGURADOR ADD-ONS - Derecha */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-warm-white rounded-2xl shadow-xl overflow-hidden border-2 border-warm transition-all duration-300 hover:shadow-2xl package-card"
          >
            <div className="p-8">
              {/* Header del Configurador */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-stone mb-3">Add-Ons</h3>
                <p className="text-lg text-taupe mb-6 leading-relaxed">
                  Selecciona los módulos especializados que necesites. 
                  Cada Add-On se suma al Essential para una evaluación más profunda.
                </p>
              </div>

              {/* Grid de Add-Ons */}
              <div className="space-y-8 max-h-96 overflow-y-auto px-2">
                {Object.values(addOnPackages).map((addOn, index) => {
                  const isSelected = selectedAddOns.includes(addOn.id);
                  const testCount = getPackageTestCount(addOn, selectedGender);
                  
                  return (
                    <motion.div
                      key={addOn.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`
                        border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 mb-4
                        ${isSelected 
                          ? 'border-warm bg-warm-50 shadow-md' 
                          : 'border-cream bg-white hover:border-warm hover:bg-warm-50'
                        }
                      `}
                      onClick={() => toggleAddOn(addOn.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          {/* Checkbox visual */}
                          <div className={`
                            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                            ${isSelected 
                              ? 'bg-warm border-warm' 
                              : 'border-cream hover:border-warm'
                            }
                          `}>
                            {isSelected && <FaCheck className="text-white text-xs" />}
                          </div>
                          
                          {/* Info del Add-On */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-lg">{addOn.icon}</span>
                              <h4 className="font-bold text-stone text-sm">{addOn.name}</h4>
                            </div>
                            <p className="text-xs text-taupe mb-2">{addOn.description}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-warm font-semibold">{typeof addOn.price === 'object' ? `${addOn.price[selectedGender]}€` : `${addOn.price}€`}</span>
                              <span className="text-taupe">{testCount} biomarcadores</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-warm-white rounded-2xl shadow-lg p-8 max-w-6xl mx-auto border-2 border-earth">
            <h3 className="text-2xl font-bold text-stone mb-4">
              Todos los Paquetes Incluyen
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-earth-100 text-earth rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaCheck className="text-xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">Selección Personalizada</h4>
                <p className="text-taupe text-sm">
                  Configuración adaptada a tus objetivos específicos de salud
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-warm-100 text-warm rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaChartBar className="text-xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">Análisis Especializado</h4>
                <p className="text-taupe text-sm">
                  Interpretación enfocada en longevity y optimización
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                  <FaChartBar className="text-xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">Recomendaciones Accionables</h4>
                <p className="text-taupe text-sm">
                  Protocolos específicos de suplementación y estilo de vida
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-earth-200 text-earth rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaStar className="text-xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">Recomendaciones de Seguimiento</h4>
                <p className="text-taupe text-sm">
                  Guías para monitoreo y próximos pasos en tu journey de longevity
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageComparison; 