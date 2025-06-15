/**
 * ORDER SUMMARY
 * Resumen final del pedido en el configurador
 * VERSIÓN TEMPORAL SIMPLIFICADA - Migración en progreso
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { useOrdersStore } from '@/lib/store/useOrdersStore';

export function OrderSummary() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    selectedProfile, 
    selectedGender, 
    selectedAddOns, 
    totalBiomarkers, 
    totalPrice, 
    totalPvp, 
    savings,
    reset
  } = useConfiguratorStore();
  
  const { saveOrder } = useOrdersStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'male': return 'Hombre';
      case 'female': return 'Mujer';
      default: return 'No seleccionado';
    }
  };

  const handleFinishOrder = async () => {
    if (!selectedProfile) return;
    
    setIsProcessing(true);
    
    try {
      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Preparar datos del pedido para guardar
      const orderData = {
        package: {
          id: selectedProfile.id,
          name: selectedProfile.name,
          title: selectedProfile.name,
          description: selectedProfile.description,
          targetAudience: 'Usuario configurador',
          color: 'green',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          icon: React.createElement('div', { className: 'text-2xl' }, '🧬'),
          biomarkersCount: {
            ...selectedProfile.biomarkersCount,
            both: selectedProfile.biomarkersCount.male + selectedProfile.biomarkersCount.female
          },
          addOnsCount: selectedAddOns.length,
          pricing: {
            male: { 
              price: selectedProfile.pricing.male.precio, 
              pvp: selectedProfile.pricing.male.pvp 
            },
            female: { 
              price: selectedProfile.pricing.female.precio, 
              pvp: selectedProfile.pricing.female.pvp 
            },
            both: { 
              price: (selectedProfile.pricing.male.precio + selectedProfile.pricing.female.precio) / 2, 
              pvp: (selectedProfile.pricing.male.pvp + selectedProfile.pricing.female.pvp) / 2 
            }
          },
          features: [],
          recommendedFor: []
        },
        gender: selectedGender,
        addOns: selectedAddOns.map(addon => ({
          id: addon.id,
          name: addon.name,
          title: addon.name,
          description: addon.description,
          category: 'General',
          icon: '🧬',
          color: 'green',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          biomarkersCount: {
            ...addon.biomarkersCount,
            both: addon.biomarkersCount.male + addon.biomarkersCount.female
          },
          pricing: {
            male: { 
              price: addon.pricing.male.precio, 
              pvp: addon.pricing.male.pvp 
            },
            female: { 
              price: addon.pricing.female.precio, 
              pvp: addon.pricing.female.pvp 
            },
            both: { 
              price: (addon.pricing.male.precio + addon.pricing.female.precio) / 2, 
              pvp: (addon.pricing.male.pvp + addon.pricing.female.pvp) / 2 
            }
          },
          benefits: [],
          compatibility: { packages: [] },
          recommendedFor: [],
          hasGenderDifferences: addon.pricing.male.precio !== addon.pricing.female.precio
        })),
        totals: {
          biomarkers: totalBiomarkers,
          price: totalPrice,
          pvp: totalPvp,
          savings: savings
        }
      };
      
      // Guardar el pedido
      const orderId = saveOrder(orderData);
      
      // Limpiar configurador
      reset();
      
      // Redirigir a home con mensaje de éxito y ID del pedido
      router.push(`/?success=true&order=${orderId}`);
      
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      setIsProcessing(false);
    }
  };

  if (!selectedProfile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay perfil seleccionado.</p>
      </div>
    );
  }

  const profilePricing = selectedProfile.pricing[selectedGender];
  const profileBiomarkers = selectedProfile.biomarkersCount[selectedGender];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Tu análisis personalizado está listo!
        </h3>
        <p className="text-gray-600">
          Revisa tu configuración antes de proceder.
        </p>
      </div>

      {/* Profile Summary */}
      <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">🧬</div>
          <div>
            <h4 className="text-xl font-bold text-gray-900">{selectedProfile.name}</h4>
            <p className="text-sm text-gray-600">{selectedProfile.description}</p>
            <p className="text-sm text-green-600 font-medium">
              Configurado para: {getGenderLabel(selectedGender)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{profileBiomarkers}</div>
            <div className="text-xs text-gray-500">Biomarcadores base</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{selectedAddOns.length}</div>
            <div className="text-xs text-gray-500">Add-ons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalBiomarkers}</div>
            <div className="text-xs text-gray-500">Total biomarcadores</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(profilePricing.precio)}
          </div>
          <div className="text-sm text-gray-500">Perfil base</div>
        </div>
      </div>

      {/* Add-ons Summary */}
      {selectedAddOns.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Add-ons seleccionados ({selectedAddOns.length})
          </h4>
          
          <div className="space-y-3">
            {selectedAddOns.map((addon) => {
              const pricing = addon.pricing[selectedGender];
              const biomarkers = addon.biomarkersCount[selectedGender];
              
              return (
                <div key={addon.id} className="flex items-center justify-between bg-white rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="text-xl mr-3">🧬</div>
                    <div>
                      <h5 className="font-medium text-gray-900">{addon.name}</h5>
                      <p className="text-sm text-gray-600">{biomarkers} biomarcadores</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatPrice(pricing.precio)}
                    </div>
                    {pricing.pvp > pricing.precio && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(pricing.pvp)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Precio</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Perfil base ({selectedProfile.name})</span>
            <span>{formatPrice(profilePricing.precio)}</span>
          </div>
          
          {selectedAddOns.length > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Add-ons ({selectedAddOns.length})</span>
              <span>{formatPrice(totalPrice - profilePricing.precio)}</span>
            </div>
          )}
          
          <div className="border-t border-green-200 pt-3">
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            
            {savings > 0 && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>Ahorro sobre PVP</span>
                <span>-{formatPrice(savings)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        <button
          onClick={handleFinishOrder}
          disabled={isProcessing}
          className={`w-full max-w-md py-3 px-6 rounded-lg font-semibold transition-colors ${
            isProcessing
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isProcessing ? 'Guardando pedido...' : 'Finalizar y Guardar Pedido'}
        </button>
      </div>

      {/* Info */}
      <div className="text-center text-sm text-gray-500">
        <p>Esta es una demo. Los datos y precios son de ejemplo.</p>
      </div>
    </div>
  );
} 