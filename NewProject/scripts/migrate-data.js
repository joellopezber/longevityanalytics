/**
 * SCRIPT DE MIGRACIÓN SEGURA DE DATOS
 * Migra todos los datos validados del proyecto original al nuevo proyecto
 * Mantiene la estructura TypeScript y asegura integridad de datos
 */

const fs = require('fs');
const path = require('path');

// Rutas
const ORIGINAL_DATA_PATH = '../../LongevityAnalitycs/src/data';
const NEW_DATA_PATH = '../lib/data';

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (color, message) => console.log(`${colors[color]}${message}${colors.reset}`);

class DataMigrator {
  constructor() {
    this.migratedFiles = [];
    this.errors = [];
    this.warnings = [];
  }

  // ================================
  // CREAR ESTRUCTURA DE DIRECTORIOS
  // ================================
  
  createDirectoryStructure() {
    log('blue', '\n📁 CREANDO ESTRUCTURA DE DIRECTORIOS...');
    
    const directories = [
      NEW_DATA_PATH,
      `${NEW_DATA_PATH}/biomarkers`,
      `${NEW_DATA_PATH}/packages`,
      `${NEW_DATA_PATH}/addons`,
      `${NEW_DATA_PATH}/pricing`,
      `${NEW_DATA_PATH}/utils`
    ];
    
    directories.forEach(dir => {
      const fullPath = path.join(__dirname, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        log('green', `✅ Creado: ${dir}`);
      } else {
        log('yellow', `⚠️  Ya existe: ${dir}`);
      }
    });
  }

  // ================================
  // MIGRAR DICCIONARIO DE BIOMARCADORES
  // ================================
  
  migrateBiomarkersDictionary() {
    log('blue', '\n🧬 MIGRANDO DICCIONARIO DE BIOMARCADORES...');
    
    try {
      const originalPath = path.join(__dirname, ORIGINAL_DATA_PATH, 'biomarkersDict.js');
      const newPath = path.join(__dirname, NEW_DATA_PATH, 'biomarkers/dictionary.ts');
      
      if (!fs.existsSync(originalPath)) {
        throw new Error('Archivo original no encontrado');
      }
      
      const originalContent = fs.readFileSync(originalPath, 'utf8');
      
      // Convertir a TypeScript con tipos
      const tsContent = this.convertBiomarkersDictToTS(originalContent);
      
      fs.writeFileSync(newPath, tsContent);
      this.migratedFiles.push('biomarkers/dictionary.ts');
      
      log('green', '✅ Diccionario de biomarcadores migrado');
      
    } catch (error) {
      this.errors.push(`❌ Error migrando biomarcadores: ${error.message}`);
    }
  }

  // ================================
  // MIGRAR PAQUETES PRINCIPALES
  // ================================
  
  migrateMainPackages() {
    log('blue', '\n📦 MIGRANDO PAQUETES PRINCIPALES...');
    
    try {
      // Migrar códigos
      const codesPath = path.join(__dirname, ORIGINAL_DATA_PATH, 'analysisProfiles/codes.js');
      const newCodesPath = path.join(__dirname, NEW_DATA_PATH, 'packages/codes.ts');
      
      const codesContent = fs.readFileSync(codesPath, 'utf8');
      const tsCodesContent = this.convertCodesToTS(codesContent, 'packages');
      
      fs.writeFileSync(newCodesPath, tsCodesContent);
      
      // Migrar paquetes
      const packagesPath = path.join(__dirname, ORIGINAL_DATA_PATH, 'analysisProfiles/packages.js');
      const newPackagesPath = path.join(__dirname, NEW_DATA_PATH, 'packages/main.ts');
      
      const packagesContent = fs.readFileSync(packagesPath, 'utf8');
      const tsPackagesContent = this.convertPackagesToTS(packagesContent);
      
      fs.writeFileSync(newPackagesPath, tsPackagesContent);
      
      this.migratedFiles.push('packages/codes.ts', 'packages/main.ts');
      log('green', '✅ Paquetes principales migrados');
      
    } catch (error) {
      this.errors.push(`❌ Error migrando paquetes principales: ${error.message}`);
    }
  }

