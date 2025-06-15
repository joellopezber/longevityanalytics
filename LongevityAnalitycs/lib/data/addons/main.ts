/**
 * ADD-ONS - MIGRADO AUTOMÁTICAMENTE
 * Add-ons tipados para el sistema de longevidad
 */

import type { AddOn, AddOnConfig } from '../../types/biomarkers';



import { 
  FaFlask, 
  FaShieldAlt, 
  FaAtom, 
  FaTint, 
  FaBone, 
  FaSearch,
  FaFire,
  FaUtensils,
  FaDna,
  FaBrain,
  FaHeartbeat,
  FaIndustry,
  FaShieldVirus,
  FaBandAid
} from 'react-icons/fa';
import { AiFillApple } from 'react-icons/ai';


import {
  HORMONAS_BIOMARKER_CODES_COMMON,
  HORMONAS_BIOMARKER_CODES_MALE_ONLY,
  HORMONAS_BIOMARKER_CODES_FEMALE_ONLY,
  ENDOCRINO_BIOMARKER_CODES,
  ANTIOXIDANTES_BIOMARKER_CODES,
  ESTRES_OXIDATIVO_BIOMARKER_CODES,
  INFLAMACION_BIOMARKER_CODES,
  CARDIOVASCULAR_BIOMARKER_CODES,
  IV_NUTRIENTS_BIOMARKER_CODES,
  METALS_BIOMARKER_CODES,
  IMMUNITY_BIOMARKER_CODES,
  DIGESTION_BIOMARKER_CODES,
  COAGULATION_BIOMARKER_CODES,
  BONE_MINERAL_BIOMARKER_CODES,
  CANCER_BIOMARKER_CODES_COMMON,
  CANCER_BIOMARKER_CODES_MALE_ONLY,
  CANCER_BIOMARKER_CODES_FEMALE_ONLY,
  BIOAGE_BIOMARKER_CODES_COMMON,
  BIOAGE_BIOMARKER_CODES_MALE_ONLY,
  BIOAGE_BIOMARKER_CODES_FEMALE_ONLY,
  GUT_GATE_BIOMARKER_CODES,
  GENOME_BIOMARKER_CODES
} from './codes.js';

// ================================
// DEFINICIÓN DE ADD-ONS INDIVIDUALES
// ================================

// Hormonas (con diferencias por género)
export const hormonasPackage = createAddOnPackage({
  id: 'hormonas',
  name: 'addOns.hormonas.name',
  description: 'addOns.hormonas.description',
  icon: FaFlask,
  benefits: 'addOnBenefits.hormonas',
  codes: HORMONAS_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: HORMONAS_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: HORMONAS_BIOMARKER_CODES_FEMALE_ONLY,
  hasGenderDifferences: true
});

// Endocrino (unisex)
export const endocrinoPackage = createAddOnPackage({
  id: 'endocrino',
  name: 'addOns.endocrino.name',
  description: 'addOns.endocrino.description',
  icon: FaBrain,
  benefits: 'addOnBenefits.endocrino',
  codes: ENDOCRINO_BIOMARKER_CODES
});

// Antioxidantes (unisex)
export const antioxidantesPackage = createAddOnPackage({
  id: 'antioxidantes',
  name: 'addOns.antioxidantes.name',
  description: 'addOns.antioxidantes.description',
  icon: FaShieldAlt,
  benefits: 'addOnBenefits.antioxidantes',
  codes: ANTIOXIDANTES_BIOMARKER_CODES
});

// Estrés Oxidativo (unisex)
export const estresOxidativoPackage = createAddOnPackage({
  id: 'oxidative_cell',
  name: 'addOns.oxidative_cell.name',
  description: 'addOns.oxidative_cell.description',
  icon: FaAtom,
  benefits: 'addOnBenefits.oxidative_cell',
  codes: ESTRES_OXIDATIVO_BIOMARKER_CODES
});

// Inflamación (unisex)
export const inflamacionPackage = createAddOnPackage({
  id: 'inflammation',
  name: 'addOns.inflammation.name',
  description: 'addOns.inflammation.description',
  icon: FaFire,
  benefits: 'addOnBenefits.inflammation',
  codes: INFLAMACION_BIOMARKER_CODES
});

// Cardiovascular (unisex)
export const cardiovascularPackage = createAddOnPackage({
  id: 'cardiovascular',
  name: 'addOns.cardiovascular.name',
  description: 'addOns.cardiovascular.description',
  icon: FaHeartbeat,
  benefits: 'addOnBenefits.cardiovascular',
  codes: CARDIOVASCULAR_BIOMARKER_CODES
});

