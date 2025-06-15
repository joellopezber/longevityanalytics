# 🎨 Guía del Sistema de Diseño - Longevity Analytics

## 📋 Índice
1. [Introducción](#introducción)
2. [Tokens de Diseño](#tokens-de-diseño)
3. [Tipografía](#tipografía)
4. [Colores](#colores)
5. [Espaciado](#espaciado)
6. [Componentes](#componentes)
7. [Migración](#migración)
8. [Ejemplos de Uso](#ejemplos-de-uso)

## Introducción

Este sistema de diseño unifica la experiencia visual de Longevity Analytics, asegurando coherencia en todos los componentes y páginas.

### ✅ Beneficios
- **Coherencia visual**: Todos los elementos siguen las mismas reglas
- **Mantenibilidad**: Cambios centralizados en variables CSS
- **Eficiencia**: Clases reutilizables que aceleran el desarrollo
- **Escalabilidad**: Sistema preparado para crecer con el proyecto

## Tokens de Diseño

### 🎨 Colores

#### Primarios (Verde Longevity)
```css
--color-primary-50: #f0f9f4;   /* Fondos muy claros */
--color-primary-100: #dcf4e6;  /* Fondos claros */
--color-primary-500: #2D5A3D;  /* Color principal */
--color-primary-600: #4A7C59;  /* Color secundario */
--color-primary-700: #1f472a;  /* Hovers oscuros */
```

#### Neutros (Grises)
```css
--color-neutral-50: #f8fafc;   /* Fondos */
--color-neutral-200: #e2e8f0;  /* Bordes */
--color-neutral-600: #475569;  /* Texto secundario */
--color-neutral-900: #0f172a;  /* Texto principal */
```

#### Estados
```css
--color-success: #22c55e;      /* Verde éxito */
--color-warning: #f59e0b;      /* Amarillo advertencia */
--color-error: #ef4444;        /* Rojo error */
--color-info: #3b82f6;         /* Azul información */
```

### 📝 Tipografía

#### Clases Semánticas
```css
.text-display-xl    /* Títulos principales (60px) */
.text-display-lg    /* Títulos grandes (48px) */
.text-display-md    /* Títulos medianos (36px) */
.text-heading-xl    /* Subtítulos grandes (30px) */
.text-heading-lg    /* Subtítulos (24px) */
.text-heading-md    /* Subtítulos pequeños (20px) */
.text-heading-sm    /* Encabezados de sección (18px) */
.text-body-lg       /* Texto grande (18px) */
.text-body          /* Texto normal (16px) */
.text-body-sm       /* Texto pequeño (14px) */
.text-caption       /* Texto muy pequeño (12px) */
```

#### Jerarquía Recomendada
```html
<!-- Página Principal -->
<h1 class="text-display-lg">Título Principal</h1>
<p class="text-body-lg">Descripción principal</p>

<!-- Secciones -->
<h2 class="text-heading-xl">Sección</h2>
<p class="text-body">Contenido de la sección</p>

<!-- Subsecciones -->
<h3 class="text-heading-lg">Subsección</h3>
<p class="text-body-sm">Contenido secundario</p>

<!-- Detalles -->
<h4 class="text-heading-md">Detalles</h4>
<p class="text-caption">Información adicional</p>
```

### 📏 Espaciado

#### Sistema de 4px
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-20: 5rem;    /* 80px */
```

#### Clases Semánticas
```css
.section-padding     /* Padding estándar para secciones */
.container-padding   /* Padding responsive para contenedores */
.content-spacing     /* Espaciado entre elementos de contenido */
.content-spacing-lg  /* Espaciado amplio entre elementos */
```

## Componentes

### 🔘 Botones

#### Tipos Principales
```html
<!-- Botón Primario -->
<button class="btn-primary">Acción Principal</button>
<button class="btn-primary btn-large">Acción Principal Grande</button>

<!-- Botón Secundario -->
<button class="btn-secondary">Acción Secundaria</button>
<button class="btn-secondary btn-small">Acción Pequeña</button>
```

#### Variantes
```css
.btn-primary        /* Botón principal con gradiente verde */
.btn-secondary      /* Botón secundario con borde */
.btn-large          /* Botón grande (padding amplio) */
.btn-small          /* Botón pequeño (padding reducido) */
```

### 🃏 Cards

#### Tipos de Cards
```html
<!-- Card Básica -->
<div class="card-base p-6">
  <h3 class="text-heading-md">Título</h3>
  <p class="text-body-sm">Descripción</p>
</div>

<!-- Card Elevada -->
<div class="card-elevated p-6">
  <h3 class="text-heading-md">Título</h3>
  <p class="text-body-sm">Descripción</p>
</div>

<!-- Card Interactiva -->
<div class="card-interactive p-6">
  <h3 class="text-heading-md">Título</h3>
  <p class="text-body-sm">Descripción</p>
</div>
```

### 🎯 Elementos Destacados

#### Cajas de Destacado
```html
<!-- Caja de Destacado -->
<div class="highlight-box">
  <p class="text-body font-medium">
    "Información importante destacada"
  </p>
</div>

<!-- Estadística Destacada -->
<div class="text-center">
  <div class="stat-highlight text-heading-xl">+150</div>
  <div class="text-body-sm text-neutral-600">Biomarcadores</div>
</div>
```

#### Estados y Feedback
```html
<!-- Estado de Éxito -->
<div class="success-state p-4 rounded-lg">
  <p>Operación completada exitosamente</p>
</div>

<!-- Estado de Advertencia -->
<div class="warning-state p-4 rounded-lg">
  <p>Atención: Revisa la información</p>
</div>

<!-- Estado de Error -->
<div class="error-state p-4 rounded-lg">
  <p>Error: No se pudo completar la acción</p>
</div>
```

### 🌈 Gradientes

#### Gradientes Principales
```html
<!-- Gradiente Primario -->
<div class="gradient-primary text-white p-8 rounded-xl">
  <h2 class="text-heading-lg">Título con Gradiente</h2>
</div>

<!-- Gradiente Sutil -->
<div class="gradient-subtle p-8 rounded-xl">
  <h2 class="text-heading-lg">Título con Fondo Sutil</h2>
</div>

<!-- Texto con Gradiente -->
<h1 class="gradient-text text-display-lg">
  Texto con Gradiente Verde
</h1>
```

## Migración

### 🔄 Plan de Migración

#### Fase 1: Componentes Principales
1. **HeroSection**: Aplicar `.text-display-lg`, `.btn-primary`, `.highlight-box`
2. **Header**: Estandarizar con `.text-heading-sm`, `.btn-primary`
3. **PackagesSection**: Usar `.card-interactive`, `.text-heading-md`

#### Fase 2: Componentes Secundarios
1. **Modales**: Aplicar `.card-elevated`, tipografía semántica
2. **Formularios**: Usar colores de estado, espaciado coherente
3. **Botones**: Migrar a `.btn-primary` y `.btn-secondary`

#### Fase 3: Refinamiento
1. **Espaciado**: Reemplazar `p-4`, `mb-6` por clases semánticas
2. **Colores**: Migrar colores hardcodeados a variables CSS
3. **Tipografía**: Eliminar tamaños inconsistentes

### 🚀 Guía de Reemplazo

#### Tipografía Antigua → Nueva
```css
/* Antes */
.text-4xl.font-bold → .text-display-md
.text-3xl.font-bold → .text-heading-xl
.text-2xl.font-semibold → .text-heading-lg
.text-xl.font-semibold → .text-heading-md
.text-lg.font-medium → .text-heading-sm
.text-lg → .text-body-lg
.text-base → .text-body
.text-sm → .text-body-sm
.text-xs → .text-caption
```

#### Colores Antiguos → Nuevos
```css
/* Antes */
.text-green-700 → .text-primary-600
.text-green-600 → .text-primary-500
.bg-green-50 → .bg-primary-50
.border-green-500 → .border-primary-500
.text-gray-900 → .text-neutral-900
.text-gray-600 → .text-neutral-600
```

#### Botones Antiguos → Nuevos
```css
/* Antes */
.bg-gradient-to-r.from-green-700.to-green-600 → .btn-primary
.border-2.border-gray-300 → .btn-secondary
```

## Ejemplos de Uso

### 📄 Página Completa
```html
<section class="section-padding gradient-subtle">
  <div class="container-max container-padding">
    <div class="text-center content-spacing-lg">
      <h1 class="text-display-lg gradient-text">
        Toma el Control de tu Longevidad
      </h1>
      <p class="text-body-lg text-neutral-600 max-w-4xl mx-auto">
        Descripción principal de la página con información relevante
      </p>
      <div class="highlight-box max-w-3xl mx-auto">
        <p class="text-body font-medium">
          "Cita o información destacada importante"
        </p>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      <div class="card-interactive text-center content-spacing">
        <div class="stat-highlight text-heading-xl">+150</div>
        <h3 class="text-heading-sm">Biomarcadores</h3>
        <p class="text-body-sm text-neutral-600">Análisis completo</p>
      </div>
      <!-- Más cards... -->
    </div>
    
    <div class="text-center mt-16">
      <button class="btn-primary btn-large">
        Empezar Análisis
      </button>
      <button class="btn-secondary btn-large ml-4">
        Más Información
      </button>
    </div>
  </div>
</section>
```

### 🎯 Componente Destacado
```html
<div class="gradient-primary text-white rounded-2xl p-8">
  <div class="content-spacing">
    <h2 class="text-heading-lg">Análisis Personalizado</h2>
    <p class="text-body-lg opacity-90">
      Resultados basados en tu perfil único
    </p>
    <div class="grid grid-cols-3 gap-4 mt-8">
      <div class="text-center">
        <div class="text-heading-md">85%</div>
        <div class="text-body-sm opacity-75">Precisión</div>
      </div>
      <div class="text-center">
        <div class="text-heading-md">48h</div>
        <div class="text-body-sm opacity-75">Resultados</div>
      </div>
      <div class="text-center">
        <div class="text-heading-md">24/7</div>
        <div class="text-body-sm opacity-75">Soporte</div>
      </div>
    </div>
  </div>
</div>
```

---

## 🎯 Próximos Pasos

1. **Revisar** esta guía con el equipo
2. **Implementar** el sistema en componentes principales
3. **Probar** en diferentes dispositivos
4. **Iterar** basándose en feedback
5. **Documentar** casos especiales

## 📝 Notas Importantes

- **Mantener** consistencia en todo momento
- **Documentar** cualquier excepción o caso especial
- **Revisar** periódicamente el uso del sistema
- **Actualizar** la guía según evolucionen las necesidades

---

*Esta guía es un documento vivo que debe actualizarse conforme evoluciona el proyecto.* 