/**
 * CLIENTE API PARA SISTEMA DE BIOMARCADORES
 * Funciones helper para consultar la API de biomarcadores, perfiles, add-ons y precios
 */

const API_BASE = '/api';

// Helper para manejar respuestas de la API
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error de red' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
};

// ==========================================
// BIOMARCADORES API
// ==========================================

export const biomarkersAPI = {
  /**
   * Obtiene información de un biomarcador específico
   */
  getById: async (code) => {
    const response = await fetch(`${API_BASE}/biomarkers?code=${code}`);
    return handleResponse(response);
  },

  /**
   * Busca biomarcadores por criterios
   */
  search: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.gender) params.append('gender', filters.gender);
    
    const response = await fetch(`${API_BASE}/biomarkers?${params}`);
    return handleResponse(response);
  },

  /**
   * Obtiene múltiples biomarcadores por códigos
   */
  getMultiple: async (codes) => {
    const response = await fetch(`${API_BASE}/biomarkers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codes })
    });
    return handleResponse(response);
  }
};

// ==========================================
// PERFILES API
// ==========================================

export const profilesAPI = {
  /**
   * Obtiene todos los perfiles con precios
   */
  getAll: async (gender = 'both') => {
    try {
      // Obtener datos para ambos géneros en paralelo
      const [maleResponse, femaleResponse] = await Promise.all([
        fetch(`${API_BASE}/profiles?gender=male`),
        fetch(`${API_BASE}/profiles?gender=female`)
      ]);
      
      const [maleData, femaleData] = await Promise.all([
        handleResponse(maleResponse),
        handleResponse(femaleResponse)
      ]);
      
      const maleProfiles = maleData.profiles || [];
      const femaleProfiles = femaleData.profiles || [];
      
      // Combinar datos por perfil
      const profilesMap = new Map();
      
      // Procesar perfiles masculinos
      maleProfiles.forEach(profile => {
        profilesMap.set(profile.id, {
          id: profile.id,
          name: profile.name,
          description: profile.description,
          biomarkers: [], // Se llenará con datos detallados
          pricing: {
            male: { 
              precio: profile.pricing?.precio || 0, 
              pvp: profile.pricing?.pvp || 0 
            },
            female: { precio: 0, pvp: 0 } // Se llenará después
          },
          biomarkersCount: {
            male: profile.biomarkerCount || 0,
            female: 0 // Se llenará después
          }
        });
      });
      
      // Agregar datos femeninos
      femaleProfiles.forEach(profile => {
        if (profilesMap.has(profile.id)) {
          const existing = profilesMap.get(profile.id);
          existing.pricing.female = {
            precio: profile.pricing?.precio || 0,
            pvp: profile.pricing?.pvp || 0
          };
          existing.biomarkersCount.female = profile.biomarkerCount || 0;
        }
      });
      
      return Array.from(profilesMap.values());
    } catch (error) {
      console.error('Error loading profiles:', error);
      return [];
    }
  },

  /**
   * Obtiene un perfil específico con detalles
   */
  getById: async (profileId, options = {}) => {
    const params = new URLSearchParams();
    params.append('id', profileId);
    if (options.gender) params.append('gender', options.gender);
    if (options.details) params.append('details', 'true');
    
    const response = await fetch(`${API_BASE}/profiles?${params}`);
    return handleResponse(response);
  },

  /**
   * Calcula perfil con add-ons incluidos
   */
  calculateWithAddons: async (profileId, addons = [], gender = 'both') => {
    const response = await fetch(`${API_BASE}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId, addons, gender })
    });
    return handleResponse(response);
  }
};

// ==========================================
// ADD-ONS API
// ==========================================

