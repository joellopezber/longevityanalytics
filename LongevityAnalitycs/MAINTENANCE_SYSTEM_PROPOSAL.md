# 🔧 PROPUESTA: Sistema Unificado de Biomarcadores

## 🎯 OBJETIVO
Reducir de **5-6 archivos** a **1 archivo** para mantener biomarcadores, precios y configuraciones.

## 🏗️ NUEVA ARQUITECTURA

### 📁 Estructura Propuesta
```
src/data/
├── biomarcadores/
│   ├── masterConfig.js          ← ⭐ ARCHIVO ÚNICO MAESTRO
│   ├── validators.js            ← Validaciones automáticas
│   └── migrationTools.js        ← Herramientas de migración
├── profiles/
│   └── profileBuilder.js        ← Construye perfiles desde masterConfig
├── addOns/
│   └── addOnBuilder.js          ← Construye add-ons desde masterConfig
└── utils/
    ├── priceCalculator.js       ← Solo cálculos
    └── exporters.js             ← Exportar a diferentes formatos
```

### ⭐ ARCHIVO MAESTRO: `masterConfig.js`

```javascript
/**
 * masterConfig.js
 * ÚNICO PUNTO DE VERDAD para todos los biomarcadores
 * Formato: Toda la información en UN SOLO LUGAR
 */

export const BIOMARKERS_MASTER_CONFIG = {
  // ============================================
  // DEFINICIÓN COMPLETA POR BIOMARCADOR
  // ============================================
  "B5350": {
    // Información básica
    name: "Estradiol",
    category: "Hormonas femeninas", 
    gender: "both",
    
    // Precios
    pricing: {
      cost: 12.48,          // Nuestro costo
      pvp: 16.28            // Precio al público
    },
    
    // Configuración de disponibilidad
    availability: {
      // En qué add-ons aparece y con qué estado por defecto
      addOns: {
        hormonas: { defaultSelected: false, contexts: ['hormonas'] },
        endocrino: { defaultSelected: false, contexts: ['endocrino'] }
      },
      
      // En qué perfiles base aparece (si aplica)
      profiles: {
        performance: { included: true, genderSpecific: 'female' },
        core: { included: true, genderSpecific: false },
        advanced: { included: true, genderSpecific: false }
      }
    },
    
    // Mapeo a variables del contexto
    contextMapping: {
      hormonas: 'selectedEstradiolHormonas',
      endocrino: 'selectedEstradiolEndocrino'
    },
    
    // Metadatos para mantenimiento
    metadata: {
      lastUpdated: '2025-01-22',
      notes: 'Hormona femenina principal'
    }
  },
  
  "B5380": {
    name: "FSH",
    category: "Gonadotropina",
    gender: "both", 
    pricing: { cost: 7.52, pvp: 18.60 },
    availability: {
      addOns: {
        hormonas: { defaultSelected: false, contexts: ['hormonas'] },
        endocrino: { defaultSelected: false, contexts: ['endocrino'] }
      },
      profiles: {
        performance: { included: true, genderSpecific: 'female' },
        core: { included: true, genderSpecific: false }
      }
    },
    contextMapping: {
      hormonas: 'selectedFSHHormonas',
      endocrino: 'selectedFSHEndocrino'
    },
    metadata: {
      lastUpdated: '2025-01-22',
      notes: 'Hormona folículo estimulante'
    }
  }
  
  // ... TODOS los biomarcadores aquí con formato consistente
};
```

## 🛠️ FUNCIONES DE CONSTRUCCIÓN AUTOMÁTICA

### 🏭 Builders Automáticos
```javascript
// profileBuilder.js
export const buildProfileFromMaster = (profileId, gender = 'both') => {
  const biomarkers = [];
  
  Object.entries(BIOMARKERS_MASTER_CONFIG).forEach(([code, config]) => {
    const profile = config.availability.profiles[profileId];
    if (profile?.included) {
      // Verificar restricciones de género
      if (profile.genderSpecific === false || 
          profile.genderSpecific === gender ||
          gender === 'both') {
        biomarkers.push({ code, ...config });
      }
    }
  });
  
  return {
    biomarkers,
    pricing: calculateProfilePricing(biomarkers),
    testCount: biomarkers.length
  };
};

// addOnBuilder.js  
export const buildAddOnFromMaster = (addOnId, gender = 'both') => {
  const biomarkers = [];
  
  Object.entries(BIOMARKERS_MASTER_CONFIG).forEach(([code, config]) => {
    const addOn = config.availability.addOns[addOnId];
    if (addOn) {
      biomarkers.push({ 
        code, 
        ...config,
        defaultSelected: addOn.defaultSelected 
      });
    }
  });
  
  return {
    biomarkers,
    pricing: calculateAddOnPricing(biomarkers),
    testCount: biomarkers.length
  };
};
```

