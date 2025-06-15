/**
 * ADD-ONS SIMPLIFICADOS
 * Datos de add-ons para el configurador sin dependencias complejas
 */

export interface SimpleAddOn {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
  biomarkersCount: {
    male: number;
    female: number;
    both: number;
  };
  pricing: {
    male: { price: number; pvp: number; };
    female: { price: number; pvp: number; };
    both: { price: number; pvp: number; };
  };
  benefits: string[];
  compatibility: {
    packages: string[];
    exclusions?: string[];
  };
  recommendedFor: string[];
  hasGenderDifferences: boolean;
}

export const ADDONS_DATA: SimpleAddOn[] = [
  {
    id: 'hormonas',
    name: 'Hormonas',
    title: 'Panel Hormonal',
    description: 'Análisis completo de hormonas sexuales, tiroideas y del estrés para optimizar tu equilibrio hormonal.',
    category: 'Endocrino',
    icon: '🧪',
    color: 'pink',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-700',
    biomarkersCount: {
      male: 18,
      female: 22,
      both: 16
    },
    pricing: {
      male: { price: 120, pvp: 150 },
      female: { price: 135, pvp: 170 },
      both: { price: 110, pvp: 140 }
    },
    benefits: [
      'Optimización del rendimiento sexual',
      'Mejora del estado de ánimo',
      'Control del peso corporal',
      'Calidad del sueño',
      'Niveles de energía'
    ],
    compatibility: {
      packages: ['essential', 'performance', 'core', 'advanced']
    },
    recommendedFor: [
      'Problemas de libido',
      'Fatiga crónica',
      'Cambios de humor',
      'Dificultades para perder peso'
    ],
    hasGenderDifferences: true
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular',
    title: 'Riesgo Cardiovascular',
    description: 'Evaluación completa del riesgo cardiovascular con marcadores avanzados de inflamación y coagulación.',
    category: 'Cardiovascular',
    icon: '❤️',
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    biomarkersCount: {
      male: 15,
      female: 15,
      both: 15
    },
    pricing: {
      male: { price: 95, pvp: 120 },
      female: { price: 95, pvp: 120 },
      both: { price: 95, pvp: 120 }
    },
    benefits: [
      'Detección temprana de riesgo cardíaco',
      'Evaluación de inflamación vascular',
      'Optimización del perfil lipídico',
      'Prevención de eventos cardiovasculares'
    ],
    compatibility: {
      packages: ['essential', 'performance', 'core', 'advanced']
    },
    recommendedFor: [
      'Historial familiar cardiovascular',
      'Hipertensión',
      'Colesterol elevado',
      'Deportistas de alto rendimiento'
    ],
    hasGenderDifferences: false
  },
  {
    id: 'antioxidantes',
    name: 'Antioxidantes',
    title: 'Perfil Antioxidante',
    description: 'Medición de tu capacidad antioxidante y niveles de vitaminas clave para combatir el envejecimiento.',
    category: 'Anti-aging',
    icon: '🛡️',
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    biomarkersCount: {
      male: 12,
      female: 12,
      both: 12
    },
    pricing: {
      male: { price: 85, pvp: 110 },
      female: { price: 85, pvp: 110 },
      both: { price: 85, pvp: 110 }
    },
    benefits: [
      'Protección contra el envejecimiento',
      'Mejora de la función inmune',
      'Reducción del estrés oxidativo',
      'Optimización de vitaminas'
    ],
    compatibility: {
      packages: ['essential', 'performance', 'core', 'advanced']
    },
    recommendedFor: [
      'Exposición a contaminación',
      'Estrés crónico',
      'Deportistas intensivos',
      'Prevención del envejecimiento'
    ],
    hasGenderDifferences: false
  },
  {
    id: 'oxidative_cell',
    name: 'Estrés Oxidativo',
    title: 'Estrés Oxidativo',
    description: 'Sistemas enzimáticos antioxidantes y capacidad de defensa celular contra el daño oxidativo.',
    category: 'Anti-aging',
    icon: '⚡',
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    biomarkersCount: {
      male: 4,
      female: 4,
      both: 4
    },
    pricing: {
      male: { price: 65, pvp: 85 },
      female: { price: 65, pvp: 85 },
      both: { price: 65, pvp: 85 }
    },
    benefits: [
      'Evaluación del daño celular',
      'Capacidad antioxidante endógena',
      'Estrategias anti-envejecimiento',
      'Protección contra radicales libres'
    ],
    compatibility: {
      packages: ['essential', 'performance', 'core', 'advanced']
    },
    recommendedFor: [
      'Exposición a contaminación',
      'Estrés crónico',
      'Deportistas intensivos',
      'Prevención del envejecimiento'
    ],
    hasGenderDifferences: false
  },
  {
    id: 'metals',
    name: 'Metales Pesados',
    title: 'Metales Pesados',
    description: 'Análisis de metales pesados tóxicos y minerales esenciales para optimizar tu detoxificación.',
    category: 'Detox',
    icon: '⚗️',
    color: 'slate',
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-700',
    biomarkersCount: {
      male: 20,
      female: 20,
      both: 20
    },
    pricing: {
      male: { price: 140, pvp: 180 },
      female: { price: 140, pvp: 180 },
      both: { price: 140, pvp: 180 }
    },
    benefits: [
      'Detección de toxicidad por metales',
      'Optimización de minerales esenciales',
      'Mejora de la función hepática',
      'Reducción de la carga tóxica'
    ],
    compatibility: {
      packages: ['performance', 'core', 'advanced']
    },
    recommendedFor: [
      'Exposición ocupacional',
      'Síntomas neurológicos',
      'Fatiga inexplicable',
      'Problemas de concentración'
    ],
    hasGenderDifferences: false
  },
  {
    id: 'immunity',
    name: 'Inmunidad',
    title: 'Sistema Inmune',
    description: 'Evaluación completa de tu sistema inmune para optimizar tus defensas naturales.',
    category: 'Inmunología',
    icon: '🛡️',
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    biomarkersCount: {
      male: 14,
      female: 14,
      both: 14
    },
    pricing: {
      male: { price: 105, pvp: 135 },
      female: { price: 105, pvp: 135 },
      both: { price: 105, pvp: 135 }
    },
    benefits: [
      'Fortalecimiento del sistema inmune',
      'Detección de inmunodeficiencias',
      'Optimización de la respuesta inmune',
      'Prevención de infecciones'
    ],
    compatibility: {
      packages: ['essential', 'performance', 'core', 'advanced']
    },
    recommendedFor: [
      'Infecciones recurrentes',
      'Alergias frecuentes',
      'Enfermedades autoinmunes',
      'Estrés crónico'
    ],
    hasGenderDifferences: false
  },
  {
    id: 'digestion',
    name: 'Digestión',
    title: 'Función Digestiva',
    description: 'Análisis completo de la función digestiva y absorción de nutrientes.',
    category: 'Gastroenterología',
    icon: '🍽️',
    color: 'orange',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    biomarkersCount: {
      male: 10,
      female: 10,
      both: 10
    },
    pricing: {
      male: { price: 75, pvp: 95 },
      female: { price: 75, pvp: 95 },
      both: { price: 75, pvp: 95 }
    },
    benefits: [
      'Optimización de la digestión',
      'Detección de intolerancias',
      'Mejora de la absorción',
      'Salud del microbioma'
    ],
    compatibility: {
      packages: ['essential', 'performance', 'core', 'advanced']
    },
    recommendedFor: [
      'Problemas digestivos',
      'Intolerancias alimentarias',
      'Síndrome intestino irritable',
      'Malabsorción'
    ],
    hasGenderDifferences: false
  },
  {
    id: 'cancer',
    name: 'Marcadores Tumorales',
    title: 'Marcadores Tumorales',
    description: 'Panel de marcadores tumorales para detección temprana y seguimiento oncológico.',
    category: 'Oncología',
    icon: '🎯',
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    biomarkersCount: {
      male: 12,
      female: 15,
      both: 10
    },
    pricing: {
      male: { price: 160, pvp: 200 },
      female: { price: 180, pvp: 225 },
      both: { price: 150, pvp: 190 }
    },
    benefits: [
      'Detección temprana de cáncer',
      'Seguimiento oncológico',
      'Evaluación de riesgo',
      'Tranquilidad y prevención'
    ],
    compatibility: {
      packages: ['core', 'advanced']
    },
    recommendedFor: [
      'Historial familiar de cáncer',
      'Seguimiento oncológico',
      'Factores de riesgo elevados',
      'Chequeos preventivos'
    ],
    hasGenderDifferences: true
  },
  {
    id: 'bioage',
    name: 'Edad Biológica',
    title: 'Edad Biológica',
    description: 'Determina tu edad biológica real y descubre qué tan rápido estás envejeciendo.',
    category: 'Anti-aging',
    icon: '⏰',
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    biomarkersCount: {
      male: 25,
      female: 28,
      both: 22
    },
    pricing: {
      male: { price: 200, pvp: 250 },
      female: { price: 220, pvp: 275 },
      both: { price: 190, pvp: 240 }
    },
    benefits: [
      'Conoce tu edad biológica real',
      'Velocidad de envejecimiento',
      'Estrategias anti-aging personalizadas',
      'Seguimiento de mejoras'
    ],
    compatibility: {
      packages: ['core', 'advanced']
    },
    recommendedFor: [
      'Medicina anti-aging',
      'Optimización de longevidad',
      'Seguimiento de tratamientos',
      'Curiosidad científica'
    ],
    hasGenderDifferences: true
  },
  {
    id: 'genome',
    name: 'Análisis Genético',
    title: 'Análisis Genético',
    description: 'Suite completa de análisis genéticos especializados para medicina personalizada.',
    category: 'Genética',
    icon: '🧬',
    color: 'teal',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    biomarkersCount: {
      male: 5,
      female: 5,
      both: 5
    },
    pricing: {
      male: { price: 250, pvp: 320 },
      female: { price: 250, pvp: 320 },
      both: { price: 250, pvp: 320 }
    },
    benefits: [
      'Farmacogenética personalizada',
      'Nutrigenética',
      'Genética deportiva',
      'Detoxificación genética'
    ],
    compatibility: {
      packages: ['core', 'advanced']
    },
    recommendedFor: [
      'Medicina personalizada',
      'Optimización de medicamentos',
      'Nutrición genética',
      'Rendimiento deportivo'
    ],
    hasGenderDifferences: false
  }
];

export const getAddOnById = (id: string): SimpleAddOn | undefined => {
  return ADDONS_DATA.find(addon => addon.id === id);
};

export const getAddOnsByIds = (ids: string[]): SimpleAddOn[] => {
  return ids.map(id => getAddOnById(id)).filter(Boolean) as SimpleAddOn[];
};

export const getAddOnsByPackage = (packageId: string): SimpleAddOn[] => {
  return ADDONS_DATA.filter(addon => 
    addon.compatibility.packages.includes(packageId)
  );
};

export const getAddOnsByCategory = (category: string): SimpleAddOn[] => {
  return ADDONS_DATA.filter(addon => addon.category === category);
};

export const ADDON_CATEGORIES = [
  'Endocrino',
  'Cardiovascular', 
  'Anti-aging',
  'Detox',
  'Inmunología',
  'Gastroenterología',
  'Oncología',
  'Genética'
] as const; 