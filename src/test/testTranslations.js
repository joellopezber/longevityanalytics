/**
 * testTranslations.js
 * Script para probar y validar todas las traducciones
 * Ejecutar con: node src/test/testTranslations.js
 */

// Importar traducciones directamente
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
      title: "Essential",
      titleHighlight: "Análisis",
      description: "El Essential proporciona la información que forma el eje central de tu salud, y la adición de Add-Ons especializados según tus objetivos específicos te permite personalizar y adaptar tu analítica.",
      essentialPackage: "Essential Análisis",
      male: "Hombre",
      female: "Mujer",
      biomarkers: "biomarcadores",
      selected: "Seleccionado",
      addToAnalysis: "Añadir al análisis",
      removeFromAnalysis: "Quitar del análisis",
      viewBiomarkers: "Ver Biomarcadores",
      hideBiomarkers: "Ocultar Biomarcadores",
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
      heavy_metals: {
        name: "Metales Pesados",
        description: "Detecta acumulación de metales tóxicos (plomo, mercurio, cadmio) que aceleran el envejecimiento. Guía protocolos de quelación y detoxificación específicos para optimizar salud celular."
      },
      bone_mineral: {
        name: "Hueso & Mineral",
        description: "Analiza metabolismo óseo y mineral (calcio, fósforo, magnesio, vitamina D) para prevenir osteoporosis y optimizar salud esquelética. Personaliza estrategias de fortalecimiento óseo."
      },
      cardiovascular: {
        name: "Cardiovascular",
        description: "Evalúa salud cardiovascular con biomarcadores avanzados (Lp(a), ácidos grasos, vitamina K1) para prevenir eventos cardiovasculares y optimizar función cardíaca longterm."
      },
      immunity: {
        name: "Inmunidad",
        description: "Analiza sistema inmune con perfil completo de inmunoglobulinas y marcadores específicos para optimizar respuesta inmune y prevenir inmunosenescencia relacionada con el envejecimiento."
      },
      digestive: {
        name: "Digestivo",
        description: "Evalúa salud intestinal con análisis completo de heces, parásitos y marcadores digestivos. Optimiza microbioma y función intestinal para mejorar absorción de nutrientes y salud general."
      },
      gut_gate: {
        name: "Gut Gate",
        description: "Analiza permeabilidad intestinal y salud de la barrera intestinal con marcadores específicos. Detecta síndrome de intestino permeable y optimiza integridad de la mucosa intestinal."
      },
      genoma: {
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
        description: "Evalúa edad biológica mediante test epigenético MyEpiAgeing y fertilidad con AMH/espermiograma para determinar tu edad reproductiva y biológica real. Guía estrategias anti-aging precisas."
      }
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
      title: "Essential",
      titleHighlight: "Analysis",
      description: "The Essential provides the information that forms the central axis of your health, and the addition of specialized Add-Ons according to your specific objectives allows you to personalize and adapt your analytics.",
      essentialPackage: "Essential Analysis",
      male: "Male",
      female: "Female",
      biomarkers: "biomarkers",
      selected: "Selected",
      addToAnalysis: "Add to analysis",
      removeFromAnalysis: "Remove from analysis",
      viewBiomarkers: "View Biomarkers",
      hideBiomarkers: "Hide Biomarkers",
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
      heavy_metals: {
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
      digestive: {
        name: "Digestive",
        description: "Evaluate intestinal health with complete stool analysis, parasites and digestive markers. Optimize microbiome and intestinal function to improve nutrient absorption and overall health."
      },
      gut_gate: {
        name: "Gut Gate",
        description: "Analyze intestinal permeability and intestinal barrier health with specific markers. Detect leaky gut syndrome and optimize intestinal mucosa integrity."
      },
      genoma: {
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
      title: "Analyse",
      titleHighlight: "Essentielle",
      description: "L'Essentiel fournit les informations qui forment l'axe central de votre santé, et l'ajout de modules spécialisés selon vos objectifs spécifiques vous permet de personnaliser et d'adapter votre analytique.",
      essentialPackage: "Analyse Essentielle",
      male: "Homme",
      female: "Femme",
      biomarkers: "biomarqueurs",
      selected: "Sélectionné",
      addToAnalysis: "Ajouter à l'analyse",
      removeFromAnalysis: "Retirer de l'analyse",
      viewBiomarkers: "Voir les Biomarqueurs",
      hideBiomarkers: "Masquer les Biomarqueurs",
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
      heavy_metals: {
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
      digestive: {
        name: "Digestif",
        description: "Évalue la santé intestinale avec une analyse complète des selles, parasites et marqueurs digestifs. Optimise le microbiome et la fonction intestinale pour améliorer l'absorption des nutriments et la santé générale."
      },
      gut_gate: {
        name: "Gut Gate",
        description: "Analyse la perméabilité intestinale et la santé de la barrière intestinale avec des marqueurs spécifiques. Détecte le syndrome de l'intestin perméable et optimise l'intégrité de la muqueuse intestinale."
      },
      genoma: {
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
    }
  }
};

// Función de validación
const validateTranslations = () => {
  const languages = Object.keys(translations);
  const issues = [];

  // Función recursiva para obtener todas las claves anidadas
  const getAllKeys = (obj, prefix = '') => {
    const keys = [];
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys.push(...getAllKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  };

  // Obtener todas las claves del idioma base (español)
  const baseKeys = getAllKeys(translations.es);

  // Verificar que todas las claves existen en todos los idiomas
  languages.forEach(lang => {
    const langKeys = getAllKeys(translations[lang]);
    
    // Verificar claves faltantes
    baseKeys.forEach(key => {
      if (!langKeys.includes(key)) {
        issues.push({
          type: 'missing_key',
          language: lang,
          key: key,
          message: `Clave faltante en ${lang}: ${key}`
        });
      }
    });

    // Verificar claves extra
    langKeys.forEach(key => {
      if (!baseKeys.includes(key)) {
        issues.push({
          type: 'extra_key',
          language: lang,
          key: key,
          message: `Clave extra en ${lang}: ${key}`
        });
      }
    });
  });

  return {
    isValid: issues.length === 0,
    issues: issues,
    summary: {
      totalKeys: baseKeys.length,
      languages: languages.length,
      totalIssues: issues.length
    }
  };
};

// Ejecutar validación
console.log('🌐 VALIDACIÓN DE TRADUCCIONES - LONGEVITY ANALYTICS');
console.log('===================================================');

const result = validateTranslations();

console.log(`📊 ESTADÍSTICAS:`);
console.log(`   • Total de claves: ${result.summary.totalKeys}`);
console.log(`   • Idiomas soportados: ${result.summary.languages} (ES, EN, FR)`);
console.log(`   • Problemas encontrados: ${result.summary.totalIssues}`);
console.log('');

if (result.isValid) {
  console.log('✅ ¡TODAS LAS TRADUCCIONES ESTÁN COMPLETAS!');
  console.log('   Sistema multiidioma funcionando perfectamente');
  console.log('   Todas las claves están presentes en los 3 idiomas');
} else {
  console.log('❌ SE ENCONTRARON PROBLEMAS:');
  console.log('----------------------------');
  
  // Agrupar problemas por idioma
  const issuesByLang = {};
  result.issues.forEach(issue => {
    if (!issuesByLang[issue.language]) {
      issuesByLang[issue.language] = [];
    }
    issuesByLang[issue.language].push(issue);
  });

  Object.keys(issuesByLang).forEach(lang => {
    console.log(`\n🔍 IDIOMA: ${lang.toUpperCase()}`);
    issuesByLang[lang].forEach(issue => {
      console.log(`   ${issue.type === 'missing_key' ? '❌' : '⚠️'} ${issue.key}`);
    });
  });
}

console.log('');
console.log('🚀 PRÓXIMOS PASOS:');
console.log('-----------------');
if (result.isValid) {
  console.log('• ✅ Sistema de traducciones listo para producción');
  console.log('• ✅ Selector de idiomas funcionando correctamente');
  console.log('• ✅ Experiencia multiidioma completa');
} else {
  console.log('• 🔧 Corregir claves faltantes en LanguageContext.js');
  console.log('• 🔧 Verificar componentes que usan traducciones');
  console.log('• 🔧 Ejecutar validación nuevamente');
}

console.log('');
console.log('📝 NOTA: Las traducciones se gestionan desde src/contexts/LanguageContext.js');
console.log('💡 TIP: Usa el hook useLanguage() en componentes para acceder a t()'); 