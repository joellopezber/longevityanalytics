/**
 * TESTIMONIALS CAROUSEL COMPONENT
 * Carrusel de testimoniales con efecto 3D
 */

'use client';

import { useState, useEffect } from 'react';

export function TestimonialsCarousel() {
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
      text: "Dejé de gastar dinero en suplementos innecesarios. Ahorro cientos de euros al mes y mejoré mi rendimiento físico.",
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

  return (
    <div className="py-16">
      {/* Minimal 3D Testimonials Carousel */}
      <div className="overflow-hidden">

          
          <div className="relative h-64 flex items-center justify-center">
            <div className="relative w-full max-w-7xl mx-auto">
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
                          ? '-translate-x-full -translate-y-1/2 scale-75 z-10 -ml-24 hover:scale-80'
                          : '-translate-y-1/2 scale-75 z-10 ml-24 hover:scale-80'
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
                        return '-translate-x-full -translate-y-1/2 scale-50 z-5 -ml-64 hover:scale-55';
                      case -1:
                        return '-translate-x-full -translate-y-1/2 scale-75 z-10 -ml-32 hover:scale-80';
                      case 0:
                        return '-translate-x-1/2 -translate-y-1/2 scale-100 z-20';
                      case 1:
                        return '-translate-y-1/2 scale-75 z-10 ml-32 hover:scale-80';
                      case 2:
                        return '-translate-y-1/2 scale-50 z-5 ml-64 hover:scale-55';
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
    </div>
  );
} 