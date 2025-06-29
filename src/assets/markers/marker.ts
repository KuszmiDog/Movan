import { pedidosSimulados } from '../../components/UserPosts/SimulatedPosts';

export const markers = pedidosSimulados.map((pedido) => ({
  nombre: `Pedido ${pedido.id} - ${pedido.cliente.nombre}`,
  imagen: pedido.imagen, 
  latitud: pedido.origen.coordenadas.lat,
  longitud: pedido.origen.coordenadas.lng,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}));