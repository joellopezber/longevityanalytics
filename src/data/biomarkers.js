/**
 * biomarkers.js
 * Datos de biomarcadores basados en el CSV real
 * Organizado con Essential como paquete principal y Add-Ons especializados
 *
 * ACTUALIZACIÓN DICIEMBRE 2024:
 * - Precios actualizados según CSV "Longevity Analytics_BioMark.xlsx - CP.csv"
 * - Corrección de inconsistencias entre código y datos reales
 * - Mapeo exacto de precios desde la tabla de precios del CSV
 * - Iconos profesionales reemplazando emojis para consistencia visual
 */

// Importar iconos de React Icons
import { 
  FaDna, 
  FaShieldAlt, 
  FaAtom, 
  FaFire, 
  FaPills, 
  FaFlask, 
  FaBone, 
  FaHeart, 
  FaTint, 
  FaClock,
  FaLeaf,
  FaSearch,
  FaDumbbell
} from 'react-icons/fa';

// Importar icono de manzana desde Ant Design Icons
import { AiFillApple } from 'react-icons/ai';

// Función para procesar los datos del CSV y extraer biomarcadores por categoría
const csvData = [
  { name: "Hemograma completo", category: "Hematología, Hematopoyesis, Inmunidad", group: "Essential · Prevenii", code: "H0000", essential: true, gender: "both", description: "Análisis completo de células sanguíneas que evalúa glóbulos rojos, blancos, plaquetas y hemoglobina. Fundamental para detectar anemias, infecciones y trastornos hematológicos." },
  { name: "Hemoglobina A1c", category: "Metabolismo glucídico", group: "Essential · Prevenii", code: "H1420", essential: true, gender: "both", description: "Promedio de glucosa en sangre durante los últimos 2-3 meses. Marcador gold standard para diagnóstico y monitoreo de diabetes y prediabetes." },
  { name: "Glucosa en ayunas", category: "Metabolismo glucídico", group: "Essential · Prevenii", code: "B0000", essential: true, gender: "both", description: "Nivel de azúcar en sangre tras 8-12 horas de ayuno. Screening primario para diabetes y evaluación del metabolismo glucídico." },
  { name: "Albúmina", category: "Función hepática, Nutrición", group: "Essential · Prevenii", code: "B0200", essential: true, gender: "both", description: "Principal proteína del plasma sanguíneo. Indica función hepática, estado nutricional y capacidad de síntesis proteica." },
  { name: "Insulina basal", category: "Resistencia insulínica", group: "Essential · Prevenii · Endocrino", code: "B5600", essential: true, gender: "both", description: "Nivel de insulina en ayunas. Marcador temprano de resistencia insulínica antes de que aparezcan alteraciones en la glucosa." },
  { name: "HOMA-R", category: "Resistencia insulínica", group: "Essential · Prevenii · Endocrino", code: "B6510", essential: true, gender: "both", description: "Índice que evalúa resistencia insulínica combinando glucosa e insulina en ayunas. Predictor de diabetes tipo 2." },
  { name: "BUN (Urea)", category: "Función renal", group: "Essential · Prevenii", code: "B0020", essential: true, gender: "both", description: "Producto de desecho del metabolismo proteico. Evalúa función renal y estado de hidratación." },
  { name: "Creatinina", category: "Función renal", group: "Essential · Prevenii", code: "B0030", essential: true, gender: "both", description: "Producto de desecho muscular. Marcador más específico de función renal que la urea." },
  { name: "Ácido úrico", category: "Purinas, Riñón", group: "Essential · Prevenii", code: "B0250", essential: true, gender: "both", description: "Producto final del metabolismo de purinas. Elevado indica riesgo de gota, cálculos renales y enfermedad cardiovascular." },
  { name: "eGFR", category: "Filtrado glomerular", group: "Essential · Prevenii", code: "B1540", essential: true, gender: "both", description: "Tasa de filtración glomerular estimada. Mide la capacidad de filtrado de los riñones y detecta enfermedad renal temprana." },
  { name: "Ionograma (Na⁺, K⁺, Cl⁻)", category: "Electrolitos", group: "Essential · Prevenii · IV", code: "B1260", essential: true, gender: "both", description: "Electrolitos esenciales para función celular. Sodio, potasio y cloro regulan hidratación, función nerviosa y muscular." },
  { name: "Fosfatasa alcalina (ALP)", category: "Hígado / Hueso", group: "Essential · Prevenii", code: "B1970", essential: true, gender: "both", description: "Enzima presente en hígado y hueso. Elevada indica problemas hepáticos, óseos o obstrucción biliar." },
  { name: "GPT-ALT", category: "Enzimas hepáticas", group: "Essential · Prevenii", code: "B0050", essential: true, gender: "both", description: "Enzima hepática específica. Elevada indica daño o inflamación del hígado. Marcador sensible de hepatotoxicidad." },
  { name: "GOT-AST", category: "Enzimas hepáticas", group: "Essential · Prevenii", code: "B0060", essential: true, gender: "both", description: "Enzima presente en hígado, corazón y músculo. Elevada indica daño celular en estos tejidos." },
  { name: "Bilirrubina total", category: "Hígado, Hemólisis", group: "Essential · Prevenii · Endocrino", code: "B0080", essential: true, gender: "both", description: "Producto de degradación de glóbulos rojos. Elevada indica problemas hepáticos o hemólisis excesiva." },
  { name: "Proteínas totales", category: "Nutrición", group: "Essential", code: "B0240", essential: true, gender: "both", description: "Suma de todas las proteínas sanguíneas. Refleja estado nutricional y función hepática de síntesis proteica." },
  { name: "GGT", category: "Colestasis", group: "Essential · Prevenii", code: "B0070", essential: true, gender: "both", description: "Enzima hepática sensible al alcohol y medicamentos. Marcador de colestasis y daño hepático crónico." },
  { name: "Colesterol total", category: "Perfil lipídico", group: "Essential · Prevenii", code: "B0010", essential: true, gender: "both", description: "Suma de todas las fracciones de colesterol. Marcador básico de riesgo cardiovascular." },
  { name: "Triglicéridos", category: "Perfil lipídico", group: "Essential · Prevenii", code: "B0040", essential: true, gender: "both", description: "Grasas en sangre. Elevados indican riesgo cardiovascular y resistencia insulínica." },
  { name: "HDL-C", category: "Perfil lipídico", group: "Essential · Prevenii", code: "B0170", essential: true, gender: "both", description: "Colesterol 'bueno'. Transporta colesterol desde tejidos al hígado. Protector cardiovascular." },
  { name: "LDL-C", category: "Perfil lipídico", group: "Essential · Prevenii", code: "B0180", essential: true, gender: "both", description: "Colesterol 'malo'. Transporta colesterol a tejidos. Elevado aumenta riesgo cardiovascular." },
  { name: "ApoB", category: "Riesgo CV", group: "Essential · Prevenii", code: "B3110", essential: true, gender: "both", description: "Proteína de partículas aterogénicas (LDL, VLDL). Mejor predictor de riesgo cardiovascular que LDL-colesterol." },
  { name: "ApoA-I", category: "Riesgo CV", group: "Essential · Cardio", code: "B3100", essential: true, gender: "both", description: "Proteína principal del HDL. Facilita transporte reverso de colesterol. Protector cardiovascular." },
  { name: "Lp(a)", category: "Riesgo CV", group: "Essential · Cardio", code: "B7700", essential: true, gender: "both", description: "Lipoproteína aterogénica genéticamente determinada. Factor de riesgo cardiovascular independiente." },
  { name: "Cortisol", category: "Eje HHA", group: "Essential · Prevenii · Hormonas · Endocrino", code: "B5120", essential: true, gender: "both", description: "Hormona del estrés. Regula metabolismo, inmunidad e inflamación. Elevado indica estrés crónico." },
  { name: "DHEA-S", category: "Andrógenos suprarrenales", group: "Essential · Hormonas · Endocrino", code: "B5290", essential: true, gender: "both", description: "Precursor hormonal suprarrenal. Declina con edad. Importante para vitalidad y función cognitiva." },
  { name: "SHBG", category: "Transporte esteroides", group: "Essential · Prevenii · Hormonas · Endocrino", code: "B6020", essential: true, gender: "both", description: "Proteína transportadora de hormonas sexuales. Regula disponibilidad de testosterona y estradiol." },
  { name: "Testosterona total", category: "Hormona general", group: "Essential · Prevenii · Hormonas · Endocrino", code: "B6160", essential: true, gender: "male", description: "Hormona sexual principal en hombres, importante en mujeres. Regula masa muscular, libido y energía." },
  { name: "PTH intacta", category: "Paratiroides", group: "Essential · Prevenii · Bone_Mineral", code: "B5850", essential: true, gender: "both", description: "Hormona paratiroidea. Regula calcio y fósforo. Elevada indica deficiencia de vitamina D o problemas óseos." },
  { name: "Cistatina-C", category: "Filtrado renal", group: "Essential", code: "I5047", essential: true, gender: "both", description: "Marcador de función renal más preciso que creatinina. No se ve afectado por masa muscular." },
  { name: "T3 libre", category: "Tiroides", group: "Essential · Endocrino", code: "B6040", essential: true, gender: "both", description: "Hormona tiroidea activa. Regula metabolismo, temperatura corporal y función cardiovascular." },
  { name: "T4 libre", category: "Tiroides", group: "Essential · Endocrino", code: "B6070", essential: true, gender: "both", description: "Hormona tiroidea precursora. Se convierte en T3 activa en tejidos periféricos." },
  { name: "TSH", category: "Tiroides", group: "Essential · Endocrino", code: "B6130", essential: true, gender: "both", description: "Hormona estimulante del tiroides. Controla la producción de hormonas tiroideas T3 y T4." },
  { name: "PCR (hsCRP)", category: "Inflamación sistémica", group: "Essential · Prevenii · Ox · Cardio", code: "B3170", essential: true, gender: "both", description: "Proteína C reactiva ultrasensible. Marcador de inflamación sistémica y riesgo cardiovascular." },
  { name: "Homocisteína", category: "Metionina / CV", group: "Essential · Prevenii", code: "B5590", essential: true, gender: "both", description: "Aminoácido del metabolismo de metionina. Elevada indica riesgo cardiovascular y deficiencia de B6, B12, folato." },
  { name: "Fósforo", category: "Mineral óseo", group: "Essential · Prevenii · Bone_Mineral", code: "B0120", essential: true, gender: "both", description: "Mineral esencial para huesos, dientes y energía celular. Trabaja junto con calcio y vitamina D." },
  { name: "Calcio total", category: "Mineral óseo", group: "Essential · Prevenii · Bone_Mineral", code: "B0100", essential: true, gender: "both", description: "Mineral fundamental para huesos, contracción muscular, coagulación y función nerviosa." },
  { name: "Magnesio", category: "Mineral neuromuscular", group: "Essential · Prevenii · IV", code: "B1600", essential: true, gender: "both", description: "Cofactor en más de 300 enzimas. Esencial para función muscular, nerviosa y cardiovascular." },
  { name: "Zinc", category: "Inmunidad", group: "Essential · Prevenii · IV", code: "B8050", essential: true, gender: "both", description: "Oligoelemento esencial para inmunidad, cicatrización, función cognitiva y síntesis proteica." },
  { name: "Hierro", category: "Metabolismo hierro", group: "Essential · Prevenii · IV", code: "B0130", essential: true, gender: "both", description: "Mineral esencial para transporte de oxígeno, producción de energía y función cognitiva." },
  { name: "Transferrina", category: "Transporte hierro", group: "Essential · IV", code: "B3210", essential: true, gender: "both", description: "Proteína transportadora de hierro. Refleja capacidad de transporte y estado nutricional del hierro." },
  { name: "Índice saturación transf.", category: "Hierro", group: "Essential · IV", code: "B7260", essential: true, gender: "both", description: "Porcentaje de saturación de transferrina. Indica disponibilidad de hierro para los tejidos." },
  { name: "Ferritina", category: "Depósito hierro", group: "Essential · Prevenii · IV", code: "B5370", essential: true, gender: "both", description: "Proteína de almacenamiento de hierro. Refleja reservas corporales de hierro y puede indicar inflamación." },
  { name: "Vitamina D (25-OH)", category: "Mineral-inmune", group: "Essential · Prevenii · Endocrino · IV", code: "B6180", essential: true, gender: "both", description: "Forma de almacenamiento de vitamina D. Esencial para huesos, inmunidad y función muscular." },
  { name: "Vitamina B12", category: "Hematopoyesis", group: "Essential · Prevenii · IV", code: "B6190", essential: true, gender: "both", description: "Esencial para formación de glóbulos rojos y función neurológica. Deficiencia causa anemia y neuropatía." },
  { name: "Folato", category: "Hematopoyesis", group: "Essential · Prevenii · IV", code: "B5410", essential: true, gender: "both", description: "Vitamina B9. Crucial para síntesis de ADN, formación de glóbulos rojos y desarrollo fetal." }
];

