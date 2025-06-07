/**
 * addOnPackages.js
 * Add-Ons especializados extraídos de biomarkers.js para nueva arquitectura
 * Mantiene EXACTAMENTE la misma lógica, biomarcadores y funciones
 * Compatible con biomarkersDict.js y analysisPackages.js
 */

import { 
  FaFlask, 
  FaShieldAlt, 
  FaAtom, 
  FaTint, 
  FaClock, 
  FaBone, 
  FaDumbbell, 
  FaSearch,
  FaFire,
  FaPills,
  FaHeart,
  FaUtensils,
  FaDna
} from 'react-icons/fa';
import { AiFillApple } from 'react-icons/ai';

// Importar función de cálculo de precios desde priceCalculator
import { calculateAddOnPrice } from './priceCalculator.js';

// Add-Ons especializados - EXACTAMENTE como en biomarkers.js
export const addOnPackages = {
  hormonas: {
    id: 'hormonas',
    name: 'Hormonas',
    description: 'Analiza el perfil hormonal completo (testosterona, estrógenos, progesterona, gonadotropinas) para optimizar vitalidad, libido, masa muscular y equilibrio hormonal. Esencial para terapias de reemplazo hormonal y antienvejecimiento.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaFlask,
    benefits: [
      'Optimiza balance hormonal',
      'Mejora energía y vitalidad',
      'Soporte para terapias hormonales',
      'Monitoreo de edad reproductiva'
    ],
    biomarkers: [
      // Biomarcadores comunes (ambos géneros)
      { name: "Estradiol", category: "Hormonas femeninas", code: "B5350", gender: "both", description: "Principal estrógeno. Regula ciclo menstrual, salud ósea y cardiovascular en mujeres." },
      { name: "Prolactina", category: "Hormonas femeninas", code: "B5980", gender: "both", description: "Hormona de la lactancia. Elevada puede suprimir función reproductiva." },
      { name: "LH", category: "Gonadotropina", code: "B5800", gender: "both", description: "Estimula ovulación en mujeres y producción de testosterona en hombres." },
      { name: "FSH", category: "Gonadotropina", code: "B5380", gender: "both", description: "Estimula desarrollo folicular y espermatogénesis. Marcador de reserva reproductiva." },
      
      // Biomarcadores específicos para hombres (7 total con los comunes)
      { name: "Testosterona libre", category: "Hormona masculina", code: "D0601", gender: "male", description: "Fracción activa de testosterona no unida a proteínas. Más específica que testosterona total." },
      { name: "Testosterona biodisp.", category: "Hormona masculina", code: "B6480", gender: "male", description: "Testosterona biodisponible. Fracción libre más débilmente unida. Mejor indicador de actividad androgénica." },
      { name: "DHT", category: "Andrógeno potente", code: "D0850", gender: "male", description: "Dihidrotestosterona. Andrógeno más potente. Responsable de características masculinas y alopecia." },
      
      // Biomarcadores específicos para mujeres (8 total con los comunes)
      { name: "Testosterona total", category: "Hormona masculina", code: "B6160", gender: "female", description: "Andrógeno importante en mujeres para libido, energía y masa muscular." },
      { name: "Progesterona", category: "Hormona femenina", code: "B5932", gender: "female", description: "Hormona del embarazo y ciclo menstrual. Importante para fertilidad y equilibrio hormonal." },
      { name: "17-OH-Progesterona", category: "Suprarrenal", code: "D0181", gender: "female", description: "Precursor de cortisol y andrógenos. Elevada indica hiperplasia suprarrenal congénita." },
      { name: "Estrona", category: "Estrógeno menopáusico", code: "D0780", gender: "female", description: "Estrógeno predominante en menopausia. Producido principalmente en tejido adiposo." }
    ],
    
    // Función para obtener precios dinámicos por género
    getPricing() {
      const pricing = calculateAddOnPrice(this.biomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: pricing.male.testCount
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: pricing.female.testCount
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: pricing.both.testCount
        },
        details: pricing
      };
    }
  },

  endocrino: {
    id: 'endocrino',
    name: 'Endocrino',
    description: 'Evalúa el eje hormonal completo (IGF-1, ACTH, función pancreática, hormonas reproductivas) para optimizar metabolismo, crecimiento celular y función endocrina. Identifica disfunciones metabólicas y guía estrategias de longevidad.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: AiFillApple,
    benefits: [
      'Función tiroidea avanzada',
      'Eje hipotálamo-hipófisis',
      'Metabolismo energético',
      'Regulación hormonal'
    ],
    biomarkers: [
      { name: "Bilirrubina directa", category: "Hígado", code: "B0260", gender: "both", description: "Bilirrubina conjugada. Específica de función hepática y obstrucción biliar." },
      { name: "Lipasa", category: "Función pancreática", code: "B1980", gender: "both", description: "Enzima pancreática que digiere grasas. Marcador específico de función pancreática exocrina." },
      { name: "Amilasa", category: "Función pancreática", code: "B0350", gender: "both", description: "Enzima que digiere carbohidratos. Producida por páncreas y glándulas salivales." },
      { name: "LDH", category: "Enzima celular", code: "B0110", gender: "both", description: "Lactato deshidrogenasa. Enzima de daño celular presente en corazón, hígado, músculos y glóbulos rojos." },
      { name: "Estradiol", category: "Hormonas femeninas", code: "B5350", gender: "both", description: "Principal estrógeno. Regula ciclo menstrual, salud ósea y cardiovascular en mujeres.", isOptional: true, defaultSelected: true },
      { name: "Prolactina", category: "Hormonas femeninas", code: "B5980", gender: "both", description: "Hormona de la lactancia. Elevada puede suprimir función reproductiva.", isOptional: true, defaultSelected: true },
      { name: "LH", category: "Gonadotropina", code: "B5800", gender: "both", description: "Estimula ovulación en mujeres y producción de testosterona en hombres.", isOptional: true, defaultSelected: true },
      { name: "FSH", category: "Gonadotropina", code: "B5380", gender: "both", description: "Estimula desarrollo folicular y espermatogénesis. Marcador de reserva reproductiva.", isOptional: true, defaultSelected: true },
      { name: "IGF-1", category: "Eje GH/IGF", code: "B6030", gender: "both", description: "Factor de crecimiento insulínico. Mediador de hormona de crecimiento. Importante para longevidad y masa muscular." },
      { name: "IGFBP-3", category: "Regula IGF", code: "B6010", gender: "both", description: "Proteína transportadora de IGF-1. Modula actividad de IGF-1 y tiene efectos independientes en longevidad." },
      { name: "ACTH", category: "Pituitaria", code: "I6740", gender: "both", description: "Hormona adrenocorticotrópica. Estimula producción de cortisol. Evalúa función del eje hipotálamo-hipófisis-suprarrenal." },
      { name: "VSG", category: "Inflamación", code: "H0020", gender: "both", description: "Velocidad de sedimentación globular. Marcador inespecífico de inflamación sistémica.", isOptional: true, defaultSelected: false },
      { name: "Vitamina D 1,25-OH", category: "Hormona calcitriol", code: "D0560", gender: "both", description: "Forma activa de vitamina D. Hormona que regula absorción de calcio y metabolismo óseo.", isOptional: true, defaultSelected: true }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      // SOLO incluir biomarcadores obligatorios (las opcionales se añaden por contexto)
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
      return {
        price: pricing.both.price,
        marketPrice: pricing.both.details.marketPrice,
        testCount: mandatoryBiomarkers.length,
        details: pricing
      };
    }
  },

  antioxidantes: {
    id: 'antioxidantes',
    name: 'Antioxidantes',
    description: 'Mide vitaminas antioxidantes (A, E), coenzima Q10 y carotenoides para evaluar tu capacidad de defensa contra el envejecimiento. Personaliza suplementación antioxidante y reduce estrés oxidativo.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaShieldAlt,
    benefits: [
      'Evalúa capacidad antioxidante',
      'Identifica deficiencias vitamínicas',
      'Optimiza suplementación',
      'Reduce estrés oxidativo'
    ],
    biomarkers: [
      { name: "Retinol (Vit A)", category: "Antioxidante", code: "T0811", gender: "both", description: "Vitamina A activa. Antioxidante liposoluble esencial para visión, inmunidad y diferenciación celular." },
      { name: "γ-Tocoferol", category: "Antioxidante", code: "T2841", gender: "both", description: "Forma gamma de vitamina E. Antioxidante específico contra radicales de nitrógeno y peroxinitrito." },
      { name: "α-Tocoferol", category: "Antioxidante", code: "T1191", gender: "both", description: "Forma alfa de vitamina E. Principal antioxidante liposoluble que protege membranas celulares." },
          { name: "α-Caroteno", category: "Antioxidante", code: "T1200A", gender: "both", description: "Carotenoide antioxidante. Precursor de vitamina A con potente actividad antioxidante." },
    { name: "β-Caroteno", category: "Antioxidante", code: "T1200B", gender: "both", description: "Principal precursor de vitamina A. Antioxidante carotenoide que protege contra daño oxidativo." },
      { name: "Coenzima Q10", category: "Energía mitoc.", code: "T2830", gender: "both", description: "Antioxidante mitocondrial esencial. Crucial para producción de energía y protección celular." }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      const pricing = calculateAddOnPrice(this.biomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: pricing.male.testCount
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: pricing.female.testCount
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: pricing.both.testCount
        },
        details: pricing
      };
    }
  },

  oxidative_cell: {
    id: 'oxidative_cell',
    name: 'Estrés Oxidativo',
    description: 'Analiza selenio, vitamina C y marcadores específicos de sistema glutatión para evaluar el envejecimiento a nivel molecular. Optimiza protección celular y previene daño oxidativo acumulativo.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaAtom,
    benefits: [
      'Evaluación de daño celular',
      'Capacidad antioxidante específica',
      'Optimización celular',
      'Prevención del envejecimiento'
    ],
    biomarkers: [
      { name: "Selenio", category: "Antioxidante", code: "T3920", gender: "both", description: "Oligoelemento antioxidante esencial. Cofactor de glutatión peroxidasa. Protege contra estrés oxidativo." },
      { name: "Vitamina C", category: "Antioxidante hidrosoluble", code: "T1061", gender: "both", description: "Vitamina antioxidante esencial. Neutraliza radicales libres y regenera otros antioxidantes como vitamina E.", isOptional: true, defaultSelected: true },
      { name: "Glutatión reductasa + B2", category: "Sistema glutatión", code: "B7121", gender: "both", description: "Enzima que regenera glutatión reducido. Indicador del estado de vitamina B2 y capacidad antioxidante." },
      { name: "Glutatión peroxidasa", category: "Sistema glutatión", code: "B3015", gender: "both", description: "Enzima antioxidante selenio-dependiente. Protege células del daño oxidativo por peróxidos." },
      { name: "G6PD", category: "Defensa antioxidante", code: "B3041", gender: "both", description: "Glucosa-6-fosfato deshidrogenasa. Enzima clave en defensa antioxidante celular vía NADPH." }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      // SOLO incluir biomarcadores obligatorios (las opcionales se añaden por contexto)
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        details: pricing
      };
    }
  },

  inflammation: {
    id: 'inflammation',
    name: 'Inflamación',
    description: 'Mide marcadores de inflamación sistémica (VSG, IL-6, TNF-α) para detectar inflamación crónica silenciosa. Guía estrategias anti-inflamatorias y reduce riesgo de enfermedades crónicas.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaFire,
    benefits: [
      'Detección de inflamación crónica',
      'Marcadores sistémicos',
      'Riesgo cardiovascular',
      'Optimización anti-inflamatoria'
    ],
    biomarkers: [
      { name: "VSG", category: "Inflamación", code: "H0020", gender: "both", description: "Velocidad de sedimentación globular. Marcador inespecífico de inflamación sistémica." },
      { name: "IL-6", category: "Citocina inflamatoria", code: "B7790", gender: "both", description: "Interleucina-6. Citocina proinflamatoria clave. Elevada en inflamación crónica y envejecimiento." },
      { name: "TNF-α", category: "Citocina inflamatoria", code: "I2081", gender: "both", description: "Factor de necrosis tumoral alfa. Citocina proinflamatoria potente. Implicada en envejecimiento y enfermedades crónicas." }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      const pricing = calculateAddOnPrice(this.biomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: pricing.male.testCount
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: pricing.female.testCount
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: pricing.both.testCount
        },
        details: pricing
      };
    }
  },

  iv_nutrients: {
    id: 'iv_nutrients',
    name: 'IV & Nutrientes',
    description: 'Analiza oligoelementos (cobre, cromo, selenio, magnesio), vitaminas específicas (C, K1), ácidos grasos omega-3 y balance hidroelectrolítico para optimizar terapias IV y suplementación. Personaliza protocolos nutricionales y mejora absorción de nutrientes.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaPills,
    benefits: [
      'Optimiza terapias IV',
      'Detecta deficiencias nutricionales',
      'Personaliza suplementación',
      'Mejora absorción de nutrientes'
    ],
    biomarkers: [
      { name: "Osmolalidad sérica", category: "Balance hidroelectrolítico", code: "B0270", gender: "both", description: "Concentración de partículas en sangre. Evalúa balance hídrico y función renal. Importante para terapias IV." },
      { name: "Magnesio", category: "Mineral esencial", code: "B1600", gender: "both", description: "Mineral esencial para función muscular, nerviosa y cardiovascular. Cofactor de >300 enzimas." },
      { name: "Cobre", category: "Oligoelemento", code: "B8060", gender: "both", description: "Oligoelemento esencial para formación de colágeno, función inmune y metabolismo del hierro." },
      { name: "Cromo", category: "Metabolismo glucídico", code: "T0500", gender: "both", description: "Oligoelemento que mejora sensibilidad a insulina y metabolismo de glucosa. Importante en diabetes." },
      { name: "Selenio", category: "Antioxidante", code: "T3920", gender: "both", description: "Oligoelemento antioxidante esencial. Cofactor de glutatión peroxidasa. Protege contra estrés oxidativo." },
      { name: "Ácidos grasos %", category: "Estado Ω-3", code: "T2590", gender: "both", description: "Perfil de ácidos grasos omega-3. Evalúa estado nutricional y balance inflamatorio.", isOptional: true, defaultSelected: false },
      { name: "Vitamina K1", category: "Coagulación", code: "T1720", gender: "both", description: "Vitamina liposoluble esencial para coagulación. Cofactor de factores de coagulación.", isOptional: true, defaultSelected: true },
      { name: "Vitamina C", category: "Antioxidante hidrosoluble", code: "T1061", gender: "both", description: "Vitamina antioxidante esencial. Neutraliza radicales libres y regenera otros antioxidantes como vitamina E.", isOptional: true, defaultSelected: true }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      // SOLO incluir biomarcadores obligatorios (las opcionales se añaden por contexto)
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        details: pricing
      };
    }
  },

  metals: {
    id: 'metals',
    name: 'Metales Pesados',
    description: 'Detecta mercurio, plomo, arsénico y cadmio en sangre para identificar toxicidad por metales pesados. Guía protocolos de detoxificación y protege función neurológica y cognitiva.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaDumbbell,
    benefits: [
      'Detoxificación dirigida',
      'Prevención de toxicidad',
      'Salud neurológica',
      'Función cognitiva'
    ],
    biomarkers: [
      { name: "Hg sangre", category: "Metales pesados", code: "T0302", gender: "both", description: "Mercurio en sangre. Metal tóxico que afecta sistema nervioso. Fuentes: pescado, amalgamas dentales." },
      { name: "Pb sangre", category: "Metales pesados", code: "T0150", gender: "both", description: "Plomo en sangre. Metal tóxico que afecta desarrollo neurológico y función cognitiva." },
      { name: "As sangre total", category: "Metales pesados", code: "T0960", gender: "both", description: "Arsénico total en sangre. Metaloide tóxico asociado con cáncer y enfermedades cardiovasculares." },
      { name: "Cd sangre", category: "Metales pesados", code: "T0480", gender: "both", description: "Cadmio en sangre. Metal tóxico que afecta riñones, huesos y sistema cardiovascular." }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      const pricing = calculateAddOnPrice(this.biomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: pricing.male.testCount
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: pricing.female.testCount
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: pricing.both.testCount
        },
        details: pricing
      };
    }
  },

  bone_mineral: {
    id: 'bone_mineral',
    name: 'Hueso & Mineral',
    description: 'Evalúa marcadores de formación y reabsorción ósea (ALP ósea, CTX), calcio iónico y vitamina D activa para prevenir osteoporosis y optimizar salud ósea a largo plazo.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaBone,
    benefits: [
      'Prevención de osteoporosis',
      'Optimización de calcio',
      'Salud ósea a largo plazo',
      'Metabolismo mineral'
    ],
    biomarkers: [
      { name: "ALP ósea", category: "Marcador óseo", code: "D1111", gender: "both", description: "Fosfatasa alcalina específica de hueso. Marcador de formación ósea y actividad osteoblástica." },
      { name: "CTX", category: "Reabsorción ósea", code: "I3291", gender: "both", description: "C-telopéptido. Marcador de reabsorción ósea. Evalúa actividad osteoclástica y pérdida ósea." },
      { name: "Calcio iónico", category: "Mineral óseo", code: "T1572", gender: "both", description: "Fracción activa del calcio sérico. Forma biológicamente disponible para funciones celulares." },
      { name: "Vitamina D 1,25-OH", category: "Hormona calcitriol", code: "D0560", gender: "both", description: "Forma activa de vitamina D. Hormona que regula absorción de calcio y metabolismo óseo." }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      const pricing = calculateAddOnPrice(this.biomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: pricing.male.testCount
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: pricing.female.testCount
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: pricing.both.testCount
        },
        details: pricing
      };
    }
  },

  cardiovascular: {
    id: 'cardiovascular',
    name: 'Cardiovascular',
    description: 'Analiza lipoproteínas aterogénicas (Lp(a), VLDL), enzimas cardíacas para prevención cardiovascular avanzada. Reduce riesgo de infarto y optimiza salud cardíaca.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaHeart,
    benefits: [
      'Prevención cardiovascular avanzada',
      'Optimización lipídica',
      'Reducción de riesgo cardíaco',
      'Monitoreo enzimas cardíacas'
    ],
    biomarkers: [
      { name: "Ácido láctico", category: "Metabolismo energético", code: "B0750", gender: "both", description: "Producto del metabolismo anaeróbico. Elevado indica hipoxia tisular o disfunción mitocondrial." },
      { name: "LDH", category: "Enzima celular", code: "B0110", gender: "both", description: "Lactato deshidrogenasa. Enzima de daño celular presente en corazón, hígado, músculos y glóbulos rojos." },
      { name: "LDL directo", category: "Perfil lipídico", code: "B1900", gender: "both", description: "LDL colesterol medido directamente. Más preciso que el calculado en casos de triglicéridos elevados." },
      { name: "VLDL", category: "Perfil lipídico", code: "B0190", gender: "both", description: "Lipoproteínas de muy baja densidad. Transportan triglicéridos. Elevadas aumentan riesgo cardiovascular." },
      { name: "Lp(a) *", category: "Riesgo CV", code: "B7700", gender: "both", description: "Lipoproteína aterogénica genéticamente determinada. Factor de riesgo cardiovascular independiente.", isOptional: true },
      { name: "Cistatina-C", category: "Filtrado renal", code: "I5047", gender: "both", description: "Marcador de función renal más preciso que creatinina. No se ve afectado por masa muscular." },
      { name: "CK-MB", category: "Enzima miocárdica", code: "B2120", gender: "both", description: "Creatina quinasa específica del miocardio. Marcador de daño cardíaco e infarto." },
      { name: "CPK total", category: "Enzima muscular", code: "B0220", gender: "both", description: "Creatina fosfoquinasa total. Enzima muscular que indica daño o estrés muscular." },
      { name: "IL-6", category: "Citocina inflamatoria", code: "B7790", gender: "both", description: "Interleucina-6. Citocina proinflamatoria clave. Elevada en inflamación crónica y envejecimiento.", isOptional: true, defaultSelected: false },
      { name: "TNF-α", category: "Citocina inflamatoria", code: "I2081", gender: "both", description: "Factor de necrosis tumoral alfa. Citocina proinflamatoria potente. Implicada en envejecimiento y enfermedades crónicas.", isOptional: true, defaultSelected: false }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      // SOLO incluir biomarcadores obligatorios (Lp(a) es opcional)
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        details: pricing
      };
    }
  },

  immunity: {
    id: 'immunity',
    name: 'Inmunidad',
    description: 'Evalúa el sistema inmunológico mediante autoanticuerpos, marcadores de autoinmunidad tiroidea y factores inflamatorios. Detecta enfermedades autoinmunes y optimiza función inmune.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaShieldAlt,
    benefits: [
      'Detección autoinmunidad',
      'Función inmune',
      'Salud tiroidea',
      'Inflamación sistémica'
    ],
    biomarkers: [
      { name: "Nucleares An (ANA)", category: "Autoinmunidad", code: "I0141", gender: "both", description: "Anticuerpos antinucleares. Cribado para enfermedades autoinmunes sistémicas como lupus." },
      { name: "anti-CCP", category: "Artritis", code: "I5072", gender: "both", description: "Anticuerpos anti-péptido citrulinado cíclico. Específicos de artritis reumatoide." },
      { name: "anti-Tg", category: "Tiroides", code: "B6321", gender: "both", description: "Anticuerpos anti-tiroglobulina. Marcador de autoinmunidad tiroidea." },
      { name: "anti-TPO", category: "Tiroides", code: "B6300", gender: "both", description: "Anticuerpos anti-peroxidasa tiroidea. Marcador de tiroiditis autoinmune (Hashimoto)." },
      { name: "Helicobacter pylori IgG An", category: "Infección", code: "B7750", gender: "both", description: "Anticuerpos contra H. pylori. Detecta infección gástrica asociada a úlceras y cáncer gástrico.", isOptional: true, defaultSelected: true },
      { name: "Factor reumatoide", category: "Artritis", code: "B3130", gender: "both", description: "Autoanticuerpo presente en artritis reumatoide y otras enfermedades autoinmunes." }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      // SOLO incluir biomarcadores obligatorios (los opcionales se añaden por contexto)
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: mandatoryBiomarkers.length
        },
        details: pricing
      };
    }
  },

  digest: {
    id: 'digest',
    name: 'Digestivo',
    description: 'Análisis digestivo completo que evalúa función hepática, pancreática, absorción intestinal y detección de parásitos. Incluye intolerancias alimentarias para optimizar dieta y salud digestiva.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaUtensils,
    benefits: [
      'Función hepática',
      'Función pancreática',
      'Permeabilidad intestinal',
      'Detección parásitos',
      'Intolerancias alimentarias'
    ],
    biomarkers: [
      { name: "Bilirrubina directa", category: "Hígado", code: "B0260", gender: "both", description: "Bilirrubina conjugada. Específica de función hepática y obstrucción biliar." },
      { name: "Ácido láctico", category: "Metabolismo energético", code: "B0750", gender: "both", description: "Producto del metabolismo anaeróbico. Elevado indica hipoxia tisular o disfunción mitocondrial." },
      { name: "Lipasa", category: "Función pancreática", code: "B1980", gender: "both", description: "Enzima pancreática que digiere grasas. Marcador específico de función pancreática exocrina." },
      { name: "Amilasa", category: "Función pancreática", code: "B0350", gender: "both", description: "Enzima que digiere carbohidratos. Producida por páncreas y glándulas salivales." },
      { name: "Ácidos grasos %", category: "Estado Ω-3", code: "T2590", gender: "both", description: "Perfil de ácidos grasos omega-3. Evalúa estado nutricional y balance inflamatorio." },
      { name: "Urianálisis + sedimento", category: "Riñón, Vías urinarias", code: "6897", gender: "both", description: "Análisis completo de orina. Detecta infecciones, proteinuria, hematuria y células anormales.", isOptional: true, defaultSelected: true },
      { name: "Ova & Parasites stool", category: "Parasitología", code: "M1190", gender: "both", description: "Examen parasitológico de heces. Detecta parásitos intestinales que afectan salud digestiva.", isOptional: true, defaultSelected: true },
      { name: "Intolerancia Alimentaria 200", category: "Intolerancias", code: "P3031", gender: "both", description: "Panel de 200 alimentos para detectar intolerancias alimentarias mediadas por IgG.", isOptional: true }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      // Filtrar solo biomarcadores obligatorios para el precio base
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
      return {
        price: pricing.both.price,
        marketPrice: pricing.both.details.marketPrice,
        testCount: mandatoryBiomarkers.length,
        details: pricing
      };
    }
  },

  gut_gate: {
    id: 'gut_gate',
    name: 'Gut Gate',
    description: 'Análisis avanzado del microbioma intestinal y metaboloma urinario para evaluar diversidad microbiana, permeabilidad intestinal y metabolitos funcionales. Optimiza salud del eje intestino-cerebro.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaAtom,
    benefits: [
      'Análisis microbioma',
      'Metabolitos funcionales',
      'Eje intestino-cerebro',
      'Permeabilidad intestinal'
    ],
    biomarkers: [
      { name: "Microbioma", category: "Microbioma intestinal", code: "AB001", gender: "both", description: "Análisis completo de diversidad microbiana intestinal. Evalúa balance de bacterias beneficiosas y patógenas." },
      { name: "Metaboloma (orina/heces)", category: "Metabolómica", code: "AB002", gender: "both", description: "Perfil de metabolitos en orina y heces. Evalúa vías metabólicas y funcionalidad del microbioma.", isOptional: true }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      // Filtrar solo biomarcadores obligatorios para el precio base
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
      return {
        price: pricing.both.price,
        marketPrice: pricing.both.details.marketPrice,
        testCount: mandatoryBiomarkers.length,
        details: pricing
      };
    }
  },

  genome: {
    id: 'genome',
    name: 'Genoma',
    description: 'Análisis genómico completo mediante secuenciación de genoma completo (GWAS) y análisis genético especializado para identificar variantes genéticas, riesgo de enfermedades y farmacogenética.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaDna,
    benefits: [
      'Genoma completo',
      'Riesgo genético',
      'Farmacogenética',
      'Medicina personalizada'
    ],
    biomarkers: [
      { name: "MyPharma", category: "Farmacogenómica", code: "GP001", gender: "both", description: "Farmacogenómica general. Analiza variantes genéticas que afectan la respuesta a medicamentos para personalizar tratamientos y evitar efectos adversos.", isOptional: true },
      { name: "MyDetox", category: "Detoxificación", code: "GD001", gender: "both", description: "Análisis genético de detoxificación. Evalúa capacidad genética para eliminar toxinas y metabolizar xenobióticos.", isOptional: true },
      { name: "MyDiet", category: "Nutrigenética", code: "GN001", gender: "both", description: "Análisis genético nutricional. Identifica variantes que afectan metabolismo de macronutrientes y micronutrientes.", isOptional: true },
      { name: "MyAgeing", category: "Envejecimiento", code: "GA001", gender: "both", description: "Análisis genético del envejecimiento. Evalúa predisposición genética al envejecimiento y longevidad.", isOptional: true, defaultSelected: true },
      { name: "MySport", category: "Rendimiento", code: "GS001", gender: "both", description: "Análisis genético deportivo. Optimiza entrenamiento y rendimiento basado en perfil genético.", isOptional: true },
      { name: "MySuplements", category: "Suplementación", code: "GU001", gender: "both", description: "Análisis genético de suplementación. Personaliza suplementos basado en necesidades genéticas individuales.", isOptional: true }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      // Para el add-on Genoma, todos los biomarcadores son opcionales
      // Por tanto, el precio base es 0€ y solo se añaden tests cuando están seleccionados
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      
      if (mandatoryBiomarkers.length > 0) {
        // Si hay biomarcadores obligatorios, calcular su precio
        const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
        return {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: mandatoryBiomarkers.length,
          details: pricing
        };
      } else {
        // Si todos son opcionales (como en Genoma), precio base = 0€
        return {
          price: 0,
          marketPrice: 0,
          testCount: 0,
          details: {
            both: {
              price: 0,
              testCount: 0,
              details: { marketPrice: 0, finalPrice: 0 }
            }
          }
        };
      }
    }
  },

  coagulation: {
    id: 'coagulation',
    name: 'Coagulación',
    description: 'Analiza sistema de coagulación (fibrinógeno, APTT, INR) para evaluar riesgo trombótico y función hemostática. Optimiza anticoagulación y previene eventos cardiovasculares.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaTint,
    benefits: [
      'Riesgo de trombosis',
      'Función plaquetaria',
      'Hemostasia',
      'Anticoagulación'
    ],
    biomarkers: [
      { name: "Fibrinógeno", category: "Coagulación-inflamación", code: "H0050", gender: "both", description: "Proteína de coagulación y marcador inflamatorio. Elevado indica riesgo trombótico e inflamación." },
      { name: "Cefalina-APTT", category: "Coagulación", code: "H0850", gender: "both", description: "Tiempo de tromboplastina parcial activada. Evalúa vía intrínseca de coagulación." },
      { name: "INR (Protrombina)", category: "Coagulación", code: "H0860", gender: "both", description: "Ratio internacional normalizado. Mide tiempo de protrombina. Monitorea anticoagulación." }
    ],
    
    // Función para obtener precios dinámicos
    getPricing() {
      const pricing = calculateAddOnPrice(this.biomarkers, 'addon');
      return {
        price: pricing.both.price,
        marketPrice: pricing.both.details.marketPrice,
        testCount: pricing.both.testCount,
        details: pricing
      };
    }
  },

  cancer: {
    id: 'cancer',
    name: 'Marcadores Tumorales',
    description: 'Cribado oncológico con marcadores tumorales específicos expandido: incluye PSA, CA125, CEA, AFP, HE4, SCC, proteína S-100, NSE y otros marcadores avanzados para detección temprana integral.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaSearch,
    benefits: [
      'Detección temprana expandida',
      'Marcadores especializados',
      'Cribado integral',
      'Seguimiento oncológico'
    ],
    biomarkers: [
      { name: "LDH", category: "Enzima celular", code: "B0110", gender: "both", description: "Lactato deshidrogenasa. Enzima de daño celular presente en corazón, hígado, músculos y glóbulos rojos." },
      { name: "FSH", category: "Gonadotropina", code: "B5380", gender: "female", description: "Estimula desarrollo folicular y espermatogénesis. Marcador de reserva reproductiva." },
      { name: "β-HCG", category: "Gestación / onc.", code: "D1760", gender: "both", description: "Gonadotropina coriónica humana beta. Marcador de embarazo y ciertos tumores testiculares y ováricos." },
      { name: "Urianálisis + sedimento", category: "Riñón, Vías urinarias", code: "6897", gender: "both", description: "Análisis completo de orina. Detecta infecciones, proteinuria, hematuria y células anormales." },
      { name: "Sangre oculta en heces", category: "Cribado CCR", code: "M0010", gender: "both", description: "Detección de sangre microscópica en heces. Cribado para cáncer colorrectal y pólipos." },
      { name: "Alfa-feto (AFP)", category: "Tumor hepático", code: "B7900", gender: "both", description: "Alfafetoproteína. Marcador de cáncer hepático y tumores de células germinales." },
      { name: "PSA total", category: "Próstata", code: "B5830", gender: "male", description: "Antígeno prostático específico total. Cribado para cáncer de próstata e hiperplasia benigna." },
      { name: "PSA libre", category: "Próstata", code: "B5840", gender: "male", description: "Fracción libre de PSA. Mejora especificidad para distinguir cáncer de hiperplasia benigna." },
      { name: "CEA", category: "Tumor digestivo", code: "B5110", gender: "both", description: "Antígeno carcinoembrionario. Marcador de cánceres digestivos, especialmente colorrectal." },
      { name: "CA 125", category: "Ovario", code: "B5080", gender: "both", description: "Marcador tumoral de cáncer de ovario. También elevado en endometriosis y otras condiciones." },
      { name: "CA 15.3", category: "Mama", code: "B5090", gender: "both", description: "Marcador tumoral de cáncer de mama. Útil para monitoreo de tratamiento y recurrencia." },
      { name: "CA 19-9", category: "Páncreas", code: "B5100", gender: "both", description: "Marcador tumoral de cáncer pancreático y biliar. También elevado en pancreatitis." },
      { name: "Proteína Epididimal Humana 4 (HE4)", category: "Ovario", code: "B8110", gender: "female", description: "Marcador tumoral de cáncer de ovario más específico que CA125." },
      { name: "Células escamosas Ag (SCC)", category: "Escamoso", code: "B8130", gender: "both", description: "Antígeno de células escamosas. Marcador de carcinomas escamosos de cérvix, pulmón y esófago." },
      { name: "Proteina s-100", category: "Melanoma", code: "I5080", gender: "both", description: "Proteína S-100. Marcador de melanoma y tumores del sistema nervioso." },
      { name: "NSE", category: "Neuroendocrino", code: "I5090", gender: "both", description: "Enolasa neuroespecífica. Marcador de tumores neuroendocrinos y cáncer de pulmón de células pequeñas." },
      { name: "CYFRA 21-1", category: "Pulmón", code: "B8120", gender: "both", description: "Fragmento de citoqueratina 21-1. Marcador de cáncer de pulmón no microcítico." },
      { name: "CA 72-4", category: "Gástrico", code: "D1271", gender: "both", description: "Marcador tumoral de cáncer gástrico y otros adenocarcinomas." },
      { name: "Péptido liberador gastrina (ProGRP)", category: "Pulmón", code: "B8160", gender: "both", description: "Pro-péptido liberador de gastrina. Marcador específico de cáncer de pulmón microcítico." }
    ],
    
    // Función para obtener precios dinámicos por género
    getPricing() {
      const pricing = calculateAddOnPrice(this.biomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: pricing.male.testCount
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: pricing.female.testCount
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: pricing.both.testCount
        },
        details: pricing
      };
    }
  },

  bioage: {
    id: 'bioage',
    name: 'Edad Biológica',
    description: 'Evalúa edad biológica mediante prueba epigenética MyEpiAgeing y fertilidad con AMH/espermiograma para determinar tu edad reproductiva y biológica real. Guía estrategias antienvejecimiento precisas.',
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaClock,
    benefits: [
      'Edad biológica epigenética',
      'Fertilidad y reproducción',
      'Antienvejecimiento personalizado',
      'Evaluación de longevidad'
    ],
    biomarkers: [
      { name: "MyEpiAgeing", category: "Edad epigenética", code: "OG001", gender: "both", description: "Prueba epigenética de edad biológica. Mide metilación del ADN para determinar edad biológica real." },
      { name: "AMH", category: "Reserva ovárica", code: "D1001", gender: "female", description: "Hormona antimülleriana. Marcador de reserva ovárica y fertilidad femenina." },
      { name: "Espermiograma", category: "Fertilidad masculina", code: "B3340", gender: "male", description: "Análisis completo del semen utilizado para medir la edad biológica masculina. Evalúa concentración, motilidad y morfología espermática como marcadores de envejecimiento reproductivo." },
      { name: "Longitud telomérica", category: "Envejecimiento celular", code: "G1465", gender: "both", description: "Medición de la longitud de los telómeros. Biomarcador directo del envejecimiento celular y predictor de longevidad.", isOptional: true }
    ],
    
    // Función para obtener precios dinámicos por género
    getPricing() {
      // Filtrar solo biomarcadores obligatorios para el precio base
      const mandatoryBiomarkers = this.biomarkers.filter(b => !b.isOptional);
      const pricing = calculateAddOnPrice(mandatoryBiomarkers, 'addon');
      return {
        male: {
          price: pricing.male.price,
          marketPrice: pricing.male.details.marketPrice,
          testCount: pricing.male.testCount
        },
        female: {
          price: pricing.female.price,
          marketPrice: pricing.female.details.marketPrice,
          testCount: pricing.female.testCount
        },
        both: {
          price: pricing.both.price,
          marketPrice: pricing.both.details.marketPrice,
          testCount: pricing.both.testCount
        },
        details: pricing
      };
    }
  }
};

