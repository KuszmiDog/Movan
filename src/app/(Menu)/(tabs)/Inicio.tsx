
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Alert, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useAuth } from '../../../utils/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pedido } from '@/src/components/UserPosts/SimulatedPosts';
import { pedidosSimulados } from '@/src/components/UserPosts/SimulatedPosts';

type EstadoCamionero = 'disponible' | 'ocupado' | 'fuera_servicio';

const MovanMenu = () => {
  const { user } = useAuth();
  const [estadoCamionero, setEstadoCamionero] = useState<EstadoCamionero>('disponible');
  const [pedidosDisponibles, setPedidosDisponibles] = useState<Pedido[]>([]);
  const [pedidoActivo, setPedidoActivo] = useState<Pedido | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Manejar el botón atrás para mostrar alerta de cerrar app
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Salir de la aplicación',
        '¿Estás seguro de que quieres cerrar la aplicación?',
        [
          {
            text: 'Cancelar',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Salir',
            onPress: () => BackHandler.exitApp(),
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // Cargar pedidos disponibles (simulación)
  const cargarPedidosDisponibles = async () => {
    setPedidosDisponibles(pedidosSimulados.filter(pedido => pedido.estado === 'disponible'));
  };

  useEffect(() => {
    cargarPedidosDisponibles();
  }, []);

  // Estadísticas del camionero
  const stats = {
    enviosCompletados: 47,
    enviosHoy: 3,
    calificacionPromedio: 4.8,
    gananciasHoy: '$2,400',
    gananciasSemana: '$15,400'
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarPedidosDisponibles();
    setRefreshing(false);
  };

  const cambiarEstado = () => {
    const estados: EstadoCamionero[] = ['disponible', 'ocupado', 'fuera_servicio'];
    const estadosTexto = ['Disponible', 'Ocupado', 'Fuera de Servicio'];
    
    Alert.alert(
      'Cambiar Estado',
      'Selecciona tu estado actual:',
      estados.map((estado, index) => ({
        text: estadosTexto[index],
        onPress: () => setEstadoCamionero(estado)
      }))
    );
  };

  const aceptarPedido = (pedido: Pedido) => {
    Alert.alert(
      'Aceptar Pedido',
      `¿Confirmas que quieres aceptar el pedido de ${pedido.cliente.nombre}?\n\nPago: $${pedido.precio}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: () => {
            setPedidoActivo(pedido);
            setEstadoCamionero('ocupado');
            setPedidosDisponibles(prev => prev.filter(p => p.id !== pedido.id));
            Alert.alert('¡Pedido Aceptado!', 'El cliente ha sido notificado. Ve a la sección de navegación para iniciar el viaje.');
          }
        }
      ]
    );
  };

  const getEstadoColor = () => {
    switch (estadoCamionero) {
      case 'disponible': return '#4CAF50';
      case 'ocupado': return '#FF9800';
      case 'fuera_servicio': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getEstadoTexto = () => {
    switch (estadoCamionero) {
      case 'disponible': return 'Disponible';
      case 'ocupado': return 'Ocupado';
      case 'fuera_servicio': return 'Fuera de Servicio';
      default: return 'Desconocido';
    }
  };

  const renderPedidoCard = (pedido: Pedido) => (
    <View key={pedido.id} style={styles.pedidoCard}>
      <View style={styles.pedidoHeader}>
        <View style={styles.clienteInfo}>
          <Text style={styles.clienteNombre}>{pedido.cliente.nombre}</Text>
          <View style={styles.calificacionContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <Text style={styles.calificacion}>{pedido.cliente.calificacion}</Text>
          </View>
        </View>
        {pedido.prioridad === 'urgente' && (
          <View style={styles.urgenteBadge}>
            <Text style={styles.urgenteText}>URGENTE</Text>
          </View>
        )}
      </View>
      
      <View style={styles.rutaContainer}>
        <View style={styles.rutaPunto}>
          <MaterialCommunityIcons name="map-marker" size={20} color="#4CAF50" />
          <Text style={styles.direccion}>{pedido.origen.direccion}</Text>
        </View>
        <MaterialCommunityIcons name="arrow-down" size={20} color="#666" />
        <View style={styles.rutaPunto}>
          <MaterialCommunityIcons name="map-marker-check" size={20} color="#F44336" />
          <Text style={styles.direccion}>{pedido.destino.direccion}</Text>
        </View>
      </View>

      <View style={styles.detallesContainer}>
        <View style={styles.detalle}>
          <MaterialCommunityIcons name="package-variant" size={18} color="#666" />
          <Text style={styles.detalleTexto}>{pedido.carga.tipo} ({pedido.carga.peso}kg)</Text>
        </View>
        <View style={styles.detalle}>
          <MaterialCommunityIcons name="map" size={18} color="#666" />
          <Text style={styles.detalleTexto}>{pedido.distancia}km • {Math.round(pedido.tiempoEstimado/60)}h</Text>
        </View>
      </View>

      <View style={styles.pedidoFooter}>
        <Text style={styles.precio}>${pedido.precio}</Text>
        <TouchableOpacity 
          style={styles.aceptarButton}
          onPress={() => aceptarPedido(pedido)}
        >
          <Text style={styles.aceptarButtonText}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header con saludo personalizado */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            ¡Hola, {user?.name || user?.email?.split('@')[0] || 'Transportista'}!
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              day: 'numeric',
              month: 'long'
            })}
          </Text>
        </View>

        {/* Estado del camionero */}
        <TouchableOpacity style={styles.estadoContainer} onPress={cambiarEstado}>
          <View style={[styles.estadoIndicador, { backgroundColor: getEstadoColor() }]} />
          <Text style={styles.estadoTexto}>{getEstadoTexto()}</Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color="white" />
        </TouchableOpacity>

        {/* Estadísticas del día */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="truck-delivery" size={28} color="white" />
            <Text style={styles.statNumber}>{stats.enviosHoy}</Text>
            <Text style={styles.statLabel}>Envíos Hoy</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="cash" size={28} color="white" />
            <Text style={styles.statNumber}>{stats.gananciasHoy}</Text>
            <Text style={styles.statLabel}>Ganancia Hoy</Text>
          </View>
        </View>

        {/* Pedido activo si existe */}
        {pedidoActivo && (
          <View style={styles.pedidoActivoContainer}>
            <Text style={styles.sectionTitle}>🚛 Pedido Activo</Text>
            <View style={styles.pedidoActivoCard}>
              <Text style={styles.clienteNombre}>{pedidoActivo.cliente.nombre}</Text>
              <Text style={styles.direccion}>Destino: {pedidoActivo.destino.direccion}</Text>
              <TouchableOpacity style={styles.navegarButton}>
                <MaterialCommunityIcons name="navigation" size={20} color="white" />
                <Text style={styles.navegarButtonText}>Navegar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Pedidos disponibles */}
        {estadoCamionero === 'disponible' && !pedidoActivo && (
          <View style={styles.pedidosContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📦 Pedidos Disponibles</Text>
              <TouchableOpacity onPress={onRefresh}>
                <MaterialCommunityIcons name="refresh" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            {pedidosDisponibles.length > 0 ? (
              pedidosDisponibles.map(renderPedidoCard)
            ) : (
              <View style={styles.noPedidosContainer}>
                <MaterialCommunityIcons name="truck-outline" size={60} color="#666" />
                <Text style={styles.noPedidosTexto}>No hay pedidos disponibles</Text>
                <Text style={styles.noPedidosSubtexto}>Mantente conectado, pronto aparecerán nuevos pedidos</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262E93',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  header: {
    padding: moderateScale(20),
    paddingTop: moderateScale(10),
  },
  welcomeText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginTop: verticalScale(5),
  },
  estadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262E93',
    marginHorizontal: moderateScale(20),
    marginBottom: verticalScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  estadoIndicador: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    marginRight: moderateScale(10),
  },
  estadoTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginBottom: verticalScale(20),
  },
  statCard: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: verticalScale(5),
  },
  statLabel: {
    fontSize: 12,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  pedidoActivoContainer: {
    marginHorizontal: moderateScale(20),
    marginBottom: verticalScale(20),
  },
  pedidoActivoCard: {
    backgroundColor: '#4CAF50',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  navegarButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(10),
  },
  navegarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: moderateScale(5),
  },
  pedidosContainer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(20),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  pedidoCard: {
    backgroundColor: '#262E93',
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(10),
  },
  clienteInfo: {
    flex: 1,
  },
  clienteNombre: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  calificacionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(2),
  },
  calificacion: {
    color: 'white',
    marginLeft: moderateScale(5),
    fontSize: 14,
  },
  urgenteBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
  },
  urgenteText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  rutaContainer: {
    marginVertical: verticalScale(10),
  },
  rutaPunto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(2),
  },
  direccion: {
    color: 'white',
    marginLeft: moderateScale(10),
    flex: 1,
    fontSize: 14,
  },
  detallesContainer: {
    marginVertical: verticalScale(10),
  },
  detalle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(2),
  },
  detalleTexto: {
    color: 'white',
    marginLeft: moderateScale(10),
    fontSize: 14,
    opacity: 0.8,
  },
  pedidoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(15),
    paddingTop: verticalScale(15),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  precio: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  aceptarButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  aceptarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noPedidosContainer: {
    alignItems: 'center',
    padding: moderateScale(40),
  },
  noPedidosTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: verticalScale(15),
  },
  noPedidosSubtexto: {
    color: 'white',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: verticalScale(5),
  },
});

export default MovanMenu;