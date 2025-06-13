/**
 * PROCESO PAGE
 * Página que muestra cómo funciona nuestro proceso de análisis con diseño moderno
 */

'use client';

import { useState } from 'react';
import PackageQuestionnaireModal from '@/components/landing/PackageQuestionnaireModal';

export default function ProcesoPage() {
  const [showPackageSelector, setShowPackageSelector] = useState(false);

  const steps = [
    {
      number: "01",
      title: "Selecciona tu Análisis",
      duration: "5 minutos",
      description: "Utiliza nuestro sistema de recomendaciones personalizado o configura tu análisis directamente desde nuestros 4 paquetes diseñados científicamente.",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      borderColor: "border-blue-200/50",
      titleColor: "text-blue-900",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v3a1 1 0 01-2 0V8a1 1 0 011-1h3a1 1 0 010 2zM21 8a1 1 0 00-1-1h-3a1 1 0 000 2h2v3a1 1 0 002 0V8zM7 21a1 1 0 001 1h3a1 1 0 000-2H9v-2a1 1 0 00-2 0v3zM17 21v-3a1 1 0 012 0v3a1 1 0 001 1h-3a1 1 0 000-2h2z"/>
        </svg>
      ),
      features: [
        "Sistema de recomendaciones inteligente",
        "4 paquetes especializados disponibles", 
        "Configuración personalizada completa",
        "Comparativa detallada en tiempo real"
      ]
    },
    {
      number: "02", 
      title: "Recibe tu Confirmación",
      duration: "Inmediato",
      description: "Confirmación instantánea con factura oficial y todas las instrucciones detalladas para el siguiente paso de tu análisis.",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
      borderColor: "border-emerald-200/50",
      titleColor: "text-emerald-900",
      icon: (
        <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"/>
        </svg>
      ),
      features: [
        "Email de confirmación inmediato",
        "Factura oficial incluida",
        "Instrucciones paso a paso detalladas",
        "Soporte especializado 24/7"
      ]
    },
    {
      number: "03",
      title: "Visita tu Punto de Extracción",
      duration: "15 minutos",
      description: "Acude a cualquiera de nuestros 250+ puntos especializados distribuidos por España donde profesionales sanitarios realizarán tu extracción.",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      borderColor: "border-purple-200/50",
      titleColor: "text-purple-900",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      features: [
        "250+ centros certificados en España",
        "Personal sanitario especializado",
        "Proceso rápido y sin molestias",
        "Horarios flexibles y cómodos"
      ]
    },
    {
      number: "04",
      title: "Procesamiento de Laboratorio",
      duration: "5-7 días",
      description: "Análisis con tecnología de vanguardia en laboratorios certificados ISO, garantizando la máxima precisión en cada biomarcador.",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-100",
      borderColor: "border-orange-200/50",
      titleColor: "text-orange-900",
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.5 2C8.67 2 8 2.67 8 3.5v1C8 5.33 8.67 6 9.5 6h5c.83 0 1.5-.67 1.5-1.5v-1C16 2.67 15.33 2 14.5 2h-5zM6 8v11c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8H6zm2 9c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v4zm4 0c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v4zm4 0c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v4z"/>
        </svg>
      ),
      features: [
        "Laboratorios certificados ISO 15189",
        "Tecnología analítica avanzada",
        "Control de calidad triple verificación",
        "Cadena de custodia garantizada"
      ]
    },
    {
      number: "05",
      title: "Inteligencia de Datos",
      duration: "2-3 días", 
      description: "Nuestros algoritmos especializados procesan tus resultados y generan insights personalizados basados en tu perfil único.",
      bgColor: "bg-gradient-to-br from-teal-50 to-cyan-100",
      borderColor: "border-teal-200/50",
      titleColor: "text-teal-900",
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      features: [
        "Algoritmos de IA especializados",
        "Análisis personalizado por perfil",
        "Comparación con valores óptimos",
        "Insights predictivos avanzados"
      ]
    },
    {
      number: "06",
      title: "Tu Informe Completo",
      duration: "24/7",
      description: "Acceso instantáneo a tu dashboard interactivo con análisis detallado, interpretaciones personalizadas y recomendaciones específicas.",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-100",
      borderColor: "border-pink-200/50",
      titleColor: "text-pink-900",
      icon: (
        <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      features: [
        "Dashboard interactivo completo",
        "Interpretaciones personalizadas",
        "Recomendaciones específicas",
        "Acceso permanente multiplataforma"
      ]
    },
    {
      number: "07",
      title: "Consulta con Especialistas*",
      duration: "45 minutos",
      description: "Sesión personal opcional con nuestros especialistas en biología funcional para interpretar resultados y diseñar tu plan de acción específico. Servicio adicional con coste a parte.",
      bgColor: "bg-gradient-to-br from-indigo-50 to-blue-100",
      borderColor: "border-indigo-200/50",
      titleColor: "text-indigo-900",
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 8H16c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5h1v4h2zm-12.5 0v-7.5L9.5 18H8v4h-2.5zM5.5 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.5 1H4.5c-.83 0-1.5.67-1.5 1.5v7.5h2V22h2v-3.5c0-.83-.67-1.5-1.5-1.5z"/>
        </svg>
      ),
      features: [
        "Servicio opcional adicional",
        "Especialista en biología funcional",
        "Interpretación personalizada completa",
        "Plan de acción específico personalizado"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header mejorado */}
      <div className="relative bg-gradient-to-br from-white via-gray-50 to-green-50/30">
        <div className="absolute inset-0 bg-grid-gray-200/50 bg-[size:32px_32px] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent">Cómo funciona</span><br />
              <span className="text-gray-800">nuestro proceso</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Un proceso simple y profesional en <span className="font-semibold text-green-700">7 pasos</span> que te lleva desde la selección 
              hasta la consulta personalizada con especialistas en biología funcional.
            </p>

            {/* Stats mejoradas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">250+</div>
                <div className="text-sm text-gray-600">Puntos de extracción</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">ISO</div>
                <div className="text-sm text-gray-600">Certificación laboratorio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Acceso a resultados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-700 mb-2">8-12</div>
                <div className="text-sm text-gray-600">Días proceso total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps con diseño moderno tipo cards */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cada Paso Diseñado para tu Éxito
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde la primera selección hasta la consulta final, cada etapa está optimizada para ofrecerte la mejor experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`relative ${step.bgColor} rounded-3xl p-8 border-2 ${step.borderColor} hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1`}
              >
                {/* Número del paso */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-gray-700">{step.number}</span>
                </div>

                {/* Badge opcional para el paso 7 */}
                {step.number === "07" && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    OPCIONAL
                  </div>
                )}

                {/* Icono */}
                <div className="w-16 h-16 bg-white/80 backdrop-blur rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                {/* Contenido */}
                <div className="space-y-4">
                  <div>
                    <h3 className={`text-2xl font-bold ${step.titleColor} mb-2`}>
                      {step.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">{step.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 pt-4">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-white/60 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Bottom CTA - Igual que en landing */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿No estás seguro de qué paquete elegir?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Te ayudamos a encontrar el paquete perfecto para ti, basado en tus objetivos de salud y necesidades específicas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/configurador"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl inline-block"
                >
                  Configurador Inteligente
                </a>
                <button 
                  onClick={() => setShowPackageSelector(true)}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  ¿Qué paquete elegir?
                </button>
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
    </div>
  );
} 