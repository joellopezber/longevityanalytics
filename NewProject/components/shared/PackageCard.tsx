/**
 * PACKAGE CARD COMPONENT
 * Componente reutilizable para mostrar tarjetas de paquetes
 * Usado en landing y página de paquetes
 */

'use client';

import { useState } from 'react';

interface PackageCardProps {
  pkg: {
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
  };
  profileData: {
    biomarkers: number;
    male: number;
    female: number;
    pricing: { precio: number; pvp: number; };
  };
  selectedGender: 'male' | 'female';
  onViewBiomarkers: (profileId: string, profileName: string) => void;
  variant?: 'compact' | 'detailed'; // Para diferentes layouts
  showStats?: boolean; // Para mostrar estadísticas adicionales
  showComparison?: boolean; // Para mostrar comparación de géneros
}

export function PackageCard({ 
  pkg, 
  profileData, 
  selectedGender, 
  onViewBiomarkers,
  variant = 'compact',
  showStats = false,
  showComparison = false
}: PackageCardProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const { pricing, biomarkers } = profileData;
  const discount = pricing.pvp > 0 ? Math.round(((pricing.pvp - pricing.precio) / pricing.pvp) * 100) : 0;
  const pricePerBiomarker = biomarkers > 0 ? pricing.precio / biomarkers : 0;

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 overflow-hidden group ${
        pkg.isPopular 
          ? 'border-green-500 ring-2 ring-green-200' 
          : 'border-gray-100 hover:border-green-200'
      }`}
    >
      {/* Header */}
      <div className={`${pkg.bgColor} p-6 ${variant === 'compact' ? 'text-center' : ''} relative`}>
        {pkg.isPopular && (
          <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            {variant === 'compact' ? 'MÁS POPULAR' : 'Más Popular'}
          </div>
        )}
        
        {variant === 'compact' ? (
          // Compact layout (landing)
          <>
            <div className="text-4xl mb-3">{pkg.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{pkg.title}</p>
            
            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(pricing.precio)}
                </span>
                {discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(pricing.pvp)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <div className="text-xs text-green-600 font-medium">
                  Ahorra {discount}%
                </div>
              )}
            </div>
          </>
        ) : (
          // Detailed layout (paquetes page)
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{pkg.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-gray-900">
                {formatPrice(pricing.precio)}
              </div>
              <div className="text-sm opacity-80">
                {formatPrice(pricePerBiomarker)} por biomarcador
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {pkg.description}
        </p>

        {/* Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Biomarcadores:</span>
            <span className={`font-semibold ${pkg.textColor}`}>
              {biomarkers}
            </span>
          </div>
          
          {showStats && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Add-ons disponibles:</span>
                <span className={`font-semibold ${pkg.textColor}`}>
                  {pkg.addOnsCount}
                </span>
              </div>
            </>
          )}
          
          {showComparison && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Hombres:</span>
                <span className={`font-semibold ${selectedGender === 'male' ? pkg.textColor : 'text-gray-500'}`}>
                  {profileData.male}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mujeres:</span>
                <span className={`font-semibold ${selectedGender === 'female' ? pkg.textColor : 'text-gray-500'}`}>
                  {profileData.female}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            {variant === 'compact' ? 'Incluye:' : 'Análisis incluidos:'}
          </h4>
          <ul className="space-y-2">
            {pkg.features.slice(0, variant === 'compact' ? 3 : 4).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-gray-600">{feature}</span>
              </li>
            ))}
            {pkg.features.length > (variant === 'compact' ? 3 : 4) && (
              <li className="text-xs text-gray-500 italic">
                +{pkg.features.length - (variant === 'compact' ? 3 : 4)} análisis más...
              </li>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div>
          <button 
            onClick={() => onViewBiomarkers(pkg.id, pkg.name)}
            className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 ${
              pkg.isPopular
                ? 'bg-gradient-to-r from-green-700 to-green-600 text-white hover:from-green-800 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : `${pkg.bgColor} ${pkg.textColor} hover:bg-opacity-80 shadow-md hover:shadow-lg`
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Ver Biomarcadores</span>
          </button>
        </div>
      </div>
    </div>
  );
} 