// Paquete Essential (card principal de doble ancho)
export const essentialPackage = {
  id: 'essential',
  name: 'Essential',
  description: 'El Essential Analysis examina los biomarcadores fundamentales para dibujar una imagen precisa de tu estado de salud actual. Con estos datos podemos anticipar riesgos silenciosos, establecer prioridades terapéuticas y definir si conviene añadir módulos adicionales (add on). Transformado la ciencia analitica en decisiones personalizadas y un plan de acción claro.',
  testCount: 46,
  price: { male: 279, female: 279 },
  pvpPrice: { male: 402.27, female: 399.02 },
  color: 'gradient-earth',
  bgColor: 'bg-earth-50',
  borderColor: 'border-earth',
  textColor: 'text-earth',
  icon: FaDna,
  features: [
    'Metabolismo glucídico completo',
    'Función renal y hepática',
    'Perfil lipídico avanzado',
    'Hormonas básicas',
    'Tiroides completo',
    'Minerales esenciales',
    'Marcadores inflamatorios'
  ],
  biomarkers: csvData.filter(item => item.essential),
  targetAudience: 'Ideal para clientes que inician su journey de longevity'
};

// Add-Ons especializados
export const addOnPackages = {
  hormonas: {
    id: 'hormonas',
    name: 'Hormonas Avanzadas',
    description: 'Analiza el perfil hormonal completo (testosterona, estrógenos, progesterona, gonadotropinas) para optimizar vitalidad, libido, masa muscular y equilibrio hormonal. Esencial para terapias de reemplazo hormonal y anti-aging.',
    testCount: 11, // Dinámico: 6 para hombres, 8 para mujeres
    price: { male: 109, female: 119 },
    pvpPrice: { male: 163.68, female: 173.60 },
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
      { name: "Estradiol", category: "Hormonas femeninas", code: "B5350", gender: "female", description: "Principal estrógeno. Regula ciclo menstrual, salud ósea y cardiovascular en mujeres." },
      { name: "Prolactina", category: "Hormonas femeninas", code: "B5980", gender: "female", description: "Hormona de la lactancia. Elevada puede suprimir función reproductiva." },
      { name: "LH", category: "Gonadotropina", code: "B5800", gender: "both", description: "Estimula ovulación en mujeres y producción de testosterona en hombres." },
      { name: "FSH", category: "Gonadotropina", code: "B5380", gender: "both", description: "Estimula desarrollo folicular y espermatogénesis. Marcador de reserva reproductiva." },
      { name: "Testosterona libre", category: "Hormona masculina", code: "D0601", gender: "male", description: "Fracción activa de testosterona no unida a proteínas. Más específica que testosterona total." },
      { name: "Testosterona biodisp.", category: "Hormona masculina", code: "B6480", gender: "male", description: "Testosterona biodisponible. Fracción libre más débilmente unida. Mejor indicador de actividad androgénica." },
      { name: "DHT", category: "Andrógeno potente", code: "D0850", gender: "male", description: "Dihidrotestosterona. Andrógeno más potente. Responsable de características masculinas y alopecia." },
      { name: "Progesterona", category: "Hormona femenina", code: "B5932", gender: "female", description: "Hormona del embarazo y ciclo menstrual. Importante para fertilidad y equilibrio hormonal." },
      { name: "17-OH-Progesterona", category: "Suprarrenal", code: "D0181", gender: "both", description: "Precursor de cortisol y andrógenos. Elevada indica hiperplasia suprarrenal congénita." },
      { name: "AMH", category: "Reserva ovárica", code: "D1001", gender: "female", description: "Hormona antimülleriana. Marcador de reserva ovárica y fertilidad femenina." },
      { name: "Estrona", category: "Estrógeno menopáusico", code: "D0780", gender: "female", description: "Estrógeno predominante en menopausia. Producido principalmente en tejido adiposo." }
    ]
  },

  endocrino: {
    id: 'endocrino',
    name: 'Endocrino',
    description: 'Evalúa el eje hormonal completo (IGF-1, ACTH, función pancreática) para optimizar metabolismo, crecimiento celular y función endocrina. Identifica disfunciones metabólicas y guía estrategias de longevidad.',
    testCount: 7,
    price: 139,
    pvpPrice: 164.42,
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
      { name: "IGF-1", category: "Eje GH/IGF", code: "B6030", gender: "both", description: "Factor de crecimiento insulínico. Mediador de hormona de crecimiento. Importante para longevity y masa muscular." },
      { name: "IGFBP-3", category: "Regula IGF", code: "B6010", gender: "both", description: "Proteína transportadora de IGF-1. Modula actividad de IGF-1 y tiene efectos independientes en longevity." },
      { name: "ACTH", category: "Pituitaria", code: "I6740", gender: "both", description: "Hormona adrenocorticotrópica. Estimula producción de cortisol. Evalúa función del eje hipotálamo-hipófisis-suprarrenal." },
      { name: "Vitamina D 1,25-OH", category: "Activa", code: "D0560", gender: "both", description: "Forma activa de vitamina D (calcitriol). Hormona que regula calcio, inmunidad y expresión génica." },
      { name: "Bilirrubina directa", category: "Hígado", code: "B0260", gender: "both", description: "Bilirrubina conjugada. Específica de función hepática y obstrucción biliar." },
      { name: "Lipasa", category: "Función pancreática", code: "B1980", gender: "both", description: "Enzima pancreática que digiere grasas. Marcador específico de función pancreática exocrina." },
      { name: "Amilasa", category: "Función pancreática", code: "B0350", gender: "both", description: "Enzima que digiere carbohidratos. Producida por páncreas y glándulas salivales." }
    ]
  },

  antioxidantes: {
    id: 'antioxidantes',
    name: 'Antioxidantes',
    description: 'Mide vitaminas antioxidantes (A, C, E), coenzima Q10 y enzimas antioxidantes para evaluar tu capacidad de defensa contra el envejecimiento. Personaliza suplementación antioxidante y reduce estrés oxidativo.',
    testCount: 11, // Actualizado tras remover Selenio, IL-6 y TNF-α
    price: 179,
    pvpPrice: 196.66,
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
      { name: "VSG", category: "Inflamación", code: "H0020", gender: "both", description: "Velocidad de sedimentación globular. Marcador inespecífico de inflamación sistémica y procesos inflamatorios." },
      { name: "Retinol (Vit A)", category: "Antioxidante", code: "T0811", gender: "both", description: "Vitamina A activa. Antioxidante liposoluble esencial para visión, inmunidad y diferenciación celular." },
      { name: "γ-Tocoferol", category: "Antioxidante", code: "T2841", gender: "both", description: "Forma gamma de vitamina E. Antioxidante específico contra radicales de nitrógeno y peroxinitrito." },
      { name: "α-Tocoferol", category: "Antioxidante", code: "T1191", gender: "both", description: "Forma alfa de vitamina E. Principal antioxidante liposoluble que protege membranas celulares." },
      { name: "α-Caroteno", category: "Antioxidante", code: "T1200", gender: "both", description: "Carotenoide antioxidante. Precursor de vitamina A con potente actividad antioxidante." },
      { name: "β-Caroteno", category: "Antioxidante", code: "T1200", gender: "both", description: "Principal precursor de vitamina A. Antioxidante carotenoide que protege contra daño oxidativo." },
      { name: "Coenzima Q10", category: "Energía mitoc.", code: "T2830", gender: "both", description: "Antioxidante mitocondrial esencial. Crucial para producción de energía y protección celular." },
      { name: "Vitamina C", category: "Antioxidante", code: "T1061", gender: "both", description: "Ácido ascórbico. Principal antioxidante hidrosoluble. Esencial para colágeno e inmunidad." },
      { name: "Glutatión reductasa + B2", category: "Antioxidante", code: "B7121", gender: "both", description: "Enzima antioxidante dependiente de vitamina B2. Regenera glutatión oxidado para defensa antioxidante." },
      { name: "Glutatión peroxidasa", category: "Antioxidante", code: "B3015", gender: "both", description: "Enzima antioxidante dependiente de selenio. Neutraliza peróxidos y protege contra estrés oxidativo." },
      { name: "G6PD", category: "Defensa oxidativa", code: "B3041", gender: "both", description: "Glucosa-6-fosfato deshidrogenasa. Enzima clave en defensa antioxidante celular." }
    ]
  },

  oxidative_cell: {
    id: 'oxidative_cell',
    name: 'Estrés Oxidativo Celular',
    description: 'Analiza selenio y marcadores específicos de daño oxidativo celular para evaluar el envejecimiento a nivel molecular. Optimiza protección celular y previene daño oxidativo acumulativo.',
    testCount: 1,
    price: 199,
    pvpPrice: 215.69,
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
      { name: "Selenio", category: "Antioxidante", code: "T3920", gender: "both", description: "Oligoelemento antioxidante esencial. Cofactor de glutatión peroxidasa. Protege contra estrés oxidativo." }
    ]
  },

  inflammation: {
    id: 'inflammation',
    name: 'Inflamación',
    description: 'Mide citocinas inflamatorias (IL-6, TNF-α) y marcadores de inflamación sistémica para detectar inflamación crónica silenciosa. Guía estrategias anti-inflamatorias y reduce riesgo de enfermedades crónicas.',
    testCount: 3,
    price: 109,
    pvpPrice: 126.73,
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaFire,
    benefits: [
      'Detección de inflamación crónica',
      'Evaluación de citocinas',
      'Riesgo cardiovascular',
      'Optimización anti-inflamatoria'
    ],
    biomarkers: [
      { name: "VSG", category: "Inflamación", code: "H0020", gender: "both", description: "Velocidad de sedimentación globular. Marcador inespecífico de inflamación sistémica y procesos inflamatorios." },
      { name: "IL-6", category: "Citocina inflamatoria", code: "B7790", gender: "both", description: "Interleucina-6. Citocina proinflamatoria clave. Elevada en inflamación crónica y envejecimiento." },
      { name: "TNF-α", category: "Citocina inflamatoria", code: "I2081", gender: "both", description: "Factor de necrosis tumoral alfa. Citocina proinflamatoria potente. Implicada en envejecimiento y enfermedades crónicas." }
    ]
  },

  iv_nutrients: {
    id: 'iv_nutrients',
    name: 'IV & Nutrientes',
    description: 'Analiza oligoelementos (cobre, cromo, selenio), vitaminas y balance hidroelectrolítico para optimizar terapias IV y suplementación. Personaliza protocolos nutricionales y mejora absorción de nutrientes.',
    testCount: 7, // Actualizado con los biomarcadores correctos según CSV
    price: 229,
    pvpPrice: 264.10,
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
      { name: "Cobre", category: "Oligoelemento", code: "B8060", gender: "both", description: "Oligoelemento esencial para formación de colágeno, función inmune y metabolismo del hierro." },
      { name: "Cromo", category: "Metabolismo glucídico", code: "T0500", gender: "both", description: "Oligoelemento que mejora sensibilidad a insulina y metabolismo de glucosa. Importante en diabetes." },
      { name: "Selenio", category: "Antioxidante", code: "T3920", gender: "both", description: "Oligoelemento antioxidante esencial. Cofactor de glutatión peroxidasa. Protege contra estrés oxidativo." },
      { name: "Coenzima Q10", category: "Energía mitoc.", code: "T2830", gender: "both", description: "Antioxidante mitocondrial esencial. Crucial para producción de energía y protección celular." },
      { name: "Vitamina K1", category: "Coagulación", code: "T1720", gender: "both", description: "Vitamina liposoluble esencial para coagulación. Cofactor de factores de coagulación." },
      { name: "Vitamina C", category: "Antioxidante", code: "T1061", gender: "both", description: "Ácido ascórbico. Principal antioxidante hidrosoluble. Esencial para colágeno e inmunidad." }
    ]
  },

  metals: {
    id: 'metals',
    name: 'Metales Pesados',
    description: 'Detecta mercurio, plomo, arsénico y cadmio en sangre para identificar toxicidad por metales pesados. Guía protocolos de detoxificación y protege función neurológica y cognitiva.',
    testCount: 4,
    price: 79,
    pvpPrice: 98.30,
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
    ]
  },

  bone_mineral: {
    id: 'bone_mineral',
    name: 'Hueso & Mineral',
    description: 'Evalúa marcadores de formación y reabsorción ósea (ALP ósea, CTX), calcio iónico y vitamina D activa para prevenir osteoporosis y optimizar salud ósea a largo plazo.',
    testCount: 4,
    price: 149,
    pvpPrice: 186.80,
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
      { name: "Vitamina D 1,25-OH", category: "Activa", code: "D0560", gender: "both", description: "Forma activa de vitamina D (calcitriol). Hormona que regula calcio, inmunidad y expresión génica." }
    ]
  },

  cardiovascular: {
    id: 'cardiovascular',
    name: 'Cardiovascular Avanzado',
    description: 'Analiza lipoproteínas aterogénicas (Lp(a), VLDL), marcadores de inflamación vascular y enzimas cardíacas para prevención cardiovascular avanzada. Reduce riesgo de infarto y optimiza salud cardíaca.',
    testCount: 7,
    price: 189,
    pvpPrice: 250.42,
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaHeart,
    benefits: [
      'Prevención cardiovascular avanzada',
      'Optimización lipídica',
      'Reducción de riesgo cardíaco',
      'Monitoreo de inflamación vascular'
    ],
    biomarkers: [
      { name: "VLDL", category: "Perfil lipídico", code: "B0190", gender: "both", description: "Lipoproteínas de muy baja densidad. Transportan triglicéridos. Elevadas aumentan riesgo cardiovascular." },
      { name: "Lp(a)", category: "Riesgo CV", code: "B7700", gender: "both", description: "Lipoproteína aterogénica genéticamente determinada. Factor de riesgo cardiovascular independiente." },
      { name: "Cistatina-C", category: "Filtrado renal", code: "I5047", gender: "both", description: "Marcador de función renal más preciso que creatinina. No se ve afectado por masa muscular." },
      { name: "Ácido láctico", category: "Metabolismo energético", code: "B0750", gender: "both", description: "Producto del metabolismo anaeróbico. Elevado indica hipoxia tisular o disfunción mitocondrial." },
      { name: "CK-MB", category: "Enzima miocárdica", code: "B2120", gender: "both", description: "Creatina quinasa específica del miocardio. Marcador de daño cardíaco e infarto." },
      { name: "CPK total", category: "Enzima muscular", code: "B0220", gender: "both", description: "Creatina fosfoquinasa total. Enzima muscular que indica daño o estrés muscular." },
      { name: "IL-6", category: "Citocina inflamatoria", code: "B7790", gender: "both", description: "Interleucina-6. Citocina proinflamatoria clave. Elevada en inflamación crónica y envejecimiento." },
      { name: "TNF-α", category: "Citocina inflamatoria", code: "I2081", gender: "both", description: "Factor de necrosis tumoral alfa. Citocina proinflamatoria potente. Implicada en envejecimiento y enfermedades crónicas." }
    ]
  },

  gut_health: {
    id: 'gut_health',
    name: 'Gut Health',
    description: 'Evalúa función digestiva (enzimas pancreáticas), ácidos grasos omega-3, parásitos intestinales y metabolismo hepático para optimizar salud del microbioma y absorción de nutrientes.',
    testCount: 6,
    price: 109,
    pvpPrice: 159.65,
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaLeaf,
    benefits: [
      'Salud del microbioma',
      'Función digestiva',
      'Absorción de nutrientes',
      'Inflamación intestinal'
    ],
    biomarkers: [
      { name: "Ácido láctico", category: "Metabolismo energético", code: "B0750", gender: "both", description: "Producto del metabolismo anaeróbico. Elevado indica hipoxia tisular o disfunción mitocondrial." },
      { name: "Bilirrubina directa", category: "Hígado", code: "B0260", gender: "both", description: "Bilirrubina conjugada. Específica de función hepática y obstrucción biliar." },
      { name: "Lipasa", category: "Función pancreática", code: "B1980", gender: "both", description: "Enzima pancreática que digiere grasas. Marcador específico de función pancreática exocrina." },
      { name: "Amilasa", category: "Función pancreática", code: "B0350", gender: "both", description: "Enzima que digiere carbohidratos. Producida por páncreas y glándulas salivales." },
      { name: "Ácidos grasos %", category: "Estado Ω-3", code: "T2590", gender: "both", description: "Perfil de ácidos grasos omega-3. Evalúa estado nutricional y balance inflamatorio." },
      { name: "Ova & Parasites stool", category: "Parasitología", code: "M1190", gender: "both", description: "Examen parasitológico de heces. Detecta parásitos intestinales que afectan salud digestiva." }
    ]
  },

  coagulation: {
    id: 'coagulation',
    name: 'Coagulación',
    description: 'Analiza sistema de coagulación (fibrinógeno, APTT, INR) para evaluar riesgo trombótico y función hemostática. Optimiza anticoagulación y previene eventos cardiovasculares.',
    testCount: 3, // Actualizado tras remover Vitamina K1
    price: 15,
    pvpPrice: 16.74,
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
    ]
  },

  cancer: {
    id: 'cancer',
    name: 'Marcadores Tumorales',
    description: 'Screening oncológico con marcadores tumorales específicos (PSA, CA125, CEA, AFP), análisis de orina y sangre oculta en heces para detección temprana y monitoreo preventivo de cáncer.',
    testCount: 7,
    price: { male: 79, female: 89 },
    pvpPrice: { male: 97.19, female: 104.63 },
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaSearch,
    benefits: [
      'Detección temprana',
      'Monitoreo oncológico',
      'Screening preventivo',
      'Seguimiento post-tratamiento'
    ],
    biomarkers: [
      { name: "β-HCG", category: "Gestación / onc.", code: "D1760", gender: "both", description: "Gonadotropina coriónica humana beta. Marcador de embarazo y ciertos tumores testiculares y ováricos." },
      { name: "Urianálisis + sedimento", category: "Riñón, Vías urinarias", code: "6897", gender: "both", description: "Análisis completo de orina. Detecta infecciones, proteinuria, hematuria y células anormales." },
      { name: "Sangre oculta en heces", category: "Cribado CCR", code: "M0010", gender: "both", description: "Detección de sangre microscópica en heces. Screening para cáncer colorrectal y pólipos." },
      { name: "AFP", category: "Tumor hepático", code: "B7900", gender: "both", description: "Alfafetoproteína. Marcador de cáncer hepático y tumores de células germinales." },
      { name: "CEA", category: "Tumor digestivo", code: "B5110", gender: "both", description: "Antígeno carcinoembrionario. Marcador de cánceres digestivos, especialmente colorrectal." },
      { name: "PSA total", category: "Próstata", code: "B5830", gender: "male", description: "Antígeno prostático específico total. Screening para cáncer de próstata e hiperplasia benigna." },
      { name: "PSA libre", category: "Próstata", code: "B5840", gender: "male", description: "Fracción libre de PSA. Mejora especificidad para distinguir cáncer de hiperplasia benigna." },
      { name: "CA 125", category: "Ovario", code: "B5080", gender: "female", description: "Marcador tumoral de cáncer de ovario. También elevado en endometriosis y otras condiciones." },
      { name: "CA 15.3", category: "Mama", code: "B5090", gender: "female", description: "Marcador tumoral de cáncer de mama. Útil para monitoreo de tratamiento y recurrencia." }
    ]
  },

  bioage: {
    id: 'bioage',
    name: 'Edad Biológica',
    description: 'Evalúa edad biológica y fertilidad mediante AMH (reserva ovárica) y espermiograma para determinar tu edad reproductiva real. Guía estrategias de preservación de fertilidad y anti-aging.',
    testCount: 2,
    price: { male: 29, female: 49 },
    pvpPrice: { male: 34.10, female: 50.80 },
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaClock,
    benefits: [
      'Edad biológica real',
      'Fertilidad y reproducción',
      'Longevity assessment',
      'Anti-aging tracking'
    ],
    biomarkers: [
      { name: "AMH", category: "Reserva ovárica", code: "D1001", gender: "female", description: "Hormona antimülleriana. Marcador de reserva ovárica y fertilidad femenina." },
      { name: "Espermiograma", category: "Fertilidad masculina", code: "B3340", gender: "male", description: "Análisis completo del semen. Evalúa concentración, motilidad y morfología espermática." }
    ]
  }
};

