# 🧬 Longevity Analytics

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.3.6-blue)
![Build](https://img.shields.io/badge/Build-Passing-green)
![License](https://img.shields.io/badge/License-MIT-green)

**Aplicación web moderna para la exploración y configuración de análisis clínicos de longevidad**

Una plataforma interactiva que permite a los usuarios explorar diferentes perfiles analíticos y personalizar su selección con módulos especializados (add-ons), con soporte multiidioma y pricing dinámico.

![Demo App](https://via.placeholder.com/800x400/1f2937/ffffff?text=Longevity+Analytics+Demo)

## ✨ Características Principales

### 🎯 **Sistema de Análisis Modular**
- **4 Perfiles Principales**: Essential, Performance, Core, Advanced
- **16 Add-Ons Especializados**: Módulos complementarios personalizables
- **Análisis por Género**: Biomarcadores específicos y pricing diferenciado
- **Recomendaciones Inteligentes**: Add-ons sugeridos según perfil seleccionado

### 🌍 **Internacionalización Completa**
- **3 Idiomas**: Español, Inglés, Francés
- **Contenido Dinámico**: Traducciones automáticas de textos, beneficios y características
- **Sistema Robusto**: Manejo inteligente de traducciones faltantes

### 💰 **Pricing Dinámico**
- **Cálculo en Tiempo Real**: Precios actualizados según selecciones
- **Sistema Dual**: Precio Prevenii (costo) vs Precio Market (PVP)
- **Transparencia**: Desglose completo de biomarcadores incluidos

### 🎨 **Interfaz Moderna**
- **Responsive Design**: Optimizada para móvil, tablet y desktop
- **Animaciones Suaves**: Framer Motion para transiciones profesionales
- **UX Intuitiva**: Cards interactivas y feedback visual en tiempo real

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 16+ (recomendado 18+)
- npm 8+ o yarn 1.22+

### Instalación y Ejecución

   ```bash
# Clonar repositorio
git clone <repository-url>
cd Longevity_Analitycs

# Instalar dependencias
   npm install

# Ejecutar en desarrollo
   npm start
# La aplicación se abrirá en http://localhost:3000

# Compilar para producción
npm run build
```

## 🏗️ Arquitectura

### Stack Tecnológico
- **Frontend**: React 18 + Hooks
- **Styling**: Tailwind CSS 3.3
- **Animaciones**: Framer Motion 10.16
- **Iconos**: React Icons 4.12
- **Build**: Create React App (Webpack + Babel)

### Estructura del Proyecto
```
src/
├── components/          # Componentes React
│   ├── MedicalSystemsExplorer.jsx  # Componente principal
│   └── PackageComparison.jsx       # Comparador de paquetes
├── contexts/           # Context API providers
│   ├── LanguageContext.js          # Sistema de traducciones
│   └── BiomarkerSelectionContext.js # Estado de selecciones
├── data/              # Configuraciones y datos
│   ├── biomarkersDict.js           # Diccionario de biomarcadores
│   ├── analysisPackages.js         # Configuración de perfiles
│   ├── addOnPackages.js            # Configuración de add-ons
│   ├── priceData.js                # Datos de precios
│   └── priceCalculator.js          # Lógica de cálculo
├── styles/            # Estilos CSS personalizados
└── images/            # Assets e imágenes
```

## 📊 Sistema de Datos

### Perfiles Analíticos
| Perfil | Tests (M/W) | Add-Ons Recomendados | Enfoque |
|--------|-------------|----------------------|---------|
| **Essential** | 44/43 | Todos (16) disponibles | Análisis fundamental |
| **Performance** | 58/60 | 6 específicos | Deportistas y rendimiento |
| **Core** | 76/75 | 7 intermedios | Análisis completo |
| **Advanced** | 120/119 | 5 especializados | Análisis premium |

### Add-Ons Especializados
- 🧬 **Hormonas, Endocrino** - Análisis hormonal
- 🛡️ **Antioxidantes, Estrés Oxidativo** - Sistema antioxidante
- ❤️ **Cardiovascular, Inflamación** - Salud cardíaca
- 🦴 **Salud Ósea, Coagulación** - Metabolismo óseo
- 🧠 **Inmunidad, Digestión** - Sistemas corporales
- 🧪 **Genética, Cáncer, Edad Biológica** - Análisis avanzados

## 🔧 Configuración

### Variables de Entorno
```env
# .env
REACT_APP_ENV=production
REACT_APP_VERSION=2.0.0
```

### Extensiones VS Code Recomendadas
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

## 📚 Documentación

Para documentación completa y detallada, consulta la carpeta [`docs/`](./docs/):

- 📖 **[Guía Completa](./docs/README.md)** - Índice general de documentación
- 🏛️ **[Arquitectura](./docs/architecture/)** - Documentación técnica del sistema
- 👩‍💻 **[Desarrollo](./docs/development/)** - Guías para desarrolladores
- 🔄 **[Migración](./docs/migration/)** - Historial de cambios y migración v2
- 🛠️ **[Troubleshooting](./docs/troubleshooting/)** - Solución de problemas

## 🤝 Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

Por favor, lee las [guías de contribución](./docs/development/coding-standards.md) antes de contribuir.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 📊 Estado del Proyecto

### ✅ Completado (v2.0.0)
- [x] Arquitectura refactorizada y modular
- [x] Sistema de traducciones completo (ES/EN/FR)
- [x] 4 perfiles + 16 add-ons completamente funcionales
- [x] Pricing dinámico con diferenciación por género
- [x] Build optimizado sin warnings
- [x] Documentación completa y organizada
- [x] Interfaz responsive y moderna

### 🔮 Futuras Mejoras
- [ ] Testing automatizado con Jest/React Testing Library
- [ ] API backend para persistencia de datos
- [ ] Dashboard de administración
- [ ] Analytics y tracking de uso
- [ ] PWA (Progressive Web App)
- [ ] Más idiomas (IT, DE, PT)

## 📞 Soporte

- 📚 **Documentación**: [`docs/`](./docs/)
- 🐛 **Issues**: [GitHub Issues](../../issues)
- 🔧 **Problemas comunes**: [Troubleshooting](./docs/troubleshooting/)

---

**Desarrollado con ❤️ para el futuro de la medicina personalizada**

*Última actualización: Diciembre 2024 | Versión: v2.0.0* 