# ⚙️ Configuración Inicial

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js**: v16+ (recomendado v18+)
- **npm**: v8+ o **yarn**: v1.22+
- **Git**: Para control de versiones
- **Editor**: VS Code recomendado con extensiones

### Instalación

#### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd Longevity_Analitycs
```

#### 2. Instalar Dependencias
```bash
# Con npm
npm install

# Con yarn
yarn install
```

#### 3. Ejecutar en Desarrollo
```bash
# Con npm
npm start

# Con yarn
yarn start
```

La aplicación se abrirá en `http://localhost:3000`

#### 4. Build para Producción
```bash
# Con npm
npm run build

# Con yarn
yarn build
```

## 🛠️ Configuración del Entorno

### Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:
```env
# Desarrollo
REACT_APP_ENV=development
REACT_APP_VERSION=2.0.0

# API Endpoints (futuro)
# REACT_APP_API_URL=http://localhost:3001

# Analytics (opcional)
# REACT_APP_GA_ID=GA_MEASUREMENT_ID
```

### Estructura del Proyecto
```
Longevity_Analitycs/
├── public/                 # Archivos públicos
│   ├── index.html         # HTML principal
│   └── favicon.ico        # Favicon
├── src/                   # Código fuente
│   ├── components/        # Componentes React
│   ├── contexts/          # Context API providers
│   ├── data/             # Configuraciones y datos
│   ├── styles/           # Estilos CSS
│   ├── utils/            # Utilidades
│   ├── App.jsx           # Componente principal
│   └── index.js          # Punto de entrada
├── docs/                 # Documentación
├── build/                # Build de producción
├── package.json          # Dependencias
└── README.md             # Documentación principal
```

## 🔧 Configuración de Herramientas

### VS Code (Recomendado)

#### Extensiones Recomendadas
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",      // Tailwind CSS IntelliSense
    "esbenp.prettier-vscode",         // Prettier formatter
    "dbaeumer.vscode-eslint",         // ESLint
    "ms-vscode.vscode-json",          // JSON support
    "formulahendry.auto-rename-tag",  // Auto rename HTML tags
    "ms-vscode.bracket-pair-colorizer-2" // Bracket colorizer
  ]
}
```

#### Configuración de Usuario (`settings.json`)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "html"
  }
}
```

### Prettier Configuration
Crear `.prettierrc` en la raíz:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### ESLint Configuration
El proyecto usa la configuración de Create React App. Para personalizaciones, modificar `package.json`:
```json
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "rules": {
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  }
}
```

## 🧪 Testing (Futuro)

### Configuración Básica
```bash
# Instalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Ejemplo de Test
```javascript
// src/__tests__/App.test.js
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders without crashing', () => {
  render(<App />);
  const element = screen.getByRole('main');
  expect(element).toBeInTheDocument();
});
```

## 🔍 Debugging

### React Developer Tools
1. Instalar extensión de navegador: [React Developer Tools](https://react.dev/learn/react-developer-tools)
2. Abrir DevTools → pestaña "Components" o "Profiler"

### Console Debugging
```javascript
// Debugging de Context
console.log('Language Context:', useLanguage());
console.log('Biomarker Selection:', useBiomarkerSelection());

// Debugging de datos
console.log('Profile Data:', getSelectedProfileData());
console.log('Pricing:', calculatePackagePrice());
```

### Performance Monitoring
```javascript
// En desarrollo, React ya incluye advertencias de performance
// Para análisis más detallado:
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id, 'Phase:', phase, 'Duration:', actualDuration);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

## 📦 Gestión de Dependencias

### Dependencias Principales
```json
{
  "react": "^18.2.0",           // Framework principal
  "react-dom": "^18.2.0",       // DOM renderer
  "framer-motion": "^10.16.5",  // Animaciones
  "react-icons": "^4.12.0"     // Iconos
}
```

### DevDependencies
```json
{
  "tailwindcss": "^3.3.6",     // Framework CSS
  "autoprefixer": "^10.4.16",  // PostCSS plugin
  "postcss": "^8.4.32"         // CSS processor
}
```

### Actualización de Dependencias
```bash
# Verificar dependencias obsoletas
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias mayores (con cuidado)
npm install react@latest react-dom@latest
```

## 🚨 Solución de Problemas Comunes

### Error: `Module not found`
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: `Port 3000 already in use`
```bash
# Usar puerto diferente
PORT=3001 npm start

# O matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9
```

### Error de Tailwind CSS
```bash
# Verificar configuración de Tailwind
npx tailwindcss --version

# Recompilar estilos
npm run build:css  # Si existe script personalizado
```

### Performance Issues
```javascript
// Usar React.memo para componentes pesados
const MyComponent = React.memo(function MyComponent({ data }) {
  return <div>{data}</div>;
});

// Lazy loading para componentes grandes
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

---

**Siguiente**: [Estándares de Código](./coding-standards.md) 