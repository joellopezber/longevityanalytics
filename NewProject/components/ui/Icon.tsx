/**
 * ICON COMPONENT SYSTEM
 * Sistema unificado de iconos SVG para la plataforma de longevidad
 * Centraliza todos los iconos y estandariza tamaños, colores y propiedades
 */

import React from 'react';
import { cn } from '@/lib/utils';

export type IconName = 
  | 'check'
  | 'close'
  | 'loading'
  | 'fire'
  | 'lightning'
  | 'brain'
  | 'heart'
  | 'shield'
  | 'star'
  | 'arrow-right'
  | 'arrow-down'
  | 'document'
  | 'chart-bar'
  | 'user'
  | 'target'
  | 'flask'
  | 'dna'
  | 'pulse'
  | 'medal';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: IconName;
  size?: IconSize;
  className?: string;
}

const ICON_SIZES: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4', 
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  xxl: 'w-16 h-16'
};

const ICON_PATHS: Record<IconName, { path: string; viewBox?: string; fill?: boolean }> = {
  check: {
    path: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
    viewBox: '0 0 20 20'
  },
  close: {
    path: 'M6 18L18 6M6 6l12 12',
    fill: false
  },
  loading: {
    path: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
  },
  fire: {
    path: 'M12.0495 6.38704L8.05493 10.4523C7.59552 10.9193 7.59552 11.6807 8.05493 12.1477C8.51434 12.6147 9.26566 12.6147 9.72507 12.1477L13.7196 8.08237C14.1791 7.61538 14.1791 6.85383 13.7196 6.38704C13.2602 5.92004 12.509 5.92004 12.0495 6.38704Z M18.364 14.364L12 8L5.636 14.364C4.22183 15.7782 4.22183 18.2218 5.636 19.636C7.05017 21.0502 9.49383 21.0502 10.908 19.636L12 18.544L13.092 19.636C14.5062 21.0502 16.9498 21.0502 18.364 19.636C19.7782 18.2218 19.7782 15.7782 18.364 14.364Z'
  },
  lightning: {
    path: 'M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z'
  },
  brain: {
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
  },
  heart: {
    path: 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'
  },
  shield: {
    path: 'M9.5 14.25l-5.584 2.718 1.84 3.837C7.234 20.405 9.53 20 12 20c2.47 0 4.766.405 6.244.805l1.84-3.837L14.5 14.25c-1.17.33-2.328.33-3.5 0zM12 14.5c1.438 0 2.562.5 2.562.5L16 13.5c0-1.5-1.79-2.5-4-2.5s-4 1-4 2.5L9.438 15S10.562 14.5 12 14.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z'
  },
  star: {
    path: 'M12 1L9 9l-8 3 8 3 3 8 3-8 8-3-8-3-3-8z'
  },
  'arrow-right': {
    path: 'M9 18l6-6-6-6',
    fill: false
  },
  'arrow-down': {
    path: 'M19 14l-7 7m0 0l-7-7m7 7V3',
    fill: false
  },
  document: {
    path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    fill: false
  },
  'chart-bar': {
    path: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    fill: false
  },
  user: {
    path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    fill: false
  },
  target: {
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z'
  },
  flask: {
    path: 'M9 2h6v3h3l-4 14H8L4 5h3V2zm3 6l-2 6h4l-2-6z'
  },
  dna: {
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
  },
  pulse: {
    path: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z'
  },
  medal: {
    path: 'M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-12L7 8h10l-5-6zm0 3.5L9.5 7h5L12 5.5z'
  }
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 'md', className, ...props }, ref) => {
    const iconData = ICON_PATHS[name];
    if (!iconData) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }

    const { path, viewBox = '0 0 24 24', fill = true } = iconData;
    const sizeClass = ICON_SIZES[size];

    return (
      <svg
        ref={ref}
        className={cn(sizeClass, className)}
        fill={fill ? 'currentColor' : 'none'}
        stroke={fill ? 'none' : 'currentColor'}
        strokeWidth={fill ? 0 : 2}
        strokeLinecap={fill ? 'butt' : 'round'}
        strokeLinejoin={fill ? 'miter' : 'round'}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d={path} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export default Icon; 