// IV & Nutrientes (unisex)
export const ivNutrientsPackage = createAddOnPackage({
  id: 'iv_nutrients',
  name: 'addOns.iv_nutrients.name',
  description: 'addOns.iv_nutrients.description',
  icon: FaTint,
  benefits: 'addOnBenefits.iv_nutrients',
  codes: IV_NUTRIENTS_BIOMARKER_CODES
});

// Metals (unisex)
export const metalesPackage = createAddOnPackage({
  id: 'metals',
  name: 'addOns.metals.name',
  description: 'addOns.metals.description',
  icon: FaIndustry,
  benefits: 'addOnBenefits.metals',
  codes: METALS_BIOMARKER_CODES
});

// Immunity (unisex)
export const inmunidadPackage = createAddOnPackage({
  id: 'immunity',
  name: 'addOns.immunity.name',
  description: 'addOns.immunity.description',
  icon: FaShieldVirus,
  benefits: 'addOnBenefits.immunity',
  codes: IMMUNITY_BIOMARKER_CODES
});

// Digestión (unisex)
export const digestionPackage = createAddOnPackage({
  id: 'digestion',
  name: 'addOns.digestion.name',
  description: 'addOns.digestion.description',
  icon: FaUtensils,
  benefits: 'addOnBenefits.digestion',
  codes: DIGESTION_BIOMARKER_CODES
});

// Gut Gate (unisex)
export const permeabilidadIntestinalPackage = createAddOnPackage({
  id: 'gut_gate',
  name: 'addOns.gut_gate.name',
  description: 'addOns.gut_gate.description',
  icon: FaBandAid,
  benefits: 'addOnBenefits.gut_gate',
  codes: GUT_GATE_BIOMARKER_CODES
});

// Coagulation (unisex)
export const coagulacionPackage = createAddOnPackage({
  id: 'coagulation',
  name: 'addOns.coagulation.name',
  description: 'addOns.coagulation.description',
  icon: FaTint,
  benefits: 'addOnBenefits.coagulation',
  codes: COAGULATION_BIOMARKER_CODES
});

// Bone Mineral (unisex)
export const saludOseaPackage = createAddOnPackage({
  id: 'bone_mineral',
  name: 'addOns.bone_mineral.name',
  description: 'addOns.bone_mineral.description',
  icon: FaBone,
  benefits: 'addOnBenefits.bone_mineral',
  codes: BONE_MINERAL_BIOMARKER_CODES
});

// Panel Genómico (unisex)
export const panelGenomicoPackage = createAddOnPackage({
  id: 'genome',
  name: 'addOns.genome.name',
  description: 'addOns.genome.description',
  icon: FaDna,
  benefits: 'addOnBenefits.genome',
  codes: GENOME_BIOMARKER_CODES
});

// Cáncer (con diferencias por género)
export const cancerPackage = createAddOnPackage({
  id: 'cancer',
  name: 'addOns.cancer.name',
  description: 'addOns.cancer.description',
  icon: FaSearch,
  benefits: 'addOnBenefits.cancer',
  codes: CANCER_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: CANCER_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: CANCER_BIOMARKER_CODES_FEMALE_ONLY,
  hasGenderDifferences: true
});

// Edad Biológica (con diferencias por género)
export const bioagePackage = createAddOnPackage({
  id: 'bioage',
  name: 'addOns.bioage.name',
  description: 'addOns.bioage.description',
  icon: AiFillApple,
  benefits: 'addOnBenefits.bioage',
  codes: BIOAGE_BIOMARKER_CODES_COMMON,
  maleOnlyCodes: BIOAGE_BIOMARKER_CODES_MALE_ONLY,
  femaleOnlyCodes: BIOAGE_BIOMARKER_CODES_FEMALE_ONLY,
  hasGenderDifferences: true
});

// ================================
// OBJETO PRINCIPAL DE ADD-ONS
// ================================

export const addOnPackages = {
  hormonas: hormonasPackage,
  endocrino: endocrinoPackage,
  antioxidantes: antioxidantesPackage,
  oxidative_cell: estresOxidativoPackage,
  inflammation: inflamacionPackage,
  cardiovascular: cardiovascularPackage,
  iv_nutrients: ivNutrientsPackage,
  metals: metalesPackage,
  immunity: inmunidadPackage,
  digestion: digestionPackage,
  gut_gate: permeabilidadIntestinalPackage,
  coagulation: coagulacionPackage,
  bone_mineral: saludOseaPackage,
  genome: panelGenomicoPackage,
  cancer: cancerPackage,
  bioage: bioagePackage
};

// console.log('✅ Add-ons packages creados:', {
  total: Object.keys(addOnPackages).length,
  withGenderDifferences: ['hormonas', 'cancer', 'bioage'],
  total: Object.keys(addOnPackages).length
}); 