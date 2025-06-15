/**
 * API ENDPOINT: /api/profiles
 * Consulta información de perfiles/paquetes con precios calculados
 */

import { NextResponse } from 'next/server';
import { PROFILES, getBiomarkersForProfile } from '@/data/profiles';
import { BIOMARKERS_DICTIONARY } from '@/data/biomarkers';
import { getPriceBreakdown, calculateTotalPrice } from '@/data/pricing';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('id');
    const gender = searchParams.get('gender') || 'both';
    const includeDetails = searchParams.get('details') === 'true';

    // Si se solicita un perfil específico
    if (profileId) {
      const profile = PROFILES[profileId];
      if (!profile) {
        return NextResponse.json(
          { error: 'Perfil no encontrado' },
          { status: 404 }
        );
      }

      // Obtener biomarcadores para el género específico
      const biomarkerCodes = getBiomarkersForProfile(profileId, gender);
      
      // Calcular precios
      const priceBreakdown = getPriceBreakdown(biomarkerCodes);
      
      const response = {
        ...profile,
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

    // Devolver todos los perfiles con información básica
    const profilesWithPricing = Object.entries(PROFILES).map(([id, profile]) => {
      const biomarkerCodes = getBiomarkersForProfile(id, gender);
      const totalPrice = calculateTotalPrice(biomarkerCodes, false);
      const totalPVP = calculateTotalPrice(biomarkerCodes, true);

      return {
        id,
        name: profile.name,
        description: profile.description,
        targetAudience: profile.targetAudience,
        categories: profile.categories,
        biomarkerCount: biomarkerCodes.length,
        pricing: {
          precio: Math.round(totalPrice * 100) / 100,
          pvp: Math.round(totalPVP * 100) / 100,
          discount: Math.round((totalPVP - totalPrice) * 100) / 100,
          discountPercentage: totalPVP > 0 ? ((totalPVP - totalPrice) / totalPVP * 100).toFixed(1) : 0
        }
      };
    });

    return NextResponse.json({
      profiles: profilesWithPricing,
      count: profilesWithPricing.length
    });

  } catch (error) {
    console.error('Error en /api/profiles:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { profileId, gender = 'both', addons = [] } = await request.json();
    
    if (!profileId) {
      return NextResponse.json(
        { error: 'Se requiere profileId' },
        { status: 400 }
      );
    }

    const profile = PROFILES[profileId];
    if (!profile) {
      return NextResponse.json(
        { error: 'Perfil no encontrado' },
        { status: 404 }
      );
    }

    // Biomarcadores del perfil base
    const baseBiomarkers = getBiomarkersForProfile(profileId, gender);
    
    // Agregar biomarcadores de add-ons (importar dinámicamente)
    const { getBiomarkersForAddon } = await import('@/data/addons');
    let allBiomarkers = [...baseBiomarkers];
    
    for (const addonId of addons) {
      const addonBiomarkers = getBiomarkersForAddon(addonId, gender);
      allBiomarkers = [...allBiomarkers, ...addonBiomarkers];
    }

    // Eliminar duplicados
    allBiomarkers = [...new Set(allBiomarkers)];

    // Calcular precios
    const priceBreakdown = getPriceBreakdown(allBiomarkers);

    return NextResponse.json({
      profileId,
      gender,
      addons,
      biomarkerCodes: allBiomarkers,
      biomarkerCount: allBiomarkers.length,
      pricing: priceBreakdown.totals,
      priceBreakdown: priceBreakdown.breakdown
    });

  } catch (error) {
    console.error('Error en POST /api/profiles:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 