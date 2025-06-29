import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pedido } from '@/src/components/UserPosts/SimulatedPosts';

interface PedidoContextType {
  pedidoActivo: Pedido | null;
  destinoNavegacion: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  setPedidoActivo: (pedido: Pedido | null) => void;
  setDestinoNavegacion: (destino: { latitude: number; longitude: number; address: string } | null) => void;
  limpiarNavegacion: () => void;
  cancelarPedido: () => void;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export const usePedido = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedido must be used within a PedidoProvider');
  }
  return context;
};

interface PedidoProviderProps {
  children: ReactNode;
}

export const PedidoProvider: React.FC<PedidoProviderProps> = ({ children }) => {
  const [pedidoActivo, setPedidoActivo] = useState<Pedido | null>(null);
  const [destinoNavegacion, setDestinoNavegacion] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  const limpiarNavegacion = () => {
    setDestinoNavegacion(null);
  };

  const cancelarPedido = () => {
    setPedidoActivo(null);
    setDestinoNavegacion(null);
  };

  const value = {
    pedidoActivo,
    destinoNavegacion,
    setPedidoActivo,
    setDestinoNavegacion,
    limpiarNavegacion,
    cancelarPedido,
  };

  return (
    <PedidoContext.Provider value={value}>
      {children}
    </PedidoContext.Provider>
  );
};
