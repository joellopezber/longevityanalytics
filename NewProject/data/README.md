# 🧬 Sistema de Biomarcadores y Precios - Longevity Analytics

## 📋 **Resumen del Sistema**

Este sistema unifica y centraliza toda la información de biomarcadores, perfiles, add-ons y precios de la plataforma de longevidad, proporcionando una API robusta para consultas y cálculos automáticos.

---

## 🏗️ **Arquitectura del Sistema**

### **Estructura de Archivos**
```
/data/
├── biomarkers.js     # Diccionario centralizado de biomarcadores
├── profiles.js       # Perfiles/paquetes con códigos de biomarcadores
├── addons.js         # Add-ons modulares con códigos
├── pricing.js        # Precios por código + funciones de cálculo
└── README.md         # Esta documentación

/app/api/
├── biomarkers/route.js  # API endpoint para biomarcadores
├── profiles/route.js    # API endpoint para perfiles
├── addons/route.js      # API endpoint para add-ons
└── pricing/route.js     # API endpoint para cálculos de precios

/lib/
└── api-client.js     # Cliente helper para usar la API
```

---

## 🧬 **Sistema de Biomarcadores**

### **Archivo: `/data/biomarkers.js`**
Contiene **140+ biomarcadores** organizados por categorías:

- **Hematología** (H0000, H0020, etc.)
- **Bioquímica Básica** (B0000-B0999)
- **Hormonas** (B5000-B6999, D0000-D1999)
- **Vitaminas** (T0000-T3999)
- **Marcadores Tumorales** (B5080-B8999, I5080-I5090)
- **Análisis Genéticos** (OG001-OG006, G1465)
- **Tests Especializados** (AB001-AB002, P3031)

### **Estructura de Biomarcador**
```javascript
"B5350": { 
  name: "Estradiol", 
  category: "Hormonas femeninas", 
  gender: "both" 
}
```

---

## 📦 **Sistema de Perfiles**

### **Archivo: `/data/profiles.js`**
Define **4 paquetes principales**:

#### **🔸 Essential** (43 biomarcadores base + 1 masculino)
- Paquete básico de longevidad
- Metabolismo, función renal/hepática, tiroides, vitaminas

#### **🔸 Performance** (52 biomarcadores + específicos por género)
- Rendimiento deportivo y optimización física
- Incluye hormonas deportivas, antioxidantes, inflamación

#### **🔸 Core** (68 biomarcadores + específicos por género)
- Análisis hormonal completo + epigenética básica
- Estrés oxidativo, perfil lipídico avanzado

#### **🔸 Advanced** (103 biomarcadores + específicos por género)
- Análisis más exhaustivo disponible
- Marcadores tumorales, metales pesados, microbioma, genética

### **Función Helper**
```javascript
import { getBiomarkersForProfile } from '@/data/profiles';
const biomarkers = getBiomarkersForProfile('essential', 'male');
```

---

## 🔧 **Sistema de Add-ons**

### **Archivo: `/data/addons.js`**
**17 add-ons modulares** organizados por categorías:

| Add-on | Categoría | Biomarcadores | Descripción |
|--------|-----------|---------------|-------------|
| `hormonas` | Hormonal | 5 comunes + específicos | Panel hormonal completo |
| `endocrino` | Endocrinología | 3 biomarcadores | Eje hipotalámico-pituitario |
| `antioxidantes` | Antioxidantes | 5 biomarcadores | Vitaminas liposolubles |
| `cardiovascular` | Cardiovascular | 8 biomarcadores | Riesgo cardiovascular avanzado |
| `cancer` | Oncología | 14 comunes + específicos | Marcadores tumorales |
| `bioage` | Longevidad | 2 comunes + específicos | Edad biológica |
| `genome` | Genética | 5 biomarcadores | Análisis genético completo |

### **Función Helper**
```javascript
import { getBiomarkersForAddon } from '@/data/addons';
const biomarkers = getBiomarkersForAddon('hormonas', 'female');
```

---

## 💰 **Sistema de Precios**

### **Archivo: `/data/pricing.js`**
Contiene precios para **todos los biomarcadores**:

```javascript
"B5350": { 
  precio: 12.48,    // Precio base
  pvp: 16.28,       // Precio público
  name: "Estradiol" 
}
```

### **Funciones de Cálculo**
```javascript
import { getPriceBreakdown, calculateTotalPrice } from '@/data/pricing';

// Calcular precio total
const total = calculateTotalPrice(['B5350', 'B5380'], false); // precio base
const totalPVP = calculateTotalPrice(['B5350', 'B5380'], true); // PVP

// Desglose detallado
const breakdown = getPriceBreakdown(['B5350', 'B5380']);
// Retorna: { breakdown: [...], totals: { precio, pvp, discount, discountPercentage } }
```

---

## 🚀 **API Endpoints**

### **1. Biomarcadores: `/api/biomarkers`**

#### **GET - Consultar biomarcadores**
```bash
# Obtener un biomarcador específico
GET /api/biomarkers?code=B5350

# Buscar por categoría
GET /api/biomarkers?category=hormonas

# Filtrar por género
GET /api/biomarkers?gender=female
```

