/**
 * UTILITY FUNCTIONS
 * Funciones de utilidad para el proyecto de longevidad
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases de CSS de forma inteligente
 * Utiliza clsx para condicionales y tailwind-merge para evitar conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 