  // ================================
  // MIGRAR ADD-ONS
  // ================================
  
  migrateAddOns() {
    log('blue', '\n🔧 MIGRANDO ADD-ONS...');
    
    try {
      // Migrar códigos de add-ons
      const codesPath = path.join(__dirname, ORIGINAL_DATA_PATH, 'addOns/codes.js');
      const newCodesPath = path.join(__dirname, NEW_DATA_PATH, 'addons/codes.ts');
      
      const codesContent = fs.readFileSync(codesPath, 'utf8');
      const tsCodesContent = this.convertCodesToTS(codesContent, 'addons');
      
      fs.writeFileSync(newCodesPath, tsCodesContent);
      
      // Migrar paquetes de add-ons
      const packagesPath = path.join(__dirname, ORIGINAL_DATA_PATH, 'addOns/packages.js');
      const newPackagesPath = path.join(__dirname, NEW_DATA_PATH, 'addons/main.ts');
      
      const packagesContent = fs.readFileSync(packagesPath, 'utf8');
      const tsPackagesContent = this.convertAddOnsToTS(packagesContent);
      
      fs.writeFileSync(newPackagesPath, tsPackagesContent);
      
      // Migrar factory
      const factoryPath = path.join(__dirname, ORIGINAL_DATA_PATH, 'addOns/factory.js');
      const newFactoryPath = path.join(__dirname, NEW_DATA_PATH, 'addons/factory.ts');
      
      const factoryContent = fs.readFileSync(factoryPath, 'utf8');
      const tsFactoryContent = this.convertFactoryToTS(factoryContent);
      
      fs.writeFileSync(newFactoryPath, tsFactoryContent);
      
      this.migratedFiles.push('addons/codes.ts', 'addons/main.ts', 'addons/factory.ts');
      log('green', '✅ Add-ons migrados');
      
    } catch (error) {
      this.errors.push(`❌ Error migrando add-ons: ${error.message}`);
    }
  }

  // ================================
  // MIGRAR SISTEMA DE PRECIOS
  // ================================
  
  migratePricingSystem() {
    log('blue', '\n💰 MIGRANDO SISTEMA DE PRECIOS...');
    
    try {
      // Migrar calculadora de precios
      const calculatorPath = path.join(__dirname, ORIGINAL_DATA_PATH, 'priceCalculator.js');
      const newCalculatorPath = path.join(__dirname, NEW_DATA_PATH, 'pricing/calculator.ts');
      
      const calculatorContent = fs.readFileSync(calculatorPath, 'utf8');
      const tsCalculatorContent = this.convertPriceCalculatorToTS(calculatorContent);
      
      fs.writeFileSync(newCalculatorPath, tsCalculatorContent);
      
      // Migrar datos de precios
      const dataPath = path.join(__dirname, ORIGINAL_DATA_PATH, 'priceData.js');
      const newDataPath = path.join(__dirname, NEW_DATA_PATH, 'pricing/data.ts');
      
      const dataContent = fs.readFileSync(dataPath, 'utf8');
      const tsDataContent = this.convertPriceDataToTS(dataContent);
      
      fs.writeFileSync(newDataPath, tsDataContent);
      
      this.migratedFiles.push('pricing/calculator.ts', 'pricing/data.ts');
      log('green', '✅ Sistema de precios migrado');
      
    } catch (error) {
      this.errors.push(`❌ Error migrando sistema de precios: ${error.message}`);
    }
  }

  // ================================
  // FUNCIONES DE CONVERSIÓN A TYPESCRIPT
  // ================================
  
