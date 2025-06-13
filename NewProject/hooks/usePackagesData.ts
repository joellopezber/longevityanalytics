/**
 * PACKAGES DATA HOOK
 * Hook personalizado para manejar datos y lógica común de paquetes
 * Usado en landing y página de paquetes
 */

'use client';

import { useState, useEffect } from 'react';
import { profilesAPI } from '@/lib/api-client';

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
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar perfiles desde la API
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const profilesData = await profilesAPI.getAll();
        setProfiles(profilesData);
      } catch (error) {
        console.error('Error loading profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  // Función para obtener datos del perfil
  const getProfileData = (profileId: string): ProfileData => {
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) return { 
      biomarkers: 0, 
      male: 0, 
      female: 0, 
      pricing: { precio: 0, pvp: 0 } 
    };
    
    // Validación adicional para evitar errores durante pre-rendering
    const pricing = profile.pricing?.[selectedGender];
    const safePricing = pricing && typeof pricing.precio !== 'undefined' 
      ? pricing 
      : { precio: 0, pvp: 0 };
    
    return {
      biomarkers: profile.biomarkersCount?.[selectedGender] || 0,
      male: profile.biomarkersCount?.male || 0,
      female: profile.biomarkersCount?.female || 0,
      pricing: safePricing
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
    getProfileData,
    formatPrice,
    packagesInfo: PACKAGES_INFO
  };
} 