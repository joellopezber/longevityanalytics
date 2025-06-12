/**
 * Footer.jsx
 * Componente de pie de página con traducciones
 */

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone text-cream py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 gradient-earth rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">LA</span>
              </div>
              <span className="text-xl font-bold text-cream">Longevity Analytics</span>
            </div>
            <p className="text-beige text-sm leading-relaxed">
              Precision Data for Optimization.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-semibold mb-6 text-cream">{t('footer.services')}</h4>
            <ul className="space-y-3 text-beige text-sm list-none" style={{listStyle: 'none'}}>
              <li>{t('footer.essentialAnalysis')}</li>
              <li>{t('footer.specializedAddons')}</li>
              <li>{t('footer.personalizedRecommendations')}</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-6 text-cream">{t('footer.contact')}</h4>
            <div className="space-y-3 text-beige text-sm">
              <div>
                <div className="font-medium text-cream">{t('footer.email')}</div>
                <a href="mailto:partnerships@longevityanalytics.com" className="hover:text-cream transition-colors no-underline">
                  partnerships@longevityanalytics.com
                </a>
              </div>
              <div>
                <div className="font-medium text-cream">{t('footer.phone')}</div>
                <span>+34 900 000 000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-taupe mt-12 pt-8 text-center">
          <p className="text-beige text-sm">
            © 2025 Longevity Analytics. {t('footer.rightsCopyright')}
          </p>
          <p className="text-beige text-xs mt-2 opacity-75">
            {t('footer.poweredBy')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 