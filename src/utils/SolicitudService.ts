import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pedido } from '@/src/components/UserPosts/SimulatedPosts';

export interface SolicitudEnvio {
  id: string;
  clienteId: string; // ID del usuario que crea la solicitud
  cliente: {
    nombre: string;
    telefono: string;
    calificacion: number;
  };
  origen: {
    direccion: string;
    coordenadas: { lat: number; lng: number };
  };
  destino: {
    direccion: string;
    coordenadas: { lat: number; lng: number };
  };
  carga: {
    tipo: string;
    peso: number;
    descripcion: string;
  };
  precio: number;
  imagen?: string; // URI de la imagen de la carga
  distancia: number;
  tiempoEstimado: number;
  fechaRequerida: Date;
  fechaCreacion: Date;
  estado: 'disponible' | 'asignado' | 'en_curso' | 'completado';
  prioridad: 'normal' | 'urgente';
  cancelado?: boolean; // Campo adicional para marcar solicitudes canceladas
  transportistaAsignado?: string; // ID del transportista que acepta el pedido
}

const SOLICITUDES_KEY = '@movan_solicitudes';

export class SolicitudService {
  
  // Obtener todas las solicitudes
  static async getSolicitudes(): Promise<SolicitudEnvio[]> {
    try {
      const data = await AsyncStorage.getItem(SOLICITUDES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error obteniendo solicitudes:', error);
      return [];
    }
  }

  // Crear una nueva solicitud
  static async crearSolicitud(solicitud: Omit<SolicitudEnvio, 'id' | 'fechaCreacion' | 'estado'>): Promise<{ success: boolean; message: string; solicitud?: SolicitudEnvio }> {
    try {
      const solicitudes = await this.getSolicitudes();
      
      const nuevaSolicitud: SolicitudEnvio = {
        ...solicitud,
        id: Date.now().toString(),
        fechaCreacion: new Date(),
        estado: 'disponible'
      };

      solicitudes.push(nuevaSolicitud);
      await AsyncStorage.setItem(SOLICITUDES_KEY, JSON.stringify(solicitudes));

      console.log('✅ Solicitud creada:', nuevaSolicitud.id);

      return {
        success: true,
        message: 'Solicitud creada exitosamente',
        solicitud: nuevaSolicitud
      };
    } catch (error) {
      console.error('Error creando solicitud:', error);
      return {
        success: false,
        message: 'Error al crear la solicitud'
      };
    }
  }

  // Obtener solicitudes por cliente
  static async getSolicitudesPorCliente(clienteId: string): Promise<SolicitudEnvio[]> {
    try {
      const solicitudes = await this.getSolicitudes();
      return solicitudes.filter(s => s.clienteId === clienteId);
    } catch (error) {
      console.error('Error obteniendo solicitudes del cliente:', error);
      return [];
    }
  }

  // Obtener solicitudes disponibles (para transportistas)
  static async getSolicitudesDisponibles(): Promise<SolicitudEnvio[]> {
    try {
      const solicitudes = await this.getSolicitudes();
      console.log('🔍 Total de solicitudes en storage:', solicitudes.length);
      
      const disponibles = solicitudes.filter(s => s.estado === 'disponible' && !s.cancelado);
      console.log('✅ Solicitudes disponibles para transportistas:', disponibles.length);
      
      return disponibles;
    } catch (error) {
      console.error('Error obteniendo solicitudes disponibles:', error);
      return [];
    }
  }

  // Convertir SolicitudEnvio a Pedido (para compatibilidad con el código existente)
  static convertirSolicitudAPedido(solicitud: SolicitudEnvio): Pedido {
    // Para solicitudes sin imagen, usamos null y dejamos que el componente UI maneje la imagen por defecto
    const imagen = solicitud.imagen ? { uri: solicitud.imagen } : null;

    return {
      id: solicitud.id,
      cliente: solicitud.cliente,
      origen: solicitud.origen,
      destino: solicitud.destino,
      carga: solicitud.carga,
      precio: solicitud.precio,
      imagen: imagen as any, // El componente UI debe manejar el caso cuando es null
      distancia: solicitud.distancia,
      tiempoEstimado: solicitud.tiempoEstimado,
      fechaRequerida: solicitud.fechaRequerida,
      estado: solicitud.estado,
      prioridad: solicitud.prioridad
    };
  }

  // Obtener todas las solicitudes como pedidos (para transportistas)
  static async getSolicitudesComoPedidos(): Promise<Pedido[]> {
    try {
      const solicitudes = await this.getSolicitudesDisponibles();
      console.log('🔄 Convirtiendo solicitudes a pedidos:', solicitudes.length);
      
      const pedidos = solicitudes.map(this.convertirSolicitudAPedido);
      console.log('📦 Pedidos convertidos:', pedidos.length);
      
      return pedidos;
    } catch (error) {
      console.error('Error obteniendo solicitudes como pedidos:', error);
      return [];
    }
  }

  // Asignar solicitud a transportista
  static async asignarSolicitud(solicitudId: string, transportistaId: string): Promise<{ success: boolean; message: string }> {
    try {
      const solicitudes = await this.getSolicitudes();
      const indice = solicitudes.findIndex(s => s.id === solicitudId);

      if (indice === -1) {
        return { success: false, message: 'Solicitud no encontrada' };
      }

      if (solicitudes[indice].estado !== 'disponible') {
        return { success: false, message: 'La solicitud ya no está disponible' };
      }

      solicitudes[indice].estado = 'asignado';
      solicitudes[indice].transportistaAsignado = transportistaId;

      await AsyncStorage.setItem(SOLICITUDES_KEY, JSON.stringify(solicitudes));

      return { success: true, message: 'Solicitud asignada exitosamente' };
    } catch (error) {
      console.error('Error asignando solicitud:', error);
      return { success: false, message: 'Error al asignar la solicitud' };
    }
  }

  // Limpiar todas las solicitudes (para desarrollo)
  static async limpiarSolicitudes(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SOLICITUDES_KEY);
      console.log('🧹 Solicitudes limpiadas');
    } catch (error) {
      console.error('Error limpiando solicitudes:', error);
    }
  }
}
