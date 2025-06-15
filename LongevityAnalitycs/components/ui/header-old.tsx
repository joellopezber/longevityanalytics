/**
 * HEADER COMPONENT
 * Header principal para la landing page de longevidad
 */

import Link from 'next/link'
import { Button } from './Button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Longevity Analytics
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/paquetes" 
              className="text-gray-600 hover:text-[#2D5A3D] transition-colors font-medium"
            >
              Paquetes
            </Link>
            <Link 
              href="/configurador" 
              className="text-gray-600 hover:text-[#2D5A3D] transition-colors font-medium"
            >
              Configurador
            </Link>
            <Link 
              href="/proceso" 
              className="text-gray-600 hover:text-[#2D5A3D] transition-colors font-medium"
            >
              Proceso
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-[#2D5A3D] transition-colors font-medium"
            >
              Nosotros
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button variant="longevity" size="md">
              Selecionar Análisis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
