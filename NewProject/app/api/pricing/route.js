/**
 * API ENDPOINT: /api/pricing
 * Cálculos específicos de precios para biomarcadores, perfiles y add-ons
 */

import { NextResponse } from 'next/server';
import { PRICING, getBiomarkerPrice, calculateTotalPrice, getPriceBreakdown } from '@/data/pricing';
import { getBiomarkersForProfile } from '@/data/profiles';
import { getBiomarkersForAddon } from '@/data/addons';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    // Si se solicita precio de un biomarcador específico
    if (code) {
      const pricing = PRICING[code];
      if (!pricing) {
        return NextResponse.json(
          { error: 'Código de biomarcador no encontrado' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        code,
        ...pricing
      });
    }

    // Devolver información general de precios
    const stats = {
      totalBiomarkers: Object.keys(PRICING).length,
      priceRange: {
        min: Math.min(...Object.values(PRICING).map(p => p.precio)),
        max: Math.max(...Object.values(PRICING).map(p => p.precio))
      },
      pvpRange: {
        min: Math.min(...Object.values(PRICING).map(p => p.pvp)),
        max: Math.max(...Object.values(PRICING).map(p => p.pvp))
      }
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error en GET /api/pricing:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { 
      codes,
      profileId,
      addonIds = [],
      gender = 'both',
      usePVP = false 
    } = await request.json();

    let allBiomarkers = [];

    // Si se proporcionan códigos directamente
    if (codes && Array.isArray(codes)) {
      allBiomarkers = codes;
    }
    
    // Si se proporciona un perfil
    if (profileId) {
      const profileBiomarkers = getBiomarkersForProfile(profileId, gender);
      allBiomarkers = [...allBiomarkers, ...profileBiomarkers];
    }

    // Si se proporcionan add-ons
    if (addonIds && addonIds.length > 0) {
      for (const addonId of addonIds) {
        const addonBiomarkers = getBiomarkersForAddon(addonId, gender);
        allBiomarkers = [...allBiomarkers, ...addonBiomarkers];
      }
    }

    if (allBiomarkers.length === 0) {
      return NextResponse.json(
        { error: 'No se proporcionaron códigos de biomarcadores válidos' },
        { status: 400 }
      );
    }

    // Eliminar duplicados
    const uniqueBiomarkers = [...new Set(allBiomarkers)];
    
    // Calcular precios detallados
    const priceBreakdown = getPriceBreakdown(uniqueBiomarkers);
    
    // Información adicional
    const response = {
      request: {
        profileId,
        addonIds,
        gender,
        usePVP,
        directCodes: codes || []
      },
      biomarkers: {
        total: allBiomarkers.length,
        unique: uniqueBiomarkers.length,
        duplicates: allBiomarkers.length - uniqueBiomarkers.length,
        codes: uniqueBiomarkers
      },
      pricing: priceBreakdown.totals,
      breakdown: priceBreakdown.breakdown,
      summary: {
        averagePricePerBiomarker: (priceBreakdown.totals.precio / uniqueBiomarkers.length).toFixed(2),
        averagePVPPerBiomarker: (priceBreakdown.totals.pvp / uniqueBiomarkers.length).toFixed(2),
        totalSavings: priceBreakdown.totals.discount,
        discountPercentage: priceBreakdown.totals.discountPercentage + '%'
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error en POST /api/pricing:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { 
      baseProfile,
      selectedAddons = [],
      gender = 'both'
    } = await request.json();

    if (!baseProfile) {
      return NextResponse.json(
        { error: 'Se requiere un perfil base' },
        { status: 400 }
      );
    }

    // Obtener biomarcadores del perfil base
    const baseBiomarkers = getBiomarkersForProfile(baseProfile, gender);
    const basePricing = getPriceBreakdown(baseBiomarkers);

    // Calcular precios incrementales para cada add-on
    const addonPricingDetails = [];
    let cumulativeBiomarkers = [...baseBiomarkers];

    for (const addonId of selectedAddons) {
      const addonBiomarkers = getBiomarkersForAddon(addonId, gender);
      
      // Biomarcadores únicos que agrega este add-on
      const newBiomarkers = addonBiomarkers.filter(code => 
        !cumulativeBiomarkers.includes(code)
      );
      
      const addonIncrementalPricing = getPriceBreakdown(newBiomarkers);
      
      addonPricingDetails.push({
        addonId,
        biomarkersAdded: newBiomarkers.length,
        biomarkersOverlap: addonBiomarkers.length - newBiomarkers.length,
        incrementalPricing: addonIncrementalPricing.totals,
        newBiomarkers
      });

      // Actualizar biomarcadores acumulativos
      cumulativeBiomarkers = [...cumulativeBiomarkers, ...newBiomarkers];
    }

    // Precio total final
    const finalPricing = getPriceBreakdown(cumulativeBiomarkers);

    return NextResponse.json({
      baseProfile: {
        profileId: baseProfile,
        biomarkerCount: baseBiomarkers.length,
        pricing: basePricing.totals
      },
      addons: addonPricingDetails,
      final: {
        totalBiomarkers: cumulativeBiomarkers.length,
        pricing: finalPricing.totals,
        breakdown: finalPricing.breakdown
      },
      comparison: {
        basePriceVsFinal: {
          priceDifference: finalPricing.totals.precio - basePricing.totals.precio,
          pvpDifference: finalPricing.totals.pvp - basePricing.totals.pvp,
          biomarkerIncrease: cumulativeBiomarkers.length - baseBiomarkers.length
        }
      }
    });

  } catch (error) {
    console.error('Error en PUT /api/pricing:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 