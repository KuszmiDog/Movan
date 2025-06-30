import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Alert, RefreshControl, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useAuth } from '../../../utils/AuthContext';
import { usePedido, EstadoPedido } from '../../../utils/PedidoContext';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pedido } from '@/src/components/UserPosts/SimulatedPosts';
import { pedidosSimulados } from '@/src/components/UserPosts/SimulatedPosts';
import { SolicitudService } from '@/src/utils/SolicitudService';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import styles from '@/src/constants/Inicio_styles/InicioStyles'

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;

type EstadoCamionero = 'disponible' | 'ocupado' | 'fuera_servicio';

const MovanMenu = () => {
  const { user, debugAuthState, reloadUser, getUserCredits, simulateRecharge, hasEnoughCredits, deductCredits } = useAuth();
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
  const [userCredits, setUserCredits] = useState<number>(0);
  const [nuevoPost, setNuevoPost] = useState<{
    tipo: string;
    peso: string;
    descripcion: string;
    precio: string;
    origen: { direccion: string; coordenadas: { lat: number | null; lng: number | null } };
    destino: { direccion: string; coordenadas: { lat: number | null; lng: number | null } };
    prioridad: string;
  }>({
    tipo: '',
    peso: '',
    descripcion: '',
    precio: '',
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

  // Forzar recarga del usuario al iniciar el componente
  useEffect(() => {
    console.log('🔄 Iniciando componente MovanMenu');
    if (reloadUser) {
      console.log('🔄 Forzando recarga del usuario...');
      reloadUser();
    }
  }, []);

  // Cargar pedidos disponibles (simulados + solicitudes reales)
  const cargarPedidosDisponibles = async () => {
    try {
      // Pedidos simulados
      const pedidosSimuladosDisponibles = pedidosSimulados.filter(pedido => pedido.estado === 'disponible');
      
      // Solicitudes reales convertidas a pedidos
      const solicitudesReales = await SolicitudService.getSolicitudesComoPedidos();
      
      // Combinar ambos
      const todosPedidos = [...pedidosSimuladosDisponibles, ...solicitudesReales];
      
      console.log('📦 Pedidos cargados:', {
        simulados: pedidosSimuladosDisponibles.length,
        reales: solicitudesReales.length,
        total: todosPedidos.length
      });
      
      setPedidosDisponibles(todosPedidos);
    } catch (error) {
      console.error('Error cargando pedidos:', error);
      // Fallback a solo pedidos simulados
      setPedidosDisponibles(pedidosSimulados.filter(pedido => pedido.estado === 'disponible'));
    }
  };

  useEffect(() => {
    cargarPedidosDisponibles();
    // Cargar créditos si es transportista
    if (user?.role === 'Private') {
      cargarCreditos();
    }
  }, [user?.role]);

  // Función para cargar créditos del usuario
  const cargarCreditos = async () => {
    try {
      const credits = await getUserCredits();
      setUserCredits(credits);
    } catch (error) {
      console.error('Error cargando créditos:', error);
    }
  };

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
    if (user?.role === 'Private') {
      await cargarCreditos();
    }
    setRefreshing(false);
  };

  // Función para recargar créditos (simulada)
  const handleCreditRecharge = () => {
    Alert.alert(
      'Recargar Créditos',
      'Selecciona la cantidad de créditos a recargar:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: '5 Créditos - $5.000', 
          onPress: async () => {
            const success = await simulateRecharge(5);
            if (success) {
              await cargarCreditos();
              Alert.alert('¡Éxito!', 'Se han agregado 5 créditos a tu cuenta.');
            } else {
              Alert.alert('Error', 'No se pudieron agregar los créditos.');
            }
          } 
        },
        { 
          text: '10 Créditos - $9.000', 
          onPress: async () => {
            const success = await simulateRecharge(10);
            if (success) {
              await cargarCreditos();
              Alert.alert('¡Éxito!', 'Se han agregado 10 créditos a tu cuenta.');
            } else {
              Alert.alert('Error', 'No se pudieron agregar los créditos.');
            }
          } 
        },
        { 
          text: '20 Créditos - $16.000', 
          onPress: async () => {
            const success = await simulateRecharge(20);
            if (success) {
              await cargarCreditos();
              Alert.alert('¡Éxito!', 'Se han agregado 20 créditos a tu cuenta.');
            } else {
              Alert.alert('Error', 'No se pudieron agregar los créditos.');
            }
          } 
        },
      ]
    );
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

  const aceptarPedido = async (pedido: Pedido) => {
    // Verificar si tiene suficientes créditos
    const hasSufficientCredits = await hasEnoughCredits(1);
    
    if (!hasSufficientCredits) {
      Alert.alert(
        'Créditos Insuficientes',
        'Necesitas al menos 1 crédito para aceptar un pedido. ¿Deseas recargar créditos?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Recargar', onPress: handleCreditRecharge }
        ]
      );
      return;
    }

    Alert.alert(
      'Aceptar Pedido',
      `¿Confirmas que quieres aceptar el pedido de ${pedido.cliente.nombre}?\n\nPago: $${pedido.precio}\nCosto: 1 crédito`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: async () => {
            try {
              // Deducir el crédito
              const deductionSuccess = await deductCredits(1, `Pedido aceptado - ${pedido.cliente.nombre}`, pedido.id);
              
              if (!deductionSuccess) {
                Alert.alert('Error', 'No se pudo procesar el pago del crédito. Intenta nuevamente.');
                return;
              }

              // Actualizar contador de créditos local
              await cargarCreditos();

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
                'Se ha deducido 1 crédito de tu cuenta. Te dirigiremos al mapa para navegar hacia el punto de recogida.',
                [
                  {
                    text: 'Ir al Mapa',
                    onPress: () => router.push('/Buscar')
                  }
                ]
              );
            } catch (error) {
              console.error('Error aceptando pedido:', error);
              Alert.alert('Error', 'Ocurrió un error al aceptar el pedido. Intenta nuevamente.');
            }
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
    <View style={{ padding: 20, backgroundColor: '#262E93', borderRadius: 12, margin: 12 }}>
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
          <Text style={{ color: 'white', marginBottom: 8 }}>Precio ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 1500"
            value={nuevoPost.precio}
            onChangeText={v => setNuevoPost({ ...nuevoPost, precio: v.replace(/[^0-9]/g, '') })}
            keyboardType="numeric"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={[styles.navegarButton, { marginTop: 16 }]}
            onPress={() => setStep(2)}
            disabled={
              !nuevoPost.tipo ||
              !nuevoPost.peso ||
              !nuevoPost.descripcion ||
              !nuevoPost.precio
            }
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
                    const loc = details?.geometry?.location;
                    if (loc && loc.lat && loc.lng) {
                      setNuevoPost({
                        ...nuevoPost,
                        origen: {
                          direccion: data.description,
                          coordenadas: { lat: loc.lat, lng: loc.lng }
                        }
                      });
                      setShowOrigenModal(false);
                    } else {
                      console.error('No se pudieron obtener las coordenadas del origen');
                      Alert.alert('Error', 'No se pudieron obtener las coordenadas de esta dirección');
                    }
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
                    const loc = details?.geometry?.location;
                    if (loc && loc.lat && loc.lng) {
                      setNuevoPost({
                        ...nuevoPost,
                        destino: {
                          direccion: data.description,
                          coordenadas: { lat: loc.lat, lng: loc.lng }
                        }
                      });
                      setShowDestinoModal(false);
                    } else {
                      console.error('No se pudieron obtener las coordenadas del destino');
                      Alert.alert('Error', 'No se pudieron obtener las coordenadas de esta dirección');
                    }
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
            onPress={async () => {
              try {
                if (!user) {
                  Alert.alert('Error', 'No se encontró información del usuario');
                  return;
                }

                // Validar coordenadas
                if (!nuevoPost.origen.coordenadas.lat || !nuevoPost.origen.coordenadas.lng ||
                    !nuevoPost.destino.coordenadas.lat || !nuevoPost.destino.coordenadas.lng) {
                  Alert.alert('Error', 'Faltan coordenadas de origen o destino');
                  return;
                }

                // Crear la solicitud
                const result = await SolicitudService.crearSolicitud({
                  clienteId: user.id,
                  cliente: {
                    nombre: user.name || user.email?.split('@')[0] || 'Usuario',
                    telefono: user.phone || '+54 9 XXXX XXXX',
                    calificacion: 5 // Valor por defecto
                  },
                  origen: {
                    direccion: nuevoPost.origen.direccion,
                    coordenadas: {
                      lat: nuevoPost.origen.coordenadas.lat,
                      lng: nuevoPost.origen.coordenadas.lng
                    }
                  },
                  destino: {
                    direccion: nuevoPost.destino.direccion,
                    coordenadas: {
                      lat: nuevoPost.destino.coordenadas.lat,
                      lng: nuevoPost.destino.coordenadas.lng
                    }
                  },
                  carga: {
                    tipo: nuevoPost.tipo,
                    peso: parseInt(nuevoPost.peso),
                    descripcion: nuevoPost.descripcion
                  },
                  precio: parseInt(nuevoPost.precio),
                  distancia: Math.round(Math.random() * 50 + 5), // Calcular distancia real después
                  tiempoEstimado: Math.round(Math.random() * 120 + 30), // Calcular tiempo real después
                  fechaRequerida: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mañana por defecto
                  prioridad: nuevoPost.prioridad as 'normal' | 'urgente'
                });

                if (result.success) {
                  Alert.alert('¡Solicitud creada!', 'Tu solicitud fue creada correctamente y está disponible para transportistas.');
                  
                  // Resetear formulario
                  setStep(1);
                  setNuevoPost({
                    tipo: '',
                    peso: '',
                    descripcion: '',
                    precio: '',
                    origen: { direccion: '', coordenadas: { lat: null, lng: null } },
                    destino: { direccion: '', coordenadas: { lat: null, lng: null } },
                    prioridad: 'normal',
                  });
                } else {
                  Alert.alert('Error', result.message);
                }
              } catch (error) {
                console.error('Error creando solicitud:', error);
                Alert.alert('Error', 'Ocurrió un error al crear la solicitud');
              }
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
            {/* Aviso de créditos bajos */}
            {userCredits < 3 && (
              <View style={styles.lowCreditsWarning}>
                <MaterialCommunityIcons name="alert" size={24} color="#FF6B35" />
                <View style={styles.warningText}>
                  <Text style={styles.warningTitle}>Créditos Bajos</Text>
                  <Text style={styles.warningDescription}>
                    Te quedan {userCredits} créditos. Recarga para no perderte pedidos.
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.warningButton}
                  onPress={() => router.push('/(Menu)/(Transportista)/CreditRecharge')}
                >
                  <Text style={styles.warningButtonText}>Recargar</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Contador de créditos para transportistas */}
            <View style={styles.creditContainer}>
              <TouchableOpacity 
                style={styles.creditDisplay}
                onPress={() => router.push('/(Menu)/(Transportista)/CreditHistory')}
              >
                <MaterialCommunityIcons name="cash" size={24} color="#FFD700" />
                <Text style={styles.creditText}>{userCredits} créditos</Text>
                <MaterialCommunityIcons name="chevron-right" size={16} color="rgba(255,255,255,0.6)" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.rechargeButton}
                onPress={() => router.push('/(Menu)/(Transportista)/CreditRecharge')}
              >
                <MaterialCommunityIcons name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>

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
                        router.push('/Buscar');
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


export default MovanMenu;