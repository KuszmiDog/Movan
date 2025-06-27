import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DatosVehiculo {
  marca: string;
  modelo: string;
  año: string;
  placa: string;
  tipoCarga: string;
  capacidadToneladas: string;
  dimensiones: {
    largo: string;
    ancho: string;
    alto: string;
  };
}

export interface DatosLicencia {
  numeroLicencia: string;
  tipoLicencia: string;
  fechaVencimiento: string;
  fechaEmision: string;
  autoridad: string;
  restricciones: string;
  fotoLicencia?: string;
}

export interface PerfilTransportista {
  userId: string;
  datosVehiculo?: DatosVehiculo;
  datosLicencia?: DatosLicencia;
  fechaCreacion: string;
  completado: boolean;
}

const TRANSPORTISTAS_KEY = '@movan_transportistas';

export class TransportistaService {
  // Obtener el perfil de transportista por ID de usuario
  static async getPerfilTransportista(userId: string): Promise<PerfilTransportista | null> {
    try {
      const transportistas = await this.getTodosLosTransportistas();
      return transportistas.find(t => t.userId === userId) || null;
    } catch (error) {
      console.error('Error obteniendo perfil de transportista:', error);
      return null;
    }
  }

  // Obtener todos los transportistas
  static async getTodosLosTransportistas(): Promise<PerfilTransportista[]> {
    try {
      const data = await AsyncStorage.getItem(TRANSPORTISTAS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error obteniendo transportistas:', error);
      return [];
    }
  }

  // Crear o actualizar perfil de transportista
  static async actualizarPerfil(userId: string, datos: Partial<PerfilTransportista>): Promise<{ success: boolean; message: string }> {
    try {
      const transportistas = await this.getTodosLosTransportistas();
      const indice = transportistas.findIndex(t => t.userId === userId);

      if (indice >= 0) {
        // Actualizar perfil existente
        transportistas[indice] = {
          ...transportistas[indice],
          ...datos,
        };
      } else {
        // Crear nuevo perfil
        const nuevoPerfil: PerfilTransportista = {
          userId,
          fechaCreacion: new Date().toISOString(),
          completado: false,
          ...datos,
        };
        transportistas.push(nuevoPerfil);
      }

      await AsyncStorage.setItem(TRANSPORTISTAS_KEY, JSON.stringify(transportistas));
      return { success: true, message: 'Perfil actualizado correctamente' };

    } catch (error) {
      console.error('Error actualizando perfil de transportista:', error);
      return { success: false, message: 'Error al actualizar el perfil' };
    }
  }

  // Guardar datos del vehículo
  static async guardarDatosVehiculo(userId: string, datosVehiculo: DatosVehiculo): Promise<{ success: boolean; message: string }> {
    try {
      const resultado = await this.actualizarPerfil(userId, { datosVehiculo });
      return resultado;
    } catch (error) {
      console.error('Error guardando datos del vehículo:', error);
      return { success: false, message: 'Error al guardar los datos del vehículo' };
    }
  }

  // Guardar datos de la licencia
  static async guardarDatosLicencia(userId: string, datosLicencia: DatosLicencia): Promise<{ success: boolean; message: string }> {
    try {
      // Marcar el perfil como completado cuando se guardan los datos de licencia
      const resultado = await this.actualizarPerfil(userId, { 
        datosLicencia,
        completado: true 
      });
      return resultado;
    } catch (error) {
      console.error('Error guardando datos de licencia:', error);
      return { success: false, message: 'Error al guardar los datos de licencia' };
    }
  }

  // Verificar si el perfil está completo
  static async esPerfilCompleto(userId: string): Promise<boolean> {
    try {
      const perfil = await this.getPerfilTransportista(userId);
      return perfil?.completado === true && 
             perfil.datosVehiculo !== undefined && 
             perfil.datosLicencia !== undefined;
    } catch (error) {
      console.error('Error verificando perfil completo:', error);
      return false;
    }
  }

  // Eliminar perfil de transportista
  static async eliminarPerfil(userId: string): Promise<{ success: boolean; message: string }> {
    try {
      const transportistas = await this.getTodosLosTransportistas();
      const transportistasFiltrados = transportistas.filter(t => t.userId !== userId);
      
      await AsyncStorage.setItem(TRANSPORTISTAS_KEY, JSON.stringify(transportistasFiltrados));
      return { success: true, message: 'Perfil eliminado correctamente' };

    } catch (error) {
      console.error('Error eliminando perfil de transportista:', error);
      return { success: false, message: 'Error al eliminar el perfil' };
    }
  }

  // Obtener estadísticas básicas
  static async obtenerEstadisticas(): Promise<{
    totalTransportistas: number;
    perfilesCompletos: number;
    perfilesIncompletos: number;
  }> {
    try {
      const transportistas = await this.getTodosLosTransportistas();
      const completos = transportistas.filter(t => t.completado).length;
      
      return {
        totalTransportistas: transportistas.length,
        perfilesCompletos: completos,
        perfilesIncompletos: transportistas.length - completos,
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return {
        totalTransportistas: 0,
        perfilesCompletos: 0,
        perfilesIncompletos: 0,
      };
    }
  }

  // Limpiar todos los datos (para desarrollo)
  static async limpiarTodosLosDatos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TRANSPORTISTAS_KEY);
    } catch (error) {
      console.error('Error limpiando datos de transportistas:', error);
    }
  }
}
