import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import MovanMap from '@/src/components/atoms/MovanMap';
import { usePedido } from '@/src/utils/PedidoContext';
import styles from '@/src/constants/Buscar_style/Buscar-style';

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


export default Buscar;

