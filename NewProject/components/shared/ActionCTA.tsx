/**
 * ACTION CTA COMPONENT
 * Componente para el bloque CTA "Ahora es tu momento: Sin datos no hay acción!"
 */

'use client';

export function ActionCTA() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ahora es tu momento: Sin datos no hay acción!.
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