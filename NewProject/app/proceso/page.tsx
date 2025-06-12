/**
 * PROCESO PAGE
 * Página que explica el proceso completo de análisis de longevidad
 */

'use client';

import { useState } from 'react';

export default function ProcesoPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Selecciona tu Paquete",
      subtitle: "Elige el análisis perfecto para ti",
      description: "Utiliza nuestro cuestionario inteligente o explora nuestros 4 paquetes especializados para encontrar el que mejor se adapte a tus objetivos de salud y longevidad.",
      icon: "🎯",
      duration: "5 minutos",
      details: [
        "Cuestionario personalizado basado en tus objetivos",
        "4 paquetes: Essential, Performance, Core y Advanced",
        "Personalización con add-ons opcionales",
        "Precios transparentes sin sorpresas"
      ]
    },
    {
      id: 2,
      title: "Realiza tu Pedido",
      subtitle: "Proceso de compra seguro y simple",
      description: "Completa tu pedido de forma segura. Recibirás confirmación inmediata y toda la información necesaria para el siguiente paso.",
      icon: "🛒",
      duration: "3 minutos",
      details: [
        "Pago seguro con encriptación SSL",
        "Confirmación inmediata por email",
        "Factura detallada incluida",
        "Soporte al cliente disponible 24/7"
      ]
    },
    {
      id: 3,
      title: "Recibe tu Kit",
      subtitle: "Kit de recolección enviado a tu domicilio",
      description: "Te enviamos un kit completo con todo lo necesario para recolectar tu muestra de forma segura y cómoda desde casa.",
      icon: "📦",
      duration: "2-3 días",
      details: [
        "Envío gratuito a toda España",
        "Kit estéril y certificado",
        "Instrucciones detalladas incluidas",
        "Etiqueta de devolución prepagada"
      ]
    },
    {
      id: 4,
      title: "Recolecta tu Muestra",
      subtitle: "Proceso simple y seguro en casa",
      description: "Sigue las instrucciones incluidas para recolectar tu muestra. Es un proceso simple que toma solo unos minutos.",
      icon: "🩸",
      duration: "10 minutos",
      details: [
        "Instrucciones paso a paso con imágenes",
        "Video tutorial disponible online",
        "Proceso indoloro y rápido",
        "Soporte técnico si necesitas ayuda"
      ]
    },
    {
      id: 5,
      title: "Envía tu Muestra",
      subtitle: "Devolución gratuita y rastreada",
      description: "Utiliza la etiqueta prepagada para enviar tu muestra a nuestro laboratorio certificado. Podrás rastrear el envío en tiempo real.",
      icon: "📮",
      duration: "1 día",
      details: [
        "Etiqueta de envío incluida",
        "Rastreo en tiempo real",
        "Laboratorio certificado ISO",
        "Notificación de recepción automática"
      ]
    },
    {
      id: 6,
      title: "Análisis en Laboratorio",
      subtitle: "Tecnología de vanguardia",
      description: "Nuestro laboratorio certificado analiza tu muestra utilizando la tecnología más avanzada para obtener resultados precisos y confiables.",
      icon: "🔬",
      duration: "5-7 días",
      details: [
        "Laboratorio certificado ISO 15189",
        "Tecnología de última generación",
        "Doble verificación de resultados",
        "Estándares internacionales de calidad"
      ]
    },
    {
      id: 7,
      title: "Recibe tus Resultados",
      subtitle: "Dashboard personalizado con insights",
      description: "Accede a tus resultados a través de nuestro dashboard personalizado con interpretaciones claras y recomendaciones específicas.",
      icon: "📊",
      duration: "Inmediato",
      details: [
        "Dashboard interactivo personalizado",
        "Interpretación clara de cada biomarcador",
        "Recomendaciones específicas y accionables",
        "Comparación con rangos óptimos"
      ]
    },
    {
      id: 8,
      title: "Plan de Acción",
      subtitle: "Optimiza tu longevidad",
      description: "Recibe un plan personalizado con recomendaciones específicas para optimizar tu salud y longevidad basado en tus resultados únicos.",
      icon: "🎯",
      duration: "Continuo",
      details: [
        "Plan personalizado de optimización",
        "Recomendaciones nutricionales específicas",
        "Sugerencias de suplementación",
        "Seguimiento y monitoreo continuo"
      ]
    }
  ];

  const totalDuration = "2-3 semanas";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cómo Funciona Nuestro <span className="text-green-200">Proceso</span>
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Un proceso simple y científicamente riguroso para obtener insights profundos 
              sobre tu salud y longevidad desde la comodidad de tu hogar.
            </p>
            <div className="flex items-center justify-center space-x-4 text-green-200">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Proceso completo: {totalDuration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% desde casa</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Resultados científicos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Proceso Paso a Paso
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada paso está diseñado para ser simple, seguro y proporcionarte 
            la mejor experiencia posible en tu viaje hacia la longevidad.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-green-500 transform -translate-y-1/2 transition-all duration-1000"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>

            {/* Timeline Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 ${
                      index <= activeStep
                        ? 'bg-green-500 text-white shadow-lg scale-110'
                        : 'bg-white border-2 border-gray-300 text-gray-400 hover:border-green-300'
                    }`}
                  >
                    {step.icon}
                  </button>
                  <div className="mt-4 text-center max-w-32">
                    <h3 className={`text-sm font-semibold ${
                      index <= activeStep ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {step.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-all ${
                index === activeStep ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                index <= activeStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{step.subtitle}</p>
                <p className="text-xs text-green-600 mt-1">{step.duration}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step Details */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-3xl text-white">
                {steps[activeStep].icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {steps[activeStep].title}
                </h3>
                <p className="text-lg text-green-600">
                  {steps[activeStep].subtitle}
                </p>
                <p className="text-sm text-gray-500">
                  Duración: {steps[activeStep].duration}
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps[activeStep].details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Anterior</span>
          </button>

          <div className="text-sm text-gray-500">
            Paso {activeStep + 1} de {steps.length}
          </div>

          <button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeStep === steps.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span>Siguiente</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes sobre el Proceso
            </h2>
            <p className="text-lg text-gray-600">
              Resolvemos las dudas más comunes sobre nuestro proceso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ¿Es seguro el proceso de recolección?
                </h3>
                <p className="text-gray-600">
                  Absolutamente. Utilizamos kits estériles certificados y el proceso 
                  es completamente seguro. Nuestro laboratorio cumple con todos los 
                  estándares internacionales de calidad.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ¿Qué pasa si tengo problemas con la recolección?
                </h3>
                <p className="text-gray-600">
                  Nuestro equipo de soporte está disponible 24/7 para ayudarte. 
                  También proporcionamos videos tutoriales y guías detalladas.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ¿Puedo rastrear mi muestra?
                </h3>
                <p className="text-gray-600">
                  Sí, recibirás un código de rastreo para seguir tu muestra desde 
                  el envío hasta la recepción en nuestro laboratorio.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ¿Cuánto tiempo tardan los resultados?
                </h3>
                <p className="text-gray-600">
                  El proceso completo toma entre 2-3 semanas desde el pedido hasta 
                  recibir los resultados, incluyendo el envío del kit y el análisis.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ¿Cómo accedo a mis resultados?
                </h3>
                <p className="text-gray-600">
                  Recibirás un email con acceso a tu dashboard personalizado donde 
                  podrás ver todos tus resultados e interpretaciones.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  ¿Qué incluye el plan de acción?
                </h3>
                <p className="text-gray-600">
                  Recomendaciones personalizadas de nutrición, suplementación, 
                  estilo de vida y seguimiento basadas en tus resultados únicos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para Comenzar tu Viaje hacia la Longevidad?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Únete a miles de personas que ya han tomado control de su salud 
              con nuestros análisis avanzados de longevidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="bg-white text-green-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
              >
                Descubre tu Paquete Ideal
              </a>
              <a
                href="/paquetes"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white hover:text-green-700 transition-all"
              >
                Ver Todos los Paquetes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 