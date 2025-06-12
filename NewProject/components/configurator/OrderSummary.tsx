/**
 * ORDER SUMMARY
 * Resumen final del pedido en el configurador
 */

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { useOrdersStore } from '@/lib/store/useOrdersStore';

export function OrderSummary() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    selectedPackage, 
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
      case 'both': return 'Unisex';
      default: return 'No seleccionado';
    }
  };

  const handleFinishOrder = async () => {
    if (!selectedPackage) return;
    
    setIsProcessing(true);
    
    try {
      // Guardar el pedido
      const orderId = saveOrder({
        package: selectedPackage,
        gender: selectedGender,
        addOns: selectedAddOns,
        totals: {
          biomarkers: totalBiomarkers,
          price: totalPrice,
          pvp: totalPvp,
          savings: savings
        }
      });

      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpiar configurador
      reset();
      
      // Redirigir a home con mensaje de éxito
      router.push(`/?order=${orderId}&success=true`);
      
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      setIsProcessing(false);
    }
  };

  const handleSaveForLater = () => {
    if (!selectedPackage) return;
    
    const orderId = saveOrder({
      package: selectedPackage,
      gender: selectedGender,
      addOns: selectedAddOns,
      totals: {
        biomarkers: totalBiomarkers,
        price: totalPrice,
        pvp: totalPvp,
        savings: savings
      }
    });

    // Mostrar confirmación y redirigir
    alert('¡Pedido guardado correctamente! Puedes continuar más tarde.');
    reset();
    router.push('/');
  };

  if (!selectedPackage) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hay paquete seleccionado.</p>
      </div>
    );
  }

  const packagePricing = selectedPackage.pricing[selectedGender];
  const packageBiomarkers = selectedPackage.biomarkersCount[selectedGender];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Tu análisis personalizado está listo!
        </h3>
        <p className="text-gray-600">
          Revisa tu configuración antes de proceder al checkout.
        </p>
      </div>

      {/* Package Summary */}
      <div className="bg-white border-2 border-green-200 rounded-2xl p-6">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">{selectedPackage.icon}</div>
          <div>
            <h4 className="text-xl font-bold text-gray-900">{selectedPackage.name}</h4>
            <p className="text-sm text-gray-600">{selectedPackage.title}</p>
            <p className="text-sm text-green-600 font-medium">
              Configurado para: {getGenderLabel(selectedGender)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{packageBiomarkers}</div>
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
            {formatPrice(packagePricing.price)}
          </div>
          <div className="text-sm text-gray-500">Paquete base</div>
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
                    <div className="text-xl mr-3">{addon.icon}</div>
                    <div>
                      <h5 className="font-medium text-gray-900">{addon.name}</h5>
                      <p className="text-sm text-gray-600">{biomarkers} biomarcadores</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      {formatPrice(pricing.price)}
                    </div>
                    {pricing.pvp > pricing.price && (
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
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Resumen de precios</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Paquete {selectedPackage.name}:</span>
            <span className="font-medium">{formatPrice(packagePricing.price)}</span>
          </div>
          
          {selectedAddOns.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Add-ons ({selectedAddOns.length}):</span>
              <span className="font-medium">
                {formatPrice(selectedAddOns.reduce((total, addon) => 
                  total + addon.pricing[selectedGender].price, 0
                ))}
              </span>
            </div>
          )}
          
          {savings > 0 && (
            <>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Precio de mercado:</span>
                  <span className="text-gray-500 line-through">{formatPrice(totalPvp)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 font-medium">Tu descuento:</span>
                  <span className="text-green-600 font-medium">-{formatPrice(savings)}</span>
                </div>
              </div>
            </>
          )}
          
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total a pagar:</span>
              <span className="text-green-600">{formatPrice(totalPrice)}</span>
            </div>
            <div className="text-sm text-gray-500 text-right">
              {formatPrice(totalPrice / totalBiomarkers)} por biomarcador
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-4">¿Qué incluye tu análisis?</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-blue-800">Kit de extracción a domicilio</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-blue-800">Análisis en laboratorio certificado</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-blue-800">Resultados en 48-72h</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-blue-800">Interpretación médica incluida</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-blue-800">Recomendaciones personalizadas</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-blue-800">Soporte post-análisis</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleFinishOrder}
            disabled={isProcessing}
            className="flex-1 bg-green-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : (
              `Finalizar Pedido - ${formatPrice(totalPrice)}`
            )}
          </button>
          
          <button 
            onClick={handleSaveForLater}
            disabled={isProcessing}
            className="flex-1 sm:flex-none sm:px-8 bg-gray-100 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar para después
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Pago seguro • Garantía de satisfacción • Soporte 24/7
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Al finalizar el pedido, se guardará tu configuración y serás redirigido al inicio
          </p>
        </div>
      </div>
    </div>
  );
} 