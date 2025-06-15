/**
 * QUESTIONNAIRE DATA
 * Cuestionario para recomendar el paquete ideal
 */

export interface QuestionOption {
  id: string;
  text: string;
  points: {
    essential: number;
    performance: number;
    core: number;
    advanced: number;
  };
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
}

export const QUESTIONNAIRE_QUESTIONS: Question[] = [
  {
    id: 'age',
    title: '¿Cuál es tu rango de edad?',
    description: 'La edad influye en qué biomarcadores son más relevantes para tu salud',
    type: 'single',
    options: [
      {
        id: 'young',
        text: '18-30 años',
        points: { essential: 3, performance: 2, core: 1, advanced: 0 }
      },
      {
        id: 'adult',
        text: '31-45 años',
        points: { essential: 2, performance: 3, core: 2, advanced: 1 }
      },
      {
        id: 'middle',
        text: '46-60 años',
        points: { essential: 1, performance: 1, core: 3, advanced: 2 }
      },
      {
        id: 'senior',
        text: '60+ años',
        points: { essential: 0, performance: 0, core: 2, advanced: 3 }
      }
    ]
  },
  {
    id: 'goals',
    title: '¿Cuáles son tus principales objetivos de salud?',
    description: 'Selecciona todas las opciones que apliquen',
    type: 'multiple',
    options: [
      {
        id: 'basic_health',
        text: 'Monitoreo básico de salud general',
        points: { essential: 3, performance: 0, core: 1, advanced: 1 }
      },
      {
        id: 'sports_performance',
        text: 'Optimizar rendimiento deportivo',
        points: { essential: 0, performance: 3, core: 1, advanced: 2 }
      },
      {
        id: 'longevity',
        text: 'Envejecimiento saludable y longevidad',
        points: { essential: 0, performance: 1, core: 2, advanced: 3 }
      },
      {
        id: 'disease_prevention',
        text: 'Prevención de enfermedades',
        points: { essential: 1, performance: 1, core: 3, advanced: 2 }
      },
      {
        id: 'weight_management',
        text: 'Control de peso y metabolismo',
        points: { essential: 2, performance: 2, core: 2, advanced: 1 }
      },
      {
        id: 'hormonal_health',
        text: 'Salud hormonal y reproductiva',
        points: { essential: 1, performance: 2, core: 2, advanced: 3 }
      }
    ]
  },
  {
    id: 'activity_level',
    title: '¿Cuál es tu nivel de actividad física?',
    description: 'Esto nos ayuda a determinar qué análisis son más relevantes',
    type: 'single',
    options: [
      {
        id: 'sedentary',
        text: 'Sedentario (poco o nada de ejercicio)',
        points: { essential: 3, performance: 0, core: 2, advanced: 1 }
      },
      {
        id: 'light',
        text: 'Ligero (ejercicio 1-3 días/semana)',
        points: { essential: 2, performance: 1, core: 2, advanced: 1 }
      },
      {
        id: 'moderate',
        text: 'Moderado (ejercicio 3-5 días/semana)',
        points: { essential: 1, performance: 3, core: 2, advanced: 2 }
      },
      {
        id: 'intense',
        text: 'Intenso (ejercicio 6+ días/semana o atleta)',
        points: { essential: 0, performance: 3, core: 1, advanced: 2 }
      }
    ]
  },
  {
    id: 'health_concerns',
    title: '¿Tienes alguna preocupación específica de salud?',
    description: 'Selecciona todas las que apliquen',
    type: 'multiple',
    options: [
      {
        id: 'none',
        text: 'Ninguna preocupación específica',
        points: { essential: 3, performance: 2, core: 1, advanced: 0 }
      },
      {
        id: 'cardiovascular',
        text: 'Salud cardiovascular',
        points: { essential: 1, performance: 1, core: 3, advanced: 2 }
      },
      {
        id: 'diabetes',
        text: 'Diabetes o resistencia a la insulina',
        points: { essential: 2, performance: 2, core: 3, advanced: 2 }
      },
      {
        id: 'thyroid',
        text: 'Problemas de tiroides',
        points: { essential: 1, performance: 1, core: 2, advanced: 3 }
      },
      {
        id: 'inflammation',
        text: 'Inflamación crónica',
        points: { essential: 1, performance: 2, core: 2, advanced: 3 }
      },
      {
        id: 'fatigue',
        text: 'Fatiga o falta de energía',
        points: { essential: 2, performance: 2, core: 2, advanced: 2 }
      },
      {
        id: 'cognitive',
        text: 'Función cognitiva y memoria',
        points: { essential: 0, performance: 1, core: 2, advanced: 3 }
      }
    ]
  },
  {
    id: 'aspirations',
    title: '¿Cuáles son tus aspiraciones de salud a largo plazo?',
    description: 'Piensa en cómo te gustaría sentirte y vivir en los próximos años',
    type: 'multiple',
    options: [
      {
        id: 'maintain_current',
        text: 'Mantener mi estado actual de salud',
        points: { essential: 3, performance: 1, core: 1, advanced: 0 }
      },
      {
        id: 'optimize_energy',
        text: 'Tener más energía y vitalidad diaria',
        points: { essential: 2, performance: 3, core: 2, advanced: 1 }
      },
      {
        id: 'peak_performance',
        text: 'Alcanzar mi máximo potencial físico y mental',
        points: { essential: 0, performance: 3, core: 2, advanced: 3 }
      },
      {
        id: 'age_gracefully',
        text: 'Envejecer con gracia y mantener independencia',
        points: { essential: 1, performance: 1, core: 3, advanced: 3 }
      },
      {
        id: 'prevent_disease',
        text: 'Prevenir enfermedades antes de que aparezcan',
        points: { essential: 1, performance: 1, core: 3, advanced: 2 }
      },
      {
        id: 'understand_body',
        text: 'Entender profundamente cómo funciona mi cuerpo',
        points: { essential: 0, performance: 2, core: 2, advanced: 3 }
      }
    ]
  },
  {
    id: 'motivation',
    title: '¿Qué te motiva más a cuidar tu salud?',
    description: 'Entender tu motivación nos ayuda a recomendarte el enfoque más adecuado',
    type: 'single',
    options: [
      {
        id: 'family',
        text: 'Estar presente y saludable para mi familia',
        points: { essential: 2, performance: 1, core: 3, advanced: 2 }
      },
      {
        id: 'performance',
        text: 'Rendir al máximo en mi trabajo y actividades',
        points: { essential: 1, performance: 3, core: 2, advanced: 2 }
      },
      {
        id: 'longevity',
        text: 'Vivir muchos años con calidad de vida',
        points: { essential: 0, performance: 1, core: 2, advanced: 3 }
      },
      {
        id: 'curiosity',
        text: 'Curiosidad científica sobre mi cuerpo',
        points: { essential: 0, performance: 2, core: 2, advanced: 3 }
      },
      {
        id: 'prevention',
        text: 'Evitar problemas de salud futuros',
        points: { essential: 2, performance: 1, core: 3, advanced: 2 }
      },
      {
        id: 'optimization',
        text: 'Optimizar cada aspecto de mi bienestar',
        points: { essential: 0, performance: 2, core: 2, advanced: 3 }
      }
    ]
  }
];

