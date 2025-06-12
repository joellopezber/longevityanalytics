/**
 * CONFIGURATOR STORE
 * Estado global para el configurador de paquetes usando Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SimplePackage } from '@/lib/data/packages-simple';
import type { SimpleAddOn } from '@/lib/data/addons-simple';

export type Gender = 'male' | 'female' | 'both';

export interface ConfiguratorState {
  // Estado actual
  selectedPackage: SimplePackage | null;
  selectedGender: Gender;
  selectedAddOns: SimpleAddOn[];
  excludedBiomarkers: { [addonId: string]: string[] }; // biomarcadores excluidos por add-on
  currentStep: number;
  
  // Datos calculados
  totalBiomarkers: number;
  totalPrice: number;
  totalPvp: number;
  savings: number;
  
  // Acciones
  setPackage: (pkg: SimplePackage) => void;
  setGender: (gender: Gender) => void;
  toggleAddOn: (addon: SimpleAddOn) => void;
  removeAddOn: (addonId: string) => void;
  clearAddOns: () => void;
  toggleBiomarkerExclusion: (addonId: string, biomarkerId: string) => void;
  clearExcludedBiomarkers: (addonId: string) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  
  // Funciones de cálculo
  calculateTotals: () => void;
  getCompatibleAddOns: () => SimpleAddOn[];
  isAddOnSelected: (addonId: string) => boolean;
  canAddMoreAddOns: () => boolean;
}

const INITIAL_STATE = {
  selectedPackage: null,
  selectedGender: 'both' as Gender,
  selectedAddOns: [],
  excludedBiomarkers: {},
  currentStep: 1,
  totalBiomarkers: 0,
  totalPrice: 0,
  totalPvp: 0,
  savings: 0,
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setPackage: (pkg: SimplePackage) => {
        set({ selectedPackage: pkg });
        get().calculateTotals();
      },

      setGender: (gender: Gender) => {
        set({ selectedGender: gender });
        get().calculateTotals();
      },

      toggleAddOn: (addon: SimpleAddOn) => {
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

      calculateTotals: () => {
        const { selectedPackage, selectedGender, selectedAddOns, excludedBiomarkers } = get();
        
        if (!selectedPackage) {
          set({
            totalBiomarkers: 0,
            totalPrice: 0,
            totalPvp: 0,
            savings: 0
          });
          return;
        }

        // Calcular totales del paquete
        const packagePricing = selectedPackage.pricing[selectedGender];
        const packageBiomarkers = selectedPackage.biomarkersCount[selectedGender];
        
        // Calcular totales de add-ons considerando biomarcadores excluidos
        let addOnsTotalPrice = 0;
        let addOnsTotalPvp = 0;
        let addOnsTotalBiomarkers = 0;
        
        selectedAddOns.forEach(addon => {
          const excludedForThisAddon = excludedBiomarkers[addon.id] || [];
          const excludedCount = excludedForThisAddon.length;
          
          // Calcular precio base del add-on
          const basePrice = addon.pricing[selectedGender].price;
          const basePvp = addon.pricing[selectedGender].pvp;
          const baseBiomarkers = addon.biomarkersCount[selectedGender];
          
          // Si hay biomarcadores excluidos, calcular descuento
          if (excludedCount > 0) {
            // Importar dinámicamente para calcular descuento por biomarcadores excluidos
            try {
              const { getBiomarkersForAddOn } = require('@/lib/data/addon-biomarkers');
              const allBiomarkers = getBiomarkersForAddOn(addon.id, selectedGender);
              
              if (allBiomarkers.length > 0) {
                // Calcular precio de biomarcadores excluidos
                const excludedPrice = excludedForThisAddon.reduce((total, biomarkerId) => {
                  const biomarker = allBiomarkers.find(b => b.id === biomarkerId);
                  return total + (biomarker?.price || 0);
                }, 0);
                
                const excludedPvp = excludedForThisAddon.reduce((total, biomarkerId) => {
                  const biomarker = allBiomarkers.find(b => b.id === biomarkerId);
                  return total + (biomarker?.pvp || 0);
                }, 0);
                
                // Aplicar descuento
                addOnsTotalPrice += Math.max(0, basePrice - excludedPrice);
                addOnsTotalPvp += Math.max(0, basePvp - excludedPvp);
                addOnsTotalBiomarkers += Math.max(0, baseBiomarkers - excludedCount);
              } else {
                // Si no hay datos de biomarcadores, usar valores base
                addOnsTotalPrice += basePrice;
                addOnsTotalPvp += basePvp;
                addOnsTotalBiomarkers += baseBiomarkers;
              }
            } catch (error) {
              // Fallback si hay error al importar
              addOnsTotalPrice += basePrice;
              addOnsTotalPvp += basePvp;
              addOnsTotalBiomarkers += baseBiomarkers;
            }
          } else {
            // Sin exclusiones, usar valores completos
            addOnsTotalPrice += basePrice;
            addOnsTotalPvp += basePvp;
            addOnsTotalBiomarkers += baseBiomarkers;
          }
        });

        // Totales finales
        const totalPrice = packagePricing.price + addOnsTotalPrice;
        const totalPvp = packagePricing.pvp + addOnsTotalPvp;
        const totalBiomarkers = packageBiomarkers + addOnsTotalBiomarkers;
        const savings = totalPvp - totalPrice;

        set({
          totalBiomarkers,
          totalPrice,
          totalPvp,
          savings
        });
      },

      getCompatibleAddOns: () => {
        const { selectedPackage } = get();
        if (!selectedPackage) return [];
        
        // Importar dinámicamente para evitar dependencias circulares
        const { getAddOnsByPackage } = require('@/lib/data/addons-simple');
        return getAddOnsByPackage(selectedPackage.id);
      },

      isAddOnSelected: (addonId: string) => {
        const { selectedAddOns } = get();
        return selectedAddOns.some(addon => addon.id === addonId);
      },

      canAddMoreAddOns: () => {
        const { selectedAddOns } = get();
        return selectedAddOns.length < 10; // Límite máximo de add-ons
      }
    }),
    {
      name: 'longevity-configurator',
      partialize: (state) => ({
        selectedPackage: state.selectedPackage,
        selectedGender: state.selectedGender,
        selectedAddOns: state.selectedAddOns,
        excludedBiomarkers: state.excludedBiomarkers,
        currentStep: state.currentStep
      })
    }
  )
); 