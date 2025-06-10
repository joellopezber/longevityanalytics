# 🔧 Errores de Build y Soluciones

## 🚨 Errores Comunes de Compilación

### Error: `Cannot resolve module`
```bash
Error: Cannot resolve module 'module-name'
```

**Solución**:
```bash
# 1. Verificar que el módulo esté instalado
npm list module-name

# 2. Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# 3. Verificar imports
# Asegurarse de que la ruta es correcta
import { Component } from './components/Component';
```

### Error: `Module not found: Can't resolve`
```bash
Module not found: Can't resolve './data/someFile.js'
```

**Solución**:
```bash
# Verificar que el archivo existe y la ruta es correcta
ls -la src/data/

# Verificar extensiones (.js, .jsx)
# React prefiere .jsx para componentes
```

### Error de ESLint: `'variable' is defined but never used`
```bash
Line X:Y:  'variableName' is defined but never used  no-unused-vars
```

**Solución**:
```javascript
// Eliminar variables no utilizadas
// ANTES:
import { usedFunction, unusedFunction } from './utils';
const usedVar = 'value';
const unusedVar = 'value';

// DESPUÉS:
import { usedFunction } from './utils';
const usedVar = 'value';
```

### Error: `React Hook "useState" is called conditionally`
```bash
React Hook "useState" is called conditionally. React Hooks must be called in the exact same order every time.
```

**Solución**:
```javascript
// ❌ INCORRECTO:
if (condition) {
  const [state, setState] = useState();
}

// ✅ CORRECTO:
const [state, setState] = useState();
if (condition) {
  // usar state aquí
}
```

## ⚠️ Warnings de Build

### Warning: `Each child in a list should have a unique "key" prop`
```bash
Warning: Each child in a list should have a unique "key" prop.
```

**Solución**:
```javascript
// ❌ INCORRECTO:
{items.map(item => <div>{item.name}</div>)}

// ✅ CORRECTO:
{items.map(item => <div key={item.id}>{item.name}</div>)}

// ✅ Si no hay ID único:
{items.map((item, index) => <div key={`item-${index}`}>{item.name}</div>)}
```

### Warning: `componentWillReceiveProps has been renamed`
```bash
Warning: componentWillReceiveProps has been renamed, and is not recommended for use.
```

**Solución**:
```javascript
// Usar hooks en lugar de class components
// ❌ INCORRECTO:
class MyComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    // lógica
  }
}

// ✅ CORRECTO:
function MyComponent({ prop }) {
  useEffect(() => {
    // lógica cuando prop cambia
  }, [prop]);
}
```

## 🎯 Errores Específicos del Proyecto

### Error: `Cannot read property 'map' of undefined`
```bash
TypeError: Cannot read property 'map' of undefined
```

**Contexto**: Ocurre al intentar hacer `.map()` sobre traducciones que no son arrays.

**Solución**:
```javascript
// ❌ PROBLEMÁTICO:
{t('addOnBenefits.hormonas').map(benefit => (
  <li key={benefit}>{benefit}</li>
))}

// ✅ CORRECTO:
{(() => {
  const benefits = t('addOnBenefits.hormonas');
  if (Array.isArray(benefits)) {
    return benefits.map((benefit, idx) => (
      <li key={idx}>{benefit}</li>
    ));
  } else {
    return <li>No hay beneficios disponibles</li>;
  }
})()}
```

### Error: `Cannot resolve './data/nonExistentFile'`
```bash
Module not found: Can't resolve './data/nonExistentFile'
```

**Contexto**: Referencias a archivos que han sido refactorizados o eliminados.

**Solución**:
```javascript
// Verificar imports después de refactoring
// ANTES:
import { oldFunction } from './data/oldFile';

// DESPUÉS:
import { newFunction } from './data/newFile';
```

### Error: Traducciones Faltantes
```bash
Warning: Translation key 'key.path' not found
```

**Solución**:
```javascript
// Verificar en LanguageContext.js que la clave existe
export const translations = {
  es: {
    systems: {
      analysisProfiles: {
        essential: {
          title: "Essential", // ✅ Clave existe
          // agregar claves faltantes
        }
      }
    }
  }
};
```

## 🔄 Errores de Hot Reload

### Error: `Cannot hot reload component`
```bash
react-refresh/babel: Cannot hot reload a component while preserving local state.
```

**Solución**:
```bash
# Refrescar manualmente el navegador
# O reiniciar el servidor de desarrollo
npm start
```

### Error: `Module hot update failed`
```bash
[HMR] Cannot apply update. Reloading...
```

**Solución**:
```bash
# Limpiar cache y reiniciar
rm -rf node_modules/.cache
npm start
```

## 🚀 Optimización de Build

### Bundle Size Too Large
```bash
WARNING: Bundle size exceeds recommended limit
```

**Solución**:
```javascript
// 1. Análisis del bundle
npm run build
npx serve -s build

// 2. Lazy loading para componentes grandes
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// 3. Tree shaking - importar solo lo necesario
// ❌ INCORRECTO:
import * as icons from 'react-icons/fa';

// ✅ CORRECTO:
import { FaHeart, FaUser } from 'react-icons/fa';
```

### Performance Warnings
```bash
Warning: Maximum update depth exceeded
```

**Solución**:
```javascript
// Evitar efectos infinitos
// ❌ PROBLEMÁTICO:
useEffect(() => {
  setState(newValue);
}); // Sin array de dependencias

// ✅ CORRECTO:
useEffect(() => {
  setState(newValue);
}, [dependency]); // Con dependencias específicas
```

## 🛠️ Comandos de Diagnóstico

### Verificar Estado del Proyecto
```bash
# Estado de npm
npm doctor

# Verificar versiones
npm ls

# Auditoría de seguridad
npm audit

# Info del entorno
npm version
```

### Limpieza Completa
```bash
# Limpiar todo y reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build en Modo Verbose
```bash
# Ver detalles del build
npm run build -- --verbose

# Analizar bundle
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

## 📞 Últimos Recursos

### Logs Útiles
```bash
# Ver logs completos
npm start 2>&1 | tee build.log

# Filtrar errores específicos
npm run build 2>&1 | grep -i error
```

### Cuando Todo Falle
```bash
# Backup del código
git stash
git checkout main

# Proyecto desde cero
npx create-react-app longevity-analytics-fresh
# Copiar src/ y public/ del backup
```

---

**Anterior**: [Problemas Comunes](./common-issues.md) | **Siguiente**: [README Principal](../README.md) 