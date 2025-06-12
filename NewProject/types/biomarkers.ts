/**
 * TIPOS TYPESCRIPT PARA SISTEMA DE LONGEVIDAD
 * Estructura de datos completa y tipada para migración segura
 */

// ================================
// TIPOS BASE
// ================================

export type Gender = 'male' | 'female' | 'both';
export type PackageId = 'essential' | 'performance' | 'core' | 'advanced';
export type AddOnId = 
  | 'hormonas' | 'endocrino' | 'antioxidantes' | 'oxidative_cell' | 'inflammation'
  | 'cardiovascular' | 'iv_nutrients' | 'metals' | 'immunity' | 'digestion'
  | 'gut_gate' | 'coagulation' | 'bone_mineral' | 'genome' | 'cancer' | 'bioage';

// ================================
// BIOMARCADORES
// ================================

export interface Biomarker {
  code: string;
  name: string;
  category: string;
  gender: Gender;
}

export interface BiomarkerWithPrice extends Biomarker {
  price?: number;
  pvp?: number;
}

export interface BiomarkerPriceDetail {
  name: string;
  code: string;
  price: number;
  category: string;
}

// ================================
// SISTEMA DE PRECIOS
// ================================

export interface PriceValidation {
  isValid: boolean;
  missingCodes: string[];
  validCodes: string[];
}

export interface BiomarkerListPriceResult {
  totalPrice: number;
  testCount: number;
  priceDetails: BiomarkerPriceDetail[];
  validation: PriceValidation;
  averagePerTest: number;
}

export interface PackagePriceResult {
  packageType: string;
  gender: Gender;
  testCount: number;
  
  // Precios principales
  precio: number;  // Nuestro costo
  pvp: number;     // Precio al público
  
  // Campos auxiliares
  pricePerTest: number;
  validation: PriceValidation;
  breakdown: BiomarkerPriceDetail[];
  
  // Compatibilidad (deprecados)
  basePrice: number;
  marketPrice: number;
  costPrice: number;
  markup: number;
}

export interface AddOnPriceResult {
  male: {
    price: number;
    testCount: number;
    details: PackagePriceResult;
  };
  female: {
    price: number;
    testCount: number;
    details: PackagePriceResult;
  };
  both: {
    price: number;
    testCount: number;
    details: PackagePriceResult;
  };
  averagePrice: number;
}

// ================================
// PAQUETES PRINCIPALES
// ================================

export interface PackageConfig {
  id: PackageId;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  targetAudience: string;
  commonCodes: string[];
  maleOnlyCodes: string[];
  femaleOnlyCodes: string[];
  recommendedAddOns: AddOnId[];
}

export interface Package extends PackageConfig {
  biomarkers: Biomarker[];
  
  // Funciones dinámicas
  getPricing: (gender?: Gender) => {
    testCount: number;
    precio: number;
    pvp: number;
    pricePerTest: number;
    details: PackagePriceResult;
  };
  
  getForGender: (gender?: Gender) => PackageForGender;
}

export interface PackageForGender extends Omit<Package, 'getPricing' | 'getForGender'> {
  testCount: number;
  precio: number;
  pvp: number;
  pricePerTest: number;
  
  // Compatibilidad (deprecados)
  price: number;
  marketPrice: number;
}

// ================================
// ADD-ONS
// ================================

export interface AddOnConfig {
  id: AddOnId;
  name: string;
  description: string;
  icon: any; // React Icon Component
  benefits: string;
  codes: string[];
  maleOnlyCodes?: string[];
  femaleOnlyCodes?: string[];
  hasGenderDifferences: boolean;
}

export interface AddOn extends AddOnConfig {
  biomarkers: Biomarker[];
  
  // Funciones dinámicas
  getPricing: (gender?: Gender) => AddOnPriceResult;
  getForGender: (gender?: Gender) => AddOnForGender;
}

export interface AddOnForGender extends Omit<AddOn, 'getPricing' | 'getForGender'> {
  testCount: number;
  precio: number;
  pvp: number;
  pricePerTest: number;
}

// ================================
// EXCLUSIONES POR PERFIL
// ================================

export interface ProfileExclusions {
  [addOnId: string]: {
    [profileId: string]: string[] | {
      male?: string[];
      female?: string[];
    };
  };
}

// ================================
// CONFIGURACIÓN DEL SISTEMA
// ================================

export interface SystemConfig {
  packages: Record<PackageId, Package>;
  addOns: Record<AddOnId, AddOn>;
  biomarkers: Record<string, Biomarker>;
  profileExclusions: ProfileExclusions;
}

// ================================
// FUNCIONES DE UTILIDAD
// ================================

export interface BiomarkerUtils {
  buildBiomarkersFromCodes: (codes: string[]) => Biomarker[];
  filterBiomarkersByGender: (biomarkers: Biomarker[], gender: Gender) => Biomarker[];
  getBiomarkerStats: () => {
    total: number;
    categories: string[];
    genderDistribution: {
      both: number;
      male: number;
      female: number;
    };
  };
  searchBiomarkers: (searchTerm: string) => Biomarker[];
  validateBiomarkerCodes: (codes: string[]) => {
    valid: string[];
    invalid: string[];
  };
}

export interface PriceUtils {
  calculateBiomarkerListPrice: (
    biomarkers: Biomarker[], 
    priceType?: 'precio' | 'pvp', 
    gender?: Gender
  ) => BiomarkerListPriceResult;
  
  calculatePackagePrice: (
    biomarkers: Biomarker[], 
    gender?: Gender, 
    packageType?: string
  ) => PackagePriceResult;
  
  calculateAddOnPrice: (
    biomarkers: Biomarker[], 
    addOnType?: string
  ) => AddOnPriceResult;
  
  getPriceByCode: (code: string, priceType?: 'precio' | 'pvp') => number;
  validatePriceData: (codes: string[]) => PriceValidation;
}

// ================================
// CONTEXTOS REACT
// ================================

export interface BiomarkerSelectionContextType {
  selectedBiomarkers: string[];
  toggleBiomarker: (code: string) => void;
  clearSelection: () => void;
  isSelected: (code: string) => boolean;
  getSelectedCount: () => number;
}

export interface LanguageContextType {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  t: (key: string) => string;
}

// ================================
// COMPONENTES UI
// ================================

export interface BiomarkerCardProps {
  biomarker: Biomarker;
  isSelected?: boolean;
  onToggle?: (code: string) => void;
  showPrice?: boolean;
  compact?: boolean;
}

export interface PackageCardProps {
  package: Package;
  gender?: Gender;
  onSelect?: (packageId: PackageId) => void;
  showPricing?: boolean;
}

export interface AddOnCardProps {
  addOn: AddOn;
  gender?: Gender;
  isSelected?: boolean;
  onToggle?: (addOnId: AddOnId) => void;
  showPricing?: boolean;
}

// ================================
// EXPORTACIONES PRINCIPALES
// ================================
// Todas las interfaces ya están exportadas individualmente arriba 