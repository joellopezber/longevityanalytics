/**
 * CONFIGURATOR STORE
 * Estado global para el configurador de paquetes usando Zustand
 * Integrado con nuestro sistema centralizado de datos y API
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  profilesAPI,
  addonsAPI,
  pricingAPI,
  getCompleteConfiguration,
  getRecommendedAddons
} from '@/lib/api-client';

export type Gender = 'male' | 'female';

// Tipos actualizados para nuestro sistema centralizado
export interface Profile {
  id: string;
  name: string;
  description: string;
  biomarkers: string[];
  pricing: {
    male: { precio: number; pvp: number; };
    female: { precio: number; pvp: number; };
  };
  biomarkersCount: {
    male: number;
    female: number;
  };
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  category: string;
  biomarkers: string[];
  pricing: {
    male: { precio: number; pvp: number; };
    female: { precio: number; pvp: number; };
  };
  biomarkersCount: {
    male: number;
    female: number;
  };
}

export interface ConfiguratorState {
  // Estado actual
  selectedProfile: Profile | null;
  selectedGender: Gender;
  selectedAddOns: AddOn[];
  excludedBiomarkers: { [addonId: string]: string[] }; // biomarcadores excluidos por add-on
  currentStep: number;
  
  // Datos calculados
  totalBiomarkers: number;
  totalPrice: number;
  totalPvp: number;
  savings: number;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  setProfile: (profile: Profile) => void;
  setGender: (gender: Gender) => void;
  toggleAddOn: (addon: AddOn) => void;
  removeAddOn: (addonId: string) => void;
  clearAddOns: () => void;
  toggleBiomarkerExclusion: (addonId: string, biomarkerId: string) => void;
  clearExcludedBiomarkers: (addonId: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  
  // Funciones de cálculo usando API
  calculateTotals: () => Promise<void>;
  getCompatibleAddOns: () => Promise<AddOn[]>;
  isAddOnSelected: (addonId: string) => boolean;
  canAddMoreAddOns: () => boolean;
  
  // Funciones de API
  loadProfiles: () => Promise<Profile[]>;
  loadAddOns: () => Promise<AddOn[]>;
}

const INITIAL_STATE = {
  selectedProfile: null,
  selectedGender: 'male' as Gender,
  selectedAddOns: [],
  excludedBiomarkers: {},
  currentStep: 1,
  totalBiomarkers: 0,
  totalPrice: 0,
  totalPvp: 0,
  savings: 0,
  isLoading: false,
  error: null,
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setProfile: (profile: Profile) => {
        set({ selectedProfile: profile, selectedAddOns: [], excludedBiomarkers: {} });
        get().calculateTotals();
      },

      setGender: (gender: Gender) => {
        set({ selectedGender: gender });
        get().calculateTotals();
      },

      toggleAddOn: (addon: AddOn) => {
        const { selectedAddOns, isAddOnSelected } = get();
        
        if (isAddOnSelected(addon.id)) {
          // Remover add-on
          set({
            selectedAddOns: selectedAddOns.filter(a => a.id !== addon.id)
          });
        } else {
          // Agregar add-on
          set({
            selectedAddOns: [...selectedAddOns, addon]
          });
        }
        
        get().calculateTotals();
      },

      removeAddOn: (addonId: string) => {
        const { selectedAddOns } = get();
        set({
          selectedAddOns: selectedAddOns.filter(a => a.id !== addonId)
        });
        get().calculateTotals();
      },

      clearAddOns: () => {
        set({ selectedAddOns: [], excludedBiomarkers: {} });
        get().calculateTotals();
      },

      toggleBiomarkerExclusion: (addonId: string, biomarkerId: string) => {
        const { excludedBiomarkers } = get();
        const currentExcluded = excludedBiomarkers[addonId] || [];
        
        if (currentExcluded.includes(biomarkerId)) {
          // Remover de excluidos
          set({
            excludedBiomarkers: {
              ...excludedBiomarkers,
              [addonId]: currentExcluded.filter(id => id !== biomarkerId)
            }
          });
        } else {
          // Agregar a excluidos
          set({
            excludedBiomarkers: {
              ...excludedBiomarkers,
              [addonId]: [...currentExcluded, biomarkerId]
            }
          });
        }
        
        get().calculateTotals();
      },

      clearExcludedBiomarkers: (addonId: string) => {
        const { excludedBiomarkers } = get();
        const newExcluded = { ...excludedBiomarkers };
        delete newExcluded[addonId];
        
        set({ excludedBiomarkers: newExcluded });
        get().calculateTotals();
      },

      setStep: (step: number) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        const { currentStep } = get();
        set({ currentStep: Math.min(currentStep + 1, 4) });
      },

      prevStep: () => {
        const { currentStep } = get();
        set({ currentStep: Math.max(currentStep - 1, 1) });
      },

      reset: () => {
        set(INITIAL_STATE);
      },

      // Cálculo usando nuestro sistema centralizado
      calculateTotals: async () => {
        const { selectedProfile, selectedGender, selectedAddOns, excludedBiomarkers } = get();
        
        if (!selectedProfile) {
          set({
            totalBiomarkers: 0,
            totalPrice: 0,
            totalPvp: 0,
            savings: 0
          });
          return;
        }

        try {
          set({ isLoading: true, error: null });

          // Si hay exclusiones, usar cálculo manual directo
          const hasExclusions = Object.keys(excludedBiomarkers).some(
            addonId => excludedBiomarkers[addonId].length > 0
          );

          if (hasExclusions) {
            // Calcular manualmente cuando hay exclusiones - saltar al catch sin error
            throw new Error('MANUAL_CALCULATION');
          }

          // Usar nuestra API de pricing para cálculos exactos (solo si no hay exclusiones)
          const pricingData = await pricingAPI.calculateIncremental(
            selectedProfile.id,
            selectedAddOns.map(a => a.id),
            selectedGender
          );

          set({
            totalBiomarkers: pricingData.final.totalBiomarkers,
            totalPrice: pricingData.final.pricing.precio,
            totalPvp: pricingData.final.pricing.pvp,
            savings: pricingData.final.pricing.discount,
            isLoading: false
          });

        } catch (error) {
          // Solo mostrar error si no es un cálculo manual esperado
          if (error instanceof Error && error.message !== 'MANUAL_CALCULATION') {
            console.error('Error calculating totals:', error);
          }
          
          // Fallback: cálculo manual con precios ajustados por exclusiones
          const profilePricing = selectedProfile.pricing[selectedGender];
          const profileBiomarkers = selectedProfile.biomarkersCount[selectedGender];
          
          // Verificar si hay exclusiones
          const hasExclusions = Object.keys(excludedBiomarkers).some(
            addonId => excludedBiomarkers[addonId].length > 0
          );
          
          let addOnsTotalPrice = 0;
          let addOnsTotalPvp = 0;
          let addOnsTotalBiomarkers = 0;
          
          // Calcular precio de cada add-on considerando exclusiones
          for (const addon of selectedAddOns) {
            const excludedCodes = excludedBiomarkers[addon.id] || [];
            
            try {
              // Verificar que el addon tenga biomarcadores
              if (!addon.biomarkers || !Array.isArray(addon.biomarkers)) {
                console.warn('Add-on sin biomarcadores válidos:', addon.id);
                continue;
              }
              
              // Intentar calcular precio real basado en biomarcadores activos
              const activeBiomarkers = addon.biomarkers.filter(code => !excludedCodes.includes(code));
              
              const response = await fetch('/api/pricing', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  codes: activeBiomarkers,
                  gender: selectedGender
                })
              });

              if (response.ok) {
                const data = await response.json();
                addOnsTotalPrice += data.pricing?.precio || 0;
                addOnsTotalPvp += data.pricing?.pvp || 0;
                addOnsTotalBiomarkers += activeBiomarkers.length;
              } else {
                // Si falla la API, usar precio proporcional
                const addonPricing = addon.pricing?.[selectedGender];
                const addonBiomarkers = addon.biomarkersCount?.[selectedGender];
                
                if (addonPricing && typeof addonBiomarkers === 'number') {
                  const activeBiomarkersCount = Math.max(0, addonBiomarkers - excludedCodes.length);
                  const proportion = addonBiomarkers > 0 ? activeBiomarkersCount / addonBiomarkers : 0;
                  
                  addOnsTotalPrice += (addonPricing.precio || 0) * proportion;
                  addOnsTotalPvp += (addonPricing.pvp || 0) * proportion;
                  addOnsTotalBiomarkers += activeBiomarkersCount;
                }
              }
            } catch (apiError) {
              console.error('Error calculating addon price:', apiError);
              // Fallback final: precio proporcional
              const addonPricing = addon.pricing?.[selectedGender];
              const addonBiomarkers = addon.biomarkersCount?.[selectedGender];
              
              if (addonPricing && typeof addonBiomarkers === 'number') {
                const activeBiomarkersCount = Math.max(0, addonBiomarkers - excludedCodes.length);
                const proportion = addonBiomarkers > 0 ? activeBiomarkersCount / addonBiomarkers : 0;
                
                addOnsTotalPrice += (addonPricing.precio || 0) * proportion;
                addOnsTotalPvp += (addonPricing.pvp || 0) * proportion;
                addOnsTotalBiomarkers += activeBiomarkersCount;
              }
            }
          }

          // Validar datos del perfil antes del cálculo final
          const finalProfileBiomarkers = profileBiomarkers || 0;
          const finalProfilePrecio = profilePricing?.precio || 0;
          const finalProfilePvp = profilePricing?.pvp || 0;
          
          const finalTotalPrice = finalProfilePrecio + addOnsTotalPrice;
          const finalTotalPvp = finalProfilePvp + addOnsTotalPvp;
          
          set({
            totalBiomarkers: finalProfileBiomarkers + addOnsTotalBiomarkers,
            totalPrice: Math.round(finalTotalPrice * 100) / 100,
            totalPvp: Math.round(finalTotalPvp * 100) / 100,
            savings: Math.round((finalTotalPvp - finalTotalPrice) * 100) / 100,
            isLoading: false,
            error: hasExclusions ? 'Precios ajustados por exclusiones' : null
          });
        }
      },

      // Obtener add-ons compatibles usando nuestra API
      getCompatibleAddOns: async () => {
        const { selectedProfile, selectedGender } = get();
        if (!selectedProfile) return [];
        
        try {
          // Usar la API de add-ons para obtener todos los disponibles
          const addOns = await addonsAPI.getAll({ gender: selectedGender });
          return addOns as AddOn[];
        } catch (error) {
          console.error('Error loading compatible add-ons:', error);
          return [];
        }
      },

      isAddOnSelected: (addonId: string) => {
        const { selectedAddOns } = get();
        return selectedAddOns.some(addon => addon.id === addonId);
      },

      canAddMoreAddOns: () => {
        const { selectedAddOns } = get();
        return selectedAddOns.length < 10; // Límite máximo de add-ons
      },

      // Cargar perfiles usando nuestra API
      loadProfiles: async () => {
        try {
          const profiles = await profilesAPI.getAll();
          return profiles;
        } catch (error) {
          console.error('Error loading profiles:', error);
          set({ error: 'Error cargando perfiles' });
          return [];
        }
      },

      // Cargar add-ons usando nuestra API
      loadAddOns: async () => {
        try {
          const addOns = await addonsAPI.getAll();
          return addOns;
        } catch (error) {
          console.error('Error loading add-ons:', error);
          set({ error: 'Error cargando add-ons' });
          return [];
        }
      }
    }),
    {
      name: 'longevity-configurator',
      partialize: (state) => ({
        selectedProfile: state.selectedProfile,
        selectedGender: state.selectedGender,
        selectedAddOns: state.selectedAddOns,
        excludedBiomarkers: state.excludedBiomarkers,
        currentStep: state.currentStep
      })
    }
  )
); 