/**
 * ProcessFlow.jsx
 * Componente que explica el proceso paso a paso del servicio
 * desde la selección hasta las recomendaciones finales
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FaClipboardList, 
  FaVial, 
  FaMicroscope, 
  FaFileAlt, 
  FaUserMd,
  FaClock,
  FaShieldAlt,
  FaLock,
  FaComments,
  FaArrowRight
} from 'react-icons/fa';

const ProcessFlow = () => {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      icon: <FaClipboardList />,
      title: t('process.step1.title'),
      description: t('process.step1.description'),
      duration: t('process.step1.duration')
    },
    {
      id: 2,
      icon: <FaVial />,
      title: t('process.step2.title'),
      description: t('process.step2.description'),
      duration: t('process.step2.duration')
    },
    {
      id: 3,
      icon: <FaMicroscope />,
      title: t('process.step3.title'),
      description: t('process.step3.description'),
      duration: t('process.step3.duration')
    },
    {
      id: 4,
      icon: <FaFileAlt />,
      title: t('process.step4.title'),
      description: t('process.step4.description'),
      duration: t('process.step4.duration')
    },
    {
      id: 5,
      icon: <FaComments />,
      title: t('process.step5.title'),
      description: t('process.step5.description'),
      duration: t('process.step5.duration')
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
            <span className="gradient-text-earth">{t('process.title')}</span> {t('process.subtitle')}
          </h2>
          <p className="text-xl text-taupe max-w-4xl mx-auto">
            {t('process.description')}
          </p>
        </motion.div>

        {/* Flujo horizontal con flechas */}
        <div className="relative max-w-7xl mx-auto">
          {/* Vista desktop - flujo horizontal */}
          <div className="hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex-1 text-center relative"
                >
                  {/* Número del paso */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="w-8 h-8 bg-earth text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                      {step.id}
                    </span>
                  </div>

                  {/* Card del paso */}
                  <div className="bg-warm-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-cream hover:border-earth group">
                    {/* Icono principal */}
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-earth flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>

                    {/* Título */}
                    <h3 className="text-xl font-bold text-stone mb-3">
                      {step.title}
                    </h3>

                    {/* Descripción más corta para mantener altura consistente */}
                    <p className="text-taupe text-sm mb-4 min-h-[4rem] overflow-hidden">
                      {step.description.length > 100 
                        ? step.description.substring(0, 100) + "..." 
                        : step.description}
                    </p>

                    {/* Duración */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-earth-100 text-earth">
                      <FaClock />
                      <span> {step.duration}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Flecha entre pasos (excepto después del último) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                    className="flex items-center justify-center mx-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-earth to-warm flex items-center justify-center text-white shadow-lg">
                      <FaArrowRight className="text-lg" />
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Vista móvil - flujo vertical */}
          <div className="md:hidden space-y-6">
            {steps.map((step, index) => (
              <React.Fragment key={`mobile-${step.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Card del paso para móvil */}
                  <div className="bg-warm-white rounded-2xl shadow-lg p-6 border-2 border-cream">
                    <div className="flex items-start gap-4">
                      {/* Número y icono lado izquierdo */}
                      <div className="flex flex-col items-center">
                        <span className="w-10 h-10 bg-earth text-white text-lg font-bold rounded-full flex items-center justify-center shadow-lg mb-2">
                          {step.id}
                        </span>
                        <div className="w-12 h-12 rounded-full gradient-earth flex items-center justify-center text-white text-lg shadow-lg">
                          {step.icon}
                        </div>
                      </div>

                      {/* Contenido lado derecho */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-stone mb-2">
                          {step.title}
                        </h3>
                        <p className="text-taupe text-sm mb-3">
                          {step.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-earth-100 text-earth">
                          <FaClock />
                          <span> {step.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Flecha vertical entre pasos (solo móvil) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className="flex justify-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-earth to-warm flex items-center justify-center text-white shadow-lg rotate-90">
                      <FaArrowRight className="text-sm" />
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
          
        {/* Nota explicativa para el asterisco */}
        <div className="text-center mt-8">
          <p className="text-xs text-taupe italic">
            {t('process.timeNote')}
          </p>
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
              {t('process.guarantees')}
            </h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-earth-100 text-earth rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">{t('process.certifiedQuality')}</h4>
                <p className="text-taupe text-sm">
                  {t('process.certifiedQualityDesc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-warm-100 text-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="text-2xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">{t('process.extractionNetwork')}</h4>
                <p className="text-taupe text-sm">
                  {t('process.extractionNetworkDesc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  <FaUserMd className="text-2xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">{t('process.healthCoach')}</h4>
                <p className="text-taupe text-sm">
                  {t('process.healthCoachDesc')}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-earth-200 text-earth rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLock className="text-2xl" />
                </div>
                <h4 className="font-semibold text-stone mb-2">{t('process.gdprCompliance')}</h4>
                <p className="text-taupe text-sm">
                  {t('process.gdprComplianceDesc')}
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