export const addonsAPI = {
  /**
   * Obtiene todos los add-ons disponibles
   */
  getAll: async (filters = {}) => {
    try {
      // Obtener datos para ambos géneros en paralelo
      const [maleResponse, femaleResponse] = await Promise.all([
        fetch(`${API_BASE}/addons?gender=male${filters.category ? `&category=${filters.category}` : ''}`),
        fetch(`${API_BASE}/addons?gender=female${filters.category ? `&category=${filters.category}` : ''}`)
      ]);
      
      const [maleData, femaleData] = await Promise.all([
        handleResponse(maleResponse),
        handleResponse(femaleResponse)
      ]);
      
      const maleAddons = maleData.addons || [];
      const femaleAddons = femaleData.addons || [];
      
      // Combinar datos por add-on
      const addonsMap = new Map();
      
      // Procesar add-ons masculinos
      maleAddons.forEach(addon => {
        addonsMap.set(addon.id, {
          id: addon.id,
          name: addon.name,
          description: addon.description,
          category: addon.category,
          biomarkers: [], // Se llenará con datos detallados
          pricing: {
            male: { 
              precio: addon.pricing?.precio || 0, 
              pvp: addon.pricing?.pvp || 0 
            },
            female: { precio: 0, pvp: 0 } // Se llenará después
          },
          biomarkersCount: {
            male: addon.biomarkerCount || 0,
            female: 0 // Se llenará después
          }
        });
      });
      
      // Agregar datos femeninos
      femaleAddons.forEach(addon => {
        if (addonsMap.has(addon.id)) {
          const existing = addonsMap.get(addon.id);
          existing.pricing.female = {
            precio: addon.pricing?.precio || 0,
            pvp: addon.pricing?.pvp || 0
          };
          existing.biomarkersCount.female = addon.biomarkerCount || 0;
        }
      });
      
      return Array.from(addonsMap.values());
    } catch (error) {
      console.error('Error loading add-ons:', error);
      return [];
    }
  },

  /**
   * Obtiene un add-on específico
   */
  getById: async (addonId, options = {}) => {
    const params = new URLSearchParams();
    params.append('id', addonId);
    if (options.gender) params.append('gender', options.gender);
    if (options.details) params.append('details', 'true');
    
    const response = await fetch(`${API_BASE}/addons?${params}`);
    return handleResponse(response);
  },

  /**
   * Calcula múltiples add-ons
   */
  calculateMultiple: async (addonIds, gender = 'both') => {
    const response = await fetch(`${API_BASE}/addons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addonIds, gender })
    });
    return handleResponse(response);
  },

  /**
   * Obtiene add-ons por categoría
   */
  getByCategory: async (category, gender = 'both') => {
    const response = await fetch(`${API_BASE}/addons?category=${category}&gender=${gender}`);
    return handleResponse(response);
  }
};

// ==========================================
// PRECIOS API
// ==========================================

export const pricingAPI = {
  /**
   * Obtiene precio de un biomarcador específico
   */
  getBiomarkerPrice: async (code) => {
    const response = await fetch(`${API_BASE}/pricing?code=${code}`);
    return handleResponse(response);
  },

  /**
   * Calcula precios para configuración personalizada
   */
  calculate: async (config) => {
    const response = await fetch(`${API_BASE}/pricing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    return handleResponse(response);
  },

  /**
   * Calcula precios incrementales (perfil base + add-ons)
   */
  calculateIncremental: async (baseProfile, selectedAddons = [], gender = 'both') => {
    const response = await fetch(`${API_BASE}/pricing`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ baseProfile, selectedAddons, gender })
    });
    return handleResponse(response);
  },

  /**
   * Obtiene estadísticas generales de precios
   */
  getStats: async () => {
    const response = await fetch(`${API_BASE}/pricing`);
    return handleResponse(response);
  }
};

// ==========================================
// FUNCIONES DE CONVENIENCIA
// ==========================================

/**
 * Configurador completo: obtiene perfil + add-ons + precios
 */
export const getCompleteConfiguration = async (profileId, addonIds = [], gender = 'both') => {
  try {
    const [profile, addons, pricing] = await Promise.all([
      profilesAPI.getById(profileId, { gender, details: true }),
      addonIds.length > 0 ? addonsAPI.calculateMultiple(addonIds, gender) : Promise.resolve({ addons: [] }),
      pricingAPI.calculateIncremental(profileId, addonIds, gender)
    ]);

    return {
      profile,
      addons: addons.addons || [],
      pricing,
      summary: {
        totalBiomarkers: pricing.final.totalBiomarkers,
        totalPrice: pricing.final.pricing.precio,
        totalPVP: pricing.final.pricing.pvp,
        savings: pricing.final.pricing.discount
      }
    };
  } catch (error) {
    console.error('Error obteniendo configuración completa:', error);
    throw error;
  }
};

/**
 * Comparador de perfiles
 */
export const compareProfiles = async (profileIds, gender = 'both') => {
  try {
    const profiles = await Promise.all(
      profileIds.map(id => profilesAPI.getById(id, { gender }))
    );

    return {
      profiles,
      comparison: {
        biomarkerCounts: profiles.map(p => ({ id: p.id, count: p.biomarkerCount })),
        prices: profiles.map(p => ({ id: p.id, precio: p.pricing.precio, pvp: p.pricing.pvp })),
        bestValue: profiles.reduce((best, current) => 
          current.pricing.discountPercentage > best.pricing.discountPercentage ? current : best
        )
      }
    };
  } catch (error) {
    console.error('Error comparando perfiles:', error);
    throw error;
  }
};

/**
 * Recomendador de add-ons basado en perfil
 */
export const getRecommendedAddons = async (profileId, gender = 'both') => {
  try {
    const [profile, allAddons] = await Promise.all([
      profilesAPI.getById(profileId, { gender }),
      addonsAPI.getAll({ gender })
    ]);

    // Lógica de recomendación basada en categorías del perfil
    const profileCategories = profile.categories || [];
    const recommended = allAddons.addons.filter(addon => {
      // Recomendar add-ons que complementen las categorías del perfil
      const complementaryCategories = [
        'Hormonal', 'Antioxidantes', 'Inflamación', 'Cardiovascular'
      ];
      return complementaryCategories.includes(addon.category);
    });

    return {
      profile: { id: profileId, categories: profileCategories },
      recommended: recommended.slice(0, 5), // Top 5 recomendaciones
      allAddons: allAddons.addons
    };
  } catch (error) {
    console.error('Error obteniendo recomendaciones:', error);
    throw error;
  }
};

export default {
  biomarkers: biomarkersAPI,
  profiles: profilesAPI,
  addons: addonsAPI,
  pricing: pricingAPI,
  utils: {
    getCompleteConfiguration,
    compareProfiles,
    getRecommendedAddons
  }
}; 