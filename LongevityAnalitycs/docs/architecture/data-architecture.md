# 🗄️ Arquitectura de Datos

## 📊 Visión General

La arquitectura de datos está diseñada para ser modular, escalable y fácil de mantener. Utiliza un sistema de códigos de biomarcadores centralizados con configuraciones JSON para perfiles y add-ons.

## 🧬 Estructura de Biomarcadores

### Sistema de Códigos
Cada biomarcador tiene un código único alfanumérico:
- **Formato**: `[A-Z][0-9]{4}` (ej: `B5350`, `T1720`)
- **Categorías**:
  - `B`: Bioquímica básica
  - `T`: Tests especializados
  - `H`: Hematología
  - `I`: Inmunología
  - `D`: Endocrinología
  - `G`: Genética
  - `M`: Microbiología
  - `AB`: Análisis avanzados

### Estructura de un Biomarcador
```javascript
{
  code: "B5350",           // Código único
  name: "Testosterona",    // Nombre del biomarcador
  category: "Hormonas",    // Categoría funcional
  description: "...",      // Descripción detallada
  gender: "male",          // Género específico (optional)
  priceData: {
    prevenii: 25.50,       // Precio Prevenii
    market: 45.00          // Precio mercado (PVP)
  }
}
```

## 📦 Perfiles Analíticos

### Factory Pattern para Perfiles
```javascript
const createPackage = (config) => {
  return {
    id: config.id,
    commonCodes: config.commonCodes,
    maleOnlyCodes: config.maleOnlyCodes,
    femaleOnlyCodes: config.femaleOnlyCodes,
    recommendedAddOns: config.recommendedAddOns,
    
    // Métodos dinámicos
    getForGender: function(gender) { /* ... */ },
    getPricing: function(gender) { /* ... */ }
  };
};
```

### Estructura por Perfil

#### 🌱 Essential (Básico)
```javascript
commonCodes: [
  // 68 códigos comunes para análisis fundamental
  'B0110', 'B0750', 'B2120', // Perfil lipídico
  'B1980', 'B0350', 'B0260', // Función renal
  // ... más códigos
],
maleOnlyCodes: [
  'B6480', 'D0601', 'D0850'  // Hormonas masculinas específicas
],
recommendedAddOns: [
  // TODOS los 16 add-ons disponibles para máxima flexibilidad
]
```

#### 🏃 Performance (Deportistas)
```javascript
commonCodes: [
  // 85 códigos orientados a rendimiento deportivo
  // Incluye Essential + biomarcadores específicos
],
maleOnlyCodes: ['B6480', 'D0601', 'D0850'],
femaleOnlyCodes: ['B5932', 'B6160', 'D0181', 'D0780'],
recommendedAddOns: [
  'iv_nutrients',    // Nutrientes para rendimiento
  'oxidative_cell',  // Estrés oxidativo
  'bone_mineral',    // Salud ósea
  'coagulation',     // Función hemostática
  'cardiovascular',  // Salud cardíaca
  'antioxidantes'    // Vitaminas para recuperación
]
```

#### 🎯 Core (Intermedio)
```javascript
commonCodes: [
  // 102 códigos para análisis intermedio completo
],
recommendedAddOns: [
  'hormonas',        // Análisis hormonal completo
  'immunity',        // Sistema inmunológico
  'gut_gate',        // Permeabilidad intestinal
  'metals',          // Detoxificación
  'endocrino',       // Eje hormonal avanzado
  'inflammation',    // Marcadores inflamatorios
  'digest'           // Función digestiva
]
```

#### 🚀 Advanced (Premium)
```javascript
commonCodes: [
  // 118 códigos para análisis premium
],
recommendedAddOns: [
  'cancer',          // Marcadores tumorales
  'bioage',          // Edad biológica
  'genome',          // Análisis genético
  'oxidative_cell',  // Estrés oxidativo completo
  'metals'           // Detoxificación avanzada
]
```

## 🧩 Add-Ons Especializados

### Factory Pattern para Add-Ons
```javascript
const createAddOnPackage = (config) => {
  return {
    id: config.id,
    codes: config.codes,
    maleOnlyCodes: config.maleOnlyCodes,
    femaleOnlyCodes: config.femaleOnlyCodes,
    hasGenderDifferences: config.hasGenderDifferences,
    
    // Pricing dinámico
    getPricing: function(gender) { /* ... */ },
    getForGender: function(gender) { /* ... */ }
  };
};
```

