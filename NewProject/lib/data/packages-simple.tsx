/**
 * PAQUETES SIMPLIFICADOS
 * Datos de paquetes para la sección de landing sin dependencias complejas
 */

import React from 'react';

export interface SimplePackage {
  id: string;
  name: string;
  title: string;
  description: string;
  targetAudience: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactElement;
  isPopular?: boolean;
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
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 6h5v2h2V6h1V4H9V1H7v3H4v2zm0 4h8v1H4v-1zm0 2h8v1H4v-1zm0 2h8v1H4v-1z"/>
      </svg>
    ),
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
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/>
      </svg>
    ),
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
    isPopular: true,
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.5 14.25l-5.584 2.718 1.84 3.837C7.234 20.405 9.53 20 12 20c2.47 0 4.766.405 6.244.805l1.84-3.837L14.5 14.25c-1.17.33-2.328.33-3.5 0zM12 14.5c1.438 0 2.562.5 2.562.5L16 13.5c0-1.5-1.79-2.5-4-2.5s-4 1-4 2.5L9.438 15S10.562 14.5 12 14.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
      </svg>
    ),
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
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    ),
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