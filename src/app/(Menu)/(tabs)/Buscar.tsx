import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React from 'react'
import MovanMap from '@/src/components/atoms/MovanMap'
import { usePedido } from '@/src/utils/PedidoContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Buscar = () => {
  const { destinoNavegacion, pedidoActivo, cancelarPedido } = usePedido();
  const router = useRouter();

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
            cancelarPedido();
            Alert.alert('Pedido Cancelado', 'El pedido ha sido cancelado exitosamente.');
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MovanMap destination={destinoNavegacion || undefined} />
      
      {/* Botón de cancelar pedido */}
      {pedidoActivo && (
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handleCancelarPedido}
        >
          <MaterialCommunityIcons name="close-circle" size={20} color="#fff" />
          <Text style={styles.cancelButtonText}>Cancelar Pedido</Text>
        </TouchableOpacity>
      )}
      
      {/* Información del pedido activo */}
      {pedidoActivo && (
        <View style={styles.pedidoInfo}>
          <Text style={styles.pedidoInfoTitle}>📦 Pedido Activo</Text>
          <Text style={styles.pedidoInfoText}>Cliente: {pedidoActivo.cliente.nombre}</Text>
          <Text style={styles.pedidoInfoText}>Pago: ${pedidoActivo.precio}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cancelButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#FF4444',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  pedidoInfo: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    padding: 12,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  pedidoInfoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pedidoInfoText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
  },
});

export default Buscar

