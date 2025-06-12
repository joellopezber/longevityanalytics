/**
 * PAQUETES SIMPLIFICADOS
 * Datos de paquetes para la sección de landing sin dependencias complejas
 */

export interface SimplePackage {
  id: string;
  name: string;
  title: string;
  description: string;
  targetAudience: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: string;
  biomarkersCount: {
    male: number;
    female: number;
    both: number;
  };
  addOnsCount: number;
  pricing: {
    male: { price: number; pvp: number; };
    female: { price: number; pvp: number; };
    both: { price: number; pvp: number; };
  };
  features: string[];
  recommendedFor: string[];
}

export const PACKAGES_DATA: SimplePackage[] = [
  {
    id: 'essential',
    name: 'Essential',
    title: 'Seguimiento Básico',
    description: 'Análisis fundamental para el seguimiento básico de tu salud y bienestar general.',
    targetAudience: 'Personas que buscan un seguimiento básico de su salud',
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: '🔍',
    biomarkersCount: {
      male: 45,
      female: 47,
      both: 43
    },
    addOnsCount: 16,
    pricing: {
      male: { price: 280, pvp: 350 },
      female: { price: 290, pvp: 365 },
      both: { price: 275, pvp: 340 }
    },
    features: [
      'Perfil lipídico completo',
      'Función hepática',
      'Función renal',
      'Hemograma completo',
      'Marcadores inflamatorios básicos'
    ],
    recommendedFor: [
      'Chequeo anual de rutina',
      'Seguimiento de salud general',
      'Detección temprana de problemas'
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    title: 'Rendimiento Deportivo',
    description: 'Optimización del rendimiento físico y cognitivo para deportistas y profesionales activos.',
    targetAudience: 'Deportistas y personas que buscan optimizar su rendimiento',
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    icon: '⚡',
    biomarkersCount: {
      male: 85,
      female: 88,
      both: 82
    },
    addOnsCount: 16,
    pricing: {
      male: { price: 450, pvp: 580 },
      female: { price: 465, pvp: 595 },
      both: { price: 440, pvp: 565 }
    },
    features: [
      'Perfil hormonal deportivo',
      'Marcadores de recuperación',
      'Análisis de estrés oxidativo',
      'Vitaminas y minerales',
      'Función cardiovascular avanzada'
    ],
    recommendedFor: [
      'Atletas profesionales',
      'Deportistas amateur',
      'Optimización del rendimiento'
    ]
  },
  {
    id: 'core',
    name: 'Core',
    title: 'Centros de Longevidad',
    description: 'Análisis integral diseñado para centros especializados en medicina de longevidad.',
    targetAudience: 'Centros médicos especializados en longevidad y medicina preventiva',
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    icon: '🧬',
    biomarkersCount: {
      male: 120,
      female: 125,
      both: 118
    },
    addOnsCount: 11,
    pricing: {
      male: { price: 680, pvp: 850 },
      female: { price: 695, pvp: 870 },
      both: { price: 665, pvp: 830 }
    },
    features: [
      'Análisis epigenético',
      'Marcadores de envejecimiento',
      'Perfil hormonal completo',
      'Función mitocondrial',
      'Biomarcadores de longevidad'
    ],
    recommendedFor: [
      'Medicina anti-aging',
      'Centros de longevidad',
      'Medicina preventiva avanzada'
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    title: 'Análisis Completo',
    description: 'El análisis más completo disponible, sin dejar nada al azar en tu salud.',
    targetAudience: 'Personas que buscan el análisis más completo posible',
    color: 'amber',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    icon: '🎯',
    biomarkersCount: {
      male: 200,
      female: 205,
      both: 195
    },
    addOnsCount: 3,
    pricing: {
      male: { price: 950, pvp: 1200 },
      female: { price: 970, pvp: 1225 },
      both: { price: 930, pvp: 1175 }
    },
    features: [
      'Análisis genético completo',
      'Microbioma intestinal',
      'Marcadores tumorales',
      'Edad biológica',
      'Perfil completo de metales pesados'
    ],
    recommendedFor: [
      'Análisis exhaustivo',
      'Medicina de precisión',
      'Optimización total de la salud'
    ]
  }
];

export const getPackageById = (id: string): SimplePackage | undefined => {
  return PACKAGES_DATA.find(pkg => pkg.id === id);
};

export const getPackagesByIds = (ids: string[]): SimplePackage[] => {
  return ids.map(id => getPackageById(id)).filter(Boolean) as SimplePackage[];
}; 