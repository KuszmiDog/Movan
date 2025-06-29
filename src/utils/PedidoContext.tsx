import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pedido } from '@/src/components/UserPosts/SimulatedPosts';

export type EstadoPedido = 'recogiendo' | 'recogido' | 'entregando' | 'entregado';

interface PedidoContextType {
  pedidoActivo: Pedido | null;
  estadoPedido: EstadoPedido | null;
  destinoNavegacion: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  setPedidoActivo: (pedido: Pedido | null) => void;
  setEstadoPedido: (estado: EstadoPedido | null) => void;
  setDestinoNavegacion: (destino: { latitude: number; longitude: number; address: string } | null) => void;
  limpiarNavegacion: () => void;
  cancelarPedido: () => void;
  confirmarRecogida: () => void;
  completarEntrega: () => void;
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
  const [estadoPedido, setEstadoPedido] = useState<EstadoPedido | null>(null);
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
    setEstadoPedido(null);
    setDestinoNavegacion(null);
  };

  const confirmarRecogida = () => {
    if (pedidoActivo) {
      setEstadoPedido('recogido');
      // Cambiar destino de navegación al punto de entrega
      setDestinoNavegacion({
        latitude: pedidoActivo.destino.coordenadas.lat,
        longitude: pedidoActivo.destino.coordenadas.lng,
        address: pedidoActivo.destino.direccion
      });
    }
  };

  const completarEntrega = () => {
    setEstadoPedido('entregado');
    setPedidoActivo(null);
    setDestinoNavegacion(null);
  };

  const value = {
    pedidoActivo,
    estadoPedido,
    destinoNavegacion,
    setPedidoActivo,
    setEstadoPedido,
    setDestinoNavegacion,
    limpiarNavegacion,
    cancelarPedido,
    confirmarRecogida,
    completarEntrega,
  };

  return (
    <PedidoContext.Provider value={value}>
      {children}
    </PedidoContext.Provider>
  );
};
