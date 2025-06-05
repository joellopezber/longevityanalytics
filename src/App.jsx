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
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BiomarkerSelectionProvider } from './contexts/BiomarkerSelectionContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles/globals.css';

// Importar exports para debugging (exporta paquetes a window)
import './utils/debugExports';

function App() {
  return (
    <LanguageProvider>
      <BiomarkerSelectionProvider>
        <div className="App">
          {/* Navegación con idiomas */}
          <Navbar />

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

        {/* Footer con traducciones */}
        <Footer />
      </div>
    </BiomarkerSelectionProvider>
    </LanguageProvider>
  );
}

export default App; 