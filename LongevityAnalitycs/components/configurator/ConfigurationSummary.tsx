import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { useEffect, useState } from 'react';

export function ConfigurationSummary() {
  const { 
    selectedProfile, 
    selectedGender, 
    selectedAddOns, 
    totalBiomarkers, 
    totalPrice, 
    totalPvp, 
    savings,
    isLoading,
    error,
    excludedBiomarkers
  } = useConfiguratorStore();

  const [debugInfo, setDebugInfo] = useState(null);

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

  // Debug: Calcular precios manualmente para verificar (considerando exclusiones)
  useEffect(() => {
    if (selectedProfile && selectedAddOns.length > 0) {
      const profilePricing = selectedProfile.pricing[selectedGender];
      let addOnsTotal = 0;
      let addOnsPvpTotal = 0;
      let addOnsOriginalTotal = 0;
      
      selectedAddOns.forEach(addon => {
        const addonPricing = addon.pricing[selectedGender];
        // Precio original (sin exclusiones)
        addOnsOriginalTotal += addonPricing.precio;
        
        // Precio ajustado (con exclusiones) - cálculo proporcional simple
        const excludedCount = (excludedBiomarkers[addon.id] || []).length;
        const totalBiomarkers = addon.biomarkersCount[selectedGender];
        const activeBiomarkers = Math.max(0, totalBiomarkers - excludedCount);
        const proportion = totalBiomarkers > 0 ? activeBiomarkers / totalBiomarkers : 1;
        
        addOnsTotal += addonPricing.precio * proportion;
        addOnsPvpTotal += addonPricing.pvp * proportion;
      });

      const manualTotal = profilePricing.precio + addOnsTotal;
      const manualPvpTotal = profilePricing.pvp + addOnsPvpTotal;
      const originalTotal = profilePricing.precio + addOnsOriginalTotal;

      setDebugInfo({
        profilePrice: profilePricing.precio,
        addOnsPrice: addOnsTotal,
        addOnsOriginalPrice: addOnsOriginalTotal,
        manualTotal,
        originalTotal,
        storeTotal: totalPrice,
        profilePvp: profilePricing.pvp,
        addOnsPvp: addOnsPvpTotal,
        manualPvpTotal,
        storePvpTotal: totalPvp,
        difference: Math.abs(manualTotal - totalPrice),
        pvpDifference: Math.abs(manualPvpTotal - totalPvp)
      });
    } else {
      setDebugInfo(null);
    }
  }, [selectedProfile, selectedAddOns, selectedGender, totalPrice, totalPvp]);

  return (
    <div className="space-y-4">
      {/* Loading indicator */}
      {isLoading && (
        <div className="text-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-xs text-gray-500 mt-1">Calculando precios...</p>
        </div>
      )}

      {/* Error indicator */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-700">{error}</p>
        </div>
      )}

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
        {selectedProfile && (
          <p className="text-xs text-gray-500">
            {formatPrice(selectedProfile.pricing[selectedGender].precio)}
          </p>
        )}
      </div>

      {/* Add-ons */}
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-1">
          Add-ons ({selectedAddOns.length})
        </h4>
        {selectedAddOns.length > 0 ? (
          <div className="space-y-1">
            {selectedAddOns.map((addon) => (
              <div key={addon.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{addon.name}</span>
                <span className="text-gray-600">
                  {formatPrice(addon.pricing[selectedGender].precio)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Ninguno seleccionado</p>
        )}
      </div>

             {/* Debug Info - Solo en desarrollo */}
       {process.env.NODE_ENV === 'development' && debugInfo && (
         <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
           <h5 className="text-xs font-medium text-blue-800 mb-2">Debug Info</h5>
           <div className="text-xs text-blue-700 space-y-1">
             <div>Perfil: {formatPrice(debugInfo.profilePrice)}</div>
             <div>Add-ons (original): {formatPrice(debugInfo.addOnsOriginalPrice)}</div>
             <div>Add-ons (ajustado): {formatPrice(debugInfo.addOnsPrice)}</div>
             <div>Manual Total: {formatPrice(debugInfo.manualTotal)}</div>
             <div>Store Total: {formatPrice(debugInfo.storeTotal)}</div>
             <div className={debugInfo.difference > 0.01 ? 'text-red-600 font-medium' : 'text-green-600'}>
               Diferencia: {formatPrice(debugInfo.difference)}
             </div>
           </div>
         </div>
       )}

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