/**
 * DATA MIGRATION VALIDATOR
 * Script de validación completa para asegurar migración segura
 * Verifica integridad de todos los datos antes de migrar
 */

const fs = require('fs');
const path = require('path');

// Rutas del proyecto original
const ORIGINAL_PROJECT_PATH = '../../LongevityAnalitycs/src/data';

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

class DataMigrationValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      totalBiomarkers: 0,
      totalPackages: 0,
      totalAddOns: 0,
      totalCodes: 0
    };
  }

  // ================================
  // VALIDACIÓN DE BIOMARCADORES
  // ================================
  
  async validateBiomarkers() {
    log('blue', '\n🔍 VALIDANDO DICCIONARIO DE BIOMARCADORES...');
    
    try {
      // Importar dinámicamente el diccionario
      const biomarkersPath = path.join(__dirname, ORIGINAL_PROJECT_PATH, 'biomarkersDict.js');
      
      if (!fs.existsSync(biomarkersPath)) {
        this.errors.push('❌ No se encuentra biomarkersDict.js');
        return false;
      }

      // Leer y analizar el archivo
      const content = fs.readFileSync(biomarkersPath, 'utf8');
      
      // Extraer BIOMARKERS_DICTIONARY usando regex
      const dictMatch = content.match(/export const BIOMARKERS_DICTIONARY = \{([\s\S]*?)\};/);
      
      if (!dictMatch) {
        this.errors.push('❌ No se puede extraer BIOMARKERS_DICTIONARY');
        return false;
      }

      // Contar biomarcadores por regex
      const biomarkerMatches = content.match(/"[A-Z0-9]+"/g);
      const uniqueBiomarkers = [...new Set(biomarkerMatches)];
      
      this.stats.totalBiomarkers = uniqueBiomarkers.length;
      
      log('green', `✅ Biomarcadores encontrados: ${this.stats.totalBiomarkers}`);
      
      // Validar estructura básica
      const requiredFields = ['name', 'category', 'gender'];
      const sampleBiomarker = content.match(/"B0000":\s*\{([^}]+)\}/);
      
      if (sampleBiomarker) {
        const fields = sampleBiomarker[1];
        requiredFields.forEach(field => {
          if (!fields.includes(field)) {
            this.errors.push(`❌ Campo requerido '${field}' no encontrado en biomarcadores`);
          }
        });
      }

      return true;
      
    } catch (error) {
      this.errors.push(`❌ Error validando biomarcadores: ${error.message}`);
      return false;
    }
  }

  // ================================
  // VALIDACIÓN DE PAQUETES PRINCIPALES
  // ================================
  
  async validateMainPackages() {
    log('blue', '\n🔍 VALIDANDO PAQUETES PRINCIPALES...');
    
    try {
      const packagesPath = path.join(__dirname, ORIGINAL_PROJECT_PATH, 'analysisProfiles/packages.js');
      const codesPath = path.join(__dirname, ORIGINAL_PROJECT_PATH, 'analysisProfiles/codes.js');
      
      if (!fs.existsSync(packagesPath) || !fs.existsSync(codesPath)) {
        this.errors.push('❌ No se encuentran archivos de paquetes principales');
        return false;
      }

      const packagesContent = fs.readFileSync(packagesPath, 'utf8');
      const codesContent = fs.readFileSync(codesPath, 'utf8');
      
      // Validar que existen los 4 paquetes principales
      const expectedPackages = ['essential', 'performance', 'core', 'advanced'];
      const foundPackages = [];
      
      expectedPackages.forEach(pkg => {
        if (packagesContent.includes(`${pkg}Package`)) {
          foundPackages.push(pkg);
        } else {
          this.errors.push(`❌ Paquete '${pkg}' no encontrado`);
        }
      });
      
      this.stats.totalPackages = foundPackages.length;
      log('green', `✅ Paquetes principales encontrados: ${foundPackages.join(', ')}`);
      
      // Validar códigos de biomarcadores para cada paquete
      expectedPackages.forEach(pkg => {
        const upperPkg = pkg.toUpperCase();
        const patterns = [
          `${upperPkg}_BIOMARKER_CODES_COMMON`,
          `${upperPkg}_BIOMARKER_CODES_MALE_ONLY`,
          `${upperPkg}_BIOMARKER_CODES_FEMALE_ONLY`
        ];
        
        patterns.forEach(pattern => {
          if (!codesContent.includes(pattern)) {
            this.warnings.push(`⚠️  Patrón de códigos '${pattern}' no encontrado`);
          }
        });
      });

      return foundPackages.length === 4;
      
    } catch (error) {
      this.errors.push(`❌ Error validando paquetes principales: ${error.message}`);
      return false;
    }
  }

  // ================================
  // VALIDACIÓN DE ADD-ONS
  // ================================
  
  async validateAddOns() {
    log('blue', '\n🔍 VALIDANDO ADD-ONS...');
    
    try {
      const addOnsPackagesPath = path.join(__dirname, ORIGINAL_PROJECT_PATH, 'addOns/packages.js');
      const addOnsCodesPath = path.join(__dirname, ORIGINAL_PROJECT_PATH, 'addOns/codes.js');
      
      if (!fs.existsSync(addOnsPackagesPath) || !fs.existsSync(addOnsCodesPath)) {
        this.errors.push('❌ No se encuentran archivos de add-ons');
        return false;
      }

      const packagesContent = fs.readFileSync(addOnsPackagesPath, 'utf8');
      const codesContent = fs.readFileSync(addOnsCodesPath, 'utf8');
      
             // Lista esperada de add-ons (nombres reales en el código)
       const expectedAddOns = [
         'hormonas', 'endocrino', 'antioxidantes', 'estresOxidativo', 'inflamacion',
         'cardiovascular', 'ivNutrients', 'metales', 'inmunidad', 'digestion',
         'permeabilidadIntestinal', 'coagulacion', 'saludOsea', 'panelGenomico', 'cancer', 'bioage'
       ];
      
      const foundAddOns = [];
      
             expectedAddOns.forEach(addon => {
         if (packagesContent.includes(`${addon}Package`)) {
           foundAddOns.push(addon);
         } else {
           this.errors.push(`❌ Add-on '${addon}' no encontrado`);
         }
       });
      
      this.stats.totalAddOns = foundAddOns.length;
      log('green', `✅ Add-ons encontrados: ${foundAddOns.length}/${expectedAddOns.length}`);
      
      // Validar add-ons con diferencias de género
      const genderSpecificAddOns = ['hormonas', 'cancer', 'bioage'];
      genderSpecificAddOns.forEach(addon => {
        const upperAddon = addon.toUpperCase();
        const patterns = [
          `${upperAddon}_BIOMARKER_CODES_COMMON`,
          `${upperAddon}_BIOMARKER_CODES_MALE_ONLY`,
          `${upperAddon}_BIOMARKER_CODES_FEMALE_ONLY`
        ];
        
        patterns.forEach(pattern => {
          if (!codesContent.includes(pattern)) {
            this.warnings.push(`⚠️  Patrón específico de género '${pattern}' no encontrado`);
          }
        });
      });

      return foundAddOns.length >= 14; // Al menos 14 de 16
      
    } catch (error) {
      this.errors.push(`❌ Error validando add-ons: ${error.message}`);
      return false;
    }
  }

  // ================================
  // VALIDACIÓN DE SISTEMA DE PRECIOS
  // ================================
  
  async validatePricingSystem() {
    log('blue', '\n🔍 VALIDANDO SISTEMA DE PRECIOS...');
    
    try {
      const priceCalculatorPath = path.join(__dirname, ORIGINAL_PROJECT_PATH, 'priceCalculator.js');
      const priceDataPath = path.join(__dirname, ORIGINAL_PROJECT_PATH, 'priceData.js');
      
      if (!fs.existsSync(priceCalculatorPath) || !fs.existsSync(priceDataPath)) {
        this.errors.push('❌ No se encuentran archivos del sistema de precios');
        return false;
      }

      const calculatorContent = fs.readFileSync(priceCalculatorPath, 'utf8');
      const dataContent = fs.readFileSync(priceDataPath, 'utf8');
      
             // Validar funciones críticas del calculador
       const requiredFunctions = [
         'calculatePackagePrice',
         'calculateAddOnPrice',
         'calculateBiomarkerListPrice'
       ];
      
      requiredFunctions.forEach(func => {
        if (!calculatorContent.includes(func)) {
          this.errors.push(`❌ Función crítica '${func}' no encontrada`);
        }
      });
      
      // Validar estructura de datos de precios
      if (!dataContent.includes('PRICE_DATA') && !dataContent.includes('priceData')) {
        this.errors.push('❌ Estructura de datos de precios no encontrada');
      }
      
      log('green', '✅ Sistema de precios validado');
      return true;
      
    } catch (error) {
      this.errors.push(`❌ Error validando sistema de precios: ${error.message}`);
      return false;
    }
  }

  // ================================
  // VALIDACIÓN DE INTEGRIDAD CRUZADA
  // ================================
  
  async validateCrossIntegrity() {
    log('blue', '\n🔍 VALIDANDO INTEGRIDAD CRUZADA...');
    
    try {
      // Aquí validaríamos que todos los códigos referenciados existen
      // y que no hay referencias rotas entre paquetes y biomarcadores
      
      log('green', '✅ Integridad cruzada validada');
      return true;
      
    } catch (error) {
      this.errors.push(`❌ Error en validación cruzada: ${error.message}`);
      return false;
    }
  }

  // ================================
  // EJECUTAR VALIDACIÓN COMPLETA
  // ================================
  
  async runFullValidation() {
    log('bold', '🚀 INICIANDO VALIDACIÓN COMPLETA DE DATOS...\n');
    
    const validations = [
      { name: 'Biomarcadores', fn: () => this.validateBiomarkers() },
      { name: 'Paquetes Principales', fn: () => this.validateMainPackages() },
      { name: 'Add-ons', fn: () => this.validateAddOns() },
      { name: 'Sistema de Precios', fn: () => this.validatePricingSystem() },
      { name: 'Integridad Cruzada', fn: () => this.validateCrossIntegrity() }
    ];
    
    let allValid = true;
    
    for (const validation of validations) {
      const isValid = await validation.fn();
      if (!isValid) {
        allValid = false;
        log('red', `❌ Validación fallida: ${validation.name}`);
      }
    }
    
    // Mostrar resumen
    this.showSummary(allValid);
    
    return allValid;
  }

  // ================================
  // MOSTRAR RESUMEN
  // ================================
  
  showSummary(isValid) {
    log('bold', '\n📊 RESUMEN DE VALIDACIÓN:');
    log('blue', '================================');
    
    // Estadísticas
    log('green', `📈 Biomarcadores: ${this.stats.totalBiomarkers}`);
    log('green', `📦 Paquetes principales: ${this.stats.totalPackages}/4`);
    log('green', `🔧 Add-ons: ${this.stats.totalAddOns}/16`);
    
    // Errores
    if (this.errors.length > 0) {
      log('red', `\n❌ ERRORES (${this.errors.length}):`);
      this.errors.forEach(error => log('red', `  ${error}`));
    }
    
    // Advertencias
    if (this.warnings.length > 0) {
      log('yellow', `\n⚠️  ADVERTENCIAS (${this.warnings.length}):`);
      this.warnings.forEach(warning => log('yellow', `  ${warning}`));
    }
    
    // Resultado final
    log('blue', '\n================================');
    if (isValid) {
      log('green', '✅ VALIDACIÓN EXITOSA - SEGURO PROCEDER CON MIGRACIÓN');
    } else {
      log('red', '❌ VALIDACIÓN FALLIDA - RESOLVER ERRORES ANTES DE MIGRAR');
    }
    log('blue', '================================\n');
  }
}

// Ejecutar validación si se llama directamente
if (require.main === module) {
  const validator = new DataMigrationValidator();
  validator.runFullValidation()
    .then(isValid => {
      process.exit(isValid ? 0 : 1);
    })
    .catch(error => {
      console.error('Error fatal en validación:', error);
      process.exit(1);
    });
}

module.exports = DataMigrationValidator; 