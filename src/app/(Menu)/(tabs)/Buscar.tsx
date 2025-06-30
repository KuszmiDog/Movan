import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import MovanMap from '@/src/components/atoms/MovanMap';
import { usePedido } from '@/src/utils/PedidoContext';


const Buscar = () => {
  const { 
    pedidoActivo, 
    estadoPedido, 
    confirmarRecogida, 
    completarEntrega,
    setDestinoNavegacion,
    setPedidoActivo,
    setEstadoPedido
  } = usePedido();

  const handleConfirmarRecogida = () => {
    if (!pedidoActivo) return;

    Alert.alert(
      'Confirmar Recogida',
      '¿Has recogido la carga exitosamente?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, Confirmar',
          onPress: () => {
            confirmarRecogida();
            // Configurar navegación al destino
            setDestinoNavegacion({
              latitude: pedidoActivo.destino.coordenadas.lat,
              longitude: pedidoActivo.destino.coordenadas.lng,
              address: pedidoActivo.destino.direccion
            });
            Alert.alert(
              '¡Recogida Confirmada!',
              'Ahora puedes dirigirte al punto de entrega.'
            );
          }
        }
      ]
    );
  };

  const handleCompletarEntrega = () => {
    if (!pedidoActivo) return;

    Alert.alert(
      'Confirmar Entrega',
      '¿Has entregado la carga exitosamente?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, Confirmar',
          onPress: () => {
            completarEntrega();
            setDestinoNavegacion(null);
            Alert.alert(
              '¡Entrega Completada!',
              'El pedido ha sido completado exitosamente. ¡Buen trabajo!',
              [
                {
                  text: 'Continuar',
                  onPress: () => {
                    // Limpiar el pedido activo después de completar
                    setPedidoActivo(null);
                    setEstadoPedido(null);
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleCancelarPedido = () => {
    Alert.alert(
      'Cancelar Pedido',
      '¿Estás seguro de que quieres cancelar este pedido?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, Cancelar',
          style: 'destructive',
          onPress: () => {
            setPedidoActivo(null);
            setEstadoPedido(null);
            setDestinoNavegacion(null);
            Alert.alert('Pedido Cancelado', 'El pedido ha sido cancelado.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MovanMap />
      
      {/* Panel de control flotante cuando hay pedido activo */}
      {pedidoActivo && (
        <View style={styles.controlPanel}>
          <View style={styles.infoContainer}>
            <Text style={styles.clienteText}>{pedidoActivo.cliente.nombre}</Text>
            <Text style={styles.estadoText}>
              {estadoPedido === 'recogiendo' ? '📍 Dirigiéndose a recoger' : 
               estadoPedido === 'recogido' ? '🚚 En camino a entregar' : 
               '📦 Pedido activo'}
            </Text>
            <Text style={styles.direccionText}>
              {estadoPedido === 'recogiendo' ? 
                `Origen: ${pedidoActivo.origen.direccion}` : 
                `Destino: ${pedidoActivo.destino.direccion}`
              }
            </Text>
          </View>

          <View style={styles.botonesContainer}>
            {estadoPedido === 'recogiendo' && (
              <TouchableOpacity 
                style={styles.confirmarButton}
                onPress={handleConfirmarRecogida}
              >
                <MaterialCommunityIcons name="package-down" size={20} color="white" />
                <Text style={styles.confirmarButtonText}>Confirmar Recogida</Text>
              </TouchableOpacity>
            )}

            {estadoPedido === 'recogido' && (
              <TouchableOpacity 
                style={[styles.confirmarButton, { backgroundColor: '#4CAF50' }]}
                onPress={handleCompletarEntrega}
              >
                <MaterialCommunityIcons name="package-up" size={20} color="white" />
                <Text style={styles.confirmarButtonText}>Confirmar Entrega</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.cancelarButton}
              onPress={handleCancelarPedido}
            >
              <MaterialCommunityIcons name="close" size={20} color="white" />
              <Text style={styles.cancelarButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#565EB3',
  },
  controlPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#262E93',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoContainer: {
    marginBottom: verticalScale(15),
  },
  clienteText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  estadoText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: verticalScale(5),
  },
  direccionText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  botonesContainer: {
    flexDirection: 'row',
    gap: moderateScale(10),
  },
  confirmarButton: {
    flex: 2,
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
    elevation: 3,
  },
  confirmarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: moderateScale(8),
  },
  cancelarButton: {
    flex: 1,
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(25),
    elevation: 3,
  },
  cancelarButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: moderateScale(6),
  },
});

export default Buscar;

