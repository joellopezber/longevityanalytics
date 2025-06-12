/**
 * BiomarkerCard.jsx
 * Componente de tarjeta de biomarcador simplificado
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaInfoCircle } from 'react-icons/fa';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useBiomarkerSelection } from '../../../contexts/BiomarkerSelectionContext';
import { useBiomarkerToggle } from '../hooks/useBiomarkerToggle';

const BiomarkerCard = ({ biomarker, index, addOnId }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    selectedIntolerancia,
    selectedMetaboloma,
    selectedLpA,
    selectedMyPharmaGenome,
  } = useBiomarkerSelection();

  const {
    toggleIntoleranciaSelection,
    toggleMetabolomaSelection,
    toggleLpASelection,
    toggleMyPharmaGenomeSelection,
  } = useBiomarkerToggle();

  // Identificadores básicos
  const isIntolerancia = biomarker.name === "Intolerancia Alimentaria 200";
  const isMetaboloma = biomarker.name === "Metaboloma (orina/heces)";
  const isLpA = biomarker.name === "Lp(a) *";
  const isMyPharmaGenome = biomarker.code === "OG002" && addOnId === "genome";

  // Determinar selección
  const isSelected = (isIntolerancia && selectedIntolerancia) ||
                    (isMetaboloma && selectedMetaboloma) ||
                    (isLpA && selectedLpA) ||
                    (isMyPharmaGenome && selectedMyPharmaGenome);

  // Función toggle
  const getToggle = () => {
    if (isIntolerancia) return toggleIntoleranciaSelection;
    if (isMetaboloma) return toggleMetabolomaSelection;
    if (isLpA) return toggleLpASelection;
    if (isMyPharmaGenome) return toggleMyPharmaGenomeSelection;
    return null;
  };

  const toggleFunction = getToggle();
  const showSelector = isIntolerancia || isMetaboloma || isLpA || isMyPharmaGenome;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`
        biomarker-card bg-warm-white rounded-xl shadow-md border-2 transition-all duration-300 hover:shadow-lg
        ${isSelected 
          ? 'border-earth ring-2 ring-earth/20 bg-earth-50' 
          : 'border-gray-200 hover:border-earth/50'
        }
      `}
    >
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <h4 className="text-sm font-semibold text-stone leading-snug break-words">
                {biomarker.name}
              </h4>
              {t(`biomarkers.${biomarker.code}.description`) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="flex-shrink-0 text-taupe hover:text-earth transition-colors p-1"
                >
                  <FaInfoCircle className="text-xs" />
                </button>
              )}
            </div>
            {biomarker.code && (
              <p className="text-xs text-taupe mt-1 font-mono">
                {biomarker.code}
              </p>
            )}
          </div>

          {showSelector && toggleFunction && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFunction();
              }}
              className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                ${isSelected
                  ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                  : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                }
              `}
            >
              {isSelected ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
            </button>
          )}
        </div>
        
        <AnimatePresence>
          {isExpanded && t(`biomarkers.${biomarker.code}.description`) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 bg-earth-50 border-t border-earth">
                <div className="p-3 mt-2">
                  <p className="text-xs text-stone leading-relaxed italic">
                    {t(`biomarkers.${biomarker.code}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BiomarkerCard; 