/**
 * SAVED ORDERS PAGE
 * Página para mostrar los pedidos guardados del usuario
 */

'use client';

import { useOrdersStore } from '@/lib/store/useOrdersStore';
import { useConfiguratorStore } from '@/lib/store/useConfiguratorStore';
import { useRouter } from 'next/navigation';

export default function SavedOrdersPage() {
  const router = useRouter();
  const { orders, deleteOrder, updateOrderStatus } = useOrdersStore();
  const { setProfile, setGender, selectedAddOns, reset } = useConfiguratorStore();

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

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'male': return 'Hombre';
      case 'female': return 'Mujer';
      default: return 'No seleccionado';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'saved': return 'Guardado';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'saved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const getAddOnIcon = (addonId: string) => {
    switch (addonId) {
      case 'hormonas': return '🧬';
      case 'cardiovascular': return '❤️';
      case 'immunity': return '🛡️';
      case 'cancer': return '🔍';
      case 'genome': return '🧪';
      case 'bioage': return '⏳';
      case 'metals': return '⚗️';
      case 'digestion': return '🍃';
      case 'antioxidantes': return '🌿';
      case 'inflammation': return '🔥';
      case 'iv_nutrients': return '💊';
      case 'coagulation': return '🩸';
      case 'bone_mineral': return '🦴';
      case 'gut_gate': return '🦠';
      case 'endocrino': return '⚖️';
      case 'oxidative_cell': return '⚛️';
      default: return '📋';
    }
  };

  const handleContinueOrder = (order: any) => {
    // Cargar la configuración en el store
    reset();
    setProfile(order.package);
    setGender(order.gender);
    
    // Cargar add-ons (esto requeriría más lógica para restaurar completamente)
    // Por simplicidad, redirigimos al configurador
    router.push('/configurador');
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
      deleteOrder(orderId);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Mis Pedidos Guardados
            </h1>
            
            <div className="bg-white rounded-lg shadow-sm p-12">
              <div className="text-6xl mb-4">📋</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No tienes pedidos guardados
              </h2>
              <p className="text-gray-600 mb-6">
                Cuando configures un análisis y lo guardes, aparecerá aquí para que puedas continuar más tarde.
              </p>
              <button
                onClick={() => router.push('/configurador')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Configurar mi primer análisis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis Pedidos Guardados
          </h1>
          <p className="text-gray-600">
            Gestiona tus configuraciones de análisis guardadas
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">📋</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Configuración de Análisis
                    </h3>
                    <p className="text-sm text-gray-600">
                      Pedido #{order.id.slice(-8)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
              </div>

              {/* Paquete Base Destacado */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <div className="text-lg">{getPackageIcon(order.package.id)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Paquete base seleccionado</div>
                      <div className="font-semibold text-gray-900">{order.package.name}</div>
                      <div className="text-xs text-gray-600">{order.package.title}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Configurado para</div>
                    <div className="font-medium text-blue-600">{getGenderLabel(order.gender)}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Biomarcadores totales</div>
                  <div className="font-medium">{order.totals.biomarkers}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Add-ons incluidos</div>
                  <div className="font-medium">{order.addOns.length}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Precio total</div>
                  <div className="font-medium text-green-600">{formatPrice(order.totals.price)}</div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                Guardado el {formatDate(order.createdAt)}
              </div>

              {order.addOns.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Add-ons incluidos:</div>
                  <div className="flex flex-wrap gap-2">
                    {order.addOns.map((addon) => (
                      <span key={addon.id} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        <span className="mr-1">{getAddOnIcon(addon.id)}</span>
                        {addon.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="px-4 py-2 text-red-600 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/configurador')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Configurar nuevo análisis
          </button>
        </div>
      </div>
    </div>
  );
} 