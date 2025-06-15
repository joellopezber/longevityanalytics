/**
 * PACKAGES DATA HOOK
 * Hook personalizado para manejar datos y lógica común de paquetes
 * Conectado con API real para precios dinámicos calculados desde biomarcadores

'use client';

import { useState, useEffect } from 'react';

export interface PackageInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: string;
  isPopular?: boolean;
  addOnsCount: number;
  features: string[];
}

export interface ProfileData {
  biomarkers: number;
  male: number;
  female: number;
  pricing: { precio: number; pvp: number; };
}

export const PACKAGES_INFO: PackageInfo[] = [
  {
    id: 'essential',
    name: 'Essential',
    title: 'Seguimiento Básico',
    description: 'Análisis fundamental para el seguimiento básico de tu salud y bienestar general.',
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: '🔬',
    addOnsCount: 16,
    features: [
      'Perfil lipídico completo',
      'Función hepática',
      'Función renal',
      'Hemograma completo',
      'Marcadores inflamatorios básicos'
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    title: 'Rendimiento Deportivo',
    description: 'Optimización del rendimiento físico y cognitivo para deportistas y profesionales activos.',
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    icon: '⚡',
    addOnsCount: 16,
    features: [
      'Perfil hormonal deportivo',
      'Marcadores de recuperación',
      'Análisis de estrés oxidativo',
      'Vitaminas y minerales',
      'Función cardiovascular avanzada'
    ]
  },
  {
    id: 'core',
    name: 'Core',
    title: 'Centros de Longevidad',
    description: 'Análisis integral diseñado para centros especializados en medicina de longevidad.',
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    isPopular: true,
    icon: '🎯',
    addOnsCount: 11,
    features: [
      'Análisis epigenético',
      'Marcadores de envejecimiento',
      'Perfil hormonal completo',
      'Función mitocondrial',
      'Biomarcadores de longevidad'
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    title: 'Análisis Completo',
    description: 'El análisis más completo disponible, sin dejar nada al azar en tu salud.',
    color: 'amber',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    icon: '🔬',
    addOnsCount: 3,
    features: [
              'Análisis genético',
      'Microbioma intestinal',
      'Marcadores tumorales',
      'Edad biológica',
      'Perfil completo de metales pesados'
    ]
  }
];

export function usePackagesData() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos desde la API real
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Llamada a la API real
        const response = await fetch(`/api/profiles?gender=${selectedGender}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProfiles(data.profiles || []);
        
      } catch (error) {
        console.error('Error loading profiles:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, [selectedGender]); // Recargar cuando cambie el género

  // Función para obtener datos del perfil desde la API
  const getProfileData = (profileId: string): ProfileData => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return { 
      biomarkers: 0, 
      male: 0, 
      female: 0, 
      pricing: { precio: 0, pvp: 0 } 
    };
    
    return {
      biomarkers: profile.biomarkerCount || 0,
      male: profile.biomarkerCount || 0, // Para compatibilidad
      female: profile.biomarkerCount || 0, // Para compatibilidad
      pricing: {
        precio: profile.pricing?.precio || 0,
        pvp: profile.pricing?.pvp || 0
      }
    };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return {
    selectedGender,
    setSelectedGender,
    profiles,
    loading,
    error,
    getProfileData,
    formatPrice,
    packagesInfo: PACKAGES_INFO
  };
} 