### Categorización por Especialidad

#### 🔬 Análisis Básicos
- **Hormonas**: 5 comunes + específicos por género
- **Endocrino**: 3 biomarcadores del eje hormonal
- **Antioxidantes**: 5 vitaminas antioxidantes

#### 🏥 Análisis Avanzados  
- **Cardiovascular**: 8 biomarcadores cardíacos
- **Inmunidad**: 6 marcadores inmunológicos
- **Metales Pesados**: 4 tests de detoxificación

#### 🧬 Análisis Especializados
- **Genética**: 6 tests genómicos completos
- **Cáncer**: 15 comunes + específicos por género
- **Edad Biológica**: 2 comunes + específicos por género

## 💰 Sistema de Pricing

### Estructura de Precios
```javascript
priceData: {
  prevenii: number,    // Precio Prevenii (costo)
  market: number       // Precio mercado (PVP referencial)
}
```

### Cálculo Dinámico
1. **Base**: Suma de precios Prevenii de biomarcadores
2. **Ajustes**: Aplicación de selecciones adicionales
3. **Género**: Filtrado automático por biomarcadores específicos
4. **Descuentos**: NO aplicados automáticamente (precio exacto)

### Algoritmo de Pricing
```javascript
const calculatePrice = (biomarkers, gender, type) => {
  // 1. Filtrar por género
  const genderFiltered = filterByGender(biomarkers, gender);
  
  // 2. Sumar precios Prevenii (sin descuentos)
  const totalPrice = genderFiltered.reduce((sum, bio) => {
    return sum + bio.priceData.prevenii;
  }, 0);
  
  // 3. Calcular PVP referencial
  const totalPvp = genderFiltered.reduce((sum, bio) => {
    return sum + bio.priceData.market;
  }, 0);
  
  return {
    price: totalPrice,
    marketPrice: totalPvp,
    testCount: genderFiltered.length
  };
};
```

## 🗂️ Archivos de Configuración

### Estructura de Archivos
```
src/data/
├── biomarkersDict.js        # Diccionario central de biomarcadores
├── priceData.js            # Datos de precios por código
├── analysisPackages.js     # Configuración de perfiles
├── addOnPackages.js        # Configuración de add-ons
└── priceCalculator.js      # Lógica de cálculo de precios
```

### Diccionario de Biomarcadores
```javascript
// biomarkersDict.js
export const biomarkersDict = {
  "B5350": {
    name: "Testosterona",
    category: "Hormonas",
    gender: "male",
    description: "Hormona sexual masculina principal..."
  },
  // ... ~200+ biomarcadores
};
```

### Datos de Precios
```javascript
// priceData.js
export const priceData = {
  "B5350": { prevenii: 25.50, market: 45.00 },
  "T1720": { prevenii: 18.75, market: 32.00 },
  // ... precios para todos los códigos
};
```

## 🔄 Flujo de Datos

### 1. Inicialización
```
App Load → Load biomarkersDict → Load priceData → Build Profiles/AddOns
```

### 2. Selección de Perfil
```
Profile Selection → Filter Codes by Gender → Calculate Prices → Update UI
```

### 3. Add-On Selection
```
AddOn Toggle → Merge Biomarkers → Recalculate Total → Update Recommendations
```

### 4. Género Change
```
Gender Change → Re-filter All Biomarkers → Recalculate All Prices → Update UI
```

## 📈 Escalabilidad

### Añadir Nuevos Biomarcadores
1. Agregar entrada en `biomarkersDict.js`
2. Agregar precio en `priceData.js`
3. Incluir código en perfil/add-on relevante

### Crear Nuevos Perfiles
1. Definir códigos de biomarcadores
2. Usar `createPackage()` factory
3. Exportar desde `analysisPackages.js`

### Crear Nuevos Add-Ons
1. Definir códigos específicos
2. Usar `createAddOnPackage()` factory  
3. Exportar desde `addOnPackages.js`

---

**Anterior**: [Visión General](./system-overview.md) | **Siguiente**: [Estructura de Componentes](./component-structure.md) 