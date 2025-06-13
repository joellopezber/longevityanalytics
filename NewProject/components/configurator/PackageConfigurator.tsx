/**
 * PACKAGE CONFIGURATOR
 * Configurador principal de paquetes con wizard paso a paso
 */

'use client';

import { useState } from 'react';
import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { StepIndicator } from './StepIndicator';
import { PackageSelector } from './PackageSelector';
import { GenderSelector } from './GenderSelector';
import { AddOnSelector } from './AddOnSelector';
import { OrderSummary } from './OrderSummary';

const STEPS = [
  { id: 1, title: 'Género', description: 'Selecciona tu género' },
  { id: 2, title: 'Paquete', description: 'Elige tu paquete base' },
  { id: 3, title: 'Add-ons', description: 'Personaliza tu análisis' },
  { id: 4, title: 'Resumen', description: 'Confirma tu pedido' }
];

export default function PackageConfigurator() {
  const { currentStep, selectedProfile, nextStep, prevStep, reset } = useConfiguratorStore();

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return true; // Gender is always selected (default: 'male')
      case 2:
        return selectedProfile !== null;
      case 3:
        return true; // Add-ons are optional
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <GenderSelector />;
      case 2:
        return <PackageSelector />;
      case 3:
        return <AddOnSelector />;
      case 4:
        return <OrderSummary />;
      default:
        return <GenderSelector />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Configurador <span className="text-green-700">Inteligente</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Crea tu análisis personalizado en 4 sencillos pasos. 
            Te guiaremos para encontrar la combinación perfecta para tus objetivos de salud.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        {/* Main Content */}
        <div className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Current Step */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {STEPS[currentStep - 1].title}
                  </h2>
                  <p className="text-gray-600">
                    {STEPS[currentStep - 1].description}
                  </p>
                </div>
                
                {renderCurrentStep()}
              </div>
            </div>

            {/* Right Column - Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tu Configuración
                </h3>
                <ConfigurationSummary />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <div className="flex space-x-4">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                ← Anterior
              </button>
            )}
            
            <button
              onClick={reset}
              className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Reiniciar
            </button>
          </div>

          <div>
            {currentStep < 4 && (
              <button
                onClick={nextStep}
                disabled={!canProceedToNext()}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  canProceedToNext()
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Siguiente →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de resumen en la sidebar
function ConfigurationSummary() {
  const { 
    selectedProfile, 
    selectedGender, 
    selectedAddOns, 
    totalBiomarkers, 
    totalPrice, 
    totalPvp, 
    savings 
  } = useConfiguratorStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'male': return 'Hombre';
      case 'female': return 'Mujer';
      default: return 'No seleccionado';
    }
  };

  return (
    <div className="space-y-4">

      {/* Gender */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">Género</h4>
        <p className="text-gray-900">{getGenderLabel(selectedGender)}</p>
      </div>

      {/* Package */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">Perfil</h4>
        <p className="text-gray-900">
          {selectedProfile ? selectedProfile.name : 'No seleccionado'}
        </p>
      </div>

      {/* Add-ons */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">
          Add-ons ({selectedAddOns.length})
        </h4>
        {selectedAddOns.length > 0 ? (
          <ul className="space-y-1">
            {selectedAddOns.map((addon) => (
              <li key={addon.id} className="text-sm text-gray-700">
                {addon.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Ninguno seleccionado</p>
        )}
      </div>

      {/* Totals */}
      {selectedProfile && (
        <div className="border-t pt-4 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Biomarcadores:</span>
              <span className="font-medium">{totalBiomarkers}</span>
            </div>
            
            {savings > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">PVP:</span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(totalPvp)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tu precio:</span>
              <span className="font-bold text-green-600">
                {formatPrice(totalPrice)}
              </span>
            </div>
            
            {savings > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-green-600">Ahorras:</span>
                <span className="font-medium text-green-600">
                  {formatPrice(savings)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 