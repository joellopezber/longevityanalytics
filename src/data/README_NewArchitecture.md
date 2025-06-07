# Nueva Arquitectura de Biomarcadores

## 🏗️ **SEPARACIÓN POR RESPONSABILIDADES**

Esta nueva arquitectura implementa el principio de **separación de responsabilidades** dividiendo la funcionalidad en archivos especializados:

### 📁 **Estructura de Archivos**

```
src/data/
├── biomarkersDict.js      # SOLO diccionario + helpers
├── analysisPackages.js    # SOLO lógica de paquetes  
├── biomarkers.js          # ORIGINAL (referencia)
└── addOns.js             # (futuro: solo add-ons)
```

---

## 📋 **1. biomarkersDict.js**

**Responsabilidad**: Diccionario centralizado de biomarcadores y funciones auxiliares

### 🎯 **Contenido**
- `BIOMARKERS_DICTIONARY`: 126 biomarcadores únicos con código, nombre, categoría y género
- Funciones auxiliares para manipular biomarcadores
- **NO** contiene lógica de paquetes

### 📤 **Exports principales**
```javascript
export const BIOMARKERS_DICTIONARY = { /* ... */ };
export const buildBiomarkersFromCodes = (codes) => { /* ... */ };
export const filterBiomarkersByGender = (biomarkers, gender) => { /* ... */ };
export const getBiomarkerStats = () => { /* ... */ };
export const searchBiomarkers = (searchTerm) => { /* ... */ };
export const validateBiomarkerCodes = (codes) => { /* ... */ };
```

### 🔧 **Funciones Auxiliares**
- **buildBiomarkersFromCodes**: Convierte códigos en objetos biomarcador completos
- **filterBiomarkersByGender**: Filtra biomarcadores por género
- **getBiomarkerStats**: Estadísticas del diccionario
- **searchBiomarkers**: Búsqueda por nombre/categoría
- **validateBiomarkerCodes**: Valida códigos contra diccionario

---

## 📋 **2. analysisPackages.js**

**Responsabilidad**: Lógica de paquetes Essential, Core y Advanced

### 🎯 **Contenido**
- Definición de códigos por paquete
- Construcción de arrays de biomarcadores
- Configuración de paquetes con precios
- **NO** contiene add-ons

### 📤 **Exports principales**
```javascript
// Códigos de paquetes
export const ESSENTIAL_BIOMARKER_CODES = [ /* 44 códigos */ ];
export const CORE_BIOMARKER_CODES = [ /* 95 códigos */ ];
export const ADVANCED_BIOMARKER_CODES = [ /* 126 códigos */ ];

// Arrays construidos
export const essentialBiomarkers = buildBiomarkersFromCodes(ESSENTIAL_BIOMARKER_CODES);
export const coreBiomarkers = buildBiomarkersFromCodes(CORE_BIOMARKER_CODES);
export const advancedBiomarkers = buildBiomarkersFromCodes(ADVANCED_BIOMARKER_CODES);

// Paquetes completos
export const essentialPackage = { /* configuración completa */ };
export const corePackage = { /* configuración completa */ };
export const advancedPackage = { /* configuración completa */ };

// Funciones auxiliares
export const getEssentialPackageForGender = (gender) => { /* ... */ };
export const getCorePackageForGender = (gender) => { /* ... */ };
export const getAdvancedPackageForGender = (gender) => { /* ... */ };
```

### 🏷️ **Jerarquía de Paquetes**
- **Essential** ⊂ **Core** ⊂ **Advanced**
- Essential: 44 biomarcadores básicos
- Core: Essential + 51 adicionales = 95 total
- Advanced: Core + 31 adicionales = 126 total

---

## 🔄 **3. Migración de Componentes**

### ✅ **Componentes Migrados**
- `MedicalSystemsExplorer.jsx`: Usa imports híbridos

### ⏳ **Pendientes de Migración**
- `PackageComparison.jsx`
- `PricingCards.jsx`

### 📥 **Patrón de Imports**
```javascript
// DESDE NUEVA ARQUITECTURA
import { 
  essentialBiomarkers, 
  coreBiomarkers, 
  advancedBiomarkers 
} from '../data/analysisPackages.js';

import { 
  filterBiomarkersByGender,
  searchBiomarkers 
} from '../data/biomarkersDict.js';

// DESDE ARCHIVO ORIGINAL (temporal)
import { addOnPackages } from '../data/biomarkers.js';
```

---

## ✅ **4. Beneficios de la Nueva Arquitectura**

### 🎯 **Separación Clara de Responsabilidades**
- **biomarkersDict.js**: Solo datos + helpers
- **analysisPackages.js**: Solo lógica de paquetes
- **biomarkers.js**: Referencia (temporal)

### 🔧 **Mantenibilidad**
- Un biomarcador = una definición
- Fácil agregar nuevos biomarcadores
- Validación automática de consistencia

### 📈 **Escalabilidad**
- Estructura preparada para crecimiento
- Nuevos paquetes = solo arrays de códigos
- APIs limpias y consistentes

### 🚀 **Performance**
- Código más limpio y organizado
- Imports específicos (tree-shaking friendly)
- Menos duplicación de datos

---

## 🧪 **5. Validaciones**

### 🔍 **Automáticas**
- Códigos únicos sin duplicados
- Todos los códigos existen en diccionario
- Jerarquía correcta de paquetes (Essential ⊂ Core ⊂ Advanced)

### 📊 **Estadísticas**
- 126 biomarcadores únicos en diccionario
- 44 categorías diferentes
- Distribución por género: both/male/female

---

## 🔄 **6. Plan de Consolidación**

### **Fase 1**: ✅ Arquitectura nueva creada
- `biomarkersDict.js` implementado
- `analysisPackages.js` implementado
- Tests de validación

### **Fase 2**: ⏳ Migración de componentes
- Migrar `PackageComparison.jsx`
- Migrar `PricingCards.jsx`
- Validar funcionamiento

### **Fase 3**: 🔮 Consolidación final
- Extraer add-ons a archivo separado
- Deprecar `biomarkers.js` original
- Documentación final

---

## 📝 **7. Uso de la Nueva Arquitectura**

### **Para acceder a biomarcadores individuales**:
```javascript
import { BIOMARKERS_DICTIONARY, searchBiomarkers } from '../data/biomarkersDict.js';

const hemograma = BIOMARKERS_DICTIONARY['H0000'];
const resultados = searchBiomarkers('hemograma');
```

### **Para trabajar con paquetes**:
```javascript
import { 
  essentialPackage, 
  corePackage, 
  getEssentialPackageForGender 
} from '../data/analysisPackages.js';

const pricing = essentialPackage.getPricing('male');
const package = getEssentialPackageForGender('female');
```

### **Para filtrar por género**:
```javascript
import { filterBiomarkersByGender } from '../data/biomarkersDict.js';
import { coreBiomarkers } from '../data/analysisPackages.js';

const maleCore = filterBiomarkersByGender(coreBiomarkers, 'male');
```

---

## 🎯 **8. Próximos Pasos**

1. **Migrar componentes restantes** a nueva arquitectura
2. **Extraer add-ons** a archivo separado
3. **Validar integración** completa
4. **Deprecar archivo original** cuando sea seguro

La nueva arquitectura está **lista para uso** y es completamente **funcional** ✅ 