/**
 * HEADER COMPONENT
 * Header principal para la landing page de longevidad
 */

'use client';

import Link from 'next/link';
import { useOrdersStore } from '@/lib/store/useOrdersStore';

export default function Header() {
  const { orders } = useOrdersStore();
  const savedOrdersCount = orders.filter(order => order.status === 'saved').length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-700 to-green-600 rounded-lg flex items-center justify-center">
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
              className="text-gray-600 hover:text-green-700 transition-colors font-medium"
            >
              Paquetes
            </Link>
            <Link 
              href="/configurador" 
              className="text-gray-600 hover:text-green-700 transition-colors font-medium"
            >
              Configurador
            </Link>
            <Link 
              href="/pedidos" 
              className="text-gray-600 hover:text-green-700 transition-colors font-medium relative"
            >
              Mis Pedidos
              {savedOrdersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {savedOrdersCount}
                </span>
              )}
            </Link>
            <Link 
              href="/proceso" 
              className="text-gray-600 hover:text-green-700 transition-colors font-medium"
            >
              Proceso
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/configurador"
              className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-800 hover:to-green-700 transition-all inline-block"
            >
              Empezar Análisis
            </Link>
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
