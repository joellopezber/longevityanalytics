# Sistema de Exclusiones por Perfil - Add-Ons

## 📋 Resumen

El sistema de exclusiones por perfil permite que los add-ons muestren **solo los biomarcadores que realmente agregan valor** según el perfil base seleccionado, evitando duplicaciones y mejorando la experiencia del usuario.

## 🎯 Problema Resuelto

**Antes**: Un usuario con perfil Performance veía el add-on de Inflamación con 3 biomarcadores, pero 2 ya estaban incluidos en Performance.

**Ahora**: El mismo usuario ve el add-on de Inflamación con solo 1 biomarcador (VSG), que es el único que realmente agrega valor.

## 🏗️ Arquitectura

### 1. Definición de Exclusiones (`PROFILE_EXCLUSIONS`)

```javascript
export const PROFILE_EXCLUSIONS = {
  inflammation: {
    essential: [],                     // Essential no incluye marcadores de inflamación
    performance: ['B7790', 'I2081'],  // Performance ya incluye IL-6 y TNF-α
    core: ['H0020', 'B7790', 'I2081'], // Core incluye todos
    advanced: ['H0020', 'B7790', 'I2081'] // Advanced incluye todos
  }
  // ... más add-ons
};
```

### 2. Función de Filtrado Mejorada

La función `filterDuplicateCodes()` ahora acepta parámetros adicionales:

```javascript
const filterDuplicateCodes = (addOnCodes, baseCodes, addOnId, profileId) => {
  // 1. Filtrar duplicados tradicionales (codes en baseCodes)
  let filteredCodes = addOnCodes.filter(code => !baseCodes.includes(code));
  
  // 2. Aplicar exclusiones específicas por perfil
  if (addOnId && profileId) {
    const profileExclusions = getProfileExclusions(addOnId, profileId);
    filteredCodes = filteredCodes.filter(code => !profileExclusions.includes(code));
  }
  
  return filteredCodes;
};
```

### 3. API Mejorada

La función `getForProfile()` ahora acepta `profileId`:

```javascript
addOn.getForProfile(gender, baseCodes, profileId)
```

## 🚀 Uso en el Frontend

### Función Principal Recomendada

```javascript
import { getFilteredAddOnsForProfile } from './data/addOnPackages.js';

// Obtener add-ons filtrados para mostrar
const result = getFilteredAddOnsForProfile('performance', 'male');

console.log(result.addOns);    // Solo add-ons con valor
console.log(result.stats);     // Estadísticas de filtrado
/*
{
  addOns: {
    inflammation: {
      testCount: 1,              // Solo VSG
      biomarkers: [...],         // Solo biomarcadores únicos
      hasExclusions: true,       // Indica que se aplicaron exclusiones
      originalTestCount: 3,      // Tests originales del add-on
      reductionPercentage: 67    // 67% de reducción
    }
  },
  stats: {
    total: 16,                   // Total de add-ons
    visible: 9,                  // Add-ons que se muestran
    hidden: 7,                   // Add-ons ocultos (sin valor)
    emptyAfterFilter: ['endocrino'] // Add-ons específicos ocultos
  }
}
*/
```

### Función para Debugging

```javascript
import { getAddOnExclusionReason } from './data/addOnPackages.js';

// Verificar por qué un add-on no se muestra
const reason = getAddOnExclusionReason('inflammation', 'core', 'male');
console.log(reason);
/*
{
  addOnId: 'inflammation',
  profileId: 'core',
  reason: 'excluded',           // 'visible' o 'excluded'
  details: {
    originalTests: 3,
    filteredTests: 0,           // Por eso no se muestra
    excludedByProfile: ['H0020', 'B7790', 'I2081'],
    allExcludedBiomarkers: [
      { code: 'H0020', name: 'VSG' },
      { code: 'B7790', name: 'IL-6' },
      { code: 'I2081', name: 'TNF-α' }
    ]
  }
}
*/
```

## 📊 Casos de Uso por Perfil

### Essential
- **Comportamiento**: Muestra todos los add-ons completos
- **Motivo**: Essential es básico, cualquier add-on agrega valor

### Performance  
- **Inflamación**: Muestra solo VSG (H0020)
- **Cardiovascular**: Muestra solo 3 biomarcadores únicos
- **Hormonas**: Muestra hormonas específicas no incluidas

### Core
- **Inflamación**: NO se muestra (todos incluidos)
- **Endocrino**: NO se muestra (todos incluidos)
- **Cardiovascular**: Muestra biomarcadores únicos

### Advanced
- **Muchos add-ons**: NO se muestran (ya incluidos)
- **Solo se muestran**: Add-ons con biomarcadores realmente únicos

## 🔧 Configuración de Nuevos Add-Ons

Para agregar exclusiones a un nuevo add-on:

```javascript
// 1. Identificar qué biomarcadores están incluidos en cada perfil
const newAddOnCodes = ['CODE1', 'CODE2', 'CODE3'];

// 2. Verificar en analysisPackages.js qué perfiles incluyen estos códigos

// 3. Agregar entrada en PROFILE_EXCLUSIONS
export const PROFILE_EXCLUSIONS = {
  // ... existing add-ons
  newAddOn: {
    essential: [],                    // Códigos incluidos en Essential
    performance: ['CODE1'],          // Códigos incluidos en Performance
    core: ['CODE1', 'CODE2'],       // Códigos incluidos en Core
    advanced: ['CODE1', 'CODE2', 'CODE3'] // Códigos incluidos en Advanced
  }
};
```

## ✅ Beneficios

1. **Transparencia**: Los usuarios ven exactamente qué valor agrega cada add-on
2. **No Duplicaciones**: Evita mostrar biomarcadores ya incluidos
3. **Pricing Correcto**: Los precios se ajustan automáticamente
4. **UX Mejorada**: Solo se muestran add-ons que realmente aportan valor
5. **Mantenible**: Sistema centralizado y fácil de actualizar

## 🧪 Testing

Para probar el sistema:

```bash
node src/test_profile_exclusions.js
```

El test verifica que:
- Performance + Inflamación → Solo muestra VSG
- Core + Inflamación → No se muestra (vacío)
- Essential + Inflamación → Muestra los 3 biomarcadores

## 📝 Ejemplo Práctico: Inflamación

| Perfil | Biomarcadores Incluidos | Add-on Muestra | Biomarcadores Únicos |
|--------|-------------------------|----------------|---------------------|
| Essential | Ninguno | ✅ Sí | VSG, IL-6, TNF-α (3) |
| Performance | IL-6, TNF-α | ✅ Sí | VSG (1) |
| Core | VSG, IL-6, TNF-α | ❌ No | Ninguno (0) |
| Advanced | VSG, IL-6, TNF-α | ❌ No | Ninguno (0) |

**Resultado**: El usuario obtiene exactamente el valor esperado sin duplicaciones ni confusión. 