/**
 * addOnPackages.js  
 * ARCHIVO LEGACY - USAR addOns/index.js
 * 
 * ⚠️ DEPRECIADO: Este archivo será eliminado gradualmente  
 * ✅ USAR: import { ... } from './addOns/index.js'
 *
 * Nueva estructura modular:
 * - addOns/codes.js    - Códigos de biomarcadores y exclusiones
 * - addOns/factory.js  - Factory functions y lógicas core
 * - addOns/packages.js - Definición de add-ons específicos  
 * - addOns/index.js    - API pública unificada
 */

// Re-exportar todo desde la nueva estructura modular
export * from './addOns/index.js';

/*
=== ARCHIVO LEGACY PRESERVADO PARA COMPATIBILIDAD ===
Todo el código original está comentado para referencia
pero la funcionalidad se maneja desde la nueva estructura modular.

Gradualmente eliminaremos este archivo una vez confirmado
que toda la aplicación usa los nuevos imports.

--- CÓDIGO ORIGINAL COMENTADO PARA REFERENCIA ---
[Todo el código original de 800+ líneas está disponible en git history]
--- FIN CÓDIGO ORIGINAL ---
*/ 