/**
 * ProcessFlow.jsx
 * Componente que explica el proceso paso a paso del servicio
 * desde la selección hasta las recomendaciones finales
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaClipboardList, 
  FaVial, 
  FaMicroscope, 
  FaFileAlt, 
  FaUserMd,
  FaClock,
  FaShieldAlt
} from 'react-icons/fa';

const ProcessFlow = () => {
  const steps = [
    {
      id: 1,
      icon: <FaClipboardList />,
      title: "Configura",
      description: "Elige tu paquete Essential + Add-Ons",
      duration: "5 min"
    },
    {
      id: 2,
      icon: <FaVial />,
      title: "Muestra",
      description: "Mas de 50 puntos de extracción de muestras",
      duration: "20 min"
    },
    {
      id: 3,
      icon: <FaMicroscope />,
      title: "Análisis",
      description: "Procesamiento de muestras en laboratorios",
      duration: "5-7 días *"
    },
    {
      id: 4,
      icon: <FaFileAlt />,
      title: "Resultados",
      description: "Reporte analisis clínico con recomendaciones",
      duration: "Inmediato"
    }
  ];

  return (
    <section className="section bg-soft-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-stone mb-4">
            Proceso <span className="gradient-text-earth">Simple</span>
          </h2>
          <p className="text-xl text-taupe max-w-2xl mx-auto">
            De la configuración a los resultados en 4 pasos sencillos
          </p>
        </motion.div>

        {/* Timeline horizontal en una sola fila */}
        <div className="relative max-w-6xl mx-auto">
          {/* Línea de conexión */}
          <div className="absolute top-20 left-0 right-0 h-1 gradient-earth rounded-full"></div>
          
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Círculo del paso */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full gradient-earth flex items-center justify-center text-white text-xl shadow-lg">
                  {step.icon}
                </div>

                {/* Contenido simplificado */}
                <div className="bg-warm-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-cream">
                  <h3 className="text-lg font-bold text-stone mb-2">
                    {step.title}
                  </h3>
                  <p className="text-taupe text-sm mb-3">
                    {step.description}
                  </p>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-earth-100 text-earth">
                    <FaClock />
                    <span> {step.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Nota explicativa para el asterisco */}
          <div className="text-center mt-8">
            <p className="text-xs text-taupe italic">
              * Los tiempos pueden variar según los Add-Ons seleccionados
            </p>
          </div>
        </div>

        {/* Garantías con cuadros separados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-warm-white rounded-2xl shadow-lg p-8 border-2 border-earth">
            <h3 className="text-2xl font-bold text-stone text-center mb-8">
              Nuestras Garantías
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-earth-100 text-earth rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">Calidad Certificada</h4>
                <p className="text-taupe text-sm">
                  Laboratorios ISO 15189 y procesos validados internacionalmente
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-warm-100 text-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-2xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">Red de Extracción</h4>
                <p className="text-taupe text-sm">
                  Más de 50 puntos de extracción para máxima comodidad y accesibilidad
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  <FaUserMd className="text-2xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">Equipo Especializado</h4>
                <p className="text-taupe text-sm">
                  Evaluación por especialistas para recomendaciones accionables
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessFlow; 