#### **POST - Múltiples biomarcadores**
```bash
POST /api/biomarkers
{
  "codes": ["B5350", "B5380", "B6160"]
}
```

### **2. Perfiles: `/api/profiles`**

#### **GET - Consultar perfiles**
```bash
# Todos los perfiles con precios
GET /api/profiles?gender=male

# Perfil específico con detalles
GET /api/profiles?id=essential&gender=male&details=true
```

#### **POST - Perfil con add-ons**
```bash
POST /api/profiles
{
  "profileId": "core",
  "addons": ["hormonas", "cardiovascular"],
  "gender": "female"
}
```

### **3. Add-ons: `/api/addons`**

#### **GET - Consultar add-ons**
```bash
# Todos los add-ons
GET /api/addons?gender=both

# Por categoría
GET /api/addons?category=hormonal

# Add-on específico
GET /api/addons?id=hormonas&details=true
```

#### **POST - Múltiples add-ons**
```bash
POST /api/addons
{
  "addonIds": ["hormonas", "cardiovascular", "antioxidantes"],
  "gender": "male"
}
```

### **4. Precios: `/api/pricing`**

#### **POST - Cálculo personalizado**
```bash
POST /api/pricing
{
  "profileId": "essential",
  "addonIds": ["hormonas"],
  "gender": "male"
}
```

#### **PUT - Cálculo incremental**
```bash
PUT /api/pricing
{
  "baseProfile": "core",
  "selectedAddons": ["hormonas", "cardiovascular"],
  "gender": "female"
}
```

---

## 🛠️ **Cliente API Helper**

### **Archivo: `/lib/api-client.js`**

#### **Uso Básico**
```javascript
import apiClient from '@/lib/api-client';

// Obtener todos los perfiles
const profiles = await apiClient.profiles.getAll('male');

// Obtener configuración completa
const config = await apiClient.utils.getCompleteConfiguration(
  'essential', 
  ['hormonas', 'cardiovascular'], 
  'male'
);

// Comparar perfiles
const comparison = await apiClient.utils.compareProfiles(
  ['essential', 'core', 'advanced'], 
  'female'
);
```

#### **Funciones de Conveniencia**
- `getCompleteConfiguration()` - Obtiene perfil + add-ons + precios
- `compareProfiles()` - Compara múltiples perfiles
- `getRecommendedAddons()` - Recomienda add-ons basado en perfil

---

## 📊 **Ejemplos de Uso**

### **1. Calcular Precio de Perfil Essential para Hombre**
```javascript
const response = await fetch('/api/profiles?id=essential&gender=male');
const profile = await response.json();

console.log(`${profile.name}: ${profile.pricing.precio}€ (PVP: ${profile.pricing.pvp}€)`);
// Essential: 287.45€ (PVP: 402.18€)
```

### **2. Agregar Add-ons y Calcular Precio Total**
```javascript
const config = {
  profileId: 'core',
  addonIds: ['hormonas', 'cardiovascular'],
  gender: 'female'
};

const response = await fetch('/api/profiles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(config)
});

const result = await response.json();
console.log(`Total: ${result.pricing.precio}€`);
console.log(`Biomarcadores: ${result.biomarkerCount}`);
```

### **3. Obtener Recomendaciones de Add-ons**
```javascript
import { getRecommendedAddons } from '@/lib/api-client';

const recommendations = await getRecommendedAddons('essential', 'male');
console.log('Add-ons recomendados:', recommendations.recommended);
```

---

## ✅ **Beneficios del Nuevo Sistema**

### **🔸 Centralización**
- ✅ Datos unificados en archivos estructurados
- ✅ API consistente para todas las consultas
- ✅ Eliminación de duplicación de código

### **🔸 Escalabilidad**
- ✅ Fácil agregar nuevos biomarcadores/perfiles/add-ons
- ✅ Precios calculados automáticamente
- ✅ Sistema modular y extensible

### **🔸 Mantenimiento**
- ✅ Un solo lugar para actualizar precios
- ✅ Tipado TypeScript para mayor seguridad
- ✅ Funciones helper reutilizables

### **🔸 Performance**
- ✅ Cálculos optimizados en servidor
- ✅ Eliminación automática de duplicados
- ✅ API caching-friendly

---

## 🔄 **Migración desde Sistema Anterior**

El nuevo sistema **reemplaza completamente**:
- ❌ `DicBio.js` → ✅ `biomarkers.js`
- ❌ `packCodes.js` → ✅ `profiles.js`
- ❌ `addonsCodes.js` → ✅ `addons.js`
- ❌ `priceCodes.js` → ✅ `pricing.js`

**Ventajas:**
- Estructura más limpia y tipada
- API REST estándar
- Cálculos automáticos de precios
- Sistema de consultas más potente

---

## 🚀 **Próximos Pasos**

1. **Integrar en componentes existentes** (PackageConfigurator, OrderSummary, etc.)
2. **Agregar caching** en endpoints para mejor performance
3. **Implementar validaciones** adicionales en la API
4. **Crear dashboard** administrativo para gestionar datos
5. **Agregar tests unitarios** para todas las funciones

---

*📚 Para más información o dudas sobre el sistema, consulta los archivos de código comentados o la implementación de la API.* 