// Funciones auxiliares para filtrar por género - EXACTAMENTE como en biomarkers.js
export const filterBiomarkersByGender = (biomarkers, gender) => {
  return biomarkers.filter(biomarker => 
    biomarker.gender === 'both' || biomarker.gender === gender
  );
};

export const getPackageTestCount = (packageData, gender) => {
  if (packageData.biomarkers) {
    return filterBiomarkersByGender(packageData.biomarkers, gender).length;
  }
  // Usar precios dinámicos si están disponibles
  if (packageData.getPricing) {
    const pricing = packageData.getPricing(gender);
    return pricing.testCount;
  }
  return packageData.testCount || 0;
};

export const getAddOnPackagesForGender = (gender) => {
  const filteredPackages = {};
  Object.entries(addOnPackages).forEach(([key, packageData]) => {
    const filteredBiomarkers = filterBiomarkersByGender(packageData.biomarkers, gender);
    const pricing = getPackagePricing(packageData, gender);
    
    filteredPackages[key] = {
      ...packageData,
      biomarkers: filteredBiomarkers,
      testCount: pricing.testCount,
      price: pricing.price,
      pricePerTest: pricing.pricePerTest || (pricing.price / pricing.testCount)
    };
  });
  return filteredPackages;
};

/**
 * Obtiene precios dinámicos para cualquier paquete
 * Compatible con el sistema dinámico de precios
 * @param {object} packageData - Datos del paquete (Essential o Add-On)
 * @param {string} gender - Género ('male', 'female', 'both')
 * @returns {object} - Datos de precio formateados
 */
