/**
 * LanguageContext.js
 * Contexto global para manejar idiomas en toda la aplicación
 * Incluye todas las traducciones para español, inglés y francés
 */

import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
};

// Todas las traducciones organizadas por secciones
const translations = {
  es: {
    // Navbar
    navbar: {
      clinicalAnalysis: "Análisis Clínicos",
      addons: "Add-ons",
      process: "Proceso",
      contact: "Contactar",
      language: "Idioma"
    },
    // Hero Section
    hero: {
      tagline: "Precision Data for Optimization.",
      title: "Sin datos no hay acción, obten los tuyos!",
      description: "Mide mas de 130 biomarcadores y 7 análisis especializados, convirtiendo la ciencia de los datos en un plan de prevención, longevidad y optimización integral.",
      exploreButton: "Explorar Análisis",
      beyondDiagnosis: "Más allá del diagnóstico:",
      actionableRecommendations: "Recomendaciones accionables",
      supplementation: "Suplementación",
      supplementationDesc: "Identificamos posibles déficits y formulamos protocolos con nutracéuticos de alta biodisponibilidad. Ajustamos las dosis tras cada revisión analítica para mantenerte en rango óptimo.",
      nutrition: "Nutrición",
      nutritionDesc: "Te mostramos los nutrientes que necesitas y cómo estructurar tu alimentación, te proporcionamos la información y las herramientas para diseñar tu propio plan.",
      lifestyle: "Estilo de Vida",
      lifestyleDesc: "Recomendaciones sobre ejercicio, sueño, manejo del estrés y hábitos basados en tus biomarcadores específicos para optimizar tu longevidad.",
      monitoring: "Monitorización",
      monitoringDesc: "Seguimiento periódico de tus biomarcadores para ajustar las intervenciones y asegurar que te mantienes en los rangos óptimos de salud."
    },
    // Medical Systems Explorer
    systems: {
      title: "Longevity Analytics",
      titleHighlight: "Análisis",
      description: "Ofrecemos tres paquetes de análisis personalizados para adaptarnos mejor a las necesidades específicas de cada individuo: Essential para el análisis fundamental, Core para una evaluación intermedia especializada, y Advanced para la evaluación más completa y exhaustiva de tu salud y longevidad.",
      essentialDescription: "El Essential Analysis examina los biomarcadores fundamentales para dibujar una imagen precisa de tu estado de salud actual e incluye el cálculo de PhenoAge (edad biológica) basado en 9 biomarcadores validados científicamente. Con estos datos podemos anticipar riesgos silenciosos, establecer prioridades terapéuticas y definir si conviene añadir módulos adicionales (add on). Transformando la ciencia analítica en decisiones personalizadas y un plan de acción claro.",
      performanceDescription: "Paquete especializado en rendimiento deportivo y optimización física, incluyendo biomarcadores específicos para energía, recuperación y función muscular. Diseñado para atletas y personas activas que buscan maximizar su potencial físico.",
      coreDescription: "Paquete completo de biomarcadores fundamentales para análisis integral de longevidad. Incluye evaluación avanzada de sistemas metabólicos, hormonales, inflamatorios y de estrés oxidativo para optimización completa de la salud.",
      advancedDescription: "Paquete más completo con análisis avanzados de metales pesados, microbioma y biomarcadores especializados. La evaluación más exhaustiva disponible para quienes buscan control total de su salud y longevidad.",
      
      // Target Audiences
      essentialTargetAudience: "Ideal para clientes que inician su viaje de longevidad",
      performanceTargetAudience: "Ideal para atletas y personas activas que buscan optimizar su rendimiento físico",
      coreTargetAudience: "Para clientes que buscan un análisis completo y detallado",
      advancedTargetAudience: "Para clientes que buscan el análisis más completo disponible",
      
      // Tres perfiles de análisis
      analysisProfiles: {
        essential: {
          title: "Essential",
          highlight: "46 Biomarcadores",
          description: "Perfecto para quienes buscan una visión general y la guía básica para la prevención de la salud. Ideal para comenzar el viaje hacia una mejor salud."
        },
        performance: {
          title: "Performance",
          highlight: "60+ Biomarcadores",
          description: "Especializado en rendimiento deportivo y optimización física. Incluye biomarcadores específicos para energía, recuperación y función muscular.",
          features: [
            "Todo lo incluido en Essential",
            "Biomarcadores de rendimiento deportivo",
            "Marcadores de recuperación muscular", 
            "Perfil energético y metabólico",
            "Hormonas específicas para atletas",
            "Evaluación de estrés físico",
            "Marcadores de hidratación",
            "Biomarcadores de fatiga"
          ]
        },
        core: {
          title: "Core",
          highlight: "90+ Biomarcadores", 
          description: "Diseñado para la optimización y el control de longevidad, dirigido a aquellos que van un paso más allá para entender profundamente su cuerpo.",
          features: [
            "Todo lo incluido en Essential",
            "Perfil cardiovascular avanzado",
            "Hormonas completas (hombre/mujer)",
            "Marcadores inflamatorios específicos", 
            "Estrés oxidativo y antioxidantes",
            "Evaluación nutricional detallada",
            "Marcadores tumorales básicos",
            "Biomarcadores de envejecimiento"
          ]
        },
        advanced: {
          title: "Advanced",
          highlight: "120 Biomarcadores",
          description: "Para personas que no dejan nada al azar y lo quieren tener todo controlado. La evaluación más completa y exhaustiva disponible.",
          features: [
            "Todo lo incluido en Core",
            "Panel completo de metales pesados",
            "Análisis de microbioma intestinal",
            "Marcadores tumorales ampliados", 
            "Evaluación de longevidad avanzada",
            "Perfil de coagulación completo",
            "Biomarcadores de fertilidad",
            "Assessment de estrés oxidativo completo"
          ]
        }
      },
      essentialPackage: "Essential Análisis",
      male: "Hombre",
      female: "Mujer",
      biomarkers: "biomarcadores",
      selected: "Seleccionado",
      addToAnalysis: "Añadir al análisis",
      removeFromAnalysis: "Quitar del análisis",
      viewBiomarkers: "Ver Biomarcadores",
      hideBiomarkers: "Ocultar Biomarcadores",
      viewAddOns: "Ver Add-Ons",
      hideAddOns: "Ocultar Add-Ons",
      marketPrice: "P.V.P Mercado",
      ourPrice: "Nuestro Precio",
      youSave: "Ahorras",
      complementEssential: "Complementa tu Essential",
      withSpecializedModules: "con estos módulos especializados. Cada Add-On se suma a los 46 biomarcadores base para una evaluación más profunda.",
      biomarkersIncludedEssential: "Biomarcadores Incluidos en Essential",
      tests: "tests",
      geneticPricesDisclaimer: "Los precios de las pruebas genéticas pueden estar sujetos a modificaciones.",
      addOnsSpecialized: "Add-Ons Especializados",
      biomarkersOf: "Biomarcadores de",
      pvp: "PVP",
      ctaTitle: "¿Listo para optimizar tu <span className=\"text-cream\">organismo</span>?",
      ctaDescription: "Comienza con el <span className=\"font-bold text-cream\">Essential</span> y añade los <span className=\"font-bold text-cream\">Add-Ons</span> que necesites. Obtén recomendaciones personalizadas de suplementación, nutrición y estilo de vida."
    },

    // Add-Ons Names and Descriptions
    addOns: {
      hormonas: {
        name: "Hormonas",
        description: "Optimiza niveles hormonales específicos por género (testosterona, estradiol, progesterona) para mejorar energía, libido y bienestar general. Identifica desbalances que afectan vitalidad y envejecimiento."
      },
      endocrino: {
        name: "Endocrino", 
        description: "Evalúa el eje hormonal completo (IGF-1, ACTH, función pancreática, hormonas reproductivas) para optimizar metabolismo, crecimiento celular y función endocrina. Identifica disfunciones metabólicas y guía estrategias de longevidad."
      },
      antioxidantes: {
        name: "Antioxidantes",
        description: "Mide vitaminas antioxidantes (A, E), coenzima Q10 y carotenoides para evaluar tu capacidad de defensa contra el envejecimiento. Personaliza suplementación antioxidante y reduce estrés oxidativo."
      },
      oxidative_cell: {
        name: "Estrés Oxidativo",
        description: "Analiza selenio, vitamina C y marcadores específicos de sistema glutatión para evaluar el envejecimiento a nivel molecular. Optimiza protección celular y previene daño oxidativo acumulativo."
      },
      inflammation: {
        name: "Inflamación",
        description: "Mide marcadores de inflamación sistémica (VSG, IL-6, TNF-α) para detectar inflamación crónica silenciosa. Guía estrategias anti-inflamatorias y reduce riesgo de enfermedades crónicas."
      },
      iv_nutrients: {
        name: "IV & Nutrientes",
        description: "Evalúa vitaminas del complejo B, minerales esenciales y nutrientes para optimizar función celular y neurológica. Personaliza protocolos nutricionales y suplementación IV específica."
      },
      metals: {
        name: "Metales Pesados",
        description: "Detecta acumulación de metales tóxicos (plomo, mercurio, cadmio) que aceleran el envejecimiento. Guía protocolos de quelación y detoxificación específicos para optimizar salud celular."
      },
      bone_mineral: {
        name: "Hueso & Mineral",
        description: "Analiza metabolismo óseo y mineral (calcio, fósforo, magnesio, vitamina D) para prevenir osteoporosis y optimizar salud esquelética. Personaliza estrategias de fortalecimiento óseo."
      },
      cardiovascular: {
        name: "Cardiovascular",
        description: "Evalúa salud cardiovascular con biomarcadores avanzados (Lp(a), ácidos grasos, vitamina K1) para prevenir eventos cardiovasculares y optimizar función cardíaca a largo plazo."
      },
      immunity: {
        name: "Inmunidad",
        description: "Analiza sistema inmune con perfil completo de inmunoglobulinas y marcadores específicos para optimizar respuesta inmune y prevenir inmunosenescencia relacionada con el envejecimiento."
      },
      digest: {
        name: "Digestivo",
        description: "Evalúa salud intestinal con análisis completo de heces, parásitos y marcadores digestivos. Optimiza microbioma y función intestinal para mejorar absorción de nutrientes y salud general."
      },
      gut_gate: {
        name: "Gut Gate",
        description: "Analiza permeabilidad intestinal y salud de la barrera intestinal con marcadores específicos. Detecta síndrome de intestino permeable y optimiza integridad de la mucosa intestinal."
      },
      genome: {
        name: "Genoma",
        description: "Tests genéticos personalizados opcionales (farmacogenética, detoxificación, nutrición, envejecimiento, deporte) para medicina de precisión basada en tu perfil genético único."
      },
      coagulation: {
        name: "Coagulación",
        description: "Analiza sistema de coagulación (fibrinógeno, APTT, INR) para evaluar riesgo trombótico y función hemostática. Optimiza anticoagulación y previene eventos cardiovasculares."
      },
      cancer: {
        name: "Marcadores Tumorales",
        description: "Screening oncológico con marcadores tumorales específicos expandido: incluye PSA, CA125, CEA, AFP, HE4, SCC, proteína S-100, NSE y otros marcadores avanzados para detección temprana integral."
      },
      bioage: {
        name: "Edad Biológica",
        description: "Evalúa edad biológica mediante test epigenético MyEpiAgeing y fertilidad con AMH/espermiograma para determinar tu edad reproductiva y biológica real. Guía estrategias antienvejecimiento precisas."
      }
    },

    // Add-On Benefits/Characteristics
    addOnBenefits: {
      hormonas: [
        'Optimiza balance hormonal',
        'Mejora energía y vitalidad',
        'Soporte para terapias hormonales',
        'Monitoreo de edad reproductiva'
      ],
      endocrino: [
        'Función tiroidea avanzada',
        'Eje hipotálamo-hipófisis',
        'Metabolismo energético',
        'Regulación hormonal'
      ],
      antioxidantes: [
        'Evalúa capacidad antioxidante',
        'Identifica deficiencias vitamínicas',
        'Optimiza suplementación',
        'Reduce estrés oxidativo'
      ],
      oxidative_cell: [
        'Evaluación de daño celular',
        'Capacidad antioxidante específica',
        'Optimización celular',
        'Prevención del envejecimiento'
      ],
      inflammation: [
        'Detección de inflamación crónica',
        'Marcadores sistémicos',
        'Riesgo cardiovascular',
        'Optimización anti-inflamatoria'
      ],
      iv_nutrients: [
        'Optimiza terapias IV',
        'Detecta deficiencias nutricionales',
        'Personaliza suplementación',
        'Mejora absorción de nutrientes'
      ],
      metals: [
        'Detoxificación dirigida',
        'Prevención de toxicidad',
        'Salud neurológica',
        'Función cognitiva'
      ],
      bone_mineral: [
        'Prevención de osteoporosis',
        'Optimización de calcio',
        'Salud ósea a largo plazo',
        'Metabolismo mineral'
      ],
      cardiovascular: [
        'Prevención cardiovascular avanzada',
        'Optimización lipídica',
        'Reducción de riesgo cardíaco',
        'Monitoreo enzimas cardíacas'
      ],
      immunity: [
        'Detección autoinmunidad',
        'Función inmune',
        'Salud tiroidea',
        'Inflamación sistémica'
      ],
      digest: [
        'Función hepática',
        'Función pancreática',
        'Permeabilidad intestinal',
        'Detección parásitos',
        'Intolerancias alimentarias'
      ],
      gut_gate: [
        'Análisis microbioma',
        'Metabolitos funcionales',
        'Eje intestino-cerebro',
        'Permeabilidad intestinal'
      ],
      genome: [
        'Genoma completo',
        'Riesgo genético',
        'Farmacogenética',
        'Medicina personalizada'
      ],
      coagulation: [
        'Riesgo de trombosis',
        'Función plaquetaria',
        'Hemostasia',
        'Anticoagulación'
      ],
      cancer: [
        'Detección temprana expandida',
        'Marcadores especializados',
        'Cribado integral',
        'Seguimiento oncológico'
      ],
      bioage: [
        'Edad biológica epigenética',
        'Fertilidad y reproducción',
        'Antienvejecimiento personalizado',
        'Evaluación de longevidad'
      ]
    },

    // Package Comparison
    packages: {
      title: "Configura tu",
      titleHighlight: "Análisis Personalizado",
      description: "Combina el paquete Essential con Add-Ons especializados para crear tu análisis perfecto",
      essential: "Essential",
      addons: "Add-Ons",
      total: "Total",
      marketPrice: "P.V.P Mercado",
      finalPrice: "Precio Final",
      savings: "Ahorro",
      orderNow: "Solicitar Ahora",
      biomarkersCount: "biomarcadores",
      selectGender: "Selecciona tu género:",
      availableAddons: "Add-Ons Disponibles:",
      selectedAddons: "Add-Ons Seleccionados:",
      none: "Ninguno"
    },
    // Process Flow
    process: {
      title: "Proceso",
      subtitle: "Integral",
      description: "Descubre tu edad biológica real y añade años de vida saludable en solo 5 pasos: análisis científico de biomarcadores + plan personalizado de longevidad + interpretación de resultados y plan de acción. Tu futuro más saludable comienza hoy.",
      step1: {
        title: "Configura",
        description: "Selecciona tu paquete Essential personalizado y añade los módulos especializados (Add-Ons) que mejor se adapten a tus objetivos de salud y longevidad",
        duration: "5 min"
      },
      step2: {
        title: "Extracción",
        description: "Acude a cualquiera de nuestros más de 50 puntos de extracción distribuidos por toda España. Proceso rápido y cómodo con profesionales especializados",
        duration: "20 min"
      },
      step3: {
        title: "Análisis",
        description: "Tus muestras se procesan en laboratorios certificados ISO 15189 con tecnología de vanguardia y los más altos estándares de calidad internacional",
        duration: "5-7 días *"
      },
      step4: {
        title: "Resultados",
        description: "Recibe tu informe completo con análisis detallado de biomarcadores, cálculo de edad biológica y recomendaciones específicas personalizadas",
        duration: "1 día"
      },
      step5: {
        title: "Consulta",
        description: "Sesión personalizada con nuestro Health Coach para interpretar resultados y diseñar tu plan de acción específico de longevidad",
        duration: "45 min"
      },
      timeNote: "* Los tiempos pueden variar según los Add-Ons seleccionados",
      guarantees: "Nuestras Garantías",
      certifiedQuality: "Calidad Certificada",
      certifiedQualityDesc: "Laboratorios ISO 15189 y procesos validados internacionalmente",
      extractionNetwork: "Red de Extracción",
      extractionNetworkDesc: "Más de 50 puntos de extracción para máxima comodidad y accesibilidad",
      healthCoach: "Health Coach",
      healthCoachDesc: "Consulta personalizada para interpretar resultados y diseñar tu plan específico.",
      gdprCompliance: "Cumplimiento GDPR",
      gdprComplianceDesc: "Protección total de datos personales según normativa europea GDPR"
    },
    // Call to Action
    cta: {
      title: "¿Listo para transformar tu salud?",
      description: "Únete a miles de personas que ya han descubierto su potencial de longevidad",
      contactButton: "Contactar Ahora",
      emailSubject: "Consulta sobre Longevity Analytics"
    },
    // Footer
    footer: {
      services: "Servicios",
      essentialAnalysis: "Análisis Essential",
      specializedAddons: "Add-Ons Especializados",
      personalizedRecommendations: "Recomendaciones Personalizadas",
      contact: "Contacto",
      email: "Email",
      phone: "Teléfono",
      rightsCopyright: "Todos los derechos reservados.",
      poweredBy: "Desarrollado con React"
    },
    // Gender Selector
    gender: {
      male: "Hombre",
      female: "Mujer"
    },
    // Package Comparison Component
    packageComparison: {
      title: "Configura tu",
      titleHighlight: "Análisis Personalizado",
      description: "Comienza con el Essential y añade los Add-Ons que necesites. Precio y biomarcadores se actualizan automáticamente.",
      essential: "Essential",
      addons: "Add-Ons",
      totalBiomarkers: "biomarcadores totales",
      marketPrice: "P.V.P Mercado",
      finalPrice: "Precio Final",
      savings: "Ahorro",
      orderNow: "Solicitar Ahora",
      selectGender: "Selecciona tu género:",
      male: "Masculino",
      female: "Femenino",
      features: "Características:",
      glucidMetabolism: "Metabolismo glucídico completo",
      renalHepaticFunction: "Función renal y hepática",
      advancedLipidProfile: "Perfil lipídico avanzado",
      basicHormones: "Hormonas básicas",
      completeThyroid: "Tiroides completo",
      essentialMinerals: "Minerales esenciales",
      inflammatoryMarkers: "Marcadores inflamatorios",
      biologicalAgeCalculation: "Cálculo de edad biológica",
      selectedAddOns: "Add-Ons seleccionados:",
      totalPrice: "Precio Total",
      includes: "Incluye:",
      selectSpecializedModules: "Selecciona los módulos especializados que necesites. Cada Add-On se suma al Essential para una evaluación más profunda.",
      additionalBiomarkers: "Biomarcadores adicionales seleccionados:",
      basePriceEssential: "Precio base Essential",
      essentialPlusAddOns: "Essential + {count} Add-On{plural}",
      allPackagesInclude: "Todos los Paquetes Incluyen"
    },
    // Add-On Explorer Component
    addOnExplorer: {
      title: "Los",
      titleHighlight: "Add-Ons",
      titleSuffix: "del Essential",
      description: "Amplía tu análisis Essential con módulos especializados. Cada add-on aporta insights únicos para optimizar aspectos específicos de tu longevidad, siguiendo el modelo de Function Health.",
      newFunctionality: "Nueva Funcionalidad: Selección Personalizada",
      completeAddOn: "Add-on Completo:",
      completeAddOnDesc: "Click en la card del add-on para seleccionar todos los biomarcadores",
      individualBiomarkers: "Biomarcadores Individuales:",
      individualBiomarkersDesc: "Click en el botón + para expandir y seleccionar solo los que necesites",
      pricesFor: "Precios para:",
      masculine: "Masculino",
      feminine: "Femenino",
      filterByCategory: "Filtrar por categoría",
      allAddOns: "Todos los Add-Ons",
      longevityHealthspan: "Longevity / Healthspan",
      prevention: "Prevención",
      optimization: "Optimización",
      selected: "Seleccionado",
      biomarkers: "biomarcadores",
      pvp: "PVP",
      expandBiomarkers: "Expandir biomarcadores",
      collapseBiomarkers: "Contraer biomarcadores",
      selectAll: "Seleccionar todo",
      deselectAll: "Deseleccionar todo",
      selectBiomarker: "Seleccionar biomarcador",
      deselectBiomarker: "Deseleccionar biomarcador",
      summary: "Resumen de selección:",
      totalSelected: "Total seleccionado:",
      proceedToOrder: "Proceder al pedido"
    },

    // Biomarker Names
    biomarkerNames: {
      "H0000": "Hemograma completo",
      "H1420": "Hemoglobina A1c",
      "B0000": "Glucosa en ayunas",
      "B0200": "Albúmina",
      "B5600": "Insulina basal",
      "B6510": "HOMA-R",
      "B0020": "BUN (Urea)",
      "B0030": "Creatinina",
      "B0250": "Ácido úrico",
      "B1540": "eGFR",
      "B1260": "Ionograma (Na⁺, K⁺, Cl⁻)",
      "B1970": "Fosfatasa alcalina (ALP)",
      "B0050": "GPT-ALT",
      "B0060": "GOT-AST",
      "B0080": "Bilirrubina total",
      "B0240": "Proteínas totales",
      "B0070": "GGT",
      "B0010": "Colesterol total",
      "B0040": "Triglicéridos",
      "B0170": "HDL-C",
      "B0180": "LDL-C",
      "B3110": "ApoB",
      "B3100": "ApoA-I",
      "B5120": "Cortisol",
      "B5290": "DHEA-S",
      "B6020": "SHBG",
      "B6160": "Testosterona total",
      "B5850": "PTH intacta",
      "B6040": "T3 libre",
      "B6070": "T4 libre",
      "B6130": "TSH",
      "B3170": "PCR (hsCRP)",
      "B5590": "Homocisteína",
      "B0120": "Fósforo",
      "B0100": "Calcio total",
      "B1600": "Magnesio",
      "B8050": "Zinc",
      "B0130": "Hierro",
      "B3210": "Transferrina",
      "B7260": "Índice saturación transf.",
      "B5370": "Ferritina",
      "B6180": "Vitamina D (25-OH)",
      "B6190": "Vitamina B12",
      "B5410": "Folato",
      "B5350": "Estradiol",
      "B5980": "Prolactina",
      "B5800": "LH",
      "B5380": "FSH",
      "D0601": "Testosterona libre",
      "B6480": "Testosterona biodisp.",
      "D0850": "DHT",
      "B5932": "Progesterona",
      "D0181": "17-OH-Progesterona",
      "D0780": "Estrona",
      "B0260": "Bilirrubina directa",
      "B1980": "Lipasa",
      "B0350": "Amilasa",
      "B0110": "LDH",
      "B6030": "IGF-1",
      "B6010": "IGFBP-3",
      "I6740": "ACTH",
      "H0020": "VSG",
      "D0560": "Vitamina D (1,25-dihidroxi)",
      "T0811": "Retinol (Vitamina A)",
      "T2841": "Gamma-tocoferol (Vit E)",
      "T1191": "Alfa-tocoferol (Vit E)",
      "T1200": "Beta-caroteno",
      "T2830": "Coenzima Q10",
      "T3920": "Selenio",
      "T1061": "Vitamina C",
      "B7121": "Glutatión reductasa",
      "B3015": "Glutatión peroxidasa",
      "B3041": "G6PD",
      "B7790": "Interleucina-6",
      "I2081": "TNF-alfa",
      "B0270": "Ácido cólico",
      "B8060": "Adiponectina",
      "T0500": "Cromo",
      "T2590": "Ácidos grasos omega-3",
      "T1720": "Vitamina K1",
      "T0302": "Mercurio",
      "T0150": "Plomo",
      "T0960": "Arsénico",
      "T0480": "Cadmio",
      "D1111": "Fosfatasa alcalina ósea",
      "I3291": "CTX (C-telopéptido)",
      "T1572": "Calcio iónico",
      "B0750": "Lactato",
      "B1900": "LDL-C directo",
      "B0190": "Apolipoproteína B",
      "B7700": "Lp(a)",
      "I5047": "Cistatina C",
      "B2120": "CK-MB",
      "B0220": "Ceruloplasmina",
      "I0141": "ANA",
      "I5072": "Anti-CCP",
      "B6321": "Anti-tiroglobulina",
      "B6300": "Anti-TPO",
      "B7750": "H. pylori IgG",
      "B3130": "Factor reumatoide",
      "M1190": "Parásitos en heces",
      "P3031": "Panel alimentario IgG",
      "AB001": "Microbioma intestinal",
      "AB002": "Metaboloma",
      "GP001": "Farmacogenética",
      "GD001": "Genes detox",
      "GN001": "Nutrigenética",
      "GA001": "Genes longevidad",
      "GS001": "Genes deporte",
      "GU001": "Genes suplementos",
      "H0050": "Fibrinógeno",
      "H0850": "APTT",
      "H0860": "INR",
      "D1760": "Beta-hCG",
      "M0010": "Sangre oculta heces",
      "B7900": "Alfafetoproteína",
      "B5830": "PSA total",
      "B5840": "PSA libre",
      "B5110": "CEA",
      "B5080": "CA 125",
      "B5090": "CA 15.3",
      "B5100": "CA 19.9",
      "B8110": "HE4",
      "B8130": "SCC",
      "I5080": "Proteína S-100",
      "I5090": "NSE",
      "B8120": "CYFRA 21-1",
      "D1271": "CA 72.4",
      "B8160": "ProGRP",
      "OG001": "MyEpiAgeing",
      "D1001": "AMH",
      "B3340": "Espermiograma",
      "G1465": "Longitud telomérica"
    },

    // Biomarker Categories
    biomarkerCategories: {
      "Hematología, Hematopoyesis, Inmunidad": "Hematología, Hematopoyesis, Inmunidad",
      "Metabolismo glucídico": "Metabolismo glucídico",
      "Función hepática, Nutrición": "Función hepática, Nutrición",
      "Resistencia insulínica": "Resistencia insulínica",
      "Función renal": "Función renal",
      "Purinas, Riñón": "Purinas, Riñón",
      "Filtrado glomerular": "Filtrado glomerular",
      "Electrolitos": "Electrolitos",
      "Hígado / Hueso": "Hígado / Hueso",
      "Enzimas hepáticas": "Enzimas hepáticas",
      "Hígado, Hemólisis": "Hígado, Hemólisis",
      "Nutrición": "Nutrición",
      "Colestasis": "Colestasis",
      "Perfil lipídico": "Perfil lipídico",
      "Riesgo CV": "Riesgo CV",
      "Eje HHA": "Eje HHA",
      "Andrógenos suprarrenales": "Andrógenos suprarrenales",
      "Transporte esteroides": "Transporte esteroides",
      "Hormona general": "Hormona general",
      "Paratiroides": "Paratiroides",
      "Tiroides": "Tiroides",
      "Inflamación cardiovascular": "Inflamación cardiovascular",
      "Metionina / CV": "Metionina / CV",
      "Mineral óseo": "Mineral óseo",
      "Mineral neuromuscular": "Mineral neuromuscular",
      "Inmunidad": "Inmunidad",
      "Metabolismo hierro": "Metabolismo hierro",
      "Transporte hierro": "Transporte hierro",
      "Hierro": "Hierro",
      "Depósito hierro": "Depósito hierro",
      "Mineral-inmune": "Mineral-inmune",
      "Hematopoyesis": "Hematopoyesis",
      "Hormonas femeninas": "Hormonas femeninas",
      "Gonadotropina": "Gonadotropina",
      "Hormona masculina": "Hormona masculina",
      "Andrógeno potente": "Andrógeno potente",
      "Hormona femenina": "Hormona femenina",
      "Suprarrenal": "Suprarrenal",
      "Estrógeno menopáusico": "Estrógeno menopáusico",
      "Fertilidad masculina": "Fertilidad masculina",
      "Reserva ovárica": "Reserva ovárica",
      "Edad epigenética": "Edad epigenética",
      "Envejecimiento celular": "Envejecimiento celular"
    },

    // Biomarkers Descriptions
    biomarkers: {
      "6897": {
        description: "Análisis completo de orina. Detecta infecciones, proteinuria, hematuria y células anormales."
      },
      "H0000": { description: "Análisis completo de células sanguíneas evaluando glóbulos rojos, blancos, plaquetas y hemoglobina. Esencial para detectar anemia, infecciones y trastornos hematológicos."
      },
      "H1420": {
        description: "Promedio de glucosa en sangre durante los últimos 2-3 meses. Marcador estándar de oro para diagnóstico y monitoreo de diabetes y prediabetes."
      },
      "B0000": {
        description: "Nivel de azúcar en sangre tras 8-12 horas de ayuno. Cribado primario para diabetes y evaluación del metabolismo glucídico."
      },
      "B0200": { description: "Principal proteína plasmática. Indica función hepática, estado nutricional y capacidad de síntesis proteica."
      },
      "B5600": { description: "Nivel de insulina en ayunas. Marcador temprano de resistencia insulínica antes de que aparezcan alteraciones de glucosa."
      },
      "B6510": {
        description: "Índice que evalúa resistencia insulínica combinando glucosa e insulina en ayunas. Predictor de diabetes tipo 2."
      },
      "B0020": { description: "Producto de desecho del metabolismo proteico. Evalúa función renal y estado de hidratación."
      },
      "B0030": { description: "Producto de desecho muscular. Marcador más específico de función renal que la urea."
      },
      "B0250": {
        description: "Proteína transportadora de vitaminas liposolubles. Indica estado nutricional y función hepática."
      },
      "B1540": {
        description: "Tasa de filtración glomerular estimada. Mide la capacidad de filtrado de los riñones y detecta enfermedad renal temprana."
      },
      "B1260": {
        description: "Electrolitos esenciales para función celular. Sodio, potasio y cloro regulan hidratación, función nerviosa y muscular."
      },
      "B1970": { description: "Enzima presente en hígado y hueso. Elevada indica problemas hepáticos, óseos o de obstrucción biliar."
      },
      "B0050": { description: "Enzima hepática específica. Elevada indica daño hepático o inflamación. Marcador sensible de hepatotoxicidad."
      },
      "B0060": { description: "Enzima presente en hígado, corazón y músculo. Elevada indica daño celular en estos tejidos."
      },
      "B0080": { description: "Producto de degradación de glóbulos rojos. Elevada indica problemas hepáticos o hemólisis excesiva."
      },
      "B0240": { description: "Suma de todas las proteínas sanguíneas. Refleja estado nutricional y función de síntesis proteica hepática."
      },
      "B0070": {
        description: "Enzima hepática sensible al alcohol y medicamentos. Marcador de colestasis y daño hepático crónico."
      },
      "B0010": {
        description: "Suma de todas las fracciones de colesterol. Marcador básico de riesgo cardiovascular."
      },
      "B0040": {
        description: "Grasas en sangre. Elevadas indican riesgo cardiovascular y resistencia insulínica."
      },
      "B0170": {
        description: "Proteína transportadora de colesterol. Niveles bajos aumentan riesgo cardiovascular pese a colesterol normal."
      },
      "B0180": {
        description: "Colesterol malo. Transporta colesterol a tejidos. Elevado aumenta riesgo cardiovascular."
      },
      "B3110": {
        description: "Proteína de partículas aterogénicas (LDL, VLDL). Mejor predictor de riesgo cardiovascular que LDL-colesterol."
      },
      "B3100": {
        description: "Proteína principal del HDL. Facilita transporte reverso de colesterol. Protector cardiovascular."
      },
      "B5120": {
        description: "Hormona del estrés. Regula metabolismo, inmunidad e inflamación. Elevado indica estrés crónico."
      },
      "B5290": {
        description: "Precursor hormonal suprarrenal. Declina con edad. Importante para vitalidad y función cognitiva."
      },
      "B6020": {
        description: "Proteína transportadora de hormonas sexuales. Regula disponibilidad de testosterona y estradiol."
      },
      "B6160": {
        description: "Principal hormona sexual masculina, importante en mujeres. Regula masa muscular, libido y energía."
      },
      "B5850": {
        description: "Hormona paratiroidea. Regula calcio y fósforo. Elevada indica deficiencia de vitamina D o problemas óseos."
      },
      "B6040": {
        description: "Hormona tiroidea activa. Regula metabolismo, temperatura corporal y función cardiovascular."
      },
      "B6070": {
        description: "Hormona tiroidea precursora. Se convierte en T3 activa en tejidos periféricos."
      },
      "B6130": {
        description: "Hormona estimulante del tiroides. Controla la producción de hormonas tiroideas T3 y T4."
      },
      "B3170": {
        description: "Proteína C reactiva altamente sensible. Marcador de inflamación sistémica y riesgo cardiovascular."
      },
      "B5590": {
        description: "Aminoácido del metabolismo de metionina. Elevada indica riesgo cardiovascular y deficiencia de B6, B12, folato."
      },
      "B0120": {
        description: "Enzima digestiva del páncreas. Elevada indica disfunción pancreática o pancreatitis aguda."
      },
      "B0100": {
        description: "Enzima específica de células hepáticas. Marcador muy sensible de daño hepático y lesión hepatocelular."
      },
      "B1600": {
        description: "Mineral esencial para función muscular, nerviosa y cardiovascular. Cofactor de >300 enzimas."
      },
      "B8050": {
        description: "Oligoelemento esencial para inmunidad, cicatrización, función cognitiva y síntesis proteica."
      },
      "B0130": {
        description: "Enzima que descompone grasas. Elevada indica insuficiencia pancreática o maldigestión."
      },
      "B3210": {
        description: "Proteína transportadora de hierro. Refleja capacidad de transporte y estado nutricional del hierro."
      },
      "B7260": {
        description: "Porcentaje de saturación de transferrina. Indica disponibilidad de hierro para los tejidos."
      },
      "B5370": {
        description: "Proteína de almacenamiento de hierro. Refleja reservas corporales de hierro y puede indicar inflamación."
      },
      "B6180": {
        description: "Metabolito de hormona del estrés. Refleja función suprarrenal y respuesta al estrés."
      },
      "B6190": {
        description: "Metabolito de hormona femenina. Indica metabolismo de estrógenos y equilibrio hormonal."
      },
      "B5410": {
        description: "Hormona del crecimiento. Esencial para crecimiento, masa muscular y metabolismo."
      },
      "B5350": {
        description: "Principal hormona sexual femenina. Regula ciclo menstrual, salud ósea y protección cardiovascular."
      },
      "B5980": {
        description: "Hormona de la lactancia. Elevada puede suprimir función reproductiva."
      },
      "B5800": {
        description: "Estimula ovulación en mujeres y producción de testosterona en hombres."
      },
      "B5380": {
        description: "Hormona luteinizante. Controla función ovárica y testicular."
      },
      "D0601": {
        description: "Fracción activa de testosterona no unida a proteínas. Más específica que testosterona total."
      },
      "B6480": {
        description: "Testosterona biodisponible. Fracción libre más débilmente unida. Mejor indicador de actividad androgénica."
      },
      "D0850": {
        description: "Dihidrotestosterona. Andrógeno más potente. Responsable de características masculinas y alopecia."
      },
      "B5932": {
        description: "Hormona del embarazo y ciclo menstrual. Importante para fertilidad y equilibrio hormonal."
      },
      "D0181": {
        description: "Precursor de cortisol y andrógenos. Elevada indica hiperplasia suprarrenal congénita."
      },
      "D0780": {
        description: "Estrógeno predominante en menopausia. Producido principalmente en tejido adiposo."
      },
      "B0260": { description: "Bilirrubina conjugada. Marcador específico de función hepática y obstrucción biliar."
      },
      "B1980": {
        description: "Enzima pancreática que digiere grasas. Marcador específico de función pancreática exocrina."
      },
      "B0350": {
        description: "Enzima que digiere carbohidratos. Producida por páncreas y glándulas salivales."
      },
      "B0110": {
        description: "Enzima presente en páncreas y glándulas salivales. Elevada indica inflamación o daño pancreático."
      },
      "B6030": {
        description: "Factor de crecimiento insulínico. Mediador de hormona de crecimiento. Importante para longevidad y masa muscular."
      },
      "B6010": {
        description: "Proteína transportadora de IGF-1. Modula actividad de IGF-1 y tiene efectos independientes en longevidad."
      },
      "I6740": {
        description: "Hormona adrenocorticotrópica. Estimula producción de cortisol. Evalúa función del eje hipotálamo-hipófisis-suprarrenal."
      },
      "H0020": {
        description: "Velocidad de sedimentación globular. Marcador inespecífico de inflamación sistémica."
      },
      "D0560": {
        description: "Forma activa de vitamina D. Hormona que regula absorción de calcio y metabolismo óseo."
      },
      "T0811": {
        description: "Vitamina A activa. Antioxidante liposoluble esencial para visión, inmunidad y diferenciación celular."
      },
      "T2841": {
        description: "Forma gamma de vitamina E. Antioxidante específico contra radicales de nitrógeno y peroxinitrito."
      },
      "T1191": {
        description: "Forma alfa de vitamina E. Principal antioxidante liposoluble que protege membranas celulares."
      },
      "T1200": {
        description: "Principal precursor de vitamina A. Antioxidante carotenoide que protege contra daño oxidativo."
      },
      "T2830": {
        description: "Antioxidante mitocondrial esencial. Crucial para producción de energía y protección celular."
      },
      "T3920": {
        description: "Oligoelemento antioxidante esencial. Cofactor de glutatión peroxidasa. Protege contra estrés oxidativo."
      },
      "T1061": {
        description: "Vitamina antioxidante esencial. Neutraliza radicales libres y regenera otros antioxidantes como vitamina E."
      },
      "B7121": {
        description: "Enzima que regenera glutatión reducido. Indicador del estado de vitamina B2 y capacidad antioxidante."
      },
      "B3015": {
        description: "Enzima antioxidante selenio-dependiente. Protege células del daño oxidativo por peróxidos."
      },
      "B3041": {
        description: "Glucosa-6-fosfato deshidrogenasa. Enzima clave en defensa antioxidante celular vía NADPH."
      },
      "B7790": {
        description: "Interleucina-6. Citocina proinflamatoria clave. Elevada en inflamación crónica y envejecimiento."
      },
      "I2081": {
        description: "Factor de necrosis tumoral alfa. Citocina proinflamatoria potente. Implicada en envejecimiento y enfermedades crónicas."
      },
      "B0270": {
        description: "Ácido biliar primario. Refleja función hepática y capacidad de síntesis de ácidos biliares."
      },
      "B8060": {
        description: "Marcador antiinflamatorio. Indica capacidad de resolución inflamatoria."
      },
      "T0500": {
        description: "Oligoelemento que mejora sensibilidad a insulina y metabolismo de glucosa. Importante en diabetes."
      },
      "T2590": {
        description: "Perfil de ácidos grasos omega-3. Evalúa estado nutricional y balance inflamatorio."
      },
      "T1720": {
        description: "Vitamina liposoluble esencial para coagulación. Cofactor de factores de coagulación."
      },
      "T0302": {
        description: "Mercurio en sangre. Metal tóxico que afecta sistema nervioso. Fuentes: pescado, amalgamas dentales."
      },
      "T0150": {
        description: "Plomo en sangre. Metal tóxico que afecta desarrollo neurológico y función cognitiva."
      },
      "T0960": {
        description: "Arsénico total en sangre. Metaloide tóxico asociado con cáncer y enfermedades cardiovasculares."
      },
      "T0480": {
        description: "Cadmio en sangre. Metal tóxico que afecta riñones, huesos y sistema cardiovascular."
      },
      "D1111": {
        description: "Fosfatasa alcalina específica de hueso. Marcador de formación ósea y actividad osteoblástica."
      },
      "I3291": {
        description: "C-telopéptido. Marcador de reabsorción ósea. Evalúa actividad osteoclástica y pérdida ósea."
      },
      "T1572": {
        description: "Fracción activa del calcio sérico. Forma biológicamente disponible para funciones celulares."
      },
      "B0750": {
        description: "Producto del metabolismo anaeróbico. Elevado indica hipoxia tisular o disfunción mitocondrial."
      },
      "B1900": {
        description: "LDL colesterol medido directamente. Más preciso que el calculado en casos de triglicéridos elevados."
      },
      "B0190": {
        description: "Proteína transportadora de colesterol. Refleja factores de riesgo cardiovascular genéticos."
      },
      "B7700": {
        description: "Lipoproteína aterogénica genéticamente determinada. Factor de riesgo cardiovascular independiente."
      },
      "I5047": {
        description: "Marcador de función renal más preciso que creatinina. No se ve afectado por masa muscular."
      },
      "B2120": {
        description: "Creatina quinasa específica del miocardio. Marcador de daño cardíaco e infarto."
      },
      "B0220": {
        description: "Proteína transportadora de hierro. Refleja reservas de hierro y capacidad de síntesis hepática."
      },
      "I0141": {
        description: "Anticuerpos antinucleares. Screening para enfermedades autoinmunes sistémicas como lupus."
      },
      "I5072": {
        description: "Anticuerpos anti-péptido citrulinado cíclico. Específicos de artritis reumatoide."
      },
      "B6321": {
        description: "Anticuerpos anti-tiroglobulina. Marcador de autoinmunidad tiroidea."
      },
      "B6300": {
        description: "Anticuerpos anti-peroxidasa tiroidea. Marcador de tiroiditis autoinmune (Hashimoto)."
      },
      "B7750": {
        description: "Anticuerpos contra H. pylori. Detecta infección gástrica asociada a úlceras y cáncer gástrico."
      },
      "B3130": {
        description: "Autoanticuerpo presente en artritis reumatoide y otras enfermedades autoinmunes."
      },
      "M1190": {
        description: "Examen parasitológico de heces. Detecta parásitos intestinales que afectan salud digestiva."
      },
      "P3031": {
        description: "Panel de 200 alimentos para detectar intolerancias alimentarias mediadas por IgG."
      },
      "AB001": {
        description: "Análisis completo de diversidad microbiana intestinal. Evalúa balance de bacterias beneficiosas y patógenas."
      },
      "AB002": {
        description: "Perfil de metabolitos en orina y heces. Evalúa vías metabólicas y funcionalidad del microbioma."
      },
      "GP001": {
        description: "Farmacogenómica general. Analiza variantes genéticas que afectan la respuesta a medicamentos para personalizar tratamientos y evitar efectos adversos."
      },
      "GD001": {
        description: "Análisis genético de detoxificación. Evalúa capacidad genética para eliminar toxinas y metabolizar xenobióticos."
      },
      "GN001": {
        description: "Análisis genético nutricional. Identifica variantes que afectan metabolismo de macronutrientes y micronutrientes."
      },
      "GA001": {
        description: "Análisis genético del envejecimiento. Evalúa predisposición genética al envejecimiento y longevidad."
      },
      "GS001": {
        description: "Análisis genético deportivo. Optimiza entrenamiento y rendimiento basado en perfil genético."
      },
      "GU001": {
        description: "Análisis genético de suplementación. Personaliza suplementos basado en necesidades genéticas individuales."
      },
      "H0050": {
        description: "Proteína de coagulación y marcador inflamatorio. Elevado indica riesgo trombótico e inflamación."
      },
      "H0850": {
        description: "Tiempo de tromboplastina parcial activada. Evalúa vía intrínseca de coagulación."
      },
      "H0860": {
        description: "Ratio internacional normalizado. Mide tiempo de protrombina. Monitorea anticoagulación."
      },
      "D1760": {
        description: "Gonadotropina coriónica humana beta. Marcador de embarazo y ciertos tumores testiculares y ováricos."
      },
      "M0010": {
        description: "Detección de sangre microscópica en heces. Screening para cáncer colorrectal y pólipos."
      },
      "B7900": {
        description: "Alfafetoproteína. Marcador de cáncer hepático y tumores de células germinales."
      },
      "B5830": {
        description: "Antígeno prostático específico total. Screening para cáncer de próstata e hiperplasia benigna."
      },
      "B5840": {
        description: "Fracción libre de PSA. Mejora especificidad para distinguir cáncer de hiperplasia benigna."
      },
      "B5110": {
        description: "Antígeno carcinoembrionario. Marqueur de cánceres digestivos, especialmente colorrectal."
      },
      "B5080": {
        description: "Marcador tumoral de cáncer de ovario. También elevado en endometriosis y otras condiciones."
      },
      "B5090": {
        description: "Marcador tumoral de cáncer de mama. Útil para monitoreo de tratamiento y recurrencia."
      },
      "B5100": {
        description: "Marcador tumoral de cáncer pancreático y biliar. También elevado en pancreatitis."
      },
      "B8110": {
        description: "Marcador tumoral de cáncer de ovario más específico que CA125."
      },
      "B8130": {
        description: "Antígeno de células escamosas. Marqueur de carcinomas escamosos de cérvix, pulmón y esófago."
      },
      "I5080": {
        description: "Proteína S-100. Marqueur de melanoma y tumores del sistema nervioso."
      },
      "I5090": {
        description: "Enolasa neuroespecífica. Marqueur de tumores neuroendocrinos y cáncer de pulmón de células pequeñas."
      },
      "B8120": {
        description: "Fragmento de citoqueratina 21-1. Marqueur de cáncer de pulmón no microcítico."
      },
      "D1271": {
        description: "Marqueur tumoral de cáncer gástrico y otros adenocarcinomas."
      },
      "B8160": {
        description: "Pro-péptido liberador de gastrina. Marqueur spécifique de cáncer de pulmón microcítico."
      },
      "OG001": {
        description: "Test epigenético de edad biológica. Mide metilación del ADN pour déterminer la edad biológica réelle."
      },
      "D1001": {
        description: "Hormona antimülleriana. Marqueur de réserve ovarienne et fertilité féminine."
      },
      "B3340": {
        description: "Analyse complète du sperme utilisée pour mesurer âge biologique masculin. Évalue concentration, motilité et morphologie spermatique comme marqueurs de vieillissement reproductif."
      },
      "G1465": {
        description: "Mesure de longueur des télomères. Biomarqueur direct du vieillissement cellulaire et prédicteur de longévité."
      }
    }
  },

  en: {
    // Navbar
    navbar: {
      clinicalAnalysis: "Clinical Analysis",
      addons: "Add-ons",
      process: "Process",
      contact: "Contact",
      language: "Language"
    },
    // Hero Section
    hero: {
      tagline: "Precision Data for Optimization.",
      title: "No data, no action - get yours!",
      description: "Measure more than 130 biomarkers and 7 specialized analyses, transforming data science into a comprehensive prevention, longevity and optimization plan.",
      exploreButton: "Explore Analysis",
      beyondDiagnosis: "Beyond diagnosis:",
      actionableRecommendations: "Actionable recommendations",
      supplementation: "Supplementation",
      supplementationDesc: "We identify potential deficits and formulate protocols with high bioavailability nutraceuticals. We adjust doses after each analytical review to keep you in optimal range.",
      nutrition: "Nutrition",
      nutritionDesc: "We show you the nutrients you need and how to structure your diet, providing you with information and tools to design your own plan.",
      lifestyle: "Lifestyle",
      lifestyleDesc: "Recommendations on exercise, sleep, stress management and habits based on your specific biomarkers to optimize your longevity.",
      monitoring: "Monitoring",
      monitoringDesc: "Periodic tracking of your biomarkers to adjust interventions and ensure you stay in optimal health ranges."
    },
    // Medical Systems Explorer
    systems: {
      title: "Longevity Analytics",
      titleHighlight: "Analysis",
      description: "We offer three personalized analysis packages to better adapt to the specific needs of each individual: Essential for fundamental analysis, Core for specialized intermediate evaluation, and Advanced for the most complete and exhaustive evaluation of your health and longevity.",
      essentialDescription: "The Essential Analysis examines fundamental biomarkers to draw an accurate picture of your current health status and includes calculation of PhenoAge (biological age) based on 9 scientifically validated biomarkers. With this data we can anticipate silent risks, establish therapeutic priorities and define whether to add additional modules (add-ons). Transforming analytical science into personalized decisions and a clear action plan.",
      performanceDescription: "Specialized package for sports performance and physical optimization, including specific biomarkers for energy, recovery and muscle function. Designed for athletes and active people seeking to maximize their physical potential.",
      coreDescription: "Complete package of fundamental biomarkers for comprehensive longevity analysis. Includes advanced evaluation of metabolic, hormonal, inflammatory and oxidative stress systems for complete health optimization.",
      advancedDescription: "Most complete package with advanced analysis of heavy metals, microbiome and specialized biomarkers. The most exhaustive evaluation available for those seeking total control of their health and longevity.",
      
      // Target Audiences
      essentialTargetAudience: "Ideal for clients starting their longevity journey",
      performanceTargetAudience: "Ideal for athletes and active people seeking to optimize their physical performance",
      coreTargetAudience: "For clients seeking a complete and detailed analysis",
      advancedTargetAudience: "For clients seeking the most complete analysis available",
      
      // Tres perfiles de análisis
      analysisProfiles: {
        essential: {
          title: "Essential",
          highlight: "46 Biomarkers",
          description: "Perfect for those seeking an overview and basic guidance for health prevention. Ideal for starting your journey towards better health."
        },
        performance: {
          title: "Performance",
          highlight: "60+ Biomarkers",
          description: "Specialized in sports performance and physical optimization. Includes specific biomarkers for energy, recovery and muscle function.",
          features: [
            "Everything included in Essential",
            "Sports performance biomarkers",
            "Muscle recovery markers",
            "Energy and metabolic profile",
            "Athlete-specific hormones",
            "Physical stress evaluation",
            "Hydration markers",
            "Fatigue biomarkers"
          ]
        },
        core: {
          title: "Core",
          highlight: "90+ Biomarkers",
          description: "Designed for optimization and longevity control, aimed at those who go one step further to deeply understand their body.",
          features: [
            "Everything included in Essential",
            "Advanced cardiovascular profile",
            "Complete hormones (male/female)",
            "Specific inflammatory markers",
            "Oxidative stress and antioxidants",
            "Detailed nutritional evaluation",
            "Basic tumor markers",
            "Aging biomarkers"
          ]
        },
        advanced: {
          title: "Advanced", 
          highlight: "120 Biomarkers",
          description: "For people who leave nothing to chance and want to have everything under control. The most complete and exhaustive evaluation available.",
          features: [
            "Everything included in Core",
            "Complete heavy metals panel",
            "Intestinal microbiome analysis",
            "Extended tumor markers",
            "Advanced longevity evaluation",
            "Complete coagulation profile",
            "Fertility biomarkers",
            "Complete oxidative stress assessment"
          ]
        }
      },
      essentialPackage: "Essential Analysis",
      male: "Male",
      female: "Female",
      biomarkers: "biomarkers",
      selected: "Selected",
      addToAnalysis: "Add to analysis",
      removeFromAnalysis: "Remove from analysis",
      viewBiomarkers: "View Biomarkers",
      hideBiomarkers: "Hide Biomarkers",
      viewAddOns: "View Add-Ons",
      hideAddOns: "Hide Add-Ons",
      marketPrice: "Market Price",
      ourPrice: "Our Price",
      youSave: "You Save",
      complementEssential: "Complement your Essential",
      withSpecializedModules: "with these specialized modules. Each Add-On adds to the 46 base biomarkers for a deeper evaluation.",
      biomarkersIncludedEssential: "Biomarkers Included in Essential",
      tests: "tests",
      geneticPricesDisclaimer: "Genetic test prices may be subject to modifications.",
      addOnsSpecialized: "Specialized Add-Ons",
      biomarkersOf: "Biomarkers of",
      pvp: "RRP",
      ctaTitle: "Ready to optimize your <span className=\"text-cream\">organism</span>?",
      ctaDescription: "Start with the <span className=\"font-bold text-cream\">Essential</span> and add the <span className=\"font-bold text-cream\">Add-Ons</span> you need. Get personalized recommendations for supplementation, nutrition and lifestyle."
    },

    // Add-Ons Names and Descriptions
    addOns: {
      hormonas: {
        name: "Hormones",
        description: "Optimize gender-specific hormone levels (testosterone, estradiol, progesterone) to improve energy, libido and overall well-being. Identify imbalances that affect vitality and aging."
      },
      endocrino: {
        name: "Endocrine", 
        description: "Evaluate the complete hormonal axis (IGF-1, ACTH, pancreatic function, reproductive hormones) to optimize metabolism, cellular growth and endocrine function. Identify metabolic dysfunctions and guide longevity strategies."
      },
      antioxidantes: {
        name: "Antioxidants",
        description: "Measure antioxidant vitamins (A, E), coenzyme Q10 and carotenoids to evaluate your defense capacity against aging. Personalize antioxidant supplementation and reduce oxidative stress."
      },
      oxidative_cell: {
        name: "Oxidative Stress",
        description: "Analyze selenium, vitamin C and specific glutathione system markers to evaluate aging at the molecular level. Optimize cellular protection and prevent cumulative oxidative damage."
      },
      inflammation: {
        name: "Inflammation",
        description: "Measure systemic inflammation markers (ESR, IL-6, TNF-α) to detect silent chronic inflammation. Guide anti-inflammatory strategies and reduce chronic disease risk."
      },
      iv_nutrients: {
        name: "IV & Nutrients",
        description: "Evaluate B-complex vitamins, essential minerals and nutrients to optimize cellular and neurological function. Personalize nutritional protocols and specific IV supplementation."
      },
      metals: {
        name: "Heavy Metals",
        description: "Detect accumulation of toxic metals (lead, mercury, cadmium) that accelerate aging. Guide specific chelation and detoxification protocols to optimize cellular health."
      },
      bone_mineral: {
        name: "Bone & Mineral",
        description: "Analyze bone and mineral metabolism (calcium, phosphorus, magnesium, vitamin D) to prevent osteoporosis and optimize skeletal health. Personalize bone strengthening strategies."
      },
      cardiovascular: {
        name: "Cardiovascular",
        description: "Evaluate cardiovascular health with advanced biomarkers (Lp(a), fatty acids, vitamin K1) to prevent cardiovascular events and optimize long-term cardiac function."
      },
      immunity: {
        name: "Immunity",
        description: "Analyze immune system with complete immunoglobulin profile and specific markers to optimize immune response and prevent aging-related immunosenescence."
      },
      digest: {
        name: "Digestive",
        description: "Evaluate intestinal health with complete stool analysis, parasites and digestive markers. Optimize microbiome and intestinal function to improve nutrient absorption and overall health."
      },
      gut_gate: {
        name: "Gut Gate",
        description: "Analyze intestinal permeability and intestinal barrier health with specific markers. Detect leaky gut syndrome and optimize intestinal mucosa integrity."
      },
      genome: {
        name: "Genome",
        description: "Optional personalized genetic tests (pharmacogenetics, detoxification, nutrition, aging, sports) for precision medicine based on your unique genetic profile."
      },
      coagulation: {
        name: "Coagulation",
        description: "Analyze coagulation system (fibrinogen, APTT, INR) to evaluate thrombotic risk and hemostatic function. Optimize anticoagulation and prevent cardiovascular events."
      },
      cancer: {
        name: "Tumor Markers",
        description: "Expanded oncological screening with specific tumor markers: includes PSA, CA125, CEA, AFP, HE4, SCC, S-100 protein, NSE and other advanced markers for comprehensive early detection."
      },
      bioage: {
        name: "Biological Age",
        description: "Evaluate biological age through MyEpiAgeing epigenetic test and fertility with AMH/spermogram to determine your real reproductive and biological age. Guide precise anti-aging strategies."
      }
    },

    // Add-On Benefits/Characteristics
    addOnBenefits: {
      hormonas: [
        'Optimize hormonal balance',
        'Improve energy and vitality',
        'Support for hormonal therapies',
        'Reproductive age monitoring'
      ],
      endocrino: [
        'Advanced thyroid function',
        'Hypothalamic-pituitary axis',
        'Energy metabolism',
        'Hormonal regulation'
      ],
      antioxidantes: [
        'Evaluate antioxidant capacity',
        'Identify vitamin deficiencies',
        'Optimize supplementation',
        'Reduce oxidative stress'
      ],
      oxidative_cell: [
        'Cellular damage assessment',
        'Specific antioxidant capacity',
        'Cellular optimization',
        'Aging prevention'
      ],
      inflammation: [
        'Chronic inflammation detection',
        'Systemic markers',
        'Cardiovascular risk',
        'Anti-inflammatory optimization'
      ],
      iv_nutrients: [
        'Optimize IV therapies',
        'Detect nutritional deficiencies',
        'Personalize supplementation',
        'Improve nutrient absorption'
      ],
      metals: [
        'Targeted detoxification',
        'Toxicity prevention',
        'Neurological health',
        'Cognitive function'
      ],
      bone_mineral: [
        'Osteoporosis prevention',
        'Calcium optimization',
        'Long-term bone health',
        'Mineral metabolism'
      ],
      cardiovascular: [
        'Advanced cardiovascular prevention',
        'Lipid optimization',
        'Cardiac risk reduction',
        'Cardiac enzyme monitoring'
      ],
      immunity: [
        'Autoimmunity detection',
        'Immune function',
        'Thyroid health',
        'Systemic inflammation'
      ],
      digest: [
        'Hepatic function',
        'Pancreatic function',
        'Intestinal permeability',
        'Parasite detection',
        'Food intolerances'
      ],
      gut_gate: [
        'Microbiome analysis',
        'Functional metabolites',
        'Gut-brain axis',
        'Intestinal permeability'
      ],
      genome: [
        'Complete genome',
        'Genetic risk',
        'Pharmacogenetics',
        'Personalized medicine'
      ],
      coagulation: [
        'Thrombosis risk',
        'Platelet function',
        'Hemostasis',
        'Anticoagulation'
      ],
      cancer: [
        'Expanded early detection',
        'Specialized markers',
        'Comprehensive screening',
        'Oncological monitoring'
      ],
      bioage: [
        'Epigenetic biological age',
        'Fertility and reproduction',
        'Personalized anti-aging',
        'Longevity assessment'
      ]
    },

    // Package Comparison
    packages: {
      title: "Configure your",
      titleHighlight: "Personalized Analysis",
      description: "Combine the Essential package with specialized Add-Ons to create your perfect analysis",
      essential: "Essential",
      addons: "Add-Ons",
      total: "Total",
      marketPrice: "Market Price",
      finalPrice: "Final Price",
      savings: "Savings",
      orderNow: "Order Now",
      biomarkersCount: "biomarkers",
      selectGender: "Select your gender:",
      availableAddons: "Available Add-Ons:",
      selectedAddons: "Selected Add-Ons:",
      none: "None"
    },
    // Process Flow
    process: {
      title: "Integral",
      subtitle: "Process",
      description: "Discover your real biological age and add years of healthy life in just 5 steps: scientific biomarker analysis + personalized longevity plan + results interpretation and action plan. Your healthier future starts today.",
      step1: {
        title: "Configure",
        description: "Select your personalized Essential package and add specialized modules (Add-Ons) that best suit your health and longevity goals",
        duration: "5 min"
      },
      step2: {
        title: "Extraction",
        description: "Visit any of our more than 50 extraction points distributed throughout Spain. Quick and comfortable process with specialized professionals",
        duration: "20 min"
      },
      step3: {
        title: "Analysis",
        description: "Your samples are processed in ISO 15189 certified laboratories with cutting-edge technology and the highest international quality standards",
        duration: "5-7 days *"
      },
      step4: {
        title: "Results",
        description: "Receive your complete report with detailed biomarker analysis, biological age calculation and personalized specific recommendations",
        duration: "1 day"
      },
      step5: {
        title: "Consultation",
        description: "Personalized session with our Health Coach to interpret results and design your specific longevity action plan",
        duration: "45 min"
      },
      timeNote: "* Times may vary depending on selected Add-Ons",
      guarantees: "Our Guarantees",
      certifiedQuality: "Certified Quality",
      certifiedQualityDesc: "ISO 15189 laboratories and internationally validated processes",
      extractionNetwork: "Extraction Network",
      extractionNetworkDesc: "More than 50 extraction points for maximum comfort and accessibility",
      healthCoach: "Health Coach",
      healthCoachDesc: "Personalized consultation to interpret results and design your specific plan.",
      gdprCompliance: "GDPR Compliance",
      gdprComplianceDesc: "Total protection of personal data according to European GDPR regulations"
    },
    // Call to Action
    cta: {
      title: "Ready to transform your health?",
      description: "Join thousands of people who have already discovered their longevity potential",
      contactButton: "Contact Now",
      emailSubject: "Inquiry about Longevity Analytics"
    },
    // Footer
    footer: {
      services: "Services",
      essentialAnalysis: "Essential Analysis",
      specializedAddons: "Specialized Add-Ons",
      personalizedRecommendations: "Personalized Recommendations",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      rightsCopyright: "All rights reserved.",
      poweredBy: "Powered by React"
    },
    // Gender Selector
    gender: {
      male: "Male",
      female: "Female"
    },
    // Package Comparison Component
    packageComparison: {
      title: "Configure your",
      titleHighlight: "Personalized Analysis",
      description: "Start with the Essential and add the Add-Ons you need. Price and biomarkers update automatically.",
      essential: "Essential",
      addons: "Add-Ons",
      totalBiomarkers: "total biomarkers",
      marketPrice: "Market Price",
      finalPrice: "Final Price",
      savings: "Savings",
      orderNow: "Order Now",
      selectGender: "Select your gender:",
      male: "Male",
      female: "Female",
      features: "Features:",
      glucidMetabolism: "Complete glucose metabolism",
      renalHepaticFunction: "Renal and hepatic function",
      advancedLipidProfile: "Advanced lipid profile",
      basicHormones: "Basic hormones",
      completeThyroid: "Complete thyroid",
      essentialMinerals: "Essential minerals",
      inflammatoryMarkers: "Inflammatory markers",
      biologicalAgeCalculation: "Biological age calculation",
      selectedAddOns: "Selected Add-Ons:",
      totalPrice: "Total Price",
      includes: "Includes:",
      selectSpecializedModules: "Select the specialized modules you need. Each Add-On adds to the Essential for a deeper evaluation.",
      additionalBiomarkers: "Additional biomarkers selected:",
      basePriceEssential: "Essential base price",
      essentialPlusAddOns: "Essential + {count} Add-On{plural}",
      allPackagesInclude: "All Packages Include"
    },
    // Add-On Explorer Component
    addOnExplorer: {
      title: "The",
      titleHighlight: "Add-Ons",
      titleSuffix: "for Essential",
      description: "Expand your Essential analysis with specialized modules. Each add-on provides unique insights to optimize specific aspects of your longevity, following the Function Health model.",
      newFunctionality: "New Functionality: Personalized Selection",
      completeAddOn: "Complete Add-on:",
      completeAddOnDesc: "Click on the add-on card to select all biomarkers",
      individualBiomarkers: "Individual Biomarkers:",
      individualBiomarkersDesc: "Click the + button to expand and select only what you need",
      pricesFor: "Prices for:",
      masculine: "Male",
      feminine: "Female",
      filterByCategory: "Filter by category",
      allAddOns: "All Add-Ons",
      longevityHealthspan: "Longevity / Healthspan",
      prevention: "Prevention",
      optimization: "Optimization",
      selected: "Selected",
      biomarkers: "biomarkers",
      pvp: "RRP",
      expandBiomarkers: "Expand biomarkers",
      collapseBiomarkers: "Collapse biomarkers",
      selectAll: "Select all",
      deselectAll: "Deselect all",
      selectBiomarker: "Select biomarker",
      deselectBiomarker: "Deselect biomarker",
      summary: "Selection summary:",
      totalSelected: "Total selected:",
      proceedToOrder: "Proceed to order"
    },

    // Biomarker Names
    biomarkerNames: {
      "H0000": "Complete Blood Count",
      "H1420": "Hemoglobin A1c",
      "B0000": "Fasting Glucose",
      "B0200": "Albumin",
      "B5600": "Fasting Insulin",
      "B6510": "HOMA-IR",
      "B0020": "BUN (Urea)",
      "B0030": "Creatinine",
      "B0250": "Uric Acid",
      "B1540": "eGFR",
      "B1260": "Electrolytes (Na⁺, K⁺, Cl⁻)",
      "B1970": "Alkaline Phosphatase (ALP)",
      "B0050": "ALT",
      "B0060": "AST",
      "B0080": "Total Bilirubin",
      "B0240": "Total Protein",
      "B0070": "GGT",
      "B0010": "Total Cholesterol",
      "B0040": "Triglycerides",
      "B0170": "HDL-C",
      "B0180": "LDL-C",
      "B3110": "ApoB",
      "B3100": "ApoA-I",
      "B5120": "Cortisol",
      "B5290": "DHEA-S",
      "B6020": "SHBG",
      "B6160": "Total Testosterone",
      "B5850": "Intact PTH",
      "B6040": "Free T3",
      "B6070": "Free T4",
      "B6130": "TSH",
      "B3170": "hsCRP",
      "B5590": "Homocysteine",
      "B0120": "Phosphorus",
      "B0100": "Total Calcium",
      "B1600": "Magnesium",
      "B8050": "Zinc",
      "B0130": "Iron",
      "B3210": "Transferrin",
      "B7260": "Transferrin Saturation",
      "B5370": "Ferritin",
      "B6180": "Vitamin D (25-OH)",
      "B6190": "Vitamin B12",
      "B5410": "Folate",
      "B5350": "Estradiol",
      "B5980": "Prolactin",
      "B5800": "LH",
      "B5380": "FSH",
      "D0601": "Free Testosterone",
      "B6480": "Bioavailable Testosterone",
      "D0850": "DHT",
      "B5932": "Progesterone",
      "D0181": "17-OH-Progesterone",
      "D0780": "Estrone",
      "B0260": "Direct Bilirubin",
      "B1980": "Lipase",
      "B0350": "Amylase",
      "B0110": "LDH",
      "B6030": "IGF-1",
      "B6010": "IGFBP-3",
      "I6740": "ACTH",
      "H0020": "ESR",
      "D0560": "Vitamin D (1,25-dihydroxy)",
      "T0811": "Retinol (Vitamin A)",
      "T2841": "Gamma-tocopherol (Vit E)",
      "T1191": "Alpha-tocopherol (Vit E)",
      "T1200": "Beta-carotene",
      "T2830": "Coenzyme Q10",
      "T3920": "Selenium",
      "T1061": "Vitamin C",
      "B7121": "Glutathione Reductase",
      "B3015": "Glutathione Peroxidase",
      "B3041": "G6PD",
      "B7790": "Interleukin-6",
      "I2081": "TNF-alpha",
      "B0270": "Cholic Acid",
      "B8060": "Adiponectin",
      "T0500": "Chromium",
      "T2590": "Omega-3 Fatty Acids",
      "T1720": "Vitamin K1",
      "T0302": "Mercury",
      "T0150": "Lead",
      "T0960": "Arsenic",
      "T0480": "Cadmium",
      "D1111": "Bone Alkaline Phosphatase",
      "I3291": "CTX (C-telopeptide)",
      "T1572": "Ionized Calcium",
      "B0750": "Lactate",
      "B1900": "Direct LDL-C",
      "B0190": "Apolipoprotein B",
      "B7700": "Lp(a)",
      "I5047": "Cystatin C",
      "B2120": "CK-MB",
      "B0220": "Ceruloplasmin",
      "I0141": "ANA",
      "I5072": "Anti-CCP",
      "B6321": "Anti-thyroglobulin",
      "B6300": "Anti-TPO",
      "B7750": "H. pylori IgG",
      "B3130": "Rheumatoid Factor",
      "M1190": "Stool Parasites",
      "P3031": "Food Panel IgG",
      "AB001": "Intestinal Microbiome",
      "AB002": "Metabolome",
      "GP001": "Pharmacogenetics",
      "GD001": "Detox Genes",
      "GN001": "Nutrigenetics",
      "GA001": "Longevity Genes",
      "GS001": "Sports Genes",
      "GU001": "Supplement Genes",
      "H0050": "Fibrinogen",
      "H0850": "APTT",
      "H0860": "INR",
      "D1760": "Beta-hCG",
      "M0010": "Fecal Occult Blood",
      "B7900": "Alpha-fetoprotein",
      "B5830": "Total PSA",
      "B5840": "Free PSA",
      "B5110": "CEA",
      "B5080": "CA 125",
      "B5090": "CA 15.3",
      "B5100": "CA 19.9",
      "B8110": "HE4",
      "B8130": "SCC",
      "I5080": "S-100 Protein",
      "I5090": "NSE",
      "B8120": "CYFRA 21-1",
      "D1271": "CA 72.4",
      "B8160": "ProGRP",
      "OG001": "MyEpiAgeing",
      "D1001": "AMH",
      "B3340": "Spermogram",
      "G1465": "Telomere Length"
    },

    // Biomarker Categories
    biomarkerCategories: {
      "Hematología, Hematopoyesis, Inmunidad": "Hématologie, Hématopoïèse, Immunité",
      "Metabolismo glucídico": "Métabolisme Glucidique",
      "Función hepática, Nutrición": "Fonction Hépatique, Nutrition",
      "Resistencia insulínica": "Résistance Insulinique",
      "Función renal": "Fonction Rénale",
      "Purinas, Riñón": "Purines, Rein",
      "Filtrado glomerular": "Filtration Glomérulaire",
      "Electrolitos": "Électrolytes",
      "Hígado / Hueso": "Foie / Os",
      "Enzimas hepáticas": "Enzymes Hépatiques",
      "Hígado, Hemólisis": "Foie, Hémolyse",
      "Nutrición": "Nutrition",
      "Colestasis": "Cholestase",
      "Perfil lipídico": "Profil Lipidique",
      "Riesgo CV": "Risque CV",
      "Eje HHA": "Axe HHS",
      "Andrógenos suprarrenales": "Androgènes Surrénaliens",
      "Transporte esteroides": "Transport Stéroïdes",
      "Hormona general": "Hormone Générale",
      "Paratiroides": "Parathyroid",
      "Tiroides": "Thyroid",
      "Inflamación cardiovascular": "Inflammation Cardiovasculaire",
      "Metionina / CV": "Méthionine / CV",
      "Mineral óseo": "Minéral Osseux",
      "Mineral neuromuscular": "Minéral Neuromusculaire",
      "Inmunidad": "Immunity",
      "Metabolismo hierro": "Métabolisme Fer",
      "Transporte hierro": "Transport Fer",
      "Hierro": "Fer",
      "Depósito hierro": "Dépôt Fer",
      "Mineral-inmune": "Minéral-Immun",
      "Hematopoyesis": "Hématopoïèse",
      "Hormonas femeninas": "Hormones Féminines",
      "Gonadotropina": "Gonadotrophine",
      "Hormona masculina": "Hormone Masculine",
      "Andrógeno potente": "Androgène Puissant",
      "Hormona femenina": "Hormone Féminine",
      "Suprarrenal": "Surrénalien",
      "Estrógeno menopáusico": "Œstrogène Ménopausique",
      "Fertilidad masculina": "Fertilité Masculine",
      "Reserva ovárica": "Réserve Ovarienne",
      "Edad epigenética": "Âge Épigénétique",
      "Envejecimiento celular": "Vieillissement Cellulaire"
    },

    // Biomarkers Descriptions
    biomarkers: {
      "6897": {
        description: "Complete urine analysis. Detects infections, proteinuria, hematuria, and abnormal cells."
      },
      "H0000": { description: "Complete blood count analysis measuring red blood cells, white blood cells, platelets, and hemoglobin levels. Essential screening test for detecting anemia, infections, blood disorders, and hematological malignancies."
      },
      "H1420": {
        description: "Average blood glucose over the last 2-3 months. Gold standard marker for diabetes diagnosis and monitoring."
      },
      "B0000": {
        description: "Blood sugar level after 8-12 hours of fasting. Primary screening for diabetes and glucose metabolism assessment."
      },
      "B0200": { description: "Albumin - Primary plasma protein synthesized by the liver. Indicates hepatic synthetic function, nutritional status, and protein synthesis capacity. Low levels suggest liver disease or malnutrition."
      },
      "B5600": { description: "Fasting insulin level - Early metabolic marker for insulin resistance assessment. Elevated levels indicate pre-diabetic state before glucose abnormalities manifest."
      },
      "B6510": {
        description: "HOMA-IR index - Homeostatic model assessment for insulin resistance. Combines fasting glucose and insulin levels to quantify insulin sensitivity. Predictor of type 2 diabetes development."
      },
      "B0020": { description: "Urea - Protein metabolism waste product filtered by kidneys. Evaluates renal function, hydration status, and protein catabolism. Elevated levels indicate kidney dysfunction."
      },
      "B0030": { description: "Creatinine - Muscle metabolism waste product. More specific and reliable kidney function marker than urea. Not affected by diet or hydration status."
      },
      "B0250": {
        description: "Total protein - Sum of all plasma proteins including albumin and globulins. Reflects hepatic synthesis capacity, nutritional status, and immune function. Indicates protein balance."
      },
      "B1540": {
        description: "eGFR - Estimated glomerular filtration rate. Measures kidney filtering capacity and detects early chronic kidney disease. Critical for medication dosing adjustments."
      },
      "B1260": {
        description: "Electrolytes panel - Essential ions for cellular function. Sodium, potassium, and chloride regulate hydration, nerve conduction, and muscle contraction."
      },
      "B1970": { description: "Alkaline phosphatase (ALP) - Enzyme found in liver, bone, and bile ducts. Elevated levels indicate hepatic disease, bone disorders, or biliary obstruction."
      },
      "B0050": { description: "ALT (Alanine aminotransferase) - Liver-specific enzyme. Highly sensitive marker of hepatocellular damage and inflammation. Primary indicator of liver injury."
      },
      "B0060": { description: "AST (Aspartate aminotransferase) - Enzyme present in liver, heart, and skeletal muscle. Elevated indicates cellular damage in these tissues. Less liver-specific than ALT."
      },
      "B0080": { description: "Total bilirubin - Product of red blood cell breakdown. Elevated levels indicate liver dysfunction, bile duct obstruction, or excessive hemolysis."
      },
      "B0240": { description: "Sum of all blood proteins. Reflects nutritional status and liver protein synthesis function."
      },
      "B0070": {
        description: "Hepatic enzyme sensitive to alcohol and medications. Marker of cholestasis and chronic liver damage."
      },
      "B0010": {
        description: "Sum of all cholesterol fractions. Basic marker of cardiovascular risk."
      },
      "B0040": {
        description: "Blood fats. Elevated indicates cardiovascular risk and insulin resistance."
      },
      "B0170": {
        description: "Cholesterol-binding protein. Low levels increase cardiovascular risk despite normal cholesterol."
      },
      "B0180": {
        description: "Bad cholesterol. Transports cholesterol to tissues. Elevated increases cardiovascular risk."
      },
      "B3110": {
        description: "Protein of atherogenic particles (LDL, VLDL). Better predictor of cardiovascular risk than LDL-cholesterol."
      },
      "B3100": {
        description: "Apolipoprotein A1 - Main protein component of HDL particles. Facilita transporte reverso de colesterol. Protecteur cardiovasculaire."
      },
      "B5120": {
        description: "Cortisol - Primary stress hormone produced by adrenal glands. Regulates metabolism, immune response, and inflammation. Elevated levels indicate chronic stress or adrenal dysfunction."
      },
      "B5290": {
        description: "DHEA-S (Dehydroepiandrosterone sulfate) - Adrenal hormone precursor. Declines with age. Important for vitality, cognitive function, and longevity assessment."
      },
      "B6020": {
        description: "SHBG (Sex hormone-binding globulin) - Protein that binds and transports sex hormones. Regulates bioavailability of testosterone and estradiol."
      },
      "B6160": {
        description: "Total testosterone - Primary male sex hormone, also important in women. Regulates muscle mass, bone density, libido, energy levels, and mood."
      },
      "B5850": {
        description: "Parathyroid hormone. Regulates calcium and phosphorus. Elevated indicates vitamin D deficiency or bone problems."
      },
      "B6040": {
        description: "Free T3 (Triiodothyronine) - Active thyroid hormone. Regulates metabolism, body temperature, heart rate, and cardiovascular function."
      },
      "B6070": {
        description: "Free T4 (Thyroxine) - Thyroid prohormone. Converted to active T3 in peripheral tissues. Primary thyroid function indicator."
      },
      "B6130": {
        description: "TSH (Thyroid stimulating hormone) - Pituitary hormone that controls thyroid gland. Regulates T3 and T4 production. Primary thyroid screening test."
      },
      "B3170": {
        description: "High-sensitivity C-reactive protein. Marker of systemic inflammation and cardiovascular risk."
      },
      "B5590": {
        description: "Homocysteine - Amino acid from methionine metabolism. Elevated levels indicate cardiovascular risk and deficiency of B6, B12, folate vitamins."
      },
      "B0120": {
        description: "Digestive enzyme from pancreas. Elevated indicates pancreatic dysfunction or acute pancreatitis."
      },
      "B0100": {
        description: "Enzyme specific to liver cells. Very sensitive marker of liver damage and hepatocellular injury."
      },
      "B1600": {
        description: "Magnesium - Essential mineral for muscle, nerve, and cardiovascular function. Cofactor for over 300 enzymatic reactions. Critical for energy metabolism."
      },
      "B8050": {
        description: "Zinc - Essential trace element for immunity, wound healing, cognitive function, and protein synthesis. Important for growth and development."
      },
      "B0130": {
        description: "Enzyme that breaks down fats. Elevated indicates pancreatic insufficiency or maldigestion."
      },
      "B3210": {
        description: "Iron transport protein. Reflects transport capacity and iron nutritional status."
      },
      "B7260": {
        description: "Transferrin saturation percentage. Indicates iron availability for tissues."
      },
      "B5370": {
        description: "Iron storage protein. Reflects body iron reserves and may indicate inflammation."
      },
      "B6180": {
        description: "Stress hormone metabolite. Reflects adrenal function and stress response."
      },
      "B6190": {
        description: "Female hormone metabolite. Indicates estrogen metabolism and hormonal balance."
      },
      "B5410": {
        description: "Growth hormone. Essential for growth, muscle mass and metabolism."
      },
      "B5350": {
        description: "Main female sex hormone. Regulates menstrual cycle, bone health and cardiovascular protection."
      },
      "B5980": {
        description: "Lactation hormone. Elevated can suppress reproductive function."
      },
      "B5800": {
        description: "Stimulates ovulation in women and testosterone production in men."
      },
      "B5380": {
        description: "Luteinizing hormone. Controls ovarian and testicular function."
      },
      "D0601": {
        description: "Active fraction of testosterone not bound to proteins. More specific than total testosterone."
      },
      "B6480": {
        description: "Bioavailable testosterone. Weakly bound free fraction. Better indicator of androgenic activity."
      },
      "D0850": {
        description: "Dihydrotestosterone. Most potent androgen. Responsible for masculine characteristics and alopecia."
      },
      "B5932": {
        description: "Pregnancy and menstrual cycle hormone. Important for fertility and hormonal balance."
      },
      "D0181": {
        description: "Cortisol and androgen precursor. Elevated indicates congenital adrenal hyperplasia."
      },
      "D0780": {
        description: "Predominant estrogen in menopause. Produced mainly in adipose tissue."
      },
      "B0260": { description: "Conjugated bilirubin. Specific marker of liver function and biliary obstruction."
      },
      "B1980": {
        description: "Enzyme pancréatique qui digère les graisses. Marqueur spécifique de fonction pancréatique exocrine."
      },
      "B0350": {
        description: "Enzyme that digère les glucides. Produite par pancréas et glandes salivaires."
      },
      "B0110": {
        description: "Enzyme present in pancreas and salivary glands. Elevated indicates pancreatic inflammation or damage."
      },
      "B6030": {
        description: "Insulin-like growth factor. Growth hormone mediator. Important for longevity and muscle mass."
      },
      "B6010": {
        description: "IGF-1 binding protein. Modulates IGF-1 activity and has independent effects on longevity."
      },
      "I6740": {
        description: "Adrenocorticotropic hormone. Stimulates cortisol production. Evaluates hypothalamic-pituitary-adrenal axis function."
      },
      "H0020": {
        description: "Erythrocyte sedimentation rate. Non-specific marker of systemic inflammation."
      },
      "D0560": {
        description: "Active form of vitamin D. Hormone that regulates calcium absorption and bone metabolism."
      },
      "T0811": {
        description: "Active vitamin A. Fat-soluble antioxidant essential for vision, immunity and cellular differentiation."
      },
      "T2841": {
        description: "Gamma form of vitamin E. Specific antioxidant against nitrogen radicals and peroxynitrite."
      },
      "T1191": {
        description: "Alpha form of vitamin E. Principal fat-soluble antioxidant that protects cell membranes."
      },
      "T1200": {
        description: "Main precursor of vitamin A. Carotenoid antioxidant that protects against oxidative damage."
      },
      "T2830": {
        description: "Essential mitochondrial antioxidant. Crucial for energy production and cellular protection."
      },
      "T3920": {
        description: "Essential antioxidant trace element. Glutathione peroxidase cofactor. Protects against oxidative stress."
      },
      "T1061": {
        description: "Essential antioxidant vitamin. Neutralizes free radicals and regenerates other antioxidants like vitamin E."
      },
      "B7121": {
        description: "Enzyme that regenerates reduced glutathione. Indicator of vitamin B2 status and antioxidant capacity."
      },
      "B3015": {
        description: "Selenium-dependent antioxidant enzyme. Protects cells from oxidative damage by peroxides."
      },
      "B3041": {
        description: "Glucose-6-phosphate dehydrogenase. Key enzyme in cellular antioxidant defense via NADPH."
      },
      "B7790": {
        description: "Interleukin-6. Key pro-inflammatory cytokine. Elevated in chronic inflammation and aging."
      },
      "I2081": {
        description: "Tumor necrosis factor alpha. Potent pro-inflammatory cytokine. Involved in aging and chronic diseases."
      },
      "B0270": {
        description: "Primary bile acid. Reflects liver function and bile acid synthesis capacity."
      },
      "B8060": {
        description: "Anti-inflammatory marker. Indicates inflammatory resolution capacity."
      },
      "T0500": {
        description: "Trace element that improves insulin sensitivity and glucose metabolism. Important in diabetes."
      },
      "T2590": {
        description: "Omega-3 fatty acid profile. Evaluates nutritional status and inflammatory balance."
      },
      "T1720": {
        description: "Fat-soluble vitamin essential for coagulation. Cofactor of coagulation factors."
      },
      "T0302": {
        description: "Blood mercury. Toxic metal affecting nervous system. Sources: fish, dental amalgams."
      },
      "T0150": {
        description: "Blood lead. Toxic metal affecting neurological development and cognitive function."
      },
      "T0960": {
        description: "Total blood arsenic. Toxic metalloid associated with cancer and cardiovascular diseases."
      },
      "T0480": {
        description: "Blood cadmium. Toxic metal affecting kidneys, bones and cardiovascular system."
      },
      "D1111": {
        description: "Bone-specific alkaline phosphatase. Marker of bone formation and osteoblastic activity."
      },
      "I3291": {
        description: "C-telopeptide. Marker of bone resorption. Evaluates osteoclastic activity and bone loss."
      },
      "T1572": {
        description: "Active fraction of serum calcium. Biologically available form for cellular functions."
      },
      "B0750": {
        description: "Product of anaerobic metabolism. Elevated indicates tissue hypoxia or mitochondrial dysfunction."
      },
      "B1900": {
        description: "Directly measured LDL cholesterol. More accurate than calculated in cases of elevated triglycerides."
      },
      "B0190": {
        description: "Cholesterol transport protein. Reflects genetic cardiovascular risk factors."
      },
      "B7700": {
        description: "Genetically determined atherogenic lipoprotein. Independent cardiovascular risk factor."
      },
      "I5047": {
        description: "Kidney function marker more accurate than creatinine. Not affected by muscle mass."
      },
      "B2120": {
        description: "Myocardial-specific creatine kinase. Marker of cardiac damage and infarction."
      },
      "B0220": {
        description: "Iron transport protein. Reflects iron stores and liver synthesis capacity."
      },
      "I0141": {
        description: "Antinuclear antibodies. Screening for systemic autoimmune diseases like lupus."
      },
      "I5072": {
        description: "Anti-cyclic citrullinated peptide antibodies. Specific for rheumatoid arthritis."
      },
      "B6321": {
        description: "Anti-thyroglobulin antibodies. Marker of thyroid autoimmunity."
      },
      "B6300": {
        description: "Anti-thyroid peroxidase antibodies. Marker of autoimmune thyroiditis (Hashimoto)."
      },
      "B7750": {
        description: "Antibodies against H. pylori. Detects gastric infection associated with ulcers and gastric cancer."
      },
      "B3130": {
        description: "Autoanticuerpo present in rheumatoid arthritis and other autoimmune diseases."
      },
      "M1190": {
        description: "Parasitological stool examination. Detects intestinal parasites that affect digestive health."
      },
      "P3031": {
        description: "Panel of 200 foods to detect IgG-mediated food intolerances."
      },
      "AB001": {
        description: "Complete analysis of intestinal microbial diversity. Evaluates balance of beneficial and pathogenic bacteria."
      },
      "AB002": {
        description: "Metabolite profile in urine and stool. Evaluates metabolic pathways and microbiome functionality."
      },
      "GP001": {
        description: "General pharmacogenomics. Analyzes genetic variants that affect drug response to personalize treatments and avoid adverse effects."
      },
      "GD001": {
        description: "Genetic detoxification analysis. Evaluates genetic capacity to eliminate toxins and metabolize xenobiotics."
      },
      "GN001": {
        description: "Nutritional genetic analysis. Identifies variants that affect macronutrient and micronutrient metabolism."
      },
      "GA001": {
        description: "Aging genetic analysis. Evaluates genetic predisposition to aging and longevity."
      },
      "GS001": {
        description: "Sports genetic analysis. Optimizes training and performance based on genetic profile."
      },
      "GU001": {
        description: "Genetic supplementation analysis. Personalizes supplements based on individual genetic needs."
      },
      "H0050": {
        description: "Coagulation protein and inflammatory marker. Elevated indicates thrombotic risk and inflammation."
      },
      "H0850": {
        description: "Activated partial thromboplastin time. Evaluates intrinsic coagulation pathway."
      },
      "H0860": {
        description: "International normalized ratio. Measures prothrombin time. Monitors anticoagulation."
      },
      "D1760": {
        description: "Beta human chorionic gonadotropin. Marker of pregnancy and certain testicular and ovarian tumors."
      },
      "M0010": {
        description: "Detection of microscopic blood in stool. Screening for colorectal cancer and polyps."
      },
      "B7900": {
        description: "Alpha-fetoprotein. Marker of liver cancer and germ cell tumors."
      },
      "B5830": {
        description: "Total prostate-specific antigen. Screening for prostate cancer and benign hyperplasia."
      },
      "B5840": {
        description: "Free PSA fraction. Improves specificity to distinguish cancer from benign hyperplasia."
      },
      "B5110": {
        description: "Carcinoembryonic antigen. Marker of digestive cancers, especially colorectal."
      },
      "B5080": {
        description: "Ovarian cancer tumor marker. Also elevated in endometriosis and other conditions."
      },
      "B5090": {
        description: "Breast cancer tumor marker. Useful for treatment monitoring and recurrence."
      },
      "B5100": {
        description: "Pancreatic and biliary cancer tumor marker. Also elevated in pancreatitis."
      },
      "B8110": {
        description: "Ovarian cancer tumor marker more specific than CA125."
      },
      "B8130": {
        description: "Squamous cell antigen. Marker of squamous cell carcinomas of cervix, lung and esophagus."
      },
      "I5080": {
        description: "S-100 protein. Marker of melanoma and nervous system tumors."
      },
      "I5090": {
        description: "Neuron-specific enolase. Marker of neuroendocrine tumors and small cell lung cancer."
      },
      "B8120": {
        description: "Cytokeratin 21-1 fragment. Marker of non-small cell lung cancer."
      },
      "D1271": {
        description: "Gastric cancer tumor marker and other adenocarcinomas."
      },
      "B8160": {
        description: "Pro-gastrin releasing peptide. Specific marker of small cell lung cancer."
      },
      "OG001": {
        description: "Epigenetic biological age test. Measures DNA methylation to determine real biological age."
      },
      "D1001": {
        description: "Anti-Müllerian hormone. Marker of ovarian reserve and female fertility."
      },
      "B3340": {
        description: "Complete sperm analysis used to measure male biological age. Evaluates sperm concentration, motility and morphology as reproductive aging markers."
      },
      "G1465": {
        description: "Telomere length measurement. Direct biomarker of cellular aging and longevity predictor."
      }
    }
  },

  fr: {
    // Navbar
    navbar: {
      clinicalAnalysis: "Analyses Cliniques",
      addons: "Modules",
      process: "Processus",
      contact: "Contact",
      language: "Langue"
    },
    // Hero Section
    hero: {
      tagline: "Precision Data for Optimization.",
      title: "Pas de données, pas d'action - obtenez les vôtres !",
      description: "Mesurez plus de 130 biomarqueurs et 7 analyses spécialisées, transformant la science des données en un plan complet de prévention, longévité et optimisation.",
      exploreButton: "Explorer les Analyses",
      beyondDiagnosis: "Au-delà du diagnostic :",
      actionableRecommendations: "Recommandations actionables",
      supplementation: "Supplémentation",
      supplementationDesc: "Nous identifions les déficits potentiels et formulons des protocoles avec des nutraceutiques haute biodisponibilité. Nous ajustons les doses après chaque révision analytique pour vous maintenir dans la plage optimale.",
      nutrition: "Nutrition",
      nutritionDesc: "Nous vous montrons les nutriments dont vous avez besoin et comment structurer votre alimentation, vous fournissant les informations et outils pour concevoir votre propre plan.",
      lifestyle: "Mode de Vie",
      lifestyleDesc: "Recommandations sur l'exercice, le sommeil, la gestion du stress et les habitudes basées sur vos biomarqueurs spécifiques pour optimiser votre longévité.",
      monitoring: "Surveillance",
      monitoringDesc: "Suivi périodique de vos biomarqueurs pour ajuster les interventions et s'assurer que vous restez dans les plages de santé optimales."
    },
    // Medical Systems Explorer
    systems: {
      title: "Longevity Analytics",
      titleHighlight: "Analyse",
      description: "Nous offrons trois paquets d'analyse personnalisés pour mieux nous adapter aux besoins spécifiques de chaque individu : Essentiel pour l'analyse fondamentale, Core pour une évaluation intermédiaire spécialisée, et Avancé pour l'évaluation la plus complète et exhaustive de votre santé et longévité.",
      essentialDescription: "L'Analyse Essentielle examine les biomarqueurs fondamentaux pour dresser une image précise de votre état de santé actuel et inclut le calcul de PhenoAge (âge biologique) basé sur 9 biomarqueurs scientifiquement validés. Avec ces données, nous pouvons anticiper les risques silencieux, établir des priorités thérapeutiques et définir s'il convient d'ajouter des modules supplémentaires (add-ons). Transformant la science analytique en décisions personnalisées et un plan d'action clair.",
      performanceDescription: "Paquet spécialisé pour la performance sportive et l'optimisation physique, incluant des biomarqueurs spécifiques pour l'énergie, la récupération et la fonction musculaire. Conçu pour les athlètes et personnes actives cherchant à maximiser leur potentiel physique.",
      coreDescription: "Paquet complet de biomarqueurs fondamentaux pour une analyse intégrale de longévité. Inclut l'évaluation avancée des systèmes métaboliques, hormonaux, inflammatoires et de stress oxydatif pour l'optimisation complète de la santé.",
      advancedDescription: "Paquet le plus complet avec analyses avancées de métaux lourds, microbiome et biomarqueurs spécialisés. L'évaluation la plus exhaustive disponible pour ceux qui cherchent un contrôle total de leur santé et longévité.",
      
      // Target Audiences
      essentialTargetAudience: "Idéal pour les clients qui commencent leur voyage de longévité",
      performanceTargetAudience: "Idéal pour les athlètes et personnes actives cherchant à optimiser leur performance physique",
      coreTargetAudience: "Pour les clients cherchant une analyse complète et détaillée",
      advancedTargetAudience: "Pour les clients cherchant l'analyse la plus complète disponible",
      
      // Tres perfiles de análisis
      analysisProfiles: {
        essential: {
          title: "Essentiel",
          highlight: "46 Biomarqueurs",
          description: "Parfait pour ceux qui cherchent une vue d'ensemble et les conseils de base pour la prévention de la santé. Idéal pour commencer votre voyage vers une meilleure santé."
        },
        performance: {
          title: "Performance",
          highlight: "60+ Biomarqueurs",
          description: "Spécialisé dans la performance sportive et l'optimisation physique. Inclut des biomarqueurs spécifiques pour l'énergie, la récupération et la fonction musculaire.",
          features: [
            "Tout inclus dans Essentiel",
            "Biomarqueurs de performance sportive",
            "Marqueurs de récupération musculaire",
            "Profil énergétique et métabolique",
            "Hormones spécifiques aux athlètes",
            "Évaluation du stress physique",
            "Marqueurs d'hydratation",
            "Biomarqueurs de fatigue"
          ]
        },
        core: {
          title: "Core",
          highlight: "90+ Biomarqueurs",
          description: "Conçu pour l'optimisation et le contrôle de la longévité, destiné à ceux qui vont un pas plus loin pour comprendre profondément leur corps.",
          features: [
            "Tout inclus dans Essentiel",
            "Profil cardiovasculaire avancé",
            "Hormones complètes (homme/femme)",
            "Marqueurs inflammatoires spécifiques",
            "Stress oxydatif et antioxydants",
            "Évaluation nutritionnelle détaillée",
            "Marqueurs tumoraux de base",
            "Biomarqueurs de vieillissement"
          ]
        },
        advanced: {
          title: "Avancé",
          highlight: "120 Biomarqueurs", 
          description: "Pour les personnes qui ne laissent rien au hasard et veulent tout avoir sous contrôle. L'évaluation la plus complète et exhaustive disponible.",
          features: [
            "Tout inclus dans Core",
            "Panel complet de métaux lourds",
            "Analyse de microbiome intestinal",
            "Marqueurs tumoraux élargis",
            "Évaluation de longévité avancée",
            "Profil de coagulation complet",
            "Biomarqueurs de fertilité",
            "Évaluation complète du stress oxydatif"
          ]
        }
      },
      essentialPackage: "Analyse Essentielle",
      male: "Homme",
      female: "Femme",
      biomarkers: "biomarqueurs",
      selected: "Sélectionné",
      addToAnalysis: "Ajouter à l'analyse",
      removeFromAnalysis: "Retirer de l'analyse",
      viewBiomarkers: "Voir les Biomarqueurs",
      hideBiomarkers: "Masquer les Biomarqueurs",
      viewAddOns: "Voir les Modules",
      hideAddOns: "Masquer les Modules",
      marketPrice: "Prix du Marché",
      ourPrice: "Notre Prix",
      youSave: "Vous Économisez",
      complementEssential: "Complétez votre Essentiel",
      withSpecializedModules: "avec ces modules spécialisés. Chaque module s'ajoute aux 46 biomarqueurs de base pour une évaluation plus approfondie.",
      biomarkersIncludedEssential: "Biomarqueurs Inclus dans l'Essentiel",
      tests: "tests",
      geneticPricesDisclaimer: "Les prix des tests génétiques peuvent être sujets à modifications.",
      addOnsSpecialized: "Modules Spécialisés",
      biomarkersOf: "Biomarqueurs de",
      pvp: "PVP",
      ctaTitle: "Prêt à optimiser votre <span className=\"text-cream\">organisme</span> ?",
      ctaDescription: "Commencez avec l'<span className=\"font-bold text-cream\">Essentiel</span> et ajoutez les <span className=\"font-bold text-cream\">modules</span> dont vous avez besoin. Obtenez des recommandations personnalisées pour la supplémentation, la nutrition et le mode de vie."
    },

    // Add-Ons Names and Descriptions
    addOns: {
      hormonas: {
        name: "Hormones",
        description: "Optimise les niveaux hormonaux spécifiques par genre (testostérone, estradiol, progestérone) pour améliorer l'énergie, la libido et le bien-être général. Identifie les déséquilibres qui affectent la vitalité et le vieillissement."
      },
      endocrino: {
        name: "Endocrinien", 
        description: "Évalue l'axe hormonal complet (IGF-1, ACTH, fonction pancréatique, hormones reproductives) pour optimiser le métabolisme, la croissance cellulaire et la fonction endocrinienne. Identifie les dysfonctions métaboliques et guide les stratégies de longévité."
      },
      antioxidantes: {
        name: "Antioxydants",
        description: "Mesure les vitamines antioxydantes (A, E), la coenzyme Q10 et les caroténoïdes pour évaluer votre capacité de défense contre le vieillissement. Personnalise la supplémentation antioxydante et réduit le stress oxydatif."
      },
      oxidative_cell: {
        name: "Stress Oxydatif",
        description: "Analyse le sélénium, la vitamine C et les marqueurs spécifiques du système glutathion pour évaluer le vieillissement au niveau moléculaire. Optimise la protection cellulaire et prévient les dommages oxydatifs cumulatifs."
      },
      inflammation: {
        name: "Inflammation",
        description: "Mesure les marqueurs d'inflammation systémique (VS, IL-6, TNF-α) pour détecter l'inflammation chronique silencieuse. Guide les stratégies anti-inflammatoires et réduit le risque de maladies chroniques."
      },
      iv_nutrients: {
        name: "IV & Nutriments",
        description: "Évalue les vitamines du complexe B, les minéraux essentiels et les nutriments pour optimiser la fonction cellulaire et neurologique. Personnalise les protocoles nutritionnels et la supplémentation IV spécifique."
      },
      metals: {
        name: "Métaux Lourds",
        description: "Détecte l'accumulation de métaux toxiques (plomb, mercure, cadmium) qui accélèrent le vieillissement. Guide les protocoles de chélation et de détoxification spécifiques pour optimiser la santé cellulaire."
      },
      bone_mineral: {
        name: "Os & Minéraux",
        description: "Analyse le métabolisme osseux et minéral (calcium, phosphore, magnésium, vitamine D) pour prévenir l'ostéoporose et optimiser la santé squelettique. Personnalise les stratégies de renforcement osseux."
      },
      cardiovascular: {
        name: "Cardiovasculaire",
        description: "Évalue la santé cardiovasculaire avec des biomarqueurs avancés (Lp(a), acides gras, vitamine K1) pour prévenir les événements cardiovasculaires et optimiser la fonction cardiaque à long terme."
      },
      immunity: {
        name: "Immunité",
        description: "Analyse le système immunitaire avec un profil complet d'immunoglobulines et des marqueurs spécifiques pour optimiser la réponse immunitaire et prévenir l'immunosénescence liée au vieillissement."
      },
      digest: {
        name: "Digestif",
        description: "Évalue la santé intestinale avec une analyse complète des selles, parasites et marqueurs digestifs. Optimise le microbiome et la fonction intestinale pour améliorer l'absorption des nutriments et la santé générale."
      },
      gut_gate: {
        name: "Gut Gate",
        description: "Analyse la perméabilité intestinale et la santé de la barrière intestinale avec des marqueurs spécifiques. Détecte le syndrome de l'intestin perméable et optimise l'intégrité de la muqueuse intestinale."
      },
      genome: {
        name: "Génome",
        description: "Tests génétiques personnalisés optionnels (pharmacogénétique, détoxification, nutrition, vieillissement, sport) pour une médecine de précision basée sur votre profil génétique unique."
      },
      coagulation: {
        name: "Coagulation",
        description: "Analyse le système de coagulation (fibrinogène, APTT, INR) pour évaluer le risque thrombotique et la fonction hémostatique. Optimise l'anticoagulation et prévient les événements cardiovasculaires."
      },
      cancer: {
        name: "Marqueurs Tumoraux",
        description: "Dépistage oncologique élargi avec des marqueurs tumoraux spécifiques : inclut PSA, CA125, CEA, AFP, HE4, SCC, protéine S-100, NSE et autres marqueurs avancés pour une détection précoce complète."
      },
      bioage: {
        name: "Âge Biologique",
        description: "Évalue l'âge biologique par test épigénétique MyEpiAgeing et fertilité avec AMH/spermogramme pour déterminer votre âge reproductif et biologique réel. Guide les stratégies anti-âge précises."
      }
    },

    // Add-On Benefits/Characteristics
    addOnBenefits: {
      hormonas: [
        'Optimise l\'équilibre hormonal',
        'Améliore l\'énergie et la vitalité',
        'Support pour thérapies hormonales',
        'Surveillance de l\'âge reproductif'
      ],
      endocrino: [
        'Fonction thyroïdienne avancée',
        'Axe hypothalamo-hypophysaire',
        'Métabolisme énergétique',
        'Régulation hormonale'
      ],
      antioxidantes: [
        'Évalue la capacité antioxydante',
        'Identifie les carences vitaminiques',
        'Optimise la supplémentation',
        'Réduit le stress oxydatif'
      ],
      oxidative_cell: [
        'Évaluation des dommages cellulaires',
        'Capacité antioxydante spécifique',
        'Optimisation cellulaire',
        'Prévention du vieillissement'
      ],
      inflammation: [
        'Détection d\'inflammation chronique',
        'Marqueurs systémiques',
        'Risque cardiovasculaire',
        'Optimisation anti-inflammatoire'
      ],
      iv_nutrients: [
        'Optimise les thérapies IV',
        'Détecte les carences nutritionnelles',
        'Personnalise la supplémentation',
        'Améliore l\'absorption des nutriments'
      ],
      metals: [
        'Détoxification ciblée',
        'Prévention de la toxicité',
        'Santé neurologique',
        'Fonction cognitive'
      ],
      bone_mineral: [
        'Prévention de l\'ostéoporose',
        'Optimisation du calcium',
        'Santé osseuse à long terme',
        'Métabolisme minéral'
      ],
      cardiovascular: [
        'Prévention cardiovasculaire avancée',
        'Optimisation lipidique',
        'Réduction du risque cardiaque',
        'Surveillance des enzymes cardiaques'
      ],
      immunity: [
        'Détection d\'auto-immunité',
        'Fonction immunitaire',
        'Santé thyroïdienne',
        'Inflammation systémique'
      ],
      digest: [
        'Fonction hépatique',
        'Fonction pancréatique',
        'Perméabilité intestinale',
        'Détection de parasites',
        'Intolérances alimentaires'
      ],
      gut_gate: [
        'Analyse du microbiome',
        'Métabolites fonctionnels',
        'Axe intestin-cerveau',
        'Perméabilité intestinale'
      ],
      genome: [
        'Génome complet',
        'Risque génétique',
        'Pharmacogénétique',
        'Médecine personnalisée'
      ],
      coagulation: [
        'Risque de thrombose',
        'Fonction plaquettaire',
        'Hémostase',
        'Anticoagulation'
      ],
      cancer: [
        'Détection précoce élargie',
        'Marqueurs spécialisés',
        'Dépistage intégral',
        'Surveillance oncologique'
      ],
      bioage: [
        'Âge biologique épigénétique',
        'Fertilité et reproduction',
        'Anti-âge personnalisé',
        'Évaluation de la longévité'
      ]
    },

    // Package Comparison
    packages: {
      title: "Configurez votre",
      titleHighlight: "Analyse Personnalisée",
      description: "Combinez le package Essentiel avec des modules spécialisés pour créer votre analyse parfaite",
      essential: "Essentiel",
      addons: "Modules",
      total: "Total",
      marketPrice: "Prix du Marché",
      finalPrice: "Prix Final",
      savings: "Économies",
      orderNow: "Commander Maintenant",
      biomarkersCount: "biomarqueurs",
      selectGender: "Sélectionnez votre genre :",
      availableAddons: "Modules Disponibles :",
      selectedAddons: "Modules Sélectionnés :",
      none: "Aucun"
    },
    // Process Flow
    process: {
      title: "Processus",
      subtitle: "Intégral",
      description: "Découvrez votre âge biologique réel et ajoutez des années de vie saine en seulement 5 étapes : analyse scientifique de biomarqueurs + plan de longévité personnalisé + interprétation des résultats et plan d'action. Votre futur plus sain commence aujourd'hui.",
      step1: {
        title: "Configurez",
        description: "Sélectionnez votre package Essentiel personnalisé et ajoutez les modules spécialisés qui s'adaptent le mieux à vos objectifs de santé et longévité",
        duration: "5 min"
      },
      step2: {
        title: "Prélèvement",
        description: "Rendez-vous à l'un de nos plus de 50 points de prélèvement répartis dans toute l'Espagne. Processus rapide et confortable avec des professionnels spécialisés",
        duration: "20 min"
      },
      step3: {
        title: "Analyse",
        description: "Vos échantillons sont traités dans des laboratoires certifiés ISO 15189 avec une technologie de pointe et les plus hauts standards de qualité internationale",
        duration: "5-7 jours *"
      },
      step4: {
        title: "Résultats",
        description: "Recevez votre rapport complet avec une analyse détaillée des biomarqueurs, le calcul de l'âge biologique et des recommandations spécifiques personnalisées",
        duration: "1 jour"
      },
      step5: {
        title: "Consultation",
        description: "Session personnalisée avec notre Health Coach pour interpréter les résultats et concevoir votre plan d'action spécifique de longévité",
        duration: "45 min"
      },
      timeNote: "* Les temps peuvent varier selon les modules sélectionnés",
      guarantees: "Nos Garanties",
      certifiedQuality: "Qualité Certifiée",
      certifiedQualityDesc: "Laboratoires ISO 15189 et processus validés internationalement",
      extractionNetwork: "Réseau de Prélèvement",
      extractionNetworkDesc: "Plus de 50 points de prélèvement pour un maximum de confort et d'accessibilité",
      healthCoach: "Health Coach",
      healthCoachDesc: "Consultation personnalisée pour interpréter les résultats et concevoir votre plan spécifique.",
      gdprCompliance: "Conformité RGPD",
      gdprComplianceDesc: "Protection totale des données personnelles selon la réglementation européenne RGPD"
    },
    // Call to Action
    cta: {
      title: "Prêt à transformer votre santé ?",
      description: "Rejoignez des milliers de personnes qui ont déjà découvert leur potentiel de longévité",
      contactButton: "Contacter Maintenant",
      emailSubject: "Demande concernant Longevity Analytics"
    },
    // Footer
    footer: {
      services: "Services",
      essentialAnalysis: "Analyse Essentielle",
      specializedAddons: "Modules Spécialisés",
      personalizedRecommendations: "Recommandations Personnalisées",
      contact: "Contact",
      email: "Email",
      phone: "Téléphone",
      rightsCopyright: "Tous droits réservés.",
      poweredBy: "Développé avec React"
    },
    // Gender Selector
    gender: {
      male: "Homme",
      female: "Femme"
    },
    // Package Comparison Component
    packageComparison: {
      title: "Configurez votre",
      titleHighlight: "Analyse Personnalisée",
      description: "Commencez avec l'Essentiel et ajoutez les modules dont vous avez besoin. Prix et biomarqueurs se mettent à jour automatiquement.",
      essential: "Essentiel",
      addons: "Modules",
      totalBiomarkers: "biomarqueurs totaux",
      marketPrice: "Prix du Marché",
      finalPrice: "Prix Final",
      savings: "Économies",
      orderNow: "Commander Maintenant",
      selectGender: "Sélectionnez votre genre :",
      male: "Masculin",
      female: "Féminin",
      features: "Caractéristiques :",
      glucidMetabolism: "Métabolisme glucidique complet",
      renalHepaticFunction: "Fonction rénale et hépatique",
      advancedLipidProfile: "Profil lipidique avancé",
      basicHormones: "Hormones de base",
      completeThyroid: "Thyroïde complète",
      essentialMinerals: "Minéraux essentiels",
      inflammatoryMarkers: "Marqueurs inflammatoires",
      biologicalAgeCalculation: "Calcul de l'âge biologique",
      selectedAddOns: "Modules sélectionnés :",
      totalPrice: "Prix Total",
      includes: "Inclut :",
      selectSpecializedModules: "Sélectionnez les modules spécialisés dont vous avez besoin. Chaque module s'ajoute à l'Essentiel pour une évaluation plus approfondie.",
      additionalBiomarkers: "Biomarqueurs supplémentaires sélectionnés :",
      basePriceEssential: "Prix de base Essentiel",
      essentialPlusAddOns: "Essentiel + {count} Module{plural}",
      allPackagesInclude: "Tous les Forfaits Incluent"
    },
    // Add-On Explorer Component
    addOnExplorer: {
      title: "Les",
      titleHighlight: "Modules",
      titleSuffix: "de l'Essentiel",
      description: "Élargissez votre analyse Essentielle avec des modules spécialisés. Chaque module apporte des insights uniques pour optimiser des aspects spécifiques de votre longévité, suivant le modèle Function Health.",
      newFunctionality: "Nouvelle Fonctionnalité : Sélection Personnalisée",
      completeAddOn: "Module Complet :",
      completeAddOnDesc: "Cliquez sur la carte du module pour sélectionner tous les biomarqueurs",
      individualBiomarkers: "Biomarqueurs Individuels :",
      individualBiomarkersDesc: "Cliquez sur le bouton + pour développer et sélectionner seulement ce dont vous avez besoin",
      pricesFor: "Prix pour :",
      masculine: "Masculin",
      feminine: "Féminin",
      filterByCategory: "Filtrer par catégorie",
      allAddOns: "Tous les Modules",
      longevityHealthspan: "Longévité / Healthspan",
      prevention: "Prévention",
      optimization: "Optimisation",
      selected: "Sélectionné",
      biomarkers: "biomarqueurs",
      pvp: "PVP",
      expandBiomarkers: "Développer biomarqueurs",
      collapseBiomarkers: "Réduire biomarqueurs",
      selectAll: "Tout sélectionner",
      deselectAll: "Tout désélectionner",
      selectBiomarker: "Sélectionner biomarqueur",
      deselectBiomarker: "Désélectionner biomarqueur",
      summary: "Résumé de sélection :",
      totalSelected: "Total sélectionné :",
      proceedToOrder: "Procéder à la commande"
    },

    // Biomarker Names
    biomarkerNames: {
      "H0000": "Numération Formule Sanguine",
      "H1420": "Hémoglobine A1c",
      "B0000": "Glucose à Jeun",
      "B0200": "Albumine",
      "B5600": "Insuline à Jeun",
      "B6510": "HOMA-IR",
      "B0020": "BUN (Urée)",
      "B0030": "Créatinine",
      "B0250": "Acide Urique",
      "B1540": "DFG estimé",
      "B1260": "Électrolytes (Na⁺, K⁺, Cl⁻)",
      "B1970": "Phosphatase Alcaline (PAL)",
      "B0050": "ALAT",
      "B0060": "ASAT",
      "B0080": "Bilirubine Totale",
      "B0240": "Protéines Totales",
      "B0070": "GGT",
      "B0010": "Cholestérol Total",
      "B0040": "Triglycérides",
      "B0170": "HDL-C",
      "B0180": "LDL-C",
      "B3110": "ApoB",
      "B3100": "ApoA-I",
      "B5120": "Cortisol",
      "B5290": "DHEA-S",
      "B6020": "SHBG",
      "B6160": "Testostérone Totale",
      "B5850": "PTH Intacte",
      "B6040": "T3 Libre",
      "B6070": "T4 Libre",
      "B6130": "TSH",
      "B3170": "CRP-us",
      "B5590": "Homocystéine",
      "B0120": "Phosphore",
      "B0100": "Calcium Total",
      "B1600": "Magnésium",
      "B8050": "Zinc",
      "B0130": "Fer",
      "B3210": "Transferrine",
      "B7260": "Saturation Transferrine",
      "B5370": "Ferritine",
      "B6180": "Vitamine D (25-OH)",
      "B6190": "Vitamine B12",
      "B5410": "Folates",
      "B5350": "Estradiol",
      "B5980": "Prolactine",
      "B5800": "LH",
      "B5380": "FSH",
      "D0601": "Testostérone Libre",
      "B6480": "Testostérone Biodisponible",
      "D0850": "DHT",
      "B5932": "Progestérone",
      "D0181": "17-OH-Progestérone",
      "D0780": "Estrone",
      "B0260": "Bilirubine Directe",
      "B1980": "Lipase",
      "B0350": "Amylase",
      "B0110": "LDH",
      "B6030": "IGF-1",
      "B6010": "IGFBP-3",
      "I6740": "ACTH",
      "H0020": "VS",
      "D0560": "Vitamine D (1,25-dihydroxy)",
      "T0811": "Rétinol (Vitamine A)",
      "T2841": "Gamma-tocophérol (Vit E)",
      "T1191": "Alpha-tocophérol (Vit E)",
      "T1200": "Bêta-carotène",
      "T2830": "Coenzyme Q10",
      "T3920": "Sélénium",
      "T1061": "Vitamine C",
      "B7121": "Glutathion Réductase",
      "B3015": "Glutathion Peroxydase",
      "B3041": "G6PD",
      "B7790": "Interleukine-6",
      "I2081": "TNF-alpha",
      "B0270": "Acide Cholique",
      "B8060": "Adiponectine",
      "T0500": "Chrome",
      "T2590": "Acides Gras Omega-3",
      "T1720": "Vitamine K1",
      "T0302": "Mercure",
      "T0150": "Plomb",
      "T0960": "Arsenic",
      "T0480": "Cadmium",
      "D1111": "Phosphatase Alcaline Osseuse",
      "I3291": "CTX (C-télopeptide)",
      "T1572": "Calcium Ionisé",
      "B0750": "Lactate",
      "B1900": "LDL-C Direct",
      "B0190": "Apolipoprotéine B",
      "B7700": "Lp(a)",
      "I5047": "Cystatine C",
      "B2120": "CK-MB",
      "B0220": "Céruloplasmine",
      "I0141": "AAN",
      "I5072": "Anti-CCP",
      "B6321": "Anti-thyroglobuline",
      "B6300": "Anti-TPO",
      "B7750": "H. pylori IgG",
      "B3130": "Facteur Rhumatoïde",
      "M1190": "Parasites dans Selles",
      "P3031": "Panel Alimentaire IgG",
      "AB001": "Microbiome Intestinal",
      "AB002": "Métabolome",
      "GP001": "Pharmacogénétique",
      "GD001": "Gènes Détox",
      "GN001": "Nutrigénétique",
      "GA001": "Gènes Longévité",
      "GS001": "Gènes Sport",
      "GU001": "Gènes Suppléments",
      "H0050": "Fibrinogène",
      "H0850": "APTT",
      "H0860": "INR",
      "D1760": "Bêta-hCG",
      "M0010": "Sang Occulte Selles",
      "B7900": "Alpha-fœtoprotéine",
      "B5830": "PSA Total",
      "B5840": "PSA Libre",
      "B5110": "ACE",
      "B5080": "CA 125",
      "B5090": "CA 15.3",
      "B5100": "CA 19.9",
      "B8110": "HE4",
      "B8130": "SCC",
      "I5080": "Protéine S-100",
      "I5090": "NSE",
      "B8120": "CYFRA 21-1",
      "D1271": "CA 72.4",
      "B8160": "ProGRP",
      "OG001": "MyEpiAgeing",
      "D1001": "AMH",
      "B3340": "Spermogramme",
      "G1465": "Longueur Télomères"
    },

    // Biomarker Categories
    biomarkerCategories: {
      "Hematología, Hematopoyesis, Inmunidad": "Hématologie, Hématopoïèse, Immunité",
      "Metabolismo glucídico": "Métabolisme Glucidique",
      "Función hepática, Nutrición": "Fonction Hépatique, Nutrition",
      "Resistencia insulínica": "Résistance Insulinique",
      "Función renal": "Fonction Rénale",
      "Purinas, Riñón": "Purines, Rein",
      "Filtrado glomerular": "Filtration Glomérulaire",
      "Electrolitos": "Électrolytes",
      "Hígado / Hueso": "Foie / Os",
      "Enzimas hepáticas": "Enzymes Hépatiques",
      "Hígado, Hemólisis": "Foie, Hémolyse",
      "Nutrición": "Nutrition",
      "Colestasis": "Cholestase",
      "Perfil lipídico": "Profil Lipidique",
      "Riesgo CV": "Risque CV",
      "Eje HHA": "Axe HHS",
      "Andrógenos suprarrenales": "Androgènes Surrénaliens",
      "Transporte esteroides": "Transport Stéroïdes",
      "Hormona general": "Hormone Générale",
      "Paratiroides": "Parathyroïde",
      "Tiroides": "Thyroïde",
      "Inflamación cardiovascular": "Inflammation Cardiovasculaire",
      "Metionina / CV": "Méthionine / CV",
      "Mineral óseo": "Minéral Osseux",
      "Mineral neuromuscular": "Minéral Neuromusculaire",
      "Inmunidad": "Immunité",
      "Metabolismo hierro": "Métabolisme Fer",
      "Transporte hierro": "Transport Fer",
      "Hierro": "Fer",
      "Depósito hierro": "Dépôt Fer",
      "Mineral-inmune": "Minéral-Immun",
      "Hematopoyesis": "Hématopoïèse",
      "Hormonas femeninas": "Hormones Féminines",
      "Gonadotropina": "Gonadotrophine",
      "Hormona masculina": "Hormone Masculine",
      "Andrógeno potente": "Androgène Puissant",
      "Hormona femenina": "Hormone Féminine",
      "Suprarrenal": "Surrénalien",
      "Estrógeno menopáusico": "Œstrogène Ménopausique",
      "Fertilidad masculina": "Fertilité Masculine",
      "Reserva ovárica": "Réserve Ovarienne",
      "Edad epigenética": "Âge Épigénétique",
      "Envejecimiento celular": "Vieillissement Cellulaire"
    },

    // Biomarkers Descriptions
    biomarkers: {
      "6897": {
        description: "Analyse complète d'urine. Détecte infections, protéinurie, hématurie et cellules anormales."
      },
      "H0000": { description: "Analyse complète des cellules sanguines évaluant globules rouges, blancs, plaquettes et hémoglobine. Essentiel pour détecter anémies, infections et troubles hématologiques."
      },
      "H1420": {
        description: "Glucose sanguin moyen des 2-3 derniers mois. Marqueur de référence pour le diagnostic et le suivi du diabète."
      },
      "B0000": {
        description: "Taux de sucre dans le sang après 8-12 heures de jeûne. Dépistage primaire du diabète et évaluation du métabolisme glucidique."
      },
      "B0200": { description: "Principale protéine plasmatique. Indique fonction hépatique, état nutritionnel et capacité de synthèse protéique."
      },
      "B5600": { description: "Niveau d'insuline à jeun. Marqueur précoce de résistance à l'insuline avant l'apparition d'altérations glycémiques."
      },
      "B6510": {
        description: "Indice qui évalue la résistance à l'insuline en combinant glucose et insuline à jeun. Prédicteur de diabète de type 2."
      },
      "B0020": { description: "Produit de déchet du métabolisme protéique. Évalue fonction rénale et état d'hydratation."
      },
      "B0030": { description: "Produit de déchet musculaire. Marqueur plus spécifique de fonction rénale que l'urée."
      },
      "B0250": {
        description: "Protéine porteuse de vitamines liposolubles. Indique l'état nutritionnel et la fonction hépatique."
      },
      "B1540": {
        description: "Taux de filtration glomérulaire estimé. Mesure la capacité de filtrage des reins et détecte la maladie rénale précoce."
      },
      "B1260": {
        description: "Électrolytes essentiels pour la fonction cellulaire. Sodium, potassium et chlore régulent hydratation, fonction nerveuse et musculaire."
      },
      "B1970": { description: "Enzyme présente dans foie et os. Élevée indique problèmes hépatiques, osseux ou obstruction biliaire."
      },
      "B0050": { description: "Enzyme hépatique spécifique. Élevée indique dommage ou inflammation hépatique. Marqueur sensible d'hépatotoxicité."
      },
      "B0060": { description: "Enzyme présente dans foie, cœur et muscle. Élevée indique dommage cellulaire dans ces tissus."
      },
      "B0080": { description: "Produit de dégradation des globules rouges. Élevée indique problèmes hépatiques ou hémolyse excessive."
      },
      "B0240": { description: "Somme de toutes les protéines sanguines. Reflète état nutritionnel et fonction de synthèse protéique hépatique."
      },
      "B0070": {
        description: "Enzyme hépatique sensible à l'alcool et médicaments. Marqueur de cholestase et dommage hépatique chronique."
      },
      "B0010": {
        description: "Somme de toutes les fractions de cholestérol. Marqueur de base du risque cardiovasculaire."
      },
      "B0040": {
        description: "Graisses sanguines. Élevées indiquent risque cardiovasculaire et résistance à l'insuline."
      },
      "B0170": {
        description: "Protéine de liaison du cholestérol. Faibles niveaux augmentent le risque cardiovasculaire malgré un cholestérol normal."
      },
      "B0180": {
        description: "Mauvais cholestérol. Transporte cholestérol vers tissus. Élevé augmente risque cardiovasculaire."
      },
      "B3110": {
        description: "Protéine des particules athérogènes (LDL, VLDL). Meilleur prédicteur du risque cardiovasculaire que LDL-cholestérol."
      },
      "B3100": {
        description: "Protéine principale du HDL. Facilite transport inverse de cholestérol. Protecteur cardiovasculaire."
      },
      "B5120": {
        description: "Hormone du stress. Régule le métabolisme, l'immunité et l'inflammation. Élevé indique un stress chronique."
      },
      "B5290": {
        description: "Précurseur hormonal surrénalien. Décline avec l'âge. Important pour vitalité et fonction cognitive."
      },
      "B6020": {
        description: "Protéine transporteuse d'hormones sexuelles. Régule disponibilité de testostérone et estradiol."
      },
      "B6160": {
        description: "Principale hormone sexuelle masculine, importante chez les femmes. Régule masse musculaire, libido et énergie."
      },
      "B5850": {
        description: "Hormone parathyroïdienne. Régule calcium et phosphore. Élevée indique déficience en vitamine D ou problèmes osseux."
      },
      "B6040": {
        description: "Hormone thyroïdienne active. Régule métabolisme, température corporelle et fonction cardiovasculaire."
      },
      "B6070": {
        description: "Hormone thyroïdienne précurseur. Se convertit en T3 active dans les tissus périphériques."
      },
      "B6130": {
        description: "Hormone stimulante de la thyroïde. Contrôle production d'hormones thyroïdiennes T3 et T4."
      },
      "B3170": {
        description: "Protéine C réactive haute sensibilité. Marqueur d'inflammation systémique et de risque cardiovasculaire."
      },
      "B5590": {
        description: "Acide aminé du métabolisme de méthionine. Élevée indique risque cardiovasculaire et déficience de B6, B12, folate."
      },
      "B0120": {
        description: "Enzyme digestive du pancréas. Élevée indique dysfonction pancréatique ou pancréatite aiguë."
      },
      "B0100": {
        description: "Enzyme spécifique aux cellules hépatiques. Marqueur très sensible de dommage hépatique et lésion hépatocellulaire."
      },
      "B1600": {
        description: "Minéral essentiel pour fonction musculaire, nerveuse et cardiovasculaire. Cofacteur de plus de 300 enzymes."
      },
      "B8050": {
        description: "Oligo-élément essentiel pour immunité, cicatrisation, fonction cognitive et synthèse protéique."
      },
      "B0130": {
        description: "Enzyme qui décompose les graisses. Élevée indique insuffisance pancréatique ou maldigestion."
      },
      "B3210": {
        description: "Protéine transporteuse de fer. Reflète capacité de transport et état nutritionnel du fer."
      },
      "B7260": {
        description: "Pourcentage de saturation de transferrine. Indique disponibilité du fer pour les tissus."
      },
      "B5370": {
        description: "Protéine de stockage du fer. Reflète réserves corporelles de fer et peut indiquer inflammation."
      },
      "B6180": {
        description: "Métabolite d'hormone de stress. Reflète fonction surrénalienne et réponse au stress."
      },
      "B6190": {
        description: "Métabolite d'hormone féminine. Indique métabolisme des œstrogènes et équilibre hormonal."
      },
      "B5410": {
        description: "Hormone de croissance. Essentielle pour croissance, masse musculaire et métabolisme."
      },
      "B5350": {
        description: "Principale hormone sexuelle féminine. Régule cycle menstruel, santé osseuse et protection cardiovasculaire."
      },
      "B5980": {
        description: "Hormone de lactation. Élevée peut supprimer fonction reproductive."
      },
      "B5800": {
        description: "Stimule ovulation chez femmes et production de testostérone chez hommes."
      },
      "B5380": {
        description: "Hormone lutéinisante. Contrôle fonction ovarienne et testiculaire."
      },
      "D0601": {
        description: "Fraction active de testostérone non liée aux protéines. Plus spécifique que testostérone totale."
      },
      "B6480": {
        description: "Testostérone biodisponible. Fraction libre plus faiblement liée. Meilleur indicateur d'activité androgénique."
      },
      "D0850": {
        description: "Dihydrotestostérone. Androgène le plus puissant. Responsable des caractéristiques masculines et alopécie."
      },
      "B5932": {
        description: "Hormone de grossesse et cycle menstruel. Importante pour fertilité et équilibre hormonal."
      },
      "D0181": {
        description: "Précurseur de cortisol et androgènes. Élevée indique hyperplasie surrénalienne congénitale."
      },
      "D0780": {
        description: "Œstrogène prédominant en ménopause. Produit principalement dans tissu adipeux."
      },
      "B0260": { description: "Bilirubine conjuguée. Marqueur spécifique de fonction hépatique et obstruction biliaire."
      },
      "B1980": {
        description: "Enzyme pancréatique qui digère les graisses. Marqueur spécifique de fonction pancréatique exocrine."
      },
      "B0350": {
        description: "Enzyme qui digère les glucides. Produite par pancréas et glandes salivaires."
      },
      "B0110": {
        description: "Enzyme présente dans pancréas et glandes salivaires. Élevée indique inflammation ou dommage pancréatique."
      },
      "B6030": {
        description: "Facteur de croissance insulinique. Médiateur d'hormone de croissance. Important pour longévité et masse musculaire."
      },
      "B6010": {
        description: "Protéine transporteuse d'IGF-1. Module activité d'IGF-1 et a des effets indépendants sur longévité."
      },
      "I6740": {
        description: "Hormone adrénocorticotrope. Stimule production de cortisol. Évalue fonction de l'axe hypothalamo-hypophyso-surrénalien."
      },
      "H0020": {
        description: "Vitesse de sédimentation globulaire. Marqueur non spécifique d'inflammation systémique."
      },
      "D0560": {
        description: "Forme active de vitamine D. Hormone qui régule absorption de calcium et métabolisme osseux."
      },
      "T0811": {
        description: "Vitamine A active. Antioxydant liposoluble essentiel pour vision, immunité et différenciation cellulaire."
      },
      "T2841": {
        description: "Forme gamma de vitamine E. Antioxydant spécifique contre radicaux d'azote et peroxynitrite."
      },
      "T1191": {
        description: "Forme alpha de vitamine E. Principal antioxydant liposoluble qui protège membranes cellulaires."
      },
      "T1200": {
        description: "Principal précurseur de vitamine A. Antioxydant caroténoïde qui protège contre dommage oxydatif."
      },
      "T2830": {
        description: "Antioxydant mitochondrial essentiel. Crucial pour production d'énergie et protection cellulaire."
      },
      "T3920": {
        description: "Oligo-élément antioxydant essentiel. Cofacteur de glutathion peroxydase. Protège contre stress oxydatif."
      },
      "T1061": {
        description: "Vitamine antioxydante essentielle. Neutralise radicaux libres et régénère autres antioxydants comme vitamine E."
      },
      "B7121": {
        description: "Enzyme qui régénère glutathion réduit. Indicateur de l'état de vitamine B2 et capacité antioxydante."
      },
      "B3015": {
        description: "Enzyme antioxydant sélénium-dépendant. Protège cellules du dommage oxydatif par peroxydes."
      },
      "B3041": {
        description: "Glucose-6-phosphate déshydrogénase. Enzyme clé dans défense antioxydante cellulaire via NADPH."
      },
      "B7790": {
        description: "Interleucine-6. Cytokine pro-inflammatoire clé. Élevée dans inflammation chronique et vieillissement."
      },
      "I2081": {
        description: "Facteur de nécrose tumorale alpha. Cytokine pro-inflammatoire puissante. Impliquée dans vieillissement et maladies chroniques."
      },
      "B0270": {
        description: "Acide biliaire primaire. Reflète fonction hépatique et capacité de synthèse d'acides biliaires."
      },
      "B8060": {
        description: "Marqueur anti-inflammatoire. Indique capacité de résolution inflammatoire."
      },
      "T0500": {
        description: "Oligo-élément qui améliore sensibilité à insuline et métabolisme du glucose. Important en diabète."
      },
      "T2590": {
        description: "Profil d'acides gras oméga-3. Évalue état nutritionnel et balance inflammatoire."
      },
      "T1720": {
        description: "Vitamine liposoluble essentielle pour coagulation. Cofacteur de facteurs de coagulation."
      },
      "T0302": {
        description: "Mercure dans sang. Métal toxique qui affecte système nerveux. Sources : poisson, amalgames dentaires."
      },
      "T0150": {
        description: "Plomb dans sang. Métal toxique qui affecte développement neurologique et fonction cognitive."
      },
      "T0960": {
        description: "Arsenic total dans sang. Métalloïde toxique associé au cancer et maladies cardiovasculaires."
      },
      "T0480": {
        description: "Cadmium dans sang. Métal toxique qui affecte reins, os et système cardiovasculaire."
      },
      "D1111": {
        description: "Phosphatase alcaline spécifique d'os. Marqueur de formation osseuse et activité ostéoblastique."
      },
      "I3291": {
        description: "C-télopeptide. Marqueur de résorption osseuse. Évalue activité ostéoclastique et perte osseuse."
      },
      "T1572": {
        description: "Fraction active du calcium sérique. Forme biologiquement disponible pour fonctions cellulaires."
      },
      "B0750": {
        description: "Produit du métabolisme anaérobie. Élevé indique hypoxie tisulaire ou dysfonction mitochondriale."
      },
      "B1900": {
        description: "LDL cholestérol mesuré directement. Plus précis que calculé en cas de triglicérides élevés."
      },
      "B0190": {
        description: "Cholesterol transport protein. Reflects genetic cardiovascular risk factors."
      },
      "B7700": {
        description: "Lipoprotéine athérogène génétiquement déterminée. Facteur de risque cardiovasculaire indépendant."
      },
      "I5047": {
        description: "Marqueur de fonction rénale plus précis que créatinine. Non affecté par masse musculaire."
      },
      "B2120": {
        description: "Créatine kinase spécifique du myocarde. Marqueur de dommage cardiaque et infarctus."
      },
      "B0220": {
        description: "Protéine de transport du fer. Reflète réserves de fer et capacité de synthèse hépatique."
      },
      "I0141": {
        description: "Anticorps antinucléaires. Dépistage pour maladies auto-immunes systémiques comme lupus."
      },
      "I5072": {
        description: "Anticorps anti-peptide citrulliné cyclique. Spécifiques d'arthrite rhumatoïde."
      },
      "B6321": {
        description: "Anticorps anti-thyroglobuline. Marqueur d'auto-immunité thyroïdienne."
      },
      "B6300": {
        description: "Anticorps anti-peroxydase thyroïdienne. Marqueur de thyroïdite auto-immune (Hashimoto)."
      },
      "B7750": {
        description: "Anticorps contre H. pylori. Détecte infection gastrique associée à ulcères et cancer gastrique."
      },
      "B3130": {
        description: "Auto-anticorps présent dans arthrite rhumatoïde et autres maladies auto-immunes."
      },
      "M1190": {
        description: "Examen parasitologique de selles. Détecte parasites intestinaux qui affectent santé digestive."
      },
      "P3031": {
        description: "Panel de 200 aliments pour détecter intolérances alimentaires médiées par IgG."
      },
      "AB001": {
        description: "Analyse complète de diversité microbienne intestinale. Évalue équilibre de bactéries bénéfiques et pathogènes."
      },
      "AB002": {
        description: "Profil de métabolites dans urine et selles. Évalue voies métaboliques et fonctionnalité du microbiome."
      },
      "GP001": {
        description: "Pharmacogénomique générale. Analyse variantes génétiques qui affectent réponse aux médicaments pour personnaliser traitements et éviter effets indésirables."
      },
      "GD001": {
        description: "Analyse génétique de détoxification. Évalue capacité génétique à éliminer toxines et métaboliser xénobiotiques."
      },
      "GN001": {
        description: "Analyse génétique nutritionnelle. Identifie variantes qui affectent métabolisme des macronutriments et micronutriments."
      },
      "GA001": {
        description: "Analyse génétique du vieillissement. Évalue prédisposition génétique au vieillissement et longévité."
      },
      "GS001": {
        description: "Analyse génétique sportive. Optimise entraînement et performance basé sur profil génétique."
      },
      "GU001": {
        description: "Analyse génétique de supplémentation. Personnalise suppléments basés sur besoins génétiques individuels."
      },
      "H0050": {
        description: "Protéine de coagulation et marqueur inflammatoire. Élevé indique un risque thrombotique et inflammation."
      },
      "H0850": {
        description: "Temps de thromboplastine partielle activée. Évalue la voie intrinsèque de coagulation."
      },
      "H0860": {
        description: "Ratio international normalisé. Mesure le temps de prothrombine. Surveille l'anticoagulation."
      },
      "D1760": {
        description: "Gonadotrophine chorionique humaine bêta. Marqueur de grossesse et certaines tumeurs testiculaires et ovariennes."
      },
      "M0010": {
        description: "Détection de sang microscopique dans selles. Dépistage pour cancer colorectal et polypes."
      },
      "B7900": {
        description: "Alpha-fœtoprotéine. Marqueur de cancer hépatique et tumeurs germinales."
      },
      "B5830": {
        description: "Antigène prostatique spécifique total. Dépistage pour cancer de prostate et hyperplasie bénigne."
      },
      "B5840": {
        description: "Fraction libre de PSA. Améliore spécificité pour distinguer cancer d'hyperplasie bénigne."
      },
      "B5110": {
        description: "Antigène carcinoembryonnaire. Marqueur de cancers digestifs, spécialement colorectal."
      },
      "B5080": {
        description: "Marqueur tumoral de cancer ovarien. Également élevé dans endométriose et autres conditions."
      },
      "B5090": {
        description: "Marqueur tumoral de cancer du sein. Utile pour surveillance traitement et récidive."
      },
      "B5100": {
        description: "Marqueur tumoral de cancer pancréatique et biliaire. Également élevé dans pancréatite."
      },
      "B8110": {
        description: "Marqueur tumoral de cancer ovarien plus spécifique que CA125."
      },
      "B8130": {
        description: "Antigène de cellules squameuses. Marqueur de carcinomes épidermoïdes du col, poumon et œsophage."
      },
      "I5080": {
        description: "Protéine S-100. Marqueur de mélanome et tumeurs du système nerveux."
      },
      "I5090": {
        description: "Énolase neuronale spécifique. Marqueur de tumeurs neuroendocrines et cancer pulmonaire à petites cellules."
      },
      "B8120": {
        description: "Fragment de cytokératine 21-1. Marqueur de cancer pulmonaire non à petites cellules."
      },
      "D1271": {
        description: "Marqueur tumoral de cancer gastrique et autres adénocarcinomes."
      },
      "B8160": {
        description: "Pro-peptide libérateur de gastrine. Marqueur spécifique de cancer pulmonaire à petites cellules."
      },
      "OG001": {
        description: "Test épigénétique d'âge biologique. Mesure méthylation de l'ADN pour déterminer âge biologique réel."
      },
      "D1001": {
        description: "Hormone anti-müllerienne. Marqueur de réserve ovarienne et fertilité féminine."
      },
      "B3340": {
        description: "Analyse complète du sperme utilisée pour mesurer âge biologique masculin. Évalue concentration, motilité et morphologie spermatique comme marqueurs de vieillissement reproductif."
      },
      "G1465": {
        description: "Mesure de longueur des télomères. Biomarqueur direct du vieillissement cellulaire et prédicteur de longévité."
      }
    }
  }
};