export interface QuestionnaireResult {
  recommendedPackage: 'essential' | 'performance' | 'core' | 'advanced';
  scores: {
    essential: number;
    performance: number;
    core: number;
    advanced: number;
  };
  confidence: number;
  reasons: string[];
}

export function calculateRecommendation(answers: Record<string, string[]>): QuestionnaireResult {
  const scores = {
    essential: 0,
    performance: 0,
    core: 0,
    advanced: 0
  };

  const reasons: string[] = [];

  // Calcular puntuaciones basadas en las respuestas
  Object.entries(answers).forEach(([questionId, selectedOptions]) => {
    const question = QUESTIONNAIRE_QUESTIONS.find(q => q.id === questionId);
    if (!question) return;

    selectedOptions.forEach(optionId => {
      const option = question.options.find(o => o.id === optionId);
      if (!option) return;

      scores.essential += option.points.essential;
      scores.performance += option.points.performance;
      scores.core += option.points.core;
      scores.advanced += option.points.advanced;
    });
  });

  // Determinar el paquete recomendado
  const maxScore = Math.max(...Object.values(scores));
  const recommendedPackage = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as 'essential' | 'performance' | 'core' | 'advanced' || 'essential';

  // Calcular confianza (diferencia entre el mejor y segundo mejor)
  const sortedScores = Object.values(scores).sort((a, b) => b - a);
  const confidence = sortedScores[0] > 0 ? Math.min(100, ((sortedScores[0] - sortedScores[1]) / sortedScores[0]) * 100) : 50;

  // Generar razones basadas en las respuestas
  if (answers.age?.includes('young')) {
    reasons.push('Tu edad sugiere un enfoque en monitoreo básico y prevención');
  }
  if (answers.age?.includes('senior')) {
    reasons.push('Tu edad indica la importancia de un análisis completo para longevidad');
  }
  if (answers.goals?.includes('sports_performance')) {
    reasons.push('Tus objetivos deportivos requieren análisis específicos de rendimiento');
  }
  if (answers.goals?.includes('longevity')) {
    reasons.push('Tu interés en longevidad se beneficia de análisis avanzados');
  }
  if (answers.activity_level?.includes('intense')) {
    reasons.push('Tu alto nivel de actividad requiere monitoreo especializado');
  }
  if (answers.aspirations?.includes('peak_performance')) {
    reasons.push('Tu aspiración de máximo potencial requiere análisis completos');
  }
  if (answers.aspirations?.includes('age_gracefully')) {
    reasons.push('Tu deseo de envejecer con gracia se beneficia de análisis preventivos');
  }
  if (answers.aspirations?.includes('understand_body')) {
    reasons.push('Tu curiosidad por entender tu cuerpo requiere análisis detallados');
  }
  if (answers.health_concerns?.includes('cardiovascular')) {
    reasons.push('Tus preocupaciones cardiovasculares requieren monitoreo especializado');
  }
  if (answers.health_concerns?.includes('cognitive')) {
    reasons.push('Tu interés en función cognitiva se beneficia de análisis avanzados');
  }
  if (answers.motivation?.includes('longevity')) {
    reasons.push('Tu motivación por la longevidad se alinea con análisis completos');
  }
  if (answers.motivation?.includes('curiosity')) {
    reasons.push('Tu curiosidad científica se satisface mejor con análisis detallados');
  }
  if (answers.motivation?.includes('optimization')) {
    reasons.push('Tu deseo de optimización requiere información biomolecular avanzada');
  }
  if (answers.motivation?.includes('family')) {
    reasons.push('Tu compromiso familiar se beneficia de análisis preventivos');
  }

  return {
    recommendedPackage,
    scores,
    confidence: Math.round(confidence),
    reasons
  };
}

