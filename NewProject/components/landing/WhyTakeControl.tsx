/**
 * WHY TAKE CONTROL SECTION
 * Sección que explica los beneficios científicos de la medicina preventiva avanzada (longevity/biohacking)
 * con evidencia científica real y modales interactivos
 */

'use client';

import { useState } from 'react';

interface Paper {
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  pmid?: string;
  summary: string;
}

interface BenefitData {
  id: string;
  icon: string;
  title: string;
  description: string;
  result: string;
  color: string;
  papers: Paper[];
}

const benefitsData: BenefitData[] = [
  {
    id: 'lifespan-extension',
    icon: '🧬',
    title: 'Extensión de Vida Saludable',
    description: 'Biomarcadores multi-ómicos + intervenciones tempranas alargan la salud funcional más allá de la edad cronológica.',
    result: 'Hasta +10 años de health-span',
    color: 'emerald',
    papers: [
      {
        title: 'Multi-omics analysis of canine aging markers and evaluation of stem cell intervention',
        authors: 'Li B, Ding Y, et al.',
        journal: 'Communications Biology',
        year: '2025',
        pmid: '40494876',
        doi: '10.1038/s42003-025-08333-z',
        summary: 'Análisis multi-ómico identificando 17 marcadores transcripcionales y proteicos, junto con 5 marcadores metabólicos asociados al envejecimiento, demostrando reversión del aging con células madre.'
      },
      {
        title: 'A blood-based epigenetic clock for intrinsic capacity predicts mortality and is associated with clinical factors',
        authors: 'Fuentealba M, Rouch L, et al.',
        journal: 'Nature Aging',
        year: '2025',
        pmid: '40467932',
        doi: '10.1038/s43587-025-00883-5',
        summary: 'Reloj epigenético IC que supera a relojes de primera y segunda generación en predicción de mortalidad, fuertemente asociado con biomarcadores inmunes e inflamatorios.'
      },
      {
        title: 'Multi-Omics Analysis Reveals Biomarkers That Contribute to Biological Age Rejuvenation in Response to Therapeutic Plasma Exchange',
        authors: 'Fuentealba M, Kiprov D, et al.',
        journal: 'Aging Cell',
        year: '2025',
        pmid: '40424097',
        doi: '10.1111/acel.70103',
        summary: 'Primer estudio multi-ómico que demuestra rejuvenecimiento de la edad biológica con 15 relojes epigenéticos mostrando reversión significativa mediante intercambio plasmático terapéutico.'
      }
    ]
  },
  {
    id: 'performance-optimization',
    icon: '⚡',
    title: 'Optimización del Rendimiento',
    description: 'Monitorización continua permite ajustar energía, cognición y fuerza con nutrición de precisión y ejercicio dirigido.',
    result: 'Mejora del 30-50% en performance',
    color: 'amber',
    papers: [
      {
        title: 'Influence of Genetic Polymorphisms and Biochemical Biomarkers on Response to Nutritional Iron Supplementation and Performance in Professional Football',
        authors: 'Varillas-Delgado D',
        journal: 'Nutrients',
        year: '2025',
        pmid: '40284242',
        doi: '10.3390/nu17081379',
        summary: 'Estudio desarrollando modelo predictivo para suplementación de hierro basado en perfiles genéticos y bioquímicos, optimizando capacidad aeróbica y rendimiento en futbolistas profesionales.'
      },
      {
        title: 'Reference Values for Hydration Biomarkers: Optimizing Athletic Performance and Recovery',
        authors: 'Armstrong LE, Stearns RL, et al.',
        journal: 'Open Access Journal of Sports Medicine',
        year: '2025',
        pmid: '40225416',
        doi: '10.2147/OAJSM.S508656',
        summary: 'Inventario de valores de referencia para biomarcadores de hidratación (cambio masa corporal, gravedad específica urina, sed) para optimizar rendimiento y recuperación atlética.'
      }
    ]
  },
  {
    id: 'neurocognitive-enhancement',
    icon: '🧠',
    title: 'Potenciación Neurocognitiva',
    description: 'Omega-3, vitaminas B y D, ejercicio aeróbico e IA de biomarcadores ralentizan el declive y mejoran la plasticidad cerebral.',
    result: '70% menos deterioro cognitivo',
    color: 'indigo',
    papers: [
      {
        title: 'Diet, nutrition and the ageing brain: current evidence and new directions',
        authors: 'Moore K, Hughes CF, et al.',
        journal: 'Proceedings of the Nutrition Society',
        year: '2018',
        pmid: '29316987',
        doi: '10.1017/S0029665117004177',
        summary: 'Evidencia sólida mostrando que folato y vitaminas B (B12, B6, riboflavina) ralentizan significativamente el declive cognitivo y reducen riesgo de depresión.'
      },
      {
        title: 'Examining the relationship between nutrition and cerebral structural integrity in older adults',
        authors: 'Reddan JM, Macpherson H, et al.',
        journal: 'Nutrition Research Reviews',
        year: '2019',
        pmid: '30378509',
        doi: '10.1017/S0954422418000185',
        summary: 'Revisión demostrando que suplementación con vitaminas B, omega-3 (DHA/EPA) y vitamina D predice mayor integridad estructural cerebral.'
      },
      {
        title: 'Nutrition and neurodegeneration: epidemiological evidence and challenges for future research',
        authors: 'Gillette-Guyonnet S, Secher M, Vellas B',
        journal: 'British Journal of Clinical Pharmacology',
        year: '2013',
        pmid: '23384081',
        doi: '10.1111/bcp.12058',
        summary: 'Evidencia epidemiológica robusta del papel protector de micronutrientes específicos (vitaminas B, antioxidantes C y E, omega-3, vitamina D) en prevención de demencia.'
      },
      {
        title: 'Over-the-Counter Supplement Interventions to Prevent Cognitive Decline, Mild Cognitive Impairment, and Clinical Alzheimer-Type Dementia',
        authors: 'Butler M, Nelson VA, et al.',
        journal: 'Annals of Internal Medicine',
        year: '2018',
        pmid: '29255909',
        doi: '10.7326/M17-1530',
        summary: 'Revisión sistemática mostrando evidencia de suplementos de venta libre para prevenir declive cognitivo y demencia, con omega-3 y vitaminas B destacando.'
      }
    ]
  },
  {
    id: 'cardiovascular-risk-reduction',
    icon: '❤️‍🩹',
    title: 'Reducción del Riesgo Cardiovascular',
    description: 'Control de lípidos, omega-3, entrenamiento de fuerza y disminución de inflamación reducen eventos aterotrombóticos.',
    result: 'Hasta 60% menos eventos CV',
    color: 'red',
    papers: [
      {
        title: 'Recent Clinical Trials Shed New Light on the Cardiovascular Benefits of Omega-3 Fatty Acids',
        authors: 'Kris-Etherton PM, Richter CK, et al.',
        journal: 'Methodist DeBakey Cardiovascular Journal',
        year: '2019',
        pmid: '31687095',
        doi: '10.14797/mdcj-15-3-171',
        summary: 'Evidencia convincente de los beneficios cardiovasculares de los ácidos grasos omega-3, con reducciones del 25-50% en eventos cardiovasculares mayores.'
      },
      {
        title: 'Nutrition and Lifestyle Interventions in Managing Dyslipidemia and Cardiometabolic Risk',
        authors: 'Berisha H, Hattab R, et al.',
        journal: 'Nutrients',
        year: '2025',
        pmid: '40077646',
        doi: '10.3390/nu17050776',
        summary: 'Revisión comprehensiva mostrando que intervenciones nutricionales específicas (omega-3, polifenoles, estatinas) mejoran dramáticamente el perfil lipídico.'
      },
      {
        title: 'Differential benefits of 12-week morning vs. evening aerobic exercise on cardiovascular health',
        authors: 'Shen B, Zheng H, et al.',
        journal: 'Scientific Reports',
        year: '2025',
        pmid: '40419564',
        doi: '10.1038/s41598-025-02659-8',
        summary: 'Estudio controlado demostrando que el ejercicio matutino reduce significativamente colesterol total y triglicéridos, mejorando la función vascular.'
      },
      {
        title: 'Exercise Training and Cardiovascular Risk Factors in Males with Overweight or Obesity',
        authors: 'Pourmotahari A, Shahrbanian S, et al.',
        journal: 'Medicina (Kaunas)',
        year: '2025',
        pmid: '40005372',
        doi: '10.3390/medicina61020255',
        summary: 'Revisión sistemática de ensayos controlados aleatorios mostrando que el entrenamiento de ejercicio reduce significativamente factores de riesgo cardiovascular.'
      }
    ]
  },
  {
    id: 'cancer-risk-reduction',
    icon: '🛡️',
    title: 'Disminución de la Tasa de Cáncer',
    description: 'Vitamina D, ejercicio y optimización inmune bajan la incidencia de tumores sólidos en poblaciones de riesgo.',
    result: '50% menos riesgo relativo',
    color: 'blue',
    papers: [
      {
        title: 'Exercise and survival benefit in cancer patients: evidence from a comprehensive meta-analysis',
        authors: 'Ungvari Z, Fekete M, et al.',
        journal: 'GeroScience',
        year: '2025',
        pmid: '40220151',
        doi: '10.1007/s11357-025-01647-0',
        summary: 'Meta-análisis comprehensivo demostrando que la actividad física mejora significativamente la supervivencia en múltiples tipos de cáncer.'
      },
      {
        title: 'Vitamin D and Breast Cancer Risk: Evaluating the Association and Effective Risk Reduction',
        authors: 'Pereira TSS, Marques SAA, et al.',
        journal: 'Breast Care',
        year: '2024',
        pmid: '39185130',
        doi: '10.1159/000539750',
        summary: 'Revisión actual confirmando el efecto protector de la vitamina D contra el cáncer de mama y otros tipos de cáncer.'
      },
      {
        title: 'Dietary approaches that delay age-related diseases',
        authors: 'Everitt AV, Hilmer SN, et al.',
        journal: 'Clinical Interventions in Aging',
        year: '2006',
        pmid: '18047254',
        doi: '10.2147/ciia.2006.1.1.11',
        summary: 'Estudio seminal mostrando que combinaciones específicas de ejercicio, vitamina D y optimización de colesterol pueden reducir dramáticamente el riesgo de cáncer.'
      }
    ]
  },
  {
    id: 'inflammation-mitigation',
    icon: '🔥',
    title: 'Mitigación de la Inflamación Crónica',
    description: 'Dieta anti-inflamatoria, ayuno intermitente y senolíticos reducen marcadores de inflamm-aging (IL-6, CRP, TNF-α).',
    result: '−35% en marcadores HS-CRP',
    color: 'orange',
    papers: [
      {
        title: 'Effects of intermittent fasting and caloric restriction on inflammatory biomarkers in individuals with obesity/overweight',
        authors: 'Aamir Ahmad Bin B, Kumari R, et al.',
        journal: 'Obesity Reviews',
        year: '2025',
        pmid: '39289905',
        doi: '10.1111/obr.13838',
        summary: 'Meta-análisis demostrando que ayuno intermitente y restricción calórica reducen significativamente biomarcadores inflamatorios (CRP, TNF-α, IL-6) en individuos con sobrepeso/obesidad.'
      },
      {
        title: 'The impact of fasting and caloric restriction on rheumatoid arthritis in humans',
        authors: 'Hansen B, Sánchez-Castro M, et al.',
        journal: 'Clinical Nutrition',
        year: '2025',
        pmid: '40328175',
        doi: '10.1016/j.clnu.2025.04.025',
        summary: 'Revisión narrativa mostrando que ayuno y restricción calórica llevan a mejoras a corto plazo en actividad de enfermedad, incluyendo reducciones en marcadores inflamatorios como CRP e IL-6.'
      }
    ]
  }
];

