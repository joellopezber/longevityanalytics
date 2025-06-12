/**
 * ORDERS STORE
 * Estado global para gestionar pedidos guardados usando Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SimplePackage } from '@/lib/data/packages-simple';
import type { SimpleAddOn } from '@/lib/data/addons-simple';
import type { Gender } from './useConfiguratorStore';

export interface SavedOrder {
  id: string;
  createdAt: Date;
  package: SimplePackage;
  gender: Gender;
  addOns: SimpleAddOn[];
  totals: {
    biomarkers: number;
    price: number;
    pvp: number;
    savings: number;
  };
  status: 'saved' | 'completed' | 'cancelled';
}

export interface OrdersState {
  orders: SavedOrder[];
  
  // Acciones
  saveOrder: (orderData: Omit<SavedOrder, 'id' | 'createdAt' | 'status'>) => string;
  getOrders: () => SavedOrder[];
  getOrderById: (id: string) => SavedOrder | undefined;
  updateOrderStatus: (id: string, status: SavedOrder['status']) => void;
  deleteOrder: (id: string) => void;
  clearAllOrders: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      saveOrder: (orderData) => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const newOrder: SavedOrder = {
          id: orderId,
          createdAt: new Date(),
          status: 'saved',
          ...orderData
        };

        set(state => ({
          orders: [...state.orders, newOrder]
        }));

        return orderId;
      },

      getOrders: () => {
        return get().orders.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },

      getOrderById: (id: string) => {
        return get().orders.find(order => order.id === id);
      },

      updateOrderStatus: (id: string, status: SavedOrder['status']) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === id ? { ...order, status } : order
          )
        }));
      },

      deleteOrder: (id: string) => {
        set(state => ({
          orders: state.orders.filter(order => order.id !== id)
        }));
      },

      clearAllOrders: () => {
        set({ orders: [] });
      }
    }),
    {
      name: 'longevity-orders',
      partialize: (state) => ({
        orders: state.orders.map(order => ({
          ...order,
          createdAt: order.createdAt.toISOString()
        }))
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.orders) {
          state.orders = state.orders.map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt)
          }));
        }
      }
    }
  )
); 