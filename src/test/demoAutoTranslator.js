/**
 * demoAutoTranslator.js
 * Demostración del sistema de traducción automática
 * NOTA: Requiere conexión a internet para usar LibreTranslate API
 */

import autoTranslator from '../utils/autoTranslator.js';

const demoAutoTranslation = async () => {
  console.log('🌐 DEMOSTRACIÓN DEL SISTEMA DE TRADUCCIÓN AUTOMÁTICA');
  console.log('=====================================================');
  console.log('');

  // Ejemplo 1: Traducir texto simple
  console.log('📝 EJEMPLO 1: Traducción de texto simple');
  console.log('----------------------------------------');
  
  const spanishText = "Bienvenido a Longevity Analytics";
  console.log(`Texto original (ES): ${spanishText}`);
  
  try {
    const englishText = await autoTranslator.translateText(spanishText, 'es', 'en');
    const frenchText = await autoTranslator.translateText(spanishText, 'es', 'fr');
    
    console.log(`Traducción (EN): ${englishText}`);
    console.log(`Traducción (FR): ${frenchText}`);
  } catch (error) {
    console.log('❌ Error en traducción (requiere conexión a internet)');
  }
  
  console.log('');

  // Ejemplo 2: Detectar idioma
  console.log('🔍 EJEMPLO 2: Detección automática de idioma');
  console.log('---------------------------------------------');
  
  const texts = [
    "Hola mundo",
    "Hello world", 
    "Bonjour le monde"
  ];
  
  for (const text of texts) {
    try {
      const detectedLang = await autoTranslator.detectLanguage(text);
      console.log(`"${text}" -> Idioma detectado: ${detectedLang}`);
    } catch (error) {
      console.log(`"${text}" -> Error detectando idioma`);
    }
  }
  
  console.log('');

  // Ejemplo 3: Agregar nueva clave de traducción
  console.log('➕ EJEMPLO 3: Agregar nueva clave automáticamente');
  console.log('-------------------------------------------------');
  
  const existingTranslations = {
    es: { greeting: "Hola" },
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" }
  };
  
  console.log('Traducciones existentes:', JSON.stringify(existingTranslations, null, 2));
  console.log('');
  console.log('Agregando nueva clave "farewell" con valor "Adiós"...');
  
  try {
    const updatedTranslations = await autoTranslator.addNewTranslationKey(
      'farewell',
      'Adiós',
      existingTranslations
    );
    
    console.log('Traducciones actualizadas:', JSON.stringify(updatedTranslations, null, 2));
  } catch (error) {
    console.log('❌ Error agregando nueva clave (requiere conexión a internet)');
  }
  
  console.log('');

  // Ejemplo 4: Exportar traducciones
  console.log('📤 EJEMPLO 4: Exportar traducciones a JSON');
  console.log('-------------------------------------------');
  
  const sampleTranslations = {
    es: {
      navigation: {
        home: "Inicio",
        about: "Acerca de"
      }
    },
    en: {
      navigation: {
        home: "Home",
        about: "About"
      }
    }
  };
  
  const jsonExport = autoTranslator.exportTranslationsToJSON(sampleTranslations);
  console.log('JSON exportado:');
  console.log(jsonExport);
  
  console.log('');

  // Ejemplo 5: Validar traducciones
  console.log('✅ EJEMPLO 5: Validar traducciones');
  console.log('----------------------------------');
  
  const validTranslations = {
    es: { title: "Título", subtitle: "Subtítulo" },
    en: { title: "Title", subtitle: "Subtitle" },
    fr: { title: "Titre", subtitle: "Sous-titre" }
  };
  
  const invalidTranslations = {
    es: { title: "Título", subtitle: "Subtítulo" },
    en: { title: "Title" }, // Falta subtitle
    fr: { title: "Titre", subtitle: "Sous-titre" }
  };
  
  const validResult = autoTranslator.validateAutoTranslations(validTranslations);
  const invalidResult = autoTranslator.validateAutoTranslations(invalidTranslations);
  
  console.log('Traducciones válidas:', validResult.isValid ? '✅ SÍ' : '❌ NO');
  console.log('Traducciones inválidas:', invalidResult.isValid ? '✅ SÍ' : '❌ NO');
  console.log('Problemas encontrados:', invalidResult.issues);
  
  console.log('');
  console.log('🎯 CONCLUSIÓN');
  console.log('=============');
  console.log('✅ Sistema de traducción automática implementado');
  console.log('✅ API gratuita LibreTranslate integrada');
  console.log('✅ Funciones de validación y utilidades incluidas');
  console.log('✅ Listo para agregar nuevos idiomas automáticamente');
  console.log('');
  console.log('💡 NOTA: Para usar las funciones de traducción automática,');
  console.log('   asegúrate de tener conexión a internet activa.');
};

// Ejecutar demostración si este archivo se ejecuta directamente
if (typeof require !== 'undefined' && require.main === module) {
  demoAutoTranslation();
}

export default demoAutoTranslation; 