# 🏛️ Visión General del Sistema

## 📋 Introducción

Longevity Analytics es una aplicación web moderna para la presentación y configuración de análisis clínicos de longevidad. El sistema permite a los usuarios explorar diferentes perfiles analíticos y añadir módulos especializados (add-ons) según sus necesidades.

## 🎯 Objetivos del Sistema

### Funcionales
- **Exploración de Perfiles**: 4 perfiles analíticos diferenciados (Essential, Performance, Core, Advanced)
- **Add-Ons Especializados**: 16 módulos complementarios personalizables
- **Pricing Dinámico**: Cálculo de precios en tiempo real según selecciones
- **Multi-idioma**: Soporte para 3 idiomas (ES, EN, FR)
- **Responsive**: Adaptable a dispositivos móviles, tablet y desktop

### No Funcionales
- **Rendimiento**: Tiempo de carga < 3 segundos
- **Escalabilidad**: Arquitectura modular extensible
- **Mantenibilidad**: Código limpio y bien documentado
- **Accesibilidad**: Interfaz intuitiva y accesible

## 🏗️ Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React SPA)                        │
├─────────────────────────────────────────────────────────────────┤
│  UI Layer                                                       │
│  ├── Components (React)                                        │
│  ├── Styles (Tailwind CSS)                                     │
│  └── Animations (Framer Motion)                                │
├─────────────────────────────────────────────────────────────────┤
│  State Management                                               │
│  ├── Context API (Global State)                                │
│  ├── Local State (useState)                                    │
│  └── Biomarker Selection Context                               │
├─────────────────────────────────────────────────────────────────┤
│  Business Logic                                                 │
│  ├── Data Layer (JSON configs)                                 │
│  ├── Price Calculator                                          │
│  ├── Biomarkers Dictionary                                     │
│  └── Analysis Packages                                         │
├─────────────────────────────────────────────────────────────────┤
│  Internationalization                                           │
│  ├── Language Context                                          │
│  ├── Translation Files (ES, EN, FR)                           │
│  └── Dynamic Content Loading                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Datos

### 1. Inicialización
```
App.jsx → LanguageContext → BiomarkerSelectionContext → UI Components
```

### 2. Selección de Perfil
```
User Interaction → Profile Selection → Recommended Add-Ons → Price Calculation
```

### 3. Configuración de Add-Ons
```
Add-On Selection → Biomarker Updates → Price Recalculation → UI Updates
```

## 📦 Módulos Principales

### Análisis de Perfiles
- **Essential**: Perfil básico fundamental
- **Performance**: Orientado a deportistas y rendimiento
- **Core**: Análisis intermedio completo
- **Advanced**: Análisis premium con genética

### Add-Ons Especializados
1. **Hormonas**: Análisis hormonal completo
2. **Endocrino**: Eje hormonal avanzado  
3. **Antioxidantes**: Vitaminas antioxidantes
4. **Estrés Oxidativo**: Sistema glutatión
5. **Inflamación**: Marcadores inflamatorios
6. **Cardiovascular**: Perfil cardíaco avanzado
7. **IV & Nutrientes**: Oligoelementos y vitaminas
8. **Metales Pesados**: Detoxificación
9. **Inmunidad**: Sistema inmunológico
10. **Digestión**: Función digestiva
11. **Permeabilidad Intestinal**: Barrera intestinal
12. **Coagulación**: Sistema hemostático
13. **Salud Ósea**: Metabolismo óseo
14. **Panel Genómico**: Análisis genético
15. **Cáncer**: Marcadores tumorales
16. **Edad Biológica**: Tests epigenéticos

## 🎨 Patrones de Diseño

### Factory Pattern
- **Uso**: Creación de perfiles y add-ons
- **Beneficio**: Uniformidad en la estructura de datos

### Context Pattern
- **Uso**: Gestión de estado global (idioma, selecciones)
- **Beneficio**: Evita prop drilling

### Composition Pattern
- **Uso**: Composición de componentes UI
- **Beneficio**: Reutilización y flexibilidad

### Strategy Pattern
- **Uso**: Cálculo de precios según género y selecciones
- **Beneficio**: Algoritmos intercambiables

## 🔧 Tecnologías y Herramientas

### Core
- **React 18**: Framework principal
- **JavaScript ES6+**: Lenguaje base
- **Tailwind CSS**: Framework de estilos
- **Framer Motion**: Animaciones

### Desarrollo
- **Create React App**: Scaffolding
- **ESLint**: Linting de código
- **Git**: Control de versiones

### Build y Deploy
- **Webpack**: Bundling (vía CRA)
- **Babel**: Transpilación (vía CRA)
- **PostCSS**: Procesamiento CSS

## 📊 Métricas y Rendimiento

### Bundle Size
- **Main Bundle**: ~149KB gzipped
- **CSS Bundle**: ~4KB gzipped
- **Total**: ~153KB gzipped

### Componentes
- **Páginas**: 1 (SPA)
- **Componentes React**: ~15 principales
- **Context Providers**: 2
- **Archivos de datos**: ~6

---

**Siguiente**: [Arquitectura de Datos](./data-architecture.md) 