/**
 * TESTIMONIALS CAROUSEL COMPONENT
 * Carrusel de testimonios de personas reales que han usado nuestros análisis
 */

'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  age: number;
  problem: string;
  discovery: string;
  solution: string;
  result: string;
  avatar: string;
  beforeAfter: {
    before: string;
    after: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 'maria-gonzalez',
    name: 'María González',
    location: 'Madrid',
    age: 42,
    problem: 'Resfriados constantes en invierno',
    discovery: 'Deficiencia de Zinc, no de Vitamina C',
    solution: 'Suplementación específica de Zinc',
    result: 'Sin resfriados desde hace 8 meses',
    avatar: '👩‍💼',
    beforeAfter: {
      before: 'Toda la vida tirando el dinero comprando Vitamina C en invierno para evitar resfriados',
      after: 'Descubrí que tenía una deficiencia de Zinc y la vitamina C estaba bien. Ahora tomo zinc específico y no he tenido ni un resfriado.'
    }
  },
  {
    id: 'oscar-mendez',
    name: 'Óscar Méndez',
    location: 'Barcelona',
    age: 38,
    problem: 'Fatiga crónica y falta de energía',
    discovery: 'Vitamina D ya estaba en niveles correctos',
    solution: 'Dejar suplemento innecesario, optimizar magnesio',
    result: 'Energía estable y dinero ahorrado',
    avatar: '👨‍💻',
    beforeAfter: {
      before: 'Llevo 3 años tomando Vitamina D, lo que no sabía es que la mitad del tiempo no servía de nada',
      after: 'porque ya tenía los valores correctos. Ahora sé exactamente qué necesito y cuándo dejarlo.'
    }
  },
  {
    id: 'ester-pisano',
    name: 'Ester Pisano',
    location: 'Valencia',
    age: 45,
    problem: 'Cansancio inexplicable durante meses',
    discovery: 'Deficiencia severa de B12 y hierro',
    solution: 'Protocolo específico B12 + hierro quelado',
    result: 'Energía recuperada al 100%',
    avatar: '👩‍⚕️',
    beforeAfter: {
      before: 'Por fin entiendo por qué estaba cansada todo el tiempo',
      after: 'con la suplementación específica de B12 y hierro he mejorado mi energía completamente.'
    }
  },
  {
    id: 'carlos-ruiz',
    name: 'Carlos Ruiz',
    location: 'Sevilla',
    age: 35,
    problem: 'Problemas de concentración y memoria',
    discovery: 'Omega-3 bajo y inflamación alta',
    solution: 'EPA/DHA específico + antioxidantes',
    result: 'Concentración mejorada en 70%',
    avatar: '👨‍🎓',
    beforeAfter: {
      before: 'Pensaba que era normal perder concentración con la edad',
      after: 'pero era inflamación y déficit de omega-3. Mi rendimiento mental ha mejorado increíblemente.'
    }
  },
  {
    id: 'ana-martinez',
    name: 'Ana Martínez',
    location: 'Bilbao',
    age: 52,
    problem: 'Dolores articulares y rigidez',
    discovery: 'Vitamina D3 + K2 deficientes',
    solution: 'Protocolo D3+K2 + curcumina',
    result: 'Movilidad recuperada, sin dolor',
    avatar: '👩‍🏫',
    beforeAfter: {
      before: 'Los dolores articulares me limitaban en mis actividades diarias',
      after: 'ahora con el protocolo correcto de vitaminas y antiinflamatorios naturales me muevo sin dolor.'
    }
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Historias <span className="text-green-700">Reales</span> de Transformación
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personas como tú que descubrieron exactamente qué necesitaban para optimizar su salud. 
            No más suposiciones, solo <strong>resultados basados en datos reales</strong>.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8 md:p-12 relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
            
            <div className="relative z-10">
              
              {/* Person Info */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-600 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].age} años • {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>

              {/* Story */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                
                {/* Before */}
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                    <span className="mr-2">😰</span> ANTES
                  </h4>
                  <p className="text-red-700 italic">
                    "{testimonials[currentIndex].beforeAfter.before}"
                  </p>
                </div>

                {/* After */}
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="mr-2">✨</span> DESPUÉS
                  </h4>
                  <p className="text-green-700 italic">
                    "{testimonials[currentIndex].beforeAfter.after}"
                  </p>
                </div>
              </div>

              {/* Key Results */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 text-sm mb-1">Problema</div>
                  <div className="text-xs text-gray-600">{testimonials[currentIndex].problem}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-900 text-sm mb-1">Descubrimiento</div>
                  <div className="text-xs text-blue-700">{testimonials[currentIndex].discovery}</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-900 text-sm mb-1">Solución</div>
                  <div className="text-xs text-orange-700">{testimonials[currentIndex].solution}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-900 text-sm mb-1">Resultado</div>
                  <div className="text-xs text-green-700">{testimonials[currentIndex].result}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-green-700 hover:border-green-300 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-green-700 hover:border-green-300 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-green-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Thumbnails */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToTestimonial(index)}
              className={`p-4 rounded-lg text-left transition-all ${
                index === currentIndex
                  ? 'bg-green-100 border-2 border-green-300'
                  : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">{testimonial.avatar}</span>
                <div>
                  <div className="font-medium text-sm text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.location}</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 line-clamp-2">
                {testimonial.result}
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Tu historia de transformación comienza aquí
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Como ellos, tú también puedes descubrir exactamente qué necesita tu cuerpo 
              para funcionar de manera óptima. Sin adivinanzas, solo ciencia y resultados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/configurador"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
              >
                🧬 Comenzar mi Análisis
              </a>
              <a 
                href="/paquetes"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition-colors"
              >
                Ver Todos los Paquetes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 