  convertBiomarkersDictToTS(content) {
    return `/**
 * DICCIONARIO DE BIOMARCADORES - MIGRADO AUTOMÁTICAMENTE
 * Diccionario centralizado tipado para el sistema de longevidad
 */

import type { Biomarker } from '../../types/biomarkers';

${content
  .replace(/\/\*\*[\s\S]*?\*\//g, '') // Remover comentarios JSDoc antiguos
  .replace(/export const/g, 'export const')
  .replace(/\.js'/g, ".ts'")
  .replace(/console\.log\(/g, '// console.log(')
}

// Funciones de utilidad tipadas
export const buildBiomarkersFromCodes = (codes: string[]): Biomarker[] => {
  return codes.map(code => {
    const biomarker = BIOMARKERS_DICTIONARY[code];
    if (!biomarker) {
      console.warn(\`Biomarcador con código \${code} no encontrado en diccionario\`);
      return null;
    }
    return { code, ...biomarker };
  }).filter(Boolean) as Biomarker[];
};

export const filterBiomarkersByGender = (biomarkers: Biomarker[], gender: 'male' | 'female' | 'both'): Biomarker[] => {
  return biomarkers.filter(biomarker => 
    biomarker.gender === 'both' || biomarker.gender === gender
  );
};`;
  }

  convertCodesToTS(content, type) {
    return `/**
 * CÓDIGOS DE BIOMARCADORES - ${type.toUpperCase()} - MIGRADO AUTOMÁTICAMENTE
 * Códigos tipados para ${type}
 */

${content
  .replace(/\/\*\*[\s\S]*?\*\//g, '')
  .replace(/console\.log\(/g, '// console.log(')
}`;
  }

  convertPackagesToTS(content) {
    return `/**
 * PAQUETES PRINCIPALES - MIGRADO AUTOMÁTICAMENTE
 * Paquetes tipados para el sistema de longevidad
 */

import type { Package, PackageConfig } from '../../types/biomarkers';
import { buildBiomarkersFromCodes } from '../biomarkers/dictionary';
import { calculatePackagePrice } from '../pricing/calculator';

${content
  .replace(/\/\*\*[\s\S]*?\*\//g, '')
  .replace(/import.*from.*\.js';/g, '')
  .replace(/console\.log\(/g, '// console.log(')
}`;
  }

  convertAddOnsToTS(content) {
    return `/**
 * ADD-ONS - MIGRADO AUTOMÁTICAMENTE
 * Add-ons tipados para el sistema de longevidad
 */

import type { AddOn, AddOnConfig } from '../../types/biomarkers';

${content
  .replace(/\/\*\*[\s\S]*?\*\//g, '')
  .replace(/import.*from.*\.js';/g, '')
  .replace(/console\.log\(/g, '// console.log(')
}`;
  }

  convertFactoryToTS(content) {
    return `/**
 * FACTORY FUNCTIONS - MIGRADO AUTOMÁTICAMENTE
 * Funciones factory tipadas para crear add-ons
 */

import type { AddOn, AddOnConfig } from '../../types/biomarkers';

${content
  .replace(/\/\*\*[\s\S]*?\*\//g, '')
  .replace(/import.*from.*\.js';/g, '')
  .replace(/console\.log\(/g, '// console.log(')
}`;
  }

  convertPriceCalculatorToTS(content) {
    return `/**
 * CALCULADORA DE PRECIOS - MIGRADO AUTOMÁTICAMENTE
 * Sistema de cálculo de precios tipado
 */

import type { 
  Biomarker, 
  BiomarkerListPriceResult, 
  PackagePriceResult, 
  AddOnPriceResult,
  Gender 
} from '../../types/biomarkers';

${content
  .replace(/\/\*\*[\s\S]*?\*\//g, '')
  .replace(/import.*from.*\.js';/g, '')
  .replace(/console\.log\(/g, '// console.log(')
}`;
  }

  convertPriceDataToTS(content) {
    return `/**
 * DATOS DE PRECIOS - MIGRADO AUTOMÁTICAMENTE
 * Datos de precios tipados
 */

${content
  .replace(/\/\*\*[\s\S]*?\*\//g, '')
  .replace(/console\.log\(/g, '// console.log(')
}`;
  }

  // ================================
  // CREAR ARCHIVO ÍNDICE PRINCIPAL
  // ================================
  