## ⚡ VENTAJAS DEL NUEVO SISTEMA

### ✅ **Mantenimiento Ultra-Simplificado**

#### Para AÑADIR un biomarcador:
```javascript
// ⭐ SOLO 1 lugar: masterConfig.js
"B9999": {
  name: "Nuevo Biomarcador",
  category: "Nueva Categoría",
  gender: "both",
  pricing: { cost: 15.00, pvp: 20.00 },
  availability: {
    addOns: { 
      nuevo_addon: { defaultSelected: false, contexts: ['nuevo'] }
    },
    profiles: {
      advanced: { included: true, genderSpecific: false }
    }
  },
  contextMapping: { nuevo_addon: 'selectedNuevoBio' }
}
```

#### Para CAMBIAR un precio:
```javascript
// ⭐ SOLO 1 línea en masterConfig.js
"B5350": {
  // ... resto igual
  pricing: { cost: 13.50, pvp: 17.50 }, // ← Solo cambiar aquí
}
```

#### Para ELIMINAR un biomarcador:
```javascript
// ⭐ SOLO eliminar el objeto completo
// delete BIOMARKERS_MASTER_CONFIG["B5350"];
```

### ✅ **Validación Automática**
```javascript
// validators.js
export const validateMasterConfig = () => {
  const errors = [];
  
  Object.entries(BIOMARKERS_MASTER_CONFIG).forEach(([code, config]) => {
    // Validar precios
    if (!config.pricing?.cost || !config.pricing?.pvp) {
      errors.push(`${code}: Precios incompletos`);
    }
    
    // Validar contextos
    Object.keys(config.availability.addOns).forEach(addOnId => {
      if (!config.contextMapping[addOnId]) {
        errors.push(`${code}: Falta mapeo de contexto para ${addOnId}`);
      }
    });
  });
  
  return { isValid: errors.length === 0, errors };
};
```

### ✅ **Migración Segura**
```javascript
// migrationTools.js
export const migrateLegacyData = () => {
  // Comparar datos actuales con masterConfig
  // Detectar inconsistencias
  // Generar reporte de migración
  // Proponer correcciones automáticas
};
```

## 📊 COMPARACIÓN DE MANTENIMIENTO

| Tarea | Sistema Actual | Sistema Propuesto |
|-------|---------------|-------------------|
| Añadir biomarcador | 🔴 5-6 archivos | ✅ 1 lugar |
| Cambiar precio | 🔴 1 archivo + validar todo | ✅ 1 línea |
| Eliminar biomarcador | 🔴 Buscar en 5-6 archivos | ✅ Eliminar 1 objeto |
| Añadir add-on | 🔴 4 archivos + mapeos | ✅ Actualizar availabilityconfigs |
| Validar consistencia | 🔴 Manual, propenso a errores | ✅ Automático |
| Detectar duplicados | 🔴 Revisión manual | ✅ Validación automática |

## 🚀 PLAN DE IMPLEMENTACIÓN

### Fase 1: Preparación (2-3 horas)
1. Crear `masterConfig.js` con biomarcadores críticos
2. Implementar builders básicos
3. Crear validadores

### Fase 2: Migración Gradual (4-6 horas)
1. Migrar addOns uno por uno
2. Migrar perfiles
3. Actualizar contexto para usar nuevos builders

### Fase 3: Limpieza (2-3 horas)
1. Eliminar archivos duplicados
2. Actualizar documentación
3. Crear herramientas de mantenimiento

### Fase 4: Validación (1-2 horas)
1. Probar todos los flujos
2. Verificar precios y cálculos
3. Validar UI y UX

## 💡 BENEFICIOS A LARGO PLAZO

1. **Mantenimiento 80% más rápido**
2. **Cero duplicación de código**  
3. **Validación automática de consistencia**
4. **Detección automática de errores**
5. **Facilidad para nuevos desarrolladores**
6. **Base sólida para futuras funcionalidades**

---

¿Procedemos con la implementación del sistema unificado? 