export const PACKAGE_DESCRIPTIONS = {
  essential: {
    title: 'Essential',
    subtitle: 'Perfecto para comenzar',
    description: 'Ideal para personas que buscan un monitoreo básico de salud con los biomarcadores más importantes.',
    benefits: [
      'Análisis de biomarcadores fundamentales',
      'Perfecto para principiantes',
      'Excelente relación calidad-precio',
      'Base sólida para el seguimiento de salud'
    ]
  },
  performance: {
    title: 'Performance',
    subtitle: 'Optimiza tu rendimiento',
    description: 'Diseñado para atletas y personas activas que buscan optimizar su rendimiento físico.',
    benefits: [
      'Biomarcadores específicos para deportistas',
      'Análisis de recuperación y rendimiento',
      'Optimización nutricional',
      'Seguimiento de adaptaciones al entrenamiento'
    ]
  },
  core: {
    title: 'Core',
    subtitle: 'Análisis integral',
    description: 'Perfecto para centros de longevidad y personas que buscan un análisis completo de salud.',
    benefits: [
      'Análisis completo de sistemas corporales',
      'Detección temprana de riesgos',
      'Enfoque en prevención',
      'Ideal para seguimiento a largo plazo'
    ]
  },
  advanced: {
    title: 'Advanced',
    subtitle: 'Lo más completo',
    description: 'El análisis más exhaustivo disponible, ideal para quienes buscan la máxima información sobre su salud.',
    benefits: [
      'Análisis más completo disponible',
      'Biomarcadores avanzados de longevidad',
      'Análisis genético y epigenético',
      'Personalización máxima'
    ]
  }
}; 