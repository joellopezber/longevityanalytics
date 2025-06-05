/**
 * CallToAction.jsx
 * Componente final de llamada a la acción simplificado
 * con información de contacto para empresas
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCalendarAlt
} from 'react-icons/fa';

const CallToAction = () => {
  const { t } = useLanguage();
  return (
    <section className="section gradient-bg text-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            {t('cta.description')}
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <a 
              href={`mailto:partnerships@longevityanalytics.com?subject=${encodeURIComponent(t('cta.emailSubject'))}`}
              className="inline-flex items-center gap-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl px-8 py-4 border border-white border-opacity-30 hover:bg-opacity-30 transition-all cursor-pointer no-underline"
            >
              <FaEnvelope className="text-white text-xl" />
              <span className="text-lg font-semibold text-white">{t('cta.contactButton')}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 