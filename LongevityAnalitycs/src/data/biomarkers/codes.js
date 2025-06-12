/**
 * codes.js
 * Códigos de biomarcadores seleccionables y estados por defecto
 * BLOQUE 1: Solo definición de códigos y estados - sin lógica
 */

// ================================
// CONFIGURACIÓN PRINCIPAL DE BIOMARCADORES SELECCIONABLES
// ================================

/**
 * Define todos los biomarcadores seleccionables en cada add-on y sus estados por defecto
 * NUEVA ESTRUCTURA: Solo biomarkers con sus estados por defecto (true/false)
 * 
 * Filosofía:
 * - true: Seleccionado por defecto (aparece activo al cargar)
 * - false: No seleccionado por defecto (usuario puede activar manualmente)
 */
export const ADD_ON_BIOMARKERS_CONFIG = {
  genome: {
    biomarkers: {
      'OG002': false,   // MyPharma - Solo se suma si se selecciona manualmente
      'OG003': false,   // MyDetox - Solo se suma si se selecciona manualmente  
      'OG004': false,   // MyDiet - Solo se suma si se selecciona manualmente
      'OG005': false,   // MyAgeing - Solo se suma si se selecciona manualmente
      'OG006': false    // MySuplements - Solo se suma si se selecciona manualmente
    }
  },
  hormonas: {
    biomarkers: {
      // ============================================
      // BIOMARCADORES OPCIONALES (precio base = 0€)
      // ============================================
      'B5350': false,   // Estradiol - Solo se suma si se selecciona manualmente
      'B5380': false,   // FSH - Solo se suma si se selecciona manualmente
      'B5420': false,   // Hormona de crecimiento (hGH) - Solo se suma si se selecciona manualmente
      'B5800': false,   // LH - Solo se suma si se selecciona manualmente
      'B5980': false,   // Prolactina - Solo se suma si se selecciona manualmente
      
      // ============================================
      // BIOMARCADORES ESPECÍFICOS POR GÉNERO (OPCIONALES)
      // ============================================
      'B6480': false,   // Testosterona biodisp. - Solo se suma si se selecciona manualmente
      'D0601': false,   // Testosterona libre - Solo se suma si se selecciona manualmente
      'D0850': false,   // DHT - Solo se suma si se selecciona manualmente
      
      // Biomarcadores específicos femeninos (OPCIONALES)
      'B5932': false,   // Progesterona - Solo se suma si se selecciona manualmente
      'B6160': false,   // Testosterona total - Solo se suma si se selecciona manualmente
      'D0181': false,   // 17-OH-Progesterona - Solo se suma si se selecciona manualmente
      'D0780': false    // Estrona - Solo se suma si se selecciona manualmente
    }
  },
  endocrino: {
    biomarkers: {
      'B6030': false,   // IGF-1 - Solo se suma si se selecciona manualmente
      'B6010': false,   // IGFBP-3 - Solo se suma si se selecciona manualmente
      'I6740': false    // ACTH - Solo se suma si se selecciona manualmente
    }
  },
  cardiovascular: {
    biomarkers: {
      'B0110': false,   // LDH - Solo se suma si se selecciona manualmente
      'B0750': false,   // Ácido láctico - Solo se suma si se selecciona manualmente
      'B2120': false,   // CK-MB - Solo se suma si se selecciona manualmente
      'B0220': false,   // CPK total - Solo se suma si se selecciona manualmente
      'B1900': false,   // LDL directo - Solo se suma si se selecciona manualmente
      'B0190': false,   // VLDL - Solo se suma si se selecciona manualmente
      'B7700': false,   // Lp(a) * - Solo se suma si se selecciona manualmente
      'I5047': false    // Cistatina-C - Solo se suma si se selecciona manualmente
    }
  },
  antioxidantes: {
    biomarkers: {
      'T0811': false,   // Retinol (Vitamina A) - Solo se suma si se selecciona manualmente
      'T1191': false,   // Alfa-tocoferol (Vit E) - Solo se suma si se selecciona manualmente
      'T2841': false,   // Gamma-tocoferol (Vit E) - Solo se suma si se selecciona manualmente
      'T1200': false,   // Beta-caroteno - Solo se suma si se selecciona manualmente
      'T2830': false    // Coenzima Q10 - Solo se suma si se selecciona manualmente
    }
  },
  iv_nutrients: {
    biomarkers: {
      'T0500': false,   // Cromo (Oligoelemento) - Solo se suma si se selecciona manualmente
      'B8060': false,   // Cobre - Solo se suma si se selecciona manualmente
      'B0270': false,   // Osmolalidad sérica - Solo se suma si se selecciona manualmente
      'T1720': false,   // Vitamina K1 - Solo se suma si se selecciona manualmente
      'T1061': false    // Vitamina C - Solo se suma si se selecciona manualmente
    }
  },
  metals: {
    biomarkers: {
      'T0302': false,   // Mercurio - Solo se suma si se selecciona manualmente
      'T0150': false,   // Plomo - Solo se suma si se selecciona manualmente
      'T0960': false,   // Arsénico - Solo se suma si se selecciona manualmente
      'T0480': false    // Cadmio - Solo se suma si se selecciona manualmente
    }
  },
  oxidative_cell: {
    biomarkers: {
      'B7121': false,   // Glutatión reductasa - Solo se suma si se selecciona manualmente
      'B3015': false,   // Glutatión peroxidasa - Solo se suma si se selecciona manualmente
      'B3041': false,   // G6PD - Solo se suma si se selecciona manualmente
      'T3920': false    // Selenio - Solo se suma si se selecciona manualmente
    }
  },
  inflammation: {
    biomarkers: {
      'H0020': false,   // VSG - Solo se suma si se selecciona manualmente
      'B7790': false,   // IL-6 - Solo se suma si se selecciona manualmente
      'I2081': false    // TNF-α - Solo se suma si se selecciona manualmente
    }
  },
  immunity: {
    biomarkers: {
      'I0141': false,   // ANA (Autoinmunidad) - Solo se suma si se selecciona manualmente
      'I5072': false,   // Anti-CCP (Artritis) - Solo se suma si se selecciona manualmente
      'B6321': false,   // Anti-tiroglobulina (Tiroides) - Solo se suma si se selecciona manualmente
      'B6300': false,   // Anti-TPO (Tiroides) - Solo se suma si se selecciona manualmente
      'B3130': false,   // Factor reumatoide - Solo se suma si se selecciona manualmente
      'B7750': false    // H. pylori IgG (Infección) - Solo se suma si se selecciona manualmente
    }
  },
  digestion: {
    biomarkers: {
      'T2590': false,   // Urianálisis + sedimento - Solo se suma si se selecciona manualmente
      'B1980': false,   // Amilasa - Solo se suma si se selecciona manualmente
      'B0350': false,   // Lipasa - Solo se suma si se selecciona manualmente
      'B0260': false    // Elastasa - Solo se suma si se selecciona manualmente
    }
  },
  gut_gate: {
    biomarkers: {
      'M1190': false,   // Parásitos en heces (Parasitología) - Solo se suma si se selecciona manualmente
      'P3031': false,   // Intolerancia alimentaria (Intolerancia Igg) - Solo se suma si se selecciona manualmente
      'AB001': false,   // Microbioma intestinal (Microbiota) - Solo se suma si se selecciona manualmente
      'AB002': false    // Metaboloma (Microbiota) - Solo se suma si se selecciona manualmente
    }
  },
  bone_mineral: {
    biomarkers: {
      'D0560': false,   // Calcitriol (Vit D [1,25-OH]) - Solo se suma si se selecciona manualmente
      'D1111': false,   // ALP ósea - Solo se suma si se selecciona manualmente
      'I3291': false,   // CTX - Solo se suma si se selecciona manualmente
      'T1572': false    // Calcio iónico - Solo se suma si se selecciona manualmente
    }
  },
  coagulation: {
    biomarkers: {
      'H0050': false,   // Fibrinógeno - Solo se suma si se selecciona manualmente
      'H0850': false,   // Cefalina-APTT - Solo se suma si se selecciona manualmente
      'H0860': false    // INR (Protrombina) - Solo se suma si se selecciona manualmente
    }
  },
  bioage: {
    biomarkers: {
      'OG001': false,   // MyEpiAgeing* - Solo se suma si se selecciona manualmente
      'G1465': false,   // Longitud telomérica - Solo se suma si se selecciona manualmente
      'B3340': false,   // Espermiograma - Solo se suma si se selecciona manualmente
      'D1001': false    // AMH - Solo se suma si se selecciona manualmente
    }
  },
  cancer: {
    biomarkers: {
      // Biomarcadores comunes para ambos géneros
      'M0010': false,   // Sangre oculta en heces - Solo se suma si se selecciona manualmente
      '6897': false,    // Urianálisis + sedimento - Solo se suma si se selecciona manualmente
      'B5110': false,   // CEA - Solo se suma si se selecciona manualmente
      'B5080': false,   // CA 125 - Solo se suma si se selecciona manualmente
      'B5090': false,   // CA 15.3 - Solo se suma si se selecciona manualmente
      'B5100': false,   // CA 19-9 - Solo se suma si se selecciona manualmente
      'B8130': false,   // Células escamosas Ag (SCC) - Solo se suma si se selecciona manualmente
      'I5080': false,   // Proteina s-100 - Solo se suma si se selecciona manualmente
      'I5090': false,   // NSE - Solo se suma si se selecciona manualmente
      'B8120': false,   // CYFRA 21-1 - Solo se suma si se selecciona manualmente
      'D1271': false,   // CA 72-4 - Solo se suma si se selecciona manualmente
      'B7900': false,   // Alfa-feto (AFP) - Solo se suma si se selecciona manualmente
      'B8160': false,   // Péptido liberador gastrina (ProGRP) - Solo se suma si se selecciona manualmente
      'D1760': false,   // β-HCG - Solo se suma si se selecciona manualmente
      // Biomarcadores específicos masculinos
      'B5830': false,   // PSA total - Solo se suma si se selecciona manualmente
      'B5840': false,   // PSA libre - Solo se suma si se selecciona manualmente
      // Biomarcadores específicos femeninos
      'B8110': false    // Proteína Epididimal Humana 4 (HE4) - Solo se suma si se selecciona manualmente
    }
  }
};

console.log('✅ Códigos de biomarcadores cargados:', {
  addOns: Object.keys(ADD_ON_BIOMARKERS_CONFIG).length,
  totalBiomarkers: Object.values(ADD_ON_BIOMARKERS_CONFIG).reduce(
    (total, config) => total + Object.keys(config.biomarkers || {}).length, 0
  )
}); 