/**
 * MedicalSystemsExplorer.jsx
 * Componente que muestra Essential como card principal de doble ancho
 * seguido de los Add-Ons como cards individuales
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
// Imports de la nueva arquitectura (Essential, Core, Advanced)
import { 
  essentialPackage,
  corePackage,
  advancedPackage
} from '../data/analysisPackages';
// Imports de add-ons desde nueva arquitectura
import { getAddOnPackagesForGender } from '../data/addOnPackages';
import { useBiomarkerSelection } from '../contexts/BiomarkerSelectionContext';
import { useLanguage } from '../contexts/LanguageContext';

const MedicalSystemsExplorer = () => {
  const { t } = useLanguage(); // Hook para traducciones
  const [selectedGender, setSelectedGender] = useState('male'); // Género por defecto
  const [expandedBiomarkers, setExpandedBiomarkers] = useState([]); // Ningún biomarcador expandido por defecto
  const [selectedProfile, setSelectedProfile] = useState('essential'); // Perfil seleccionado por defecto
  const [showAddOns, setShowAddOns] = useState(false); // Estado para mostrar/ocultar add-ons
  
  // Usar el contexto para las selecciones de biomarcadores
  const {
    selectedIntolerancia,
    setSelectedIntolerancia,
    selectedMetaboloma,
    setSelectedMetaboloma,
    selectedMyPharma,
    setSelectedMyPharma,
    selectedMyDetox,
    setSelectedMyDetox,
    selectedMyDiet,
    setSelectedMyDiet,
    selectedMyAgeing,
    setSelectedMyAgeing,
    selectedMySport,
    setSelectedMySport,
    selectedMySuplements,
    setSelectedMySuplements,
    selectedLpA,
    setSelectedLpA,
    selectedLongitudTelomerica,
    setSelectedLongitudTelomerica,

    selectedAcidosGrasos,
    setSelectedAcidosGrasos,
    selectedVitaminaK1,
    setSelectedVitaminaK1,
    selectedIL6,
    setSelectedIL6,
    selectedTNFα,
    setSelectedTNFα,
    selectedHelicobacter,
    setSelectedHelicobacter,
    // Estados específicos para Hormonas
    selectedEstradiolHormonas,
    setSelectedEstradiolHormonas,
    selectedProlactinaHormonas,
    setSelectedProlactinaHormonas,
    selectedLHHormonas,
    setSelectedLHHormonas,
    selectedFSHHormonas,
    setSelectedFSHHormonas,
    // Estados específicos para Endocrino
    selectedEstradiolEndocrino,
    setSelectedEstradiolEndocrino,
    selectedProlactinaEndocrino,
    setSelectedProlactinaEndocrino,
    selectedLHEndocrino,
    setSelectedLHEndocrino,
    selectedFSHEndocrino,
    setSelectedFSHEndocrino,
    selectedVSGEndocrino,
    setSelectedVSGEndocrino,
    selectedVitaminaD125OHEndocrino,
    setSelectedVitaminaD125OHEndocrino,
    // Estados específicos para Cancer
    selectedFSHCancer,
    setSelectedFSHCancer,
    // Estados específicos para Vitamina C
    selectedVitaminaCOxidativeCell,
    setSelectedVitaminaCOxidativeCell,
    selectedVitaminaCIVNutrients,
    setSelectedVitaminaCIVNutrients,
    // Estados específicos para Digestivo
    selectedUrinalisisDigestivo,
    setSelectedUrinalisisDigestivo,
    selectedOvaParasitesDigestivo,
    setSelectedOvaParasitesDigestivo,

    getAdjustedAddOnPrice,
    getActualBiomarkerCount
  } = useBiomarkerSelection();

  // Obtener datos filtrados por género usando nueva arquitectura
  const essentialData = essentialPackage.getForGender(selectedGender);
  const coreData = corePackage.getForGender(selectedGender);
  const advancedData = advancedPackage.getForGender(selectedGender);
  const addOnPackages = getAddOnPackagesForGender(selectedGender);

  // Función para obtener las características traducidas del Essential
  const getEssentialFeatures = () => {
    return [
      t('packageComparison.glucidMetabolism'),
      t('packageComparison.renalHepaticFunction'),
      t('packageComparison.advancedLipidProfile'),
      t('packageComparison.basicHormones'),
      t('packageComparison.completeThyroid'),
      t('packageComparison.essentialMinerals'),
      t('packageComparison.inflammatoryMarkers'),
      t('packageComparison.biologicalAgeCalculation')
    ];
  };

  const toggleBiomarker = (biomarkerId) => {
    setExpandedBiomarkers(prev => 
      prev.includes(biomarkerId) 
        ? prev.filter(id => id !== biomarkerId)
        : [...prev, biomarkerId]
    );
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    // No forzar la apertura del Essential al cambiar género
  };

  const handleProfileSelection = (profile) => {
    setSelectedProfile(profile);
    // Cerrar biomarcadores expandidos al cambiar perfil
    setExpandedBiomarkers([]);
  };

  // Función para obtener datos del perfil seleccionado
  const getSelectedProfileData = () => {
    switch(selectedProfile) {
      case 'essential':
        return {
          name: t('systems.analysisProfiles.essential.title'),
          description: t('systems.essentialDescription'),
          biomarkers: essentialData.biomarkers,
          testCount: essentialData.testCount,
          features: getEssentialFeatures(),
          price: `${essentialData.price}€`, // Precio Prevenii (nuestro precio de venta)
          pvp: `${essentialData.marketPrice}€` // Precio Market (PVP/precio referencial)
        };
      case 'core':
        return {
          name: t('systems.analysisProfiles.core.title'),
          description: "El Core Analysis amplía el Essential con biomarcadores especializados para evaluación cardiovascular avanzada, perfil hormonal completo y marcadores inflamatorios específicos. Incluye análisis de estrés oxidativo y evaluación nutricional detallada.",
          biomarkers: coreData.biomarkers,
          testCount: coreData.testCount,
          features: [
            "Todo lo incluido en Essential",
            "Perfil cardiovascular avanzado", 
            "Hormonas completas (hombre/mujer)",
            "Marcadores inflamatorios específicos",
            "Estrés oxidativo y antioxidantes",
            "Evaluación nutricional detallada",
            "Marcadores tumorales básicos",
            "Biomarcadores de envejecimiento"
          ],
          price: `${coreData.price}€`,
          pvp: `${coreData.marketPrice}€`
        };
      case 'advanced':
        return {
          name: t('systems.analysisProfiles.advanced.title'),
          description: "El Advanced Analysis es nuestra evaluación más completa, incluyendo todos los biomarcadores disponibles, análisis genético opcional, evaluación de microbioma, marcadores tumorales ampliados y assessment completo de longevidad.",
          biomarkers: advancedData.biomarkers,
          testCount: advancedData.testCount,
          features: [
            "Todo lo incluido en Core",
            "Panel completo de metales pesados",
            "Análisis de microbioma intestinal",
            "Marcadores tumorales ampliados",
            "Evaluación de longevidad avanzada",
            "Perfil de coagulación completo",
            "Biomarcadores de fertilidad",
            "Assessment de estrés oxidativo completo"
          ],
          price: `${advancedData.price}€`,
          pvp: `${advancedData.marketPrice}€`
        };
      default:
        return getSelectedProfileData.call(this, 'essential');
    }
  };

  // Función para toggle de Intolerancia Alimentaria
  const toggleIntoleranciaSelection = () => {
    setSelectedIntolerancia(prev => !prev);
  };

  // Función para toggle de Metaboloma (orina/heces)
  const toggleMetabolomaSelection = () => {
    setSelectedMetaboloma(prev => !prev);
  };

  // Funciones para toggle de los tests genómicos
  const toggleMyPharmaSelection = () => {
    setSelectedMyPharma(prev => !prev);
  };

  const toggleMyDetoxSelection = () => {
    setSelectedMyDetox(prev => !prev);
  };

  const toggleMyDietSelection = () => {
    setSelectedMyDiet(prev => !prev);
  };

  const toggleMyAgeingSelection = () => {
    setSelectedMyAgeing(prev => !prev);
  };

  const toggleMySportSelection = () => {
    setSelectedMySport(prev => !prev);
  };

  const toggleMySuplementsSelection = () => {
    setSelectedMySuplements(prev => !prev);
  };

  // Función para toggle de Lp(a) *
  const toggleLpASelection = () => {
    setSelectedLpA(prev => !prev);
  };

  // Función para toggle de Longitud Telomérica
  const toggleLongitudTelomericaSelection = () => {
    setSelectedLongitudTelomerica(prev => !prev);
  };

  // Función para toggle de Vitamina C


  // Función para toggle de Ácidos grasos %
  const toggleAcidosGrasosSelection = () => {
    setSelectedAcidosGrasos(prev => !prev);
  };

  // Función para toggle de Vitamina K1
  const toggleVitaminaK1Selection = () => {
    setSelectedVitaminaK1(prev => !prev);
  };

  // Función para toggle de IL-6
  const toggleIL6Selection = () => {
    setSelectedIL6(prev => !prev);
  };

  // Función para toggle de TNF-α
  const toggleTNFαSelection = () => {
    setSelectedTNFα(prev => !prev);
  };

  // Función para toggle de Helicobacter pylori
  const toggleHelicobacterSelection = () => {
    setSelectedHelicobacter(prev => !prev);
  };

  // Funciones para toggle de biomarcadores del add-on Endocrino
  // Funciones toggle para Hormonas
  const toggleEstradiolHormonasSelection = () => {
    setSelectedEstradiolHormonas(prev => !prev);
  };

  const toggleProlactinaHormonasSelection = () => {
    setSelectedProlactinaHormonas(prev => !prev);
  };

  const toggleLHHormonasSelection = () => {
    setSelectedLHHormonas(prev => !prev);
  };

  const toggleFSHHormonasSelection = () => {
    setSelectedFSHHormonas(prev => !prev);
  };

  // Funciones toggle para Endocrino
  const toggleEstradiolEndocrinoSelection = () => {
    setSelectedEstradiolEndocrino(prev => !prev);
  };

  const toggleProlactinaEndocrinoSelection = () => {
    setSelectedProlactinaEndocrino(prev => !prev);
  };

  const toggleLHEndocrinoSelection = () => {
    setSelectedLHEndocrino(prev => !prev);
  };

  const toggleFSHEndocrinoSelection = () => {
    setSelectedFSHEndocrino(prev => !prev);
  };

  const toggleVSGEndocrinoSelection = () => {
    setSelectedVSGEndocrino(prev => !prev);
  };

  const toggleVitaminaD125OHEndocrinoSelection = () => {
    setSelectedVitaminaD125OHEndocrino(prev => !prev);
  };

  // Función toggle para FSH en Cancer
  const toggleFSHCancerSelection = () => {
    setSelectedFSHCancer(prev => !prev);
  };

  // Funciones toggle para Vitamina C específicas
  const toggleVitaminaCOxidativeCellSelection = () => {
    setSelectedVitaminaCOxidativeCell(prev => !prev);
  };

  const toggleVitaminaCIVNutrientsSelection = () => {
    setSelectedVitaminaCIVNutrients(prev => !prev);
  };

  // Funciones toggle para Digestivo específicas
  const toggleUrinalisisDigestivoSelection = () => {
    setSelectedUrinalisisDigestivo(prev => !prev);
  };

  const toggleOvaParasitesDigestivoSelection = () => {
    setSelectedOvaParasitesDigestivo(prev => !prev);
  };

  // Función para mostrar/ocultar Add-Ons
  const toggleAddOnsView = () => {
    setShowAddOns(prev => !prev);
    // Si se ocultan los add-ons, cerrar también cualquier biomarcador expandido
    if (showAddOns) {
      setExpandedBiomarkers([]);
    }
  };



  // Función para verificar si un Add-On tiene diferencias por género
  const hasGenderDifferences = (addOnId) => {
    const genderSpecificAddOns = ['hormonas', 'cancer', 'bioage'];
    return genderSpecificAddOns.includes(addOnId);
  };

  // Función para obtener el indicador visual de género
  const getGenderIndicator = (addOnId, gender) => {
    if (!hasGenderDifferences(addOnId)) return null;
    
    return null;
  };

  const BiomarkerCard = ({ biomarker, index, addOnId }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isIntolerancia = biomarker.name === "Intolerancia Alimentaria 200";
    const isMetaboloma = biomarker.name === "Metaboloma (orina/heces)";
    // Tests genómicos
    const isMyPharma = biomarker.name === "MyPharma";
    const isMyDetox = biomarker.name === "MyDetox";
    const isMyDiet = biomarker.name === "MyDiet";
    const isMyAgeing = biomarker.name === "MyAgeing";
    const isMySport = biomarker.name === "MySport";
    const isMySuplements = biomarker.name === "MySuplements";
    const isLpA = biomarker.name === "Lp(a) *";
    const isLongitudTelomerica = biomarker.name === "Longitud telomérica";

    const isAcidosGrasos = biomarker.name === "Ácidos grasos %";
    const isVitaminaK1 = biomarker.name === "Vitamina K1";
    const isIL6 = biomarker.name === "IL-6";
    const isTNFα = biomarker.name === "TNF-α";
    const isHelicobacter = biomarker.name === "Helicobacter pylori IgG An";
    const isEstradiol = biomarker.name === "Estradiol";
    const isProlactina = biomarker.name === "Prolactina";
    const isLH = biomarker.name === "LH";
    const isFSH = biomarker.name === "FSH";
    const isVSG = biomarker.name === "VSG";
    const isVitaminaD125OH = biomarker.name === "Vitamina D 1,25-OH";
    const isUrinalisis = biomarker.name === "Urianálisis + sedimento";
    const isOvaParasites = biomarker.name === "Ova & Parasites stool";
    
    // Estados específicos por add-on para biomarcadores compartidos
    const isEstradiolHormonas = isEstradiol && addOnId === "hormonas";
    const isProlactinaHormonas = isProlactina && addOnId === "hormonas";
    const isLHHormonas = isLH && addOnId === "hormonas";
    const isFSHHormonas = isFSH && addOnId === "hormonas";
    
    const isEstradiolEndocrino = isEstradiol && addOnId === "endocrino";
    const isProlactinaEndocrino = isProlactina && addOnId === "endocrino";
    const isLHEndocrino = isLH && addOnId === "endocrino";
    const isFSHEndocrino = isFSH && addOnId === "endocrino";
    const isVSGEndocrino = isVSG && addOnId === "endocrino";
    const isVitaminaD125OHEndocrino = isVitaminaD125OH && addOnId === "endocrino";
    
    const isFSHCancer = isFSH && addOnId === "cancer";
    
    const isVitaminaCOxidativeCell = biomarker.name === "Vitamina C" && addOnId === "oxidative_cell";
    const isVitaminaCIVNutrients = biomarker.name === "Vitamina C" && addOnId === "iv_nutrients";
    
    const isUrinalisisDigestivo = isUrinalisis && addOnId === "digest";
    const isOvaParasitesDigestivo = isOvaParasites && addOnId === "digest";
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 }}
        className={`
          border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all
          ${isIntolerancia && selectedIntolerancia 
            ? 'border-earth bg-earth-50 hover:border-warm' 
            : isIntolerancia 
              ? 'border-cream bg-warm-white hover:border-earth'
              : isMetaboloma && selectedMetaboloma
                ? 'border-earth bg-earth-50 hover:border-warm'
                : isMetaboloma
                  ? 'border-cream bg-warm-white hover:border-earth'
                  : (isMyPharma && selectedMyPharma) || (isMyDetox && selectedMyDetox) || (isMyDiet && selectedMyDiet) || (isMyAgeing && selectedMyAgeing) || (isMySport && selectedMySport) || (isMySuplements && selectedMySuplements)
                    ? 'border-earth bg-earth-50 hover:border-warm'
                    : (isMyPharma || isMyDetox || isMyDiet || isMyAgeing || isMySport || isMySuplements)
                      ? 'border-cream bg-warm-white hover:border-earth'
                      : isLpA && selectedLpA
                        ? 'border-earth bg-earth-50 hover:border-warm'
                        : isLpA
                          ? 'border-cream bg-warm-white hover:border-earth'
                                                            : isLongitudTelomerica && selectedLongitudTelomerica
                                ? 'border-earth bg-earth-50 hover:border-warm'
                                : isLongitudTelomerica
                                  ? 'border-cream bg-warm-white hover:border-earth'
                                  : isAcidosGrasos && selectedAcidosGrasos
                                        ? 'border-earth bg-earth-50 hover:border-warm'
                                        : isAcidosGrasos
                                          ? 'border-cream bg-warm-white hover:border-earth'
                                          : isVitaminaK1 && selectedVitaminaK1
                                            ? 'border-earth bg-earth-50 hover:border-warm'
                                            : isVitaminaK1
                                              ? 'border-cream bg-warm-white hover:border-earth'
                                              : isIL6 && selectedIL6
                                                ? 'border-earth bg-earth-50 hover:border-warm'
                                                : isIL6
                                                  ? 'border-cream bg-warm-white hover:border-earth'
                                                  : isTNFα && selectedTNFα
                                                    ? 'border-earth bg-earth-50 hover:border-warm'
                                                    : isTNFα
                                                      ? 'border-cream bg-warm-white hover:border-earth'
                                                                                                                : isHelicobacter && selectedHelicobacter
                                                        ? 'border-earth bg-earth-50 hover:border-warm'
                                                        : isHelicobacter
                                                          ? 'border-cream bg-warm-white hover:border-earth'
                                                          : (isEstradiolHormonas && selectedEstradiolHormonas) || (isEstradiolEndocrino && selectedEstradiolEndocrino)
                                                            ? 'border-earth bg-earth-50 hover:border-warm'
                                                            : isEstradiolHormonas || isEstradiolEndocrino
                                                              ? 'border-cream bg-warm-white hover:border-earth'
                                                              : (isProlactinaHormonas && selectedProlactinaHormonas) || (isProlactinaEndocrino && selectedProlactinaEndocrino)
                                                                ? 'border-earth bg-earth-50 hover:border-warm'
                                                                : isProlactinaHormonas || isProlactinaEndocrino
                                                                  ? 'border-cream bg-warm-white hover:border-earth'
                                                                  : (isLHHormonas && selectedLHHormonas) || (isLHEndocrino && selectedLHEndocrino)
                                                                    ? 'border-earth bg-earth-50 hover:border-warm'
                                                                    : isLHHormonas || isLHEndocrino
                                                                      ? 'border-cream bg-warm-white hover:border-earth'
                                                                      : (isFSHHormonas && selectedFSHHormonas) || (isFSHEndocrino && selectedFSHEndocrino) || (isFSHCancer && selectedFSHCancer)
                                                                        ? 'border-earth bg-earth-50 hover:border-warm'
                                                                        : isFSHHormonas || isFSHEndocrino || isFSHCancer
                                                                          ? 'border-cream bg-warm-white hover:border-earth'
                                                                          : isVSGEndocrino && selectedVSGEndocrino
                                                                            ? 'border-earth bg-earth-50 hover:border-warm'
                                                                            : isVSGEndocrino
                                                                              ? 'border-cream bg-warm-white hover:border-earth'

                                                                              : isVitaminaD125OHEndocrino && selectedVitaminaD125OHEndocrino
                                                                                ? 'border-earth bg-earth-50 hover:border-warm'
                                                                                : isVitaminaD125OHEndocrino
                                                                                  ? 'border-cream bg-warm-white hover:border-earth'
                                                                                  : 'border-earth bg-earth-50 hover:border-warm'
          }
        `}
      >
        <div 
          className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-earth-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-3 h-3 gradient-earth rounded-full flex-shrink-0"></div>
            
            {/* Selector específico para Intolerancia Alimentaria - Lado Izquierdo - SOLO en add-ons */}
            {isIntolerancia && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleIntoleranciaSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedIntolerancia
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedIntolerancia ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedIntolerancia ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}
            
            {/* Selector específico para Metaboloma (orina/heces) - Lado Izquierdo - SOLO en add-ons */}
            {isMetaboloma && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMetabolomaSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMetaboloma
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMetaboloma ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMetaboloma ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}
            


            {/* Selectores para los nuevos tests genómicos - SOLO en add-ons */}
            {isMyPharma && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyPharmaSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyPharma
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyPharma ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyPharma ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMyDetox && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyDetoxSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyDetox
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyDetox ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyDetox ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMyDiet && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyDietSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyDiet
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyDiet ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyDiet ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMyAgeing && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMyAgeingSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMyAgeing
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMyAgeing ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMyAgeing ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMySport && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMySportSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMySport
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMySport ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMySport ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {isMySuplements && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMySuplementsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedMySuplements
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedMySuplements ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedMySuplements ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Lp(a) * - SOLO en add-ons */}
            {isLpA && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLpASelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLpA
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLpA ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLpA ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}



            {/* Selector específico para Longitud telomérica - SOLO en add-ons */}
            {isLongitudTelomerica && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLongitudTelomericaSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLongitudTelomerica
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLongitudTelomerica ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLongitudTelomerica ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}



            {/* Selector específico para Ácidos grasos % - SOLO en add-ons */}
            {isAcidosGrasos && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAcidosGrasosSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedAcidosGrasos
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedAcidosGrasos ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedAcidosGrasos ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Vitamina K1 - SOLO en add-ons */}
            {isVitaminaK1 && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVitaminaK1Selection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVitaminaK1
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVitaminaK1 ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVitaminaK1 ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para IL-6 */}
            {isIL6 && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleIL6Selection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedIL6
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedIL6 ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedIL6 ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para TNF-α */}
            {isTNFα && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTNFαSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedTNFα
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedTNFα ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedTNFα ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Helicobacter pylori IgG An */}
            {isHelicobacter && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleHelicobacterSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedHelicobacter
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedHelicobacter ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedHelicobacter ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Estradiol en Hormonas */}
            {isEstradiolHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEstradiolHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedEstradiolHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedEstradiolHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedEstradiolHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Estradiol en Endocrino */}
            {isEstradiolEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEstradiolEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedEstradiolEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedEstradiolEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedEstradiolEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Prolactina en Hormonas */}
            {isProlactinaHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProlactinaHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedProlactinaHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedProlactinaHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedProlactinaHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Prolactina en Endocrino */}
            {isProlactinaEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProlactinaEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedProlactinaEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedProlactinaEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedProlactinaEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para LH en Hormonas */}
            {isLHHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLHHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLHHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLHHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLHHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para LH en Endocrino */}
            {isLHEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLHEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedLHEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedLHEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedLHEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para FSH en Hormonas */}
            {isFSHHormonas && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFSHHormonasSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedFSHHormonas
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedFSHHormonas ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedFSHHormonas ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para FSH en Endocrino */}
            {isFSHEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFSHEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedFSHEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedFSHEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedFSHEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para FSH en Cancer */}
            {isFSHCancer && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFSHCancerSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedFSHCancer
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedFSHCancer ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedFSHCancer ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Vitamina C en Estrés Oxidativo */}
            {isVitaminaCOxidativeCell && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVitaminaCOxidativeCellSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVitaminaCOxidativeCell
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVitaminaCOxidativeCell ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVitaminaCOxidativeCell ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Vitamina C en IV & Nutrientes */}
            {isVitaminaCIVNutrients && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVitaminaCIVNutrientsSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVitaminaCIVNutrients
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVitaminaCIVNutrients ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVitaminaCIVNutrients ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Urianálisis + sedimento en Digestivo */}
            {isUrinalisisDigestivo && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleUrinalisisDigestivoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedUrinalisisDigestivo
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedUrinalisisDigestivo ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedUrinalisisDigestivo ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Ova & Parasites stool en Digestivo */}
            {isOvaParasitesDigestivo && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOvaParasitesDigestivoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedOvaParasitesDigestivo
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedOvaParasitesDigestivo ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedOvaParasitesDigestivo ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para VSG en Endocrino */}
            {isVSGEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVSGEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVSGEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVSGEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVSGEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}

            {/* Selector específico para Vitamina D 1,25-OH en Endocrino */}
            {isVitaminaD125OHEndocrino && addOnId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVitaminaD125OHEndocrinoSelection();
                }}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all font-bold text-xs flex-shrink-0
                  ${selectedVitaminaD125OHEndocrino
                    ? 'bg-white border-earth text-earth hover:bg-earth-50 hover:border-warm'
                    : 'bg-earth border-earth text-white hover:bg-warm shadow-md'
                  }
                `}
                title={selectedVitaminaD125OHEndocrino ? "Quitar del análisis" : "Añadir al análisis"}
              >
                {selectedVitaminaD125OHEndocrino ? (
                  <FaMinus className="text-xs" />
                ) : (
                  <FaPlus className="text-xs" />
                )}
              </button>
            )}


            
            <div className="flex-1">
              <h5 className={`font-semibold text-sm mb-1 ${(isIntolerancia && selectedIntolerancia) || (isMetaboloma && selectedMetaboloma) || (isMyPharma && selectedMyPharma) || (isMyDetox && selectedMyDetox) || (isMyDiet && selectedMyDiet) || (isMyAgeing && selectedMyAgeing) || (isMySport && selectedMySport) || (isMySuplements && selectedMySuplements) || (isLpA && selectedLpA) || (isLongitudTelomerica && selectedLongitudTelomerica) || (isAcidosGrasos && selectedAcidosGrasos) || (isVitaminaK1 && selectedVitaminaK1) || (isIL6 && selectedIL6) || (isTNFα && selectedTNFα) || (isHelicobacter && selectedHelicobacter) || (isEstradiolHormonas && selectedEstradiolHormonas) || (isProlactinaHormonas && selectedProlactinaHormonas) || (isLHHormonas && selectedLHHormonas) || (isFSHHormonas && selectedFSHHormonas) || (isEstradiolEndocrino && selectedEstradiolEndocrino) || (isProlactinaEndocrino && selectedProlactinaEndocrino) || (isLHEndocrino && selectedLHEndocrino) || (isFSHEndocrino && selectedFSHEndocrino) || (isVSGEndocrino && selectedVSGEndocrino) || (isVitaminaD125OHEndocrino && selectedVitaminaD125OHEndocrino) || (isFSHCancer && selectedFSHCancer) || (isVitaminaCOxidativeCell && selectedVitaminaCOxidativeCell) || (isVitaminaCIVNutrients && selectedVitaminaCIVNutrients) || (isUrinalisisDigestivo && selectedUrinalisisDigestivo) || (isOvaParasitesDigestivo && selectedOvaParasitesDigestivo) ? 'text-earth' : 'text-stone'}`}>
                {t(`biomarkerNames.${biomarker.code}`, biomarker.name)}
              </h5>
              <p className="text-xs text-taupe">{t(`biomarkerCategories.${biomarker.category}`, biomarker.category)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {t(`biomarkers.${biomarker.code}.description`) && (
              <div className="bg-earth-100 p-1.5 rounded-full text-earth hover:bg-earth-200 transition-colors">
                {isExpanded ? (
                  <FaChevronUp className="text-xs" />
                ) : (
                  <FaChevronDown className="text-xs" />
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Descripción expandible */}
        <AnimatePresence>
          {isExpanded && t(`biomarkers.${biomarker.code}.description`) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 bg-earth-50 border-t border-earth">
                <div className="p-3 mt-2">
                  <p className="text-xs text-stone leading-relaxed italic">
                    {t(`biomarkers.${biomarker.code}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section className="bg-soft-cream py-20" id="systems">
      <div className="container max-w-7xl">


        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="bg-warm-white rounded-2xl p-8 shadow-xl border-2 border-earth">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone mb-4">
              {t('systems.title')} <span className="gradient-text-earth">{t('systems.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-taupe max-w-3xl mx-auto font-medium leading-relaxed">
              {t('systems.description')}
            </p>
          </div>
        </motion.div>

        {/* Tres Perfiles de Análisis - Entre Header y Essential Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-stretch"
        >
          {/* Perfil 1: Essential */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => handleProfileSelection('essential')}
            className={`cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 h-72 flex flex-col ${
              selectedProfile === 'essential' 
                ? 'bg-earth-100 border-earth shadow-xl ring-2 ring-earth' 
                : 'bg-warm-white border-earth hover:shadow-xl hover:border-warm'
            }`}
          >
            <div className="text-center flex-1 flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  selectedProfile === 'essential' ? 'shadow-lg' : ''
                }`}>
                  <span className="text-white text-xl font-bold">LA</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedProfile === 'essential' ? 'text-stone' : 'text-stone'
                }`}>
                  {t('systems.analysisProfiles.essential.title')}
                </h3>
                <div className={`text-2xl font-bold mb-3 ${
                  selectedProfile === 'essential' ? 'text-earth' : 'text-earth'
                }`}>
                  {t('systems.analysisProfiles.essential.highlight')}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                selectedProfile === 'essential' ? 'text-taupe' : 'text-taupe'
              }`}>
                {t('systems.analysisProfiles.essential.description')}
              </p>
            </div>
          </motion.div>

          {/* Perfil 2: Core */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => handleProfileSelection('core')}
            className={`cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 h-72 flex flex-col ${
              selectedProfile === 'core' 
                ? 'bg-warm-100 border-warm shadow-xl ring-2 ring-warm' 
                : 'bg-warm-white border-warm hover:shadow-xl hover:border-earth'
            }`}
          >
            <div className="text-center flex-1 flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  selectedProfile === 'core' ? 'shadow-lg' : ''
                }`}>
                  <span className="text-white text-xl font-bold">LA</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedProfile === 'core' ? 'text-stone' : 'text-stone'
                }`}>
                  {t('systems.analysisProfiles.core.title')}
                </h3>
                <div className={`text-2xl font-bold mb-3 ${
                  selectedProfile === 'core' ? 'text-warm' : 'text-warm'
                }`}>
                  {t('systems.analysisProfiles.core.highlight')}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                selectedProfile === 'core' ? 'text-taupe' : 'text-taupe'
              }`}>
                {t('systems.analysisProfiles.core.description')}
              </p>
            </div>
          </motion.div>

          {/* Perfil 3: Advanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => handleProfileSelection('advanced')}
            className={`cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:scale-105 h-72 flex flex-col ${
              selectedProfile === 'advanced' 
                ? 'bg-earth-100 border-earth shadow-xl ring-2 ring-earth' 
                : 'bg-warm-white border-earth hover:shadow-xl hover:border-warm'
            }`}
          >
            <div className="text-center flex-1 flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 gradient-earth rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  selectedProfile === 'advanced' ? 'shadow-lg' : ''
                }`}>
                  <span className="text-white text-xl font-bold">LA</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedProfile === 'advanced' ? 'text-stone' : 'text-stone'
                }`}>
                  {t('systems.analysisProfiles.advanced.title')}
                </h3>
                <div className={`text-2xl font-bold mb-3 ${
                  selectedProfile === 'advanced' ? 'text-earth' : 'text-earth'
                }`}>
                  {t('systems.analysisProfiles.advanced.highlight')}
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                selectedProfile === 'advanced' ? 'text-taupe' : 'text-taupe'
              }`}>
                {t('systems.analysisProfiles.advanced.description')}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Essential Package - Card Principal de Doble Ancho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-warm-white rounded-2xl shadow-xl overflow-hidden border-2 border-earth w-full">
            {/* Essential Header */}
            <div className="bg-earth-50 p-6 border-b-2 border-earth">
              {/* Header con ícono, título y precio en esquina superior derecha */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 gradient-earth rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">LA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-stone">
                      {getSelectedProfileData().name}
                    </h3>
                    
                    {/* Gender Selector - Al lado del título */}
                    <div className="essential-gender-selector">
                      <button
                        onClick={() => handleGenderChange('male')}
                        className={`
                          essential-gender-button
                          ${selectedGender === 'male' 
                            ? 'bg-earth text-white shadow-sm' 
                            : 'bg-earth-50 text-earth hover:bg-earth-100'
                          }
                        `}
                      >
                        <span>♂</span>
                      </button>
                      <button
                        onClick={() => handleGenderChange('female')}
                        className={`
                          essential-gender-button
                          ${selectedGender === 'female' 
                            ? 'bg-warm text-white shadow-sm' 
                            : 'bg-warm-50 text-warm hover:bg-warm-100'
                          }
                        `}
                      >
                        <span>♀</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Precio en esquina superior derecha */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-earth">
                    {getSelectedProfileData().price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('systems.pvp')}: {getSelectedProfileData().pvp}
                  </div>
                  <div className="text-taupe text-sm font-semibold mt-1">
                    {getSelectedProfileData().testCount} {t('systems.biomarkers')}
                  </div>
                </div>
              </div>

              {/* Descripción abajo */}
              <div className="ml-22" style={{ marginRight: '224px' }}>
                <p className="text-taupe text-base leading-relaxed">
                  {getSelectedProfileData().description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 ml-22">
                {getSelectedProfileData().features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheck className="text-earth text-sm" />
                    <span className="text-taupe text-sm">{feature}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Profile Actions - Mismo estilo que Add-Ons */}
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => toggleBiomarker(selectedProfile)}
                  className="flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 border-cream hover:bg-earth-50 hover:border-earth transition-all font-medium"
                >
                  <span className="text-stone font-semibold text-sm">{t('systems.viewBiomarkers')}</span>
                  {expandedBiomarkers.includes(selectedProfile) ? (
                    <FaChevronUp className="text-taupe text-sm" />
                  ) : (
                    <FaChevronDown className="text-taupe text-sm" />
                  )}
                </button>
              </div>
            </div>

            {/* Profile Biomarkers List */}
            <AnimatePresence>
              {expandedBiomarkers.includes(selectedProfile) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-earth-50">
                    <div className="bg-warm-white rounded-xl p-6 border-2 border-earth shadow-lg">
                      <h4 className="text-lg font-bold text-stone mb-6 flex items-center gap-2 text-center justify-center">
                        {t('systems.biomarkersOf')} {getSelectedProfileData().name} ({getSelectedProfileData().testCount} {t('systems.tests')})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
                        {getSelectedProfileData().biomarkers.map((biomarker, index) => (
                          <BiomarkerCard key={biomarker.code} biomarker={biomarker} index={index} addOnId={null} />
                        ))}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Add-Ons Grid */}
        <div className="mb-16">
          <div className="bg-warm-white rounded-xl p-6 shadow-lg border-2 border-warm mb-8">
            <h3 className="text-2xl font-bold text-stone mb-3 text-center">
              {t('systems.addOnsSpecialized')}
            </h3>
            <p className="text-base text-taupe text-center max-w-2xl mx-auto">
              <span className="font-semibold text-earth">{t('systems.complementEssential')}</span> {t('systems.withSpecializedModules')}
            </p>
            <p className="text-sm text-gray-600 text-center italic mt-8 max-w-2xl mx-auto">
              <em>* {t('systems.geneticPricesDisclaimer')}</em>
            </p>
            
            {/* Botón Ver Add-Ons - Mismo estilo que ver biomarcadores */}
            <div className="p-6">
              <div className="flex flex-col gap-3">
                <button 
                  onClick={toggleAddOnsView}
                  className="flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 border-cream hover:bg-earth-50 hover:border-earth transition-all font-medium"
                >
                  <span className="text-stone font-semibold text-sm">{showAddOns ? t('systems.hideAddOns') : t('systems.viewAddOns')}</span>
                  {showAddOns ? (
                    <FaChevronUp className="text-taupe text-sm" />
                  ) : (
                    <FaChevronDown className="text-taupe text-sm" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Grid de Add-Ons con animación */}
          <AnimatePresence>
            {showAddOns && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-8">
                  {Object.values(addOnPackages).map((addOn, index) => (
              <motion.div
                key={addOn.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-warm-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border-2 border-cream hover:border-earth self-start"
              >
                {/* Add-On Header */}
                <div className={`${addOn.bgColor} ${addOn.borderColor} border-b p-6`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-2xl text-warm">
                      <addOn.icon />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xl font-bold text-stone">
                          {t(`addOns.${addOn.id}.name`)}
                        </h4>
                        {hasGenderDifferences(addOn.id) && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warm-white border border-earth">
                            <span className="text-xs">
                              {selectedGender === 'male' ? '♂' : '♀'}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-taupe text-sm">
                        {t(`addOns.${addOn.id}.description`)}
                      </p>
                      {hasGenderDifferences(addOn.id) && (
                        <div className="mt-2">
                          {getGenderIndicator(addOn.id, selectedGender)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <div className="text-2xl font-bold text-earth">
                        {(() => {
                          // Obtener precios dinámicos del add-on
                          const addOnPricing = addOn.getPricing();
                          
                          let basePrice = 0;
                          if (addOnPricing.male && addOnPricing.female) {
                            // Add-on con diferenciación por género
                            basePrice = addOnPricing[selectedGender].price;
                          } else {
                            // Add-on sin diferenciación por género
                            basePrice = addOnPricing.price;
                          }
                          
                          // Usar el contexto para aplicar ajustes dinámicos
                          const adjustedPrices = getAdjustedAddOnPrice(addOn.id, basePrice, 0);
                          return `${Math.round(adjustedPrices.price)}€`;
                        })()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t('systems.pvp')}: {(() => {
                          // Obtener precios dinámicos del add-on
                          const addOnPricing = addOn.getPricing();
                          
                          let basePrice = 0;
                          let basePvp = 0;
                          if (addOnPricing.male && addOnPricing.female) {
                            // Add-on con diferenciación por género
                            basePrice = addOnPricing[selectedGender].price;
                            basePvp = addOnPricing[selectedGender].marketPrice;
                          } else {
                            // Add-on sin diferenciación por género
                            basePrice = addOnPricing.price;
                            basePvp = addOnPricing.marketPrice;
                          }
                          
                          // Usar el contexto para aplicar ajustes dinámicos
                          const adjustedPrices = getAdjustedAddOnPrice(addOn.id, basePrice, basePvp);
                          return `${Math.round(adjustedPrices.pvp)}€`;
                        })()}
                      </div>
                    </div>
                    <div className="text-taupe text-sm">
                      {getActualBiomarkerCount(addOn.id, selectedGender)} {t('systems.tests')}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2" style={{marginLeft: '32px'}}>
                    {t(`addOnBenefits.${addOn.id}`).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FaCheck className={`${addOn.textColor} text-xs`} />
                        <span className="text-taupe text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add-On Actions */}
                <div className="p-6">
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => toggleBiomarker(addOn.id)}
                      className="flex items-center justify-between w-full py-3 px-4 rounded-lg border-2 border-cream hover:bg-earth-50 hover:border-earth transition-all font-medium"
                    >
                                              <span className="text-stone font-semibold text-sm">{t('systems.viewBiomarkers')}</span>
                      {expandedBiomarkers.includes(addOn.id) ? (
                        <FaChevronUp className="text-taupe text-sm" />
                      ) : (
                        <FaChevronDown className="text-taupe text-sm" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Biomarkers */}
                  <AnimatePresence>
                    {expandedBiomarkers.includes(addOn.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="bg-earth-50 rounded-lg p-4 border-2 border-cream">
                          <h5 className="text-base font-bold text-stone mb-4 flex items-center gap-2 justify-center">
                            {t('systems.biomarkersOf')} {t(`addOns.${addOn.id}.name`)} ({getActualBiomarkerCount(addOn.id, selectedGender)} {t('systems.tests')})
                          </h5>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {addOn.biomarkers.map((biomarker, idx) => (
                              <BiomarkerCard key={biomarker.code} biomarker={biomarker} index={idx} addOnId={addOn.id} />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="gradient-earth rounded-2xl p-8 text-white shadow-xl border-2 border-warm">
            <h3 className="text-2xl font-bold mb-4 text-center" dangerouslySetInnerHTML={{ __html: t('systems.ctaTitle') }}>
            </h3>
            <p className="text-white text-opacity-90 mb-6 max-w-2xl mx-auto text-base text-center leading-relaxed" dangerouslySetInnerHTML={{ __html: t('systems.ctaDescription') }}>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MedicalSystemsExplorer; 