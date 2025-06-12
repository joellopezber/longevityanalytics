/**
 * HERO SECTION COMPONENT
 * Sección hero principal para la landing page de longevidad
 */

'use client';

import { useState } from 'react';
import PackageQuestionnaireModal from '@/components/landing/PackageQuestionnaireModal';

export default function HeroSection() {
  const [showPackageSelector, setShowPackageSelector] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left">

            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Toma el Control de tu{' '}
              <span className="bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
                Longevidad
              </span>
            </h1>
            
            <div className="space-y-8 mb-12">
              <p className="text-xl text-gray-600 max-w-2xl">
                En un mundo donde la medicina reactiva domina, nosotros creemos en el poder de la 
                <strong className="text-gray-800"> medicina preventiva y personalizada</strong>. 
                Tu salud no debería ser un misterio.
              </p>
              
              <p className="text-lg text-gray-600 max-w-2xl">
                Nuestros análisis avanzados te proporcionan información detallada y accionable sobre 
                tu cuerpo, permitiéndote tomar decisiones informadas para optimizar tu salud, 
                rendimiento y bienestar a largo plazo.
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-10">
                <p className="text-green-800 font-medium">
                  "La longevidad no se trata solo de vivir más años, sino de vivir mejor cada año que tienes."
                </p>
              </div>
            </div>
            

            
            {/* Value Propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 mt-12">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Prevención Inteligente</h4>
                  <p className="text-sm text-gray-600">Detecta problemas antes de que se conviertan en enfermedades</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Personalización Total</h4>
                  <p className="text-sm text-gray-600">Recomendaciones específicas para tu perfil único</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ciencia Avanzada</h4>
                  <p className="text-sm text-gray-600">Tecnología de vanguardia en análisis biomoleculares</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Acción Inmediata</h4>
                  <p className="text-sm text-gray-600">Planes de acción claros y fáciles de implementar</p>
                </div>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => setShowPackageSelector(true)}
                className="bg-gradient-to-r from-green-700 to-green-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-green-800 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
              >
                Descubre tu Paquete Ideal
              </button>
              <a 
                href="/proceso"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-50 transition-all text-center"
              >
                Ver Cómo Funciona
              </a>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-white to-gray-50 border border-green-200 shadow-sm hover:shadow-md p-8 rounded-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-600 rounded-full flex items-center justify-center">
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Análisis Personalizado</h3>
                      <p className="text-sm text-gray-600">Basado en tu perfil único</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Salud Cardiovascular</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-16 h-2 bg-gradient-to-r from-green-700 to-green-600 rounded-full"></div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Óptimo</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Función Hormonal</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-14 h-2 bg-gradient-to-r from-green-700 to-green-600 rounded-full"></div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">Bueno</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Estrés Oxidativo</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-12 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-orange-600 font-medium">Mejorar</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        Resultados en tiempo real
                      </p>
                      <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                        Ver detalles →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full blur-xl opacity-20"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-300 rounded-full blur-xl opacity-10"></div>
            
            {/* Stats moved to right column */}
            <div className="relative z-10 mt-20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-green-700">+150</div>
                  <div className="text-sm text-gray-600">Biomarcadores</div>
                  <div className="text-xs text-gray-500">Análisis completo</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-700">+25</div>
                  <div className="text-sm text-gray-600">Análisis Funcionales</div>
                  <div className="text-xs text-gray-500">Evaluación avanzada</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-700">+250</div>
                  <div className="text-sm text-gray-600">Puntos de Extracción</div>
                  <div className="text-xs text-gray-500">Cobertura total</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Modal de Cuestionario de Paquetes */}
      <PackageQuestionnaireModal
        isOpen={showPackageSelector}
        onClose={() => setShowPackageSelector(false)}
        onRecommendation={(result) => {
          // El modal manejará el resultado internamente
          console.log('Paquete recomendado:', result.recommendedPackage);
        }}
      />
    </section>
  );
} 