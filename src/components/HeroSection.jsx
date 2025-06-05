/**
 * HeroSection.jsx
 * Componente principal de presentación estilo Function Health
 * con diseño limpio y minimalista para longevity analytics
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaArrowRight, FaCheckCircle, FaPills, FaUtensils, FaRunning, FaSyringe, FaFlask, FaChartLine, FaUsers, FaRocket } from 'react-icons/fa';

const HeroSection = () => {
  const { t } = useLanguage();
  
  const scrollToSystems = () => {
    document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-soft-cream pt-20 pb-12 lg:pt-24 lg:pb-16">
      <div className="container max-w-7xl">
        {/* Hero principal estilo Function Health */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Logo y branding - PRIMERO */}
          <div className="flex flex-col items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 gradient-earth rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">LA</span>
            </div>
            <span className="text-3xl font-bold gradient-text-earth">Longevity Analytics</span>
            <p className="text-sm text-taupe italic mt-2">{t('hero.tagline')}</p>
          </div>

          {/* Frase principal - SEGUNDO */}
          <h1 className="text-3xl lg:text-4xl font-bold text-stone mb-6 leading-tight max-w-4xl mx-auto">
            {t('hero.title')}
          </h1>

          {/* Descripción - TERCERO */}
          <p className="text-lg text-taupe max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex justify-center mb-8">
            <button 
              onClick={scrollToSystems}
              className="inline-flex items-center bg-earth text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-stone transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('hero.exploreButton')}
            </button>
          </div>
        </motion.div>



        {/* Diferenciación clave mejorada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="gradient-earth rounded-2xl p-6 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-6">
            {t('hero.beyondDiagnosis')} <span className="text-cream">{t('hero.actionableRecommendations')}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white border-opacity-30">
                <FaPills className="text-lg text-white" />
              </div>
              <div className="font-bold text-cream mb-2 text-base">{t('hero.supplementation')}</div>
              <div className="text-white text-opacity-90 text-xs leading-relaxed">
                {t('hero.supplementationDesc')}
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white border-opacity-30">
                <FaUtensils className="text-lg text-white" />
              </div>
              <div className="font-bold text-cream mb-2 text-base">{t('hero.nutrition')}</div>
              <div className="text-white text-opacity-90 text-xs leading-relaxed">
                {t('hero.nutritionDesc')}
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white border-opacity-30">
                <FaRunning className="text-lg text-white" />
              </div>
              <div className="font-bold text-cream mb-2 text-base">{t('hero.lifestyle')}</div>
              <div className="text-white text-opacity-90 text-xs leading-relaxed">
                {t('hero.lifestyleDesc')}
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white border-opacity-30">
                <FaSyringe className="text-lg text-white" />
              </div>
              <div className="font-bold text-cream mb-2 text-base">{t('hero.monitoring')}</div>
              <div className="text-white text-opacity-90 text-xs leading-relaxed">
                {t('hero.monitoringDesc')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 