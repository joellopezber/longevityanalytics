/**
 * GenderSelector.jsx
 * Componente para seleccionar género y filtrar biomarcadores
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FaMars, FaVenus } from 'react-icons/fa';

const GenderSelector = ({ selectedGender, onGenderChange }) => {
  const genderOptions = [
    {
      value: 'male',
      label: 'Hombre',
      icon: <FaMars />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-700'
    },
    {
      value: 'female',
      label: 'Mujer',
      icon: <FaVenus />,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-300',
      textColor: 'text-pink-700'
    }
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-warm-white rounded-2xl p-6 shadow-lg border-2 border-earth">
        <h3 className="text-lg font-bold text-stone mb-4 text-center">
          Selecciona tu perfil para análisis personalizado
        </h3>
        <div className="flex gap-4">
          {genderOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => onGenderChange(option.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all font-semibold
                ${selectedGender === option.value 
                  ? `bg-gradient-to-r ${option.color} text-white border-transparent shadow-lg` 
                  : `${option.bgColor} ${option.borderColor} ${option.textColor} hover:shadow-md`
                }
              `}
            >
              <div className="text-xl">
                {option.icon}
              </div>
              <span className="text-base">
                {option.label}
              </span>
            </motion.button>
          ))}
        </div>
        <p className="text-sm text-taupe text-center mt-3">
          Los biomarcadores se adaptarán según tu perfil biológico
        </p>
      </div>
    </div>
  );
};

export default GenderSelector; 