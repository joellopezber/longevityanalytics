/**
 * SUCCESS NOTIFICATION
 * Componente para mostrar notificaciones de éxito
 */

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOrdersStore } from '@/lib/store/useOrdersStore';

export function SuccessNotification() {
  const searchParams = useSearchParams();
  const [showNotification, setShowNotification] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  const { getOrderById } = useOrdersStore();

  useEffect(() => {
    const success = searchParams.get('success');
    const orderId = searchParams.get('order');
    
    if (success === 'true' && orderId) {
      const order = getOrderById(orderId);
      if (order) {
        setOrderDetails(order);
        setShowNotification(true);
        
        // Auto-hide después de 8 segundos
        const timer = setTimeout(() => {
          setShowNotification(false);
        }, 8000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams, getOrderById]);

  if (!showNotification || !orderDetails) return null;

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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-6 animate-slide-in-right">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-green-800">
              ¡Pedido guardado exitosamente!
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p className="font-medium">
                {orderDetails.package.name} - {formatPrice(orderDetails.totals.price)}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {orderDetails.totals.biomarkers} biomarcadores • {formatDate(orderDetails.createdAt)}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Tu configuración ha sido guardada. Puedes continuar el proceso más tarde desde tu perfil.
              </p>
            </div>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => setShowNotification(false)}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 