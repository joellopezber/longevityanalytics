/**
 * HOW TO TAKE CONTROL SECTION
 * Sección que explica el proceso práctico para tomar control de la salud
 */

'use client';

import { useState, useEffect } from 'react';

export default function HowToTakeControl() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Samuel Schick",
      role: "Ejecutivo",
      text: "Reduje mi inflamación en un 40% con datos precisos. Por fin entiendo qué suplementos realmente necesito.",
      avatar: "S"
    },
    {
      name: "Nat Reynolds", 
      role: "Contador",
      text: "Los biomarcadores revelaron deficiencias que ningún médico había detectado. Optimicé mi sueño completamente.",
      avatar: "N"
    },
    {
      name: "Celia Almeda",
      role: "Secretaria", 
      text: "Mi perfil hormonal mejoró un 60% en 4 meses. Los datos cambiaron completamente mi vida.",
      avatar: "C"
    },
    {
      name: "Bob Roberts",
      role: "Gerente",
      text: "Dejé de gastar dinero en suplementos innecesarios. Ahorré 300€ al mes y mejoré mi rendimiento físico.",
      avatar: "B"
    },
    {
      name: "María González",
      role: "Directora",
      text: "Perdí 8kg de forma saludable y mis análisis muestran una edad biológica 5 años menor.",
      avatar: "M"
    }
  ];

  // Auto-rotate every 20 seconds - very slow for comfortable reading
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 20000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const getVisibleTestimonials = (isMobile = false) => {
    const result = [];
    const range = isMobile ? 1 : 2; // Mobile: 3 cards (-1,0,1), Desktop: 5 cards (-2,-1,0,1,2)
    
    for (let i = -range; i <= range; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      result.push({ ...testimonials[index], position: i });
    }
    return result;
  };

  const steps = [
    {
      number: "01",
      title: "Conoces tu estado real",
      subtitle: "Descubres exactamente dónde estás ahora",
      description: "Por primera vez en tu vida tienes datos precisos sobre tu cuerpo. Dejas de adivinar qué te pasa y obtienes una fotografía completa y objetiva de tu salud actual. Con más de 150 biomarcadores conoces tus fortalezas, debilidades y oportunidades de mejora específicas.",
      icon: "🧬",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      number: "02", 
      title: "Defines tu plan personalizado",
      subtitle: "Creas una estrategia 100% adaptada a ti",
      description: "Con tus datos en la mano, diseñas un plan específico para tus objetivos y tu biología única. No sigues consejos genéricos ni tendencias de moda. Cada decisión que tomas sobre suplementos, nutrición y ejercicio está respaldada por evidencia concreta de tu propio cuerpo.",
      icon: "🎯",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      number: "03",
      title: "Implementas & mides",
      subtitle: "Ejecutas acciones con propósito y ves su impacto real",
      description: "Aplicas tu estrategia personalizada y monitorizas los resultados objetivamente. Cada intervención que haces tiene un propósito claro y puedes medir su efectividad real. Ajustas tu plan basándote en datos, no en sensaciones, y ves tu progreso de forma tangible.",
      icon: "📈",
      color: "from-purple-500 to-purple-600", 
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ¿Cómo tomo el control de mi <span className="text-green-700">salud?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Ya sabes POR QUÉ es importante tomar el control. Ahora te mostramos CÓMO hacerlo de forma inteligente y eficiente. 
            No más estrategias genéricas: tu cuerpo es único y merece un enfoque personalizado.
          </p>
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg max-w-3xl mx-auto">
            <p className="text-green-800 font-medium">
              "A partir de datos precisos puedes ser eficiente en cada acción que tomas y ver su repercusión real en tu salud."
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-lg text-green-600 font-medium">{step.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Visual */}
              <div className="flex-1 max-w-md">
                <div className={`${step.bgColor} rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300`}>
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-2xl font-bold">{step.number}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal 3D Testimonials Carousel */}
        <div className="mt-20 mb-16 overflow-hidden">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">
              Experiencia
            </h3>
          </div>
          
          <div className="relative h-64 flex items-center justify-center">
            <div className="relative w-full max-w-6xl mx-auto">
              {/* Mobile version - 3 cards */}
              <div className="block md:hidden">
                {getVisibleTestimonials(true).map((testimonial, index) => {
                  const { position } = testimonial;
                  const isCenter = position === 0;
                  const isLeft = position === -1;
                  const isRight = position === 1;
                  
                  return (
                    <div
                      key={`${testimonial.name}-${currentIndex}-mobile`}
                      className={`absolute top-1/2 left-1/2 transform transition-all duration-700 ease-in-out cursor-pointer ${
                        isCenter 
                          ? '-translate-x-1/2 -translate-y-1/2 scale-100 z-20' 
                          : isLeft
                          ? '-translate-x-full -translate-y-1/2 scale-75 z-10 -ml-16 hover:scale-80'
                          : '-translate-y-1/2 scale-75 z-10 ml-16 hover:scale-80'
                      }`}
                      style={{
                        opacity: isCenter ? 1 : 0.6,
                      }}
                      onClick={() => !isCenter && setCurrentIndex((currentIndex + position + testimonials.length) % testimonials.length)}
                    >
                      <div className={`bg-white rounded-2xl shadow-lg p-6 w-80 ${
                        isCenter ? 'shadow-2xl' : 'shadow-md'
                      }`}>
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${
                            isCenter ? 'bg-green-600' : 'bg-gray-400'
                          }`}>
                            {testimonial.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                          </div>
                        </div>
                        <blockquote className="text-gray-700 text-sm leading-relaxed">
                          "{testimonial.text}"
                        </blockquote>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop version - 5 cards */}
              <div className="hidden md:block">
                {getVisibleTestimonials(false).map((testimonial, index) => {
                  const { position } = testimonial;
                  const isCenter = position === 0;
                  const getCardStyle = () => {
                    switch(position) {
                      case -2:
                        return '-translate-x-full -translate-y-1/2 scale-50 z-5 -ml-40 hover:scale-55';
                      case -1:
                        return '-translate-x-full -translate-y-1/2 scale-75 z-10 -ml-20 hover:scale-80';
                      case 0:
                        return '-translate-x-1/2 -translate-y-1/2 scale-100 z-20';
                      case 1:
                        return '-translate-y-1/2 scale-75 z-10 ml-20 hover:scale-80';
                      case 2:
                        return '-translate-y-1/2 scale-50 z-5 ml-40 hover:scale-55';
                      default:
                        return '';
                    }
                  };
                  
                  const getOpacity = () => {
                    if (isCenter) return 1;
                    if (Math.abs(position) === 1) return 0.6;
                    return 0.3;
                  };
                  
                  return (
                    <div
                      key={`${testimonial.name}-${currentIndex}-desktop`}
                      className={`absolute top-1/2 left-1/2 transform transition-all duration-700 ease-in-out cursor-pointer ${getCardStyle()}`}
                      style={{
                        opacity: getOpacity(),
                      }}
                      onClick={() => !isCenter && setCurrentIndex((currentIndex + position + testimonials.length) % testimonials.length)}
                    >
                    <div className={`bg-white rounded-2xl shadow-lg p-6 w-80 ${
                      isCenter ? 'shadow-2xl' : 'shadow-md'
                    }`}>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${
                          isCenter ? 'bg-green-600' : 'bg-gray-400'
                        }`}>
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <blockquote className="text-gray-700 text-sm leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-green-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              El resultado: Eficiencia total en tu salud
            </h3>
            <p className="text-green-100 mb-6 max-w-3xl mx-auto">
              No más suplementos innecesarios. No más dietas que no funcionan para ti. 
              No más ejercicios sin propósito. Solo acciones respaldadas por TUS datos que generan resultados reales y medibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/paquetes"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Ver mis opciones de análisis
              </a>
              <a 
                href="/configurador"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition-colors"
              >
                Configurar mi análisis ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 