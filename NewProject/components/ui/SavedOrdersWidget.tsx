/**
 * SAVED ORDERS WIDGET
 * Widget compacto para acceso rápido a pedidos guardados
 */

'use client';

import { useOrdersStore } from '@/lib/store/useOrdersStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SavedOrdersWidgetProps {
  variant?: 'compact' | 'expanded' | 'floating';
  showTitle?: boolean;
  maxItems?: number;
}

export function SavedOrdersWidget({ 
  variant = 'compact', 
  showTitle = true, 
  maxItems = 3 
}: SavedOrdersWidgetProps) {
  const router = useRouter();
  const { orders } = useOrdersStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const getPackageIcon = (packageId: string) => {
    switch (packageId) {
      case 'essential': return '📊';
      case 'performance': return '⚡';
      case 'core': return '🎯';
      case 'advanced': return '🔬';
      default: return '📋';
    }
  };

  const savedOrders = orders.filter(order => order.status === 'saved');
  const recentOrders = savedOrders.slice(0, maxItems);

  if (savedOrders.length === 0) {
    return null;
  }

  // Variant floating - botón flotante
  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {savedOrders.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {savedOrders.length}
              </div>
            )}
          </button>

          {isExpanded && (
            <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-slide-in-right">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Pedidos Guardados</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2 mb-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getPackageIcon(order.package.id)}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.package.name}</div>
                        <div className="text-xs text-gray-500">{formatDate(order.createdAt)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        {formatPrice(order.totals.price)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.totals.biomarkers} tests
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => {
                  setIsExpanded(false);
                  router.push('/pedidos');
                }}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Ver todos los pedidos
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Variant compact - para usar en secciones
  if (variant === 'compact') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        {showTitle && (
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-blue-900">
              Tienes {savedOrders.length} configuración{savedOrders.length !== 1 ? 'es' : ''} guardada{savedOrders.length !== 1 ? 's' : ''}
            </h3>
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}
        
        <div className="space-y-2 mb-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span>{getPackageIcon(order.package.id)}</span>
                <span className="font-medium text-blue-900">{order.package.name}</span>
                <span className="text-blue-600">({order.totals.biomarkers} tests)</span>
              </div>
              <span className="font-medium text-blue-900">
                {formatPrice(order.totals.price)}
              </span>
            </div>
          ))}
          {savedOrders.length > maxItems && (
            <div className="text-xs text-blue-600">
              +{savedOrders.length - maxItems} más...
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/pedidos')}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Ver todos
          </button>
          <button
            onClick={() => router.push('/configurador')}
            className="flex-1 bg-white text-blue-600 border border-blue-300 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // Variant expanded - para página principal
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Configuraciones Guardadas</h3>
            <p className="text-sm text-gray-600">Continúa donde lo dejaste</p>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
          {savedOrders.length}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        {recentOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{getPackageIcon(order.package.id)}</div>
              <div>
                <div className="font-medium text-gray-900">{order.package.name}</div>
                <div className="text-sm text-gray-600">
                  {order.totals.biomarkers} biomarcadores • {formatDate(order.createdAt)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">
                {formatPrice(order.totals.price)}
              </div>
              <button
                onClick={() => router.push('/configurador')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Continuar →
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={() => router.push('/pedidos')}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Ver todos los pedidos
        </button>
        <button
          onClick={() => router.push('/configurador')}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Nueva configuración
        </button>
      </div>
    </div>
  );
} 