export const getPackagePricing = (packageData, gender = 'both') => {
  if (!packageData || !packageData.getPricing) {
    console.warn('Package data inválido o sin método getPricing:', packageData);
    return {
      price: 0,
      marketPrice: 0,
      testCount: 0
    };
  }

  try {
    const pricing = packageData.getPricing();
    
    // Si el paquete tiene precios por género
    if (pricing[gender]) {
      return {
        price: pricing[gender].price,
        marketPrice: pricing[gender].marketPrice || pricing[gender].price,
        testCount: pricing[gender].testCount
      };
    }
    
    // Si solo tiene precio general
    if (pricing.price !== undefined) {
      return {
        price: pricing.price,
        marketPrice: pricing.marketPrice || pricing.price,
        testCount: pricing.testCount
      };
    }
    
    // Fallback por si no encuentra el género específico
    const fallbackGender = gender === 'male' ? 'female' : 'male';
    if (pricing[fallbackGender]) {
      return {
        price: pricing[fallbackGender].price,
        marketPrice: pricing[fallbackGender].marketPrice || pricing[fallbackGender].price,
        testCount: pricing[fallbackGender].testCount
      };
    }
    
    return {
      price: 0,
      marketPrice: 0,
      testCount: 0
    };
  } catch (error) {
    console.error('Error calculando precio del paquete:', error);
    return {
      price: 0,
      marketPrice: 0,
      testCount: 0
    };
  }
};

/**
 * Calcula precio total de múltiples add-ons
 * @param {Array} selectedAddOns - Array de IDs de add-ons seleccionados
 * @param {string} gender - Género para cálculo
 * @returns {object} - Precio total y detalles
 */
export const calculateSelectedAddOnsPrice = (selectedAddOns, gender = 'both') => {
  let totalPrice = 0;
  let totalTests = 0;
  const details = [];
  
  selectedAddOns.forEach(addOnId => {
    const addOn = addOnPackages[addOnId];
    if (addOn) {
      const pricing = getPackagePricing(addOn, gender);
      totalPrice += pricing.price;
      totalTests += pricing.testCount;
      details.push({
        id: addOnId,
        name: addOn.name,
        price: pricing.price,
        testCount: pricing.testCount
      });
    }
  });
  
  return {
    totalPrice: Math.round(totalPrice),
    totalTests,
    averagePerTest: totalTests > 0 ? Math.round((totalPrice / totalTests) * 100) / 100 : 0,
    details
  };
}; 