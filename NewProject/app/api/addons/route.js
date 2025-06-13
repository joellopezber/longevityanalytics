/**
 * API ENDPOINT: /api/addons
 * Consulta información de add-ons con precios calculados
 */

import { NextResponse } from 'next/server';
import { ADDONS, getBiomarkersForAddon, getAddonsByCategory } from '@/data/addons';
import { BIOMARKERS_DICTIONARY } from '@/data/biomarkers';
import { getPriceBreakdown, calculateTotalPrice } from '@/data/pricing';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const addonId = searchParams.get('id');
    const category = searchParams.get('category');
    const gender = searchParams.get('gender') || 'both';
    const includeDetails = searchParams.get('details') === 'true';

    // Si se solicita un add-on específico
    if (addonId) {
      const addon = ADDONS[addonId];
      if (!addon) {
        return NextResponse.json(
          { error: 'Add-on no encontrado' },
          { status: 404 }
        );
      }

      // Obtener biomarcadores para el género específico
      const biomarkerCodes = getBiomarkersForAddon(addonId, gender);
      
      // Calcular precios
      const priceBreakdown = getPriceBreakdown(biomarkerCodes);
      
      const response = {
        ...addon,
        biomarkerCodes,
        biomarkerCount: biomarkerCodes.length,
        pricing: priceBreakdown.totals
      };

      // Si se requieren detalles completos
      if (includeDetails) {
        const biomarkersWithDetails = biomarkerCodes.map(code => {
          const biomarker = BIOMARKERS_DICTIONARY[code];
          return {
            code,
            ...biomarker
          };
        });
        
        response.biomarkersDetails = biomarkersWithDetails;
        response.priceBreakdown = priceBreakdown.breakdown;
      }

      return NextResponse.json(response);
    }

    // Filtrar por categoría si se especifica
    let addonsToProcess = Object.entries(ADDONS);
    if (category) {
      addonsToProcess = addonsToProcess.filter(([id, addon]) => 
        addon.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Devolver todos los add-ons (o filtrados) con información básica
    const addonsWithPricing = addonsToProcess.map(([id, addon]) => {
      const biomarkerCodes = getBiomarkersForAddon(id, gender);
      const totalPrice = calculateTotalPrice(biomarkerCodes, false);
      const totalPVP = calculateTotalPrice(biomarkerCodes, true);

      return {
        id,
        name: addon.name,
        description: addon.description,
        category: addon.category,
        benefits: addon.benefits,
        biomarkerCount: biomarkerCodes.length,
        pricing: {
          precio: Math.round(totalPrice * 100) / 100,
          pvp: Math.round(totalPVP * 100) / 100,
          discount: Math.round((totalPVP - totalPrice) * 100) / 100,
          discountPercentage: totalPVP > 0 ? ((totalPVP - totalPrice) / totalPVP * 100).toFixed(1) : 0
        }
      };
    });

    // Obtener categorías únicas
    const categories = [...new Set(Object.values(ADDONS).map(addon => addon.category))];

    return NextResponse.json({
      addons: addonsWithPricing,
      count: addonsWithPricing.length,
      categories
    });

  } catch (error) {
    console.error('Error en /api/addons:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { addonIds, gender = 'both' } = await request.json();
    
    if (!Array.isArray(addonIds) || addonIds.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere un array de addonIds' },
        { status: 400 }
      );
    }

    const results = [];
    let allBiomarkers = [];

    // Procesar cada add-on
    for (const addonId of addonIds) {
      const addon = ADDONS[addonId];
      if (!addon) {
        results.push({
          id: addonId,
          error: 'Add-on no encontrado'
        });
        continue;
      }

      const biomarkerCodes = getBiomarkersForAddon(addonId, gender);
      const priceBreakdown = getPriceBreakdown(biomarkerCodes);
      
      results.push({
        id: addonId,
        name: addon.name,
        category: addon.category,
        biomarkerCodes,
        biomarkerCount: biomarkerCodes.length,
        pricing: priceBreakdown.totals
      });

      // Agregar biomarcadores al total
      allBiomarkers = [...allBiomarkers, ...biomarkerCodes];
    }

    // Eliminar duplicados para el cálculo total
    const uniqueBiomarkers = [...new Set(allBiomarkers)];
    const totalPriceBreakdown = getPriceBreakdown(uniqueBiomarkers);

    return NextResponse.json({
      addons: results,
      summary: {
        totalAddons: addonIds.length,
        uniqueBiomarkers: uniqueBiomarkers.length,
        totalBiomarkers: allBiomarkers.length,
        duplicatesRemoved: allBiomarkers.length - uniqueBiomarkers.length,
        totalPricing: totalPriceBreakdown.totals
      }
    });

  } catch (error) {
    console.error('Error en POST /api/addons:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 