// Funciones auxiliares para filtrar por género
export const filterBiomarkersByGender = (biomarkers, gender) => {
  return biomarkers.filter(biomarker => 
    biomarker.gender === 'both' || biomarker.gender === gender
  );
};

export const getPackageTestCount = (packageData, gender) => {
  if (packageData.biomarkers) {
    return filterBiomarkersByGender(packageData.biomarkers, gender).length;
  }
  return packageData.testCount;
};

export const getEssentialPackageForGender = (gender) => {
  const filteredBiomarkers = filterBiomarkersByGender(essentialPackage.biomarkers, gender);
  return {
    ...essentialPackage,
    biomarkers: filteredBiomarkers,
    testCount: filteredBiomarkers.length
  };
};

export const getAddOnPackagesForGender = (gender) => {
  const filteredPackages = {};
  Object.entries(addOnPackages).forEach(([key, packageData]) => {
    const filteredBiomarkers = filterBiomarkersByGender(packageData.biomarkers, gender);
    filteredPackages[key] = {
      ...packageData,
      biomarkers: filteredBiomarkers,
      testCount: filteredBiomarkers.length
    };
  });
  return filteredPackages;
};

// Datos de comparación competitiva
export const comparisonData = {
  traditional: {
    name: 'Medicina Tradicional',
    testCount: 19,
    approach: 'Reactiva - Espera síntomas',
    focus: 'Diagnóstico de enfermedad',
    recommendations: 'Tratamiento farmacológico',
    frequency: 'Anual si hay síntomas'
  },
  functionHealth: {
    name: 'Function Health',
    testCount: 100,
    approach: 'Preventiva - Detección temprana',
    focus: 'Prevención de enfermedad',
    recommendations: 'Insights generales',
    frequency: 'Anual + seguimiento'
  },
  longevityAnalytics: {
    name: 'Longevity Analytics',
    testCount: 109,
    approach: 'Optimización - Mejora activa',
    focus: 'Optimización de longevity',
    recommendations: 'Protocolos específicos de suplementación, nutrición y estilo de vida',
    frequency: 'Personalizado + seguimiento continuo'
  }
}; 