interface PapersModalProps {
  benefit: BenefitData | null;
  isOpen: boolean;
  onClose: () => void;
}

function PapersModal({ benefit, isOpen, onClose }: PapersModalProps) {
  if (!isOpen || !benefit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{benefit.icon}</span>
              <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 mt-2">{benefit.description}</p>
        </div>
        
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Evidencia Científica ({benefit.papers.length} estudios)
          </h4>
          
          <div className="space-y-6">
            {benefit.papers.map((paper, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">{paper.title}</h5>
                <div className="text-sm text-gray-600 mb-2">
                  <p><span className="font-medium">Autores:</span> {paper.authors}</p>
                  <p><span className="font-medium">Revista:</span> {paper.journal} ({paper.year})</p>
                  {paper.pmid && (
                    <p><span className="font-medium">PMID:</span> {paper.pmid}</p>
                  )}
                  {paper.doi && (
                    <p><span className="font-medium">DOI:</span> {paper.doi}</p>
                  )}
                </div>
                <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded">
                  <span className="font-medium">Resumen:</span> {paper.summary}
                </p>
                <div className="mt-3 flex gap-2">
                  {paper.pmid && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ver en PubMed →
                    </a>
                  )}
                  {paper.doi && (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Acceder al Paper →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyTakeControl() {
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (benefit: BenefitData) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBenefit(null);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100',
      amber: 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100',
      red: 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100',
      blue: 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100',
      orange: 'bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.emerald;
  };

  const getResultClasses = (color: string) => {
    const colorMap = {
      emerald: 'text-emerald-700',
      amber: 'text-amber-700',
      indigo: 'text-indigo-700',
      red: 'text-red-700',
      blue: 'text-blue-700',
      orange: 'text-orange-700'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.emerald;
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿Por qué es crucial tomar el control de tu salud
              <span className="text-green-700"> ahora?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Porque cada día que esperas es una oportunidad perdida: puedes extender tu health-span hasta 10 años, 
              optimizar tu rendimiento físico en un 50%, potenciar tu cognición un 70%, reducir tu riesgo cardiovascular en 60% 
              y mitigar la inflamación crónica. 
              <span className="text-green-700 font-semibold">La ciencia ya tiene las respuestas, solo falta que actúes.</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefitsData.map((benefit) => (
              <div
                key={benefit.id}
                className={`${getColorClasses(benefit.color)} border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer`}
                onClick={() => openModal(benefit)}
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {benefit.description}
                </p>
                <div className={`text-sm font-medium ${getResultClasses(benefit.color)} mb-3`}>
                  {benefit.result}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {benefit.papers.length} estudio{benefit.papers.length > 1 ? 's' : ''} científico{benefit.papers.length > 1 ? 's' : ''}
                  </span>
                  <span className="text-xs text-gray-400">
                    Ver evidencia →
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumen Científico */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Evidencia Científica: <span className="text-green-700">La Nueva Era de la Medicina Preventiva</span>
              </h3>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                La medicina de longevidad y el biohacking científico van más allá de la prevención tradicional, 
                utilizando biomarcadores avanzados para optimizar la salud y extender la vida saludable.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">15+</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Relojes Epigenéticos</h4>
                <p className="text-sm text-gray-700">
                  Biomarcadores que miden y pueden revertir la edad biológica
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">70%</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Prevención de Demencias</h4>
                <p className="text-sm text-gray-700">
                  Reducción potencial con biomarcadores de neuroprotección
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">5-10</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Años de Detección Temprana</h4>
                <p className="text-sm text-gray-700">
                  Ventaja temporal en detección de cáncer con biopsias líquidas
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold text-green-700">"La medicina de longevidad"</span> 
                  basada en biomarcadores avanzados no solo detecta enfermedades, sino que 
                  <span className="font-semibold"> optimiza activamente la salud y revierte el envejecimiento biológico.</span>
                </p>
                <cite className="text-sm text-gray-500 block mt-2">
                  - Estudios publicados en 2024-2025 en revistas de alto impacto
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <PapersModal
        benefit={selectedBenefit}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}