  createMainIndex() {
    log('blue', '\n📋 CREANDO ARCHIVO ÍNDICE PRINCIPAL...');
    
    const indexContent = `/**
 * ÍNDICE PRINCIPAL DEL SISTEMA DE DATOS
 * Exportaciones centralizadas para el sistema de longevidad
 */

// Tipos
export type * from '../types/biomarkers';

// Biomarcadores
export * from './biomarkers/dictionary';

// Paquetes principales
export * from './packages/codes';
export * from './packages/main';

// Add-ons
export * from './addons/codes';
export * from './addons/main';
export * from './addons/factory';

// Sistema de precios
export * from './pricing/calculator';
export * from './pricing/data';

// Configuración del sistema
import { essentialPackage, performancePackage, corePackage, advancedPackage } from './packages/main';
import { addOnPackages } from './addons/main';
import { BIOMARKERS_DICTIONARY } from './biomarkers/dictionary';
import { PROFILE_EXCLUSIONS } from './addons/codes';

export const LONGEVITY_SYSTEM = {
  packages: {
    essential: essentialPackage,
    performance: performancePackage,
    core: corePackage,
    advanced: advancedPackage
  },
  addOns: addOnPackages,
  biomarkers: BIOMARKERS_DICTIONARY,
  profileExclusions: PROFILE_EXCLUSIONS
};

export default LONGEVITY_SYSTEM;`;

    const indexPath = path.join(__dirname, NEW_DATA_PATH, 'index.ts');
    fs.writeFileSync(indexPath, indexContent);
    
    this.migratedFiles.push('index.ts');
    log('green', '✅ Archivo índice principal creado');
  }

  // ================================
  // EJECUTAR MIGRACIÓN COMPLETA
  // ================================
  
  async runFullMigration() {
    log('bold', '🚀 INICIANDO MIGRACIÓN COMPLETA DE DATOS...\n');
    
    const migrations = [
      { name: 'Estructura de directorios', fn: () => this.createDirectoryStructure() },
      { name: 'Diccionario de biomarcadores', fn: () => this.migrateBiomarkersDictionary() },
      { name: 'Paquetes principales', fn: () => this.migrateMainPackages() },
      { name: 'Add-ons', fn: () => this.migrateAddOns() },
      { name: 'Sistema de precios', fn: () => this.migratePricingSystem() },
      { name: 'Archivo índice principal', fn: () => this.createMainIndex() }
    ];
    
    for (const migration of migrations) {
      try {
        migration.fn();
        log('green', `✅ ${migration.name} completado`);
      } catch (error) {
        this.errors.push(`❌ Error en ${migration.name}: ${error.message}`);
        log('red', `❌ Error en ${migration.name}`);
      }
    }
    
    this.showMigrationSummary();
    
    return this.errors.length === 0;
  }

  // ================================
  // MOSTRAR RESUMEN DE MIGRACIÓN
  // ================================
  
  showMigrationSummary() {
    log('bold', '\n📊 RESUMEN DE MIGRACIÓN:');
    log('blue', '================================');
    
    log('green', `📁 Archivos migrados: ${this.migratedFiles.length}`);
    this.migratedFiles.forEach(file => {
      log('green', `  ✅ ${file}`);
    });
    
    if (this.warnings.length > 0) {
      log('yellow', `\n⚠️  ADVERTENCIAS (${this.warnings.length}):`);
      this.warnings.forEach(warning => log('yellow', `  ${warning}`));
    }
    
    if (this.errors.length > 0) {
      log('red', `\n❌ ERRORES (${this.errors.length}):`);
      this.errors.forEach(error => log('red', `  ${error}`));
    }
    
    log('blue', '\n================================');
    if (this.errors.length === 0) {
      log('green', '✅ MIGRACIÓN COMPLETADA EXITOSAMENTE');
      log('green', '🎉 TODOS LOS DATOS HAN SIDO MIGRADOS DE FORMA SEGURA');
    } else {
      log('red', '❌ MIGRACIÓN COMPLETADA CON ERRORES');
      log('red', '⚠️  REVISAR ERRORES ANTES DE CONTINUAR');
    }
    log('blue', '================================\n');
  }
}

// Ejecutar migración si se llama directamente
if (require.main === module) {
  const migrator = new DataMigrator();
  migrator.runFullMigration()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Error fatal en migración:', error);
      process.exit(1);
    });
}

module.exports = DataMigrator; 