// Exportar traducciones para validación
export { translations };

// Provider del contexto - Updated
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  console.log('🌐 LanguageContext loaded - Updated translation system');

  const changeLanguage = (language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
    }
  };

  const t = (key, defaultValue = null) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Solo usar fallback si realmente no existe la traducción
        if (currentLanguage !== 'es') {
          let spanishValue = translations['es'];
          for (const spanishK of keys) {
            if (spanishValue && typeof spanishValue === 'object') {
              spanishValue = spanishValue[spanishK];
            } else {
              break;
            }
          }
          // Solo retornar español si no hay valor en el idioma actual
          if (spanishValue && (typeof spanishValue === 'string' || Array.isArray(spanishValue)) && !value) {
            return spanishValue;
          }
        }
        
        // Si hay un valor por defecto, usarlo
        if (defaultValue !== null) {
          return defaultValue;
        }
        
        return key; // Retorna la clave si no encuentra la traducción
      }
    }
    
    // Retornar el valor encontrado, puede ser string o array
    if (value && (typeof value === 'string' || Array.isArray(value))) {
      return value;
    }
    
    // Solo usar fallback al español si no hay valor en absoluto
    if (currentLanguage !== 'es') {
      let spanishValue = translations['es'];
      for (const spanishK of keys) {
        if (spanishValue && typeof spanishValue === 'object') {
          spanishValue = spanishValue[spanishK];
        } else {
          break;
        }
      }
      if (spanishValue && (typeof spanishValue === 'string' || Array.isArray(spanishValue))) {
        return spanishValue;
      }
    }
    
    return defaultValue || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: ['es', 'en', 'fr']
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 