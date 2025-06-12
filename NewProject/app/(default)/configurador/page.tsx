/**
 * CONFIGURADOR PAGE
 * Página principal del configurador de paquetes
 */

import PackageConfigurator from '@/components/configurator/PackageConfigurator';

export const metadata = {
  title: 'Configurador Inteligente - Longevity Analytics',
  description: 'Crea tu análisis personalizado de longevidad en 4 sencillos pasos. Configurador inteligente con datos reales y precios dinámicos.',
};

export default function ConfiguradorPage() {
  return <PackageConfigurator />;
} 