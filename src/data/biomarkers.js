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
  { name: "PCR (hsCRP)", category: "Inflamación cardiovascular", group: "Essential · Prevenii · Ox · Cardio", code: "B3170", essential: true, gender: "both", description: "Proteína C reactiva ultrasensible. Marcador de inflamación vascular y riesgo cardiovascular." },
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
  description: 'El Essential Analysis examina los biomarcadores fundamentales para dibujar una imagen precisa de tu estado de salud actual e incluye el cálculo de PhenoAge (edad biológica) basado en 9 biomarcadores validados científicamente. Con estos datos podemos anticipar riesgos silenciosos, establecer prioridades terapéuticas y definir si conviene añadir módulos adicionales (add on). Transformando la ciencia analítica en decisiones personalizadas y un plan de acción claro.',
  testCount: 46,
  price: { male: 259, female: 259 },
  pvpPrice: { male: 402.27, female: 383.67 },
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
    'Marcadores inflamatorios',
    'Cálculo de edad biológica'
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
    price: { male: 109, female: 119 },
    pvpPrice: { male: 160.82, female: 162.75 },
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
    description: 'Evalúa el eje hormonal completo (IGF-1, ACTH, función pancreática, hormonas reproductivas) para optimizar metabolismo, crecimiento celular y función endocrina. Identifica disfunciones metabólicas y guía estrategias de longevidad.',
    testCount: 13,
    price: 159,
    pvpPrice: 230.87,
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
      { name: "Estradiol", category: "Hormonas femeninas", code: "B5350", gender: "both", description: "Principal estrógeno. Regula ciclo menstrual, salud ósea y cardiovascular en mujeres." },
      { name: "Prolactina", category: "Hormonas femeninas", code: "B5980", gender: "both", description: "Hormona de la lactancia. Elevada puede suprimir función reproductiva." },
      { name: "LH", category: "Gonadotropina", code: "B5800", gender: "both", description: "Estimula ovulación en mujeres y producción de testosterona en hombres." },
      { name: "FSH", category: "Gonadotropina", code: "B5380", gender: "both", description: "Estimula desarrollo folicular y espermatogénesis. Marcador de reserva reproductiva." },
      { name: "IGF-1", category: "Eje GH/IGF", code: "B6030", gender: "both", description: "Factor de crecimiento insulínico. Mediador de hormona de crecimiento. Importante para longevity y masa muscular." },
      { name: "IGFBP-3", category: "Regula IGF", code: "B6010", gender: "both", description: "Proteína transportadora de IGF-1. Modula actividad de IGF-1 y tiene efectos independientes en longevity." },
      { name: "ACTH", category: "Pituitaria", code: "I6740", gender: "both", description: "Hormona adrenocorticotrópica. Estimula producción de cortisol. Evalúa función del eje hipotálamo-hipófisis-suprarrenal." },
      { name: "VSG", category: "Inflamación", code: "H0020", gender: "both", description: "Velocidad de sedimentación globular. Marcador inespecífico de inflamación sistémica." },
      { name: "Vitamina D 1,25-OH", category: "Hormona calcitriol", code: "D0560", gender: "both", description: "Forma activa de vitamina D. Hormona que regula absorción de calcio y metabolismo óseo." }
    ]
  },

  antioxidantes: {
    id: 'antioxidantes',
    name: 'Antioxidantes',
    description: 'Mide vitaminas antioxidantes (A, E), coenzima Q10 y carotenoides para evaluar tu capacidad de defensa contra el envejecimiento. Personaliza suplementación antioxidante y reduce estrés oxidativo.',
    testCount: 6,
    price: 199,
    pvpPrice: 251.55,
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
      { name: "α-Caroteno", category: "Antioxidante", code: "T1200", gender: "both", description: "Carotenoide antioxidante. Precursor de vitamina A con potente actividad antioxidante." },
      { name: "β-Caroteno", category: "Antioxidante", code: "T1200", gender: "both", description: "Principal precursor de vitamina A. Antioxidante carotenoide que protege contra daño oxidativo." },
      { name: "Coenzima Q10", category: "Energía mitoc.", code: "T2830", gender: "both", description: "Antioxidante mitocondrial esencial. Crucial para producción de energía y protección celular." }
    ]
  },

  oxidative_cell: {
    id: 'oxidative_cell',
    name: 'Estrés Oxidativo Celular',
    description: 'Analiza selenio, vitamina C y marcadores específicos de sistema glutatión para evaluar el envejecimiento a nivel molecular. Optimiza protección celular y previene daño oxidativo acumulativo.',
    testCount: 5,
    price: 199,
    pvpPrice: 224.32,
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
      { name: "Vitamina C", category: "Antioxidante hidrosoluble", code: "T1061", gender: "both", description: "Vitamina antioxidante esencial. Neutraliza radicales libres y regenera otros antioxidantes como vitamina E." },
      { name: "Glutatión reductasa + B2", category: "Sistema glutatión", code: "B7121", gender: "both", description: "Enzima que regenera glutatión reducido. Indicador del estado de vitamina B2 y capacidad antioxidante." },
      { name: "Glutatión peroxidasa", category: "Sistema glutatión", code: "B3015", gender: "both", description: "Enzima antioxidante selenio-dependiente. Protege células del daño oxidativo por peróxidos." },
      { name: "G6PD", category: "Defensa antioxidante", code: "B3041", gender: "both", description: "Glucosa-6-fosfato deshidrogenasa. Enzima clave en defensa antioxidante celular vía NADPH." }
    ]
  },

  inflammation: {
    id: 'inflammation',
    name: 'Inflamación',
    description: 'Mide marcadores de inflamación sistémica (VSG, IL-6, TNF-α) para detectar inflamación crónica silenciosa. Guía estrategias anti-inflamatorias y reduce riesgo de enfermedades crónicas.',
    testCount: 3,
    price: 109,
    pvpPrice: 131.36,
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
    ]
  },

  iv_nutrients: {
    id: 'iv_nutrients',
    name: 'IV & Nutrientes',
    description: 'Analiza oligoelementos (cobre, cromo, selenio, magnesio), vitaminas específicas (C, K1), ácidos grasos omega-3 y balance hidroelectrolítico para optimizar terapias IV y suplementación. Personaliza protocolos nutricionales y mejora absorción de nutrientes.',
    testCount: 8,
    price: 199,
    pvpPrice: 250.51,
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
      { name: "Ácidos grasos %", category: "Estado Ω-3", code: "T2590", gender: "both", description: "Perfil de ácidos grasos omega-3. Evalúa estado nutricional y balance inflamatorio." },
      { name: "Magnesio", category: "Mineral esencial", code: "B1600", gender: "both", description: "Mineral esencial para función muscular, nerviosa y cardiovascular. Cofactor de >300 enzimas." },
      { name: "Cobre", category: "Oligoelemento", code: "B8060", gender: "both", description: "Oligoelemento esencial para formación de colágeno, función inmune y metabolismo del hierro." },
      { name: "Cromo", category: "Metabolismo glucídico", code: "T0500", gender: "both", description: "Oligoelemento que mejora sensibilidad a insulina y metabolismo de glucosa. Importante en diabetes." },
      { name: "Selenio", category: "Antioxidante", code: "T3920", gender: "both", description: "Oligoelemento antioxidante esencial. Cofactor de glutatión peroxidasa. Protege contra estrés oxidativo." },
      { name: "Vitamina K1", category: "Coagulación", code: "T1720", gender: "both", description: "Vitamina liposoluble esencial para coagulación. Cofactor de factores de coagulación." },
      { name: "Vitamina C", category: "Antioxidante hidrosoluble", code: "T1061", gender: "both", description: "Vitamina antioxidante esencial. Neutraliza radicales libres y regenera otros antioxidantes como vitamina E." }
    ]
  },

  metals: {
    id: 'metals',
    name: 'Metales Pesados',
    description: 'Detecta mercurio, plomo, arsénico y cadmio en sangre para identificar toxicidad por metales pesados. Guía protocolos de detoxificación y protege función neurológica y cognitiva.',
    testCount: 4,
    price: 79,
    pvpPrice: 83.56,
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
    price: 139,
    pvpPrice: 143.40,
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
      { name: "Vitamina D 1,25-OH", category: "Hormona calcitriol", code: "B3360", gender: "both", description: "Forma activa de vitamina D. Hormona que regula absorción de calcio y metabolismo óseo." }
    ]
  },

  cardiovascular: {
    id: 'cardiovascular',
    name: 'Cardiovascular Avanzado',
    description: 'Analiza lipoproteínas aterogénicas (Lp(a), VLDL), marcadores de inflamación vascular (PCR), enzimas cardíacas para prevención cardiovascular avanzada. Reduce riesgo de infarto y optimiza salud cardíaca.',
    testCount: 9,
    price: 189,
    pvpPrice: 209.21,
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
      { name: "Ácido láctico", category: "Metabolismo energético", code: "B0750", gender: "both", description: "Producto del metabolismo anaeróbico. Elevado indica hipoxia tisular o disfunción mitocondrial." },
      { name: "LDH", category: "Enzima celular", code: "B0110", gender: "both", description: "Lactato deshidrogenasa. Enzima de daño celular presente en corazón, hígado, músculos y glóbulos rojos." },
      { name: "LDL directo", category: "Perfil lipídico", code: "B1900", gender: "both", description: "LDL colesterol medido directamente. Más preciso que el calculado en casos de triglicéridos elevados." },
      { name: "VLDL", category: "Perfil lipídico", code: "B0190", gender: "both", description: "Lipoproteínas de muy baja densidad. Transportan triglicéridos. Elevadas aumentan riesgo cardiovascular." },
      { name: "Lp(a) *", category: "Riesgo CV", code: "B7700", gender: "both", description: "Lipoproteína aterogénica genéticamente determinada. Factor de riesgo cardiovascular independiente." },
      { name: "Cistatina-C", category: "Filtrado renal", code: "I5047", gender: "both", description: "Marcador de función renal más preciso que creatinina. No se ve afectado por masa muscular." },
      { name: "CK-MB", category: "Enzima miocárdica", code: "B2120", gender: "both", description: "Creatina quinasa específica del miocardio. Marcador de daño cardíaco e infarto." },
      { name: "CPK total", category: "Enzima muscular", code: "B0220", gender: "both", description: "Creatina fosfoquinasa total. Enzima muscular que indica daño o estrés muscular." },
      { name: "PCR (hsCRP)", category: "Inflamación cardiovascular", code: "B3170", gender: "both", description: "Proteína C reactiva ultrasensible. Marcador de inflamación vascular y riesgo cardiovascular." }
    ]
  },

  immunity: {
    id: 'immunity',
    name: 'Inmunidad',
    description: 'Evalúa el sistema inmunológico mediante autoanticuerpos, marcadores de autoinmunidad tiroidea y factores inflamatorios. Detecta enfermedades autoinmunes y optimiza función inmune.',
    testCount: 6,
    price: 79,
    pvpPrice: 89.51,
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
      { name: "Nucleares An (ANA)", category: "Autoinmunidad", code: "I0141", gender: "both", description: "Anticuerpos antinucleares. Screening para enfermedades autoinmunes sistémicas como lupus." },
      { name: "anti-CCP", category: "Artritis", code: "I5072", gender: "both", description: "Anticuerpos anti-péptido citrulinado cíclico. Específicos de artritis reumatoide." },
      { name: "anti-Tg", category: "Tiroides", code: "B6321", gender: "both", description: "Anticuerpos anti-tiroglobulina. Marcador de autoinmunidad tiroidea." },
      { name: "anti-TPO", category: "Tiroides", code: "B6300", gender: "both", description: "Anticuerpos anti-peroxidasa tiroidea. Marcador de tiroiditis autoinmune (Hashimoto)." },
      { name: "Helicobacter pylori IgG An", category: "Infección", code: "B7750", gender: "both", description: "Anticuerpos contra H. pylori. Detecta infección gástrica asociada a úlceras y cáncer gástrico." },
      { name: "Factor reumatoide", category: "Artritis", code: "B3130", gender: "both", description: "Autoanticuerpo presente en artritis reumatoide y otras enfermedades autoinmunes." }
    ]
  },

  digest: {
    id: 'digest',
    name: 'Digestivo',
    description: 'Analiza función digestiva completa: enzimas pancreáticas, permeabilidad intestinal, parásitos, intolerancias alimentarias y ácidos grasos omega-3 para optimizar salud gastrointestinal.',
    testCount: 8,
    price: 269,
    pvpPrice: 323.69,
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaLeaf,
    benefits: [
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
      { name: "Urianálisis + sedimento", category: "Riñón, Vías urinarias", code: "6897", gender: "both", description: "Análisis completo de orina. Detecta infecciones, proteinuria, hematuria y células anormales." },
      { name: "Ova & Parasites stool", category: "Parasitología", code: "M1190", gender: "both", description: "Examen parasitológico de heces. Detecta parásitos intestinales que afectan salud digestiva." },
      { name: "Intolerancia Alimnetaria 200", category: "Intolerancias", code: "P3031", gender: "both", description: "Panel de 200 alimentos para detectar intolerancias alimentarias mediadas por IgG." }
    ]
  },

  gut_gate: {
    id: 'gut_gate',
    name: 'Gut Gate',
    description: 'Análisis avanzado del microbioma intestinal y metaboloma urinario para evaluar diversidad microbiana, permeabilidad intestinal y metabolitos funcionales. Optimiza salud del gut-brain axis.',
    testCount: 2,
    price: 649,
    pvpPrice: 698.00,
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaAtom,
    benefits: [
      'Análisis microbioma',
      'Metabolitos funcionales',
      'Gut-brain axis',
      'Permeabilidad intestinal'
    ],
    biomarkers: [
      { name: "Microbioma", category: "Microbioma intestinal", code: "AB001", gender: "both", description: "Análisis completo de diversidad microbiana intestinal. Evalúa balance de bacterias beneficiosas y patógenas." },
      { name: "Metaboloma - orina", category: "Metabolómica", code: "AB002", gender: "both", description: "Perfil de metabolitos urinarios. Evalúa vías metabólicas y funcionalidad del microbioma." }
    ]
  },

  genome: {
    id: 'genome',
    name: 'Genoma',
    description: 'Análisis genómico completo mediante secuenciación de genoma completo (GWAS) y análisis genético especializado para identificar variantes genéticas, riesgo de enfermedades y farmacogenética.',
    testCount: 2,
    price: 599,
    pvpPrice: 649.00,
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
      { name: "Full Genom (GWAs)", category: "Genoma completo", code: "DL001", gender: "both", description: "Secuenciación de genoma completo que sirve para toda la vida. Analiza todas las variantes genéticas para riesgo de enfermedades y características hereditarias." },
      { name: "Genom Analisis", category: "Análisis genético", code: "GT001", gender: "both", description: "Interpretación especializada del genoma que incluye análisis de suplementos, farmacogenética, nutrigenética y predisposición genética. Recomendaciones personalizadas basadas en tu perfil genético." }
    ]
  },

  coagulation: {
    id: 'coagulation',
    name: 'Coagulación',
    description: 'Analiza sistema de coagulación (fibrinógeno, APTT, INR) para evaluar riesgo trombótico y función hemostática. Optimiza anticoagulación y previene eventos cardiovasculares.',
    testCount: 3,
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
    description: 'Screening oncológico con marcadores tumorales específicos expandido: incluye PSA, CA125, CEA, AFP, HE4, SCC, proteína S-100, NSE y otros marcadores avanzados para detección temprana integral.',
    price: { male: 269, female: 289 },
    pvpPrice: { male: 335.27, female: 332.94 },
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaSearch,
    benefits: [
      'Detección temprana expandida',
      'Marcadores especializados',
      'Screening integral',
      'Seguimiento oncológico'
    ],
    biomarkers: [
      { name: "LDH", category: "Enzima celular", code: "B0110", gender: "both", description: "Lactato deshidrogenasa. Enzima de daño celular presente en corazón, hígado, músculos y glóbulos rojos." },
      { name: "FSH", category: "Gonadotropina", code: "B5380", gender: "female", description: "Estimula desarrollo folicular y espermatogénesis. Marcador de reserva reproductiva." },
      { name: "β-HCG", category: "Gestación / onc.", code: "D1760", gender: "both", description: "Gonadotropina coriónica humana beta. Marcador de embarazo y ciertos tumores testiculares y ováricos." },
      { name: "Urianálisis + sedimento", category: "Riñón, Vías urinarias", code: "6897", gender: "both", description: "Análisis completo de orina. Detecta infecciones, proteinuria, hematuria y células anormales." },
      { name: "Sangre oculta en heces", category: "Cribado CCR", code: "M0010", gender: "both", description: "Detección de sangre microscópica en heces. Screening para cáncer colorrectal y pólipos." },
      { name: "AFP", category: "Tumor hepático", code: "B7900", gender: "both", description: "Alfafetoproteína. Marcador de cáncer hepático y tumores de células germinales." },
      { name: "PSA total", category: "Próstata", code: "B5830", gender: "male", description: "Antígeno prostático específico total. Screening para cáncer de próstata e hiperplasia benigna." },
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
    ]
  },

  bioage: {
    id: 'bioage',
    name: 'Edad Biológica',
    description: 'Evalúa edad biológica mediante test epigenético MyEpiAgeing y fertilidad con AMH/espermiograma para determinar tu edad reproductiva y biológica real. Guía estrategias anti-aging precisas.',
    price: { male: 209, female: 219 },
    pvpPrice: { male: 233.10, female: 249.80 },
    color: 'gradient-warm',
    bgColor: 'bg-warm-50',
    borderColor: 'border-warm',
    textColor: 'text-warm',
    icon: FaClock,
    benefits: [
      'Edad biológica epigenética',
      'Fertilidad y reproducción',
      'Anti-aging personalizado',
      'Longevity assessment'
    ],
    biomarkers: [
      { name: "MyEpiAgeing", category: "Edad epigenética", code: "OG001", gender: "both", description: "Test epigenético de edad biológica. Mide metilación del ADN para determinar edad biológica real." },
      { name: "AMH", category: "Reserva ovárica", code: "D1001", gender: "female", description: "Hormona antimülleriana. Marcador de reserva ovárica y fertilidad femenina." },
      { name: "Espermiograma", category: "Fertilidad masculina", code: "B3340", gender: "male", description: "Análisis completo del semen utilizado para medir la edad biológica masculina. Evalúa concentración, motilidad y morfología espermática como marcadores de envejecimiento reproductivo." }
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
    testCount: 154,
    approach: 'Optimización - Mejora activa',
    focus: 'Optimización de longevity',
    recommendations: 'Protocolos específicos de suplementación, nutrición y estilo de vida',
    frequency: 'Personalizado + seguimiento continuo'
  }
};

// Precios de paquetes Full según CSV
export const fullPackagePrices = {
  male: 1879,
  female: 1899,
  pvp: {
    male: 2565.39,
    female: 2547.53
  }
}; 