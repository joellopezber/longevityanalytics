/**
 * API ENDPOINT: /api/biomarkers
 * Consulta información de biomarcadores
 */

import { NextResponse } from 'next/server';
import { BIOMARKERS_DICTIONARY } from '@/data/biomarkers';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');

    // Si se solicita un biomarcador específico
    if (code) {
      const biomarker = BIOMARKERS_DICTIONARY[code];
      if (!biomarker) {
        return NextResponse.json(
          { error: 'Biomarcador no encontrado' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        code,
        ...biomarker
      });
    }

    // Filtrar biomarcadores
    let biomarkers = Object.entries(BIOMARKERS_DICTIONARY).map(([code, data]) => ({
      code,
      ...data
    }));

    // Filtrar por categoría
    if (category) {
      biomarkers = biomarkers.filter(biomarker => 
        biomarker.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filtrar por género
    if (gender && gender !== 'both') {
      biomarkers = biomarkers.filter(biomarker => 
        biomarker.gender === 'both' || biomarker.gender === gender
      );
    }

    return NextResponse.json({
      biomarkers,
      count: biomarkers.length,
      categories: [...new Set(biomarkers.map(b => b.category))]
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { codes } = await request.json();
    
    if (!Array.isArray(codes)) {
      return NextResponse.json(
        { error: 'Se requiere un array de códigos' },
        { status: 400 }
      );
    }

    const biomarkers = codes.map(code => {
      const biomarker = BIOMARKERS_DICTIONARY[code];
      return biomarker ? { code, ...biomarker } : { code, error: 'No encontrado' };
    });

    return NextResponse.json({ biomarkers });

  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 