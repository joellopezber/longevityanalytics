/**
 * App.jsx
 * Componente principal de la aplicación que integra todos los componentes
 * de la presentación de análisis clínicos para longevity
 */

import React from 'react';
import HeroSection from './components/HeroSection';
import MedicalSystemsExplorer from './components/MedicalSystemsExplorer';
import PackageComparison from './components/PackageComparison';
import ProcessFlow from './components/ProcessFlow';
import CallToAction from './components/CallToAction';
import { BiomarkerSelectionProvider } from './contexts/BiomarkerSelectionContext';
import './styles/globals.css';

// Importar exports para debugging (exporta paquetes a window)
import './utils/debugExports';

function App() {
  return (
    <BiomarkerSelectionProvider>
      <div className="App">
        {/* Navegación mejorada */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200">
          <div className="container">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-earth rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">LA</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Longevity Analytics
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-8">
                <a href="#systems" className="text-gray-600 hover:text-earth transition-colors font-medium no-underline">
                  Análisis Clínicos
                </a>
                <a href="#paquetes" className="text-gray-600 hover:text-earth transition-colors font-medium no-underline">
                  Add-ons
                </a>
                <a href="#proceso" className="text-gray-600 hover:text-earth transition-colors font-medium no-underline">
                  Proceso
                </a>
                <a href="#contacto" className="bg-earth text-white px-6 py-2 rounded-full font-semibold hover:bg-stone transition-colors no-underline">
                  Contactar
                </a>
              </div>
              
              {/* Menú móvil */}
              <button className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="pt-35">
          {/* Hero Section */}
          <HeroSection />

          {/* Explorador de Sistemas Médicos */}
          <section id="systems">
            <MedicalSystemsExplorer />
          </section>

          {/* Comparación de Paquetes */}
          <section id="paquetes">
            <PackageComparison />
          </section>

          {/* Proceso */}
          <section id="proceso">
            <ProcessFlow />
          </section>

          {/* Call to Action */}
          <section id="contacto">
            <CallToAction />
          </section>
        </main>

        {/* Footer rediseñado en armonía con la página */}
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
                <h4 className="font-semibold mb-6 text-cream">Servicios</h4>
                <ul className="space-y-3 text-beige text-sm list-none" style={{listStyle: 'none'}}>
                  <li>Análisis Essential</li>
                  <li>Add-Ons Especializados</li>
                  <li>Recomendaciones Personalizadas</li>
                </ul>
              </div>

              {/* Contacto */}
              <div>
                <h4 className="font-semibold mb-6 text-cream">Contacto</h4>
                <ul className="space-y-3 text-beige text-sm list-none" style={{listStyle: 'none'}}>
                  <li>partnerships@longevityanalytics.com</li>
                  <li>La Massana, Andorra</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-taupe mt-12 pt-8 text-center">
              <p className="text-beige text-sm">
                © 2025 Longevity Analytics
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BiomarkerSelectionProvider>
  );
}

export default App; 