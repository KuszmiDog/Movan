import 'react-native-get-random-values';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Alert, RefreshControl, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useAuth } from '../../../utils/AuthContext';
import { usePedido, EstadoPedido } from '../../../utils/PedidoContext';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pedido } from '@/src/components/UserPosts/SimulatedPosts';
import { pedidosSimulados } from '@/src/components/UserPosts/SimulatedPosts';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;

type EstadoCamionero = 'disponible' | 'ocupado' | 'fuera_servicio';

const MovanMenu = () => {
  const { user } = useAuth();
  const { 
    setPedidoActivo: setPedidoActivoContext, 
    setDestinoNavegacion, 
    pedidoActivo: pedidoActivoContext,
    estadoPedido,
    setEstadoPedido,
    confirmarRecogida
  } = usePedido();
  const router = useRouter();
  const [estadoCamionero, setEstadoCamionero] = useState<EstadoCamionero>('disponible');
  const [pedidosDisponibles, setPedidosDisponibles] = useState<Pedido[]>([]);
  const [pedidoActivo, setPedidoActivo] = useState<Pedido | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [nuevoPost, setNuevoPost] = useState<{
    tipo: string;
    peso: string;
    descripcion: string;
    origen: { direccion: string; coordenadas: { lat: number | null; lng: number | null } };
    destino: { direccion: string; coordenadas: { lat: number | null; lng: number | null } };
    prioridad: string;
  }>({
    tipo: '',
    peso: '',
    descripcion: '',
    origen: { direccion: '', coordenadas: { lat: null, lng: null } },
    destino: { direccion: '', coordenadas: { lat: null, lng: null } },
    prioridad: 'normal',
  });
  const [step, setStep] = useState(1);
  const [showOrigenModal, setShowOrigenModal] = useState(false);
  const [showDestinoModal, setShowDestinoModal] = useState(false);

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

  // Sincronizar estado local con contexto
  useEffect(() => {
    if (pedidoActivoContext) {
      setPedidoActivo(pedidoActivoContext);
      setEstadoCamionero('ocupado');
    } else {
      setPedidoActivo(null);
      setEstadoCamionero('disponible');
    }
  }, [pedidoActivoContext]);

  // Estadísticas del camionero
  const stats = {
    enviosCompletados: 47,
    enviosHoy: 3,
    calificacionPromedio: 4.8,
    gananciasHoy: '$2,400',
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
            // Actualizar estados locales
            setPedidoActivo(pedido);
            setEstadoCamionero('ocupado');
            setPedidosDisponibles(prev => prev.filter(p => p.id !== pedido.id));
            
            // Actualizar contexto global
            setPedidoActivoContext(pedido);
            setEstadoPedido('recogiendo');
            
            // Configurar destino de navegación (origen del pedido)
            setDestinoNavegacion({
              latitude: pedido.origen.coordenadas.lat,
              longitude: pedido.origen.coordenadas.lng,
              address: pedido.origen.direccion
            });
            
            // Mostrar alerta y navegar
            Alert.alert(
              '¡Pedido Aceptado!', 
              'Te dirigiremos al mapa para navegar hacia el punto de recogida.',
              [
                {
                  text: 'Ir al Mapa',
                  onPress: () => router.push('/(Menu)/(tabs)/Buscar')
                }
              ]
            );
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

  const renderParticularUI = () => (
    <View style={{ padding: 24 }}>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
        ¡Bienvenido, {user?.name || user?.email?.split('@')[0] || 'Usuario'}!
      </Text>
      <Text style={{ color: 'white', fontSize: 16, marginBottom: 16 }}>
        Crea un nuevo envío completando los datos:
      </Text>

      {/* Paso 1: Datos de la carga */}
      {step === 1 && (
        <>
          <Text style={{ color: 'white', marginBottom: 8 }}>Tipo de carga</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Electrodomésticos"
            value={nuevoPost.tipo}
            onChangeText={v => setNuevoPost({ ...nuevoPost, tipo: v })}
            placeholderTextColor="#aaa"
          />
          <Text style={{ color: 'white', marginBottom: 8 }}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 500"
            value={nuevoPost.peso}
            onChangeText={v => setNuevoPost({ ...nuevoPost, peso: v.replace(/[^0-9]/g, '') })}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
          />
          <Text style={{ color: 'white', marginBottom: 8 }}>Descripción</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Detalles de la carga"
            value={nuevoPost.descripcion}
            onChangeText={v => setNuevoPost({ ...nuevoPost, descripcion: v })}
            multiline
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={[styles.navegarButton, { marginTop: 16 }]}
            onPress={() => setStep(2)}
            disabled={!nuevoPost.tipo || !nuevoPost.peso || !nuevoPost.descripcion}
          >
            <Text style={styles.navegarButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Paso 2: Origen y destino */}
      {step === 2 && (
        <>
          <Text style={{ color: 'white', marginBottom: 8 }}>Origen</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowOrigenModal(true)}
          >
            <Text style={{ color: nuevoPost.origen.direccion ? '#222' : '#aaa' }}>
              {nuevoPost.origen.direccion || 'Buscar dirección de origen'}
            </Text>
          </TouchableOpacity>
          <Modal visible={showOrigenModal} animationType="slide" transparent>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'flex-end' }}>
              <View style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
                paddingBottom: 0,
                minHeight: '50%',
                justifyContent: 'flex-start'
              }}>
                <GooglePlacesAutocomplete
                  placeholder="Buscar dirección de origen"
                  onPress={(data, details = null) => {
                    const loc = details?.geometry.location;
                    setNuevoPost({
                      ...nuevoPost,
                      origen: {
                        direccion: data.description,
                        coordenadas: { lat: loc.lat, lng: loc.lng }
                      }
                    });
                    setShowOrigenModal(false);
                  }}
                  fetchDetails
                  query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'es',
                  }}
                  styles={{
                    textInput: styles.input,
                    listView: { backgroundColor: 'white' },
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#FF6B35',
                  paddingVertical: 18,
                  alignItems: 'center',
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                }}
                onPress={() => setShowOrigenModal(false)}
                activeOpacity={0.8}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Text style={{ color: 'white', marginBottom: 8, marginTop: 16 }}>Destino</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDestinoModal(true)}
          >
            <Text style={{ color: nuevoPost.destino.direccion ? '#222' : '#aaa' }}>
              {nuevoPost.destino.direccion || 'Buscar dirección de destino'}
            </Text>
          </TouchableOpacity>
          <Modal visible={showDestinoModal} animationType="slide" transparent>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'flex-end' }}>
              <View style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
                paddingBottom: 0,
                minHeight: '50%',
                justifyContent: 'flex-start'
              }}>
                <GooglePlacesAutocomplete
                  placeholder="Buscar dirección de destino"
                  onPress={(data, details = null) => {
                    const loc = details?.geometry.location;
                    setNuevoPost({
                      ...nuevoPost,
                      destino: {
                        direccion: data.description,
                        coordenadas: { lat: loc.lat, lng: loc.lng }
                      }
                    });
                    setShowDestinoModal(false);
                  }}
                  fetchDetails
                  query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'es',
                  }}
                  styles={{
                    textInput: styles.input,
                    listView: { backgroundColor: 'white' },
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#FF6B35',
                  paddingVertical: 18,
                  alignItems: 'center',
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                }}
                onPress={() => setShowDestinoModal(false)}
                activeOpacity={0.8}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <TouchableOpacity
            style={[styles.navegarButton, { marginTop: 16 }]}
            onPress={() => setStep(3)}
            disabled={
              !nuevoPost.origen.direccion ||
              !nuevoPost.origen.coordenadas.lat ||
              !nuevoPost.destino.direccion ||
              !nuevoPost.destino.coordenadas.lat
            }
          >
            <Text style={styles.navegarButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Paso 3: Prioridad y Confirmar */}
      {step === 3 && (
        <>
          <Text style={{ color: 'white', marginBottom: 8 }}>Prioridad</Text>
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            <TouchableOpacity
              style={[
                styles.prioridadButton,
                nuevoPost.prioridad === 'normal' && { backgroundColor: '#4CAF50' }
              ]}
              onPress={() => setNuevoPost({ ...nuevoPost, prioridad: 'normal' })}
            >
              <Text style={{ color: 'white' }}>Normal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.prioridadButton,
                nuevoPost.prioridad === 'urgente' && { backgroundColor: '#FF6B35' }
              ]}
              onPress={() => setNuevoPost({ ...nuevoPost, prioridad: 'urgente' })}
            >
              <Text style={{ color: 'white' }}>Urgente</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.navegarButton, { marginTop: 16 }]}
            onPress={() => {
              Alert.alert('¡Post creado!', 'Tu pedido fue creado correctamente.');
              setStep(1);
              setNuevoPost({
                tipo: '',
                peso: '',
                descripcion: '',
                origen: { direccion: '', coordenadas: { lat: null, lng: null } },
                destino: { direccion: '', coordenadas: { lat: null, lng: null } },
                prioridad: 'normal',
              });
            }}
          >
            <Text style={styles.navegarButtonText}>Crear Pedido</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            ¡Hola, {user?.name || user?.email?.split('@')[0] || 'Usuario'}!
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              day: 'numeric',
              month: 'long'
            })}
          </Text>
        </View>

        {user?.role === 'Private' ? (
          <>
            <TouchableOpacity style={styles.estadoContainer} onPress={cambiarEstado}>
              <View style={[styles.estadoIndicador, { backgroundColor: getEstadoColor() }]} />
              <Text style={styles.estadoTexto}>{getEstadoTexto()}</Text>
              <MaterialCommunityIcons name="chevron-down" size={20} color="white" />
            </TouchableOpacity>

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

            {pedidoActivo && (
              <View style={styles.pedidoActivoContainer}>
                <Text style={styles.sectionTitle}>🚛 Pedido Activo</Text>
                <View style={styles.pedidoActivoCard}>
                  <View style={styles.pedidoActivoHeader}>
                    <View style={styles.clienteActivoInfo}>
                      <Text style={styles.clienteActivoNombre}>{pedidoActivo.cliente.nombre}</Text>
                      <View style={styles.calificacionContainer}>
                        <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                        <Text style={styles.calificacionActivo}>{pedidoActivo.cliente.calificacion}</Text>
                      </View>
                    </View>
                    <Text style={styles.estadoPedidoTexto}>
                      {estadoPedido === 'recogiendo' ? 'Dirigiéndose a recoger' : 
                      estadoPedido === 'recogido' ? 'Dirigiéndose a entregar' : 
                      'En proceso'}
                    </Text>
                  </View>

                  <View style={styles.rutaActivaContainer}>
                    <View style={styles.direccionRow}>
                      <MaterialCommunityIcons 
                        name="map-marker" 
                        size={20} 
                        color={estadoPedido === 'recogiendo' ? "#FF6B35" : "#4CAF50"} 
                      />
                      <View style={styles.direccionInfo}>
                        <Text style={styles.direccionLabel}>Origen</Text>
                        <Text style={styles.direccionTexto}>{pedidoActivo.origen.direccion}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.separadorRuta}>
                      <MaterialCommunityIcons name="arrow-down" size={20} color="rgba(255,255,255,0.6)" />
                    </View>
                    
                    <View style={styles.direccionRow}>
                      <MaterialCommunityIcons 
                        name="map-marker-check" 
                        size={20} 
                        color={estadoPedido === 'recogido' ? "#FF6B35" : "#F44336"} 
                      />
                      <View style={styles.direccionInfo}>
                        <Text style={styles.direccionLabel}>Destino</Text>
                        <Text style={styles.direccionTexto}>{pedidoActivo.destino.direccion}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.detallesActivoContainer}>
                    <View style={styles.detalleActivo}>
                      <MaterialCommunityIcons name="package-variant" size={18} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.detalleActivoTexto}>{pedidoActivo.carga.tipo} ({pedidoActivo.carga.peso}kg)</Text>
                    </View>
                    <View style={styles.detalleActivo}>
                      <MaterialCommunityIcons name="map" size={18} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.detalleActivoTexto}>{pedidoActivo.distancia}km • {Math.round(pedidoActivo.tiempoEstimado/60)}h</Text>
                    </View>
                    <View style={styles.detalleActivo}>
                      <MaterialCommunityIcons name="cash" size={18} color="rgba(255,255,255,0.8)" />
                      <Text style={styles.pagoTexto}>${pedidoActivo.precio}</Text>
                    </View>
                  </View>

                  <View style={styles.botonesContainer}>
                    <TouchableOpacity 
                      style={styles.navegarButton}
                      onPress={() => {
                        const destino = estadoPedido === 'recogiendo' 
                          ? {
                              latitude: pedidoActivo.origen.coordenadas.lat,
                              longitude: pedidoActivo.origen.coordenadas.lng,
                              address: pedidoActivo.origen.direccion
                            }
                          : {
                              latitude: pedidoActivo.destino.coordenadas.lat,
                              longitude: pedidoActivo.destino.coordenadas.lng,
                              address: pedidoActivo.destino.direccion
                            };
                        
                        setDestinoNavegacion(destino);
                        router.push('/(Menu)/(tabs)/Buscar');
                      }}
                    >
                      <MaterialCommunityIcons name="navigation" size={20} color="white" />
                      <Text style={styles.navegarButtonText}>
                        {estadoPedido === 'recogiendo' ? 'Ir a Recoger' : 'Ir a Entregar'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.cancelarButton}
                      onPress={() => {
                        Alert.alert(
                          'Cancelar Pedido',
                          '¿Estás seguro de que quieres cancelar este pedido?',
                          [
                            { text: 'No', style: 'cancel' },
                            {
                              text: 'Sí, Cancelar',
                              style: 'destructive',
                              onPress: () => {
                                setPedidoActivoContext(null);
                                setEstadoPedido(null);
                                setDestinoNavegacion(null);
                                setPedidoActivo(null);
                                setEstadoCamionero('disponible');
                              }
                            }
                          ]
                        );
                      }}
                    >
                      <MaterialCommunityIcons name="close" size={20} color="white" />
                      <Text style={styles.cancelarButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

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
          </>
        ) : (
          renderParticularUI()
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
    backgroundColor: '#262E93',
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pedidoActivoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  clienteActivoInfo: {
    flex: 1,
  },
  clienteActivoNombre: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  calificacionActivo: {
    color: 'white',
    marginLeft: moderateScale(5),
    fontSize: 14,
  },
  estadoPedidoTexto: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  rutaActivaContainer: {
    marginVertical: verticalScale(15),
  },
  direccionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: verticalScale(8),
  },
  direccionInfo: {
    marginLeft: moderateScale(12),
    flex: 1,
  },
  direccionLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: verticalScale(2),
  },
  direccionTexto: {
    color: 'white',
    fontSize: 14,
    lineHeight: 18,
  },
  separadorRuta: {
    alignItems: 'center',
    marginVertical: verticalScale(5),
  },
  detallesActivoContainer: {
    marginVertical: verticalScale(15),
    paddingTop: verticalScale(15),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  detalleActivo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(6),
  },
  detalleActivoTexto: {
    color: 'white',
    marginLeft: moderateScale(10),
    fontSize: 14,
    opacity: 0.9,
  },
  pagoTexto: {
    color: '#4CAF50',
    marginLeft: moderateScale(10),
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonesContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    gap: moderateScale(10),
  },
  cancelarButton: {
    flex: 1,
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
  },
  cancelarButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: moderateScale(6),
  },
  navegarButton: {
    flex: 2,
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navegarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: moderateScale(8),
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
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    color: '#222',
  },
  prioridadButton: {
    flex: 1,
    backgroundColor: '#565EB3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
});

export default MovanMenu;